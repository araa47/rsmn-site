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
Everything is served from this repository.

## Notes

- **Photography is reference imagery, not client projects.** The four interiors, the
  wall control panel and the retrofit detail are used under the
  [Pexels license](https://www.pexels.com/license/). Replace them with real project
  photography, with permission, when available.
- **The scene loop and floor plan are demos.** The 7.8-second MP4 shows the plan
  moving through Evening → Cinema → Away. It uses local browser state, not a live
  Home Assistant instance, and has no path into any home.

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
