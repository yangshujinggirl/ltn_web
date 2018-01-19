$(function() {
  var page = new Page();
  page.setTitle('修改登录密码');

  //获取登录的手机号 @author wangwenjie
  var numphone = session().get('login');
  $('#txtTel').val(numphone);
    $('#txtTel').focus();

  var app = {
    guid: '', //获取唯一标识
    isRealname: '',//是否实名
    //获取图形验证码
    getImageCode: function() {
      var param = {
        'clientType': constant().clientType,
        'machineNo': guid
      };
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
            $('input,select,textarea').on('blur', function() {
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
    //添加绑定事件
    addEvent: function(_this, vdRow, vdTip) {
      //验证手机号码是否存在,存在报错
      if (_this.attr('id') == 'txtTel') {
        app.initSendBtn();
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getPhoneIsTrue(_this);
        }
        return;
      }
      //验证图形验证码是否正确
      if (_this.attr('id') == 'txtCode') {
        app.initSendBtn();
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getCodeIsTrue(_this);
        }
        return;
      }
      //验证2次输入密码是否相同
      if (_this.attr('id') == 'txtPsd2') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          app.getPsdIsEqual(_this.val());
          return;
        }
      }
    },
    //获取短信验证码
    getPhoneCode: function(){
      var tel = $('#txtTel').val();
      var imgCode= $('#txtCode').val();
      var param = {
        'clientType': constant().clientType,
        'machineNo': guid,
        'mobileNo': tel,
        'pictureCode': imgCode,
        'sendType': '2'
      };
      $.post(constant().url + '/mobile/pcmobilecode/getMobileCode', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            if(app.isRealname){
              $('#wrapIdentity').show();
            }else{
              $('#wrapIdentity').hide();
            }
            var sendPhone=$('#sendPhoneCode');
            sendPhone.addClass('disabled').attr('disabled','disabled');
            app.timing(sendPhone,50);
          }else{
            app.initPhoneCode();
            alert(data.resultMessage);
          }
        }
      });
    },
    //初始化发送短信按钮
    initPhoneCode: function(){
      var sendPhone=$('#sendPhoneCode');
      sendPhone.html('重新发送').addClass('disabled').attr('disabled','disabled');
      app.getImageCode();
      $('#wrapImg').removeClass('validate-success');
    },
    //计时验证码
    timing: function(sendPhone,time){
      var timingCode=setInterval(function(){
        --time;
        if(time<0){
          clearInterval(timingCode);
          $('#sendPhoneCode').removeClass('disabled');
          sendPhone.html('重新发送');
        }else{
          sendPhone.html(time+'s');
        }
      },1000);
    },
    //验证手机号是否注册
    getPhoneIsTrue: function(_this) {
      var tel = _this.val();
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var param = {
        'clientType': constant().clientType,
        'mobileNo': tel
      };
      $.post(constant().url + '/pc/login/validateMobileExist', param, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            if (data.data.isMobileExist == '1') {
              vdRow.addClass('validate-success').removeClass('validate-failed');
              //验证用户是否实名认证
              if(data.data.isMobileNameAuth=='1'){
                app.isRealname=true;
              }else{
                app.isRealname=false;
              }
            } else {
              vdRow.addClass('validate-failed').removeClass('validate-success');
              vdTip.html('账号不存在!');
            }
            app.initSendBtn();
          }
        }
      });
    },
    //验证图形验证码是否正确
    getCodeIsTrue: function(_this) {
      var imageCode = _this.val();
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var param = {
        'clientType': constant().clientType,
        'machineNo': guid,
        'pictureCode': imageCode
      };
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
          }
          app.initSendBtn();
        }
      });
    },
    //判断新密码跟重置密码是否相同
    getPsdIsEqual: function(psd){
      var vdRow = _this.parent().parent();
      var vdTip = vdRow.find('.validation');
      var psd2=$('#txtPsd').val();
        if (psd==psd2) {
          vdRow.addClass('validate-success').removeClass('validate-failed');
        } else {
          vdRow.addClass('validate-failed').removeClass('validate-success');
          vdTip.html('两次输入密码不一致!');
        }
    },
    //登录错误，刷新验证码
    initForget: function() {
      app.getImageCode();
    },
    //验证登录密码的修改
    Passwordlogin: function(tel,phoneCode,identity,psd) {
      var param = {
        'clientType': constant().clientType,
        'idCard': identity,
        'mobileCode': phoneCode,
        'mobileNo': tel,
        'newPwd': psd
      };
      $.post(constant().url + '/user/login/forgetPwd', param, function(data, status) {
        if (status == "success") {
          var wranTip = $('#wranTip');
          if (data.resultCode == '0') {
            location.href='/html/user/login';
          } else {
            $('#loginTip').show();
            var str;
            str=user().testResultCode(data.resultCode);//测试返回码
            wranTip.html(str);
            app.initForget();
          }
        }
      });
    },
    //验证手机号码和图片验证码是否正确
    getPhoneAndCodeIsTrue: function(){
      var tel=$('#wrapTel');
      var img=$('#wrapImg');
      if(tel.hasClass('validate-success')&&img.hasClass('validate-success')){
        return true;
      }else{
        return false;
      }
    },
    //恢复发送验证码
    initSendBtn: function(){
      if(app.getPhoneAndCodeIsTrue()){
        $('#sendPhoneCode').removeClass('disabled').removeAttr('disabled');
      }else{
        $('#sendPhoneCode').addClass('disabled').attr('disabled','disabled');
      }
    },
    //处理短信验证
    dealPhoneCode: function(){
      var btn=$('#sendPhoneCode');
      btn.html('发送中...')
      btn.attr('disabled','disabled');
      app.getPhoneCode();
    },
    left:function(){
      var pn = location.pathname;

      var as = $('#leftnav .item');
      for (var i = 0, j = as.length; i < j; i++){
        if (as[i].href.indexOf(pn) != -1) {
          as[i].className = 'selected item';
        }
      };
    },
    //初始化方法
    init: function() {
      guid = strUtil().getGuid(); //获取图片guid
      app.getImageCode();
      // app.left();
    }
  };
  app.init();

  //提交验证事件
  $('#password-login').on("click", function() {
    //触发所有输入的验证
    user().testSubmit(app.addEvent);
    //是否有错误
    if ($('#form').find('.validate-failed').length != 0) {
       return false;
    } else {
      var tel = $('#txtTel').val();
      var psd = $('#txtPsd').val();
      var phoneCode = $('#txtPhoneCode').val();
      var identity=$('#txtIdentity').val();
      app.Passwordlogin(tel, phoneCode,identity,psd);
    }
  });
  $('#sendPhoneCode').on('click',app.dealPhoneCode);
});