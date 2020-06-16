const koa = require('koa')
const app = new koa;

app.use(async (ctx, next) => {
  ctx.response.body = {
    url: ctx.request.url,
    query: ctx.request.query,
    querystring: ctx.request.querystring
  }
})

app.listen(3000)