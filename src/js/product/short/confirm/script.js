$(function () {
  var page = new Page();

  var postData = page.getPostData();
  console.log(postData);

  page.initShourtcuts = function() {
    /**
     * TODO 登陆后获取用户详情接口（/user/userInfo）中判断用户免密字段数据错误
     * 与获取个人信息接口（/pc/user/info）中判断免密字段数据正确，故目前采用两个
     * 接口合并数据，若用户详情接口数据正确，可以只使用这一个接口。
     */
    return page.getData(
      '/pc/user/info',
      {},
      [setData]);

    function setData(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        postData.isNoPwdTZ=data.agreementTZ == '1';

        if (!postData.isNoPwdTZ) {
          return page.getData(
            '/user/agreement',
            {agreement_type: 'ZTBB0G00'},
            [setURL]);
        } else {
          postData.noPwdTZUrl=null;
          page.initConfirm();
        }
      }
    }

    function setURL(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        postData.noPwdTZUrl=data.url;
        page.initConfirm();
      }
    }
  };

  page.initConfirm = function() {
    return page.getData(
      '/product/order/pcOrderPrepare',
      {
        productId: postData.productId,
        annualIncomeText:postData.annualIncomeText,
        orderAmount: postData.buyAmount,
        presentCode: postData.presentCode,//杨静改
        userCouponId: postData.usedCoupon,
        birdCoin: postData.usedCoin
      },
      [initTemp, addEvent]);

    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        postData.revenue = data.revenue;
        page.initTemplate(postData, 'confirm', 'tempConfirm');
      }
    }

    function addEvent() {
      $('#submit').on('click', submit);
      $('#success #ok').on('click', function() {
        page.jump(Config.get('accountCenterUrl'));
      });
      $('#success #argin').on('click',function(){
        history.back(-1);
      });
      $('#fail #ok').on('click', function() {
        page.jump(Config.get('helpCenterUrl'));
      });
      $('#isRead').on('click', function() {
        $('#submit').prop('disabled', !$(this).prop('checked'));
      });
    }
    var flag = false;
    function submit () {
      if (!postData.isNoPwdTZ) {
      	var param={
      		url: postData.noPwdTZUrl
      	}
        user().goNewPage(param,'8');
        page.showDialog('#message');
        return false;
      }
      $('#submit').text('投资中...').prop('disabled','disabled');
      page.getData(
        '/product/buy/confirm',
        {
          productId: postData.productId,
          orderAmount: postData.buyAmount,
          userCouponId: postData.usedCoupon,
          birdCoin: postData.usedCoin,
          presentCode:postData.presentCode
        },
        function (data) {
          if (page.isSuccess(data)) {
            var data = data.data;
            page.showDialog('#success');
            // window.open(data.url);
          } else {
            page.showDialog('#fail');
            $('#descTip').html(user().testResultCode(data.resultCode));
          }
        },
        function (data) {
          page.showDialog('#fail');
        });
    }
  };

  page.initMessage = function() {
    $('#msg-done').on('click', function() {
      page.hideDialog('#message');
      page.initShourtcuts();
    });
    $('#msg-fail').on('click', function() {
      location.href = '../../../help/about';
    });
  };

  page.init = function() {
  	page.setTitle('确认页面');
    page.initConfirm();
    page.initMessage();
  }

  page.init();
});