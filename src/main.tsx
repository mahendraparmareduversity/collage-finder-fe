import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import CollegeDetailPage from './pages/CollegeDetailPage.tsx'
import EventDetailPage from './pages/EventDetailPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/college/:slug" element={<CollegeDetailPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
    </Routes>
  </BrowserRouter>,
)
