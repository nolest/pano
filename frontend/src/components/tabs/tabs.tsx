import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import '@/styles/components/tabs.scss'

type Props = {
  curIndex: number
}

const Tabs = ({ curIndex }: Props) => {
  const location = useLocation();
  const [tabindex, setCount] = useState(curIndex);

  const tabList = [
    { id: 0, name: 'donut', link: 'donut' }, 
    { id: 1, name: 'visual', link: 'visual' },
    { id: 2, name: 'scenes', link: 'scenes' }, 
    { id: 3, name: 'snails', link: 'snails' },
    { id: 4, name: 'archi', link: 'archi' },
    //{ id: 5, name: 'giant', link: 'giant' },
  ];

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
    const currentTab = tabList.find(tab => tab.link === currentPath);
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
          <Link to={`/${tab.link}`}
            key={tab.id} 
            onClick={() => setCount(tab.id)}
            className={tab.id === tabindex ? 'tab tab__active' : 'tab'}>
            {tab.name}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Tabs
