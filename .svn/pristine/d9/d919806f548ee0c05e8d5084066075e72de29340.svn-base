$(function() {
	var page = new Page();
	page.init=function(){
		page.setTitle('我的随心投');
		var postData=page.getPostData();
		if(postData.isSuccess){
			$('#success').addClass('selected');
		}else{
			$('#fail').addClass('selected');
			$('#failTip').html(postData.message);
		}
	};
	page.init();

	$('#goHome').on("click",function(){
		window.location.href='/';
	});

	$('#goCenter').on("click",function(){
		window.location.href='/html/account/freedom/';
	});
});
