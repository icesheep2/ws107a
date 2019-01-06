const V = require('./view')
const M = require('./model')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const mysql = require('koa-mysql')

const Koa = require('koa')
const app = (module.exports = new Koa())

app.use(logger())
app.use(koaBody())

router
  .get('/', list)
  .get('/login', login)
  .get('/post/new', add)
  .get('/post/:id', show)
  .get('/edit/:id', edit)
  .get('/delete/:id', remove)
  .post('/post', create)
  .post('/modify/:id', modify)
  .post('/check/:id', check)

app.use(router.routes())

async function list (ctx) {
  const posts = M.list()
  ctx.body = await V.list(posts)
}

async function add (ctx) {
  ctx.body = await V.new()
}
async function login (ctx) {
  ctx.body = await V.log()
}
async function check (ctx) {
  const usercheck = ctx.request.body
  M.check(usercheck)
  if(flag == 1) {
    ctx.redirect('/list')
  }
  else 
    ctx.redirect('/')
}

async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}
async function remove (ctx) {
  const id = ctx.params.id
  const post = M.remove(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.redirect('/')
}

async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/')
}
async function edit (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.edit(post)
}
async function modify (ctx) {
  const post = ctx.request.body
  post.id = ctx.params.id
  M.modify(post)
  ctx.redirect('/')
}

if (!module.parent) {
  app.listen(3000)
  console.log('Server run at http://localhost:3000')
}