$(function(){
  var page = new Page();

  page.getDesc = function(){
    return page.getData(
      '/bank/list/bk',
      {clientType: 'PC'},
      [initTemp]);
    function initTemp(data){
      if (data.resultCode === '0'){
        data = data.data;
        page.initTemplate(data.list,'initTemplate','tempRecharge')
      }
    }
  }
  page.init= function(){
    page.setTitle('我的银行卡');
    page.getDesc();
  }
  page.init();
})