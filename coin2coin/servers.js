const express = require("express");
const app = express();

app.use(express.static(__dirname));

//changelly 币币兑换 接口  start==========================================

var Changelly = require('./lib.js');

var changelly = new Changelly(
  '70e7315de03f4517b10261beed7d989b',
  'f058fc0fece8b2dcb0b159f6f3e00b54f2a57446acf8e8a7bcbc286d867a2d92'
);
//获取所有币种
app.get('/formIconRPC',function(req,res){   
	res.set("Access-Control-Allow-Origin", "*");
	changelly.getCurrencies(function(err, data) {
	  if (err){
	    console.log('Error!', err);
	  } else {
	    //console.log(data.result); //'getCurrencies'
	    res.status(200).json({msg:data.result})
	  }
	});
});

//币币兑换比率
app.get('/RateIconRPC',function(req,res){
	res.set("Access-Control-Allow-Origin", "*");
	var coin1 = req.query.Coin1.toLowerCase();
	var coin2 = req.query.Coin2.toLowerCase();
	changelly.getExchangeAmount(coin1,coin2, 1, function(err, data) {
	  if (err){
	    console.log('Error!', err);
	  } else {
	  	if (data.error) {
	  		res.status(200).json({error:data.error})
	  	}else{
	  		res.status(200).json({msgRate:data.result})
	  	}
	    
	  }
	});
});

//币币兑换 最低限额 最高限额
app.get('/minRPC',function(req,res){
	res.set("Access-Control-Allow-Origin", "*");
	changelly.getMinAmount(req.query.From,req.query.To, function(err, data) {
		  if (err){
		    console.log('Error!', err);
		  } else {
		    res.status(200).json({min:data.result,max:data.result*1000})
		  }
	});
})

//币币兑换 生成地址
app.get('/urlRPC',function(req,res){
	res.set("Access-Control-Allow-Origin", "*");
	
	var from = req.query.Form;
	var to = req.query.To;
	var address = req.query.address;
	var refundAddress = req.query.refundAddress;
	var amount = req.query.amount.split(' ');
	var extraID = "FTB_"+ Math.floor(new Date() / 1000);
	
	//console.log(req3[0]) 最小兑换代币数量
	changelly.createTransaction(from,to,address,amount[0], refundAddress,extraID,function(err, data) {
	  if (err){
	    console.log('Error!', err);
	  } else {
	    console.log(data);
	    res.status(200).json({msg:data.result});
	    //console.log(data.result.createdAt); 时间
	  }
	});
});

//币币兑换清单
app.get('/viewTable',function(req,res){

	res.set("Access-Control-Allow-Origin", "*");
	changelly.getStatus(req.query.id, function(err, data) {
		//console.log(data)
	  if (err){
	    console.log('Error!', err);
	  } else {
	    res.status(200).json({currentStatus:data.result,TDid:req.query.id});
	  }
	});
});


//changelly 币币兑换 接口  end==========================================


app.listen(3000, function(){  
	console.log("http server running on localhost:3000");
});