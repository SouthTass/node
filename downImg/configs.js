let mysql = require('mysql');
let connection = mysql.createConnection({
  host: '120.77.156.93',
  user: 'wzt',
  password: '147258',
  database: 'test'
});
connection.connect();

let sql_text = `select name from user`;
connection.query(sql_text, (err, res, fileds) => {
  let a = JSON.stringify(res);
  let b = JSON.parse(a);
  console.log("查询到的数据", b, res);
});