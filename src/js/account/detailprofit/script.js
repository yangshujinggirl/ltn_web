$(function(){
  var page = new Page();
  var date = new Date();
  var myYear = date.getFullYear();
  var mydate = date.getMonth()+1;
  var mytime = date.getDate();
  var newDate = myYear+'-'+(mydate<10?'0'+mydate:mydate)+'-'+(mytime<10?'0'+mytime:mytime);
  var changeDate = '';
  //n个月后的时间
  function addmulMonth(dtstr, n){
    var s = dtstr.split("-");
    var yy = parseInt(s[0]);
    var mm = parseInt(s[1])-1 ;
    var dd = parseInt(s[2]);
    var dt = new Date(yy, mm, dd);
    dt.setMonth(dt.getMonth() - n);
    var month = parseInt(dt.getMonth()) + 1;
    if(month<=0) {
      yy-=-1;
    }
    return dt.getFullYear() + "-" + (month<10?'0'+month:month)  + "-" + (dd<10?'0'+dd:dd);
  }
  //侧边栏选中
  page.leftnav = function(){
    var pn = location.pathname;
    var as = $('#leftnav .item');
    for(var i = 0, j = as.length; i < j; i++) {
      if(as[i].href.indexOf(pn) !=-1) {
        as[i].className = 'selected item';
      }
    }
  };
  //待收收益模板
  page.collectEarn = function(){
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        type:'0'
      },[initTemp,echars,event]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'chartOne','tempChartOne');
      }
    }
    function echars(data) {
      if (page.isSuccess(data)) {
        var data = data.data;
        //load echars
         var chartContainer = $('#echartOne')[0],
          chart = echarts.init(chartContainer);

        option = {

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            icon: 'circle',
          },
          series: [
              {
                name:'账户总览',
                type: 'pie',
                minAngle:'20',
                radius : ['40%','60%'],
                center: ['50%', '50%'],
                   data:[
                        {value:data.rewardProfit, name:'奖励收益'},
                        {value:data.regularProfit, name:'固定收益'}
                    ]
              }
          ],
          color:['#f084fb','#7fa2fe']
        };
        chart.setOption(option);
      }
    }
    function event() {
      $('.amount .icon').hover(function() {
        $(this).siblings('.hint').addClass('selected');
      },function(){
        $(this).siblings('.hint').removeClass('selected');
      })
    }
  };
  //累计收益模板
  page.grandEarn = function(){
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        type:'1'
      },[initTemp,echars,event]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'chartTwo','tempChartTwo');
      }
    }
    function echars(data) {
      if (page.isSuccess(data)) {
        var data = data.data;
        //load echars
         var chartContainer = $('#echartTwo')[0],
          chart = echarts.init(chartContainer);

        option = {

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            icon: 'circle',
          },
          series: [
              {
                name:'账户总览',
                type: 'pie',
                minAngle:'20',
                radius : ['40%','60%'],
                center: ['50%', '50%'],
                   data:[
                        {value:data.birdTotal, name:'鸟币收益'},
                        {value:data.financeTotal, name:'固定收益'},
                        {value:data.couponTotal, name:'奖励收益'},
                        {value:data.partnerTotal, name:'分润收益'}
                    ]
              }
          ],
          color:['#ff2173','#ff4700','#78e8b8','#42b9fd','#ff3b85']
        };
        chart.setOption(option);
      }
    }
    function event() {
      $('.rightInfo .icon').hover(function() {
        $(this).siblings('.hint').addClass('selected');
      },function(){
        $(this).siblings('.hint').removeClass('selected');
      })
    }
  };

  //所有分页
  page.allPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.allEarning (pageNo);
    }
  };
  //所有模板
  page.allEarning = function(currenPage) {
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        currentPage:currenPage||0,
        pageSize:10,
        startDate:$('#startTime').val(),
        endDate:$('#endTime').val(),
        type:'0',
        queryType:'ALL'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'earningDeatil','tempEarningDeatil');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  //乐巢投分页
  page.lctPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.lctEarning (pageNo);
    }
  };
  //乐巢投模板
  page.lctEarning = function(currenPage) {
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        currentPage:currenPage||0,
        pageSize:10,
        startDate:$('#startTime').val(),
        endDate:$('#endTime').val(),
        type:'0',
        queryType:'LCT'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'earningDeatil','tempEarningDeatil');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  //乐巢投系列分页
  page.lctxlPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.lctxlEarning (pageNo);
    }
  };
  //乐巢投系列模板
  page.lctxlEarning = function(currenPage) {
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        currentPage:currenPage||0,
        pageSize:10,
        startDate:$('#startTime').val(),
        endDate:$('#endTime').val(),
        type:'0',
        queryType:'LCTXL'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'earningDeatil','tempEarningDeatil');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  //理财金券分页
  page.lctjjPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.lctjjEarning (pageNo);
    }
  };
  //理财金券模板
  page.lctjjEarning = function(currenPage) {
    return page.getData(
      '/pc/user/profitDetail',
      {
        clientType:'PC',
        currentPage:currenPage||0,
        pageSize:10,
        startDate:$('#startTime').val(),
        endDate:$('#endTime').val(),
        type:'0',
        queryType:'LCJJ'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'earningDeatil','tempEarningDeatil');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  $('#time .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('time')=='allDate') {
      $('#startTime').val('');
      $('#endTime').val('');
    } else if($(this).data('time')=='today') {
      $('#startTime').val(newDate);
      $('#endTime').val('');
    } else if($(this).data('time')=='one') {
      changeDate = addmulMonth(newDate,1);
      $('#startTime').val(changeDate);
      $('#endTime').val(newDate);
    } else if($(this).data('time')=='three') {
      changeDate = addmulMonth(newDate,3)
      $('#startTime').val(changeDate);
      $('#endTime').val(newDate);
    } else if($(this).data('time')=='six') {
      changeDate = addmulMonth(newDate,6)
      $('#startTime').val(changeDate);
      $('#endTime').val(newDate);
    }
  });

  $('#change .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    $('#look').attr('class','submit'+' '+$(this).data('content'));
  });

  $('#look').on('click',function(){
    if($('#look').hasClass('all')) {
      page.when(page.allEarning,[page.allPag]);
    } else if($('#look').hasClass('lct')) {
     page.when(page.lctEarning,[page.lctPag]);
    } else if($('#look').hasClass('lctxl')) {
      page.when(page.lctxlEarning,[page.lctxlPag]);
    } else if($('#look').hasClass('security')) {
      page.when(page.lctjjEarning,[page.lctjjPag]);
    }
  });

  $('#invest').on('click',function(){
    window.location.href = '/finance/list/0/1/0/0'
  })

  page.init = function(){
    // page.leftnav();
    page.collectEarn();
    page.grandEarn();
    page.when(page.allEarning,[page.allPag]);
  };
  page.init();
})
