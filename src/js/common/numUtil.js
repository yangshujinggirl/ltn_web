;(function(window,document){
	var NumUtil=function()
	{
		return NumUtil.fn.init();
	}
	NumUtil.fn=NumUtil.prototype={
		init: function()
		{
			return this;
		},
		//返回0到num之间的数字，不包括num
		getRandom: function(num){
			return parseInt(Math.random()*num);
		}
	};
	NumUtil.fn.init.prototype=NumUtil.fn;
	window.numUtil=NumUtil;
})(window,document);
