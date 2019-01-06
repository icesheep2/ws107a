var V = module.exports = {}

V.layout = function (title, content, loguserin) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
      body {
        padding: 30px;
        font: 16px Helvetica, Arial;
      }
      #login{
        height: 22.4px;
        font-weight: bolder;
        text-align: center;
      }
      #bord{
        float:right;
      }
      h1 {
        font-size: 2em;
      }
  
      h2 {
        font-size: 1.2em;
      }
      #gg{
        background-color: white;
      }
  
      #posts{
        margin: 0;
        padding: 0;
      }
      #ss{
        height: 45px;
        background-color: white;
      }
      #dd{
        background-color: rgba(0, 0, 0, 0.0);
      }
  
      #posts li {
        margin: 40px 0;
        padding: 0;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        list-style: none;
      }
  
      #posts li:last-child {
        border-bottom: none;
      }
  
      textarea {
        width: 500px;
        height: 300px;
      }
  
      input[type=text],
      textarea {
        border: 1px solid #eee;
        border-top-color: #ddd;
        border-left-color: #ddd;
        border-radius: 2px;
        padding: 15px;
        font-size: .8em;
      }
  
      input[type=text] {
        width: 500px;
      }
    </style>
  </head>
  <body>
    <div id="login" data-role="header" data-position="fixed" data-fullscreen="true">
      <p>test at fail
      ${loguserin}
      </p>
    </div>
    <div>
      <section id="content">
        ${content}
      </section>
    </div>
  <div data-role="footer" data-position="fixed" data-fullscreen="true"></div>
  </body>
  </html>
  `
}

V.list = function (posts) {
  let list = []
  let count = 0
  for (let post of posts) {
    if(post == null)continue
    list.push(`
    <li id="ss">
      <h2>${post.title}</h2>
      <p><input type="button" value="讀取貼文" onclick="location.href='/post/${post.id}'">
      <input type="button" value="編輯" onclick="location.href='/edit/${post.id}'">
      <input type="button" value="刪除" onclick="location.href='/delete/${post.id}'"></p>
    </li>
    `)
    count ++
  }
  let content = `
  <h1>貼文列表</h1>
  <p id="dd">您總共有 <strong>${count}</strong> 則貼文!</p>
  <p><input type="button" value="創建新貼文" onclick="location.href='/post/new'"></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  ` 
let loguserin =`
<input type="button" id="bord" value="登入" onclick="location.href='/login'">
`
return V.layout('貼文列表', content,loguserin)

}

V.new = function () {
  return V.layout('新增貼文', `
  <h1>新增貼文</h1>
  <p id="dd">創建一則新貼文</p>
  <form action="/post" method="post">
    <p><input type="text" placeholder="Title" name="title"></p>
    <p><textarea placeholder="Contents" name="body"></textarea></p>
    <p><input type="submit" value="Create"></p>
  </form>
  `)
}

V.show = function (post) {
  return V.layout(post.title, `
    <h1 id="gg">${post.title}</h1>
    <p id="gg">${post.body}</p>
    <input type="button" value="返回" onclick="location.href='/'">
  </form>
  `)
}

V.edit = function (post) {
  return V.layout(post.title, `
  <form action="/modify/${post.id}" method="post">
    <p><input type="text" name="title" value=${post.title}></p>
    <p><textarea placeholder="Contents" name="body">${post.body}</textarea></p>
    <p><input type="submit" value="編輯"></p>
  </form>
  `)
}
V.log = function () {
  let loguserin =`
<input type="button" id="bord" value="登入" onclick="location.href='/login'">
`
  return V.layout('登入帳密', `
  <h1>輸入帳密</h1>
  <p></p>
  <form action="/check" method="post">
    <p>帳號<input type="text" placeholder="帳號" name="account"></p>
    <p>密碼<input type="text" placeholder="密碼" name="password"></p>
    <p><input type="submit" value="登入"></p>
  </form>
  `,loguserin)
}