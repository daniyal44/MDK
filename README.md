# Muhammad Daniyal (ItxMDK / Zyphuel) — Official Portfolio & Engineering Platform

<p align="center">
  <img src="https://i.postimg.cc/5yBQ2pZR/MDK.png" alt="Muhammad Daniyal Logo" width="140" style="border-radius: 50%; box-shadow: 0 8px 30px rgba(0,217,255,0.3);" />
</p>

<p align="center">
  <strong>Production Portfolio & Commercial SaaS Architecture Showcase</strong><br />
  Crafted by <strong>Muhammad Daniyal</strong> — Senior Full Stack Web Developer & UI/UX Product Designer
</p>

<p align="center">
  <a href="https://mdkworks.netlify.app/"><img src="https://img.shields.io/badge/Live%20Demo-mdkworks.netlify.app-00d9ff?style=for-the-badge&logo=netlify&logoColor=white" alt="Live Demo" /></a>
  <a href="https://github.com/daniyal44/MDK/actions"><img src="https://img.shields.io/badge/CI%2FCD-Passing-22c55e?style=for-the-badge&logo=githubactions&logoColor=white" alt="Build Status" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react&logoColor=black" alt="React 18" /></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.4.2-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 5" /></a>
  <a href="#license"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License MIT" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Experience-5%2B%20Years-blue?style=flat-square" alt="Experience" />
  <img src="https://img.shields.io/badge/Completed%20Projects-230%2B-green?style=flat-square" alt="Projects" />
  <img src="https://img.shields.io/badge/Happy%20Clients-95%2B-purple?style=flat-square" alt="Clients" />
  <img src="https://img.shields.io/badge/Location-Lahore%2C%20Pakistan-red?style=flat-square" alt="Location" />
</p>

---

## 🌟 Executive Summary

This repository contains the source code for the flagship personal portfolio, engineering showcase, and interactive digital hub of **Muhammad Daniyal (known online as ItxMDK and Zyphuel)**. 

Engineered from the ground up as a blazing-fast **React 18 Single Page Application (SPA)** powered by **Vite 5**, the platform showcases production web applications, interactive geolocation routing, trilingual localization, and enterprise-grade SEO/GEO/AEO semantic architectures.

### 🔗 Live Deployments
* **Portfolio Showcase:** [https://mdkworks.netlify.app/](https://mdkworks.netlify.app/)
* **Zyphuel Platform:** [https://zyphuel.netlify.app/](https://zyphuel.netlify.app/) — Pakistan's #1 real-time fuel and petrol price intelligence engine & delivery app.
* **Resume Builder SaaS:** [https://getownresume.netlify.app/](https://getownresume.netlify.app/) — ATS-compliant dynamic resume construction engine.

---

## 🚀 Key Architectural Features

### 1. ⚡ High-Throughput Modern Architecture
* Built with **React 18.3.1** and **Vite 5.4.2** with Hot Module Replacement (HMR).
* Zero-dependency client-side routing via **React Router v6** (`/`, `/about`, `/skills`, `/portfolio`, `/location`, `/contact`).
* Atomic modular component design ensuring sub-second page transitions.

### 2. 🌍 Trilingual Localization & Accessibility (i18n)
* Instant dynamic switching between **English (EN)**, **Spanish (ES)**, and **Urdu (UR)**.
* Native font scaling and RTL-friendly layouts powered by custom React context hooks.

### 3. 🎨 Adaptive Theme Engine & Design System
* Seamless toggle between custom dark-mode glassmorphism and high-contrast light themes.
* GPU-accelerated micro-interactions and scroll-reveal transitions.

### 4. 🗺️ Geolocation & Real-Time OpenStreetMap Integration
* Embedded **Leaflet 1.9.4** interactive map with custom studio pin (`31.4335, 74.3056`).
* 1-click GPS route planning connecting visitors directly to Green Town, Lahore via Google Maps and OpenStreetMap.

### 5. 🤖 Deep Search & AI Knowledge Graph (SEO, AEO, GEO)
* **Generative Engine Optimization (GEO):** Structured microdata tailored for AI search engines (ChatGPT, Claude, Perplexity AI, Google Gemini).
* **Schema.org Knowledge Graph:** Complete JSON-LD entities for `Person`, `Organization`, `LocalBusiness`, `SoftwareApplication`, and verified `FAQPage`.
* 100% accurate, factual FAQ answers with no marketing fluff or keyword spamming.

---

## 💼 Featured Production Applications

| Application | Domain & Purpose | Core Technologies | Live Link |
| :--- | :--- | :--- | :---: |
| **Zyphuel Fuel Platform** | Real-time Pakistan fuel, petrol, diesel & gas rates intelligence engine with on-demand fuel distribution architecture. | React 18, Vite, Leaflet Maps, REST APIs, PWA | [Visit Zyphuel](https://zyphuel.netlify.app/) |
| **Resume Builder SaaS** | Production interactive tool for constructing, designing, and downloading ATS-compliant PDF resumes with customizable templates. | React, PDF Generation, State Machines, Glassmorphism | [Visit Resume Builder](https://getownresume.netlify.app/) |
| **Zyphuel Android App** | Native Android client companion for on-the-go fuel rate tracking and instant delivery dispatch. | Android APK, Offline Cache, Mobile UI | [Download APK](/Zyphuel.apk) |

---

## 🛠️ Complete Technology Stack

```
├── Frontend Core
│   ├── React 18.3.1 (Virtual DOM, Hooks, Context API)
│   ├── Vite 5.4.2 (Next-gen frontend tooling & rollup bundler)
│   ├── React Router DOM 6.26.2 (Client-side SPA routing)
│   └── Vanilla JavaScript (ES6+ / ESNext)
│
├── Styles & UI/UX
│   ├── Responsive CSS3 & Custom Variables Design System
│   ├── Glassmorphism & Micro-Interactions
│   ├── Remix Icon v4.5.0 Vector Iconography
│   └── Google Fonts (Plus Jakarta Sans, Poppins, Space Grotesk)
│
├── Mapping & Geolocation
│   ├── Leaflet Maps API v1.9.4
│   └── OpenStreetMap Tile Layer Engine
│
└── Infrastructure & Tooling
    ├── Netlify (Global Edge CDN hosting & continuous deployment)
    ├── GitHub Actions (CI build pipeline & automated validation)
    └── Schema.org JSON-LD (Semantic web knowledge graphs)
```

---

## 📂 Repository Directory Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI automated build pipeline
├── public/
│   ├── Zyphuel.apk              # Android mobile application package
│   ├── MDK.pdf                  # Official curriculum vitae / resume
│   ├── robots.txt               # AI & search engine crawler directives
│   ├── sitemap.xml              # XML sitemap with alternate hreflang entries
│   ├── site.webmanifest         # Progressive Web App (PWA) manifest
│   └── _redirects               # Netlify SPA redirect rules
├── src/
│   ├── components/              # Modular UI components (Header, Footer, Cards, Map, Autocomplete)
│   ├── context/                 # State providers (LanguageContext, ThemeContext)
│   ├── data/                    # Pure data sources (projectsData, skillsData, translations, amenities)
│   ├── hooks/                   # Custom React hooks (useScrollReveal)
│   ├── pages/                   # Application views (Home, About, Skills, Portfolio, Location, Contact)
│   ├── App.jsx                  # Root layout, routing and providers
│   ├── main.jsx                 # Vite application mount entrypoint
│   └── index.css                # Global stylesheet and design tokens
├── CHANGELOG.md                 # Semantic version history and release logs
├── LICENSE                      # MIT Open Source License
├── netlify.toml                 # Netlify build and redirect configuration
├── package.json                 # Project dependencies and script declarations
├── vite.config.js               # Vite build and dev server configurations
└── README.md                    # Repository documentation
```

---

## 💻 Getting Started Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Git**: Installed and configured on your system

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/daniyal44/MDK.git
   cd MDK
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   * The local server will boot up at `http://localhost:3000/`.

4. **Compile production build:**
   ```bash
   npm run build
   ```
   * Optimized production assets will be generated in `/dist`.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📐 Conventional Commits Standard

This repository adheres strictly to **Conventional Commits** for an immaculate, readable git commit history:

```
<type>(<scope>): <short imperative summary>

[optional detailed body explaining context and rationale]

[optional footer referencing issues or breaks]
```

### Commit Types:
* `feat`: A new user-facing feature or capability.
* `fix`: A bug fix or error resolution.
* `refactor`: Code restructuring without behavioral changes.
* `docs`: Documentation updates (README, CHANGELOG, inline comments).
* `style`: Code style, formatting, or UI design adjustments.
* `perf`: Performance optimizations.
* `chore`: Build scripts, dependencies, or configuration updates.

---

## 👤 Author & Connect

**Muhammad Daniyal (ItxMDK / Zyphuel)**  
*Senior Full Stack Web Developer & UI/UX Product Designer*  
*Lahore, Punjab, Pakistan*

* 🌐 **Portfolio Website:** [mdkworks.netlify.app](https://mdkworks.netlify.app/)
* 💼 **LinkedIn Profile:** [linkedin.com/in/muhammad-daniyal490](https://www.linkedin.com/in/muhammad-daniyal490)
* 🐙 **GitHub Profile:** [github.com/daniyal44](https://github.com/daniyal44)
* 📱 **WhatsApp:** [+92 323 0112464](https://wa.me/923230112464)
* 📧 **Email:** [m.daniyalkhan490@gmail.com](mailto:m.daniyalkhan490@gmail.com)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for complete details.

---

<p align="center">
  <sub>Built with precision and passion by Muhammad Daniyal &copy; 2026. All rights reserved.</sub>
</p>
