// Centralized API handler for RoadWatch

function resolveApiBase() {
  const runtimeConfig = typeof globalThis !== "undefined"
    ? globalThis.__ROADWATCH_API_BASE__
      || globalThis.ROADWATCH_API_BASE
      || globalThis.ROADWATCH_CONFIG?.apiBase
    : "";

  const metaConfig = typeof document !== "undefined"
    ? document.querySelector('meta[name="roadwatch-api-base"]')?.content
    : "";

  const apiBase = String(runtimeConfig || metaConfig || "").trim();

  if (!apiBase) {
    throw new Error(
      "RoadWatch API endpoint is not configured. Set window.__ROADWATCH_API_BASE__ or add a <meta name=\"roadwatch-api-base\" content=\"...\"> tag."
    );
  }

  return apiBase;
}

function normalizeApiResponse(parsed) {
  if (parsed && typeof parsed === "object") {
    const explicitSuccess = parsed.success;
    const explicitStatus = String(parsed.status || "").toLowerCase();

    if (explicitSuccess === false || explicitStatus === "error") {
      const message = parsed.error || parsed.message || "API reported an error while submitting the report.";
      throw new Error(message);
    }

    if (typeof explicitSuccess === "undefined") {
      return { ...parsed, success: true };
    }

    return parsed;
  }

  throw new Error("Unexpected API response format.");
}

export async function submitReport(data) {
  const payload = new URLSearchParams(data || {});
  const res = await fetch(resolveApiBase(), {
    method: "POST",
    body: payload,
    redirect: "follow"
  });

  if (!res.ok) {
    throw new Error(`Failed to submit report (HTTP ${res.status}).`);
  }

  const text = await res.text();
  if (!text || !text.trim()) {
    return { success: true };
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("API returned a non-JSON response while submitting the report.");
  }

  return normalizeApiResponse(parsed);
}

export function generateTrackingNumber() {
  const entropy = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RW${Date.now()}${entropy}`;
}
