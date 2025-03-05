import { useState } from 'react'
import '@/styles/donut/donut.scss'
import { RowData } from '../../types'

function Donut() {
  const [count, setCount] = useState(0)
  const rowData : RowData[] = [
    {
      title: 'donut',
      contents: ['donut', 'donut', 'donut'],
      img: [{imgUrl: 'donut', imgAlt: 'donut'}]
    }
  ]

  return (
    <>
      <div>{   `donut`}
      </div>
    </>
  )
}

export default Donut
