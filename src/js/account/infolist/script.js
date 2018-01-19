$(function () {

  var page = new Page();
  var idStr = '';
  //分页
  page.pagDesc = function (){
    if(page.get('totalCount')==0){
      return false;
    }
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
        page.initDesc (pageNo);
    }
  }
  //渲染模板
  page.initDesc = function (currenPage) {

      return page.getData(
        '/message/person/list',
        {
          'currentPage':currenPage || 0,
          'pageSize':10
        },
        [initTemp,getTotalSize,nolist]);

      function initTemp(data) {
        if (page.isSuccess(data)) {
          var data = data.data;
          var newId = data.messageList;
          //获取未读消息的ID，并组成字符串
          for (var i = 0; i < newId.length; i++) {
            if(newId[i].isRead == '0'){
              idStr=idStr+newId[i].id+',';
            }
          }
          page.initTemplate(data.messageList, 'detailList', 'tempDetailList');
          page.readSuccess();
        }
      };

      function getTotalSize(data) {
        if (page.isSuccess(data)) {
          data = data.data;
          page.set('totalCount', data.totalCount)
        }
      };

      function nolist(data){
        if(page.isSuccess(data)) {
          var data = data.data.messageList;
          if(data.length<=0){
            $('.nolist').show();
          }
        }
      };
  };
  //将消息设置为已读
  page.readSuccess = function(){
    return page.getData(
      '/message/person/read',
      { clientType:'PC',
        messageIds:idStr},
      []);
    // function initRead(data){
    //   if (page.isSuccess(data)){
    //     var data = data.data;
    //     if(data.success =='1') {
    //       location.reload();
    //     }
    //   }
    // }
  };
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
    page.setTitle('我的消息');
    user().loginOperate();
    page.when(page.initDesc,[page.pagDesc]);
    // page.leftnav();
  }

  page.init();

})
