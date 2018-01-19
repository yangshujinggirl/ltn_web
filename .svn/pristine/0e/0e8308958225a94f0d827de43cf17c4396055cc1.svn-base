
(function(){
	var userTool={
		dist:location.href.substr(0,location.href.indexOf('/',7)),
		isLogin:function(){
			return typeof user!='undefined'&&user().isLogin()
		},
		Login:function(url){
			url=url||location.href;
			location.href=this.dist+'/html/user/login/?url='+encodeURIComponent(url);
		},		
		RealName:function(url){
			url=url||location.href;
			location.href=this.dist+'/html/loan/realnameloan/?url='+encodeURIComponent(url);
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
				'sessionKey': constant().sessionKey
				},function(data,status){			
				if (status == "success"&&data.resultCode == '0'){
					if(data.data.loanQueryEntry.followTag!=-1){
						location.href=_this.dist+'/html/loan/plans/'
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
					money:['100万以内','100-200万','200-300万','300-400万','400-500万']
				},timer=1;
			
			
			//$.ajaxSetup({contentType:'application/json'});
			
			//判断是否借款有效
			userTool.testValida(function(data){				
				data.certification==1?userTool.getLoan(function(){
					//渲染借款表单及提交处理
					_this.renderProcess({
						userName:data.userName,
						cardId:data.cardId,
						phone:session().get('login'),
						selects:selects
					});
					_this.applyClick('#htmLoanProcess button.apply')
				}):userTool.RealName();				
			});
			
			//渲染计算器及计算
			_this.renderCounter({
				first:false,
				limit:[],
				type:[{name:'一次性还本付息',value:3}]
			});			
			$('#htmLoanCounter button.apply').on('click',function(){
				if(timer){
					timer=0;
					var money=Number(_this.getValue('applymoney','input')),
						rate=Number(_this.getValue('serverate','input')),
						tmp=$('#tmpLoanResult').html(),
						data={
							first:false,
							applyMoney:money,
							allMoney:(money*(1+rate/100)),
							rateMoney:(money*rate/100)						
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
		applyClick:function(applys){	
			var _this=this;		
			$(applys).on('click',function(){				
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
				sex:_this.getValue('sex','radio'),
				clientType:constant().clientType,
				sessionKey: constant().sessionKey,
				loanType:2
			},function(data,status){
				if (status == "success"&&data.resultCode == '0'){
					location.href=userTool.dist+'/html/loan/plans/';
				}else{
					alert(user().testResultCode(data.resultCode))
				}
			});				
		}
	};		
	Loan.start();

})();