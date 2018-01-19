$(function(){
  var page = new Page();
  //月报
  page.month = function(){
    return page.getData(
      '/report/yyReport',{
        clientType:'PC',
        type: '1'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'propReport','templateReport');
      }
    }
  }
  //季报
  page.quarterly = function(){
    return page.getData(
      '/report/yyReport',{
        clientType:'PC',
        type: '2'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'propReport','templateReport');
      }
    }
  }
  //年报
  page.year = function(){
    return page.getData(
      '/report/yyReport',{
        clientType:'PC',
        type: '3'
      },[initTemp]);
    function initTemp(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'propReport','templateReport');
      }
    }
  }
  page.typeTab = function(){
    $('#prod-tab .item').on('click',function(){
      $(this).addClass('current').siblings().removeClass('current');
    if ($(this).data('content') == 'yuebao') {
      page.month();
    }else if ($(this).data('content') == 'jibao') {
      page.quarterly();
    }else if($(this).data('content') == 'nianbao'){
      page.year();
    }
  });
  }
  page.init = function(){
    page.typeTab();
    page.month();
  }
  page.init();
});