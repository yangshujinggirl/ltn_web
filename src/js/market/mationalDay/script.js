$(function() {

  var dataUrl = '/market/activity/info';

  // 转盘相关
  var lottery = {
    index: -1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置
    init: function(id) {
      if ($("#" + id).find(".lottery-unit").length > 0) {
        $lottery = $("#" + id);
        $units = $lottery.find(".lottery-unit");
        this.obj = $lottery;
        this.count = $units.length;
        $lottery.find(".lottery-unit-" + this.index).addClass("active");
      };
    },
    roll: function() {
      var index = this.index;
      var count = this.count;
      var lottery = this.obj;
      $(lottery).find(".lottery-unit-" + index).removeClass("active");
      index += 1;
      if (index > count - 1) {
        index = 0;
      };
      $(lottery).find(".lottery-unit-" + index).addClass("active");
      this.index = index;
      return false;
    },
    stop: function(index) {
      this.prize = index;
      return false;
    }
  };
  // 转盘是否进行中
  var click = false;
  // 启动转盘
  function roll() {
    lottery.times += 1;
    lottery.roll();
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
      clearTimeout(lottery.timer);
      lottery.prize = -1;
      lottery.times = 0;
      click = false;
      // 转盘结束回调
      setTimeout(function() {
        if(page.$rollContent.attr('data-type')){

          initBCDRoll(page.$rollContent);
        }else{

          updateRoll();
        }
        rollStopBack.call();

      }, 500)
    } else {
      if (lottery.times < lottery.cycle) {
        lottery.speed -= 10;
      } else if (lottery.times == lottery.cycle) {
        // var index = Math.random() * (lottery.count) | 0;
        lottery.prize = parseInt(page.prizeIndex);
      } else {
        if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
          lottery.speed += 110;
        } else {
          lottery.speed += 20;
        }
      }
      if (lottery.speed < 40) {
        lottery.speed = 40;
      };
      //console.log(lottery.times+'^^^^^^'+lottery.speed+'^^^^^^^'+lottery.prize);
      lottery.timer = setTimeout(roll, lottery.speed);
    }
    return false;
  }

  /**
   * [initLottery 初始化转盘]
   * @param  {[type]} id           [ 转盘id ]
   * @param  {[type]} choujiangFun [ 点击抽奖的函数 ]
   * @return {[type]}              []
   */
  function initLottery(id, choujiangFun) {
    lottery.index = 0;
    lottery.init(id);
    var $btn = $('#' + id).find('.choujiang_btn');
    $btn.unbind('click');
    $btn.bind('click', function() {
      // 不同 的按钮状态需要做不同的事情
      if (lottery.click) {
        return false;
      }
      var code = $(this).attr('data-code');
      if($(this).parents('#lottery2').length>0||$(this).parents('#lottery3').length>0||$(this).parents('#lottery4').length>0){
        if(code == '2'){
          user().loginOperate();
        }else if(code == -1){
          window.location.href = "/html/product/#!/short/0/0/1";
        }else if(code==1){
          reward(page.BCDRollType,function(prizeCode){
            // 转盘开始
            choujiangFun.call();
          })
        }

      }else{
        if (code == '2') {
          // alert('去登录');
          user().loginOperate();
        } else if (code == '1') {
          return false;
          // alert('活动结束');
        } else if (code == '3') {
          // alert('投资激活');
          window.location.href = "/html/product/#!/short/0/0/1";
        } else if (code == '4' || code == '6') {
          // alert('立即抽奖');
          // console.log(id);
          goRoll(function(prizeCode) {
            // console.log(prizeCode);
            // 转盘开始
            choujiangFun.call();
          });
        }
      }
    });
  }

  //判断用户是否已经登录
  var initDate = {
    isLogin: false,
  }

  var page = new Page();


  page.energys = {
    //奖品
    "30": {
      isUsable: false, //是否符合兑换条件
      number: 0, //兑换次数
      score: 10, //需要的活力值
      type: 'A',
      name:'20元电话卡',
      index:1
    },
    "31": {
      isUsable: false, //是否符合兑换条件
      number: 0, //兑换次数
      score: 25, //需要的活力值
      type: 'B',
      name:'50元京东卡一张',
      index:2
    },
    "32": {
      isUsable: false, //是否符合兑换条件
      number: 0, //兑换次数
      score: 50, //需要的活力值
      type: 'C',
      name:'小米蓝牙音箱一个',
      index:3
    },
    "33": {
      isUsable: false, //是否符合兑换条件
      number: 0, //兑换次数
      score: 100, //需要的活力值
      type: 'D',
      name:'膳魔师保温杯一个',
      index:4
    },
    "34": {
      isUsable: false, //是否符合兑换条件
      number: 0, //兑换次数
      score: 500, //需要的活力值
      type: 'E',
      name:'双立人刀具七件套一份',
      index:5
    },
  };

  page.prizeIndex = -1;
  //转盘1的相关信息
  page.type1 = {
      //奖品编码
      awardCode: {
        "21": '0', // 5
        "22": '1', // 10
        "23": '2', // 15
        "24": '3', // 20
        "25": '4' // 25
      },
      //奖品名称
      awardName: {
        "0": '5点活力值',
        "1": '10点活力值',
        "2": '15点活力值',
        "3": '20点活力值',
        "4": '25点活力值'
      },
      chance: 0, //抽奖次数
      /**
       * 1表示活动结束 2表示是否登录 3表示投资激活
       * 4表示开始抽奖 5表示暂无机会 6表示再抽一次
       * @type {Number}
       */
      awardStatus: "2",
      //是否渲染过按钮
      isShowBtn: false,
      //中奖下标
      awardIndex: "",
      //是否抽奖中
      isClick: false,
      // 抽到的活力值
      activeValue: 0
    }
    //转盘2的相关信息

  page.type2={
   //奖品编码
   awardCode:{
     "11": '0',
     "12": '1',
     "14": '2',
     "17": '3',
     "15": '4'
   },
   //奖品名称
   awardName:{
     "0": '50元京东卡一张',
     "1": '小米蓝牙音箱一个',
     "2": '九阳豆浆机一台',
     "3": 'iPhone7（128G）一部',
     "4": '双立人刀具七件套一份'
   },
   chance: 0,//抽奖次数
   /**
   * 1表示活动结束 2表示是否登录 3表示投资激活
   * 4表示开始抽奖 5表示暂无机会 6表示再抽一次
   * @type {Number}
   */
   awardStatus: "2",
   //是否渲染过按钮
   isShowBtn: false,
   //中奖下标
   awardIndex: "",
   //是否抽奖中
   isClick: false
  }

  page.type3 = {
      //奖品编码
      awardCode: {
        "13": '0',
        "14": '1',
        "15": '2',
        "17": '3',
        '16': '4'
      },
      //奖品名称
      awardName: {
        "0": '膳魔师保温杯一个',
        "1": '九阳豆浆机一台',
        "2": '双立人刀具七件套一份',
        "3": 'iPhone7（128G）一部',
        "4": '乐视50吋电视一台'
      },
      chance: 0, //抽奖次数
      /**
       * 1表示活动结束 2表示是否登录 3表示投资激活
       * 4表示开始抽奖 5表示暂无机会 6表示再抽一次
       * @type {Number}
       */
      awardStatus: "2",
      //是否渲染过按钮
      isShowBtn: false,
      //中奖下标
      awardIndex: "",
      //是否抽奖中
      isClick: false
    }
    //转盘4的相关信息

  page.type4 = {
    //奖品编码
    awardCode: {
      "15": '0',
      "16": '1',
      "17": '2'
    },
    //奖品名称
    awardName: {
      "0": '双立人刀具七件套一份',
      "1": '乐视50吋电视一台',
      "2": 'iPhone7（128G）一部'
    },
    chance: 0, //抽奖次数
    /**
     * 1表示活动结束 2表示是否登录 3表示投资激活
     * 4表示开始抽奖 5表示暂无机会 6表示再抽一次
     * @type {Number}
     */
    awardStatus: "2",
    //是否渲染过按钮
    isShowBtn: false,
    //中奖下标
    awardIndex: "",
    //是否抽奖中
    isClick: false
  }




  // 获取top50的数据
  page.getData(dataUrl, {
    serviceName: 'AMOUNT_TOP50'
  }, function(data) {
    // 业务调用成功
    if (page.isSuccess(data)) {
      var resData = data.data.result.data; //{{=strUtil().formatPhone(it.tel)}} formatKilo
      page.initTemplate(resData, 'Top50DataWrap', 'templateTop50');
      $('.top-other').kxbdMarquee({
        direction: 'up',
        isEqual: false,
        scrollAmount: 148,
        scrollDelay: 2000
      });
    }
  });

  // 获取邀请活动资格人数据
  page.getData(dataUrl, {
    serviceName: 'NATIONAL_TWO'
  }, function(data) {
    // 业务调用成功
    if (page.isSuccess(data)) {
      var resData = data.data.result; //{{=strUtil().formatPhone(it.tel)}} formatKilo
      page.initTemplate(resData, 'InviteDataWrap', 'templateInvite');
      $('.win_info').kxbdMarquee({
        direction: 'up',
        isEqual: true,
        scrollAmount: 1,
        scrollDelay: 40
      });
    }
  });

  // 活动状态获取,转盘状态
  page.getData(dataUrl, {
    serviceName: 'ISOVER'
  }, function(data) {
    page.rollIsOver = data.data.result;
    initRollActive();
  })



  // 初始化转盘
  function initRollActive() {
    var $tab = $('.truning_list').find('li');
    $tab.bind('click', function() {
      var $self = $(this);
      if ($self.hasClass('active')) {
        return;
      } else {
        var $aciveTab = $self.siblings('li.active');
        $('.turning_cont1').find('.' + $aciveTab.attr('data-tab')).hide();
        var $rollContent = $('.turning_cont1').find('.' + $self.attr('data-tab'));
        $aciveTab.removeClass('active');
        $self.addClass('active');
        page.$currentTab = $self;
        page.$rollContent = $rollContent;
        // 积分活动
        if ($rollContent.hasClass('huolizhi')) {
          // 初始化活力值转盘
          initEnergyValueRoll($rollContent, function() {
            var lotteryId = $rollContent.attr('data-lottery');
            initLottery(lotteryId, function() {
              roll();
            });
            $rollContent.show();
          });
          // 黄金活动
        }else{
          initBCDRoll($rollContent,function(){
            var lotteryId = $rollContent.attr('data-lottery');
            initLottery(lotteryId, function() {
              roll();
            });
            $rollContent.show();
          });
        }
      }
    })
    $tab.eq(0).trigger('click');
  }

  function updateRoll() {
    initEnergyValueRoll(page.$rollContent);
  }

  // 转盘回调
  function rollStopBack() {
    $('.mationalDay_cover').show();
    var prizeTitle,prizeClass;
    // 弹出层
    if (page.$currentTab.attr('data-tab') === 'huolizhi') {
      $('.huolizhi-tips').show().find('.prize_info').text(page.type1.awardName[page.prizeIndex]);
    // 黄金
    }else{
      var index = parseInt(page.prizeIndex)+1;
      if(page.$currentTab.attr('data-tab') === 'gold'){
          prizeTitle = page.type2.awardName[page.prizeIndex];
          prizeClass = 'tp1_prize'+(index);
        // 白金
        }else if(page.$currentTab.attr('data-tab') === 'buckingham'){
          prizeTitle = page.type3.awardName[page.prizeIndex];
          prizeClass = 'tp2_prize'+(index);
        // 钻石
        }else if(page.$currentTab.attr('data-tab') === 'diamonds'){
          prizeTitle = page.type4.awardName[page.prizeIndex];
          prizeClass = 'tp3_prize'+(index);
        }
        $('.congratulations').show().find('.drawn_title2 span').text(prizeTitle);
        $('.congratulations').show().find('.prize_left').removeClass().addClass('prize_left').addClass(prizeClass);
    }
  }

  // 关闭弹出层
  function closeLayOut($parent) {
    $('.mationalDay_cover').hide();
    $parent.hide();
  }
  // 绑定弹出层关闭按钮操作
  $('.drawn_prize').find('.close,.drawn_but').bind('click', function() {
    var parent = $(this).parent('.drawn_prize');
    closeLayOut(parent);
  });


  // 查询抽奖结果
  function getEnergyValueRollRes(chance, callDone) {
    // 从后台获取抽奖结果  result:-1 表示未抽奖，其他数字表示结果
    page.getData('/market/activity/info', {
      serviceName: 'NATIONAL_THREE_INTEGRAL'
    }, function(data) {
      // console.log('查看抽奖结果');
      // console.log(data);
      // data.data.result = -1;
      var res = data.data.result;
      page.type1.activeValue = res; // 活力点数
      updatePrizeNum(res);
      if (chance <= 0) {
        page.type1.awardStatus = "3"; // 投资激活
      } else {
        if (res === -1) {
          page.type1.awardStatus = "4"; // 开始抽奖
        } else {
          page.type1.awardStatus = "6"; // 开始抽奖
        }
      }
      if (res === -1) {
        page.type1.activeValue = 0;
      }
      if (page.rollIsOver == '1') {
        page.type1.awardStatus = "1";
      }
      callDone.apply();
    })
  }
  // 查询抽奖机会
  function getChanceOfEnergyValueRoll(callDone) {
    page.getData(dataUrl, {
      serviceName: 'NATIONAL_THREE_CHANCE'
    }, function(data) {
      var chance = data.data.result;
      // console.log('抽奖机会');
      // console.log(chance);
      callDone.call(this, chance); // 初始化 活力值转盘 -1表示未投资
    });
  }
  // 初始化转盘
  function initEnergyValueRoll($rollContent, callDone) {
    if (user().isLogin()) {
      getChanceOfEnergyValueRoll(function(chance) {
        page.type1.chance = chance;
        getEnergyValueRollRes(chance, function() {
          $rollContent.find('.choujiang_btn').hide().filter('[data-code="' + page.type1.awardStatus + '"]').show();
          updateEnergyValue($rollContent);
          if (callDone) callDone.call();
        });
      });
      // updatePrizeNum();
    } else {
      page.type1.awardStatus = "2"; // 立即登录
      if (page.rollIsOver =='1') {
        page.type1.awardStatus = "1";
      }
      $rollContent.find('.choujiang_btn').hide().filter('[data-code="' + page.type1.awardStatus + '"]').show();
      updateEnergyValue($rollContent);
      callDone.call();
    }
  }

  // 更新 活力转盘的值
  function updateEnergyValue($rollContent) {
    var chance = (page.type1.chance === -1||page.type1.chance=='over')?0:page.type1.chance;
    $rollContent.find('.chance').text(chance);
    $rollContent.find('.activeValue').text(page.type1.activeValue);
  }
  // 抽奖
  function goRoll(callDone) {
    page.getData(dataUrl, {
      serviceName: 'NATIONAL_THREE_DRAW_INTEGRAL'
    }, function(data) {
      if(page.isSuccess(data)){
        var prizeCode = null; // 抽奖中奖code
        prizeCode = data.data.result;
        page.prizeIndex = page.type1.awardCode[parseInt(prizeCode)];
        callDone.call(this, prizeCode);
      }else{
        $('.mationalDay_cover').show();
        $('.exception-tips').show();
      }
    })
  }

  // 兑奖
  function reward(parameter,callDone){
      page.getData(dataUrl,{
        parameter:parameter,
        serviceName:'THREE_DRAW'
      },function(data){
        if(page.isSuccess(data)){

          var prizeCode = null; // 抽奖中奖code
          prizeCode = data.data.result.prizesId;
          // prizeCode = 16;
          if(parameter === 'B'){
            page.prizeIndex = page.type2.awardCode[parseInt(prizeCode)];
          }else if(parameter === 'C'){
            page.prizeIndex = page.type3.awardCode[parseInt(prizeCode)];
          }else if(parameter === 'D'){
            page.prizeIndex = page.type4.awardCode[parseInt(prizeCode)];
          }
          // console.log(page.prizeIndex);
          // console.log(prizeCode);
          callDone.call(this,prizeCode);
        }else{
          $('.mationalDay_cover').show();
          $('.exception-tips').show();
        }
      })
  }

  // 兑换奖品点数量
  function updatePrizeNum(activeValue) {
    page.getData(dataUrl, {
      serviceName: 'EXCHANGE_REWARDS'
    }, function(data) {
      var res = data.data.result;
      // console.log(res);
      for (var i = 0, len = res.length; i < len; i++) {
        var prize = res[i];
        var rewardIdStr = prize.rewardId.toString();
        var prizeObj = page.energys[rewardIdStr];
        page.energys[rewardIdStr].number = prize.number;
      }
      for (var index in page.energys) {
        var tempPrize = page.energys[index];
        if (tempPrize.score <= activeValue) {
          tempPrize.isUsable = true;
        } else {
          tempPrize.isUsable = false;
        }
      }
      var prizBtnList = $('.turning_caption').find('.caption');
      $.each(prizBtnList, function(index) {
        var prizeBtn = prizBtnList[index];
        var prizeCode = $(prizeBtn).attr('data-prizeCode'); // 奖品交表
        var prize = page.energys[prizeCode];
        if (prize.isUsable) {
          $(prizeBtn).find('button').removeClass('disabled');
        } else {
          $(prizeBtn).find('button').addClass('disabled');
        }
        $(prizeBtn).find('.cashing span').text(prize.number || '0');
      })
    })
  }

  // 兑奖
  function rewardPrize(exchangeType,index,nameText) {
    page.getData(dataUrl, {
      exchangeType: exchangeType,
      serviceName: 'NATIONAL_THREE_EXCHANGE_INTEGRAL'
    }, function(data) {
      if (page.isSuccess(data)) {
        $('.mationalDay_cover').show();
        // 兑换失败
        if (data.data.result != 1) {
          $('.bird_reminded').show();
        } else {
          initEnergyValueRoll(page.$rollContent);
          updatePrizeNum(page.type1.activeValue);
          $('.congratulations').show();
          $('.congratulations').find('.prize_left').removeClass().addClass('prize_left');
          $('.congratulations').find('.prize_left').addClass('tp4_prize'+index);
          $('.congratulations').find('.drawn_title2 span').text(nameText);
          $('.congratulations').find('.drawn_title2 i').text('成功兑换');
        }
      }else{
        $('.mationalDay_cover').show();
        $('.exception-tips').show();
      }
    })
  }

  // 兑奖按钮
  $('.turning_caption').find('.caption button').bind('click', function() {
    if ($(this).hasClass('disabled')) {
      return false;
    } else {
      var energys = page.energys[$(this).parents('.caption').attr('data-prizeCode')];
      page.exchangeType = energys.type;
      page.imgIndex = energys.index;
      page.nameText = energys.name;
      // console.log('兑奖exchangeType：' + energys.type);
      // 显示兑奖提示
      $('.mationalDay_cover').show();
      $('.cashing_prize').show();
    }

  })

  // 兑奖提示
  // 取消按钮
  $('.cashing_prize').find('.away').bind('click', function() {
      var parent = $(this).parent('.drawn_prize');
      closeLayOut(parent);
    })
    // 确定按钮
  $('.cashing_prize').find('.sure').bind('click', function() {
    var parent = $(this).parent('.drawn_prize');
    closeLayOut(parent);
    // 开始兑奖
    rewardPrize(page.exchangeType,page.imgIndex,page.nameText);
  })

  // 查询个人中奖纪录
  function getPrizeRecord(parameter,callDone) {
    // console.log(parameter);
      page.getData(dataUrl, {
        parameter: parameter,
        serviceName: 'THREE_ME'
      }, function(data) {
        if (page.isSuccess(data)) {
          var res = data.data.result;
          // 渲染 个人纪录模版
          var contentId = parameter+'_PrizeRecord';
          page.initTemplate(res.resultMe,contentId,'templatePrizeRecord');
          callDone.call(this,res)
        }else{
          var contentId = parameter+'_PrizeRecord';
          page.initTemplate(null,contentId,'templatePrizeRecord');
        }
      })
  }

  // 查询平台中奖纪录
  function getPlatformPrizeRecord(parameter,callDone){
    page.getData(dataUrl,{
      parameter:parameter,
      serviceName:'THREE_RECORD'
    },function(data){
      var res = data.data.result;
      var contentId = parameter+'_PlatformPrizeRecord';
      // console.log(res.resultPlat);
      page.initTemplate(res.resultPlat,contentId,'templatePlatformPrizeRecord');
      callDone.call();
      $('#'+contentId).find('.platform-record-data').kxbdMarquee({
        direction: 'up',
        isEqual: false
        // scrollAmount:4
      });

    })
  }

  page.roll = {
    btnCodeMap:{
      1:'立即抽奖',
      2:'登录',
      3:'活动截止',
      4:'无机会',
      '-1':'投资激活'
    },
    currentCode:1,
    chance:0,
    maxOrderAmt:0
  }

  // 初始化转盘状态，抽奖次数、投资金额
  function initBCDRoll($rollContent,callDone){
    var type = $rollContent.attr('data-type');
    page.BCDRollType = type;
    // 获取平台纪录
    getPlatformPrizeRecord(type,function(){
      if( callDone ) callDone.call();
    })

    if(user().isLogin()){
      // 查询个人中奖信息
      getPrizeRecord(type,function(data){
        page.roll.chance = 0;//data.chance;
        page.roll.maxOrderAmount = data.maxOrderAmount;
        // 无机会
        if(page.roll.chance === 0){
            page.roll.currentCode = 4;
        }else if(page.roll.chance === -1){
            page.roll.currentCode = -1;
        }else{
          page.roll.currentCode =1;
        }
        if(page.rollIsOver == '1')  page.roll.currentCode = 3;
        $rollContent.find('td[data-code]').hide().filter('td[data-code="'+page.roll.currentCode+'"]').show();
        $rollContent.find('.surplus span').text(page.roll.chance===-1?0:page.roll.chance);
        $rollContent.find('.present span').text(page.roll.maxOrderAmount + '元');
      })
    }else{
      page.roll.currentCode = 2;
      page.roll.chance = 0;
      page.roll.maxOrderAmount = 0;
      if(page.rollIsOver == '1')  page.roll.currentCode = 3;
      $rollContent.find('td[data-code]').hide().filter('td[data-code="'+page.roll.currentCode+'"]').show();
      $rollContent.find('.surplus span').text(page.roll.chance===-1?0:page.roll.chance);
      $rollContent.find('.present span').text(page.roll.maxOrderAmount + '元');
      var contentId = type+'_PrizeRecord';
      page.initTemplate({noLogin:true},contentId,'templatePrizeRecord');
      $('.logoIcon').find('.denglu').bind('click',function(){
        user().loginOperate();
      });
    }

  }

});
