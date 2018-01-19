$(function() {

	var page = new Page();

	var date = dateUtil().formatDate('yyyy-MM-dd');
	var userStatus = session().get('userStatus');
	var userType = session().get('userType');

	var ID = urlUtil().get('id');
	page.startDate; //起息时间
	page.endDate; //还款时间
	page.couponId; //体验金券id
	page.productTotalAmount;
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

				page.initTemplate(data, 'crumb', 'tempCrumb');
			}
		}

		function initNotice() {
			// init notice marquee
			$('#marquee').marquee({
				yScroll: 'bottom'
			});
		}
	}

	// request prop data
	page.getTYBProp = function(cb) {

		return page.getData(
			'/product/tybDetail', {
				clientType: 'PC'
			}, [getProductID, initTemp, addEvents]);

		function getProductID(data) {
			if (data.resultCode == '0') {
				data = data.data;
				page.set('productId', data.pcTybDetails.id);
				page.set('productTotalAmount',data.pcTybDetails.productTotalAmount);
			}
		}

		function initTemp(data) {
			if (data.resultCode === '0') {
				data = data.data;
				var obj = data.pcTybDetails;
				obj.jixitime = date;
				page.startDate = date;
				page.endDate = obj.endDate;
				page.initTemplate(obj, 'startProp', 'tempStartProp');
				page.initTemplate(obj,'buyDialog','tempbuy');
			}
		}

		function addEvents() {
			$('#invest').on('click', investOperation);
			$('#buyDialogClose').on('click', hideBuy);
			//确认投资
			$('#submit').on('click', function() {
					return page.getData(
						'/product/buy/confirm', {
							productId: page.get('productId'),
							orderAmount: page.get('productTotalAmount'),
							userCouponId: page.couponId,
							birdCoin: 0
						},
						function(data) {
							//体验券购买成功
							if (page.isSuccess(data)) {
								var data = data.data;
								var postData = {
									startDate: page.startDate,
									endDate: page.endDate,
									isSuccess: true
								};
								page.post('./confirm', postData);
							} else {
								var postData = {
									isSuccess: false,
									message: data.resultMessage
								};
								page.post('./confirm', postData);
							}
						}
					)
			});

		function showBuy() {
			var cover = $('.common-cover'),
				dialog = $('#buyDialog');
			cover.addClass('show');
			dialog.addClass('show');
			$('#startDate').text(page.startDate);
			$('#endDate').text(page.endDate);
			//获取体验金券
			return page.getData(
				'/user/userInfo', {
					productId: page.get('productId')
				}, [initTemp]);

			function initTemp(data) {
				if (data.resultCode === '0') {
					data = data.data;
					var coupons = page.getCoupons(data.coupons); //获取体验金券
					if (coupons.length > 0) {
						page.couponId = coupons[0].id; //获取体验金券id
					}
				}
			}
		}

		function investOperation() {
			user().loginOperate(testBuyStatus); //登录处理
		};
		//验证用户是否有购买体验标的资格
		function testBuyStatus(){
			return page.getData(
				'/user/userIsBuyProduct', {}, [initTemp]);

			function initTemp(data) {
						if (data.resultCode === '0') {
							data = data.data;
							//判断用户是否拥有体验资格
							if(data.isCanBuyTYB=='1'){
								//拥有体验资格
								if(userType=='1') {
									if(userStatus=='-1')  {
										window.location.href = '/html/user/corporate_fail/'
									} else if(userStatus=='0') {
										window.location.href = '/html/user/corporate_success/'
									} else if(userStatus=='2') {
										window.location.href = '/html/user/corporate_realname1/'
									} else if(userStatus=='1') {
										showBuy();
									}
								} else {
									showBuy();
								}
					}else{
						$('#invest').attr("disabled","disabled").addClass('disabled').html('您不符合购买条件');
					}
				}
			}
		};
		function hideBuy() {
			var cover = $('.common-cover'),
				dialog = $('#buyDialog');

			cover.removeClass('show');
			dialog.removeClass('show');
		}
	}
};
//获取理财金券
page.getCoupons = function(list) {
	var coupons = [];
	var e, i, l = (list && list.length) || 0;
	for (i = 0; i < l; i++) {
		e = list[i];
		if (e.status === 'YX' && e.activityType == 'TYDK') {
			coupons.push({
				id: e.userCouponId,
				name: e.couponName,
				type: e.activityType, // TZFX 返现券; TYDK 体验金券; JXQ 加息券
				expired: e.couponDate,
				limit: e.limitAmount,
				amount: e.amount
			});
		}
	}
	return coupons;
};

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
// request desc data
page.getDesc = function(currenPage) {
	page.set('currPage', currenPage);
	if (!user().isLogin()) {
			$('#logCont').css('display','none');
			$('.nolist').css('display','block');
			$('.accountpage').css('display','none');
			// bind tab events
					var tab = $('#descTab'),
						tabItems = $('#descTab .item'),
						classType = [],
						detail = $('#contentTab');

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
						page.initTemplate(data, 'desc', 'tempDesc');
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
					var tab = $('#descTab'),
						tabItems = $('#descTab .item'),
						classType = [],
						detail = $('#contentTab');

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
}
page.init = function() {
	page.setTitle('体验标');
	page.getNotic();
	// page.when(page.getTYBProp, [page.getDesc,page.pagDesc]);
	page.when(page.getTYBProp,function(){
		page.when(page.getDesc,[page.pagDesc]);
	});
}

page.init();
});
