const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const router = require('koa-router')();

router.post('/sign', async(ctx, next) => {
  ctx.response.type = "application/json";
  ctx.response.body = {
    name: ctx.request.body.name,
    pwd: ctx.request.body.pwd
  }
});

// app.use(async(ctx, next) => {
//   console.log(`当前请求的地址是：${ctx.request.url}`);
//   await next();
// });

// router.get('/', async(ctx, next) => {
//   ctx.response.type = 'text/html';
//   ctx.response.body = '<h1>首页</h1>';
// });

// router.get('/test/:id', async(ctx, next) => {
//   ctx.response.type = 'text/html';
//   ctx.response.body = `<h2>测试页面，id为：${ctx.params.id}</h2>`;
// });

app.use(router.routes());
app.listen(3000);