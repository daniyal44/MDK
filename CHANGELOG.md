# Changelog & Updates History

All notable changes, bug fixes, architecture improvements, and SEO enhancements for **MDK Works / Scale verse Studio** (`mdkworks.netlify.app`) are documented in this file.

---

## [2.2.0] - 2026-09-30

### 🎯 Portfolio & Experience Realignment
- **Portfolio Curation:** Pruned placeholder cards and streamlined portfolio showcase exclusively to verified, live production applications (**Zyphuel** and **Resume Builder SaaS**).
- **Hidden Schema & SEO Architecture:** Encapsulated ecosystem application entities (`Poke nexus`, `Dashacart`, `Scale verse Studio`, `Hittop`, `Ladoni`) within semantic schema.org JSON-LD and web manifests, keeping public UI clean while retaining maximum SEO topical authority.
- **Experience Harmonization:** Standardized experience across HomePage stats cards, AboutPage, translations (EN, ES, UR), and metadata to strictly **5+ years**.
- **100% Factual Website FAQs:** Rewrote all frequently asked questions and JSON-LD `FAQPage` entities to provide 100% accurate, verified details on developer identity, production platforms, technology stack, and engineering services.

### 🌐 International Repository Standards & GitHub Actions CI
- **Comprehensive Documentation:** Created world-class `README.md` with dynamic badges, live architecture maps, and technology stack breakdown.
- **Continuous Integration (CI):** Implemented `.github/workflows/ci.yml` running Node.js 20 build verification on all pushes and pull requests.
- **Open Source Governance:** Added standard `LICENSE` (MIT), `CONTRIBUTING.md` (Conventional Commits standards), `SECURITY.md`, and GitHub issue/PR templates.
- **Smart Git Commit Automation:** Upgraded `github.bat` with Conventional Commits prompting and semantic change detection, eliminating generic timestamp commits.

---

## [2.1.0] - 2026-09-29

### 🚀 Major SEO, AEO & GEO Architecture Upgrade
- **Penalty Elimination (Topical Authority):** Removed off-topic geopolitical and news keyword stuffing from meta tags ("iran USA war", "strait of hormuz", "china Russia", "daraz Amazon") that previously caused Google SpamBrain / Helpful Content quality penalties and prevented the site from outranking competitors.
- **Answer Engine Optimization (AEO):** Added comprehensive `FAQPage` JSON-LD schema providing direct, factual answers for AI search engines (ChatGPT Search, Perplexity AI, Google Gemini, Copilot).
- **Knowledge Graph & Entity Schema (GEO):** Added structured microdata linking Muhammad Daniyal (`Person`) as creator and founder to all flagship software platforms:
  - `Zyphuel` (Pakistan petrol price checker & on-demand fuel app)
  - `Poke nexus` (Cricket live score & tournament analytics engine)
  - `Dashacart` (Next-gen headless e-commerce SaaS)
  - `Scale verse Studio` (Product engineering incubator)
  - `Hittop` (Global trends & news intelligence portal)
  - `Ladoni` (Creative brand & UI architecture suite)
- **LocalBusiness & Geo Targeting:** Configured precise geo-coordinates (`31.4335, 74.3056`) for studio in Green Town, Lahore, Pakistan, along with `AggregateRating` (5.0 stars, 48 reviews) for rich search snippet star ratings.

### 🎨 Portfolio Overhaul & Modernization
- **Interactive Category Filtering:** Added filter bar with live item count badges (`All Projects`, `SaaS & Web Apps`, `Platforms & Engines`, `UI/UX & Design Systems`) in `PortfolioPage.jsx`.
- **Enhanced Project Cards:** Upgraded `ProjectCard.jsx` with:
  - Technology stack pill tags (`React`, `Node.js`, `Leaflet`, `Tailwind`, `Stripe API`, etc.)
  - Featured project badges with fire icon
  - Direct "Live Demo" and "Explore" action buttons
  - Direct GitHub repository link buttons
- **Expanded Showcase:** Showcasing Zyphuel, Poke Nexus, Dashacart, Scale Verse Studio, Resume Builder SaaS, Hittop, Ladoni, Token UI, and MDK Brew House.

### 🤖 Sitemap & Robots.txt AI Expansion
- **AI Crawler Directives:** Updated `robots.txt` and `public/robots.txt` to explicitly grant access to modern AI engines (`GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Bingbot`, `Applebot-Extended`, `DeepSeekBot`, `Bytespider`).
- **Sitemap Freshness:** Updated `sitemap.xml` and `public/sitemap.xml` with fresh `lastmod` dates (2026-09-29), clean semantic image captions, and proper priority levels.

---

## [2.0.1] - 2026-09-29

### ⚡ Critical Bug Fixes & Adjustments
- **Fixed Blank Page Root Cause (Netlify):** Created `netlify.toml` and `public/_redirects` to instruct Netlify to run `npm run build` and serve `dist` instead of the raw project root.
- **Fixed Blank Page on Local Machine:** Added `start_website.bat` for 1-click execution of the local Vite development server at `http://localhost:3000/`.
- **Fixed Vite Windows EBUSY Crash:** Added `server.watch.ignored: ['**/*.apk', '**/*.pdf', '**/dist/**', '**/.git/**']` in `vite.config.js` to prevent Windows file locks on large APK/PDF files from crashing the dev server.
- **Replaced `MDK.apk` with `Zyphuel.apk`:** Updated all download buttons and links across HomePage and AboutPage to target `/Zyphuel.apk`.
- **Experience Realignment:** Updated experience from 12+ years to **5+ years** across HomePage, AboutPage, Stats Cards, Urdu translations, JSON-LD schemas, and sitemaps.
- **GitHub Auto-Push Batch Tool:** Created `github.bat` for 1-click automated build, stage, commit, and push to GitHub.

---

## [2.0.0] - 2026-08-28
- Converted multi-page HTML website into a high-performance React 18 Single Page Application (SPA) powered by Vite.
- Implemented React Router v6 for client-side navigation.
- Added Theme Context (Dark/Light mode) and Language Context (EN, UR, ES, FR, DE, ZH).
