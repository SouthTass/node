// var mysql      = require('mysql');
// var moment     = require('moment');
// let superagent = require('superagent');
// var connection = mysql.createConnection({
//   host     : '106.53.216.244',
//   user     : 'root',
//   password : '',
//   database : 'test'
// });
// connection.connect();

// let count = 0;
// function get(url) {
//   superagent.get(url)
//     .end(function (err, res) {
//       let result = JSON.parse(res.text);
//       console.log(count);
//       if(result.code == 200 && result.newslist && result.newslist.length > 0 && result.newslist[0].content){
//         let  addSql = 'INSERT INTO joke_list(content,create_time) VALUES(?,?)';
//         let  addSqlParams = [ result.newslist[0].content, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
//         connection.query(addSql,addSqlParams,function (err, res) {
//           let timer = setTimeout(() => {
//             if(count == 30){
//               connection.end();
//               return;
//             }
//             count++;
//             get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');
//             clearTimeout(timer);
//           }, 1000);
//         });
//       }
//     });
// }
// get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');

const koa = require("koa");
const app = new koa();
const json = new require("koa-json");
const router = require("koa-router")();

// router.get("/joke", async(ctx) =>{
//   ctx.body = {
//     data: {
//       status: 0,
//       message: "测试数据"
//     }
//   }
// });

router.get("/list", async(ctx) => {
  ctx.body = ctx.request.query;
})

app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);