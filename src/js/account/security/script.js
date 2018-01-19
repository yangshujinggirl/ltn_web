$(function () {

  var page = new Page();

  //添加Type sessionkey
  var clientType = constant().clientType;
  var sessionKey = constant().sessionKey;


  //load data security
  page.getSecurity = function () {

    return page.getData(
      '/account/coupon/list',
      {'clientType': clientType,'sessionKey':sessionKey},
      [security,addEvents,eventTips]);

    function security (data) {
      if (page.isSuccess(data)) {
        var data = data.data;

        page.initTemplate(data, 'security', 'tempsecurity');

        //添加理财金券很多的时候只显示4张，点击更多全部显示；@author wangwenjie 2016/5/9
        var team = ["#gold1","#gold2","#gold3","#return1","#return2","#return3","#add1","#add2","#add3"];

        $.map( team, function(a, i) {

          var num = $(a).children('.imgs').length;
          if(num>4) {
            $(a).children('.imgs').eq(3).nextAll().filter(".imgs").css('display','none');
            $(a).children('.more').css('display','block');
          }

          $(a).children('.more').on('click',function() {
            $(this).siblings('.imgs').css('display','block');
            $(this).css('display','none');
          });
        });
      }
    };
    //无金券时显示鸟。
    function eventTips(data){
      if(page.isSuccess(data)) {
        var data = data.data.couponList;
        var newDataTY1 = [];
        var newDataTZ1 = [];
        var newDataJX1 = [];
        var newDataTY2 = [];
        var newDataTZ2 = [];
        var newDataJX2 = [];
        var newDataTY3 = [];
        var newDataTZ3 = [];
        var newDataJX3 = [];
        for (var i = 0; i < data.length; i++) {
          if(data[i].status == 'YX') {
            if(data[i].activityType == '体验抵扣'){
                  newDataTY1.push(data[i]);
            }else if(data[i].activityType == '投资返现') {
                  newDataTZ1.push(data[i]);
            }else if(data[i].activityType == '加息券') {
                  newDataJX1.push(data[i]);
            }
          } else if(data[i].status == 'SYZ') {
            if(data[i].activityType == '体验抵扣'){
                  newDataTY2.push(data[i]);
            }else if(data[i].activityType == '投资返现') {
                  newDataTZ2.push(data[i]);
            }else if(data[i].activityType == '加息券') {
                  newDataJX2.push(data[i]);
            }
          } else if(data[i].status == 'ZF'||'GQ') {
            if(data[i].activityType == '体验抵扣'){
                  newDataTY3.push(data[i]);
            }else if(data[i].activityType == '投资返现') {
                  newDataTZ3.push(data[i]);
            }else if(data[i].activityType == '加息券') {
                  newDataJX3.push(data[i]);
            }
          }
        }
        if(newDataTY1.length==0) {
          $('.imgTips').eq(0).addClass('selected');
        }
        if(newDataTZ1.length==0){
          $('.imgTips').eq(1).addClass('selected');
        }
        if(newDataJX1.length==0){
          $('.imgTips').eq(2).addClass('selected');
        }

        if(newDataTY2.length==0) {
          $('.imgTips').eq(3).addClass('selected');
        }
        if(newDataTZ2.length==0){
          $('.imgTips').eq(4).addClass('selected');
        }
        if(newDataJX2.length==0){
          $('.imgTips').eq(5).addClass('selected');
        }

        if(newDataTY3.length==0) {
          $('.imgTips').eq(6).addClass('selected');
        }
        if(newDataTZ3.length==0){
          $('.imgTips').eq(7).addClass('selected');
        }
        if(newDataJX3.length==0){
          $('.imgTips').eq(8).addClass('selected');
        }

      }
    };
    function addEvents() {

      var tab = $('#itemtab'),
      tabItems = $('#itemtab .item'),
      classType = [],
      detail = $('#contenttab');

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
        };


      });
    };

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

  page.init = function() {
    page.setTitle('我的理财金券');
    user().loginOperate();
    page.getSecurity();
    // page.leftnav();
  }

  page.init();


});