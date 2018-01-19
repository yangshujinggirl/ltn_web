;(function(window, document) {
	var Template = function() {
		return Template.fn.init();
	}
	Template.fn = Template.prototype = {
		init: function() {
			return this;
		},
		/**
		 * 渲染模板的方法 
		 * @param templateId(模板ID) elementId(元素ID) data(数据)
		 * @returns {null}
		 */
		renduTemplate: function(templateId, elementId, data) {
			var template = document.getElementById(templateId).innerHTML;
			document.getElementById(elementId).innerHTML = doT.template(template)(data);　
		}
	};
	Template.fn.init.prototype=Template.fn;
	window.template=Template;
})(window, document);