import { useState, lazy, Suspense } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Tabs from './components/tabs/tabs.tsx'
import { useSelector } from 'react-redux'
import { RootState } from './store'

// 使用React.lazy懶加載頁面組件
const Donut = lazy(() => import('./pages/donut/Donut.tsx'))
const Scenes = lazy(() => import('./pages/scenes/Scenes.tsx'))
const Snails = lazy(() => import('./pages/snails/Snails.tsx'))
const Visual = lazy(() => import('./pages/visual/Visual.tsx'))
const Archi = lazy(() => import('./pages/archi/Archi.tsx'))
const Cylinder = lazy(() => import('./pages/cylinder/Cylinder.tsx'))
const Leaflet = lazy(() => import('./pages/leaflet/Leaflet.tsx'))

// 加載中顯示的組件
const LoadingFallback = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
  </div>
)

function App() {
  const [tabindex] = useState(5)

  const tabs = useSelector((state: RootState) => state.tabs?.value) || []

  const componentMap = {
    donut: Donut,
    cylinder: Cylinder,
    scenes: Scenes,
    visual: Visual,
    snails: Snails,
    archi: Archi,
    leaflet: Leaflet,
    // giant: Giant,
  }

  return (
    <>
      <BrowserRouter>
        <Tabs curIndex={tabindex} />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Navigate to={`/${tabs[0]?.link || 'donut'}`} replace />} />
            {tabs.map((tab: { id: number; name: string; link: string } | undefined) => {
              if (!tab) return null;
              const Component = componentMap[tab.link as keyof typeof componentMap]
              return Component ? (
                <Route key={tab.id} path={`/${tab.link}`} element={<Component />} />
              ) : null
            })}
            <Route path="*" element={<Navigate to={`/${tabs[0]?.link || 'donut'}`} replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App