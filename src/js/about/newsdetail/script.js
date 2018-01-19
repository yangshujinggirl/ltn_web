$(function(){
  var page=new Page();
  //获取参数
  page.getSearchParts = function (key) {
    var url = window.location.search;
    var search = url.substr(1).split('&');
    var ret = {}, idx, len = search.length;
    for (idx = 0; idx < len; idx++) {
      var keyVal = search[idx].split('=');
      ret[keyVal[0]] = keyVal[1];
    }
    return key ? ret[key] : ret;
  };
  page.initTemp=function(){
  	return page.getData(
      '/pc/announcement/detail',{
        'clientType':'PC',
        'announcementId':page.getSearchParts('id'),
        'type':page.getSearchParts('type')
      },[initTemp])
    function initTemp(data){
      if (page.isSuccess(data)) {
        data = data.data;
        page.initTemplate(data.lastAnnouncement,'content','tempNews');
      }
    }
  	
  };
  page.leftnav = function () {
    var pn = $('#abouttitle').data('content');

    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++){
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    }
  };
  page.init = function() {
    page.initTemp();
    page.leftnav();
  }
  page.init();
});