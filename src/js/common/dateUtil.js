;
(function(window, document) {
	var DateUtil = function() {
		return DateUtil.fn.init();
	};
	DateUtil.fn = DateUtil.prototype = {
		newTime: '', //当前时间
		millSecond: '',//当前日期转换成的毫秒数
		init: function() {
			this.newTime = new Date();
			this.millSecond = Date.now();
			return this;
		},
		//获取年份 如2015
		getFullYear: function() {
			return this.newTime.getFullYear();
		},
		//获取年份 如115
		getYear: function() {
			return this.newTime.getYear();
		},
		//获取月份 返回0-11 0表示一月 11表示十二月
		getMonth: function() {
			return this.newTime.getMonth();
		},
		//获取星期几  返回的是0-6的数字，0 表示星期天
		getWeek: function() {
			return this.newTime.getDay();
		},
		//获取当天日期
		getDate: function() {
			return this.newTime.getDate();
		},
		//获取小时数
		getHours: function() {
			return this.newTime.getHours();
		},
		//获取分钟数
		getMinutes: function() {
			return this.newTime.getMinutes();
		},
		//获取秒数
		getSeconds: function() {
			return this.newTime.getSeconds(); //获取秒数
		},
		/**
 * 日期格式化：
 * formatStr：可选，格式字符串，默认格式：yyyy-MM-dd hh:mm:ss
 * 约定如下格式：
 * （1）YYYY/yyyy/YY/yy 表示年份
 * （2）MM/M 月份
 * （3）W/w 星期
 * （4）dd/DD/d/D 日期
 * （5）hh/HH/h/H 时间
 * （6）mm/m 分钟
 * （7）ss/SS/s/S 秒
 * （8）iii 毫秒
 */

		formatDate: function(formatStr) {
			var str = formatStr;
			if (!formatStr) {
				str = "yyyy-MM-dd hh:mm:ss"; //默认格式
			}
			var Week = ['日', '一', '二', '三', '四', '五', '六'];
			str = str.replace(/yyyy|YYYY/, this.getFullYear());
			str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));
			str = str.replace(/MM/, this.getMonth() >= 9 ? (parseInt(this.getMonth()) + 1).toString() : '0' + (parseInt(this.getMonth()) + 1));
			str = str.replace(/M/g, (parseInt(this.getMonth()) + 1));
			str = str.replace(/w|W/g, Week[this.getWeek()]);
			str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
			str = str.replace(/d|D/g, this.getDate());
			str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
			str = str.replace(/h|H/g, this.getHours());
			str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
			str = str.replace(/m/g, this.getMinutes());
			str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
			str = str.replace(/s|S/g, this.getSeconds());
			str = str.replace(/iii/g, this.millSecond < 10 ? '00' + this.millSecond : (this.millSecond < 100 ? '0' + this.millSecond : this.millSecond));
			return str;
		},
		/**
		 * 判断闰年 ：一般规律为：四年一闰，百年不闰，四百年再闰。
		 */
		isLeapYear: function(str) {
			return (str % 4 == 0 && ((str != 0) || (str % 400 == 0)));
		}
	};
	DateUtil.fn.init.prototype=DateUtil.fn;
	window.dateUtil=DateUtil;
})(window, document);