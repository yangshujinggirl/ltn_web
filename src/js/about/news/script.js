$(function(){
  var page = new Page();
  page.newsList={};
  //分页page.get('totalCount')
  page.pagNews = function(){
    $('.pages').paging({
      totalSize:page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getNews (pageNo);
    }
  };
  page.getNews = function(currenPage){
    return page.getData(
      '/pc/announcement/list',
      {
        'clientType':'PC',
        'currentPage': currenPage || 0,
        'pageSize':10,
        'type':'2'
      },
      [profitNitoce,getTotalSize,addEvent]);
    function profitNitoce(data){
      if (page.isSuccess(data)){
        var data = data.data;
        page.initTemplate(data,'newProp','tempNews')
        console.log(data.announcementList);
      }
    };
    function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };
    function addEvent(data){
    	$('.newstitle').on('click',function(){
    		var id=$(this).attr('data-id');
			  var obj=page.newsList[id];
        var type=$(this).attr('data-type');
        window.location.href = '/html/about/newsdetail?id='+id+'&type='+type;
    	});
    };
  };

  page.init = function(){
    page.when(page.getNews, [page.pagNews]);
  }
  page.init();
});