function resolveSitePath(targetPage) {
  const basePath = window.location.pathname
    .replace(/[^/]*$/, "")
    .replace(/\/$/, "");

  return `${basePath}/${targetPage}`;
}

// Simple frontend auth guard (temporary improvement)

export function requireAuth() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    window.location.href = resolveSitePath("login.html");
  }
}

export function login(username, password) {
  // TEMP: replace with backend validation
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("authToken", "logged_in");
    window.location.href = resolveSitePath("admin.html");
  } else {
    alert("Invalid credentials");
  }
}
