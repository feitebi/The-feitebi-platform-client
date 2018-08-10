const express = require("express");
const fs = require('fs');
const app = express();
app.use(express.static(__dirname));

var inputAddressJsonArr = [];
app.get("/candyHandOut",function(req,res){
	res.set("Access-Control-Allow-Origin", "*");
	var sessionData = req.query.address;
	inputAddressJsonArr.push(sessionData);
	fs.writeFileSync('./inputAddressJson.json',JSON.stringify(inputAddressJsonArr));
	res.status(200).json({msg:"ok"})
})

app.listen(30088, function(){  
	console.log("http server running on localhost:30088");
});