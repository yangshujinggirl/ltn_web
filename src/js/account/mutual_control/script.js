$(function(){
  var page = new Page();
  page.mutualPag = function(){
    $('.pages').paging({
      totalSize: page.get('totalCount'),
      turnSize: 5,
      pageSize:7,
      callback:intPage
    });
    function intPage(pageNo){
      page.mutual(pageNo);
    }
  };
  page.mutual = function(currenPage){
    return page.getData(
      '/help/myHelp',{
        clientType:'PC',
        currentPage:currenPage||0,
        pageSize:7
      },[initMutual,nolist]);
    function initMutual(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'propMutual','tempMutual');
        page.set('totalCount',data.totalCount);
      }
    }
    function nolist(data){
        if(page.isSuccess(data)) {
          var data = data.data.myHelpList;
          if(data.length<=0){
            $('.nolist').show();
          }
        }
      };
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
  page.init = function(){
    page.when(page.mutual,[page.mutualPag]);
  }
  page.init();
});