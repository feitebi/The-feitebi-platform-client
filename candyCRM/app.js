//引入express
var path = require('path')
var express = require("express")
var bodyParser = require('body-parser')
var crypto = require('crypto')
var model = require("./mongodb.js").akModel
//用express模块创建一个服务器实例

var server = express()

//配置express服务器的静态文件目录
//网站的静态文件目录  .html,.css,.js,.jpg,.png........
server.use(express.static(path.join(__dirname))) // "./www"
// Express 内置的 中间件express.static 可以方便地托管静态文件
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false })) // 必须false 否则ajax穿不过来

//数据库
var products = [{
            hash:"49b5f36cb5b84bc8c5a56ff1d4984152cd205b05",
            num:8,
            type:'FTB'
        },{
            hash:"c5a56ff1d4984152cd205b05",
            num:1,
            type:'YTB'
        },{
            hash:"1111f1d4984152cd205b05",
            num:4,
            type:'BTB'
        }]


//创建AK
server.post('/bulidAK',function(req,res){
    //console.log(typeof req.body.id)
    var content1 = (req.body.id).toString()
    const md5key = crypto.createHash('sha1')
                       .update(content1)
                       .digest('hex');
    //console.log("公钥key:",md5key);
    var content2 = new Date().getTime();
    const md5secret = crypto.createHash('sha1')
                       .update(content2.toString())
                       .digest('hex');
    //console.log("密钥secret:",md5secret);
    var obj = {
        md5key:md5key,
        md5secret:md5secret,
        id:req.body.id
    }
    //console.log(obj)
    //添加数据进数据库
    model.create(obj, function(err, result) {
        if (err) {
            console.log("添加数据失败")
            throw err
        }
        console.log("添加结果", result)
    })
    res.status(200).json({md5key:md5key})
})

//导入AK
server.get('/leadAK',function(req,res){
    model.find({}, function(err, docs) {
        /* 参数说明
            err     Oject   查询失败后的错误信息
            docs    Array   查询结果
        */
        if (err) {
            console.log("查询失败")
            throw err
        }
        console.log("查询结果", docs)
        res.status(200).json({docs:docs})
    })
    
})
//删除AK
server.get('/delAK',function(req,res){
    //console.log(typeof req.query.currentDel)
    model.remove({md5key:req.query.currentDel}, function(err) {
        if (err) {
            console.log("删除数据失败")
            throw err
        }
        console.log("删除数据成功")
        res.status(200).json({errno:0})
    })

})


//注册接口
server.post('/addUser', function(req, res) {
    //获取客户端提交的信息
    console.log("注册数据", req.body)
    // var username = req.body.username
    // var age = req.body.age
        //将用户提交的数据添加到数组中
    res.status(200).json({errno:0});
})

//登入接口
server.post('/loginUser',function(req,res){
	console.log("账号登入数据",req.body)
	res.status(200).json({errno:0})
})

//changeLogin接口
server.get('/changeLogin',function(req,res){
	
	res.status(200).json({errno:0})
})

//ftb-add-api
server.post('/addAPI',function(req,res){
	console.log('API新增数据',req.body)
	res.status(200).json({errno:0})
})

//ftb-add-api2
server.post('/addAPI2',function(req,res){
	console.log('API2新增数据',req.body)
	res.status(200).json({errno:0})
})

//payAddress充值地址
server.post('/payAddress',function(req,res){
	console.log('充值地址数据',req.body)
	res.status(200).json({errno:0})
})

//payList 打币清单接口
server.get('/payToken',function(req,res){
    res.status(200).json({dataBase:products})
})

//blackName 点击拉黑按钮
server.get('/blackName',function(req,res){
    console.log(req.query)
    //然后把他从正常客户数组中删除
    //然后重定向发送到黑名单客户数组中...
    res.status(200).json({errno:0})
})

server.get('/getblack',function(req,res){
    console.log(req.query)
    //然后把他从正常客户数组中删除
    //然后重定向发送到黑名单客户数组中...
    res.status(200).json({products:products})
})

//开启服务器的监听
server.listen(3000, function(err) {
    if (err) throw err
    console.log("server is running at http://localhost:3000")
})