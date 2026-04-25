window.ROADWATCH_ADMIN_SIDEBAR_TEMPLATE = `
<aside id="adminSidebarNav" class="admin-sidebar" aria-label="Admin dashboard navigation">
  <div class="admin-sidebar__brand">
    <span class="admin-sidebar__logo" aria-hidden="true"><span class="material-symbols-rounded">add_road</span></span>
    <div>
      <strong>RoadWatch <span>PH</span></strong>
    </div>
    <div class="admin-sidebar__profile-tools" aria-label="Admin toolbar controls">
      <button id="themeToggleBtn" type="button" class="secondary slim console-theme-btn" aria-label="Toggle dashboard theme"><span class="material-symbols-rounded" aria-hidden="true">dark_mode</span></button>
      <div class="console-alert-wrap console-alert-wrap--attached">
        <button id="notificationToggleBtn" type="button" class="secondary slim console-alert-btn" aria-label="Notifications" aria-expanded="false" aria-controls="notificationPanel">
          <span class="material-symbols-rounded" aria-hidden="true">notifications</span>
          <span id="notificationBadge" class="console-alert-btn__badge" aria-hidden="true">0</span>
        </button>
        <div id="notificationPanel" class="notification-panel" hidden>
          <div class="notification-panel__header">
            <strong>Notifications</strong>
            <button id="markAllReadBtn" type="button" class="secondary slim notification-panel__mark-read">Mark all read</button>
          </div>
          <ul id="notificationPanelList" class="notification-panel__list" aria-live="polite"></ul>
        </div>
      </div>
    </div>
  </div>
  <div class="admin-sidebar__nav">
    <button type="button" id="sidebarOverviewToggle" class="admin-sidebar__link" data-nav-view="overview" aria-expanded="false" aria-controls="sidebarOverviewSections"><span class="material-symbols-rounded" aria-hidden="true">dashboard</span><span>Overview Hub</span></button>
    <div id="sidebarOverviewSections" class="admin-sidebar__sections" aria-label="Home subsections">
      <a href="#overviewSnapshotPanel">Operational Snapshot</a>
      <a href="#overviewQueuePanel">Verification Queue</a>
      <a href="#overviewMapPanel">Map Insights</a>
      <a href="#overviewAnalyticsPanel">Analytics</a>
    </div>
    <button type="button" class="admin-sidebar__link is-active" data-nav-view="management" data-nav-pane="workspace"><span class="material-symbols-rounded" aria-hidden="true">assignment</span><span>Case Workspace</span></button>
    <button type="button" class="admin-sidebar__link" data-nav-view="management" data-nav-pane="triage"><span class="material-symbols-rounded" aria-hidden="true">local_shipping</span><span>Dispatch & Routing</span></button>
  </div>
  <div class="admin-sidebar__profile" aria-label="Admin profile controls">
    <button id="adminIdentityChip" type="button" class="secondary slim console-chip admin-sidebar__identity-chip" aria-label="Current signed in admin"><span class="console-chip__avatar" aria-hidden="true"></span><span class="console-chip__name">roadwatchph</span><span class="material-symbols-rounded console-chip__caret" aria-hidden="true">expand_more</span></button>
  </div>
  <div class="admin-sidebar__footer">
    <div class="admin-sidebar__report-total">
      <p>Total Reports</p>
      <strong id="sidebarTotalReportsCount">0</strong>
      <small>This month</small>
    </div>
    <button id="logoutBtn" type="button" class="secondary admin-sidebar__logout">Sign out</button>
  </div>
</aside>`;
