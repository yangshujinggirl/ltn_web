$(function () {

  var page = new Page();

  var postData = {};
  page.moneyRegex=/^[0-9]{1}[\d]*\.?[\d]{0,2}$/;
  page.initUser = function() {
    return page.getData(
      '/user/userIsBuyProduct',
      {},
      [setData]);

    function setData(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('isCanBuySXT', data.isCanBuySXT === 1);
      }
    }
  }

  page.initCrumb = function() {
    return page.getData(
      '/message/getScrollMessage',
      {clientType: 'PC'},
      [initTemp, initNotic]);

    /**
     * init crumb template
     */
    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.initTemplate(data, 'crumb', 'tempCrumb');
      }
    }

    function initNotic() {
      // init notice marquee
      $('#marquee').marquee({yScroll: 'bottom'});
    }
  };

  // request prop data
  page.initProp = function(cb) {

    return page.getData(
      '/product/sxtDetail',
      {clientType: 'PC'},
      [setData, initTemp, initChart, addEvents]);

    function setData(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('productId', data.productId);
        page.set('productRemainAmount', data.productRemainAmount);

        postData.annualIncomeText = parseFloat(data.annualIncomeText);
      }
    }

    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;

        page.initTemplate(data, 'prop', 'tempProp');
      }
    }

    function initChart(data) {
      if (page.isSuccess(data)) {
        data = data.data;
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
            },{
              value: 100 - data.progress,
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

    function addEvents() {
      $('#invest').on('click', investOperation);

      //立即投资处理方法
      function investOperation() {
        user().loginOperate(nameAuthOperate2()); //登录实名处理
      };

      //实名处理方法
      function nameAuthOperate2() {
        return function() {
          user().nameAuthOperate(showBuy);
        }
      };

      function showBuy() {
      	page.when(page.initUser,[page.initBuy,operatePopup]);
      }
      //处理打开弹窗事件
      function operatePopup(){
       	var isCan = page.get('isCanBuySXT');
        if (isCan) {
          var cover = $('.common-cover'),
            dialog = $('#buy');

          cover.addClass('show');
          dialog.addClass('show');
        } else {
          $('#invest').attr("disabled", "disabled").addClass('disabled').html('您不符合购买条件');
        }
       }
    }
  };

  // request desc data
  page.initLog = function () {

    return page.getData(
      '/product/currentPurchasehistory',
      {
        productId: page.get('productId'),
        currentPage: page.get('pageNo') || 0
      },
      [initTemp, initPage, addEvents]);

    function initTemp(data) {
      if (page.isSuccess(data)) {
        data = data.data;

        page.initTemplate(data, 'log', 'tempLog');
      }
      if (!user().isLogin()) {
        $('#logCont').css('display','none');
        $('.nolist').css('display','block');
        $('.accountpage').css('display','none');
        }else{
          $('#logCont').css('display','block');
          $('.nolist').css('display','none');
          $('.accountpage').css('display','block');
        };
        $('#login2').on('click',function(){
           user().loginOperate();
        });
    }

    function initPage(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        $('.log .pages').paging({
          totalSize: data.totalCount,
          turnSize: 10,
          currPage: page.get('currPage'),
          callback: refreshLog
        });
      }
    }

    function refreshLog(pageNo) {
      page.set('currPage', pageNo);
      page.getData(
        '/product/currentPurchasehistory',
        {
          productId: page.get('productId'),
          currentPage: pageNo
        },
        [initTemp, initPage]);
    }

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
    }
  };

  page.initBuy = function () {

    return page.getData(
      '/user/totalAccount',
      {},
      [initTemp, addEvents]);

    function initTemp (data) {
      if (page.isSuccess(data)) {
        data = data.data;
        data.productRemainAmount = page.get('productRemainAmount');
        data.buyTime =  dateUtil().formatDate('yyyy-MM-dd');
        page.initTemplate(data, 'buy', 'tempBuy');

        // Available amount of user's account
        page.set('usableBalance', data.usableBalance);

        postData.productRemainAmount = data.productRemainAmount;
        postData.usableBalance = data.usableBalance;
      }
    }

    function addEvents () {
      var isVal = false ;
      $('#buyClose').on('click', hideBuy);

      // TODO validate input data
      $('#amount').on('blur', function(event) {
        var money = $(this).val(),
          $row = $(this).parents('.row').eq(0),
          userRest = +page.get('usableBalance'),
          prodRest = +page.get('productRemainAmount') ;
          isVal = false;
        if (money === '') {
          $row
            .removeClass('validate-success validate-failed')
            isVal = false;
        } else if (isNaN(money)) {
          $row
            .removeClass('validate-success')
            .addClass('validate-failed');
          $('#amount-validate').text('请输入正确金额');
          isVal = false;
        } else if (!(page.moneyRegex.test(money))) {
          $row
            .removeClass('validate-success')
            .addClass('validate-failed');
          $('#amount-validate').text('输入金额只能2位小数');
          isVal = false;
        }else if (+money > userRest) {
          $row
            .removeClass('validate-success')
            .addClass('validate-failed');
          $('#amount-validate').text('个人账户余额不足，请').append(
            $('<a>')
            .attr({href:'/html/account/bank', target:'_blank'})
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

        }else {
          $row
            .removeClass('validate-failed')
            .addClass('validate-success');
          $('#amount-validate').text('');
          $('#actual').text(Util.padFloatMoney(money || 0) + '元');
          page.set('buyAmount', money);
          postData.buyAmount = parseFloat(money);
          postData.buyTime =  dateUtil().formatDate('yyyy-MM-dd');
          postData.buyTime =  
          isVal = true;
        }

        // $('#btnBuy').prop('disabled', !isVal);
      });

      $('#btnBuy').on('click', function(event) {
        validate();
        if(isVal){
          page.post('./confirm', postData);
        }else{
          return false ;
        }
      });

      function hideBuy() {
        var cover = $('.common-cover'),
          dialog = $('#buy');

        cover.removeClass('show');
        dialog.removeClass('show');
      }

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
     }

    }
  };

  page.init = function() {
    page.setTitle('随心投');
    page.initCrumb();
    page.when(
      page.initProp,
      [page.initLog]);
  }

  page.init();
});