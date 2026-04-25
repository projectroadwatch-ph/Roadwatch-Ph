const ADMIN_SESSION_KEY = "roadwatchAdminAuthed";
const adminDataLayer = window.RoadwatchAdminDataLayer || {
  apiUrl: "",
  createReportEndpoints: () => [],
  getStatusWriteEndpoints: () => [],
  fetchApiPayload: async () => ({}),
  loadJsonp: async () => ({}),
  isLikelyCorsBlockedRequest: () => false
};
const ADMIN_CASE_META_KEY = "roadwatchAdminCaseMeta";
const ADMIN_AUDIT_TRAIL_KEY = "roadwatchAdminAuditTrail";
const ADMIN_CASE_TIMELINE_KEY = "roadwatchAdminCaseTimeline";
const ADMIN_NOTIFICATION_QUEUE_KEY = "roadwatchAdminNotificationQueue";
const ADMIN_PROJECTS_KEY = "roadwatchAdminProjects";
const ADMIN_STATUS_OVERRIDES_KEY = "roadwatchAdminStatusOverrides";
const ADMIN_SAVED_VIEWS_KEY = "roadwatchAdminSavedViews";
const ADMIN_LAST_SYNC_KEY = "roadwatchAdminLastSyncAt";
const ADMIN_SESSION_STARTED_AT_KEY = "roadwatchAdminSessionStartedAt";
const ADMIN_SERVER_MODE_KEY = "roadwatchAdminServerMode";
const ADMIN_AUTO_UI_IMPROVER_KEY = "roadwatchAdminAutoUiImprover";
const ADMIN_WORKSPACE_PREFS_KEY = "roadwatchAdminWorkspacePrefs";
const adminUi = window.RoadwatchAdminUI || {
  drawStatusChart: () => {},
  getActiveFilterDescriptors: () => [],
  renderActiveFilterChips: () => {},
  renderAdminIdentity: () => {},
  setFeedback: () => {},
  setSheetSyncStatus: () => {},
  setTableLoadingState: () => {},
  syncSearchInputs: () => {}
};
const adminAuth = window.RoadwatchAdminAuth;
const adminHomePage = window.RoadwatchAdminHomePage || {};
const adminWorkspacePage = window.RoadwatchAdminWorkspacePage || {};
const adminTriagePage = window.RoadwatchAdminTriagePage || {};

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
const analyticsStatusFilter = document.getElementById("analyticsStatusFilter");
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
const sidebarNavLinks = Array.from(document.querySelectorAll("[data-nav-view]"));
const sidebarSectionLinks = Array.from(document.querySelectorAll(".admin-sidebar__sections a[href^='#']"));
const sidebarOverviewToggle = document.getElementById("sidebarOverviewToggle");
const sidebarOverviewSections = document.getElementById("sidebarOverviewSections");
const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
const adminBreadcrumbView = document.getElementById("adminBreadcrumbView");
const adminBreadcrumbPane = document.getElementById("adminBreadcrumbPane");
const adminBreadcrumbPaneSeparator = document.getElementById("adminBreadcrumbPaneSeparator");
const openTriageFromOverviewBtn = document.getElementById("openTriageFromOverviewBtn");
const openTriageHeroBtn = document.getElementById("openTriageHeroBtn");
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
const sessionMetaStatus = document.getElementById("sessionSummaryBadge");
const statusFilterButtons = Array.from(document.querySelectorAll("[data-status-filter]"));
const statusChartSummaryList = document.getElementById("statusChartSummaryList");
const toggleDensityBtn = document.getElementById("toggleDensityBtn");
const autoUiImproverBtn = document.getElementById("autoUiImproverBtn");
const notificationToggleBtn = document.getElementById("notificationToggleBtn");
const notificationBadge = document.getElementById("notificationBadge");
const notificationPanel = document.getElementById("notificationPanel");
const notificationPanelList = document.getElementById("notificationPanelList");
const markAllReadBtn = document.getElementById("markAllReadBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const quickFilterPresets = Array.from(document.querySelectorAll("[data-quick-preset]"));
const urgentOnlyToggleBtn = document.getElementById("urgentOnlyToggleBtn");
const runSmartDispatchBtn = document.getElementById("runSmartDispatchBtn");
const bulkStatusValue = document.getElementById("bulkStatusValue");
const selectVisibleBtn = document.getElementById("selectVisibleBtn");
const applyBulkStatusBtn = document.getElementById("applyBulkStatusBtn");
const clearSelectionBtn = document.getElementById("clearSelectionBtn");
const selectionSummary = document.getElementById("selectionSummary");
const managementFilteredCount = document.getElementById("managementFilteredCount");
const managementUrgentCount = document.getElementById("managementUrgentCount");
const managementVerificationCount = document.getElementById("managementVerificationCount");
const managementSelectedCount = document.getElementById("managementSelectedCount");
const savedViewSelect = document.getElementById("savedViewSelect");
const columnPresetSelect = document.getElementById("columnPresetSelect");
const sortBySelect = document.getElementById("sortBySelect");
const saveCurrentViewBtn = document.getElementById("saveCurrentViewBtn");
const deleteSavedViewBtn = document.getElementById("deleteSavedViewBtn");
const rowsPerPageSelect = document.getElementById("rowsPerPageSelect");
const staleDataBanner = document.getElementById("staleDataBanner");
const syncMetaStatus = document.getElementById("syncMetaStatus");
const showKanbanViewBtn = document.getElementById("showKanbanViewBtn");
const showCardViewBtn = document.getElementById("showCardViewBtn");
const showTableViewBtn = document.getElementById("showTableViewBtn");
const cardWorkspace = document.getElementById("cardWorkspace");
const kanbanWorkspace = document.getElementById("kanbanWorkspace");
const tableWorkspace = document.getElementById("tableWorkspace");
const reportCardsGrid = document.getElementById("reportCardsGrid");
const severityQuickFilter = document.getElementById("severityQuickFilter");
const statusQuickFilter = document.getElementById("statusQuickFilter");
const dateQuickFilter = document.getElementById("dateQuickFilter");
const kanbanPending = document.getElementById("kanbanPending");
const kanbanVerified = document.getElementById("kanbanVerified");
const kanbanInProgress = document.getElementById("kanbanInProgress");
const kanbanRepaired = document.getElementById("kanbanRepaired");
const kanbanCountPending = document.getElementById("kanbanCountPending");
const kanbanCountVerified = document.getElementById("kanbanCountVerified");
const kanbanCountInProgress = document.getElementById("kanbanCountInProgress");
const kanbanCountRepaired = document.getElementById("kanbanCountRepaired");
const kanbanDrawerEmpty = document.getElementById("kanbanDrawerEmpty");
const kanbanDrawerContent = document.getElementById("kanbanDrawerContent");
const kanbanDetailTracking = document.getElementById("kanbanDetailTracking");
const kanbanDetailLocation = document.getElementById("kanbanDetailLocation");
const kanbanDetailIssue = document.getElementById("kanbanDetailIssue");
const kanbanAssignTo = document.getElementById("kanbanAssignTo");
const kanbanDueAt = document.getElementById("kanbanDueAt");
const kanbanSaveMetaBtn = document.getElementById("kanbanSaveMetaBtn");
const kanbanSetPendingBtn = document.getElementById("kanbanSetPendingBtn");
const kanbanSetVerifiedBtn = document.getElementById("kanbanSetVerifiedBtn");
const kanbanSetProgressBtn = document.getElementById("kanbanSetProgressBtn");
const kanbanSetRepairedBtn = document.getElementById("kanbanSetRepairedBtn");

let allReports = [];
let pendingStatusUpdates = 0;
const selectedReports = new Set();
const flaggedReports = new Set();
let rowsPerPage = Number(rowsPerPageSelect?.value || 15);
let currentPage = 1;
let overviewMap = null;
let overviewMarkers = null;
let activeReportsSource = "";
let urgentOnlyMode = false;
let activeColumnView = "operations";
let activeDashboardView = "management";
let activeManagementPane = "workspace";
let staleDataIntervalId = null;
let workspaceLayoutMode = "cards";
let activeKanbanTracking = "";
let autoUiImproverIntervalId = null;
let isLoadingReports = false;
let workspacePrefsPersistTimeoutId = null;
let realtimeSyncIntervalId = null;

const REPORT_ENDPOINTS = adminDataLayer.createReportEndpoints();
const STATUS_OPTIONS = ["Pending", "Verified", "In Progress", "Repaired"];
const SESSION_MAX_MS = 8 * 60 * 60 * 1000;
const STALE_THRESHOLD_MS = 10 * 60 * 1000;
const REALTIME_SYNC_INTERVAL_MS = 30000;

function setTextIfPresent(elementId, value) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.textContent = value;
}

const adminTheme = window.RoadwatchAdminTheme || {
  constants: {
    ADMIN_THEME_KEY: "roadwatchAdminTheme",
    ADMIN_THEME_ORDER: ["dark", "light"],
    ADMIN_DARK_QUERY: "(prefers-color-scheme: dark)"
  },
  getSystemTheme: () => "dark",
  getPreferredTheme: () => "dark",
  setTheme: () => "dark",
  cycleTheme: () => "dark"
};
const ADMIN_THEME_KEY = adminTheme.constants.ADMIN_THEME_KEY;
const ADMIN_THEME_ORDER = adminTheme.constants.ADMIN_THEME_ORDER;
const ADMIN_DARK_QUERY = adminTheme.constants.ADMIN_DARK_QUERY;

const AUTH_STORAGE_KEYS = new Set([
  ADMIN_SESSION_KEY,
  ADMIN_SESSION_STARTED_AT_KEY,
  ADMIN_SERVER_MODE_KEY,
  "roadwatchAdminActiveUser",
  "roadwatchAdminRole"
]);

function readAuthStorage(key) {
  const normalizedKey = String(key || "");
  if (!normalizedKey) return null;

  const sessionValue = window.sessionStorage?.getItem(normalizedKey);
  if (sessionValue !== null && sessionValue !== undefined) return sessionValue;

  if (!AUTH_STORAGE_KEYS.has(normalizedKey)) return null;
  const legacyValue = window.localStorage?.getItem(normalizedKey);
  if (legacyValue !== null && legacyValue !== undefined) {
    try {
      window.sessionStorage?.setItem(normalizedKey, legacyValue);
      window.localStorage?.removeItem(normalizedKey);
    } catch (error) {
      console.warn("Unable to migrate auth storage key", normalizedKey, error);
    }
    return legacyValue;
  }

  return null;
}

function writeAuthStorage(key, value) {
  const normalizedKey = String(key || "");
  if (!normalizedKey) return;

  try {
    window.sessionStorage?.setItem(normalizedKey, String(value));
    window.localStorage?.removeItem(normalizedKey);
  } catch (error) {
    console.warn("Unable to persist auth storage key", normalizedKey, error);
  }
}

function clearAuthStorage(key) {
  const normalizedKey = String(key || "");
  if (!normalizedKey) return;

  try {
    window.sessionStorage?.removeItem(normalizedKey);
    window.localStorage?.removeItem(normalizedKey);
  } catch (error) {
    console.warn("Unable to clear auth storage key", normalizedKey, error);
  }
}

function getStatusWriteEndpoints() {
  return adminDataLayer.getStatusWriteEndpoints();
}

async function fetchApiPayload(endpoint) {
  return adminDataLayer.fetchApiPayload(endpoint);
}

async function loadJsonp(endpoint) {
  return adminDataLayer.loadJsonp(endpoint);
}

function isLikelyCorsBlockedRequest(endpoint, error) {
  return adminDataLayer.isLikelyCorsBlockedRequest(endpoint, error);
}

function parseReports(payload) {
  const hasAnyValue = (record) => {
    if (!record || typeof record !== "object") return false;
    return Object.values(record).some((value) => String(value ?? "").trim() !== "");
  };

  const toObjectRows = (rows) => {
    if (!Array.isArray(rows) || rows.length === 0) return [];
    if (!Array.isArray(rows[0])) {
      return rows.filter(hasAnyValue);
    }

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

function isMeaningfulRawReport(record = {}) {
  const hasData = (keys = []) => keys.some((key) => String(getFieldValue(record, [key]) || "").trim() !== "");
  return hasData([
    "tracking",
    "trackingNumber",
    "tracking_no",
    "tracking number",
    "Tracking #",
    "Tracking Number",
    "reference number",
    "Reference Number"
  ]) || hasData([
    "issue",
    "issueDetail",
    "issueDetails",
    "Issue",
    "Issue Detail",
    "Issue Details",
    "description",
    "details",
    "issueType",
    "issue_type",
    "Issue Type",
    "issueCategory",
    "issue_category",
    "Issue Category"
  ]) || hasData([
    "location",
    "address",
    "road",
    "Road Location",
    "incidentLocation",
    "Incident Location",
    "roadName",
    "Road Name",
    "barangay",
    "Barangay",
    "city",
    "City",
    "municipality"
  ]);
}

function setFeedback(id, message, isError = false) {
  adminUi.setFeedback(id, message, isError);
}

function setSheetSyncStatus(message, state = "warn") {
  adminUi.setSheetSyncStatus(sheetSyncStatus, message, state);
}

function renderAdminIdentity() {
  const storedRole = String(readAuthStorage("roadwatchAdminRole") || "").trim();
  const role = roleFilterSelect?.value || storedRole || "Super Admin";
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";
  adminUi.renderAdminIdentity(adminIdentityChip, {
    role,
    isLocalSession: isAuthed
  });
}

function syncSearchInputs(source = "workspace") {
  adminUi.syncSearchInputs({ dashboardSearch, reportSearch, source });
}

function setUrgentOnlyMode(nextValue) {
  urgentOnlyMode = Boolean(nextValue);
  if (!urgentOnlyToggleBtn) return;
  urgentOnlyToggleBtn.setAttribute("aria-pressed", String(urgentOnlyMode));
  urgentOnlyToggleBtn.textContent = `Urgent only: ${urgentOnlyMode ? "On" : "Off"}`;
}

function setDenseMode(nextValue) {
  const isDense = Boolean(nextValue);
  document.body.classList.toggle("admin-dense", isDense);
  if (!toggleDensityBtn) return;
  toggleDensityBtn.setAttribute("aria-pressed", String(isDense));
  toggleDensityBtn.textContent = `Dense mode: ${isDense ? "On" : "Off"}`;
}

function isAutoUiImproverEnabled() {
  return localStorage.getItem(ADMIN_AUTO_UI_IMPROVER_KEY) === "true";
}

function updateAutoUiImproverButton() {
  if (!autoUiImproverBtn) return;
  const enabled = isAutoUiImproverEnabled();
  autoUiImproverBtn.setAttribute("aria-pressed", String(enabled));
  autoUiImproverBtn.textContent = `Auto UI Improver: ${enabled ? "On" : "Off"}`;
}

function stopAutoUiImprover() {
  if (!autoUiImproverIntervalId) return;
  window.clearInterval(autoUiImproverIntervalId);
  autoUiImproverIntervalId = null;
}

function runAutoUiImprover() {
  if (!isAutoUiImproverEnabled()) return;
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";
  if (!isAuthed) return;

  const filteredReports = getFilteredReports();
  const totalReports = filteredReports.length;
  const hasNarrowViewport = window.innerWidth < 1180;
  const hasWideViewport = window.innerWidth >= 1320;
  const isDenseMode = document.body.classList.contains("admin-dense");

  if (totalReports >= 18 && !isDenseMode) setDenseMode(true);
  if (totalReports <= 10 && isDenseMode) setDenseMode(false);

  if (hasNarrowViewport) {
    document.body.classList.add("sidebar-collapsed");
    sidebarToggleBtn?.setAttribute("aria-expanded", "false");
  } else if (hasWideViewport) {
    document.body.classList.remove("sidebar-collapsed");
    sidebarToggleBtn?.setAttribute("aria-expanded", "true");
  }

  const lastSync = getLastSuccessfulSync();
  const shouldRefreshData = !isLoadingReports && (!lastSync || (Date.now() - lastSync) > (5 * 60 * 1000));
  if (shouldRefreshData) {
    loadReports();
  }
}

function setAutoUiImproverEnabled(nextValue) {
  localStorage.setItem(ADMIN_AUTO_UI_IMPROVER_KEY, nextValue ? "true" : "false");
  updateAutoUiImproverButton();
  stopAutoUiImprover();
  if (nextValue) {
    runAutoUiImprover();
    autoUiImproverIntervalId = window.setInterval(runAutoUiImprover, 45000);
  }
}

function buildWorkspacePrefsSnapshot() {
  return {
    version: 1,
    dashboardView: activeDashboardView,
    managementPane: activeManagementPane,
    workspaceLayoutMode,
    rowsPerPage,
    denseMode: document.body.classList.contains("admin-dense"),
    filters: buildCurrentViewConfig()
  };
}

function persistWorkspacePrefs() {
  const snapshot = buildWorkspacePrefsSnapshot();
  localStorage.setItem(ADMIN_WORKSPACE_PREFS_KEY, JSON.stringify(snapshot));
}

function queuePersistWorkspacePrefs() {
  if (workspacePrefsPersistTimeoutId) {
    window.clearTimeout(workspacePrefsPersistTimeoutId);
  }
  workspacePrefsPersistTimeoutId = window.setTimeout(() => {
    persistWorkspacePrefs();
  }, 180);
}

function loadWorkspacePrefs() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ADMIN_WORKSPACE_PREFS_KEY) || "{}");
    if (!parsed || typeof parsed !== "object") return;

    const preferredView = parsed.dashboardView === "management" ? "management" : "overview";
    const preferredPane = parsed.managementPane === "triage" ? "triage" : "workspace";
    const preferredLayout = parsed.workspaceLayoutMode === "table" || parsed.workspaceLayoutMode === "kanban"
      ? parsed.workspaceLayoutMode
      : "cards";

    setDashboardView(preferredView);
    if (preferredView === "management") {
      setManagementPane(preferredPane);
    }
    setWorkspaceLayoutMode(preferredLayout);
    setDenseMode(Boolean(parsed.denseMode));
    applySavedViewConfig(parsed.filters);
    queuePersistWorkspacePrefs();
  } catch {
    // Ignore malformed local preference payloads.
  }
}

function getActiveFilterDescriptors() {
  return adminUi.getActiveFilterDescriptors({
    reportSearch,
    statusFilter,
    categoryFilter,
    barangayFilter,
    qualityFilter,
    triagePreset,
    urgentOnlyMode
  });
}

function clearFilterByKey(key) {
  switch (key) {
    case "search":
      if (reportSearch) reportSearch.value = "";
      syncSearchInputs("workspace");
      break;
    case "status":
      if (statusFilter) statusFilter.value = "all";
      if (statusQuickFilter) statusQuickFilter.value = "all";
      statusFilterButtons.forEach((button) => button.classList.remove("is-active"));
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
  const descriptors = getActiveFilterDescriptors();
  adminUi.renderActiveFilterChips(activeFilterChips, descriptors, clearFilterByKey);
}

function getSavedViews() {
  try {
    const raw = localStorage.getItem(ADMIN_SAVED_VIEWS_KEY);
    const parsed = JSON.parse(raw || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSavedViews(views) {
  localStorage.setItem(ADMIN_SAVED_VIEWS_KEY, JSON.stringify((views || []).slice(0, 12)));
}

function showTextEntryDialog({
  title = "Enter details",
  message = "",
  initialValue = "",
  placeholder = "",
  confirmText = "Save",
  cancelText = "Cancel"
} = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "admin-text-dialog-backdrop";

    const dialog = document.createElement("section");
    dialog.className = "admin-text-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "adminTextDialogTitle");

    const titleElement = document.createElement("h3");
    titleElement.id = "adminTextDialogTitle";
    titleElement.textContent = String(title || "Enter details");

    const messageElement = document.createElement("p");
    messageElement.textContent = String(message || "");
    messageElement.className = "admin-text-dialog__message";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "admin-text-dialog__input";
    input.value = String(initialValue || "");
    input.placeholder = String(placeholder || "");
    input.maxLength = 96;
    input.autocomplete = "off";

    const actions = document.createElement("div");
    actions.className = "admin-text-dialog__actions";

    const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "secondary";
    cancelBtn.textContent = String(cancelText || "Cancel");

    const confirmBtn = document.createElement("button");
    confirmBtn.type = "button";
    confirmBtn.textContent = String(confirmText || "Save");

    actions.append(cancelBtn, confirmBtn);
    dialog.append(titleElement, messageElement, input, actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const cleanup = () => {
      document.removeEventListener("keydown", handleDocumentKeydown);
      overlay.remove();
    };

    const submit = () => {
      const value = String(input.value || "").trim();
      cleanup();
      resolve(value);
    };

    const cancel = () => {
      cleanup();
      resolve(null);
    };

    const handleDocumentKeydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        cancel();
      } else if (event.key === "Enter") {
        event.preventDefault();
        submit();
      }
    };

    cancelBtn.addEventListener("click", cancel);
    confirmBtn.addEventListener("click", submit);
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) cancel();
    });
    document.addEventListener("keydown", handleDocumentKeydown);

    window.requestAnimationFrame(() => input.focus());
  });
}

function buildCurrentViewConfig() {
  return {
    reportSearch: reportSearch?.value || "",
    statusFilter: statusFilter?.value || "all",
    categoryFilter: categoryFilter?.value || "all",
    barangayFilter: barangayFilter?.value || "all",
    qualityFilter: qualityFilter?.value || "all",
    triagePreset: triagePreset?.value || "all",
    urgentOnlyMode,
    rowsPerPage,
    columnView: activeColumnView,
    sortBy: sortBySelect?.value || "priorityDesc"
  };
}

function applySavedViewConfig(config) {
  if (!config || typeof config !== "object") return;
  if (reportSearch) reportSearch.value = String(config.reportSearch || "");
  syncSearchInputs("workspace");
  if (statusFilter) statusFilter.value = config.statusFilter || "all";
  if (statusQuickFilter) statusQuickFilter.value = statusFilter?.value || "all";
  statusFilterButtons.forEach((button) => {
    const buttonStatus = String(button.dataset.statusFilter || "").trim();
    const isActive = (statusFilter?.value || "all") !== "all" && buttonStatus === statusFilter?.value;
    button.classList.toggle("is-active", isActive);
  });
  if (categoryFilter) categoryFilter.value = config.categoryFilter || "all";
  if (barangayFilter) barangayFilter.value = config.barangayFilter || "all";
  if (qualityFilter) qualityFilter.value = config.qualityFilter || "all";
  if (triagePreset) triagePreset.value = config.triagePreset || "all";
  setUrgentOnlyMode(Boolean(config.urgentOnlyMode));
  rowsPerPage = Math.max(5, Number(config.rowsPerPage || rowsPerPage || 15));
  if (rowsPerPageSelect) rowsPerPageSelect.value = String(rowsPerPage);
  if (sortBySelect) sortBySelect.value = config.sortBy || "priorityDesc";
  setTableColumnView(config.columnView || activeColumnView);
}

function renderSavedViews() {
  if (!savedViewSelect) return;
  const views = getSavedViews();
  const previous = savedViewSelect.value;
  const options = views.map((view) => `<option value="${escapeHtml(view.id)}">${escapeHtml(view.name)}</option>`).join("");
  savedViewSelect.innerHTML = `<option value="">Choose a saved view</option>${options}`;
  if (views.some((view) => view.id === previous)) savedViewSelect.value = previous;
}

async function saveCurrentView() {
  if (!guardPermission("publish", "Your role cannot save personal workspace views.")) return;
  const name = await showTextEntryDialog({
    title: "Save current workspace view",
    message: "Give this view a name so you can quickly return to these filters and layout settings.",
    placeholder: "e.g., Urgent verification lane",
    confirmText: "Save View"
  });
  const trimmedName = String(name || "").trim();
  if (!trimmedName) return;

  const nextView = {
    id: `view-${Date.now()}`,
    name: trimmedName.slice(0, 48),
    config: buildCurrentViewConfig()
  };

  const views = getSavedViews();
  views.unshift(nextView);
  saveSavedViews(views);
  renderSavedViews();
  if (savedViewSelect) savedViewSelect.value = nextView.id;
  setFeedback("reportsFeedback", `Saved view "${nextView.name}".`);
}

function deleteSelectedSavedView() {
  if (!guardPermission("publish", "Your role cannot delete saved views.")) return;
  const targetId = savedViewSelect?.value || "";
  if (!targetId) {
    setFeedback("reportsFeedback", "Choose a saved view to delete.", true);
    return;
  }
  const views = getSavedViews();
  const targetView = views.find((view) => view.id === targetId);
  const remaining = views.filter((view) => view.id !== targetId);
  saveSavedViews(remaining);
  renderSavedViews();
  setFeedback("reportsFeedback", `Deleted saved view "${targetView?.name || targetId}".`);
}

function setTableColumnView(view = "operations") {
  const table = document.querySelector(".management-table");
  if (!table) return;
  const normalized = view === "triage" ? "triage" : "operations";
  activeColumnView = normalized;
  if (columnPresetSelect) columnPresetSelect.value = normalized;
  table.classList.toggle("view-triage", normalized === "triage");
  table.classList.toggle("view-operations", normalized === "operations");
}

function formatSyncTime(timestamp) {
  if (!timestamp) return "unknown time";
  return new Date(timestamp).toLocaleString();
}

function getCurrentRole() {
  return roleFilterSelect?.value || "Super Admin";
}

function hasPermission(permission) {
  const role = getCurrentRole();
  const permissionsByRole = {
    "Super Admin": ["delete", "bulk_status", "assign", "publish", "export"],
    Verifier: ["publish"],
    Dispatcher: ["bulk_status", "assign", "publish"],
    "Field Lead": ["publish"],
    Viewer: ["export"]
  };
  return (permissionsByRole[role] || []).includes(permission);
}

function guardPermission(permission, deniedMessage = "You do not have permission for this action.") {
  if (hasPermission(permission)) return true;
  setFeedback("reportsFeedback", deniedMessage, true);
  return false;
}

function applyRoleUiVisibility() {
  const role = getCurrentRole().toLowerCase().replace(/\s+/g, "-");
  document.body.classList.remove("role-super-admin", "role-verifier", "role-dispatcher", "role-field-lead", "role-viewer", "role-field-officer");
  document.body.classList.add(`role-${role}`);
  if (role.includes("field")) document.body.classList.add("role-field-officer");
}

function setLastSuccessfulSync(timestamp = Date.now()) {
  localStorage.setItem(ADMIN_LAST_SYNC_KEY, String(timestamp));
}

function getLastSuccessfulSync() {
  const parsed = Number(localStorage.getItem(ADMIN_LAST_SYNC_KEY) || "0");
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function updateSyncMetaStatus() {
  if (!syncMetaStatus) return;
  const lastSync = getLastSuccessfulSync();
  syncMetaStatus.textContent = `Last successful sync: ${lastSync ? formatSyncTime(lastSync) : "Never"} • Source: ${activeReportsSource || "Not connected"}`;
}

function updateSessionMetaStatus() {
  if (!sessionMetaStatus) return;
  const startedAt = Number(readAuthStorage(ADMIN_SESSION_STARTED_AT_KEY) || "0");
  const lastSync = getLastSuccessfulSync();
  const sessionLabel = startedAt ? `Session since ${formatSyncTime(startedAt)}` : "Not signed in";
  const syncLabel = lastSync ? `Last sync ${formatSyncTime(lastSync)}` : "Sync pending";
  sessionMetaStatus.textContent = `${sessionLabel} • ${syncLabel}`;
}

function updateSessionMetaVisibility(view = activeDashboardView) {
  if (!sessionMetaStatus) return;
  sessionMetaStatus.hidden = view !== "overview";
}

function buildDashboardNotifications() {
  const queue = getNotificationQueue().slice(0, 8);
  if (queue.length > 0) {
    return queue.map((item) => {
      const tracking = String(item.tracking || "Unknown report");
      const template = String(item.template || "update").replace(/[-_]+/g, " ").trim();
      const message = String(item.message || "Citizen update queued.").trim();
      const createdAt = item.createdAt ? new Date(item.createdAt) : null;
      const timestamp = createdAt && !Number.isNaN(createdAt.getTime())
        ? createdAt.toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
        : "Recent";

      return {
        title: `Report ${tracking}`,
        message,
        meta: `${template || "Update"} • ${timestamp}`,
        severity: "info",
        isEmptyState: false
      };
    });
  }
  return [
    {
      title: "All caught up",
      message: "No unread notifications right now.",
      meta: "New activity will appear here",
      severity: "info",
      isEmptyState: true
    }
  ];
}

function renderNotificationPanel() {
  const notifications = buildDashboardNotifications();
  if (notificationBadge) {
    notificationBadge.textContent = String(Math.max(0, notifications.filter((item) => !item.isEmptyState).length));
  }
  if (!notificationPanelList) return;
  notificationPanelList.innerHTML = notifications.map((item) => `
    <li class="notification-item" data-severity="${escapeHtml(item.severity)}" data-empty-state="${item.isEmptyState ? "true" : "false"}">
      <strong class="notification-item__title">${escapeHtml(item.title || "Notification")}</strong>
      <p class="notification-item__message">${escapeHtml(item.message || "")}</p>
      <span class="notification-item__meta">${escapeHtml(item.meta || "")}</span>
    </li>
  `).join("");
}

function setNotificationPanelOpen(isOpen) {
  if (!notificationPanel || !notificationToggleBtn) return;
  notificationPanel.hidden = !isOpen;
  notificationToggleBtn.setAttribute("aria-expanded", String(isOpen));
}

let pendingShortcutPrefix = "";
let pendingShortcutTimerId = null;

function clearShortcutPrefix() {
  pendingShortcutPrefix = "";
  if (pendingShortcutTimerId) {
    window.clearTimeout(pendingShortcutTimerId);
    pendingShortcutTimerId = null;
  }
}

function startShortcutPrefix(prefix) {
  clearShortcutPrefix();
  pendingShortcutPrefix = prefix;
  pendingShortcutTimerId = window.setTimeout(clearShortcutPrefix, 900);
}

function refreshStaleDataBanner() {
  if (!staleDataBanner) return;
  const lastSync = getLastSuccessfulSync();
  const isStale = !lastSync || (Date.now() - lastSync) > STALE_THRESHOLD_MS;
  staleDataBanner.hidden = !isStale;
  if (isStale) {
    staleDataBanner.textContent = "Data may be stale (>10 minutes since last successful sync). Please sync now.";
  }
}

function startStaleDataMonitor() {
  if (staleDataIntervalId) window.clearInterval(staleDataIntervalId);
  staleDataIntervalId = window.setInterval(refreshStaleDataBanner, 60000);
  refreshStaleDataBanner();
  updateSyncMetaStatus();
}

function stopRealtimeSync() {
  if (!realtimeSyncIntervalId) return;
  window.clearInterval(realtimeSyncIntervalId);
  realtimeSyncIntervalId = null;
}

function startRealtimeSync() {
  stopRealtimeSync();
  realtimeSyncIntervalId = window.setInterval(() => {
    if (document.hidden) return;
    loadReports();
  }, REALTIME_SYNC_INTERVAL_MS);
}

function formatRelativeAgeFromDate(report) {
  const date = parseReportDate(report);
  if (!date) return "unknown age";
  const ageDays = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  return `${ageDays} day(s) open`;
}

function getUrgencyReason(report) {
  const reasons = [];
  const escalationState = getEscalationState(report);
  const verificationState = getVerificationState(report);
  const quality = getDataQualityScore(report);
  const severity = getSeverityLabel(report);
  if (escalationState === "Overdue") reasons.push("SLA overdue");
  else if (escalationState === "At Risk") reasons.push("SLA at risk");
  if (verificationState === "Needs Verification") reasons.push("needs verification");
  if (verificationState === "Flagged") reasons.push("flagged for moderation");
  if (severity === "Critical") reasons.push("critical severity");
  if (quality < 50) reasons.push("low data quality");
  reasons.push(formatRelativeAgeFromDate(report));
  return reasons.slice(0, 3).join(" • ");
}

function enforceSessionTtl() {
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";
  if (!isAuthed) return;
  const startedAt = Number(readAuthStorage(ADMIN_SESSION_STARTED_AT_KEY) || "0");
  if (startedAt && (Date.now() - startedAt) > SESSION_MAX_MS) {
    clearAuthStorage(ADMIN_SESSION_KEY);
    clearAuthStorage("roadwatchAdminActiveUser");
    clearAuthStorage(ADMIN_SESSION_STARTED_AT_KEY);
    updateSessionMetaStatus();
    setFeedback("loginFeedback", "Session expired. Please log in again.", true);
  }
}



function setTableLoadingState(isLoading, message = "") {
  adminUi.setTableLoadingState(isLoading, message);
}

function drawStatusChart(counts) {
  adminUi.drawStatusChart(counts, {
    onStatusClick: (statusLabel) => {
      applyStatusFilter(statusLabel);
    },
    onSummaryUpdate: (summaryItems = []) => {
      if (!statusChartSummaryList) return;
      statusChartSummaryList.innerHTML = summaryItems.map((item) => {
        const [rawLabel, rawValue] = String(item).split(":");
        const label = (rawLabel || "").trim();
        const value = Number(rawValue ?? 0);
        return `<li><span class="status-chart-summary-label" data-status="${escapeHtml(label)}">${escapeHtml(label)}</span><strong class="status-chart-summary-value">${Number.isFinite(value) ? value : 0}</strong></li>`;
      }).join("");
    }
  });
}

function getRelativeTimeLabel(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "Unknown time";
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMins = Math.max(0, Math.floor(diffMs / 60000));
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  if (diffMins < 2880) return "Yesterday";
  return `${Math.floor(diffMins / 1440)}d ago`;
}

function renderOperationalSnapshotDetails(reports) {
  const weeklyBars = document.getElementById("snapshotQueueBars");
  const activityList = document.getElementById("snapshotRecentActivity");
  if (!weeklyBars && !activityList) return;

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  reports.forEach((report) => {
    const date = parseReportDate(report);
    if (!date) return;
    const jsDay = date.getDay();
    const mondayIndex = (jsDay + 6) % 7;
    dayCounts[mondayIndex] += 1;
  });

  if (weeklyBars) {
    const maxCount = Math.max(...dayCounts, 1);
    weeklyBars.innerHTML = dayLabels.map((label, index) => {
      const value = dayCounts[index];
      const barHeight = value > 0 ? Math.max(12, Math.round((value / maxCount) * 148)) : 10;
      const emptyClass = value === 0 ? " is-empty" : "";
      return `<div class="snapshot-weekly-bar"><span class="snapshot-weekly-bar__value">${value}</span><span class="snapshot-weekly-bar__column${emptyClass}" style="height:${barHeight}px"></span><span class="snapshot-weekly-bar__label">${label}</span></div>`;
    }).join("");
  }

  if (activityList) {
    const recent = reports
      .map((report) => ({ report, date: parseReportDate(report) }))
      .filter((entry) => entry.date)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 3);

    if (recent.length === 0) {
      activityList.innerHTML = '<li class="snapshot-activity-item"><span class="snapshot-activity-status"></span><div class="snapshot-activity-main"><span class="snapshot-activity-title">No recent activity</span><span class="snapshot-activity-sub">New status updates will appear here.</span></div><span class="snapshot-activity-time">—</span></li>';
      return;
    }

    activityList.innerHTML = recent.map(({ report, date }) => {
      const tracking = escapeHtml(report.tracking || "Unknown report");
      const status = normalizeStatus(report.status);
      const location = escapeHtml(report.location || report.barangay || "Unknown area");
      return `<li class="snapshot-activity-item"><span class="snapshot-activity-status" data-status="${escapeHtml(status)}"></span><div class="snapshot-activity-main"><span class="snapshot-activity-title">Report ${tracking} ${escapeHtml(status.toLowerCase())}</span><span class="snapshot-activity-sub">${location}</span></div><span class="snapshot-activity-time">${getRelativeTimeLabel(date)}</span></li>`;
    }).join("");
  }
}

function applyStatusFilter(statusLabel) {
  if (!statusFilter) return;
  statusFilter.value = statusLabel;
  statusFilterButtons.forEach((button) => {
    const buttonStatus = String(button.dataset.statusFilter || "").trim();
    button.classList.toggle("is-active", buttonStatus === statusLabel);
  });
  currentPage = 1;
  applyFiltersAndRender();
  setFeedback("reportsFeedback", `Filtered workspace to status: ${statusLabel}.`);
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
  renderNotificationPanel();
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
  if (score >= 40) return "Medium";
  return "Low";
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


function ensureDashboardContentVisibility() {
  const overviewHidden = overviewView?.hidden !== false;
  const managementHidden = managementView?.hidden !== false;

  if (overviewHidden && managementHidden) {
    if (activeDashboardView === "management") {
      if (managementView) managementView.hidden = false;
      if (overviewView) overviewView.hidden = true;
    } else {
      if (overviewView) overviewView.hidden = false;
      if (managementView) managementView.hidden = true;
      activeDashboardView = "overview";
    }
  }

  if (activeDashboardView === "management") {
    const triageHidden = triagePane?.hidden !== false;
    const workspaceHidden = workspacePane?.hidden !== false;
    if (triageHidden && workspaceHidden) {
      if (workspacePane) workspacePane.hidden = false;
      if (triagePane) triagePane.hidden = true;
      activeManagementPane = "workspace";
      updateSidebarNavState("management", "workspace");
      setBreadcrumbs("management", "workspace");
    }
  }
}
function setDashboardView(view) {
  const activeView = view === "management" ? "management" : "overview";
  activeDashboardView = activeView;
  setSidebarOverviewExpanded(activeView === "overview");
  updateSessionMetaVisibility(activeView);
  if (showOverviewBtn) showOverviewBtn.setAttribute("aria-selected", String(activeView === "overview"));
  if (showManagementBtn) showManagementBtn.setAttribute("aria-selected", String(activeView === "management"));
  if (activeView === "management") {
    if (overviewView) overviewView.hidden = true;
    if (managementView) managementView.hidden = false;
    if (operationsView) operationsView.hidden = true;
    showOverviewBtn?.classList.remove("is-active");
    showManagementBtn?.classList.add("is-active");
    showOperationsBtn?.classList.remove("is-active");
    setManagementPane(activeManagementPane);
    queuePersistWorkspacePrefs();
    return;
  }

  if (typeof adminHomePage.activate !== "function") {
    if (overviewView) overviewView.hidden = false;
    if (managementView) managementView.hidden = true;
    if (operationsView) operationsView.hidden = true;
    showOverviewBtn?.classList.add("is-active");
    showManagementBtn?.classList.remove("is-active");
    showOperationsBtn?.classList.remove("is-active");
    updateSidebarNavState("overview", "");
    setBreadcrumbs("overview", "");
    window.setTimeout(() => {
      overviewMap?.invalidateSize();
    }, 40);
    ensureDashboardContentVisibility();
    queuePersistWorkspacePrefs();
    return;
  }

  adminHomePage.activate({
    overviewView,
    managementView,
    operationsView,
    showOverviewBtn,
    showManagementBtn,
    showOperationsBtn,
    updateSidebarNavState,
    setBreadcrumbs,
    overviewMap
  });
  ensureDashboardContentVisibility();
  queuePersistWorkspacePrefs();
}

function getManagementPaneConfig(pane) {
  if (pane === "triage") return adminTriagePage || {};
  return adminWorkspacePage || {};
}

function setManagementPane(pane) {
  const activePane = pane === "triage" ? "triage" : "workspace";
  activeManagementPane = activePane;
  const pageConfig = getManagementPaneConfig(activePane);

  if (typeof pageConfig.activate !== "function") {
    if (triagePane) triagePane.hidden = activePane !== "triage";
    if (workspacePane) workspacePane.hidden = activePane !== "workspace";
    showTriagePaneBtn?.classList.toggle("is-active", activePane === "triage");
    showWorkspacePaneBtn?.classList.toggle("is-active", activePane === "workspace");
    setTableColumnView(activePane === "triage" ? "triage" : "operations");
    updateSidebarNavState("management", activePane);
    setBreadcrumbs("management", activePane);
    ensureDashboardContentVisibility();
    queuePersistWorkspacePrefs();
    return;
  }

  pageConfig.activate({
    triagePane,
    workspacePane,
    showTriagePaneBtn,
    showWorkspacePaneBtn,
    setTableColumnView,
    updateSidebarNavState,
    setBreadcrumbs
  });
  ensureDashboardContentVisibility();
  queuePersistWorkspacePrefs();
}

function updateSidebarNavState(view = "overview", pane = "") {
  sidebarNavLinks.forEach((link) => {
    const targetView = String(link.dataset.navView || "overview");
    const targetPane = String(link.dataset.navPane || "");
    const isActive = targetView === view && (targetPane ? targetPane === pane : pane === "");
    link.classList.toggle("is-active", isActive);
  });
}

function setSidebarOverviewExpanded(expanded) {
  if (!sidebarOverviewToggle || !sidebarOverviewSections) return;
  sidebarOverviewToggle.setAttribute("aria-expanded", String(expanded));
  sidebarOverviewSections.classList.toggle("is-open", Boolean(expanded));
}

function getDashboardPageConfig(view = "overview", pane = "") {
  if (view === "management" && pane === "triage") {
    return adminTriagePage;
  }

  if (view === "management") {
    return adminWorkspacePage;
  }

  return adminHomePage;
}

function setBreadcrumbs(view = "overview", pane = "") {
  if (!adminBreadcrumbView || !adminBreadcrumbPane || !adminBreadcrumbPaneSeparator) return;
  const pageConfig = getDashboardPageConfig(view, pane);
  const viewLabel = pageConfig.breadcrumbViewLabel || (view === "management" ? "System Management" : "Home");
  const paneLabel = pageConfig.breadcrumbPaneLabel || "";
  adminBreadcrumbView.textContent = viewLabel;

  if (paneLabel) {
    adminBreadcrumbPane.hidden = false;
    adminBreadcrumbPaneSeparator.hidden = false;
    adminBreadcrumbPane.textContent = paneLabel;
    return;
  }

  adminBreadcrumbPane.hidden = true;
  adminBreadcrumbPaneSeparator.hidden = true;
  adminBreadcrumbPane.textContent = "";
}

function toggleSidebarVisibility() {
  const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
  sidebarToggleBtn?.setAttribute("aria-expanded", String(!isCollapsed));
}


function applyAuthUI() {
  enforceSessionTtl();
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";

  loginPanel?.classList.toggle("hidden", isAuthed);
  dashboard?.classList.toggle("hidden", !isAuthed);
  if (loginPanel) loginPanel.hidden = isAuthed;
  if (dashboard) dashboard.hidden = !isAuthed;

  document.body.classList.toggle("admin-authenticated", isAuthed);
  if (!isAuthed) {
    document.body.classList.remove("sidebar-collapsed");
    sidebarToggleBtn?.setAttribute("aria-expanded", "true");
  }

  if (isAuthed) {
    document.getElementById("adminPassword").value = "";
    renderAdminIdentity();
    startStaleDataMonitor();
    startRealtimeSync();
    const preferredView = activeDashboardView === "management" ? "management" : "overview";
    setDashboardView(preferredView);
    if (preferredView === "management") {
      setManagementPane(activeManagementPane === "triage" ? "triage" : "workspace");
    }
    loadReports();
    if (isAutoUiImproverEnabled()) setAutoUiImproverEnabled(true);
    ensureDashboardContentVisibility();
    return;
  }

  clearAuthStorage("roadwatchAdminActiveUser");
  renderAdminIdentity();
  refreshStaleDataBanner();
  updateSyncMetaStatus();
  stopRealtimeSync();
  stopAutoUiImprover();
}

function login() {
  const usernameInput = document.getElementById("adminUsername");
  const passwordInput = document.getElementById("adminPassword");
  const username = String(usernameInput?.value || "").trim();
  const password = String(passwordInput?.value || "");
  const authResult = adminAuth?.verifyCredentials({ username, password }) || {
    ok: false,
    mode: "unconfigured",
    message: "Authentication provider is unavailable."
  };

  if (authResult.ok) {
    writeAuthStorage(ADMIN_SESSION_KEY, "true");
    writeAuthStorage("roadwatchAdminActiveUser", authResult.activeUser || username || "Admin");
    writeAuthStorage(ADMIN_SESSION_STARTED_AT_KEY, String(Date.now()));
    writeAuthStorage(ADMIN_SERVER_MODE_KEY, authResult.mode || "server-config");
    if (authResult.role) {
      writeAuthStorage("roadwatchAdminRole", authResult.role);
      if (roleFilterSelect) roleFilterSelect.value = authResult.role;
    }
    setFeedback("loginFeedback", authResult.message || "Login successful.");
    updateSessionMetaStatus();
    setFeedback("reportsFeedback", authResult.mode === "client-local"
      ? "Security warning: local-development auth is enabled. Disable it before production deployment."
      : "Server-configured credentials verified.");
    setDashboardView("overview");
    applyAuthUI();
    return;
  }

  setFeedback("loginFeedback", authResult.message || "Invalid username or password.", true);
  passwordInput?.focus();
  passwordInput?.select();
}

function logout() {
  clearAuthStorage(ADMIN_SESSION_KEY);
  clearAuthStorage("roadwatchAdminActiveUser");
  clearAuthStorage(ADMIN_SESSION_STARTED_AT_KEY);
  updateSessionMetaStatus();
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
    if (!guardPermission("publish", "Your role cannot update report status.")) {
      select.value = select.dataset.previous || current;
      return;
    }
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
  const sidebarTotalReportsCount = document.getElementById("sidebarTotalReportsCount");
  if (sidebarTotalReportsCount) sidebarTotalReportsCount.textContent = String(reports.length);
}

function setWorkspaceLayoutMode(mode = "cards") {
  const requestedMode = mode === "table" || mode === "kanban" ? mode : "cards";
  const canUseKanban = Boolean(kanbanWorkspace);
  const canUseTable = Boolean(tableWorkspace);

  if (requestedMode === "kanban" && !canUseKanban) {
    workspaceLayoutMode = canUseTable ? "table" : "cards";
  } else if (requestedMode === "table" && !canUseTable) {
    workspaceLayoutMode = canUseKanban ? "kanban" : "cards";
  } else {
    workspaceLayoutMode = requestedMode;
  }

  if (cardWorkspace) {
    const isCards = workspaceLayoutMode === "cards";
    cardWorkspace.hidden = !isCards;
    cardWorkspace.setAttribute("aria-hidden", isCards ? "false" : "true");
  }
  if (kanbanWorkspace) {
    const isKanban = workspaceLayoutMode === "kanban";
    kanbanWorkspace.hidden = !isKanban;
    kanbanWorkspace.setAttribute("aria-hidden", isKanban ? "false" : "true");
  }
  if (tableWorkspace) {
    const isTable = workspaceLayoutMode === "table";
    tableWorkspace.hidden = !isTable;
    tableWorkspace.setAttribute("aria-hidden", isTable ? "false" : "true");
  }

  showCardViewBtn?.classList.toggle("is-active", workspaceLayoutMode === "cards");
  showKanbanViewBtn?.classList.toggle("is-active", workspaceLayoutMode === "kanban");
  showTableViewBtn?.classList.toggle("is-active", workspaceLayoutMode === "table");
  queuePersistWorkspacePrefs();
}

function renderCardWorkspace(reports) {
  if (!reportCardsGrid) return;
  if (!reports.length) {
    reportCardsGrid.innerHTML = '<article class="report-card"><p class="small">No reports match your current filters.</p></article>';
    return;
  }

  reportCardsGrid.innerHTML = "";
  reports.forEach((report) => {
    const card = document.createElement("article");
    card.className = "report-card";
    const tracking = String(report.tracking || "").trim();
    const hasTracking = Boolean(tracking);
    const effectiveStatus = normalizeStatus(report.status);
    const severity = getSeverityLabel(report);
    const dateLabel = report.dateTime ? escapeHtml(String(report.dateTime).split(",")[0]) : "Not available";
    const verifiedLabel = effectiveStatus === "Verified" ? "Verified" : "Needs Verification";
    const locationTitle = [report.location, report.city, report.region, report.barangay].filter((value) => value && value !== "-").join(", ") || "Unknown location";
    const qualityScore = `${getDataQualityScore(report)}%`;
    const problemType = [report.issueType, report.issueCategory].filter((value) => value && value !== "-").join(" / ") || "Road issue";
    const reporterName = report.name && report.name !== "-" ? report.name : "Unspecified reporter";
    const reporterEmail = report.email && report.email !== "-" ? report.email : "No email provided";
    const reporterPhone = report.phone && report.phone !== "-" ? report.phone : "No phone provided";
    const zipCode = report.zipCode || report.zip || report.postalCode || "Not provided";
    const verifierName = report.verifier || report.verifyingOfficer || "Assigned LGU verifier";
    const photo = photoCell(report.photo);
    const photoHtml = typeof photo === "string" ? `<div class="report-card__placeholder">${escapeHtml(photo)}</div>` : "";

    card.innerHTML = `
      <header class="report-card__meta report-card__meta--top">
        <span class="report-card__severity severity-${severity.toLowerCase()}"><span class="report-card__severity-dot" aria-hidden="true"></span>${severity}</span>
        <span class="report-card__tracking">${escapeHtml(tracking || "N/A")}</span>
      </header>
      <h4>Report: ${escapeHtml(report.issue || report.issueTypeOption || report.issueType || "Road issue")}</h4>
      <p class="report-card__location"><span aria-hidden="true">📍</span>${escapeHtml(locationTitle)}</p>
      <section class="report-card__hero">
        <div class="report-card__photo"></div>
        <div class="report-card__quick-meta">
          <span class="report-card__quick-badge severity-${severity.toLowerCase()}">${severity.toUpperCase()}</span>
          <p>Submitted: ${dateLabel}</p>
          <p>Verification: ${escapeHtml(verifiedLabel)}</p>
          <hr />
          <p><strong>Tracking ID</strong></p>
          <p class="report-card__quick-id">${escapeHtml(tracking || "N/A")}</p>
        </div>
      </section>
      <section class="report-card__reporter">
        <div class="report-card__reporter-main">
          <p class="report-card__reporter-name">${escapeHtml(reporterName)}</p>
          <p>${escapeHtml(reporterEmail)}</p>
          <p>📞 ${escapeHtml(reporterPhone)}</p>
        </div>
        <div class="report-card__reporter-side">
          <p>Status: <strong>${escapeHtml(effectiveStatus)}</strong></p>
          <p>Road Quality: <strong>${escapeHtml(qualityScore)}</strong></p>
        </div>
      </section>
      <section class="report-card__section">
        <p class="report-card__section-title">📍 Location Details</p>
        <div class="report-card__split">
          <p><span>City/Municipality:</span> ${escapeHtml(report.city || "-")}</p>
          <p><span>Province:</span> ${escapeHtml(report.province || "-")}</p>
        </div>
        <div class="report-card__split">
          <p><span>Barangay:</span> ${escapeHtml(report.barangay || "-")}</p>
          <p><span>Zip Code:</span> ${escapeHtml(String(zipCode))}</p>
        </div>
        <p class="report-card__verifier">Verifying Officer: <strong>${escapeHtml(String(verifierName))}</strong></p>
      </section>
      <section class="report-card__section">
        <p class="report-card__report-id">Report ID: ${escapeHtml(tracking || "N/A")}</p>
        <hr />
        <p><strong>Problem Type:</strong> ${escapeHtml(problemType)}</p>
        <p class="small report-card__desc">${escapeHtml(report.issue || report.issueType || "-")}</p>
      </section>
      <div class="report-card__actions"></div>
    `;

    const photoSlot = card.querySelector(".report-card__photo");
    if (photoSlot) {
      if (typeof photo === "string") {
        photoSlot.innerHTML = photoHtml;
      } else {
        photoSlot.appendChild(photo);
      }
      const marker = document.createElement("span");
      marker.className = "report-card__pin";
      marker.textContent = "📍";
      marker.setAttribute("aria-hidden", "true");
      photoSlot.appendChild(marker);
    }

    const actions = card.querySelector(".report-card__actions");
    if (actions) {
      const viewBtn = document.createElement("button");
      viewBtn.type = "button";
      viewBtn.className = "secondary slim card-action-btn";
      const viewIcon = document.createElement("span");
      viewIcon.className = "material-symbols-rounded card-action-btn__icon";
      viewIcon.setAttribute("aria-hidden", "true");
      viewIcon.textContent = "visibility";
      const viewLabel = document.createElement("span");
      viewLabel.textContent = "View";
      viewBtn.append(viewIcon, viewLabel);
      viewBtn.addEventListener("click", () => openReportFormPreview(report));

      const statusControl = statusSelect(effectiveStatus, report.tracking);
      statusControl.classList.add("card-action-select");
      statusControl.setAttribute("aria-label", `Update status for report ${tracking || "N/A"}`);
      if (!hasTracking) {
        statusControl.disabled = true;
        statusControl.title = "Tracking number required to change status.";
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.type = "button";
      deleteBtn.className = "danger slim card-action-btn card-action-btn--danger";
      const deleteIcon = document.createElement("span");
      deleteIcon.className = "material-symbols-rounded card-action-btn__icon";
      deleteIcon.setAttribute("aria-hidden", "true");
      deleteIcon.textContent = "delete";
      const deleteLabel = document.createElement("span");
      deleteLabel.textContent = "Delete";
      deleteBtn.append(deleteIcon, deleteLabel);
      if (!hasTracking) {
        deleteBtn.disabled = true;
        deleteBtn.title = "Tracking number required to delete report.";
      }
      deleteBtn.addEventListener("click", async () => {
        if (!guardPermission("delete", "Your role cannot delete reports.")) return;
        if (!hasTracking) {
          setFeedback("reportsFeedback", "Tracking number is required to delete this report.", true);
          return;
        }
        const confirmed = window.confirm(`Delete report ${report.tracking}? This cannot be undone.`);
        if (!confirmed) return;
        try {
          await deleteReport(report.tracking);
          allReports = allReports.filter((item) => String(item.tracking) !== String(report.tracking));
          selectedReports.delete(tracking);
          flaggedReports.delete(tracking);
          removeStatusOverride(tracking);
          if (activeKanbanTracking === tracking) activeKanbanTracking = "";
          addAuditEntry("Report Deleted", report.tracking, "Deleted from report card workspace");
          addTimelineEntry(report.tracking, "Report Deleted", "Deleted from report card workspace");
          setFeedback("reportsFeedback", `Deleted ${report.tracking}.`);
          applyFiltersAndRender();
        } catch (error) {
          setFeedback("reportsFeedback", error.message || "Unable to delete report.", true);
        }
      });
      const assignBtn = document.createElement("button");
      assignBtn.type = "button";
      assignBtn.className = "secondary slim card-action-btn card-action-btn--assign";
      const assignIcon = document.createElement("span");
      assignIcon.className = "material-symbols-rounded card-action-btn__icon";
      assignIcon.setAttribute("aria-hidden", "true");
      assignIcon.textContent = "person_add";
      const assignLabel = document.createElement("span");
      assignLabel.textContent = "Assign Team";
      assignBtn.append(assignIcon, assignLabel);
      if (!hasTracking) {
        assignBtn.disabled = true;
        assignBtn.title = "Tracking number required to assign personnel.";
      }
      assignBtn.addEventListener("click", () => quickAssignPersonnel(report));

      actions.append(viewBtn, statusControl, assignBtn, deleteBtn);
    }
    reportCardsGrid.appendChild(card);
  });
}

function renderKanbanDrawer(report) {
  if (!kanbanDrawerEmpty || !kanbanDrawerContent) return;
  if (!report) {
    kanbanDrawerEmpty.hidden = false;
    kanbanDrawerContent.hidden = true;
    return;
  }

  kanbanDrawerEmpty.hidden = true;
  kanbanDrawerContent.hidden = false;
  if (kanbanDetailTracking) kanbanDetailTracking.textContent = report.tracking || "Unknown Tracking #";
  if (kanbanDetailLocation) kanbanDetailLocation.textContent = report.location || "Location unavailable";
  if (kanbanDetailIssue) kanbanDetailIssue.textContent = report.issue || "Issue details unavailable";
  if (kanbanAssignTo) kanbanAssignTo.value = report.assignedTo || "";
  if (kanbanDueAt) kanbanDueAt.value = report.dueAt || "";
}

function renderKanbanBoard(reports) {
  if (!kanbanPending || !kanbanVerified || !kanbanInProgress || !kanbanRepaired) return;
  const columns = {
    Pending: kanbanPending,
    Verified: kanbanVerified,
    "In Progress": kanbanInProgress,
    Repaired: kanbanRepaired
  };
  Object.values(columns).forEach((col) => { col.innerHTML = ""; });
  const counts = { Pending: 0, Verified: 0, "In Progress": 0, Repaired: 0 };
  const safeReports = Array.isArray(reports) ? reports : [];
  safeReports.slice(0, 300).forEach((report) => {
    const status = normalizeStatus(report.status);
    const target = columns[status] || columns.Pending;
    counts[status] = (counts[status] || 0) + 1;
    const card = document.createElement("article");
    card.className = "kanban-card";
    const tracking = String(report.tracking || "").trim();
    if (tracking && tracking === activeKanbanTracking) card.classList.add("is-selected");
    card.innerHTML = `
      <strong>${escapeHtml(tracking || "No Tracking #")}</strong>
      <p class="small">${escapeHtml(report.location || "Location unavailable")}</p>
      <p class="small">Priority: ${getPriorityScore(report)}</p>
      <p class="small">${escapeHtml(report.assignedTo || "Unassigned")}</p>
    `;
    card.addEventListener("click", () => {
      activeKanbanTracking = tracking;
      renderKanbanDrawer(report);
      renderKanbanBoard(getFilteredReports());
    });
    target.appendChild(card);
  });
  if (kanbanCountPending) kanbanCountPending.textContent = String(counts.Pending || 0);
  if (kanbanCountVerified) kanbanCountVerified.textContent = String(counts.Verified || 0);
  if (kanbanCountInProgress) kanbanCountInProgress.textContent = String(counts["In Progress"] || 0);
  if (kanbanCountRepaired) kanbanCountRepaired.textContent = String(counts.Repaired || 0);

  Object.entries(columns).forEach(([status, col]) => {
    if (col.childElementCount === 0) {
      const hint = document.createElement("p");
      hint.className = "small kanban-empty-hint";
      hint.textContent = `No ${status.toLowerCase()} cards in this view.`;
      col.appendChild(hint);
    }
  });

  const selected = safeReports.find((report) => String(report.tracking || "").trim() === activeKanbanTracking);
  renderKanbanDrawer(selected || null);
}

function getSelectedReports() {
  return allReports.filter((report) => selectedReports.has(String(report.tracking || "").trim()));
}

function selectVisibleReports() {
  const visibleReports = getPaginatedReports(getFilteredReports());
  let added = 0;
  visibleReports.forEach((report) => {
    const tracking = String(report.tracking || "").trim();
    if (!tracking || selectedReports.has(tracking)) return;
    selectedReports.add(tracking);
    added += 1;
  });
  if (added > 0) {
    setFeedback("reportsFeedback", `Added ${added} visible report(s) to selection.`);
  } else {
    setFeedback("reportsFeedback", "All visible reports are already selected.");
  }
  applyFiltersAndRender();
}

async function applyBulkStatusUpdate() {
  if (!guardPermission("bulk_status", "Your role cannot run bulk status updates.")) return;
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

async function updateKanbanStatus(status) {
  const tracking = String(activeKanbanTracking || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Select a Kanban card before changing status.", true);
    return;
  }
  if (!guardPermission("publish", "Your role cannot update report status.")) return;
  try {
    await updateReportStatus(tracking, status);
    const report = allReports.find((item) => String(item.tracking || "").trim() === tracking);
    const previousStatus = normalizeStatus(report?.status);
    if (report) report.status = status;
    addAuditEntry("Status Updated", tracking, `${previousStatus} → ${status}`);
    addTimelineEntry(tracking, "Status Updated", `${previousStatus} → ${status}`);
    setFeedback("reportsFeedback", `Updated ${tracking} to ${status}.`);
    applyFiltersAndRender();
  } catch (error) {
    setFeedback("reportsFeedback", error.message || "Unable to update report status.", true);
  }
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
    const urgencyReason = getUrgencyReason(report);
    item.innerHTML = `
      <div>
        <strong>${report.tracking || "No Tracking #"}</strong>
        <p>${report.location || "Location unavailable"}</p>
        <p class="small">${escapeHtml(urgencyReason)}</p>
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
    });

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
  const options = Array.from(new Set(
    reports
      .map((report) => String(report?.tracking || "").trim())
      .filter(Boolean)
  )).sort((a, b) => a.localeCompare(b));

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

async function quickAssignPersonnel(report) {
  const tracking = String(report?.tracking || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Unable to assign personnel: missing tracking number.", true);
    return;
  }
  if (!guardPermission("assign", "Your role cannot update assignment metadata.")) return;

  const currentAssignee = String(report?.assignedTo || "").trim();
  const assigneeInput = await showTextEntryDialog({
    title: "Assign team or personnel",
    message: `Tracking #${tracking}`,
    initialValue: currentAssignee && currentAssignee !== "Unassigned" ? currentAssignee : "",
    placeholder: "e.g., Field Team B / Engr. Santos",
    confirmText: "Assign"
  });
  if (assigneeInput === null) return;

  const assignedTo = String(assigneeInput || "").trim() || "Unassigned";
  const dueAt = String(report?.dueAt || "").trim();
  updateCaseMeta(tracking, { assignedTo, dueAt });
  allReports = allReports.map((item) =>
    String(item?.tracking || "").trim() === tracking ? { ...item, assignedTo, dueAt } : item
  );
  addAuditEntry("Case Assignment Updated", tracking, `${assignedTo}${dueAt ? ` • Due ${dueAt}` : ""}`);
  addTimelineEntry(tracking, "Assignment Updated", `${assignedTo}${dueAt ? ` • Due ${dueAt}` : ""}`);
  setFeedback("reportsFeedback", `Assigned ${tracking} to ${assignedTo}.`);
  focusTimeline(tracking);
  applyFiltersAndRender();
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
    });

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
    const photo = String(report?.photo || "").trim() || "../assets/issues/potholes.svg";

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
  const openReports = reports.filter((report) => normalizeStatus(report.status) !== "Repaired");
  const highRisk = openReports.filter((report) => getPriorityScore(report) >= 75);
  const overdue = openReports.filter((report) => getEscalationState(report) === "Overdue");
  const flagged = reports.filter((report) => getVerificationState(report) === "Flagged");
  const topBarangay = getTopBarangay(reports);

  if (aiAutopilotSummary) {
    aiAutopilotSummary.textContent = reports.length
      ? `${highRisk.length} high-risk cases and ${overdue.length} overdue reports detected. Autopilot suggests dispatch rebalancing now.`
      : "No active reports yet. Autopilot will generate dispatch recommendations once submissions arrive.";
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

  if (!aiRecommendations) return;

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
  const queue = reports.filter((report) => getVerificationState(report) !== "Verified" || getSeverityLabel(report) === "Critical");
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
  const storedRole = String(readAuthStorage("roadwatchAdminRole") || "").trim();
  const role = roleFilterSelect?.value || storedRole || "Super Admin";
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
  let totalAgeDays = 0;
  let ageSamples = 0;

  reports.forEach((report) => {
    const normalized = normalizeStatus(report.status).toLowerCase();
    if (normalized === "pending") counts.pending += 1;
    if (normalized === "verified") counts.verified += 1;
    if (normalized === "in progress") counts.inProgress += 1;
    if (normalized === "repaired") counts.repaired += 1;
    if (getVerificationState(report) === "Needs Verification") counts.needsVerification += 1;
    if (getVerificationState(report) === "Flagged") counts.flagged += 1;
    counts.qualityTotal += getDataQualityScore(report);
    const reportDate = parseReportDate(report);
    if (reportDate) {
      totalAgeDays += Math.max(0, (Date.now() - reportDate.getTime()) / 86400000);
      ageSamples += 1;
    }
  });

  setTextIfPresent("totalReportsCount", String(counts.total));
  setTextIfPresent("pendingReportsCount", String(counts.pending));
  setTextIfPresent("verifiedReportsCount", String(counts.verified));
  setTextIfPresent("inProgressReportsCount", String(counts.inProgress));
  setTextIfPresent("repairedReportsCount", String(counts.repaired));
  setTextIfPresent("needsVerificationCount", String(counts.needsVerification));
  setTextIfPresent("flaggedReportsCount", String(counts.flagged));
  setTextIfPresent("avgQualityScore", `${reports.length ? Math.round(counts.qualityTotal / reports.length) : 0}%`);
  const avgResponseDays = document.getElementById("avgResponseDays");
  if (avgResponseDays) avgResponseDays.textContent = ageSamples ? totalAgeDays / ageSamples >= 10 ? Math.round(totalAgeDays / ageSamples) : (totalAgeDays / ageSamples).toFixed(1) : "0";
  const criticalOverviewEmptyHint = document.getElementById("criticalOverviewEmptyHint");
  if (criticalOverviewEmptyHint) {
    criticalOverviewEmptyHint.hidden = counts.total > 0;
  }

  const highPriorityCount = reports.filter((report) => getPriorityScore(report) >= 70).length;
  setTextIfPresent("highPriorityCount", String(highPriorityCount));

  const snapshotTotal = document.getElementById("snapshotTotalCount");
  const snapshotPending = document.getElementById("snapshotPendingCount");
  const snapshotVerified = document.getElementById("snapshotVerifiedCount");
  if (snapshotTotal) snapshotTotal.textContent = counts.total;
  if (snapshotPending) snapshotPending.textContent = counts.pending;
  if (snapshotVerified) snapshotVerified.textContent = counts.verified;
  renderOperationalSnapshotDetails(reports);
  const missionCriticalCount = document.getElementById("missionCriticalCount");
  const missionVerificationCount = document.getElementById("missionVerificationCount");
  const missionResolvedCount = document.getElementById("missionResolvedCount");
  if (missionCriticalCount) missionCriticalCount.textContent = reports.filter((report) => getPriorityScore(report) >= 75).length;
  if (missionVerificationCount) missionVerificationCount.textContent = counts.needsVerification;
  if (missionResolvedCount) missionResolvedCount.textContent = counts.repaired;

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
    const selectedStatus = analyticsStatusFilter?.value || "all";
    const selectedSeverity = analyticsSeverityFilter?.value || "all";
    const labels = [];
    if (selectedBarangay !== "all") labels.push(selectedBarangay);
    if (selectedIssueType !== "all") labels.push(selectedIssueType);
    if (selectedStatus !== "all") labels.push(selectedStatus);
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
  const selectedStatus = analyticsStatusFilter?.value || "all";
  const selectedSeverity = analyticsSeverityFilter?.value || "all";

  return reports.filter((report) => {
    if (selectedBarangay !== "all" && String(report.barangay || "").trim() !== selectedBarangay) return false;
    if (selectedIssueType !== "all" && String(report.issueType || "").trim() !== selectedIssueType) return false;
    if (selectedStatus !== "all" && normalizeStatus(report.status) !== selectedStatus) return false;
    if (selectedSeverity !== "all") {
      const score = getPriorityScore(report);
      const severity = score >= 75 ? "urgent" : score >= 45 ? "moderate" : "low";
      if (severity !== selectedSeverity) return false;
    }
    return true;
  });
}

function getFilteredReports() {
  const query = String(reportSearch?.value || "").trim().toLowerCase();
  const selectedStatus = String(statusFilter?.value || "all");
  const selectedSeverity = severityQuickFilter?.value || "all";
  const selectedCategory = categoryFilter?.value || "all";
  const selectedBarangay = barangayFilter?.value || "all";
  const selectedQuality = qualityFilter?.value || "all";
  const selectedDateRange = dateQuickFilter?.value || "all";
  const selectedPreset = triagePreset?.value || "all";
  const thresholdDays = getUrgencyThresholdDays();
  const now = Date.now();

  const filteredReports = allReports.filter((report) => {
    const statusPass = selectedStatus === "all" || normalizeStatus(report.status) === selectedStatus;
    if (!statusPass) return false;
    const severityPass = selectedSeverity === "all" || getSeverityLabel(report) === selectedSeverity;
    if (!severityPass) return false;

    const categoryPass = selectedCategory === "all" || report.issueCategory === selectedCategory;
    if (!categoryPass) return false;

    const barangayPass = selectedBarangay === "all" || report.barangay === selectedBarangay;
    if (!barangayPass) return false;

    const qualityScore = getDataQualityScore(report);
    const qualityPass = selectedQuality === "all" || getQualityBand(qualityScore) === selectedQuality;
    if (!qualityPass) return false;
    if (selectedDateRange !== "all") {
      const reportDate = parseReportDate(report);
      if (!reportDate) return false;
      const ageDays = Math.floor((now - reportDate.getTime()) / 86400000);
      if (selectedDateRange === "today" && ageDays !== 0) return false;
      if (selectedDateRange === "last7" && (ageDays < 0 || ageDays > 6)) return false;
      if (selectedDateRange === "last30" && (ageDays < 0 || ageDays > 29)) return false;
      if (selectedDateRange === "older30" && ageDays <= 30) return false;
    }

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

  return sortReports(filteredReports, sortBySelect?.value || "priorityDesc");
}

function sortReports(reports, sortMode = "priorityDesc") {
  const safeReports = Array.isArray(reports) ? [...reports] : [];
  const scoreDate = (report) => parseReportDate(report)?.getTime() || 0;
  const scorePriority = (report) => getPriorityScore(report);
  const scoreQuality = (report) => getDataQualityScore(report);

  switch (sortMode) {
    case "priorityAsc":
      return safeReports.sort((a, b) => scorePriority(a) - scorePriority(b) || scoreDate(b) - scoreDate(a));
    case "newest":
      return safeReports.sort((a, b) => scoreDate(b) - scoreDate(a) || scorePriority(b) - scorePriority(a));
    case "oldest":
      return safeReports.sort((a, b) => scoreDate(a) - scoreDate(b) || scorePriority(b) - scorePriority(a));
    case "qualityDesc":
      return safeReports.sort((a, b) => scoreQuality(b) - scoreQuality(a) || scorePriority(b) - scorePriority(a));
    case "qualityAsc":
      return safeReports.sort((a, b) => scoreQuality(a) - scoreQuality(b) || scorePriority(b) - scorePriority(a));
    case "priorityDesc":
    default:
      return safeReports.sort((a, b) => scorePriority(b) - scorePriority(a) || scoreDate(b) - scoreDate(a));
  }
}

function getTotalPages(totalItems) {
  return Math.max(1, Math.ceil(totalItems / rowsPerPage));
}

function getPaginatedReports(reports) {
  const totalPages = getTotalPages(reports.length);
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * rowsPerPage;
  return reports.slice(startIndex, startIndex + rowsPerPage);
}

function renderPagination(totalItems) {
  const totalPages = getTotalPages(totalItems);
  if (paginationSummary) {
    paginationSummary.textContent = `Page ${currentPage} of ${totalPages} • ${rowsPerPage} rows/page`;
  }

  if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
  if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
}

function renderRows(reports) {
  if (reports.length === 0) {
    reportsBody.innerHTML = '<tr><td colspan="19">No reports match your current filters.</td></tr>';
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
    const urgencyReason = getUrgencyReason(report);

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
      <td><span class="urgency-reason" title="${escapeHtml(urgencyReason)}">${escapeHtml(urgencyReason)}</span></td>
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
    deleteBtn.className = "danger slim";
    deleteBtn.textContent = "🗑 Delete";
    deleteBtn.addEventListener("click", async () => {
      if (!guardPermission("delete", "Your role cannot delete reports.")) return;
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
    timelineBtn.textContent = "🕒 Timeline";
    timelineBtn.addEventListener("click", () => focusTimeline(report.tracking));
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "secondary slim";
    viewBtn.textContent = "👁 View";
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
  setTableColumnView(activeColumnView);
  renderRows(paginated);
  renderCardWorkspace(paginated);
  renderKanbanBoard(filtered);
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
  const startItem = filtered.length === 0 ? 0 : ((currentPage - 1) * rowsPerPage) + 1;
  const endItem = Math.min(currentPage * rowsPerPage, filtered.length);
  const urgentLabel = urgentOnlyMode ? " • Urgent-only mode enabled" : "";
  filterSummary.textContent = `Showing ${startItem}-${endItem} of ${filtered.length} filtered report(s) from ${allReports.length} total.${urgentLabel}`;
  renderPagination(filtered.length);
  runAutoUiImprover();
  queuePersistWorkspacePrefs();
}

async function loadReports() {
  if (isLoadingReports) return;
  isLoadingReports = true;
  if (reportsBody) {
    reportsBody.innerHTML = '<tr><td colspan="19">Loading reports...</td></tr>';
  }
  setTableLoadingState(true, "Loading latest reports...");
  setSheetSyncStatus("Checking Google Sheets connection…", "warn");

  try {
    let selectedPayload = null;
    let selectedParsedReports = [];
    let sourceLabel = "";
    let lastError = null;

    if (!Array.isArray(REPORT_ENDPOINTS) || REPORT_ENDPOINTS.length === 0) {
      throw new Error("Admin data source is not configured. Set a valid Apps Script endpoint first.");
    }

    const cacheBust = `cb=${Date.now()}`;
    for (const source of REPORT_ENDPOINTS) {
      try {
        const endpointUrl = String(source?.url || "").trim();
        if (!endpointUrl) continue;
        const separator = endpointUrl.includes("?") ? "&" : "?";
        const payload = await fetchApiPayload(`${endpointUrl}${separator}action=getReports&${cacheBust}`);
        const parsedReports = parseReports(payload);
        selectedPayload = payload;
        selectedParsedReports = parsedReports;
        sourceLabel = String(source?.label || "Google Sheets endpoint");
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
      .filter(isMeaningfulRawReport)
      .map(normalizeReport)
      .map(applyCaseMetadata)
    );
    if (allReports.length === 0) {
      if (reportsBody) {
        reportsBody.innerHTML = '<tr><td colspan="19">No reports found.</td></tr>';
      }
      renderAnalytics([]);
      renderPriorityQueue([]);
      renderSlaQueue([]);
      renderAuditTrail();
      renderCaseTimeline("");
      refreshReportingSection([]);
      if (filterSummary) filterSummary.textContent = "No records to filter.";
      activeReportsSource = sourceLabel;
      setLastSuccessfulSync(Date.now());
      setSheetSyncStatus(`Connected to ${sourceLabel} • Last sync ${formatSyncTime(Date.now())}.`, "ok");
      updateSyncMetaStatus();
      refreshStaleDataBanner();
      setTableLoadingState(false);
      return;
    }

    activeReportsSource = sourceLabel;
    setLastSuccessfulSync(Date.now());
    setSheetSyncStatus(`Connected to ${sourceLabel} • Last sync ${formatSyncTime(Date.now())}.`, "ok");
    updateSyncMetaStatus();
    refreshStaleDataBanner();
    applyFiltersAndRender();
    setFeedback("reportsFeedback", `Loaded ${allReports.length} report(s) from ${sourceLabel}.`);
  } catch (error) {
    if (allReports.length > 0) {
      setSheetSyncStatus(
        `Live sync failed. Showing last successful data from ${activeReportsSource || "Google Sheets"}.`,
        "warn"
      );
      updateSyncMetaStatus();
      refreshStaleDataBanner();
      setFeedback("reportsFeedback", "Unable to refresh real-time data right now. Showing the last successful sync.", true);
      return;
    }

    if (reportsBody) {
      reportsBody.innerHTML = '<tr><td colspan="19">Unable to load reports right now.</td></tr>';
    }
    renderAnalytics([]);
    renderPriorityQueue([]);
    renderSlaQueue([]);
    renderAuditTrail();
    renderCaseTimeline("");
    refreshReportingSection([]);
    if (filterSummary) filterSummary.textContent = "";
    setFeedback("reportsFeedback", "Unable to load reports right now. Please try again in a moment.", true);
    if (activeReportsSource) {
      setSheetSyncStatus(
        `Connection problem. Showing last synced source: ${activeReportsSource}.`,
        "error"
      );
    } else {
      setSheetSyncStatus("Google Sheets is unreachable. Check Apps Script deployment and access.", "error");
    }
    updateSyncMetaStatus();
    refreshStaleDataBanner();
  } finally {
    isLoadingReports = false;
    if (pendingStatusUpdates === 0) setTableLoadingState(false);
  }
}


document.getElementById("loginBtn")?.addEventListener("click", login);
["adminUsername", "adminPassword"].forEach((fieldId) => {
  document.getElementById(fieldId)?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    login();
  });
});
document.getElementById("forgotPasswordBtn")?.addEventListener("click", () => {
  setFeedback("loginFeedback", "Please contact your RoadWatch PH system administrator to reset your password.");
});
document.getElementById("logoutBtn")?.addEventListener("click", logout);
document.getElementById("refreshReportsBtn")?.addEventListener("click", loadReports);
document.getElementById("clearFiltersBtn")?.addEventListener("click", () => {
  if (reportSearch) reportSearch.value = "";
  if (statusFilter) statusFilter.value = "all";
  if (statusQuickFilter) statusQuickFilter.value = "all";
  if (severityQuickFilter) severityQuickFilter.value = "all";
  if (dateQuickFilter) dateQuickFilter.value = "all";
  if (categoryFilter) categoryFilter.value = "all";
  if (barangayFilter) barangayFilter.value = "all";
  if (qualityFilter) qualityFilter.value = "all";
  if (triagePreset) triagePreset.value = "all";
  if (analyticsBarangayFilter) analyticsBarangayFilter.value = "all";
  if (analyticsIssueTypeFilter) analyticsIssueTypeFilter.value = "all";
  if (analyticsStatusFilter) analyticsStatusFilter.value = "all";
  if (analyticsSeverityFilter) analyticsSeverityFilter.value = "all";
  quickFilterPresets.forEach((chip) => chip.classList.remove("is-active"));
  statusFilterButtons.forEach((button) => button.classList.remove("is-active"));
  setUrgentOnlyMode(false);
  if (reportSearch || dashboardSearch) syncSearchInputs("workspace");
  currentPage = 1;
  applyFiltersAndRender();
});
reportSearch?.addEventListener("input", () => {
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
notificationToggleBtn?.addEventListener("click", () => {
  const nextOpen = notificationToggleBtn.getAttribute("aria-expanded") !== "true";
  setNotificationPanelOpen(nextOpen);
});
markAllReadBtn?.addEventListener("click", () => {
  localStorage.setItem(ADMIN_NOTIFICATION_QUEUE_KEY, JSON.stringify([]));
  renderNotificationPanel();
  setNotificationPanelOpen(false);
});
document.addEventListener("click", (event) => {
  if (!notificationPanel || !notificationToggleBtn) return;
  const target = event.target;
  if (notificationPanel.contains(target) || notificationToggleBtn.contains(target)) return;
  setNotificationPanelOpen(false);
});
urgentOnlyToggleBtn?.addEventListener("click", () => {
  setUrgentOnlyMode(!urgentOnlyMode);
  currentPage = 1;
  applyFiltersAndRender();
});
statusFilter?.addEventListener("change", () => {
  if (statusQuickFilter) statusQuickFilter.value = statusFilter.value;
  statusFilterButtons.forEach((button) => {
    const buttonStatus = String(button.dataset.statusFilter || "").trim();
    button.classList.toggle("is-active", statusFilter.value !== "all" && buttonStatus === statusFilter.value);
  });
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
quickFilterPresets.forEach((button) => {
  button.addEventListener("click", () => {
    const preset = button.dataset.quickPreset;
    setUrgentOnlyMode(false);
    if (statusFilter) statusFilter.value = "all";
    if (triagePreset) triagePreset.value = "all";
    if (preset === "urgentPending") {
      if (statusFilter) statusFilter.value = "Pending";
      setUrgentOnlyMode(true);
    } else if (preset === "verification") {
      if (triagePreset) triagePreset.value = "needsVerification";
    } else if (preset === "repairToday") {
      if (statusFilter) statusFilter.value = "Repaired";
    }
    quickFilterPresets.forEach((chip) => chip.classList.toggle("is-active", chip === button));
    currentPage = 1;
    applyFiltersAndRender();
  });
});
analyticsBarangayFilter?.addEventListener("change", () => renderAnalytics(allReports));
analyticsIssueTypeFilter?.addEventListener("change", () => renderAnalytics(allReports));
analyticsStatusFilter?.addEventListener("change", () => renderAnalytics(allReports));
analyticsSeverityFilter?.addEventListener("change", () => renderAnalytics(allReports));
urgencyThresholdDays?.addEventListener("change", () => renderPriorityQueue(allReports));
window.addEventListener("resize", () => renderAnalytics(allReports));

verificationFilter?.addEventListener("change", () => renderVerificationQueue(allReports));
slaFilter?.addEventListener("change", () => renderSlaQueue(allReports));

showOverviewBtn?.addEventListener("click", () => setDashboardView("overview"));
showManagementBtn?.addEventListener("click", () => setDashboardView("management"));
statusFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetStatus = String(button.dataset.statusFilter || "").trim();
    if (!targetStatus) return;
    applyStatusFilter(targetStatus);
  });
});
sidebarNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (link.id === "sidebarOverviewToggle") {
      return;
    }
    const targetView = String(link.dataset.navView || "overview");
    const targetPane = String(link.dataset.navPane || "");
    if (targetView === "management") {
      setDashboardView("management");
      setManagementPane(targetPane === "triage" ? "triage" : "workspace");
      return;
    }
    setDashboardView("overview");
  });
});
sidebarSectionLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setDashboardView("overview");
    const targetId = link.getAttribute("href");
    if (!targetId) return;
    const targetSection = document.querySelector(targetId);
    if (!targetSection) return;
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
sidebarOverviewToggle?.addEventListener("click", () => {
  if (activeDashboardView !== "overview") {
    setDashboardView("overview");
    setSidebarOverviewExpanded(true);
    return;
  }
  const isExpanded = sidebarOverviewToggle.getAttribute("aria-expanded") === "true";
  setSidebarOverviewExpanded(!isExpanded);
});

toggleDensityBtn?.addEventListener("click", () => {
  setDenseMode(!document.body.classList.contains("admin-dense"));
});
autoUiImproverBtn?.addEventListener("click", () => {
  setAutoUiImproverEnabled(!isAutoUiImproverEnabled());
});
themeToggleBtn?.addEventListener("click", () => adminTheme.cycleTheme({ toggleButton: themeToggleBtn }));
sidebarToggleBtn?.addEventListener("click", toggleSidebarVisibility);
openTriageFromOverviewBtn?.addEventListener("click", () => {
  setDashboardView("management");
  setManagementPane("triage");
});
openTriageHeroBtn?.addEventListener("click", () => {
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
runSmartDispatchBtn?.addEventListener("click", () => {
  if (triagePreset) triagePreset.value = "critical";
  setUrgentOnlyMode(true);
  setDashboardView("management");
  setManagementPane("triage");
  currentPage = 1;
  applyFiltersAndRender();
  setFeedback("reportsFeedback", "Smart dispatch applied: showing critical urgent reports.");
});
showTriagePaneBtn?.addEventListener("click", () => setManagementPane("triage"));
showWorkspacePaneBtn?.addEventListener("click", () => setManagementPane("workspace"));
showCardViewBtn?.addEventListener("click", () => setWorkspaceLayoutMode("cards"));
showKanbanViewBtn?.addEventListener("click", () => setWorkspaceLayoutMode("kanban"));
showTableViewBtn?.addEventListener("click", () => setWorkspaceLayoutMode("table"));

severityQuickFilter?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});

statusQuickFilter?.addEventListener("change", () => {
  if (statusFilter) statusFilter.value = statusQuickFilter.value;
  currentPage = 1;
  applyFiltersAndRender();
});
dateQuickFilter?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
applyBulkStatusBtn?.addEventListener("click", () => {
  applyBulkStatusUpdate();
});
selectVisibleBtn?.addEventListener("click", () => {
  selectVisibleReports();
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
  const storedRole = String(readAuthStorage("roadwatchAdminRole") || "").trim();
  const role = roleFilterSelect?.value || storedRole || "Super Admin";
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

kanbanSaveMetaBtn?.addEventListener("click", () => {
  const tracking = String(activeKanbanTracking || "").trim();
  if (!tracking) {
    setFeedback("reportsFeedback", "Select a Kanban card before saving assignment.", true);
    return;
  }
  if (!guardPermission("assign", "Your role cannot update assignment metadata.")) return;
  const assignedTo = String(kanbanAssignTo?.value || "").trim() || "Unassigned";
  const dueAt = String(kanbanDueAt?.value || "").trim();
  updateCaseMeta(tracking, { assignedTo, dueAt });
  allReports = allReports.map((report) => String(report.tracking || "").trim() === tracking ? { ...report, assignedTo, dueAt } : report);
  addAuditEntry("Case Assignment Updated", tracking, `${assignedTo}${dueAt ? ` • Due ${dueAt}` : ""}`);
  addTimelineEntry(tracking, "Assignment Updated", `${assignedTo}${dueAt ? ` • Due ${dueAt}` : ""}`);
  setFeedback("reportsFeedback", `Saved assignment details for ${tracking}.`);
  applyFiltersAndRender();
});
kanbanSetPendingBtn?.addEventListener("click", () => updateKanbanStatus("Pending"));
kanbanSetVerifiedBtn?.addEventListener("click", () => updateKanbanStatus("Verified"));
kanbanSetProgressBtn?.addEventListener("click", () => updateKanbanStatus("In Progress"));
kanbanSetRepairedBtn?.addEventListener("click", () => updateKanbanStatus("Repaired"));

forecastRange?.addEventListener("change", () => renderForecastCards(allReports));
roleFilterSelect?.addEventListener("change", () => renderPermissionsSummary());
roleFilterSelect?.addEventListener("change", () => {
  renderAdminIdentity();
  applyRoleUiVisibility();
});
saveCurrentViewBtn?.addEventListener("click", saveCurrentView);
deleteSavedViewBtn?.addEventListener("click", deleteSelectedSavedView);
savedViewSelect?.addEventListener("change", () => {
  const selectedId = savedViewSelect.value;
  const selectedView = getSavedViews().find((view) => view.id === selectedId);
  if (!selectedView) return;
  applySavedViewConfig(selectedView.config);
  currentPage = 1;
  applyFiltersAndRender();
  setFeedback("reportsFeedback", `Applied saved view "${selectedView.name}".`);
});
rowsPerPageSelect?.addEventListener("change", () => {
  rowsPerPage = Math.max(5, Number(rowsPerPageSelect.value || 15));
  currentPage = 1;
  applyFiltersAndRender();
});
sortBySelect?.addEventListener("change", () => {
  currentPage = 1;
  applyFiltersAndRender();
});
columnPresetSelect?.addEventListener("change", () => {
  setTableColumnView(columnPresetSelect.value || "operations");
});

document.addEventListener("keydown", (event) => {
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";
  if (!isAuthed) return;
  const targetTag = String(event.target?.tagName || "").toLowerCase();
  const key = String(event.key || "").toLowerCase();
  const isTyping = targetTag === "input" || targetTag === "textarea" || targetTag === "select" || Boolean(event.target?.isContentEditable);
  if (event.key === "Escape" && isTyping && typeof event.target?.blur === "function") {
    event.target.blur();
    clearShortcutPrefix();
    return;
  }
  if (key === "g" && !isTyping) {
    startShortcutPrefix("g");
    return;
  }
  if (pendingShortcutPrefix === "g" && !isTyping) {
    if (key === "o") {
      event.preventDefault();
      setDashboardView("overview");
      clearShortcutPrefix();
      return;
    }
    if (key === "w") {
      event.preventDefault();
      setDashboardView("management");
      setManagementPane("workspace");
      clearShortcutPrefix();
      return;
    }
    if (key === "t") {
      event.preventDefault();
      setDashboardView("management");
      setManagementPane("triage");
      clearShortcutPrefix();
      return;
    }
  }
  if (event.key === "/" && !isTyping) {
    event.preventDefault();
    dashboardSearch?.focus();
    dashboardSearch?.select?.();
    return;
  }
  if (key === "u" && !isTyping) {
    event.preventDefault();
    setUrgentOnlyMode(!urgentOnlyMode);
    currentPage = 1;
    applyFiltersAndRender();
    return;
  }
  if (event.shiftKey && key === "n" && !isTyping) {
    event.preventDefault();
    const filtered = getFilteredReports();
    currentPage = Math.min(getTotalPages(filtered.length), currentPage + 1);
    applyFiltersAndRender();
    return;
  }
  if (event.shiftKey && key === "p" && !isTyping) {
    event.preventDefault();
    currentPage = Math.max(1, currentPage - 1);
    applyFiltersAndRender();
  }
});

document.addEventListener("visibilitychange", () => {
  const isAuthed = readAuthStorage(ADMIN_SESSION_KEY) === "true";
  if (!isAuthed || document.hidden) return;
  loadReports();
});

setDashboardView("overview");
setSidebarOverviewExpanded(false);
setWorkspaceLayoutMode("cards");
loadWorkspacePrefs();
renderCaseTimeline("");
applyAuthUI();

retrySyncBtn?.addEventListener("click", () => {
  loadReports();
});

adminTheme.setTheme(adminTheme.getPreferredTheme(), {
  persist: ADMIN_THEME_ORDER.includes(String(localStorage.getItem(ADMIN_THEME_KEY) || "").trim()),
  toggleButton: themeToggleBtn
});
const adminDarkMediaQuery = window.matchMedia?.(ADMIN_DARK_QUERY);
const handleSystemThemeChange = () => {
  const storedTheme = String(localStorage.getItem(ADMIN_THEME_KEY) || "").trim();
  if (ADMIN_THEME_ORDER.includes(storedTheme)) return;
  adminTheme.setTheme(adminTheme.getSystemTheme(), { persist: false, toggleButton: themeToggleBtn });
};
if (adminDarkMediaQuery?.addEventListener) {
  adminDarkMediaQuery.addEventListener("change", handleSystemThemeChange);
} else if (adminDarkMediaQuery?.addListener) {
  adminDarkMediaQuery.addListener(handleSystemThemeChange);
}
setUrgentOnlyMode(false);
setDenseMode(false);
if (!localStorage.getItem(ADMIN_AUTO_UI_IMPROVER_KEY)) {
  localStorage.setItem(ADMIN_AUTO_UI_IMPROVER_KEY, "true");
}
updateAutoUiImproverButton();
if (readAuthStorage(ADMIN_SESSION_KEY) === "true" && isAutoUiImproverEnabled()) {
  setAutoUiImproverEnabled(true);
}
renderSavedViews();
setTableColumnView(activeColumnView || "operations");
renderAdminIdentity();
applyRoleUiVisibility();
renderNotificationPanel();
updateSessionMetaStatus();
