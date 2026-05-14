# Portfolio Bio + Skills Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the lorem ipsum placeholder with a real bio and add a categorised skills section below the hero.

**Architecture:** Two files change — `App.jsx` gets the bio text updated and a new `<section className="skills">` added between `<main>` and `<footer>`, and `App.css` gets the corresponding styles. No new dependencies.

**Tech Stack:** React (JSX), CSS custom properties (already defined in `App.css`)

---

### Task 1: Update bio text

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace the lorem ipsum paragraph**

In `src/App.jsx`, replace the entire `<p className="intro">` block:

```jsx
<p className="intro">
  Full-stack engineer with 6+ years building large-scale systems at Sky, OnePay, and Wren Kitchens. Comfortable across the stack — from React frontends to Node microservices to cloud infrastructure. Currently exploring Agentic AI workflows.
</p>
```

- [ ] **Step 2: Start dev server and verify**

```bash
npm run dev
```

Open the URL shown (typically `http://localhost:5173`). Confirm the right column now shows the real bio text instead of lorem ipsum.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: replace lorem ipsum with real bio copy"
```

---

### Task 2: Add skills section JSX

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Add the skills section**

In `src/App.jsx`, insert the following between `</main>` and `<footer className="footer">`:

```jsx
<section className="skills">
  <div className="skills-col skills-col--tech">
    <span className="skills-col-label">Tech Stack</span>

    <div className="skill-group">
      <span className="skill-group-label">Frontend</span>
      <div className="skill-tags">
        {['React', 'TypeScript', 'JavaScript', 'HTML / CSS'].map(t => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>

    <div className="skill-group">
      <span className="skill-group-label">Backend</span>
      <div className="skill-tags">
        {['Node.js', 'Java', 'REST APIs', 'Microservices'].map(t => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>

    <div className="skill-group">
      <span className="skill-group-label">Cloud &amp; DevOps</span>
      <div className="skill-tags">
        {['AWS', 'Docker', 'GitHub Pipelines'].map(t => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>

    <div className="skill-group">
      <span className="skill-group-label">Data &amp; Observability</span>
      <div className="skill-tags">
        {['Elastic', 'Kibana', 'Grafana'].map(t => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>
  </div>

  <div className="skills-col skills-col--ai">
    <span className="skills-col-label">AI (Personal)</span>

    <div className="skill-group">
      <span className="skill-group-label">Focus areas</span>
      <div className="skill-tags">
        {['Multi-Agent Orchestration', 'Agentic Workflows', 'RAG', 'Claude Code', 'A2A'].map(t => (
          <span key={t} className="skill-tag">{t}</span>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify it renders (unstyled is fine)**

Check the dev server — skills section should appear between the hero and the yellow/red footer, even if unstyled.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add skills section JSX"
```

---

### Task 3: Add skills CSS

**Files:**
- Modify: `src/App.css`

- [ ] **Step 1: Append the skills styles**

Add the following to the end of `src/App.css`:

```css
/* Skills */
.skills {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: var(--border);
}

.skills-col {
  padding: 40px;
}

.skills-col--tech {
  border-right: var(--border);
}

.skills-col--ai {
  background: var(--black);
}

.skills-col-label {
  display: block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: var(--border);
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.skills-col--ai .skills-col-label {
  color: var(--yellow);
  border-bottom-color: var(--yellow);
}

.skill-group {
  margin-bottom: 18px;
}

.skill-group:last-child {
  margin-bottom: 0;
}

.skill-group-label {
  display: block;
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 8px;
}

.skills-col--ai .skill-group-label {
  color: #666;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.skill-tag {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 2px solid var(--black);
  padding: 4px 8px;
}

.skills-col--ai .skill-tag {
  border-color: var(--yellow);
  color: var(--yellow);
}
```

- [ ] **Step 2: Verify in browser**

Check the dev server. Confirm:
- Left column: white background, black borders, grey group labels, black tags
- Right column: black background, yellow column label with yellow underline, yellow-bordered tags
- Both columns separated by a 3px black vertical border
- Section separated from hero by a 3px black top border

- [ ] **Step 3: Commit**

```bash
git add src/App.css
git commit -m "feat: add skills section styles"
```
