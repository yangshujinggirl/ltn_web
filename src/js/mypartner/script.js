$(function(){
  var page = new Page();
  page.getLogin = function(){
    //判断用户是否登录
    if (!user().isLogin()) {
      $('#but').show();
      $('#yiLogin').hide();
    }else{
      $('#but').hide();
      $('#yiLogin').show();
    }
    if (!user().isLogin()) {
      $('#wayNotlogin').show();
      $('#qrcode').hide();
    }else{
      $('#wayNotlogin').hide();
      $('#qrcode').show();
    }
    $('#but').on('click',function(){
      user().loginOperate();
    });
    $('#wayNotlogin').on('click',function(){
      user().loginOperate();
    });
  };
  //复制的时候添加手机号和URL
  page.getUserInfo = function(){
    //获取登录的手机号
    var value = session().get('login');
    //创建a连接
    var txt3 = document.createElement("a");
    txt3.href = 'http://www.lingtouniao.com/html/user/register/?mobile=' + value;
    txt3.target = '_blank';
    txt3.innerHTML = 'http://www.lingtouniao.com/html/user/register/?mobile=' +value;
    $('#content').append(txt3);
  };
  page.copy = function(){
    $('#copy_content').zclip({
      path:'/img/ZeroClipboard.swf',
      copy:$('#content').text(),
      beforeCopy:function(){

      },
      afterCopy:function(){
        document.getElementById('copysuccess').style.display = 'block';
        document.getElementById('cover1').style.display = 'block';
        document.getElementById('closebut').onclick = function(){
          document.getElementById('copysuccess').style.display='none';
          document.getElementById('cover1').style.display = 'none';
        }
      }
    });
  };
  page.qrcode = function(){
    var numphone = session().get('login');
    url = "https://www.lingtouniao.com/h5/share.html?mobile="+numphone;
    var qrcode = new QRCode("qrcode",{
      text:url,
      width:260,
      height:260,
      colorDark:'#000',
      colorLight:'#fff',
      correctLevel:QRCode.CorrectLevel.H
    });
  };
  page.init = function(){
    page.getLogin();
    page.getUserInfo();
    page.copy();
    page.qrcode();
  }
  page.init();
});