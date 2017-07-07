//서버 데이터를 구조적으로 사용하기 위한 API 디자인을 REST API라고 한다

//GET은 "조회하다"
//POST는 "생성하다"
//PUT은 "갱신하다"
//DELETE는 "삭제하다"

var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mysql');

var config = sql.createConnection({
    server : 'localhost',
    database : 'node_mysql',
    user : 'root',
    password : '1'
});

var app = express();
app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());//request body객체 안의 데이터를 json형식으로 인코딩

config.connect((err) => {  
if(!err) {  
    console.log("Database is connected ... \n\n");    
} 
else {  
    console.log("Error connecting database ... \n\n");    
}  
});

app.get("/",function(request,response){  
config.query('use node_mysql');
config.query('SELECT * from data', function(err, rows, fields) {  
config.end();  
  if (!err){  
    response.send(rows);   
    console.log('The solution is: ', rows);  
  }  
  else  
    console.log('Error while performing Query.');  
  });  
});  


app.listen(3000, () => {//서버가 클라이언트 요청 대기상태
    console.log('REST api listening on port 3000!');//listen이 완료되면 실행되는 콜백함수

    /*require('./model').sequelize.sync({force: true}).then(() => {
        //model(sequelize객체)를 가져와서 sync함수를 실행
        //force(boolean data)를 true로 주어 실행이되면 무조건 테이블을 생성하도록 함
        console.log('Database Sync!!');
    });*/
});