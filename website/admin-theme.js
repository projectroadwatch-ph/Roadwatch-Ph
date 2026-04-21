(function initRoadwatchAdminTheme(windowRef) {
  const ADMIN_THEME_KEY = "roadwatchAdminTheme";
  const ADMIN_THEME_ORDER = ["dark", "light"];
  const ADMIN_DARK_QUERY = "(prefers-color-scheme: dark)";

  function getSystemTheme() {
    return windowRef.matchMedia?.(ADMIN_DARK_QUERY).matches ? "dark" : "light";
  }

  function getPreferredTheme() {
    const storedTheme = String(localStorage.getItem(ADMIN_THEME_KEY) || "").trim();
    if (storedTheme === "high-contrast") return "dark";
    if (ADMIN_THEME_ORDER.includes(storedTheme)) return storedTheme;
    return getSystemTheme();
  }

  function setTheme(theme, { persist = true, toggleButton = null } = {}) {
    const requestedTheme = theme === "high-contrast" ? "dark" : theme;
    const normalizedTheme = ADMIN_THEME_ORDER.includes(requestedTheme) ? requestedTheme : "dark";
    document.body.dataset.theme = normalizedTheme;
    document.documentElement.style.colorScheme = normalizedTheme === "light" ? "light" : "dark";

    if (persist) {
      localStorage.setItem(ADMIN_THEME_KEY, normalizedTheme);
    }

    if (toggleButton) {
      const title = `${normalizedTheme.charAt(0).toUpperCase()}${normalizedTheme.slice(1)}`;
      toggleButton.textContent = `Theme: ${title}`;
    }

    return normalizedTheme;
  }

  function cycleTheme({ toggleButton = null } = {}) {
    const currentTheme = getPreferredTheme();
    const currentIndex = ADMIN_THEME_ORDER.indexOf(currentTheme);
    const nextTheme = ADMIN_THEME_ORDER[(currentIndex + 1) % ADMIN_THEME_ORDER.length];
    return setTheme(nextTheme, { toggleButton });
  }

  windowRef.RoadwatchAdminTheme = {
    constants: {
      ADMIN_THEME_KEY,
      ADMIN_THEME_ORDER,
      ADMIN_DARK_QUERY
    },
    getSystemTheme,
    getPreferredTheme,
    setTheme,
    cycleTheme
  };
})(window);
