# RSMN — website

Static marketing site for **RSMN**, an interior design and automation studio in
Mumbai. The site covers full interior design, renovation integration and
minimal-change retrofit, with one calm app for the whole home.

**Live:** https://araa47.github.io/rsmn-site/

This repository is the source of truth for the site. It is a separate public repo
from the private Home Assistant configuration; no HA URL, token or internal path is
referenced here.

No build step. No frameworks, no external fonts, no CDN, no analytics, no cookies.
Everything is served from this repository.

## What is here

- **Interactive 2BHK floor plan** directly after the hero — a representative isometric
  cutaway, not a scan of the client's home. Lights, AC, venetian and roller blinds,
  awning, projector and the entry door/lock are interactive. Morning / Evening /
  Cinema / Away scenes run the whole plan. The live HA plan stays behind HA auth.
- **Pre-programmed voice demo** immediately after the plan — five examples with
  self-hosted audio. It is a sample, not a live language model. The real assistant runs
  locally on the hub.
- **Indicative INR pricing** — Lights + mmWave from ₹2,00,000; whole home from
  ₹5,00,000; full interior design + automation from ₹12,00,000. Exclusive of GST;
  final scope and quote after a walkthrough. The upper tiers are indicative and should
  be confirmed before quoting a client.
- **Voice samples** in `assets/voice/`. They are a generic macOS `Tara`
  Indian-English TTS sample — not a celebrity voice clone. See
  `assets/voice/README.md` to replace them with PocketTTS, a licensed voice, or a
  Rocky sample the client has the rights to use.
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
