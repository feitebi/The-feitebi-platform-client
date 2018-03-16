//爬网页 通过http.request 

const http = require('http');
const fs = require('fs');
const url = require('url');
const gbk = require('gbk');
const JSDOM = require('jsdom').JSDOM; //调用该模块对象的JSDOM方法
for (var i = 1; i <= 1564; i++) {
	
	GetUrl(i,`https://s2.coinmarketcap.com/static/img/coins/32x32/${i}.png`,(data,i)=>{ //把函数传入
		var html = gbk.toString('utf-8',data)
		var DOM = new JSDOM(html);
		var document = DOM.window.document;
		//提取symbol数据
		var m = i-0
		var arr = ["BTC","ETH","XRP","BCH","LTC","ADA","NEO","XLM","EOS","XMR","DASH","XEM","MIOTA","USDT","TRX","VEN","ETC","LSK","NANO","QTUM","OMG","BTG","BNB","ICX","ZEC","DGD","PPT","STEEM","WAVES","BCN","XVG","MKR","STRAT","RHOC","DOGE","BTS","DCR","SC","AE","SNT","BTM","REP","WTC","KMD","ARK","ARDR","ZIL","AION","VERI","ZRX","CNX","HSR","ETN","MONA","KCS","PIVX","DGB","GNT","QASH","BAT","GAS","DRGN","R","ETHOS","FCT","NAS","SYS","LRC","FUN","GXS","RDD","ELF","DCN","XZC","LINK","SALT","KNC","IOST","SMART","POLY","EMC","POWR","KIN","NXT","BNT","NCASH","MAID","NEBL","PART","GBYTE","SRN","PAY","NXS","REQ","DENT","ICN","PLR","BTX","ENG","STORJ","CND","BLOCK","AGI","SUB","BTCD","MANA","GNO","VTC","MNX","CVC","ACT","QSP","DTR","RDN","ANT","THETA","MCO","RLC","GVT","GAME","MTL","ENJ","IGNIS","SKY","STORM","SAN","SLS","PPP","ZEN","NAV","POE","WAX","GNX","UBQ","ABT","XPA","XDN","AUTO","PURA","DEW","XAS","EVN","TNB","CS","HPB","EMC2","NULS","BCO","FSN","PRL","MED","ADX","VEE","ION","XP","EDG","BLZ","SPHTX","BIX","LEND","C20","POA","SPANK","JNT","SPC","SNM","DATA","RCN","FTC","OST","BAY","PPC","MDS","XBY","WGR","TEL","PXS","AMB","TRAC","RPX","SMT","VIBE","HTML","AST","WINGS","QRL","UTNP","INK","KICK","EDO","TAAS","MLN","MGO","BURST","GTO","SNGLS","LBC","APPC","DPY","ITC","INS","BCPT","UTK","CMT","CLOAK","DBC","XCP","VIA","NLG","MOBI","BRD","WPR","GRS","FUEL","WABI","DTA","NGC","CRPT","TNC","ETP","UNO","MOD","BTO","BITCNY","RFR","RKT","GTC","LUN","TNT","LKK","DNT","VOX","IDH","PRE","AEON","HVN","PEPECASH","HST","CTR","BKX","CRW","ADT","HMQ","CDT","TRIG","ATM","TKN","AMP","CPC","UCASH","QLC","SXDT","SOAR","ECC","NMC","LEO","POT","ZCL","BITB","CFI","VIB","UKG","SBD","MTN","SIB","DAT","NET","MER","SHIFT","CHSB","DAI","BPT","EVX","ELEC","DCT","ONION","ZPT","SAFEX","DMD","XWC","SNC","IOC","ORME","CV","NMR","FLASH","MTH","SWM","COSS","ZSC","LET","ZAP","BLK","BLT","UQC","PRG","VRC","DIME","MOON","YOYOW","MINT","INT","XEL","CAPP","COLX","ARN","STK","TIO","IHT","OCN","DADI","BCC","MSP","TSL","QUN","NLC2","MUE","MDA","KEY","XPM","GRC","ZOI","HMC","SWFTC","DLT","ATN","TRST","AURA","1ST","QBT","FAIR","TRUE","DRT","TIX","BITUSD","BMC","EBTC","ICOS","GUP","XTO","ECA","LA","SOC","OMNI","EDR","WCT","MWAT","PZM","FLO","IPL","PRO","NEU","COV","EXP","DNA","SLR","PASC","CAN","POSW","THC","NYC","EZT","RADS","OAX","B2B","EMV","TAU","RVT","INCNT","CAT","IXT","DIVX","MOT","ALQO","BOT","EAC","XUC","AIT","DTB","XSH","IFT","SNOV","RBY","BSD","LMC","FDX","AUR","CLAM","CHP","BDG","XRL","AIR","CSNO","OK","SWT","PRA","DBET","USNBT","ALIS","UNIT","STX","GRE","MYB","TIME","SYNX","MUSIC","GBX","HBT","DICE","QAU","PND","RMC","XAUR","SPF","PHR","ENRG","PST","TOA","HKN","BBR","XMY","NEOS","HOT","TX","TIE","PLBT","OXY","HAC","ATB","TCT","XSPEC","LOC","OCT","NVST","GOLOS","PTOY","PLU","MDT","COFI","EVR","ECOB","BQ","TCC","OTN","NXC","AXP","GAM","MYST","FLDC","DYN","CAG","ESP","REM","EKO","LINDA","DBIX","BIS","CXO","CVCOIN","XLR","PFR","BLUE","PUT","FRD","COVAL","XNK","HGT","RNT","LUX","NTRN","NVC","CAT","MEE","XST","KRM","BNTY","KB3","HORSE","AVT","IOP","REBL","BEZ","RMT","PINK","BCY","BET","CURE","WRC","HEAT","ELIX","SXUT","DRP","ASTRO","DOPE","SEQ","TKS","GET","SPHR","AC","BTM","OBITS","POLIS","TUSD","MTX","ATMS","BUN","BWK","AID","APX","TIPS","XVC","BTCZ","BIO","PKT","ZEIT","HYP","FLIXX","GEO","1337","LEV","LEDU","KORE","PIRL","POLL","DNR","DFT","ARY","ABY","SETH","MEME","EVE","TFL","PARETO","DOT","CHIPS","QWARK","BRX","CPAY","PIX","UFO","VOISE","SNRG","TRF","NIO","GAT","PLAY","EXCL","ETT","LOCI","PTC","FLIK","HUSH","VTR","XBC","STA","DTH","J8T","ZRC","ERC","GJC","LIFE","VRM","ERO","OPT","ADC","GCN","REC","INXT","PBT","VZT","PUT","GLD","ZLA","SLT","CRED","MONK","MCAP","UFR","EXRN","2GIVE","AIX","BTDX","MNTP","DOVU","ODN","VIU","JC","PBL","ADB","SUMO","RIC","SSS","SCL","BELA","SHP","HUC","TRCT","VSX","ING","HAT","KRB","BASH","WILD","CANN","VSL","GCR","BLITZ","ALT","CPY","TRC","WISH","HWC","QRK","SPRTS","BRK","TRUST","XMCC","CRB","BON","NOTE","TZC","LCT","DGPT","TBX","BUZZ","EGC","EFYT","MTNC","ZEPH","SWIFT","CRAVE","CREA","EBST","YOC","NKC","ZNY","SAGA","ATL","SPR","TES","EFL","PRIX","SEND","IND","CARBON","CL","WTT","XGOX","TDX","AMM","QVT","START","HXX","ADST","CHC","INN","XMG","FOR","STAK","PKB","LDOGE","ZER","BTW","ONG","ELLA","BBT","FYP","RUP","PIPL","FYN","HOLD","SMS","PROC","MAG","UNB","ITNS","PING","CMPCO","STU","XFT","ELTCOIN","RAIN","OCL","IC","PYLNT","EQT","ESZ","DAY","LINX","CDX","SKIN","ADZ","PURE","MRT","MZC","STRC","PHO","MRJA","RUPX","ACC","MAGE","DP","GCC","PLC","ANC","BDL","SCT","SDC","PDC","42","VIVO","BBP","ARC","CRC","UIS","KLN","RNS","CDN","DAR","BYC","INSN","FLT","MOIN","KEK","ZENI","NOBL","SKC","UNIFY","CRM","DEUS","ZET","BTA","BRO","ARCT","XPD","ERA","EQL","FJC","MAX","LGD","CNT","XPTX","FCN","CCRB","EPY","XLC","FRST","PIGGY","OPC","DCY","FIMK","RLT","GUN","SUR","HERO","BTCS","HPC","JET","EL","BTCA","BXT","NET","XCPO","DEM","QBIC","KBR","MEC","EBET","ELE","TTC","WAND","ECASH","BTWTY","DFS","SMC","MANNA","TIG","DGC","CFT","TRUMP","WHL","XCN","ATS","LANA","XJO","MOJO","GLS","BLZ","CTX","AERM","NETKO","ABJ","CPC","ACE","MNE","ENT","ERC20","CJ","IETH","B@","BOLI","BITSILVER","RBT","UTC","POST","GRLC","MCRN","GB","QBC","MAO","SGR","RKC","PR","CUBE","TOKC","BTCRED","LCP","STN","TAG","OTX","ETG","BTG","SLG","ACC","XHI","PAK","ORE","ONX","BLC","NEWB","INFX","PCN","PCOIN","808","ZZC","DSH","PNX","DSR","RED","CCO","BITGOLD","ETHD","KAYI","BRIA","HNC","BLOCKPAY","XCT","CCT","NEVA","NTO","IRL","FUNC","DAXX","STV","300","XVP","XCXT","GTC","CAT","HBC","ECO","YTN","LEA","SHND","GOLF","BIGUP","HONEY","DALC","VUC","LBTC","REE","SANDG","RPC","BRAT","BITEUR","EAGLE","HVCO","ICE","MNC","COAL","GPU","ACOIN","MAY","EOT","MSCN","EXN","BAS","ERY","CNNC","VPRC","QCN","WOMEN","STARS","LTCU","GBC","DOLLAR","ORLY","GEERT","OFF","BOAT","PIE","PRC","XOC","ULA","CONX","CALC","NANOX","VLTC","AI","HMC","DMB","AGRS","RISE","COB","GRID","ART","PPY","HDG","TGT","ECN","CREDO","KLC","STAR","PGL","REX","XNN","BPL","RC","GMT","EVC","AHT","SENSE","TRIA","NSR","IFLT","BLU","REAL","SXC","IXC","MXT","GOOD","CBX","NKA","RUSTBITS","VTA","YASH","UNY","LEAF","SMLY","INPAY","GRWI","V","USC","ETBS","MBRS","UNI","FST","WDC","ORB","NDC","METAL","SHORTY","ICOO","LOG","RIYA","I0C","BPC","POP","HTC","MBI","BTCR","Q2C","ARG","TROLL","AU","FUCK","MAC","ITI","HBN","HODL","BITS","GRIM","KOBO","BRIT","UNIC","LNK","GAIA","SCORE","BTB","OPAL","FC2","CV2","TALK","WGO","ARI","HAL","BITZ","VAL","DTC","SRC","ITT","VIDZ","AMBER","EBCH","VISIO","TIT","TRI","NYAN","SUPER","TSE","SIGT","DDF","TGC","XGR","KURT","FLY","AIB","KUSH","BITBTC","MOTO","XBL","XPY","DRXNE","PXC","WAY","CYP","TKR","PX","BUCKS","GAP","CNO","CHESS","ICN","TRK","8BIT","CCN","DIX","AMMO","MARS","ARCO","BCF","EVIL","SAC","MNM","PHS","C2","XRA","RBIES","SPACE","BERN","FRC","VC","CHAN","GLT","CFD","XRE","SPEX","ATOM","TEK","AMS","VOT","LTB","KED","SWING","UNITS","J","XIOS","GLC","PASL","NUKO","SHDW","CRX","EMD","BSTY","DLC","888","BOST","BUMBA","ZUR","CON","NTWK","PXI","ISL","GUESS","ROOFS","PLC","SDRN","MAD","FIRE","IMX","XNG","JIN","ICOB","DUO","FRK","SCRT","QTL","611","SCS","YAC","XBTS","EVO","ASAFE2","SOON","EUC","IMS","VLT","TRDT","BTPL","ZCG","XBTC21","$$$","FUZZ","ALL","MST","BIP","GCC","HMP","CTO","POS","CPN","TAJ","MDC","FNC","FLAX","ADCN","LUNA","SOIL","XCO","ZMC","CACH","XCRE","ELC","DBTC","SPT","ANTI","CMT","CXT","NRO","DRS","GP","BENJI","MAR","CAB","WARP","CF","MTLMC3","CASH","SH","PRX","BNX","SONG","RIDE","BLN","ATX","LTCR","BLRY","ARB","BTQ","RBX","ZYD","GPL","KRONE","VIP","ALTCOM","BXC","JWL","DLISK","SLEVIN","MND","URO","PULSE","MILO","UET","SOJ","KNC","BSTAR","PONZI","ICON","SFC","CESC","WORM","URC","VEC2","BSC","IMPS","ACP","G3N","JS","STEPS","RSGP","BRAIN","EGO","TOR","WBB","PEX","PLACO","DRM","LIR","BIOS","JOBS","CWXT","ZNE","PLNC","OS76","DES","TAGR","CRT","COXST","VOLT","RMC","VRS","SDP","XRC","AGLC","ALTC","CRDNC","BIOB","SOCC","IBANK","ARGUS","TYCHO","CTIC3","P7C","ELS","CREVA","NODC","COUPE","SLFI","MGM","CTIC2","FXE","GSR","LVPS","TSTR","ABN","PIZZA","DGCS","CCM100","DIBC","EBT","ONT","HT","ATMC","CHAT","ELA","EKT","BCD","OC","W3C","RUFF","EPC","AIDOC","LDC","WIC","RCT","TOPC","TEN","LBTC","LOOM","YEE","FRGC","AVH","HLC","LYM","AWR","HAV","GLA","REF","AAC","SSC","TKY","OF","XIN","CFUN","ADK","BTCP","BCX","UGT","MAN","SHOW","FOTA","FAIR","BAR","KCASH","DDD","OCC","MGC","BOS","SEXC","MOAC","REN","UBTC","STQ","SWTC","IQT","SBTC","MOF","TOMO","CMS","LIGHT","CMS","READ","$PAC","IDT","IPC","XTZ","BSR","LCC","GEM","WETH","FIL","UGC","DEB","VLC","DXT","WC","GETX","CAN","MLM","RVN","PRS","CENNZ","CLUB","DMT","TMC","UIP","BEE","TFD","THS","KZC","SBC","STC","BCDN","XIN","XID","SHIP","GCS","IPBC","BAX","JIYO","ACAT","INSTAR","NTK","FLUZ","BIG","EAG","QUBE","ZENGOLD","B2X","ECH","EXY","CAS","INF","MSD","DIM","SIC","INDI","MVC","GRFT","STAC","ANI","NMS","HPY","GBG","IFC","DATX","CEFS","ENT","TOKEN","MAG","CANDY","IDXM","HC","JEW","HQX","TOK","VASH","AV","LALA","GOD","DRPU","UTT","WA","LEPEN","BCA","OX","RYZ","SMOKE","MCR","COR","CLD","CYDER","FLAP","UR","DMC","SHA","PRES","ABC","BT2","TESLA","XOT","DAV","WSX","SJCX","BITCF","SPK","FRN","GARY","FONZ","VULC","QBT","SISA","TCOIN","HALLO","XRY","SUP","SKR","ESC","DON","ETT","CME","GDC","HTML5","TER","BTE","SJW","NOX","BLAZR","GRX","SLOTH","EDRC","CFC","ELITE","MINEX","HDLB","XSTC","NEOG","NBIT","BAT","BET","RCN","GAY","BTCM","BIRDS","BIT","WOW","AKY","LDCN","DUTCH","APC","WINK","TOP","RBBT","SKULL","SHELL","GMX","FID","MARX","ZBC","CHEAP","TOPAZ","ACN","XQN","HNC","BEST","NAMO","FAZZ","MUSE","UNRC","CC","PCS","EGG","UNITY","ASN","TODAY","PLX","BSN","HIGH","NTC","YES","XTD","MCI","MMXVI","KASHH","TELL","KDC","RHFC","MBL","DUB","OPES","GAIN","DCRE","REGA","BTBc","ZSE","FUTC","LKC","LEVO","SNAKE","SAK","ACC","HCC","BUB","ANTX","RUBIT","PRN","RUNNERS","GRN","STEX","PDG","NUMUS","SND","PRIMU","DBG","BITOK","RICHX","SPORT","FRWC","TURBO","DASHS","ACES","OMC","FAP","SFE","INDIA","QORA","WIC","UNC","AXIOM","XVE","LAZ","BAC","XAU","LTH","ROYAL","PAYP","TEAM","IVZ","X2","DISK","GML","POKE","PSY","PRM","EGOLD","KARMA","HYPER","VOYA","TRICK","CYC","MONETA","OP","TCR","XID","TLE","CMP","SIGMA","LLT","MAGN","SAY","OCOW","FRCT","XMRG"]
		fs.writeFile(`imgs/${arr[m]}.png`,data,'utf8')// 把参数写在html文件里
				//console.log(arr,str)

		console.log(`爬取成功：${arr[m]}.png`)
	})
}

function GetUrl(i,sUrl,success){
	
	var urlObj = url.parse(sUrl)
	var http = "";
	if (urlObj.protocol=='http:') {
		http = require('http')  
		//有些图片网页是https的 http环境下的js文件跨域爬取网页会出错
	}else{
		http = require('https')
	}
		//设置服务器(网站)请求的参数
		var req = http.request({  //request 默认post方式访问
			'hostname':urlObj.hostname,
			'path':urlObj.path
		},res=>{
			var arr = []
			
			//var str =""
			res.on('data',buffer=>{
				arr.push(buffer)
				//str+=buffer
			})//如果res接收到数据 则触发data事件 则把数据buffer变量放进数组里

			res.on('end',()=>{ 
				var b = Buffer.concat(arr) //爬取图片必须先利用该方法把转换参数2进制才可以
				console.log(i)
				//如果函数存在，则执行该函数 
				success && success(b,i) //穿参数b
	 		})
		})
		req.end()
		//404页面
		req.on('error',()=>{
			console.log('404页面 访问出错')
		})
}




