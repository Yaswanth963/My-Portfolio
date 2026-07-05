# Portfolio — Yaswanth Perumalla

A fast, responsive, single-page developer portfolio built with plain HTML, CSS, and
vanilla JavaScript (no build step). Designed to be deployed on **GitHub Pages**.

## Structure

```
portfolio/
├── index.html        # all content/sections
├── css/style.css     # premium dark theme, animations, responsive layout
├── js/main.js        # scroll reveal, counters, nav, cursor glow
├── .nojekyll         # tells GitHub Pages to serve files as-is
└── README.md
```

## Customize

- **Content**: edit `index.html` (experience, projects, skills).
- **Colors**: change the CSS variables at the top of `css/style.css`
  (`--accent`, `--accent-2`, `--accent-3`, `--grad`).
- **Medium link**: search `data-social="medium"` in `index.html` and set the `href`.
- **LinkedIn / GitHub**: already wired to your profiles; update if needed.

## Run locally

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

### Option A — dedicated repo (recommended, gives a clean URL)

```bash
cd portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Yaswanth963/portfolio.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
branch → Branch: `main` / `root` → Save.**

Your site will be live at: `https://Yaswanth963.github.io/portfolio/`

> Tip: to host at the root `https://Yaswanth963.github.io/`, name the repo
> exactly `Yaswanth963.github.io` and push these files to it.

### Option B — subfolder of an existing repo

If you keep this inside your resume repo, push it and set **Pages → Source** to the
branch, then point the folder to `/portfolio`. The `.nojekyll` file ensures the
`css/` and `js/` folders are served correctly.

## Notes

- No external dependencies except Google Fonts (loaded via CDN).
- Respects `prefers-reduced-motion` for accessibility.
- Fully responsive down to mobile.
