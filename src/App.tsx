import { useLocation } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { LightboxProvider, Rail, Spine, Topbar } from './ui'
import Overview from './pages/Overview'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Inheritors from './pages/Inheritors'
import Assets from './pages/Assets'
import Api from './pages/Api'
import Capture from './pages/Capture'
import Public from './pages/Public'

function activeKey(path: string) {
  if (path.startsWith('/projects') || path.startsWith('/project')) return 'projects'
  if (path.startsWith('/inheritors')) return 'inheritors'
  if (path.startsWith('/capture')) return 'capture'
  if (path.startsWith('/assets')) return 'assets'
  if (path.startsWith('/submit')) return 'submit'
  if (path.startsWith('/public')) return 'public'
  return 'overview'
}

export default function App() {
  const { pathname } = useLocation()
  const k = activeKey(pathname)
  return (
    <LightboxProvider>
      <div className="app">
        <Rail active={k} />
        <main>
          <Topbar />
          <Spine />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/project/:code" element={<Project />} />
            <Route path="/inheritors" element={<Inheritors />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/api" element={<Api />} />
            <Route path="/capture" element={<Capture />} />
            <Route path="/public" element={<Public />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </LightboxProvider>
  )
}
