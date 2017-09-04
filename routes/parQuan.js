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
exports.parQuan = function(req, res){
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    console.log(req.body);
    console.log(req.body.data)
    var f=JSON.parse(req.body.data);
    var parQuan = f.parQuan;
    console.log(parQuan);
    var querysql = "select * from parShow where parQuan=?";
    var params = parQuan;
    //操作数据库
   var queryResult= dao.query(querysql,params,function(result){
   	var p={};
   	p.状态='成功';
   	p.列表=result
       console.log(result);
       res.send(p);
       
      //
   });
};