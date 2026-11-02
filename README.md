# RSMN — website

Static marketing site for **RSMN**, an interior design and automation studio in
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
  the kitchen has a hob/sink; there is a common bath and a master ensuite. Lights, AC,
  venetian and roller blinds, awning, animated projector and the entry door/lock are
  interactive. A Delivery alert shows a rider outside with an unlock action. Morning /
  Evening / Cinema / Away scenes run the whole plan. The live HA plan stays behind HA auth.
- **Live hero phone app** — comfort ring, security state, scene chips, room cards
  and an activity feed that all update when the floor plan changes. Delivery alerts
  also surface inside the phone.
- **Automation ladder** — app control → routines → ambient/presence → local agent,
  plus the DIY tax (multiple apps, one-brand lock-in, cloud accounts, no support) and
  the RSMN layer across Zigbee, Wi-Fi, BLE, IR, RF, relays, Matter, ESPHome and HA.
- **Anything with a feed** — metro/traffic/flight/weather/energy examples, an entrance
  light that says when to leave, and Swiggy/Zomato delivery ETAs where an account or
  partner API exposes them. Includes a display example and eight concrete automations.
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

## Files

```
index.html              the one-page site
privacy.html            plain-language privacy note
styles.css              design system, layout, phone UI, gallery, plan
site.js                 mobile menu, app tabs, floor plan, voice demo, reveal, year
robots.txt              crawler rules + sitemap reference
sitemap.xml             the two public pages
assets/
├── mark.svg            RSMN mark / favicon
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
