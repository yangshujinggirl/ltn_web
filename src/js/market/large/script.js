$(function(){
  var page = new Page();
  page.setTitle('领投鸟理财-不动产理财颠覆者-大额充值');

  $('.button').click(function(){
    if (user().isLogin()) {
    window.location.href='/html/account/bank/'
  }else{
    window.location.href='/html/user/login/'
  }
});
  
})