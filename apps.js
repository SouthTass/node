const koa = require("koa");
const app = new koa();
const json = new require("koa-json");
const router = require("koa-router")();

router.get("/list", async(ctx) => {
  ctx.body = ctx.request.query;
})

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);