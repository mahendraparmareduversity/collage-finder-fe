import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.tsx'
import App from './App.tsx'
import CollegeDetailPage from './pages/CollegeDetailPage.tsx'
import EventDetailPage from './pages/EventDetailPage.tsx'
import TermsPage from './pages/TermsPage.tsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx'
import AboutPage from './pages/AboutPage.tsx'
import StudyAbroadPage from './pages/StudyAbroadPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/college/:slug" element={<CollegeDetailPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/study-abroad" element={<StudyAbroadPage />} />
    </Routes>
  </BrowserRouter>,
)
