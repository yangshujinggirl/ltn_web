$(function(){
  var page = new Page();
  page.getopenSuccess = function(){
    return page.getData(
      '/company/check',{
        'clientType':'PC'},[initSuccess]);
    function initSuccess(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.initTemplate(data,'openStatusInfo','templateopenStatus');
      }
    }
  }
  page.init = function(){
    page.getopenSuccess();
  }
  page.init();
});