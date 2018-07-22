$(function () {
    getLeftCate(function (data) {
        $('.mt_left ul').html(template('mt_cate_left',data))
        getRightCate({id: data.rows[0].id}, function (data) {
            if(data.total=0){
                $('.mt_right').find('ul').html('没有获取到数据')
            }else {
                $('.mt_right').find('ul').html(template('mt_cate_right', data))
            }

        });
    })

    cateTap();

});

var getLeftCate = function (callback) {
    $.ajax({
        type: 'get',
        url:'/category/queryTopCategory',
        data:'',
        dataType:'json',
        success:function (data) {
            console.log(data);
            callback&&callback(data);
        }
    })
}

var getRightCate = function (params,callback) {
    $.ajax({
        type: 'get',
        url:'/category/querySecondCategory',
        data:params,
        dataType:'json',
        success:function (data) {
            console.log(data);
            callback&&callback(data);
        }
    })
}

var cateTap = function () {
    $('.mt_left ul').on('tap','li',function () {
        if ($(this).hasClass('now')){ return false }
        $(this).parent().find('li').removeClass('now')
        $(this).addClass('now');
        var dataId = $(this).attr('data-id');
        getRightCate({id: dataId}, function (data) {
            if(data.rows.length<=0){
                $('.mt_right').find('ul').html('没有获取到数据')
            }else {
                $('.mt_right').find('ul').html(template('mt_cate_right', data))
            }
        });
    })
}

