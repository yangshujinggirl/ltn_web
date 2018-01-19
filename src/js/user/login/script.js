$(function() {
	var page = new Page();
     dept = session().get('dept');
	var app = {
		guid: '', //获取唯一标识
		//获取图形验证码
		getImageCode: function() {
			var param = {
				'clientType': constant().clientType,
				'machineNo': guid,
				'dept':dept
			};
			$.post(constant().url + '/user/register/pictureCode', param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						var obj = constant().url + data.data.pictureCode;
						//调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
						template().renduTemplate('templateImageCode', 'imageCon', obj);
						//图片验证码重新获取事件
						// $('#imgCode').on("click",function(){
						// 	app.getImageCode();
						// });
						// $('#imageCode').on("click", function() {
						// 	app.getImageCode();
						// });
						//光标离开时验证
						$('input,select,textarea').on('blur', function() {
							_this = $(this);
							var vdRow = _this.parent().parent();
							var vdTip = vdRow.find('.validation');
							var vdSuccess = 'validate-success';
							var vdFailed = 'validate-failed';
							validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
							app.addEvent(_this, vdRow, vdTip);
							if ($('#txtTel').val()=='') {
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
							$('#loginTip').hide();
							$('#submit').removeClass('disabled');
		          $('#submit').attr("disabled", false);
						});
					}
				}
			});
		},
		//添加绑定事件
		addEvent: function(_this, vdRow, vdTip) {
			//验证手机号码是否存在,存在报错
			if (_this.attr('id') == 'txtTel') {
				if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
					app.getPhoneIsTrue(_this);
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
		},
		//验证手机号是否注册
		getPhoneIsTrue: function(_this) {
			var tel = strUtil().trim(_this.val());
			var vdRow = _this.parent().parent();
			var vdTip = vdRow.find('.validation');
			var param = {
				'clientType': constant().clientType,
				'mobileNo': tel,
				'dept':dept
			};
			$.post(constant().url + '/pc/login/validateMobileExist', param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						if (data.data.isMobileExist == '1') {
							vdRow.addClass('validate-success').removeClass('validate-failed');
						} else {
							vdRow.addClass('validate-failed').removeClass('validate-success');
							vdTip.html('您输入的账户不存在！');
						}
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
				'pictureCode': imageCode,
				'dept':dept
			};
			$.post(constant().url + '/pc/login/validatePicCode', param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						if (data.data.isPicCodeRight == '1') {
							vdRow.addClass('validate-success').removeClass('validate-failed');
						} else {
							vdRow.addClass('validate-failed').removeClass('validate-success');
							vdTip.html('输入的验证码不正确');
							app.getImageCode();
						}
					}
				}
			});
		},
		//登录错误，刷新验证码
		initLogin: function() {
			app.getImageCode();
		},
		//验证登录
		testLogin: function(tel, psd, image) {
			var param = {
				'clientType': constant().clientType,
				'machineNo': guid,
				'mobileNo': tel,
				'password': psd,
				'pictureCode': image,
				'dept':dept
			};
			$.post(constant().url + '/user/login/login', param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						session().setCookie('ltn-sessionId',data.data.sessionKey);
						session().set('login', tel); //设置session
						session().set('sessionKey', data.data.sessionKey); //设置sessionKey
						var backUrl = Url.getSearchParts('url')||'/';
						Util.updateUserType(function() {
							Util.updateUserInfo(function(){
								if(backUrl.indexOf('.php') != -1) {
									window.location.href= backUrl;
								} else {
									if(user().getUserType()) {
										var url=decodeURIComponent(urlUtil(location.href).get('url'));
										user().goBack('/',url);
									} else {
										var url=decodeURIComponent(urlUtil(location.href).get('url'));
										if(user().isNameAuth()){
											user().goBack('/',url);
										}else{
											user().goBack('/html/user/realname',url);
										}
									}
								}
							},backUrl)
						},backUrl)
					} else {
						var str;
						str = user().testResultCode(data.resultCode); //测试返回码
						if (data.resultCode == '10000004') {
							$('#loginTip1').show();
							$('#loginTip1 .wran-tip').html('输入的账号和密码不匹配');
						}else if (data.resultCode == '10000041') {
							$('#loginTip2').show();
							$('#loginTip2 .wran-tip').html('验证码失效，请重新获取!');
						}
						app.initLogin();
					}
				}
			});
		},
		//初始化方法
		init: function() {
			page.setTitle('欢迎登录');
			guid = strUtil().getGuid(); //获取图片guid
			app.getImageCode();
		}
	};
	app.init();
	//验证码刷新事件
	$('#imageCode').on("click", function() {
		app.getImageCode();
	});
	//提交验证事件
	$('#submit').on("click", function() {
		//触发所有输入的验证
		user().testSubmit(app.addEvent);
		//是否有错误
		if ($('#form').find('.validate-failed').length != 0) {
			return false;
		} else {
			var tel =strUtil().trim($('#txtTel').val());
			var psd = $('#txtPsd').val();
			var image = strUtil().trim($('#txtCode').val());
			app.testLogin(tel, psd, image);
		}
	});
	if ($('#txtTel').val() == '') {
		$('#submit').addClass('disabled');
	  $('#submit').attr("disabled", true);
	};
});
