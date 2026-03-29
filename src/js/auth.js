// Simple frontend auth guard (temporary improvement)

export function requireAuth() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    window.location.href = "/login.html";
  }
}

export function login(username, password) {
  // TEMP: replace with backend validation
  if (username === "admin" && password === "admin123") {
    localStorage.setItem("authToken", "logged_in");
    window.location.href = "/admin_v2.html";
  } else {
    alert("Invalid credentials");
  }
}
