const port = 9501;
const Koa = require('koa2')
// 路由
const route = require('koa-route')
// koa封装的websocket这是官网（很简单有时间去看一下https://www.npmjs.com/package/koa-websocket）
const websockify = require('koa-websocket')
const app = websockify(new Koa());
app.ws.use(function (ctx, next) {
    ctx.websocket.send("连接成功");
    return next(ctx)
})
app.ws.use(route.all('/', function (ctx) {
    /**接收消息*/
    ctx.websocket.on('message', function (message) {
        console.log(message);
        // 返回给前端的数据
        let data = JSON.stringify({
            id: Math.ceil(Math.random()*1000),
            time: parseInt(new Date()/1000)
        })
        ctx.websocket.send(data);
    })
}));

app.listen(port, () => {
    console.log("localhost:" + port);
});