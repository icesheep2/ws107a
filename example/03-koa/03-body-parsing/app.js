
const Koa = require('koa');
const koaBody = require('koa-body');
const serve = require('koa-static');

const app = module.exports = new Koa();

app.use(serve('.'));

app.use(koaBody({
  jsonLimit: '1kb'
}));

// POST .name to /uppercase
// co-body accepts application/json
// and application/x-www-form-urlencoded

app.use(async function(ctx) {
  if (ctx.url !== '/uppercase') return
  const body = ctx.request.body;
  if (!body.name) ctx.throw(400, '.name required');
  ctx.body = { name: body.name.toUpperCase() };
});

if (!module.parent) app.listen(3000);