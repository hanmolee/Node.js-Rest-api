//서버 데이터를 구조적으로 사용하기 위한 API 디자인을 REST API라고 한다

//GET은 "조회하다"
//POST는 "생성하다"
//PUT은 "갱신하다"
//DELETE는 "삭제하다"

var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mysql');
var Serialport = require('serialport');
require('date-utils');//date format을 위한 모듈 사용

var port = new Serialport('/dev/ttyACM0',{
    baudrate: 9600,
    parser: Serialport.parsers.readline('\n')
});

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

var Queue = function() {
  this.list = [];
  this.first = null;
  this.size = 0;
};



var Node = function(data) {
  this.data = data;
  this.next = null;
};


Queue.prototype.enqueue = function(data) {
  var node = new Node(data);

  this.list.push(data);
  
  if (!this.first){
    this.first = node;
  } else {
    n = this.first;
    while (n.next) {
      n = n.next;
    }Error
    n.next = node;
  }

  this.size += 1;
  return node;
};

Queue.prototype.dequeue = function(){
    //shift는 Array의 내장함수이다. 
    //배열내의 맨 앞 요소를 반환하고 배열내에서 삭제한다.
    var queuvalue = this.first.data;
        this.first = this.first.next;
        return queuvalue;
}

Queue.prototype.print = function() {
  var retStr="";
    for(var i=0; i<this.list.length; i++)
    {
        retStr=retStr + this.list[i] + "\n";
    }
    console.log('queue!!!!!!!! : ' + retStr);
    
    return retStr;
}


var queue = new Queue();//port.on안에 객체를 생성하면 지역변수이기 때문에 데이터값이 계속 초기화되었다
                        //그래서 전역변수로 생성해 큐에 계속 쌓이도록 하였다.


port.on('open', () => {
    console.log('Serial Port open!!');
        
    port.on('data', (data, time) => {
        time = new Date();
        var datetime = time.toFormat('YYYY-MM-DD HH24:MI:SS');//table 컬럼에 맞는 값으로 변환

        console.log('data : ' + data + 'time : ' + datetime);
        
        
        queue.enqueue(data);
                
        queue.print();

        if(data == 0){
            insert();
        }

       
        //insert(data, datetime);//insert
                        
    });
});



config.connect((err) => {  
if(!err) {  
    console.log("Database is connected ... \n\n");    
} 
else {  
    console.log("Error connecting database ... \n\n");    
}  
});


function insert() {
app.get("/hanmo", (req, res) => {

    //console.log('데이터 인서트!!!!! : '+data+ ' : ' +time);
        
        for (var i = 0; i < queue.list.length; i++) {
             var data1 = queue.list[i];
             
             var time = "'2017-07-07 11:55:21'";
             console.log('data1 : ' + data1+ '\n' +'time : '+ time);
             config.query('call insertdata('+data1+','+time+');', (err, rows) => {
                
                 
            //현재 한번의 페이지에 한번의 insert가 이루어진다
            //내가 원하는 것은 데이터가 들어올경우에 항상 insert를 원한다...
        //config.end();
          
        if (!err){  
            console.log('complete!!!', rows);  
        }  
        else  
            console.log('Error while performing Query.');  
        });
    }

//        config.query('use node_mysql');
  
});
}



app.get("/",(request,response) =>{  
    config.query('use node_mysql');
    config.query('call selectdata;', (err, rows, fields) => {  
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