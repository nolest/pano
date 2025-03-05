import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router"
import Donut from './pages/donut/Donut.tsx'
import Scenes from './pages/scenes/Scenes.tsx'
import Snails from './pages/snails/Snails.tsx'
import Tabs from './components/tabs/tabs.tsx'


function App() {
  const [tabindex, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Tabs curIndex={tabindex} />
        <Routes>
          <Route path="/" element={<Donut />} />
          <Route path="/donut" element={<Donut />} />
          <Route path="/scenes" element={<Scenes />} />
          <Route path="/snails" element={<Snails />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
