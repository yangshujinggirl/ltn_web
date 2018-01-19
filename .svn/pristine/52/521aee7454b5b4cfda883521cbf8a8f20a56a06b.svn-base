$(function () {

  var page = new Page();
  page.setTitle('领投鸟理财-不动产理财颠覆者-关于我们');

  var about = {
   //left nav 选中状态
    leftnav: function(){
      var pn = location.pathname;
      var as = $('#leftnav .item');
      for (var i = 0, j = as.length; i < j; i++)
        if (as[i].href.indexOf(pn) != -1) {
          as[i].className = 'selected item';
      }
    },

    join: function () {
      var _header = $('.header');
      _header.on('click',function(){

        var _current = $(this).siblings('.joinpro'),
        _joinpro = $('.joinpro');

        if(_current.is(":hidden")) {
            _joinpro.slideUp('slow');
            _current.slideDown("slow");
        }else {
            _current.slideUp('slow');
        };

        // $(this).siblings('.joinpro').slideToggle('slow');
      })
    },
    init:function(){
      about.join();
      about.leftnav();
    }
  };

  about.init();

})