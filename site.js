/* RSMN site — small, dependency-free enhancements. */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var pageMain = document.querySelector("main");
  var pageFooter = document.querySelector("footer");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    document.querySelectorAll("video[data-autoplay]").forEach(function (video) {
      video.autoplay = false;
      video.pause();
      video.setAttribute("controls", "");
    });
  }

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

  /* ---------- app tabs ---------- */
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
      var show = panel.getAttribute("data-screen") === id;
      panel.hidden = !show;
    });

    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });

    tab.addEventListener("keydown", function (event) {
      var next = null;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        next = tabs[(index + 1) % tabs.length];
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
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

  /* ---------- scroll reveal ---------- */
  var revealItems = Array.prototype.slice.call(
    document.querySelectorAll(
      ".section__head, .stages-grid, .partner-grid, .auto-grid, .scenario-grid, .retrofit-grid, .tenure, .spaces-grid, .app-grid, .blueprint, .ai-flow, .ai-grid, .agent, .proof-grid, .steps, .price-grid, .care, .faq"
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
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- interactive floor plan ---------- */
  var planTitle = document.getElementById("planTitle");
  var planDesc = document.getElementById("planDesc");
  var planAnnounce = document.getElementById("planAnnounce");
  var planDevices = Array.prototype.slice.call(
    document.querySelectorAll("[data-device]")
  );
  var sceneButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-scene]")
  );

  if (planTitle && planDevices.length) {
    var planData = {
      living: {
        room: "Living room",
        name: "Living lights",
        on: "On",
        off: "Off",
        onSub: "40% · warm",
        offSub: "Off",
        onDesc: "Cove light at 40%, curtains drawn — the room settles into the evening.",
        offDesc: "Living lights off. Daylight and the city take over."
      },
      projector: {
        room: "Living room",
        name: "Projector",
        on: "On",
        off: "Off",
        onSub: "HDMI 2 · 4K",
        offSub: "Off",
        onDesc: "Projector on, blinds closed, soundbar at movie level.",
        offDesc: "Projector off, blinds open."
      },
      ac: {
        room: "Bedroom",
        name: "Bedroom AC",
        on: "On",
        off: "Off",
        onSub: "24° · cooling",
        offSub: "Off",
        onDesc: "Bedroom cooling to 24°, fan on auto.",
        offDesc: "AC off. Window sensor says the window is open."
      },
      awning: {
        room: "Balcony",
        name: "Balcony awning",
        on: "Closed",
        off: "Open",
        onSub: "Rain in 20 min",
        offSub: "Evening light",
        onDesc: "Awning closed. Rain is 20 minutes away.",
        offDesc: "Awning open. Evening light on the balcony."
      },
      lock: {
        room: "Entrance",
        name: "Main door",
        on: "Locked",
        off: "Unlocked",
        onSub: "Auto-locked 7:41 PM",
        offSub: "Unlocked for arrival",
        onDesc: "Main door locked. Entry light off.",
        offDesc: "Main door unlocked. Entry light on."
      }
    };

    var planState = {
      living: true,
      projector: false,
      ac: true,
      awning: true,
      lock: true
    };

    var planScenes = {
      evening: {
        title: "Evening at home",
        desc: "The lights are low, the bedroom is cooling, and the door is locked. The house is ready for the night.",
        state: { living: true, projector: false, ac: true, awning: true, lock: true }
      },
      cinema: {
        title: "Cinema, ready.",
        desc: "Projector on, blinds closed, lights down to 8%. One tap and the room changes.",
        state: { living: false, projector: true, ac: true, awning: true, lock: true }
      },
      away: {
        title: "Away mode.",
        desc: "Everything off, the awning in, the door locked. The house looks after itself.",
        state: { living: false, projector: false, ac: false, awning: true, lock: true }
      }
    };

    function announcePlan(message) {
      if (planAnnounce) planAnnounce.textContent = message;
    }

    function renderPlan(activeKey, title, desc) {
      planDevices.forEach(function (button) {
        var key = button.getAttribute("data-device");
        var data = planData[key];
        if (!data) return;
        var on = planState[key];
        button.setAttribute("aria-pressed", String(on));

        if (button.classList.contains("hotspot")) {
          button.setAttribute(
            "aria-label",
            data.name + ", " + (on ? data.on.toLowerCase() : data.off.toLowerCase())
          );
        }

        var stateEl = button.querySelector("[data-state]");
        if (stateEl) stateEl.textContent = on ? data.on : data.off;
        var subEl = button.querySelector("[data-sub]");
        if (subEl) subEl.textContent = on ? data.onSub : data.offSub;
      });

      if (activeKey && planData[activeKey]) {
        var current = planData[activeKey];
        var isOn = planState[activeKey];
        planTitle.textContent = current.room;
        planDesc.textContent = isOn ? current.onDesc : current.offDesc;
        announcePlan(
          current.name + " " + (isOn ? current.on.toLowerCase() : current.off.toLowerCase())
        );
      } else if (title && desc) {
        planTitle.textContent = title;
        planDesc.textContent = desc;
      }
    }

    planDevices.forEach(function (button) {
      button.addEventListener("click", function () {
        var key = button.getAttribute("data-device");
        if (!planData[key]) return;
        planState[key] = !planState[key];
        sceneButtons.forEach(function (scene) {
          scene.classList.remove("is-active");
        });
        renderPlan(key);
      });
    });

    sceneButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var name = button.getAttribute("data-scene");
        var scene = planScenes[name];
        if (!scene) return;
        Object.keys(scene.state).forEach(function (key) {
          planState[key] = scene.state[key];
        });
        sceneButtons.forEach(function (item) {
          item.classList.toggle("is-active", item === button);
        });
        renderPlan(null, scene.title, scene.desc);
        announcePlan("Scene set: " + name + ".");
      });
    });

    renderPlan(null);
  }

  /* ---------- year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
