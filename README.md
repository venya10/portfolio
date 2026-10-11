# Venya Chowdhery — Portfolio

Personal portfolio site built with React + Vite. Live at **https://venya10.github.io/portfolio/**.

## Editing content

All text (bio, experience, projects, skills, education) lives in [`src/data.js`](src/data.js). Edit it, commit, and push — the site redeploys automatically.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/portfolio/
npm run build    # production build into dist/
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
One-time setup: in the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
