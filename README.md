# 🎓 College Eduversity — India's College Discovery Platform

> Find your dream college in India. Built with **Vite + React + TypeScript + Tailwind CSS**

![CollegeWale](https://img.shields.io/badge/Built%20with-Vite%20%2B%20React%20%2B%20TypeScript-blue)
![Tailwind CSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38B2AC)

---

## 🚀 Features

- 🔍 **Smart Search** — Search colleges by name, city, course
- 🎓 **5,000+ Colleges** — Across 28 states and UTs
- 📊 **Course-wise Filtering** — Engineering, MBA, Medical, Law, Design & more
- 🗺️ **State Filters** — Madhya Pradesh, Maharashtra, Delhi, Karnataka, etc.
- 📅 **Entrance Exams** — JEE, CAT, NEET, CLAT, CUET, GATE
- 📞 **Free Counselling** — Expert career guidance CTA
- 📱 **Fully Responsive** — Mobile-first design

---

## 🏗️ Project Structure

```
src/
├── types/           # TypeScript interfaces & types
│   └── index.ts
├── data/            # Static data (colleges, courses, exams)
│   ├── colleges.ts
│   ├── courses.ts
│   ├── exams.ts
│   └── index.ts
├── hooks/           # Custom React hooks
│   ├── useFilter.ts
│   ├── useToast.ts
│   └── useScrollAnimation.ts
├── utils/
│   └── cn.ts        # Class name utility
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/          # Reusable UI atoms
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── SectionHeader.tsx
│   │   └── ToastContainer.tsx
│   ├── cards/       # Card components
│   │   ├── CollegeCard.tsx
│   │   ├── CourseCard.tsx
│   │   └── ExamCard.tsx
│   └── sections/    # Page sections
│       ├── HeroSection.tsx
│       ├── SearchSection.tsx
│       ├── CoursesSection.tsx
│       ├── CollegesSection.tsx
│       ├── WhySection.tsx
│       ├── ExamsSection.tsx
│       └── CTASection.tsx
├── App.tsx
├── main.tsx
└── index.css
```

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/collegewale.git
cd collegewale

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Lucide React](https://lucide.dev/) | Icon library |

---

## 🎨 Design

- **Colors**: Saffron `#FF6B00`, Navy `#0A1628`, Gold `#FFB800`  
- **Fonts**: Syne (headings) + DM Sans (body)
- **Audience**: Indian students, parents, and education professionals

---

## 📄 License

MIT © College Eduversity 2025
