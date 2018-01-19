$(function() {
  var heightOne = $('#partOne').offset().top;
  var heightTwo = $('#partTwo').offset().top-200;
  var heightThr = $('#partThr').offset().top;

  function animateEvent() {
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      if(scrollTop>=200) {
        // $('#jsOneL').addClass('animate');
        $('#jsOneL').stop().animate({
          top:"30%"
        },2000);
        $('#jsOneR').slideDown(2000);
      }
      if(scrollTop>=heightOne) {
        $('#jsTwo').stop().animate({
          top:"30%"
        },2000);
      }
      if(scrollTop>=heightTwo) {
        $('#jsThr').stop().animate({
          top:"30%"
        },2000);
      }
      if(scrollTop>=heightThr) {
        $('#jsFourL').slideDown(2000);
        $('#jsFourR').stop().animate({
          top:"30%"
        },2000)
      }
    })

  }
  function isShow() {
    var flag = false;
    $(window).scroll(function() {
      var scrollTop = $(window).scrollTop();
      // console.log($(window).scrollTop())
      if(flag==false && scrollTop>=800) {
        $('.fooer-content').slideDown();
      } else {
        $('.fooer-content').slideUp();
      }
    })
    $('.close-btn').on('click',function() {
      $('.fooer-content').hide();
      flag = true;
    })
  }

  animateEvent();
  isShow();
  if(window.location.pathname == '/other/downloadapp /'){
     $('.commonNavTwo,.commonNav').find('.right a').eq(3).addClass('select')
   }
})
