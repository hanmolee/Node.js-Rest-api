module.exports = {
    sequelize: sequelize,
    User: User
}

var Sequelize = require('sequelize');
var sequelize = new Sequelize('hanmo', 'root', '1');

var User = sequelize.define('user', {
    name : Sequelize.STRING//name컬럼을 정의  
    //id컬럼은 자동으로 생성된다
    //createAt, updateAt 컬럼들도 자동으로 생성
});

