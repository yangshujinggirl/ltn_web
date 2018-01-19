$(function(){
  var page = new Page();
  var post2 = decodeURIComponent(sessionStorage.getItem('orderForm'));
  var obj = JSON.parse(post2);
  //快捷充值未免密
  page.shutspeed = function() {
      var param = {
        'agreement_type': 'ZCZP0800',
        'unbind': '1'
      };
      user().goNewPage(param,'11');
      $('#noguanbi').show();
    };
  //快捷充值跳转开通免密
  page.quicklyRechargeHasPsd = function(){
        var param = {
          'agreement_type': 'ZCZP0800',
          'unbind': '0'
        };
        user().goNewPage(param,'8');
        $('#noPsdPopup').show();
   };

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

   page.quicklyConfirm = function(){
     page.getData('/pc/user/info',{},function(data){
       var user = data.data;
       if(user.agreementTZ =='1'){
            page.getData('/product/zc/order/submit',obj,function(data){
              if(page.isSuccess(data,false)){
                page.showDialog('#success');
              }else{
                 page.showDialog('#fail');
                 $('#descTip2').html(data.resultMessage);
                 $('#descTip').html(data.resultMessage);
              }
            });
       }else{
         page.getData('/user/agreement',
             {agreement_type: 'ZTBB0G00'},
             [setURL]);
       }
     });
   }
   page.initCrowd = function(){
    return page.getData( '/product/zc/order/prepareInfo',{
      productId:obj.productId,
      orderAmount:obj.orderAmount,
      birdCoin:obj.birdCoin,
      userCouponId:obj.userCouponId,
      presentCode:obj.presentCode
    },[initCrowdInfo,addEvent]);
    function initCrowdInfo(data){
      if (page.isSuccess(data)) {
        data = data.data;
        data.couponName = obj.couponName;
        if(obj.productType == 'A'){
          page.initTemplate(data,'confirmb','tempConfirm');
        }else{
          page.initTemplate(data,'confirmb','tempConfirmb');
        }
      }
    }
    function addEvent(){
      $('#submit').on('click',function(){
        $('#submit').text('投资中...').prop('disabled','disabled');
        page.quicklyConfirm();
      });
      $('#success #ok').on('click', function() {
        page.jump(Config.get('accountCenterUrl'));
      });
      $('#fail #ok').on('click', function() {
        page.jump(Config.get('helpCenterUrl'));
      });
      $('#isRead').on('click', function() {
        $('#submit').prop('disabled', !$(this).prop('checked'));
      });
    }
   }
   page.initMessage = function() {
    $('#msg-done').on('click', function() {
      page.hideDialog('#message');
      location.reload();
      // page.initCrowd();
    });
    $('#msg-fail').on('click', function() {
      location.href = '../../../help/about';
    });
  };
   page.init = function(){
    page.initCrowd();
    page.initMessage();
   }
   page.init();
});
