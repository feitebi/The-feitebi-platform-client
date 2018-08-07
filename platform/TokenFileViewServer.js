const express = require("express");
const app = express();
const https = require('https'); //针对于changenow 接口
const request = require('request');

//爬网页 通过http.request 
// gbk 模块可以完整的在cmd里打印全部页面标签信息
// jsdom模块使用方法
// const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
// console.log(dom.window.document.querySelector("p").textContent); // "Hello world"
const http = require('http');
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM; //调用该模块对象的JSDOM方法
app.use(express.static(__dirname));

app.get('/uploadToken',function(req,res){
	res.set("Access-Control-Allow-Origin", "*");//设置跨域兼容
	console.log(req.query.hash);
	//console.log(req.query.csvData);
	var index = 0;//爬虫变量
	var length = req.query.hash.length
	function digui(n){
		if (n==0) return;
		setTimeout(function(){
			//爬虫======================================================
			GetUrl(`http://api.etherscan.io/api?module=account&action=tokentx&address=${req.query.hash[n-1]}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`,data=>{ //把函数传入
				    //console.log(data) //默认打印gbk
					var html = gbk.toString('utf-8',data)
					let DOM = new JSDOM(html);
					let document = DOM.window.document;
					
					//单价
					var str1 = html.split('class="mCustomScrollbar');
					//var str2 = str1[1].split('Value');
					//var str3 = str2[0].split('</a>To');
					console.log(str1);
					
					console.log('/getMarket接口 爬取成功')
					console.log("n:"+n);
					digui(n-1);
					//returnDataUp();
				})
			function GetUrl(sUrl,success){
				index++; //计算爬取到的302重定向次数
				var urlObj = url.parse(sUrl)
				var http = "";
				if (urlObj.protocol=='http:') {
					http = require('http')  
					//有些图片网页是https的 http环境下的js文件跨域爬取网页会出错
				}else{
					http = require('https')
				}
				//设置访问服务器(网站)的参数
				let req = http.request({  //request 默认post方式访问
					'hostname':urlObj.hostname,
					'path':urlObj.path
				},res=>{
					//如果状态码是200 说明找到真身页面了
					if (res.statusCode==200) {
						var arr = []
						res.on('data',buffer=>{
							arr.push(buffer)
						})//如果res接收到数据 则触发data事件 则把数据buffer变量放进数组里

						res.on('end',()=>{ 
							let b = Buffer.concat(arr) //爬取图片必须先利用该方法把转换参数2进制才可以

							//如果函数存在，则执行该函数 
							success && success(b) //穿参数b
				 		})
					}else if(res.statusCode==302||res.statusCode==301){
						//如果状态码是302说明是重定向的虚拟假网页
						//执行以下代码继续爬取
						console.log(`我是第${index}次重定向！`)
						GetUrl(res.headers.location,success)//此处就是回调函数
					}
					
					
					
				})

				req.end()
				//404页面
				req.on('error',()=>{
					console.log('404页面 访问出错')
				})
			}
			//爬虫======================================================
		},1500);
	};
	digui(length);
});

app.listen(30088, function(){  
	console.log("http server running on localhost:30088");
});