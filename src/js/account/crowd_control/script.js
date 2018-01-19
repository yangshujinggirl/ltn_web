
$(function(){
  var page = new Page();

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
      '/orderZc/myOrderZc',
      {clientType:'PC',
      orderSt:'ALL',
      currentPage:currenPage||0,
      pageSize:7
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','crowdTemplate');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //所有分页
  page.crowdPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.crowdDetail (pageNo);
    }
  };
  //所有资金明细
  page.crowdDetail = function (currenPage){
    return page.getData(
      '/orderZc/myOrderZc',
      {clientType:'PC',
      orderSt:'ZFCG ',
      currentPage:currenPage||0,
      pageSize:7
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','crowdTemplate');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  page.overPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.overDetail (pageNo);
    }
  };
  //所有资金明细
  page.overDetail = function (currenPage){
    return page.getData(
      '/orderZc/myOrderZc',
      {clientType:'PC',
      orderSt:'YHK ',
      currentPage:currenPage||0,
      pageSize:7
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'fundDetail','crowdTemplate');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };

  $('#change .item').on('click',function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('content')=='all') {
        page.when(page.allDetail,[page.allPag]);
      } else if($(this).data('content')=='crowding') {
        page.when(page.crowdDetail,[page.crowdPag]);
      } else if($(this).data('content')=='over') {
        page.when(page.overDetail,[page.overPag]);
      }
  });

  page.init = function(){
    page.when(page.allDetail,[page.allPag]);
  };
  page.init();
})

