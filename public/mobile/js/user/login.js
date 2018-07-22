$(function () {

    $('.btn_login').on('tap',function () {
        var data = $('form').serialize();
        var userArr = data.split('&');
        var userObj = {}
        for (var i =0;i<userArr.length;i++){
            var item = userArr[i].split('=');
            userObj[item[0]] = item[1];
        }
        console.log(userObj);
        if(!userObj.username){
            mui.toast('请输入用户名');
            return false;
        }
        if(!userObj.password){
            mui.toast('请输入密码');
            return false;
        }
        $.ajax({
            url:'/user/login',
            type:'post',
            data:userObj,
            dataType:'json',
            success:function (data) {
                if(data.success ==true){
                    var backUrl = location.search;
                    backUrl = backUrl.replace('?back=','');
                    // console.log(backUrl)
                    if(backUrl){
                        location.href=backUrl;
                    }
                    else {
                        location.href='index.html';
                    }
                }
                else {
                    mui.toast('登录错误，请重试')
                }
            }
        })


    })




});
