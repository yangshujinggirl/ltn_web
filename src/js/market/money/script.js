$(function() {
	var page = new Page();

	//剩余次数模板渲染
	page.getsurplus = function() {
		return page.getData(
			'/activity/top', {}, [surplus,initTurnTable]);

		function surplus(data) {
			if (page.isSuccess(data)) {
				var data = data.data;
				count=data.chance;
				$('#surplusCount').text(data.chance);
				page.initTemplate(data,'list','tempList');
			}
		}

		//渲染转盘开始状态
		function initTurnTable (data){
			var huodong = data.data.isStart;
			if (huodong == 0) {
				$('#qidai').show();
			}else if(huodong == 1){
				$('#start').show();
			}
		}
	}
	page.init = function() {
		page.getsurplus();
	}
	page.init();
	/**
	 * author: toni
	 * time: 20160512
	 * description: 转盘方法
	 */
	window.requestAnimFrame = (function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
			window.setTimeout(callback, 1000 / 60)
		}
	})();
	var totalDeg = 360 * 3 + 0;
	var steps = [];
	var allPrizeDeg = [30, 90, 150, 210, 270, 330]; //奖品角度
	var prize, sncode;
	var count = 0;
	var now = 0;
	var a = 0.01;
	var turntable, timer, running = false;
	turntable = document.getElementById('turntable'); //获取转盘
	i = 10;
	//计算每步的角度
	function countSteps() {
		var t = Math.sqrt(2 * totalDeg / a);
		var v = a * t;
		for (var i = 0; i < t; i++) {
			steps.push((2 * v * i - a * i * i) / 2)
		}
		steps.push(totalDeg)
	}
	//获取用户有没中奖
	page.getTurnTable = function() {
			return page.getData(
				'/activity/turntable', {}, [initInfo]);

			function initInfo(data) {
				var code=data.resultCode;
				if(code=='10000006'){
				  		session().clear();
				  		user().loginOperate();
				  		return;
				 }
				if(code=='10000005'){
				  		session().clear();
				  		$('#loginPopup').show();
				  		$('#cover-bg').show();
				  		return;
				 }
				//没有机会的情况
				if (count == 0) {
					$('#noChance').show();
					$('#cover-bg').show();
					return;
				}
				if (code==0) {
					beforeSend();
					prize = data.data.prizesId;//奖品编号
					count = data.data.chance;//抽奖次数
					$('#surplusCount').text(count);
					start(allPrizeDeg[prize-1]);
					running = true;
				}else{
					var str=user().testResultCode(code);
					alert(str);
				}
			};
			//获取接口之前
			function beforeSend() {
				running = true;
				timer = setInterval(function() {
					i += 5;
					turntable.style.webkitTransform = 'rotate(' + i + 'deg)';
					turntable.style.MozTransform = 'rotate(' + i + 'deg)'
					turntable.style.msTransform = 'rotate(' + i + 'deg)'
					turntable.style.OTransform = 'rotate(' + i + 'deg)'
				}, 1);
			}
		}
		//每步的方法
	function step() {
		turntable.style.webkitTransform = 'rotate(' + steps[now++] + 'deg)';
		turntable.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
		turntable.style.msTransform = 'rotate(' + steps[now++] + 'deg)';
		turntable.style.OTransform = 'rotate(' + steps[now++] + 'deg)';
		if (now < steps.length) {
			requestAnimFrame(step)
		} else {
			running = false;
			setTimeout(function() {
				if (prize != null) {
					var type = "";
					if (prize == '1') {
						type = "Pad mini2";
					} else if (prize == '2') {
						type = "谢谢";
						//没有获取奖品的情况
						$('#noPrize').show();
						$('#cover-bg').show();
						return;
					} else if (prize == '3') {
						type = "漫步者耳机";
					} else if (prize == '4') {
						type = "小米移动电源";
					} else if (prize == '5') {
						type = "11元返现券";
					} else if (prize == '6') {
						type = "38元返现券";
					}
					$('#prizePopup').show();
					$('#cover-bg').show();
					//获取奖品
					$('#prizeName').text(type);
				}
			}, 200);
		}
	}

	//开始转盘
	function start(deg) {
		deg = deg || allPrizeDeg[parseInt(allPrizeDeg.length * Math.random())];
		running = true;
		clearInterval(timer);
		totalDeg = 360 * 5 + deg;
		steps = [];
		now = 0;
		countSteps();
		requestAnimFrame(step)
	}
	window.start = start;
	//开始转盘
	$("#start").click(function() {
		if (running) return;
		//获取抽奖的情况
		page.getTurnTable();
	});

	//绑定确定登录
	$('#btnLogin').on('click',function(){
		user().loginOperate();
	});

	//点击关闭弹框消失
	$('.close').on('click', function() {
			$(this).parents('.popup').hide();
			$('#cover-bg').hide();
	});
	//点击立即注册判断用户是否登录，登录跳转首页，未登录跳转注册页面
	$('#registered').on('click', function() {
		if (user().isLogin()) {
			window.location.href = '/html/'
		} else {
			window.location.href = '/html/user/register/'
		}
	});

	//抽奖机会用完确认
	$('#noChanceBtn').on("click",function(){
		window.location.href='/finance/list/0/1/0/0'
	});

	//没有奖品的确认
	$('#noPrizeBtn').on('click',function(){
		$('#cover-bg').hide();
		$('#noPrize').hide();
	});
});
