var mongoose = require("mongoose")


//连接mongodb数据库
mongoose.connect("mongodb://localhost:27017/api")

//获取连接数据库的句柄
//假设mongoose是一个水池，想要得到里面的数据，则需要一个管道
var db = mongoose.connection;

//监听连接数据库成功的事件
db.on("open", function(err) {
    if (err) {
        console.log("连接数据库失败")
        throw err
    }

    console.log("连接数据库成功")
})

//定义表的数据结构
var productSchema = new mongoose.Schema({
    md5key: String,
    md5secret: String,
    id: Number
}, {
    versionKey: false   // 不需要添加版本属性
})

//将数据结构和表关联起来
                                    //数据结构                     表
var akModel = mongoose.model("akModel", productSchema, "apiList")

module.exports = {
    akModel: akModel
}

