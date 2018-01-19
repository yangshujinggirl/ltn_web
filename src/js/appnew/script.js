$(function(){

  var key = 0;

  var flag = true;
  var viewHeight=$(window).height();

  _toggleClass();

  $(window).mousewheel(function(event,num){
    // 往下滚动 num返回 -1  往上滚动 返回 1
    // //key -= num;
    // 通过定时器实现函数节流
    if(flag){

      flag = false;
      key = key - num;

      console.log(key);

      if(key >= 4){ key = 4 };
      if(key <= 0){ key = 0 };

      $('.nav .item').removeClass('current').eq(key).addClass('current');
      $('.wrapScreen').stop().animate({'top':-key*100+'%'},500);

      if(key>=1) {
        $('.coverbg').fadeIn(500);
      }
      $('.coverbg .close').on('click',function() {
        $('.coverbg').hide();
      })
      _toggleClass();
      setTimeout(function(){

               flag = true;

      }, 500)

    }
  })

  $('.nav .item').on('click',function() {

      key = $(this).index();
      $(this).addClass('current').siblings().removeClass('current');
      $('.wrapScreen').stop().animate({'top':-key*100+'%'},500);
      if(key>=1) {
        $('.coverbg').fadeIn(500);
      }
      _toggleClass();
  });


  function _toggleClass(){

    $('.page .text').fadeOut().eq(key).fadeIn(3000);

  }

})