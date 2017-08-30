//aes.js
//修改时间20160225
//引入nodejs加密核心库
var crypto = require('crypto');
//加密公共密钥 32位
var keys = 'fb31a2d16e3e56f067eb13529928d123';
//编码设置
var clearEncoding = 'utf8';
//加密方式
var algorithm = 'aes-256-ecb';
//向量
var iv = "";
//加密类型 base64/hex...
var cipherEncoding = 'hex';


/*AES加密
	
	参数说明：
	data 加密前原文数据
	key 加密密钥（长度必须为32位）

	调用范例：
	var aes =  require('./aes.js');
	var enString = aes.aesEncodeCipher(data,key);

	*/
module.exports.aesEncodeCipher = function(data,key){
	
	if(key == null || data == null){
		return 10000;
	}
	
	if(key.length != 32){
		return 10001;
	}

	var datastr = ""
	/*判读是否为字符串,不是转成字符串*/
	if(typeof(data) === 'string'){
		datastr = data;
	}else{
		datastr = JSON.stringify(data);
	}

	/*加密前先进行BASE64编码，编码后进行AES加密*/
	try{
		var buf = new Buffer(datastr);
		var base64String = buf.toString('base64');
	}catch(e){
		return 10002;
	}

	try{
		var cipher = crypto.createCipheriv(algorithm, key, iv);
		var cipherChunks = [];
		cipherChunks.push(cipher.update(base64String, clearEncoding, cipherEncoding));
		cipherChunks.push(cipher.final(cipherEncoding));
		return cipherChunks.join('');
	}catch(e){
		return 10004;
	}
}



/*[读取网址内容 
调用方法:
html_url:网址
r:内容
 var r = {}
 r.aaa="13714397300"
 r.中语言="415be5fdc0107f2ee88d51784d791c07"
type:类型get,post两种,get可以不用传r,type
*/
module.exports.file = function(html_url,r,type,allcallback){
var timeoutEvent;
	  var s={};
	  
      r = r||{};
      var content=require('querystring').stringify(r);
      var parse_u=require('url').parse(html_url,true);
      var isHttp=parse_u.protocol=='http:';
      var options={
           host:parse_u.hostname,
           port:parse_u.port||(isHttp?80:443),
           path:parse_u.path,
           method:type,
           headers:{
                  'Content-Type':'application/x-www-form-urlencoded',
                  'Content-Length':content.length
            }
        };
		
        var req = require(isHttp?'http':'https').request(options,function(res){
			
            var _data='';
			
			res.setEncoding('utf8');
		  
			res.on('data', function(chunk){
				 _data += chunk;
			});
		  
			res.on('end', function(){
			clearTimeout(timeoutEvent);
			//console.log(type+"请求完成");
			     if(res.statusCode === 200){
					s._f="成功";
					s.内容=_data;
					
				}
				else{
					s._f="失败";
				}
					allcallback(s);
			});
		   
		    res.on("close", function(e) {
            clearTimeout(timeoutEvent);
            console.log(type+"请求关闭");
			});
			
			res.on("abort", function() {
            console.log(type+"请求中止操作");
			});
			
			
        });
		
		req.write(content);
		req.end();
		
		req.on('error', function (e) {
			clearTimeout(timeoutEvent);			
			console.log('请求失败: ' + e.message);  
		});  
		
		req.on("timeout", function() {
        console.log(type+"请求接收超时");
        if (req.res) {
            req.res.emit("abort");
        }

        req.abort();
		});
		
		timeoutEvent = setTimeout(function() {
        req.emit("timeout");
		}, 5000);
		//5秒后执行超时操作	
	}
/*]读取网址内容 */

//
module.exports.form_su = function(html_url,con,func,allcallback){
	con = keys+this.aesEncodeCipher(con,keys);
	var r = {};
	r.func = func;
	r.words = con;
	this.file(html_url,r,'post',function(rr){
		allcallback(rr);
	})
}

module.exports.form_alipay = function(html_url,con,allcallback){
	this.file(html_url,con,'post',function(rr){
		allcallback(rr);
	})
}

//这个是我写的
module.exports.upload = function (req, res) {  
    var multiparty = require('multiparty'); 
        var form = new multiparty.Form();//新建表单
        //设置编辑
        form.encoding = 'utf-8';
        //设置图片存储路径
        form.uploadDir = "upload/";
        form.keepExtensions = true;   //保留后缀
        form.maxFieldsSize = 2*1024*1024; //内存大小
        form.maxFilesSize= 5*1024*1024;//文件字节大小限制，超出会报错err

        //表单解析
        form.parse(req, function(err,fields,files) {
            //报错处理
            if(err){
                console.log(err);
                var u={"error" :1,"message":'请上传5M以图片'};
                res.end(JSON.stringify(u));
                return false;
            }

            //获取路径
            console.log(files)
            var oldpath=files.pic[0]['path'];
            console.log(oldpath)

            //文件后缀处理格式
            if(oldpath.indexOf('.jpg')>=0){
                var suffix='.jpg';      
            }else if(oldpath.indexOf('.png')>=0){                   
                var suffix='.png';      
            }else if(oldpath.indexOf('.gif')>=0){                   
                var suffix='.gif';      
            }else{
                var u={"error" :1,"message":'请上传正确格式'};
                res.send(JSON.stringify(u));
                return false;
            }

            var url='upload/'+Date.now()+suffix;
            console.log(url)
            var fs=require('fs');
            //给图片修改名称
            fs.renameSync(oldpath,url);
            var u={ "error" : 0, "url" : '/'+url}
            res.end(JSON.stringify(u)); 
        });

}  