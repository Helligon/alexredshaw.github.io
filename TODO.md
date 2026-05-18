# TODO

## Features
- Projects page — create stub route (`/projects`) using react-router-dom (plan already written)
- Extract `<Header>` to its own component (`src/components/Header.jsx`) before building more pages
- Add CV download link — PDF is already at `public/alex-redshaw-cv.pdf`, just needs a link in the header or hero
- Build out Projects page content — cards/grid of actual projects

## Refactoring
- Restructure `src/` folder layout — separate styling, logic, and components:
  - `src/styles/` — all CSS files (currently mixed into component folders and root)
  - `src/components/` — reusable UI components only (Header, ProjectCard, etc.)
  - `src/pages/` — page-level components (App/HomePage, ProjectsPage)
  - `src/data/` — data files (projects.js, timeline entries, tag colours)
  - `src/hooks/` — any custom hooks extracted from components
  - `src/assets/` — images and static files only

## Bugs / Tweaks
- Review timeline layout on desktop after mobile restructure — node+meta now grouped left, bullets right (slight change from original)
- 480px breakpoint is currently empty — add spacing/typography tweaks if anything looks off between phone and iPad
- Test hamburger overlay on real iOS/Android devices (clip-path animation, scroll lock)
- Check sticky header height offset (`calc(100vh - 150px)`) still looks right on all screen sizes
- Tweak animations to make them even longer
- Fix the scroll nav buttons for the Skills section - it takes you too far down. Needs to take you to just above "TECH STACK"
- Fix hero section styling on ipad sized screens - the centre line is too far right
