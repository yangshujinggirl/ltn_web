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
      elem: '#startTime',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });

  laydate({
      elem: '#endTime',
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
  //获取头部账户余额
  page.getdifference = function (){
    return page.getData(
      '/user/totalAccount',
      {
        clientType:'PC'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        page.set('usableBalance',data.data.usableBalance)
      }
    }
  };
  //获取头部可用余额
  page.getHead = function (){
    return page.getData(
      '/account/fixed/homepage',
      {
        clientType:'PC'
      },[initTemp,clickEvent]);
    function initTemp (data){
      if (page.isSuccess(data)) {

        var obj = data.data;
        obj.usableBalance = page.get('usableBalance');
        page.initTemplate(obj,'detailHead','tempDetailhead');
      }
    }
    function clickEvent() {
      if(userType=='1') {
        if(userStatus=='-1')  {
          $('#chargeBtn').on('click',function() {
             window.location.href = '/html/account/submitFail/'
          })
        } else if(userStatus=='0') {
          $('#chargeBtn').on('click',function() {
            window.location.href = '/html/account/submitSuccess/'
          })
        } else if(userStatus=='2') {
          $('#chargeBtn').on('click',function() {
           window.location.href = '/html/account/openAccount/'
          })
        } else if(userStatus=='1') {
          $('#chargeBtn').on('click',function() {
            window.location.href = '/html/account/bank2'
          })
        }
        $('#investBtn').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
      } else {
        $('#investBtn').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
        $('#chargeBtn').on('click',function() {
          window.location.href = '/html/account/bank'
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
  //协认跳转
  page.contract = function(_this){
    var orderNo=_this.attr('data-id');
    var param={
      'orderNo': orderNo
    };
    user().goNewPage(param,'10');
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
      '/account/current/orderList',
      {clientType:'PC',
      status:'10',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTime').html(),
      endTime : $('#endTime').html()
      },
      [initTemp,addEvent]);
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
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
  };
  //投标中分页
  page.tenderPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.tender (pageNo);
    }
  };
  //投标中明细
  page.tender = function (currenPage){
    return page.getData(
      '/account/current/orderList',
      {clientType:'PC',
      status:'1',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTime').html(),
      endTime : $('#endTime').html()
      },
      [initTemp,addEvent]);
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
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
  };
  //持有中分页
  page.holdPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.hold (pageNo);
    }
  };
  //持有中明细
  page.hold = function (currenPage){
    return page.getData(
      '/account/current/orderList',
      {clientType:'PC',
      status:'2',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTime').html(),
      endTime : $('#endTime').html()
      },
      [initTemp,addEvent]);
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
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
  };
  //还款中分页
  page.repaymentPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.repayment (pageNo);
    }
  };
  //还款中明细
  page.repayment = function (currenPage){
    return page.getData(
      '/account/current/orderList',
      {clientType:'PC',
      status:'4',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTime').html(),
      endTime : $('#endTime').html()
      },
      [initTemp,addEvent]);
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
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
  };
  //已还款分页
  page.paidPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.paid (pageNo);
    }
  };
  //已还款明细
  page.paid = function (currenPage){
    return page.getData(
      '/account/current/orderList',
      {clientType:'PC',
      status:'3',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTime').html(),
      endTime : $('#endTime').html()
      },
      [initTemp,addEvent]);
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
    function addEvent(){
      $('.inAgree').on('click',function(){
        page.contract($(this));
      })
    };
  };
  page.typeTab = function() {
    if($('#change .selected').data('content')=='all') {
        page.when(page.allDetail,[page.allPag]);
      } else if($('#change .selected').data('content')=='tender') {
        page.when(page.tender,[page.tenderPag]);
      } else if($('#change .selected').data('content')=='hold') {
        page.when(page.hold,[page.holdPag]);
      } else if($('#change .selected').data('content')=='repayment') {
        page.when(page.repayment,[page.repaymentPag]);
      } else if($('#change .selected').data('content')=='paid'){
        page.when(page.paid,[page.paidPag]);
      }
  }

  $('#time .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('time')=='allDate') {
      $('#startTime').html('');
      $('#endTime').html('');
      page.typeTab();
    } else if($(this).data('time')=='today') {
      $('#startTime').html(newDate);
      $('#endTime').html('');
      page.typeTab();
    } else if($(this).data('time')=='one') {
      changeDate = addmulMonth(newDate,1);
      $('#startTime').html(changeDate);
      $('#endTime').html(newDate);
      page.typeTab();
    } else if($(this).data('time')=='three') {
      changeDate = addmulMonth(newDate,3)
      $('#startTime').html(changeDate);
      $('#endTime').html(newDate);
      page.typeTab();
    } else if($(this).data('time')=='six') {
      changeDate = addmulMonth(newDate,6)
      $('#startTime').html(changeDate);
      $('#endTime').html(newDate);
      page.typeTab();
    }
  })
  $('#change .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('content')=='all') {
        page.when(page.allDetail,[page.allPag]);
      } else if($(this).data('content')=='tender') {
        page.when(page.tender,[page.tenderPag]);
      } else if($(this).data('content')=='hold') {
        page.when(page.hold,[page.holdPag]);
      } else if($(this).data('content')=='repayment') {
        page.when(page.repayment,[page.repaymentPag]);
      } else if($(this).data('content')=='paid'){
        page.when(page.paid,[page.paidPag]);
      }
  });

  page.init = function(){
    // page.leftnav();
    page.when(page.getdifference,[page.getHead]);
    page.when(page.allDetail,[page.allPag]);
  };
  page.init();
})
