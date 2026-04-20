(() => {
  function normalizeKey(key) {
    return (key || "").toString().trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  function getFieldValue(record, aliases) {
    if (!record || typeof record !== "object") return "";

    for (const alias of aliases) {
      if (record[alias] !== undefined && record[alias] !== null) {
        return record[alias];
      }
    }

    const normalized = Object.keys(record).reduce((acc, key) => {
      acc[normalizeKey(key)] = record[key];
      return acc;
    }, {});

    for (const alias of aliases) {
      const value = normalized[normalizeKey(alias)];
      if (value !== undefined && value !== null) return value;
    }

    return "";
  }

  function toFiniteCoordinate(value) {
    const parsed = Number.parseFloat(String(value ?? "").replace(/,/g, "").trim());
    return Number.isFinite(parsed) ? parsed : null;
  }

  function getCoordinatePair(report) {
    const latCandidate = getFieldValue(report, ["lat", "latitude", "Latitude", "pinLat", "pin_lat", "y"]);
    const lngCandidate = getFieldValue(report, ["lng", "lon", "long", "longitude", "Longitude", "pinLng", "pin_lng", "x"]);

    let latValue = toFiniteCoordinate(latCandidate);
    let lngValue = toFiniteCoordinate(lngCandidate);

    if (latValue !== null && lngValue !== null) {
      return { lat: latValue, lng: lngValue };
    }

    const composite = getFieldValue(report, ["coordinates", "coordinate", "latlng", "LatLng", "pin", "locationCoords", "Location Coords"]);
    if (composite) {
      const match = String(composite).match(/(-?\d+(?:\.\d+)?)\s*[, ]\s*(-?\d+(?:\.\d+)?)/);
      if (match) {
        latValue = toFiniteCoordinate(match[1]);
        lngValue = toFiniteCoordinate(match[2]);
        if (latValue !== null && lngValue !== null) {
          return { lat: latValue, lng: lngValue };
        }
      }
    }

    return { lat: "", lng: "" };
  }

  function parseDateValue(rawValue) {
    if (!rawValue) return null;
    const parsed = new Date(rawValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }

  function getSubmissionDate(report) {
    const rawValue = getFieldValue(report, ["timestamp", "time", "submittedAt", "submissionTime", "Submission Time", "date", "createdAt", "Submitted At"]);
    return parseDateValue(rawValue);
  }

  function getResolutionDate(report) {
    const rawValue = getFieldValue(report, [
      "resolvedAt",
      "repairedAt",
      "resolved_at",
      "repaired_at",
      "resolutionTime",
      "statusUpdatedAt",
      "updatedAt",
      "updated_at",
      "dateResolved",
      "Date Resolved"
    ]);
    return parseDateValue(rawValue);
  }

  function normalizeStatus(status) {
    const rawStatus = (status || "Pending").toString().trim();
    const normalized = rawStatus.toLowerCase();
    const allowedStatuses = ["pending", "verified", "in progress", "repaired"];
    if (!allowedStatuses.includes(normalized)) return "Pending";
    return normalized.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  function getIssueCategory(issueText, explicitCategory = "") {
    const explicit = (explicitCategory || "").toString().trim();
    if (explicit) return explicit;

    const issue = (issueText || "").toString().trim().toLowerCase();
    if (!issue) return "Unspecified";

    const issueMatchers = [
      { label: "Road Surface", patterns: ["pothole", "crack", "lane", "marking", "surface", "asphalt"] },
      { label: "Flooding & Drainage", patterns: ["flood", "drain", "water", "clog", "rain"] },
      { label: "Road Safety", patterns: ["traffic light", "sign", "guardrail", "crossing", "safety"] },
      { label: "Street Infrastructure", patterns: ["streetlight", "sidewalk", "manhole", "reflector", "pavement"] },
      { label: "Road Obstruction", patterns: ["obstruction", "fallen tree", "debris", "construction", "illegal parking", "blocked"] }
    ];

    const matched = issueMatchers.find((item) => item.patterns.some((pattern) => issue.includes(pattern)));
    if (matched) return matched.label;

    return "Other Concerns";
  }

  function formatAverageResolution(hours) {
    if (!Number.isFinite(hours) || hours <= 0) return "N/A";
    if (hours < 24) return `${Math.round(hours)}h`;
    const days = hours / 24;
    if (days < 7) return `${days.toFixed(1)}d`;
    return `${Math.round(days)}d`;
  }

  window.RoadwatchReportUtils = {
    formatAverageResolution,
    getCoordinatePair,
    getFieldValue,
    getIssueCategory,
    getResolutionDate,
    getSubmissionDate,
    normalizeKey,
    normalizeStatus,
    parseDateValue,
    toFiniteCoordinate
  };
})();
