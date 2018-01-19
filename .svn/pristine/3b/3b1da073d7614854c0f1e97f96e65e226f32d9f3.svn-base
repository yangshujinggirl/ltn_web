$(function () {
  window.location.href = '/';
  var page = new Page();
  var dept = Url.getSearchParts('dept');
  var bannerHeight = $('#banner').offset().top;
  var sessionKey = Url.getSearchParts('token');
  if(dept) {
    session().set('dept',dept);
  } else {
    dept = session().get('dept');
  }
  if(sessionKey&&sessionKey!='') {
    if(location.href.indexOf('#reloaded')==-1){
      location.href=location.href+"#reloaded"
      location.reload()
    }
    session().set('sessionKey', sessionKey);
    user().updateUserInfo(function(){})
  }

  // 初始化banner
  page.initBanner = function() {

    return page.getData(
      '/page/banner',{location:1},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data.bannerList;
        page.initTemplate(data, 'swiper1', 'tempSwiper1');
      }
    }
    //绑定事件
    function addEvents() {
      var swiperInfo={
        autoplay: 2000,
        loop: true,
        swiper: '#wrapSwiper1',
        pagination: '.swiper-pagination',
        paginationClickable: true
      }
      page.initSwiper(swiperInfo);//初始化swiper
    }
  };

  /**
   * 初始化swiper
   * @param  {[type]} swiperInfo   [swiper配置信息]
   * @return {[type]}              [description]
   */
  page.initSwiper=function(swiperInfo){
    var swiper = new Swiper(swiperInfo.swiper, {
        pagination: swiperInfo.pagination,
        paginationClickable: swiperInfo.paginationClickable,
        autoplay: swiperInfo.autoplay,
        loop: swiperInfo.loop
    });
    return swiper;
  }

  //未登录显示注册,登录显示用户信息
  page.initEntrance=function(){
    //判断是否登录
    if(user().isLogin()){
      $('#entranceAccount').addClass('selected');
      page.initAccountInfo();//账户信息
    }else{
      $('#entranceRegister').addClass('selected');
    }
  }

  //渲染用户账号信息
  page.initAccountInfo=function(){
    return page.getData(
      '/user/totalAccount',{},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var obj = data.data;
        page.initTemplate(obj, 'entranceAccount', 'tempEntranceAccount');
      }
    }
    //绑定事件
    function addEvents() {
      /**
       * 去账号中心
       * @param  {[type]} ){                   } [description]
       * @return {[type]}     [description]
       */
      $('#goAccount').on('click',function(){
        window.location.href='/html/account/viewall';
      });
    }
  };
  //右边导航
  page.rightNav = function() {
    $('#leftNavList .navItem').hover (function() {
      $(this).find('.hover').stop().fadeIn();
    },function() {
      $(this).find('.hover').stop().fadeOut();
    })
    $(window).scroll(function() {
      if($(window).scrollTop()>=bannerHeight) {
        $('#returnTop').show();
        $('#returnTop').on('click',function() {
          $(window).scrollTop('0');
        })
      } else {
        $('#returnTop').hide();
      }
    })
    $('#phone').on('click',function() {
      window.open('/other/downloadapp /');
    })
  }
  //渲染平台信息
  page.initPlatform=function(){
    return page.getData(
      '/pc/homepage/ptdata/get',{},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var obj = data.data;
        page.initTemplate(obj, 'Platform', 'tempPlatform');
      }
    }
    //绑定事件
    function addEvents() {

    }
  }

  //渲染新手标和体验标
  page.initXSBAndTYB=function(){
    return page.getData(
      '/index/newProduct',{},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data, 'XSBAndTYB', 'tempTYBAndXSB');
      }
    }
    //绑定事件
    function addEvents() {
      page.locationGo();//页面跳转
    }
  }

  //渲染首页互助
  page.initMutual=function(){
    return page.getData(
      '/help/homepage',{currentPage:0,pageSize:5},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data.helpHomePageList;
        page.initTemplate(data, 'swiper2', 'tempSwiper2');

      }
    }
    //绑定事件
    function addEvents(data) {
      var swiperInfo={
        autoplay: false,
        loop: true,
        swiper: '#wrapSwiper2',
        pagination: '',
        paginationClickable: false
      }
      var len=data.data.helpHomePageList.length;//长度
      var mySwiper=page.initSwiper(swiperInfo);//初始化swiper
      //绑定跳转详情
      $('#swiper2 .swiper-slide').on('click',function(){
        window.location.href=$(this).attr('data-url');
      });
      initBtn(mySwiper,len);
      //切换上一页
      $('#swiperPrev').on('click',function(){
        mySwiper.slidePrev();
      });
      //切换下一页
      $('#swiperNext').on('click',function(){
        mySwiper.slideNext();
      });
    }

    //初始化切换
    function initBtn(mySwiper,len){
      //一条的时候全部隐藏
      if(len<=1){
        $('#swiperPrev').hide();
        $('#swiperNext').hide();
      }else{
        $('#swiperPrev').show();
        $('#swiperNext').show();
      }
    }
  }

  //渲染首页众筹
  page.initCrowd=function(){
    return page.getData(
      '/productZc/homepage',{},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data.productZcList;
        page.initTemplate(data, 'crowdList', 'tempCrowdList');
      }
    }
    //绑定事件
    function addEvents() {
      //绑定跳转详情
      $('#crowdList .item').on('click',function(){
        var url=$(this).attr('data-url');
        if(!(typeof(url)=='undefined')){
          window.location.href=url;
        }else{
          return false;
        }
      });
    }
  }

  //渲染首页理财
  page.initProduct=function(){
    return page.getData(
      '/pc/product/homepage/recommend/get',{},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data.productList;
        page.initTemplate(data, 'productList', 'tempProductList');
      }
    }
    //绑定事件
    function addEvents() {
      $('#productList .item').on('click',function(){
        var _this=$(this);
        var productId=_this.attr('data-id');
        var prodType=_this.attr('data-type');
        var url="";//跳转地址
        //乐巢投
        if(prodType=='LCT'){
          url='/html/product/short/#!/'+productId;
        }else if(prodType=="LCTXL"){
          url='/html/product/long/#!/'+productId;
        }
        window.location.href=url;
      });
    }
  }
  //渲染首页媒体报道
  page.initNews=function(){
    return page.getData(
      '/pc/announcement/homepage/list',{type:2},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data.announcementList;
        page.initTemplate(data, 'newsContent', 'tempNewsContent');
      }
    }
    //绑定事件
    function addEvents() {
      // 媒体报道自动滚动
      $('.bottomListRoll').kxbdMarquee({
        direction: 'up',
        isEqual: true,
        scrollAmount: 1,
        scrollDelay: 40
      });
    }
  }

  //渲染首页平台公告
  page.initNotices=function(){
    return page.getData(
      '/pc/announcement/homepage/list',{type:1},
      [initTemp,addEvents]);

    //渲染模板
    function initTemp(data) {
      if (page.isSuccess(data)) {
        var data = data.data.announcementList;
        page.initTemplate(data, 'noticeList', 'tempNoticeList');
      }
    }
    //绑定事件
    function addEvents() {
      // 平台公告自动滚动
      $('.noticeListRoll').kxbdMarquee({
        direction: 'up',
        isEqual: true,
        scrollAmount: 1,
        scrollDelay: 40
      });
    }
  }
  //页面初始化
  page.init = function() {
    page.initBanner();//banner
    page.initEntrance();//账户信息
    page.initPlatform();//渲染平台信息
    page.rightNav();//右边导航
    page.initXSBAndTYB();//体验标新手标
    // page.initMutual();//渲染互助
    // page.initCrowd();//渲染首页众筹
    page.initProduct();//渲染首页理财
    page.initNews();//渲染首页媒体报道
    page.initNotices();//渲染首页平台公告
    session().set('dept',dept);
  }

  //页面跳转
  page.locationGo = function(){
    $('.list .item:not(:first)').on("click", function(event) {
      event.stopPropagation();
      var url = $(this).attr('data-url');
      location.href = url;
    });
  }

  //去注册
  $('#goRegister').on('click',function(){
    window.location.href='/html/user/register';
  });
  //去借款
  $('#goLoan').on('click',function(){
    window.location.href='/html/loan/loan-index/';
  })

  page.init();
  if(window.location.pathname == '/'){
    $('.commonNavTwo,.commonNav').find('.right a').eq(0).addClass('select')
  }
});
