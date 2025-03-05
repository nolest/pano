import { useState } from 'react'
import '@/styles/components/tabs.scss'
import { Link } from 'react-router'

type Props = {
  curIndex: number
}

const Tabs = ({ curIndex } : Props) => {
  const [tabindex, setCount] = useState(curIndex)
  const tabList = [{ id: 0, name: 'donut', link: 'donut' }, { id: 1, name: 'scenes', link: 'scenes' }, { id: 2, name: 'snails of life', link: 'snails' }]
  
  const textStyle = (index: number) => {
    return tabindex === index ? { textTransform: 'capitalize' as const } : { textTransform: 'none' as const }
  }

  return (
    <>
    <div className="tabs">
      {tabList.map((tab) => (
        <Link to={`/${tab.link}`}
        key={tab.id} 
        //style={textStyle(tab.id)} 
        onClick={() => setCount(tab.id)}
        className={ tab.id === tabindex ? 'tab tab__active' : 'tab' }>
          {tab.name}
        </Link>
      ))}
    </div>
    </>
  )
}

export default Tabs
