// Centralized API handler for RoadWatch

const API_BASE = "https://script.google.com/macros/s/AKfycbxYlQ3G8gtAgoTm3BgF1DMfI0LDv5OdcWVr6cEElW5vfNjAu3zKvTYlHK7RgDFLVCfB/exec";

export async function submitReport(data) {
  const payload = new URLSearchParams(data || {});
  const res = await fetch(API_BASE, {
    method: "POST",
    body: payload,
    redirect: "follow"
  });

  if (!res.ok) {
    throw new Error(`Failed to submit report (HTTP ${res.status}).`);
  }

  const text = await res.text();
  if (!text) return { success: true };

  try {
    return JSON.parse(text);
  } catch {
    return { success: true, raw: text };
  }
}

export function generateTrackingNumber() {
  return "RW" + Date.now();
}
