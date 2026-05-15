# Mobile Responsiveness Design

**Date:** 2026-05-15  
**Status:** Approved

---

## Overview

Make the portfolio site fully responsive using a mobile-first approach. Base CSS styles target mobile (0px+), progressively enhanced at two breakpoints: `min-width: 480px` (small tablet / large phone landscape) and `min-width: 768px` (tablet / desktop). The existing desktop layout is preserved exactly at `768px+`.

Standing rule: all future CSS and design work on this project must be mobile-first — write base styles for mobile, layer desktop overrides with `min-width` queries.

---

## Approach

Rewrite `App.css` so the base styles describe the mobile layout. Current desktop-only rules (two-column grids, heavy padding, alternating timeline) move behind `@media (min-width: 768px)`. The `480px` breakpoint is used for minor typographic and spacing tweaks between phone and tablet.

No new dependencies. Hamburger toggle uses a single React `useState(false)` in the header.

---

## Section Designs

### Header

**Mobile base:**
- Sticky single-row header: AR logo + name left, ☰ hamburger icon right.
- `useState(false)` controls menu open/closed state.
- When open: fixed full-screen blue (`#0057D8`) overlay covers the entire viewport. Nav links stacked vertically, large and bold, with thin dividing lines between them. ✕ button top-right closes the menu.
- Tapping any nav link closes the menu (required — most links are anchor jumps; without this the overlay stays open after navigation).
- Overlay sits at a high `z-index` above all page content.

**`768px+`:**
- Hamburger icon hidden (`display: none`).
- Full-screen overlay never rendered.
- Inline nav links displayed exactly as today.

---

### Hero

**Mobile base:**
- Single column, full width.
- Order: name (`ALEX REDSHAW`) first, then role / bio / CTA buttons below.
- The border between the two halves becomes a `border-top` on the lower content block (was `border-right` on the left column).
- Side padding: `24px`.
- `min-height`: natural height (`auto`) — the fixed `calc(100vh - 150px)` offset is removed on mobile.
- Name font already uses `clamp` — tune lower bound for `375px` readability.

**`768px+`:**
- Restores `grid-template-columns: 1fr 1fr`.
- Restores `min-height: calc(100vh - 150px)`.
- Restores `border-right` between columns.

---

### Skills

**Mobile base:**
- Single column. Tech Stack section first, AI (Personal) section below.
- The `border-right` between columns becomes a `border-bottom` on the Tech Stack block.
- Side padding: `24px`.
- Skill tags already `flex-wrap` — no change needed.

**`768px+`:**
- Restores `grid-template-columns: 1fr 1fr`.
- Restores `border-right`.

---

### Timeline

**Mobile base:**
- Padding: `32px 20px` (was `48px 280px`).
- Each entry is split into two parts:
  1. **Title row** — node circle + company name + role + dates, displayed as a flex row. Odd entries are left-aligned (node left, text right). Even entries are right-aligned (node right, text left, `flex-direction: row-reverse`, `text-align: right`).
  2. **Content block** — bullet points rendered as a centred paragraph below the title row (`text-align: center`).
- A `border-bottom` separates each entry.

**`768px+`:**
- Restores current alternating side-by-side layout (`padding: 48px 280px`, `flex-direction: row-reverse` on even entries with `text-align: right` on content, no separate title/content split).

---

### Section Breaks & Footer

No changes. Both are full-width coloured blocks that already render correctly at all sizes.

---

## Breakpoints Summary

| Breakpoint | Query | Purpose |
|---|---|---|
| Mobile base | (none) | Phone — single column layouts, hamburger nav, reduced padding |
| Small tablet | `min-width: 480px` | Minor typographic / spacing tweaks |
| Desktop | `min-width: 768px` | Two-column grids, inline nav, alternating timeline, full padding |

---

## What Is Not In Scope

- Projects page (not yet built)
- CV download link (separate task)
- Extracting Header to its own component (separate task — planned in HANDOFF.md)
- Any visual design changes beyond layout / spacing adjustments

---

## Files Changed

- `src/App.css` — full mobile-first rewrite
- `src/App.jsx` — add `useState` hamburger toggle to header JSX, update timeline entry render to split title row and content block
