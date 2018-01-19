
;(function(window,document){
	var StrUtil=function()
	{
		return StrUtil.fn.init();
	}
	StrUtil.fn=StrUtil.prototype={
		init : function()
		{
			return this;
		},
		/*
	 * 判断字符串是否为空
	 * @param str 传入的字符串
	 * @returns {Boolean}
	 */
	isEmpty: function(str) {
		if (str == null || typeof(str)=='undefined'||str=='') {
			return true;
		} else {
			return false;
		}
	},
	/*
	 * 判断两个字符串子否相同
	 * @param str1
	 * @param str2
	 * @returns {Boolean}
	 */
	isEquals: function(str1, str2) {
		if (str1 == str2) {
			return true;
		} else {
			return false;
		}
	},
	/*
	 * 忽略大小写判断字符串是否相同
	 * @param str1
	 * @param str2
	 * @returns {Boolean}
	 */
	isEqualsIgnorecase: function(str1, str2) {
		if (str1.toUpperCase() == str2.toUpperCase()) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 判断是否是数字
	 * @param value
	 * @returns {Boolean}
	 */
	isNum: function(str) {
		if (str != null && str.length > 0 && isNaN(str) == false) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 判断是否是中文
	 * @param str
	 * @returns {Boolean}
	 */
	isChina: function(str) {
		var reg = /^([u4E00-u9FA5]|[uFE30-uFFA0])*$/;
		if (reg.test(str)) {
			return false;
		}
		return true;
	},
	/**
	 * 转换成数组
	 * @param str
	 * @returns {array}
	 */
	toCharArray: function(str) {
		return str.split("");
	},
	/**
	 * 字符串反转
	 * @param str
	 * @returns {str}
	 */
	reverse: function(str) {
		return str.split("").reverse().join("");
	},
	/**
	 * 测试是否是整数 
	 * @param str
	 * @returns {str}
	 */
	isInt: function(str) {
		if (str == "NaN")
			return false;
		return str == parseInt(str).toString();
	},
	/**
	 * 除去左边空白  
	 * @param str
	 * @returns {str}
	 */
	lTrim: function(str) {
		return str.replace(/(^\s*)/g, "");
	},
	/**
	 * 除去右边空白  
	 * @param str
	 * @returns {str}
	 */
	rTrim: function(str) {
		return str.replace(/(\s*$)/g, "");
	},
	/**
	 * 除去两边空白  
	 * @param str
	 * @returns {str}
	 */
	trim: function(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/**
	 * Json转换成字符串  
	 * @param json
	 * @returns {str}
	 */
	json2str: function(jsonObj) {
		return JSON.stringify(jsonObj);
	},
	/**
	 * 字符串转换成Json  
	 * @param str
	 * @returns {json}
	 */
	str2json: function(str) {
		if (this.isEmpty(str)) return JSON.parse(str);
	},
	/**
	 * 字符串-获取以ASCII编码字节数 英文占1字节 中文占2字节  
	 * @param str
	 * @returns {json}
	 */
	lenASCII: function(str) {
		return str.replace(/[^\x00-\xff]/g, 'xx').length; //将所有非\x00-\xff字符换为xx两个字符,再计算字符串
	},
	/**
	 * 格式化百分比
	 * @param str
	 * @returns {str}
	 */
	formatPercent: function(str) {
		return parseFloat(str).toString();
	},
	/**
	 * 格式化千分位
	 * @param str
	 * @returns {str}
	 */
	formatKilo: function(str) {
		str = str.toString();
			if (/[^0-9\.]/.test(str)) return "invalid value";
			str = str.replace(/^(\d*)$/, "$1.");
			str = str.replace(/(\d*\.\d\d)\d*/, "$1");
			str = str.replace(".", ",");
			var re = /(\d)(\d{3},)/;
			while (re.test(str))
				str = str.replace(re, "$1,$2");
			str = str.replace(/.(\d*)$/, ".$1");
			str = str.substr(str.length - 1, 1) == '.' ? str.substring(0, str.length - 1) : str;
			if(!(/\./.test(str))){
				str+='.00';
			}
			return str.replace(/^\./, "0.");
	},
	//获取唯一机器码
	getGuid: function(){
	    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    });
	},
	//格式化姓名 小钱钱--小** 默认* punctuation传递格式化的符号
	formatName: function(str,punctuation){
		punctuation=punctuation || '*';
		var name=str.split('');
		var newName=[];
		for(var i=0;i<name.length;i++){
			if(i==0){
				newName.push(name[i]);
			}else{
				newName.push(punctuation);
			}
		}
		return newName.join('');
	},
	//格式化手机号 13522733761--135****3761
	formatPhone: function(str,punctuation){
		punctuation=punctuation||'*';
		var phone=str.split('');
		var newPhone=[];
		for(var i=0;i<phone.length;i++){
			if(i>2&&i<8){
				newPhone.push(punctuation);
			}else{
				newPhone.push(phone[i]);
			}
		}
		return newPhone.join('');
	},
	//格式化身份证 413026199008255889--413026********5889
	formatID: function(str,punctuation){
		punctuation=punctuation||'*';
		var phone=str.split('');
		var newPhone=[];
		for(var i=0;i<phone.length;i++){
			if(i>5&&i<14){
				newPhone.push(punctuation);
			}else{
				newPhone.push(phone[i]);
			}
		}
		return newPhone.join('');
	},
	//清除Html标签文本
	clearHtml: function(str){
		var reg=/<[^<>]+>/g;
		return str.replace(reg,'');
	},
	/*
	 * author toni
	 * time 20160518
	 * 金钱取万
	 */
	formatMiriade: function(money){
		var m=(parseFloat(money)/10000).toFixed();
		return m;
	},
	/**
	 * 累投金额格式化,取出亿和万
	 */
    formatMoney: function(str){
		var reg = /\,/g;
		var number=parseFloat(str.toString().replace(reg,''));
		var Num=new Object();
		Num.hundredMillion=Math.floor(number/100000000);//获取亿
		Num.kiloMillion=Math.floor(number%100000000/10000);//获取万
		return Num;
	},
	/**
	 * 平台人数格式化,取出万和单个
	 */
	formatPerson: function(str){
		var reg = /\,/g;
		var number=parseFloat(str.toString().replace(reg,''));
		var Num=new Object();
		Num.million=Math.floor(number/10000);//获取万
		Num.single=Math.floor(number%10000);//获取单个
		return Num;
	},
	/**
	 * 处理年化收益率 根据+隔开
	 * @return {[type]} [description]
	 */
	formatIncome: function(str){
		var Income={
			normal: '',
			add: ''
		};//收益率对象
		var arr=str.split('+');
		for(var i=0;i<arr.length;i++){
			if(i==0){
				Income.normal=arr[i];
			}else{
				Income.add='+'+arr[i];
			}
		}
		return Income;
	}
	}
	StrUtil.fn.init.prototye=StrUtil.fn;
	window.strUtil=StrUtil;
})(window,document);
