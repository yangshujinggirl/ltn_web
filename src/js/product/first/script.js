$(function() {

	var page = new Page();
	var userStatus = session().get('userStatus');
	var userType = session().get('userType');
	var secondCategoryId;
	var postData = {};
	page.set('productId', Url.getHashParts(0));
	page.buyInfo = {};
	page.oldMoney = 0; //之前输入的金额
	page.initShourtcuts = function() {
		/**
		 * TODO 登陆后获取用户详情接口（/user/userInfo）中判断用户免密字段数据错误
		 * 与获取个人信息接口（/pc/user/info）中判断免密字段数据正确，故目前采用两个
		 * 接口合并数据，若用户详情接口数据正确，可以只使用这一个接口。
		 */
		return page.getData(
			'/pc/user/info', {}, [setData]);

		function setData(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.set('isNoPwdTZ', data.agreementTZ == '1');

				if (!page.get('isNoPwdTZ')) {
					return page.getData(
						'/user/agreement', {
							agreement_type: 'ZTBB0G00'
						}, [setURL]);
				}
			}
		}

		function setURL(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.set('noPwdTZUrl', data.url);
			}
		}
	};
	//公告消息轮播模板渲染
	page.getNotic = function() {
		return page.getData(
			'/message/getScrollMessage', {
				clientType: 'PC'
			}, [initCrumbTemp, initNotice]);

		/**
		 * init crumb template
		 */
		function initCrumbTemp(data) {
			if (data.resultCode === '0') {
				data = data.data;

				page.initTemplate(data, 'crumb', 'temprumb');
			}
		}

		function initNotice() {
			// init notice marquee
			$('#marquee').marquee({
				yScroll: 'bottom'
			});
		}
	}

	// request prop data标地头模板渲染
	page.getXSBProp = function(cb) {
		var productId = page.get('productId');
		postData.productId = productId;
		return page.getData(
			'/product/productDetail', {
				clientType: 'PC',
				id: productId
			}, [getProductID, initTemp, initChart, addEvents]);

		function getProductID(data) {
			if (data.resultCode == '0') {
				data = data.data;
				page.set('productId', data.pcProductDetail.productId)
			}
		};

		function initTemp(data) {
			if (data.resultCode === '0') {
				data = data.data;
				//老的新手标二级分类
				secondCategoryId = data.pcProductDetail.secondCategoryId;
				page.prodInfo = data.pcProductDetail;
				postData.productName = data.pcProductDetail.productName;
				postData.convertDay = data.pcProductDetail.convertDay;
				postData.annualIncomeText = data.pcProductDetail.annualIncomeText;
				postData.repaymentType = data.pcProductDetail.repaymentType;
				postData.staRateDate = data.pcProductDetail.staRateDate;
				postData.productType = data.pcProductDetail.productType;
				postData.endDate = data.pcProductDetail.endDate;
				page.initTemplate(data.pcProductDetail, 'prop', 'tempProp');
			}
		};

		function initChart(data) {
			if (data.resultCode === '0') {
				data = data.data.pcProductDetail;
				// load echarts.
				var chartContainer = $('#chartProcess')[0],
					chart = echarts.init(chartContainer);

				chart.setOption({
					series: {
						name: '项目进度',
						type: 'pie',
						radius: ['80%', '100%'],
						label: {
							normal: {
								show: false,
							}
						},
						data: [{
							value: data.progress,
							name: '已完成',
							itemStyle: {
								normal: {
									color: '#ff6f20'
								}
							}
						}, {
							value: 100 - (data.progress),
							name: '剩余',
							itemStyle: {
								normal: {
									color: '#e2e2e2'
								}
							}
						}]
					}
				});
			}
		};

		function addEvents() {
			$('#invest').on('click', investOperation);
			//立即投资处理方法
			function investOperation() {
				user().loginOperate(nameAuthOperate2()); //登录实名处理
			};
			//投资弹窗的处理
			function investPopup() {
				page.getBuyPopup(); //获取投资弹窗数据
				var cover = $('.common-cover'),
					dialog = $('#buy');
				cover.addClass('show');
				dialog.addClass('show');

			};

			//实名处理方法
			function nameAuthOperate2() {
				return function() {
					if(userType=='1') {
						if(userStatus=='-1')  {
							window.location.href = '/html/user/corporate_fail/'
						} else if(userStatus=='0') {
							window.location.href = '/html/user/corporate_success/'
						} else if(userStatus=='2') {
							window.location.href = '/html/user/corporate_realname1/'
						} else if(userStatus=='1') {
							user().nameAuthOperate(testBuyStatus);
						}
					} else {
						user().nameAuthOperate(testBuyStatus);
					}
				}
			};
			//验证用户是否有购买新手标的资格
			function testBuyStatus() {
				return page.getData(
					'/user/userIsBuyProduct', {}, [initTemp]);

				function initTemp(data) {
					if (data.resultCode === '0') {
						data = data.data;
						//判断用户是否拥有体验资格
						if (data.isCanBuyXSB == '1') {
							//拥有体验资格
							investPopup();
						} else {
							$('#invest').attr("disabled", "disabled").addClass('disabled').html('您不符合购买条件');
						}
					}
				}
			};
			$('#buyClose').on('click', hideBuy);

			function showBuy() {
				var cover = $('.common-cover'),
					dialog = $('#buy');

				cover.addClass('show');
				dialog.addClass('show');
			}

			function hideBuy() {
				var cover = $('.common-cover'),
					dialog = $('#buy');

				cover.removeClass('show');
				dialog.removeClass('show');
			}
		};
	},

	//项目详情模板渲染
	page.getLXSBXM = function(cb) {
			var productId = page.get('productId');
			return page.getData(
				'/product/productIntroduceS',
				{clientType: 'PC',
				id: productId},
				[initTemp]);
			function initTemp(data) {
				if (data.resultCode === '0') {
					data = data.data.pcProductIntroduceS;
					data.secondCategoryId = secondCategoryId;
					console.log(data)
					page.initTemplate(data, 'XSBdetail', 'tempDetail');
				}
			};
	},
	//投资记录分页
	page.pagDesc = function (){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      currPage: page.get('currPage'),
      callback:intPage
    });
    function intPage(pageNo){
      page.getDesc (pageNo);
    }
  };
	// request desc data投资记录模板渲染
	page.getDesc = function(currenPage) {
		page.set('currPage', currenPage);
		if (!user().isLogin()) {
				$('#logCont').css('display','none');
				$('.nolist').css('display','block');
				$('.accountpage').css('display','none');
				// bind tab events
							var tab = $('#tescXSBtab'),
								tabItems = $('#tescXSBtab .item'),
								classType = [],
								detail = $('#contentXsbTab');

							tabItems.each(function(index, item) {
								classType.push($(item).data('content'));
							});
							classType = classType.join(' ');

							tab.on('click', function(event) {
								var item = $(event.target);
								if (item.hasClass('item')) {
									tabItems.removeClass('selected');
									item.addClass('selected');
									detail.removeClass(classType).addClass(item.data('content'));
								}
							});
				}else{
					$('#logCont').css('display','block');
					$('.nolist').css('display','none');
					$('.accountpage').css('display','block');
									return page.getData(
							'/product/purchasehistory', {
								clientType: 'PC',
								currentPage: currenPage || 0,
				      	pageSize:10,
								productId: page.get('productId')
							}, [initTemp,getTotalSize,addEvents]);

						function initTemp(data) {
							if (data.resultCode === '0') {
								data = data.data;

								page.initTemplate(data, 'desc', 'tempDescXSB');
							}
						};

						function getTotalSize(data) {
				      if (data.resultCode === '0') {
				        data = data.data;
				        page.set('totalCount', data.totalCount)
				      }
				      page.pagDesc();
				    };

						function addEvents() {
							// bind tab events
							var tab = $('#tescXSBtab'),
								tabItems = $('#tescXSBtab .item'),
								classType = [],
								detail = $('#contentXsbTab');

							tabItems.each(function(index, item) {
								classType.push($(item).data('content'));
							});
							classType = classType.join(' ');

							tab.on('click', function(event) {
								var item = $(event.target);
								if (item.hasClass('item')) {
									tabItems.removeClass('selected');
									item.addClass('selected');
									detail.removeClass(classType).addClass(item.data('content'));
								}
							});
						};
				};
				$('#login2').on('click',function(){
				   user().loginOperate();
			  });
	},
		//获取购买弹窗的信息
	page.getBuyPopup = function() {
		return page.getData(
			'/user/userInfo', {}, [initTemp, addEvent]);

		function initTemp(data) {
			if (data.resultCode === '0') {
				data = data.data;
				//重新创建一个购买数据
				page.buyInfo.prodInfo = page.prodInfo;
				page.buyInfo.userInfo = data;
				postData.productRemainAmount = data.usableBalance;
				postData.isNoPwdTZ = data.isNoPwdTZ;
				page.initTemplate(page.buyInfo, 'form', 'tempBuy');
				page.operateEndMoney(); //判断是否尾款
			}
		}
		//绑定事件处理
		function addEvent() {
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
				if ($('#form').find('.validate-failed').length != 0) {
					return false;
				} else {
					var money = strUtil().trim($('#txtMoney').val());
					var amountMoney = $('#amountMoney').html().replace('元', '');
					//跨页面传输数据
					postData.buyAmount = money;
					postData.amountMoney = amountMoney;
					page.post('./confirm', postData);
				}
			});
		};
	},
	//处理剩余金额小于起投金额
	page.operateEndMoney = function() {
		var _this = $('#txtMoney');
		var vdRow = _this.parent().parent();
		var vdTip = vdRow.find('.validation');
		var startMoney = parseFloat(page.buyInfo.prodInfo.staInvestAmount); //获取起投金额
		var endMoney = parseFloat(page.buyInfo.prodInfo.productRemainAmount); //获取剩余金额
		//如果剩余金额小于起投金额
		if (endMoney <= startMoney) {
			_this.attr('readonly', 'readonly'); //设置为只读
			_this.val(endMoney); //默认显示剩余金额
			vdRow.addClass('validate-success').removeClass('validate-failed');
			vdTip.html('最后一笔投资只能为剩余金额');
			$('#amountMoney').html(endMoney+'元');
		}
	},
	//处理用户输入的金额
	page.operateMoney = function(_this, vdRow, vdTip) {
		if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
			var money = parseFloat(_this.val()); //获取金额
			var startMoney = parseFloat(page.buyInfo.prodInfo.staInvestAmount); //获取起投金额
			var endMoney = parseFloat(page.buyInfo.prodInfo.productRemainAmount); //获取剩余金额
			var userMoney = parseFloat(page.buyInfo.userInfo.usableBalance); //用户余额
			var investment = parseFloat(page.buyInfo.prodInfo.convertDay);
			if (investment <= 10) {
					if (money > 10000) {
						vdRow.addClass('validate-failed').removeClass('validate-success');
				    vdTip.html('新手标单次投资上限为10000元');
				    return;
					}
			}
			//用户输入金额小于起投金额
			if (money < startMoney) {
				vdRow.addClass('validate-failed').removeClass('validate-success');
				vdTip.html('投资金额必须大于起投金额');
				return;
			} else {
				//用户输入金额小于剩余金额
				if (money <= endMoney) {
					//判断用户余额是否充足
					if (userMoney >= money) {
						vdRow.addClass('validate-success').removeClass('validate-failed');
						//2次输入金额不同进行计算
						if (page.oldMoney != money) {
							$('#amountMoney').html(money + '元');
							page.oldMoney = money; //旧的金额等于目前输入的金额
							return;
						}

					} else {
						vdRow.addClass('validate-failed').removeClass('validate-success');
						vdTip.text('个人账户余额不足，请').append($('<a>')
							.attr({
							href: '/html/account/bank',
							target: '_blank'
							})
							.addClass('link').text('充值'));

							$('.link').on('click',function(){
								window.location.reload();
							})
						return;
						}
					} else {
						vdRow.addClass('validate-failed').removeClass('validate-success');
						vdTip.html('投资金额不能大于剩余金额');
						return;
					}
			}
		}
	},
	page.init = function() {
    page.setTitle('新手标');
		page.getNotic();
		page.when(page.getXSBProp, [page.getLXSBXM]);
		page.when(page.getDesc, [page.pagDesc]);
	},

	page.init();
});
