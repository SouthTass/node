var mysql      = require('mysql');
var moment     = require('moment');
let superagent = require('superagent');
var connection = mysql.createConnection({
  host     : '106.53.216.244',
  user     : 'root',
  password : '',
  database : 'test'
});
connection.connect();

let url = 'http://api.tianapi.com/txapi/dialogue/index?key=cdd8adeb98c09016521a6c9bcfc2a54b';
let count = 0;
function get(url) {
  superagent.get(url)
    .end(function (err, res) {
      let result = JSON.parse(res.text);
      let sql = `SELECT dialogue FROM dialogue WHERE dialogue = "${result.newslist[0].dialogue}"`;
      connection.query(sql, function (errq, resq) {
        if(resq && resq.length < 1){
          console.log("唯一", moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
          let addSql = 'INSERT INTO dialogue(type, source, dialogue, english, create_time) VALUES(?,?,?,?,?)';
          let addSqlParams = [
            result.newslist[0].type,
            result.newslist[0].source,
            result.newslist[0].dialogue,
            result.newslist[0].english, 
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
          ];
          connection.query(addSql,addSqlParams,function (errx, resx) {
            let timer = setTimeout(() => {
              if(count == 50000){
                connection.end();
                return;
              }
              count++;
              get(url);
              clearTimeout(timer);
            }, 200);
          });
        }else{
          console.log("重复", moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
          let timeset = setTimeout(() => {
            get(url);
            clearTimeout(timeset);
          }, 200);
        }
      })
    });
}
get(url);