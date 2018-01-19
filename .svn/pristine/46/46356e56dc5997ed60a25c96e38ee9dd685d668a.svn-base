$(function () {

  // var app = {
  //   user: '',
  //   //判断用户是否实名
  //   userIsRealname: function(){
  //     user().getUserInfo(app.goRealname);
  //   },
  //   goRealname: function(){
  //     if(!user().user.certification){
  //       window.location.href='/html/account/realname-done';
  //     }else{
  //       $('#txtName').html(user().user.userName)
  //       $('#ID').html(user().user.cardId)
  //     }
  //   },
  //   //初始化方法
  //   init: function() {
  //     app.userIsRealname();//判断用户是否实名
  //   }
  // };
  // app.init();

  var page = new Page();
  page.getRealname = function () {

    return page.getData(
      '/account/center/nameAuthInfo',
      {clientType: 'PC'},
      [realnameInfo]);

    function realnameInfo(data){
      if (data.resultCode =='0'){
        data = data.data;
        page.initTemplate(data,'realName','tempRealname');
      }
    };
  };

  page.leftnav = function () {
    var pn = $('#realnametitle').data('content');

    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++){
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    }
  };

  page.init = function (){
    page.setTitle('实名认证');
    // page.leftnav();
    page.getRealname();
  };

  page.init();

})