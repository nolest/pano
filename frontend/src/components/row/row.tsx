import '@/styles/components/tabs.scss'

type ImgInfo = {
  imgUrl: String
  imgAlt: String
}

type RowData = {
  title: string
  contents: String[]
  img: ImgInfo[]
};


const Row = ({ ...rowData } : RowData) => {

  return (
    <>
    <div className="tabs">
    {rowData.title}
    </div>
    </>
  )
}

export default Row
