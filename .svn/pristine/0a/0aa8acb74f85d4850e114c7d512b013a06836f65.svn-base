$(function(){

    var num=0;
    var newLi = $('#wrapImg .item1:first').clone(true);
    $('#wrapImg .list').append(newLi);
    function rightEvent(){
      event.stopPropagation();
      num++;
      if(num>6){
        $('#wrapImg .list').css('left','0');
        num=1;
      }
      var moveS = -num*500;
      $('#wrapImg .list').stop().animate({'left':moveS});
    };
    function leftEvent(){
      event.stopPropagation();
      num--;
      if(num<0){
        $('#wrapImg .list').css('left','-3000px');
        num=5;
      }
      var moveS = -num*500;
      $('#wrapImg .list').stop().animate({'left':moveS});
    };

    $('#lunbo .leftBtn').on('click',leftEvent);

    $('#lunbo .rightBtn').on('click',rightEvent);

    $('#honorList .item').on('click',function(){
      $('#lunbo').show();
      num = $(this).index();
      $('#wrapImg .list').css('left',-num*500+'px');
    });

    $('#lunbo').on('click',function(){
      $('#lunbo').hide();
    });
})