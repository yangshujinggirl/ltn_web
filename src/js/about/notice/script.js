$(function() {
	var page = new Page();
	page.noticeList={};

	//分页page.get('totalCount')
	page.pagNews = function(){
    $('.pages').paging({
      totalSize:page.get('totalCount'),
      turnSize: 5,
      pageSize:10,
      callback:intPage
    });
    function intPage(pageNo){
      page.getNotice (pageNo);
    }
  };
	page.getNotice = function(currenPage) {
		return page.getData(
			'/pc/announcement/list', {
				'clientType': 'PC',
				'currentPage': currenPage || 0,
        'pageSize':10,
				'type': '1'
			}, [profitNitoce,getTotalSize,addEvent]);

		function profitNitoce(data) {
			if (page.isSuccess(data)) {
				var data = data.data;
				page.initTemplate(data, 'noticeProp', 'tempNotice');
			}
		};
		function getTotalSize(data) {
      if (page.isSuccess(data)) {
        data = data.data;
        page.set('totalCount', data.totalCount)
      }
    };
		function addEvent(data) {
			$('.list li').on('click', function() {
				var id=$(this).attr('data-id');
				var obj=page.noticeList[id];
        var type=$(this).attr('data-type');
        window.location.href = '/html/about/noticedetail?id='+id+'&type='+type;
			});
      $('.arrow').on('click',function() {
        event.stopPropagation();
        if($(this).hasClass('show')) {
          $(this).removeClass('show');
          $(this).parents('li').find('.infoContent').hide();
        } else {
          $(this).addClass('show');
          $(this).parents('li').find('.infoContent').show();
        }
      })
		};
	}
	page.init = function() {
		page.when(page.getNotice,[page.pagNews]);
	}
	page.init();
});