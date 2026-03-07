# 🎓 College Eduversity — India's College Discovery Platform

> Find your dream college in India. Built with **Next.js 14 (App Router) + React + TypeScript + Tailwind CSS**

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
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
app/                  # Next.js App Router
├── layout.tsx        # Root layout (Navbar, Footer)
├── page.tsx          # Home page
├── globals.css
├── colleges/         # /colleges list (SSR, filters, pagination)
├── college/[slug]/   # College detail (SSR)
├── events/[id]/      # Event detail
├── terms/ privacy/ about/ study-abroad/
src/
├── app/              # (legacy; main app is in /app)
├── components/       # Shared components
├── views/            # Page-level views (Terms, About, etc.)
├── hooks/ api/ data/ types/ utils/
└── lib/              # Server API helpers (api-server.ts)
```

---

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/collegewale.git
cd collegewale

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

---

## 🚀 Deploy on Vercel

1. **Push your code** to GitHub, GitLab, or Bitbucket.
2. **Import the project** at [vercel.com/new](https://vercel.com/new). Vercel will detect Next.js automatically.
3. **Environment variable (optional):** If you use a backend API for colleges/events, add:
   - **Name:** `NEXT_PUBLIC_API_BASE_URL`
   - **Value:** your API URL (e.g. `https://api.yourbackend.com`)
4. Click **Deploy**. Vercel will run `npm run build` and deploy.

No `vercel.json` is required; the default Next.js build is used.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| [Next.js 14](https://nextjs.org/) | React framework, SSR, App Router |
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
