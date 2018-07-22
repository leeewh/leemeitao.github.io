$(function () {
    $('#login_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            username: {
                message: '用户名验证失败',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 18,
                        message: '用户名长度必须在3到18位之间'
                    },
                    callback:{
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '邮箱地址不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度必须在6到18位之间'
                    },
                    callback:{
                        message: '密码错误'
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        //点击提交之后
        // Prevent form submission
        var $from = $('#login_form');
        e.preventDefault();
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:$('#login_form').serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success ==true){
                    location.href = 'index.html'
                }
                else {
                    if(data.error == 1000){
                        $from.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                    }
                    else if(data.error == 1001){
                        $from.data('bootstrapValidator').updateStatus('password','INVALID','callback')
                    }
                }
            }
        })
    });
});