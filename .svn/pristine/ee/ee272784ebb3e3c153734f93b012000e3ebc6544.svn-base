$(function() {

	var page = new Page();
	var postData = {};
	page.moneyRegex=/^[0-9]{1}[\d]*\.?[\d]{0,2}$/;
	//添加Type sessionkey
	var clientType = constant().clientType;
	var sessionKey = constant().sessionKey;
	page.currentMoney; //随心投余额

	page.initpaging1 = function(num, pagecurrent) {
		$('#pages1').paging({
			totalSize: num,
			currPage: pagecurrent,
			turnSize: 10,
			pageSize: 10,
			callback: initList
		});

		function initList(pageNo) {

			page.getdetailin(pageNo);

		};
	}
	page.initpaging2 = function(num, pagecurrent) {
		$('#pages2').paging({
			totalSize: num,
			currPage: pagecurrent,
			turnSize: 10,
			pageSize: 10,
			callback: initList
		});

		function initList(pageNo) {

			page.getdetailout(pageNo);

		};
	}
	page.initpaging3 = function(num, pagecurrent) {
		$('#pages3').paging({
			totalSize: num,
			currPage: pagecurrent,
			turnSize: 10,
			pageSize: 10,
			callback: initList
		});

		function initList(pageNo) {

			page.getdetailprofit(pageNo);

		};
	}

	//data detailfreedom
	page.getprofit = function() {

		return page.getData(
			'/account/current/homepage', {
				'clientType': clientType,
				'sessionKey': sessionKey
			}, [profit, echart, addEvents]);

		function profit(data) {
			if (page.isSuccess(data)) {
				var data = data.data;
				page.currentMoney = data.pcCurrentProductAccountInfo.balance; //获取随心投余额
				page.initTemplate(data, 'freedomprofit', 'tempfreedomtop');
				//随心投余额为0,转出按钮置灰
				if (page.currentMoney == 0) {
					$('#freedomout').addClass('disabled').attr('disabled', 'disabled');
				}
			}
		};

		function echart(data) {
			if (page.isSuccess(data)) {
				var data = data.data;

				//load echars
				var chartContainer = $('#chartform')[0],
					chart = echarts.init(chartContainer);

				option = {
					tooltip: {
						trigger: 'axis'
					},
					calculable: true,
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						data: [data.pcCurrentProductLast7DayIncomeList[0].createDate, data.pcCurrentProductLast7DayIncomeList[1].createDate, data.pcCurrentProductLast7DayIncomeList[2].createDate, data.pcCurrentProductLast7DayIncomeList[3].createDate, data.pcCurrentProductLast7DayIncomeList[4].createDate, data.pcCurrentProductLast7DayIncomeList[5].createDate, data.pcCurrentProductLast7DayIncomeList[6].createDate]
					}],
					yAxis: [{
						type: 'value'
					}],
					series: [{
						name: '收益',
						type: 'line',
						stack: '总量',
						itemStyle: {
							normal: {
								areaStyle: {
									type: 'default'
								}
							}
						},
						data: [data.pcCurrentProductLast7DayIncomeList[0].income, data.pcCurrentProductLast7DayIncomeList[1].income, data.pcCurrentProductLast7DayIncomeList[2].income, data.pcCurrentProductLast7DayIncomeList[3].income, data.pcCurrentProductLast7DayIncomeList[4].income, data.pcCurrentProductLast7DayIncomeList[5].income, data.pcCurrentProductLast7DayIncomeList[6].income]
					}, ]
				};

				chart.setOption(option);
			}
		};

		function addEvents() {
			$("#freedomout").on('click', freedomout);
			$("#freedomin").on('click', freedomin);
			//转出方法
			function freedomout() {
				var _cover = $('.common-cover'),
					dialog = $('#flowout');

				_cover.addClass('show');
				dialog.addClass('show');
				$('#currentMoney').html(strUtil().formatKilo(page.currentMoney));
				//关闭弹层
				$('.close').on('click', function() {
					var btn = $(this).parents('.component');
					page.hideDialog(btn);
				});
				//光标离开时验证
				$("#txtMoney[readonly!='readonly']").on('blur', function() {
					_this = $(this);
					var vdRow = _this.parent().parent();
					var vdTip = vdRow.find('.validation');
					var vdSuccess = 'validate-success';
					var vdFailed = 'validate-failed';
					validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
					page.operateMoney(_this, vdRow, vdTip);
				});
				//光标集中情况验证
				$("#txtMoney[readonly!='readonly']").on('focus', function() {
					var vdRow = $(this).parent().parent();
					vdRow.removeClass(validate().vdFailed);
					var vdTip = vdRow.find('.validation');
					vdTip.html('');
					$('#loginTip').hide();
				});
				//提交验证事件
				$('#submit').on("click", function() {
					//触发所有输入的验证
					var element = $("#txtMoney[readonly!='readonly']");
					user().testSubmit(page.operateMoney, element);
					//是否有错误
					if ($('#outForm').find('.validate-failed').length != 0) {
						return false;
					} else {
						page.outCurrent();
					}
				});
			};

			function freedomin() {
				var isCan = page.get('isCanBuySXT');
				if (isCan) {
					page.initBuy();
					var cover = $('.common-cover'),
						dialog = $('#buy');

					cover.addClass('show');
					dialog.addClass('show');
				} else {
					$('.noIvest').addClass('selected');
				}
			}
		};
	};

	//获取转入明细的数据
	page.getdetailin = function(pagecurrent) {
		return page.getData(
			'/account/current/order', {
				'clientType': clientType,
				'sessionKey': sessionKey,
				'type': 'ZR',
				'currentPage': pagecurrent,
				'pageSize': 10
			}, [freedomin, nolist, addEvent]);

		function freedomin(data) {
			if (page.isSuccess(data)) {
				var data = data.data;
				page.initTemplate(data, 'detailin', 'temptablein');

				page.initpaging1(data.totalCount, pagecurrent);

			}
		};

		function nolist(data) {
			if (page.isSuccess(data)) {
				var data = data.data.currentList;
				if (data.length <= 0) {
					$('#nolist1').show();
					$('#pages1').hide();
				}
			}
		};

		function addEvent() {
			//投资协议点击事件
			$('.inAgree').on('click', function() {
				page.contract($(this));
			});
		}
	};

	//data detailout
	page.getdetailout = function(pagecurrent) {

		return page.getData(
			'/account/current/order', {
				'clientType': clientType,
				'sessionKey': sessionKey,
				'type': 'ZC',
				'currentPage': pagecurrent,
				'pageSize': 10
			}, [freedomout, nolist]);

		function freedomout(data) {
			if (page.isSuccess(data)) {
				var data = data.data;

				page.initTemplate(data, 'detailout', 'temptableout');

				page.initpaging2(data.totalCount, pagecurrent);
			}
		};

		function nolist(data) {
			if (page.isSuccess(data)) {
				var data = data.data.currentList;
				if (data.length <= 0) {
					$('#nolist2').show();
					$('#pages2').hide();
				}
			}
		};
	};

	//data detailprofit
	page.getdetailprofit = function(pagecurrent) {
		return page.getData(
			'/user/current/incomeList', {
				'clientType': clientType,
				'sessionKey': sessionKey,
				'pageSize': 10,
				'currentPage': pagecurrent
			}, [profitdetail, nolist]);

		function profitdetail(data) {
			if (page.isSuccess(data)) {
				var data = data.data;

				page.initTemplate(data, 'detailprofit', 'temptabledetail');
				page.initpaging3(data.totalCount, pagecurrent);
			}
		};

		function nolist(data) {
			if (page.isSuccess(data)) {
				var data = data.data.currentIncomeList;
				if (data.length <= 0) {
					$('#nolist3').show();
					$('#pages3').hide();
				}
			}
		};
	};

	//bind tab action
	page.actiontab = function() {
		var tab = $('#itemtap'),
			tabItems = $('#itemtap .item'),
			classType = [],
			detail = $('#contenttable');

		tabItems.each(function(index, item) {
			classType.push($(item).data("content"));
		});
		classType = classType.join(' ');

		tab.on('click', function(event) {
			var item = $(event.target);
			if (item.hasClass('item')) {
				tabItems.removeClass('selected');
				item.addClass('selected');
				detail.removeClass(classType).addClass(item.data('content'));
			};
		})
	}

	//leftnav 左边选中状态
	page.leftnav = function() {
		var pn = location.pathname;
		var as = $('#leftnav .item');
		for (var i = 0, j = as.length; i < j; i++)
			if (as[i].href.indexOf(pn) != -1) {
				as[i].className = 'selected item';
			}
	}

	//处理用户输入金额
	page.operateMoney = function(_this, vdRow, vdTip) {
		if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
			var money = parseFloat(strUtil().trim(_this.val())); //获取金额
			//用户输入金额大于用户金额
			if (money > page.currentMoney) {
				vdRow.addClass('validate-failed').removeClass('validate-success');
				vdTip.html('转出金额不能大于账户可转金额');
				return;
			} else {
				vdRow.addClass('validate-success').removeClass('validate-failed');
				$('#realityMoney').html(money + '元');
			}
		}
	};
	//获取随心投信息
	page.initProp = function(cb) {
		return page.getData(
			'/product/sxtDetail', {
				clientType: 'PC'
			}, [setData]);

		function setData(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.set('productId', data.productId);
				page.set('productRemainAmount', data.productRemainAmount);

				postData.annualIncomeText = parseFloat(data.annualIncomeText);
			}
		}
	};

	//获取随心投转入数据
	page.initBuy = function() {

		return page.getData(
			'/user/totalAccount', {}, [initTemp, addEvents]);

		function initTemp(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				data.productRemainAmount = page.get('productRemainAmount');
				data.buyTime =  dateUtil().formatDate('yyyy-MM-dd');
				page.initTemplate(data, 'buy', 'tempBuy');

				// Available amount of user's account
				page.set('usableBalance', data.usableBalance);

				postData.productRemainAmount = data.productRemainAmount;
				postData.usableBalance = data.usableBalance;
				postData.buyTime = data.buyTime;
			}
		};

		function addEvents() {
			var isVal = false ;
			$('#buyClose').on('click', hideBuy);

			// TODO validate input data
			$('#amount').on('blur', function(event) {
				var money = $(this).val(),
				$row = $(this).parents('.row').eq(0),
					userRest = +page.get('usableBalance'),
					prodRest = +page.get('productRemainAmount');
				if (money === '') {
          $row
            .removeClass('validate-success validate-failed')
            isVal = false;
        } else if (!isNaN(money)) {
					if (+money > userRest) {
						$row
							.removeClass('validate-success')
							.addClass('validate-failed');
						$('#amount-validate').text('个人账户余额不足,请').append(
							$('<a>').attr({
								href:'/html/account/bank',
								target:'_bank'
							})
							.addClass('link').text('充值')
							);
						$('.link').on('click',function(){
							window.location.reload();
						});
						isVal = false;
					} else if (+money > prodRest) {
						$row
							.removeClass('validate-success')
							.addClass('validate-failed');
						$('#amount-validate').text('产品剩余可投金额不足');
						isVal = false;
					} else if(parseFloat(money)<1){
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          	$('#amount-validate').text('最小起投金额为1元');
	          	isVal = false;
        	} else {
						$(this).parents('.row').eq(0)
							.removeClass('validate-failed')
							.addClass('validate-success');
						$('#amount-validate').text('');
						$('#actual').text(Util.padFloatMoney(money) + '元');
						page.set('buyAmount', money);
						postData.buyAmount = parseFloat(money);
						isVal = true;
					}
				} else {
					$(this).parents('.row').eq(0)
						.removeClass('validate-success')
						.addClass('validate-failed');
					$('#amount-validate').text('请输入正确金额');
					isVal = false;
				}
			});

			$('#btnBuy').on('click', function(event) {
        validate();
        if(isVal){
          page.post('/html/product/current/confirm', postData);
        }else{
          return false ;
        }
	    });

	    function hideBuy() {
	      var cover = $('.common-cover'),
	        dialog = $('#buy');

	      cover.removeClass('show');
	      dialog.removeClass('show');
	    };
	     //用户金额判断
	    function validate(){
	        var money = $('#amount').val(),
	          $row = $('#amount').parents('.row').eq(0),
	          userRest = +page.get('usableBalance'),
	          prodRest = +page.get('productRemainAmount');
	          isVal = false;
	        if (money === '') {
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	            isVal = false;
	            $('#amount-validate').text('请输入正确金额');
	        } else if (isNaN(money)) {
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          $('#amount-validate').text('请输入正确金额');
	          isVal = false;

	        }else if (!page.moneyRegex.test(money)) {
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          $('#amount-validate').text('输入金额只能2位小数');
	          isVal = false;
	        } else if (+money > userRest) {
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          $('#amount-validate').text('个人账户余额不足，请').append(
	            $('<a>').attr({href:'/html/account/bank', target:'_blank'}).addClass('link').text('充值'));
	          isVal = false;
	        } else if (+money > prodRest) {
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          $('#amount-validate').text('最多可投'+prodRest+'元');
	          isVal = false;
	        } else if(parseFloat(money)<1){
	          $row
	            .removeClass('validate-success')
	            .addClass('validate-failed');
	          $('#amount-validate').text('最小起投金额为1元');
	          isVal = false;

	        }else {
	          $row
	            .removeClass('validate-failed')
	            .addClass('validate-success');
	          $('#amount-validate').text('');
	          $('#actual').text(Util.padFloatMoney(money || 0) + '元');
	          page.set('buyAmount', money);
	          postData.buyAmount = parseFloat(money);
	          postData.buyTime = dateUtil().formatDate('yyyy-MM-dd');
	          isVal = true;
	        }
	    };
		};
	};
	//获取用户是否可以购买随心投
	page.initUser = function() {
			return page.getData(
				'/user/userIsBuyProduct', {}, [setData]);

			function setData(data) {
				if (page.isSuccess(data)) {
					data = data.data;
					page.set('isCanBuySXT', data.isCanBuySXT === 1);
				}
			}
		}
		//提交转出随心投
	page.outCurrent = function() {
		var money = parseFloat(strUtil().trim($('#txtMoney').val())); //转出金额
		// money=100000000;
		return page.getData('/product/current/extract', {
			order_amount: money
		}, [operate]);
		//处理提交
		function operate(data) {
			var postData = {};
			if (page.isSuccess(data)) {
				postData.isSuccess = true;
			} else {
				postData.isSuccess = false;
				postData.message = data.resultMessage;
			}
			page.post('/html/account/roll-out', postData);
		}
	};
	//生成投资协议
	page.contract = function(_this) {
		var orderNo=_this.attr('data-id');
		var param={
			'isSXT': '1',
			'orderNo': orderNo
		}
		user().goNewPage(param,'10');
	};

	page.init = function() {
    page.setTitle('我的随心投');
		user().loginOperate();
		page.initProp();
		page.getprofit();
		page.getdetailin();
		page.getdetailout();
		page.getdetailprofit();
		page.actiontab();
		page.initUser();
		// page.leftnav();
	}

	page.init();
});