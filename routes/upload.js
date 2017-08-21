exports.upload = function (req, res) {  
    var multiparty = require('multiparty'); 
        var form = new multiparty.Form();//新建表单
        //设置编辑
        form.encoding = 'utf-8';
        //设置图片存储路径
        form.uploadDir = "public/upload/";
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

            var url='public/upload/'+Date.now()+suffix;
            var fs=require('fs');
            //给图片修改名称
            fs.renameSync(oldpath,url);
            var u={ "error" : 0, "url" : '/'+url}
            res.end(JSON.stringify(u)); 
        });

}  