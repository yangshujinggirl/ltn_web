$(function() {
	var page = new Page();

	var postData = page.getPostData();
	console.log(postData);
	//获取用户信息
	page.getUserInfo = function() {
		return page.getData(
			'/user/userInfo', {}, [getIsNoPsd]);

		function getIsNoPsd(data) {
			if (data.resultCode === '0') {
				data = data.data;
				postData.isNoPwdTZ=data.isNoPwdTZ;//充值设置免密投资
//				postData.isNoPwdTZ='N';//暂时设置为N
				page.initConfirm();//渲染模板
			}else{
				var str=user().testResultCode(data.resultCode);
			}
		}
	};
	//获取到期收益
	page.getIncome=function(){
		   return page.getData(
				'/product/order/pcOrderPrepare', {
				productId: postData.productId,
				orderAmount: postData.buyAmount,
				userCouponId: 0,
				birdCoin: 0
				},[initIncome]);


				function initIncome(data) {
					if (page.isSuccess(data)) {
						postData.revenue=data.data.revenue;
						page.getUserInfo();//获取用户数据
					}
				}
	};

	//渲染确认模板
	page.initConfirm = function() {
		page.initTemplate(postData, 'confirm', 'tempConfirm');
		addEvent();

		function addEvent() {
			//确认投资
			$('#submit').on('click', submit);
			//投资成功
			$('#success').on('click', function() {
				page.jump(Config.get('accountCenterUrl'));
			});
			//投资失败
			$('#fail').on('click', function() {
				page.jump(Config.get('helpCenterUrl'));
			});
			//阅读协议勾选变化事件
			$('#isRead').on("change", function() {
				var _this = $(this);
				var btn = $('#submit');
				if (_this.attr('checked')) {
					_this.attr("checked", false);
					btn.addClass('disabled');
					btn.attr('disabled','disabled');
				} else {
					_this.attr('checked', 'checked');
					btn.removeClass('disabled');
					btn.removeAttr('disabled');
				}
			});
		}
		//提交购买
		function submit() {
			//为开通投资免密
			if(postData.isNoPwdTZ=='N'){
				page.goNoPsd();
			}else{
				page.buyProd();
			}
			$('#submit').text('投资中...').prop('disabled','disabled');
		}
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
	//确定购买
	page.buyProd=function(){
		return page.getData(
				'/product/buy/confirm', {
					productId: postData.productId,
					orderAmount: postData.buyAmount,
					userCouponId: 0,
					birdCoin: 0
				},
				function(data) {
					if (page.isSuccess(data)) {
						var data = data.data;
						page.showDialog('#success');
					} else {
						page.showDialog('#fail');
						$('#descTip').html(user().testResultCode(data.resultCode));
					}
				}
			);
	};
	page.init = function() {
		page.setTitle('确认页面');
		page.getIncome();
	}

	//免密成功,刷新页面
	$('#goConfirm').on('click',function(){
		window.location.reload();
	});
	//免密失败,跳转帮助中心
	$('.goHelp').on('click',function(){
		window.location.href='/help/invest';
	});
	page.init();
});
