/*
 * @Author:L.Tap
 * @Description: 社会化分享
 */
;
(function($, window, document, undefined) {
    //插件初始化
    function init(target, options) {
        var settings = $.extend({}, $.fn.socialShare.defaults, options);
		//初始化各个组件
        var $social_group = "<div class='social_group'>"
		+ "<a target='_blank' class='msb_network_button weixin'>weixin</a>"
		+ "<a target='_blank' class='msb_network_button sina'>sina</a>"
    + "<a target='_blank' class='msb_network_button qZone'>qZone</a>"
		+ "<a target='_blank' class='msb_network_button tQQ'>tQQ</a>"
		+ "</div>";
        $(target).append($social_group);
        $(target).addClass("socialShare");

  $('.social_group .weixin').mouseenter(function(){
    $(this).css('margin-top','-10px');
  });
  $('.social_group .weixin').mouseleave(function(){
    $(this).css('margin-top','0');
  });

  $('.social_group .sina').mouseenter(function(){
    $(this).css('margin-top','-10px');
  });
  $('.social_group .sina').mouseleave(function(){
    $(this).css('margin-top','0');
  });

  $('.social_group .qZone').mouseenter(function(){
    $(this).css('margin-top','-10px');
  });
  $('.social_group .qZone').mouseleave(function(){
    $(this).css('margin-top','0');
  });

  $('.social_group .tQQ').mouseenter(function(){
    $(this).css('margin-top','-10px');
  });
  $('.social_group .tQQ').mouseleave(function(){
    $(this).css('margin-top','0');
  });
		//添加腾讯微博分享事件
		$(document).on("click",".msb_network_button.tQQ",function(){
			tQQ(this,settings);
		});
		//添加QQ空间分享事件
		$(document).on("click",".msb_network_button.qZone",function(){
			qZone(this,settings);
		});
		//添加新浪微博分享事件
		$(document).on("click",".msb_network_button.sina",function(){
			sinaWeibo(this,settings);
		});



    }

	function replaceAPI (api,options) {
		api = api.replace('{url}', options.url);
		api = api.replace('{title}', options.title);
		api = api.replace('{content}', options.content);
		api = api.replace('{pic}', options.pic);

		return api;
	}

	function tQQ(target,options){
	    var options = $.extend({}, $.fn.socialShare.defaults, options);

		window.open(replaceAPI(tqq,options));
	}

	function qZone(target,options){
		var options = $.extend({}, $.fn.socialShare.defaults, options);

		window.open(replaceAPI(qzone,options));
	}

	function sinaWeibo(target,options){
		var options = $.extend({}, $.fn.socialShare.defaults, options);

		window.open(replaceAPI(sina,options));
	}

    $.fn.socialShare = function(options, param) {
        if(typeof options == 'string'){
		    var method = $.fn.socialShare.methods[options];
			if(method)
				return method(this,param);
		}else
			init(this,options);
    }


    //插件默认参数
    $.fn.socialShare.defaults = {
        url: 'https://www.lingtouniao.com/html/user/register/',
        title: document.title,
        content: '我在领投鸟玩理财，年化收益率最高18%，期限灵活，现在注册就送10000元体验金，你也玩一下吧！',
        /*pic: Config.get('baseUrl')+'/img/xiaoniao-2.png',*/
    }

	//插件方法
	$.fn.socialShare.methods = {
		//初始化方法
		init:function(jq,options){
			return jq.each(function(){
				init(this,options);
			});
		},
		tQQ:function(jq,options){
			return jq.each(function(){
				tQQ(this,options);
			})
		},
		qZone:function(jq,options){
			return jq.each(function(){
				qZone(this,options);
			})
		},
		sinaWeibo:function(jq,options) {
			return jq.each(function(){
				sinaWeibo(this,options);
			});
		},
	}


	//分享地址
	var qzone = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pic={pic}&content={content}';
	var sina = 'http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false';
	var tqq = 'http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&content={content}&pic={pic}&appkey=801cf76d3cfc44ada52ec13114e84a96';

})(jQuery, window, document);
