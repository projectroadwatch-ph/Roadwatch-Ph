"use strict";

(function initializeRoadwatchDataLayer(globalScope) {
  const API_URL = "https://script.google.com/macros/s/AKfycbxZ7aoLwshceT4N_BCgOmYxkW6IL2Y-w0bF5ArLuOxehNBJl_PW05ze6RbYfB8E4JZ1/exec";
  const LOCAL_REPORTS_KEY = "roadwatchLocalReports";
  const SITE_SETTINGS_KEY = "roadwatchSiteSettings";
  let localReportsCache = [];

  function withCacheBust(endpoint) {
    const separator = endpoint.includes("?") ? "&" : "?";
    return `${endpoint}${separator}cb=${Date.now()}`;
  }

  function getReportEndpoints() {
    return [withCacheBust(API_URL), withCacheBust(`${API_URL}?action=getReports`)];
  }

  function buildTrackingLookupEndpoints(trackingNumber) {
    const tracking = encodeURIComponent((trackingNumber || "").trim());
    return [
      withCacheBust(`${API_URL}?action=getReportByTracking&tracking=${tracking}`),
      withCacheBust(`${API_URL}?action=getReports`)
    ];
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

  function getLocalReports() {
    return Array.isArray(localReportsCache) ? [...localReportsCache] : [];
  }

  function saveLocalReports(reports) {
    localReportsCache = Array.isArray(reports) ? [...reports] : [];
  }

  globalScope.RoadwatchDataLayer = {
    constants: {
      API_URL,
      LOCAL_REPORTS_KEY,
      SITE_SETTINGS_KEY
    },
    withCacheBust,
    getReportEndpoints,
    buildTrackingLookupEndpoints,
    getSiteSettings,
    getLocalReports,
    saveLocalReports
  };
})(window);
