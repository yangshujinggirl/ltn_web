$(function () {
  var page = new Page();
  page.setTitle('领投鸟理财-不动产理财颠覆者-新手指南');

  var newLi=$('.list li:first').clone(true);

  $('.list').append(newLi);

  var num=0,
      dianNum=0;

  //向左轮播

  $('.leftkey').click(function(){

    var currentList = $(this).parent().find('.list');
    var dianlist = $(this).parent().find('.dianList').children('li');
    //小点跳转
    dianNum++;
    if(dianNum>1){
      dianNum=0;
    }
    dianlist.eq(dianNum).addClass('selected').siblings().removeClass('selected');
    //图片跳转
    num++;
    if(num>2){
      currentList.css('left',0);
      num=1;
    }
    var moves=num*-1130;
    currentList.stop().animate({left:moves+'px'},500);
  });


  //向右轮播

  $('.rightkey').click(function(){
    var currentList=$(this).parent().find('.list');
    var dianlist = $(this).parent().find('.dianList').children('li');
    //小点跳转
    dianNum--;
    if(dianNum<0){
      dianNum=1;
    }
    dianlist.eq(dianNum).addClass('selected').siblings().removeClass('selected');

    //图片跳转
     num--;
    if(num<0){
      currentList.css('left','-2260px');
      num=1;
    }
    var moves=num*-1130;
    currentList.stop().animate({left:moves+'px'},500);
  });



})