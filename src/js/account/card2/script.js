$(function(){
  var page = new Page();
  page.noPassword = false; //用户是否选中免密
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
      user().goNewPage(param,'4');
      $('#noPsdPopup').show();
    };
    //免密后按钮变绿
      page.initState = function(){
        if (user().isAgreementCZ()) {
            $('#switch').addClass('selected');
            $('#switchStatus').text('(开启状态)');
          }else{
            $('#switch').removeClass('selected');
            $('#switchStatus').text('(关闭状态)');
          }
      };
  //渲染用户名卡号模板
  page.getBankInfo = function(cb){
      return page.getData(
        '/account/center/bankInfo',
        {clientType: 'PC'},
        [info]);
      function info(data){
        if(data.resultCode === '0'){
          data = data.data;
          page.initTemplate(data, 'bankInfo', 'templateBankinfo');
          user().updateUserInfo(page.initState);
        }
        //免密充值开关按钮事件
        $('#switch').on('click',function(){
          var btn = $(this);
          if (btn.hasClass('selected')) {
            page.shutspeed();
            // btn.removeClass('selected');
            // page.noPassword = false;
            // $('#switchStatus').text('(关闭状态)');
          }else{
            page.quicklyRechargeHasPsd();
            // btn.addClass('selected');
            // page.noPassword = true;
            // $('#switchStatus').text('(开启状态)');
          }
        });
      }
  };
  //开通免密失败后跳转至帮助中心页面
  $('.goHelp').on('click',function(){
    window.location.href = '/help/certificate';
  });
  //成功开通免密后页面刷新
  $('#goConfirm').on('click',function(){
    location.reload();
  });
  //成功关闭免密后页面刷新
  $('#goCard').on('click',function(){
    location.reload();
  });
  //关闭免密失败跳转至帮助中心页面
  $('#goHelp').on('click',function(){
     window.location.href = '/help/certificate';
  });
    //银行卡列表
  page.getDesc = function(){
    return page.getData(
      '/bank/list/bk',
      {clientType: 'PC'},
      [initTemp]);
    function initTemp(data){
      if (data.resultCode === '0'){
        data = data.data;
        page.initTemplate(data.list,'propFloat','templateFolating')
       }
     }
  };
  //左边选中状态
  page.leftnav = function () {
    var pn = $('#account-card').data('content');

    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++){
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    };
  };
  page.init = function(){
    page.getBankInfo();
    page.setTitle('我的银行卡');
    // page.leftnav();
    if (!user().isBindCard()) {
        user().goBack('/html/account/card1');
      }
    page.getDesc();
  }
  page.init();
  $('#speed').click(function(){
    $('#float').show();
  });
  $('#close').click(function(){
    $('#float').hide();
  });
});
