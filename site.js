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
      ".section__head, .stages-grid, .partner-grid, .auto-grid, .scenario-grid, .retrofit-grid, .tenure, .spaces-grid, .app-grid, .blueprint, .ai-flow, .ai-grid, .voice, .agent, .proof-grid, .steps, .pricing-grid, .price-grid, .care, .faq"
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
      bedroomLight: {
        room: "Master bedroom",
        name: "Master bedroom light",
        on: "On",
        off: "Off",
        onSub: "30% · warm",
        offSub: "Off",
        onDesc: "Master bedroom at 30% — enough to read, not enough to wake anyone.",
        offDesc: "Master bedroom light off. Blackout still down."
      },
      ac: {
        room: "Master bedroom",
        name: "Master bedroom AC",
        on: "On",
        off: "Off",
        onSub: "24° · cooling",
        offSub: "Off",
        onDesc: "Master bedroom cooling to 24°, fan on auto.",
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
        onDesc: "Main door locked. The entrance is secure.",
        offDesc: "Main door unlocked. The door swings open."
      }
    };

    var planState = {
      living: true,
      projector: false,
      bedroomLight: true,
      ac: true,
      awning: true,
      lock: true
    };

    var planScenes = {
      evening: {
        title: "Evening at home",
        desc: "The lights are low, the bedroom is cooling, and the door is locked. The house is ready for the night.",
        state: { living: true, projector: false, bedroomLight: true, ac: true, awning: true, lock: true }
      },
      cinema: {
        title: "Cinema, ready.",
        desc: "Projector on, blinds closed, lights down to 8%. One tap and the room changes.",
        state: { living: false, projector: true, bedroomLight: false, ac: true, awning: true, lock: true }
      },
      away: {
        title: "Away mode.",
        desc: "Everything off, the awning in, the door locked. The house looks after itself.",
        state: { living: false, projector: false, bedroomLight: false, ac: false, awning: true, lock: true }
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

      document.querySelectorAll("[data-light-wash]").forEach(function (wash) {
        var lightKey = wash.getAttribute("data-light-wash");
        wash.style.opacity = planState[lightKey] ? "0.85" : "0";
      });
      document.querySelectorAll("[data-fixture]").forEach(function (fixture) {
        fixture.classList.toggle("is-on", !!planState[fixture.getAttribute("data-fixture")]);
      });
      var awningEl = document.querySelector("[data-awning]");
      if (awningEl) awningEl.classList.toggle("is-open", !planState.awning);
      var doorEl = document.querySelector("[data-door]");
      if (doorEl) doorEl.classList.toggle("is-open", !planState.lock);
      var sensorEl = document.querySelector("[data-door-sensor]");
      if (sensorEl) sensorEl.classList.toggle("is-open", !planState.lock);
      var sensorText = document.querySelector("[data-door-sensor-text]");
      if (sensorText) sensorText.textContent = planState.lock ? "DOOR CLOSED" : "DOOR OPEN";
      var lockText = document.querySelector("[data-door-lock-text]");
      if (lockText) lockText.textContent = planState.lock ? "LOCKED" : "UNLOCKED";
      var projectorEl = document.querySelector("[data-projector]");
      if (projectorEl) projectorEl.classList.toggle("is-on", planState.projector);
      var acEl = document.querySelector("[data-ac]");
      if (acEl) acEl.classList.toggle("is-on", planState.ac);

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

  /* ---------- voice demo ---------- */
  var voiceAudio = document.getElementById("voiceAudio");
  var voiceHeard = document.getElementById("voiceHeard");
  var voiceReply = document.getElementById("voiceReply");
  var voicePlayer = document.querySelector("[data-voice-player]");
  var voicePlay = document.getElementById("voicePlay");
  var voiceButtons = Array.prototype.slice.call(document.querySelectorAll("[data-voice]"));
  var voiceData = {
    awning: {
      heard: "“Close the awning.”",
      reply: "Done. Awning closed. Rain is still twenty minutes away.",
      src: "assets/voice/awning.mp3"
    },
    cinema: {
      heard: "“Movie night.”",
      reply: "Cinema ready. Lights at eight percent, blinds closed, projector on.",
      src: "assets/voice/cinema.mp3"
    },
    lock: {
      heard: "“Is the door locked?”",
      reply: "Yes. The main door is locked. Locked at seven forty-one.",
      src: "assets/voice/lock.mp3"
    }
  };

  function setVoice(key, play) {
    var data = voiceData[key];
    if (!data || !voiceAudio) return;
    voiceButtons.forEach(function (button) {
      var on = button.getAttribute("data-voice") === key;
      button.classList.toggle("is-active", on);
      button.setAttribute("aria-pressed", String(on));
    });
    if (voiceHeard) voiceHeard.textContent = data.heard;
    if (voiceReply) voiceReply.textContent = data.reply;
    voiceAudio.src = data.src;
    if (play) {
      voiceAudio.currentTime = 0;
      var attempt = voiceAudio.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(function () {});
    }
  }

  if (voiceAudio && voiceButtons.length) {
    voiceButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setVoice(button.getAttribute("data-voice"), true);
      });
    });
    if (voicePlay) {
      voicePlay.addEventListener("click", function () {
        if (!voiceAudio.src) setVoice("awning", false);
        voiceAudio.currentTime = 0;
        var attempt = voiceAudio.play();
        if (attempt && typeof attempt.catch === "function") attempt.catch(function () {});
      });
    }
    voiceAudio.addEventListener("play", function () {
      if (voicePlayer) voicePlayer.classList.add("is-playing");
    });
    ["pause", "ended"].forEach(function (eventName) {
      voiceAudio.addEventListener(eventName, function () {
        if (voicePlayer) voicePlayer.classList.remove("is-playing");
      });
    });
  }

  /* ---------- year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
