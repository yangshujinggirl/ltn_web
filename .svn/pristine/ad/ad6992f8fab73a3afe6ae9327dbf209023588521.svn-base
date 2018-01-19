$(function () {
	var page=new Page();
	var postData = page.getPostData();
	//初始化起息日期和到期日期
	function init(){
		page.setTitle('确认页面');
		//是否购买成功
		if(postData.isSuccess){
			
			$('#success').show();
			$('#form').show();
			$('#startDate').html(postData.startDate);
			$('#endDate').html(postData.endDate);
		}else{
			$('#fail').show();
			$('#failMessage').show().html(postData.message);
			$('#action').show();
		}
	}
	init();
	//跳转帮助中心
	$('.goCenter').on('click',function(){
		window.location.href='/html/account/viewall';
	});
	//跳转首页
	$('.goHome').on('click',function(){
		window.location.href='/html';
	});
});