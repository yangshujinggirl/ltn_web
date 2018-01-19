$(function() {

	var page = new Page();
	page.recharge = document.getElementById("recharge");
	page.withDraw = document.getElementById("withDraw");
	page.showCon = document.getElementById("showCon");
	page.bankList = [];
	page.bankInfo = {};
	page.bankName; //绑卡银行名称
	page.isPsd; //用户是否开通免密
	page.noPassword = false; //用户是否选中免密
	page.gateId; //银行编号
	page.bindBankInfo = {}; //用户绑定银行卡的信息
	page.accountInfo = {}; //账户信息
	page.isFee; //是否不需要手续费
	page.deductionCoin;//抵扣鸟币
	//获取用户账户数据
	page.getAccountInfo = function() {
		return page.getData(
			'/account/center/accountInfo', {}, [initInfo, addEvent]);

		function initInfo(data) {
			if (page.isSuccess(data)) {
				page.accountInfo = data.data;
				//判断是否还有提现次数并且鸟币大于等于2
				if (page.accountInfo.freeCount == 0) {
					if(page.accountInfo.birdCoin < 2){
						page.isFee = true;
						page.deductionCoin=0;
					}else{
						page.isFee = false;
						page.deductionCoin=2;
					}
				} else {
					page.isFee = false;
					page.deductionCoin=0;
				}
				page.initTemplate(page.accountInfo, 'depostInfo', 'templateDepostInfo');
			}
		};

		function addEvent() {
			$('#userMoney').html('￥' + page.accountInfo.amount + "元");
		};
	};
	//获取网银充值银行卡列表
	page.getBankList = function() {
		return page.getData(
			'/bank/list/online', {}, [initTemp, page.bindBankList]);

		/**
		 * init crumb template
		 */
		function initTemp(data) {
			if (page.isSuccess(data)) {
				data = data.data.bankList;
				page.initTemplate(data, 'bankList', 'templateBankList');
				page.pushBankList(data);
			} else {
				var str = user().testResultCode(data.resultCode);
			}
			$('.list .choose-bank:lt(7) .icon1').css('display','block');
		}
	};
	//获取快捷充值银行卡列表
	page.getQuicklyBankList = function() {
		return page.getData(
			'/bank/list/bk', {}, [quickBankList]);

		/**
		 * init crumb template
		 */
		function quickBankList(data) {
			if (page.isSuccess(data)) {
				data = data.data.list;
				page.pushQuicklyBankList(data);
			} else {
				var str = user().testResultCode(data.resultCode);
				alert(str);
			}
		}
	};
	//把银行数据存储到bankInfo 对象中
	page.pushQuicklyBankList = function(data) {
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				page.bankInfo[data[i].bankName] = data[i];
			}
		}
	};
	//把银行数据存储到bankList数组中
	page.pushBankList = function(data) {
		var list = {};
		list.limitationList = {}
		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				list = {};
				list.limitationList = data[i].limitationList;
				list.bankCode = data[i].bankCode;
				list.bankDes = data[i].bankDes;
				list.bankName = data[i].bankName;
				list.id = data[i].id;
				page.bankList.push(list);
			}
		}
	};
	//切换银行,银行备注模板重新渲染
	page.changeBankRemark = function(index) {
		if (page.bankList.length > 0 && index <= page.bankList.length) {
			$('#bankTable').show();
			$('#bankTip').show();
			page.initTemplate(page.bankList[index].limitationList, 'bankRemark', 'templateBankRemark');
			page.initTemplate(page.bankList[index].bankDes, 'bankTip', 'templateBankTip');
		}
	};
	//初始化充值还是提现
	page.initState = function() {
		var control = urlUtil().get('control');
		if (control == 'recharge' || control == "") {
			page.recharge.className = 'item selected';
			page.withDraw.className = 'item';
			var content = "charg-depost current1";
			page.showCon.className = content;
		} else {
			page.recharge.className = 'item';
			page.withDraw.className = 'item selected';
			var content = "charg-depost current2";
			page.showCon.className = content;
		}
		//是否绑卡

		if (user().isBindCard()) {
			$('#quickBank').removeClass('hide');
			$('#bindedCard').show();
      // console.log($('#bindedCard'));
			//是否开通免密
			if (user().isAgreementCZ()) {
				$('#onState').hide();
				page.isPsd = true; //开通免密
			}
			//获取绑定的卡的信息
			page.getBIndCardInfo();
		} else {
			$('#noBindCard').show();
		}

	};
	//充值提现切换
	//type1为充值，type2为提现
	page.changeNav = function(_this, type) {
		if (!(_this.className == 'item selected')) {
			_this.className = 'item selected';
			var content;
			if (type == 'type1') {
				page.withDraw.className = 'item';
				content = "charg-depost current1";
			} else {
				page.recharge.className = 'item';
				content = "charg-depost current2";
			}
			page.showCon.className = content;
		}
	};
	//网银快捷充值方法
	page.changeRecharge = function(_this) {
		var list = document.querySelectorAll(".recharge");
		var dataType = _this.getAttribute('data-type');
		var rechargeWay = document.getElementById("chargeWay");
		var oldClass = 'recharge';
		for (var i = 0; i < list.length; i++) {
			if (list[i] == _this) {
				oldClass = _this.className;
				_this.className = 'recharge selected';
				//网上银行
				if (dataType == 'interBank') {
					rechargeWay.className = 'chargeway ebank';
				} else {
					rechargeWay.className = 'chargeway quickly';
				}
			} else {
				if (list[i].className == 'recharge hide') {
					list[i].className = 'recharge hide';
				} else {
					list[i].className = 'recharge';
				}
			}
		}
	};
	page.changeRecharge2 = function(_this) {
		return function() {
			page.changeRecharge(_this);
		}
	};
	//网银充值,快捷充值切换事件
	page.bindRecharge = function() {
		var list = document.querySelectorAll(".recharge");
		for (var i = 0; i < list.length; i++) {
			list[i].addEventListener('click', page.changeRecharge2(list[i]), false);
		}
	};
	//银行选择
	page.changeBank = function(_this) {
		var list = document.querySelectorAll(".choose-bank");
		var index = _this.getAttribute('data-index');
		page.gateId = _this.getAttribute('data-code');
		for (var i = 0; i < list.length; i++) {
			if (list[i] == _this) {
				_this.className = 'choose-bank selected';

				page.changeBankRemark(index);
			} else {
				list[i].className = 'choose-bank';
			}
		}
	};
	page.changeBank2 = function(_this) {
		return function() {
			page.changeBank(_this)
		}
	};
	//银行选择事件
	page.bindBankList = function() {
		var list = document.querySelectorAll(".choose-bank");
		for (var i = 0; i < list.length; i++) {
			list[i].addEventListener('click', page.changeBank2(list[i]), false);
		}
	};
	//获取用户绑定银行卡的信息
	page.getBIndCardInfo = function() {
		return page.getData(
			'/account/center/bankInfo', {}, [initTemp, getBankLimit]);

		/**
		 * init crumb template
		 */
		function initTemp(data) {
			if (page.isSuccess(data)) {
				page.bankName = data.data.belongBank;
				data = data.data;
				page.bindBankInfo = data;
				page.initTemplate(data, 'cardModel', 'templateCardModel');
				page.initTemplate(data, 'cardModel2', 'templateCardModel');
			} else {
				var str = user().testResultCode(data.resultCode);
				alert(str);
			}
		};
		//获取银行对应的限额
		function getBankLimit() {
			var data = page.bankInfo[page.bankName];
			if (data != undefined) {
				$('#onceTimeMoney').html(data.chargeTimeLimit);
				$('#onceDayMoney').html(data.chargeDateLimit);
			}
		};
	};
	//网银充值
	page.largeRecharge = function() {
		var money = $('#txtRechargeMoney').val();
		var param = {
			"gateId": page.gateId,
			'orderAmount': money
		};
		user().goNewPage(param,'1');
		$('#largeRechargePopup').show();
	};
	//快捷充值未免密
	page.quicklyRechargeNoPsd = function() {
		var money = $('#txtRechargeMoney').val();
		var param = {
			'orderAmount': money
		};
		user().goNewPage(param,'3');
		$('#shortRechargePopup').show();
	};
	//快捷充值跳转开通免密
	page.quicklyRechargeHasPsd = function() {
		var param = {
			'agreement_type': 'ZCZP0800',
			'unbind': '0'
		};
		user().goNewPage(param,'4');
		$('#noPsdPopup').show();
	};
	//快捷充值跳转确定页面
	page.quicklyRechargeSure = function() {
		page.goSurePage();
	};
	//跳转到确定页面
	page.goSurePage = function() {
		var url = '/html/account/confirmation';
		var money = $('#txtRechargeMoney').val(); //获取充值金额
		page.bindBankInfo.money = money;
		page.post(url, page.bindBankInfo); //传递银行卡信息到确定页面
		window.location.href = url;
	};
	//判断提现金额是否超出可用余额
	page.addEvent = function(_this, vdRow, vdTip) {
		if (_this.attr('id') == 'txtWithdraw') {
			if (strUtil().trim(_this.val()).length > 0 && !isNaN(parseFloat(_this.val()))) {
				var money = parseFloat(_this.val());
				var amount = parseFloat(page.accountInfo.amount); //用户金额
				//需要手续费
				if (page.isFee) {
					//如果用户输入金额加上手续费大于用户余额
					if(money<=2&&amount<=2){
						vdRow.addClass('validate-failed').removeClass('validate-success');
						vdTip.html('你的金额小于等于2元,请等待下个月提现');
					}else if (money + 2 > amount) {
						vdRow.addClass('validate-failed').removeClass('validate-success');
						vdTip.html('提现金额超出可用余额');
					}else if (money + 2 <= amount) {
						$('#actualMoney').text(money);
						vdRow.addClass('validate-success').removeClass('validate-failed');
						vdTip.html('');
					}
				} else {
					if (money > amount) {
						vdRow.addClass('validate-failed').removeClass('validate-success');
						vdTip.html('提现金额超出可用余额');
					} else {
						$('#actualMoney').text(money);
						vdRow.addClass('validate-success').removeClass('validate-failed');
						vdTip.html('');
					}
				}
			} else {
				$('#actualMoney').text("");
			}
			return false;
		}
	};
	//提交提现
	page.testWithDraw = function() {
		var money = $('#actualMoney').html().replace('元', '');
		var birdCoin=page.deductionCoin;//抵扣鸟币
		var param = {
			'orderAmount': money,
			'birdCoin':birdCoin
		};
		user().goNewPage(param,'2');
		$('#noPsdPopup').show();
		$('#withDrawPopup').show();
	};
	//绑卡跳转事件
	$('.card').on('click', function() {
			window.location.href = '/html/account/card1/';
		})
		//leftnav左边选中状态
	page.leftnav = function() {
		var pn = location.pathname;

		var as = $('#leftnav .item');
		for (var i = 0, j = as.length; i < j; i++) {
			if (as[i].href.indexOf(pn) != -1) {
				as[i].className = 'selected item';
			}
		}
	};
	//初始化
	page.init = function() {
		page.setTitle('我的银行卡');
		user().loginOperate(); //登录判断
		if (!user().isNameAuth()) {
			window.location.href = '/html/account/realname/'
		};
		// page.leftnav();
		user().updateUserInfo(); //更新用户信息
		page.getAccountInfo(); //获取用户账户信息
		page.when(page.getBankList, [page.getQuicklyBankList, page.initState,function(){
      page.recharge.addEventListener('click', function() {
        page.changeNav(this, 'type1')
      }, false);
      page.withDraw.addEventListener('click', function() {
        page.changeNav(this, 'type2')
      }, false);

    }]);
		page.bindRecharge(); //绑定充值方式
	};
	page.init();
	//充值提现切换事件
//光标离开时验证
	$('input[data-type=money]').on('blur', function() {
		_this = $(this);
		var vdRow = _this.parent().parent();
		var vdTip = vdRow.find('.validation');
		var vdSuccess = 'validate-success';
		var vdFailed = 'validate-failed';
		validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
		page.addEvent(_this, vdRow, vdTip);
	});
	//提现金额输入事件
	$('#txtWithdraw').on('input', function() {
		_this = $(this);
		var vdRow = _this.parent().parent();
		var vdTip = vdRow.find('.validation');
		page.addEvent(_this, vdRow, vdTip);
	});
	//光标集中情况验证
	$('input[data-type=money]').on('focus', function() {
		var vdRow = $(this).parent().parent();
		vdRow.removeClass(validate().vdFailed);
		var vdTip = vdRow.find('.validation');
		vdTip.html('');
		$('#loginTip').hide();
	});
	//网银充值提交验证事件
	$('#submit').on("click", function() {
		//触发所有输入的验证
		user().testSubmit();
		//是否有错误
		if ($('#form').find('.validate-failed').length != 0) {
			return false;
		} else {
			//有没选择充值银行
			if ($('#bankList').find('.selected').length == 0) {
				alert('请选择银行');
			} else {
				page.largeRecharge();
			}
		}
	});
	//快捷充值提交验证事件
	$('#submit2').on("click", function() {
		//触发所有输入的验证
		user().testSubmit();
		//是否有错误
		if ($('#form').find('.validate-failed').length != 0) {
			return false;
		} else {
			var data = page.bankInfo[page.bankName];
			var money = parseFloat($('#txtRechargeMoney').val()); //充值金额
			//超出当日限额
			if (money > parseFloat(data.chargeTimeLimit)) {
				alert('订单金额超出单笔限额');
				return;
			}
			//用户是否 已经开通免密
			if (page.isPsd) {
				page.quicklyRechargeSure(); //跳转确认页面
			} else {
				if (page.noPassword) {
					//用户选择是否免密
					page.quicklyRechargeHasPsd();
				} else {
					page.quicklyRechargeNoPsd();
				}
			}
		}
	});
	//提现验证事件
	$('#submit3').on("click", function() {
		//触发所有输入的验证
		user().testSubmit(page.addEvent);
		//是否有错误
		if ($('#form2').find('.validate-failed').length != 0) {
			return false;
		} else {
			page.testWithDraw();
		}
	});
	//免密充值开关按钮事件
	$('#switch').on('click', function() {
		var btn = $(this);
		if (btn.hasClass('selected')) {
			btn.removeClass('selected');
			page.noPassword = false;
			$('#switchStatus').text('(关闭状态)');
		} else {
			btn.addClass('selected');
			page.noPassword = true;
			$('#switchStatus').text('(开启状态)');
		}
	});
	//网银充值弹窗去账户中心
	$('#largeRechargePopup .goCenter').on('click', function() {
		window.location.href = '/html/account/detail/?control=detailCharge'
	});
	//网银提现弹窗去账户中心
	$('#withDrawPopup .goCenter').on('click', function() {
		window.location.href = '/html/account/detail/?control=detailWithDraw'
	});
	//网银充值弹窗去帮助中心
	$('.goHelp').on('click', function() {
		window.location.href = '/help/trade';
	});
	//去确认充值页面
	$('#goConfirm').on("click", function() {
		page.goSurePage();
	});
	function clickEvent(){
		$(this).parents('.open-close').hide();
		$('#txtRechargeMoney').val('').focus();
	}
	$('.goDetail,.closeBtn').on('click',clickEvent);
});
