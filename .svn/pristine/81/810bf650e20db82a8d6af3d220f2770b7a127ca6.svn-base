
(function(){
	var page = new Page();
	page.setTitle('筑巢贷');

	var userTool={
		dist:location.href.substr(0,location.href.indexOf('/',7)),
		isLogin:function(){
			return typeof user!='undefined'&&user().isLogin()
		},
		Login:function(url){
			url=url||location.href;
			location.href='/html/user/login/?url='+encodeURIComponent(url);
		},		
		RealName:function(url){
			url=url||location.href;
			location.href='/html/loan/realnameloan/?url='+encodeURIComponent(url);
		},
		getRealName: function(bindEvent) {			
		return $.post(constant().url + '/account/center/nameAuthInfo', {
					'clientType': constant().clientType,
					'sessionKey': constant().sessionKey
				});				
		},
		testValida:function(fn){
			var login=userTool.isLogin();
			if(login){
				userTool.getRealName().done(function(data,status){					
					if (status == "success"&&data.resultCode == '0'){
						fn&&fn(data.data)						
					}else{
						alert(user().testResultCode(data.resultCode))
					}					
				}).fail(function(){
					alert('获取实名认证请求失败')
				});					
			}else{
				userTool.Login()
			}
		},
		getLoan:function(fn){
			var api=constant().url+'/user/loanInfo/query',
				_this=this;
			$.get(api,{
				'clientType': constant().clientType,
				'loanType' : '6',
				'sessionKey': constant().sessionKey
				},function(data,status){			
				if (status == "success"&&data.resultCode == '0'){
					if(data.data.loanQueryEntry.followTag!=-1){
						if(data.data.loanQueryEntry.followTag!='41') {
								if (data.data.loanQueryEntry.isSuccess == '1') {
									location.href='/html/loan/plans/?type=6'
								}
								else {
									fn&&fn()
								}
						}else {
								fn&&fn()
						}
					}else{
						fn&&fn()
					}
				}else{
					alert(user().testResultCode(data.resultCode))
				}				
			})			
		}
	};
	
	var Loan={		
		start:function(){
			var login=userTool.isLogin(),
				_this=this,
				selects={
					city:['上海市','杭州市','宁波市'],
					money:['10万以内','10-30万','30-60万','60-80万','80-100万']
				},timer=1;
				
			//验证是否有效借款状态
			userTool.testValida(function(data){				
				data.certification==1?userTool.getLoan(function(){
					//渲染借款表单及处理提交
					_this.renderProcess({
						userName:data.userName,
						cardId:data.cardId,
						phone:session().get('login'),
						selects:selects,
						type:'zhuchao'
					});
					_this.applyClick()
				}):userTool.RealName();				
			});	
			
			//渲染计算器及计算
			_this.renderCounter({
				type:'other',
				limit:[{name:'6个月',value:6},{name:'12个月',value:12},{name:'36个月',value:36},{name:'60个月',value:60}],
				huan:[{name:'等额本金',value:1},{name:'等额本息',value:2}]
			});					
			/*
			 * author: toni
			 * time 20160518
			 * 借款按钮的点击事件
			 */
			$('#htmLoanCounter button.apply').on('click',function(){
				if(timer){
					timer=0;
					var money=Number(_this.getValue('applymoney','input')),//获取用户输入金额
						limit=Number(_this.getValue('limit','select')),//借款时间
						rate=Number(_this.getValue('loanrate','input'))/100,//借款利率
						type=Number(_this.getValue('type','select')),//借款类型
						tmp=$('#tmpLoanResult').html(),//借款计算器模板
						data={
							type:'other',
							applyMoney:money,
							surPlusMoney: [],//每期剩余金额
							limit:limit,
							rate:rate,
							perRate:[],//每期利息
							perMoney:[],//每期本金
							allMoney: 0, //还款总额
							allRate: 0//利息总额
							},htm;

					//判断借款类型
					if(type==1){
						//等额本金
						for(var i=0;i<limit;i++){
							var b=Number(money/limit);//获取每期还款本金
							data.perMoney.push(b);//每期还款本金加入数组
							var s=Number(money-b*(i+1));//每期剩余金额
							var x=Number((money-b*i)*(rate/12));//获取每期借款利息
							data.perRate.push(x);//每期利息加入数组
							data.surPlusMoney.push(s);//每期剩余金额加入数组
							data.allRate+=x;//到期还款总利息
						}
						data.allMoney=data.allRate+money;//还款总额
						
					}else{
						var s=100;//每期剩余金额
						//等额本息
						for(var i=0;i<limit;i++){
							var r=rate/12;
							var mm=money*r*Math.pow(1+r,limit);
							var mmm=Math.pow(1+r,limit)-1;
							var m=Number(mm/mmm);//每月还款总额	
							var x=Number((money*r-m)*Math.pow(1+r,i)+m);//获取每期借款利息;
							data.perRate.push(x);//每期利息加入数组
							var b=Number(m-x);//获取每期还款本金
							data.perMoney.push(b);//每期还款本金加入数组
							s-=b;
							data.surPlusMoney.push(s);//每期剩余金额加入数组
							data.allRate+=x;//到期还款总利息
						}
						data.allMoney=data.allRate+money;//还款总额
					}

					htm=$(doT.template(tmp)(data));
					htm.appendTo(document.body).hide().fadeIn(300);
					htm.find('button.close').click(function(){
						timer=1;
						htm.remove()
					});
					setTimeout(function(){						
						htm.css({marginTop:-htm.outerHeight()/2})
					},70)
				}
			});
		},
		renderProcess:function(user){			
			template().renduTemplate('tmpLoanProcess', 'htmLoanProcess',user)			
		},
		renderCounter:function(data){
			template().renduTemplate('tmpLoanCounter', 'htmLoanCounter',data)	
		},
		applyClick:function(){	
			var _this=this;		
			$('#htmLoanProcess button.apply').on('click',function(){				
				user().testSubmit();				
				if ($('.form').find('.validate-failed').length != 0) {
					return false;
				} else {
					_this.submit();
				}
			})
		},
		getValue:function(name,type){
			var ele=document.getElementsByName(name),value,i;				
			switch(type){
				case 'input':
				var a=ele[0];
				if(typeof(a) != "undefined"){
					value=a.value;
				}
				break;				
				case 'select':
				var a=ele[0];
				if(typeof(a) != "undefined"){
					i=a.selectedIndex;
					value=a.options[i].value;
				}
				break;					
				case  'radio':
				for(i=0;i<ele.length;i++){
					if(ele[i].checked){
						value=ele[i].value;break;
					}
				}
				break;
				case 'checkbox':
				for(i=0,value=[];i<ele.length;i++){
					if(ele[i].checked){
						value.push(ele[i].value);
					}
				}
				break;
			}			
			return value			
		},
		submit:function(){
			var api=constant().url+'/user/loanInfo/submit',
				_this=this;			
			$.post(api,{				
				cityName:_this.getValue('city','select'),
				loanAmount:_this.getValue('loanmoney','select'),
				paymentPercent:_this.getValue('firstpay','select'),
				propertyLocation:_this.getValue('position','select'),
				name:_this.getValue('username','input'),
				mobileNo:_this.getValue('phone','input'),
				idCard:_this.getValue('IDCard','input'),
				housePrice:_this.getValue('price','input'),
				houseCover:_this.getValue('areas','input'),
				email:_this.getValue('email','input'),
				sex:_this.getValue('sex','radio'),
				comuntiyName: _this.getValue('areaname','input'),
				decorateCompany:_this.getValue('fitment','input'),
				clientType:constant().clientType,
				sessionKey: constant().sessionKey,
				loanType:6
			},function(data,status){
				if (status == "success"&&data.resultCode == '0'){
					location.href='/html/loan/plans/?type=6';
				}else{
					alert(user().testResultCode(data.resultCode))
				}
			});
		}
	};

	Loan.start();

})();