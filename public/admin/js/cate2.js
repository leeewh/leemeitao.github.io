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
    window.page=1
    var render = function () {
        getCate2(function (data) {
            $('.cate2_table').html(template('cate2',data))
            $('.pagination').bootstrapPaginator({
                bootstrapMajorVersion:3,
                size:'small',
                currentPage:data.page,
                totalPages:Math.ceil(data.total/data.size),
                numberOfPages:4,
                onPageClicked:function (event,originalEvent,type,page) {
                    window.page=page;
                    render();
                }
            })
        });

    }
    render();
    $('.addBtn1').on('click',function () {
        getCate1(function (data) {
            $('.dropdown-menu').html(template('dropDown',data))
        })
        $('#form').data('bootstrapValidator').updateStatus('brandName','INVALID','notEmpty');
        $('#form').data('bootstrapValidator').updateStatus('categoryId','INVALID','notEmpty');
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','INVALID','notEmpty');
    })
    $('.dropdown-menu').on('click','a',function () {
        var value = $(this).html();
        var id = $(this).attr('data-id')
        $('.categoryName').html(value);
        $('[name="categoryId"]').val(id);
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    })

    initFileUpload();
    $('#form').bootstrapValidator({
        /*默认不去校验的表单元素（包含隐藏）*/
        excluded:[],
        /*配置校验的不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*需要校验的表单元素 通过名称 name*/
        fields: {
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传图片'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();

        var $form = $('#form');
        console.log($form.serialize())
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success == true){
                    window.page = 1;
                    render();
                    $('#addModal2').modal('hide');
                }
            }
        });
    });
});

var getCate2 = function (callback) {
    $.ajax({
        url:'/category/querySecondCategoryPaging',
        type:'get',
        data:{
            page:window.page,
            pageSize:4
        },
        dataType:'json',
        success:function (data) {
            callback&&callback(data)
        }
    })
};
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
};
var initFileUpload = function () {
    $('[name="pic1"]').fileupload({
        /*上传地址*/
        url:'/category/addSecondCategoryPic',
        dataType: 'json',
        done: function (e, data) {
            $('#uploadImage').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });
}