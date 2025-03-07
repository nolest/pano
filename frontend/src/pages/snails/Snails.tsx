import '@/styles/snails/snails.scss'

function Snails() {
  return (
    <>
      <div className="snails__questions">
        <div className="snails__title">
          这里记录面试官们本可以查百度却不得不为难大家的题目。
        </div>
        <div className="snails__answer">
          <p>每次面试的人一用这种问法，我内心就已经非常不耐烦，也切实感受到面试的人没有用心设计面试题目。</p>
          <p>信息这么发达，动动手指的事，偏要背，个人很反感这种面试方式。</p>
          <p>写程序应该注重设计，特别是前端应该注重代码架构能力。</p>
          <p>我见过最好的面试题是放在git上的一个全英语题目，用前端代码实现一个localStorage的记事本增删改查，转换文件并提供下载上传。</p>
        </div>
        <div className="snails__title">
          问题1：请说明一下cookie和localStorage的区别？
        </div>
        <div className="snails__answer">
          <p>大小：</p>
          <p>cookie：一般不超过4k</p>
          <p>localStorage：5M甚至更多</p>

          <p>数据有效期：</p>
          <p>cookie:一般由服务器生成，可以设置失效时间；若没有设置时间，关闭浏览器cookie失效，如果设置了时间，cookie就会存储在硬盘中，过期失效</p>
          <p>localStorage：永久有效，窗口或者浏览器关闭也会一直保存，除非手动永久删除</p>

          <p>作用域：</p>
          <p>cookie和localStorage：在所有同源窗口中都是共享的</p>

          <p>通信：</p>
          <p>cookie在浏览器和服务器之间来回传递，如果使用cookie保存过多数据会造成性能问题</p>
          <p>localStorage：仅在客户端（浏览器）中保存，不参与服务器的通信</p>

          <p>应用场景：</p>
          <p>cookie：判断用户是否登录过网站，以便实现下次自动登录或记住密码；保存事件信息</p>
          <p>localStorage：用于长期登录，适于长期保存在本地的数据</p>
        </div>

        <div className="snails__title">
          问题2：如何在数组后面插入一个元素？
        </div>
        <div className="snails__answer">
          <p>concat.</p>
          <p>push.</p>
        </div>

        <div className="snails__title">
          问题3：如何在数组前面插入一个元素？
        </div>
        <div className="snails__answer">
          <p>concat.</p>
          <p>splice.</p>
          <p>unshift.</p>
          <p>拓展运算符...</p>
        </div>

        <div className="snails__title">
          问题4：HTTP状态码？（洋洋洒洒十几二十个，要背？）
        </div>
        <div className="snails__answer">
          <p>信息响应(100–199)</p>
          <p>成功响应(200–299)</p>
          <p>重定向(300–399)</p>
          <p>客户端错误(400–499)</p>
          <p>服务器错误(500–599)</p>
        </div>

        <div className="snails__title">
          问题5：登录token是做什么的？
        </div>
        <div className="snails__answer">
          <p>登录校验</p>
          <p>将Token　放入request的Authorization头，服务端进行校验，如果token过期，则告诉前端再请求一个新的token。</p>
          <p>放在localstorage做持久化，如果每次都需要登录，则放在sessionStorage</p>
        </div>
      </div>
    </>
  )
}

export default Snails
