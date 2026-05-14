# Portfolio Projects Page Design

**Date:** 2026-05-14  
**Status:** Approved

## Goal

Add a `/projects` page with an animated flip-card grid of personal projects, and wire up React Router with a "Projects" nav link in the header.

## Page Structure

```
[HEADER]        — gains "Projects" nav link alongside "GitHub"
[/]             — landing page (existing, unchanged by this spec)
[/projects]     — new projects page
```

---

## 1. Routing

Add `react-router-dom` to the project. Two routes:

| Path | Component |
|------|-----------|
| `/` | `App` (existing landing page) |
| `/projects` | `ProjectsPage` (new) |

Wrap the app in `<BrowserRouter>` in `main.jsx`. Use `<HashRouter>` instead if GitHub Pages routing is a concern (avoids 404 on direct URL access).

---

## 2. Header Changes

The header gains a "Projects" nav link on the right, alongside the existing GitHub link:

```
Alex Redshaw                    Projects  |  GitHub
```

- "Projects" is a React Router `<Link to="/projects">` styled identically to the GitHub `<a>` link
- Active state: underline when on `/projects`

---

## 3. Projects Page

### Page header

Same `<header>` component as the landing page.

### Page title

Below the header, a full-width title block (same style as the hero name):

```
PROJECTS
```

Bold, uppercase, large — separated from the header by the standard `3px solid black` border.

### Project grid

3-column grid of flip cards, separated by `3px solid black` borders (same as the rest of the design system).

---

## 4. Flip Card

### Front face

- Top area: project screenshot image (`object-fit: cover`, fills the space)
- Bottom strip: project title — bold uppercase, small font, `3px solid black` top border

### Back face

- Black background, white/yellow text (matches AI column in skills section)
- Project title in yellow at the top, underlined
- Blurb: 2–4 sentence description of the project
- GitHub link button: yellow border, yellow text, uppercase — hover inverts to yellow bg / black text

### Flip behaviour

- CSS 3D `rotateY(180deg)` transform on `.flipped` class, `transition: 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- `perspective: 800px` on the tile container; `transform-style: preserve-3d` on inner
- Front: `backface-visibility: hidden`; Back: `rotateY(180deg)` + `backface-visibility: hidden`
- **Mutual exclusivity**: clicking a tile unflips any currently-flipped card, then flips the clicked one after 150ms
- Clicking the active (already-flipped) card unflips it with no delay

---

## 5. Project Data

Projects defined as a static array in `src/data/projects.js`:

```js
[
  {
    id: 'ai-agent-demo',
    title: 'AI Agent Demo',
    image: '/src/assets/projects/ai-agent-demo.png',
    blurb: '...',
    repo: 'https://github.com/Helligon/...'
  },
  // ...
]
```

Images stored in `src/assets/projects/`. Placeholder image used when no image provided.

---

## Implementation Notes

- Use `<HashRouter>` for GitHub Pages compatibility (`/` and `/#/projects`)
- Header component extracted to `src/components/Header.jsx` so both pages share it
- `ProjectsPage` in `src/pages/ProjectsPage.jsx`
- Flip card extracted to `src/components/ProjectCard.jsx`
- Project data in `src/data/projects.js`
- No CSS framework — plain CSS consistent with existing `App.css` style
