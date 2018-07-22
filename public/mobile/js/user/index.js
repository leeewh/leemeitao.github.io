$(function () {
    getUserData(function (data) {
        $('.mt_userInfo').html(template('userTem',data))
    })
})


var getUserData = function (callback) {
    mt.loginAjax({
        url: '/user/queryUserMessage',
        type:'get',
        data:'',
        dataType:'json',
        success:function (data) {
            setTimeout(function () {
                callback&&callback(data);
            },1000)

        }
    })
}