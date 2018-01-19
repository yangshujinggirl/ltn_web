$(function() {

	var page = new Page();

	// 获取理财列表
	page.initList = function(type) {

		return page.getData(
			'/product/pcProductSearch',
			getParam(), [initTemp, setStatus,addEvents]);

		function initTemp(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				page.initTemplate(data, 'list', 'tempList');
			}
		}

		function setStatus(data) {
			if (page.isSuccess(data)) {
				data = data.data;
				var stat = page.get('status');
				stat.total = data.totalCount;
			}

		//判断是否没有数据；如果没有数据就跳转默认页
			// if ($('.prolistnone').length) {
			// 	setTimeout(function() {
			// 		location.href = '/html/product/#!/short/0/0/1';
			// 	}, 3000);
			// }
		}
		function addEvents(data) {
			var stat = page.get('status');
			$('.item.prodList').on('click', function(event) {
				var type = $(this).attr('data-type');//获取跳转类型
				var tag = $(this).attr('data-tag');//获取tag，为了解决信用宝，消费分期在LCT下面，跳转不了LCTXL页面的问题
				if(type=='LCT'){
					if(tag=='信用宝'||tag=='消费分期'||tag.indexOf('供应链') !== -1) {
						type = 'long';
					} else {
						type='short';
					}

				}else if(type=="LCTXL"){
					type='long';
				}else if(type=="XSB"){
					type='first';
				}
				page.jump(type, $(this).data('id'));
			});
		}

		function getParam() {
			var stat = page.get('status'),
				param = {
					clientType: 'PC'
				},
				prod = getProd(stat) || 'ZXBD',//默认为最新标的
				period = getPeriod(stat) || ['0', '0'],
				unit = getPeriodUnit(stat) || 'D',
				status = getStatus(stat) || '0',
				pageSize = page.get('pageSize') || 3;
				currPage = getPage(stat) || 1;
				stat.pageSize = pageSize;
				stat.currPage = currPage;

				param.currentPage = currPage - 1;
				param.pageSize = pageSize;
				param.productType = prod;
				param.productStatus = status;
				param.productDeadlineStart = period[0];
				param.productDeadlineEnd = period[1];
				param.deadlineUnitStart = unit;
				param.deadlineUnitEnd = unit;

			return param;

			function getPage(stat) {
				return stat.currPage;
			}
			function getProd(stat) {
				switch (stat.prodSel) {
					case 'zuixin':
						return 'ZXBD';
					case 'xinshou':
						return 'XSB';
					case 'short':
						return 'LCT';
					case 'long':
						return 'LCTXL';
				}
			}

			function getPeriod(stat) {
				if(stat.prodSel=='zuixin'){
					return '';
				}else{
					return stat.period[stat.periodSel].value.split('|');
				}

			}

			function getPeriodUnit(stat) {
				if(stat.prodSel=='zuixin'){
					return '';
				}else{
					return stat.period[stat.periodSel].unit;
				}

			}

			function getStatus(stat) {
				if(stat.prodSel=='zuixin'){
					return '1';
				}else{
					return stat.status[stat.statusSel].value;
				}


			}
		}
	};

	page.initFilter = function() {

		var $tabs = $('#prod-tab'),
			$period = $('#prod-period').find('.item'),
			$status = $('#prod-status').find('.item');

		var periodOpts,
			prodOpts = ['zuixin', 'xinshou', 'short', 'long'],
			statusOpts = [{
				label: '全部',
				value: '0'
			}, {
				label: '可投资',
				value: '1'
			}, {
				label: '已结束',
				value: '2'
			}, {
				label: '已还款',
				value: '4'
			}];

		initTemp();
		addEvents();

		function initTemp() {
			var data = getStatus();
			page.initTemplate(data, 'filter', 'tempFilter');
			if(data.prodSel=='zuixin'){
				$('#wrap-filter').hide();
			}
			page.set('status', data);
		}

		function getStatus() {
			var hash = Url.getHashParts(),
				prod = hash[0] || 'zuixin',
				period = hash[1] || 0,
				status = hash[2] || 0,
				currPage = hash[3] || 1;

			switch (prod) {
				case 'long':
					periodOpts = [{
						label: '全部',
						value: '0|0',
						unit: 'M'
					}, {
						label: '1个月',
						value: '0|1',
						unit: 'M'
					}, {
						label: '3个月',
						value: '1|3',
						unit: 'M'
					}, {
						label: '6个月',
						value: '3|6',
						unit: 'M'
					}, {
						label: '12个月',
						value: '6|12',
						unit: 'M'
					}];
					break;
				case 'short':
				case 'zuixin':
				case 'xinshou':
					periodOpts = [{
						label: '全部',
						value: '0|0',
						unit: 'D'
					}, {
						label: '5天',
						value: '0|5',
						unit: 'D'
					}, {
						label: '15天',
						value: '5|15',
						unit: 'D'
					}, {
						label: '30天',
						value: '15|30',
						unit: 'D'
					}, {
						label: '45天',
						value: '30|45',
						unit: 'D'
					}];
					break;
				default:
					break;

			}
			return {
				prod: prodOpts,
				prodSel: prod,
				period: periodOpts,
				periodSel: period,
				status: statusOpts,
				statusSel: status,
				currPage: currPage
			};

		}

		function initStatus() {
			var stat = getStatus();

			var $tabs = $('#prod-tab'),
				$period = $('#prod-period').find('.item'),
				$status = $('#prod-status').find('.item');


			$tabs.removeClass(stat.prod.join(" "));
			$tabs.addClass(stat.prodSel);
			if(stat.prodSel=='zuixin'){
				$('#wrap-filter').hide();//过滤隐藏
			}else{
				$('#wrap-filter').show();//过滤隐藏
				$period.each(function(index) {
				$(this).text(stat.period[index].label);
				$(this).removeClass('selected');
				})
				$period.eq(stat.periodSel).addClass('selected');
				$status.removeClass('selected');
				$status.eq(stat.statusSel).addClass('selected');
			}
			page.set('status', stat);
			page.refresh();
		}

		function setStatus(key, val) {
			var stat = getStatus();
			stat[key] = val;
			//最新标的
			if(val=='zuixin'){
				Url.setHash([
					stat.prodSel,0,0,1
				]);
			}else{
				Url.setHash([
					stat.prodSel, stat.periodSel, stat.statusSel, 1
				]);
			}
		}

		function addEvents() {
			var $tabs = $('#prod-tab'),
				$period = $('#prod-period').find('.item'),
				$status = $('#prod-status').find('.item');

			$(window).on('hashchange', function() {
				initStatus();
			});
			$tabs.on('click', function(event) {

				setStatus('prodSel', $(event.target).data('prod'));
			});
			$period.on('click', function(event) {
				setStatus('periodSel', $(event.target).data('period'));
			});
			$status.on('click', function(event) {
				setStatus('statusSel', $(event.target).data('status'));
			});
		}
		/*
		 * author: toni
		 * time: 20160519
		 * 添加如果全部售完,跳转对应页面的事件
		 */
		// page.addNoinfoEvent = function() {

		// 	//获取中短期标是否已经全部售罄@author  wangwenjie;
		// 	var timeshort = $('#filter .short').parent().parent().siblings('#list').find('.available');
		// 	console.log(timeshort.length);
		// 	if (timeshort.length == 0) {
		// 		setStatus('prodSel', 'long');
		// 	}
		// }
	};

	page.initPaging = function() {

		initTemp();
		addEvents();

		function initTemp() {
			var stat = page.get('status'),
				total = +stat.total,
				pageSize = +stat.pageSize,
				currPage = +stat.currPage,
				maxTurnPage = 5,
				pageCnt = Math.ceil(total / pageSize),
				currTurn = Math.ceil(currPage / maxTurnPage),
				maxPage = Math.min(pageCnt, currTurn * maxTurnPage);

			var index = 0,
				start = (currTurn - 1) * maxTurnPage + 1,
				data = {
					pages: []
				};

			for (; start + index <= maxPage; index++) {
				data.pages[index] = start + index;
			}
			data.currPage = currPage;

			page.initTemplate(data, 'paging', 'tempPaging');
		}

		function addEvents() {
			var
				stat = page.get('status'),
				total = +stat.total,
				pageSize = +stat.pageSize,
				currPage = +stat.currPage,
				maxTurnPage = 5,
				pageCnt = Math.ceil(total / pageSize),
				currTurn = Math.ceil(currPage / maxTurnPage),
				maxPage = Math.min(pageCnt, currTurn * maxTurnPage);

			var
				paging = $('.product-page'),
				item = paging.find('.page'),
				prev = paging.find('.prev'),
				next = paging.find('.next');

			prev.on('click', function() {
				stat.currPage = Math.max(1, currPage - 5);
				page.refresh();
			});
			next.on('click', function() {
				stat.currPage = Math.min(pageCnt, currPage + 5);
				page.refresh();
			});
			item.on('click', function() {
				stat.currPage = $(this).text();
				page.refresh();
			});
			$('.action').mouseover(function(){
				$(this).find('.iconjieshu').hide();
			  $(this).find('.blueIcon').show();
			  $(this).find('.tankuang').show();
		  });
		  $('.action').mouseout(function(){
			  $(this).find('.iconjieshu').show();
			  $(this).find('.blueIcon').hide();
			  $(this).find('.tankuang').hide();
		  });
		}
	}

	page.updateHash = function() {
		var stat = page.get('status');
		Url.setHash([
			stat.prodSel, stat.periodSel, stat.statusSel, stat.currPage
		]);
	}

	page.refresh = function() {
		page.when(page.initList, [page.initPaging, page.updateHash]);
	}
	page.init = function() {
		page.initFilter();
		page.refresh();
		// setTimeout(page.addNoinfoEvent, 1000);
	};

	page.init();

	if(window.location.pathname == '/finance/list/0/1/0/0'){
    $('.commonNavTwo,.commonNav').find('.right a').eq(1).addClass('select')
  }
});
