$(function () {
    mui.init({
        /*拉动刷新组件*/
        pullRefresh:{
            container:".mui-scroll-wrapper",
            down:{
                auto:true,
                callback:function(){
                    var that = this;
                    getCartData(function(data){
                        $('.mui-scroll').html(template('cartTem',data));
                        that.endPulldownToRefresh();
                    })
                }
            }
        }
    });
    
    mui('.mui-scroll-wrapper').scroll({
        scrollY:true,
        scrollX:true,
        bounce: true ,//是否启用回弹
        indicators: false, //是否显示滚动条
    });

    //按钮刷新功能

    $('.fa-refresh').on('tap',function () {
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    });

    //修改购物车商品

    $('body').on('tap','.mt_cart_edit span',function () {
        $(this).addClass('now').siblings().removeClass('now')
    }).on('tap','.mui-numbox button',function () {
        var value = parseInt($('.mui-numbox input').val()) ;
        var max = $('.mui-numbox').attr('data-numbox-max');
        if($(this).hasClass('mui-btn-numbox-plus')){
            if(value>=max){
                mui.toast('没有更多库存了')
                return false
            }
            value ++;
        };
        if($(this).hasClass('mui-btn-numbox-minus')){
            if(value<=1){
                return false
            }
            value--;
        };
        $('.mui-numbox input').val(value);
    });
    $('body').on('tap','.mui-icon-compose',function () {
        var data = this.dataset;
        console.log(data);
        mui.confirm(template('edit',data).replace(/\n/g,''), '编辑商品', ['确定','取消'], function(e) {
            if (e.index == 0) {
                /* 确定之后 发送请求*/
                mt.loginAjax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:data.id,
                        size:$('.mt_cart_edit span.now').html(),
                        num:$('.mui-numbox input').val()
                    },
                    dataType:'json',
                    success:function(data){
                        if(data.success){
                            mui.toast('操作成功');
                            /*2.3 重新渲染*/
                            getCartData(function(data){
                                $('.mui-scroll').html(template('cartTem',data));
                            });
                        }
                    }
                });
            }
        });
    })

    //删除商品

    $('body').on('tap','.mui-icon-trash',function () {
        $(this).parent().parent().remove();
        var id = $(this).attr('data-id');
        console.log(id)
        mt.loginAjax({
            type:'get',
            url:'/cart/deleteCart',
            data:{
                id:id,
            },
            dataType:'json',
            success:function(data){
                if(data.success){
                    mui.toast('删除成功');
                    /*2.3 重新渲染*/
                    // getCartData(function(data){
                    //     $('.mui-scroll').html(template('cartTem',data));
                    // });
                }
            }
        });
    })


    //打勾显示总金额
    $('body').on('change','input',function () {
        setMoney();
    })


})

var getCartData = function (callback) {
    mt.loginAjax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
            page: '1',
            pageSiz : '999'
        },
        dataType : 'json',
        success: function (data) {
            callback&&callback(data)
        }
    })
}

//计算金额
var setMoney = function () {
    var sum = 0;
    $('input:checked').each(function (i,item) {
        var num = $(this).attr('data-price');
        var mul = $(this).attr('data-num');
        num = num*mul;
        sum += num
    });
    if((Math.floor(sum*100))%100==0){
        sum = Math.floor(sum*100)/100+'.00'
        $('.mt_cart span').html(sum);
        return false;
    }
    if(Math.floor(sum*100)%10==0){
        sum = Math.floor(sum*100)/100+'.0';
        $('.mt_cart span').html(sum);
        return false;
    }
    console.log(sum)
    $('.mt_cart span').html(sum)
}