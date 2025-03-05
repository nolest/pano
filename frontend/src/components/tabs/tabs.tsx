import { useState } from 'react'
import '@/styles/components/tabs.scss'

type Props = {
  curIndex: number
}

const Tabs = ({ curIndex } : Props) => {
  const [tabindex, setCount] = useState(curIndex)
  const tabList = [{ id: 0, name: 'donut' }, { id: 1, name: 'scenes' }, { id: 2, name: 'snails of life' }]
  
  const textStyle = (index: number) => {
    return tabindex === index ? { textTransform: 'capitalize' as const } : { textTransform: 'none' as const }
  }

  return (
    <>
    <div className="tabs">
      {tabList.map((tab) => (
        <div 
        key={tab.id} 
        style={textStyle(tab.id)} 
        onClick={() => setCount(tab.id)}
        className={ tab.id === tabindex ? 'tab tab__active' : 'tab' }>
          {tab.name}
        </div>
      ))}
    </div>
    </>
  )
}

export default Tabs
