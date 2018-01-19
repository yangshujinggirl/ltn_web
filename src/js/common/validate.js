;
(function(window, document) {
	/*
	 表单类型：data-type
	 验证为空：data-required 默认为空
	 为空提示：data-emptyTip
	 错误提示：data-errorTip
	 金额为0提示：data-zeroTip
	 username;只能输入5-20个以字母开头、可带数字、“_”、“.”的字串 
	 password;只能输入6-18个字母与数字的组合,没有特殊字符
	 telephone:手机号码
	 identity: 身份证
	 email：邮件
	 url: 网址
	 codeImg: 验证码
	 bankcard: 银行卡
	 money: 金钱
	 data-ceiling新手标最大值
	 */
	//验证对象
	var Validate = function() {
		return Validate.fn.init();
	};
	Validate.fn = Validate.prototype = {
		usernameRegex: '',
		passwordRegex: '',
		telephoneRegex: '',
		emailRegex: '',
		urlRegex: '',
		identityRegex: '',
		codeImgRegex: '',
		bankCardRegex: '',
		numberRegex: '',
		moneyRegex: '',
		_this: '',
		vdRow: '',
		vdTip: '',
		vdSuccess: '',
		vdFailed: '',
		init: function() {
			this.usernameRegex = /^[\u4e00-\u9fa5]{2,4}$/;
			this.passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
			this.telephoneRegex = /^1[3|4|5|7|8][0-9]{9}$/;
			this.emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
			this.urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
			this.identityRegex=/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
			this.codeImgRegex=/^\w{6}$/;
			this.codePhoneRegex=/^\d{4}$/;
			this.bankCardRegex=/^\d{12,19}$/;
			this.numberRegex=/^[0-9]{1}\d*$/;
			this.moneyRegex=/^[0-9]{1}[\d]*\.?[\d]{0,2}$/;
			return this;
		},
		success: function(tip) {
			this.vdRow.addClass(this.vdSuccess).removeClass(this.vdFailed);
			this.vdTip.html(tip);
		},
		error: function(tip) {
			this.vdRow.addClass(this.vdFailed).removeClass(this.vdSuccess);
			this.vdTip.html(tip);
		},
		//验证方法
		vd: function(_this, vdRow, vdTip, vdSuccess, vdFailed,isSubmit) {
			this._this = _this;
			this.vdRow = vdRow;
			this.vdTip = vdTip;
			this.vdSuccess = vdSuccess;
			this.vdFailed = vdFailed;
			var isSubmit=isSubmit;
			var val = $.trim(_this.val());
			var emptyTip = _this.attr("data-emptyTip"); //用户输入的为空提示文字
			var errorTip = _this.attr('data-errorTip'); //用户输入错误的提示文字
			//输入金额为0时错误提示;
			var zeroTip = _this.attr('data-zeroTip');
			var required = _this.data('required'); //是否必填，默认验证;
			//新手标期限小于10天时投资最大为10000元
			var firstTZ = _this.attr('data-ceiling');
			var type = _this.data('type'); //输入框类型
			var testRegex=new RegExp(); //哪个正则验证规则
			switch (type) {
				case 'username': //username
					testRegex = this.usernameRegex;
					break;
				case 'password': //password
					testRegex = this.passwordRegex;
					break;
				case 'email': //email
					testRegex = this.emailRegex;
					break;
				case 'url': //url
					testRegex = this.urlRegex;
					break;
				case 'telephone': //telephone
					testRegex = this.telephoneRegex;
					break;
				case 'identity': //身份证
					testRegex = this.identityRegex;
					break;
				case 'imgCode': //图形验证码
					testRegex = this.codeImgRegex;
					break;
					case 'phoneCode': //手机验证码
					testRegex = this.codePhoneRegex;
					break;
				case 'bankCard'://银行卡
					testRegex = this.bankCardRegex;
					break;
				case 'numberRegex':
					testRegex = this.numberRegex;
					break;
				case 'moneyRegex':
					testRegex = this.moneyRegex;
					break;
				case 'number':
					testRegex = this.numberRegex;
					break;
				case 'money':
					testRegex = this.moneyRegex;
					break;
			}	
				if (val.length == 0) {
					if (required) {
						if(isSubmit)
						{
							this.error(emptyTip);
						}		
					}
				} else {
					if (testRegex.test(val)) {
						if(val<=0){
							this.error(zeroTip);//输入金额为0时错误提示;
						}else{
							this.success('');
						}
					} else {
						this.error(errorTip);
					}
				}
		}
	};
	Validate.fn.init.prototype = Validate.fn;
	window.validate = Validate;
})(window, document);