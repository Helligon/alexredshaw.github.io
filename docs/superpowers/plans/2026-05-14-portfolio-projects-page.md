# Portfolio Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects` page with an animated flip-card grid, wire up React Router, and extract a shared Header component.

**Architecture:** Install `react-router-dom`, wrap app in `<HashRouter>`, extract `Header` to its own component, create `ProjectsPage` and `ProjectCard` components, define project data in `src/data/projects.js`.

**Tech Stack:** React, react-router-dom, CSS (no framework)

---

### Task 1: Install React Router

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install react-router-dom**

```bash
npm install react-router-dom
```

Expected output: package added to `node_modules`, `package-lock.json` updated.

- [ ] **Step 2: Verify install**

```bash
npm ls react-router-dom
```

Expected: version `6.x.x` listed.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add react-router-dom"
```

---

### Task 2: Extract Header component

**Files:**
- Create: `src/components/Header.jsx`
- Create: `src/components/Header.css`
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Create `src/components/Header.jsx`**

```jsx
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const { pathname } = useLocation()
  return (
    <header className="header">
      <Link className="header-label header-link" to="/">Alex Redshaw</Link>
      <nav className="header-nav">
        <Link
          className={`header-label header-link${pathname === '/projects' ? ' header-link--active' : ''}`}
          to="/projects"
        >
          Projects
        </Link>
        <a
          className="header-label header-link"
          href="https://github.com/Helligon/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Create `src/components/Header.css`**

```css
.header-nav {
  display: flex;
  gap: 24px;
  align-items: center;
}

.header-link--active {
  text-decoration: underline;
}
```

- [ ] **Step 3: Remove the old `<header>` from `src/App.jsx`**

Delete this block from `src/App.jsx`:

```jsx
<header className="header">
  <span className="header-label">Alex Redshaw</span>
  <a className="header-label header-link" href="https://github.com/Helligon/" target="_blank" rel="noreferrer">GitHub</a>
</header>
```

Add the import at the top of `src/App.jsx`:

```jsx
import Header from './components/Header'
```

Add `<Header />` as the first child inside `<div className="page">`.

- [ ] **Step 4: Remove header styles from `src/App.css`**

The `.header`, `.header-label`, `.header-link`, `.header-link:hover` rules now live in `Header.css`. Remove them from `App.css` to avoid duplication.

- [ ] **Step 5: Verify in browser**

Header renders identically to before, with the addition of a "Projects" link.

- [ ] **Step 6: Commit**

```bash
git add src/components/Header.jsx src/components/Header.css src/App.jsx src/App.css
git commit -m "refactor: extract Header component with Projects nav link"
```

---

### Task 3: Set up routing

**Files:**
- Modify: `src/main.jsx`
- Create: `src/pages/ProjectsPage.jsx`

- [ ] **Step 1: Wrap app in HashRouter in `src/main.jsx`**

Replace the contents of `src/main.jsx` with:

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
    <div className="page">
      <Header />
      <main style={{ padding: '40px' }}>
        <h1>Projects — coming soon</h1>
      </main>
    </div>
  )
}
```

- [ ] **Step 3: Verify routing**

Open the dev server. Clicking "Projects" in the header navigates to `/projects` and shows the stub. Clicking "Alex Redshaw" navigates back to `/`.

- [ ] **Step 4: Commit**

```bash
git add src/main.jsx src/pages/ProjectsPage.jsx
git commit -m "feat: add HashRouter with / and /projects routes"
```

---

### Task 4: Create project data

**Files:**
- Create: `src/data/projects.js`
- Create: `src/assets/projects/` (images)

- [ ] **Step 1: Create `src/data/projects.js`**

```js
export const projects = [
  {
    id: 'ai-agent-demo',
    title: 'AI Agent Demo',
    image: new URL('../assets/projects/ai-agent-demo.png', import.meta.url).href,
    blurb: 'Multi-agent system using A2A communication. Built to explore agentic workflows, token optimisation, and Claude Code integration at scale.',
    repo: 'https://github.com/Helligon',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    image: new URL('../assets/projects/portfolio.png', import.meta.url).href,
    blurb: 'This portfolio — React, Vite, brutalist design. Built and iterated entirely using agentic AI workflows with Claude Code.',
    repo: 'https://github.com/Helligon/alexredshaw.github.io',
  },
]
```

Add more entries as needed. Each entry needs a matching image in `src/assets/projects/`.

- [ ] **Step 2: Add placeholder images**

For any project without a screenshot yet, add a plain coloured PNG to `src/assets/projects/` named to match the `id`. Alternatively, the `ProjectCard` component will handle a missing image gracefully (see Task 5).

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.js src/assets/projects/
git commit -m "feat: add project data and images"
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
  border-right: 3px solid var(--black);
  border-bottom: 3px solid var(--black);
  aspect-ratio: 1;
  cursor: pointer;
  perspective: 800px;
}

.proj-tile:nth-child(3n) {
  border-right: none;
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

/* Front */
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
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  color: #ccc;
}

.tile-title {
  padding: 8px 12px;
  border-top: 3px solid var(--black);
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Back */
.tile-back {
  transform: rotateY(180deg);
  background: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
}

.tile-back-title {
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--yellow);
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
  margin-bottom: 10px;
}

.tile-back-blurb {
  font-size: 0.55rem;
  line-height: 1.6;
  color: #ccc;
  flex: 1;
}

.tile-back-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 0.55rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid var(--yellow);
  color: var(--yellow);
  padding: 6px 10px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}

.tile-back-link:hover {
  background: var(--yellow);
  color: var(--black);
}
```

- [ ] **Step 3: Verify component renders**

Temporarily add one `<ProjectCard>` to `ProjectsPage` to verify it renders and flips. Remove after.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.jsx src/components/ProjectCard.css
git commit -m "feat: add ProjectCard flip card component"
```

---

### Task 6: Build ProjectsPage

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
    <div className="page">
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
  padding: 32px 40px 24px;
  border-bottom: 3px solid var(--black);
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
  grid-template-columns: repeat(3, 1fr);
  border-top: 3px solid var(--black);
}
```

- [ ] **Step 3: Verify the full page in browser**

- Navigate to Projects via header link
- Cards render in a 3-column grid
- Clicking a card flips it with animation
- Clicking a second card unflips the first (150ms stagger), then flips the new one
- Clicking the active card unflips it
- GitHub link on the back face opens in a new tab without triggering the flip

- [ ] **Step 4: Commit**

```bash
git add src/pages/ProjectsPage.jsx src/pages/ProjectsPage.css
git commit -m "feat: add Projects page with flip-card grid"
```
