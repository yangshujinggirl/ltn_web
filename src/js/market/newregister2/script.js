$(function(){
  if (!user().isLogin()) {
    $('#register-button').html('立即注册');
    $('#register-button').on('click',function(){
      window.location.href="/html/user/register/"
    });
  }else{
      $('#register-button').html('立即加入');
      $('#register-button').on('click',function(){
      window.location.href="/html/product/#!/short/0/0/1"
    });
    }
});