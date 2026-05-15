# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the portfolio as mobile-first — base CSS targets phones, progressively enhanced at 480px and 768px — and add a hamburger menu with a full-screen blue overlay nav.

**Architecture:** `App.css` base styles describe the mobile layout. Current two-column grids, heavy padding, and alternating timeline all move behind `@media (min-width: 768px)`. A single React `useState(false)` in the header drives the hamburger overlay. The timeline JSX is restructured to wrap the node + meta into a `.timeline-entry-header` div, with bullets as a sibling `.timeline-bullets` — this enables the mobile split (header row alternates sides, bullets centred below) while restoring to the side-by-side desktop layout at `768px+`.

**Tech Stack:** React 18, plain CSS custom properties, Vite dev server (`npm run dev`)

**Note on desktop timeline change:** On desktop the layout shifts from `[node] | [meta + bullets]` to `[node + meta] | [bullets]`. The alternating left/right pattern is fully preserved. This is a minor visual change accepted in the design spec.

---

### Task 1: Add hamburger state and overlay JSX to App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add `useState` to the React import**

In `src/App.jsx` line 1, change:
```jsx
import { useEffect } from 'react'
```
to:
```jsx
import { useEffect, useState } from 'react'
```

- [ ] **Step 2: Add `menuOpen` state inside the `App` function**

After the opening of `function App() {`, add before the `useEffect`:
```jsx
const [menuOpen, setMenuOpen] = useState(false)
```

- [ ] **Step 3: Replace the `<header>` block with hamburger + overlay**

Replace the current `<header className="header">` block (everything from `<header` to `</header>`) with:
```jsx
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
```

- [ ] **Step 4: Verify the JSX compiles**

Run: `npm run dev`
Expected: dev server starts with no errors in the terminal. Browser shows the page (hamburger won't be visible yet — CSS comes next).

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add hamburger menu state and overlay JSX"
```

---

### Task 2: Header CSS — hamburger, overlay, mobile/desktop toggle

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Add `overflow-x: hidden` to body**

In `src/App.css`, change the `body` rule from:
```css
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: var(--white);
  color: var(--black);
}
```
to:
```css
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: var(--white);
  color: var(--black);
  overflow-x: hidden;
}
```

- [ ] **Step 2: Make `.header-nav` hidden on mobile**

In `src/App.css`, change the `.header-nav` rule from:
```css
.header-nav {
  display: flex;
  gap: 24px;
  align-items: center;
}
```
to:
```css
.header-nav {
  display: none;
}
```

- [ ] **Step 3: Add hamburger button styles**

After the `.header-nav` rule, add:
```css
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
```

- [ ] **Step 4: Add full-screen overlay styles**

After the `.hamburger-line` rule, add:
```css
.nav-overlay {
  position: fixed;
  inset: 0;
  background: var(--blue);
  z-index: 200;
  display: flex;
  flex-direction: column;
  border: var(--border);
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
}

.nav-overlay-link:hover {
  text-decoration: underline;
}
```

- [ ] **Step 5: Add `768px+` desktop header overrides**

At the bottom of `src/App.css`, add both breakpoint blocks:
```css
/* ===== Small tablet: 480px+ ===== */
@media (min-width: 480px) {
  /* Reserved for future spacing and typography tweaks */
}

/* ===== Desktop: 768px+ ===== */
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

- [ ] **Step 6: Verify in browser**

With dev server running, open browser. Narrow to ~375px (DevTools device toolbar). Confirm:
- Hamburger ☰ icon visible in header
- Tapping/clicking ☰ opens full-screen blue overlay
- Nav links are large, bold, stacked
- Clicking any link closes the overlay and scrolls to the section
- ✕ closes the overlay without navigating

Widen to 800px+. Confirm:
- Hamburger hidden
- Inline nav links visible as before
- No overlay visible

- [ ] **Step 7: Commit**

```bash
git add src/App.css
git commit -m "feat: hamburger menu CSS and full-screen nav overlay"
```

---

### Task 3: Hero section — mobile-first CSS

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Update `.main` base to single column**

Change the `.main` rule from:
```css
.main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: calc(100vh - 150px);
}
```
to:
```css
.main {
  display: flex;
  flex-direction: column;
}
```

- [ ] **Step 2: Update `.main-left` for mobile**

Change `.main-left` from:
```css
.main-left {
  border-right: var(--border);
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```
to:
```css
.main-left {
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: var(--border);
}
```

- [ ] **Step 3: Update `.main-right` for mobile**

Change `.main-right` from:
```css
.main-right {
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```
to:
```css
.main-right {
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
```

- [ ] **Step 4: Tune `.name` clamp for mobile**

Change `.name` font-size from:
```css
font-size: clamp(3.5rem, 9vw, 8rem);
```
to:
```css
font-size: clamp(2.8rem, 12vw, 8rem);
```
This gives ~42px at 375px (readable, fits full-width column) and scales naturally up to desktop.

- [ ] **Step 5: Add desktop hero restores inside the `@media (min-width: 768px)` block**

Inside the existing `@media (min-width: 768px)` block at the bottom of `App.css`, add:
```css
  .main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: calc(100vh - 150px);
  }

  .main-left {
    border-bottom: none;
    border-right: var(--border);
    padding: 56px 40px;
  }

  .main-right {
    padding: 56px 40px;
  }
```

- [ ] **Step 6: Verify in browser**

Narrow to 375px. Confirm:
- Name stacks above the bio/role/buttons (single column)
- Name is readable and not overflowing
- Section break below hero visible

Widen to 800px+. Confirm:
- Two-column layout restored
- Name on left, bio/role/CTA on right

- [ ] **Step 7: Commit**

```bash
git add src/App.css
git commit -m "feat: hero section mobile-first layout"
```

---

### Task 4: Skills section — mobile-first CSS

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Update `.skills` base to single column**

Change `.skills` from:
```css
.skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: var(--border);
}
```
to:
```css
.skills {
  display: flex;
  flex-direction: column;
  border-top: var(--border);
}
```

- [ ] **Step 2: Update `.skills-col` padding for mobile**

Change `.skills-col` from:
```css
.skills-col {
  padding: 24px 40px;
}
```
to:
```css
.skills-col {
  padding: 24px;
}
```

- [ ] **Step 3: Update `.skills-col--tech` border for mobile**

Change `.skills-col--tech` from:
```css
.skills-col--tech {
  border-right: var(--border);
}
```
to:
```css
.skills-col--tech {
  border-bottom: var(--border);
}
```

- [ ] **Step 4: Add desktop skills restores inside `@media (min-width: 768px)`**

```css
  .skills {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .skills-col {
    padding: 24px 40px;
  }

  .skills-col--tech {
    border-bottom: none;
    border-right: var(--border);
  }
```

- [ ] **Step 5: Verify**

Narrow to 375px. Confirm:
- Tech Stack above, AI (Personal) below
- Border between them is horizontal
- Tags wrap correctly

Widen to 800px+. Confirm:
- Two-column layout restored with vertical border

- [ ] **Step 6: Commit**

```bash
git add src/App.css
git commit -m "feat: skills section mobile-first layout"
```

---

### Task 5: Restructure timeline JSX entries

**Files:**
- Modify: `src/App.jsx`

The current timeline entry JSX has `timeline-node` and `timeline-content` as siblings. We need to wrap `timeline-node` + the meta (company/role/dates) into a `timeline-entry-header` div, and move bullets to be a direct sibling of that header.

- [ ] **Step 1: Update the timeline entry render in `App.jsx`**

Find the `{timelineEntries.map((entry, i) => (` section and replace the full JSX inside `.map()` with:

```jsx
{timelineEntries.map((entry, i) => (
  <div
    key={entry.id}
    className={`timeline-entry${i % 2 !== 0 ? ' timeline-entry--even' : ''}`}
  >
    <div className="timeline-entry-header">
      <div className="timeline-node" style={{ borderColor: entry.colour }}>
        <span
          className="timeline-node-initials"
          style={{ color: entry.colour }}
        >
          {entry.initials}
        </span>
      </div>
      <div className="timeline-meta">
        <div className="timeline-company">{entry.company}</div>
        <div className="timeline-role">{entry.role}</div>
        <div className="timeline-dates">{entry.dates}</div>
      </div>
    </div>
    {entry.bullets.length > 0 && (
      <ul className="timeline-bullets">
        {entry.bullets.map(b => <li key={b}>{b}</li>)}
      </ul>
    )}
  </div>
))}
```

- [ ] **Step 2: Verify the page renders correctly**

With dev server running, check the page renders all 5 timeline entries without console errors. The entries will look unstyled/broken until Task 6 adds the CSS — that is expected.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "refactor: restructure timeline entry JSX for mobile layout"
```

---

### Task 6: Timeline CSS — mobile base + desktop restore

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Replace the timeline entry rules with mobile-first versions**

Find and replace these existing rules in `App.css`:

Remove:
```css
.timeline-entry {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 40px;
}

.timeline-entry:last-child {
  margin-bottom: 0;
}

.timeline-entry--even {
  flex-direction: row-reverse;
}

.timeline-entry--even .timeline-content {
  text-align: right;
}
```

Replace with:
```css
.timeline-entry {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-bottom: var(--border);
}

.timeline-entry:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.timeline-entry-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.timeline-entry--even .timeline-entry-header {
  flex-direction: row-reverse;
}

.timeline-meta {
  text-align: left;
}

.timeline-entry--even .timeline-meta {
  text-align: right;
}
```

- [ ] **Step 2: Update `.timeline-bullets` for mobile**

Find and replace the existing `.timeline-bullets` rules:

Remove:
```css
.timeline-bullets {
  margin-top: 8px;
  padding-left: 16px;
  list-style: none;
}

.timeline-entry--even .timeline-bullets {
  padding-left: 0;
}

.timeline-bullets li {
  font-size: 0.65rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2px;
}
```

Replace with:
```css
.timeline-bullets {
  list-style: none;
  padding: 0;
  margin-top: 12px;
  text-align: center;
}

.timeline-bullets li {
  font-size: 0.65rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2px;
}
```

- [ ] **Step 3: Update `.timeline` padding for mobile**

Change:
```css
.timeline {
  border-top: var(--border);
  padding: 48px 280px;
}
```
to:
```css
.timeline {
  border-top: var(--border);
  padding: 32px 20px;
}
```

- [ ] **Step 4: Add desktop timeline restores inside `@media (min-width: 768px)`**

```css
  .timeline {
    padding: 48px 280px;
  }

  .timeline-entry {
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
    padding: 0;
    margin-bottom: 40px;
    border-bottom: none;
  }

  .timeline-entry:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }

  .timeline-entry--even {
    flex-direction: row-reverse;
  }

  .timeline-entry-header {
    flex-shrink: 0;
    align-items: flex-start;
  }

  .timeline-entry--even .timeline-entry-header {
    flex-direction: row-reverse;
  }

  .timeline-meta {
    text-align: left;
  }

  .timeline-entry--even .timeline-meta {
    text-align: right;
  }

  .timeline-bullets {
    flex: 1;
    text-align: left;
    padding-left: 16px;
    margin-top: 8px;
  }

  .timeline-entry--even .timeline-bullets {
    text-align: right;
    padding-left: 0;
  }
```

- [ ] **Step 5: Verify mobile timeline at 375px**

Check:
- Each entry: node circle + company/role/dates on one row
- Odd entries: node on left, meta text on right
- Even entries: node on right, meta text on left (right-aligned)
- Bullets appear centred below each entry
- Border-bottom divides entries cleanly

- [ ] **Step 6: Verify desktop timeline at 800px+**

Check:
- Full padding restored (`48px 280px`)
- Node + meta visible as a grouped header on the correct side
- Bullets fill remaining space on the opposite side
- Even entries correctly reversed
- Scroll-in animation still works (nodes pop in on scroll)

- [ ] **Step 7: Commit**

```bash
git add src/App.css
git commit -m "feat: timeline mobile-first layout with alternating headers and centred bullets"
```

---

### Task 7: Final verification pass

**Files:** None — browser verification only

- [ ] **Step 1: Check at 375px (small phone)**

Open DevTools device toolbar at 375px wide. Scroll through the full page and confirm:
- Header: logo + hamburger visible, no overflow
- Hamburger opens overlay, all links work, overlay closes on link tap or ✕
- Hero: name stacks above bio/role/CTA
- Section break: yellow/red blocks full width
- Skills: Tech Stack above AI, horizontal border between, tags wrap cleanly
- Section break: yellow/red blocks full width
- Timeline: entries alternate node sides, bullets centred below each
- Footer: yellow/red blocks visible

- [ ] **Step 2: Check at 480px (large phone / small tablet)**

Open DevTools at 480px. Confirm layout is stable between 375px and 768px — no breaking overflow, no elements colliding.

- [ ] **Step 3: Check at 768px+ (desktop)**

Widen to 1024px. Confirm:
- Inline nav visible, hamburger hidden
- Hero: two-column grid, name left, bio right
- Skills: two-column grid
- Timeline: side-by-side alternating layout, full padding
- No regressions from the desktop layout before this work

- [ ] **Step 4: Fix any issues found and commit**

If any issues are found during verification, fix them and commit:
```bash
git add src/App.css src/App.jsx
git commit -m "fix: mobile layout adjustments from verification"
```
