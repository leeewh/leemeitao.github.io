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


    var myChart1 = echarts.init(document.getElementById('chart1'));
    var chart1Data = [
        {
            name:'一月',
            value:300
        },
        {
            name:'二月',
            value:400
        },
        {
            name:'三月',
            value:500
        },
        {
            name:'四月',
            value:200
        },
        {
            name:'五月',
            value:600
        }
    ];
    var xData = [];
    var yData = [];
    chart1Data.forEach(function (item,i) {
        xData[i]=item.name;
        yData[i]=item.value;
    })
    option1 = {
        color: ['#3398DB'],
        title:{
            text:'2018年注册人数'
        },
        legend:{
            data:['注册人数']
        },
        tooltip : {
            trigger: 'axis'
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    var myChart2 = echarts.init(document.getElementById('chart2'));
    var chart2Data = []
    option2 = {
        title : {
            text: '品牌销售占比',
            subtext: '2018年6月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['李宁','耐克','阿迪','匡威','回力']
        },
        series : [
            {
                name: '销售情况',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'李宁'},
                    {value:310, name:'耐克'},
                    {value:234, name:'阿迪'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'回力'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    console.log(xData)
    console.log(yData)
    option1.xAxis[0].data = xData;
    option1.series[0].data = yData;
    myChart1.setOption(option1);
    myChart2.setOption(option2);


})