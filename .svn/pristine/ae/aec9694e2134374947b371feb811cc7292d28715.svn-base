$(function(){

  var page = new Page();
  page.recharge=document.getElementById("recharge");
  page.withDraw=document.getElementById("withDraw");
  //充值分页
  page.pageCharge = function (){
    $('.pages').paging({
      totalSize:page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getCharge (pageNo);
    }
  };
  //提现分页
  page.pageDepost = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getDepost (pageNo);
    }
  };
  //充值渲染模板
  page.getCharge= function (currenPage) {

    return page.getData(
      '/account/watercourse/list',
      {
        clientType: 'PC',
        currentPage:currenPage || 0,
        pageSize:10,
        operateType:'CZ'

      },
      [initTemp,getTotalSize,nolist]);

    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;

        page.initTemplate(data.pcWaterCourseList, 'detailCharge', 'tempDetailCharge');
      }
    };

    function getTotalSize(data){
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount);
      }
    };
    function nolist(data){
      if(page.isSuccess(data)){
        var data = data.data.pcWaterCourseList;
        if(data.length<=0){
          $('.nolist').show();
        }
      }
    };
  };
  //提现渲染模板
  page.getDepost= function (currenPage) {

    return page.getData(
      '/account/watercourse/list',
      {
        clientType: 'PC',
        currentPage:currenPage || 0,
        pageSize:10,
        operateType:'TX'
      },
      [initTemp,getTotalSize,nolist]);

    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.initTemplate(data.pcWaterCourseList, 'detailDepost', 'tempDetailDepost');
      }
    };
    function getTotalSize(data){
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount);
      }
    };
    function nolist(data){
      if(page.isSuccess(data)){
        var data = data.data.pcWaterCourseList;
        if(data.length<=0){
          $('.nolist').show();
        }
      }
    };
  };
  page.initState=function(){
  	var control=urlUtil().get('control');
  	if(control=='detailCharge'){
  		page.recharge.className='item selected';
  		var content=page.recharge.getAttribute('data-content');
  		document.getElementById("contenttable").className=content;
      page.when(page.getCharge,[page.pageCharge]);
  	}else{
  		page.withDraw.className='item selected';
  		var content=page.withDraw.getAttribute('data-content');
  		document.getElementById("contenttable").className=content;
      page.when(page.getDepost,[page.pageDepost]);
  	}
  };
      // bind tab events tab切换
      var tab = $('#itemtap')
        tabItems = $('#itemtap .item'),
        classType = [],
        detail = $('#contenttable');

      tabItems.each(function(index, item) {
        classType.push($(item).data('content'));
      });
      classType = classType.join(' ');

      tab.on('click', function(event) {
        var item = $(event.target);
        if (item.hasClass('item')) {
          tabItems.removeClass('selected');
          item.addClass('selected');
          var dataContent=item.data('content');
          //充值明细
          if(dataContent=='detailCharge'){
          	page.recharge.className='item selected';
          	page.withDraw.className='item';
          }else{//提现明细
          	page.recharge.className='item';
          	page.withDraw.className='item selected';
          }
          detail.removeClass(classType).addClass(dataContent);
          if (detail.hasClass('detailCharge')){
            page.when(page.getCharge,[page.pageCharge]);
          }else if(detail.hasClass('detailDepost')){
            page.when(page.getDepost,[page.pageDepost]);
          }
        }
      });

  page.init = function() {
    page.setTitle('充值提现');
  	page.initState();
    user().loginOperate();
  }

  page.init();

})