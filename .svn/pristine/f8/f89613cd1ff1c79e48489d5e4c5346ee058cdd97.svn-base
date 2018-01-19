;(function (window, document) {
  var Constant = function () {
    return Constant.fn.init();
  };
  Constant.fn = Constant.prototype = {
    // url:  '/api',
    // url:  'http://192.168.18.191:1950',
    // url:  'http://192.168.18.191:28080',
    // url: 'http://120.55.184.234',
    url: '/api',
    // url: 'https://www.lingtouniao.com',
    dataUrl: 'https://log.lingtouniao.cn/',
    // url: 'https://www.lingtouniao.com',
    //dataUrl:'http://192.168.18.210/',
    // dataUrl:'https://log.lingtouniao.cn/',
    sessionKey: '',
    param: '',
    clientType: 'PC',
    init: function () {
      this.sessionKey = session().get('sessionKey');
      this.param = {'clientType': 'PC', 'sessionKey': this.sessionKey};
      return this;
    }
  };
  Constant.fn.init.prototype = Constant.fn;
  window.constant = Constant;
})(window, document);
