var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/config');
var dao = require('../dataDao/dao');


var responseJSON = function(res,ret){
  if(typeof ret === 'undefined'){
    res.json({code:'-200',msg:'操作失败'});
  }else{
    res.json(ret);
  }
}
exports.zwl = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var querysql = "select * from imglist";
    //操作数据库
   var queryResult= dao.query(querysql,"",function(result){
       console.log(result);
       res.send(result);
       
      //
   });
};
exports.login=function(req,res){
	   res.setHeader('Content-Type', 'application/json;charset=utf-8');
	   console.log(req.body)
	   var datas=JSON.parse(req.body.data);
	   var username=datas.username;
	   var password=datas.password;
	   console.log(username+"====================="+password)
	   var querysql="select * from userzhou where username=?"
	   var params=username;
	   var queryResult=dao.query(querysql,params,function(result){
	   		console.log(result);
	   		res.send(result);
	   });
};
// module.exports = router;