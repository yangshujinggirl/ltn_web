/**
 * 众筹详情页面js
 *
 * TODO:  输入金额的正确判断：  大于等于 项目余额和起投金额的最小   小于  项目余额和单笔最高中的最小值
 */
;
(function() {
  var jsonObj = locationSearchJson(location.search),
    productId = jsonObj.productId,
    baseUrl = '/productZc/productZcDetail';

  var userObj = new user();

  var page = new Page();
  page.amount = 0;
  page.getData(baseUrl, {
    productId: productId
  }, function(data) {
    var resData = data.data;
    page.prodetail = resData;
    page.maxAmout = resData.productTotalAmount - resData.productSoldedAmount;
    // if(resData.singleLimitAmount>page.residue){
    //   page.maxAmout = page.residue;
    // }else{
    //   page.maxAmout = resData.singleLimitAmount;
    // }
    if(resData.staInvestAmount>page.maxAmout){
      page.minAmount = page.maxAmout;
    }else{
      page.minAmount = resData.staInvestAmount;
    }
    if(resData.productType == 'A'){
      page.initTemplate(resData, 'prodetaiSumWrap', 'TemplateAProdetailSum');
      page.initTemplate(resData.stepList, 'setpList', 'TemplateSetpList');
      page.initTemplate(resData, 'propTabxiangqiang', 'TemplatePropA');
    }else{
      page.initTemplate(resData, 'prodetaiSumWrap', 'TemplateProdetailSum');
      page.initTemplate(resData,'propTabxiangqiang','TemplatePropB');
    }
    clickBuy();
    buyBtnIsAbled(resData);
    proTabEvent(); // 点击事件触发
    initProgressBar(resData);
    showDifAB(resData);

  });

  function showDifAB(prodetail){
    var type = prodetail.productType;
    if(type === 'A'){
      $('.tab_content').find('.left-content').addClass('tab_left');
      $('.tab_content').find('.right-content').removeClass('disabled');
      $('.risk').find('.risk_item').removeClass('item1').addClass('item2');
      $('#imgPice').attr('src','/img/imageTwo/mutual/details_img3.png');
    }
  }

  function clickBuy(){
    $('.JS-buy-btn').bind('click',function(){
      if($(this).hasClass('disabled')){
        return false;
      }else{
        page.amount = $(this).attr('data-amount') || 0;
        page.stepId = $(this).attr('data-stepId') || 0;
        // 已经登录
        if(userObj.isLogin()){
          getUserInfo(function(userInfo,prodetail){
            var resData = {
              userInfo:userInfo,
              prodetail:prodetail,
              page:page
            };
            page.userInfo = userInfo;
            if (page.prodetail.productType == 'A') {
              page.initTemplate(resData,'BuyDialog','TemplateBuyDialogA');
            }else{
              page.initTemplate(resData,'BuyDialog','TemplateBuyDialog');
            }
            showBuyDialog(function(){
              closeX();
              buyInputText();
              tabRadio();
              sureBtn();
              btnBuy();
              selectClickEvnet();
              slectDuihuanquan();
            });
          });
        }else{
          userObj.loginOperate();
        }
      }
    })
  }

  function btnBuy(){
    $('#btnBuy').bind('click',function(){
      if(!page.amount || page.amount==0){
        var $input = $('.product-buy').find('.input-amount');
        validate($input);
      }else{
        var orderForm = {
          birdCoin:page.birdCoin,
          orderAmount:page.amount,
          productId:page.prodetail.productId,
          userCouponId:page.userCouponId||0,
          couponName:page.couponName,
          productName:page.prodetail.productName,
          productType:page.prodetail.productType,
          presentCode:page.presentCode
        }
        if(page.prodetail.productType === 'A'){
          orderForm.stepId = page.stepId;
        }
        sessionStorage.removeItem('orderForm');
        var decodeOrderForm = encodeURIComponent(JSON.stringify(orderForm));
        sessionStorage.setItem('orderForm',decodeOrderForm);
        if (page.prodetail.productType== 'A') {
          window.location.href='/html/crowd/detail/confirm/';
        }else{
          window.location.href='/html/crowd/detail/confirmb/';
        }
      }

    });
  }

  function buyInputText(){
    var $input = $('.product-buy').find('.input-amount');
    $input.unbind('blur');
    if(typeof page.amount == 'undefined' || page.amount==0){
      $input.removeAttr('readonly');
      $input.bind('blur',function(){
        page.amount = $(this).val();
        $('label[for="isCoin"]').text('0鸟币抵扣0.00元');
        if(validate($input)){
          updateBuyDialogData();
        }else{
          $('#actual').text('0.00元');
        }
      })
    }else{
      $input.attr('readonly','true');
      $input.val(page.amount);
      if(validate($input)){
        updateBuyDialogData();
      }

    }
  }
  // 兑换 券
  function sureBtn(presentCode){
    $('#sureBtn').bind('click',function(){
      var presentCode = $('#presentCode').val();
      page.getData('/pc/account/fxq/couponInfo/get',{
        presentCode:presentCode
      },function(data){
        $('#code').removeClass('valid-fail');
        if(data.resultCode != "0"){
          $('#code').addClass('valid-fail');
          $('#code').find('.valid').show()
          $('#code').find('.validTips').text(data.resultMessage);
          page.userCouponId = 0;
        }else{
          $('#presentCode').val(data.data.coupon.couponName);
          page.userCouponId = data.data.coupon.userCouponId;
          page.couponName = data.data.coupon.couponName;
        }
      })
    });
  }

  function tabRadio(){
    $('#tickits,#convertTickits').bind('click',function(){
      if($(this).hasClass('selected')){
        return false;
      }else{
        $('#tickits,#convertTickits').removeClass('selected');
        $(this).hasClass('selected');
        if($(this).attr('id') == 'tickits'){
          $('#coupons').show();
          $('#code').hide();
        }else{
          $('#coupons').hide();
          $('#code').show();
        }
      }
    })
  }
  //
  function selectClickEvnet(){
    $('#coupons').change(function(){
      page.userCouponId = $(this).val();
      page.couponName = $(this).find(':selected').text();
    });
  }
  function slectDuihuanquan(){
    $('#presentCode').change(function(){
      page.presentCode = $(this).val();
    })
  }

  function validate($input){
    if(!page.amount || page.amount<page.minAmount){
      $input.parents('.row').addClass('validate-failed');
      $('#amount-validate').show().text('不能小于起投金额');
      page.amount = 0;
      return false;
    }else if(!page.amount || page.amount>page.maxAmout){
      $input.parents('.row').addClass('validate-failed');
      $('#amount-validate').show().text('投资金额不能大于剩余金额');
      page.amount = 0;
      return false;
    }else if(page.amount>page.userInfo.usableBalance){
      $input.parents('.row').addClass('validate-failed');
      $('#amount-validate').show().html('个人账户余额不足，请<a href="/html/account/bank/" >充值</a>');
      page.amount = 0;
      return false;
    }else{
      $input.parents('.row').removeClass('validate-failed');
      $('#amount-validate').hide();
      return true;
    }
  }
  // 更新购买弹出层数据
  function updateBuyDialogData(){
    page.getData('/orderZc/orderZcPrepare',{
      orderAmount:page.amount,
      productId:page.prodetail.productId,
      stepId:page.stepId
    },function(data){
      // 更新列表
      var resData = data.data;
      page.birdCoin = resData.birdCoin;
      if(page.prodetail.useCouponTag == '1'){
        page.initTemplate(resData.coupons,'coupons','TemplateCouponsList');
        $('label[for="isCoin"]').text(resData.birdCoin+'鸟币抵扣'+resData.birdCoin+'元');
      }
      if (page.prodetail.useBridcoinTag == '1') {
        $('label[for="isCoin"]').text(resData.birdCoin+'鸟币抵扣'+resData.birdCoin+'元');
      }
      $('#actual').text((page.amount-page.birdCoin)+'元');
      var $isCoin = $('#isCoin');
      $isCoin.unbind('click');
      $isCoin.bind('click',function(){
        countPayMoney();
      });
    })
  }
    //计算应付金额
  function countPayMoney () {
    var isChecked = $('#isCoin').is(':checked');
    if(isChecked){
      $('#actual').html((page.amount-page.birdCoin) + '元');
    }else{
       $('#actual').html(page.amount + '元');
    }
  }
  function buildcoupons(coupons){
    var html ='';
    $.each(coupons,function(obj,index){
      html+='<option><>'
    });
  }

  function getUserInfo(callback){
    page.getData('/user/userInfo',{},function(data){
      if(page.isSuccess(data)){
        if(typeof callback == 'function'){
          callback.call(this,data.data,page.prodetail);
        }
      }else{
        alert('登录超时，请重新登录');
        userObj.loginOperate();
      }

    })
  }

  function getPreOrderData(){
    page.getData('/orderZc/orderZcPrepare',{
      productId:productId,

    },function(data){

    })
  }

  // 初始化 进度条
  function initProgressBar(prodetail){
    var productSoldedAmount = prodetail.productSoldedAmount;
    var productTotalAmount = prodetail.productTotalAmount;
    var percent = productSoldedAmount/productTotalAmount*100;
    var percentsStr = percent+'%';
    $('.bar').find('.completed').css({
      width:percentsStr
    })
  }

  // 显示购买弹出层
  function showBuyDialog(callback){
    $('.common-cover').show();
    $('.product-buy').show();
    if(typeof callback == 'function'){
      callback.call();
    }
  }

  function closeBuyDialog(){
    $('.common-cover').hide();
    $('.product-buy').hide();
  }

  function closeX(){
    $('#buyClose').unbind('click');
    $('#buyClose').bind('click',function(){
      closeBuyDialog();
    })
  }

  // 状态1 可以投标，未满可以投标，未结束可以投标
  function buyBtnIsAbled(prodetail){
    if(prodetail.productType === 'A' && proIsTBZ(prodetail)){
      if(!$('.JS-buy-btn').hasClass('disabled')){
        $('.JS-buy-btn').removeClass('disabled');
      }
    }else if(proIsTBZ(prodetail) && proIsNotFull(prodetail)){
      $('.JS-buy-btn').removeClass('disabled');
    }else{
      $('.JS-buy-btn').addClass('disabled');
    }
  }
  // 产品的状态是否在投标中
  function proIsTBZ(prodetail){
    return prodetail.productStatus === '1';// 投标中
  }
  // 产品是否已经开始，并且未结束
  function proIsInTime(prodetail){
    var date = new Date();
    var dateStr = date.Format('yyyy-MM-dd hh:mm:ss');
    return (dateStr>=prodetail.beginTime && dateStr<=prodetail.endTime);
  }
  // 产品是否满标
  function proIsNotFull(prodetail){
    return  prodetail.productSoldedAmount<prodetail.productTotalAmount
  }

  // 工具方法
  function locationSearchJson(search) {
    var search = search.substring(1),
      jsonObj = null;
    if (search.length) {
      jsonObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    }
    return jsonObj;
  }
  // 产品具体详情tab 事件添加
  function proTabEvent() {
    $('.details_tab .tab_title li').bind('click', function() {
      if ($(this).hasClass('selected')) {
        return false;
      } else {
        $(this).addClass('selected').siblings('li').removeClass('selected');
        var contentWrapClass = $(this).attr('data-contentClass');
        showHideContent($('.' + contentWrapClass));
      }
    })
    $('.details_tab .tab_title li').eq(0).trigger('click');
  }
  // 显示隐藏内容区域
  function showHideContent($content) {
    if ($content.hasClass('record-list')) {
      getProRecord(page.prodetail.productId, 0,function(){
        $content.show().siblings('li').hide();
      }); // 初始化记录模版
    } else {
      // $content.html(page.prodetail[$content.attr('data-popname')]);
      $content.show().siblings('li').hide();
    }

  }
  // 渲染 产品支持记录模版
  function getProRecord(productId, currentPage,callback) {
    page.getData('/orderZc/searchOrderZc', {
      productId: productId,
      currentPage: currentPage || 0,
      pageSize:10
    }, function(data) {
      var resData = data.data.orderZcList;
      page.initTemplate(resData, 'proRecordList', 'TemplateProRecordList');
      // 初始化 分页插件
      if(!page.initPagination){
        initPagination(page,data.data.totalCount,10);
      }
      if(callback) callback.call();
    })
  }
  // 初始化分页
  function initPagination(page,items,itemsOnPage){
    $('#light-pagination').pagination({
      items: items||0,
      itemsOnPage: itemsOnPage||10,
      prevText:'<<',
      nextText:'>>',
      cssStyle: 'light-theme',
      onInit:function(){
        page.initPagination = true;
      },
      onPageClick:function(pageNumber,event){
        getProRecord(page.prodetail.productId,pageNumber-1)
      }
    });
  }


  // 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt){ //author: meizz
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

})();
