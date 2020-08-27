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
      console.log(count);
      if(result.code == 200 && result.newslist && result.newslist.length > 0 && result.newslist[0].content){
        let  addSql = 'INSERT INTO joke_list(content,create_time) VALUES(?,?)';
        let  addSqlParams = [ result.newslist[0].content, moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')];
        connection.query(addSql,addSqlParams,function (err, res) {
          let timer = setTimeout(() => {
            if(count == 30){
              connection.end();
              return;
            }
            count++;
            get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');
            clearTimeout(timer);
          }, 1000);
        });
      }
    });
}
get('http://api.tianapi.com/txapi/saylove/index?key=cdd8adeb98c09016521a6c9bcfc2a54b');

