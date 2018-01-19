$(function(){
  var page =new Page();
  
  //复制的时候添加url和手机号@author wang 2016/5/9
  page.geturl = function(){
   //获取登录的手机号
   var value = session().get('login');
   //创建a元素
   var txt3=document.createElement("a");
   txt3.href = 'https://www.lingtouniao.com/html/user/register/?mobile='+value;
   txt3.target = '_blank';
   txt3.innerHTML='https://www.lingtouniao.com/html/user/register/?mobile='+value;
   $('#content').append(txt3);
   // $('#contentcopy').href = 'https://www.lingtouniao.com/html/user/register/?mobile='+value;
  }

  page.copy = function () {
    $("#copy-content").zclip({
        path:'/img/ZeroClipboard.swf',
        copy:$('#content').text(),
        beforeCopy:function(){
            //some code
        },
        afterCopy:function(){
            //some code
            document.getElementById('copysuccess').style.display='block';
		    document.getElementById('closebut').onclick=function(){
		      document.getElementById('copysuccess').style.display='none';
		    }
        }
    });
	 //beforeCopy afterCopy 是可选项
    
    $('.common').mouseenter(function(){
        $('.common .detail').toggle();
        $('.peple1').css("border-color","#ea5504")
    })
    $('.common').mouseleave(function(){
        $('.common .detail').toggle();
        $('.peple1').css("border-color","#fff")
    })
    $('.gold').mouseenter(function(){
        $('.gold .detail').toggle();
        $('.peple2').css("border-color","#ea5504")
    })
    $('.gold').mouseleave(function(){
        $('.gold .detail').toggle();
        $('.peple2').css("border-color","#fff")
    })
    $('.continued').mouseenter(function(){
        $('.peple3').css("border-color","#ea5504")
    })
    $('.continued').mouseleave(function(){
        $('.peple3').css("border-color","#fff")
    })
  }

  page.leftnav = function(){
      var pn = $('#accounttitle').data('content');
      var as = $('#leftnav .item');
      for (var i = 0, j = as.length; i < j; i++)
        if (as[i].href.indexOf(pn) != -1) {
          as[i].className = 'selected item';
      }
  };
  page.qrcode = function(){
    var numphone = session().get('login');
    url = "https://www.lingtouniao.com/v2/h5/share.html?mobile="+numphone;

    var qrcode = new QRCode("qrcode", {
      text: url,
      width: 118,
      height: 118,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });

  }

  page.init = function(){
    page.setTitle('我是合伙人');
    page.geturl();
    page.copy();
    // page.leftnav();
    page.qrcode();
  },

  page.init();

})


