$(function(){
  $('#down1').on('click',function(){
    $('#line1').slideUp('slow');
    $('#down_bottom1').slideUp('slow');
    $('#jiantou2').show();
  });
  $('#jiantou2').on('click',function(){
    $('#line1').slideDown('slow');
    $('#down_bottom1').slideDown('slow');
    $('#jiantou2').hide();
  });
  $('#down2').on('click',function(){
    $('#line2').slideUp('slow');
    $('#down_bottom2').slideUp('slow');
    $('#jiantou3').show();
  });
  $('#jiantou3').on('click',function(){
    $('#line2').slideDown('slow');
    $('#down_bottom2').slideDown('slow');
    $('#jiantou3').hide();
  });
});