$(function () {

  var page = new Page();

  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;

  var _restCnt = $(".drawaward .restcnt"),
  _moneyamount = $('.drawaward #moneyamount'),
  _drawaward = $('.drawaward'),
  _button = $('.drawaward .button');

  var Drawaward = function () {
      this.eggType = null;
      this.isCertain = false;
      this.isGeneralCnt = false;
      this.generalCnt = 0;
      this.certainCnt = 0;
      this.lastCnt = 0;
      this.lastAvg = 0;
      this.winningamount = 0;
  }

  Drawaward.prototype.getEggType = function () {
      return this.isGeneralCnt ? "FBZ " : (this.isCertain ? "BZ" : "FBZ");
  }
  Drawaward.prototype.setRestCnt = function () {
      _restCnt.text(this.certainCnt + this.generalCnt);
  }
  Drawaward.prototype.winMoney = function () {
     _moneyamount.text(this.winningamount);
  }

  Drawaward.prototype.login = function(){
    if (!user().isLogin()) {
      _button.addClass("timeslogin");
    }else{
      _button.addClass("timesbegain");
      if (!(this.certainCnt + this.generalCnt)) {
        _button.addClass("timesno");
      }
    }
  }


    // init page
  Drawaward.prototype.init = function (data) {
      var self = this;
      self.lastCnt = self.lastCnt || data.yesterday_total_user;
      self.lastAvg = self.lastAvg || data.yesterday_bonus_average;
      self.certainCnt = data.certainly_chance;
      self.generalCnt = data.general_chance;
      self.winningamount = data.winning_amount;

      self.isCertain = !!self.certainCnt;
      self.isGeneralCnt =!!self.generalCnt;
      self.eggType = self.getEggType();
      self.setRestCnt();
      self.winMoney();
      self.login();
  }
  // load init data
  Drawaward.prototype.load = function () {
    // this.init({});
      var self = this;
      var clientType = constant().clientType;
      self.sessionKey = constant().sessionKey;
      if (self.sessionKey && self.sessionKey.length>5) {
        $.getJSON(constant().url+"/goldenegg/get",
          {
            "clientType": clientType,
            "sessionKey": self.sessionKey
          },
          function(data) {
              self.init(data.data);
          });
      }
  }
  //hit data
  Drawaward.prototype.hit = function () {
      var self = this;
      var clientType = constant().clientType;
      self.sessionKey = constant().sessionKey;
        $.getJSON(
          // "/html/data/submit.json",
          constant().url+"/goldenegg/submit",
            {
                "clientType": clientType,
                "sessionKey": self.sessionKey,
                "golden_egg_type":self.eggType
            },

          function (data) {
              var data = data.data;
              self.init(data);
              if (data.is_winning == 1) {
                  _drawaward.removeClass("miss");
                  _drawaward.addClass("bingo");
              } else {
                  _drawaward.removeClass("bingo");
                  _drawaward.addClass("miss");
              }

              if (data.certainly_chance + data.general_chance) {
                _button.addClass("timesmore");
              }

          });
  }

  var draw = new Drawaward();

  draw.load();


  //event action
  $('#timesbegain').on('click',function(){
    user().loginOperate();
    $('#drawaward .hammer').animate({
      left: '-=90px',
      top: '+=60px'
    }, 500, function() {
      // Animation complete.
      draw.hit();
       $('#drawaward .hammer').animate({
         left: '+=90px',
         top: '-=60px',
       },1000)
    });
    return false;
  });
  $('#timesmore').on('click',function(){
    _drawaward.removeClass('bingo');
    _drawaward.removeClass('miss');
    _button.removeClass('timesmore');
    _button.addClass("timesbegain");

    return false;
  })

  page.geteggs = function () {
     $.getJSON(
          // "/html/data/top.json",
           constant().url+"/goldenegg/topTen",
            {
              "clientType": clientType
            },
          function(data) {
              if(data.resultCode = "0") {
               var data = data.data;
               page.initTemplate(data,'contenttop','temptop');
              }
              $("#marquee1").kxbdMarquee({direction:"up",isEqual:false,"scrollDelay":22});
              $("#marquee2").kxbdMarquee({direction:"up",isEqual:false,"scrollDelay":22});
          });

  };

  page.init = function () {
    page.setTitle('领投鸟理财-不动产理财颠覆者-天天砸金蛋');
    page.geteggs();
  }
  page.init();


});



