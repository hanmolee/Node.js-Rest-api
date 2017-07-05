//서버 데이터를 구조적으로 사용하기 위한 API 디자인을 REST API라고 한다

//GET은 "조회하다"
//POST는 "생성하다"
//PUT은 "갱신하다"
//DELETE는 "삭제하다"

var express = require('express');
var sql = require('mysql');

var app = express();

var config = {
    server : 'localhost',
    database : 'node_mysql',
    user : 'root',
    password : '1',
    port : 3000
};

config.connect((err) => {  
if(!err) {  
    console.log("Database is connected ... \n\n");    
    return res.status(200).json({error: 'DB Connected!!'});
} 
else {  
    console.log("Error connecting database ... \n\n");    
    return res.status(400).json({error: 'DB NOT Connect!! ERROR!!!'});
}  
});


app.get('/users', (req, res) => {

    return res.json(users);

})


app.listen(3000, () => {//서버가 클라이언트 요청 대기상태
  console.log('REST api listening on port 3000!');//listen이 완료되면 실행되는 콜백함수
});