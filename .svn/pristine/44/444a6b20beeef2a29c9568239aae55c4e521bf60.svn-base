$(function() {
  var page = new Page();
  //环形绘制
  function timer(id,start,baseDate,end,colorStyle){
    if(baseDate==0) {
      circle(id,0,baseDate,colorStyle);
      start++;
      if(start<end+1){
          timer(id,start,baseDate,end,colorStyle);
      }
    } else {
      circle(id,start/baseDate,baseDate,colorStyle);
      start++;
      if(start<end+1){
          timer(id,start,baseDate,end,colorStyle);
      }
    }
  }
  function circle(id,percent,baseDate,colorStyle){
      var p=(percent*baseDate).toFixed(0);
      var c=document.getElementById(id);
      var cxt=c.getContext("2d");
      //生成圆形（底圆）
      cxt.fillStyle="#eaeaea";
      cxt.beginPath();
      cxt.moveTo(75, 75); 
      cxt.arc(75,75,75,0,Math.PI*2,false);
      cxt.closePath();
      cxt.fill();
      //生成扇形
      cxt.fillStyle=colorStyle;
      cxt.beginPath();
      cxt.moveTo(75, 75);
      if(percent==1){
          cxt.arc(75,75,75,0,Math.PI*2,false);
      }else if(percent==0){
          cxt.arc(75,75,75,0,0,true);
      }else{
          cxt.arc(75,75,75,Math.PI,Math.PI+Math.PI*2*percent,false);
      }
      cxt.closePath();
      cxt.fill();
      //生成圆形（上层园）
      cxt.fillStyle="#FFFFFF";
      cxt.beginPath();
      cxt.moveTo(75, 75); 
      cxt.arc(75,75,70,0,Math.PI*2,false);
      cxt.closePath();
      cxt.fill();
      //生成中间百分比文字
      cxt.font="36px arial";
      cxt.fillStyle="#666666";
      cxt.textAlign='center';
      cxt.fillText(p,75,75);
  //  cxt.fillText("0%",160,75);
  }
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
  // 获取头部可用余额
  page.getHead = function (){
    return page.getData(
      '/user/invitation/header',
      {clientType:'PC',},[initTemp]);
    function initTemp (data){
      if (page.isSuccess(data)) {
        var data = data.data.invitation;
          timer("createCanvas1",0,data.totalRegister,data.totalRegister,'#ffeadf');
          timer("createCanvas2",0,data.totalRegister,data.totalRealName,'#ffd1b9');
          timer("createCanvas3",0,data.totalRegister,data.totalTiedCard,'#ff955c');
          timer("createCanvas4",0,data.totalRegister,data.totalInvestment,'#ff5900');
      }
    }
  };

  //全部分页
  page.allInvistPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.allInvist (pageNo);
    }
  };
  //全部
  page.allInvist = function (currenPage){
    return page.getData(
      '/user/invitation/list',
      {clientType:'PC',
      currentPage:currenPage||0,
      pageSize:7,
      status:'0'
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'invist','tempInvist');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //注册分页
  page.registerPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.register (pageNo);
    }
  };
  //注册
  page.register = function (currenPage){
    return page.getData(
      '/user/invitation/list',
      {clientType:'PC',
      currentPage:currenPage||0,
      pageSize:7,
      status:'0'
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'invist','tempInvist');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //实名分页
  page.realnamePag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.realname (pageNo);
    }
  };
  //实名
  page.realname = function (currenPage){
    return page.getData(
      '/user/invitation/list',
      {clientType:'PC',
      currentPage:currenPage||0,
      pageSize:7,
      status:'1'
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'invist','tempInvist');
        page.set('totalCount',data.totalCount);
      }

      if(data.totalCount=='0') {
        $('#nolist1').show();
      } else {
        $('#nolist1').hide();
      }
    }
  };
  //绑卡分页
  page.bindCardPag = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.bindCard (pageNo);
    }
  };
  //绑卡
  page.bindCard = function (currenPage){
    return page.getData(
      '/user/invitation/list',
      {clientType:'PC',
      currentPage:currenPage||0,
      pageSize:7,
      status:'2'
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'invist','tempInvist');
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
      page.invest (pageNo);
    }
  };
  //投资
  page.invest = function (currenPage){
    return page.getData(
      '/user/invitation/list',
      {clientType:'PC',
      currentPage:currenPage||0,
      pageSize:7,
      status:'3'
      },
      [initTemp]);
    function initTemp(data) {
      if(page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'invist','tempInvist');
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
      page.when(page.allInvist,[page.allInvistPag]);
    } else if($(this).data('type')=='register') {
      page.when(page.register,[page.registerPag]);
    } else if ($(this).data('type')=='realname') {
      page.when(page.realname,[page.realnamePag]);
    } else if ($(this).data('type')=='bindCard') {
      page.when(page.bindCard,[page.bindCardPag]);
    } else if ($(this).data('type')=='invest') {
      page.when(page.invest,[page.investPag]);
    }
  })

  page.init = function(){
    // page.leftnav();
    page.getHead();
    page.when(page.allInvist,[page.allInvistPag]);
  };
  page.init();
})