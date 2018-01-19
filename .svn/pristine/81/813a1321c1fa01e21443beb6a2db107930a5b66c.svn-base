
;(function(window, documet) {
	var Session = function() {
		return Session.fn.init();
	};
	Session.fn = Session.prototype = {
		init: function()
		{
			return this;
		},
		_key: function(key) {
			return "ltn_" + key;
		},
		get: function(key) {
			return sessionStorage.getItem(this._key(key));
		},
		set: function(key, val) {
			return sessionStorage.setItem(this._key(key), val);
		},
		del: function(key) {
			return sessionStorage.removeItem(this._key(key));
		},
		clear: function() {
			return sessionStorage.clear();
		},
		setCookie:function(name, value){
			var domain;
			if(window.location.host.indexOf('lingtouniao.com') != -1){
				 domain='lingtouniao.com'
			}else{
				 domain = window.location.host
			}
		  if (typeof name === 'undefined') {
		    throw new Error('cookie name must be not undefined');
		  } else {
		    Cookies.set(name,value,{ domain: domain});
		  }
		}
	}

    Session.fn.init.prototype = Session.fn;
    window.session = Session;
})(window, document);
