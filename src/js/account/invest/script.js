$(function () {

  var page = new Page();

  //添加Type sessionkey
  // var clientType = constant().clientType;
  // var sessionKey = constant().sessionKey;

  //data detailfreedom 渲染模板收益，在投金额
  page.getprofit = function () {

    return page.getData(
      '/account/fixed/homepage',
      {'clientType': 'PC'},
      [profit]);

    function profit(data) {
      if (page.isSuccess(data)) {
        var data = data.data;

        page.initTemplate(data, 'investProfit', 'tempInvestProfit');
      }
    };
  };
  //投标中分页
  page.pagTender = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getTender (pageNo);
    }
  };
  //持有中分页
  page.pagHold = function (){
    $('.pages').paging({
          totalSize: page.get('totalCount'),
          turnSize: 5,
          pageSize:10,
          callback:intPage
    });
    function intPage(pageNo){
      page.getHold (pageNo);
    }
  };
  //还款中分页
  page.pagRefunding = function (){
    $('.pages').paging({
          totalSize: page.get('totalCount'),
          turnSize: 5,
          pageSize:10,
          callback:intPage
    });
    function intPage(pageNo){
      page.getRefunding (pageNo);
    }
  };
  //已还款分页
  page.pagRefunded = function (){
    $('.pages').paging({
          totalSize: page.get('totalCount'),
          turnSize: 5,
          pageSize:10,
          callback:intPage
    });
    function intPage(pageNo){
      page.getRefunded (pageNo);
    }
  };
  //未完成分页
  page.pagUndone = function (){
    $('.pages').paging({
          totalSize: page.get('totalCount'),
          turnSize: 5,
          pageSize:10,
          callback:intPage
    });
    function intPage(pageNo){
      page.getUndone (pageNo);
    }
  };
  //投标中渲染模板
  page.getTender = function (currenPage) {

    return page.getData(
      '/account/current/orderList',
      {
        'clientType': 'PC',
        'currentPage': currenPage || 0,
        'pageSize':10,
        'status':'1'
      },
      [freedomin,addEvent,getTotalSize,nolist]);

    function freedomin (data) {
      if (page.isSuccess(data)) {
        var data = data.data;

        page.initTemplate(data.fixedProductOrderInfoList, 'tender', 'tempTender');
        //console.log(data.totalCount);
      }
    };
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };
    function nolist(data){
      if (page.isSuccess(data)) {
        var data = data.data.fixedProductOrderInfoList;
        if( data.length<= 0 ){
          $('.nolist').show();
        }
      }
    };
  };

  //data detailout 持有中渲染模板
  page.getHold = function (currenPage) {

    return page.getData(
      '/account/current/orderList',
      {
        'clientType': 'PC',
        'currentPage':currenPage,
        'pageSize':10,
        'status':'2'
      },
      [freedomout,addEvent,getTotalSize,nolist]);

      function getTotalSize(data) {
        if (page.isSuccess(data)) {
          data = data.data;
          page.set('totalCount', data.totalCount)
        }
      };

      function freedomout (data) {
        if (page.isSuccess(data)) {
          var data = data.data;

          page.initTemplate(data.fixedProductOrderInfoList, 'hold', 'tempHold');
        }
      };

      function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
      };

      function nolist(data){
        if (page.isSuccess(data)) {
          var data = data.data.fixedProductOrderInfoList;
          if( data.length<= 0 ){
            $('.nolist').show();
        }
      };
    }
  };
  //还款中渲染模板
  page.getRefunding = function (currenPage) {

    return page.getData(
      '/account/current/orderList',
      {
        'clientType': 'PC',
        'currentPage':currenPage,
        'pageSize':10,
        'status':'4'
      },
      [profitdetail,addEvent,getTotalSize,nolist]);

    function profitdetail(data) {
      if (page.isSuccess(data)) {
       var data = data.data;

        page.initTemplate(data.fixedProductOrderInfoList,'refunding','tempRefunding');
      }
    };
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };

    function nolist(data){
      if (page.isSuccess(data)) {
        var data = data.data.fixedProductOrderInfoList;
        if( data.length<= 0 ){
          $('.nolist').show();
        }
      }
    };

  };
  //已还款渲染模板
  page.getRefunded = function (currenPage) {

    return page.getData(
      '/account/current/orderList',
      {
        'clientType': 'PC',
        'currentPage':currenPage,
        'pageSize':10,
        'status':'3'
      },
      [profitdetail,addEvent,getTotalSize,nolist]);

    function profitdetail(data) {
      if (page.isSuccess(data)) {
       var data = data.data;

        page.initTemplate(data.fixedProductOrderInfoList,'refunded','tempRefunded');
      }
    };
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };
    function nolist(data){
      if (page.isSuccess(data)) {
        var data = data.data.fixedProductOrderInfoList;
        if( data.length<= 0 ){
          $('.nolist').show();
        }
      }
    };
  };
  //未完成渲染模板
  page.getUndone = function (currenPage) {

    return page.getData(
      '/account/current/orderList',
      {
        'clientType': 'PC',
        'currentPage':currenPage,
        'pageSize':10,
        'status':'5'
      },
      [profitdetail,addEvent,getTotalSize,nolist]
    );

    function profitdetail(data) {
      if (page.isSuccess(data)) {
       var data = data.data;

        page.initTemplate(data.fixedProductOrderInfoList,'undone','tempUndone');
      }
    };
    function addEvent(){
        $('.inAgree').on('click',function(){
          page.contract($(this));
        })
    };
    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };
    function nolist(data){
      if (page.isSuccess(data)) {
        var data = data.data.fixedProductOrderInfoList;
        if( data.length<= 0 ){
          $('.nolist').show();
        }
      }
    };
  };

  page.contract = function(_this){
    var orderNo=_this.attr('data-id');
    var param={
    	'orderNo': orderNo
    };
	user().goNewPage(param,'10');
  };

    //bind tab action
  var tab = $('#itemtap'),
  tabItems = $('#itemtap .item'),
  classType = [],
  detail = $('#contenttable');

  tabItems.each(function(index,item){
      classType.push($(item).data("content"));
  });

  classType = classType.join(' ');

  tab.on('click',function(event){

    var item = $(event.target);

    if (item.hasClass('item')) {

      tabItems.removeClass('selected');
      item.addClass('selected');
      detail.removeClass(classType).addClass(item.data('content'));

      if (detail.hasClass('tender')){
        page.when(page.getTender,[page.pagTender]);
      } else if (detail.hasClass('hold')){
        page.when(page.getHold,[page.pagHold]);
      } else if (detail.hasClass('refunding')){
        page.when(page.getRefunding,[page.pagRefunding]);
      } else if (detail.hasClass('refunded')){
        page.when(page.getRefunded,[page.pagRefunded]);
      } else if (detail.hasClass('undone')){
        page.when(page.getUndone,[page.pagUndone]);
      }
    };
  })
  //leftnav 左边选中状态
  page.leftnav = function () {
    var pn = location.pathname;

    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++){
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    }
  };
  page.init = function() {
    page.setTitle('我的理财');
    user().loginOperate();
    page.getprofit();
    page.when(page.getHold,[page.pagHold]);
    // page.leftnav();
  }

  page.init();

});
