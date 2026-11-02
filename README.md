# RSMN — website

Static marketing site for **RSMN**, an interior design and automation studio in
Mumbai. The site covers three entry points equally:

- **Full design** — blank shell, new build or full redo, with the interior and the
  automation designed together.
- **Renovation** — join existing drawings or a contractor, coordinate first fix, keep
  the technology invisible.
- **Lived-in home** — a reversible, minimal-change retrofit using IR, RF, relays and
  battery sensors.

**Live:** https://araa47.github.io/rsmn-site/

No build step. No frameworks, no external fonts, no CDN, no analytics, no cookies.
Everything is served from this repository. The interactive 2BHK plan and the voice
demo sit immediately after the hero, and the plan’s lights visibly brighten the 3D
rooms.

## Notes

- **Photography is reference imagery, not client projects.** The four interiors, the
  wall control panel and the retrofit detail are used under the
  [Pexels license](https://www.pexels.com/license/). Replace them with real project
  photography, with permission, when available.
- **The scene loop and floor plan are demos.** The 7.8-second MP4 shows a
  representative 2BHK plan — not a scan of the client’s home — moving through
  Evening → Cinema → Away. It uses local browser state, not a live Home Assistant
  instance, and has no path into any home.
- **Pricing is indicative.** ₹2,00,000 / ₹5,00,000 / ₹12,00,000 are starting points,
  exclusive of GST; the final quote comes after a walkthrough. Confirm before quoting
  a client.
- **The voice is a generic local TTS sample.** It is not a celebrity voice clone.
  Replace it with a licensed voice, or the client’s own Rocky sample, before treating
  it as the live assistant voice. The three files can be swapped without code changes;
  see `assets/voice/README.md`.
- **Sun/shade examples and the local-agent chat are illustrative.** Confirm the
  actual triggers and what the local agent can safely change for each installation
  before publishing hard guarantees.
- **Voice and pricing need a final check.** The voice files are generic samples; the
  high price tiers are placeholders. Neither should be treated as a client commitment
  without review.

## Image credits

| Image | Source |
| --- | --- |
| Living room | [Pexels 33452539](https://www.pexels.com/photo/33452539/) — Liva Kitchens And Interiors |
| Bedroom | [Pexels 13041939](https://www.pexels.com/photo/13041939/) — Pușcaș Adryan |
| Cinema | [Pexels 30647348](https://www.pexels.com/photo/30647348/) — Curt Hubner |
| Control panel | [Pexels 16423103](https://www.pexels.com/photo/16423103/) |
| Retrofit switch | [Pexels 7746038](https://www.pexels.com/photo/7746038/) — Max Vakhtbovych |
| Balcony | [Pexels 35123428](https://www.pexels.com/photo/35123428/) — Murun. E |

## Files

- `index.html` — the full site
- `privacy.html` — privacy note
- `styles.css` — styles, stages, gallery, motion loop and floor-plan UI
- `site.js` — mobile menu, app tabs, floor plan, reduced-motion video handling
- `assets/` — mark, social preview, local images and scene loop
- `robots.txt`, `sitemap.xml` — crawler metadata

Published with GitHub Pages from the `main` branch.
