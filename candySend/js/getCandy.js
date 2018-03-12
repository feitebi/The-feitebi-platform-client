$(function(){
        $('.confirm').submit(function(){
            var tel = $('#getTel').val();
            var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
            if (!reg.test(tel)||tel==false){
                $('.getErr').show()
            }else{
                $('.getErr').hide()
                $.post('',{tel:tel},function(data){
                    if (!data.errno) {
                        window.location.href = 'installCandy.html';
                    }else{
                        $('.getErr').show()
                    }
                    
                })
            }
            return false
        })
})