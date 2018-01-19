
(function(){
	var page = new Page();
	page.setTitle('领投鸟理财-不动产理财颠覆者-借款');
	var userType = session().get('userType');//是否是企业用户

	var userTool={
		testValida:function(fn){
			var _this=fn;
			var typeId = fn.getAttribute('data-type');//杨静2016。07.25
			var link = fn.getAttribute('data-link');
			var login=user().isLogin();
			if(login){
				if(!user().getUserType()) {
					if (user().isNameAuth()) {
						userTool.getLoan(function(){
							location.href=link;
						},typeId);
					}else{
						window.location.href = '/html/loan/realnameloan/';
					}
				} else {
					return false;
				}
			}else{
				user().loginOperate();
			}
		},
		getLoan:function(fn,typeId){
			var api=constant().url+'/user/loanInfo/query',_this=this;
			$.get(api,{
				'clientType': constant().clientType,
				'loanType' : typeId,
				'sessionKey': constant().sessionKey
				},function(data,status){
				if (status == "success"&&data.resultCode == '0'){
					if(data.data.loanQueryEntry.followTag!=-1){
						if(data.data.loanQueryEntry.loanType=='6') {
								location.href='/html/loan/plans/?type='+typeId;
						} else if (data.data.loanQueryEntry.loanType=='4') {
							location.href='/html/loan/plans2/?type='+typeId;
						} else {
							location.href='/html/loan/plans3/?type='+typeId;
						}
					}else{
						fn&&fn()
					}
				}else{
					alert(user().testResultCode(data.resultCode))
				}
			})
		},
	};

	var Loan={
		start:function(){
			this.getBanner(),this.getType(),this.loanClick();
		},
		loanClick:function(){
			$('#htmLoanProduct .item .btn').on('click',function(e){
				var _this=this;
				userTool.testValida(_this);
				e=e||window.event,e.preventDefault(),e.returnValue=false;
				return false;
			})
		},
		getType:function() {
			if(user().getUserType()) {
				$('#htmLoanProduct .item .btn').attr('disabled','true');
				$('#htmLoanProduct .item .btn').addClass('disabled');
			}
		},
		getBanner:function() {
			$.post(constant().url+'/page/banner',{
				clientType:'PC',
				location:4
			},
				function(data) {
				if (page.isSuccess(data)) {
		        data = data.data.bannerList;
		        page.initTemplate(data, 'swiper1', 'tempBanner');
		      }
			})
		}
	};
	 Loan.start();
	 //user().updateUserInfo();
	 if(window.location.pathname == '/html/loan/loan-index/'){
	    $('.commonNavTwo,.commonNav').find('.right a').eq(2).addClass('select')
	  }

})();
