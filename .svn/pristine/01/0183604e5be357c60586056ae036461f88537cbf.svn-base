$(function(){
  var page = new Page();
  page.getmedal = function(){
    return page.getData(
      '/market/activity/info',{
        'clientType':'PC',
        'serviceName':'OLYMPIC'
      },[medal]);
    function medal(data){
      if (page.isSuccess(data)) {
        var data = data.data.result;
        var data1 = data.totalMoneyFirstOrder;
        var data2 = data.totalMoney;
        var data3 = data.totalPeople;
        page.initTemplate(data2,'medalTable1','tempmedalTable1');
        page.initTemplate(data3,'medalTable2','tempmedalTable2');
        page.initTemplate(data1,'medalTable3','tempmedalTable3');
      }
    }
  };
  page.init = function(){
    page.getmedal();
  }
  page.init();
});