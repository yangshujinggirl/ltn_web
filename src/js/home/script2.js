$(function() {
	var page=new Page();
  var dept = Url.getSearchParts('dept');
	var Application = {
		//判断是否登录
		isLogin: function() {
			return user().isLogin();
		},
    //获取平台数据的模板渲染
    getPlatform: function(){
      $.post(constant().url + '/pc/homepage/ptdata/get',{clientType:'PC'},
        function(data, status){
          if (status == "success") {
            if (data.resultCode == '0') {
              var obj = data.data;
              template().renduTemplate('tempPlatform','propAdd',obj);
            }
          }
        });
    },
	//获取最新公告
    getNotice: function(data) {
      $.post(constant().url + '/pc/announcement/last', {clientType:'PC',type:'1'}, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            var obj = data.data.lastAnnouncement;
            //调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
            template().renduTemplate('tempNotice', 'noticeDetail', obj);
            // Application.getLunbo();
            //最新公告点击提交数据到详情页
            /*var id=$(this).attr('data-id');
            var type=$(this).attr('data-type');*/
            $('#noticeDetail').on('click',function(){
              var postData={
                title: obj.title,
                id: obj.id,
                publishTime: obj.publishTime,
                content: obj.content,
                type:obj.type
            }
            	page.post('/html/about/noticedetail?id='+obj.id+'&type='+obj.type,postData);
            });
          }else{
          	var str=user().testResultCode(data.resultCode);
          	alert(str);
          }
        }
      });
    },
    //获取最新媒体
    getNews: function() {
      $.post(constant().url + '/pc/announcement/last', {clientType:'PC',type:'2'}, function(data, status) {
        if (status == "success") {
          if (data.resultCode == '0') {
            var obj = data.data.lastAnnouncement;
            //调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
            template().renduTemplate('tempNews', 'newsDetail', obj);
            // Application.getLunbo();
            //新闻点击提交数据到详情页
            var postData={
            		title: obj.title,
            		id: obj.id,
            		publishTime: obj.publishTime,
            		content: obj.content,
                fromUrl: obj.fromUrl
            }
            $('#newsDetail').on('click',function(){
            	page.post('/html/about/newsdetail?id='+obj.id+'&type='+obj.type,postData);
            });
          }else{
          	var str=user().testResultCode(data.resultCode);
          	alert(str);
          }
        }
      });
    },
    //轮播
    getLunbo: function(){
      var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay:2000,
        loop:true
      });
    },
    //banner的数据模板渲染
    banner:function(){
       $.post(constant().url+'/index/homepage/banner',{'clientType': 'PC','sessionKey':constant().sessionKey,'location':'banner'},function(data,status){
          if (status == "success") {
            if (data.resultCode == '0') {
              var obj=data.data.bannerList;
              console.log(obj);
              template().renduTemplate('tempSwiper','swiper',obj);
              Application.locationGo();
            }
            Application.getLunbo();
          }
       });
    },
		//获取体验,新手标数据
		getTYB: function() {
			$.post(constant().url + '/index/newProduct', constant().param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						//创建数组,把体验标和新手标分别加入
						 var obj = [];
            var data = data.data;
						 // obj.push(data.data.tyb);
					  //  obj.push(data.data.xsb);
						//调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
						template().renduTemplate('templateTYBAndXSB', 'ProdTYBAndXSB', data);
						Application.locationGo();
            Application.clickEvent();
						Application.advGo();
					}
				}
			});
		},
    //登录之后的状态显示
    getLogin:function(){
          if (user().isLogin()) {
            $.post(constant().url + '/user/totalAccount',constant().param, function(data,status){
              if (status == "success") {
                if (data.resultCode == '0') {
                  var obj = data.data;
                  template().renduTemplate('tempInfo','propInfo',obj);
                  Application.locationGo();
                }
              }
            });
            $('.info').addClass('selected');
          }else{
            $('.dialog').addClass('selected');
          }
    },
		//获取随心投数据
		/*getSXT: function() {
			$.post(constant().url + '/index/current', constant().param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						//获取随心投数据 
						var obj = data.data.sxt;
						//调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
						template().renduTemplate('templateSXT', 'ProdSXT', obj);
						Application.locationGo();
					}　
				}
			});
		},*/
		//获取乐巢投数据
		getLCT: function() {
			$.post(constant().url + '/index/shortProduct', constant().param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						//获取乐巢投数据 
						var obj = data.data.shortList;
						//调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
						template().renduTemplate('templateLCT', 'prodLCT', obj);
						Application.locationGo();
					}　
				}
			});
		},
		//获取乐巢投系列数据
		getLCTXL: function() {
			$.post(constant().url + '/index/longProduct', constant().param, function(data, status) {
				if (status == "success") {
					if (data.resultCode == '0') {
						//获取乐巢系列投数据
						var obj = data.data.longList;
						//调用渲染模板的方法,第一参数为模板id,第二参数为内容id,第三参数为渲染数据
						template().renduTemplate('templateLCTXL', 'prodLCTXL', obj);
						Application.locationGo();
					}　
				}
			});
		},
		//首页路径跳转
		locationGo: function() {
			$('.list .item,.wrap>.item,.prod .item1').on("click", function() {
        event.stopPropagation();
				var url = $(this).attr('data-url');
				location.href = url;
			});
      $('.action').mouseover(function(){
        $(this).find('.iconjieshu').hide();
        $(this).find('.blueIcon').show();
        $(this).find('.tankuang').show();
      });
      $('.action').mouseout(function(){
        $(this).find('.iconjieshu').show();
        $(this).find('.blueIcon').hide();
        $(this).find('.tankuang').hide();
      });
		},
    //新手标tap切换
    clickEvent: function(){
      var num = 0;

      function next(){
        event.stopPropagation();
        num++;
        if(num>1) {
          num=0;
        }
        $('.xsbList').stop().animate({'left':-num*790});
      };

      $('#leftBtn').on('click',next);
      $('#rightBtn').on('click',next);
      setInterval(function(){
        num++;
        if(num>1) {
          num=0;
        }
        $('.xsbList').animate({'left':-num*790});
      }, 5000)
    },
		//adv
		advGo: function() {
			$('.wrap>.item .adv').on("click", function(event) {
				var url = $(this).data('content');
				location.href = url;
				event.stopPropagation();
			});
		},
    mather:function(){
      var data={"title":"关于母亲节活动奖励的公告","id":300020,"publishTime":"2016-05-09","content":"<p><br/></p><p style=\"text-indent:28px\"><strong><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif\">尊敬的投资人：</span></strong><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif\"><br/></span></p><p style=\"text-indent:28px\"><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif\"><br/></span></p><p style=\"text-indent:28px\"><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif\">“时间，为爱正名——领投鸟陪妈妈过节”活动已圆满结束，截止5月8日24点，平台累投前三名如下：</span></p><table cellpadding=\"0\" cellspacing=\"0\" width=\"380\"><colgroup><col style=\"width:72px\" width=\"72\"/><col style=\";width:115px\" width=\"115\"/><col style=\"width:72px\" width=\"72\"/><col style=\";width:121px\" width=\"121\"/></colgroup><tbody><tr class=\"firstRow\" style=\";height:31px\" height=\"31\"><td style=\"\" height=\"31\" width=\"72\"><br/></td><td style=\"\" width=\"115\">账户</td><td style=\"\" width=\"72\">姓名</td><td style=\"\" width=\"121\">累投金额</td></tr><tr style=\"height:23px\" height=\"23\"><td style=\"\" height=\"23\" width=\"72\">第一名</td><td style=\"\" width=\"115\">1380586****</td><td style=\"\" width=\"72\">应**</td><td style=\"\" width=\"121\">935,000 元</td></tr><tr style=\"height:23px\" height=\"23\"><td style=\"\" height=\"23\" width=\"72\">第二名</td><td style=\"\" width=\"115\">1364660****</td><td style=\"\" width=\"72\">葛**</td><td style=\"\" width=\"121\">427,000 元</td></tr><tr style=\"height:23px\" height=\"23\"><td style=\"\" height=\"23\" width=\"72\">第三名</td><td style=\"\" width=\"115\">1516851****<span style=\"\">&nbsp;</span></td><td style=\"\" width=\"72\">崔*</td><td style=\"\" width=\"121\">311,310 元</td></tr></tbody></table><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"><br/></span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">恭喜以上获奖用户，请您保持联系方式畅通，我们将尽快与您沟通发奖事宜。</span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"><br/></span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">另有157位用户参与送祝福活动，获得母亲节幸运奖励（58元现金券），奖励将在3个工作日之内送达您的账户，请留意查收。</span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"><br/></span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">*</span><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">以上活动最终解释权归领投鸟平台所有。</span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"><br/></span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">*</span><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\">如有任何疑问，请联系客服热线<strong>400-999-9980</strong>或微信公众号<strong>“领投鸟“</strong></span></p><p><br/><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"></span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"></span></p><p><span style=\"font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;\">市场部</span></p><p><span style=\"font-family:&#39;微软雅黑&#39;,&#39;sans-serif&#39;\">2016年5月9日</span></p><p><span style=\";font-family:&#39;微软雅黑&#39;,sans-serif;color:black\"><strong><br/></strong></span><br/></p>"};
       session().set('__postData__', JSON.stringify(data));
    },
		//初始化方法
		init: function() {
      page.setTitle('领投鸟理财-不动产理财颠覆者-首页');
      Application.banner();
      Application.getNews();
      Application.getNotice();
			Application.getTYB(); //初始化体验,新手标数据
			/*Application.getSXT();*/ //初始化随心投数据
			Application.getLCT(); //初始化乐巢投数据
			Application.getLCTXL(); //初始化乐巢投系列数据
			Application.locationGo(); //绑定首页路径跳转
      Application.getLogin();
      Application.mather();
      Application.clickEvent();
      Application.getPlatform();
      session().set('dept',dept);
		}
	};
	window.application = Application;
	application.init(); //初始化

	// init slides in banner
	// var slider = $('.home-banner .slides').unslider({
	//   autoplay: true,
	//   arrows: false
	// });
	//注册链接跳转
	$('#homeRegister').on('click', function() {
		window.location.href = '/html/user/register';
	});
	//登录链接跳转
	$('#homeLogin').on('click', function() {
		window.location.href = '/html/user/login?url=' + urlUtil().getUrl();
	});
	//右侧导航事件
/*	$('.one').mouseover(function() {
		$('.daezc').show();
		$('.qianbao').hide();
	})*/
	$('.one').mouseout(function() {
		$('.daezc').hide();
		$('.qianbao').show();
	})

/*	$('.two').mouseover(function() {
		$('.app').show();
		$('.ewm1').show();
		$('.shouji').hide();
	})
	$('.two').mouseout(function() {
		$('.app').hide();
		$('.ewm1').hide();
		$('.shouji').show();
	})*/

	$('.three').mouseover(function() {
		$('.weixin').show();
		$('.ewm2').show();
		$('.code1').hide();
	});
	$('.three').mouseout(function() {
			$('.weixin').hide();
			$('.ewm2').hide();
			$('.code1').show();
		});
  //赎楼业务介绍
  var ImgsOne = ['/img/index_1-1.png','/img/index_2-2.png','/img/index_3-3.png','/img/index_4-4.png'];
      ImgsTwo = ['/img/index_1.png','/img/index_2.png','/img/index_3.png','/img/index_4.png'];
  $('.stepList .item1').hover(function(){
    var i=$(this).index();
    $(this).find('.item2').show();
    $(this).find('img').attr('src',ImgsOne[i]);
  },function(){
    var i=$(this).index();
    $(this).find('.item2').hide();
    $(this).find('img').attr('src',ImgsTwo[i]);
  })

});