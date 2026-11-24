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

## Notes

- Custom cursor runs only on fine pointers; boot screen shows once per session.
- Respects `prefers-reduced-motion`; keyboard and screen-reader friendly (skip link, focus rings, aria labels).
- `npm run build` outputs a static site to `out/` (see `.github/workflows/nextjs.yml`).
