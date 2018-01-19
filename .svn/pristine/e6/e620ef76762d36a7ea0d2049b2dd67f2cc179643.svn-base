$(function () {

  var page = new Page();
  var idStr = '';
  //分页
  page.pagDesc = function () {
    if (page.get('totalCount') == 0) {
      return false;
    }
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize: 10,
      callback: intPage
    });
    function intPage(pageNo) {
      page.initDesc(pageNo);
    }
  }
  //渲染模板
  page.initDesc = function (currenPage) {

    return page.getData(
      '/integral/getIntegralList',
      {
        'pageNo': currenPage,
        'pageSize': 10
      },
      [initTemp, getTotalSize, nolist]);

    function initTemp(data) {
      if (page.isSuccess(data)) {
        var dataList = data.data.data;
        var trans = {
          "REGISTER": "注册",
          "AUTHNAME": "实名",
          "BINDCARD": "绑卡",
          "RECHARGE": "充值",
          "INVEST": "投资",
          "REFERRER": "推荐",
          "SIGNIN": "签到",
          "ACC_SIGNIN":"签到累积",
          "CROWDFUNDING": "众筹",
          "HELPEACHOTHER": "互助",
          "SHARE": "分享",
          "EXCHANGE": "兑换",
          "HISTORY": "积分结转",
          "MANUALADD": "积分调整"
        };
        dataList.forEach(function (v) {
          v.eventDate = new Date(v.eventDate).Format('yyyy-MM-dd hh:mm:ss');
          v.eventType = trans[v.eventType];
        });

        page.initTemplate(dataList, 'pointDataList', 'tempPointlList');
      }
    };

    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.total)
      }
    };

    function nolist(data) {
      if (page.isSuccess(data)) {
        var data = data.data.data;
        if (data.length <= 0) {
          $('.nolist').show();
        }
      }
    };
  };


  page.init = function () {
    page.setTitle('我的积分');
    //user().loginOperate();
    page.when(page.initDesc, [page.pagDesc]);

  };

  page.init();
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
});
