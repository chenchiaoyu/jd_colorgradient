# Project Instructions & Rules

## Core Deployment Policy
- **GitHub Pages Demo**: Whenever code updates are made and pushed to GitHub, the project must always support automated web deployment (Demo) via GitHub Actions and GitHub Pages.
- **Required Configuration**:
  - `vite.config.ts` must include `base: './'` to support relative asset paths on GitHub Pages subpaths.
  - `.github/workflows/main.yml` must be properly configured with Node.js setup and `peaceiris/actions-gh-pages` to publish the `./dist` folder.
  - `package-lock.json` must always be present and tracked in git to satisfy npm dependency caching on GitHub Actions runners.
