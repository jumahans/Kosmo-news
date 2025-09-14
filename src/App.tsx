import { Routes, Route, Navigate } from 'react-router-dom'
import NewsPage from './pages/News'
import LoginPage from './pages/Login'
import ReporterPage from './pages/Reporter'
import AdminPage from './pages/Admin'

function App() {
  // Hash fallback → path
  if (location.hash.startsWith('#/')) {
    const path = location.hash.slice(1)
    return <Navigate to={path} replace />
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/news" replace />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reporter" element={<ReporterPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/news" replace />} />
      </Routes>
    </div>
  )
}

export default App
