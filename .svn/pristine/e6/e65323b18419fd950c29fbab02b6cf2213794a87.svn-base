window.RP = function(){

  var clientType  = constant().clientType;
  var sessionKey  = constant().sessionKey;
  var baseUrl     = constant().url;
  var page        = new Page();

  var self = this;

  this.init = function(){

    self.is_over();
    self.recordLoading();
    self.recordNum();
    // self.getVitality();
    self.getCondition();

    // console.log(sessionKey);
  }

  //获取推荐有礼
  this.getCondition = function(){

    $.post(baseUrl + '/market/activity/info', {
        clientType: 'PC',
        invoke: '3rdActChance',
        serviceName: 'OCTOBER',
        sessionKey: sessionKey
    }, function(data) {
        if (data.resultCode == '0') {
            var data = data.data.result;
            //具备活动资格
            if(data.isHaveChance=='1'){
              $('#hasStatus').text('您符合条件，可以参与本次活动');
            }else{
              $('#hasStatus').text('您不符合本次活动条件，查看>>');
              //不符合条件查看
              $('#hasStatus').on('click',function(){
                $('#userInfo').show();
                $('#userInfoMoney').html(data.orderAmount);//订单金额
                $('#userInfoNum').html(data.orderCount);//订单数量
              })
            }
        } else if (data.resultCode == '10000006') { //登录超时
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert("请先登录");
            }
        } else {
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert(data.resultMessage);
            }
        }
    });
  }

  //获取个人活力值
  // this.getVitality = function(){

  //   $.post(baseUrl + '/market/activity/info', {
  //       clientType: 'PC',
  //       invoke: '2ndActIntegral',
  //       integralType: 'OCTOBER',
  //       serviceName: 'OCTOBER',
  //       sessionKey: sessionKey
  //   }, function(data) {
  //       if (data.resultCode == '0') {
  //           var data = data.data.result;
  //           page.vigorNum = data; //活力值赋值
  //           $('#hasVitality').text('您当前有' + data + '点活力值'); //获取活力值显示
  //       } else if (data.resultCode == '10000006') { //登录超时
  //           page.errorIndex++;
  //           if (page.errorIndex == 1) {
  //               alert("请先登录");
  //           }
  //       } else {
  //           page.errorIndex++;
  //           if (page.errorIndex == 1) {
  //               alert(data.resultMessage);
  //           }
  //       }
  //   });
  // }

  //平台和个人 中奖纪录轮播
  this.recordLoading = function(){

    //获取平台中奖记录
    $.post(baseUrl + '/market/activity/info', {
        clientType: 'PC',
        invoke: '2stActWinnings',
        serviceName: 'OCTOBER',
        sessionKey: sessionKey
    }, function(data) {
        if (data.resultCode == '0') {
            var data = data.data.result;
            //渲染模板
            page.initTemplate(data, 'platformList', 'tempPlatformList');
            // 平台记录自动走
            
            $('#B_PlatformPrizeRecord').find('.platform-record-data').kxbdMarquee({
              direction: 'up',
              isEqual: false
              // scrollAmount:4
            });
        } else if (data.resultCode == '10000006') { //登录超时
            page.errorIndex++;
            if (page.errorIndex == 1) {
                console.log("获取平台中奖记录，需要先登录");
            }
        } else {
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert(data.resultMessage);
            }
        }
    });

    //获取个人中奖记录
    $.post(baseUrl + '/market/activity/info', {
        clientType: 'PC',
        invoke: '2stActPersonalWinnings',
        serviceName: 'OCTOBER',
        sessionKey: sessionKey
    }, function(data) {
        if (data.resultCode == '0') {
            var data = data.data.result;
            //渲染模板
            page.initTemplate(data, 'personList', 'tempPersonList');

            $('#A_PlatformPrizeRecord').find('.platform-record-data').kxbdMarquee({
              direction: 'up',
              isEqual: false
              // scrollAmount:4
            });
        } else if (data.resultCode == '10000006') { //登录超时
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert("请先登录");
            }
        } else {
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert(data.resultMessage);
            }
        }
    });
  }

  //平台和个人 领奖人数   如果没登录则绑定登录按钮事件
  this.recordNum = function(){

    $.post(baseUrl + '/market/activity/info', {
        clientType: 'PC',
        invoke: '3rdActBirdCoinAll',
        serviceName: 'OCTOBER',
        sessionKey: sessionKey
    }, function(data) {
        console.log("平台数据");
        console.log(data);
        if (data.resultCode == '0') {
            var data = data.data.result;
            //渲染模板
            page.initTemplate(data, 'paltformNum', 'tempPaltformNum');
        } else if (data.resultCode == '10000006') { //登录超时
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert("请先登录");
            }
        } else {
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert(data.resultMessage);
            }
        }
    });

    $.post(baseUrl + '/market/activity/info', {
        clientType: 'PC',
        invoke: '3rdActBirdCoinPersonal',
        serviceName: 'OCTOBER',
        sessionKey: sessionKey
    }, function(data) {
        console.log("个人数据");
        console.log(data);
        if (data.resultCode == '0') {
            var data = data.data.result;
            //渲染模板
            page.initTemplate(data, 'personNum', 'tempPersonNum');
        } else if (data.resultCode == '10000006' || data.resultCode == '10000005') { //登录超时

            $('.investment_but').on('click',function(){
              window.location.href="/html/user/login/?url=/html/market/redpacket/";
            });
            $("#personNum").hide();//隐藏表格个人记录

            page.errorIndex++;
            if (page.errorIndex == 1) {
              alert("请先登陆。");
              window.location.href="/html/user/login/?url=/html/market/redpacket/";
            }
        } else {
            page.errorIndex++;
            if (page.errorIndex == 1) {
                alert(data.resultMessage);
            }
        }
    });
  }

  //红包雨数据总调度
  this.get = function(module, data, callback){

    winningTimes = 0;
    if(data.winningTimes) winningTimes = data.winningTimes;

   $.getJSON(
     baseUrl + "/market/activity/info",
      {
        "clientType": clientType,
        "sessionKey":sessionKey,
        "invoke":module,
        "winningTimes": winningTimes,
        "serviceName":"OCTOBER"
      },
    function(data) {
        if(data.resultCode == "0") {
          callback(data.data.result);
        } else {
          console.log(data);
          alert("请先登陆。");
          window.location.href="/html/user/login/?url=/html/market/redpacket/";
        }
    });
  }

  //活动是否结束
  this.is_over = function(){

    self.get("isOver", {}, function(data){

      if(data !== "0"){
        alert("活动已经结束");
        window.location.href="/html/";
      }

    });
  }

  //申请红包券 （产生奖励
  this.firstGet = function(data, callback){

    self.get("1stActRewards", data, function(data){

      if(data !== "0"){
        callback(data);
      }

    });
  }

  //红包雨 是否还有机会
  this.hasChance = function(callback){

    var r = self.get("1stActChance", {}, function(data){

      if(data == "1"){
        callback(true);
      }else{
        callback(false);        
      }

    });
  }

  //红包雨 确定提交  确定领卷
  this.submitRP = function(callback){

    $("#RP_limit").hide();
    $("#RP_max").hide();

    self.get("1stActConfirm", {}, function(data){

      if(data !== "0"){
        callback(data);
      }

    });
  }

  //二次查询自己获得的券id
  this.secondGet = function(callback){

    self.get("1stActWinnings", {}, function(data){

      if(data !== "0"){
        callback(data);
      }

    });
  }

  return (function(){

    self.init();
  })();
}


$(function(){
  var rp          = new RP();
  var RP_pic      = {"src":"/img/redpacket/red_icon1.png","width":"88","height":"88"};
  var game_data   = {};
  var baseUrl     = constant().url;
  var sessionKey  = constant().sessionKey;
  var page        = new Page();
  page.vigorNum   = 0; //活力值
  page.isEnd      = false;
  page.sessionKey = constant().sessionKey;

  window.countDownClock;
  window.clock;

  //达人宝箱
  page.silverAward = {
          "1": '1', //空
          "2": '2', //2点活力值
          "3": '3', //5000返15
          "4": '4', //20元话费
          "5": '5', //欧尚六件套
          "6": '6' //美的烤箱
      }
      //至尊宝箱
  page.goldAward = {
          "1": '7', //返现券10000
          "2": '8', //20元话费
          "3": '9', //50元京东卡
          "4": '10', //欧尚六件套
          "5": '11', //美的烤箱
          "6": '12' //iPhone7
      }

  $('.look1').on('click',function(){
    $('.prize_img').show();
  });
  $('.look2').on('click',function(){
    $('.prize_img2').show();
  });
  $('.cha1').on('click',function(){
    $('.prize_img').hide();
  });
  $('.cha2').on('click',function(){
    $('.prize_img2').hide();
  });
  $('.cha3').on('click',function(){
    $("#userInfo").hide();
  });
  $('#closeNoVigor').on('click',function(){
    $("#noVigor").hide();
  });
  $('.address .cha2').on('click',function(){
    $(".address").hide();
  });



  $('#goback').on('click',function(){
    $(".prize_two").hide();
    $(".redpacket_rain").hide();
  });

  $('.setaddress').on('click',function(){
    $(".address").show();
  });

  // 开达人宝箱
  $('.dresser').on('click', function() {
      if (page.isEnd) {
         alert(page.endText);
      } else {
          //已登录
          if (page.isLogin()) {
              //活力值是否充足
              if (page.vigorNum >= 1) {
                  $('.cover').show();
                  $('.daren_bg3').attr('src','/img/redpacket/darenbaoxiang.gif');
                  //调用抽奖,开启达人宝箱
                  page.getLottery('silver');
              } else {
                  page.noVigorPopup();
              }
          } else { //未登录
              alert("未登录");
          }
      }
  });

  // 开至尊宝箱
  $('.cachet').on('click', function() {
      if (page.isEnd) {
        alert(page.endText);
      } else {
          //已登录
          if (page.isLogin()) {
              //活力值是否充足
              if (page.vigorNum >= 10) {
                  $('.cover').show();
                  $('.daren_bg4').attr('src','/img/redpacket/zhizunbaoxiang.gif');
                  //调用抽奖,开启至尊宝箱
                  page.getLottery('gold');
              } else {
                  page.noVigorPopup();
              }
          } else { //未登录
              alert("未登录");
          }
      }
  });

  //活力值不满足弹窗
  page.noVigorPopup = function() {
      $('.cover').show();
      $('#noVigor').show(); //活力值不满足弹窗出现
      //关闭弹窗
      $('#noVigor .life_left').on('click', function() {
          $('.cover').hide();
          $('#noVigor').hide(); //活力值不满足弹窗关闭
      });
  }

  //是否登录
  page.isLogin = function() {
      if (page.sessionKey == "" || typeof(page.sessionKey) == 'undefined') {
          return false;
      } else {
          return true;
      }
  }

  //获取用户活力值
  page.getUserVigor = function() {
      $.post(baseUrl + '/market/activity/info', {
          clientType: 'PC',
          invoke: '2ndActIntegral',
          integralType: 'OCTOBER',
          serviceName: 'OCTOBER',
          sessionKey: sessionKey
      }, function(data) {
          if (data.resultCode == '0') {
              var data = data.data.result;
              page.vigorNum = data; //活力值赋值
              console.log("活力值");
              console.log(page.vigorNum);
              $('#hasVitality').text('您当前有' + data + '点活力值'); //获取活力值显示
          } else if (data.resultCode == '10000006') { //登录超时
              page.errorIndex++;
              if (page.errorIndex == 1) {
                alert("请先登陆。");
                window.location.href="/html/user/login/?url=/html/market/redpacket/";
              }
          } else {
              page.errorIndex++;
              if (page.errorIndex == 1) {
                  alert(data.resultMessage);
              }
          }
      });
  };

  //调用抽奖
  page.getLottery = function(type) {
      $.post(baseUrl + '/market/activity/info', {
          clientType: 'PC',
          exchangeType: type,
          invoke: '2ndActLuckDraw',
          serviceName: 'OCTOBER',
          sessionKey: sessionKey
      }, function(data) {
          if (data.resultCode == '0') {
              var data = data.data.result;
              page.getUserVigor(); //重新获取活力值
              //达人宝箱
              if (type == 'silver') {
                  console.log("达人宝箱");
                  console.log(data);
                  var index = page.silverAward[data]; //奖品对应下标
                  if (index == '1') { //未中奖
                      setTimeout(function() {
                          $('.daren_bg3').attr('src','').hide();
                          $('.Notwinning').show();
                          $('.againGo').addClass('type1');
                          page.initBtnAgain('type1');
                      }, 1000);
                      //关闭未中奖弹窗
                      $('.Notwinning .life_left').on('click', function() {
                          $('.Notwinning').hide();
                          $('.cover').hide();
                      });
                  } else { //中奖
                      setTimeout(function() {
                          $('.daren_bg3').attr('src','').hide();
                          $('.box_prize').show();
                          $('.box_prize .prize_img2')[0].className = "prize_img2"; //清空中奖
                          $('.box_prize .prize_img2').addClass('tup' + index); //中奖图片
                          $('.againGo').addClass('type1');
                          page.initBtnAgain('type1');
                      }, 1000);
                      //关闭中奖弹窗
                      $('.box_prize .life_left').on('click', function() {
                          $('.box_prize').hide();
                          $('.cover').hide();
                      });
                  }
              } else { //至尊宝箱
                  console.log("至尊宝箱");
                  console.log(data);
                  var index = page.goldAward[data]; //奖品对应下标
                  setTimeout(function() {
                      $('.daren_bg4').attr('src','').hide();
                      $('.box_prize').show();
                      $('.box_prize .prize_img2')[0].className = "prize_img2"; //清空中奖
                      $('.box_prize .prize_img2').addClass('tup' + index); //中奖图片
                      $('.againGo').addClass('type2');
                      page.initBtnAgain('type2');
                  }, 1000);
                  //关闭中奖弹窗
                  $('.box_prize .life_left').on('click', function() {
                      $('.box_prize').hide();
                      $('.cover').hide();
                  });
              }
          } else if (data.resultCode == '10000006') { //登录超时
              page.errorIndex++;
              if (page.errorIndex == 1) {
                alert("请先登陆。");
                window.location.href="/html/user/login/?url=/html/market/redpacket/";
              }
          } else {
              page.errorIndex++;
              if (page.errorIndex == 1) {
                  alert(data.resultMessage);
              }
          }
      });
  };

  //初始化再抽一次按钮
  page.initBtnAgain = function(type) {
    //判断是否具备再抽一次的条件
    if (type == 'type1') {
        if (page.vigorNum < 1) {
            $('.againGo').addClass('noClick');
        } else {
            $('.againGo').removeClass('noClick');
        }
    } else {
        if (page.vigorNum < 10) {
            $('.againGo').addClass('noClick');
        } else {
            $('.againGo').removeClass('noClick');
        }
    }

  }


  page.init = function(){
    page.getUserVigor();
  }
  page.init();

  //再抽一次
  $('.againGo').on('click', function() {
      var _this = $(this);
      if (_this.hasClass('noClick')) {
          return false;
      }
      $('.box_prize').hide();
      $('.Notwinning').hide();
      //达人宝箱
      if (_this.hasClass('type1')) {
          $('.daren_bg3').show().attr('src','/img/redpacket/darenbaoxiang.gif');
          page.getLottery('silver'); //重新抽奖
      } else { //至尊宝箱
          $('.daren_bg4').show().attr('src','/img/redpacket/darenbaoxiang.gif');
          page.getLottery('gold'); //重新抽奖
      }

  });

  //收货地址 确认提交地址
  $('#sure').on('click',function(){

    var rule='^1[3|4|5|7|8][0-9]{9}$';//手机号码正则
    var regex=new RegExp(rule)

    var province=$('#province1').val();//省
    var city=$('#city1').val();//市
    var area=$('#district1').val();//县
    var address=$('#txtAddress').val();//地址
    var name=$('#txtName').val();//姓名
    var phone=$('#txtTel').val();//电话

    if(province==''){
      alert("请选择省份")
      return false;
    }else if(city==''){
      alert("请选择市")
      return false;
    // }else if(area==''){
    //   alert("请选择县")
    //   return false;
    }else if(address==''){
      alert("请填写地址")
      return false;
    }else if(name==''){
      alert("请填写姓名")
      return false;
    }else if(phone==''){
      alert("请填写手机号")
      return false;
    }else if(!(regex.test(phone))){
      alert("请填写正确的手机号码")
      return false;
    }

    //拼接的地址
    var currentAddress=province+city+area+address+','+name+','+phone;

    $.post(baseUrl + '/market/activity/info', {
          clientType: 'PC',
          invoke: 'confirmAddr',
          serviceName: 'OCTOBER',
          sessionKey: sessionKey,
          parameter: currentAddress
      }, function(data) {
          if (data.resultCode == '0') {
              var data=data.data.result;
              if(data=='1'){
                 alert("提交成功");
              }else{
                 alert("提交失败");
              }
          } else if (data.resultCode == '10000006') { //登录超时
              page.errorIndex++;
              if (page.errorIndex == 1) {
                 alert("请先登录");
              }
          } else {
              page.errorIndex++;
              if (page.errorIndex == 1) {
                 alert(data.resultMessage);
              }
          }
      });
    $('.address').hide();
  });

  //红包雨领取奖励
  $('.accept').on('click',function(){
    
    // game_data

    rp.submitRP(function(data){
      if(!data){
        console.log("领取成功");
        $("#RP_limit").hide();
        $("#RP_max").hide();

        $("#complete").show();
        
      }else{
        
        show_accept();
      }
    })
  });

  //红包雨点击"抢"
  $('.qiang').on('click',function(){

    rp.hasChance(function(data){
      if(!data){
        console.log("已经抢过");
        show_accept();

      }else{
        $('.redpacket_rain').show();
        $('body').scrollTop(0).css("overflow", "hidden");

        countDown(start);
      }
    });
  });

  //红包雨再来一次
  $('.red_rian_one .agin, .red_rian_agin').on('click',function(){

    rp.hasChance(function(data){
      if(!data){
        console.log("已经抢过");
        show_accept();

      }else{
        $(".prize_two").hide();
        $(".red_rian_one").hide();

        countDown(reload);

      }
    });
  });

  //关闭红包雨窗口
  $('.close_rain').on('click',function(){
    $('body').css("overflow", "scroll");
    $('.redpacket_rain').hide();
    removeSnow();

    $("#stick_black .stick").removeClass("stick_run");

    $(".prize_two").hide();
    $(".red_rian_one").hide();
  });

  //已经领过
  function show_accept(){
    $(".prize_two").show();
    $("#complete").show();

    rp.secondGet(function(data){

      console.log(data);
      $(".teo_list li").hide();

      if(data.length > 0){
        for(var i = 0; i < data.length; i++) {
          $("#a"+data[i]).show();
        } 
      }

    });
  }

  //倒计时
  function countDown(callback){
    $(".count_down_numbers").show();//显示倒计时数字

    var i = 2;
    clock = setInterval(function(){
      $(".count_down_numbers img:eq("+(i+1)+")").hide();
      $(".count_down_numbers img:eq("+i+")").show();

      if(i == -1) callback(clock);
      i--;
    }, 1000);
  }

  //进度条
  function schedule(status){
    $("#stick_black .stick").addClass("stick_run");

    var second = 9;

    countDownClock = setInterval(function(){
      $(".second").text(second);
      second--;

      if(second == 0) clearInterval(countDownClock);
    }, 1000);
  }

  //开始游戏
  function start(clock){
    clearInterval(clock);
    $(".count_down_numbers").hide();

    schedule("start");
    createSnow(RP_pic, 20, gameOver);
  }

  //重新开始游戏
  function reload(clock){
    clearInterval(clock);
    $(".count_down_numbers").hide();


    schedule("reload");
    reloadSnow(RP_pic, 20, gameOver);
  }

  //游戏结束
  function gameOver(result){

    game_data = result;

    rp.firstGet({winningTimes: game_data.RP_num}, function(data){

      $(".teo_list li").hide();

      if(data){
        for(var i = 0; i < data.length; i++) {
          $("#a"+data[i]).show();
        }
      }

    });

    $("#stick_black .stick").removeClass("stick_run");
    $(".second").text("10");

    if(result.RP_num == 0){
      $(".red_rian_one").show();

    }else if(result.RP_num < 5){
      $(".prize_two").show();
      $("#RP_limit").show();
      $("#RP_num").text(result.RP_num);
    
    }else{

      $(".prize_two").show();
      $("#RP_limit").hide();
      $("#RP_max").show();

    }
  }
});

//红包效果
//demo createSnow({"src":"image/red_icon1.png","width":"88","height":"88"}, 20);
(function() {
  function k(a, b, c) {
    if (a.addEventListener) a.addEventListener(b, c, false);
    else a.attachEvent && a.attachEvent("on" + b, c)
  }
  function g(a) {
    if (typeof window.onload != "function") {
      window.onload = a;
    } else {
      var b = window.onload;
      window.onload = function() {
        b();
        a();
      }
    }
  }
  function h() {
    var a = {};
    for (type in {
      Top: "",
      Left: ""
    }) {
      var b = type == "Top" ? "Y": "X";
      if (typeof window["page" + b + "Offset"] != "undefined") a[type.toLowerCase()] = window["page" + b + "Offset"];
      else {
        b = document.documentElement.clientHeight ? document.documentElement: document.body;
        a[type.toLowerCase()] = b["scroll" + type]
      }
    }
    return a
  }
  function l() {
    var a = document.body,
    b;
    if (window.innerHeight) b = window.innerHeight;
    else if (a.parentElement.clientHeight) b = a.parentElement.clientHeight;
    else if (a && a.clientHeight) b = a.clientHeight;
    return b
  }

  var is_down = false;
  g(function() {
    is_down = true
  });
  var on_off = true;
  var countDown = 10000;
  var frame = 20;
  var result = {message: "nothing", RP_num : 0};
  var clickNum = 0;//已打开的红包数量
  var no_callback = false;

  window.createSnow = function(image, total, callback) {
    is_down = true;
    countDown=10000;
    no_callback = false;

    if (is_down) {
      var c = [],
      clock = setInterval(function() {
        if(countDown <= 0 || result.RP_num >= 5) {
          clearInterval(clock)
          for (var d = c.length - 1; d >= 0; d--) {
            c[d].remove();
          }

          if(!no_callback) callback(result);
          return;
        }

        countDown -= frame;
        
        on_off && total > c.length && Math.random() < total * 0.00125 && c.push(new i(image)); 
        ! on_off && !c.length && clearInterval(clock); // 停止所有
        for (var e = h().top, n = l(), d = c.length - 1; d >= 0; d--) {
          if (c[d]){
            if (c[d].top > 1000 || c[d].top + c[d].size + 1 > e + n) {
              c[d].remove();
              c[d] = null;
              c.splice(d, 1)
            } else {
              c[d].move();
              c[d].draw()
            }
          } 
        }
          
      }, frame);
      // k(window, "scroll", function() {
      //   for (var e = c.length - 1; e >= 0; e--) c[e].draw()
      // })
    } else g(function() {
      createSnow(image, total, callback)
    })
  };
  window.removeSnow = function() {
    clickNum = 0;
    is_down = false;
    on_off=true;
    countDown=0;
    clearInterval(window.countDownClock);//清空进度条计时器
    clearInterval(window.clock);//倒计时计时器
    $("#stick_black .stick").removeClass("stick_run");
    $(".second").text('10');

    no_callback = true;
  };
  window.reloadSnow = function(image, total, callback) {
    on_off = true;
    result.RP_num = 0;
    clickNum = 0;
    is_down = true;
    createSnow(image, total, callback);
  };

  //创建红包对象
  function i(a) {
    this.parent = document.body;
    this.createEl(this.parent, a.src);
    this.el.style.width = a.width + "px";
    this.el.style.height = a.height + "px";
    this.maxLeft = document.body.offsetWidth - parseFloat(a.width);
    this.maxTop = document.body.offsetHeight - parseFloat(a.height);
    this.left = (Math.random()*6+2)/10 * this.maxLeft;
    this.top = h().top + 1;
    this.angle = 1.4 + 0.2 * Math.random();
    this.minAngle = 1.4;
    this.maxAngle = 1.6;
    this.angleDelta = 0.01 * Math.random();
    this.speed = 4 + Math.random()
  }
  i.prototype = {
    createEl: function(a, image) {
      this.el = document.createElement("img");
      this.el.setAttribute("src", image);
      this.el.style.position = "absolute";
      this.el.style.top = "0";
      this.el.style.left = "0";
      this.el.style.display = "block";
      this.el.style.zIndex = "99999";
      this.parent.appendChild(this.el)

      var self = this;

      function clickEvent(){
        if( Math.random() > 0.5 || clickNum == 2) {
          self.el.src = "/img/redpacket/red_icon2.png";
          result.RP_num++;
          clickNum = 0;
        } else {
          self.el.src = "/img/redpacket/red_icon3.png";
        }
        self.el.removeEventListener("click", clickEvent);
        clickNum++;
      }
      this.el.addEventListener("click", clickEvent);
    },
    move: function() {
      if (this.angle < this.minAngle || this.angle > this.maxAngle) this.angleDelta = -this.angleDelta;
      this.angle += this.angleDelta;
      // this.left += this.speed * Math.cos(this.angle * Math.PI);
      this.top -= this.speed * Math.sin(this.angle * Math.PI);
      if (this.left < 0) this.left = this.maxLeft;
      else if (this.left > this.maxLeft) this.left = 0
    },
    draw: function() {
      // this.el.style.top = Math.round(this.top) + "px";
      // this.el.style.left = Math.round(this.left) + "px"
      this.el.style.transform = "translate(" +Math.round(this.left)+"px,"+Math.round(this.top)+"px)";
    },
    remove: function() {
      this.parent.removeChild(this.el);
      this.parent = this.el = null
    }
  }
})();