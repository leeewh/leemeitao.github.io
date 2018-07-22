$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    data:'',
    dataType:'json',
    success:function (data) {
        if(data.error==400){
            location.href='login.html'
        }
        else {
            $('.checkLog').remove();
        }
    }
})



$(function () {
    var render = function() {
        getCate1(function (data) {
            $('.cate1_table').html(template('cate1',data))
        })
    };
    render();
    $('.addSub1').on('click',function () {
        var categoryName=$('[name="cataName1"]').val();
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:{
                categoryName:categoryName
            },
            dataType:'json',
            success:function (data) {
                if(data.success == true){
                    $('[name="cataName1"]').val('');
                    location.href='categoryFirst.html';

                }
            }
        })
    })


    // $('#form').bootstrapValidator({
    //     feedbackIcons: {
    //         valid: 'glyphicon glyphicon-ok',
    //         invalid: 'glyphicon glyphicon-remove',
    //         validating: 'glyphicon glyphicon-refresh'
    //     },
    //     fields: {
    //         cataName1: {
    //             message: '',
    //             validators: {
    //                 notEmpty: {
    //                     message: '一级分类名不能为空'
    //                 },
    //                 stringLength: {
    //                     min: 3,
    //                     max: 6,
    //                     message: '分类名长度必须为3到6个长度'
    //                 }
    //             }
    //         }
    //     }
    // }).on('success.form.bv', function(e) {
    //     //点击提交之后
    //     // Prevent form submission
    //     var $from = $('#login_form');
    //     e.preventDefault();
    //     $.ajax({
    //         url:'/employee/employeeLogin',
    //         type:'post',
    //         data:$('#login_form').serialize(),
    //         dataType:'json',
    //         success:function (data) {
    //             if(data.success ==true){
    //                 location.href = 'index.html'
    //             }
    //             else {
    //                 if(data.error == 1000){
    //                     $from.data('bootstrapValidator').updateStatus('username','INVALID','callback')
    //                 }
    //                 else if(data.error == 1001){
    //                     $from.data('bootstrapValidator').updateStatus('password','INVALID','callback')
    //                 }
    //             }
    //         }
    //     })
    // });

})

var getCate1 = function (callback) {
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        type:'get',
        data:{
            page:1,
            pageSize:10,
        },
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    })
}