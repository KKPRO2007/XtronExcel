import { HashRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from './pages/Loading'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import ExcelSheet from './pages/ExcelSheet'
import Settings from './pages/Settings'
import FileManager from './pages/FileManager'
import Documents from './pages/Documents'

export default function App() {
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    }
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/excel" element={<ExcelSheet />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </HashRouter>
  )
}
