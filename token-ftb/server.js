const express = require("express");
const app = express();
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换

app.use(express.static(__dirname));

const accessKeyId = 'LTAIShTkCoOEFGtk'
const secretAccessKey = '1p0FpzLkyFr0QlRNOwpNFETGlFEkY0'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信
smsClient.sendSMS({
    PhoneNumbers: '1500000000',
    SignName: '云通信产品',
    TemplateCode: 'SMS_129762912',
    TemplateParam: '{"code":"12345"}'
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
    }
}, function (err) {
    console.log(err)
})

app.get('/currentToken',function(req,res){
	res.status(200).json({
		currentToken:200,
		percent:10
	})
})

app.listen(3000, function(){
	console.log("http server running on localhost:3000");
});