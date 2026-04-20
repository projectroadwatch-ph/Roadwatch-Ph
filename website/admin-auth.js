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

  function readLocalDevCredential() {
    const localAuthEnabled = globalScope.localStorage?.getItem("roadwatchAdminAllowLocalAuth") === "true";
    if (!localAuthEnabled) return null;

    const username = String(globalScope.localStorage?.getItem("roadwatchAdminUsername") || "").trim();
    const password = String(globalScope.localStorage?.getItem("roadwatchAdminPassword") || "").trim();
    if (!username || !password) return null;

    return {
      username,
      password,
      role: String(globalScope.localStorage?.getItem("roadwatchAdminRole") || "Super Admin").trim() || "Super Admin"
    };
  }

  function verifyCredentials({ username = "", password = "" } = {}) {
    const normalizedUsername = String(username).trim();
    const normalizedPassword = String(password).trim();
    if (!normalizedUsername || !normalizedPassword) {
      return { ok: false, mode: "unconfigured", message: "Enter both username and password." };
    }

    const serverCredentials = readServerCredentials();
    const localCredential = readLocalDevCredential();
    const candidates = localCredential ? [...serverCredentials, localCredential] : serverCredentials;

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
      mode: localCredential && match.username === localCredential.username ? "client-local" : "server-config",
      role: match.role,
      activeUser: match.username,
      message: "Login successful."
    };
  }

  globalScope.RoadwatchAdminAuth = {
    verifyCredentials
  };
})(window);
