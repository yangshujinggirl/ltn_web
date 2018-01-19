$(function() {
  var page = new Page();
  var type = Url.getSearchParts('type');
  var app = {
    guid: '', //获取唯一标识
    //获取图形验证码
    getImageCode: function() {

      var url = constant().url+'/user/register/pictureCode/'+guid;
      $('#imgCode').attr('src',url);
      //点击重新获取验证码
      $('#imgCode').on('click',function() {
        guid = strUtil().getGuid();
        app.getImageCode();
      })
      //光标离开时验证
      $('input,select,textarea').on('blur', function() {
        _this = $(this);
        var vdRow = _this.parent().parent();
        var vdTip = vdRow.find('.validation');
        var vdSuccess = 'validate-success';
        var vdFailed = 'validate-failed';
        validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
        if ($(this).val()=='') {
          vdRow.addClass('validate-failed').removeClass('validate-success');
          vdTip.html(this.placeholder);
        }
      });
      //光标集中情况验证
      $('input,select,textarea').on('focus', function() {
        var vdRow = $(this).parent().parent();
        vdRow.removeClass(validate().vdFailed);
        var vdTip = vdRow.find('.validation');
        vdTip.html('');
      });
    },
    //添加绑定事件
    addEvent: function(_this, vdRow, vdTip) {

      //验证兑换码
      if (_this.attr('id') == 'cashCode') {
        return;
      }
      //验证图形验证码
      if (_this.attr('id') == 'txtCode') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          if ($('#form').find('.validate-failed').length != 0) {
            return false;
          } else {
            app.submit();
          }
        }
        return;
      }
    },
    //验证手机号是否注册
    submit: function(_this) {
      var code = $('#cashCode').val();
      var imgCode = $('#txtCode').val();
      var param = {
        'clientType': constant().clientType,
        'code':code,
        'machineNo': guid,
        'pictureCode' : imgCode,
        'sessionKey' : constant().sessionKey
      };
      $.post(constant().url + '/user/exchangeCode/exchange', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            var data = data.data;
            $('#copy').show();
            $('#copy .couponName').html(data.coupons[0].couponName);
            $('.cover').show();
            $('#look').on('click',function() {
              if(data.coupons[0].activityType=="投资返现") {
                window.location.href = "/html/account/returnTickits/";
              } else {
                window.location.href = "/html/account/raiseTickits/";
              }
            })
          } else if(data.resultCode == '10000001') {
            // 请空验证码表单
            $('#imageCon #txtCode').val('');
            //重新获取验证码
            guid = strUtil().getGuid();
            app.getImageCode();
            $('#imageCon').addClass('validate-failed').removeClass('validate-success');
            $('#imageCon .validation').html(data.resultMessage);
          } else {
            guid = strUtil().getGuid();
            app.getImageCode();
            $('#codeCon').addClass('validate-failed').removeClass('validate-success');
            $('#codeCon .validation').html(data.resultMessage);
          }
        }
      });
    },
    //初始化方法
    init: function() {
      user().loginOperate();
      guid = strUtil().getGuid(); //获取图片guid
      app.getImageCode();
    }
  };
  app.init();
  $('#submit').on("click", function() {
     //提交验证事件
    user().testSubmit(app.addEvent);
  });
  //点击事件
  $('#copyBtn,#closeBtn').on('click',function() {
    $('#copy').hide();
    $('.common-cover').hide();
  })
  //返回上一页
  $('#return').on('click',function() {
    if(type=='TZFX') {
      window.location.href = '/html/account/returnTickits/';
    }else {
      window.location.href = '/html/account/raiseTickits/';
    }
  })
});