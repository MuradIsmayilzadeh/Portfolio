# Portfolio — Murad Ismayilzada

Minimal, futuristic personal portfolio built with Next.js 14 (App Router), statically exported and deployed to GitHub Pages.

## Develop

```bash
npm install
npm run dev
```

## Editing content

All content lives in **`data/site.js`**: profile, projects (with category, status and `featured` flag), skills, timeline and contact channels. Pages render from it, so adding a project is a single object.

## Structure

```
app/            routes: / · /projects · /about · /contact, plus globals.css (design tokens + all styles)
components/     Navbar, Footer, ProjectCard, ProjectExplorer (filters), Reveal, RoleCycler,
                Cursor, BootLoader, ScrollTop, CopyButton
data/site.js    content
```

## How the motion works

- `lib/scroll.js` — one `requestAnimationFrame` loop for the whole site. Drives Lenis smooth scrolling (desktop only) and calls every scroll effect once per frame.
- `components/ShapeField.jsx` — the 3D point cloud (custom canvas renderer, no 3D library). Any element with `data-shape="sphere|knot|torus|cube|helix|galaxy|grid"` morphs it while crossing the middle of the screen; `data-shape-x`, `data-shape-scale` and `data-shape-o` position it.
  It is interactive: points flee the cursor, dragging spins it, and a click blasts it apart into the next shape.
- `components/home/Orbit3D.jsx` — pinned 3D ring of tech tiles around the model; scroll or drag to spin.
- `Decode` scrambles labels into place; `FooterMark` is the cursor-lit footer wordmark.
- `components/home/SplitScroll.jsx` — pinned section: the left column scrolls up, the right column scrolls down, and the model morphs per step in the middle.
- `components/home/HorizontalWork.jsx` — vertical scroll drives a horizontal project rail (a swipeable row on narrow screens).
- `Reveal`, `SplitText`, `ScrubText`, `ScrollVar`, `Marquee`, `Magnetic`, `Tilt`, `CountUp` — reveal and interaction building blocks.
- `BootLoader` shows real load progress once per session; `app/template.jsx` adds a panel wipe between routes.
- Respects `prefers-reduced-motion`; content stays visible without JavaScript; keyboard and screen-reader friendly.
- `npm run build` outputs a static site to `out/` (see `.github/workflows/nextjs.yml`). Stop `npm run dev` first — both write `.next/`.
