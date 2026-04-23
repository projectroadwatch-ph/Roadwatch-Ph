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
    const activeUser = String(sessionStorage.getItem("roadwatchAdminActiveUser") || localStorage.getItem("roadwatchAdminActiveUser") || "Admin").trim() || "Admin";
    const normalizedRole = String(role || "Super Admin").trim() || "Super Admin";
    const avatarLetter = activeUser.charAt(0).toUpperCase() || "A";
    adminIdentityChip.innerHTML = `<span class="console-chip__avatar" aria-hidden="true">${avatarLetter}</span><span class="console-chip__name">${activeUser}</span>`;
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

  function drawStatusChart(counts, {
    onStatusClick,
    onSummaryUpdate
  } = {}) {
    const canvas = document.getElementById("statusChart");
    const tooltip = document.getElementById("statusChartTooltip");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = canvas.clientWidth || 960;
    const cssHeight = 280;

    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const isLightTheme = document.body?.dataset?.theme === "light";
    const chartPalette = isLightTheme
      ? {
          axis: "rgba(77, 113, 152, 0.45)",
          value: "#1f3f69",
          label: "#2f507b"
        }
      : {
          axis: "rgba(189, 217, 248, 0.2)",
          value: "#e9f4ff",
          label: "#bdd9f8"
        };

    const bars = [
      { label: "Pending", value: counts.pending, color: "#63e6be" },
      { label: "Verified", value: counts.verified, color: "#ef4444" },
      { label: "In Progress", value: counts.inProgress, color: "#facc15" },
      { label: "Repaired", value: counts.repaired, color: "#4ade80" }
    ];
    if (typeof onSummaryUpdate === "function") {
      onSummaryUpdate(bars.map((bar) => `${bar.label}: ${bar.value}`));
    }

    const max = Math.max(...bars.map((b) => b.value), 1);
    const padding = { top: 24, right: 20, bottom: 52, left: 24 };
    const chartWidth = cssWidth - padding.left - padding.right;
    const chartHeight = cssHeight - padding.top - padding.bottom;
    const barWidth = Math.min(92, chartWidth / bars.length - 24);
    const gap = (chartWidth - barWidth * bars.length) / (bars.length + 1);

    const hitboxes = [];

    ctx.fillStyle = chartPalette.axis;
    ctx.fillRect(padding.left, padding.top + chartHeight, chartWidth, 1);

    ctx.font = "600 12px Inter";
    ctx.textAlign = "center";

    bars.forEach((bar, index) => {
      const x = padding.left + gap + index * (barWidth + gap);
      const barHeight = Math.round((bar.value / max) * (chartHeight - 8));
      const y = padding.top + chartHeight - barHeight;

      hitboxes.push({
        label: bar.label,
        value: bar.value,
        x,
        y,
        width: barWidth,
        height: barHeight
      });

      ctx.fillStyle = bar.color;
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = chartPalette.value;
      ctx.fillText(String(bar.value), x + barWidth / 2, y - 8);

      ctx.fillStyle = chartPalette.label;
      ctx.fillText(bar.label, x + barWidth / 2, cssHeight - 22);
    });

    const getHoveredBar = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      return hitboxes.find((bar) => x >= bar.x && x <= bar.x + bar.width && y >= bar.y && y <= bar.y + bar.height);
    };

    const handleMouseMove = (event) => {
      const hoveredBar = getHoveredBar(event);
      if (!hoveredBar || !tooltip) {
        if (tooltip) tooltip.hidden = true;
        canvas.style.cursor = "default";
        return;
      }
      canvas.style.cursor = "pointer";
      tooltip.hidden = false;
      tooltip.textContent = `${hoveredBar.label}: ${hoveredBar.value} (click to filter)`;
      const rect = canvas.getBoundingClientRect();
      tooltip.style.left = `${event.clientX - rect.left + 10}px`;
      tooltip.style.top = `${event.clientY - rect.top - 20}px`;
    };

    const handleClick = (event) => {
      const hoveredBar = getHoveredBar(event);
      if (!hoveredBar || typeof onStatusClick !== "function") return;
      onStatusClick(hoveredBar.label);
    };

    canvas.onmousemove = handleMouseMove;
    canvas.onmouseleave = () => {
      if (tooltip) tooltip.hidden = true;
      canvas.style.cursor = "default";
    };
    canvas.onclick = handleClick;
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
