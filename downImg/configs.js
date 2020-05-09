let mysql = require('mysql');
let http = require('http');

let default_json_text = {
  status: 0, 
  message: '路径错误'
}


// function selectData(type){
  
  
//   // return result;
// }



http.createServer(function(req, res){

  let connection = mysql.createConnection({
    host: '120.77.156.93',
    user: 'wzt',
    password: '147258',
    database: 'test'
  });

  connection.connect();

  let sql_text = `select name from user`;
  let result;
  
  connection.query(sql_text, (err, res, fileds) => {
    let a = JSON.stringify(res);
    result = JSON.parse(a);
    console.log("mysql", result);
  });

  setTimeout(() => {
    console.log("http", result);
    res.writeHead(200, { 'Content-Type': 'application/json'});
    res.write(JSON.stringify(result));
    res.end();
  }, 3000);
}).listen(3000);
