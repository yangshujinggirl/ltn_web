;
(function(window, document) {
	var User = function() {
		return User.fn.init();
	};
	User.fn = User.prototype = {
		init: function() {
			return this;
		},
		user: '',
		//是否登录
		isLogin: function() {
			if (!strUtil().isEmpty(session().get('sessionKey'))) {
				return true;
			} else {
				return false;
			}
		},
		//调用大数据方法
		getBigData: function(action){
			try{
        _paq.push(['trackEvent','pc',action]);
      }catch(e){
        console.log(e);
      }
		},
		//传入大数据需要的参数
		setBigDataNeed: function(index,name,value,page){
			page=page||'page';
			_paq.push(['setCustomVariable', index, name,value,page]);
		},
		//传入大数据
		setBigDataUserId:function(mobile){
			_paq.push(['setUserId', mobile]);
		},
		logoff: function() {
			session().del('sessionKey');
		},
		//是否实名
		isNameAuth: function() {
			var str = session().get('isNameAuth');
			if (!strUtil().isEmpty(str) && str == '1') {
				return true;
			} else {
				return false;
			}
		},
		//是否绑卡
		isBindCard: function() {
			var str = session().get('isBindCard');
			if (!strUtil().isEmpty(str) && str == '1') {
				return true;
			} else {
				return false;
			}
		},
		//是否开通充值免密
		isAgreementCZ: function() {
			var str = session().get('agreementCZ');
			if (!strUtil().isEmpty(str) && str == '1') {
				return true;
			} else {
				return false;
			}
		},
		//是否开通投资免密
		isAgreementTZ: function() {
			var str = session().get('agreementTZ');
			if (!strUtil().isEmpty(str) && str == '1') {
				return true;
			} else {
				return false;
			}
		},
		//测试返回码
		testResultCode: function(resultCode) {
			var str = '';
			var codes=Config.get('code');
			str=strUtil().isEmpty(codes[resultCode])?'服务器异常':codes[resultCode];
			// alert(str);
			return str;
		},
		//提交验证
		testSubmit: function(addEvent,element) {
			var element=element||$('input:not(:checkbox,:radio,:hidden),textarea');
			$.each(element, function() {
				var _this = $(this);
				var vdRow = _this.parent().parent();
				var vdTip = vdRow.find('.validation');
				var vdSuccess = 'validate-success';
				var vdFailed = 'validate-failed';
				validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, true);
				if (typeof addEvent == 'function') {
					addEvent(_this, vdRow, vdTip); //运行绑定事件
				}
			});
		},
		//是否是企业用户
		getUserType:function() {
			var str = session().get('userType');
			if (!strUtil().isEmpty(str) && str == '1') {
				return true;
			} else {
				return false;
			}
		},
		//获取用户数据,返回用户对象
		getUserInfo: function(bindEvent) {
			user().user = {
				cardId: '', //身份证
				userName: '', //用户名
				certification: '' //是否实名
			}
			var param = {
				'clientType': constant().clientType,
				'sessionKey': constant().sessionKey
			};
			$.post(constant().url + '/account/center/nameAuthInfo', param, function(data, status) {
					if (data.resultCode == '0') {
						user().user.cardId = data.data.cardId;
						user().user.userName = data.data.userName;
						user().user.certification = data.data.certification == 1 ? true : false;
						if (typeof bindEvent == 'function') {
							bindEvent(); //运行绑定事件
						}
					}
			});
		},
		//登录操作,判断是否登录,跳转不同的页面
		loginOperate: function(addEvent) {
			if (!user().isLogin()) {
				var newUrl = '/html/user/login';
				var url = urlUtil().getUrl();
				window.location.href = newUrl + '?url=' + window.location.href;
			} else {
				if (typeof addEvent == 'function') {
					addEvent(); //运行绑定事件
				}
			}
		},
		//实名操作,判断是否实名跳转页面
		nameAuthOperate: function(addEvent) {
			if (!user().isNameAuth()) {
				var newUrl = '/html/user/realname';
				var url = urlUtil().getUrl();
				window.location.href = newUrl + '?url=' + url;
			} else {
				if (typeof addEvent == 'function') {
					addEvent(); //运行绑定事件
				}
			}
		},
		//绑卡操作,判断是否绑卡跳转页面
		bindCardOperate: function(addEvent) {
			if (!user().isBindCard()) {
				var newUrl = '/html/user/card';
				var url = urlUtil().getUrl();
				window.location.href = newUrl + '?url=' + url;
			} else {
				if (typeof addEvent == 'function') {
					addEvent(); //运行绑定事件
				}
			}
		},
		//打开新页面
		goNewPage: function(param,confirmType) {
			var ss = session();
			ss.del('param');
  			ss.set('param', JSON.stringify(param));
  			ss.del('confirmType');
  			ss.set('confirmType',confirmType);
  			if (user().getUserType()) {
  				window.open('/html/about/confirm2/','_blank');
  			}else{
  				window.open('/html/about/confirm/','_blank');
  			}
		},
		//回到之前的页面 newUrl表示正常逻辑的下一步,oldUrl表示之前的页面
		goBack: function(newUrl, oldUr) {
			var url = oldUr || decodeURIComponent(urlUtil(location.href).get('url'));
			if (strUtil().isEmpty(url)) {
				location.href = newUrl;
			} else {
				location.href = url;
			}
		},
		//获取用户信息
		updateUserType: function(addEvent) {
			$.post(constant().url+ '/company/check',
			{
				clientType:'PC',
				sessionKey:constant().sessionKey
			}, function(data) {
					if (data.resultCode == '0') {
						session().set('userType', data.data.guestType);
						session().set('userStatus', data.data.status);
						// alert('1');
					}
			});
		},
		//获取用户信息
		updateUserInfo: function(addEvent) {
			var page=new Page();
			//把用户的实名信息,绑卡信息,充值协议，投资协议存储
			page.getData(
				'/pc/user/info', {}, [initInfo]);

			/**
			 * init crumb template
			 */
			function initInfo(data) {
				if (page.isSuccess(data)) {
					session().set('agreementCZ', data.data.agreementCZ);
					session().set('agreementTZ', data.data.agreementTZ);
					session().set('isBindCard', data.data.isBindCard);
					session().set('isNameAuth', data.data.isNameAuth);
					// session().set('login', data.data.mobileNo);
					session().set('userName', data.data.userName);
					if (typeof addEvent == 'function') {
						addEvent(); //运行绑定事件
					}
				} else {
					var str = user().testResultCode(data.resultCode);
				}
			}
		},
		setCookie:function (c_name,value,expiredays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie=c_name+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/"
		},
		getCookie:function (c_name){
			if (document.cookie.length>0){
			  c_start=document.cookie.indexOf(c_name + "=")
			  if (c_start!=-1){
			    c_start=c_start + c_name.length+1
			    c_end=document.cookie.indexOf(";",c_start)
			    if (c_end==-1) c_end=document.cookie.length
			    return unescape(document.cookie.substring(c_start,c_end))
			    }
			  }
			return ""
		},
		//节点统计代码
		clickEvent:  function() {
    	// _czc.push(["_trackEvent","nav","click"]);
    }
	};
	User.fn.init.prototype = User.fn;
	window.user = User;
})(window, document);
