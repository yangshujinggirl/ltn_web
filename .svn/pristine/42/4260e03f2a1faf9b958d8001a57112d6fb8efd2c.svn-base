$(function(){
  var page = new Page();
  page.banner = function(){
    return page.getData(
      '/get/activities',{
        'clientType' :'PC'
      },[activitys]);
    function activitys(data){
      var data = data.data.result;
      page.initTemplate(data,'propActivity','tempActivity');
    }
  }
  page.init = function(){
    page.banner();
  }
  page.init();
});