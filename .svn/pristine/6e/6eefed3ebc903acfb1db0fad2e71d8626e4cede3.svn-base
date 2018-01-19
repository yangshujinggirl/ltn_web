$(function () {
  var page = new Page();

  var postData = page.getPostData();
  console.log(postData);

  page.initConfirm = function() {
    // return page.getData('', {}, )
    page.initTemplate(postData, 'confirm', 'tempConfirm');
    addEvent();

    function addEvent() {
      $('#submit').on('click', submit);
      $('#success #ok').on('click', function() {
        page.jump(Config.get('accountCenterUrl'));
      });
      $('#fail #ok').on('click', function() {
        page.jump(Config.get('helpCenterUrl'));
      });
      $('#isRead').on('click', function() {
        $('#submit').prop('disabled', !$(this).prop('checked'));
      });
    }

    var flag = false;
    function submit () {
      page.getData(
        '/product/current/buy',
        {order_amount: postData.buyAmount},
        function (data) {
          if (page.isSuccess(data)) {
            var data = data.data;
            page.showDialog('#success');
            // window.open(data.url);
          } else {
            page.showDialog('#fail');
            $('#descTip').html(user().testResultCode(data.resultCode));
          }
      });
      $('#submit').text('投资中...').prop('disabled','disabled');
    }
  };

  page.init = function() {
  	page.setTitle('确认页面');
    page.initConfirm();
  }

  page.init();
});