$(function () {



    //mui区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        scrollY:true,
        scrollX:true,
        bounce: true ,//是否启用回弹
        indicators: false, //是否显示滚动条
    });
    //图片轮播初始化
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });
})