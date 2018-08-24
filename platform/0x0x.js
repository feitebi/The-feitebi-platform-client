const express = require("express");
const app = express();

app.use(express.static(__dirname));


app.listen(30088, function(){  
	console.log("http server running on localhost:30088");
});