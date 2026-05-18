# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects` route with a flip-card grid, extract the shared Header component with mobile hamburger and cross-page scroll navigation.

**Architecture:** Extract `<Header>` (with all nav state) out of `App.jsx` into its own component, wrap the app in `HashRouter` (required for GitHub Pages), wire Skills/Experience links to use `navigate('/?scroll=<id>')` so they work from any page, then build the Projects page with a 3-column responsive flip-card grid.

**Tech Stack:** React 19, react-router-dom v7, Vite, plain CSS

> **Supersedes:** `docs/superpowers/plans/2026-05-14-portfolio-projects-page.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/Header.jsx` | Create | Header + overlay markup, all nav state (menuOpen, scroll-nav) |
| `src/components/Header.css` | Create | All header + overlay CSS (moved from App.css) |
| `src/pages/ProjectsPage.jsx` | Create | Projects route — title block + card grid |
| `src/pages/ProjectsPage.css` | Create | Projects page layout, responsive grid |
| `src/components/ProjectCard.jsx` | Create | Flip card component |
| `src/components/ProjectCard.css` | Create | Flip card styles |
| `src/data/projects.js` | Create | Project data array |
| `src/main.jsx` | Modify | Wrap in HashRouter, add `/projects` route |
| `src/App.jsx` | Modify | Remove header/overlay JSX + state, add `<Header />`, add scroll-param effect |
| `src/App.css` | Modify | Remove header + overlay rules (now in Header.css) |

---

### Task 1: Extract Header component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create `src/components/Header.jsx`**

Move the `<header>` JSX and overlay JSX out of `App.jsx` verbatim — **no link changes yet**. Move the `menuOpen` state and its two `useEffect` hooks here too.

```jsx
import { useState, useEffect } from 'react'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="header">
        <a className="header-label header-link header-home" href="#top">
          <img src="/favicon.svg" alt="" className="header-logo" />
          Alex Redshaw
        </a>
        <nav className="header-nav">
          <a className="header-label header-link" href="#skills">Skills</a>
          <a className="header-label header-link" href="#timeline">Experience</a>
          <a className="header-label header-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer">GitHub</a>
          <a className="header-label header-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {menuOpen && (
        <div className="nav-overlay">
          <div className="nav-overlay-header">
            <a className="header-label header-link header-home" href="#top" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.svg" alt="" className="header-logo" />
              Alex Redshaw
            </a>
            <button className="nav-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">✕</button>
          </div>
          <nav className="nav-overlay-links">
            <a className="nav-overlay-link" href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a className="nav-overlay-link" href="#timeline" onClick={() => setMenuOpen(false)}>Experience</a>
            <a className="nav-overlay-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a className="nav-overlay-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
          </nav>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Create `src/components/Header.css`**

Cut these rules verbatim from `src/App.css` and paste them here. Also include the `@media (min-width: 768px)` block for `.header-nav` and `.hamburger`.

```css
.header {
  background: var(--blue);
  padding: 16px 32px;
  border-bottom: var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--white);
}

.header-link {
  text-decoration: none;
}

.header-link:hover {
  text-decoration: underline;
}

.header-link--active {
  text-decoration: underline;
}

.header-home {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-logo {
  height: 28px;
  width: 28px;
  display: block;
}

.header-nav {
  display: none;
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--white);
}

@keyframes overlayExpand {
  from { clip-path: inset(0 0 100% 0); }
  to   { clip-path: inset(0 0 0% 0); }
}

@keyframes linkFadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.nav-overlay {
  position: fixed;
  inset: 0;
  background: var(--blue);
  z-index: 200;
  display: flex;
  flex-direction: column;
  border: var(--border);
  animation: overlayExpand 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.nav-overlay-header {
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: var(--border);
  flex-shrink: 0;
}

.nav-overlay-close {
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.5rem;
  font-weight: 900;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.nav-overlay-links {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
}

.nav-overlay-link {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--white);
  text-decoration: none;
  padding: 24px 32px;
  border-bottom: var(--border);
  animation: linkFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.nav-overlay-link:nth-child(1) { animation-delay: 0.28s; }
.nav-overlay-link:nth-child(2) { animation-delay: 0.40s; }
.nav-overlay-link:nth-child(3) { animation-delay: 0.52s; }
.nav-overlay-link:nth-child(4) { animation-delay: 0.64s; }

.nav-overlay-link:hover {
  text-decoration: underline;
}

/* Button reset — for Skills/Experience which trigger scroll, not navigation */
button.header-link {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button.nav-overlay-link {
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

@media (min-width: 768px) {
  .header-nav {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  .hamburger {
    display: none;
  }
}
```

- [ ] **Step 3: Remove the header/overlay block from `src/App.jsx`**

Delete everything between (and including) `<header className="header">` and the closing `</header>`, and delete the `{menuOpen && (<div className="nav-overlay">...</div>)}` block.

Remove `const [menuOpen, setMenuOpen] = useState(false)` and the two `useEffect` hooks that reference `menuOpen`.

Change the import at the top:
```jsx
// Before
import { useEffect, useState } from 'react'

// After
import { useEffect } from 'react'
```

Add the Header import and render it as the first child of `.page`:
```jsx
import Header from './components/Header'

// Inside the return, replace the removed <header> with:
<div className="page" id="top">
  <Header />
  <main className="main">
    {/* ... rest unchanged ... */}
  </main>
  {/* ... rest unchanged ... */}
</div>
```

- [ ] **Step 4: Remove header + overlay rules from `src/App.css`**

Delete the following rule blocks from `src/App.css` — they now live in `Header.css`:

- `.header { ... }`
- `.header-label { ... }`
- `.header-link { ... }`
- `.header-link:hover { ... }`
- `.header-home { ... }`
- `.header-logo { ... }`
- `.header-nav { display: none; }`
- `.hamburger { ... }`
- `.hamburger-line { ... }`
- `@keyframes overlayExpand { ... }`
- `@keyframes linkFadeUp { ... }`
- `.nav-overlay { ... }`
- `.nav-overlay-header { ... }`
- `.nav-overlay-close { ... }`
- `.nav-overlay-links { ... }`
- `.nav-overlay-link { ... }`
- `.nav-overlay-link:nth-child(1–4) { ... }`
- `.nav-overlay-link:hover { ... }`

In the `@media (min-width: 768px)` block, delete the `.header-nav { display: flex; ... }` and `.hamburger { display: none; }` rules. Leave all other rules in that block unchanged.

- [ ] **Step 5: Verify in browser**

```bash
npm run dev
```

Open http://localhost:5173. The header must look and behave identically to before: logo left, nav links right on desktop, hamburger on mobile, overlay opens and closes, Escape closes, scroll locks while overlay is open.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css src/App.jsx src/App.css
git commit -m "refactor: extract Header component with hamburger state"
```

---

### Task 2: Set up HashRouter + stub Projects route

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/pages/ProjectsPage.jsx`

- [ ] **Step 1: Replace `src/main.jsx` with HashRouter setup**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import ProjectsPage from './pages/ProjectsPage'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
)
```

- [ ] **Step 2: Create stub `src/pages/ProjectsPage.jsx`**

```jsx
import Header from '../components/Header'

export default function ProjectsPage() {
  return (
    <div className="page" id="top">
      <Header />
      <main style={{ padding: '40px' }}>
        <h1>Projects — coming soon</h1>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify routing in browser**

- Home loads at `http://localhost:5173/#/`
- Manually navigate to `http://localhost:5173/#/projects` — shows the stub "Projects — coming soon"
- Header renders correctly on both pages

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/pages/ProjectsPage.jsx
git commit -m "feat: add HashRouter with / and /projects routes"
```

---

### Task 3: Update Header links to use router navigation; add scroll-param effect to home page

**Files:**
- Modify: `src/components/Header.jsx`
- Modify: `src/components/Header.css`
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite `src/components/Header.jsx` with router-aware links**

Skills/Experience become `<button>` elements that call `scrollTo()` — which scrolls in place on the home page and navigates with a `?scroll=` param from anywhere else. The logo becomes a `<Link to="/">`. Projects gets a `<Link to="/projects">` with an active underline.

```jsx
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function scrollTo(id) {
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/?scroll=${id}`)
    }
  }

  useEffect(() => {
    if (!menuOpen) return
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="header">
        <Link className="header-label header-link header-home" to="/">
          <img src="/favicon.svg" alt="" className="header-logo" />
          Alex Redshaw
        </Link>
        <nav className="header-nav">
          <button className="header-label header-link" onClick={() => scrollTo('skills')}>Skills</button>
          <button className="header-label header-link" onClick={() => scrollTo('timeline')}>Experience</button>
          <Link
            className={`header-label header-link${pathname === '/projects' ? ' header-link--active' : ''}`}
            to="/projects"
          >
            Projects
          </Link>
          <a className="header-label header-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer">GitHub</a>
          <a className="header-label header-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </header>

      {menuOpen && (
        <div className="nav-overlay">
          <div className="nav-overlay-header">
            <Link className="header-label header-link header-home" to="/" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.svg" alt="" className="header-logo" />
              Alex Redshaw
            </Link>
            <button className="nav-overlay-close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">✕</button>
          </div>
          <nav className="nav-overlay-links">
            <button className="nav-overlay-link" onClick={() => scrollTo('skills')}>Skills</button>
            <button className="nav-overlay-link" onClick={() => scrollTo('timeline')}>Experience</button>
            <Link className="nav-overlay-link" to="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
            <a className="nav-overlay-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>GitHub</a>
            <a className="nav-overlay-link" href="https://www.linkedin.com/in/alex-redshaw/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn</a>
          </nav>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 2: Add 5th overlay animation delay to `src/components/Header.css`**

The overlay now has 5 links (added Projects). Add the 5th delay after the existing 4:

```css
.nav-overlay-link:nth-child(5) { animation-delay: 0.76s; }
```

- [ ] **Step 3: Add scroll-param effect to `src/App.jsx`**

Add `useLocation` and `useNavigate` imports from react-router-dom, then add a new `useEffect` at the top of the `App` function body (before the IntersectionObserver effect):

```jsx
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'

// ... (PALETTE, ALL_TAGS, buildTagColours, TAG_COLOURS, timelineEntries unchanged)

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const param = new URLSearchParams(location.search).get('scroll')
    if (!param) return
    navigate('/', { replace: true })
    document.getElementById(param)?.scrollIntoView({ behavior: 'smooth' })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // ... existing IntersectionObserver effect, unchanged
  }, [])

  // ... rest of App unchanged
}
```

- [ ] **Step 4: Verify cross-page scroll navigation**

1. Start the dev server, go to `/#/projects`
2. Click "Skills" in the desktop header — should navigate to `/#/` and scroll to the Skills section
3. Click "Experience" — should navigate to `/#/` and scroll to the Timeline section
4. On mobile, open the hamburger overlay on the projects page, tap Skills — same result
5. Confirm the `?scroll=` param is gone from the URL after scrolling (replaced by `/#/`)
6. On the home page, clicking Skills/Experience should scroll in place without any navigation

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css src/App.jsx
git commit -m "feat: router-aware header nav with scroll-param cross-page links"
```

---

### Task 4: Create project data

**Files:**
- Create: `src/data/projects.js`

- [ ] **Step 1: Create `src/data/projects.js`**

```js
export const projects = [
  {
    id: 'ai-agent-demo',
    title: 'AI Agent Demo',
    image: null,
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

Images are `null` for now. When real screenshots are ready, replace `null` with the imported asset URL:
```js
image: new URL('../assets/projects/ai-agent-demo.png', import.meta.url).href,
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: add project data stubs"
```

---

### Task 5: Build ProjectCard component

**Files:**
- Create: `src/components/ProjectCard.jsx`
- Create: `src/components/ProjectCard.css`

- [ ] **Step 1: Create `src/components/ProjectCard.jsx`**

```jsx
import './ProjectCard.css'

export default function ProjectCard({ project, flipped, onFlip }) {
  return (
    <div
      className={`proj-tile${flipped ? ' flipped' : ''}`}
      onClick={onFlip}
    >
      <div className="tile-inner">
        <div className="tile-front">
          <div className="tile-img">
            {project.image
              ? <img src={project.image} alt={project.title} className="tile-img-src" />
              : <span className="tile-img-placeholder">{project.title[0]}</span>
            }
          </div>
          <div className="tile-title">{project.title}</div>
        </div>
        <div className="tile-back">
          <div>
            <div className="tile-back-title">{project.title}</div>
            <div className="tile-back-blurb">{project.blurb}</div>
          </div>
          <a
            className="tile-back-link"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
          >
            ↗ GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/components/ProjectCard.css`**

```css
.proj-tile {
  border-right: var(--border);
  border-bottom: var(--border);
  aspect-ratio: 1;
  cursor: pointer;
  perspective: 800px;
}

.tile-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.proj-tile.flipped .tile-inner {
  transform: rotateY(180deg);
}

.tile-front,
.tile-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.tile-front {
  display: flex;
  flex-direction: column;
  background: var(--white);
}

.tile-img {
  flex: 1;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e5e5;
}

.tile-img-src {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tile-img-placeholder {
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #bbb;
}

.tile-title {
  padding: 10px 14px;
  border-top: var(--border);
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.tile-back {
  transform: rotateY(180deg);
  background: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.tile-back-title {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--yellow);
  border-bottom: 1px solid #333;
  padding-bottom: 10px;
  margin-bottom: 12px;
}

.tile-back-blurb {
  font-size: 0.58rem;
  line-height: 1.7;
  color: #bbb;
  font-weight: 400;
  flex: 1;
  font-family: Arial, sans-serif;
}

.tile-back-link {
  display: inline-block;
  margin-top: 14px;
  font-size: 0.55rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid var(--yellow);
  color: var(--yellow);
  padding: 7px 12px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.tile-back-link:hover {
  background: var(--yellow);
  color: var(--black);
}
```

- [ ] **Step 3: Verify card renders and flips**

Temporarily add one card to `ProjectsPage.jsx` to test:
```jsx
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

// Inside the return, below the <h1>:
<ProjectCard
  project={projects[0]}
  flipped={false}
  onFlip={() => {}}
/>
```

Open `/#/projects`. Card should render with grey placeholder area and title strip at the bottom. Remove the temporary card after verifying — the full grid is wired in Task 6.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.jsx src/components/ProjectCard.css
git commit -m "feat: add ProjectCard flip card component"
```

---

### Task 6: Build full ProjectsPage

**Files:**
- Modify: `src/pages/ProjectsPage.jsx`
- Create: `src/pages/ProjectsPage.css`

- [ ] **Step 1: Replace stub with full `src/pages/ProjectsPage.jsx`**

```jsx
import { useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'
import './ProjectsPage.css'

export default function ProjectsPage() {
  const [flippedId, setFlippedId] = useState(null)

  function handleFlip(id) {
    if (flippedId === id) {
      setFlippedId(null)
      return
    }
    if (flippedId !== null) {
      setFlippedId(null)
      setTimeout(() => setFlippedId(id), 150)
    } else {
      setFlippedId(id)
    }
  }

  return (
    <div className="page" id="top">
      <Header />
      <main className="projects-main">
        <div className="projects-title-block">
          <h1 className="projects-title">Projects</h1>
        </div>
        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              flipped={flippedId === project.id}
              onFlip={() => handleFlip(project.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Create `src/pages/ProjectsPage.css`**

```css
.projects-main {
  flex: 1;
}

.projects-title-block {
  padding: 40px 40px 32px;
  border-bottom: var(--border);
}

.projects-title {
  font-size: clamp(2.5rem, 7vw, 6rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 0.9;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  border-top: var(--border);
}

/* Remove right border from last card in each row */
.proj-tile:nth-child(1n) {
  border-right: none;
}

@media (min-width: 480px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .proj-tile:nth-child(1n) {
    border-right: var(--border);
  }

  .proj-tile:nth-child(2n) {
    border-right: none;
  }
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .proj-tile:nth-child(2n) {
    border-right: var(--border);
  }

  .proj-tile:nth-child(3n) {
    border-right: none;
  }
}
```

- [ ] **Step 3: Verify the full page in browser**

Check all of the following:

1. Navigate to `/#/projects` via the Projects header link — page loads with title block and card grid
2. Cards render in the correct column count for each screen size: 1 col on phone, 2 col on tablet, 3 col on desktop
3. Click a card — it flips to show the black back face with yellow title, grey blurb, yellow GitHub button
4. Click the same card again — it flips back
5. Click a second card while one is flipped — first unflips (150ms pause), then second flips
6. Click the GitHub button on the back face — opens GitHub in a new tab without re-flipping the card
7. Click "Skills" in the header — navigates home and scrolls to the Skills section
8. Click "Experience" in the header — navigates home and scrolls to the Experience section
9. On the home page, click "Projects" — navigates to `/#/projects`
10. On mobile, open the hamburger overlay on the projects page — all 5 links present, animations stagger correctly

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProjectsPage.jsx src/pages/ProjectsPage.css
git commit -m "feat: add Projects page with responsive flip-card grid"
```

- [ ] **Step 5: Push**

```bash
git push origin main
```
