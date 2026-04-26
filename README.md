<div align="center">

<img src="public/icons/icon-192.png" alt="GradeFlow Logo" width="80" height="80" />

# GradeFlow

### CGPA Calculator — Fast, Beautiful, Offline-Ready

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-6C63FF?style=flat-square)](LICENSE)

**A mobile-first, no-login CGPA calculator with three powerful tools in one place.**  
Built for university students — predict your CGPA before results are even announced.

[Live Demo](#) · [Report a Bug](#) · [Request a Feature](#)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📅 **Semester Result** | Predict your new CGPA after this semester's grades |
| ❌ **Course Drop** | See the impact of dropping a completed course |
| 🔄 **Grade Replace** | Calculate CGPA improvement from retaking a course |
| 🌙 **Dark / Light Mode** | Saves your preference across sessions |
| 💾 **Auto-Save** | Last inputs are remembered via `localStorage` |
| 📋 **Copy Result** | One-tap copy of your calculated CGPA to clipboard |
| 📱 **PWA Support** | Installable on mobile — works offline |
| ⚡ **Live Calculation** | Results update instantly as you select grades |

---

## 🧮 The Math

All calculations follow the standard **4.0 GPA scale**.

### After Semester
```
New CGPA = (Old CGPA × Old Credits) + Σ(Course Credit × Course GPA)
           ────────────────────────────────────────────────────────────
                        Old Credits + New Semester Total Credits
```

### After Course Drop
```
New CGPA = (Current CGPA × Current Credits) − (Dropped Credit × Dropped GPA)
           ────────────────────────────────────────────────────────────────────
                             Current Credits − Dropped Credit
```

### After Grade Replace (Repeat)
```
New CGPA = (Current CGPA × Current Credits) − (Old GPA × Credit) + (New GPA × Credit)
           ─────────────────────────────────────────────────────────────────────────────
                                         Current Credits
```
> **Note:** Credits do **not** increase after a repeat — only the grade changes.

---

## 🖥️ Tech Stack

```
gradeflow/
├── Next.js 14        — App Router, SSG
├── TypeScript 5      — Full type safety
├── Tailwind CSS 3    — Utility-first styling, dark mode
├── Framer Motion 11  — Animations & transitions
├── Lucide React      — Icon library
└── canvas-confetti   — Celebration effects
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/gradeflow.git
cd gradeflow

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
gradeflow/
├── app/
│   ├── globals.css          # Global styles & Tailwind directives
│   ├── layout.tsx           # Root layout, fonts, PWA meta
│   └── page.tsx             # Main SPA entry point
│
├── components/
│   ├── Header.tsx           # Top navigation bar
│   ├── BottomTabBar.tsx     # Mobile bottom navigation
│   ├── DesktopTabBar.tsx    # Desktop horizontal tab bar
│   ├── ThemeProvider.tsx    # Dark/light mode context
│   │
│   ├── calculators/
│   │   ├── SemesterCalculator.tsx
│   │   ├── DropCalculator.tsx
│   │   └── RepeatCalculator.tsx
│   │
│   └── shared/
│       ├── NumberInput.tsx  # Styled numeric input
│       ├── PillSelector.tsx # Grade & credit pill buttons
│       ├── CourseCard.tsx   # Per-course input card
│       └── ResultCard.tsx   # Animated result display
│
├── lib/
│   ├── calculations.ts      # All CGPA formulas
│   └── constants.ts         # Grade scale & credit options
│
└── public/
    ├── manifest.json        # PWA manifest
    └── icons/               # App icons
```

---

## 🎨 Design System

| Token | Dark Mode | Light Mode | Usage |
|---|---|---|---|
| Background | `#0F0F1A` | `#F8FAFC` | Page background |
| Card | `#1A1A2E` | `#FFFFFF` | Content cards |
| Accent | `#6C63FF` | `#6C63FF` | Primary action color |
| Success | `#4ADE80` | `#4ADE80` | CGPA improvement |
| Danger | `#F87171` | `#F87171` | CGPA decrease |
| Text | `#E2E8F0` | `#1E293B` | Primary text |
| Muted | `#94A3B8` | `#64748B` | Secondary text |

**Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

---

## 📱 Grade Scale Reference

| Letter | GPA | Letter | GPA |
|--------|-----|--------|-----|
| A | 4.0 | C+ | 2.3 |
| A- | 3.7 | C | 2.0 |
| B+ | 3.3 | C- | 1.7 |
| B | 3.0 | D+ | 1.3 |
| B- | 2.7 | D | 1.0 |
| — | — | D- | 0.7 |
| — | — | F | 0.0 |

---

## 📜 License

Distributed under the **MIT License**.  
See [`LICENSE`](LICENSE) for more information.

---

<div align="center">

Made with ❤️ for university students

</div>
