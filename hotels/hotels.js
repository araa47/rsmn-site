/* Ambient Form Studio — hotel proposal.
   Dependency-free: theme, menu, scope tabs, room demo, savings model. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var pageMain = document.querySelector("main");
  var pageFooter = document.querySelector("footer");

  /* ---------- header state on scroll ---------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.classList.toggle("is-open", open);
    header.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    if (pageMain) pageMain.toggleAttribute("inert", open);
    if (pageFooter) pageFooter.toggleAttribute("inert", open);
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* ---------- theme ---------- */
  var themeToggle = document.getElementById("themeToggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(theme) {
    var dark = theme === "dark";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(dark));
      themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      var use = themeToggle.querySelector("use");
      if (use) use.setAttribute("href", dark ? "#i-sun" : "#i-moon");
    }
    if (themeMeta) themeMeta.setAttribute("content", dark ? "#0d1714" : "#f5f0e6");
    try {
      localStorage.setItem("rsmn-theme", dark ? "dark" : "light");
    } catch (e) {}
  }
  if (themeToggle) {
    applyTheme(document.documentElement.dataset.theme || "light");
    themeToggle.addEventListener("click", function () {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  /* ---------- scope tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

  function activateTab(tab, focus) {
    if (!tab) return;
    var id = tab.getAttribute("data-tab");
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.setAttribute("tabindex", selected ? "0" : "-1");
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== id;
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab);
    });
    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        next = tabs[(index - 1 + tabs.length) % tabs.length];
      } else if (event.key === "Home") {
        next = tabs[0];
      } else if (event.key === "End") {
        next = tabs[tabs.length - 1];
      }
      if (next) {
        event.preventDefault();
        activateTab(next, true);
      }
    });
  });

  /* ---------- operations board: hover/click a room ---------- */
  var opsDetail = document.querySelector(".ops__detail");
  if (opsDetail) {
    var detailRoom = opsDetail.querySelector(".ops__detail-room");
    var detailState = opsDetail.querySelector(".ops__detail-state");
    var detailNote = opsDetail.querySelector(".ops__detail-note");
    var roomCopy = {
      "is-occ": ["Occupied", "24.1°C · 3.4 kW", "within peer band"],
      "is-vac": ["Vacant", "26.4°C · 0.4 kW", "setback holding"],
      "is-ready": ["Ready", "25.2°C · 0.6 kW", "cleaned, pre-arrival pending"],
      "is-svc": ["Service", "27.8°C · 0.3 kW", "out of order"],
      "is-alert": ["Occupied", "24.1°C · 3.4 kW", "2.1× peer load, six days"]
    };
    var defaultDetail = [
      detailRoom.textContent,
      detailState.textContent,
      detailNote.textContent
    ];
    function showRoom(cell) {
      if (!cell) return;
      var room = cell.getAttribute("data-room");
      var kind = (cell.className.match(/is-\w+/) || ["is-vac"])[0];
      var copy = roomCopy[kind] || roomCopy["is-vac"];
      detailRoom.textContent = room;
      detailState.textContent = copy[0] + " · " + copy[1];
      detailNote.textContent = copy[2];
    }
    document.querySelectorAll(".rm").forEach(function (cell) {
      cell.addEventListener("mouseenter", function () {
        showRoom(cell);
      });
      cell.addEventListener("click", function () {
        showRoom(cell);
      });
    });
    var board = document.querySelector(".ops__map");
    if (board) {
      board.addEventListener("mouseleave", function () {
        detailRoom.textContent = defaultDetail[0];
        detailState.textContent = defaultDetail[1];
        detailNote.textContent = defaultDetail[2];
      });
    }
  }

  /* ---------- room demo ---------- */
  var roomStates = {
    occupied: {
      badge: "Occupied",
      temp: "24.1",
      set: "24.0",
      fill: "51%",
      kwh: "30.4",
      delta: "−21% vs fixed 22°",
      neutral: false,
      chips: {
        ac: "AC cooling",
        lights: "Lights 60%",
        blinds: "Curtains open",
        door: "Door closed"
      },
      trigger: "Door contact open, three minutes. Presence confirmed.",
      action: "Held the guest’s setpoint. No setback while someone is in the room.",
      cost: "About ₹350 for the day at ₹11.50 a unit. A fixed 22°C room would be ₹442."
    },
    vacant: {
      badge: "Checked out",
      temp: "26.6",
      set: "26.5",
      fill: "72%",
      kwh: "7.2",
      delta: "−81% vs fixed 22°",
      neutral: false,
      chips: {
        ac: "AC in setback",
        lights: "Lights off",
        blinds: "Curtains closed",
        door: "Door closed · armed"
      },
      trigger: "Check-out at 11:40. No presence for four hours.",
      action: "Dropped to 26.5°C, lights off, curtains closed, room flagged ready.",
      cost: "About ₹83 for the day. Comfortable to clean, not to sleep in."
    },
    arriving: {
      badge: "Arriving 14:00",
      temp: "23.8",
      set: "23.5",
      fill: "48%",
      kwh: "16.8",
      delta: "−56% vs fixed 22°",
      neutral: false,
      chips: {
        ac: "Pre-cooling",
        lights: "Welcome 40%",
        blinds: "Curtains open",
        door: "Door closed"
      },
      trigger: "Reservation on the PMS. Arrival 14:00, outside 33°C.",
      action: "Cooling from 13:20. Welcome scene at 13:55. Stops when the door opens.",
      cost: "About ₹193 for the day — forty minutes of pre-cooling, not a morning."
    }
  };

  var roomcard = document.querySelector(".roomcard");
  if (roomcard) {
    var badge = roomcard.querySelector("[data-room-badge]");
    var tempEl = roomcard.querySelector("[data-room-temp]");
    var setEl = roomcard.querySelector("[data-room-set]");
    var fillEl = roomcard.querySelector("[data-room-fill]");
    var kwhEl = roomcard.querySelector("[data-room-kwh]");
    var deltaEl = roomcard.querySelector("[data-room-delta]");
    var triggerEl = document.querySelector("[data-room-trigger]");
    var actionEl = document.querySelector("[data-room-action]");
    var costEl = document.querySelector("[data-room-cost]");
    var chipEls = {
      ac: roomcard.querySelector("[data-room-ac]"),
      lights: roomcard.querySelector("[data-room-lights]"),
      blinds: roomcard.querySelector("[data-room-blinds]"),
      door: roomcard.querySelector("[data-room-door]")
    };

    function setChip(el, text) {
      if (!el) return;
      var label = el.querySelector(".chip__t");
      if (label) label.textContent = text;
      else el.textContent = text;
    }

    function renderRoom(key) {
      var state = roomStates[key];
      if (!state) return;
      if (badge) badge.textContent = state.badge;
      if (tempEl) tempEl.textContent = state.temp;
      if (setEl) setEl.textContent = state.set;
      if (fillEl) fillEl.style.width = state.fill;
      if (kwhEl) kwhEl.textContent = state.kwh;
      if (deltaEl) {
        deltaEl.textContent = state.delta;
        deltaEl.classList.toggle("is-neutral", !!state.neutral);
      }
      Object.keys(state.chips).forEach(function (k) {
        setChip(chipEls[k], state.chips[k]);
      });
      if (triggerEl) triggerEl.textContent = state.trigger;
      if (actionEl) actionEl.textContent = state.action;
      if (costEl) costEl.textContent = state.cost;
    }

    document.querySelectorAll(".state-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".state-btn").forEach(function (other) {
          var on = other === btn;
          other.classList.toggle("is-active", on);
          other.setAttribute("aria-pressed", String(on));
        });
        renderRoom(btn.getAttribute("data-state"));
      });
    });
  }

  /* ---------- savings model ---------- */
  var MODEL = {
    roomKwh: 32,
    sharedKwh: 42,
    low: 0.12,
    base: 0.2,
    high: 0.28,
    grid: 0.71,
    capex: {
      retrofit: [60000, 110000],
      replace: [30000, 55000],
      newbuild: [20000, 40000]
    }
  };

  var model = document.querySelector(".model");
  if (model) {
    var inputs = {
      keys: model.querySelector('[data-input="keys"]'),
      occ: model.querySelector('[data-input="occ"]'),
      tariff: model.querySelector('[data-input="tariff"]')
    };
    var outputs = {};
    model.querySelectorAll("[data-out]").forEach(function (el) {
      outputs[el.getAttribute("data-out")] = el;
    });
    var paths = Array.prototype.slice.call(document.querySelectorAll('input[name="path"]'));

    function trim(n) {
      var s = String(n);
      return s.replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1");
    }
    function money(n) {
      if (n >= 1e7) return "₹" + trim((n / 1e7).toFixed(2)) + " crore";
      if (n >= 1e5) return "₹" + trim((n / 1e5).toFixed(1)) + " lakh";
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }
    function band(a, b) {
      if (b >= 1e7) return "₹" + trim((a / 1e7).toFixed(1)) + "–" + trim((b / 1e7).toFixed(1)) + " crore";
      return "₹" + Math.round(a / 1e5) + "–" + Math.round(b / 1e5) + " lakh";
    }
    function kwhLabel(n) {
      if (n >= 1e7) return trim((n / 1e7).toFixed(2)) + " crore";
      if (n >= 1e5) return trim((n / 1e5).toFixed(1)) + " lakh";
      return Math.round(n).toLocaleString("en-IN");
    }
    function currentPath() {
      for (var i = 0; i < paths.length; i++) {
        if (paths[i].checked) return paths[i].value;
      }
      return "retrofit";
    }

    function render() {
      var keys = Number(inputs.keys.value);
      var occ = Number(inputs.occ.value) / 100;
      var tariff = Number(inputs.tariff.value);
      var path = currentPath();
      var capex = MODEL.capex[path];

      var kwh = keys * 365 * (occ * MODEL.roomKwh + MODEL.sharedKwh);
      var spend = kwh * tariff;
      var saveKwh = kwh * MODEL.base;
      var save = saveKwh * tariff;
      var co2 = (saveKwh * MODEL.grid) / 1000;
      var capexLow = keys * capex[0];
      var capexHigh = keys * capex[1];
      var paybackLow = save > 0 ? capexLow / save : 0;
      var paybackHigh = save > 0 ? capexHigh / save : 0;

      outputs.keys.textContent = String(keys);
      outputs.occ.textContent = Math.round(occ * 100) + "%";
      outputs.tariff.textContent = "₹" + Number(tariff).toFixed(2);
      outputs.save.textContent = money(save);
      outputs.saveKwh.textContent = kwhLabel(saveKwh);
      outputs.co2.textContent = Math.round(co2).toLocaleString("en-IN");
      if (outputs.perKey) outputs.perKey.textContent = money(Math.round(save / keys / 500) * 500);
      outputs.spend.textContent = money(spend);
      outputs.range.textContent = Math.round(MODEL.low * 100) + "–" + Math.round(MODEL.high * 100) + "%";
      outputs.payback.textContent =
        trim(paybackLow.toFixed(1)) + "–" + trim(paybackHigh.toFixed(1)) + " years";
      outputs.capex.textContent = band(capexLow, capexHigh);
    }

    Object.keys(inputs).forEach(function (key) {
      if (inputs[key]) inputs[key].addEventListener("input", render);
    });
    paths.forEach(function (p) {
      p.addEventListener("change", render);
    });
    render();
  }

  /* ---------- scroll reveal ---------- */
  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section__head, .statrow, .bill, .baseline, .lset, .scope, .roomdemo, .mathstrip, .model, .truth, .wheel, .milestones, .signals, .mv, .gov, .arch, .principles, .retrofit-line, .phase, .guard, .why-b, .matrix-panel, .faq"
    )
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-in");
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("reveal");
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- print ---------- */
  var printBtn = document.querySelector("[data-print]");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  /* ---------- year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
