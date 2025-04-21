import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Donut from './pages/donut/Donut.tsx'
import Scenes from './pages/scenes/Scenes.tsx'
import Snails from './pages/snails/Snails.tsx'
import Tabs from './components/tabs/tabs.tsx'
import Visual from './pages/visual/Visual.tsx'
import Archi from './pages/archi/Archi.tsx'
import Cylinder from './pages/cylinder/Cylinder.tsx'
import { useSelector } from 'react-redux'
import { RootState } from './store'
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
    // giant: Giant,
  }

  return (
    <>
      <BrowserRouter>
        <Tabs curIndex={tabindex} />
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
      </BrowserRouter>
    </>
  )
}

export default App