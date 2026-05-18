# Projects Page — Design Spec
**Date:** 2026-05-18  
**Status:** Approved

---

## Goal

Add a `/projects` route to the portfolio site with a flip-card grid of projects, and extract the shared Header component so both pages use it.

---

## Architecture

### Files created

| File | Purpose |
|---|---|
| `src/components/Header.jsx` | Shared header — owns hamburger state, handles scroll-nav |
| `src/components/Header.css` | Header + overlay styles (moved from App.css) |
| `src/pages/ProjectsPage.jsx` | Projects route — title block + card grid |
| `src/pages/ProjectsPage.css` | Projects page layout styles |
| `src/components/ProjectCard.jsx` | Flip card component |
| `src/components/ProjectCard.css` | Flip card styles |
| `src/data/projects.js` | Project data array (stubs for now) |

### Files modified

| File | Change |
|---|---|
| `src/main.jsx` | Wrap in `<HashRouter>`, add `<Route path="/projects">` |
| `src/App.jsx` | Remove `<header>` + overlay JSX, add `<Header />`, add scroll-param effect |
| `src/App.css` | Remove header/overlay rules (now in Header.css) |

**Why HashRouter:** GitHub Pages has no server-side routing; HashRouter avoids 404 on direct URL access. URLs look like `/#/` and `/#/projects`.

---

## Header Component

### Visual design
Matches the existing live site exactly:
- Blue background, `padding: 16px 32px`, sticky, `z-index: 100`
- Logo: AR favicon SVG + "Alex Redshaw" text — `font-size: 0.7rem`, `font-weight: 700`, `letter-spacing: 0.2em`, uppercase, white
- Nav links: same typographic treatment, `gap: 24px`, plain text — `text-decoration: underline` on hover only
- Active page link gets a persistent underline (via `header-link--active` class, set via `useLocation`)

### Nav links (all pages)
`Alex Redshaw` | `Skills` | `Experience` | `Projects` | `GitHub` | `LinkedIn`

### Scroll navigation
Skills and Experience are only meaningful on the home page. From the projects page, clicking them calls `navigate('/?scroll=skills')` or `navigate('/?scroll=timeline')` via `useNavigate`. The home page reads the param on mount and scrolls.

### Mobile behaviour
- Desktop (≥768px): hamburger hidden, all nav links visible inline
- Mobile (<768px): hamburger visible, nav links hidden; hamburger opens full-screen overlay with the same links

### State owned by Header
- `menuOpen` boolean (moved from App.jsx)
- Escape key listener (closes overlay)
- Body scroll-lock effect (`document.body.style.overflow`)

---

## Scroll Navigation — Home Page

`App.jsx` gets one new `useEffect` that runs once on mount:

```js
useEffect(() => {
  const param = new URLSearchParams(location.search).get('scroll')
  if (!param) return
  const el = document.getElementById(param)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  navigate('/', { replace: true })
}, [])
```

`App` imports `useNavigate` and `useLocation` from react-router-dom. The `replace: true` cleans the `?scroll=` param from the URL without adding a history entry.

---

## Projects Page

### Title block
- `padding: 40px 40px 32px`, `border-bottom: 3px solid black`
- `PROJECTS` heading: `font-size: clamp(2.5rem, 7vw, 6rem)`, weight 900, uppercase, tight letter-spacing — same typographic treatment as the hero name

### Card grid
- CSS grid, `grid-template-columns: repeat(3, 1fr)`
- Cards have `border-right` and `border-bottom`; every third card has no right border
- Cards are square (`aspect-ratio: 1`)
- Mobile: 1 column. Tablet (≥480px): 2 columns. Desktop (≥768px): 3 columns.

### Flip card — front face
- Grey placeholder area (flex: 1) with large initials when no image
- Title strip at bottom: `border-top: 3px solid black`, `padding: 10px 14px`, `font-size: 0.6rem`, weight 900, uppercase

### Flip card — back face
- Black background
- Yellow project title (`color: var(--yellow)`) with a dark border-bottom separator
- Grey blurb text (`color: #bbb`), `font-size: 0.58rem`, `line-height: 1.7`
- Yellow-bordered GitHub link button at bottom; `→ black background, black text` on hover
- GitHub link uses `e.stopPropagation()` so clicking it doesn't re-flip the card

### Flip behaviour
- Only one card flipped at a time
- Clicking active card: unflips it
- Clicking a different card while one is open: unflips current (150ms), then flips new one
- Animation: `transform: rotateY(180deg)`, `0.5s cubic-bezier(0.4, 0, 0.2, 1)`

### Project data (stubs)
```js
// src/data/projects.js
export const projects = [
  {
    id: 'ai-agent-demo',
    title: 'AI Agent Demo',
    image: null,  // placeholder until screenshot added
    blurb: 'Multi-agent system using A2A communication. Built to explore agentic workflows, token optimisation, and Claude Code integration at scale.',
    repo: 'https://github.com/Helligon',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    image: null,
    blurb: 'This portfolio — React, Vite, brutalist design. Built and iterated entirely using agentic AI workflows with Claude Code.',
    repo: 'https://github.com/Helligon/alexredshaw.github.io',
  },
]
```

Content is stubs — real projects and screenshots will be added later.

---

## Design Decisions

- **HashRouter not BrowserRouter** — GitHub Pages constraint; direct URL access would 404 with BrowserRouter
- **Scroll via `?scroll=` param** — cleanest way to trigger cross-page scrolling without storing state outside the URL; `replace: true` keeps history clean
- **`menuOpen` state lives in Header** — the overlay is a Header concern; App.jsx shouldn't own nav state
- **Active link via `useLocation`** — Header reads current route to apply `header-link--active` class
- **Single flipped card** — only one card open at a time keeps the page readable and avoids layout shifting
