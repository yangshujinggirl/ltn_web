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
      elem: '#startTimeTwo',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });

  laydate({
      elem: '#endTimeTwo',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });

  laydate({
      elem: '#startTimeOne',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });

  laydate({
      elem: '#endTimeOne',
      format: 'YYYY-MM-DD',
      festival: true, //显示节日
  });
$(function(){
  var page = new Page();

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
  //获取待回款头部可用余额
  page.waitHead = function (){
    return page.getData(
      '/payment/waitfor/header',
      {
        clientType:'PC',
        handleStatus:'ZFCG'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data.header;
        page.initTemplate(data,'waitHead','tempwaitHead');
      }
    }
  };
  //获取已回款头部可用余额
  page.alreadHead = function (){
    return page.getData(
      '/payment/already/header',
      {
        clientType:'PC',
        handleStatus:'YHK'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data.header;
        page.initTemplate(data,'alreadyHead','tempalreadyHead');
      }
    }
  };

  //已回款所有分页
  page.alreadPag = function (){
    $('#pagesTwo .pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.alreadDetail (pageNo);
    }
  };
  //已回款所有明细
  page.alreadDetail = function (currenPage){
    return page.getData(
      '/payment/already/list',
      {clientType:'PC',
      handleStatus:'YHK',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTimeTwo').html(),
      endTime : $('#endTimeTwo').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'alreadDetail','tempAlreadDetail');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolistTwo').show();
      } else {
        $('#nolistTwo').hide();
      }
    }
  };
  //待回款所有分页
  page.waitPag = function (){
    $('#pagesOne .pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.waitDetail (pageNo);
    }
  };
  //待回款所有明细
  page.waitDetail = function (currenPage){
    return page.getData(
      '/payment/waitfor/list',
      {clientType:'PC',
      handleStatus:'ZFCG',
      currentPage:currenPage||0,
      pageSize:7,
      startTime : $('#startTimeOne').html(),
      endTime : $('#endTimeOne').html()
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'waitDetail','tempWaitDetail');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolistOne').show();
      } else {
        $('#nolistOne').hide();
      }
    }
  };

  //查看按钮点击事件
  $('#look').on('click',function(){
      page.when(page.waitDetail,[page.waitPag]);
  });
  $('#look1').on('click',function() {
    page.when(page.alreadDetail,[page.alreadPag]);
  })
  //tab切换
  $('#navTab .ite').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('type')=='wait') {
      $('#waitWrap').addClass('selected');
      $('#alreadWrap').removeClass('selected');
      page.waitHead();
      page.when(page.waitDetail,[page.waitPag]);
    } else if($(this).data('type')=='alread') {
      $('#alreadWrap').addClass('selected');
      $('#waitWrap').removeClass('selected');
      page.alreadHead();
      page.when(page.alreadDetail,[page.alreadPag]);
    }
  })
  page.init = function(){
    // page.leftnav();
    page.waitHead();
    page.when(page.waitDetail,[page.waitPag]);
  };
  page.init();
})