
(function(){
	var page = new Page();
	page.setTitle('乐巢贷');

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
			location.href='/html/user/realname/?url='+encodeURIComponent(url);
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
				'loanType' : '2',
				'sessionKey': constant().sessionKey
				},function(data,status){			
				if (status == "success"&&data.resultCode == '0'){
					if(data.data.loanQueryEntry.followTag!=-1){
						if(data.data.loanQueryEntry.followTag!='41') {
								if (data.data.loanQueryEntry.isSuccess == '1') {
									location.href=_this.dist+'/html/loan/plans2/?type=4'
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
					money:['500万以内','500-800万','800-1100万','1100-1300万','1300-1500万']
				},timer=1;
						
			userTool.testValida(function(data){				
				data.certification==1?userTool.getLoan(function(){
					_this.renderProcess({
						userName:data.userName,
						cardId:data.cardId,
						phone:session().get('login'),
						selects:selects,
						type:'lechao'
					});
					_this.applyClick()
				}):userTool.RealName();				
			});
			
			//渲染计算器及计算
			_this.renderCounter({				
				huan:[{name:'一次性还本付息',value:3}],
				type:'lechao'
			});			
			$('#htmLoanCounter button.apply').on('click',function(){
				if(timer){
					timer=0;
					var money=Number(_this.getValue('applymoney','input')),
						rate=Number(_this.getValue('serverrate','input')),
						tmp=$('#tmpLoanResult').html(),
						data={
							type:'lechao',
							applyMoney:money,
							allMoney:(money*(1+rate/100)),
							rateMoney:(money*rate/100).toFixed(2)						
						},
						htm=doT.template(tmp)(data);
					
					htm=$(htm);
					htm.appendTo(document.body);
					htm.find('button.close').click(function(){
						timer=1;
						htm.remove()
					});
				}
			})
		},
		renderProcess:function(user){			
			template().renduTemplate('tmpLoanProcess', 'htmLoanProcess',user)			
		},	
		renderCounter:function(data){
			template().renduTemplate('tmpLoanCounter', 'htmLoanCounter',data)	
		},
		applyClick:function(login){	
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
				propertyCompany : _this.getValue('agent','input'),
				clientType:constant().clientType,
				sessionKey: constant().sessionKey,
				loanType:2
			},function(data,status){
				if (status == "success"&&data.resultCode == '0'){
					location.href='/html/loan/plans3/?type=2';
				}else{
					alert(user().testResultCode(data.resultCode))
				}
			});				
		}
	};		
	Loan.start();

})();