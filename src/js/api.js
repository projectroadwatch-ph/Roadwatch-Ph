// Centralized API handler for Roadwatch

const API_BASE = "YOUR_GOOGLE_APPS_SCRIPT_URL";

export async function submitReport(data) {
  const res = await fetch(`${API_BASE}?action=submitReport`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  return res.json();
}

export function generateTrackingNumber() {
  return "RW-" + Date.now();
}
