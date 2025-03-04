import { useState } from 'react'
import '@/styles/components/tabs.scss'

function Tabs() {
  const [tabindex, setCount] = useState(0)

  return (
    <>
      <div onClick={() => setCount(0)}>{`Donut`}</div>
      <div onClick={() => setCount(1)}>{`Scenes Ocean`}</div>
      <div onClick={() => setCount(2)}>{`Snails of life`}</div>
    </>
  )
}

export default Tabs
