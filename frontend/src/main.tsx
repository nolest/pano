import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { BrowserRouter, Routes, Route } from "react-router"

import Snails from './pages/snails/Snails.tsx'
import Donut from './pages/donut/Donut.tsx'
import Tabs from './components/tabs/tabs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Tabs />
      <Routes>
        <Route path="/" element={<Donut />} />
      </Routes>
      <Routes>
        <Route path="/donut" element={<Donut />} />
      </Routes>
      <Routes>
        <Route path="/snails" element={<Snails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
