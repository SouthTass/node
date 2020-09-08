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

let count = 0;
function get(url) {
  superagent.get(url)
    .end(function (err, res) {
      let result = JSON.parse(res.text);
      let sql = 'SELECT content FROM joke_list';
      connection.query(sql, function (errq, resq) {
        let index = resq.findIndex((item) => { result.newslist[0].content == item.content });
        console.log(index == -1 ? "不重复" : "重复");
        if(index == -1){
          // if(result.code == 200 && result.newslist && result.newslist.length > 0 && result.newslist[0].content){
            let  addSql = 'INSERT INTO joke_list(content,create_time) VALUES(?,?)';
            let  addSqlParams = [ result.newslist[0].content, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
            connection.query(addSql,addSqlParams,function (errx, resx) {
              console.log("内容：", index == -1 ? result.newslist[0].content : "重复内容");
              let timer = setTimeout(() => {
                if(count == 50000){
                  connection.end();
                  return;
                }
                count++;
                get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');
                clearTimeout(timer);
              }, 500);
            });
          // }
        }else{
          get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');
        }
      })
    });
}
get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');