$(function() {
	var app = {
		user: '',
		//提交绑卡认证
		testBindCard: function(belongBank,cardId){
			var param = {
				'belongBank': belongBank,
				'cardId': cardId,
				'pictureCode': '8888',
				'machineNo': '99999'
			};
			user().goNewPage(param,'6');
			$('#message').show();//认证成功弹窗
			$('#cover').show();
		},
		//获取绑卡银行卡列表
		getBanList: function(){
			var param = {
				'clientType': constant().clientType
			};
			$.post(constant().url + '/bank/list/bk', param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						var obj=data.data.list;
						template().renduTemplate('templateBank','txtBank',obj);
					}
				}
			});
		},
		//判断用户是否实名
		userIsRealname: function(){
			user().getUserInfo(app.goRealname);
		},
		goRealname: function(){
			if(!user().user.certification){
				window.location.href='/html/user/realname';
			}else{
				$('#txtName').val(user().user.userName)
			}
		},
		Desc:function(){
			var param = {
				'clientType': constant().clientType
			}
			$.post(constant().url + '/bank/list/bk',param,
				function(data,status){
					if (status == "success") {
						if (data.resultCode == '0') {
							var obj = data.data.list;
							template().renduTemplate('tempfuceng','floating',obj);
						}
					}
				});
		},
		//初始化方法
		init: function() {
			user().updateUserInfo(app.userIsRealname);
			if (user().isBindCard()) {
        		user().goBack('/html/user/cardsuccess');
     		 }
			app.getBanList();//获取银行列表
			app.Desc();
		}
	};
	app.init();

	//提交验证事件
	$('#submit').not('.disabled').on("click", function() {
		//触发所有输入的验证
		user().testSubmit();
		//是否有错误
		if ($('#form').find('.validate-failed').length != 0) {
			return false;
		} else {
			var belongBank=$('#txtBank').val();
			var cardId=strUtil().trim($('#txtCard').val());
			app.testBindCard(belongBank,cardId);
		}
	});
	//完成绑卡事件
	$('#bindSuccess').on('click',function(){
		user().updateUserInfo(addEvent);
		$('#cover').hide();
		//回到之前的页面
		function addEvent()
		{
			if(user().isBindCard){
				user().goBack('/html/user/cardsuccess');
			}
		}
	});
	//绑卡失败
	$('#bindFailed').on('click',function(){
		user().updateUserInfo();
		$('#cover').hide();
		location.href='/help/certificate';
	});
	//光标离开时验证
	$('input:not(:checkbox,:radio),textarea').on('blur', function() {
		_this = $(this);
		var vdRow = _this.parent().parent();
		var vdTip = vdRow.find('.validation');
		var vdSuccess = 'validate-success';
		var vdFailed = 'validate-failed';
		validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
	});
	//光标集中情况验证
	$('input:not(:checkbox,:radio),textarea').on('focus', function() {
		var vdRow = $(this).parent().parent();
		vdRow.removeClass(validate().vdFailed);
		var vdTip = vdRow.find('.validation');
		vdTip.html('');
		$('#loginTip').hide();
		$('#submit').removeClass('disabled');
	  $('#submit').attr("disabled", false);
	  $('#submit').html('立即绑卡');
	});
	//点击显示银行卡弹框
	$('#speed').on('click',function(){
			$('#bank').show();
			$('.cover').show();
	});
	$('#close').on('click',function(){
		$('#bank').hide();
		$('.cover').hide();
	});
	$('#closeBk').on('click',function(){
		$('#message').hide();
		$('#cover').hide();
	});
	if ($('#txtCard').val() == '') {
		$('#submit').addClass('disabled');
	  $('#submit').attr("disabled", true);
	}
});
