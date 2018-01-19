$(function () {
  var page = new Page();
      page.noticeList={};
  //添加Type sessionkey
  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;
  var userStatus = session().get('userStatus');//企业状态
  var userType = session().get('userType');//用户类型

  //实甸弹框是否显示
  page.isMoodalShow = function() {
    if(!user().isNameAuth()) {
      $(".common-cover,.viewall-modal-content").show();
    }

    page.modalEvent();
  }
  //弹框点击事件
  page.modalEvent =function() {
    $('#modal-cancel').on("click",function() {
      $(".common-cover,.viewall-modal-content").hide();
      // user().setCookie('isOpen',false,365)
    })
    $("#go-realname").on("click",function() {
      window.location.href = "/html/user/realname";
    })
  }
  //企业用户不显示banner
  page.companyShow = function() {
    if(user().getUserType()) {
      $('#propBanner').hide();
    }
  }
  page.getbanner = function(){
    return page.getData('/pc/account/overview/banner',{'clientType':'PC',
          'sessionKey':sessionKey},[banner,addevent]);
    function banner(data){
      var data = data.data;
      page.initTemplate(data,'propBanner','tempBanner');
    }
    function addevent(data){
      var data = data.data;
      if (data.bannerFlag_TYB == '1') {
        $('#startBanner').show();
      }else if(data.bannerFlag_BK == '1'){
        $('#cardBanner').show();
      }else if(data.bannerFlag_SM == '1'){
        $('#realnameBanner').show();
      }else if(data.bannerFlag_GS == '1'){
        $('#firstBanner').show();
      }else if(data.bannerFlag_HD == '1'){
        $('.stretch').show();
      }
      $('#firstBut').on('click',function(){
        ID = $(this).attr('data-id');
        ID = data.productId;
        window.location.href = '/html/product/first/#!/'+ID;
      });
    }
  }
  //数据图
  page.getviewall = function () {

    return page.getData(
      '/user/totalAccount',
      {'clientType': clientType,'sessionKey':sessionKey},
      [viewall,addevent,clickEvent,echars]);

    function viewall(data) {
      if (page.isSuccess(data)) {
        var data = data.data;

        page.initTemplate(data, 'viewalldetail', 'tempviewall');
        page.initTemplate(data,'propContent','tempContent');
      }
    };
    function clickEvent() {
      if(userType=='1') {
        if(userStatus=='-1')  {
          $('#recharge_button,#postal_button').on('click',function() {
            window.location.href = '/html/account/submitFail/'
          })
        } else if(userStatus=='0') {
          $('#recharge_button,#postal_button').on('click',function() {
            window.location.href = '/html/account/submitSuccess/'
          })
        } else if(userStatus=='2') {
          $('#recharge_button,#postal_button').on('click',function() {
            window.location.href = '/html/account/openAccount/'
          })
        } else if(userStatus=='1') {
          $('#recharge_button,#postal_button').on('click',function() {
            window.location.href = '/html/account/bank2/'
          })
        }
        $('#invest_button').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
      }else {
        $('#postal_button').on('click',function() {
          window.location.href = '/html/account/bank/?control=depost'
        })
        $('#recharge_button').on('click',function() {
          window.location.href = '/html/account/bank/?control=recharge'
        })
        $('#invest_button').on('click',function() {
          window.location.href = '/finance/list/0/1/0/0'
        })
      }
    }
    function addevent(data) {
      if(page.isSuccess(data)) {
        var target = $('#earnheader').children('.item');
        target.on('click',function(){
          window.location.href = $(this).data('content');
        })
      }
    };
    function echars(data) {
      if (page.isSuccess(data)) {
        var data = data.data;
        //load echars
         var chartContainer = $('#echartview')[0],
          chart = echarts.init(chartContainer);

        option = {

          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            icon: 'circle',
          },
          series: [
              {
                name:'账户总览',
                type: 'pie',
                minAngle:'20',
                radius : ['40%','60%'],
                center: ['50%', '50%'],
                   data:[
                        {value:data.collectRevenue, name:'待收收益'},
                        {value:data.usableBalance, name:'可用余额'},
                        {value:data.collectCapital, name:'待收本金'},
                        {value:data.frozenAmount, name:'冻结余额',selected:'true'},
                    ]
              }
          ],
          color:['#ec5401','#fcd160','#78e8b8','#42b9fd']
        };
        chart.setOption(option);
      }
    }
  }
  //鸟币、券渲染模板
  page.getticket = function(){
    return page.getData(
      '/pc/account/overview/couponInfo',
      {'clientType': 'PC'},[ticket]);
    function ticket(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'propTicket','tempTicket');
      }
    }
  }
  //推荐理财列表页
  page.getProduct = function(){
    return page.getData(
      '/pc/account/overview/getRecommendProducts',
      {'clientType':'PC'},[product,addEvent,yiru]);
    function product(data){
      var data = data.data;
      page.pushNoticeList(data.productList);
      page.initTemplate(data,'propProduct','tempProduct');
    }
    function addEvent(data){
      $('.recommend_but').on('click',function(){
        var productId = $(this).attr('data-id');
        var obj = page.noticeList[productId];
        var postData = {
          productId:obj.productId,
          productName:obj.productName,
          productType:obj.productType,
          progress:obj.progress,
          annualIncomeText: obj.annualIncomeText,
          convertDay:obj.convertDay,
          productRemainAmount:obj.productRemainAmount,
          productTotalAmount:obj.productTotalAmount,
          staInvestAmount:obj.staInvestAmount,
          usableBalance:obj.usableBalance,
          staRateDate:obj.staRateDate,
          endDate:obj.endDate,
          repaymentType:obj.repaymentType
        }
        if (obj.productType == 'XSB') {
          page.post('/html/product/first/#!/'+productId,postData);
        }else if(obj.productType == 'LCTXL'){
          page.post('/html/product/long/#!/'+productId,postData);
        }else if(obj.productType == 'LCT'){
          page.post('/html/product/short/#!/'+productId,postData);
        }

      });
    }
    function yiru(data){
      $('.recommend .caption').mouseover(function(){
          $(this).find('.recommend_but').stop().slideToggle('fast');
        });
        $('.recommend .caption').mouseout(function(){
          $(this).find('.recommend_but').stop().slideToggle('fast');
        });
        $('.little_icon').mouseover(function(){
          $('#start_tips').show();
        });
        $('.little_icon').mouseout(function(){
          $('#start_tips').hide();
        });
    }
  }
  //把数据存到列表中
  page.pushNoticeList = function(data){
    if (data.length>0) {
      for (var i = 0; i < data.length; i++) {
        page.noticeList[data[i].productId] = data[i];
      }
    }
  }
  //leftnav 左边选中状态
  page.leftnav = function () {
    var pn = location.pathname;
    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++)
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
    }
  }
  //初始化
  page.init = function() {
    page.setTitle('领投鸟理财-不动产理财颠覆者-账户总览');
    // user().loginOperate();

    page.getbanner();
    page.getviewall();
    // page.leftnav();
    page.getticket();
    page.getProduct();
    page.companyShow();
    page.isMoodalShow();
  }

  page.init();

});
