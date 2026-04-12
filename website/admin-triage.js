window.RoadwatchAdminTriagePage = Object.freeze({
  id: "triage",
  navView: "management",
  navPane: "triage",
  breadcrumbViewLabel: "System Management",
  breadcrumbPaneLabel: "Triage Box",
  activate({
    triagePane,
    workspacePane,
    showTriagePaneBtn,
    showWorkspacePaneBtn,
    setTableColumnView,
    updateSidebarNavState,
    setBreadcrumbs
  }) {
    if (triagePane) triagePane.hidden = false;
    if (workspacePane) workspacePane.hidden = true;

    showTriagePaneBtn?.classList.add("is-active");
    showWorkspacePaneBtn?.classList.remove("is-active");

    setTableColumnView("triage");
    updateSidebarNavState("management", "triage");
    setBreadcrumbs("management", "triage");
  }
});
