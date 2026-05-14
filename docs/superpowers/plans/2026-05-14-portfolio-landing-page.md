# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace lorem ipsum with real bio, add skills section, CTA scroll button, and alternating work history timeline.

**Architecture:** All changes in `src/App.jsx` and `src/App.css`. Logo images added to `src/assets/logos/`. No new dependencies.

**Tech Stack:** React (JSX), CSS custom properties

**Supersedes:** `docs/superpowers/plans/2026-05-14-portfolio-bio-skills.md`

---

### Task 1: Replace bio text and add CTA button

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Replace the lorem ipsum paragraph and add button**

In `src/App.jsx`, replace the entire `<p className="intro">` block and add the button after it:

```jsx
<p className="intro">
  Full-stack engineer with 6+ years building large-scale systems at Sky, OnePay, and Wren Kitchens. Comfortable across the stack — from React frontends to Node microservices to cloud infrastructure. Currently exploring Agentic AI workflows.
</p>
<button
  className="cta-btn"
  onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
>
  Take a look at my experience
</button>
```

- [ ] **Step 2: Add CTA button styles to `src/App.css`**

```css
/* CTA Button */
.cta-btn {
  margin-top: 24px;
  padding: 10px 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  background: transparent;
  color: var(--black);
  border: var(--border);
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.15s, color 0.15s;
}

.cta-btn:hover {
  background: var(--black);
  color: var(--white);
}
```

- [ ] **Step 3: Start dev server and verify**

```bash
npm run dev
```

Confirm bio text is correct and button appears below it. Button doesn't need to scroll yet (timeline doesn't exist).

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: add real bio copy and CTA scroll button"
```

---

### Task 2: Add skills section

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Add skills section JSX**

In `src/App.jsx`, insert between `</main>` and `<footer className="footer">`:

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

- [ ] **Step 2: Add skills CSS to `src/App.css`**

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

- [ ] **Step 3: Verify in browser**

Confirm left column has black-bordered tags, right column is inverted black/yellow.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: add skills section"
```

---

### Task 3: Add logo images

**Files:**
- Create: `src/assets/logos/` directory with logo images

- [ ] **Step 1: Add placeholder logo images**

Create `src/assets/logos/` and add logo images for each company. If real logos aren't available yet, create simple coloured PNG placeholders (or skip and use initials fallback — the timeline renders initials when no image is provided).

Required filenames:
- `src/assets/logos/sky.png`
- `src/assets/logos/onepay.png`
- `src/assets/logos/wren.png`
- `src/assets/logos/lbu.png`
- `src/assets/logos/ai.png` (a generic AI/brain icon, or leave as initials)

- [ ] **Step 2: Commit any added images**

```bash
git add src/assets/logos/
git commit -m "feat: add company logo images"
```

---

### Task 4: Add timeline section

**Files:**
- Modify: `src/App.jsx`
- Modify: `src/App.css`

- [ ] **Step 1: Add timeline data and JSX**

In `src/App.jsx`, add the timeline data above the `App` function and the section inside the JSX after `</section>` (skills) and before `<footer>`:

```jsx
const timelineEntries = [
  {
    id: 'ai',
    company: 'Agentic AI',
    role: 'Personal Learning',
    dates: 'Ongoing',
    colour: 'var(--blue)',
    logo: null,
    initials: 'AI',
    bullets: [
      'Agent teams & A2A communication',
      'Custom skills, plugins & bespoke config',
    ],
  },
  {
    id: 'sky',
    company: 'Sky',
    role: 'Full Stack Software Engineer',
    dates: 'Jul 2022 – Apr 2026',
    colour: 'var(--blue)',
    logo: new URL('./assets/logos/sky.png', import.meta.url).href,
    initials: 'Sky',
    bullets: [
      'Led Experience Tracker — ~1.5M weekly users',
      'Monolith → microservices, −50% cycle time',
      '15 internal awards from Senior Leadership',
    ],
  },
  {
    id: 'onepay',
    company: 'OnePay',
    role: 'JavaScript Developer',
    dates: 'Nov 2020 – Jul 2022',
    colour: 'var(--red)',
    logo: new URL('./assets/logos/onepay.png', import.meta.url).href,
    initials: 'OP',
    bullets: [
      'Financial SOAP/XML data translation layer',
      'Custom reporting & data visualisation',
    ],
  },
  {
    id: 'wren',
    company: 'Wren Kitchens',
    role: 'Graduate Developer',
    dates: 'Aug 2019 – Nov 2020',
    colour: 'var(--yellow)',
    logo: new URL('./assets/logos/wren.png', import.meta.url).href,
    initials: 'WK',
    bullets: [
      'Real-time 3D rendering from 2D plans',
      'RealIT Project of the Year',
    ],
  },
  {
    id: 'lbu',
    company: 'Leeds Beckett University',
    role: 'Maths & Computer Science BSc 2:1',
    dates: 'Graduated 2019',
    colour: 'var(--black)',
    logo: new URL('./assets/logos/lbu.png', import.meta.url).href,
    initials: 'LBU',
    bullets: [],
  },
];
```

Then add the section JSX after the skills section and before `<footer>`:

```jsx
<section className="timeline" id="timeline">
  <span className="timeline-label">Experience</span>
  {timelineEntries.map((entry, i) => (
    <div
      key={entry.id}
      className={`timeline-entry ${i % 2 === 0 ? 'timeline-entry--odd' : 'timeline-entry--even'}`}
    >
      <div className="timeline-node" style={{ borderColor: entry.colour }}>
        {entry.logo
          ? <img src={entry.logo} alt={entry.company} className="timeline-node-img" onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
          : null}
        <span
          className="timeline-node-initials"
          style={{ color: entry.colour, display: entry.logo ? 'none' : 'flex' }}
        >
          {entry.initials}
        </span>
      </div>
      <div className="timeline-content">
        <div className="timeline-company">{entry.company}</div>
        <div className="timeline-role">{entry.role}</div>
        <div className="timeline-dates">{entry.dates}</div>
        {entry.bullets.length > 0 && (
          <ul className="timeline-bullets">
            {entry.bullets.map(b => <li key={b}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  ))}
</section>
```

- [ ] **Step 2: Add timeline CSS to `src/App.css`**

```css
/* Timeline */
.timeline {
  border-top: var(--border);
  padding: 48px 40px;
}

.timeline-label {
  display: block;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: var(--border);
  padding-bottom: 10px;
  margin-bottom: 40px;
}

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

.timeline-node {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 3px solid var(--black);
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.timeline-node-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline-node-initials {
  font-size: 0.55rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  align-items: center;
  justify-content: center;
}

.timeline-company {
  font-size: 1rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.1;
}

.timeline-role {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
  margin-top: 4px;
}

.timeline-dates {
  font-size: 0.6rem;
  color: #999;
  margin-top: 4px;
}

.timeline-bullets {
  margin-top: 8px;
  padding-left: 16px;
}

.timeline-entry--even .timeline-bullets {
  padding-left: 0;
  padding-right: 16px;
}

.timeline-bullets li {
  font-size: 0.65rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2px;
}
```

- [ ] **Step 3: Verify in browser**

- Entries alternate sides (odd: node left, even: node right)
- Coloured borders on each node (blue/blue/red/yellow/black)
- CTA button scrolls to the timeline smoothly
- Bullet points appear for all entries except LBU

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: add alternating work history timeline"
```
