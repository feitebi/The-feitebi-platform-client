   var WALLET_KEY_TAG = "BDH_WALLET_KEY";
   var WALLET_ADDR_TAG = "BDH_WALLET_ADDR";
   var WALLET_SEED_TAG = "BDH_WALLET_SEED";
   var WALLET_BALANCE_TAG = "BDH_WALLET_BALANCE";

   var CERTS_LIST = 'BDH_CERTS_LIST';
   var ISSUED_ASSETS = 'BDH_ISSUED_ASSETS';

   var HD_WALLET = 'BDH_HD_WALLET';
   var INIVTE_CODE = 'INIVTE_CODE';

   var BIRD_TOKEN = 'BIRD_TOKEN';

   var REG_COUNT = 'REG_COUNT';

   var postApiUrl = "/api"

   var unfs = 'http://dfs.unionchain.org:8385/';

   var USER_TAG = "USER_DATA";
   var USER_ID_FACTOR2 = "USER_ID_FACTOR2";
   var LOGIN_TAG = "LOGIN_TAG";

   var BIRD_FINISHED = "BIRD_FINISHED";

   var FEE_BALANCE = "FEE_BALANCE";

   var INIVTE_FROM_ADDR = "INIVTE_FROM_ADDR";

   var server_uri = "/rest/xchange";

   var REALNAME_VALID='REALNAME_VALID';

   var ETH_BALANCE_URL = "https://api.etherscan.io/api?module=account&action=balance&tag=";
      ETH_BALANCE_URL += "latest&apikey=BMTKE1ANJN5YN7I8E67FNGM7Z6CQN777WY&address=";


   var getUrlParameter = function getUrlParameter(sParam) {
       var sPageURL = decodeURIComponent(window.location.search.substring(1)),
           sURLVariables = sPageURL.split('&'),
           sParameterName,
           i;

       for (i = 0; i < sURLVariables.length; i++) {
           sParameterName = sURLVariables[i].split('=');

           if (sParameterName[0] === sParam) {
               return sParameterName[1] === undefined ? true : sParameterName[1];
           }
       }
   };

   function getUserId() {
      var user = getStorageJson(USER_TAG);
       if (typeof user != 'undefined' && user != null) {
          return user.userId;
       }
       return "";
   }

  function login() {
      if($('#phone').val() =='' || $('#pwd').val()==''){
          $('#dlgTips').html('请检查输入！');
          $('#tipsDlg').modal('show');
          return;
      }

      $('#loginBtn').attr('disabled','true');

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/login',
           data: {
               phone: $('#phone').val(),
               pwd: $('#pwd').val(),
               userId: getUserId()
           },
           dataType: 'json',
           success: function(data) {
               var json = data.entity;
               if (json.id != '0') {
                   var factor2Valid = json.twoFactorKey;
                   if(factor2Valid!='' && factor2Valid.length>0){
                       storeJsonObject(USER_ID_FACTOR2, json.userId);
                       window.location.href = 'loginByFactor2.html';
                   }else {
                     storeLogin();

                     storeJsonObject(USER_TAG, json);

                     storeJsonObject(REALNAME_VALID,json.nameCertFlag);

                     //json.rememberMe = $('#rememberMe').is(':checked');
                     if(json.walletAddr=='' || json.walletKey==''){
                          //createNewAddress();
                          $('#dlgTips').html('钱包地址获取失败，请与管理员联系！');
                          $('#tipsDlg').modal('show');
                          return;
                     } else {
                          storeJsonObject(WALLET_KEY_TAG, json.walletKey);
                          storeJsonObject(WALLET_ADDR_TAG, json.walletAddr);
                          if(json.birdToken && json.birdToken>0){
                            storeJsonObject(BIRD_TOKEN, json.birdToken);
                          }
                          window.location.href = 'index.html';
                     }
                 }
               } else {
                   $('#dlgTips').html('登录失败，请检查输入！');
                   $('#tipsDlg').modal('show');
                   $('#loginBtn').removeAttr('disabled');
                   return;
               }
           }
       });
   }

   function regCountPlus() {
        var regCount = getStorageJson(REG_COUNT);
        var nRC =1;
        if(typeof regCount=='undefined' || regCount==null || regCount==''){
            nRC=1;
        }else{
            nRC=regCount+1;
        }
        storeJsonObject(REG_COUNT,nRC);
   }

  function canRegister() {
     var regCount = getStorageJson(REG_COUNT);
     if(typeof regCount=='undefined' || regCount==null || regCount=='' || regCount<2){
        return true;
     }
     return false;
  }

   function register() {
      if(!canRegister()){
          $('#dlgTips').html('同一客户端不允许注册多个号，感谢支持！');
          $('#tipsDlg').modal('show');
          return;
      }

     if($('#phone').val() =='' || $('#pwd').val()=='' || $('#phoneValidCode').val()==''){
          $('#dlgTips').html('请检查输入！');
          $('#tipsDlg').modal('show');
          return;
     }
     
      $('#registerBtn').attr('disabled','true');

      var refAddr = getStorageJson(INIVTE_FROM_ADDR);

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/register',
           data: {
               phone: $('#phone').val(),
               pwd: $('#pwd').val(),
               userId: getUserId(),
               phoneValidCode: $('#phoneValidCode').val(),
               refAddr:refAddr
           },
           dataType: 'json',
           success: function(data) {
               var json = data.entity;
               if (json.id != '0') {
                   //json.rememberMe = false;
                   storeLogin();
                   storeJsonObject(USER_TAG, json);

                   regCountPlus();

                   storeJsonObject(REALNAME_VALID,json.nameCertFlag);

                   if(json.walletAddr=='' || json.walletKey==''){
                        createNewAddress();
                   } else {
                        storeJsonObject(WALLET_KEY_TAG, json.walletKey);
                        storeJsonObject(WALLET_ADDR_TAG, json.walletAddr);
                   }
               } else {
                   $('#dlgTips').html('注册失败，请检查输入！');
                   $('#tipsDlg').modal('show');
                   $('#registerBtn').removeAttr('disabled');
                   return;
               }
           }
       });
   }

    function registerWithoutValid() {

       if(!canRegister()){
          $('#dlgTips').html('同一客户端不允许注册多个号，感谢支持！');
          $('#tipsDlg').modal('show');
          return;
      }
      
      if($('#phone').val() =='' || $('#pwd').val()=='' || $('#phoneValidCode').val()=='' || $('#vcode').val()==''){
          $('#dlgTips').html('请检查输入！');
          $('#tipsDlg').modal('show');
          return;
      }

      $('#registerBtn').attr('disabled','true');

      var refAddr = getStorageJson(INIVTE_FROM_ADDR);

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/register_without_valid',
           data: {
               phone: $('#phone').val(),
               pwd: $('#pwd').val(),
               vcode: $('#vcode').val(),
               phoneValidCode: $('#phoneValidCode').val(),
               refAddr:refAddr
           },
           dataType: 'json',
           success: function(data) {
               var json = data.entity;
               if (json.id != '0') {
                   //json.rememberMe = false;
                   storeLogin();
                   storeJsonObject(USER_TAG, json);

                   regCountPlus();

                   storeJsonObject(REALNAME_VALID,json.nameCertFlag);

                   if(json.walletAddr=='' || json.walletKey==''){
                        createNewAddress();
                   } else {
                        storeJsonObject(WALLET_KEY_TAG, json.walletKey);
                        storeJsonObject(WALLET_ADDR_TAG, json.walletAddr);
                   }
               } else {
                   var error = data.entity.error;
                   $('#dlgTips').html('注册失败，'+error);
                   $('#tipsDlg').modal('show');
                   $('#registerBtn').removeAttr('disabled');
                   return;
               }
           }
       });
   }

   //重置密码
   function resetPwd() {
      var phone=$("#phone").val();
      var code=$("#phoneValidCode").val();
      var newpwd=$("#pwd").val();
      if(newpwd=="" || code=="" || phone==""){
        $("#dlgTips").text("验证码和密码不能为空！");
        $("#tipsDlg").modal('show');
        return;

      } else {
        $.ajax({
          url: server_uri+'/user/reset_password',
          type:'post',
          data:{
            phone:phone,
            code:code,
            pwd:newpwd
          },
          dataType:'json',
          success:function(data){
            var f=data.entity.flag;
            if(f=='1'){
              $("#dlgTips").text("修改成功，请重新登录！");
              $("#tipsDlg").modal('show');
              setTimeout(function() {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href='login.html';
              }, 1000);
            }
            else{
              $("#dlgTips").text("请检查验证码是否输入正确！");
              $("#tipsDlg").modal('show');
            }
          }
        });
      }
    }

   function sendPassword() {
       $.ajax({
           type: 'POST',
           url: server_uri+'/user/send_pwd',
           data: {
               phone: $('#phone').val()
           },
           dataType: 'json',
           success: function(data) {
               var state = data;
               if (state.flag == '1') {
                   $('#dlgTips').html('请查看手机信息短信！');
                   $('#tipsDlg').modal('show');
                   window.location.href='signin.html';
               } else {
                   $('#dlgTips').html('发送失败，请检查输入！');
                   $('#tipsDlg').modal('show');
                   return;
               }
           }
       });
   }

   function setPassword() {
       $.ajax({
           type: 'POST',
           url: server_uri+'/user/change_password',
           data: {
               userId: getUserId(),
               pwd: $('#newPwd').val(),
               oldPwd: $('#oldPwd').val()
           },
           dataType: 'json',
           success: function(data) {
               var state = data.entity;
               if (state.userId != '0') {
                   $('#dlgTips').html('修改成功！');
                   $('#tipsDlg').modal('show');
               } else {
                   $('#dlgTips').html('发送失败，请检查输入！');
                   $('#tipsDlg').modal('show');
                   return;
               }
           }
       });
   }

   var timer_minute = 60000;
   var timer;

   var NO_REPEAT ='NO_REPEAT';

   function sendCode() {
      var phone=$("#phone").val();
      if(phone==null||phone==""){
        $("#dlgTips").text("手机不能为空！");
        $("#tipsDlg").modal('show');
        return;
      }

      $('#codeBtn').attr('disabled','true');
       
      $.ajax({
           type: 'POST',
           url: server_uri+'/user/send_verify_code',
           data: {
               userId: getUserId(),
               vcode: $('#vcode').val(),
               phone: $('#phone').val()
           },
           dataType: 'json',
           success: function(data) {
               var state = data;
               if (state.flag == '1') {
                   timer = setInterval(countdown, 1000);
               } else {
                   $('#dlgTips').html('发送失败，请检查输入！');
                   $('#tipsDlg').modal('show');
                   return;
               }
           }
       });
   }

   function countdown() {
       timer_minute = timer_minute - 1000;
       if (timer_minute > 0) {
           $('#codeBtn').html(timer_minute / 1000 + "秒后重发");
       } else {
           clearInterval(timer);
           timer_minute = 60000;
           $('#codeBtn').removeAttr('disabled');
           $('#codeBtn').html("发送验证码");
       }
   }

  function storeLogin() {
     var login = new Object();
     login.login = "1";
     login.time = new Date().toDateString();
     sessionStorage.setItem(LOGIN_TAG, JSON.stringify(login));
  }

  function isLogin() {
      var json = sessionStorage.getItem(LOGIN_TAG);
      if (typeof json != 'undefined' && json != null) {
         return true;
      }

      json = getStorageJson(USER_TAG);
      if (typeof json != 'undefined' && json != null && json.userId !='') {
           return true;
      }
      
     return false;
  }

   function isRealNameValid() {
      var nv = getStorageJson(REALNAME_VALID);

      if (typeof nv != 'undefined' && nv == '1') {
         return true;
      }
      
      return false;
  }

  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
  };

   function getStorageJson(key) {
       if (window.localStorage) {
           return JSON.parse(localStorage.getItem(key));
       } else {
           return "";
       }
   }

   function storeJsonObject(key, val) {
       if (window.localStorage) {
           localStorage.setItem(key, JSON.stringify(val));
       } else {
         alert('请使用支持H5的浏览器。');
       }
   }

   function generateUUID() {
       var d = new Date().getTime();
       var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
           var r = (d + Math.random() * 16) % 16 | 0;
           d = Math.floor(d / 16);
           return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
       });
       return uuid;
   };

   Date.prototype.format = function(format) {
       var o = {
           "M+": this.getMonth() + 1,
           // month
           "d+": this.getDate(),
           // day
           "h+": this.getHours(),
           // hour
           "m+": this.getMinutes(),
           // minute
           "s+": this.getSeconds(),
           // second
           "q+": Math.floor((this.getMonth() + 3) / 3),
           // quarter
           "S": this.getMilliseconds()
           // millisecond
       };
       if (/(y+)/.test(format) || /(Y+)/.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
       }
       for (var k in o) {
           if (new RegExp("(" + k + ")").test(format)) {
               format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
           }
       }
       return format;
   };

   function GetRandomNum(Min, Max) {
       var Range = Max - Min;
       var Rand = Math.random();
       return (Min + Math.round(Rand * Range));
   }

   function timestampformat(timestamp) {
       return (new Date(timestamp * 1)).format("yyyy-MM-dd hh:mm");
   }

   function checkIfInitWallet() {

       var key = getStorageJson(WALLET_KEY_TAG);
       var addr = getStorageJson(WALLET_ADDR_TAG);
       if (!key || key === '') {
           logout();
       } 
   }

   function logout() {

     var rc = getStorageJson(REG_COUNT);

     localStorage.clear();
     sessionStorage.clear();

     if (typeof rc == 'undefined' || rc == null || rc =='') {
           rc='1';
     }
     storeJsonObject(REG_COUNT, rc);

     window.location.href='signin.html';
   }

   function restoreWalletByKey() {
      var privateKey = $('#sPrivateKey').val();
      if(privateKey!='' && privateKey.length>50){
        restoreWalletWith('',privateKey);
      }
   }
   function restoreWalletBySeed() {
      var seed = $('#sSeed').val();
      if(seed!='' && seed.length>12){
        restoreWalletWith(seed,'');
      }
   }

   function createNewAddress() {
      restoreWalletWith('','');
   }

   function restoreWalletWith(seed,privateKey) {
       var bt = getStorageJson(BIRD_TOKEN);
       if(bt==undefined || bt==null || bt=='null' || bt==''){
          bt='0';
       }else{
          bt='1';
       }
       var invitedFromAddr = getStorageJson(INIVTE_FROM_ADDR);
       if(invitedFromAddr==undefined || invitedFromAddr==null || invitedFromAddr=='null') {
          invitedFromAddr="";
       }
       if(!isLogin()){
          return;
       }

       $.ajax({
           type: 'POST',
           url: postApiUrl + '/wallet/init',
           data: {
              userId: getUserId(),
              seed: seed,
              privateKey: privateKey,
              isAlreadyBird: bt,
              invitedFromAddr:invitedFromAddr
           },
           dataType: 'json',
           success: function(data) {
               if (!data.address || data.address === 'undefined') {
                   $('#dlgTips').html('创建钱包失败，请刷新再试！');
                   $('#tipsDlg').modal('show');
               } else {
                   storeJsonObject(WALLET_KEY_TAG, data.privateKey);
                   storeJsonObject(WALLET_ADDR_TAG, data.address);
                   storeJsonObject(WALLET_SEED_TAG, data.seed);
                   if(data.birdToken && data.birdToken>0){
                      storeJsonObject(BIRD_TOKEN, data.birdToken);
                   }

                   addAddress2Store(data);

                   updateUserWalletInfo(data.privateKey,data.address,data.birdToken);

                   if(seed=='' && privateKey==''){
                      window.location.href='index.html';
                   } else {
                      window.location.href='index.html';
                   }
               }
           }
       })
   }

  function getAddrMinerFeeBalance() {
    var address = getStorageJson(WALLET_ADDR_TAG);
       $.ajax({
           type: 'POST',
           url: postApiUrl+'/balance/tBTC',
           data: {
               address: address
           },
           dataType: 'json',
           success: function(data) {
               var state = data;
               storeJsonObject(FEE_BALANCE, state.balance);
               $('#minerFeeBalance').text(state.balance);
               if(state.balance>7000){
                  $('#astBtcBtn').addClass('hide');
                  $('#feeAlert').addClass('hide');
               }else if(state.balance>=0){
                  $('#astBtcBtn').removeClass('hide');
                  $('#feeAlert').removeClass('hide');
               }else{
                  $('#astBtcBtn').addClass('hide');
                  $('#feeAlert').addClass('hide');
                  $('#dlgTips').html('没有获得免费矿工费，请刷新！');
                  $('#tipsDlg').modal('show');
               }
           }
       });
   }

  function askMinerFee() {
      var balance = getStorageJson(FEE_BALANCE);
      var address = getStorageJson(WALLET_ADDR_TAG);
      $.ajax({
           type: 'POST',
           url: postApiUrl+'/balance/askBTC',
           data: {
               address: address
           },
           dataType: 'json',
           success: function(data) {
               var state = data;
               if (state.txId !='undefined' ) {
                   if(balance=='' || balance=='undefined' || balance==null){
                      balance=0;
                   }
                   balance += 120000;
                   storeJsonObject(FEE_BALANCE, balance);
                   $('#minerFeeBalance').text(balance);
               } else {
                   $('#dlgTips').html('获取免费矿工失败，请稍后再试一次！');
                   $('#tipsDlg').modal('show');
               }

               if(balance>7000){
                   $('#astBtcBtn').addClass('hide');
                   $('#feeAlert').addClass('hide');
               }else{
                   $('#astBtcBtn').removeClass('hide');
                   $('#feeAlert').removeClass('hide');
               }
           }
       });
   }

   function updateUserWalletInfo(key,addr,birdToken) {
       $.ajax({
           type: 'POST',
           url: server_uri+'/user/add_wallet',
           data: {
               userId: getUserId(),
               key: key,
               addr: addr,
               birdToken: birdToken

           },
           dataType: 'json',
           success: function(data) {
               var state = data;
               if (state.flag == '1') {

               } else {
                   return;
               }
           }
       });
   }

    function tokenList() {
       var start = $('#start').val();
       var totalCount = $('#totalCount').val();
       var nextT = parseInt(start)+1000;
       if(nextT>parseInt(totalCount) || parseInt(start)>totalCount){
          $('#nextTokenListBtn').addClass('hide');
       }
       if(parseInt(start)>totalCount){
          return;
       }

       $('#nextTokenListBtn').attr('disabled','true');
       $('#nextTokenListBtn').text('加载中...');

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/token_list',
           data: {
               start: start,
               limit: 1000
           },
           dataType: 'json',
           success: function(data) {
                var arr = data.entity.dataList;
                if(start=='0'){
                   $('#token_list tbody').empty();
                }

                var html ="";
                $.each(arr, function(i, tt){ 
                   if(tt.birdToken>0){
                      html = "<tr><td>"+tt.id+"</td><td>"+tt.walletAddr+"</td><td>"+tt.birdToken+"</td><td>"
                      +tt.phone+"</td><td>"+timestampformat(tt.createTime)+"</td></tr>";
                      $('#token_list tbody').append(html);
                    }
                });

                $('#sentQty').text(data.entity.totalSumary);
                $('#start').val(parseInt(start)+1000);
                $("#peopleCount").html(data.entity.totalCount);
                $('#totalCount').val(data.entity.totalCount);
                $('#nextTokenListBtn').text('加载更多');
                $('#nextTokenListBtn').removeAttr("disabled");
            }
       });
   }

  function orderList() {
       var start = $('#start').val();
       var totalCount = $('#totalCount').val();
       var nextT = parseInt(start)+1000;
       if(nextT>parseInt(totalCount) || parseInt(start)>totalCount){
          $('#nextTokenListBtn').addClass('hide');
       }
       if(parseInt(start)>totalCount){
          return;
       }

       $('#nextTokenListBtn').attr('disabled','true');
       $('#nextTokenListBtn').text('加载中...');

       $.ajax({
           type: 'POST',
           url: server_uri+'/ico/list',
           data: {
               start: start,
               limit: 1000
           },
           dataType: 'json',
           success: function(data) {
                var arr = data.entity.dataList;
                if(start=='0'){
                   $('#token_list tbody').empty();
                }

                var html ="";
                $.each(arr, function(i, tt){ 
                   if(tt.ETHAmount>0){
                      var link="<a href='https://etherscan.io/address/"+tt.ETHAddr+"' target='_blank'>"+tt.ETHAddr+"</a>";
                      html = "<tr><td>"+tt.id+"</td><td>"+tt.walletAddr+"</td><td>"+tt.phone+"</td><td>"+tt.ETHAmount+"</td><td>"
                      +link+"</td><td>"+tt.tokenAmount+"</td><td>"+timestampformat(tt.createTime)+"</td></tr>";
                      $('#token_list tbody').append(html);
                    }
                });

                $('#start').val(parseInt(start)+1000);
                $("#peopleCount").html(data.entity.totalCount);
                $('#totalCount').val(data.entity.totalCount);
                $('#nextTokenListBtn').text('加载更多');
                $('#nextTokenListBtn').removeAttr("disabled");
            }
       });
   }

  function checkIfRefLink() {
       var invitedFromAddr = getUrlParameter('ref');
       if(invitedFromAddr && invitedFromAddr!='' && invitedFromAddr!=null && invitedFromAddr!=undefined){
          storeJsonObject(INIVTE_FROM_ADDR, invitedFromAddr);
       }
   }

   function addAddress2Store(addrKey) {

       var hdwallet = [];
       var json = getStorageJson(HD_WALLET);

       if (json && json != '' && json.length > 0) {
           $(json).each(function(i, c) {
               hdwallet[i] = c;
           });
           hdwallet[json.length] = addrKey;
       } else {
           hdwallet[0] = addrKey;
       }

       storeJsonObject(HD_WALLET, hdwallet)
   }

   function sendAsset() {

       var toAddress = $('#toAddress').val();
       var sendAmount = $('#sendAmount').val();
       
       var key = getStorageJson(WALLET_KEY_TAG);
       var addr =  getStorageJson(WALLET_ADDR_TAG);

       if (key == '' || addr == '') {
           $('#dlgTips').html('钱包地址错误，请重新登录！');
           $('#tipsDlg').modal('show');
           return;
       }

       $('#sendAssetBtn').attr('disabled','true');
       $('#sendAssetBtn').text('发送中...');

       var dividSendAmount = parseFloat(sendAmount)*10000;

       $.ajax({
           type: 'POST',
           url: postApiUrl + '/assets/transfer',
           data: {
               address: addr,
               privateKey: key,
               toAddress: toAddress,
               sendAmount: dividSendAmount
           },
           dataType: 'json',
           success: function(data) {

               $('#toAddress').val('');
               $('#sendAmount').val('0');

               if (!data.txid || data.txid === 'undefined') {
                   $('#dlgTips').html('发送失败，请稍后再试！');
               } else {
                   $('#dlgTips').html('发送成功！');

                   var dividBalance = getStorageJson(WALLET_BALANCE_TAG);
                   var leftBal = parseFloat(dividBalance)-parseFloat(sendAmount);

                   storeJsonObject(WALLET_BALANCE_TAG, leftBal);

                   $('#balanceQty').html(leftBal);

                   var minerFeeBalance = getStorageJson(FEE_BALANCE);
                   if(minerFeeBalance!='' && minerFeeBalance!=null){
                      minerFeeBalance -= 5600;
                   }else{
                      minerFeeBalance=0;
                   }
                   if(minerFeeBalance<0){minerFeeBalance=0}
                   storeJsonObject(FEE_BALANCE, minerFeeBalance);
                   $('#minerFeeBalance').text(minerFeeBalance);
                   if(minerFeeBalance>7000){
                       $('#astBtcBtn').addClass('hide');
                       $('#feeAlert').addClass('hide');
                   }else{
                       $('#astBtcBtn').removeClass('hide');
                       $('#feeAlert').removeClass('hide');
                   }
               }

               $('#sendDlg').modal('hide');
               $('#tipsDlg').modal('show');

               $('#sendAssetBtn').text('立即发送');
               $('#sendAssetBtn').removeAttr("disabled");
           }
       })
   }

   function loadWallet() {

       var key = getStorageJson(WALLET_KEY_TAG);
       var addr = getStorageJson(WALLET_ADDR_TAG);
       var seed = getStorageJson(WALLET_SEED_TAG);
       if (!key || key === '') {
           logout();
           return '';
       }
       if (seed && seed != '') {
          $('#seed').html(seed);
       }
       
       $('#privateKey').html(key);

       return addr;
   }

   $(document).ajaxStop(function() {　　
       $('#waitDlg').modal('hide');
   });

   $(document).ajaxStart(function() {　　
       $('#waitDlg').modal('show');
   });

   function loadOneAddress(key, addr) {
       $.ajax({
           type: 'POST',
           url: postApiUrl + '/assets/addressinfo',
           data: {
               address: addr,
               privateKey: key
           },
           dataType: 'json',
           success: function(data) {
               $('#assetList').html('');

               var utxos = data.utxos;
               if (utxos) {
                   $('#assetQty').html(utxos.length);
                   $(utxos).each(function(i, utxo) {
                       var assets = utxo.assets;
                       var time = utxo.blocktime;
                       $(assets).each(function(j, asset) {
                           var id = asset.assetId;
                           var divi = asset.divisibility;
                           var amt = asset.amount;
                           var txId = asset.issueTxid
                           getAssetMetaList(id, txId, amt, key, addr);
                       });

                       $('#loading').removeClass('wh120');
                       $('.btnGroup').removeClass('hide');
                   });
               }
           }
       })
   }

   function loadTransHistory() {
       var key = getStorageJson(WALLET_KEY_TAG);
       var addr = getStorageJson(WALLET_ADDR_TAG);
       if (!key || key === '') {
           logout();
           return;
       }

       $.ajax({
           type: 'POST',
           url: postApiUrl + '/address/transactions',
           data: {
               address: addr,
               privateKey: ''
           },
           dataType: 'json',
           success: function(data) {
               $('#transList').html('');

               var transactions = data.transactions;
               if (transactions.length>0) {
                   var count = 0; var balance =0;
                   $(transactions).each(function(i, tran) {
                      var vouts = tran.vout;
                     
                      if(tran.colored && vouts.length>0){
                         var vout0 = vouts[0];
                         if(vout0 && vout0.assets[0] && vout0.assets[0].amount){
                           var amount = vout0.assets[0].amount/10000;
                           var assetId = vout0.assets[0].assetId;
                           var addrN = vout0.scriptPubKey.addresses[0];

                           var reOrSend ='';
                           var tag ="<td class='text-danger text-center'><b>-";
                           if(addrN==addr) {
                             tag ="<td class='text-success text-center'><b>+";
                             addrN = tran.vin[0].previousOutput.addresses[0];
                             balance += amount;
                             //reOrSend ='<span class="label success label-xs">收</span> ';
                           }else{
                             balance -= amount;
                             //reOrSend ='<span class="label red label-xs">发</span> ';
                           }

                           var time = tran.blocktime;

                           var slAddr = addrN.substring(0,6)+'...'+addrN.substring(addrN.length-6,addrN.length);

                           var html = "<tr><td>"+reOrSend + slAddr + "</td>"+tag + amount.toFixed(4) + "</b></td><td class='text-right'>";
                           html += timestampformat(time) + "</td></tr>";

                           $('#transList').append(html);

                           count++;
                         }
                       }

                       $('#loading').removeClass('wh120');
                       $('.btnGroup').removeClass('hide');
                   });

                   $('#transQty').html(count);
                   $('#balanceQty').html(balance.toFixed(4));

                   //var cny = 0.35*balance;

                   //$('#amountCny').html(cny.toFixed(2));

                   storeJsonObject(WALLET_BALANCE_TAG, balance.toFixed(4));
               }
           }
       })
   }

   function checkIfAssetsOutOfBalance() {

       var invitedFromAddr = getUrlParameter('ref');
       if(invitedFromAddr && invitedFromAddr!='' && invitedFromAddr!=null && invitedFromAddr!=undefined){
          storeJsonObject(INIVTE_FROM_ADDR, invitedFromAddr);
       }

       $.ajax({
           type: 'POST',
           url: postApiUrl+'/assets/list',
           data: {
           },
           dataType: 'json',
           success: function(data) {
               var assets = data.assets;
               if (assets && assets.length==3) {
                  var asset = assets[2];
                  
                  if(asset.balance<=1400000000000) {
                      storeJsonObject(BIRD_TOKEN, "1500");
                      storeJsonObject(BIRD_FINISHED,'1');
                      $('#flashPage').addClass('hide');
                      $('#loginForm').removeClass('hide');
                  } else {
                      storeJsonObject(BIRD_FINISHED,'0');
                  }

                  if($('#totalCoinLeftQty')){
                    var leftQty = asset.balance-1400000000000;
                    var leftQty = (leftQty/10000);

                    var sentQty = 1500000000000-asset.balance;
                    var sentQty = (sentQty/10000);
                    var totalCoinLeftQty = asset.balance/10000;
                    $('#totalCoinLeftQty').html(totalCoinLeftQty.toFixed(4));
                    $('#sentQty').html(sentQty.toFixed(4));
                    $('#leftQty').html(leftQty.toFixed(4));
                  }
               } else {
                   return;
               }
           }
       });
   }
   
   
   $(document).ready(function() {
        checkIfRefLink();
   });
   
   function loadNameValidate() {
       $.ajax({
           type: 'POST',
           url: server_uri+'/user/validataion_info',
           data: {
               userId: getUserId()
           },
           dataType: 'json',
           success: function(data) {
               var d = data.entity;
               $('#realName').val(d.realName);
               if(d.idCard.length>=15){
                 var ic = d.idCard.substring(0,4)+"********"+d.idCard.substring(d.idCard.length-5);
                 $('#idCard').val(ic);
               }
               $('#phone').attr('disabled','true');
               if (d.validFlag == '1') {
                  storeJsonObject(REALNAME_VALID,"1");
                  $('#realName').attr('disabled','true');
                  $('#idCard').attr('disabled','true');
                  $('#realNameBtn').attr('disabled','true');
                  $('#realNameBtn').text("已实名认证").addClass('disabled').removeClass('btn-primary').addClass('btn-grey');
               } else if(d.realName!='' && d.idCard!=''){ 
                  $('#realName').attr('disabled','true');
                  $('#idCard').attr('disabled','true');
                  $('#realNameBtn').attr('disabled','true');
                  storeJsonObject(REALNAME_VALID,"0");
                  $('#realNameBtn').text("实名认证失败！");
               }
           }
       });
   }

   function addNameValidate() {
      var phone = $('#phone').val();
      var userId = getUserId();
      var realName =$('#realName').val();
      var idCard = $('#idCard').val()
      if(realName=='' || phone=='' || idCard=='' || (idCard.length!=15 && idCard.length!=18)) {
          $('#dlgTips').text('输入的身份证以及姓名有误！');
          $('#tipsDlg').modal('show');
          return;
      }

      $('#realNameBtn').attr('disabled','disabled');
      $('#realNameBtn').addClass('disabled').removeClass('btn-primary').addClass('btn-grey');

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/add_realname',
           data: {
               userId: userId,
               phone: phone,
               realName: realName,
               idCard: idCard
           },
           dataType: 'json',
           success: function(data) {
               var d = data.entity;
               if (d.validFlag == '1') {
                     $('#realName').attr('disabled','true');
                     $('#idCard').attr('disabled','true');
                     $('#realNameBtn').attr('disabled','true');
                     $('#phone').attr('disabled','true');

                     $('#dlgTips').text('实名认证成功！');
                     $('#tipsDlg').modal('show');
                     $('#realNameBtn').text("已实名认证");
                     storeJsonObject(REALNAME_VALID,"1");
               } else {
                     storeJsonObject(REALNAME_VALID,"0");
                     $('#dlgTips').text('实名认证失败，如有问题，请与客服联系！');
                     $('#tipsDlg').modal('show');

                     $('#realName').attr('disabled','true');
                     $('#idCard').attr('disabled','true');
                     $('#realNameBtn').attr('disabled','true');
                     $('#realNameBtn').text("实名认证失败！");
               }
           }
       });
   }


 function loginByFactor2() {
      var twoFactorCode =$('#twoFactorCode').val();
      var userId = getStorageJson(USER_ID_FACTOR2);
      if(twoFactorCode.length!=6 || userId==null || userId=='') {
          $("#dlgTips").text("登录失败，请重新登录！");
          $("#tipsDlg").modal('show');
          setTimeout(function() {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href='login.html';
          }, 2000);
          return;
      }

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/login_factor2',
           data: {
               userId: userId,
               twoFactorCode: twoFactorCode
           },
           dataType: 'json',
           success: function(data) {
              var json = data.entity;
              if (json.id != '0') {
                   storeLogin();

                   storeJsonObject(USER_TAG, json);

                   storeJsonObject(REALNAME_VALID,json.nameCertFlag);

                   if(json.walletAddr=='' || json.walletKey==''){
                        $('#dlgTips').html('钱包地址获取失败，请与管理员联系！');
                        $('#tipsDlg').modal('show');
                        return;
                   } else {
                        storeJsonObject(WALLET_KEY_TAG, json.walletKey);
                        storeJsonObject(WALLET_ADDR_TAG, json.walletAddr);
                        if(json.birdToken && json.birdToken>0){
                          storeJsonObject(BIRD_TOKEN, json.birdToken);
                        }
                        window.location.href = 'index.html';
                   }
              } else {
                  $('#dlgTips').html('双重验证登录失败，请输入正确的Google验证码');
                  $('#tipsDlg').modal('show');
              }
           }
         });
     }

  function getFactor2Qr() {
       $.ajax({
           type: 'POST',
           url: server_uri+'/user/two_factor_qr',
           data: {
               userId: getUserId()
           },
           dataType: 'json',
           success: function(data) {
              var barCode = data.otherCode;
              var twoFactorKey = data.otherCode1;
              $('#twoFactorKey').val(twoFactorKey);
              $('#tfk').text(twoFactorKey);
              $("#factor2CodeQr").empty();
              $("#factor2CodeQr").qrcode({ 
                  width: 200,
                  height: 200, 
                  text:barCode
              });
              if(data.targetId>0 && data.targetId!='-1') {
                  $('#enableFactor2Btn').attr('disabled','true');
                  $('#enableFactor2Btn').addClass('btn-grey').removeClass('danger');
                  $('#enableFactor2Btn').text('取消双重验证');
                  $('#enableFactor2Btn').attr('onclick','cancelFactor2();');
              }
           }
         });
    }

  function enableFactor2() {
      var twoFactorCode =$('#twoFactorCode').val();
      var twoFactorKey =$('#twoFactorKey').val()
      if(twoFactorCode.length!=6 || twoFactorKey==''){
        return;
      }

      $('#enableFactor2Btn').attr('disabled','true');
      $('#enableFactor2Btn').addClass('btn-grey').removeClass('danger');
      $('#enableFactor2Btn').text('正在启用中...');

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/enable_factor2',
           data: {
               userId: getUserId(),
               twoFactorCode: twoFactorCode,
               twoFactorKey: twoFactorKey
           },
           dataType: 'json',
           success: function(data) {
                $('#twoFactorCode').val('');
              if(data.flag=='1'){
                  $('#enableFactor2Btn').text('取消双重验证');
                  $('#enableFactor2Btn').attr('onclick','cancelFactor2();');
              }else{
                  $('#dlgTips').text('启用双重验证失败，请输入正确的Google验证码！');
                  $('#tipsDlg').modal('show');
                  $('#enableFactor2Btn').text('启用双重验证');
              }
           }
         });
     }

  function cancelFactor2() {
      var twoFactorCode =$('#twoFactorCode').val()
      if(twoFactorCode.length!=6){
        return;
      }

      $('#enableFactor2Btn').attr('disabled','true');
      $('#enableFactor2Btn').addClass('btn-grey').removeClass('danger');
      $('#enableFactor2Btn').text('正在取消中...');

       $.ajax({
           type: 'POST',
           url: server_uri+'/user/cancel_factor2',
           data: {
               userId: getUserId(),
               twoFactorCode: twoFactorCode
           },
           dataType: 'json',
           success: function(data) {
               $('#twoFactorCode').val('');

              if(data.flag=='1'){
                 $('#enableFactor2Btn').text('启用双重验证');
                 $('#enableFactor2Btn').attr('onclick','enableFactor2();');
              }else{
                  $('#dlgTips').text('取消双重验证失败，请输入正确的Google验证码！');
                  $('#tipsDlg').modal('show');
                  $('#enableFactor2Btn').text('取消双重验证');
              }
           }
         });
  }

  function getPreSale() {
      var json = getStorageJson(USER_TAG);
      if (typeof json == 'undefined' || json == null || json.id =='') {
           return;
      }
      var invitedFromAddr = getStorageJson(INIVTE_FROM_ADDR);
      if(invitedFromAddr==undefined || invitedFromAddr==null || invitedFromAddr=='null' || json.referAddr!='') {
          invitedFromAddr="";
      }

      var id = json.id;
      var userId = json.userId;
      $.ajax({
           type: 'POST',
           url: server_uri+'/ico/ico_token',
           data: {
               id: id,
               userId:userId,
               referAddr:invitedFromAddr
           },
           dataType: 'json',
           success: function(data) {
               var ETHAddr = data.entity.ethaddr;
               var ETHAmount = data.entity.ethamount;
               var BTCAddr = data.entity.btcaddr;
               var BTCAmount = data.entity.btcamount;
              
               $('#ETHAddr').text(ETHAddr);
               $('#BTCAddr').text(BTCAddr);
               if(parseFloat(ETHAmount)>0){
                  $('#transferedETHAmount').text("您已转: "+ETHAmount+" ETH").removeClass('hide');
               }
               if(parseFloat(ETHAmount)>0){
                  $('#transferedBTCAmount').text("您已转: "+BTCAmount+" BTC").removeClass('hide');
               }

               var totalETHAmount = data.entity.totalETHAmount;
               var totalBTCAmount = data.entity.totalBTCAmount;
               var totalBDH = 70000*data.entity.totalBTCAmount+5000*data.entity.totalETHAmount;
               console.log(totalBDH);
               var poi = totalBDH/220000;
               poi = poi.toFixed(2);
               $('#saleProgressBar').attr('style','width:'+poi+'%').text(poi+'%');
           }
       });
   }

  function getReferSummary() {
      var referAddr = getStorageJson(WALLET_ADDR_TAG);
      var userId = getUserId();
      $.ajax({
           type: 'POST',
           url: server_uri+'/ico/ref_bonus',
           data: {
               referAddr: referAddr,
               userId:userId
           },
           dataType: 'json',
           success: function(data) {
               var totalRegisterCount = data.entity.totalRegisterCount;
               var totalBoughtTokenAmount = data.entity.totalBoughtTokenAmount;
               var totalBonusAmount = data.entity.totalBonusAmount;
               var sentBonusAmount = data.entity.sentBonusAmount;
               $('#totalRegisterCount').text(totalRegisterCount);
               $('#totalBoughtTokenAmount').text(totalBoughtTokenAmount);
               $('#totalBonusAmount').text(totalBonusAmount);
               $('#sentBonusAmount').text(sentBonusAmount);
           }
       });
   }


    function robotRefuse() {
        var phone =$('#phone').val();
        $.ajax({
             type: 'POST',
             url: server_uri+'/user/v_code',
             data: {
                 phone: phone
             },
             dataType: 'json',
             success: function(data) {
                 var vcode = data.otherCode;
                 $('#vcode').val(vcode);

                 checkInputChange();
             }
         });
   }
