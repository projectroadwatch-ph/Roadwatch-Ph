window.RoadwatchAdminUI = (function createRoadwatchAdminUi() {
  function setFeedback(id, message, isError = false) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.style.color = isError ? "#ffadb3" : "#9ce9ab";
  }

  function setSheetSyncStatus(statusElement, message, state = "warn") {
    if (!statusElement) return;
    statusElement.textContent = message;
    statusElement.dataset.state = state;
  }

  function renderAdminIdentity(adminIdentityChip, {
    role = "Super Admin"
  } = {}) {
    if (!adminIdentityChip) return;
    const activeUser = String(localStorage.getItem("roadwatchAdminActiveUser") || "Admin").trim() || "Admin";
    const normalizedRole = String(role || "Super Admin").trim() || "Super Admin";
    adminIdentityChip.textContent = `${activeUser} · ${normalizedRole}`;
    adminIdentityChip.title = `Signed in as ${activeUser} (${normalizedRole})`;
  }

  function syncSearchInputs({ dashboardSearch, reportSearch, source = "workspace" }) {
    if (!dashboardSearch || !reportSearch) return;
    if (source === "topbar") {
      reportSearch.value = dashboardSearch.value;
    } else {
      dashboardSearch.value = reportSearch.value;
    }
  }

  function getActiveFilterDescriptors({
    reportSearch,
    statusFilter,
    categoryFilter,
    barangayFilter,
    qualityFilter,
    triagePreset,
    urgentOnlyMode
  }) {
    const descriptors = [];
    const searchValue = (reportSearch?.value || "").trim();
    if (searchValue) descriptors.push({ key: "search", label: `Search: ${searchValue}` });

    if (statusFilter?.value && statusFilter.value !== "all") {
      descriptors.push({ key: "status", label: `Status: ${statusFilter.value}` });
    }

    if (categoryFilter?.value && categoryFilter.value !== "all") {
      descriptors.push({ key: "category", label: `Category: ${categoryFilter.value}` });
    }

    if (barangayFilter?.value && barangayFilter.value !== "all") {
      descriptors.push({ key: "barangay", label: `Barangay: ${barangayFilter.value}` });
    }

    if (qualityFilter?.value && qualityFilter.value !== "all") {
      const qualityLabels = {
        high: "High (80-100)",
        medium: "Medium (50-79)",
        low: "Low (0-49)"
      };
      descriptors.push({ key: "quality", label: `Data Quality: ${qualityLabels[qualityFilter.value] || qualityFilter.value}` });
    }

    if (triagePreset?.value && triagePreset.value !== "all") {
      const option = triagePreset.options[triagePreset.selectedIndex];
      descriptors.push({ key: "triage", label: `Preset: ${option?.textContent || triagePreset.value}` });
    }

    if (urgentOnlyMode) {
      descriptors.push({ key: "urgent", label: "Urgent only" });
    }

    return descriptors;
  }

  function renderActiveFilterChips(container, descriptors, onClear) {
    if (!container) return;

    container.innerHTML = "";

    if (descriptors.length === 0) {
      container.hidden = true;
      return;
    }

    container.hidden = false;
    const label = document.createElement("span");
    label.className = "active-filter-chips__label";
    label.textContent = "Active filters:";
    container.appendChild(label);

    descriptors.forEach((descriptor) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "active-filter-chip";
      chip.textContent = `${descriptor.label} ×`;
      chip.setAttribute("aria-label", `Remove ${descriptor.label} filter`);
      chip.addEventListener("click", () => onClear(descriptor.key));
      container.appendChild(chip);
    });
  }

  function setTableLoadingState(isLoading, message = "") {
    const el = document.getElementById("tableLoadingState");
    if (!el) return;
    el.hidden = !isLoading;
    el.textContent = message || "Saving update...";
  }

  function drawStatusChart(counts) {
    const canvas = document.getElementById("statusChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 960;
    const cssHeight = 280;

    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const bars = [
      { label: "Pending", value: counts.pending, color: "#ffd166" },
      { label: "Verified", value: counts.verified, color: "#4fc3f7" },
      { label: "In Progress", value: counts.inProgress, color: "#b388ff" },
      { label: "Repaired", value: counts.repaired, color: "#63e6be" }
    ];

    const max = Math.max(...bars.map((b) => b.value), 1);
    const padding = { top: 24, right: 20, bottom: 52, left: 24 };
    const chartWidth = cssWidth - padding.left - padding.right;
    const chartHeight = cssHeight - padding.top - padding.bottom;
    const barWidth = Math.min(92, chartWidth / bars.length - 24);
    const gap = (chartWidth - barWidth * bars.length) / (bars.length + 1);

    ctx.fillStyle = "rgba(189, 217, 248, 0.2)";
    ctx.fillRect(padding.left, padding.top + chartHeight, chartWidth, 1);

    ctx.font = "600 12px Inter";
    ctx.textAlign = "center";

    bars.forEach((bar, index) => {
      const x = padding.left + gap + index * (barWidth + gap);
      const barHeight = Math.round((bar.value / max) * (chartHeight - 8));
      const y = padding.top + chartHeight - barHeight;

      ctx.fillStyle = bar.color;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = "#e9f4ff";
      ctx.fillText(String(bar.value), x + barWidth / 2, y - 8);

      ctx.fillStyle = "#bdd9f8";
      ctx.fillText(bar.label, x + barWidth / 2, cssHeight - 22);
    });
  }

  return {
    drawStatusChart,
    getActiveFilterDescriptors,
    renderActiveFilterChips,
    renderAdminIdentity,
    setFeedback,
    setSheetSyncStatus,
    setTableLoadingState,
    syncSearchInputs
  };
})();
