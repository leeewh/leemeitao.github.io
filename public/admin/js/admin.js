

NProgress.configure({ showSpinner : false})
$(window).ajaxStart(function () {
    console.log(1)
    NProgress.start();
});
$(window).ajaxComplete(function () {
    NProgress.done();
})

$('.glyphicon-align-justify').on('click',function () {
    $('.adm_left').toggle();
    $('.adm_right').toggleClass('adm_menu')
});
$('.left_cate').on('click',function () {
    $('.child').slideToggle();
});
// $('.glyphicon-log-out').on('click',function () {
//     $('.modal').toggle();
// })


var modalHtml = '<div class="modal fade" id="logModal">'+
    '    <div class="modal-dialog  modal-sm">'+
    '        <div class="modal-content">'+
    '            <div class="modal-header">'+
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"></button>'+
    '                <h4 class="modal-title">温馨提示</h4>'+
    '            </div>'+
    '            <div class="modal-body">'+
    '                <p style="color: red"><span class="glyphicon glyphicon-info-sign"></span>您确定要退出后台管理系统吗？</p>'+
    '            </div>'+
    '            <div class="modal-footer">'+
    '                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
    '                <button type="button" class="btn btn-primary">确定</button>'+
    '            </div>'+
    '        </div>'+
    '    </div>'+
    '</div>';

$('body').append(modalHtml);

$('.glyphicon-log-out').on('click',function () {
    var logModal = $('#logModal');
    logModal.find('.btn-primary').on('click',function () {
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            data:'',
            dataType:'json',
            success:function (data) {
                if(data.success == true){
                    logModal.modal('hide');
                    location.href = 'login.html'
                }
            }
        })
    })
})
template.helper('getJquery',function () {
    return jQuery;
})