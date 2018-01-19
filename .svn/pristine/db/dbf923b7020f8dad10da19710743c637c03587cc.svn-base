$(function() {
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
  //奖励明细列所有分页
  page.awardAllListPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.awardAllList (pageNo);
    }
  };
  //奖励明细所有
  page.awardAllList = function (currentPage){
    return page.getData(
      '/user/partner/earnings',
      {
        clientType:'PC',
        friendLevel:'0',
        currentPage:currentPage||0,
        pageSize:'7'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'award','tempaward');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //奖励明细一级好友分页
  page.awardOneListPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.awardOneList (pageNo);
    }
  };
  //奖励明细一级好友
  page.awardOneList = function (currentPage){
    return page.getData(
      '/user/partner/earnings',
      {
        clientType:'PC',
        friendLevel:'1',
        currentPage:currentPage||0,
        pageSize:'7'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'award','tempaward');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //奖励明细二级好友分页
  page.awardTwoListPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.awardTwoList (pageNo);
    }
  };
  //奖励明细二级好友
  page.awardTwoList = function (currentPage){
    return page.getData(
      '/user/partner/earnings',
      {
        clientType:'PC',
        friendLevel:'2',
        currentPage:currentPage||0,
        pageSize:'7'
      },[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'award','tempaward');
        page.set('totalCount',data.totalCount);
      }
      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  $('#statusList .item').on('click',function() {
    $(this).addClass('selected').siblings().removeClass('selected');
    if($(this).data('type')=='all') {
      page.when(page.awardAllList,[page.awardAllListPag]);
    } else if($(this).data('type')=='one') {
      page.when(page.awardOneList,[page.awardOneListPag]);
    } else if ($(this).data('type')=='two') {
      page.when(page.awardTwoList,[page.awardTwoListPag]);
    }
  })
  //初始化
  page.init = function(){
    // page.leftnav();
    page.when(page.awardAllList,[page.awardAllListPag]);
  };

  page.init();

})