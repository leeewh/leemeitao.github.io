$(function () {
    var id = {id:getLocUrl().id};
    console.log(id)
    getDetail(id,function (data) {
        console.log(data)
        $('.mui-scroll').html(template('mt_detail',data))
    })
    var changeNum = function () {
        $('body').on('tap','.mui-btn',function () {
            var $input = $(this).siblings('input');
            var curr = parseInt($input.val());
            var max = $input.parent().attr('data-numbox-max');
            // console.log(max)
            if($(this).hasClass('mui-btn-numbox-minus')){
                if(curr==0){
                    mui.toast('不能更少了！');
                    return false;
                }
                curr--;
            };
            if($(this).hasClass('mui-btn-numbox-plus')){
                if(curr>=max){
                    mui.toast('没有更多库存了！');
                    return false;
                };
                curr++;
            };
            // console.log(curr)
            $input.val(curr)
        })
    };

    changeNum();


    var choose = function () {
        $('body').on('tap','.size',function () {
            $(this).addClass('now').siblings().removeClass('now')
        })
    }
    choose();

    var addCart = function () {
        $('.mui-btn-danger').on('tap',function () {
            var num =$('.mui-btn').siblings('input').val();
            var size = $('.size.now').html()
            var data = {
                productId :id.id,
                size: size,
                num:num
            }
            console.log(data)
            if(window.addCarting){
                return false;
            };
            if (!data.size){
                mui.toast('请选择尺码！');
                return false
            };
            if($('.mui-btn').siblings('input').val()==0){
                mui.toast('请选择数量！');
                return false
            };
            mt.loginAjax({
                url:'/cart/addCart',
                type:'post',
                data:data,
                dataType:'json',
                beforeSend:function(){
                    window.addCarting = true;
                },
                success:function (data) {
                    if(data.success){
                        mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
                            if (e.index == 0) {
                                /*按了第一个按钮*/
                                location.href = 'user/cart.html';
                            } else {

                            }
                        });
                    }
                    else{
                        mui.toast('添加失败，请重试！');
                    }
                    window.addCarting = false;
                },
                error:function(){
                    mui.toast('网络繁忙！');
                    window.addCarting = false;
                }
            })
        })
    }

    addCart();

})

var getDetail = function (id,callback) {
    $.ajax({
        url:'/product/queryProductDetail',
        type:'get',
        data:id,
        dataType:'json',
        success:function (data) {
            callback&&callback(data)
        }
    })
}



