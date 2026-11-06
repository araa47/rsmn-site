/* Ambient Form Studio — the quote calculator used on the main pages.
   Takes the three models and renders any [data-quote] block. Theme, menu and
   page chrome stay with the page's own script. */
(function () {
  "use strict";

  /* ---------- money formatting ---------- */
  function trimNum(n, places) {
    return String(parseFloat(n.toFixed(places)));
  }
  function inrParts(n) {
    if (n >= 1e7) return [trimNum(n / 1e7, 1), "crore"];
    if (n >= 1e5) return [trimNum(n / 1e5, 1), "lakh"];
    return [Math.round(n).toLocaleString("en-IN"), ""];
  }
  function inr(n) {
    var parts = inrParts(n);
    return "₹" + parts[0] + (parts[1] ? " " + parts[1] : "");
  }
  function inrRange(a, b) {
    if (b < 1e5 && a < 1e5) {
      var lo = Math.round(a / 1000) * 1000;
      var hi = Math.round(b / 1000) * 1000;
      if (lo === hi) return inr(lo);
      return "₹" + lo.toLocaleString("en-IN") + "–" + hi.toLocaleString("en-IN");
    }
    if (b >= 1e7) {
      var places = a >= 1e7 ? 1 : 2;
      var lo = trimNum(a / 1e7, places);
      var hi = trimNum(b / 1e7, places);
      return lo === hi ? "₹" + lo + " crore" : "₹" + lo + "–" + hi + " crore";
    }
    var pa = inrParts(a);
    var pb = inrParts(b);
    if (pa[0] === pb[0] && pa[1] === pb[1]) return inr(a);
    if (pa[1] === pb[1]) {
      return "₹" + pa[0] + "–" + pb[0] + (pa[1] ? " " + pa[1] : "");
    }
    return inr(a) + "–" + inr(b).replace("₹", "");
  }

  /* ---------- quote models ----------
     Every figure is indicative and rounded. The assumptions are printed on
     each page next to the model; the audit or the walkthrough replaces them. */
  var MODELS = {
    home: {
      unit: "home",
      inputs: [
        { key: "beds", label: "Bedrooms", min: 1, max: 5, step: 1, value: 3 },
        { key: "circuits", label: "Lighting circuits", min: 8, max: 40, step: 2, value: 18 }
      ],
      summary: function (v) {
        return v.beds + " bedroom" + (v.beds === 1 ? "" : "s") + " · " + v.circuits + " lighting circuits";
      },
      tiers: [
        {
          key: "premium",
          name: "Premium integrator",
          tag: "closed ecosystem",
          base: 400000,
          per: { beds: 350000, circuits: 38000 },
          spread: 0.28,
          annualPct: 0.12,
          annualFixed: 0,
          annualNote: "AMC + change orders",
          fiveNote: "incl. 5 years of AMC"
        },
        {
          key: "diy",
          name: "DIY stack",
          tag: "you are support",
          base: 10000,
          per: { beds: 30000, circuits: 5500 },
          spread: 0.3,
          annualPct: 0.03,
          annualFixed: 24000,
          annualNote: "apps, cloud plans, replacements",
          fiveNote: "incl. 5 years of subscriptions"
        },
        {
          key: "us",
          name: "Ambient Form",
          tag: "open, local, yours",
          base: 100000,
          per: { beds: 70000, circuits: 10000 },
          spread: 0.12,
          annualPct: 0.06,
          annualFixed: 0,
          annualNote: "optional support plan",
          fiveNote: "incl. 5 years of optional support"
        }
      ]
    },

    hotel: {
      unit: "hotel",
      inputs: [
        { key: "keys", label: "Keys", min: 60, max: 400, step: 10, value: 200 }
      ],
      summary: function (v) {
        return v.keys + " keys · plant, rooms and one report";
      },
      tiers: [
        {
          key: "bms",
          name: "BMS-led overlay",
          tag: "per point",
          base: 10000000,
          per: { keys: 150000 },
          spread: 0.3,
          annualPct: 0.18,
          annualFixed: 0,
          annualNote: "AMC, licences, change orders",
          fiveNote: "incl. 5 years of support"
        },
        {
          key: "luxury",
          name: "Luxury GRMS / KNX",
          tag: "per room",
          base: 5000000,
          per: { keys: 120000 },
          spread: 0.25,
          annualPct: 0.15,
          annualFixed: 0,
          annualNote: "AMC + integration",
          fiveNote: "incl. 5 years of AMC"
        },
        {
          key: "midscale",
          name: "Midscale GRMS",
          tag: "per room",
          base: 2000000,
          per: { keys: 55000 },
          spread: 0.25,
          annualPct: 0.12,
          annualFixed: 0,
          annualNote: "AMC, no analytics",
          fiveNote: "incl. 5 years of AMC"
        },
        {
          key: "us",
          name: "Ambient Form",
          tag: "room to report",
          base: 0,
          per: { keys: 85000 },
          spread: 0.3,
          annualPct: 0.06,
          annualFixed: 0,
          annualNote: "optional support plan",
          fiveNote: "incl. 5 years of optional support"
        }
      ]
    },

    stay: {
      unit: "flat",
      inputs: [
        { key: "flats", label: "Flats", min: 1, max: 20, step: 1, value: 1 }
      ],
      summary: function (v) {
        return v.flats + " flat" + (v.flats === 1 ? "" : "s") + " · one hub each";
      },
      tiers: [
        {
          key: "lock",
          name: "Lock + channel manager",
          tag: "the usual minimum",
          base: 0,
          per: { flats: 40000 },
          spread: 0.25,
          annualPct: 0,
          annualFixed: 0,
          annualPer: { flats: 30000 },
          annualNote: "PMS + lock cloud",
          fiveNote: "incl. 5 years of subscriptions"
        },
        {
          key: "stack",
          name: "Full gadget stack",
          tag: "four or five apps",
          base: 0,
          per: { flats: 70000 },
          spread: 0.3,
          annualPct: 0,
          annualFixed: 0,
          annualPer: { flats: 55000 },
          annualNote: "PMS, noise, lock, AC apps",
          fiveNote: "incl. 5 years of subscriptions"
        },
        {
          key: "us",
          name: "Ambient Form",
          tag: "one hub, one app",
          base: 0,
          per: { flats: 75000 },
          spread: 0.27,
          annualPct: 0.06,
          annualFixed: 0,
          annualNote: "optional support plan",
          fiveNote: "incl. 5 years of optional support"
        }
      ]
    }
  };

  function tierTotal(model, tier, values) {
    var total = tier.base || 0;
    Object.keys(tier.per || {}).forEach(function (key) {
      total += tier.per[key] * (values[key] || 0);
    });
    return total;
  }

  function tierAnnual(tier, total, values) {
    var annual = total * (tier.annualPct || 0) + (tier.annualFixed || 0);
    Object.keys(tier.annualPer || {}).forEach(function (key) {
      annual += tier.annualPer[key] * (values[key] || 0);
    });
    return annual;
  }

  function renderQuote(section) {
    var model = MODELS[section.getAttribute("data-quote")];
    if (!model) return;
    var values = {};

    model.inputs.forEach(function (input) {
      var control = section.querySelector('[data-q-input="' + input.key + '"]');
      var output = section.querySelector('[data-q-out="' + input.key + '"]');
      if (!control) return;
      control.min = String(input.min);
      control.max = String(input.max);
      control.step = String(input.step);
      control.value = String(input.value);
      values[input.key] = input.value;
      if (output) output.textContent = String(input.value);
    });

    function update() {
      model.inputs.forEach(function (input) {
        var control = section.querySelector('[data-q-input="' + input.key + '"]');
        var output = section.querySelector('[data-q-out="' + input.key + '"]');
        if (!control) return;
        values[input.key] = Number(control.value);
        if (output) output.textContent = String(control.value);
      });

      var summary = section.querySelector("[data-q-summary]");
      if (summary) summary.textContent = model.summary(values);

      model.tiers.forEach(function (tier) {
        var total = tierTotal(model, tier, values);
        var low = total * (1 - tier.spread);
        var high = total * (1 + tier.spread);
        var annual = tierAnnual(tier, total, values);
        var five = total + annual * 5;

        var price = section.querySelector('[data-q-price="' + tier.key + '"]');
        var annualOut = section.querySelector('[data-q-annual="' + tier.key + '"]');
        var fiveOut = section.querySelector('[data-q-five="' + tier.key + '"]');

        if (price) price.textContent = inrRange(low, high);
        if (annualOut) annualOut.textContent = inr(annual);
        if (fiveOut) fiveOut.textContent = inr(five);
      });
    }

    section.querySelectorAll("[data-q-input]").forEach(function (control) {
      control.addEventListener("input", update);
    });
    update();
  }

  document.querySelectorAll("[data-quote]").forEach(renderQuote);
})();
