$(function(){
  var page = new Page();
  page.setTitle('领投鸟理财-不动产理财颠覆者-安全保障');

 $('#but').click(function(){
  if (user().isLogin()) {
    window.location.href='/finance/list/0/1/0/0'
  }else{
    window.location.href='/html/user/login'
  }
 })
 if(window.location.pathname == '/safeguards '){
    $('.commonNavTwo,.commonNav').find('.right a').eq(4).addClass('select')
  }
})
