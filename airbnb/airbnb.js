/* Ambient Form Studio — short-let proposal.
   Dependency-free: theme, menu, stay timeline, savings model. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var header = document.getElementById("site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var pageMain = document.querySelector("main");
  var pageFooter = document.querySelector("footer");

  /* ---------- header ---------- */
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

  /* ---------- one stay, step by step ---------- */
  var staySteps = {
    booked: {
      when: "T−7 days",
      you: "You: nothing",
      title: "The flat reserves itself.",
      body: "The booking creates a stay, a checkout time and a window for cleaning. The code is generated but not live yet.",
      list: ["Calendar and lock agree on the dates.", "Cleaner blocked for the gap.", "Nothing sent to the guest yet."]
    },
    before: {
      when: "T−24 hours",
      you: "You: nothing",
      title: "One message, then silence.",
      body: "The guest gets the code, the door instructions and the Wi-Fi in a single message. If the flight slips, the code simply waits.",
      list: ["Code valid from 15:00, expires 11:00.", "Directions to the lift and the door.", "Wi-Fi on a QR card — no password to type."]
    },
    arrival: {
      when: "23:40",
      you: "You: asleep, or elsewhere",
      title: "The room is already right.",
      body: "Cooling started forty minutes ago and the lights are at 40%. The door opens on the guest’s own code, at whatever hour they land.",
      list: ["23.5°C at the door, not 32°C.", "One code, one guest, one stay.", "No key, no lockbox, no meeting."]
    },
    first: {
      when: "23:41",
      you: "You: nothing",
      title: "The flat notices someone is in.",
      body: "mmWave presence confirms the room is occupied, so the AC holds the guest’s setting instead of dropping to setback.",
      list: ["Presence, not motion — a still guest still counts.", "An open window pauses the AC.", "The guest can go warmer than 24°C."]
    },
    during: {
      when: "The stay",
      you: "You: exceptions only",
      title: "Only the exceptions reach you.",
      body: "Noise level, a door that stays open, a room that will not cool, a lock battery at 20%. Everything else stays quiet.",
      list: ["Noise as a level — no microphone, no recording.", "Maintenance as a ticket, not a text.", "Energy per day, per flat."]
    },
    checkout: {
      when: "11:00",
      you: "You: one message",
      title: "Eleven means eleven.",
      body: "The code expires, cooling and lights go off, the geyser stops and the meter is photographed. The flat is empty and it knows it.",
      list: ["Code dead at 11:00 — no argument.", "AC off until the next guest.", "A message to you: cleaning, not a complaint."]
    },
    turnaround: {
      when: "12:30",
      you: "You: nothing",
      title: "The cleaner is sent when it is empty.",
      body: "Cleaning is only requested once presence is gone and the door has closed. Photo proof comes back before the next check-in.",
      list: ["No knocking, no waiting.", "Door relocked after cleaning.", "The next guest’s code goes live at 16:00."]
    }
  };

  var stayTabs = Array.prototype.slice.call(document.querySelectorAll(".stay__step"));
  var stayPanel = document.querySelector(".stay__panel");
  if (stayTabs.length && stayPanel) {
    var el = {
      when: stayPanel.querySelector("[data-stay-when]"),
      you: stayPanel.querySelector("[data-stay-you]"),
      title: stayPanel.querySelector("[data-stay-title]"),
      body: stayPanel.querySelector("[data-stay-body]"),
      list: stayPanel.querySelector("[data-stay-list]")
    };

    function renderStay(key) {
      var s = staySteps[key];
      if (!s) return;
      el.when.textContent = s.when;
      el.you.textContent = s.you;
      el.title.textContent = s.title;
      el.body.textContent = s.body;
      el.list.innerHTML = "";
      s.list.forEach(function (item) {
        var li = document.createElement("li");
        li.textContent = item;
        el.list.appendChild(li);
      });
    }

    function selectStay(tab, focus) {
      stayTabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        t.setAttribute("tabindex", on ? "0" : "-1");
      });
      stayPanel.setAttribute("aria-labelledby", tab.id);
      renderStay(tab.getAttribute("data-stay"));
      if (focus) tab.focus();
    }

    stayTabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        selectStay(tab);
      });
      tab.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = stayTabs[(i + 1) % stayTabs.length];
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = stayTabs[(i - 1 + stayTabs.length) % stayTabs.length];
        else if (event.key === "Home") next = stayTabs[0];
        else if (event.key === "End") next = stayTabs[stayTabs.length - 1];
        if (next) {
          event.preventDefault();
          selectStay(next, true);
        }
      });
    });
  }

  /* ---------- model ---------- */
  var MODEL = {
    energyPerFlat: 9000,
    energySaving: 0.25,
    capex: [55000, 95000],
    avgStay: 3.5,
    nights: 30
  };

  var model = document.querySelector(".model");
  if (model) {
    var inputs = {
      listings: model.querySelector('[data-input="listings"]'),
      adr: model.querySelector('[data-input="adr"]'),
      occ: model.querySelector('[data-input="occ"]'),
      premium: model.querySelector('[data-input="premium"]')
    };
    var outputs = {};
    model.querySelectorAll("[data-out]").forEach(function (node) {
      outputs[node.getAttribute("data-out")] = node;
    });
    var mixBars = model.querySelectorAll(".model__mix-bar i");

    function trim(n) {
      return String(n).replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1");
    }
    function money(n) {
      if (n >= 1e7) return "₹" + trim((n / 1e7).toFixed(2)) + " crore";
      if (n >= 1e5) return "₹" + trim((n / 1e5).toFixed(1)) + " lakh";
      return "₹" + Math.round(n).toLocaleString("en-IN");
    }
    function band(a, b) {
      if (b >= 1e7) return "₹" + trim((a / 1e7).toFixed(1)) + "–" + trim((b / 1e7).toFixed(1)) + " crore";
      return "₹" + trim((a / 1e5).toFixed(1)) + "–" + trim((b / 1e5).toFixed(1)) + " lakh";
    }

    function render() {
      var listings = Number(inputs.listings.value);
      var adr = Number(inputs.adr.value);
      var occ = Number(inputs.occ.value) / 100;
      var premium = Number(inputs.premium.value) / 100;

      var nights = listings * MODEL.nights * occ;
      var rent = nights * adr * premium * 12;
      var energy = listings * MODEL.energyPerFlat * 12 * MODEL.energySaving;
      var total = rent + energy;
      var capexLow = listings * MODEL.capex[0];
      var capexHigh = listings * MODEL.capex[1];
      var handovers = Math.round(nights / MODEL.avgStay);
      var share = total > 0 ? rent / total : 0;

      outputs.listings.textContent = String(listings);
      outputs.adr.textContent = "₹" + adr.toLocaleString("en-IN");
      outputs.occ.textContent = Math.round(occ * 100) + "%";
      outputs.premium.textContent = Math.round(premium * 100) + "%";
      outputs.total.textContent = money(total);
      outputs.perListing.textContent = money(total / listings);
      outputs.handovers.textContent = String(handovers);
      outputs.rent.textContent = money(rent);
      outputs.energy.textContent = money(energy);
      outputs.capex.textContent = band(capexLow, capexHigh);
      outputs.payback.textContent = (capexLow / total).toFixed(1) + "–" + (capexHigh / total).toFixed(1) + " years";
      outputs.paybackEnergy.textContent =
        energy > 0 ? (capexLow / energy).toFixed(1) + "–" + (capexHigh / energy).toFixed(1) + " years" : "—";
      if (outputs.mixRate) outputs.mixRate.textContent = Math.round(share * 100) + "%";
      if (outputs.mixEnergy) outputs.mixEnergy.textContent = Math.round((1 - share) * 100) + "%";
      if (mixBars.length === 2) {
        mixBars[0].style.width = Math.round(share * 100) + "%";
        mixBars[1].style.width = Math.round((1 - share) * 100) + "%";
      }
    }

    Object.keys(inputs).forEach(function (key) {
      if (inputs[key]) inputs[key].addEventListener("input", render);
    });
    render();
  }

  /* ---------- reveal ---------- */
  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section__head, .issues, .pull, .automation, .stay, .premium, .model, .truth, .learn, .gov, .phase, .guard, .faq"
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
