const DEFAULT_ADMIN_CREDENTIALS = { username: "roadwatchph", password: "roadwatchph" };
const ADMIN_SESSION_KEY = "roadwatchAdminAuthed";
const API_URL = "https://script.google.com/macros/s/AKfycbxZ7aoLwshceT4N_BCgOmYxkW6IL2Y-w0bF5ArLuOxehNBJl_PW05ze6RbYfB8E4JZ1/exec";
const HOME_API_URL = "https://script.google.com/macros/s/AKfycbxZ7aoLwshceT4N_BCgOmYxkW6IL2Y-w0bF5ArLuOxehNBJl_PW05ze6RbYfB8E4JZ1/exec";
const PUBLIC_SITE_API_URL = "https://script.google.com/macros/s/AKfycbxZ7aoLwshceT4N_BCgOmYxkW6IL2Y-w0bF5ArLuOxehNBJl_PW05ze6RbYfB8E4JZ1/exec";
const ADMIN_CASE_META_KEY = "roadwatchAdminCaseMeta";
const ADMIN_AUDIT_TRAIL_KEY = "roadwatchAdminAuditTrail";
const ADMIN_CASE_TIMELINE_KEY = "roadwatchAdminCaseTimeline";
const ADMIN_NOTIFICATION_QUEUE_KEY = "roadwatchAdminNotificationQueue";
const ADMIN_PROJECTS_KEY = "roadwatchAdminProjects";
const ADMIN_STATUS_OVERRIDES_KEY = "roadwatchAdminStatusOverrides";

const loginPanel = document.getElementById("loginPanel");
const dashboard = document.getElementById("dashboard");
const reportsBody = document.getElementById("reportsBody");
const reportSearch = document.getElementById("reportSearch");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const barangayFilter = document.getElementById("barangayFilter");
const qualityFilter = document.getElementById("qualityFilter");
const triagePreset = document.getElementById("triagePreset");
const filterSummary = document.getElementById("filterSummary");
const activeFilterChips = document.getElementById("activeFilterChips");
const urgencyThresholdDays = document.getElementById("urgencyThresholdDays");
const priorityQueueList = document.getElementById("priorityQueueList");
const verificationQueueList = document.getElementById("verificationQueueList");
const verificationFilter = document.getElementById("verificationFilter");
const slaQueueList = document.getElementById("slaQueueList");
const slaFilter = document.getElementById("slaFilter");
const reportingRange = document.getElementById("reportingRange");
const reportingSummary = document.getElementById("reportingSummary");
const analyticsBarangayFilter = document.getElementById("analyticsBarangayFilter");
const analyticsIssueTypeFilter = document.getElementById("analyticsIssueTypeFilter");
const analyticsSeverityFilter = document.getElementById("analyticsSeverityFilter");
const analyticsTimelineSummary = document.getElementById("analyticsTimelineSummary");
const hotspotHeatmap = document.getElementById("hotspotHeatmap");
const overviewPinMap = document.getElementById("overviewPinMap");
const overviewMapSummary = document.getElementById("overviewMapSummary");
const overviewQueueBody = document.getElementById("overviewQueueBody");
const aiRecommendations = document.getElementById("aiRecommendations");
const aiAutopilotSummary = document.getElementById("aiAutopilotSummary");
const auditTrailList = document.getElementById("auditTrailList");
const teamPerformanceBoard = document.getElementById("teamPerformanceBoard");
const timelineTrackingSelect = document.getElementById("timelineTrackingSelect");
const timelineNoteInput = document.getElementById("timelineNoteInput");
const caseTimelineList = document.getElementById("caseTimelineList");
const timelineSummary = document.getElementById("timelineSummary");
const overviewView = document.getElementById("overviewView");
const managementView = document.getElementById("managementView");
const showOverviewBtn = document.getElementById("showOverviewBtn");
const showManagementBtn = document.getElementById("showManagementBtn");
const triagePane = document.getElementById("triagePane");
const workspacePane = document.getElementById("workspacePane");
const showTriagePaneBtn = document.getElementById("showTriagePaneBtn");
const showWorkspacePaneBtn = document.getElementById("showWorkspacePaneBtn");
const openTriageFromOverviewBtn = document.getElementById("openTriageFromOverviewBtn");
const openTriageShortcutBtn = document.getElementById("openTriageShortcutBtn");
const focusUrgentShortcutBtn = document.getElementById("focusUrgentShortcutBtn");
const syncDataShortcutBtn = document.getElementById("syncDataShortcutBtn");
const paginationSummary = document.getElementById("paginationSummary");
const prevPageBtn = document.getElementById("prevPageBtn");
const nextPageBtn = document.getElementById("nextPageBtn");
const operationsView = document.getElementById("operationsView");
const showOperationsBtn = document.getElementById("showOperationsBtn");
const executiveSummary = document.getElementById("executiveSummary");
const forecastRange = document.getElementById("forecastRange");
const forecastCards = document.getElementById("forecastCards");
const duplicateCaseBoard = document.getElementById("duplicateCaseBoard");
const projectNameInput = document.getElementById("projectNameInput");
const projectOwnerSelect = document.getElementById("projectOwnerSelect");
const projectBudgetInput = document.getElementById("projectBudgetInput");
const projectPortfolio = document.getElementById("projectPortfolio");
const moderationBoard = document.getElementById("moderationBoard");
const rootCauseBoard = document.getElementById("rootCauseBoard");
const fieldOpsBoard = document.getElementById("fieldOpsBoard");
const trustCenterBoard = document.getElementById("trustCenterBoard");
const notificationTemplateSelect = document.getElementById("notificationTemplateSelect");
const publicEtaInput = document.getElementById("publicEtaInput");
const notificationMessageInput = document.getElementById("notificationMessageInput");
const queueNotificationBtn = document.getElementById("queueNotificationBtn");
const notificationQueueList = document.getElementById("notificationQueueList");
const closureProofInput = document.getElementById("closureProofInput");
const closureDetailsInput = document.getElementById("closureDetailsInput");
const saveClosureBtn = document.getElementById("saveClosureBtn");
const closureChecklist = document.getElementById("closureChecklist");
const roleFilterSelect = document.getElementById("roleFilterSelect");
const mentionInput = document.getElementById("mentionInput");
const saveCollabNoteBtn = document.getElementById("saveCollabNoteBtn");
const permissionsSummary = document.getElementById("permissionsSummary");
const createProjectBtn = document.getElementById("createProjectBtn");
const sheetSyncStatus = document.getElementById("sheetSyncStatus");
const retrySyncBtn = document.getElementById("retrySyncBtn");
const dashboardSearch = document.getElementById("dashboardSearch");
const adminIdentityChip = document.getElementById("adminIdentityChip");
const urgentOnlyToggleBtn = document.getElementById("urgentOnlyToggleBtn");
const bulkStatusValue = document.getElementById("bulkStatusValue");
const applyBulkStatusBtn = document.getElementById("applyBulkStatusBtn");
const clearSelectionBtn = document.getElementById("clearSelectionBtn");
const selectionSummary = document.getElementById("selectionSummary");
const managementFilteredCount = document.getElementById("managementFilteredCount");
const managementUrgentCount = document.getElementById("managementUrgentCount");
const managementVerificationCount = document.getElementById("managementVerificationCount");
const managementSelectedCount = document.getElementById("managementSelectedCount");

let allReports = [];
let pendingStatusUpdates = 0;
const selectedReports = new Set();
const flaggedReports = new Set();
const REPORTS_PER_PAGE = 15;
let currentPage = 1;
let overviewMap = null;
let overviewMarkers = null;
let activeReportsSource = "";
let urgentOnlyMode = false;

const REPORT_ENDPOINTS = [
  { url: API_URL, label: "Admin primary Google Sheet endpoint" },
  { url: HOME_API_URL, label: "Admin backup Google Sheet endpoint" },
  { url: PUBLIC_SITE_API_URL, label: "Public website Google Sheet" }
];
const STATUS_OPTIONS = ["Pending", "Verified", "In Progress", "Repaired"];

function getStatusWriteEndpoints() {
  return Array.from(new Set([API_URL, HOME_API_URL, PUBLIC_SITE_API_URL]));
}


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
  const toObjectRows = (rows) => {
    if (!Array.isArray(rows) || rows.length === 0) return [];
    if (!Array.isArray(rows[0])) return rows;

    const headers = rows[0].map((header) => String(header || "").trim());
    return rows.slice(1)
      .filter((row) => Array.isArray(row) && row.some((value) => String(value || "").trim() !== ""))
      .map((row) => {
        const record = {};
        headers.forEach((header, index) => {
          if (!header) return;
          record[header] = row[index];
        });
        return record;
      });
  };

  if (typeof payload === "string") {
    const trimmed = payload.trim();
    if (!trimmed) return [];

    try {
      return parseReports(JSON.parse(trimmed));
    } catch {
      return [];
    }
  }

  if (Array.isArray(payload)) return toObjectRows(payload);
  if (payload && Array.isArray(payload.reports)) return toObjectRows(payload.reports);
  if (payload && Array.isArray(payload.data)) return toObjectRows(payload.data);
  if (payload && Array.isArray(payload.items)) return toObjectRows(payload.items);
  if (payload && Array.isArray(payload.rows)) return toObjectRows(payload.rows);
  if (payload && Array.isArray(payload.values)) return toObjectRows(payload.values);
  return [];
}

function setFeedback(id, message, isError = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#ffadb3" : "#9ce9ab";
}

function setSheetSyncStatus(message, state = "warn") {
  if (!sheetSyncStatus) return;
  sheetSyncStatus.textContent = message;
  sheetSyncStatus.dataset.state = state;
}

function renderAdminIdentity() {
  if (!adminIdentityChip) return;
  const activeUser = String(localStorage.getItem("roadwatchAdminActiveUser") || "Admin").trim() || "Admin";
  adminIdentityChip.textContent = activeUser;
  adminIdentityChip.title = `Signed in as ${activeUser}`;
}

function syncSearchInputs(source = "workspace") {
  if (!dashboardSearch || !reportSearch) return;
  if (source === "topbar") {
    reportSearch.value = dashboardSearch.value;
  } else {
    dashboardSearch.value = reportSearch.value;
  }
}

function setUrgentOnlyMode(nextValue) {
  urgentOnlyMode = Boolean(nextValue);
  if (!urgentOnlyToggleBtn) return;
  urgentOnlyToggleBtn.setAttribute("aria-pressed", String(urgentOnlyMode));
  urgentOnlyToggleBtn.textContent = `Urgent only: ${urgentOnlyMode ? "On" : "Off"}`;
}

function getActiveFilterDescriptors() {
  const descriptors = [];
  const searchValue = (reportSearch?.value || "").trim();
  if (searchValue) descriptors.push({ key: "search", label: `Search: ${searchValue}` });

  if (statusFilter?.value && statusFilter.value !== "all") {
    descriptors.push({ key: "status", label: `Status: ${statusFilter.value}` });
  }

  if (categoryFilter?.value && categoryFilter.value !== "all") {
    descriptors.push({ key: "category", label: `Category: ${categoryFilter.value}` });
  }

  if (barangayFilter?.value && barangayFilter.value !== "all") {
    descriptors.push({ key: "barangay", label: `Barangay: ${barangayFilter.value}` });
  }

  if (qualityFilter?.value && qualityFilter.value !== "all") {
    const qualityLabels = {
      high: "High (80-100)",
      medium: "Medium (50-79)",
      low: "Low (0-49)"
    };
    descriptors.push({ key: "quality", label: `Data Quality: ${qualityLabels[qualityFilter.value] || qualityFilter.value}` });
  }

  if (triagePreset?.value && triagePreset.value !== "all") {
    const option = triagePreset.options[triagePreset.selectedIndex];
    descriptors.push({ key: "triage", label: `Preset: ${option?.textContent || triagePreset.value}` });
  }

  if (urgentOnlyMode) {
    descriptors.push({ key: "urgent", label: "Urgent only" });
  }

  return descriptors;
}

function clearFilterByKey(key) {
  switch (key) {
    case "search":
      if (reportSearch) reportSearch.value = "";
      syncSearchInputs("workspace");
      break;
    case "status":
      if (statusFilter) statusFilter.value = "all";
      break;
    case "category":
      if (categoryFilter) categoryFilter.value = "all";
      break;
    case "barangay":
      if (barangayFilter) barangayFilter.value = "all";
      break;
    case "quality":
      if (qualityFilter) qualityFilter.value = "all";
      break;
    case "triage":
      if (triagePreset) triagePreset.value = "all";
      break;
    case "urgent":
      setUrgentOnlyMode(false);
      break;
    default:
      break;
  }

  currentPage = 1;
  applyFiltersAndRender();
}

function renderActiveFilterChips() {
  if (!activeFilterChips) return;

  const descriptors = getActiveFilterDescriptors();
  activeFilterChips.innerHTML = "";

  if (descriptors.length === 0) {
    activeFilterChips.hidden = true;
    return;
  }

  activeFilterChips.hidden = false;
  const label = document.createElement("span");
  label.className = "active-filter-chips__label";
  label.textContent = "Active filters:";
  activeFilterChips.appendChild(label);

  descriptors.forEach((descriptor) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "active-filter-chip";
    chip.textContent = `${descriptor.label} ×`;
    chip.setAttribute("aria-label", `Remove ${descriptor.label} filter`);
    chip.addEventListener("click", () => clearFilterByKey(descriptor.key));
    activeFilterChips.appendChild(chip);
  });
}

function formatSyncTime(timestamp) {
  if (!timestamp) return "unknown time";
  return new Date(timestamp).toLocaleString();
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

function getCaseMetaStore() {
  try {
    const raw = localStorage.getItem(ADMIN_CASE_META_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveCaseMetaStore(data) {
  localStorage.setItem(ADMIN_CASE_META_KEY, JSON.stringify(data || {}));
}

function getStatusOverridesStore() {
  try {
    const raw = localStorage.getItem(ADMIN_STATUS_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveStatusOverridesStore(store) {
  localStorage.setItem(ADMIN_STATUS_OVERRIDES_KEY, JSON.stringify(store || {}));
}

function setStatusOverride(tracking, status) {
  const key = String(tracking || "").trim();
  if (!key) return;
  const store = getStatusOverridesStore();
  store[key] = normalizeStatus(status);
  saveStatusOverridesStore(store);
}

function removeStatusOverride(tracking) {
  const key = String(tracking || "").trim();
  if (!key) return;
  const store = getStatusOverridesStore();
  if (!(key in store)) return;
  delete store[key];
  saveStatusOverridesStore(store);
}

function deriveSlaHours(report) {
  const issue = String(report?.issue || "").toLowerCase();
  const issueType = String(report?.issueType || "").toLowerCase();
  const category = String(report?.issueCategory || "").toLowerCase();
  const keywords = `${issue} ${issueType} ${category}`;

  if (keywords.includes("flood")) return 24;
  if (keywords.includes("construction")) return 48;
  if (keywords.includes("pothole")) return 72;
  if (keywords.includes("lane")) return 96;
  return 120;
}

function defaultSlaDueIso(report) {
  const reported = parseReportDate(report);
  if (!reported) return "";
  return new Date(reported.getTime() + (deriveSlaHours(report) * 60 * 60 * 1000)).toISOString();
}

function getCaseMeta(report) {
  const tracking = String(report?.tracking || "").trim();
  const fallback = {
    assignedTo: "Unassigned",
    dueAt: defaultSlaDueIso(report),
    escalationProfile: "Routine",
    publicEta: "",
    publicMessage: "",
    closureProof: "",
    closureDetails: "",
    role: "Super Admin",
    mention: "",
    projectId: "",
    rootCause: "Surface wear",
    verificationChecklist: [],
    repairEvidenceSavedAt: ""
  };
  if (!tracking) return fallback;

  const store = getCaseMetaStore();
  const saved = store[tracking] || {};
  return {
    ...fallback,
    ...saved,
    assignedTo: saved.assignedTo || fallback.assignedTo,
    dueAt: saved.dueAt || fallback.dueAt
  };
}

function updateCaseMeta(tracking, patch = {}) {
  const key = String(tracking || "").trim();
  if (!key) return;
  const store = getCaseMetaStore();
  const current = store[key] || {};
  store[key] = { ...current, ...patch };
  saveCaseMetaStore(store);
}


function getNotificationQueue() {
  try {
    const raw = localStorage.getItem(ADMIN_NOTIFICATION_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotificationQueue(entries) {
  localStorage.setItem(ADMIN_NOTIFICATION_QUEUE_KEY, JSON.stringify((entries || []).slice(0, 100)));
}

function queueNotification(tracking, template, message, eta) {
  const next = [{
    tracking: String(tracking || "").trim(),
    template: String(template || "update").trim(),
    message: String(message || "").trim(),
    eta: String(eta || "").trim(),
    createdAt: new Date().toISOString()
  }, ...getNotificationQueue()];
  saveNotificationQueue(next);
}

function getProjects() {
  try {
    const raw = localStorage.getItem(ADMIN_PROJECTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveProjects(projects) {
  localStorage.setItem(ADMIN_PROJECTS_KEY, JSON.stringify(projects || []));
}

function createProjectFromReports(reports, payload = {}) {
  const trackingList = reports.map((report) => String(report?.tracking || "").trim()).filter(Boolean);
  if (trackingList.length === 0) return null;
  const projectId = `PRJ-${Date.now().toString(36).toUpperCase()}`;
  const project = {
    id: projectId,
    name: String(payload.name || "Road Repair Project").trim(),
    owner: String(payload.owner || "City Engineering Office").trim(),
    budget: String(payload.budget || "TBD").trim(),
    createdAt: new Date().toISOString(),
    trackings: trackingList
  };
  const projects = [project, ...getProjects()].slice(0, 30);
  saveProjects(projects);
  trackingList.forEach((tracking) => updateCaseMeta(tracking, { projectId }));
  return project;
}

function getProjectById(projectId) {
  return getProjects().find((project) => project.id === projectId);
}

function getSeverityLabel(report) {
  const score = getPriorityScore(report);
  if (score >= 85) return "Critical";
  if (score >= 65) return "High";
  if (score >= 40) return "Moderate";
  return "Routine";
}

function getRootCause(report) {
  const keywords = `${report?.issueCategory || ""} ${report?.issueType || ""} ${report?.issue || ""}`.toLowerCase();
  if (keywords.includes("flood") || keywords.includes("drain")) return "Drainage failure";
  if (keywords.includes("construction") || keywords.includes("utility")) return "Utility / construction cut";
  if (keywords.includes("crack") || keywords.includes("pothole")) return "Pavement degradation";
  if (keywords.includes("lane") || keywords.includes("marking")) return "Road marking / visibility";
  return "Surface wear";
}

function getVerificationChecklist(report) {
  return [
    { label: "Photo evidence", done: Boolean(String(report?.photo || "").trim()) },
    { label: "Location captured", done: Boolean(String(report?.location || "").trim() && report.location !== "-") },
    { label: "Coordinates present", done: toNumberOrNull(report?.lat) !== null && toNumberOrNull(report?.lng) !== null },
    { label: "Detailed description", done: String(report?.issue || "").trim().length >= 20 }
  ];
}

function getDuplicateClusters(reports) {
  const groups = new Map();
  reports.forEach((report) => {
    const key = [String(report?.barangay || "").trim().toLowerCase(), String(report?.issueCategory || "").trim().toLowerCase(), String(report?.location || "").trim().toLowerCase().slice(0, 24)].join("|");
    if (!key.replace(/\|/g, "")) return;
    const arr = groups.get(key) || [];
    arr.push(report);
    groups.set(key, arr);
  });
  return Array.from(groups.values()).filter((group) => group.length > 1).sort((a,b)=>b.length-a.length);
}

function getForecastSummary(reports, days) {
  const dated = reports.map((report) => parseReportDate(report)).filter(Boolean);
  if (dated.length === 0) return { projected: 0, backlog: 0, repeatRoads: 0 };
  const sorted = dated.sort((a,b)=>a-b);
  const spanDays = Math.max(1, Math.ceil((sorted[sorted.length-1] - sorted[0]) / 86400000));
  const dailyRate = reports.length / spanDays;
  return {
    projected: Math.round(dailyRate * days),
    backlog: reports.filter((report) => normalizeStatus(report.status) !== "Repaired").length,
    repeatRoads: getDuplicateClusters(reports).length
  };
}

function getAuditTrail() {
  try {
    const raw = localStorage.getItem(ADMIN_AUDIT_TRAIL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAuditTrail(entries) {
  localStorage.setItem(ADMIN_AUDIT_TRAIL_KEY, JSON.stringify((entries || []).slice(0, 100)));
}

function addAuditEntry(action, tracking, details = "") {
  const next = [{
    action,
    tracking: String(tracking || "").trim() || "N/A",
    details: String(details || "").trim(),
    createdAt: new Date().toISOString()
  }, ...getAuditTrail()];
  saveAuditTrail(next);
}

function getCaseTimelineStore() {
  try {
    const raw = localStorage.getItem(ADMIN_CASE_TIMELINE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveCaseTimelineStore(store) {
  localStorage.setItem(ADMIN_CASE_TIMELINE_KEY, JSON.stringify(store || {}));
}

function addTimelineEntry(tracking, eventType, details = "") {
  const key = String(tracking || "").trim();
  if (!key) return;
  const store = getCaseTimelineStore();
  const current = Array.isArray(store[key]) ? store[key] : [];
  current.unshift({
    eventType: String(eventType || "Update").trim(),
    details: String(details || "").trim(),
    createdAt: new Date().toISOString()
  });
  store[key] = current.slice(0, 30);
  saveCaseTimelineStore(store);
}

function getCaseTimeline(tracking) {
  const key = String(tracking || "").trim();
  if (!key) return [];
  const store = getCaseTimelineStore();
  return Array.isArray(store[key]) ? store[key] : [];
}

function getPriorityScore(report) {
  const status = normalizeStatus(report?.status);
  if (status === "Repaired") return 0;

  const qualityScore = getDataQualityScore(report);
  const dataPenalty = Math.max(0, 100 - qualityScore) * 0.2;
  const escalation = getEscalationState(report);
  const escalationWeight = escalation === "Overdue" ? 55 : escalation === "At Risk" ? 30 : 12;
  const reportDate = parseReportDate(report);
  const ageDays = reportDate ? Math.max(0, Math.floor((Date.now() - reportDate.getTime()) / 86400000)) : 0;
  const ageWeight = Math.min(35, ageDays * 2);

  return Math.round(Math.min(100, escalationWeight + ageWeight + dataPenalty));
}

function dedupeReports(reports) {
  const byTracking = new Map();
  const fallbackReports = [];

  reports.forEach((report) => {
    const tracking = String(report?.tracking || "").trim();
    if (!tracking) {
      fallbackReports.push(report);
      return;
    }

    const key = tracking.toLowerCase();
    const existing = byTracking.get(key);
    if (!existing) {
      byTracking.set(key, report);
      return;
    }

    byTracking.set(key, pickPreferredReport(existing, report));
  });

  return [...byTracking.values(), ...fallbackReports];
}

function pickPreferredReport(current, next) {
  const currentStatus = normalizeStatus(current?.status);
  const nextStatus = normalizeStatus(next?.status);
  const currentScore = getReportCompletenessScore(current);
  const nextScore = getReportCompletenessScore(next);
  const currentDate = parseReportDate(current);
  const nextDate = parseReportDate(next);
  const currentTime = currentDate ? currentDate.getTime() : 0;
  const nextTime = nextDate ? nextDate.getTime() : 0;

  if (currentStatus === "Pending" && nextStatus !== "Pending") return next;
  if (nextStatus === "Pending" && currentStatus !== "Pending") return current;

  if (nextScore > currentScore) return next;
  if (currentScore > nextScore) return current;

  if (nextTime > currentTime) return next;
  return current;
}

function getReportCompletenessScore(report) {
  const fields = [
    report?.status,
    report?.issue,
    report?.issueType,
    report?.issueCategory,
    report?.location,
    report?.barangay,
    report?.city,
    report?.lat,
    report?.lng,
    report?.photo
  ];

  return fields.reduce((score, value) => {
    const normalized = String(value || "").trim();
    if (!normalized || normalized === "-") return score;
    return score + 1;
  }, 0);
}

function applyCaseMetadata(report) {
  const meta = getCaseMeta(report);
  return {
    ...report,
    assignedTo: meta.assignedTo || "Unassigned",
    dueAt: meta.dueAt || "",
    escalationProfile: meta.escalationProfile || "Routine",
    publicEta: meta.publicEta || "",
    publicMessage: meta.publicMessage || "",
    closureProof: meta.closureProof || "",
    closureDetails: meta.closureDetails || "",
    role: meta.role || "Super Admin",
    mention: meta.mention || "",
    projectId: meta.projectId || "",
    rootCause: meta.rootCause || getRootCause(report),
    verificationChecklist: Array.isArray(meta.verificationChecklist) && meta.verificationChecklist.length ? meta.verificationChecklist : getVerificationChecklist(report),
    repairEvidenceSavedAt: meta.repairEvidenceSavedAt || ""
  };
}

function setDashboardView(view) {
  const activeView = view === "management" ? "management" : "overview";
  if (overviewView) overviewView.hidden = activeView !== "overview";
  if (managementView) managementView.hidden = activeView !== "management";
  if (operationsView) operationsView.hidden = true;

  showOverviewBtn?.classList.toggle("is-active", activeView === "overview");
  showManagementBtn?.classList.toggle("is-active", activeView === "management");
  showOperationsBtn?.classList.remove("is-active");

  if (activeView === "management") {
    setManagementPane("workspace");
    return;
  }

  window.setTimeout(() => {
    overviewMap?.invalidateSize();
  }, 40);
}

function setManagementPane(pane) {
  const activePane = pane === "triage" ? "triage" : "workspace";

  if (triagePane) triagePane.hidden = activePane !== "triage";
  if (workspacePane) workspacePane.hidden = activePane !== "workspace";

  showTriagePaneBtn?.classList.toggle("is-active", activePane === "triage");
  showWorkspacePaneBtn?.classList.toggle("is-active", activePane === "workspace");
}


function applyAuthUI() {
  const isAuthed = localStorage.getItem(ADMIN_SESSION_KEY) === "true";

  loginPanel.classList.toggle("hidden", isAuthed);
  dashboard.classList.toggle("hidden", !isAuthed);
  loginPanel.hidden = isAuthed;
  dashboard.hidden = !isAuthed;

  document.body.classList.toggle("admin-authenticated", isAuthed);

  if (isAuthed) {
    document.getElementById("adminPassword").value = "";
    renderAdminIdentity();
    loadReports();
    return;
  }

  localStorage.removeItem("roadwatchAdminActiveUser");
  renderAdminIdentity();
}

function login() {
  const username = document.getElementById("adminUsername").value.trim();
  const password = document.getElementById("adminPassword").value.trim();
  const customUsername = String(localStorage.getItem("roadwatchAdminUsername") || "").trim();
  const customPassword = String(localStorage.getItem("roadwatchAdminPassword") || "").trim();
  const allowedCredential = customUsername && customPassword
    ? { username: customUsername, password: customPassword }
    : DEFAULT_ADMIN_CREDENTIALS;
  const isValidCredential = username === allowedCredential.username && password === allowedCredential.password;

  if (isValidCredential) {
    localStorage.setItem(ADMIN_SESSION_KEY, "true");
    localStorage.setItem("roadwatchAdminActiveUser", username || "Admin");
    setFeedback("loginFeedback", "Login successful.");
    setDashboardView("overview");
    applyAuthUI();
    return;
  }

  setFeedback("loginFeedback", "Invalid username or password.", true);
}

function logout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem("roadwatchAdminActiveUser");
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

function getRecordDate(record) {
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
  if (!rawValue) return null;

  const parsed = new Date(rawValue);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed;
}

function formatDateTime(record) {
  const parsed = getRecordDate(record);
  if (!parsed) {
    const rawDate = getFieldValue(record, ["date", "Date", "reportDate", "reportedDate", "createdDate"]);
    const rawTime = getFieldValue(record, ["time", "Time", "reportTime", "reportedTime", "createdTime"]);
    const rawTimestamp = getFieldValue(record, [
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
    const fallback = rawTimestamp || `${rawDate || ""} ${rawTime || ""}`.trim();
    return fallback || "-";
  }

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
  if (["verified", "for verification", "needs verification"].includes(raw)) return "Verified";
  if (["in progress", "inprogress", "ongoing", "on-going", "working"].includes(raw)) return "In Progress";
  if (["repaired", "resolved", "completed", "complete", "done", "fixed"].includes(raw)) return "Repaired";
  return "Pending";
}

function normalizeReport(record = {}) {
  const reportedAt = getRecordDate(record);
  const issueType = getFieldValue(record, ["issueType", "issue_type", "Issue Type", "type", "issue"]);
  const firstname = getFieldValue(record, ["firstname", "firstName", "First Name"]);
  const lastname = getFieldValue(record, ["lastname", "lastName", "Last Name"]);
  const middleInitial = getFieldValue(record, ["mi", "middleInitial", "middleinitial", "Middle Initial"]);
  const reporterName = [firstname, lastname].filter(Boolean).join(" ") || getFieldValue(record, ["name", "fullName", "Reporter Name"]) || "-";
  const tracking = getFieldValue(record, [
    "tracking",
    "trackingNumber",
    "tracking_no",
    "tracking no",
    "tracking number",
    "Tracking #",
    "Tracking Number",
    "reference number",
    "Reference Number"
  ]);
  const sheetStatus = getFieldValue(record, [
    "status",
    "reportStatus",
    "report_status",
    "report status",
    "reportstatus",
    "Status",
    "Report Status"
  ]);
  const normalizedSheetStatus = String(sheetStatus || "").trim();
  const resolvedLocation = getFieldValue(record, ["location", "address", "road", "Road Location", "incidentLocation", "Incident Location"])
    || getFieldValue(record, ["roadName", "Road Name"])
    || "-";
  const resolvedCity = getFieldValue(record, ["city", "City", "municipality", "cityMunicipality", "City / Municipality", "incidentCity", "Incident City"]) || "-";
  const resolvedBarangay = getFieldValue(record, ["barangay", "Barangay", "incidentBarangay", "Incident Barangay"]) || "-";

  return {
    dateTime: formatDateTime(record),
    reportedAt: reportedAt ? reportedAt.toISOString() : "",
    tracking,
    name: reporterName,
    firstname: firstname || "-",
    lastname: lastname || "-",
    mi: middleInitial || "-",
    email: getFieldValue(record, ["email", "Email", "emailAddress", "Email Address"]) || "-",
    phone: getFieldValue(record, ["phone", "Phone", "mobile", "mobileNumber", "Mobile Number"]) || "-",
    reporterProvince: getFieldValue(record, ["reporterProvince", "Reporter Province"]) || "-",
    reporterCity: getFieldValue(record, ["reporterCity", "Reporter City", "Reporter City/Municipality"]) || "-",
    reporterBarangay: getFieldValue(record, ["reporterBarangay", "Reporter Barangay"]) || "-",
    reporterStreetAddress: getFieldValue(record, ["reporterStreetAddress", "Reporter Street Address", "streetAddress", "Street Address"]) || "-",
    region: getFieldValue(record, ["region", "Region"]) || "-",
    province: getFieldValue(record, ["province", "Province"]) || "-",
    location: resolvedLocation,
    roadName: getFieldValue(record, ["roadName", "Road Name"]) || "-",
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
    issueCategory: getFieldValue(record, ["issueCategory", "issue_category", "Issue Category", "category"]) || "-",
    issueType: issueType || "-",
    issueTypeOption: getFieldValue(record, ["issueTypeOption", "issue_type_option", "Issue Type Option"]) || "-",
    barangay: resolvedBarangay,
    city: resolvedCity,
    nearestLandmark: getFieldValue(record, ["nearestLandmark", "nearest_landmark", "Nearest Landmark"]) || "-",
    coordinatesText: getFieldValue(record, ["coordinatesDisplay", "coordinates", "Coordinates", "Selected Location", "selectedLocation"]) || "",
    lat: getFieldValue(record, ["lat", "latitude", "Latitude", "pinLat", "pin_lat"]),
    lng: getFieldValue(record, ["lng", "lon", "long", "longitude", "Longitude", "pinLng", "pin_lng"]),
    photo: getFieldValue(record, ["photo", "image", "photoUrl", "Photo"]) || "",
    status: normalizeStatus(normalizedSheetStatus)
  };
}

function toNumberOrNull(value) {
  const parsed = Number.parseFloat(String(value ?? "").trim());
  return Number.isFinite(parsed) ? parsed : null;
}

function getDataQualityScore(report) {
  let score = 0;

  if (String(report?.photo || "").trim()) score += 20;
  if (String(report?.location || "").trim() && report.location !== "-") score += 20;
  if (String(report?.barangay || "").trim() && report.barangay !== "-") score += 15;
  if (String(report?.city || "").trim() && report.city !== "-") score += 10;
  if (String(report?.issueCategory || "").trim() && report.issueCategory !== "-") score += 10;

  const descriptionLength = String(report?.issue || "").trim().length;
  if (descriptionLength >= 25) score += 15;
  else if (descriptionLength >= 10) score += 8;

  const lat = toNumberOrNull(report?.lat);
  const lng = toNumberOrNull(report?.lng);
  if (lat !== null && lng !== null) score += 10;

  return Math.min(100, score);
}

function getQualityBand(score) {
  if (score >= 80) return "high";
  if (score >= 50) return "medium";
  return "low";
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
  const endpoints = getStatusWriteEndpoints();
  let hasAnySuccess = false;

  for (const endpoint of endpoints) {
    try {
      const payload = await postStatusUpdateToEndpoint(endpoint, tracking, status);
      if (payload?.success || payload?.updated || normalizeStatus(payload?.status) === normalizeStatus(status)) {
        hasAnySuccess = true;
      }
    } catch {
      // Try next endpoint.
    }
  }

  if (!hasAnySuccess) {
    throw new Error("Unable to update report status.");
  }

  return { success: true };
}

async function deleteReport(tracking) {
  const trackingValue = String(tracking || "").trim();
  if (!trackingValue) throw new Error("Invalid tracking number.");

  const endpoints = getStatusWriteEndpoints();
  let hasAnySuccess = false;

  for (const endpointBase of endpoints) {
    try {
      const body = new URLSearchParams({ action: "deleteReport", tracking: trackingValue });
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
        const endpoint = `${endpointBase}?action=deleteReport&tracking=${encodeURIComponent(trackingValue)}`;
        payload = await loadJsonp(endpoint);
      }

      if (payload?.success || payload?.deleted || Object.keys(payload).length === 0) {
        hasAnySuccess = true;
      }
    } catch {
      // Try next endpoint.
    }
  }

  if (!hasAnySuccess) {
    throw new Error("Unable to delete report.");
  }

  return { success: true };
}

function statusSelect(current, tracking) {
  const select = document.createElement("select");
  select.className = "status-select";
  STATUS_OPTIONS.forEach((label) => {
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

      addAuditEntry("Status Updated", tracking, `${previousStatus} → ${nextStatus}`);
      addTimelineEntry(tracking, "Status Updated", `${previousStatus} → ${nextStatus}`);
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

function renderSelectionSummary() {
  if (!selectionSummary) return;
  const count = selectedReports.size;
  selectionSummary.textContent = `${count} selected`;
  if (managementSelectedCount) managementSelectedCount.textContent = String(count);
}

function renderManagementSnapshot(filteredReports) {
  const reports = Array.isArray(filteredReports) ? filteredReports : [];
  const urgentCount = reports.filter((report) => getPriorityScore(report) >= 75).length;
  const verificationCount = reports.filter((report) => getVerificationState(report) !== "Verified").length;

  if (managementFilteredCount) managementFilteredCount.textContent = String(reports.length);
  if (managementUrgentCount) managementUrgentCount.textContent = String(urgentCount);
  if (managementVerificationCount) managementVerificationCount.textContent = String(verificationCount);
  if (managementSelectedCount) managementSelectedCount.textContent = String(selectedReports.size);
}

function getSelectedReports() {
  return allReports.filter((report) => selectedReports.has(String(report.tracking || "").trim()));
}

async function applyBulkStatusUpdate() {
  const selected = getSelectedReports();
  if (selected.length === 0) {
    setFeedback("reportsFeedback", "Select at least one report before applying a bulk status update.", true);
    return;
  }

  const nextStatus = STATUS_OPTIONS.includes(bulkStatusValue?.value || "") ? bulkStatusValue.value : "Pending";
  const trackingList = selected.map((report) => String(report.tracking || "").trim()).filter(Boolean);
  if (trackingList.length === 0) {
    setFeedback("reportsFeedback", "Selected reports are missing valid tracking numbers.", true);
    return;
  }

  applyBulkStatusBtn.disabled = true;
  pendingStatusUpdates += trackingList.length;
  setTableLoadingState(true, `Updating ${trackingList.length} report(s) to ${nextStatus}...`);

  const updates = await Promise.allSettled(trackingList.map((tracking) => updateReportStatus(tracking, nextStatus)));
  const failures = [];
  updates.forEach((result, index) => {
    const tracking = trackingList[index];
    if (result.status === "fulfilled") {
      const report = allReports.find((item) => String(item.tracking || "").trim() === tracking);
      const previousStatus = normalizeStatus(report?.status);
      if (report) report.status = nextStatus;
      addAuditEntry("Bulk Status Updated", tracking, `${previousStatus} → ${nextStatus}`);
      addTimelineEntry(tracking, "Bulk Status Updated", `${previousStatus} → ${nextStatus}`);
      return;
    }
    failures.push(tracking);
  });

  pendingStatusUpdates = Math.max(0, pendingStatusUpdates - trackingList.length);
  setTableLoadingState(pendingStatusUpdates > 0, failures.length ? "Some updates failed." : "");
  applyBulkStatusBtn.disabled = false;

  if (failures.length > 0) {
    setFeedback(
      "reportsFeedback",
      `Updated ${trackingList.length - failures.length}/${trackingList.length} report(s). Failed: ${failures.join(", ")}.`,
      true
    );
  } else {
    setFeedback("reportsFeedback", `Updated ${trackingList.length} report(s) to ${nextStatus}.`);
  }
  applyFiltersAndRender();
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


function parseReportDate(report) {
  const isoDate = String(report?.reportedAt || "").trim();
  if (isoDate) {
    const parsedIso = new Date(isoDate);
    if (!Number.isNaN(parsedIso.getTime())) return parsedIso;
  }

  const raw = String(report?.dateTime || "").trim();
  if (!raw || raw === "-") return null;

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
}

function formatDueAt(dueAtIso) {
  const parsed = new Date(String(dueAtIso || "").trim());
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function getEscalationState(report) {
  if (normalizeStatus(report?.status) === "Repaired") return "Resolved";
  const dueAt = new Date(String(report?.dueAt || "").trim());
  if (Number.isNaN(dueAt.getTime())) return "On Track";

  const remainingMs = dueAt.getTime() - Date.now();
  if (remainingMs < 0) return "Overdue";
  if (remainingMs <= 24 * 60 * 60 * 1000) return "At Risk";
  return "On Track";
}

function getUrgencyThresholdDays() {
  const parsed = Number.parseInt(urgencyThresholdDays?.value || "7", 10);
  return Number.isFinite(parsed) ? parsed : 7;
}

function renderPriorityQueue(reports) {
  if (!priorityQueueList) return;

  const thresholdDays = getUrgencyThresholdDays();
  const now = Date.now();

  const unresolved = reports
    .filter((report) => normalizeStatus(report.status) !== "Repaired")
    .map((report) => {
      const date = parseReportDate(report);
      if (!date) return null;

      const ageDays = Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24));
      return { report, ageDays };
    })
    .filter((entry) => entry && entry.ageDays >= thresholdDays)
    .sort((a, b) => b.ageDays - a.ageDays)
    .slice(0, 6);

  if (unresolved.length === 0) {
    priorityQueueList.innerHTML = `<li class="priorityItem empty">No unresolved reports older than ${thresholdDays} day(s).</li>`;
    return;
  }

  priorityQueueList.innerHTML = "";

  unresolved.forEach(({ report, ageDays }) => {
    const item = document.createElement("li");
    item.className = "priorityItem";
    item.innerHTML = `
      <div>
        <strong>${report.tracking || "No Tracking #"}</strong>
        <p>${report.location || "Location unavailable"}</p>
      </div>
      <div class="priorityMeta">
        <span>${normalizeStatus(report.status)}</span>
        <span>${ageDays} day(s) open</span>
      </div>
    `;
    priorityQueueList.appendChild(item);
  });
}

function getVerificationState(report) {
  const tracking = String(report?.tracking || "").trim();
  if (tracking && flaggedReports.has(tracking)) return "Flagged";
  return normalizeStatus(report?.status) === "Pending" ? "Needs Verification" : "Verified";
}

function renderVerificationQueue(reports) {
  if (!verificationQueueList) return;

  const filterValue = verificationFilter?.value || "all";
  const queue = reports
    .map((report) => ({ report, state: getVerificationState(report) }))
    .filter((entry) => {
      if (filterValue === "verification") return entry.state === "Needs Verification";
      if (filterValue === "flagged") return entry.state === "Flagged";
      return true;
    })
    .sort((a, b) => {
      const weight = (state) => (state === "Flagged" ? 0 : state === "Needs Verification" ? 1 : 2);
      return weight(a.state) - weight(b.state);
    })
    .slice(0, 8);

  if (queue.length === 0) {
    verificationQueueList.innerHTML = '<li class="priorityItem empty">No reports match the selected verification filter.</li>';
    return;
  }

  verificationQueueList.innerHTML = "";
  queue.forEach(({ report, state }) => {
    const item = document.createElement("li");
    item.className = `priorityItem ${state === "Flagged" ? "is-flagged" : ""}`;
    item.innerHTML = `
      <div>
        <strong>${report.tracking || "No Tracking #"}</strong>
        <p>${report.issue || "Issue details unavailable"}</p>
      </div>
      <div class="priorityMeta">
        <span>${state}</span>
        <span>${report.name || "Anonymous"}</span>
      </div>
    `;
    verificationQueueList.appendChild(item);
  });
}

function renderSlaQueue(reports) {
  if (!slaQueueList) return;

  const filterValue = slaFilter?.value || "all";
  const queue = reports
    .filter((report) => normalizeStatus(report.status) !== "Repaired")
    .map((report) => ({
      report,
      escalationState: getEscalationState(report)
    }))
    .filter(({ escalationState }) => {
      if (filterValue === "overdue") return escalationState === "Overdue";
      if (filterValue === "atRisk") return escalationState === "At Risk";
      return true;
    })
    .sort((a, b) => {
      const weight = (state) => (state === "Overdue" ? 0 : state === "At Risk" ? 1 : 2);
      return weight(a.escalationState) - weight(b.escalationState);
    })
    .slice(0, 8);

  if (queue.length === 0) {
    slaQueueList.innerHTML = '<li class="priorityItem empty">No unresolved reports match the SLA filter.</li>';
    return;
  }

  slaQueueList.innerHTML = "";
  queue.forEach(({ report, escalationState }) => {
    const item = document.createElement("li");
    item.className = `priorityItem ${escalationState === "Overdue" ? "is-flagged" : ""}`;
    item.innerHTML = `
      <div>
        <strong>${report.tracking || "No Tracking #"}</strong>
        <p>${report.location || "Location unavailable"}</p>
      </div>
      <div class="priorityMeta">
        <span>${escalationState}</span>
        <span>Due: ${formatDueAt(report.dueAt)}</span>
      </div>
    `;
    slaQueueList.appendChild(item);
  });
}

function renderTeamPerformanceBoard(reports) {
  if (!teamPerformanceBoard) return;

  const assigneeStats = new Map();
  reports.forEach((report) => {
    const assignee = String(report?.assignedTo || "Unassigned").trim() || "Unassigned";
    const state = assigneeStats.get(assignee) || { total: 0, open: 0, overdue: 0, atRisk: 0, repaired: 0, scoreTotal: 0 };
    state.total += 1;
    const status = normalizeStatus(report.status);
    if (status === "Repaired") state.repaired += 1;
    else state.open += 1;
    const escalation = getEscalationState(report);
    if (escalation === "Overdue") state.overdue += 1;
    if (escalation === "At Risk") state.atRisk += 1;
    state.scoreTotal += getPriorityScore(report);
    assigneeStats.set(assignee, state);
  });

  const ranking = Array.from(assigneeStats.entries())
    .sort((a, b) => (b[1].open - a[1].open) || (b[1].overdue - a[1].overdue))
    .slice(0, 8);

  if (ranking.length === 0) {
    teamPerformanceBoard.innerHTML = '<p class="small">No assignment data available yet.</p>';
    return;
  }

  teamPerformanceBoard.innerHTML = ranking.map(([assignee, stats]) => {
    const avgPriority = stats.total ? Math.round(stats.scoreTotal / stats.total) : 0;
    return `
      <article class="teamCard">
        <div class="teamCardHeader">
          <strong>${escapeHtml(assignee)}</strong>
          <span class="priority-badge">P${avgPriority}</span>
        </div>
        <div class="teamCardMeta">
          <span>Open: ${stats.open}</span>
          <span>Overdue: ${stats.overdue}</span>
          <span>At risk: ${stats.atRisk}</span>
          <span>Repaired: ${stats.repaired}</span>
        </div>
      </article>
    `;
  }).join("");
}

function syncTimelineTrackingOptions(reports) {
  if (!timelineTrackingSelect) return;
  const currentValue = timelineTrackingSelect.value;
  const options = reports
    .map((report) => String(report?.tracking || "").trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  timelineTrackingSelect.innerHTML = `<option value="">Choose tracking #</option>${options
    .map((tracking) => `<option value="${escapeHtml(tracking)}">${escapeHtml(tracking)}</option>`)
    .join("")}`;

  if (options.includes(currentValue)) timelineTrackingSelect.value = currentValue;
}

function renderCaseTimeline(tracking) {
  if (!caseTimelineList) return;
  const key = String(tracking || "").trim();
  if (!key) {
    caseTimelineList.innerHTML = '<li class="priorityItem empty">Pick a tracking number to show the timeline.</li>';
    if (timelineSummary) timelineSummary.textContent = "Select a report to view timeline.";
    return;
  }

  const entries = getCaseTimeline(key);
  if (timelineSummary) timelineSummary.textContent = `Timeline for ${key}`;
  renderClosureChecklist(key);

  if (entries.length === 0) {
    caseTimelineList.innerHTML = `<li class="priorityItem empty">No timeline entries yet for ${escapeHtml(key)}.</li>`;
    return;
  }

  caseTimelineList.innerHTML = entries.slice(0, 10).map((entry) => `
    <li class="priorityItem">
      <div>
        <strong>${escapeHtml(entry.eventType || "Update")}</strong>
        <p>${escapeHtml(entry.details || "No details provided")}</p>
      </div>
      <div class="priorityMeta">
        <span>${formatDueAt(entry.createdAt)}</span>
      </div>
    </li>
  `).join("");
}

function focusTimeline(tracking) {
  const key = String(tracking || "").trim();
  if (!key || !timelineTrackingSelect) return;
  timelineTrackingSelect.value = key;
  renderCaseTimeline(key);
}

function renderAuditTrail() {
  if (!auditTrailList) return;
  const entries = getAuditTrail().slice(0, 8);
  if (entries.length === 0) {
    auditTrailList.innerHTML = '<li class="priorityItem empty">No audit entries yet.</li>';
    return;
  }

  auditTrailList.innerHTML = "";
  entries.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "priorityItem";
    item.innerHTML = `
      <div>
        <strong>${entry.action || "Action"}</strong>
        <p>${entry.tracking || "N/A"}${entry.details ? ` · ${entry.details}` : ""}</p>
      </div>
      <div class="priorityMeta">
        <span>${formatDueAt(entry.createdAt)}</span>
      </div>
    `;
    auditTrailList.appendChild(item);
  });
}


function renderExecutiveSummary(reports) {
  if (!executiveSummary) return;
  const openReports = reports.filter((report) => normalizeStatus(report.status) !== "Repaired");
  const overdue = openReports.filter((report) => getEscalationState(report) === "Overdue").length;
  const critical = reports.filter((report) => getSeverityLabel(report) === "Critical").length;
  const duplicates = getDuplicateClusters(reports).length;
  const topBarangay = Array.from(reports.reduce((acc, report) => {
    const key = String(report?.barangay || "Unknown").trim() || "Unknown";
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map()).entries()).sort((a,b)=>b[1]-a[1])[0];
  executiveSummary.innerHTML = [
    { label: "Needs attention today", value: `${overdue} overdue / ${critical} critical`, meta: "Operational risk now" },
    { label: "Repeat incidents", value: `${duplicates} duplicate clusters`, meta: "Candidate merges to projects" },
    { label: "Top hotspot barangay", value: topBarangay ? `${topBarangay[0]}` : "N/A", meta: topBarangay ? `${topBarangay[1]} related reports` : "No area data yet" }
  ].map((item) => `<article class="miniCard"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><small>${escapeHtml(item.meta)}</small></article>`).join("");
}

function renderForecastCards(reports) {
  if (!forecastCards) return;
  const days = Number.parseInt(forecastRange?.value || "7", 10) || 7;
  const forecast = getForecastSummary(reports, days);
  forecastCards.innerHTML = [
    { label: `Projected new cases (${days}d)`, value: forecast.projected },
    { label: "Current backlog", value: forecast.backlog },
    { label: "Repeat roads", value: forecast.repeatRoads }
  ].map((item) => `<article class="miniCard"><span>${escapeHtml(item.label)}</span><strong>${item.value}</strong></article>`).join("");
}

function getTopBarangay(reports) {
  return Array.from(reports.reduce((acc, report) => {
    const key = String(report?.barangay || "Unknown").trim() || "Unknown";
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map()).entries()).sort((a, b) => b[1] - a[1])[0];
}

function renderOverviewQueueTable(reports) {
  if (!overviewQueueBody) return;

  const prioritized = reports
    .slice()
    .sort((a, b) => {
      const openDiff = Number(normalizeStatus(a.status) === "Repaired") - Number(normalizeStatus(b.status) === "Repaired");
      if (openDiff !== 0) return openDiff;
      return getPriorityScore(b) - getPriorityScore(a);
    })
    .slice(0, 8);

  if (!prioritized.length) {
    overviewQueueBody.innerHTML = '<article class="aiRecoCard"><strong>No reports available yet.</strong><p>Incoming submissions will appear here for moderation and dispatch.</p></article>';
    return;
  }

  overviewQueueBody.innerHTML = prioritized.map((report) => {
    const verificationState = getVerificationState(report);
    const escalationState = getEscalationState(report);
    const verificationClass = verificationState === "Flagged"
      ? "is-flagged"
      : verificationState === "Needs Verification"
        ? "is-pending"
        : "is-verified";
    const escalationClass = escalationState === "Overdue"
      ? "is-flagged"
      : escalationState === "At Risk"
        ? "is-pending"
        : "is-verified";
    const severity = getSeverityLabel(report);

    const priority = getPriorityScore(report);
    const photo = String(report?.photo || "").trim() || "assets/issues/potholes.svg";

    return `
      <article class="queueCard">
        <img src="${escapeHtml(photo)}" alt="Road report preview image">
        <div>
          <h4>${escapeHtml(report.location || report.barangay || "Unknown location")}</h4>
          <p>${escapeHtml(report.issueType || report.issue || report.issueCategory || "-")} • Tracking ${escapeHtml(report.tracking || "-")}</p>
          <div class="queueMeta">
            <span class="verification-badge ${verificationClass}">${escapeHtml(verificationState)}</span>
            <span class="severity-badge severity-${severity.toLowerCase()}">${escapeHtml(severity)}</span>
            <span class="priority-badge">P${priority}</span>
            <span class="verification-badge ${escalationClass}">${escapeHtml(escalationState)}</span>
          </div>
        </div>
        <div class="queueActions">
          <button type="button" class="secondary slim" data-focus-timeline="${escapeHtml(report.tracking || "")}">Verify</button>
          <button type="button" class="secondary slim">View Details</button>
        </div>
      </article>
    `;
  }).join("");

  overviewQueueBody.querySelectorAll("[data-focus-timeline]").forEach((button) => {
    button.addEventListener("click", () => focusTimeline(button.dataset.focusTimeline || ""));
  });
}

function renderAiRecommendations(reports) {
  if (!aiRecommendations) return;

  const openReports = reports.filter((report) => normalizeStatus(report.status) !== "Repaired");
  const highRisk = openReports.filter((report) => getPriorityScore(report) >= 75);
  const overdue = openReports.filter((report) => getEscalationState(report) === "Overdue");
  const flagged = reports.filter((report) => getVerificationState(report) === "Flagged");
  const topBarangay = getTopBarangay(reports);

  if (aiAutopilotSummary) {
    aiAutopilotSummary.textContent = `${highRisk.length} high-risk cases and ${overdue.length} overdue reports detected. Autopilot suggests dispatch rebalancing now.`;
  }

  const recommendations = [
    {
      title: "Escalate high-risk queue",
      detail: `${highRisk.length} report(s) scored ≥ P75. Batch-assign to field team with nearest capacity.`,
      meta: "Priority Engine"
    },
    {
      title: "Recover SLA breaches",
      detail: `${overdue.length} overdue case(s). Trigger automated citizen ETA update before reassignment.`,
      meta: "SLA Guardian"
    },
    {
      title: "Flag potential abuse patterns",
      detail: `${flagged.length} report(s) need moderation review to reduce false-positive handling time.`,
      meta: "Trust Shield"
    },
    {
      title: "Barangay surge forecasting",
      detail: topBarangay ? `${topBarangay[0]} has ${topBarangay[1]} incidents; prepare materials for probable repeat requests.` : "Waiting for enough area data to predict surge.",
      meta: "Forecast AI"
    }
  ];

  aiRecommendations.innerHTML = recommendations.map((item) => `
    <article class="aiRecoCard">
      <span>🤖 ${escapeHtml(item.meta)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `).join("");
}

function renderDuplicateCaseBoard(reports) {
  if (!duplicateCaseBoard) return;
  const clusters = getDuplicateClusters(reports).slice(0, 6);
  duplicateCaseBoard.innerHTML = clusters.length ? clusters.map((group, index) => `<li class="priorityItem"><div><strong>Cluster ${index + 1}</strong><p>${escapeHtml(group[0]?.location || group[0]?.barangay || "Shared area")}</p></div><div class="priorityMeta"><span>${group.length} linked reports</span><span>${escapeHtml(group[0]?.issueCategory || "Mixed")}</span></div></li>`).join("") : '<li class="priorityItem empty">No duplicate incident clusters detected.</li>';
}

function renderProjectPortfolio() {
  if (!projectPortfolio) return;
  const projects = getProjects();
  projectPortfolio.innerHTML = projects.length ? projects.map((project) => `<article class="teamCard"><div class="teamCardHeader"><strong>${escapeHtml(project.name)}</strong><span class="priority-badge">${escapeHtml(project.id)}</span></div><div class="teamCardMeta"><span>${escapeHtml(project.owner)}</span><span>Budget: ${escapeHtml(project.budget || "TBD")}</span><span>${project.trackings.length} reports linked</span></div></article>`).join("") : '<p class="small">No incident projects created yet.</p>';
}

function renderModerationBoard(reports) {
  if (!moderationBoard) return;
  const queue = reports.filter((report) => getVerificationState(report) !== "Verified" || getSeverityLabel(report) === "Critical").slice(0, 8);
  moderationBoard.innerHTML = queue.length ? queue.map((report) => `<li class="priorityItem ${getVerificationState(report) === "Flagged" ? "is-flagged" : ""}"><div><strong>${escapeHtml(report.tracking || "No Tracking #")}</strong><p>${escapeHtml(report.issue || "No issue details")}</p></div><div class="priorityMeta"><span>${escapeHtml(getVerificationState(report))}</span><span>${escapeHtml(getSeverityLabel(report))}</span></div></li>`).join("") : '<li class="priorityItem empty">No moderation backlog at the moment.</li>';
}

function renderRootCauseBoard(reports) {
  if (!rootCauseBoard) return;
  const counts = reports.reduce((acc, report) => {
    const key = report.rootCause || getRootCause(report);
    acc.set(key, (acc.get(key) || 0) + 1);
    return acc;
  }, new Map());
  const top = Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0, 4);
  rootCauseBoard.innerHTML = top.length ? top.map(([label, count]) => `<article class="miniCard"><span>${escapeHtml(label)}</span><strong>${count}</strong><small>Recurring maintenance driver</small></article>`).join("") : '<article class="miniCard"><span>No root-cause trends yet</span><strong>0</strong></article>';
}

function renderFieldOpsBoard(reports) {
  if (!fieldOpsBoard) return;
  const cards = reports.filter((report) => normalizeStatus(report.status) !== "Repaired").sort((a,b)=>getPriorityScore(b)-getPriorityScore(a)).slice(0,6);
  fieldOpsBoard.innerHTML = cards.length ? cards.map((report) => `<article class="teamCard fieldCard"><div class="teamCardHeader"><strong>${escapeHtml(report.tracking || "No Tracking #")}</strong><span class="priority-badge">${escapeHtml(getSeverityLabel(report))}</span></div><div class="teamCardMeta"><span>${escapeHtml(report.location || "Unknown location")}</span><span>Assignee: ${escapeHtml(report.assignedTo || "Unassigned")}</span><span>ETA: ${escapeHtml(report.publicEta || "Unset")}</span></div></article>`).join("") : '<p class="small">No active field work cards available.</p>';
}

function renderTrustCenterBoard() {
  if (!trustCenterBoard) return;
  const notices = getNotificationQueue().slice(0, 6);
  trustCenterBoard.innerHTML = notices.length ? notices.map((entry) => `<li class="priorityItem"><div><strong>${escapeHtml(entry.tracking || "General update")}</strong><p>${escapeHtml(entry.message || entry.template)}</p></div><div class="priorityMeta"><span>${escapeHtml(entry.eta || "No ETA")}</span><span>${formatDueAt(entry.createdAt)}</span></div></li>`).join("") : '<li class="priorityItem empty">No queued citizen updates yet.</li>';
  if (notificationQueueList) notificationQueueList.innerHTML = trustCenterBoard.innerHTML;
}

function renderClosureChecklist(tracking = "") {
  if (!closureChecklist) return;
  const report = allReports.find((item) => String(item?.tracking || "").trim() === String(tracking || timelineTrackingSelect?.value || "").trim());
  const checks = report ? [
    { label: "Closure proof uploaded", done: Boolean(report.closureProof) },
    { label: "Repair summary saved", done: Boolean(report.closureDetails) },
    { label: "Timeline updated", done: getCaseTimeline(report.tracking).length > 0 },
    { label: "Citizen update queued", done: getNotificationQueue().some((entry) => entry.tracking === report.tracking) }
  ] : [];
  closureChecklist.innerHTML = checks.length ? checks.map((check) => `<article class="miniCard"><span>${escapeHtml(check.label)}</span><strong>${check.done ? "Done" : "Pending"}</strong></article>`).join("") : '<article class="miniCard"><span>Select a tracking number</span><strong>Awaiting case</strong></article>';
}

function renderPermissionsSummary() {
  if (!permissionsSummary) return;
  const role = roleFilterSelect?.value || "Super Admin";
  const permissionsByRole = {
    "Super Admin": ["Delete cases", "Assign teams", "Publish updates"],
    Verifier: ["Validate reports", "Request evidence", "Flag abuse"],
    Dispatcher: ["Assign crews", "Set ETA", "Escalate cases"],
    "Field Lead": ["Upload proof", "Complete repairs", "Reopen jobs"],
    Viewer: ["View analytics", "Export reports", "Monitor workload"]
  };
  permissionsSummary.innerHTML = (permissionsByRole[role] || []).map((item) => `<article class="miniCard"><span>${escapeHtml(role)}</span><strong>${escapeHtml(item)}</strong></article>`).join("");
}


function markReportsFlagged(reports) {
  reports.forEach((report) => {
    const tracking = String(report?.tracking || "").trim();
    if (tracking) {
      flaggedReports.add(tracking);
      addAuditEntry("Report Flagged", tracking, "Flagged for moderation review");
    }
  });
}


function bucketLabelForDate(date, range) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;

  if (range === "daily") {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  if (range === "weekly") {
    return `${date.getFullYear()}-W${String(getWeekNumber(date)).padStart(2, "0")}`;
  }

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function getWeekNumber(date) {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = utcDate.getUTCDay() || 7;
  utcDate.setUTCDate(utcDate.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1));
  return Math.ceil((((utcDate - yearStart) / 86400000) + 1) / 7);
}

function aggregateReportsByRange(reports, range = "monthly") {
  const counts = new Map();

  reports.forEach((report) => {
    const parsed = parseReportDate(report);
    if (!parsed) return;

    const label = bucketLabelForDate(parsed, range);
    if (!label) return;
    counts.set(label, (counts.get(label) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([label, value]) => ({ label, value }));
}

function drawTrendChart(reports) {
  const canvas = document.getElementById("trendChart");
  if (!canvas) return;

  const range = reportingRange?.value || "monthly";
  const points = aggregateReportsByRange(reports, range);
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth || 960;
  const cssHeight = 280;

  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  if (points.length === 0) {
    ctx.fillStyle = "#bdd9f8";
    ctx.font = "600 13px Inter";
    ctx.fillText("No dated reports available for trend analysis.", 24, cssHeight / 2);
    return;
  }

  const max = Math.max(...points.map((item) => item.value), 1);
  const padding = { top: 22, right: 18, bottom: 56, left: 30 };
  const chartWidth = cssWidth - padding.left - padding.right;
  const chartHeight = cssHeight - padding.top - padding.bottom;
  const stepX = points.length > 1 ? chartWidth / (points.length - 1) : 0;

  ctx.strokeStyle = "rgba(189, 217, 248, 0.3)";
  ctx.beginPath();
  ctx.moveTo(padding.left, padding.top + chartHeight);
  ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
  ctx.stroke();

  ctx.strokeStyle = "#4fc3f7";
  ctx.lineWidth = 2;
  ctx.beginPath();

  points.forEach((point, index) => {
    const x = padding.left + (stepX * index);
    const y = padding.top + chartHeight - ((point.value / max) * chartHeight);
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#9ad4ff";
  ctx.font = "600 11px Inter";
  ctx.textAlign = "center";

  points.forEach((point, index) => {
    const x = padding.left + (stepX * index);
    const y = padding.top + chartHeight - ((point.value / max) * chartHeight);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#63e6be";
    ctx.fill();

    ctx.fillStyle = "#e9f4ff";
    ctx.fillText(String(point.value), x, y - 10);

    ctx.fillStyle = "#bdd9f8";
    if (points.length <= 8 || index % Math.ceil(points.length / 8) === 0 || index === points.length - 1) {
      ctx.fillText(point.label, x, cssHeight - 20);
    }
  });
}

function getTopHotspots(reports) {
  const counts = new Map();

  reports.forEach((report) => {
    const location = String(report?.location || "").trim();
    if (!location || location === "-") return;
    const normalized = location.toLowerCase();
    const existing = counts.get(normalized) || { label: location, count: 0 };
    existing.count += 1;
    counts.set(normalized, existing);
  });

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHotspotHeatmap(reports) {
  if (!hotspotHeatmap) return;

  const hotspots = getTopHotspots(reports);
  if (hotspots.length === 0) {
    hotspotHeatmap.innerHTML = '<p class="small">No location data available for hotspot mapping.</p>';
    return;
  }

  const maxCount = hotspots[0].count || 1;
  hotspotHeatmap.innerHTML = hotspots.map((spot) => {
    const intensity = Math.max(0.2, spot.count / maxCount);
    return `
      <div class="heatRow">
        <span>${escapeHtml(spot.label)}</span>
        <div class="heatTrack"><div class="heatBar" style="width:${Math.max(8, intensity * 100)}%; opacity:${0.25 + (intensity * 0.75)}"></div></div>
        <strong>${spot.count}</strong>
      </div>
    `;
  }).join("");
}

function getReportsWithCoordinates(reports) {
  return reports
    .map((report) => {
      const lat = toNumberOrNull(report?.lat);
      const lng = toNumberOrNull(report?.lng);
      if (lat === null || lng === null) return null;
      return {
        ...report,
        lat,
        lng
      };
    })
    .filter(Boolean)
    .filter((report) => Math.abs(report.lat) <= 90 && Math.abs(report.lng) <= 180);
}

function ensurePinMapInstance(mapElement, mapInstance) {
  if (!mapElement || typeof window.L === "undefined") return null;
  if (mapInstance) return mapInstance;

  return window.L.map(mapElement, {
    zoomControl: true
  }).setView([14.5995, 120.9842], 11);
}

function ensurePinMapLayer(mapInstance, layerInstance) {
  if (!mapInstance || typeof window.L === "undefined") return null;
  if (!mapInstance.__hasTileLayer) {
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(mapInstance);
    mapInstance.__hasTileLayer = true;
  }

  if (layerInstance) return layerInstance;
  return window.L.layerGroup().addTo(mapInstance);
}

function clearPinMapView(mapElement, mapSummaryElement, mapSummaryText) {
  if (mapElement) {
    mapElement.classList.add("is-empty");
    mapElement.textContent = "No geotagged report pins available for this view.";
  }
  if (mapSummaryElement) mapSummaryElement.textContent = mapSummaryText;
}

function getPinStyleByStatus(status) {
  const normalizedStatus = normalizeStatus(status);
  if (normalizedStatus === "Verified") {
    return { color: "#d62828", fillColor: "#ef4444" };
  }
  if (normalizedStatus === "In Progress") {
    return { color: "#ca8a04", fillColor: "#facc15" };
  }
  if (normalizedStatus === "Repaired") {
    return { color: "#15803d", fillColor: "#4ade80" };
  }

  return { color: "#4fc3f7", fillColor: "#63e6be" };
}

function renderPinMap(mapElement, mapSummaryElement, mapSummaryText, reports, currentMap, currentLayer) {
  if (!mapElement || !mapSummaryElement) return { map: currentMap, layer: currentLayer };

  if (typeof window.L === "undefined") {
    clearPinMapView(mapElement, mapSummaryElement, "Map library unavailable.");
    return { map: currentMap, layer: currentLayer };
  }

  const geoReports = getReportsWithCoordinates(reports);
  if (geoReports.length === 0) {
    if (currentLayer) currentLayer.clearLayers();
    clearPinMapView(mapElement, mapSummaryElement, mapSummaryText);
    return { map: currentMap, layer: currentLayer };
  }

  const wasEmptyState = mapElement.classList.contains("is-empty");
  mapElement.classList.remove("is-empty");
  if (wasEmptyState) {
    mapElement.textContent = "";
  }

  const map = ensurePinMapInstance(mapElement, currentMap);
  const markers = ensurePinMapLayer(map, currentLayer);
  markers.clearLayers();

  const bounds = [];
  geoReports.forEach((report) => {
    const pinStyle = getPinStyleByStatus(report.status);
    const marker = window.L.circleMarker([report.lat, report.lng], {
      radius: 6,
      color: pinStyle.color,
      fillColor: pinStyle.fillColor,
      fillOpacity: 0.75,
      weight: 1.5
    });

    marker.bindPopup(`<strong>${escapeHtml(report.tracking || "Unknown Tracking #")}</strong><br>${escapeHtml(report.location || "Unknown location")}<br>Status: ${escapeHtml(normalizeStatus(report.status))}`);
    marker.addTo(markers);
    bounds.push([report.lat, report.lng]);
  });

  if (bounds.length === 1) {
    map.setView(bounds[0], 15);
  } else {
    map.fitBounds(bounds, { padding: [28, 28], maxZoom: 15 });
  }

  mapSummaryElement.textContent = mapSummaryText.replace("{count}", String(geoReports.length));
  window.setTimeout(() => map.invalidateSize(), 30);
  return { map, layer: markers };
}

function updateReportingSummary(reports) {
  if (!reportingSummary) return;

  const range = reportingRange?.value || "monthly";
  const hotspots = getTopHotspots(reports);
  const topLabel = hotspots[0]?.label || "N/A";
  const topCount = hotspots[0]?.count || 0;
  const periodText = range === "weekly" ? "weekly" : "monthly";

  reportingSummary.textContent = `${periodText.toUpperCase()} analytics: ${reports.length} total report(s). Top hotspot: ${topLabel} (${topCount} report(s)).`; 
}

function refreshReportingSection(reports) {
  drawTrendChart(reports);
  renderHotspotHeatmap(reports);
  updateReportingSummary(reports);

  const overviewMapState = renderPinMap(
    overviewPinMap,
    overviewMapSummary,
    "Showing {count} geotagged report pin(s) across all records.",
    reports,
    overviewMap,
    overviewMarkers
  );
  overviewMap = overviewMapState.map;
  overviewMarkers = overviewMapState.layer;
}

function exportReportsToCsv(reports) {
  const headers = ["Submission Time", "Tracking #", "Reporter", "Location", "Category", "Issue Type", "Issue", "Data Quality", "Status", "Verification"];
  const rows = reports.map((report) => [
    report.dateTime,
    report.tracking,
    report.name,
    report.location,
    report.issueCategory,
    report.issueType,
    report.issue,
    `${getDataQualityScore(report)}%`,
    normalizeStatus(report.status),
    getVerificationState(report)
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value || "").replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `roadwatch-report-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportReportsToPdf(reports) {
  const range = reportingRange?.value || "monthly";
  const hotspots = getTopHotspots(reports);
  const topRows = hotspots.slice(0, 5)
    .map((spot, index) => `<tr><td>${index + 1}</td><td>${escapeHtml(spot.label)}</td><td>${spot.count}</td></tr>`)
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>RoadWatch Report</title><style>body{font-family:Arial,sans-serif;padding:24px;color:#1b2c3b}h1,h2{margin:0 0 10px}p{margin:0 0 12px}table{width:100%;border-collapse:collapse;margin-top:10px}th,td{border:1px solid #c9d4dd;padding:8px;text-align:left}th{background:#eef4f9}</style></head><body><h1>RoadWatch PH Analytics Report</h1><p>Coverage: ${range === "weekly" ? "Weekly" : "Monthly"}</p><p>Total reports: ${reports.length}</p><h2>Top Hotspots</h2><table><thead><tr><th>#</th><th>Location</th><th>Reports</th></tr></thead><tbody>${topRows || "<tr><td colspan='3'>No hotspot data available.</td></tr>"}</tbody></table></body></html>`;

  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) {
    setFeedback("reportsFeedback", "Please allow pop-ups to export PDF.", true);
    return;
  }

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function openReportFormPreview(report) {
  const printWindow = window.open("", "_blank", "width=980,height=860");
  if (!printWindow) {
    setFeedback("reportsFeedback", "Please allow pop-ups to view and print the report form.", true);
    return;
  }

  const tracking = escapeHtml(report?.tracking || "N/A");
  const submissionTime = escapeHtml(report?.dateTime || "-");
  const reporter = escapeHtml(report?.name || "-");
  const lastname = escapeHtml(report?.lastname || "-");
  const firstname = escapeHtml(report?.firstname || "-");
  const middleInitial = escapeHtml(report?.mi || "-");
  const email = escapeHtml(report?.email || "-");
  const phone = escapeHtml(report?.phone || "-");
  const reporterProvince = escapeHtml(report?.reporterProvince || "-");
  const reporterCity = escapeHtml(report?.reporterCity || "-");
  const reporterBarangay = escapeHtml(report?.reporterBarangay || "-");
  const reporterStreetAddress = escapeHtml(report?.reporterStreetAddress || "-");
  const region = escapeHtml(report?.region || "-");
  const province = escapeHtml(report?.province || "-");
  const location = escapeHtml(report?.location || "-");
  const roadName = escapeHtml((report?.roadName && report.roadName !== "-") ? report.roadName : report?.location || "-");
  const barangay = escapeHtml(report?.barangay || "-");
  const city = escapeHtml(report?.city || "-");
  const landmark = escapeHtml(report?.nearestLandmark || "-");
  const category = escapeHtml(report?.issueCategory || "-");
  const issueType = escapeHtml(report?.issueType || report?.issueTypeOption || report?.issue || "-");
  const issueTypeOption = escapeHtml(report?.issueTypeOption || report?.issueType || "-");
  const details = escapeHtml(report?.issue || "-");
  const status = escapeHtml(normalizeStatus(report?.status));
  const coordinates = (() => {
    const lat = toNumberOrNull(report?.lat);
    const lng = toNumberOrNull(report?.lng);
    if (lat !== null && lng !== null) return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    const fallbackCoordinates = String(report?.coordinatesText || "").trim();
    return fallbackCoordinates || "-";
  })();
  const fullRoadAddress = [roadName, barangay, city, province].filter((value) => value && value !== "-").join(", ") || "-";
  const qualityScore = `${getDataQualityScore(report)}%`;
  const verificationState = escapeHtml(getVerificationState(report));
  const photo = String(report?.photo || "").trim();
  const safePhotoHtml = photo
    ? `<img src="${escapeHtml(photo)}" alt="Submitted issue photo" class="form-photo">`
    : '<div class="photo-placeholder">No uploaded photo</div>';

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>RoadWatch Submitted Report - ${tracking}</title>
    <style>
      :root { color-scheme: light; }
      body { font-family: Arial, sans-serif; color: #1b2c3b; margin: 0; background: #eef3f9; }
      .sheet { max-width: 980px; margin: 20px auto; background: #fff; border: 1px solid #d5e1ec; border-radius: 14px; padding: 22px; }
      .toolbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 16px; }
      .toolbar h1 { margin: 0; font-size: 24px; line-height: 1.2; }
      .toolbar p { margin: 4px 0 0; color: #4c647b; font-size: 13px; }
      .print-btn { background: #1f5f8b; color: #fff; border: 0; border-radius: 8px; padding: 10px 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
      .overview { margin-bottom: 14px; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr); gap: 12px; }
      .section { border: 1px solid #dbe7f1; border-radius: 12px; padding: 12px; margin-bottom: 12px; background: #fdfefe; }
      .section h2 { margin: 0 0 10px; font-size: 15px; color: #204768; text-transform: uppercase; letter-spacing: .04em; }
      .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 12px; }
      .item { border: 1px solid #dbe7f1; border-radius: 10px; padding: 10px 12px; background: #fbfdff; }
      .item strong { display: block; margin-bottom: 4px; font-size: 12px; color: #47617a; text-transform: uppercase; letter-spacing: .04em; }
      .item span { font-size: 14px; line-height: 1.45; word-break: break-word; }
      .item.full { grid-column: 1 / -1; }
      .photo-section { height: 100%; display: flex; flex-direction: column; }
      .photo-wrap { margin-top: 0; height: 100%; display: flex; flex-direction: column; gap: 8px; }
      .form-photo { width: 100%; min-height: 260px; max-height: 380px; object-fit: cover; border: 1px solid #d5e1ec; border-radius: 10px; background: #f7fbff; }
      .photo-placeholder { border: 1px dashed #bed0df; border-radius: 10px; padding: 24px; text-align: center; color: #607a93; background: #f8fbff; min-height: 220px; display: grid; place-items: center; }
      .photo-caption { margin: 0; font-size: 12px; color: #607a93; }
      @media (max-width: 780px) {
        .overview { grid-template-columns: 1fr; }
        .grid { grid-template-columns: 1fr; }
      }
      @media print {
        body { background: #fff; }
        .sheet { margin: 0; border: 0; border-radius: 0; max-width: 100%; padding: 0; }
        .print-btn { display: none; }
        .overview { grid-template-columns: 1fr; }
        .form-photo { max-height: 320px; }
      }
    </style>
  </head>
  <body>
    <article class="sheet">
      <div class="toolbar">
        <div>
          <h1>Submitted Road Issue Form</h1>
          <p>RoadWatch PH • Tracking # ${tracking}</p>
        </div>
        <button class="print-btn" type="button" onclick="window.print()">Print / Save as PDF</button>
      </div>
      <div class="overview">
        <section class="section">
          <h2>Submission Summary</h2>
          <div class="grid">
            <div class="item"><strong>Submission Time</strong><span>${submissionTime}</span></div>
            <div class="item"><strong>Tracking #</strong><span>${tracking}</span></div>
            <div class="item"><strong>Status</strong><span>${status}</span></div>
            <div class="item"><strong>Verification</strong><span>${verificationState}</span></div>
            <div class="item"><strong>Data Quality</strong><span>${qualityScore}</span></div>
            <div class="item"><strong>Reporter Name (Combined)</strong><span>${reporter}</span></div>
          </div>
        </section>
        <section class="section photo-section">
          <h2>Submitted Photo</h2>
          <div class="photo-wrap">
            ${safePhotoHtml}
            <p class="photo-caption">Captured proof from the field submission.</p>
          </div>
        </section>
      </div>
      <section class="section">
        <h2>Reporter Information</h2>
        <div class="grid">
          <div class="item"><strong>Last Name</strong><span>${lastname}</span></div>
          <div class="item"><strong>First Name</strong><span>${firstname}</span></div>
          <div class="item"><strong>Middle Initial</strong><span>${middleInitial}</span></div>
          <div class="item"><strong>Email Address</strong><span>${email}</span></div>
          <div class="item"><strong>Mobile Number</strong><span>${phone}</span></div>
          <div class="item"><strong>Reporter Province</strong><span>${reporterProvince}</span></div>
          <div class="item"><strong>Reporter City / Municipality</strong><span>${reporterCity}</span></div>
          <div class="item"><strong>Reporter Barangay</strong><span>${reporterBarangay}</span></div>
          <div class="item full"><strong>Reporter Street Address</strong><span>${reporterStreetAddress}</span></div>
        </div>
      </section>
      <section class="section">
        <h2>Road Location</h2>
        <div class="grid">
          <div class="item"><strong>Region</strong><span>${region}</span></div>
          <div class="item"><strong>Province</strong><span>${province}</span></div>
          <div class="item"><strong>City / Municipality</strong><span>${city}</span></div>
          <div class="item"><strong>Barangay</strong><span>${barangay}</span></div>
          <div class="item full"><strong>Road Name</strong><span>${roadName}</span></div>
          <div class="item full"><strong>Road Location (Submitted)</strong><span>${location}</span></div>
          <div class="item full"><strong>Full Road Address</strong><span>${fullRoadAddress}</span></div>
          <div class="item"><strong>Nearest Landmark</strong><span>${landmark}</span></div>
          <div class="item"><strong>Selected Coordinates</strong><span>${coordinates}</span></div>
        </div>
      </section>
      <section class="section">
        <h2>Report Details</h2>
        <div class="grid">
          <div class="item"><strong>Issue Category</strong><span>${category}</span></div>
          <div class="item"><strong>Issue Type</strong><span>${issueType}</span></div>
          <div class="item"><strong>Issue Type Option</strong><span>${issueTypeOption}</span></div>
          <div class="item full"><strong>Issue Description</strong><span>${details}</span></div>
        </div>
      </section>
    </article>
  </body>
</html>`;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
}

function renderAnalytics(reports) {
  const analyticsReports = getAnalyticsFilteredReports(reports);
  const counts = {
    total: reports.length,
    pending: 0,
    verified: 0,
    inProgress: 0,
    repaired: 0,
    needsVerification: 0,
    flagged: 0,
    qualityTotal: 0
  };

  reports.forEach((report) => {
    const normalized = normalizeStatus(report.status).toLowerCase();
    if (normalized === "pending") counts.pending += 1;
    if (normalized === "verified") counts.verified += 1;
    if (normalized === "in progress") counts.inProgress += 1;
    if (normalized === "repaired") counts.repaired += 1;
    if (getVerificationState(report) === "Needs Verification") counts.needsVerification += 1;
    if (getVerificationState(report) === "Flagged") counts.flagged += 1;
    counts.qualityTotal += getDataQualityScore(report);
  });

  document.getElementById("totalReportsCount").textContent = counts.total;
  document.getElementById("pendingReportsCount").textContent = counts.pending;
  document.getElementById("verifiedReportsCount").textContent = counts.verified;
  document.getElementById("inProgressReportsCount").textContent = counts.inProgress;
  document.getElementById("repairedReportsCount").textContent = counts.repaired;
  document.getElementById("needsVerificationCount").textContent = counts.needsVerification;
  document.getElementById("flaggedReportsCount").textContent = counts.flagged;
  document.getElementById("avgQualityScore").textContent = `${reports.length ? Math.round(counts.qualityTotal / reports.length) : 0}%`;
  const highPriorityCount = reports.filter((report) => getPriorityScore(report) >= 70).length;
  document.getElementById("highPriorityCount").textContent = highPriorityCount;

  const snapshotTotal = document.getElementById("snapshotTotalCount");
  const snapshotPending = document.getElementById("snapshotPendingCount");
  const snapshotVerified = document.getElementById("snapshotVerifiedCount");
  if (snapshotTotal) snapshotTotal.textContent = counts.total;
  if (snapshotPending) snapshotPending.textContent = counts.pending;
  if (snapshotVerified) snapshotVerified.textContent = counts.verified;

  const urgentCount = analyticsReports.filter((report) => getPriorityScore(report) >= 75).length;
  const moderateCount = analyticsReports.filter((report) => {
    const score = getPriorityScore(report);
    return score >= 45 && score < 75;
  }).length;
  const lowCount = Math.max(analyticsReports.length - urgentCount - moderateCount, 0);
  const totalForSeverity = Math.max(analyticsReports.length, 1);
  const urgentShare = Math.round((urgentCount / totalForSeverity) * 100);
  const moderateShare = Math.round((moderateCount / totalForSeverity) * 100);
  const lowShare = Math.max(100 - urgentShare - moderateShare, 0);

  const severityUrgentCount = document.getElementById("severityUrgentCount");
  const severityModerateCount = document.getElementById("severityModerateCount");
  const severityLowCount = document.getElementById("severityLowCount");
  if (severityUrgentCount) severityUrgentCount.textContent = urgentCount;
  if (severityModerateCount) severityModerateCount.textContent = moderateCount;
  if (severityLowCount) severityLowCount.textContent = lowCount;

  const severityUrgentMeter = document.getElementById("severityUrgentMeter");
  const severityModerateMeter = document.getElementById("severityModerateMeter");
  const severityLowMeter = document.getElementById("severityLowMeter");
  if (severityUrgentMeter) severityUrgentMeter.style.width = `${urgentShare}%`;
  if (severityModerateMeter) severityModerateMeter.style.width = `${moderateShare}%`;
  if (severityLowMeter) severityLowMeter.style.width = `${lowShare}%`;
  const severityUrgentMeta = document.getElementById("severityUrgentMeta");
  const severityModerateMeta = document.getElementById("severityModerateMeta");
  const severityLowMeta = document.getElementById("severityLowMeta");
  if (severityUrgentMeta) severityUrgentMeta.textContent = `${urgentShare}% share • ${describeSeverityAge(analyticsReports, (score) => score >= 75)}`;
  if (severityModerateMeta) severityModerateMeta.textContent = `${moderateShare}% share • ${describeSeverityAge(analyticsReports, (score) => score >= 45 && score < 75)}`;
  if (severityLowMeta) severityLowMeta.textContent = `${lowShare}% share • ${describeSeverityAge(analyticsReports, (score) => score < 45)}`;

  if (analyticsTimelineSummary) {
    const selectedBarangay = analyticsBarangayFilter?.value || "all";
    const selectedIssueType = analyticsIssueTypeFilter?.value || "all";
    const selectedSeverity = analyticsSeverityFilter?.value || "all";
    const labels = [];
    if (selectedBarangay !== "all") labels.push(selectedBarangay);
    if (selectedIssueType !== "all") labels.push(selectedIssueType);
    if (selectedSeverity !== "all") labels.push(selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1));
    const filterText = labels.length ? labels.join(" • ") : "All reports";
    analyticsTimelineSummary.textContent = `${filterText} • ${analyticsReports.length} matching report(s).`;
  }

  drawStatusChart(counts);
  renderTeamPerformanceBoard(reports);
  renderExecutiveSummary(reports);
  renderForecastCards(reports);
  renderAiRecommendations(reports);
  renderAnalyticsTimeline(analyticsReports);
}

function describeSeverityAge(reports, matcher) {
  const matchingReports = reports.filter((report) => matcher(getPriorityScore(report)));
  if (!matchingReports.length) return "No aging data";

  const now = Date.now();
  const totalDays = matchingReports.reduce((sum, report) => {
    const date = parseReportDate(report);
    if (!date) return sum;
    return sum + Math.max(0, (now - date.getTime()) / 86400000);
  }, 0);

  const averageDays = Math.max(1, Math.round(totalDays / matchingReports.length));
  return `~${averageDays} day${averageDays === 1 ? "" : "s"} old`;
}

function renderAnalyticsTimeline(reports) {
  const timelineBars = document.getElementById("analyticsTimelineBars");
  if (!timelineBars) return;

  const bucketMap = new Map();
  reports.forEach((report) => {
    const date = parseReportDate(report);
    if (!date) return;
    const key = date.toISOString().slice(0, 10);
    bucketMap.set(key, (bucketMap.get(key) || 0) + 1);
  });

  const entries = Array.from(bucketMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-10);

  if (!entries.length) {
    timelineBars.innerHTML = '<p class="small">No dated reports available for timeline analytics yet.</p>';
    return;
  }

  const maxValue = Math.max(...entries.map(([, count]) => count), 1);
  timelineBars.innerHTML = entries.map(([isoDate, count]) => {
    const heightPercent = Math.max(16, Math.round((count / maxValue) * 100));
    const label = new Date(`${isoDate}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return `
      <div class="timelineBar" role="img" aria-label="${label}: ${count} report${count === 1 ? "" : "s"}">
        <span class="timelineBarValue">${count}</span>
        <span class="timelineBarFill" style="height:${heightPercent}%"></span>
        <span class="timelineBarLabel">${label}</span>
      </div>`;
  }).join("");
}

function populateSelectFilter(select, values, allLabel) {
  if (!select) return;
  const previousValue = select.value || "all";
  const uniqueValues = Array.from(new Set(values
    .map((value) => String(value || "").trim())
    .filter((value) => value && value !== "-")))
    .sort((a, b) => a.localeCompare(b));

  select.innerHTML = `<option value="all">${allLabel}</option>${uniqueValues
    .map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)
    .join("")}`;

  if (uniqueValues.includes(previousValue)) {
    select.value = previousValue;
  } else {
    select.value = "all";
  }
}

function syncDynamicFilters(reports) {
  populateSelectFilter(categoryFilter, reports.map((report) => report.issueCategory), "All categories");
  populateSelectFilter(barangayFilter, reports.map((report) => report.barangay), "All barangays");
}

function syncAnalyticsFilters(reports) {
  populateSelectFilter(analyticsBarangayFilter, reports.map((report) => report.barangay), "All barangays");
  populateSelectFilter(analyticsIssueTypeFilter, reports.map((report) => report.issueType), "All issue types");
}

function getAnalyticsFilteredReports(reports) {
  const selectedBarangay = analyticsBarangayFilter?.value || "all";
  const selectedIssueType = analyticsIssueTypeFilter?.value || "all";
  const selectedSeverity = analyticsSeverityFilter?.value || "all";

  return reports.filter((report) => {
    if (selectedBarangay !== "all" && String(report.barangay || "").trim() !== selectedBarangay) return false;
    if (selectedIssueType !== "all" && String(report.issueType || "").trim() !== selectedIssueType) return false;
    if (selectedSeverity !== "all") {
      const score = getPriorityScore(report);
      const severity = score >= 75 ? "urgent" : score >= 45 ? "moderate" : "low";
      if (severity !== selectedSeverity) return false;
    }
    return true;
  });
}

function getFilteredReports() {
  const query = reportSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedCategory = categoryFilter?.value || "all";
  const selectedBarangay = barangayFilter?.value || "all";
  const selectedQuality = qualityFilter?.value || "all";
  const selectedPreset = triagePreset?.value || "all";
  const thresholdDays = getUrgencyThresholdDays();
  const now = Date.now();

  return allReports.filter((report) => {
    const statusPass = selectedStatus === "all" || normalizeStatus(report.status) === selectedStatus;
    if (!statusPass) return false;

    const categoryPass = selectedCategory === "all" || report.issueCategory === selectedCategory;
    if (!categoryPass) return false;

    const barangayPass = selectedBarangay === "all" || report.barangay === selectedBarangay;
    if (!barangayPass) return false;

    const qualityScore = getDataQualityScore(report);
    const qualityPass = selectedQuality === "all" || getQualityBand(qualityScore) === selectedQuality;
    if (!qualityPass) return false;

    if (selectedPreset !== "all") {
      const verificationState = getVerificationState(report);
      const isRepaired = normalizeStatus(report.status) === "Repaired";
      const reportDate = parseReportDate(report);
      const ageDays = reportDate ? Math.floor((now - reportDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

      if (selectedPreset === "highRisk" && (isRepaired || ageDays < thresholdDays)) return false;
      if (selectedPreset === "needsVerification" && verificationState !== "Needs Verification") return false;
      if (selectedPreset === "flagged" && verificationState !== "Flagged") return false;
      if (selectedPreset === "lowQuality" && qualityScore >= 50) return false;
      if (selectedPreset === "duplicates" && !getDuplicateClusters(allReports).some((cluster) => cluster.some((entry) => entry.tracking === report.tracking))) return false;
      if (selectedPreset === "critical" && getSeverityLabel(report) !== "Critical") return false;
    }

    if (urgentOnlyMode && getPriorityScore(report) < 75) return false;

    if (!query) return true;
    const haystack = [
      report.dateTime,
      report.tracking,
      report.name,
      report.location,
      report.issue,
      report.issueCategory,
      report.issueType,
      report.barangay
    ].join(" ").toLowerCase();
    return haystack.includes(query);
  });
}

function getTotalPages(totalItems) {
  return Math.max(1, Math.ceil(totalItems / REPORTS_PER_PAGE));
}

function getPaginatedReports(reports) {
  const totalPages = getTotalPages(reports.length);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * REPORTS_PER_PAGE;
  return reports.slice(startIndex, startIndex + REPORTS_PER_PAGE);
}

function renderPagination(totalItems) {
  const totalPages = getTotalPages(totalItems);
  if (paginationSummary) {
    paginationSummary.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
  if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}

function renderRows(reports) {
  if (reports.length === 0) {
    reportsBody.innerHTML = '<tr><td colspan="18">No reports match your current filters.</td></tr>';
    renderSelectionSummary();
    return;
  }

  reportsBody.innerHTML = "";

  reports.forEach((report) => {
    const tr = document.createElement("tr");
    const effectiveStatus = normalizeStatus(report.status);

    const trackingValue = String(report.tracking || "").trim();
    const verificationState = getVerificationState(report);
    const qualityScore = getDataQualityScore(report);
    const qualityBand = getQualityBand(qualityScore);
    const escalationState = getEscalationState(report);

    if (getPriorityScore(report) >= 75) tr.classList.add("is-urgent-row");

    tr.innerHTML = `
      <td></td>
      <td>${escapeHtml(report.dateTime || "-")}</td>
      <td>${escapeHtml(report.tracking || "-")}</td>
      <td>${escapeHtml(report.name || "-")}</td>
      <td>${escapeHtml(report.location || "-")}</td>
      <td>${escapeHtml(report.issueCategory || "-")}</td>
      <td>${escapeHtml(report.issueType || report.issue || "-")}</td>
      <td><span class="quality-badge quality-${qualityBand}">${qualityScore}%</span></td>
      <td><span class="priority-badge">P${getPriorityScore(report)}</span></td>
      <td><span class="verification-badge ${verificationState === "Flagged" ? "is-flagged" : verificationState === "Needs Verification" ? "is-pending" : "is-verified"}">${verificationState}</span></td>
      <td><span class="severity-badge severity-${getSeverityLabel(report).toLowerCase()}">${getSeverityLabel(report)}</span></td>
      <td>${escapeHtml(report.assignedTo || "Unassigned")}</td>
      <td>${formatDueAt(report.dueAt)}</td>
      <td><span class="verification-badge ${escalationState === "Overdue" ? "is-flagged" : escalationState === "At Risk" ? "is-pending" : "is-verified"}">${escalationState}</span></td>
      <td>${report.projectId ? escapeHtml(report.projectId) : "-"}</td>
      <td></td>
      <td></td>
      <td></td>
    `;

    const selector = document.createElement("input");
    selector.type = "checkbox";
    selector.className = "row-select";
    selector.checked = trackingValue ? selectedReports.has(trackingValue) : false;
    selector.disabled = !trackingValue;
    selector.addEventListener("change", () => {
      if (!trackingValue) return;
      if (selector.checked) {
        selectedReports.add(trackingValue);
        if (timelineTrackingSelect && !timelineTrackingSelect.value) {
          timelineTrackingSelect.value = trackingValue;
          renderCaseTimeline(trackingValue);
          renderClosureChecklist(trackingValue);
        }
      } else {
        selectedReports.delete(trackingValue);
      }
      renderSelectionSummary();
    });
    tr.children[0].appendChild(selector);

    const photoElement = photoCell(report.photo);
    if (typeof photoElement === "string") {
      tr.children[15].textContent = photoElement;
    } else {
      tr.children[15].appendChild(photoElement);
    }

    tr.children[16].classList.add("status-cell");
    tr.children[16].appendChild(statusSelect(effectiveStatus, report.tracking));

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
        const trackingValue = String(report.tracking || "").trim();
        selectedReports.delete(trackingValue);
        flaggedReports.delete(trackingValue);
        removeStatusOverride(trackingValue);
        addAuditEntry("Report Deleted", report.tracking, "Deleted from management table");
        addTimelineEntry(report.tracking, "Report Deleted", "Deleted from management table");
        setFeedback("reportsFeedback", `Deleted ${report.tracking}.`);
        applyFiltersAndRender();
      } catch (error) {
        setFeedback("reportsFeedback", error.message || "Unable to delete report.", true);
      } finally {
        deleteBtn.disabled = false;
      }
    });
    const timelineBtn = document.createElement("button");
    timelineBtn.type = "button";
    timelineBtn.className = "secondary slim";
    timelineBtn.textContent = "Timeline";
    timelineBtn.addEventListener("click", () => focusTimeline(report.tracking));
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "secondary slim";
    viewBtn.textContent = "View";
    viewBtn.addEventListener("click", () => openReportFormPreview(report));
    tr.children[17].classList.add("action-cell");
    tr.children[17].append(viewBtn, timelineBtn, deleteBtn);

    reportsBody.appendChild(tr);
  });
  renderSelectionSummary();
}

function applyFiltersAndRender() {
  syncDynamicFilters(allReports);
  syncAnalyticsFilters(allReports);
  syncTimelineTrackingOptions(allReports);
  const filtered = getFilteredReports();
  const paginated = getPaginatedReports(filtered);
  renderManagementSnapshot(filtered);
  renderRows(paginated);
  renderAnalytics(allReports);
  renderPriorityQueue(allReports);
  renderVerificationQueue(allReports);
  renderSlaQueue(allReports);
  renderOverviewQueueTable(allReports);
  renderAuditTrail();
  refreshReportingSection(allReports);
  renderDuplicateCaseBoard(allReports);
  renderProjectPortfolio();
  renderModerationBoard(allReports);
  renderRootCauseBoard(allReports);
  renderFieldOpsBoard(allReports);
  renderTrustCenterBoard();
  renderClosureChecklist();
  renderPermissionsSummary();
  renderActiveFilterChips();
  const startItem = filtered.length === 0 ? 0 : ((currentPage - 1) * REPORTS_PER_PAGE) + 1;
  const endItem = Math.min(currentPage * REPORTS_PER_PAGE, filtered.length);
  const urgentLabel = urgentOnlyMode ? " • Urgent-only mode enabled" : "";
  filterSummary.textContent = `Showing ${startItem}-${endItem} of ${filtered.length} filtered report(s) from ${allReports.length} total.${urgentLabel}`;
  renderPagination(filtered.length);
}

async function loadReports() {
  reportsBody.innerHTML = '<tr><td colspan="18">Loading reports...</td></tr>';
  setTableLoadingState(true, "Loading latest reports...");
  setSheetSyncStatus("Checking Google Sheets connection…", "warn");

  // Use Google Sheet values as the single source of truth to avoid stale local status mismatches.
  localStorage.removeItem(ADMIN_STATUS_OVERRIDES_KEY);

  try {
    let selectedPayload = null;
    let selectedParsedReports = [];
    let sourceLabel = "";
    let lastError = null;

    const cacheBust = `cb=${Date.now()}`;
    for (const source of REPORT_ENDPOINTS) {
      try {
        const separator = source.url.includes("?") ? "&" : "?";
        const payload = await fetchApiPayload(`${source.url}${separator}action=getReports&${cacheBust}`);
        const parsedReports = parseReports(payload);
        selectedPayload = payload;
        selectedParsedReports = parsedReports;
        sourceLabel = source.label;
        break;
      } catch (error) {
        lastError = error;
      }
    }

    if (!selectedPayload) {
      throw lastError || new Error("Unable to connect to any Google Sheets endpoint.");
    }

    selectedReports.clear();
    renderSelectionSummary();
    currentPage = 1;

    allReports = dedupeReports(
      selectedParsedReports
      .map(normalizeReport)
      .map(applyCaseMetadata)
    );
    if (allReports.length === 0) {
      reportsBody.innerHTML = '<tr><td colspan="18">No reports found.</td></tr>';
      renderAnalytics([]);
      renderPriorityQueue([]);
      renderSlaQueue([]);
      renderAuditTrail();
      renderCaseTimeline("");
      refreshReportingSection([]);
      filterSummary.textContent = "No records to filter.";
      activeReportsSource = sourceLabel;
      setSheetSyncStatus(`Connected to ${sourceLabel} • Last sync ${formatSyncTime(Date.now())}.`, "ok");
      setTableLoadingState(false);
      return;
    }

    activeReportsSource = sourceLabel;
    setSheetSyncStatus(`Connected to ${sourceLabel} • Last sync ${formatSyncTime(Date.now())}.`, "ok");
    applyFiltersAndRender();
    setFeedback("reportsFeedback", `Loaded ${allReports.length} report(s) from ${sourceLabel}.`);
  } catch (error) {
    reportsBody.innerHTML = '<tr><td colspan="18">Unable to load reports right now.</td></tr>';
    renderAnalytics([]);
    renderPriorityQueue([]);
    renderSlaQueue([]);
    renderAuditTrail();
    renderCaseTimeline("");
    refreshReportingSection([]);
    filterSummary.textContent = "";
    setFeedback("reportsFeedback", error.message, true);
    if (activeReportsSource) {
      setSheetSyncStatus(
        `Connection problem. Showing last synced source: ${activeReportsSource}.`,
        "error"
      );
    } else {
      setSheetSyncStatus("Google Sheets is unreachable. Check Apps Script deployment and access.", "error");
    }
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
  if (categoryFilter) categoryFilter.value = "all";
  if (barangayFilter) barangayFilter.value = "all";
  if (qualityFilter) qualityFilter.value = "all";
  if (triagePreset) triagePreset.value = "all";
  if (analyticsBarangayFilter) analyticsBarangayFilter.value = "all";
  if (analyticsIssueTypeFilter) analyticsIssueTypeFilter.value = "all";
  if (analyticsSeverityFilter) analyticsSeverityFilter.value = "all";
  setUrgentOnlyMode(false);
  syncSearchInputs("workspace");
  currentPage = 1;
  applyFiltersAndRender();
});
reportSearch.addEventListener("input", () => {
  syncSearchInputs("workspace");
  currentPage = 1;
  applyFiltersAndRender();
});
dashboardSearch?.addEventListener("input", () => {
  syncSearchInputs("topbar");
  setDashboardView("management");
  setManagementPane("workspace");
  currentPage = 1;
  applyFiltersAndRender();
});
urgentOnlyToggleBtn?.addEventListener("click", () => {
  setUrgentOnlyMode(!urgentOnlyMode);
  currentPage = 1;
  applyFiltersAndRender();
});
statusFilter.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
categoryFilter?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
barangayFilter?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
qualityFilter?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
triagePreset?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
analyticsBarangayFilter?.addEventListener("change", () => renderAnalytics(allReports));
analyticsIssueTypeFilter?.addEventListener("change", () => renderAnalytics(allReports));
analyticsSeverityFilter?.addEventListener("change", () => renderAnalytics(allReports));
urgencyThresholdDays?.addEventListener("change", () => renderPriorityQueue(allReports));
window.addEventListener("resize", () => renderAnalytics(allReports));

verificationFilter?.addEventListener("change", () => renderVerificationQueue(allReports));
slaFilter?.addEventListener("change", () => renderSlaQueue(allReports));

showOverviewBtn?.addEventListener("click", () => setDashboardView("overview"));
showManagementBtn?.addEventListener("click", () => setDashboardView("management"));
openTriageFromOverviewBtn?.addEventListener("click", () => {
  setDashboardView("management");
  setManagementPane("triage");
});
openTriageShortcutBtn?.addEventListener("click", () => {
  setDashboardView("management");
  setManagementPane("triage");
});
focusUrgentShortcutBtn?.addEventListener("click", () => {
  if (triagePreset) triagePreset.value = "critical";
  setDashboardView("management");
  setManagementPane("triage");
  currentPage = 1;
  applyFiltersAndRender();
});
syncDataShortcutBtn?.addEventListener("click", () => {
  loadReports();
});
showTriagePaneBtn?.addEventListener("click", () => setManagementPane("triage"));
showWorkspacePaneBtn?.addEventListener("click", () => setManagementPane("workspace"));
applyBulkStatusBtn?.addEventListener("click", () => {
  applyBulkStatusUpdate();
});
clearSelectionBtn?.addEventListener("click", () => {
  selectedReports.clear();
  renderSelectionSummary();
  applyFiltersAndRender();
});


document.getElementById("clearAuditTrailBtn")?.addEventListener("click", () => {
  saveAuditTrail([]);
  setFeedback("reportsFeedback", "Cleared local audit trail entries.");
  renderAuditTrail();
});

document.getElementById("addTimelineNoteBtn")?.addEventListener("click", () => {
  const tracking = String(timelineTrackingSelect?.value || "").trim();
  const note = String(timelineNoteInput?.value || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Choose a tracking number before adding a timeline note.", true);
    return;
  }
  if (!note) {
    setFeedback("reportsFeedback", "Write a timeline note before saving.", true);
    return;
  }

  addTimelineEntry(tracking, "Admin Note", note);
  addAuditEntry("Timeline Note Added", tracking, note.slice(0, 80));
  if (timelineNoteInput) timelineNoteInput.value = "";
  renderCaseTimeline(tracking);
  setFeedback("reportsFeedback", `Saved timeline note for ${tracking}.`);
});

timelineTrackingSelect?.addEventListener("change", () => {
  renderCaseTimeline(timelineTrackingSelect.value);
});



reportingRange?.addEventListener("change", () => refreshReportingSection(allReports));

prevPageBtn?.addEventListener("click", () => {
  currentPage = Math.max(1, currentPage - 1);
  applyFiltersAndRender();
});

nextPageBtn?.addEventListener("click", () => {
  const filtered = getFilteredReports();
  currentPage = Math.min(getTotalPages(filtered.length), currentPage + 1);
  applyFiltersAndRender();
});

document.getElementById("exportCsvBtn")?.addEventListener("click", () => {
  exportReportsToCsv(getFilteredReports());
  setFeedback("reportsFeedback", "CSV report exported for local government review.");
});

document.getElementById("exportPdfBtn")?.addEventListener("click", () => {
  exportReportsToPdf(getFilteredReports());
  setFeedback("reportsFeedback", "PDF report prepared for print/export.");
});


queueNotificationBtn?.addEventListener("click", () => {
  const tracking = String(timelineTrackingSelect?.value || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Choose a tracking number before queuing a citizen update.", true);
    return;
  }
  const template = notificationTemplateSelect?.value || "received";
  const eta = publicEtaInput?.value || "";
  const message = (notificationMessageInput?.value || "").trim() || `Citizen update: ${template}.`;
  queueNotification(tracking, template, message, eta);
  updateCaseMeta(tracking, { publicEta: eta, publicMessage: message });
  const report = allReports.find((item) => String(item.tracking || "").trim() === tracking);
  if (report) {
    report.publicEta = eta;
    report.publicMessage = message;
  }
  addAuditEntry("Citizen Update Queued", tracking, template);
  addTimelineEntry(tracking, "Citizen Update", message);
  if (notificationMessageInput) notificationMessageInput.value = "";
  setFeedback("reportsFeedback", `Queued citizen update for ${tracking}.`);
  renderTrustCenterBoard();
  renderClosureChecklist(tracking);
});

saveClosureBtn?.addEventListener("click", () => {
  const tracking = String(timelineTrackingSelect?.value || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Choose a tracking number before saving closure evidence.", true);
    return;
  }
  const closureProof = String(closureProofInput?.value || "").trim();
  const closureDetails = String(closureDetailsInput?.value || "").trim();
  if (!closureProof && !closureDetails) {
    setFeedback("reportsFeedback", "Add closure proof or repair details first.", true);
    return;
  }
  const verificationChecklist = [
    { label: "Closure proof uploaded", done: Boolean(closureProof) },
    { label: "Repair summary saved", done: Boolean(closureDetails) },
    { label: "QA reviewed", done: true }
  ];
  updateCaseMeta(tracking, { closureProof, closureDetails, verificationChecklist, repairEvidenceSavedAt: new Date().toISOString() });
  const report = allReports.find((item) => String(item.tracking || "").trim() === tracking);
  if (report) {
    report.closureProof = closureProof;
    report.closureDetails = closureDetails;
    report.verificationChecklist = verificationChecklist;
    report.repairEvidenceSavedAt = new Date().toISOString();
  }
  addAuditEntry("Closure Evidence Saved", tracking, closureDetails.slice(0, 80));
  addTimelineEntry(tracking, "Closure Evidence", closureDetails || closureProof);
  setFeedback("reportsFeedback", `Saved closure evidence for ${tracking}.`);
  renderClosureChecklist(tracking);
});

saveCollabNoteBtn?.addEventListener("click", () => {
  const tracking = String(timelineTrackingSelect?.value || "").trim();
  const mention = String(mentionInput?.value || "").trim();
  const role = roleFilterSelect?.value || "Super Admin";
  if (!tracking) {
    setFeedback("reportsFeedback", "Choose a tracking number before saving a collaboration note.", true);
    return;
  }
  updateCaseMeta(tracking, { role, mention });
  const report = allReports.find((item) => String(item.tracking || "").trim() === tracking);
  if (report) {
    report.role = role;
    report.mention = mention;
  }
  addAuditEntry("Collaboration Note", tracking, `${role}${mention ? ` · ${mention}` : ""}`);
  addTimelineEntry(tracking, "Collaboration Note", `${role}${mention ? ` · ${mention}` : ""}`);
  if (mentionInput) mentionInput.value = "";
  setFeedback("reportsFeedback", `Saved collaboration note for ${tracking}.`);
  renderPermissionsSummary();
});

createProjectBtn?.addEventListener("click", () => {
  const selected = allReports.filter((report) => selectedReports.has(String(report.tracking || "").trim()));
  if (selected.length === 0) {
    setFeedback("reportsFeedback", "Select at least one report to create a repair project.", true);
    return;
  }
  const project = createProjectFromReports(selected, {
    name: projectNameInput?.value || "Road Repair Project",
    owner: projectOwnerSelect?.value || "City Engineering Office",
    budget: projectBudgetInput?.value || "TBD"
  });
  if (!project) return;
  allReports = allReports.map((report) => selected.some((item) => item.tracking === report.tracking) ? { ...report, projectId: project.id } : report);
  addAuditEntry("Project Created", project.id, `${project.name} · ${project.trackings.length} reports`);
  setFeedback("reportsFeedback", `Created ${project.id} from ${selected.length} selected report(s).`);
  applyFiltersAndRender();
});

forecastRange?.addEventListener("change", () => renderForecastCards(allReports));
roleFilterSelect?.addEventListener("change", () => renderPermissionsSummary());

setDashboardView("overview");
renderCaseTimeline("");
applyAuthUI();

retrySyncBtn?.addEventListener("click", () => {
  loadReports();
});

setUrgentOnlyMode(false);
renderAdminIdentity();
