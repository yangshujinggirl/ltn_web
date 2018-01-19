
(function(){
	var page = new Page();
	page.setTitle('借款进度');

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
			location.href=this.dist+'/html/user/realname/?url='+encodeURIComponent(url);
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
				'loanType' : Url.getSearchParts('type'),
				'sessionKey': constant().sessionKey
				},function(data,status){
				if (status == "success"&&data.resultCode == '0'){
					if(data.data.loanQueryEntry.followTag!=-1){
						fn&&fn(data);
					}else{
						location.href=_this.dist+'/html/loan/loan-index/'
					}
				}else{
					alert(user().testResultCode(data.resultCode))
				}
			})
		}
	};

	userTool.testValida(function(data){
		data.certification==1?userTool.getLoan(function(data){
			var planInfo={};
			var tag = String(data.data.loanQueryEntry.followTag);
			switch(tag){
				case '11':
				planInfo.plan=1;planInfo.title='恭喜您！您的借款申请已经提交成功！';planInfo.detail='我们的借款专员将尽快与您联系，请您保持电话畅通';
				planInfo.status = String(data.data.loanQueryEntry.isSuccess);
				planInfo.reason = data.data.loanQueryEntry.reason;
				break;
				case '21':
				planInfo.plan=2;planInfo.title='恭喜您！您的借款申请已受理！';planInfo.detail='请根据专员的要求提供具体资料！';
				planInfo.status = String(data.data.loanQueryEntry.isSuccess);
				planInfo.reason = data.data.loanQueryEntry.reason;
				break;
				case '31':
				planInfo.plan=3;planInfo.title='恭喜您！您的资料已提交审核！';planInfo.detail='我们会通过短信或邮件通知您审核结果！请注意查收！';
				planInfo.status = String(data.data.loanQueryEntry.isSuccess);
				planInfo.reason = data.data.loanQueryEntry.reason;
				break;
				case '41':
				planInfo.plan=4;planInfo.title='恭喜您！您的借款申请已通过审核！';planInfo.detail='您的借款专员会与您联系具体放款事宜！';
				planInfo.status = String(data.data.loanQueryEntry.isSuccess);
				planInfo.reason = data.data.loanQueryEntry.reason;
				break;
			}
			template().renduTemplate('tmpLoanPlan', 'htmLoanPlan',planInfo);
			if(tag=='41') {
				$('#agin').show();
				$('#agin').on('click',function(){
					if(data.data.loanQueryEntry.loanType=='6') {
						window.location.href = '/html/loan/loan-content/first-loan';
					} else if(data.data.loanQueryEntry.loanType=='4') {
						window.location.href = '/html/loan/loan-content/ransom-floor';
					} else if(data.data.loanQueryEntry.loanType=='2') {
						window.location.href = '/html/loan/loan-content/final-payment';
					}
				});
			}else{
				if (data.data.loanQueryEntry.isSuccess=='0') {
					$('#agin').show();
					$('#agin').on('click',function(){
						if(data.data.loanQueryEntry.loanType=='6') {
							window.location.href = '/html/loan/loan-content/first-loan';
						} else if(data.data.loanQueryEntry.loanType=='4') {
							window.location.href = '/html/loan/loan-content/ransom-floor';
						} else if(data.data.loanQueryEntry.loanType=='2') {
							window.location.href = '/html/loan/loan-content/final-payment';
						}
					});
				}
			}
		}):userTool.RealName();
	})
	

})();