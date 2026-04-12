window.RoadwatchAdminWorkspacePage = Object.freeze({
  id: "workspace",
  navView: "management",
  navPane: "workspace",
  breadcrumbViewLabel: "System Management",
  breadcrumbPaneLabel: "Report Workspace",
  activate({
    triagePane,
    workspacePane,
    showTriagePaneBtn,
    showWorkspacePaneBtn,
    setTableColumnView,
    updateSidebarNavState,
    setBreadcrumbs
  }) {
    if (triagePane) triagePane.hidden = true;
    if (workspacePane) workspacePane.hidden = false;

    showTriagePaneBtn?.classList.remove("is-active");
    showWorkspacePaneBtn?.classList.add("is-active");

    setTableColumnView("operations");
    updateSidebarNavState("management", "workspace");
    setBreadcrumbs("management", "workspace");
  }
});
