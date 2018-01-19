$(function() {
  // 计算收益
  function mutilPreProfit(inAmount,profit,days){
    inAmount = Number(inAmount);
    profit = Number(profit);
    days = Number(days);
    return inAmount*profit*days/360;
  }
  // 选择券的时候重新计算
  function moreProfit(preProfit,coupon){
    if(coupon.type == 'JXQ'){
      return preProfit+preProfit*coupon.amount/100;
    }else if(coupon.type == 'TZFX'){
      return preProfit+coupon.amount;
    }else{
      return preProfit;
    }
  }
  // 判断对像是否为空
  function isEmptyObject(e) {
      var t;
      for (t in e)
          return !1;
      return !0;
  }
	var page = new Page();

	var postData = {};
	page.set('productId', Url.getHashParts(0));
	page.isEnd;//是否尾款
  var userStatus = session().get('userStatus');
  var userType = session().get('userType');
	/*
	 * author: toni
	 * time: 20160520
	 * describe: 风险控制的几个数组,分别记录风险控制的几个类型的图片
	 */
	page.riskType1=[];//房屋买卖
	page.riskType2=[];//房产证
	page.riskType3=[];//银行批贷函
	page.riskType4=[];//乐巢贷服务合同
	page.riskType5=[];//个人征信报告
	page.riskType6=[];//身份证
	page.riskType7=[];//户口本
	page.riskType8=[];//产权调查
	page.riskType9=[];//巢值贷服务合同
  page.riskType10=[];//车位买卖合同
  page.riskType11=[];//工资收入证明
  page.riskType12=[];//社保公积金证明
  page.riskType13=[];//产权房屋证明
  page.riskType14=[];//安翼贷服务合同
  page.riskType15=[];//房屋装修合同
  page.riskType16=[];//靓巢贷服务合同
  page.riskType17=[];//展翼贷-001服务合同
  page.riskType18=[];//易巢贷服务合同
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
				postData.noPwdTZUrl = data.url;
			}
		}
	};

	page.initUser = function() {
    var productId = page.get('productId');
		return page.getData(
			'/user/userInfo', {
        productId:productId
      }, [setData]);

		function setData(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.set('coupons', genCoupons(data.coupons));
				page.set('coin', data.birdCoin);
				page.set('usableBalance', data.usableBalance);
			}

			function genCoupons(list) {
				var coupons = [];
				var e, i, l = (list && list.length) || 0;
				for (i = 0; i < l; i++) {
					e = list[i];
					if (e.status === 'YX' && e.activityType !== 'TYDK') {
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
			}
		}
	}

	page.initCrumb = function() {
		return page.getData(
			'/message/getScrollMessage', {
				clientType: 'PC'
			}, [initTemp, initNotice]);

		/**
		 * init crumb template
		 */
		function initTemp(data) {
			if (data.resultCode === '0') {
				data = data.data;
				page.initTemplate(data, 'crumb', 'tempCurmb');
			}
		}

		function initNotice() {
			// init notice marquee
			$('#marquee').marquee({
				yScroll: 'bottom'
			});
		}
	};

	//request prop data
	page.initProp = function(cb) {
		var productId = page.get('productId');
		return page.getData(
			'/product/productDetail', {
				id: productId
			}, [setData, initTemp, initChart, addEvents,flag,getProductID]);

    function getProductID(data) {
      if(data.resultCode == '0') {
        data = data.data;
        //设置title名字
        page.setTitle(data.pcProductDetail.productTag);
        if(data.pcProductDetail.secondCategoryId=="1008013"||data.pcProductDetail.secondCategoryId=="1006001") {//供应链
            $('.JS-banner').hide();
            $('.JS-common,.JS-shopStages,.JS-cashStages').hide();
            $('.JS-supply').show();
        } else if(data.pcProductDetail.secondCategoryId=="1008014"||data.pcProductDetail.secondCategoryId=="1004003") {//消费分期
          $('.JS-banner').hide();
            $('.JS-common,.JS-supply,.JS-cashStages').hide();
            $('.JS-shopStages').show();
        } else if(data.pcProductDetail.secondCategoryId=="1008015"||data.pcProductDetail.secondCategoryId=="1004004") {//信用宝
            $('.JS-banner').hide();
            $('.JS-common,.JS-supply,.JS-shopStages').hide();
            $('.JS-cashStages').show();
        } else if(data.pcProductDetail.secondCategoryId=="1008016") {
            console.log('债券转让')
        } else {
          $('.JS-shopStages,.JS-supply,.JS-cashStages').hide();
          $('.JS-common').show();
        }
      }
    }

		function setData(data) {
			if (page.isSuccess(data)) {
				data = data.data.pcProductDetail;
				page.set('productRemainAmount', data.productRemainAmount);
				page.set('staInvestAmount', data.staInvestAmount);
				page.set('staRateDate', data.staRateDate);
				page.set('endDate', data.endDate);
        page.set('annualIncomeText',data.annualIncomeText);
				page.set('annualIncome',data.annualIncome);
        page.set('convertDay',data.convertDay);
        page.set('singleLimitAmount',data.singleLimitAmount);
        page.set('useCouponTag',data.useCouponTag);
        page.set('useBirdCoinTag',data.useBirdCoinTag);
				postData.productId = productId;
				postData.productName = data.productName;
				postData.convertDay = data.convertDay;
				postData.staRateDate = data.staRateDate;
				postData.endDate = data.endDate;
				postData.annualIncomeText = data.annualIncomeText;
				postData.annualIncomeText = parseFloat(data.annualIncomeText);
			}
		}

    function flag(data) {
      if (data.resultCode == '0') {
        data = data.data;
        if(data.pcProductDetail.floatTag==0) {
          $('#floatproject').hide();
        } else {
          $('#floatproject').show();
          $('#valueOne').html(data.pcProductDetail.bidPublishDate);
          $('#valueTwo').html(data.pcProductDetail.staRateDate);
          $('#valueThr').html(data.pcProductDetail.endDate);
          $('#valueFour').html(data.pcProductDetail.auctionDate);
          $('#timeValueOne').html(data.pcProductDetail.staRateDate);
          $('#timeValueTwo').html(data.pcProductDetail.auctionDate);
        }
      }
    }

		function initTemp(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.initTemplate(data.pcProductDetail, 'prop', 'tempProp');
			}
		}

		function initChart(data) {
			if (page.isSuccess(data)) {
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
							value: parseInt(data.progress),
							name: '已完成',
							itemStyle: {
								normal: {
									color: '#ff6f20'
								}
							}
						}, {
							value: 100 - parseInt(data.progress),
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
		}

		function addEvents(data) {
			$('#invest').on('click', investOperation);
      if (data.resultCode === '10000006') {
        session().clear();
        user().loginOperate();
        return;
      }

			//立即投资处理方法
			function investOperation() {
				user().loginOperate(nameAuthOperate2()); //登录实名处理
			};

			function showBuy() {
    				page.when(page.initUser,[page.initShourtcuts,page.initBuy])
            var cover = $('.common-cover'),
                dialog = $('#buy');
                cover.addClass('show');
                dialog.addClass('show');
			}

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
              user().nameAuthOperate(showBuy);
            }
          } else {
            user().nameAuthOperate(showBuy);
          }
				}
			};
		}
	};
  //轮播
  page.initLunbo = function(data){
  		page.initTemplate(data,'propLunbo','tempLunbo');

        var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        autoHeight: true, //enable auto height
        });

  };

  //乐巢投详情
  page.getLCT = function(cb){
  	var productId = page.get('productId');
  	return page.getData(
  		'/product/productIntroduceS',
  		{clientType:'PC',id:productId},[initTemp,initRiskPro,addEvent]);
  	function initTemp(data){
  		if (data.resultCode ==='0') {
  			data = data.data;
  			page.initTemplate(data.pcProductIntroduceS,'detail','tempDetail');
  		}
  	}
  	//获取风险控制的项目图片
  	function initRiskPro(data){
  		var infoAuthList=data.data.pcProductIntroduceS.infoAuthList;
  		//获取风控项目的5个类型
      if(!infoAuthList == ''){
        for(var i=0;i<infoAuthList.length;i++){
        if (infoAuthList[i].infoType == 'RC') {
          if(infoAuthList[i].infoName=='房屋买卖合同' && infoAuthList[i].infoUrl !==''){
          page.riskType1.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='房产证' && infoAuthList[i].infoUrl !==''){
            page.riskType2.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='银行批贷函' && infoAuthList[i].infoUrl !==''){
            page.riskType3.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='乐巢贷服务合同' && infoAuthList[i].infoUrl !==''){
            page.riskType4.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='个人征信报告' && infoAuthList[i].infoUrl !==''){
            page.riskType5.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='身份证' && infoAuthList[i].infoUrl !==''){
            page.riskType6.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='户口本' && infoAuthList[i].infoUrl !==''){
            page.riskType7.push(infoAuthList[i].infoUrl)
          }else if(infoAuthList[i].infoName=='个人征信报告' && infoAuthList[i].infoUrl !==''){
            page.riskType5.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='房产证' && infoAuthList[i].infoUrl !==''){
            page.riskType2.push(infoAuthList[i].infoUrl && infoAuthList[i].infoUrl !=='');
          }else if(infoAuthList[i].infoName=='产权调查报告' && infoAuthList[i].infoUrl !==''){
            page.riskType8.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='巢值贷服务合同' && infoAuthList[i].infoUrl !==''){
            page.riskType9.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='工资收入证明' && infoAuthList[i].infoUrl !== ''){
            page.riskType11.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='社保公积金证明' && infoAuthList[i].infoUrl !== ''){
            page.riskType12.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='产权房屋证明' && infoAuthList[i].infoUrl !== ''){
            page.riskType13.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='安翼贷服务合同' && infoAuthList[i].infoUrl !== ''){
            page.riskType14.push(infoAuthList[i].infoUrl);
          }else if (infoAuthList[i].infoName=='车位买卖合同' && infoAuthList[i].infoUrl !== '') {
            page.riskType10.push(infoAuthList[i].infoUrl);
          }else if (infoAuthList[i].infoName=='房屋装修合同' && infoAuthList[i].infoUrl !== '') {
            page.riskType15.push(infoAuthList[i].infoUrl);
          }else if (infoAuthList[i].infoName=='靓巢贷服务合同' && infoAuthList[i].infoUrl !== '') {
            page.riskType16.push(infoAuthList[i].infoUrl);
          }else if (infoAuthList[i].infoName=='展翼贷-001服务合同' && infoAuthList[i].infoUrl !== '') {
            page.riskType17.push(infoAuthList[i].infoUrl);
          }else if(infoAuthList[i].infoName=='易巢贷服务合同' && infoAuthList[i].infoUrl !== ''){
            page.riskType18.push(infoAuthList[i].infoUrl);
          }
        }
      }
      }
  		var borrowUse = data.data.pcProductIntroduceS.borrowUse;
  		if (borrowUse == "乐巢贷") {
  			$('#lechaodai').show();
  		}else if(borrowUse == '易巢贷'){
  			$('#yichaodai').show();
  		}else if (borrowUse == '安翼贷') {
        $('#anyidai').show();
      }else if(borrowUse == '巢值贷'){
        $('#chaozhidai').show();
      }else if(borrowUse == '靓巢贷'){
        $('#liangchaodai').show();
      }else if (borrowUse == '展翼贷001') {
        $('#zhanyidai').show();
      }
  	}
  	function addEvent(data){
  			if (page.riskType1 == '') {
  				$("#item1").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item1').on('click',function(){
		  			$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType1);
	  		  });
  			}
  			if (page.riskType2 == '') {
  				$("#item2").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item2').on('click',function(){
		  			$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType2);
	  		  });
  			}
  			if (page.riskType3 == '') {
  				$("#item3").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item3').on('click',function(){
		  			$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType3);
	  		  });
  			}
  			if (page.riskType4 == '') {
  				$("#item4").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item4').on('click',function(){
		  			$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType4);
	  		  });
  			}
  			if (page.riskType5 == '') {
  				$("#item5").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item5').on('click',function(){
		  			$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType5);
	  		  });
  			}
        if (page.riskType1 == '') {
          $("#yichao_item1").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#yichao_item1').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType1);
          });
        }
        if (page.riskType2 == '') {
          $("#yichao_item2").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#yichao_item2').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType2);
          });
        }
        if (page.riskType3 == '') {
          $("#yichao_item3").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#yichao_item3').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType3);
          });
        }
        if (page.riskType18 == '') {
          $("#yichao_item4").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#yichao_item4').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType18);
          });
        }
        if (page.riskType5 == '') {
          $("#yichao_item5").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#yichao_item5').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType5);
          });
        }
  			if (page.riskType6 == '') {
  				$("#item6").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item6').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType6);
  				});
  			}
  			if (page.riskType7 == '') {
  				$("#item7").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item7').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType7);
  				});
  			}
  			if (page.riskType5 == '') {
  				$("#item8").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item8').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType5);
  				});
  			}
  			if (page.riskType2 == '') {
  				$("#item9").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item9').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType2);
  				});
  			}
  			if (page.riskType8 == '') {
  				$("#item10").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item10').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType2);
  				});
  			}
  			if (page.riskType9 == '') {
  				$("#item11").on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
  			}else{
  				$('#item11').on('click',function(){
  					$('#fuceng').show();
		  			$('#propLunbo').show();
		  			$('#close').show();
		  			page.initLunbo(page.riskType9);
  				});
  			}
        if (page.riskType6 == '') {
          $('#riskLC1').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC1').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType6);
          });
        }
        if (page.riskType7 == '') {
          $('#riskLC2').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC2').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType7);
          });
        }
        if (page.riskType5 == '') {
          $('#riskLC3').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC3').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType5);
          });
        }
        if (page.riskType15 == '') {
          $('#riskLC4').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC4').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType15);
          });
        }
        if (page.riskType11 == '') {
          $('#riskLC5').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC5').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType11);
          });
        }
        if (page.riskType12 == '') {
          $('#riskLC6').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC6').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType12);
          });
        }
        if (page.riskType16 == '') {
          $('#riskLC7').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskLC7').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType16);
          });
        }
        if (page.riskType6 == '') {
          $('#riskAnyi1').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi1').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType6);
          });
        }
        if (page.riskType7 == '') {
          $('#riskAnyi2').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi2').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType7);
          });
        }
        if (page.riskType5 == '') {
          $('#riskAnyi3').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi3').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType5);
          });
        }
        if (page.riskType10 == '') {
          $('#riskAnyi4').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi4').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType10);
          });
        }
        if (page.riskType10 == '') {
          $('#riskAnyi4').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi4').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType10);
          });
        }
        if (page.riskType11 == '') {
          $('#riskAnyi5').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi5').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType11);
          });
        }
        if (page.riskType12 == '') {
          $('#riskAnyi6').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi6').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType12);
          });
        }
        if (page.riskType13 == '') {
          $('#riskAnyi7').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi7').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType13);
          });
        }
        if (page.riskType14 == '') {
          $('#riskAnyi8').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#riskAnyi8').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType14);
          });
        }
        if (page.riskType6 == '') {
          $('#zhanyidai1').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai1').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType6);
          });
        }
        if (page.riskType7 == '') {
          $('#zhanyidai2').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai2').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType7);
          });
        }
        if (page.riskType5 == '') {
          $('#zhanyidai3').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai3').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType5);
          });
        }
        if (page.riskType4 == '') {
          $('#zhanyidai4').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai4').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType4);
          });
        }
        if (page.riskType11 == '') {
          $('#zhanyidai5').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai5').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType11);
          });
        }
        if (page.riskType12 == '') {
          $('#zhanyidai6').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai6').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType12);
          });
        }
        if (page.riskType17 == '') {
          $('#zhanyidai7').on('click',function(){
            $('#tankuangLCT').show();
            $('#fuceng').show();
          });
        }else{
          $('#zhanyidai7').on('click',function(){
            $('#fuceng').show();
            $('#propLunbo').show();
            $('#close').show();
            page.initLunbo(page.riskType17);
          });
        }
          $('#close').on('click',function(){
            $('#propLunbo').hide();
            $('#fuceng').hide();
            $('#close').hide();
          });
          $('#close2').on('click',function(){
            $('#fuceng').hide();
            $('#tankuangLCT').hide();
            $('#tankuangLCT2').hide();
          });
          $('#close3').on('click',function(){
            $('#fuceng').hide();
            $('#tankuangLCT').hide();
            $('#tankuangLCT2').hide();
          });
          $('.tkbut').on('click',function(){
            $('#fuceng').hide();
            $('#tankuangLCT').hide();
            $('#tankuangLCT2').hide();
          });
  		}
      if ($('.swiper-wrapper .swiper-slide img').length !== 0) {
       $("#item3").on('click',function(){
          $('#tankuangLCT2').show();
          $('#fuceng').show();
        });
      }
  };

 //投资分页
  page.pagDesc = function(){
 	  $('.pages').paging({
 		totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      currPage: page.get('currPage'),
      callback:intPage
		 	});
		 	function intPage(pageNo){
		 		page.getDesc(pageNo);
		 	}
  };

 //投资记录渲染模板
 page.getDesc = function(currentPage){
  page.set('currPage',currentPage);
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
    $('.action').mouseover(function(){
      $(this).find('.blueIcon').show();
      $(this).find('.tankuang').show();
    });
    $('.action').mouseout(function(){
      $(this).find('.blueIcon').hide();
      $(this).find('.tankuang').hide();
    });
    }else{
      $('#logCont').css('display','block');
      $('.nolist').css('display','none');
      $('.accountpage').css('display','block');
        return page.getData(
        '/product/purchasehistory',{
          clientType:'PC',
          currentPage:currentPage || 0,
          pageSize:10,
          productId:page.get('productId')
        },[initTemp,getTotalSize,addEvents]);
          function initTemp(data){
            if (data.resultCode ==='0') {
              data = data.data;
              page.initTemplate(data,'log','tempLog');
            }
          };
          function getTotalSize(data){
            if (data.resultCode ==='0') {
              data = data.data;
              page.set('totalCount',data.totalCount)
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
              $('.action').mouseover(function(){
                $(this).find('.blueIcon').show();
                $(this).find('.tankuang').show();
              });
              $('.action').mouseout(function(){
                $(this).find('.blueIcon').hide();
                $(this).find('.tankuang').hide();
              });
              };
        };
    $('#login2').on('click',function(){
          user().loginOperate();
    });

 };


	page.initBuy = function() {
		initTemp();
		addEvents();
    radioEvent();

		function initTemp(data) {
			// if (page.isSuccess(data)) {
			data = {};
			data.productRemainAmount = page.get('productRemainAmount');
			data.usableBalance = page.get('usableBalance');
			data.coupons = page.get('coupons');
			data.staRateDate = page.get('staRateDate');
			data.endDate = page.get('endDate');
			data.annualIncomeText = page.get('annualIncomeText');
      data.useCouponTag = page.get('useCouponTag');
      data.useBirdCoinTag = page.get('useBirdCoinTag');
			postData.productRemainAmount = data.productRemainAmount;
			postData.usableBalance = data.usableBalance;
			postData.annualIncomeText = data.annualIncomeText;
      postData.useBirdCoinTag = data.useCouponTag;
      postData.useBirdCoinTag = data.useBirdCoinTag;
			page.initTemplate(data, 'buy', 'tempBuy');
			page.operateEndMoney(); //判断是否尾款

			// }
		}

		function addEvents() {
			$('#buyClose').on('click', hideBuy);

			// TODO validate input data
			$("#amount[readonly!='readonly']").on('blur', function(event) {
					page.validate($(this));
				//      $('#btnBuy').prop('disabled', !validated);
			});

			$('#isCoin').on('click', function(event) {
				var isCoin = $(this).prop('checked');
				postData.usedCoin = genCoin(isCoin);
			});

			$('#btnBuy').on('click', function(event) {
				if(!page.isEnd){
					page.validate($('#amount'));
				}
				if($('#form').find('.validate-failed').length!=0){
					return false;
				}

        var couponId = $('#coupons').val()=='请选择...'?'0':$('#coupons').val();
        var couponName = $('#coupons').find('option:selected').text().trim();

        var tickitsCode = $('#yuqiAmount').data('code')||'';
        var tickitName = $('#yuqiAmount').data('amount');

				postData.isNoPwdTZ=page.get('isNoPwdTZ');
				postData.usedCoupon = couponId;
				postData.usedCouponText = couponName;

          if($('#code').hasClass('pitch')) {
            postData.presentCode = tickitsCode;
            postData.usedCouponText = tickitName;
            postData.usedCoupon = '';
          } else {
            postData.usedCoupon = couponId;
            postData.presentCode = '';
            postData.usedCouponText = couponName;
          }

				page.post('./confirm', postData);
				// }
			});

			function hideBuy() {
				var cover = $('.common-cover'),
					dialog = $('#buy');

				cover.removeClass('show');
				dialog.removeClass('show');
			};
			//计算鸟币    杨静改动
			function genCoin(isCoin) {
				var coinRest = +page.get('coin'),
					money = +$('#amount').val() || 0,
					coinCould = parseInt(money / 6 * 100) / 100,
					lblCoin = $('[for=isCoin]'),
					coin = Math.min(coinRest, coinCould);

				if (!isCoin) {
					coin = 0;
				}

				lblCoin.text(coin + '鸟币抵扣' + Util.padFloatMoney(coin) + '元');
				$('#actual').text(Util.padFloatMoney(money - coin) + '元');
				page.set('buyAmount', money);

				return coin;
			};
	  }

    //选择券，兑换码
    function radioEvent() {
      $('.radio').on('click',function() {
        var boolan = $(this).parent().attr('class');
        // 选框初始化//////
        $('#coupons').find('option:first').attr('selected',true).siblings().attr('selected',false);
        $('#presentCode').val('');
        $('#code').attr('class','code');
        $('#yuqiAmount').html('');
        /////////////
        if (boolan == 'tickits') {
          $('#coupons').addClass('pitch');
          $('#code').removeClass('pitch');
        } else {
          $('#code').addClass('pitch');
          $('#coupons').removeClass('pitch');
          $('#code #presentCode').on('blur',function() {
            page.getCode();
          })
        }
      })
    }
  };
//处理剩余金额小于起投金额
	page.operateEndMoney = function() {
		page.isEnd=true;
		postData.usedCoin=0;
		var _this = $('#amount');
		var vdRow = _this.parent().parent();
		var vdTip = vdRow.find('.validation');
		var startMoney = parseFloat(page.get('staInvestAmount')); //获取起投金额
		var endMoney = parseFloat(page.get('productRemainAmount')); //获取剩余金额
		//如果剩余金额小于起投金额
    var singleLimitAmount = parseFloat(page.get('singleLimitAmount'));//获取单笔投资限额
		if (endMoney <= startMoney) {
			_this.attr('readonly', 'readonly'); //设置为只读
			_this.val(endMoney); //默认显示剩余金额
			vdRow.addClass('validate-success').removeClass('validate-failed');
			vdTip.html('最后一笔投资只能为剩余金额');
			$('#actual').html(endMoney + '元');
			postData.buyAmount=endMoney;
		}
	},
//处理金额验证
page.validate = function(_this) {
	var money = +_this.val(),
		$row = _this.parents('.row').eq(0),
		start = +page.get('staInvestAmount'),
		userRest = +page.get('usableBalance'),
		prodRest = +page.get('productRemainAmount'),
    danbirest = +page.get('singleLimitAmount'),
		validated = false;
    // 金额不正确
	if (isNaN(money)) {
		$row
			.removeClass('validate-success')
			.addClass('validate-failed');
		$('#amount-validate').text('请输入正确金额');
	// 余额不够
  } else if (money > userRest) {
		$row
			.removeClass('validate-success')
			.addClass('validate-failed');
		$('#amount-validate').text('个人账户余额不足，请').append(
			$('<a>').attr({
				href: '/html/account/bank',
				target: '_blank'
			}).addClass('link').text('充值'));

			$('.link').on('click',function(){
				window.location.reload();
			});
  // 起投不够
	} else if (money < start) {
		$row
			.removeClass('validate-success')
			.addClass('validate-failed');
		$('#amount-validate').text('最低投资金额为' + Util.padFloatMoney(start) + '元');
	// 起投太多
  } else if (money > prodRest) {
		$row
			.removeClass('validate-success')
			.addClass('validate-failed');
		$('#amount-validate').text('产品剩余可投金额不足');
	// 有单笔限额
  } else if(danbirest > 0 && money > danbirest){
    $row.removeClass('validate-success').addClass('validate-failed');
    $('#amount-validate').text('输入的金额超过了单笔投资上限');
  }else{
    mutilRealAmount(money);
    var profit = roundNum(mutilPreProfit(money,page.get('annualIncome'),page.get('convertDay')),2);
    page.set('profit',profit);
    var opeitonEd = $('#coupons').find('option:selected').data();
    if( opeitonEd){
      profit = moreProfit(profit,opeitonEd);
    }
    $('.preprofit').text(profit);
  }
  function roundNum(number,fDigits){
      with(Math){
          return round(number*pow(10,fDigits))/pow(10,fDigits);
      }
    }
  function mutilRealAmount(money){
    var coin = genCoin($('#isCoin').prop('checked'));
    $row.removeClass('validate-failed').addClass('validate-success');
    $('#amount-validate').text('');
    $('#actual').text(Util.padFloatMoney(money - coin) + '元');
    page.set('buyAmount', money);

    postData.buyAmount = parseFloat(money);
    postData.usedCoin = coin;
    validated = true;
    genCoin(coin);
    initCoupons();
  }
	//获取理财金券
	function initCoupons() {
			var amount = +$('#amount').val() || 0,
				coupons = filterCoupons(amount),
				$coupons = $('#coupons'),
				$options = [$('<option>').text('请选择...')];

			var idx = 0,
				len = coupons.length,
				item;
			for (; idx < len; idx++) {
				item = coupons[idx];
				if (item.limit <= amount) {
					$options.push($('<option data-type='+item.type+' data-amount='+item.amount+'>')
						.attr('value',item.id)
						.text(item.name));
					$coupons.empty().append($options);
				}
			}
			/* 赵然
				2016.5.17
				无金券是显示暂无可用券
			*/
				if (len == 0 ) {
					$options.shift();
					$options.push($('<option>')
						.attr('value','')
						.text('暂无可用券...'));

					$coupons.empty().append($options);
				}
        // $coupons.unbind('change').bind('change',function(){
        //   var opeitonEd = $('#coupons').find('option:selected').data();
        //   if( opeitonEd){
        //     profit = moreProfit(page.get('profit'),opeitonEd);
        //   }
        //   $('.preprofit').text(profit);
        // })
        $coupons.unbind('change').bind('change',function(){
          var opeitonEd = $('#coupons').find('option:selected').data();
          var yuqiHtml = $('#coupons').find('option:selected').html();
          if(isEmptyObject(opeitonEd)){
              $('#yuqiAmount').html('');
          }else{
              $('#yuqiAmount').html('+'+yuqiHtml);
          }
        })
		}
	//计算鸟币
	function genCoin(isCoin) {
			var coinRest = +page.get('coin'),
				money = +$('#amount').val() || 0,
				coinCould = parseInt(money / 6 * 100) / 100,
				lblCoin = $('[for=isCoin]'),
				coin = Math.min(coinRest, coinCould);

			if (!isCoin) {
				coin = 0;
			}

			lblCoin.text(coin + '鸟币抵扣' + Util.padFloatMoney(coin) + '元');
			$('#actual').text(Util.padFloatMoney(money - coin) + '元');
			page.set('buyAmount', money);

			return coin;
		}
		//过滤理财金券
	function filterCoupons(money) {
		var coupons = [];
		var quan = page.get('coupons');
		var e;
		for (var i = 0; i < quan.length; i++) {
			e = quan[i];
			//过滤大于等于用户输入金额的金券
			if (money >= e.limit) {
				coupons.push(e);
			}
		}
		return coupons;
	}
}

//兑换券码
  page.getCode = function() {
    var presentCode = $('#presentCode').val();
    return page.getData(
      '/pc/account/fxq/couponInfo/get',
      {presentCode: presentCode}, [initTemp]);
    function initTemp(data) {
      if (data.resultCode === '0') {
        var data = data.data;
        $('#yuqiAmount').attr('data-code',presentCode);
        $('#yuqiAmount').attr('data-amount',data.coupon.couponName);
        // $('#code .couponName').html(data.coupon.couponName);
        $('#yuqiAmount').html('+'+data.coupon.couponName);
        $('#code').addClass('vaid-success').removeClass('valid-fail');
      } else {
        $('#code').addClass('valid-fail').removeClass('vaid-success');
        $('#code .valid .validTips').html(data.resultMessage);
      }
    }
  }

page.init = function() {
	page.setTitle('乐巢投');
	page.set('productId', Url.getHashParts(0));
	page.initCrumb();
	page.when(page.initProp, [page.getLCT]);
	page.getDesc();
}

page.init();
});
