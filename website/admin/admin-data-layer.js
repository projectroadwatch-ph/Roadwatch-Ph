"use strict";

(function initializeRoadwatchAdminDataLayer(globalScope) {
  const sharedDataLayer = globalScope.RoadwatchDataLayer;
  const apiUrl = sharedDataLayer?.constants?.API_URL || "";

  function createReportEndpoints() {
    return [
      { url: apiUrl, label: "Admin primary Google Sheet endpoint" },
      { url: apiUrl, label: "Admin backup Google Sheet endpoint" },
      { url: apiUrl, label: "Public website Google Sheet" }
    ];
  }

  function getStatusWriteEndpoints() {
    return Array.from(new Set(createReportEndpoints().map((endpoint) => endpoint.url).filter(Boolean)));
  }

  function buildJsonpEndpoint(endpoint, callbackName) {
    const separator = endpoint.includes("?") ? "&" : "?";
    return `${endpoint}${separator}callback=${encodeURIComponent(callbackName)}`;
  }

  function loadJsonp(endpoint) {
    return new Promise((resolve, reject) => {
      const callbackName = `roadwatchAdminJsonpCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
      script.src = buildJsonpEndpoint(endpoint, callbackName);
      script.onerror = () => {
        window.clearTimeout(timeout);
        cleanup();
        reject(new Error("JSONP request failed."));
      };

      document.head.appendChild(script);
    });
  }

  function isLikelyCorsBlockedRequest(endpoint, error) {
    const errorName = (error && error.name ? String(error.name) : "").toLowerCase();
    const isNetworkStyleError = error instanceof TypeError || errorName === "domexception";
    if (!isNetworkStyleError) return false;

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

  globalScope.RoadwatchAdminDataLayer = {
    apiUrl,
    createReportEndpoints,
    getStatusWriteEndpoints,
    fetchApiPayload
  };
})(window);
