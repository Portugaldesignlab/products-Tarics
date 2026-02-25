# ⚖️ TARIC·NET

**EU Product Design Platform** — An interactive infinite canvas for exploring and searching EU TARIC product classification codes, built with React + Vite.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/taric-net)
[![License: MIT](https://img.shields.io/badge/License-MIT-fdbb2d.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.x-61dafb)](https://react.dev)

---

## 🌐 Live Demo

> [taric-net.vercel.app](https://taric-net.vercel.app) *(after you deploy)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Infinite Canvas** | Pan, zoom, and explore a radial network of TARIC codes |
| **Network Visualization** | Color-coded threads: Hub → Section → Category → Product |
| **Live Search** | Search by product name, TARIC code, description, or category |
| **Detail Panel** | Full TARIC code breakdown with chapter/heading/subheading structure |
| **Quick Navigation** | Jump to any of 9 sections via sidebar icons |
| **External Links** | Direct links to EU TARIC Portal and UK Global Tariff |
| **Responsive** | Works on desktop and large tablets |

---

## 📦 Project Structure

```
taric-net/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                  # CI + Vercel auto-deploy
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
│   ├── favicon.svg                 # Custom SVG favicon
│   ├── robots.txt
│   └── _redirects                  # Netlify SPA fallback
├── src/
│   ├── App.jsx                     # Main TARIC·NET application
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles + animations
├── .editorconfig                   # Editor consistency
├── .eslintrc.cjs                   # ESLint configuration
├── .gitignore
├── index.html                      # HTML shell with SEO meta tags
├── package.json
├── vercel.json                     # Vercel deployment config
├── vite.config.js                  # Vite build config
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.0.0
- **npm** ≥ 9.0.0

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/taric-net.git
cd taric-net

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173
```

### Production Build

```bash
npm run build     # Build to ./dist
npm run preview   # Preview build at http://localhost:4173
```

---

## ☁️ Deployment

### Option A — One-Click Vercel Deploy (Recommended)

Click the button above ☝️ or:

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your `taric-net` GitHub repository
4. Vercel auto-detects **Vite** — click **Deploy**
5. Live in ~60 seconds ✅

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option C — Auto-Deploy via GitHub Actions

The included `.github/workflows/ci.yml` automatically builds and deploys on every push to `main`.

**Required GitHub repository secrets:**
| Secret | Where to find it |
|--------|-----------------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Run `vercel link` locally → check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Run `vercel link` locally → check `.vercel/project.json` |

```bash
# To get your IDs:
npx vercel link
cat .vercel/project.json
```

Add secrets at: `GitHub Repo → Settings → Secrets and variables → Actions`

### Option D — Netlify Drop (zero config)

Drag the entire `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

---

## 🗂️ TARIC Sections

| § | Section | Products |
|---|---------|----------|
| I | 🐄 Live Animals & Animal Products | Horses, Beef, Fish |
| II | 🌾 Vegetable Products | Bulbs, Coffee, Wheat |
| VI | ⚗️ Chemical Products | Halogens, Aspirin, Caffeine |
| XI | 👗 Textiles & Clothing | Wool, Overcoats, T-Shirts |
| XV | ⚙️ Base Metals | Iron, Steel Structures, Aluminium |
| XVI | 💻 Machinery & Electronics | Computers, Phones, Cameras, Cables |
| XVII | 🚗 Vehicles & Transport | Cars, Motorcycles, Aircraft |
| XVIII | 🔬 Optical & Precision Instruments | Fibre Optics, Cameras |
| XX | 🪑 Miscellaneous Manufactured Articles | Furniture, Toys, Games |

---

## 🔗 External Resources

- [EU TARIC Consultation Portal](https://ec.europa.eu/taxation_customs/dds2/taric/taric_consultation.jsp)
- [UK Global Trade Tariff](https://www.trade-tariff.service.gov.uk)
- [WCO Harmonized System 2022](https://www.wcoomd.org/en/topics/nomenclature/instrument-and-tools/hs-nomenclature-2022-edition.aspx)
- [EUR-Lex Combined Nomenclature](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2364)

---

## 🛠️ Tech Stack

- **[React 18](https://react.dev)** — UI framework with hooks
- **[Vite 5](https://vitejs.dev)** — Lightning-fast build tool
- **SVG + HTML overlay** — Canvas network rendering
- **CSS-in-JS (inline styles)** — Zero external CSS dependencies
- **Google Fonts** — DM Mono typeface

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add new TARIC section'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT © 2025 TARIC·NET

---

*TARIC·NET is an educational tool for exploring EU trade nomenclature. Always verify TARIC codes with official EU sources for commercial and legal purposes.*
