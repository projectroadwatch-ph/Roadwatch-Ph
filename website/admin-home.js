window.RoadwatchAdminHomePage = Object.freeze({
  id: "overview",
  navView: "overview",
  breadcrumbViewLabel: "Home",
  breadcrumbPaneLabel: "",
  dashboardTitle: "Dashboard Home",
  activate({
    overviewView,
    managementView,
    operationsView,
    showOverviewBtn,
    showManagementBtn,
    showOperationsBtn,
    updateSidebarNavState,
    setBreadcrumbs,
    overviewMap
  }) {
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
  }
});
