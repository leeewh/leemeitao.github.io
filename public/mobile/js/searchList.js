$(function () {
    var key = $.trim(getLocUrl().key) || '';
    $('.mt_searchBar input').val(key);
    var page = 1;
    var pageSize = 4;

    // 渲染页面
    var render = function (key,callback) {
        var order = $('[data-order].now').attr('data-order');
        var value = $('[data-order].now').find('span').hasClass('fa-angle-down')?2:1;
        var ordObj = {};
        if(order){
            ordObj[order] = value;
        }

        var params = {
            proName:key,
            page:page,
            pageSize:pageSize
        };
        $.extend(params,ordObj);
        // console.log(params)
        getProData(params,function (data) {
            if(page ===1){
                $('.mt_pro_con').html(template('mt_pro',data))
            }else {
                $('.mt_pro_con').append(template('mt_pro',data))
            }
            $('.mt_pro_con a').on('tap',function () {
                console.log(1)
                location.href = 'product.html?id='+$(this).attr('data-id')
            });
        })
        callback&&callback();
    }
    render(key);


    //当前页面搜索

    var search = function () {
        $('.mt_content .mt_searchBar a').on('tap',function () {
            var key = $.trim($('.mt_content .mt_searchBar input').val());
            if(!key){
                mui.toast('请输入搜索内容');
                return false;
            }
            page = 1;
            console.log(key);
            $('.mt_order').find('a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            render(key);
        });
    }
    search();
    // 排序功能
    var setOrder = function () {
        $('.mt_order').find('a').on('tap',function () {
            if($(this).hasClass('now')){
                if($(this).find('span').hasClass('fa-angle-down')){
                    $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
                }
                else if($(this).find('span').hasClass('fa-angle-up')){
                    $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
                }
            }
            $(this).addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            render(key);
        })
    }

    setOrder();

    // 上拉刷新下拉加载

    mui.init({
        pullRefresh : {
            container: ".mui-scroll-wrapper",
            down: {
                callback: function () {

                    var that = this;
                    page = 1;

                    render(key, function () {

                        that.endPulldownToRefresh();
                    });
                }
            },
            up : {
                callback:function(){

                    var that = this;
                    // setTimeout(function(){
                    //
                    //     that.endPullupToRefresh();
                    // },800);


                    page ++;

                    render(key,function(){
                        that.endPullupToRefresh();
                    });
                }
            }
        }

    });


})

var getProData = function(params,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:params,
        dataType:'json',
        success:function(data){
            /*模拟一下加载时间*/
            setTimeout(function(){
                if(data.data.length == 0) mui.toast('没有相关商品');
                callback && callback(data);
            },800);
        }
    });
}

