/*************************************************
 * Notice: this obj depends on ajax.js & config.js
 *************************************************/

function Page() {
  this.baseUrl = Config.get('baseUrl');
  this.prop = {};
  this.successCode = "0";
}

Page.prototype.setTitle = function (title) {
  document.getElementsByTagName("title")[0].innerHTML = title;
};

/**
 * Return whether the server response OK
 */
Page.prototype.isSuccess = function (data,show) {
  if(typeof(show)=='undefined'){
    show=true;
  }
	var code=data.resultCode;
  var b=code=== this.successCode;
  var str;
  if(b){
  	return true;
  }else{
  	str=user().testResultCode(code);
  	if(code=='10000006'||code=='10000005'){
  		session().clear();
  		user().loginOperate();
  	}else{
      if(show){
        alert(str);
      }
  	}
  }
};

/**
 * Return the error message from server
 */
Page.prototype.getErrorMessage = function (data) {
  console.log(data.resultMessage);
  return data.resultMessage;
};

/**
 * init template inner html
 */
Page.prototype.initTemplate = function (data, conId, tempId) {
  var container = document.getElementById(conId),
    temp = document.getElementById(tempId),
    tempHtml = temp.innerHTML;

  container.innerHTML = doT.template(tempHtml)(data || {});
};

Page.prototype.when = function (before, after) {
  after = after || [];
  if (Object.prototype.toString.call(after) === '[object Function]') {
    after = [after];
  }
  var dtd = $.when(before());

  var length = after.length;
  var index = 0;

  for (;index < length; index++) {
    dtd = dtd.done(after[index]);
  }
};

/**
 * get data from server and call fail/success function by sequence
 */
Page.prototype.getData = function (url, param, done, fail) {
  if (url.indexOf(this.baseUrl) < 0) {
    url = this.baseUrl + url;
  }

  // add default param value for request
  param = param || {};
  param.clientType = param.clientType || 'PC';
  param.sessionKey = param.sessionKey || constant().sessionKey||Url.getSearchParts('token');

  var dtd = Ajax.request(url, param);
  dtd = callFail(dtd, fail);
  dtd = callDone(dtd, done);

  function callDone (dtd, done) {
    done = done || [];
    if (Object.prototype.toString.call(done) === '[object Function]') {
      done = [done];
    }

    var length = done.length;
    var index = 0;

    for (;index < length; index++) {
      dtd = dtd.done(done[index]);
    }

    return dtd;
  }

  function callFail (dtd, fail) {
    fail = fail || [];
    if (Object.prototype.toString.call(fail) === '[object Function]') {
      fail = [fail];
    }

    var length = fail.length;
    var index = 0;

    for (;index < length; index++) {
      dtd = dtd.fail(fail[index]);
    }

    return dtd;
  }

  return dtd;
};

Page.prototype.showDialog = function(selector) {

  var __pageDialog__ = this.get('__pageDialog__');
  if (__pageDialog__) {
    this.hideDialog(__pageDialog__);
  }

  var dialog = $(selector),
    cover = $('.common-cover');

  dialog.addClass('show');
  cover.addClass('show');

  this.set('__pageDialog__', selector);
};

Page.prototype.hideDialog = function(selector) {
  var dialog = $(selector),
    cover = $('.common-cover');

  dialog.removeClass('show');
  cover.removeClass('show');

  this.set('__pageDialog__', undefined);
};

Page.prototype.set = function (key, val) {
  this.prop[key] = val;
  return val;
};

Page.prototype.get = function (key) {
  return this.prop[key];
};

Page.prototype.validateFail = function () {

};

Page.prototype.post = function (dist, param) {
  var ss = session();
  ss.del('__postData__');
  ss.set('__postData__', JSON.stringify(param));
  location.href = dist;
};

Page.prototype.getPostData = function () {
  var ss = session();
  var data = JSON.parse(ss.get('__postData__'));
  return data;
};

Page.prototype.getConfirmData = function () {
  var ss = session();
  var data = JSON.parse(ss.get('param'));
  return data;
};
Page.prototype.jump = function(url, hash) {
  if (hash) {
    if (Object.prototype.toString.call(hash) !== '[object Array]') {
      hash = [hash];
    }
    hash.unshift(Config.get('baseHash'));
    url += hash.join('/');
  }
  location.href = url;
}



//************************************************
$(function(){
  //跳转账户中心
  $('#viewall').on('click',function(){
    if(user().isLogin()){
      window.location.href='/html/account/viewall';
    }else{
      var backUrl  = window.location.origin+"/html/account/viewall";
      // 生产环境
      if(window.location.href.indexOf('lingtouniao.com') != -1){
        window.location.href= "http://www.lingtouniao.com/html/user/login?url="+backUrl;
      // 测试环境
      }else{
        window.location.href= "http://192.168.18.194:1950/html/user/login?url="+backUrl;
      }
      // window.location.href='/html/user/login?url=/html/account/viewall';
    }
  });

	//绑定登录跳转事件
	$('#loginLink').on('click',function(){
    var url=urlUtil().getUrl();
    if(!(url.indexOf('login')>-1)){
      window.location.href='/html/user/login?url='+window.location.href;
    }else{
      window.location.href='/html/user/login?url='+window.location.origin;
    }
  })
  //退出登录
  $('.commonNavTop .logoff').on('click', function() {
    (new Page()).getData(
      '/user/login/logout',
      {},
      [user().logoff, refreshHeader, jumpHome]);
  });
  //logo跳转
  $('#logo').on('click',function(){
    window.location.href='/';
  });

  //处理头部
  function refreshHeader() {
    var token = Url.getSearchParts('token');
    if(token&&token!='') {
      session().set('sessionKey', token);
      user().updateUserInfo(headShow);
    } else {
      headShow();
    }
    function headShow() {
      if (user().isLogin()) {
        if(user().isNameAuth()){
          $('.commonNavTop .right').addClass('logon');
          $('.commonNavTop .welcome').text('欢迎您，'+ (session().get('userName')));
        }else{
          $('.commonNavTop .right').addClass('logon');
          $('.commonNavTop .welcome').text('欢迎您，'+ (session().get('login')));
          console.log(session().get('login'));
        }
      }else {
        $('.commonNavTop .right').removeClass('logon');
        $('.commonNavTop .welcome').text('');
      }
    }
  }
  refreshHeader();
  function jumpHome() {
    // 生产环境
    // if(window.location.href.indexOf('lingtouniao') != -1){
    //     window.location.href= "http://bbs.lingtouniao.com/login.html?backUrl=//www.lingtouniao.com&uid";
    // }else{
    //   // 测试环境
    //   window.location.href= "http://192.168.18.7:8888/login.html?backUrl=//192.168.18.194:1950&uid"
    // }

    (new Page()).jump(Config.get('homePath') + 'user/login/');
  }
});
