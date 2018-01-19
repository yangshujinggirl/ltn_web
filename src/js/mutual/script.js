$(function () {

  var page = new Page();

  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;

  var Drawaward = function () {
      this.eggType = null;
      this.isCertain = false;
      this.isGeneralCnt = false;
      this.generalCnt = 0;
      this.certainCnt = 0;
      this.lastCnt = 0;
      this.lastAvg = 0;
      this.winningamount = 0;

      this.init();
  }

    // init page
  Drawaward.prototype.init = function (data) {
    var self = this;

  }

  var draw = new Drawaward();

  page.getBanner = function () {
    // http://192.168.18.194:8080/help/helpList?clientType=I
     $.getJSON(
        // "/html/data/top.json",
         constant().url+"/page/banner",
          {
            "clientType": clientType,
            "location":2
          },
        function(data) {
            if(data.resultCode == "0") {
              console.log(obj);
              var obj = data.data;
              template().renduTemplate('tempMutualBanner','MutualBanner',obj);
            }
        });

    // var data = {
    //     "data": {
    //         "bannerList": [
    //             {
    //                 "bannerContent": "测试内容5068",
    //                 "bannerId": "测试内容3k9k",
    //                 "bannerPicture": "测试内容7425",
    //                 "bannerTitle": "测试内容7845",
    //                 "bannerUrl": "测试内容7q41",
    //                 "forModel": "测试内容n395",
    //                 "isShare": 70101,
    //                 "shareContent": "测试内容8x20",
    //                 "shareIcon": "测试内容9590",
    //                 "shareLinkurl": "测试内容n47n",
    //                 "shareName": "测试内容5h21",
    //                 "sortNo": 1
    //             }
    //         ]
    //     },
    //     "resultcode": 1,
    //     "resultmenssgae": 1
    // }
  };

  page.getMutualList = function () {
    // http://192.168.18.194:8080/help/helpList?clientType=I
     $.getJSON(
          // "/html/data/top.json",
           constant().url+"/help/helpList",
            {
              "clientType": clientType
            },
          function(data) {
              if(data.resultCode == "0") {
                var obj = data.data;
                console.log(obj);
                template().renduTemplate('tempMutualList','MutualList',obj);
              }
              $('.mutual_list .plan').on('click',function() {
                var url = $(this).data('url');
                window.location.href = url;
              });
          });

    // var data = {
    //     "data": {
    //         "helpList": [
    //             {
    //                 "productId": "测试内容n2l2",
    //                 "productMaxpayAmount": "测试内容d157",
    //                 "productName": "测试内容8cug",
    //                 "productNo": "测试内容642p",
    //                 "productSoldedAmount": "测试内容h3ua",
    //                 "productStatus": 68284,
    //                 "productTotalAmount": "测试内容bp1d",
    //                 "productType": "测试内容6c87",
    //                 "singleLimitAmmount": "测试内容no5g",
    //                 "useBridcoinTag": 74452,
    //                 "useCouponTag": 43502,
    //                 "waitDays": 36553
    //             }
    //         ],
    //         "resultCode": 1
    //     },
    //     "resultMessage": 1
    // };
  };


  page.init = function () {
    page.setTitle('领投鸟理财-不动产理财颠覆者-互助');
    // user().loginOperate();
    page.getBanner();
    page.getMutualList();

  }
  page.init();
  if(window.location.pathname == '/html/mutual/'){
    $('.commonNavTwo,.commonNav').find('.right a').eq(2).addClass('select')
  }

});



