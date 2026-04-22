"use strict";

(function initializeRoadwatchAdminAuth(globalScope) {
  function readServerCredentials() {
    const authConfig = globalScope.RoadwatchAdminAuthConfig;
    const credentials = Array.isArray(authConfig?.credentials) ? authConfig.credentials : [];
    return credentials
      .map((entry) => ({
        username: String(entry?.username || "").trim(),
        password: String(entry?.password || "").trim(),
        role: String(entry?.role || "Super Admin").trim() || "Super Admin"
      }))
      .filter((entry) => entry.username && entry.password);
  }

  function verifyCredentials({ username = "", password = "" } = {}) {
    const normalizedUsername = String(username).trim();
    const normalizedPassword = String(password).trim();
    if (!normalizedUsername || !normalizedPassword) {
      return { ok: false, mode: "unconfigured", message: "Enter both username and password." };
    }

    const serverCredentials = readServerCredentials();
    const candidates = serverCredentials;

    if (candidates.length === 0) {
      return {
        ok: false,
        mode: "unconfigured",
        message: "Admin account is not configured. Set RoadwatchAdminAuthConfig credentials before use."
      };
    }

    const match = candidates.find((entry) => normalizedUsername === entry.username && normalizedPassword === entry.password);
    if (!match) {
      return { ok: false, mode: "configured", message: "Invalid username or password." };
    }

    return {
      ok: true,
      mode: "server-config",
      role: match.role,
      activeUser: match.username,
      message: "Login successful."
    };
  }

  globalScope.RoadwatchAdminAuth = {
    verifyCredentials
  };
})(window);
