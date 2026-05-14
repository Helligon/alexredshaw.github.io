# Portfolio Bio + Skills Section

**Date:** 2026-05-14  
**Status:** Approved

## Goal

Replace the lorem ipsum placeholder in the landing page with a real bio and add a skills section, based on Alex's CV.

## Page Structure

The page gains one new section between the hero and the footer:

```
[HEADER]          — unchanged
[HERO]            — unchanged except bio text replaced
[SKILLS SECTION]  — new
[FOOTER]          — unchanged
```

## Changes to Existing Content

**Hero right column — bio text:**  
Replace the lorem ipsum `<p class="intro">` with:

> Full-stack engineer with 6+ years building large-scale systems at Sky, OnePay, and Wren Kitchens. Comfortable across the stack — from React frontends to Node microservices to cloud infrastructure. Currently exploring Agentic AI workflows.

## New Skills Section

A 2-column grid section below the hero, bordered with the existing `3px solid black` treatment.

### Left column — Tech Stack

Four groups of skill tags:

| Group | Tags |
|-------|------|
| Frontend | React, TypeScript, JavaScript, HTML / CSS |
| Backend | Node.js, Java, REST APIs, Microservices |
| Cloud & DevOps | AWS, Docker, GitHub Pipelines |
| Data & Observability | Elastic, Kibana, Grafana |

### Right column — AI (Personal)

Inverted styling: black background, yellow text/borders. One group:

| Group | Tags |
|-------|------|
| Focus areas | Multi-Agent Orchestration, Agentic Workflows, RAG, Claude Code, A2A |

## Visual Design

- Section header label: `SKILLS & TECHNOLOGIES` (same small-caps style as header)
- Left/right columns split with `border-right: 3px solid black`
- Tags: `border: 2px solid black`, small uppercase text — consistent with existing typographic style
- AI column: `background: black`, tags use `border-color: yellow`, `color: yellow`
- Group labels: small uppercase, grey (`#888`)
- Column labels: small uppercase, black border-bottom separator

## Implementation Notes

- Add a new `.skills` section in `App.jsx` between `<main>` and `<footer>`
- Add corresponding CSS to `App.css`
- No new dependencies required
