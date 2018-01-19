$(function(){

  var page = new Page();
  var userStatus = session().get('userStatus');
  var userType = session().get('userType');
  // 企业用户tab显示
  page.showType = function() {
    if(user().getUserType()) {
      $('#item10,#item3,#item8').hide();
    } else {
      $('#item7').hide();
    }
  }
  var accountPageInfo=['viewall','detailmoney','bank','card','freedom','trackReacord','returnedMoney','openAccount','realname','password-login','password-trading','infolist','bird','returnTickits','raiseTickits','partner','inviteRecord','awardDetail','crowd_control','mutual_control','address','point']
  //侧边栏切换
  page.leftNav = function() {
    var url=location.pathname;
    var index=0;
    for(var i=0;i<accountPageInfo.length;i++){
      if(url.indexOf(accountPageInfo[i])>=0){
        index=i;
        break;
      }
    }
    $('#item'+index).addClass('selected');

    $('#leftnav .item').on('click',function() {
      if(user().getUserType()) {
        if(userStatus=='-1')  {
            $('#item7').attr('data-link', '/html/account/submitFail/');
            $('#item2').attr('data-link', '/html/account/submitFail/');
          } else if(userStatus=='0') {
            $('#item7').attr('data-link', '/html/account/submitSuccess/');
            $('#item2').attr('data-link', '/html/account/submitSuccess/');
          } else if(userStatus=='2') {
            $('#item7').attr('data-link', '/html/account/openAccount/');
            $('#item2').attr('data-link', '/html/account/openAccount/');
          } else if(userStatus=='1') {
            $('#item7').attr('data-link','/html/account/openAccount-success/');
            $('#item2').attr('data-link', '/html/account/bank2/');
          }
      }
      window.location.href = $(this).data('link');
    })
  }
  //获取用户个人信息
  page.getLeftInfo = function (){

    return page.getData(
      '/user/partner',
      {clientType: 'PC'},
      [leftInfo,login,realname,bind,UserType]);
    //渲染模板
    function leftInfo(data){
      if(data.resultCode == '0') {
        data = data.data;
        data.name=session().get('userName');
        data.tel=session().get('login');
        page.initTemplate(data,'leftInfo','tempLeftinfo');
      }
      if (data.userLerver == '普通合伙人') {
        $('.partner .type').addClass('putong');
        $('.partnertips').html('普通合伙人');

        $('.partner .type').hover(function(){
          $('.partnertips').show();
        },function() {
          $('.partnertips').hide();
        })
      }else if(data.userLerver == '普通用户'){
        $('.partner .type').addClass('putonghuise');
        $('.partnertips').html('普通用户');
        $('.partner .type').hover(function() {
          $('.partnertips').show();
        },function() {
          $('.partnertips').hide();
        })
      }else if (data.userLerver == '金牌合伙人') {
        $('.partner .type').addClass('jinpai');
        $('.partnertips').html('金牌合伙人');
        $('.partner .type').hover(function() {
          $('.partnertips').show();
        },function() {
          $('.partnertips').hide();
        })
      }else if (data.userLerver == '钻石合伙人') {
        $('.partner .type').addClass('zuanshi');
        $('.partnertips').html('钻石合伙人');

        $('.partner .type').hover(function() {
          $('.partnertips').show();
        },function() {
          $('.partnertips').hide();
        })

      }else if (data.isStaff == '2') {
        $('.partner .type').addClass('hezuo');
        $('.partnertips').html('合作伙伴');
        $('.partner .type').hover(function() {
          $('.partnertips').show();
        },function() {
          $('.partnertips').hide();
        })

      }else{
        $('.partner .type').addClass('putonghuise');
      }
    };

    //判断是否登录
    function login(){
      if(user().isLogin()) {
        $('.icon .telIco').addClass('selected');
        $('.telIco .tipsIcon').html('已登录');
      }
    };
    //判断是否实名
    function realname(){
      if(user().isNameAuth()) {
        $('.icon .realnameIcon').addClass('selected');
        $('.realnameIcon .tipsIcon').html('已开户');
      }else {
        $('.realnameIcon .tipsIcon').html('未开户');
        $('.realnameIcon').on('click',function(){
          if(user().getUserType()) {
            window.location.href = '/html/account/openAccount/';
          } else {
            window.location.href = '/html/account/realname/';
          }
        })
      }
    };
     //判断是否绑卡
    function bind(){
      if(user().isBindCard()) {
        $('.icon .cardIcon').addClass('selected');
        $('.cardIcon .tipsIcon').html('已绑卡');
      }else {
        $('.cardIcon .tipsIcon').html('未绑卡');
        $('.cardIcon').on('click',function(){
          window.location.href = '/html/account/card1';
        })
      }
    }
    //是否是企业用户
    function UserType() {
      if(user().getUserType()) {
          $('.icon .cardIcon').hide();
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
    page.getLeftInfo();
    page.leftNav();
    page.showType();
    page.isRead();
  };

  page.init();

});
