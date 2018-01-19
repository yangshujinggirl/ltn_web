$(function(){
  var page = new Page();
  page.getFail = function(){
    return page.getData(
      '/company/check',{
        'clientType':'PC'
      },[failMmessage]);
    function failMmessage(data){
      if (page.isSuccess(data)) {
        var data= data.data;
        page.initTemplate(data,'submite_message','tempFail');
      }
    }
  }
  page.init = function(){
    page.getFail();
  }
  page.init();
});