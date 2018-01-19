$(function () {

  var page = new Page();

  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;
  var postData = {};
  page.prodInfo = {}; //产品信息
  var is_Bridcoin = "1"; //是否使用鸟币

  page.buyInfo = {}

  var productId;
  page.w_getData = function () {
    var self = this;
    // http://192.168.18.194:8080/help/helpList?clientType=I
    productId = page.get('productId');
    template().renduTemplate('mutual_detail_position','mutual_detail_position_d',productId);

     $.getJSON(
        // "/html/data/top.json",
         constant().url+"/help/productDetail",
          {
            "clientType": clientType,
            "productId":productId
          },
        function(data) {
            self.data = data.data;
            // console.log(data);
            page.prodInfo = data;
            // template().renduTemplate('tempMutualBanner','MutualBanner',obj);
            template().renduTemplate('mutual_detail_content','mutual_detail_content_d',self.data);

            template().renduTemplate('mutual_detail_risk_1','mutual_detail_risk_1_d',self.data.productContent);
            template().renduTemplate('mutual_detail_risk_2','mutual_detail_risk_2_d',self.data.productRule);
            template().renduTemplate('mutual_detail_risk_4','mutual_detail_risk_4_d',self.data.productWiki);
            
            self.join();
        });

        memberList();
  };

  function memberList(){

      setTimeout(function(){

         var now = Url.getHashParts(1) || 0;

         $.getJSON(
            // "/html/data/top.json",
             constant().url+"/help/memberList",
              {
                "clientType": clientType,
                "currentPage": now,
                "pageSize": "10",
                "productId":productId
              },
            function(data) {
                if(data.resultCode == "0") {
                  self.memberList = data.data;
                  self.memberList.now = now;
                  self.memberList.total = Math.ceil(self.memberList.totalCount/10);
                  self.memberList.productId = productId;
                  template().renduTemplate('mutual_detail_risk_3','mutual_detail_risk_3_d',self.memberList);
                  $("#light-pagination li").on("click", function(){
                    memberList();
                  })
                }
            }
          );
         
      },300);
  }

  page.tag = function() {
    $(".tab_title>li").on("click", function(e){
      $(".tab_title>li").attr("class", "item");
      $(this).addClass("selected");

      var index = $(this).index();

      $(".tab_content>li").hide();
      $(".tab_content>li:eq("+index+")").css("display","block");
    });
  }

  page.join = function() {
    var productId = page.get('productId');
    var userType = this.userType;
    // var userType = '0';
    var userStatus = this.userStatus;

    $('#mutual_join_btn').on('click', investOperation);

    //立即投资处理方法
    function investOperation() {
      user().loginOperate(nameAuthOperate2()); //登录实名处理
    };

    function showBuy() {
      page.getBuyPopup();
      var cover = $('.common-cover'),
          dialog = $('#buy');
          cover.show();
          dialog.show();
      // window.location.href = '/html/mutual/mutual_details/confirm/#!/'+productId;
    }

    //实名处理方法
    function nameAuthOperate2() {
      return function() {
        if(userType=='1') {
          if(userStatus=='-1')  {
            window.location.href = '/html/user/corporate_fail/'
          } else if(userStatus=='0') {
            window.location.href = '/html/user/corporate_success/'
          } else if(userStatus=='2') {
            window.location.href = '/html/user/corporate_realname1/'
          } else if(userStatus=='1') {
            user().nameAuthOperate(showBuy);
          }
        } else {
          user().nameAuthOperate(showBuy);
        }
      }
    };
  }

  
  //获取投资弹窗的数据
  page.getBuyPopup = function() {
    var productId = page.get('productId');
    return page.getData(
      '/user/userInfo', {}, [initTemp]);

    function initTemp(data) {
      // console.log(data);
      if (data.resultCode === '0') {

        data = data.data;
        //重新创建一个购买数据
        page.buyInfo.prodInfo = page.prodInfo;
        page.buyInfo.userInfo = data;
        postData.productRemainAmount = data.usableBalance;
        postData.isNoPwdTZ = data.isNoPwdTZ;

       $.getJSON(
         constant().url+"/user/orderhz/orderhzprepare",
          {
            "clientType": clientType,
            "productId":productId,
            "sessionKey":sessionKey,
            "orderAmount":page.buyInfo.prodInfo.data.singleLimitAmount,
            "cashbackCoupon":"0",
            "birdCoin":"0",
          },
        function(data_t) {
          // console.log(data_t.data.birdCoin);
            if(data_t.resultCode == "0") {

              page.buyInfo.coin = data_t.data.birdCoin;
              page.buyInfo.actual = page.buyInfo.prodInfo.data.useBridcoinTag == 1 && is_Bridcoin ? page.buyInfo.prodInfo.data.singleLimitAmount - data_t.data.birdCoin : page.buyInfo.prodInfo.data.singleLimitAmount;
              page.initTemplate(page.buyInfo, 'buy', 'tempBuy');

              addEvent();
            }
        });


      }
    }
    //绑定事件处理
    function addEvent() {

      var productId = page.get('productId');
      $("#btnBuy").on("click", function(){
        //余额充足
        if(page.buyInfo.prodInfo.data.singleLimitAmount > page.buyInfo.userInfo.usableBalance){
          $("#amount-validate").show();
        }else{
          window.location.href = '/html/mutual/mutual_details/confirm/#!/'+productId+'/'+is_Bridcoin;
        }
      });

      //关闭弹窗事件
      $('#buyClose').on('click', hideBuy);

      function hideBuy() {

        $('.common-cover').hide();
        $("#buy").hide();

        page.oldMoney=0;//还原旧金额
      };

      //选择是否鸟币抵用
      $('#isUse').on('click', function() {
        var is_select = $(this).is(':checked');
        if(!is_select) {
          is_Bridcoin = "0";
          $("#actual").text(page.buyInfo.prodInfo.data.singleLimitAmount + "元");
        } else {
          is_Bridcoin = "1";
          $("#actual").text(page.buyInfo.actual + "元");
        }
      });
    };

  };

  page.init = function () {

    this.userStatus = session().get('userStatus');
    this.userType = session().get('userType');

    page.set('productId', Url.getHashParts(0));

    this.w_getData();
    this.tag();
    // console.log(productId);

    page.setTitle('领投鸟理财-不动产理财颠覆者-互助详情');

  }



  page.init();


});



