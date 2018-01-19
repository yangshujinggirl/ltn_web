/**
 * 众筹列表页面
 */
;(function(){

  var dataUrl="/productZc/producZcSearch";

  var page = new Page();


  function initProList(currentPage){
    page.getData(dataUrl,{
      currentPage:currentPage||0,
      pageSize:2
    },function(data){
      if(page.isSuccess(data)){
        var resData = data.data;
        // var data = data.data.productZcList;
        page.initTemplate(resData.productZcList,'crowdListWrap','crowdListTemplate');
        if(!page.initPagination){
          initPagination(page,data.data.totalCount,2);
        }
        if (data.data.productZcList.length<=0) {
          $('#showpic').show();
        }
        $('.mutual_list .plan').on('click',function() {
          var url = $(this).data('url');
          window.location.href = url;
        })
      }
    })
  }
  initProList();
  function initPagination(page,items,itemsOnPage){
    $('#light-pagination').pagination({
      items: items||0,
      itemsOnPage: itemsOnPage||2,
      prevText:'<<',
      nextText:'>>',
      cssStyle: 'light-theme',
      onInit:function(){
        page.initPagination = true;
      },
      onPageClick:function(pageNumber,event){
        initProList(pageNumber-1);
      }
    });
  }
 function bannerCrowd (){
    return page.getData(
      '/page/banner',{
        clientType:'PC',
        location:3
      },[initBanner]);
    function initBanner(data){
      if (page.isSuccess(data)){
        var data = data.data;
        page.initTemplate(data,'bannerMutual','templateBanner');
    }
  }
}
bannerCrowd();
if(window.location.pathname == '/html/crowd/'){
    $('.commonNavTwo,.commonNav').find('.right a').eq(3).addClass('select')
  }
})();
