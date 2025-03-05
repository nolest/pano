import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from "react-router"
import Snails from './pages/snails/Snails.tsx'
import Donut from './pages/donut/Donut.tsx'
import Tabs from './components/tabs/tabs.tsx'

function App() {
  const [tabindex, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Tabs curIndex={ tabindex}/>
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
    </>
  )
}

export default App
