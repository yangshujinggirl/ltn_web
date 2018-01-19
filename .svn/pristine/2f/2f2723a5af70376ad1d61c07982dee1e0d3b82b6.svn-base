$(function() {
  var page = new Page();
  page.setTitle('换卡成功');
  var app = {
    leftnav: function(){
      var pn = $('#account-card').data('content');

      var as = $('#leftnav .item');
      for (var i = 0, j = as.length; i < j; i++){
        if (as[i].href.indexOf(pn) != -1) {
          as[i].className = 'selected item';
        }
      };
    },
    //初始化方法
    init: function() {
      app.leftnav();
    }
  };
  app.init();

});