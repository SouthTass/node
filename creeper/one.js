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

let url = 'http://api.tianapi.com/txapi/one/index?key=cdd8adeb98c09016521a6c9bcfc2a54b&rand=1';
let count = 0;
let checkTime = 100;
function get(url) {
  superagent.get(url)
  .end(function (err, res) {
    let result = JSON.parse(res.text);
    let lastData = `SELECT id FROM one ORDER BY id desc limit 1`;
    connection.query(lastData, function(errl, resl) {
      if(resl.length > 0){
        count = resl[0].id;
      }else{
        count = 0;
      }   
      let sql = `SELECT one_id FROM one WHERE one_id = "${result.newslist[0].oneid}"`;
      connection.query(sql, function (errq, resq) {
        if(resq && resq.length < 1){
          console.log(`次数: ${count} 唯一`);
          let addSql = 'INSERT INTO one(one_id, title, content, image, author, date, create_time) VALUES(?, ?, ?, ?, ?, ?, ?)';
          let addSqlParams = [
            result.newslist[0].oneid,
            result.newslist[0].wordfrom,
            result.newslist[0].word,
            result.newslist[0].imgurl,
            result.newslist[0].imgauthor,
            result.newslist[0].date, 
            moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
          ];
          connection.query(addSql, addSqlParams, function (errx, resx) {
            let timer = setTimeout(() => {
              if(count == 50000) return connection.end();
              count++;
              get(url);
              clearTimeout(timer);
            }, checkTime);
          });
        }else{
          console.log(`次数: ${count} 重复内容，重新请求。${moment().format('YYYY年MM月DD日 HH点mm分ss秒')}`);
          let timeset = setTimeout(() => {
            get(url);
            clearTimeout(timeset);
          }, checkTime);
        }
      })
    })
  });
}
get(url);