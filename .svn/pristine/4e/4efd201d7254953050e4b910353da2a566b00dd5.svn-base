$(function(){
  var page = new Page();
  //头部：获得鸟币，可用鸟币，渲染模板
  page.getBird = function(){
    return page.getData(
      '/account/birdUserInfo',
      {'clientType':'PC'},
      [profitBird,addevent]);
    function profitBird(data){
      if (page.isSuccess(data)){
        var data = data.data;
        page.initTemplate(data,'birdCont','tempBird')
      }
    }
    function addevent(data){
      $('.more_box1').mouseover(function(){
        $(this).find('.more_icon').removeClass('icon1').addClass('caise1');
        $(this).addClass('bg');
      });
      $('.more_box1').mouseout(function(){
        $(this).find('.more_icon').removeClass('caise1').addClass('icon1');
        $(this).removeClass('bg');
      });
      $('.box2').mouseover(function(){
        $(this).find('.more_icon').removeClass('icon2').addClass('caise2');
        $(this).addClass('bg');
      });
      $('.box2').mouseout(function(){
        $(this).find('.more_icon').removeClass('caise2').addClass('icon2');
        $(this).removeClass('bg');
      });
      $('.box3').mouseover(function(){
        $(this).find('.more_icon').removeClass('icon3').addClass('caise3');
        $(this).addClass('bg');
      });
      $('.box3').mouseout(function(){
        $(this).find('.more_icon').removeClass('caise3').addClass('icon3');
        $(this).removeClass('bg');
      });
      $('.box4').mouseover(function(){
        $(this).find('.more_icon').removeClass('icon4').addClass('caise4');
        $(this).addClass('bg');
      });
      $('.box4').mouseout(function(){
        $(this).find('.more_icon').removeClass('caise4').addClass('icon4');
        $(this).removeClass('bg');
      });
    }
  };
  //获得鸟币分页
  page.pagHuode = function () {
    $('.pages').paging({
      totalSize:page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getdetailhuode (pageNo);
    }
  };
  //可用鸟币分页
  page.pagLout = function () {
    $('.pages').paging({
      totalSize:page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getdetailout (pageNo);
    }
  }
  //data detailin获得鸟币明细，渲染模板
  page.getdetailhuode = function (currenPage) {

    return page.getData(
      '/account/birdCoinWater',
      {'type':'I',
       'clientType':'PC',
       currentPage:currenPage || 0,
       pageSize: 10,
      },
      [freedomin,getTotalSize,nolist]);

      function freedomin (data) {
        if (page.isSuccess(data)) {
          var data = data.data;

          page.initTemplate(data, 'detailhuode', 'temptablehuode');
        }
      };
      function getTotalSize(data){
        if(page.isSuccess(data)){
          var data = data.data;
          page.set('totalCount',data.totalCount)
        }
      };
      function nolist(data){
        if(page.isSuccess(data)){
          data = data.data.birdList;
          if(data.length<=0){
            $('.nolist').show();
          }
        }
      };
  };

  //data detailout使用鸟币明细，渲染模板
  page.getdetailout = function (currenPage) {

    return page.getData(
      '/account/birdCoinWater',
      {'type':'O',
       'clientType':'PC',
       currentPage:currenPage || 0,
       pageSize: 10,
       },
      [freedomout,getTotalSize,nolist]);

      function freedomout (data) {
        if (page.isSuccess(data)) {
          var data = data.data;

          page.initTemplate(data, 'detailshiyong', 'temptableSY');
        }
      };

      function getTotalSize(data){
        if(page.isSuccess(data)){
          data = data.data;
          page.set('totalCount',data.totalCount)
        }
      };
      function nolist(data){
        if(page.isSuccess(data)){
          data = data.data.birdList;
          if(data.length<=0){
            $('.nolist').show();
          }
        }
      };
  };
  //leftnav左边选中状态
  page.leftnav = function () {
    var pn = location.pathname;
    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++)
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
    }
  };

  //bind tab action  tab切换
   var tab = $('#itemtapBird'),
   tabItems = $('#itemtapBird .item'),
   classType = [],
   detail = $('#contenttableBird');

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

       if (detail.hasClass('detailhuode')) {
        page.when(page.getdetailhuode,[page.pagHuode])
       } else if(detail.hasClass('detailshiyong')){
        page.when(page.getdetailout,[page.pagLout]);
       }
     };
   })
  page.init = function(){
    page.setTitle('我的鸟币');
    user().loginOperate();
    // page.leftnav();
    page.getBird();
    page.when(page.getdetailhuode,[page.pagHuode]);
  }
  page.init();
});