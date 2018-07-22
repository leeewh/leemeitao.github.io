$(function () {
    $('.mt_history_content ul').html(template('history_list',{model:getHistory()}))
    $('.mt_content .mt_searchBar input').val('');
    $('.mt_content .mt_searchBar a').on('tap',function () {
        var key = $.trim($('.mt_content .mt_searchBar input').val());
        if(!key){
            mui.toast('请输入搜索内容');
            return false;
        }

        setHistory(key);
        $('.mt_history_content ul').html(template('history_list',{model:getHistory()}));
        $('.mt_content .mt_searchBar input').val('');
        location.href = 'searchList.html?key='+key;
    });
    // $('.icon_delete').on('tap',function () {
    //     var value = $(this).parent().find('[data-key]').attr('data-key');
    //     removeHistory(value);
    //     $('.mt_history_content ul').html(template('history_list',{model:getHistory()}))
    // });
    $('body').on('tap','.icon_delete',function(){
        /*删除*/
        removeHistory($(this).parent().find('[data-key]').attr('data-key'));
        $('.mt_history_content ul').html(template('history_list',{model: getHistory()}));
    }).on('tap','.icon_clear',function () {
        var list = getHistory()
        $.each(list,function (i,item) {
            removeHistory(item)
        })
        $('.mt_history_content ul').html(template('history_list',{model:getHistory()}))
    })
    

})
var getHistory = function () {
    return JSON.parse(localStorage.getItem('meitaosousuolishi')||'[]')
}
var setHistory = function (key) {
    var list = getHistory();
    $.each(list,function (i,item) {
        if(key==item){
            list.splice(i,1);
        }
    })
    list.push(key);
    localStorage.setItem('meitaosousuolishi',JSON.stringify(list))
}
var removeHistory = function (key) {
    var list =getHistory();
    $.each(list,function (i,item) {
        if(item == key){
            list.splice(i,1)
        }
    });
    localStorage.setItem('meitaosousuolishi',JSON.stringify(list))
}