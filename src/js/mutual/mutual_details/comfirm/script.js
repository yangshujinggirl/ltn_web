$(function () {

  var page = new Page();

  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;
  var singleLimitAmout = "";
  var productId;
  var proDetail;
  var orderhzprepare_data;
  var is_Bridcoin = 1;

  page.w_getData = function () {
    var self = this;
    var orderAmount;
    productId   = page.get('productId');
    is_Bridcoin = page.get('is_Bridcoin');

    $.getJSON(
       constant().url+"/help/productDetail",
        {
          "clientType": clientType,
          "productId":productId
        },
      function(data) {
        proDetail = data;
        singleLimitAmout = data.data.singleLimitAmount;
         $.getJSON(
           constant().url+"/user/orderhz/orderhzprepare",
            {
              "clientType": clientType,
              "productId":productId,
              "sessionKey":sessionKey,
              "orderAmount":singleLimitAmout,
              "cashbackCoupon":"0",
              "birdCoin":"0",
            },
          function(data) {
              if(data.resultCode == "0") {
                orderhzprepare_data = data;

                data.data.orderAmount = singleLimitAmout;
                data.data.payAmount = is_Bridcoin == 1 ? singleLimitAmout - data.data.birdCoin : singleLimitAmout;
                data.data.proDetail = proDetail;
                data.data.is_Bridcoin = is_Bridcoin;
                // console.log(data.data);
                template().renduTemplate('confirm_content','confirm_content_d',data.data);

                page.wsubmit();

              } else {
                alert("请先登陆。");
                window.location.href="/html/user/login/?url=/html";
              }
          });

      });
  };

  page.wsubmit = function(){

    $("#buy").on("click", function(){

        $("#buy").addClass("notPoint").attr("disabled","disabled").text("提交中...");

       page.getData('/pc/user/info',{},function(data){
         var user = data.data;
         if(user.agreementTZ =='1'){

          var tmpBirdCoin = is_Bridcoin == 1 ? orderhzprepare_data.data.birdCoin : 0;
          // console.log(is_Bridcoin);
          // console.log(proDetail);
          // console.log(tmpBirdCoin);

          $.post(constant().url+"/user/orderconfirm", {
            birdCoin: tmpBirdCoin,
            clientType: clientType,
            orderAmount: singleLimitAmout,
            productId: productId,
            sessionKey: sessionKey
          }, function(data){
            if(data.resultCode == "0"){
              $(".mutual-success").show();
            }else{
              $("#resultMessage").text(data.resultMessage);
              $(".mutual-fail").show();
            }
          });

         }else{
           page.getData('/user/agreement',
               {agreement_type: 'ZTBB0G00'},
               [setURL]);
         }
       });

    });

  }

  function setURL(data) {
    if (page.isSuccess(data)) {
      data = data.data;
      page.set('noPwdTZUrl', data.url);
      page.noPwdTZUrl = data.url;
      submit();
    }
  }

  function submit() {
    page.goNoPsd();
    $('#message').show();
    $('#submit').text('投资中...').prop('disabled','disabled');
  }

  //跳转去开通投资免密
  page.goNoPsd=function(){
    var param={
          agreement_type: 'ZTBB0G00',
          unbind: '0'
      };
    user().goNewPage(param,'7');
    page.showDialog('#noPsdPopup');
  };


  //跳转去开通投资免密
  page.goNoPsd=function(){
    var param={
          agreement_type: 'ZTBB0G00',
          unbind: '0'
      };
    user().goNewPage(param,'7');
    page.showDialog('#noPsdPopup');
  };

  page.buy = function() {
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
      window.location.href = '/html/mutual/mutual_details/confirm/#!/'+productId;
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
  

  page.init = function () {

    this.userStatus = session().get('userStatus');
    this.userType = session().get('userType');

    page.set('productId', Url.getHashParts(0));
    page.set('is_Bridcoin', Url.getHashParts(1));
    this.w_getData();
    // console.log(productId);

    
    $('#msg-done').on('click', function() {
      page.hideDialog('#message');
      location.reload();
      // page.initCrowd();
    });
    $('#msg-fail').on('click', function() {
      location.href = '../../../help/about';
    });

    page.setTitle('领投鸟理财-不动产理财颠覆者-互助下单');

  }
  page.init();


});



