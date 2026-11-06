# Ambient Form Studio — website

Static marketing site for **Ambient Form Studio**, an interior design and automation studio in
Mumbai. The site covers full interior design, renovation integration and
minimal-change retrofit, with one calm app for the whole home.

**Live:** https://araa47.github.io/rsmn-site/

The studio works across **Mumbai and Hong Kong**, with other locations by
arrangement. Projects elsewhere start with a video call, then a site visit or local
partner if the scope needs one.

This repository is the source of truth for the site. It is a separate public repo
from the private Home Assistant configuration; no HA URL, token or internal path is
referenced here.

No build step. No frameworks, no external fonts, no CDN, no analytics, no cookies.
Everything is served from this repository. Dark mode follows the OS by default and
can be switched in the header; the choice is stored locally.

## What is here

- **Interactive 2BHK floor plan** directly after the hero — a representative isometric
  cutaway, not a scan of the client's home. The balcony sits outside the facade;
  the kitchen has a hob/sink; the common WC has a toilet, basin, tub/shower and tiled
  floor, and the master ensuite has its own toilet, basin, tub and shower. Lights, AC,
  venetian and roller blinds, awning, animated projector and the entry door/lock are
  interactive. A Delivery alert shows a rider outside with an unlock action. Morning /
  Evening / Cinema / Away scenes run the whole plan. The live HA plan stays behind HA auth.
- **Live hero phone app** — Home Assistant Lovelace-style top bar, area chips, entity
  tile cards, toggles, energy card and logbook that all update when the floor plan
  changes. Delivery alerts also surface inside the phone.
- **Automation ladder** — app control → routines → ambient/presence → local agent,
  plus the DIY tax (multiple apps, one-brand lock-in, cloud accounts, no support) and
  the Ambient Form layer across Zigbee, Wi-Fi, BLE, IR, RF, relays, Matter, ESPHome and HA.
- **Anything with a feed** — metro/traffic/flight/weather/energy examples, an entrance
  light that says when to leave, and Swiggy/Zomato delivery ETAs where an account or
  partner API exposes them. Includes a display example and nine animated automations
  (including pet feeding).
  Zomato is generally partner/POS access, not a general consumer API; the site says so.
- **Pre-programmed voice demo** immediately after the plan — five examples with
  self-hosted audio. The replies follow the home assistant’s Rocky-style voice notes:
  short, literal, warm, “buddy”, occasional “Amaze.” — no fixed “Good good” opener.
  It is a sample, not a live language model. The real assistant runs locally on the hub.
- **Indicative pricing with an India / Hong Kong selector** — Mumbai INR:
  ₹2,00,000 / ₹5,00,000 / ₹12,00,000; Hong Kong HKD: HK$200,000 / HK$500,000 /
  HK$1,200,000. The HKD figures reflect Hong Kong labour/electrical costs, are exclusive of local taxes;
  confirm both tiers before quoting a client. Final scope and quote follow a
  walkthrough.
- **Home Assistant at the core** — most of the stack runs on an open-source HA hub
  inside the home: local automations, local voice and local AI, with the cloud optional.
- **Voice samples** in `assets/voice/`, generated locally with **PocketTTS**
  (`alba` preset). They are a sample, not a live model call. The live hub can clone
  any voice the client has the rights to; see `assets/voice/README.md` to replace the
  files with a licensed or client-owned voice.
- **Photography is reference imagery**, not client projects. The images are used under
  the [Pexels license](https://www.pexels.com/license/) and stored locally in
  `assets/img/`. Replace with real project photography, with permission, when available.

## The hotels proposal

`hotels/` is a separate, unlisted pitch page for hotel operators — a proposal, not a
service page. It is `noindex, nofollow`, absent from the sitemap, and not linked from
the studio site. Share the URL directly.

**Live:** https://araa47.github.io/rsmn-site/hotels/

It is written for a representative 200-key property and names neither the prospect nor
a city. Every figure is a model, not a quote: the inputs live in `MODEL` in
`hotels/hotels.js`, the assumptions are on the page, and a real engagement replaces
them with a metered audit.

The economics are built on the HT-III commercial tariff — ₹9.40/unit, ₹608/kVA/month
demand, 5% electricity tax, about ₹11.50 all-in — and a hotel that already has key
cards and manual thermostats. That baseline is what makes the page honest: 94 kWh per
occupied room-night, a ₹5.35 crore bill, a base-case saving of 20% (₹1.07 crore) and a
1.1–2.1 year payback on a ₹1.2–2.2 crore retrofit. Change those inputs and the whole
page should be re-checked, not just the calculator.

What is on it:

- **The bill** — the three numbers that matter (₹11.50/unit, 94 kWh, 58% air-con),
  where the bill goes, and what the hotel already does (key cards, manual thermostats,
  fixed plant schedules, housekeeping by phone).
- **Where the 20% comes from** — one table, ten changes, one line each, with the points
  they contribute and what each one needs installed. Cooling is 11.8 of 20.
- **Scope** — six tabbed areas, five or six one-line automations each.
- **One room, three states** — interactive occupied / checked-out / arriving room.
- **The money** — keys, occupancy and all-in tariff sliders, three capex paths,
  saving, payback, capex band, and three things to check before believing it.
- **The data** — four steps, a day-1 to month-3 milestone strip, three worked findings,
  and how savings are measured.
- **At scale, rollout, guardrails, comparison, FAQ** — architecture, four phases with
  gates, what the studio will not do, and the questions that follow the price.

```
hotels/index.html      the proposal
hotels/hotels.js       tabs, room demo, savings model, theme, menu
```

The hotel page's components (`hotels/hotels.css` → `proposal.css`) are shared with
`airbnb/`, which adds only its own board, stay timeline and premium card. Both reuse
`styles.css` tokens, the icon sprite and the header/footer pattern. Nothing external
is loaded.

## The short-let proposal

`airbnb/` is the companion pitch for short-let hosts — written for one flat,
because that is what most hosts have, and scales with a slider for people who
run several. Unlisted, `noindex`, out of the sitemap, linked from the hotel page
footer rather than the studio site.

**Live:** https://araa47.github.io/rsmn-site/airbnb/

It is built around the things that actually go wrong in a flat with no staff in
it: a door that doesn't catch, a 1 a.m. check-in, one keybox code shared for two
years, the AC running for three days after checkout, a cleaner knocking on an
occupied flat, and a five-star review lost to a 32°C arrival.

The commercial case has two parts, kept separate on purpose:

- **Rate.** Self check-in is one of the few amenities guests actively filter for,
  so the premium is a *slider*, not a claimed percentage — set it to zero and the
  energy case still stands.
- **Energy.** A ₹9,000-a-month bill per flat at a 25% saving (₹2,250 a month,
  ₹27,000 a year), from checkout shutdown, pre-arrival cooling and a 24°C ceiling.

Defaults: one listing, ₹4,500 ADR, 70% occupancy, 6% premium — ₹95,040 a year
(₹68,040 of it rate, ₹27,000 energy), ₹55,000–95,000 capex, 0.6–1.0 year
payback, and 2.0–3.5 years on energy alone, which is the line to read if you
don't believe the premium. Move the listings slider for a portfolio.

What is on it: the eight problems, six automation areas, an interactive
seven-step stay timeline, the premium argument with a sample listing card, the
model, what a season of stays teaches you, a four-phase rollout, privacy
guardrails, and an FAQ (lock battery, Wi-Fi down, can a guest unplug the hub).

```
airbnb/index.html      the proposal
airbnb/airbnb.css      short-let components, layered on proposal.css
airbnb/airbnb.js       stay timeline, model, theme, menu
```

## The competitive market pages

Three pages ask the question the proposals leave implicit: what does the alternative
cost, and why is this cheaper or better?

- **`market.html`** — the homes market. Public, indexed, linked from the comparison
  block and the footer of the studio site.
- **`hotels/market.html`** — the hotel market. `noindex`, linked from the comparison
  panel and footer of the hotel proposal.
- **`airbnb/market.html`** — the short-let market. `noindex`, linked from the money
  section and footer of the short-let proposal.

**Live:** https://araa47.github.io/rsmn-site/market.html (the hotel and short-let
pages are shared directly).

Each page opens with a plain-English **short version**: three ways to buy, three
prices, four or five bullets each and a one-line verdict, before any protocol or licence talk.
The detailed landscape follows for anyone who wants it. A glossary at the bottom
explains the acronyms — BMS, GRMS, PMS, KNX, Matter, AMC — and the technical detail
stays in the small print.

The rest of the skeleton is the same: a five-year cost ladder; the four or five ways a
buyer can solve the problem; where the money goes; an interactive quote model with its
assumptions printed; the structural reasons for the price gap; a capability matrix;
the open-protocol "endless" argument; the limits, including where we are not the
answer; and sources.

The figures are indicative, dated and sourced. `market.js` holds the three models,
`market.css` the shared components. The pages name categories, and name a firm only
where the firm has published a price: Trescent's ₹25–50 lakh enquiry floor, AHA's ₹5
lakh 3BHK benchmark, Basalte's keypad range. No non-public competitor price is used.

The hotel page also puts the proposal's own anchors under the same light: ₹11.50/unit
is an industrial tariff, not the Maharashtra commercial rate, and 10–18% is the
realistic saving band, with 20% needing plant measures. Those caveats sit on the page
rather than in a footnote.

```
market.html             homes competitive market (public)
market.css              shared components for the three market pages
market.js               three quote models, theme, menu, print
hotels/market.html      hotel competitive market (unlisted)
airbnb/market.html      short-let competitive market (unlisted)
```

## Files


```
index.html              the one-page site
market.html             competitive market for homes (public)
hotels/                 unlisted hotel proposal + market page
airbnb/                 unlisted short-let proposal + market page
privacy.html            plain-language privacy note
styles.css              design system, layout, phone UI, gallery, plan
proposal.css            shared components for the pitches and market pages
market.css              competitive-market components
site.js                 mobile menu, app tabs, floor plan, voice demo, reveal, year
market.js               quote models, theme, menu, print
robots.txt              crawler rules + sitemap reference
sitemap.xml             the three public pages
assets/
├── mark.svg            Ambient Form mark / favicon
├── og.png              1200 × 630 social preview image
├── img/                reference interiors + control + retrofit detail
├── video/              scene-loop.mp4 + poster (plan demo)
└── voice/              five pre-programmed TTS samples + replacement guide
```

## Preview it

```sh
python3 -m http.server 8787
```

Then open <http://localhost:8787/>. The privacy note is at
<http://localhost:8787/privacy.html>.

## Deploy

Push to `main`. GitHub Pages serves the repository root; there is no build step.

## Image credits

| Image | Source |
| --- | --- |
| Living room | [Pexels 33452539](https://www.pexels.com/photo/33452539/) — Liva Kitchens And Interiors |
| Bedroom | [Pexels 13041939](https://www.pexels.com/photo/13041939/) — Pușcaș Adryan |
| Cinema | [Pexels 30647348](https://www.pexels.com/photo/30647348/) — Curt Hubner |
| Control panel | [Pexels 16423103](https://www.pexels.com/photo/16423103/) |
| Retrofit switch | [Pexels 7746038](https://www.pexels.com/photo/7746038/) — Max Vakhtbovych |
| Balcony | [Pexels 35123428](https://www.pexels.com/photo/35123428/) — Murun. E |
