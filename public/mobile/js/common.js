window.mt = {};

mt.loginAjax = function (params) {


    $.ajax({
        url:params.url,
        type:params.type,
        data:params.data,
        dataType:params.dataType,
        beforeSend:params.beforeSend,
        success:function (data) {
            if( data.error==400 ){
                location.href = 'user/login.html?back='+location.href
                return false;
            }
            else {
                params.success&&params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙')
        }
    })
};
var getLocUrl = function () {
    var params = {};
    var searchUrl = location.search;
    if( searchUrl.indexOf('?')==0 ){
        searchUrl=searchUrl.substr(1);
        var arr = searchUrl.split('&');
        for (var i =0;i<arr.length;i++){
            var itemArr = arr[i].split('=');
            params[itemArr[0]] = itemArr[1];
        }
    }
    return params;
};