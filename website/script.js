let map;
let marker;
let lat = 0;
let lng = 0;
let cachedReports = [];
let corsFailureAlreadyLogged = false;
let corsRetryBlockedUntil = 0;
let isSubmittingReport = false;
let locationSuggestionAbortController = null;
let locationSuggestionDebounceTimer = null;
let leafletReadyPromise = null;

const CORS_RETRY_COOLDOWN_MS = 60 * 1000;
const LOCAL_REPORTS_KEY = "roadwatchLocalReports";
const ADMIN_STATUS_OVERRIDES_KEY = "roadwatchAdminStatusOverrides";
const ADMIN_DELETED_REPORTS_KEY = "roadwatchAdminDeletedReports";
const SITE_SETTINGS_KEY = "roadwatchSiteSettings";
const HOME_REPORTS_SYNC_INTERVAL_MS = 10000;
const EMAIL_ADDRESS_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LEAFLET_SCRIPT_SOURCES = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"
];

const LEAFLET_STYLE_SOURCES = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"
];

const API_URL = "https://script.google.com/macros/s/AKfycbxZ7aoLwshceT4N_BCgOmYxkW6IL2Y-w0bF5ArLuOxehNBJl_PW05ze6RbYfB8E4JZ1/exec";
const ISSUE_TYPE_OPTIONS_BY_CATEGORY = {
  "Road Surface": ["Potholes", "Road cracks", "Faded or missing road markings", "Uneven or damaged road surfaces", "Other"],
  "Flooding / Drainage": ["Clogged roadside drainage", "Missing or broken drainage cover", "Flooded roads during heavy rain", "Water pooling on the road", "Other"],
  "Road Safety": ["Malfunctioning traffic lights", "Missing or damaged traffic signs", "Lack of pedestrian crossings", "Broken or missing guardrails", "Other"],
  "Street Infrastructure": ["Damaged sidewalk", "Broken streetlights", "Damaged road reflectors", "Open or uncovered manholes", "Other"]
};


function buildHomepageUrl() {
  const { origin, pathname } = window.location;
  const normalizedPath = pathname && pathname !== "/" ? pathname : "/";
  return `${origin}${normalizedPath}`;
}

function setHomepageQrCode() {
  const qrImage = document.getElementById("homepageQrCode");
  if (!qrImage) return;

  const homepageUrl = buildHomepageUrl();
  const encodedHomepageUrl = encodeURIComponent(homepageUrl);
  const qrSources = [
    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodedHomepageUrl}`,
    `https://quickchart.io/qr?size=220&text=${encodedHomepageUrl}`,
    `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encodedHomepageUrl}`
  ];

  let sourceIndex = 0;
  const tryLoadQrSource = () => {
    const nextSource = qrSources[sourceIndex];
    if (!nextSource) {
      qrImage.alt = "QR code failed to load. Please refresh or open this page directly.";
      return;
    }

    qrImage.src = nextSource;
    sourceIndex += 1;
  };

  qrImage.onerror = tryLoadQrSource;
  qrImage.onload = () => {
    qrImage.onerror = null;
  };

  tryLoadQrSource();
  qrImage.setAttribute("data-homepage-url", homepageUrl);
}

function injectLeafletStylesheet() {
  if (document.querySelector('link[data-leaflet-style="true"]')) return;

  const styleHref = LEAFLET_STYLE_SOURCES.find(Boolean);
  if (!styleHref) return;

  const linkEl = document.createElement("link");
  linkEl.rel = "stylesheet";
  linkEl.href = styleHref;
  linkEl.dataset.leafletStyle = "true";
  document.head.appendChild(linkEl);
}

function loadScriptSequentially(sources, index = 0) {
  return new Promise((resolve) => {
    if (typeof window.L !== "undefined") {
      resolve(true);
      return;
    }

    const source = sources[index];
    if (!source) {
      resolve(false);
      return;
    }

    const existingTag = document.querySelector(`script[src="${source}"]`);
    if (existingTag) {
      if (existingTag.dataset.loaded === "true") {
        resolve(typeof window.L !== "undefined");
        return;
      }

      existingTag.addEventListener("load", () => resolve(typeof window.L !== "undefined"), { once: true });
      existingTag.addEventListener("error", () => {
        loadScriptSequentially(sources, index + 1).then(resolve);
      }, { once: true });
      return;
    }

    const scriptEl = document.createElement("script");
    scriptEl.src = source;
    scriptEl.async = true;
    scriptEl.addEventListener("load", () => {
      scriptEl.dataset.loaded = "true";
      resolve(typeof window.L !== "undefined");
    }, { once: true });
    scriptEl.addEventListener("error", () => {
      scriptEl.remove();
      loadScriptSequentially(sources, index + 1).then(resolve);
    }, { once: true });
    document.head.appendChild(scriptEl);
  });
}

function ensureLeafletReady() {
  if (typeof window.L !== "undefined") return Promise.resolve(true);
  if (leafletReadyPromise) return leafletReadyPromise;

  injectLeafletStylesheet();
  leafletReadyPromise = loadScriptSequentially(LEAFLET_SCRIPT_SOURCES).then((isReady) => {
    if (!isReady) {
      console.warn("Leaflet failed to load from all configured CDNs.");
    }
    return isReady;
  });

  return leafletReadyPromise;
}



function getAdminStatusOverrides() {
  try {
    const raw = localStorage.getItem(ADMIN_STATUS_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Unable to read admin status overrides", error);
    return {};
  }
}

function applyAdminStatusOverride(report) {
  const normalizedReport = toReportModel(report);
  const trackingKey = (normalizedReport.tracking || "").toString().trim();
  if (!trackingKey) return normalizedReport;

  const sheetStatus = (normalizedReport.status || "").toString().trim();
  if (sheetStatus) return normalizedReport;

  const override = getStatusOverrideByTracking(trackingKey, getAdminStatusOverrides());
  if (!override) return normalizedReport;

  return {
    ...normalizedReport,
    status: override
  };
}

function getStatusOverrideByTracking(tracking, overrides) {
  const target = (tracking || "").toString().trim().toLowerCase();
  if (!target || !overrides || typeof overrides !== "object") return "";

  const direct = overrides[tracking];
  if (direct) return direct;

  const matchedKey = Object.keys(overrides).find((key) => key.trim().toLowerCase() === target);
  return matchedKey ? overrides[matchedKey] : "";
}


function getDeletedReports() {
  try {
    const raw = localStorage.getItem(ADMIN_DELETED_REPORTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Unable to read deleted reports", error);
    return [];
  }
}

function isDeletedByTracking(tracking) {
  const target = (tracking || "").toString().trim().toLowerCase();
  if (!target) return false;
  return getDeletedReports().some((value) => String(value || "").trim().toLowerCase() === target);
}

function getSiteSettings() {
  try {
    const raw = localStorage.getItem(SITE_SETTINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn("Unable to read site settings", error);
    return {};
  }
}

function applyAdminWebsiteSettings() {
  const settings = getSiteSettings();

  const subheader = document.getElementById("heroSubheader");
  if (subheader && settings.heroSubheader) subheader.textContent = settings.heroSubheader;

  const heroPurpose = document.getElementById("heroPurpose");
  if (heroPurpose && settings.heroPurpose) heroPurpose.textContent = settings.heroPurpose;

  return Array.isArray(settings.liveStatuses) && settings.liveStatuses.length > 0
    ? settings.liveStatuses.filter(Boolean)
    : null;
}

function getReportEndpoints() {
  // Keep a short endpoint list to avoid spamming repeated browser CORS errors
  // when the Apps Script deployment is not configured for cross-origin access.
  return [API_URL, `${API_URL}?action=getReports`];
}

function buildTrackingLookupEndpoints(trackingNumber) {
  const tracking = encodeURIComponent((trackingNumber || "").trim());
  return [
    `${API_URL}?action=getReportByTracking&tracking=${tracking}`,
    `${API_URL}?action=getReports`
  ];
}

function buildJsonpEndpoint(endpoint, callbackName) {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}callback=${encodeURIComponent(callbackName)}`;
}

function loadJsonp(endpoint) {
  return new Promise((resolve, reject) => {
    const callbackName = `roadwatchJsonpCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const scriptId = `${callbackName}_script`;
    const cleanup = () => {
      const script = document.getElementById(scriptId);
      if (script) script.remove();
      delete window[callbackName];
    };

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("JSONP request timed out."));
    }, 10000);

    window[callbackName] = (payload) => {
      window.clearTimeout(timeout);
      cleanup();
      resolve(payload || {});
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = buildJsonpEndpoint(endpoint, callbackName);
    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("JSONP request failed."));
    };

    document.head.appendChild(script);
  });
}

async function fetchApiPayload(endpoint) {
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const responseText = await response.text();
    if (!responseText) return {};

    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  } catch (error) {
    if (!isLikelyCorsBlockedRequest(endpoint, error)) throw error;

    // Cross-origin requests can still work through standard fetch when the Apps Script
    // deployment sends the right CORS headers. Only fall back to JSONP when fetch is
    // blocked by the browser's CORS policy.
    return loadJsonp(endpoint);
  }
}

function isCrossOriginEndpoint(endpoint) {
  try {
    return new URL(endpoint).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function getLocalReports() {
  try {
    const raw = localStorage.getItem(LOCAL_REPORTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(toReportModel).filter((report) => !isDeletedByTracking(report.tracking));
  } catch (error) {
    console.warn("Unable to read local reports cache", error);
    return [];
  }
}

function saveLocalReports(reports) {
  try {
    localStorage.setItem(LOCAL_REPORTS_KEY, JSON.stringify(reports));
  } catch (error) {
    console.warn("Unable to persist local reports cache", error);
  }
}

function mergeReportsByTracking(primaryReports, secondaryReports) {
  const merged = [];
  const indexByTracking = new Map();

  const mergeKeepingPreferredValues = (preferred, fallback) => {
    const result = { ...preferred };
    Object.keys(fallback || {}).forEach((key) => {
      const preferredValue = result[key];
      const hasPreferredValue = preferredValue !== undefined
        && preferredValue !== null
        && String(preferredValue).trim() !== "";
      if (!hasPreferredValue) {
        result[key] = fallback[key];
      }
    });
    return result;
  };

  const append = (report, source = "secondary") => {
    const normalizedReport = applyAdminStatusOverride(report);
    const trackingKey = (normalizedReport.tracking || "").toString().trim().toLowerCase();

    if (trackingKey && isDeletedByTracking(trackingKey)) return;

    if (!trackingKey) {
      merged.push(normalizedReport);
      return;
    }

    if (indexByTracking.has(trackingKey)) {
      const existing = merged[indexByTracking.get(trackingKey)];
      merged[indexByTracking.get(trackingKey)] = source === "primary"
        ? mergeKeepingPreferredValues(normalizedReport, existing)
        : mergeKeepingPreferredValues(existing, normalizedReport);
      return;
    }

    indexByTracking.set(trackingKey, merged.length);
    merged.push(normalizedReport);
  };

  (Array.isArray(primaryReports) ? primaryReports : []).forEach((report) => append(report, "primary"));
  (Array.isArray(secondaryReports) ? secondaryReports : []).forEach((report) => append(report, "secondary"));

  return merged;
}

function cacheLocalSubmission(reportPayload) {
  const localReports = getLocalReports();
  const cachedEntry = {
    ...reportPayload,
    status: "Pending",
    timestamp: new Date().toISOString()
  };

  const mergedReports = mergeReportsByTracking([cachedEntry], localReports);
  saveLocalReports(mergedReports);
}

function getCurrentOrigin() {
  return window.location.origin || "this site";
}

function buildCorsErrorMessage(endpoint = API_URL) {
  const currentOrigin = getCurrentOrigin();
  return `Request to ${endpoint} was blocked by CORS from ${currentOrigin}. Redeploy the Google Apps Script web app with access set to Anyone, and return Access-Control-Allow-Origin for ${currentOrigin} (or *) on GET/POST and OPTIONS responses.`;
}

function isCorsRetryCooldownActive() {
  return Date.now() < corsRetryBlockedUntil;
}

function activateCorsRetryCooldown() {
  corsRetryBlockedUntil = Date.now() + CORS_RETRY_COOLDOWN_MS;
}

function isCorsConfigurationIssue(error) {
  return Boolean(error?.message && error.message.includes("Request blocked by CORS"));
}

function reportCorsTroubleshootingContext() {
  if (corsFailureAlreadyLogged) return;

  console.info(
    [
      "Google Apps Script CORS troubleshooting:",
      "1) Open Apps Script > Deploy > Manage deployments.",
      "2) Ensure the Web app is deployed with 'Who has access' set to 'Anyone'.",
      "   Also set 'Execute as' to your script owner account.",
      `   Current requesting origin: ${getCurrentOrigin()}.`,
      "3) Create a new Web app version after every Code.gs change, then update script.js with that latest /exec URL.",
      "4) Keep requests as simple GET/POST calls (avoid custom headers that trigger preflight).",
      "5) If there is still no Access-Control-Allow-Origin header, the issue is deployment-side (Apps Script), not this static frontend."
    ].join("\n")
  );

  corsFailureAlreadyLogged = true;
}

function buildNetworkErrorMessage() {
  return "Unable to reach the report API. Check your internet connection and verify the Google Apps Script /exec URL is still active.";
}

function readPhotoAsDataUrl() {
  const photoInput = document.getElementById("photo");
  const file = photoInput?.files?.[0];

  if (!file) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Unable to read the selected photo."));
    reader.readAsDataURL(file);
  });
}

function submitCrossOriginViaHiddenForm(endpoint, formUrlEncoded) {
  return new Promise((resolve, reject) => {
    const iframeName = `roadwatch_submit_iframe_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const iframe = document.createElement("iframe");
    iframe.name = iframeName;
    iframe.style.display = "none";

    const form = document.createElement("form");
    form.method = "POST";
    form.action = endpoint;
    form.target = iframeName;
    form.style.display = "none";

    const params = new URLSearchParams(formUrlEncoded);
    params.forEach((value, key) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    let hasSettled = false;
    const cleanup = () => {
      window.clearTimeout(timeoutId);
      iframe.onload = null;
      form.remove();
      iframe.remove();
    };

    const resolveOnce = () => {
      if (hasSettled) return;
      hasSettled = true;
      cleanup();
      resolve("");
    };

    const rejectOnce = (error) => {
      if (hasSettled) return;
      hasSettled = true;
      cleanup();
      reject(error);
    };

    iframe.onload = resolveOnce;

    const timeoutId = window.setTimeout(() => {
      rejectOnce(new Error("Cross-origin form submit timed out."));
    }, 12000);

    try {
      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      rejectOnce(error instanceof Error ? error : new Error("Cross-origin form submit failed."));
    }
  });
}

async function submitCrossOriginViaNoCors(endpoint, formUrlEncoded) {
  const response = await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    body: formUrlEncoded,
    redirect: "follow"
  });

  return response;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function verifySubmittedReport(trackingNumber) {
  const maxAttempts = 4;
  let encounteredLookupError = false;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const matchedReport = await fetchReportByTracking(trackingNumber);
      if (matchedReport && (matchedReport.tracking || "").toString().trim()) {
        return true;
      }
    } catch (error) {
      encounteredLookupError = true;
      if (isJsonpTransportError(error)) {
        return null;
      }
      console.warn("Unable to verify submitted report yet", error);
    }

    if (attempt < maxAttempts) {
      await wait(1200);
    }
  }

  return encounteredLookupError ? null : false;
}

function isJsonpTransportError(error) {
  const message = (error?.message || "").toString().toLowerCase();
  return message.includes("jsonp request failed") || message.includes("jsonp request timed out");
}

function toUserFacingLoadErrorMessage(error) {
  if (!error?.message) return "Unable to load reports right now.";
  if (isCorsConfigurationIssue(error)) {
    return "Reports are temporarily unavailable because the Google Apps Script deployment is not allowing this website origin (CORS).";
  }
  if (isJsonpTransportError(error)) {
    return "Reports are temporarily unavailable because Google Apps Script is not returning JSONP yet. Please verify your deployment URL and callback support.";
  }
  return error.message;
}

function isLikelyCorsBlockedRequest(endpoint, error) {
  if (!(error instanceof TypeError)) return false;
  return isCrossOriginEndpoint(endpoint);
}

function normalizeKey(key) {
  return (key || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function escapeHtml(value) {
  return (value || "").toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getFieldValue(record, aliases) {
  if (!record || typeof record !== "object") return "";

  for (const alias of aliases) {
    if (record[alias] !== undefined && record[alias] !== null) {
      return record[alias];
    }
  }

  const normalized = Object.keys(record).reduce((acc, key) => {
    acc[normalizeKey(key)] = record[key];
    return acc;
  }, {});

  for (const alias of aliases) {
    const value = normalized[normalizeKey(alias)];
    if (value !== undefined && value !== null) return value;
  }

  return "";
}

function toFiniteCoordinate(value) {
  const parsed = Number.parseFloat(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function getCoordinatePair(report) {
  const latCandidate = getFieldValue(report, ["lat", "latitude", "Latitude", "pinLat", "pin_lat", "y"]);
  const lngCandidate = getFieldValue(report, ["lng", "lon", "long", "longitude", "Longitude", "pinLng", "pin_lng", "x"]);

  let latValue = toFiniteCoordinate(latCandidate);
  let lngValue = toFiniteCoordinate(lngCandidate);

  if (latValue !== null && lngValue !== null) {
    return { lat: latValue, lng: lngValue };
  }

  const composite = getFieldValue(report, ["coordinates", "coordinate", "latlng", "LatLng", "pin", "locationCoords", "Location Coords"]);
  if (composite) {
    const match = String(composite).match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/);
    if (match) {
      latValue = toFiniteCoordinate(match[1]);
      lngValue = toFiniteCoordinate(match[2]);
      if (latValue !== null && lngValue !== null) {
        return { lat: latValue, lng: lngValue };
      }
    }
  }

  return { lat: "", lng: "" };
}

function toReportModel(report) {
  const coordinates = getCoordinatePair(report);

  return {
    tracking: getFieldValue(report, [
      "tracking",
      "trackingNumber",
      "tracking_no",
      "tracking no",
      "tracking number",
      "Tracking Number",
      "Tracking #",
      "reference number",
      "Reference Number"
    ]),
    name: getFieldValue(report, ["name", "fullName", "Full Name", "Reporter Name"]),
    lastname: getFieldValue(report, ["lastname", "lastName", "surname", "Last Name"]),
    firstname: getFieldValue(report, ["firstname", "firstName", "givenName", "First Name"]),
    mi: getFieldValue(report, ["mi", "middleinitial", "middleInitial", "Middle Initial"]),
    location: getFieldValue(report, ["location", "address", "road", "Road Location"]),
    issue: getFieldValue(report, [
      "issue",
      "issueDetail",
      "issueDetails",
      "issue_detail",
      "issue_details",
      "issueType",
      "issue_type",
      "problem",
      "details",
      "description",
      "concern",
      "Issue",
      "Issue Detail",
      "Issue Details",
      "Issue Type",
      "Details",
      "Report Detail",
      "Report Details"
    ]),
    issueCategory: getFieldValue(report, ["issueCategory", "issue_category", "Issue Category", "category"]),
    status: getFieldValue(report, ["status", "reportStatus", "report status", "reportstatus", "Status", "Report Status"]),
    roadType: getFieldValue(report, ["roadType", "road_type", "Road Type"]),
    roadClass: getFieldValue(report, ["roadClass", "road_class", "Road Class"]),
    barangay: getFieldValue(report, ["barangay", "Barangay"]),
    jurisdictionAuthority: getFieldValue(report, ["jurisdictionAuthority", "jurisdiction_authority", "Jurisdiction Authority"]),
    lat: coordinates.lat,
    lng: coordinates.lng,
    timestamp: getFieldValue(report, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"])
  };
}

function parseReportsFromApi(payload) {
  if (typeof payload === "string") {
    const trimmedPayload = payload.trim();
    if (!trimmedPayload) return [];

    try {
      return parseReportsFromApi(JSON.parse(trimmedPayload));
    } catch (error) {
      console.warn("Unable to parse string payload from API", error);
      return [];
    }
  }

  if (Array.isArray(payload)) return payload.map(toReportModel);

  if (payload && typeof payload === "object") {
    const possibleCollections = [payload.data, payload.reports, payload.items, payload.rows];
    const collection = possibleCollections.find(Array.isArray);
    if (collection) return collection.map(toReportModel);
  }

  return [];
}

async function fetchReports() {
  const localReports = getLocalReports();

  if (isCorsRetryCooldownActive()) {
    if (localReports.length > 0) return localReports;
    throw new Error(buildCorsErrorMessage(API_URL));
  }

  const sheetEndpoints = getReportEndpoints();

  let lastError;
  let corsBlocked = false;
  let corsBlockedEndpoint = "";

  for (const endpoint of sheetEndpoints) {
    try {
      const payload = await fetchApiPayload(endpoint);

      const parsedReports = parseReportsFromApi(payload);

      if (parsedReports.length > 0) {
        cachedReports = mergeReportsByTracking(parsedReports, localReports);
        return cachedReports;
      }
    } catch (error) {
      if (isLikelyCorsBlockedRequest(endpoint, error)) {
        corsBlocked = true;
        corsBlockedEndpoint = endpoint;
        break;
      }
      lastError = error;
    }
  }

  cachedReports = [];
  if (corsBlocked) {
    if (localReports.length > 0) {
      cachedReports = localReports;
      return cachedReports;
    }
    activateCorsRetryCooldown();
    const corsError = new Error(buildCorsErrorMessage(corsBlockedEndpoint));
    reportCorsTroubleshootingContext();
    throw corsError;
  }
  if (lastError instanceof TypeError) {
    if (localReports.length > 0) {
      cachedReports = localReports;
      return cachedReports;
    }
    throw new Error(buildNetworkErrorMessage());
  }
  if (isJsonpTransportError(lastError)) {
    cachedReports = localReports;
    return cachedReports;
  }
  if (lastError) throw lastError;
  cachedReports = localReports;
  return cachedReports;
}

// Sidebar toggle
function isMenuOpen() {
  return document.getElementById("menu")?.classList.contains("open") || false;
}

function openMenu() {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menuBtn");
  if (!menu) return;
  menu.classList.add("open");
  menu.setAttribute("aria-hidden", "false");
  menuBtn?.setAttribute("aria-expanded", "true");
}

function closeMenu() {
  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menuBtn");
  if (!menu) return;

  if (menu.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  menu.classList.remove("open");
  menu.setAttribute("aria-hidden", "true");
  menuBtn?.setAttribute("aria-expanded", "false");
}

function toggleMenu() {
  if (isMenuOpen()) {
    closeMenu();
    return;
  }

  openMenu();
}

function setActiveMobileTab(page) {
  document.querySelectorAll(".mobile-tab").forEach((tab) => {
    const isActive = tab.dataset.page === page;
    tab.classList.toggle("active", isActive);
    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });
}

function setActiveSidebarButton(page) {
  document.querySelectorAll(".sidebar button[data-page]").forEach((button) => {
    const isActive = button.dataset.page === page;
    button.classList.toggle("active", isActive);
    if (isActive) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });
}

// Show specific page/section
function showPage(page) {
  document.querySelectorAll("section").forEach((sec) => sec.classList.remove("active"));
  const selectedPage = document.getElementById(page);
  if (!selectedPage) return;

  selectedPage.classList.add("active");
  setActiveMobileTab(page);
  setActiveSidebarButton(page);
  closeMenu();

  requestAnimationFrame(() => {
    selectedPage.scrollIntoView({ block: "start", behavior: "smooth" });
  });

  if (page === "submit") {
    setTimeout(async () => {
      const loadedMap = await loadMap();
      loadedMap?.invalidateSize(true);
    }, 320);
  }

  if (page === "home" && window.citizenReportsMapInstance) {
    setTimeout(() => {
      window.citizenReportsMapInstance.invalidateSize(true);
    }, 260);
  }
}


function resolveInitialPage() {
  const params = new URLSearchParams(window.location.search);
  const requestedPage = params.get("page");
  const hashPage = window.location.hash.replace("#", "");
  if (requestedPage === "submit" || hashPage === "submit") return "submit";
  return "home";
}

// Initialize the map
async function loadMap() {
  const mapElement = document.getElementById("reportMap");
  if (!mapElement) return null;

  if (map) {
    map.invalidateSize(true);
    return map;
  }

  const hasLeaflet = await ensureLeafletReady();
  if (!hasLeaflet || typeof L === "undefined") {
    mapElement.innerHTML = '<p class="map-load-error">Map failed to load. Please check internet connection and try again.</p>';
    return null;
  }

  map = L.map("reportMap", { zoomControl: true }).setView([14.5995, 120.9842], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);

  map.on("click", function (e) {
    lat = e.latlng.lat;
    lng = e.latlng.lng;

    if (marker && map) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("selectedLocation").innerText =
      "Selected: " + lat.toFixed(5) + " , " + lng.toFixed(5);
    setCoordinateDisplay(lat, lng);

    autofillRoadLocationFromCoordinates(lat, lng);
  });

  return map;
}

async function autofillRoadLocationFromCoordinates(latitude, longitude) {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    const road = data.address?.road || data.address?.neighbourhood || data.display_name;
    const barangay = data.address?.suburb || data.address?.quarter || data.address?.village || data.address?.hamlet || "";
    const city = data.address?.city || data.address?.town || data.address?.municipality || "";
    const province = data.address?.state || data.address?.region || "";
    const region = data.address?.region || data.address?.state_district || data.address?.island || "";
    const locationInput = document.getElementById("locationText");
    const barangayInput = document.getElementById("barangay");
    const cityInput = document.getElementById("city");
    const provinceInput = document.getElementById("province");
    const regionInput = document.getElementById("region");
    if (locationInput && road) {
      locationInput.value = road;
    }
    if (barangayInput) {
      barangayInput.value = barangay;
    }
    if (cityInput && city) {
      cityInput.value = city;
    }
    if (provinceInput && province) {
      provinceInput.value = province;
    }
    if (regionInput && region) {
      regionInput.value = region;
    }
  } catch (error) {
    console.log("Reverse geocoding failed", error);
  }
}

// Auto-detect user location
async function detectLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  if (!map) {
    await loadMap();
  }

  if (!map) {
    alert("Map is still loading. Please try again in a moment.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async function (pos) {
    lat = pos.coords.latitude;
    lng = pos.coords.longitude;

    map.setView([lat, lng], 16);

    if (marker && map) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);

    document.getElementById("selectedLocation").innerText =
      "Selected: " + lat.toFixed(5) + " , " + lng.toFixed(5);
    setCoordinateDisplay(lat, lng);

    await autofillRoadLocationFromCoordinates(lat, lng);
  }, function () {
    alert("Unable to detect location. Please allow GPS permission or place a pin manually.");
  });
}

async function fetchLocationSuggestions(query) {
  if (locationSuggestionAbortController) {
    locationSuggestionAbortController.abort();
  }

  locationSuggestionAbortController = new AbortController();
  const endpoint = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=ph&addressdetails=1&limit=6&q=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    signal: locationSuggestionAbortController.signal,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) throw new Error(`Suggestion lookup failed (${response.status})`);

  return response.json();
}

function renderLocationSuggestions(results) {
  const datalist = document.getElementById("locationSuggestions");
  if (!datalist) return;

  datalist.innerHTML = "";

  (Array.isArray(results) ? results : []).forEach((item) => {
    const option = document.createElement("option");
    const road = item?.address?.road || item?.name || item?.display_name || "";
    option.value = road;
    option.label = item?.display_name || road;
    option.dataset.lat = item?.lat || "";
    option.dataset.lon = item?.lon || "";
    datalist.appendChild(option);
  });
}

function attachLocationAutocomplete() {
  const input = document.getElementById("locationText");
  const datalist = document.getElementById("locationSuggestions");
  if (!input || !datalist) return;

  input.addEventListener("input", () => {
    const query = input.value.trim();

    if (locationSuggestionDebounceTimer) {
      clearTimeout(locationSuggestionDebounceTimer);
    }

    if (query.length < 3) {
      datalist.innerHTML = "";
      return;
    }

    locationSuggestionDebounceTimer = setTimeout(async () => {
      try {
        const results = await fetchLocationSuggestions(query);
        renderLocationSuggestions(results);
      } catch (error) {
        if (error?.name !== "AbortError") {
          console.log("Location suggestion lookup failed", error);
        }
      }
    }, 280);
  });

  input.addEventListener("change", () => {
    const selectedOption = Array.from(datalist.options).find((option) => option.value === input.value);
    if (!selectedOption) return;

    const optionLat = parseFloat(selectedOption.dataset.lat);
    const optionLng = parseFloat(selectedOption.dataset.lon);
    if (!Number.isFinite(optionLat) || !Number.isFinite(optionLng)) return;

    lat = optionLat;
    lng = optionLng;

    if (!map) {
      loadMap().then((loadedMap) => {
        if (!loadedMap) return;
        loadedMap.setView([lat, lng], 16);
        if (marker) loadedMap.removeLayer(marker);
        marker = L.marker([lat, lng]).addTo(loadedMap);
        document.getElementById("selectedLocation").innerText =
          "Selected: " + lat.toFixed(5) + " , " + lng.toFixed(5);
        setCoordinateDisplay(lat, lng);
      });
      return;
    }

    map.setView([lat, lng], 16);
    if (marker && map) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);
    document.getElementById("selectedLocation").innerText =
      "Selected: " + lat.toFixed(5) + " , " + lng.toFixed(5);
    setCoordinateDisplay(lat, lng);
  });
}

function setCoordinateDisplay(latitude, longitude) {
  const coordinatesInput = document.getElementById("coordinatesDisplay");
  if (!coordinatesInput) return;

  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    coordinatesInput.value = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    return;
  }

  coordinatesInput.value = "";
}

function collectEnhancedRoadInfo() {
  return {
    region: document.getElementById("region")?.value.trim() || "",
    province: document.getElementById("province")?.value.trim() || "",
    city: document.getElementById("city")?.value.trim() || "",
    barangay: document.getElementById("barangay")?.value.trim() || "",
    roadName: document.getElementById("locationText")?.value.trim() || "",
    nearestLandmark: document.getElementById("nearestLandmark")?.value.trim() || ""
  };
}


function normalizeStatus(status) {
  const rawStatus = (status || "Pending").toString().trim();
  const normalized = rawStatus.toLowerCase();
  const allowedStatuses = ["pending", "verified", "in progress", "repaired"];
  if (!allowedStatuses.includes(normalized)) return "Pending";
  return normalized.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function formatSubmissionTime(report) {
  const rawTime = getFieldValue(report, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]);
  if (!rawTime) return "Not available";

  const parsed = new Date(rawTime);
  if (Number.isNaN(parsed.getTime())) return String(rawTime);

  const datePart = parsed.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });

  const timePart = parsed.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  return `${datePart}, ${timePart}`;
}

function getIssueCategory(issueText, explicitCategory = "") {
  const explicit = (explicitCategory || "").toString().trim();
  if (explicit) return explicit;

  const issue = (issueText || "").toString().trim().toLowerCase();
  if (!issue) return "Unspecified";

  const issueMatchers = [
    { label: "Road Surface", patterns: ["pothole", "crack", "lane", "marking", "surface", "asphalt"] },
    { label: "Flooding & Drainage", patterns: ["flood", "drain", "water", "clog", "rain"] },
    { label: "Road Safety", patterns: ["traffic light", "sign", "guardrail", "crossing", "safety"] },
    { label: "Street Infrastructure", patterns: ["streetlight", "sidewalk", "manhole", "reflector", "pavement"] },
    { label: "Road Obstruction", patterns: ["obstruction", "fallen tree", "debris", "construction", "illegal parking", "blocked"] }
  ];

  const matched = issueMatchers.find(item => item.patterns.some(pattern => issue.includes(pattern)));
  if (matched) return matched.label;

  return "Other Concerns";
}

function computeReportStatistics(reports) {
  const safeReports = Array.isArray(reports) ? reports : [];

  const statusCounts = {
    pending: 0,
    inProgress: 0,
    repaired: 0
  };

  const issueTypeCounts = {};
  let thisMonthCount = 0;
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  safeReports.forEach((report) => {
    const status = normalizeStatus(report.status).toLowerCase();
    if (status === "pending") statusCounts.pending += 1;
    if (status === "in progress") statusCounts.inProgress += 1;
    if (status === "repaired") statusCounts.repaired += 1;

    const issueType = getIssueCategory(report.issue, report.issueCategory);
    issueTypeCounts[issueType] = (issueTypeCounts[issueType] || 0) + 1;

    const rawDate = getFieldValue(report, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]);
    const parsedDate = new Date(rawDate);
    if (!Number.isNaN(parsedDate.getTime()) && parsedDate.getMonth() === currentMonth && parsedDate.getFullYear() === currentYear) {
      thisMonthCount += 1;
    }
  });

  const topIssue = Object.entries(issueTypeCounts)
    .sort((a, b) => b[1] - a[1])[0] || ["None yet", 0];

  return {
    total: safeReports.length,
    statusCounts,
    issueTypeCounts,
    topIssue,
    thisMonthCount
  };
}

function buildDisplayNameForFixedRoad(report) {
  const location = (report.location || "").toString().trim() || "Location not provided";
  const issue = (report.issue || "").toString().trim() || "Issue repaired";
  return `${location} – ${issue}`;
}

function parseDateValue(rawValue) {
  if (!rawValue) return null;
  const parsed = new Date(rawValue);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getSubmissionDate(report) {
  const rawValue = getFieldValue(report, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]);
  return parseDateValue(rawValue);
}

function getResolutionDate(report) {
  const rawValue = getFieldValue(report, [
    "resolvedAt",
    "repairedAt",
    "resolved_at",
    "repaired_at",
    "resolutionTime",
    "statusUpdatedAt",
    "updatedAt",
    "updated_at",
    "dateResolved",
    "Date Resolved"
  ]);
  return parseDateValue(rawValue);
}

function getLocationAreaLabel(report) {
  const rawLocation = (report.location || report.address || "").toString().trim();
  if (!rawLocation) return "Unknown Area";
  const [firstSegment] = rawLocation.split(",");
  return firstSegment?.trim() || rawLocation;
}

function formatAverageResolution(hours) {
  if (!Number.isFinite(hours) || hours <= 0) return "N/A";
  if (hours < 24) return `${Math.round(hours)}h`;
  const days = hours / 24;
  if (days < 7) return `${days.toFixed(1)}d`;
  return `${Math.round(days)}d`;
}

function computeHomeImpactMetrics(reports) {
  const safeReports = Array.isArray(reports) ? reports : [];
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000));
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());
  weekStart.setHours(0, 0, 0, 0);

  let reportsToday = 0;
  let resolvedThisWeek = 0;
  let resolutionHoursTotal = 0;
  let resolutionSampleCount = 0;
  const activeAreaCounts = {};

  safeReports.forEach((report) => {
    const normalizedStatus = normalizeStatus(report.status).toLowerCase();
    const submissionDate = getSubmissionDate(report);
    const resolutionDate = getResolutionDate(report);

    if (submissionDate && submissionDate >= oneDayAgo) reportsToday += 1;

    if (normalizedStatus === "repaired") {
      const resolvedDateToUse = resolutionDate || submissionDate;
      if (resolvedDateToUse && resolvedDateToUse >= weekStart) {
        resolvedThisWeek += 1;
      }
      if (submissionDate && resolutionDate && resolutionDate >= submissionDate) {
        resolutionHoursTotal += (resolutionDate.getTime() - submissionDate.getTime()) / (1000 * 60 * 60);
        resolutionSampleCount += 1;
      }
    }

    if (normalizedStatus === "pending" || normalizedStatus === "in progress") {
      const area = getLocationAreaLabel(report);
      activeAreaCounts[area] = (activeAreaCounts[area] || 0) + 1;
    }
  });

  const topActiveAreaEntry = Object.entries(activeAreaCounts).sort((a, b) => b[1] - a[1])[0];
  const topActiveArea = topActiveAreaEntry ? `${topActiveAreaEntry[0]} (${topActiveAreaEntry[1]})` : "No active reports";
  const averageResolutionHours = resolutionSampleCount > 0 ? (resolutionHoursTotal / resolutionSampleCount) : NaN;

  return {
    reportsToday,
    resolvedThisWeek,
    averageResolutionLabel: formatAverageResolution(averageResolutionHours),
    topActiveArea
  };
}

function renderHomeImpactMetrics(reports) {
  const reportsTodayEl = document.getElementById("homeImpactReportsToday");
  const resolvedWeekEl = document.getElementById("homeImpactResolvedWeek");
  const avgResolutionEl = document.getElementById("homeImpactAvgResolution");
  const topAreaEl = document.getElementById("homeImpactTopArea");
  if (!reportsTodayEl || !resolvedWeekEl || !avgResolutionEl || !topAreaEl) return;

  const metrics = computeHomeImpactMetrics(reports);
  reportsTodayEl.textContent = metrics.reportsToday.toLocaleString("en-PH");
  resolvedWeekEl.textContent = metrics.resolvedThisWeek.toLocaleString("en-PH");
  avgResolutionEl.textContent = metrics.averageResolutionLabel;
  topAreaEl.textContent = metrics.topActiveArea;
}

function formatCommandCenterTimestamp(dateValue = new Date()) {
  return dateValue.toLocaleString("en-PH", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

function computeCommandCenterData(reports) {
  const safeReports = Array.isArray(reports) ? reports : [];
  const issueCounts = {};
  const hotspotCounts = {};

  const unresolvedReports = safeReports.filter((report) => {
    const status = normalizeStatus(report?.status).toLowerCase();
    return status === "pending" || status === "in progress" || status === "verified";
  });

  unresolvedReports.forEach((report) => {
    const issueType = (report.issueType || report.issueCategory || report.issue || "Unspecified issue").toString().trim();
    issueCounts[issueType] = (issueCounts[issueType] || 0) + 1;

    const area = getLocationAreaLabel(report);
    hotspotCounts[area] = (hotspotCounts[area] || 0) + 1;
  });

  const issueHeatmap = Object.entries(issueCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const hotspotAreas = Object.entries(hotspotCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const priorityQueue = unresolvedReports
    .map((report) => ({
      tracking: (report.tracking || "").toString().trim() || "N/A",
      location: (report.location || "Location unavailable").toString().trim(),
      issue: (report.issue || report.issueType || "Issue details unavailable").toString().trim(),
      status: normalizeStatus(report.status),
      submittedAt: getSubmissionDate(report)
    }))
    .filter((report) => report.submittedAt)
    .sort((a, b) => a.submittedAt - b.submittedAt)
    .slice(0, 4);

  return { issueHeatmap, hotspotAreas, priorityQueue };
}

function renderHomeCommandCenter(reports) {
  const issueHeatmapBarsEl = document.getElementById("issueHeatmapBars");
  const hotspotAreaListEl = document.getElementById("hotspotAreaList");
  const priorityQueueListEl = document.getElementById("priorityQueueList");
  const lastUpdatedEl = document.getElementById("commandCenterLastUpdated");
  if (!issueHeatmapBarsEl || !hotspotAreaListEl || !priorityQueueListEl || !lastUpdatedEl) return;

  const data = computeCommandCenterData(reports);
  const topIssueCount = data.issueHeatmap[0]?.[1] || 0;

  if (data.issueHeatmap.length === 0) {
    issueHeatmapBarsEl.innerHTML = '<p class="command-center-empty">No unresolved reports yet.</p>';
  } else {
    issueHeatmapBarsEl.innerHTML = data.issueHeatmap
      .map(([issue, count]) => {
        const widthPct = topIssueCount > 0 ? Math.max((count / topIssueCount) * 100, 10) : 0;
        return `
          <div class="heatmap-row">
            <div class="heatmap-row-head">
              <span>${escapeHtml(issue)}</span>
              <strong>${count.toLocaleString("en-PH")}</strong>
            </div>
            <div class="heatmap-track"><span class="heatmap-fill" style="width:${widthPct.toFixed(1)}%"></span></div>
          </div>
        `;
      })
      .join("");
  }

  if (data.hotspotAreas.length === 0) {
    hotspotAreaListEl.innerHTML = '<li class="command-center-empty">No hotspot areas yet.</li>';
  } else {
    hotspotAreaListEl.innerHTML = data.hotspotAreas
      .map(([area, count]) => `<li><strong>${escapeHtml(area)}</strong> — ${count.toLocaleString("en-PH")} active report${count === 1 ? "" : "s"}</li>`)
      .join("");
  }

  if (data.priorityQueue.length === 0) {
    priorityQueueListEl.innerHTML = '<li class="command-center-empty">No pending queue right now.</li>';
  } else {
    priorityQueueListEl.innerHTML = data.priorityQueue
      .map((item) => {
        const submittedLabel = item.submittedAt.toLocaleDateString("en-PH", { month: "short", day: "2-digit", year: "numeric" });
        return `<li><strong>${escapeHtml(item.tracking)}</strong> — ${escapeHtml(item.location)}<br><small>${escapeHtml(item.issue)} • ${escapeHtml(item.status)} • since ${submittedLabel}</small></li>`;
      })
      .join("");
  }

  lastUpdatedEl.textContent = `Last updated: ${formatCommandCenterTimestamp(new Date())}`;
}

function renderReportStatistics(reports) {
  const totalEl = document.getElementById("statsTotalReports");
  const pendingEl = document.getElementById("statsPending");
  const inProgressEl = document.getElementById("statsInProgress");
  const repairedEl = document.getElementById("statsRepaired");
  const recentFixedEl = document.getElementById("recentlyFixedRoads");
  const feedbackEl = document.getElementById("statsFeedback");

  if (!totalEl || !pendingEl || !inProgressEl || !repairedEl || !recentFixedEl || !feedbackEl) return;

  const stats = computeReportStatistics(reports);

  totalEl.textContent = stats.total.toLocaleString("en-PH");
  pendingEl.textContent = stats.statusCounts.pending.toLocaleString("en-PH");
  inProgressEl.textContent = stats.statusCounts.inProgress.toLocaleString("en-PH");
  repairedEl.textContent = stats.statusCounts.repaired.toLocaleString("en-PH");

  const recentlyFixed = [...(Array.isArray(reports) ? reports : [])]
    .filter((report) => normalizeStatus(report.status).toLowerCase() === "repaired")
    .sort((a, b) => {
      const timeA = new Date(getFieldValue(a, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]))?.getTime() || 0;
      const timeB = new Date(getFieldValue(b, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]))?.getTime() || 0;
      return timeB - timeA;
    })
    .slice(0, 3);

  if (recentlyFixed.length === 0) {
    recentFixedEl.innerHTML = "<li>No repaired reports yet.</li>";
  } else {
    recentFixedEl.innerHTML = recentlyFixed
      .map((report) => `<li>${escapeHtml(buildDisplayNameForFixedRoad(report))}</li>`)
      .join("");
  }

  feedbackEl.textContent = stats.total > 0
    ? `Updated with ${stats.total.toLocaleString("en-PH")} report${stats.total === 1 ? "" : "s"} from the connected Google Sheet.`
    : "No report data is available yet from the connected Google Sheet.";
}


function createStatusMapIcon(color) {
  return L.divIcon({
    className: "status-map-marker",
    html: `<span class="status-map-pin" style="--status-color:${color}"></span>`,
    iconSize: [24, 32],
    iconAnchor: [12, 32],
    popupAnchor: [0, -28]
  });
}

function getMarkerConfigForStatus(status) {
  const normalized = normalizeStatus(status).toLowerCase();
  if (normalized === "verified") return { color: "#ef4444", label: "Reported (Verified)" };
  if (normalized === "in progress") return { color: "#facc15", label: "Being Repaired" };
  if (normalized === "repaired") return { color: "#22c55e", label: "Fixed" };
  return { color: "#60a5fa", label: "Pending" };
}

async function renderCitizenReportsMap(reports) {
  const mapEl = document.getElementById("citizenReportsMap");
  if (!mapEl) return;

  const hasLeaflet = await ensureLeafletReady();
  if (!hasLeaflet || typeof L === "undefined") return;

  if (!window.citizenReportsMapInstance) {
    window.citizenReportsMapInstance = L.map("citizenReportsMap", { zoomControl: true }).setView([14.5995, 120.9842], 11);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(window.citizenReportsMapInstance);
  }

  window.citizenReportsMapInstance.invalidateSize(true);

  if (window.citizenReportsLayer) {
    window.citizenReportsLayer.clearLayers();
  } else {
    window.citizenReportsLayer = L.layerGroup().addTo(window.citizenReportsMapInstance);
  }

  const validReports = (Array.isArray(reports) ? reports : []).filter(hasValidCoordinates);

  const bounds = [];

  validReports.forEach((report) => {
    const latValue = Number.parseFloat(report.lat);
    const lngValue = Number.parseFloat(report.lng);
    if (!Number.isFinite(latValue) || !Number.isFinite(lngValue)) return;
    const markerConfig = getMarkerConfigForStatus(report.status);

    const marker = L.marker([latValue, lngValue], { icon: createStatusMapIcon(markerConfig.color) });
    marker.bindPopup(`<strong>${escapeHtml(report.location || "Location not available")}</strong><br>${escapeHtml(report.issue || "Issue not available")}<br>Status: ${escapeHtml(markerConfig.label)}`);
    marker.addTo(window.citizenReportsLayer);
    bounds.push([latValue, lngValue]);
  });

  if (bounds.length > 0) {
    window.citizenReportsMapInstance.fitBounds(bounds, { padding: [24, 24], maxZoom: 15 });
  }

  window.setTimeout(() => {
    window.citizenReportsMapInstance?.invalidateSize(true);
  }, 0);
}

function renderReportStatisticsError(error) {
  const feedbackEl = document.getElementById("statsFeedback");
  if (!feedbackEl) return;
  feedbackEl.textContent = toUserFacingLoadErrorMessage(error);
}

async function loadStatistics(options = {}) {
  const forceRefresh = Boolean(options.forceRefresh);

  try {
    const reports = (!forceRefresh && Array.isArray(cachedReports) && cachedReports.length > 0)
      ? cachedReports
      : await fetchReports();
    renderReportStatistics(reports);
    renderHomeImpactMetrics(reports);
    renderHomeCommandCenter(reports);
    await renderCitizenReportsMap(reports);
  } catch (error) {
    console.warn("Error loading statistics", error);
    // Keep the homepage map visible even when the remote report API is
    // temporarily unavailable (e.g., CORS or network issues).
    const localReports = getLocalReports();
    renderHomeImpactMetrics(localReports);
    renderHomeCommandCenter(localReports);
    await renderCitizenReportsMap(localReports);
    renderReportStatisticsError(error);
  }
}

function findReportByTracking(reports, trackingNumber) {
  const target = trackingNumber.trim().toLowerCase();
  return reports.find(report => {
    const tracking = getFieldValue(report, ["tracking", "trackingNumber", "track", "Tracking Number", "Tracking #", "Reference Number"]).toString().trim().toLowerCase();
    return tracking === target;
  });
}

async function fetchReportByTracking(trackingNumber) {
  const localReports = getLocalReports();
  const localMatch = findReportByTracking(localReports, trackingNumber);

  if (isCorsRetryCooldownActive()) {
    return localMatch || null;
  }

  const endpoints = buildTrackingLookupEndpoints(trackingNumber);

  let lastError;
  let corsBlocked = false;
  let corsBlockedEndpoint = "";

  for (const endpoint of endpoints) {
    try {
      const payload = await fetchApiPayload(endpoint);

      if (endpoint.includes("action=getReportByTracking")) {
        const matchedReport = payload && typeof payload === "object"
          ? toReportModel(payload.report || {})
          : null;

        if (matchedReport && matchedReport.tracking) {
          cachedReports = mergeReportsByTracking([matchedReport], localReports);
          return applyAdminStatusOverride(matchedReport);
        }
      }

      const reports = parseReportsFromApi(payload);
      const matchedReport = findReportByTracking(reports, trackingNumber);
      if (matchedReport) {
        cachedReports = mergeReportsByTracking(reports, localReports);
        return applyAdminStatusOverride(matchedReport);
      }
    } catch (error) {
      if (isLikelyCorsBlockedRequest(endpoint, error)) {
        corsBlocked = true;
        corsBlockedEndpoint = endpoint;
        break;
      }
      lastError = error;
    }
  }

  if (corsBlocked) {
    activateCorsRetryCooldown();
    if (localMatch) return localMatch;
    const corsError = new Error(buildCorsErrorMessage(corsBlockedEndpoint));
    reportCorsTroubleshootingContext();
    throw corsError;
  }

  if (lastError instanceof TypeError) {
    if (localMatch) return localMatch;
    throw new Error(buildNetworkErrorMessage());
  }
  if (isJsonpTransportError(lastError)) {
    return localMatch || null;
  }

  if (lastError) throw lastError;
  return localMatch || null;
}

function renderTrackingResult(report) {
  const wrapper = document.getElementById("trackingResultWrapper");
  const tbody = document.getElementById("trackingResultBody");
  if (!wrapper || !tbody) return;

  const lastname = (report.lastname || "").trim();
  const firstname = (report.firstname || "").trim();
  const middleInitial = (report.mi || report.middleinitial || report.middleInitial || "").trim();
  let fullName = (report.name || "").trim() || "Not available";

  if (lastname || firstname || middleInitial) {
    const baseName = [lastname, firstname].filter(Boolean).join(", ");
    fullName = `${baseName}${middleInitial ? ` ${middleInitial}.` : ""}`.trim();
  }

  const trackingNumber = getFieldValue(report, ["tracking", "trackingNumber", "tracking_no", "track", "Tracking Number", "Tracking #", "Reference Number"]).toString().trim() || "Not available";
  const location = (report.location || report.address || "Not available").toString().trim() || "Not available";
  const issueDetails = getFieldValue(report, [
    "issue",
    "issueDetail",
    "issueDetails",
    "issue_detail",
    "issue_details",
    "issueType",
    "issue_type",
    "problem",
    "details",
    "description",
    "concern",
    "Issue",
    "Issue Detail",
    "Issue Details",
    "Issue Type",
    "Details",
    "Report Detail",
    "Report Details"
  ]).toString().trim() || "Not available";

  tbody.innerHTML = `
    <tr>
      <td>${escapeHtml(trackingNumber)}</td>
      <td>${formatSubmissionTime(report)}</td>
      <td>${escapeHtml(fullName)}</td>
      <td>${escapeHtml(location)}</td>
      <td>${escapeHtml(issueDetails)}</td>
      <td><span class="status-pill">${normalizeStatus(report.status)}</span></td>
    </tr>
  `;

  wrapper.hidden = false;
}


async function refreshVisibleTrackingResult() {
  const wrapper = document.getElementById("trackingResultWrapper");
  const input = document.getElementById("trackingSearchInput");
  if (!wrapper || wrapper.hidden || !input) return;

  const trackingNumber = input.value.trim();
  if (!trackingNumber) return;

  try {
    const matchedReport = await fetchReportByTracking(trackingNumber);
    if (matchedReport) {
      renderTrackingResult(matchedReport);
    }
  } catch {
    // Keep existing UI when refresh fails.
  }
}

function syncHomeReportViews(options = {}) {
  loadStatistics(options);
  refreshVisibleTrackingResult();
}

function wireHomepageQuickActions() {
  const reportBtn = document.getElementById("heroReportCta");
  const trackBtn = document.getElementById("heroTrackCta");
  const trackingInput = document.getElementById("trackingSearchInput");

  reportBtn?.addEventListener("click", () => {
    showPage("submit");
    setTimeout(() => {
      const firstSubmitField = document.querySelector("#submit #lastname, #submit input, #submit textarea, #submit select");
      firstSubmitField?.focus({ preventScroll: true });
    }, 220);
  });

  trackBtn?.addEventListener("click", () => {
    showPage("home");
    setTimeout(() => {
      trackingInput?.focus({ preventScroll: true });
      trackingInput?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 220);
  });
}

async function handleTrackingSearch(event) {
  event.preventDefault();

  const feedback = document.getElementById("trackingSearchFeedback");
  const input = document.getElementById("trackingSearchInput");
  const wrapper = document.getElementById("trackingResultWrapper");
  const tbody = document.getElementById("trackingResultBody");

  if (!input || !feedback || !wrapper || !tbody) return;

  const trackingNumber = input.value.trim();
  if (!trackingNumber) {
    feedback.textContent = "Please enter a valid tracking number.";
    wrapper.hidden = true;
    tbody.innerHTML = "";
    return;
  }

  feedback.textContent = "Searching report...";

  try {
    const matchedReport = await fetchReportByTracking(trackingNumber);

    if (!matchedReport) {
      feedback.textContent = "No report found for this tracking number.";
      wrapper.hidden = true;
      tbody.innerHTML = "";
      return;
    }

    renderTrackingResult(matchedReport);
    feedback.textContent = "Report found.";
  } catch (error) {
    console.error("Tracking search failed", error);
    if (isCorsConfigurationIssue(error)) {
      reportCorsTroubleshootingContext();
    }
    feedback.textContent = error?.message || "Unable to search right now. Please try again later.";
    wrapper.hidden = true;
    tbody.innerHTML = "";
  }
}

// Photo preview
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const introOverlay = document.getElementById("brandIntro");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (body) {
    if (prefersReducedMotion) {
      body.classList.add("intro-done");
      introOverlay?.setAttribute("aria-hidden", "true");
    } else {
      body.classList.add("intro-playing");
      introOverlay?.setAttribute("aria-hidden", "false");

      setTimeout(() => {
        body.classList.remove("intro-playing");
        body.classList.add("intro-done");
        introOverlay?.setAttribute("aria-hidden", "true");
      }, 1450);
    }
  }

  const initialPage = resolveInitialPage();
  showPage(initialPage);
  setHomepageQrCode();
  wireHomepageQuickActions();
  syncHomeReportViews();

  const revealTargets = document.querySelectorAll(".hero-card, .card, .issue-card");
  revealTargets.forEach((el) => el.classList.add("reveal-target"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("revealed"));
  }

  const menu = document.getElementById("menu");
  const menuBtn = document.getElementById("menuBtn");

  document.addEventListener("pointerdown", (event) => {
    if (!isMenuOpen()) return;

    const clickInsideSidebar = menu?.contains(event.target);
    const clickMenuToggle = menuBtn?.contains(event.target);

    if (!clickInsideSidebar && !clickMenuToggle) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      closeMenu();
    }
  });

  const photoInput = document.getElementById("photo");
  const preview = document.getElementById("photoPreview");

  if (photoInput && preview) {
    photoInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    });
  }

  const trackSearchForm = document.getElementById("trackSearchForm");
  if (trackSearchForm) {
    trackSearchForm.addEventListener("submit", handleTrackingSearch);
  }

  attachLocationAutocomplete();
  setCoordinateDisplay(null, null);

  const submitRoadIssueForm = document.getElementById("submitRoadIssueForm");
  if (submitRoadIssueForm) {
    submitRoadIssueForm.addEventListener("submit", (event) => {
      event.preventDefault();
      submitReport();
    });
  }

  document.querySelectorAll("#submit input, #submit textarea").forEach((field) => {
    field.addEventListener("input", () => clearFieldInvalidState(field));
  });

  updateIssueTypeOptionsByCategory("");
  document.querySelectorAll('input[name="issueCategory"]').forEach((option) => {
    option.addEventListener("change", () => {
      updateIssueTypeOptionsByCategory(option.checked ? option.value : "");
      clearFieldInvalidState(document.querySelector('.report-category-group'));
    });
  });

  const issueTypeSelect = document.getElementById("issueTypeSelect");
  if (issueTypeSelect) {
    issueTypeSelect.addEventListener("change", () => {
      const customIssueTypeGroup = document.getElementById("customIssueTypeGroup");
      const customIssueType = document.getElementById("customIssueType");
      const showCustomType = issueTypeSelect.value === "Other";
      if (customIssueTypeGroup) customIssueTypeGroup.hidden = !showCustomType;
      if (!showCustomType && customIssueType) customIssueType.value = "";
      clearFieldInvalidState(issueTypeSelect);
      clearFieldInvalidState(customIssueType);
    });
  }

  const issueField = document.getElementById("issue");
  if (issueField) {
    issueField.addEventListener("input", updateIssueCharacterCount);
    updateIssueCharacterCount();
  }

  const liveStatus = document.getElementById("liveStatus");
  const statuses = applyAdminWebsiteSettings() || [
    "Live updates active across Metro Manila",
    "Citizens are reporting hazards in real-time",
    "Safer roads start with your report"
  ];

  if (liveStatus) {
    let statusIndex = 0;
    setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      liveStatus.textContent = statuses[statusIndex];
    }, 3200);
  }

  window.addEventListener("storage", (event) => {
    if (![ADMIN_STATUS_OVERRIDES_KEY, ADMIN_DELETED_REPORTS_KEY, LOCAL_REPORTS_KEY].includes(event.key)) return;
    syncHomeReportViews({ forceRefresh: true });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      syncHomeReportViews({ forceRefresh: true });
    }
  });

  setInterval(() => {
    syncHomeReportViews({ forceRefresh: true });
  }, HOME_REPORTS_SYNC_INTERVAL_MS);
});



function markFieldInvalid(field, message = "") {
  if (!field) return;
  field.classList.add("field-invalid");
  if (message) {
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("title", message);
  }
}

function clearFieldInvalidState(field) {
  if (!field) return;
  field.classList.remove("field-invalid");
  field.removeAttribute("aria-invalid");
  field.removeAttribute("title");
}

function focusFirstInvalidField(fields) {
  const firstInvalid = fields.find((field) => field?.classList?.contains("field-invalid"));
  if (!firstInvalid) return;
  firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  firstInvalid.focus({ preventScroll: true });
}

function validateSubmitFields() {
  const requiredFields = [
    { id: "region", label: "Region" },
    { id: "province", label: "Province" },
    { id: "city", label: "City / Municipality" },
    { id: "barangay", label: "Barangay" },
    { id: "locationText", label: "Road Name" },
    { id: "lastname", label: "Last Name" },
    { id: "firstname", label: "First Name" },
    { id: "mi", label: "Middle Initial" },
    { id: "email", label: "Email Address" },
    { id: "phone", label: "Mobile Number" },
    { id: "reporterProvince", label: "Reporter Province" },
    { id: "reporterCity", label: "Reporter City/Municipality" },
    { id: "reporterBarangay", label: "Reporter Barangay" },
    { id: "issue", label: "Road Issue Description" }
  ];

  const missingLabels = [];
  const touchedFields = [];

  requiredFields.forEach(({ id, label }) => {
    const field = document.getElementById(id);
    if (!field) return;

    touchedFields.push(field);
    clearFieldInvalidState(field);

    if (!field.value.trim()) {
      markFieldInvalid(field, `${label} is required.`);
      missingLabels.push(label);
    }
  });

  const emailField = document.getElementById("email");
  if (emailField && emailField.value.trim() && !EMAIL_ADDRESS_PATTERN.test(emailField.value.trim())) {
    markFieldInvalid(emailField, "Please enter a valid email address.");
    if (!missingLabels.includes("Valid Email Address")) {
      missingLabels.push("Valid Email Address");
    }
  }

  const selectedCategoryInput = document.querySelector('input[name="issueCategory"]:checked');
  if (!selectedCategoryInput) {
    const group = document.querySelector('.report-category-group');
    markFieldInvalid(group, "Please select a report category.");
    touchedFields.push(group);
    missingLabels.push("Report Category");
  } else {
    clearFieldInvalidState(document.querySelector('.report-category-group'));
  }

  const issueTypeSelect = document.getElementById("issueTypeSelect");
  const customIssueType = document.getElementById("customIssueType");

  if (!issueTypeSelect || !issueTypeSelect.value.trim()) {
    markFieldInvalid(issueTypeSelect, "Please choose an issue type.");
    touchedFields.push(issueTypeSelect);
    missingLabels.push("Issue Type");
  } else {
    clearFieldInvalidState(issueTypeSelect);
  }

  if (issueTypeSelect?.value === "Other" && (!customIssueType || !customIssueType.value.trim())) {
    markFieldInvalid(customIssueType, "Please enter the issue type.");
    touchedFields.push(customIssueType);
    missingLabels.push("Other Type");
  } else {
    clearFieldInvalidState(customIssueType);
  }

  const hasCoordinates = Number.isFinite(lat) && Number.isFinite(lng) && !(lat === 0 && lng === 0);
  if (!hasCoordinates) {
    const mapEl = document.getElementById("reportMap");
    markFieldInvalid(mapEl, "Please click on the map to select coordinates.");
    touchedFields.push(mapEl);
    missingLabels.push("Map Location");
  } else {
    clearFieldInvalidState(document.getElementById("reportMap"));
  }

  return {
    isValid: missingLabels.length === 0,
    missingLabels,
    touchedFields
  };
}

function updateIssueCharacterCount() {
  const issueField = document.getElementById("issue");
  const counter = document.getElementById("issueCharacterCount");
  if (!issueField || !counter) return;

  const currentLength = issueField.value.length;
  const maxLength = Number.parseInt(issueField.getAttribute("maxlength") || "500", 10) || 500;
  counter.textContent = `${currentLength} / ${maxLength}`;
}

function setSubmitButtonLoading(isLoading) {
  const submitBtn = document.getElementById("submitReportBtn");
  if (!submitBtn) return;

  submitBtn.disabled = isLoading;
  submitBtn.classList.toggle("is-loading", isLoading);
  submitBtn.textContent = isLoading ? "Submitting Report..." : "Submit Report";
}

function updateIssueTypeOptionsByCategory(selectedCategory = "") {
  const issueTypeSelect = document.getElementById("issueTypeSelect");
  const customIssueTypeGroup = document.getElementById("customIssueTypeGroup");
  const customIssueType = document.getElementById("customIssueType");
  if (!issueTypeSelect) return;

  const options = ISSUE_TYPE_OPTIONS_BY_CATEGORY[selectedCategory] || [];
  const previousValue = issueTypeSelect.value;
  issueTypeSelect.innerHTML = '<option value="" selected disabled hidden>Select issue type</option>';

  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    issueTypeSelect.appendChild(option);
  });

  if (options.includes(previousValue)) {
    issueTypeSelect.value = previousValue;
  } else if (options.length > 0) {
    issueTypeSelect.value = options[0];
  }

  const showCustomType = issueTypeSelect.value === "Other";
  if (customIssueTypeGroup) customIssueTypeGroup.hidden = !showCustomType;
  if (!showCustomType && customIssueType) {
    customIssueType.value = "";
    clearFieldInvalidState(customIssueType);
  }
}

// Submit report
async function submitReport() {
  if (isSubmittingReport) return;

  const validation = validateSubmitFields();
  if (!validation.isValid) {
    focusFirstInvalidField(validation.touchedFields);
    alert(`Please complete all required details before submitting. Missing: ${validation.missingLabels.join(", ")}`);
    return;
  }

  const selectedCategoryInput = document.querySelector('input[name="issueCategory"]:checked');
  const issueCategory = selectedCategoryInput?.value || "";
  const issueTypeSelect = document.getElementById("issueTypeSelect");
  const customIssueType = document.getElementById("customIssueType");
  const issueType = issueTypeSelect?.value === "Other"
    ? (customIssueType?.value || "").trim()
    : (issueTypeSelect?.value || "").trim();

  isSubmittingReport = true;
  setSubmitButtonLoading(true);

  const reporterEmail = document.getElementById("email").value.trim();
  if (!reporterEmail) {
    alert("Please provide your email so we can send your confirmation.");
    isSubmittingReport = false;
    setSubmitButtonLoading(false);
    return;
  }

  let tracking = "RW" + Date.now();

  let photoData = "";
  try {
    photoData = await readPhotoAsDataUrl();
  } catch (error) {
    alert(error.message || "Unable to read photo before submitting.");
    isSubmittingReport = false;
    setSubmitButtonLoading(false);
    return;
  }

  const reportPayload = {
    tracking,
    lastname: document.getElementById("lastname").value,
    firstname: document.getElementById("firstname").value,
    mi: document.getElementById("mi").value,
    email: reporterEmail,
    phone: document.getElementById("phone").value,
    reporterProvince: document.getElementById("reporterProvince")?.value || "",
    reporterCity: document.getElementById("reporterCity")?.value || "",
    reporterBarangay: document.getElementById("reporterBarangay")?.value || "",
    reporterStreetAddress: document.getElementById("reporterStreetAddress")?.value || "",
    location: document.getElementById("locationText").value,
    issue: document.getElementById("issue").value,
    issueCategory,
    issueType,
    issueTypeOption: issueTypeSelect?.value || "",
    lat: lat || "",
    lng: lng || "",
    photo: photoData,
    ...collectEnhancedRoadInfo()
  };

  const formUrlEncoded = new URLSearchParams(reportPayload);

  const submitEndpoints = [API_URL];

  const trySubmit = async () => {
    let lastError;
    let corsBlocked = false;
    let corsBlockedEndpoint = "";
    let requiresVerification = false;

    for (const endpoint of submitEndpoints) {
      try {
        if (isCrossOriginEndpoint(endpoint)) {
          await submitCrossOriginViaNoCors(endpoint, formUrlEncoded);
          requiresVerification = true;
          return { body: "", requiresVerification };
        }

        const response = await fetch(endpoint, {
          method: "POST",
          body: formUrlEncoded,
          redirect: "follow"
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return { body: await response.text(), requiresVerification };
      } catch (error) {
        if (isLikelyCorsBlockedRequest(endpoint, error)) {
          try {
            await submitCrossOriginViaNoCors(endpoint, formUrlEncoded);
            requiresVerification = true;
            return { body: "", requiresVerification };
          } catch (noCorsError) {
            await submitCrossOriginViaHiddenForm(endpoint, formUrlEncoded);
            requiresVerification = true;
            return { body: "", requiresVerification };
          }
        }

        lastError = error;
      }

      try {
        const submitViaGetParams = new URLSearchParams(formUrlEncoded);
        submitViaGetParams.set("action", "submit");
        const submitViaGetEndpoint = `${endpoint}?${submitViaGetParams.toString()}`;
        await loadJsonp(submitViaGetEndpoint);
        requiresVerification = true;
        return { body: "", requiresVerification };
      } catch (error) {
        if (isLikelyCorsBlockedRequest(endpoint, error)) {
          corsBlocked = true;
          corsBlockedEndpoint = endpoint;
          lastError = error;
          break;
        }
        lastError = error;
      }
    }

    if (corsBlocked) {
      const corsError = new Error(buildCorsErrorMessage(corsBlockedEndpoint));
      reportCorsTroubleshootingContext();
      throw corsError;
    }
    if (lastError instanceof TypeError) throw new Error(buildNetworkErrorMessage());
    throw lastError || new Error("Unable to submit report");
  };

  try {
    const result = await trySubmit();
    const res = result?.body || "";
    let payload = null;
    if (res) {
      try {
        payload = JSON.parse(res);
      } catch (error) {
        payload = null;
      }

      if (payload && payload.success === false) {
        throw new Error(payload.error || "Submission failed.");
      }
    }

    if (result?.requiresVerification) {
      const isVerified = await verifySubmittedReport(tracking);
      if (isVerified === false) {
        throw new Error("Report submission could not be confirmed in Google Sheets yet. Please check your Apps Script deployment and try again.");
      }
      if (isVerified === null) {
        console.warn("Skipping strict submission verification because report lookup is temporarily unavailable.");
      }
    }

    const submittedAt = new Date();
    const submittedDateTime = submittedAt.toLocaleString("en-PH", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    document.getElementById("trackInfo").innerText = tracking;
    document.getElementById("submissionTimeInfo").innerText = `Submitted on ${submittedDateTime}`;
    document.getElementById("copyFeedback").innerText = "";
    const emailDeliveryInfo = document.getElementById("emailDeliveryInfo");
    if (emailDeliveryInfo) {
      if (payload?.emailSent === false) {
        const emailErrorMessage = (payload.emailError || "We saved your report, but we could not send the confirmation email.").trim();
        emailDeliveryInfo.innerText = `Report saved, but the confirmation email was not sent: ${emailErrorMessage}`;
      } else if (payload?.emailSent === true) {
        emailDeliveryInfo.innerText = `A confirmation email was sent to ${reporterEmail}.`;
      } else {
        emailDeliveryInfo.innerText = "Your report was saved. If the confirmation email does not arrive soon, please use the reference number above to track it.";
      }
    }
    cacheLocalSubmission({ ...reportPayload, timestamp: submittedAt.toISOString() });
    cachedReports = [];
    loadStatistics();
    document.getElementById("popup").classList.add("show");
  } catch (err) {
    console.error(err);
    alert(err.message || "Submission failed. Check your API or internet connection.");
  } finally {
    isSubmittingReport = false;
    setSubmitButtonLoading(false);
  }
}

function copyTrackingNumber() {
  const trackInfo = document.getElementById("trackInfo");
  const copyFeedback = document.getElementById("copyFeedback");
  const trackingNumber = trackInfo?.innerText?.trim() || "";

  if (!trackingNumber) {
    if (copyFeedback) copyFeedback.innerText = "No reference number to copy yet.";
    return;
  }

  navigator.clipboard.writeText(trackingNumber)
    .then(() => {
      if (copyFeedback) copyFeedback.innerText = "Reference number copied.";
    })
    .catch(() => {
      if (copyFeedback) copyFeedback.innerText = "Copy failed. Please copy it manually.";
    });
}

// Hide popup
function closePopup() {
  document.getElementById("popup").classList.remove("show");
  showPage('home');
  resetForm();
}

function newReport() {
  document.getElementById("popup").classList.remove("show");
  resetForm();
  showPage('submit');
}
// Reset the form
function resetForm() {
  document.querySelectorAll("#submit input,#submit textarea,#submit select").forEach(el => {
    el.value = "";
    clearFieldInvalidState(el);
  });
  document.querySelectorAll('input[name="issueCategory"]').forEach(option => {
    option.checked = false;
  });
  updateIssueTypeOptionsByCategory("");
  clearFieldInvalidState(document.querySelector('.report-category-group'));
  clearFieldInvalidState(document.getElementById('reportMap'));
  document.getElementById("selectedLocation").innerText = "No location selected";
  const trackInfo = document.getElementById("trackInfo");
  const submissionTimeInfo = document.getElementById("submissionTimeInfo");
  const copyFeedback = document.getElementById("copyFeedback");
  const emailDeliveryInfo = document.getElementById("emailDeliveryInfo");
  if (trackInfo) trackInfo.innerText = "";
  if (submissionTimeInfo) submissionTimeInfo.innerText = "";
  if (copyFeedback) copyFeedback.innerText = "";
  if (emailDeliveryInfo) emailDeliveryInfo.innerText = "";
  lat = 0;
  lng = 0;
  setCoordinateDisplay(null, null);
  if (marker && map) map.removeLayer(marker);
  document.getElementById("photoPreview").style.display = "none";
  updateIssueCharacterCount();
}

function hasValidCoordinates(report) {
  const reportLat = parseFloat(report?.lat);
  const reportLng = parseFloat(report?.lng);

  if (!Number.isFinite(reportLat) || !Number.isFinite(reportLng)) return false;
  if (reportLat < -90 || reportLat > 90) return false;
  if (reportLng < -180 || reportLng > 180) return false;
  if (reportLat === 0 && reportLng === 0) return false;

  return true;
}
