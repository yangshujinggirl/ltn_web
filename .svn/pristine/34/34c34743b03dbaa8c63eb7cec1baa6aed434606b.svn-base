$(function (){
  var page = new Page();
  //获取用户个人信息
  page.getLeftInfo = function (){

    return page.getData(
      '/user/partner',
      {clientType: 'PC'},
      [leftInfo,login,realname,bind]);

    function leftInfo(data){
      if(data.resultCode == '0') {
        data = data.data;
        data.name=session().get('userName');
        data.tel=session().get('login');
        page.initTemplate(data,'leftInfo','tempLeftinfo');
      }
    };
    //判断是否登录
    function login(){
      if(user().isLogin()) {
        $('.icon .telIco').addClass('selected');
        $('.telIco #tips').html('已登录');
      }
    };
    //判断是否实名
    function realname(){
      if(user().isNameAuth()) {
        $('.icon .realnameIcon').addClass('selected');
        $('.realnameIcon #tips').html('已实名');
      }else {
        $('.realnameIcon #tips').html('未实名');
      }
    };
     //判断是否绑卡
    function bind(){
      if(user().isBindCard()) {
        $('.icon .cardIcon').addClass('selected');
        $('.cardIcon #tips').html('已绑卡');
      }else {
        $('.cardIcon #tips').html('未绑卡');
      }
    }
    $('#tel').html()=session().get('login');
  };

  //leftnav左边选中状态
  page.leftnav = function () {
    var pn = location.pathname;

    var as = $('#leftnav .item');
    for (var i = 0, j = as.length; i < j; i++){
      if (as[i].href.indexOf(pn) != -1) {
        as[i].className = 'selected item';
      }
    }
  };

  //判断是否有未读消息
  page.isRead = function(){
    return page.getData(
      '/message/person/unread/get',
      {clientType: 'PC'},
      [readEvent]);
    function readEvent(data){
      if(data.resultCode == '0'){
        var data = data.data;
        if(data.hasUnread =='1') {
          $('.redCircle').addClass('selected');
        }else if(data.hasUnread=='0'){
          $('.redCircle').removeClass('selected');
        }
      }
    };
  };

  page.init = function (){
    page.setTitle('修改交易密码');
    page.getLeftInfo();
    // page.leftnav();
    page.isRead();
  };

  page.init();

})