$(function(){
  var page = new Page();
      page.noticeList={};
  page.getsuccess = function(){
    return page.getData(
      '/pc/product/recommend/get',{
        'clientType':'PC'
      },[card,addEvent]);
    function card(data){
      if (page.isSuccess(data)) {
        var data = data.data;
        page.pushNoticeList(data.productList);
        page.initTemplate(data,'propsuccess','tempsuccess');
      }
    }
    function addEvent(data){

      $('.button').on('click',function(){
        var productId = $(this).attr('data-id');
        var obj = page.noticeList[productId];
        var postData = {
          productId:obj.productId,
          productName:obj.productName,
          productType:obj.productType,
          progress:obj.progress,
          annualIncomeText: obj.annualIncomeText,
          convertDay:obj.convertDay,
          productRemainAmount:obj.productRemainAmount,
          productTotalAmount:obj.productTotalAmount,
          staInvestAmount:obj.staInvestAmount,
          usableBalance:obj.usableBalance,
          staRateDate:obj.staRateDate,
          endDate:obj.endDate,
          repaymentType:obj.repaymentType
        }
          if(obj.productType=='XSB') {
            page.post('/html/product/first/#!/'+productId,postData);
          } else if(obj.productType=='LCTXL') {
            page.post('/html/product/long/#!/'+productId,postData);
          } else if(obj.productType=='LCT') {
            page.post('/html/product/short/#!/'+productId,postData);
          }
        
      });
    }
  };
  page.pushNoticeList = function(data){
    if (data.length>0) {
      for (var i = 0; i < data.length; i++) {
        page.noticeList[data[i].productId] = data[i];
      }
    }
  }
  page.init = function(){
    page.getsuccess();
  }
  page.init();
});