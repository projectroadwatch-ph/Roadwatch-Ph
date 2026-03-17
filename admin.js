const ADMIN_USERNAME = "roadwatchph";
const ADMIN_PASSWORD = "roadwatchph";
const ADMIN_SESSION_KEY = "roadwatchAdminAuthed";
const API_URL = "https://script.google.com/macros/s/AKfycbz5Z666xxZThJsMGwPCDNg8Vdku-WfQmZHeQHM6Rko4YLwnnpViqTAMX2UfBbUyk_u1/exec";
const HOME_API_URL = "https://script.google.com/macros/s/AKfycbzqpHKNyPUTsRPd4UKVVu8M1EH1xRK6io3eYoefMRGhNA0sfHaRlgeRlZSWfH8dQoFx/exec";
const ADMIN_STATUS_OVERRIDES_KEY = "roadwatchAdminStatusOverrides";
const ADMIN_DELETED_REPORTS_KEY = "roadwatchAdminDeletedReports";

const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const reportsBody = document.getElementById("reportsBody");
const reportSearch = document.getElementById("reportSearch");
const statusFilter = document.getElementById("statusFilter");
const filterSummary = document.getElementById("filterSummary");

let allReports = [];
let pendingStatusUpdates = 0;


function buildJsonpEndpoint(endpoint) {
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${endpoint}${separator}callback=roadwatchAdminJsonpCallback`;
}

function loadJsonp(endpoint) {
  return new Promise((resolve, reject) => {
    const callbackName = "roadwatchAdminJsonpCallback";
    const cleanup = () => {
      const existing = document.getElementById(callbackName);
      if (existing) existing.remove();
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
    script.id = callbackName;
    script.src = buildJsonpEndpoint(endpoint);
    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("JSONP request failed."));
    };

    document.head.appendChild(script);
  });
}

function isLikelyCorsBlockedRequest(endpoint, error) {
  if (!(error instanceof TypeError)) return false;

  try {
    return new URL(endpoint).origin !== window.location.origin;
  } catch {
    return false;
  }
}

async function fetchApiPayload(endpoint) {
  try {
    const response = await fetch(endpoint, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    if (!text) return {};

    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    if (!isLikelyCorsBlockedRequest(endpoint, error)) throw error;
    return loadJsonp(endpoint);
  }
}

function parseReports(payload) {
  if (typeof payload === "string") {
    const trimmed = payload.trim();
    if (!trimmed) return [];

    try {
      return parseReports(JSON.parse(trimmed));
    } catch {
      return [];
    }
  }

  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.reports)) return payload.reports;
  if (payload && Array.isArray(payload.data)) return payload.data;
  if (payload && Array.isArray(payload.items)) return payload.items;
  return [];
}

function setFeedback(id, message, isError = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#ffadb3" : "#9ce9ab";
}



function setTableLoadingState(isLoading, message = "") {
  const el = document.getElementById("tableLoadingState");
  if (!el) return;
  el.hidden = !isLoading;
  el.textContent = message || "Saving update...";
}

function drawStatusChart(counts) {
  const canvas = document.getElementById("statusChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 960;
  const cssHeight = 280;

  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const bars = [
    { label: "Pending", value: counts.pending, color: "#ffd166" },
    { label: "Verified", value: counts.verified, color: "#4fc3f7" },
    { label: "In Progress", value: counts.inProgress, color: "#b388ff" },
    { label: "Repaired", value: counts.repaired, color: "#63e6be" }
  ];

  const max = Math.max(...bars.map((b) => b.value), 1);
  const padding = { top: 24, right: 20, bottom: 52, left: 24 };
  const chartWidth = cssWidth - padding.left - padding.right;
  const chartHeight = cssHeight - padding.top - padding.bottom;
  const barWidth = Math.min(92, chartWidth / bars.length - 24);
  const gap = (chartWidth - barWidth * bars.length) / (bars.length + 1);

  ctx.fillStyle = "rgba(189, 217, 248, 0.2)";
  ctx.fillRect(padding.left, padding.top + chartHeight, chartWidth, 1);

  ctx.font = "600 12px Inter";
  ctx.textAlign = "center";

  bars.forEach((bar, index) => {
    const x = padding.left + gap + index * (barWidth + gap);
    const barHeight = Math.round((bar.value / max) * (chartHeight - 8));
    const y = padding.top + chartHeight - barHeight;

    ctx.fillStyle = bar.color;
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = "#e9f4ff";
    ctx.fillText(String(bar.value), x + barWidth / 2, y - 8);

    ctx.fillStyle = "#bdd9f8";
    ctx.fillText(bar.label, x + barWidth / 2, cssHeight - 22);
  });
}

function getStatusOverrides() {
  try {
    const raw = localStorage.getItem(ADMIN_STATUS_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveStatusOverrides(overrides) {
  localStorage.setItem(ADMIN_STATUS_OVERRIDES_KEY, JSON.stringify(overrides || {}));
}

function persistStatusOverride(tracking, status) {
  const key = String(tracking || "").trim();
  if (!key) return;

  const overrides = getStatusOverrides();
  overrides[key] = status;
  saveStatusOverrides(overrides);
}

function clearStatusOverride(tracking) {
  const key = String(tracking || "").trim();
  if (!key) return;

  const overrides = getStatusOverrides();
  delete overrides[key];

  Object.keys(overrides).forEach((overrideKey) => {
    if (overrideKey.trim().toLowerCase() === key.toLowerCase()) {
      delete overrides[overrideKey];
    }
  });

  saveStatusOverrides(overrides);
}

function getDeletedReports() {
  try {
    const raw = localStorage.getItem(ADMIN_DELETED_REPORTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveDeletedReports(list) {
  localStorage.setItem(ADMIN_DELETED_REPORTS_KEY, JSON.stringify(Array.from(new Set(list))));
}

function markReportDeleted(tracking) {
  const key = String(tracking || "").trim();
  if (!key) return;

  const list = getDeletedReports();
  list.push(key);
  saveDeletedReports(list);
}

function shouldHideReport(tracking) {
  const key = String(tracking || "").trim().toLowerCase();
  if (!key) return false;
  return getDeletedReports().some((item) => String(item).trim().toLowerCase() === key);
}

function dedupeReports(reports) {
  const seen = new Set();
  const deduped = [];

  reports.forEach((report, index) => {
    const tracking = String(report?.tracking || "").trim();
    const key = tracking
      ? `tracking:${tracking.toLowerCase()}`
      : `fallback:${String(report?.dateTime || "").trim().toLowerCase()}|${String(report?.name || "").trim().toLowerCase()}|${String(report?.location || "").trim().toLowerCase()}|${String(report?.issue || "").trim().toLowerCase()}|${index}`;

    if (seen.has(key)) return;
    seen.add(key);
    deduped.push(report);
  });

  return deduped;
}

function applyLocalStatusOverrides(report) {
  const tracking = String(report?.tracking || "").trim();
  if (!tracking) return report;

  const overrides = getStatusOverrides();
  const direct = overrides[tracking];
  if (direct) return { ...report, status: normalizeStatus(direct) };

  const match = Object.keys(overrides).find((key) => key.trim().toLowerCase() === tracking.toLowerCase());
  if (!match) return report;

  return { ...report, status: normalizeStatus(overrides[match]) };
}

function applyAuthUI() {
  const isAuthed = localStorage.getItem(ADMIN_SESSION_KEY) === "true";
  loginPanel.classList.toggle("hidden", isAuthed);
  dashboard.classList.toggle("hidden", !isAuthed);
  if (isAuthed) {
    loadReports();
  }
}

function login() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    setFeedback("loginFeedback", "Login successful.");
    applyAuthUI();
    return;
  }

  setFeedback("loginFeedback", "Invalid username or password.", true);
}

function logout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  applyAuthUI();
}

function normalizeKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
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

function formatDateTime(record) {
  const dateValue = getFieldValue(record, ["date", "Date", "reportDate", "reportedDate", "createdDate"]);
  const timeValue = getFieldValue(record, ["time", "Time", "reportTime", "reportedTime", "createdTime"]);
  const timestampValue = getFieldValue(record, [
    "timestamp",
    "Timestamp",
    "submittedAt",
    "createdAt",
    "datetime",
    "dateTime",
    "Date Time",
    "submissionTime",
    "Submission Time"
  ]);

  const rawValue = timestampValue || `${dateValue || ""} ${timeValue || ""}`.trim();
  if (!rawValue) return "-";

  const parsed = new Date(rawValue);
  if (Number.isNaN(parsed.getTime())) return String(rawValue).trim();

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

function normalizeStatus(status) {
  const raw = String(status || "").trim().toLowerCase();
  if (raw === "verified") return "Verified";
  if (raw === "in progress" || raw === "inprogress") return "In Progress";
  if (raw === "repaired") return "Repaired";
  return "Pending";
}

function normalizeReport(record = {}) {
  return {
    dateTime: formatDateTime(record),
    tracking: getFieldValue(record, ["tracking", "trackingNumber", "tracking_no", "Tracking #", "Tracking Number"]),
    name: [
      getFieldValue(record, ["firstname", "firstName", "First Name"]),
      getFieldValue(record, ["lastname", "lastName", "Last Name"])
    ].filter(Boolean).join(" ") || getFieldValue(record, ["name", "fullName", "Reporter Name"]) || "-",
    location: getFieldValue(record, ["location", "address", "road", "Road Location"]) || "-",
    issue: getFieldValue(record, [
      "issue",
      "issueDetail",
      "issueDetails",
      "Issue",
      "Issue Detail",
      "Issue Details",
      "description",
      "details"
    ]) || "-",
    photo: getFieldValue(record, ["photo", "image", "photoUrl", "Photo"]) || "",
    status: normalizeStatus(getFieldValue(record, ["status", "reportStatus", "Status"]))
  };
}

async function postStatusUpdateToEndpoint(endpointBase, tracking, status) {
  const body = new URLSearchParams({
    action: "updateStatus",
    tracking: String(tracking || "").trim(),
    status
  });

  let payload = {};

  try {
    const response = await fetch(endpointBase, { method: "POST", body });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        payload = {};
      }
    }
  } catch (error) {
    if (!isLikelyCorsBlockedRequest(endpointBase, error)) throw error;
    const endpoint = `${endpointBase}?action=updateStatus&tracking=${encodeURIComponent(String(tracking || "").trim())}&status=${encodeURIComponent(status)}`;
    payload = await loadJsonp(endpoint);
  }

  return payload;
}

async function updateReportStatus(tracking, status) {
  const endpoints = [API_URL, HOME_API_URL];
  let hasAnySuccess = false;

  for (const endpoint of endpoints) {
    try {
      const payload = await postStatusUpdateToEndpoint(endpoint, tracking, status);
      if (payload?.success || Object.keys(payload || {}).length === 0) {
        hasAnySuccess = true;
        break;
      }
    } catch {
      // Try next endpoint.
    }
  }

  if (!hasAnySuccess) {
    throw new Error("Unable to update report status.");
  }

  persistStatusOverride(tracking, status);
  return { success: true };
}

async function deleteReport(tracking) {
  const trackingValue = String(tracking || "").trim();
  if (!trackingValue) throw new Error("Invalid tracking number.");

  const endpoints = [API_URL, HOME_API_URL];
  let hasAnySuccess = false;

  for (const endpointBase of endpoints) {
    try {
      const body = new URLSearchParams({ action: "deleteReport", tracking: trackingValue });
      const response = await fetch(endpointBase, { method: "POST", body });
      if (response.ok) {
        const text = await response.text();
        const payload = text ? JSON.parse(text) : {};
        if (payload?.success || Object.keys(payload).length === 0) {
          hasAnySuccess = true;
          break;
        }
      }
    } catch {
      // fall through
    }
  }

  if (!hasAnySuccess) {
    throw new Error("Unable to delete report.");
  }

  markReportDeleted(trackingValue);
  clearStatusOverride(trackingValue);
  return { success: true };
}

function statusSelect(current, tracking) {
  const select = document.createElement("select");
  select.className = "status-select";
  ["Pending", "Verified", "In Progress", "Repaired"].forEach((label) => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    option.selected = current === label;
    select.appendChild(option);
  });

  select.addEventListener("change", async () => {
    const nextStatus = select.value;
    const previousStatus = select.dataset.previous || current;
    select.disabled = true;
    select.classList.add("is-updating");
    pendingStatusUpdates += 1;
    setTableLoadingState(true, `Saving status update for ${tracking}...`);

    try {
      await updateReportStatus(tracking, nextStatus);
      select.dataset.previous = nextStatus;

      const report = allReports.find((item) => String(item.tracking) === String(tracking));
      if (report) report.status = nextStatus;

      setFeedback("reportsFeedback", `Updated ${tracking} to ${nextStatus}.`);
      applyFiltersAndRender();
    } catch (error) {
      select.value = previousStatus;
      setFeedback("reportsFeedback", error.message || "Unable to save status update.", true);
    } finally {
      select.disabled = false;
      select.classList.remove("is-updating");
      pendingStatusUpdates = Math.max(0, pendingStatusUpdates - 1);
      if (pendingStatusUpdates === 0) setTableLoadingState(false);
    }
  });

  select.dataset.previous = current;
  return select;
}

function photoCell(photo) {
  if (!photo) return "-";
  const safeUrl = String(photo).trim();
  if (!safeUrl) return "-";

  const isImageData = safeUrl.startsWith("data:image");
  const isHttp = /^https?:\/\//i.test(safeUrl);
  if (!isImageData && !isHttp) return "Uploaded";

  const anchor = document.createElement("a");
  anchor.href = safeUrl;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.className = "reportPhotoThumb";
  img.src = safeUrl;
  img.alt = "Report photo";
  anchor.appendChild(img);

  return anchor;
}

function renderAnalytics(reports) {
  const counts = {
    total: reports.length,
    pending: 0,
    verified: 0,
    inProgress: 0,
    repaired: 0
  };

  reports.forEach((report) => {
    const normalized = normalizeStatus(report.status).toLowerCase();
    if (normalized === "pending") counts.pending += 1;
    if (normalized === "verified") counts.verified += 1;
    if (normalized === "in progress") counts.inProgress += 1;
    if (normalized === "repaired") counts.repaired += 1;
  });

  document.getElementById("totalReportsCount").textContent = counts.total;
  document.getElementById("pendingReportsCount").textContent = counts.pending;
  document.getElementById("verifiedReportsCount").textContent = counts.verified;
  document.getElementById("inProgressReportsCount").textContent = counts.inProgress;
  document.getElementById("repairedReportsCount").textContent = counts.repaired;
  drawStatusChart(counts);
}

function getFilteredReports() {
  const query = reportSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;

  return allReports.filter((report) => {
    const statusPass = selectedStatus === "all" || normalizeStatus(report.status) === selectedStatus;
    if (!statusPass) return false;

    if (!query) return true;
    const haystack = [report.dateTime, report.tracking, report.name, report.location, report.issue].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function renderRows(reports) {
  if (reports.length === 0) {
    reportsBody.innerHTML = '<tr><td colspan="8">No reports match your current filters.</td></tr>';
    return;
  }

  reportsBody.innerHTML = "";

  reports.forEach((report) => {
    const tr = document.createElement("tr");
    const effectiveStatus = normalizeStatus(report.status);

    tr.innerHTML = `
      <td>${report.dateTime || "-"}</td>
      <td>${report.tracking || "-"}</td>
      <td>${report.name}</td>
      <td>${report.location}</td>
      <td>${report.issue}</td>
      <td></td>
      <td></td>
      <td></td>
    `;

    const photoElement = photoCell(report.photo);
    if (typeof photoElement === "string") {
      tr.children[5].textContent = photoElement;
    } else {
      tr.children[5].appendChild(photoElement);
    }

    tr.children[6].appendChild(statusSelect(effectiveStatus, report.tracking));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary slim";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      const confirmed = window.confirm(`Delete report ${report.tracking}? This cannot be undone.`);
      if (!confirmed) return;

      deleteBtn.disabled = true;
      try {
        await deleteReport(report.tracking);
        allReports = allReports.filter((item) => String(item.tracking) !== String(report.tracking));
        setFeedback("reportsFeedback", `Deleted ${report.tracking}.`);
        applyFiltersAndRender();
      } catch (error) {
        setFeedback("reportsFeedback", error.message || "Unable to delete report.", true);
      } finally {
        deleteBtn.disabled = false;
      }
    });
    tr.children[7].appendChild(deleteBtn);

    reportsBody.appendChild(tr);
  });
}

function applyFiltersAndRender() {
  const filtered = getFilteredReports();
  renderRows(filtered);
  renderAnalytics(allReports);
  filterSummary.textContent = `Showing ${filtered.length} of ${allReports.length} report(s).`;
}

async function loadReports() {
  reportsBody.innerHTML = '<tr><td colspan="8">Loading reports...</td></tr>';
  setTableLoadingState(true, "Loading latest reports...");

  try {
    const payload = await fetchApiPayload(`${API_URL}?action=getReports`);

    allReports = dedupeReports(
      parseReports(payload)
      .map(normalizeReport)
      .map(applyLocalStatusOverrides)
      .filter((report) => !shouldHideReport(report.tracking))
    );
    if (allReports.length === 0) {
      reportsBody.innerHTML = '<tr><td colspan="8">No reports found.</td></tr>';
      renderAnalytics([]);
      filterSummary.textContent = "No records to filter.";
      setTableLoadingState(false);
      return;
    }

    applyFiltersAndRender();
    setFeedback("reportsFeedback", `Loaded ${allReports.length} report(s).`);
  } catch (error) {
    reportsBody.innerHTML = '<tr><td colspan="8">Unable to load reports right now.</td></tr>';
    renderAnalytics([]);
    filterSummary.textContent = "";
    setFeedback("reportsFeedback", error.message, true);
  } finally {
    if (pendingStatusUpdates === 0) setTableLoadingState(false);
  }
}


document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("refreshReportsBtn").addEventListener("click", loadReports);
document.getElementById("clearFiltersBtn").addEventListener("click", () => {
  reportSearch.value = "";
  statusFilter.value = "all";
  applyFiltersAndRender();
});
reportSearch.addEventListener("input", applyFiltersAndRender);
statusFilter.addEventListener("change", applyFiltersAndRender);
window.addEventListener("resize", () => renderAnalytics(allReports));

applyAuthUI();
