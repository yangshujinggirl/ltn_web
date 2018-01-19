//日期范围限制
  var start = {
      elem: '#start',
      format: 'YYYY-MM-DD',
      min: laydate.now(), //设定最小日期为当前日期
      max: '2099-06-16', //最大日期
      istime: true,
      istoday: false,
      choose: function(datas){
           end.min = datas; //开始日选好后，重置结束日的最小日期
           end.start = datas //将结束日的初始值设定为开始日
      }
  };
  var end = {
      elem: '#end',
      format: 'YYYY-MM-DD',
      min: laydate.now(),
      max: '2099-06-16',
      istime: true,
      istoday: false,
      choose: function(datas){
          start.max = datas; //结束日选好后，充值开始日的最大日期
      }
  };
  laydate(start);
  laydate(end);
  //自定义日期格式
  laydate({
      elem: '#detail_startTime',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });

  laydate({
      elem: '#detail_endTime',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });
$(function(){

  var userStatus = session().get('userStatus');//企业状态
  var userType = session().get('userType');//用户类型
  var page = new Page();
  var date = new Date();
  var myYear = date.getFullYear();
  var mydate = date.getMonth()+1;
  var mytime = date.getDate();
  var newDate = myYear+'-'+(mydate<10?'0'+mydate:mydate)+'-'+(mytime<10?'0'+mytime:mytime);
  var changeDate = '';
  // alert(newDate);
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
  };
  //获取头部可用余额
  page.getHead = function (){
    return page.getData(
      '/pc/assetDetail/total/get',
      {},[initTemp,addEvent]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'detailHead','tempDetailhead');
      }
    }
    function addEvent() {
      if(userType=='1') {
        if(userStatus=='-1')  {
          $('#ain,#aout').on('click',function() {
            window.location.href = '/html/account/submitFail/'
          })
        } else if(userStatus=='0') {
          $('#ain,#aout').on('click',function() {
            window.location.href = '/html/account/submitSuccess/'
          })
        } else if(userStatus=='2') {
          $('#ain,#aout').on('click',function() {
            window.location.href = '/html/account/openAccount/'
          })
        } else if(userStatus=='1') {
          $('#ain,#aout').on('click',function() {
            window.location.href = '/html/account/bank2/'
          })
        }
        $('#ainvest').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
      }else {
        $('#aout').on('click',function() {
          window.location.href = '/html/account/bank/?control=depost'
        })
        $('#ain').on('click',function() {
          window.location.href = '/html/account/bank/?control=recharge'
        })
        $('#ainvest').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
      }
    }
  };
  //侧边栏选中
  page.leftnav = function(){
    var pn = location.pathname;
    var as = $('#leftnav .item');
    for(var i = 0,j = as.length; i < j;i++) {
      if(as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    }
  };
  //所有分页
  page.allPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.allDetail (pageNo);
    }
  };
  //所有资金明细
  page.allDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'ALL',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //充值分页
  page.chargePag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.chargeDetail (pageNo);
    }
  };
  //充值明细
  page.chargeDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'CZ',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //提现分页
  page.depostPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.depostDetail (pageNo);
    }
  };
  //提现明细
  page.depostDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'TX',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //投资分页
  page.investPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.investDetail (pageNo);
    }
  };
  //投资明细
  page.investDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'TZ',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //回款分页
  page.returnPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.returnDetail (pageNo);
    }
  };
  //回款明细
  page.returnDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'HK',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //返现分页
  page.backPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.backDetail (pageNo);
    }
  };
  //返现明细
  page.backDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'FX',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //其他分页
  page.otherPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.otherDetail (pageNo);
    }
  };
  //其他明细
  page.otherDetail = function (currenPage){
    return page.getData(
      '/pc/assetDetail/list/get',
      {clientType:'PC',
      queryType:'QT',
      currentPage:currenPage||0,
      pageSize:7,
      startDate : $('#detail_startTime').html(),
      endDate : $('#detail_endTime').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','tempDetail');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  page.typeTab = function() {
    if($('#change .selected').data('content')=='all') {
        page.when(page.allDetail,[page.allPag]);
      } else if($('#change .selected').data('content')=='charge') {
        page.when(page.chargeDetail,[page.chargePag]);
      } else if($('#change .selected').data('content')=='depost') {
        page.when(page.depostDetail,[page.depostPag]);
      } else if($('#change .selected').data('content')=='invest') {
        page.when(page.investDetail,[page.investPag]);
      } else if($('#change .selected').data('content')=='returned'){
        page.when(page.returnDetail,[page.returnPag]);
      } else if($('#change .selected').data('content')=='back'){
        page.when(page.backDetail,[page.backPag]);
      } else if($('#change .selected').data('content')=='other'){
        page.when(page.otherDetail,[page.otherPag]);
      }
  }

  $('#time .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('time')=='allDate') {
      $('#detail_startTime').html('');
      $('#detail_endTime').html('');
      page.typeTab();
    } else if($(this).data('time')=='today') {
      $('#detail_startTime').html(newDate);
      $('#detail_endTime').html('');
      page.typeTab();
    } else if($(this).data('time')=='one') {
      changeDate = addmulMonth(newDate,1);
      $('#detail_startTime').html(changeDate);
      $('#detail_endTime').html(newDate);
      page.typeTab();
    } else if($(this).data('time')=='three') {
      changeDate = addmulMonth(newDate,3)
      $('#detail_startTime').html(changeDate);
      $('#detail_endTime').html(newDate);
      page.typeTab();
    } else if($(this).data('time')=='six') {
      changeDate = addmulMonth(newDate,6)
      $('#detail_startTime').html(changeDate);
      $('#detail_endTime').html(newDate);
      page.typeTab();
    }
  })
  $('#change .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('content')=="all") {
      page.when(page.allDetail,[page.allPag]);
    } else if($(this).data('content')=='charge') {
      page.when(page.chargeDetail,[page.chargePag]);
    } else if($(this).data('content')=='depost') {
      page.when(page.depostDetail,[page.depostPag]);
    } else if($(this).data('content')=='invest') {
      page.when(page.investDetail,[page.investPag]);
    } else if($(this).data('content')=='returned') {
      page.when(page.returnDetail,[page.returnPag]);
    } else if($(this).data('content')=='back') {
      page.when(page.backDetail,[page.backPag]);
    } else if($(this).data('content')=='other') {
      page.when(page.otherDetail,[page.otherPag]);
    }
  });

  page.init = function(){
    // page.leftnav();
    page.getHead();
    page.when(page.allDetail,[page.allPag]);
  };
  page.init();
})
