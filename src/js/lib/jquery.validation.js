(function($){

  $.fn.validation = function (type) {

    switch (type) {
      case 'number':
        break;
      case 'string':
        break;
      default :
    }

  }

  var defValidate = {
    isEmpty: function() {
      var args = arguments;
      return !args[0];
    }
  };

  var numValidate = $.extend(defValidate, {
    isNumber: function() {
      var args = arguments;
      return !this.isEmpty(args[0]) && !isNaN(args[0]);
    },
    isGreater: function() {
      var args = arguments;
      return this.isNumber(args[0]) && (+args[0] > +args[1]);
    },
    isLess: function() {
      var args = arguments;
      return this.isNumber(args[0]) && (+args[0] < +args[1]);
    },
    isInteger: function() {
      var args = arguments;
      return this.isNumber(args[0]) && (args[0] % 1 === 0);
    },
    isFloat: function() {
      var args = arguments;
      return !this.isInteger(args[0]);
    }
  });

  var strValidate = $.extend(defValidate, {
    isEmail: function() {
      var reg = /^([\.a-zA-Z0-9_-])@([a-zA-Z0-9_-])(\.[a-zA-Z0-9_-])+/;
      return !this.isEmpty(args[0]) && reg.test(args[0]);
    },
    isMobile: function() {
      var reg = /^(13|15|18)\d{9}$/;
      return !this.isEmpty(args[0]) && reg.test(args[0]);
    },
    isId: function() {
      var reg = /^(\d{17})(\d|x|X)$/;
      return !this.isEmpty(args[0]) && reg.test(args[0]);
    }
  });

})(jQuery);