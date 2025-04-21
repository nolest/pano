import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import '@/styles/components/tabs.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
type Props = {
  curIndex: number
}

const Tabs = ({ curIndex }: Props) => {
  const location = useLocation();
  const [tabindex, setCount] = useState(curIndex);

  const tabList = useSelector((state: RootState) => state.tabs?.value) || [];

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    const currentTab = tabList.find((tab) => tab?.link === currentPath);
    if (currentTab) {
      setCount(currentTab.id);
    }
    else {
      setCount(0);
    }
  }, [location.pathname, tabList]);


  return (
    <>
      <div className="tabs">
        {tabList.map((tab) => (
          <Link to={`/${tab?.link}`}
            key={tab?.id} 
            onClick={() => setCount(tab?.id || 0)}
            className={tab?.id === tabindex ? 'tab tab__active' : 'tab'}>
            {tab?.name}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Tabs