# Portfolio Landing Page Design

**Date:** 2026-05-14  
**Status:** Approved  
**Supersedes:** `2026-05-14-portfolio-bio-skills-design.md`

## Goal

Extend the landing page with a real bio, categorised skills section, a scroll CTA button, and a work history timeline.

## Page Structure

```
[HEADER]            — unchanged
[HERO]              — bio text replaced, CTA button added
[SKILLS SECTION]    — new: 2-column categorised skills grid
[TIMELINE SECTION]  — new: alternating work history
[FOOTER]            — unchanged
```

---

## 1. Hero — Bio Text

Replace the `<p className="intro">` lorem ipsum with:

> Full-stack engineer with 6+ years building large-scale systems at Sky, OnePay, and Wren Kitchens. Comfortable across the stack — from React frontends to Node microservices to cloud infrastructure. Currently exploring Agentic AI workflows.

### CTA Button

Add a `"Take a look at my experience"` button below the bio text. On click it smooth-scrolls to the timeline section (`#timeline`).

- Style: uppercase, bold, small font, black border — consistent with existing tag/label aesthetic
- Hover: black background, white text (invert)

---

## 2. Skills Section

A 2-column grid section below the hero, with the same `3px solid black` border treatment.

### Left column — Tech Stack

| Group | Tags |
|-------|------|
| Frontend | React, TypeScript, JavaScript, HTML / CSS |
| Backend | Node.js, Java, REST APIs, Microservices |
| Cloud & DevOps | AWS, Docker, GitHub Pipelines |
| Data & Observability | Elastic, Kibana, Grafana |

### Right column — AI (Personal)

Inverted: black background, yellow text/borders.

| Group | Tags |
|-------|------|
| Focus areas | Multi-Agent Orchestration, Agentic Workflows, RAG, Claude Code, A2A |

### Visual

- Column label: small-caps, underlined with matching colour (`var(--border)` / yellow)
- Tags: `border: 2px solid`, uppercase, small font
- AI column: `background: var(--black)`, yellow borders/text
- Group labels: small uppercase, `#888`

---

## 3. Timeline Section

A full-width section below skills, with `id="timeline"` for the scroll anchor.

### Layout

No connecting vertical line. Entries alternate sides:
- **Odd entries**: circle on the left, content on the right
- **Even entries**: circle on the right, content on the left (text right-aligned)

### Circle nodes

- 48px diameter, `border-radius: 50%`
- Contains company logo image (with `object-fit: cover`)
- Coloured border per company (see below)
- Falls back to initials if image missing

### Entries (top to bottom)

| # | Company | Role | Dates | Border colour | Key bullets |
|---|---------|------|-------|---------------|-------------|
| 1 | Agentic AI | Personal Learning | Ongoing | `var(--blue)` | Agent teams & A2A communication; Custom skills, plugins & bespoke config |
| 2 | Sky | Full Stack Engineer | Jul 2022 – Apr 2026 | `var(--blue)` | Led Experience Tracker — ~1.5M weekly users; Monolith → microservices, −50% cycle time; 15 internal awards |
| 3 | OnePay | JavaScript Developer | Nov 2020 – Jul 2022 | `var(--red)` | Financial SOAP/XML data translation layer; Custom reporting & data visualisation |
| 4 | Wren Kitchens | Graduate Developer | Aug 2019 – Nov 2020 | `var(--yellow)` | Real-time 3D rendering from 2D plans; RealIT Project of the Year |
| 5 | Leeds Beckett | Maths & Computer Science BSc 2:1 | Graduated 2019 | `#000` | — |

### Content per entry

- Company name: bold, uppercase, large
- Role: small uppercase, grey
- Dates: small, light grey
- Bullets: small, 2–3 max, concise

### Section header

Small-caps label `EXPERIENCE` at the top of the section, separated by a `3px solid black` top border.

---

## Implementation Notes

- Add `id="timeline"` to the timeline section for anchor scrolling
- Button uses `document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })`
- Logo images stored in `src/assets/logos/` — filenames: `sky.png`, `onepay.png`, `wren.png`, `lbu.png`, `ai.png`
- No new dependencies required
