$(function(){
  var page = new Page();
   page.chanceNum = 0;//中奖次数
  var click=false;//是否抽奖中
  //奖品标号对应的下标
   page.awards={
     "25": '0',//ipad
     "21": '1',//坚果
     "20": '2',//10%加息券
     "23": '3',//大闸蟹
     "24": '4',//电饭煲
     "22": '5',//月饼
     "26": '6',//22元返现券
   }
   //奖品下标对应名称
   page.awardNames={
    "0": '抽中iPad Mini4一台',//ipad
    "1": '抽中三只松鼠坚果一份',//坚果
    "2": '抽中10%加息券一张',//10%加息券
    "3": '抽中阳澄湖大闸蟹一份',//大闸蟹
    "4": '抽中虎牌电饭煲一台',//电饭煲
    "5": '抽中美心流心月饼一盒',//月饼
    "6": '抽中22元返现券一张'//22元返现券
   }

   page.awardIndex;//奖品下标
   page.btnStatus=3;//0表示活动结束 1是否登录 2是否有机会 3是否开始 
  // //前二百名数据渲染
  page.twohundred = function(){
    return page.getData(
      '/market/activity/info',{
        clientType:'PC',
        serviceName:'MOONCAKES'
      },[initCrumbTemp,initNotice]);
    function initCrumbTemp(data){
      if (page.isSuccess(data)) {
        data = data.data.result.data;
        page.initTemplate(data,'propListerbai','tempListerbai');
        if (data.length < 200) {
          $('.info_last').hide();
        }else{
          $('.info_last').show();
        }
        if (data.length <=0) {
          $('.prolistnone').show();
        }
      }
    }
    function initNotice() {
        if ($('#scrollDiv2 li').length >6) {
          $("#scrollDiv2").textSlider({line:1,speed:500,timer:3000});
        }
        $('#scrollDiv2 .info_list li:first .ordinary').removeClass('ordinary').addClass('one');
        $('#scrollDiv2 .info_list li:nth-child(2) .ordinary').removeClass('ordinary').addClass('two');
        $('#scrollDiv2 .info_list li:nth-child(3) .ordinary').removeClass('ordinary').addClass('three');
    }
  }
  page.isLogin = function(){
    if (user().isLogin()) {
      page.personWin();
      page.tallhigh();
    }else{
      $('.nolist').show();
      $('#loginonly').on('click',function(){
        user().loginOperate();
      })
      $('.noLogin').show();
      $('#denglu2').on('click',function(){
        user().loginOperate();
      })
      $('.login_but').show();
      $('#LoginBbut').on('click',function(){
        user().getBigData('login');
        user().loginOperate();
      });
    }
  }
  //个人中奖纪录
  page.personWin = function() {
    return page.getData(
    '/market/activity/info',{
      clientType:'PC',
      serviceName:'PERSON_RECORD'
    },[initonlyone]);
    function initonlyone(data){
      if (page.isSuccess(data)) {
        data = data.data.result;
        page.initTemplate(data,'proponlyone','tempOnlyone');
        if (data.length <= 0) {
           $('#xiaoniao').show();
        }
      }
    }
  }
  //平台中奖纪录
  page.platform = function(){
    return page.getData(
      '/market/activity/info',{
        clientType:'PC',
        serviceName:'PT_RECORD'
      },[initplatform,initNotice]);
    function initplatform(data){
      if (page.isSuccess(data)) {
        data = data.data.result.recordList;
        page.initTemplate(data,'propPlatform','tempPlatform');
        if (data.length <=0) {
          $('#xiaoniao2').show();
        }
      }
    }
    function initNotice() {
       if ($('#scrollDiv3 li').length > 6) {
          $("#scrollDiv3").textSlider({line:4,speed:500,timer:2000});
        }
    }
  }
  //抽奖
  page.choujiang = function(){
    return page.getData(
      '/market/activity/info',{
        clientType:'PC',
        serviceName:'MIDAUTUMN'
      },[initchoujiang]);
    function initchoujiang(data){
      if (data.resultCode == '0') {
        var data = data.data.result;
        page.tallhigh();
        //未中奖
        if (data.isWinning == '0') {
          page.awardIndex=7;
        }else{
          page.awardIndex = page.awards[data.prizesId];//获取奖品对应的下标
        }
        page.awardIndex=parseInt(page.awardIndex);
        /*alert(page.awardIndex);*/
        lottery.speed=100;
        roll();//开始抽奖,把奖品下标传入
        click=true;//抽奖中
        return false;
      }else if(data.resultCode == '10000006'){
        marketClick('loginTimeout');
      }
    }
  }
//最高投资额&剩余机会
page.tallhigh = function(){
    return page.getData(
      '/market/activity/info',
      {clientType:'PC',
      serviceName:'CHANCENUM_AND_MAXIMUMAMOUNT'
    },[inithigh]);
    function inithigh(data){
      if (page.isSuccess(data)) {
        data = data.data.result;
        page.initTemplate(data,'propTallhigh','tempTallhigh');
        page.initTemplate(data,'propSurplus','tempSurplus');
        if (data.isStart == '1') {
          $('#choujiang').show();
           if (data.chanceNum == 0) {
            $('.wujihui_but').show();
          }
        }else if(data.isStart == '0'){
          $('.jiezhi_but').show();
        }
      }
    }
}
  var lottery={
  index:0, //当前转动到哪个位置，起点位置
  count:0,  //总共有多少个位置
  timer:0,  //setTimeout的ID，用clearTimeout清除
  speed:20, //初始转动速度
  times:0,  //转动次数
  cycle:50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
  prize:-1, //中奖位置
  init:function(id){
    if ($("#"+id).find(".lottery-unit").length>0) {
      $lottery = $("#"+id);
      $units = $lottery.find(".lottery-unit");
      this.obj = $lottery;
      this.count = $units.length;
      $lottery.find(".lottery-unit-"+this.index).addClass("active");
    };
  },
  roll:function(){
    var index = this.index;
    var count = this.count;
    var lottery = this.obj;
    $(lottery).find(".lottery-unit-"+index).removeClass("active");
    index += 1;
    if (index>count-1) {
      index = 0;
    };
    $(lottery).find(".lottery-unit-"+index).addClass("active");
    this.index=index;
    return false;
  },
  stop:function(index){
    this.prize=index;
    return false;
  }
}
function roll(){
      lottery.times += 1;
      lottery.roll();
        if (lottery.times > lottery.cycle+10 && lottery.prize==lottery.index) {
          clearTimeout(lottery.timer);
          setTimeout(function(){
            var name= page.awardNames[page.awardIndex];
          $('#prizeName').html(name);
          $('#winImg')[0].className='tp award'+page.awardIndex;//奖品图片
          if(page.awardIndex==7){
            $('.Notwinning').show();
            $('.finance_cover').show();
          }else{
            $('.prize_win').show();
            $('.finance_cover').show();
          }
          if (page.awardIndex == 2) {
            $('.win_gift').hide();
            $('.win_gift2').show();
          }
          if (page.awardIndex == 6) {
            $('.win_gift').hide();
            $('.win_gift3').show();
          }
          $('.again').on('click',function(){
            $('.Notwinning').hide();
            $('.finance_cover').hide();
          });
          $('.not_but').on('click',function(){
            $('.Notwinning').hide();
            $('.finance_cover').hide();
          });
          $('.zaiyici').on('click',function(){
            $('.prize_win').hide();
            $('.finance_cover').hide();
          });
          $('.sure').on('click',function(){
            $('.prize_win').hide();
            $('.finance_cover').hide();
          });
          $('.sure2').on('click',function(){
            $('.prize_win').hide();
            $('.finance_cover').hide();
          });
          $('.sure3').on('click',function(){
            $('.prize_win').hide();
            $('.finance_cover').hide();
          });
          lottery.prize=-1;
          lottery.times=0;
          click=false;
          },1000);
        }else{
          if (lottery.times<lottery.cycle) {
            lottery.speed -= 10;
          }else if(lottery.times==lottery.cycle) {
            // var index = Math.random()*(lottery.count)|0;
            lottery.prize = page.awardIndex;//中奖位置后台传过来的是否中奖
          }else{
            if (lottery.times > lottery.cycle+10 && ((lottery.prize==0 && lottery.index==7) || lottery.prize==lottery.index+1)) {
              lottery.speed += 110;
            }else{
              lottery.speed += 20;
            }
          }
        if (lottery.speed<40) {
          lottery.speed=40;
        };
        //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
        lottery.timer = setTimeout(roll,lottery.speed);
      }
      return false;
}
window.onload=function(){
  lottery.init('lottery');
};
  page.init = function(){
    page.isLogin();
    page.twohundred();
    page.platform();
  }
  $('#choujiang').on('click',function(){
    if(click) {
          return false;
      }else{
        var tel=session().get('login');
        //调用大数据传参方法
        user().setBigDataNeed(1,'mobile',tel);
        //传入用户需要的userId
        user().setBigDataUserId(tel);//传入用户需要的userId
        //调用大数据
        user().getBigData('lottery');
        //开始抽奖
        page.choujiang();
        page.tallhigh();
      }

  });
  page.init();
});