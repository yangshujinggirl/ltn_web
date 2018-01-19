$(function() {
  var page = new Page();
  page.setTitle('注册新用户');
  var registerPhone = '';
  var app = {
    guid: '', //获取唯一标识
    //获取图形验证码
    getImageCode: function() {
      var param;
      var seachParam = app.getSearchParts('dept');
      if(seachParam!=''||typeof(seachParam) != "undefined") {
        param = {
          'clientType': constant().clientType,
          'machineNo': guid,
          'dept':app.getSearchParts('dept')
        };
      } else {
        param = {
          'clientType': constant().clientType,
          'machineNo': guid
        };
      }
      $.post(constant().url + '/user/register/pictureCode', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            var obj = constant().url + data.data.pictureCode;
            //调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
            template().renduTemplate('templateImageCode', 'imageCon', obj);
            //图片验证码重新获取事件
            $('#imageCode').on("click", function() {
              app.getImageCode();
            });
            //光标离开时验证
            $('input:not(:checkbox,:radio),select,textarea').on('blur', function() {
              _this = $(this);
              var vdRow = _this.parent().parent();
              var vdTip = vdRow.find('.validation');
              var vdSuccess = 'validate-success';
              var vdFailed = 'validate-failed';
              validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
              app.addEvent(_this, vdRow, vdTip);
            });
            //光标集中情况验证
            $('input,select,textarea').on('focus', function() {
              var vdRow = $(this).parent().parent();
              vdRow.removeClass(validate().vdFailed);
              var vdTip = vdRow.find('.validation');
              vdTip.html('');
              $('#loginTip').hide();
            });
          }
        }
      });
    },
    //获取参数的方法
    getSearchParts: function (key) {
      var url = window.location.search;
      var search = url.substr(1).split('&');
      var ret = {}, idx, len = search.length;
      for (idx = 0; idx < len; idx++) {
        var keyVal = search[idx].split('=');
        ret[keyVal[0]] = keyVal[1];
      }
      return key ? ret[key] : ret;
    },
    //添加绑定事件
    addEvent: function(_this, vdRow, vdTip) {
      //验证手机号码是否存在,存在报错
      if (_this.attr('id') == 'txtTel') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getPhoneIsTrue(_this, false);
          return;
        }
      }
      //验证图形验证码是否正确
      if (_this.attr('id') == 'txtCode') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getCodeIsTrue(_this);
          return;
        }
      }
      //验证2次输入密码是否相同
      if (_this.attr('id') == 'txtPsd2') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getPsdIsEqual(_this.val());
          return;
        }
      }
      //验证手机号码是否存在,不存在报错
      if (_this.attr('id') == 'txtTel2') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getPhoneIsTrue(_this, true);
          return;
        }
      }
    },
    //获取短信验证码
    getPhoneCode: function() {
      var tel = $('#txtTel').val();
      var imgCode = $('#txtCode').val();
      var param;
      var seachParam = app.getSearchParts('dept');
      if (seachParam!=''||typeof(seachParam) != "undefined") {
        param = {
          'clientType': constant().clientType,
          'machineNo': guid,
          'mobileNo': tel,
          'pictureCode': imgCode,
          'sendType': '1',
          'dept':app.getSearchParts('dept')
         }
        }else{
          param = {
            'clientType': constant().clientType,
            'machineNo': guid,
            'mobileNo': tel,
            'pictureCode': imgCode,
            'sendType': '1'
        };
      };
      $.post(constant().url + '/mobile/pcmobilecode/getMobileCode', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            var sendPhone = $('#sendPhoneCode');
            $('#sendPhoneCode').addClass('disabled').attr('disabled', 'disabled');
            app.timing(sendPhone, 50);
          } else {
            $('#wrapIdentity').hide();
            app.initPhoneCode();
            alert(data.resultMessage);
          }
        }
      });
    },
    //初始化发送短信按钮
    initPhoneCode:function() {
      var sendPhone = $('#sendPhoneCode');
      sendPhone.html('重新发送').addClass('disabled').attr('disabled', 'disabled');
      app.getImageCode();
      $('#wrapImg').removeClass('validate-success');
    },
    //计时验证码
    timing: function(sendPhone, time) {
      var timingCode = setInterval(function() {
        --time;
        if (time < 0) {
          clearInterval(timingCode);
          app.initPhoneCode();
        } else {
          sendPhone.html(time + 's');
        }
      }, 1000);
    },
    //验证手机号是否注册
    //exist true为不存在报错,false为存在报错
    getPhoneIsTrue: function(_this, exist) {
      var tel = strUtil().trim(_this.val());
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var param;
      var seachParam = app.getSearchParts('dept');
      if (seachParam!=''||typeof(seachParam) != "undefined") {
        param = {
          'clientType': constant().clientType,
          'mobileNo': tel,
          'dept':app.getSearchParts('dept')
        };
      }else{
        param = {
          'clientType': constant().clientType,
          'mobileNo': tel
        };
      }
      $.post(constant().url + '/pc/login/validateMobileExist', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            //验证存在
            if (exist) {
              if (data.data.isMobileExist == '1') {
                vdRow.addClass('validate-success').removeClass('validate-failed');
              } else {
                vdRow.addClass('validate-failed').removeClass('validate-success');
                vdTip.html('账号不存在!');
              }
            } else {
              if (data.data.isMobileExist == '1') {
                vdRow.addClass('validate-failed').removeClass('validate-success');
                vdTip.html('账号已存在!');
              } else {
                vdRow.addClass('validate-success').removeClass('validate-failed');
              }
            }
            app.initSendBtn();
          }
        }
      });
    },
    //验证图形验证码是否正确
    getCodeIsTrue: function(_this) {
      var imageCode = strUtil().trim(_this.val());
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var param;
      var seachParam = app.getSearchParts('dept');
      if (seachParam!=''||typeof(seachParam) != "undefined") {
        param = {
          'clientType': constant().clientType,
          'machineNo': guid,
          'pictureCode': imageCode,
          'dept':app.getSearchParts('dept')
        };
      }else{
         param = {
          'clientType': constant().clientType,
          'machineNo': guid,
          'pictureCode': imageCode
        };
      }
      $.post(constant().url + '/pc/login/validatePicCode', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            if (data.data.isPicCodeRight == '1') {
              vdRow.addClass('validate-success').removeClass('validate-failed');
            } else {
              vdRow.addClass('validate-failed').removeClass('validate-success');
              vdTip.html('验证码错误!');
              app.getImageCode();
            }
            app.initSendBtn();
          }
        }
      });
    },
    //判断新密码跟重置密码是否相同
    getPsdIsEqual: function(psd) {
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var psd2 = $('#txtPsd').val();
      if (psd == psd2) {
        vdRow.addClass('validate-success').removeClass('validate-failed');
      } else {
        vdRow.addClass('validate-failed').removeClass('validate-success');
        vdTip.html('两次输入密码不一致!');
      }
    },
    //注册错误，刷新验证码
    initRegister: function() {
      app.getImageCode();
    },
    //验证忘记密码
    testRegister: function(phoneCode, phone, psd) {
      var param;
      var seachParam = app.getSearchParts('dept');
      if (seachParam!=''||typeof(seachParam) != "undefined") {
        param = {
          'clientType': constant().clientType,
          'mobileCode': phoneCode,
          'mobileNo': phone,
          'password': psd,
          'readAndAgree': '1',
          'dept':app.getSearchParts('dept')
        }
      }else{
        param = {
          'clientType': constant().clientType,
          'mobileCode': phoneCode,
          'mobileNo': phone,
          'password': psd,
          'readAndAgree': '1'
        };
      }
      $.post(constant().url + '/user/register/registerUser', param, function(data, status) {
        if (status == "success") {
          var wranTip = $('#wranTip');
          if (data.resultCode == '0') {

            session().set("lingtouniaoguanwangluodiyeshoujihao",phone);

            location.href = '/html/user/login/';
          } else {
            $('#loginTip').show();
            var str;
            str = user().testResultCode(data.resultCode); //测试返回码
            wranTip.html(str);
            app.initRegister();
          }
        }
      });
    },
    //验证手机号码和图片验证码是否正确
    getPhoneAndCodeIsTrue: function() {
      var tel = $('#wrapTel');
      var img = $('#wrapImg');
      if (tel.hasClass('validate-success') && img.hasClass('validate-success')) {
        return true;
      } else {
        return false;
      }
    },
    //恢复发送验证码
    initSendBtn: function() {
      if (app.getPhoneAndCodeIsTrue()) {
        $('#sendPhoneCode').removeClass('disabled').removeAttr('disabled');
      } else {
        $('#sendPhoneCode').addClass('disabled').attr('disabled', 'disabled');
      }
    },
    //处理短信验证
    dealPhoneCode: function() {
      var btn = $('#sendPhoneCode');
      btn.html('发送中...')
      btn.attr('disabled', 'disabled');
      app.getPhoneCode();
    },
    //初始化方法
    init: function() {
      guid = strUtil().getGuid(); //获取图片guid
      app.getImageCode();
    }
  };
  app.init();

  //提交验证事件
  $('#submit').not('.disabled').on("click", function() {
    //触发所有输入的验证
    user().testSubmit(app.addEvent);
    //是否有错误
    if ($('#form').find('.validate-failed').length != 0) {
      return false;
    } else {
      var phoneCode = strUtil().trim($('#txtPhoneCode').val());
      var phone = strUtil().trim($('#txtTel').val());
      registerPhone = phone;
      console.log(registerPhone);
     /* var phone2 = strUtil().trim($('#txtTel2').val());*/
      var psd = $('#txtPsd').val();
      app.testRegister(phoneCode, phone, psd);
    }
  });
  $('#backIndex').on('click',function(){
    window.location.href='/html/?dept='+app.getSearchParts('dept');
  });

  //阅读协议勾选变化事件
  $('#isRead').on("change", function() {
    var _this = $(this);
    var btn = $('#submit');
    if (_this.attr('checked')) {
      _this.attr("checked", false);
      btn.addClass('disabled');
      btn.attr('disabled', 'true')
    } else {
      _this.attr('checked', 'true');
      btn.removeClass('disabled');
      btn.removeAttr('disabled');
    }
  });
  //发送短信验证码
  $('#sendPhoneCode').on('click', app.dealPhoneCode);
});