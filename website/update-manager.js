(function enforceRoadWatchVersion() {
  const VERSION_KEY = "roadwatchDeploymentVersion";
  const RELOAD_MARKER = "rwrefresh";
  const VERSION_PARAM = "rwv";

  const deploymentVersion = String(window.ROADWATCH_DEPLOYMENT_VERSION || "").trim();
  if (!deploymentVersion) return;

  function withVersionParams(url) {
    const nextUrl = new URL(url, window.location.origin);
    nextUrl.searchParams.set(VERSION_PARAM, deploymentVersion);
    return nextUrl;
  }

  async function clearBrowserCaches() {
    try {
      if ("serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((registration) => registration.unregister()));
      }

      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
    } catch (error) {
      console.warn("Unable to fully clear browser caches during version update", error);
    }
  }

  window.appendRoadWatchVersion = function appendRoadWatchVersion(rawUrl) {
    return withVersionParams(rawUrl).toString();
  };

  const lastVersion = localStorage.getItem(VERSION_KEY);
  const currentUrl = new URL(window.location.href);
  const alreadyRefreshed = currentUrl.searchParams.get(RELOAD_MARKER) === deploymentVersion;

  if (lastVersion !== deploymentVersion && !alreadyRefreshed) {
    localStorage.setItem(VERSION_KEY, deploymentVersion);

    clearBrowserCaches().finally(() => {
      const targetUrl = withVersionParams(window.location.href);
      targetUrl.searchParams.set(RELOAD_MARKER, deploymentVersion);
      window.location.replace(targetUrl.toString());
    });
    return;
  }

  if (currentUrl.searchParams.get(VERSION_PARAM) !== deploymentVersion) {
    const normalizedUrl = withVersionParams(window.location.href);
    if (alreadyRefreshed) {
      normalizedUrl.searchParams.set(RELOAD_MARKER, deploymentVersion);
    }
    window.history.replaceState({}, "", normalizedUrl.toString());
    return;
  }

  if (alreadyRefreshed) {
    currentUrl.searchParams.delete(RELOAD_MARKER);
    window.history.replaceState({}, "", currentUrl.toString());
  }
})();
