import { useState } from 'react'
import '@/styles/scenes/scenes.scss'

function Scenes() {
  return (
    <>
      <div className="scenes__title ds-flex flex-center flex-column align-center">
        <p>UE5轻度制片</p>
        <p>用镜头语言来叙述场景</p>
        <p>用色彩来描述情感</p>
        <p>用构图来表达重点</p>
        <p>...</p>
      </div>
      <div className="">
        <iframe id="oceanID" src="//player.bilibili.com/player.html?aid=623341226&bvid=BV11t4y1Z7L3&cid=1393213234&p=1" scrolling="no"
          border="0" frameBorder="no" framespacing="0" allowFullScreen width="100%" height="500"> </iframe>
      </div>
    </>
  )
}

export default Scenes
