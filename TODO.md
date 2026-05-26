# TODO

## Features
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
- Tweak animations to make them x2 duration
- change the nav buttons in the bio. Add a new one to navigate to projects
- remove unnecessary files/images from the app
