import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import Donut from './pages/donut/Donut.tsx'
import Scenes from './pages/scenes/Scenes.tsx'
import Snails from './pages/snails/Snails.tsx'
import Tabs from './components/tabs/tabs.tsx'
import Giant from './pages/giant/Giant.tsx'
import Visual from './pages/visual/Visual.tsx'
import Archi from './pages/archi/Archi.tsx'
function App() {
  const [tabindex] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Tabs curIndex={tabindex} />
        <Routes>
          <Route path="/" element={<Donut />} />
          <Route path="/donut" element={<Donut />} />
          <Route path="/visual" element={<Visual />} />
          <Route path="/scenes" element={<Scenes />} />
          <Route path="/snails" element={<Snails />} />
          <Route path="/giant" element={<Giant />} />
          <Route path="/archi" element={<Archi />} />
          <Route path="*" element={<Navigate to="/donut" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
