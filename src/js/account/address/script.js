$(function(){
  var page = new Page();
  var postData = {} //传递数据
  var id = id;
  //点击添加地址跳转
  $('.add').on('click',function(){
    $('.form').show();
    $('.none_address').hide();
  });
  var app = {
    getImageCode : function(){
      //光标离开时验证
      $('input,select,textarea').on('blur', function() {
        _this = $(this);
        var vdRow = _this.parent().parent();
        var vdTip = vdRow.find('.validation');
        var vdSuccess = 'validate-success';
        var vdFailed = 'validate-failed';
        validate().vd(_this, vdRow, vdTip, vdSuccess, vdFailed, false);
        app.addEvent(_this, vdRow, vdTip);
        if ($('#txtTel').val()=='') {
          vdRow.addClass('validate-failed').removeClass('validate-success');
          vdTip.html(this.placeholder);
        }
      });
    },
    //添加绑定事件
    addEvent: function(_this, vdRow, vdTip) {
      //验证手机号码是否存在,存在报错
      if (_this.attr('id') == 'txtName') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          return;
        }
      }
      //验证图形验证码是否正确
      if (_this.attr('id') == 'txtTel') {
        if (!vdRow.hasClass('validate-failed') && strUtil().trim(_this.val()).length > 0) {
          return;
        }
      }
    },
    //添加地址
    address : function(name,address,location,mobileNo,id){
      var param = {
        'clientType' : constant().clientType,
        'consigneeName' : name,
        'detailAddress' : address,
        'location' :location,
        'mobileNo' : mobileNo,
        'sessionKey' : session().get('sessionKey')
      };
      $.post(constant().url + '/addressManage/addAddress',param,function(data,status){
          if (data.resultCode == '0') {
            var data = data.data;
            page.initTemplate(data,'propeditors', 'tempeditors');
            $('#propeditors').show();
            app.getAddress();
            $('.form').hide();
            $('.none_address').hide();
          }
      });
    },
    //查询地址
    getAddress : function(name,address,location,mobileNo,id){
      var param = {
        'clientType': constant().clientType,
        'sessionKey' : session().get('sessionKey')
      };
      $.post(constant().url + '/addressManage/getAddress',param,function(data,status){
          if (data.resultCode == '0') {
            var data = data.data;
            id = data.id;
            session().set('id',data.id);
            page.initTemplate(data,'propeditors', 'tempeditors');
            $('#bianji').on('click',function(){
              $('.big_box3').show();
              $('#form2').show();
              $('#propeditors').hide();
              $('#city_two').val(data.location);
              $('#city_two').citypicker({});
              $('#detailAddress2').val(data.detailAddress);
              $('#txtTel2').val(data.mobileNo);
              $('#txtName2').val(data.consigneeName);
            });
          }
          if (jQuery.isEmptyObject(data) == false) {
            $('#propeditors').show();
          }else{
            $('.none_address').show();
          }
          if (data.detailAddress == '') {
            $('#dizhi').append('&nbsp;');
          }
          if (data.location == '') {
            $('#locality').append('&nbsp;');
          }
          $('.del').on('click',function(){
            $('#tankuangLCT').show();
            $('.mask').show();
          });
          $('.tkbut1').on('click',function(){
            $('#tankuangLCT').hide();
            $('.mask').hide();
          });
          $('#close2').on('click',function(){
            $('#tankuangLCT').hide();
            $('.mask').hide();
          });
      });
      $('.tkbut').on('click',function(){
        app.delAddress();
        $('#tankuangLCT').hide();
        $('.mask').hide();
      });
    },
    //修改地址
    updateAddress : function(name,address,location,mobileNo,id){
      var name2 =strUtil().trim($('#txtName2').val());
      var location2 = $('#city_two').val();
      var address2 = $('#detailAddress2').val();
      var mobileNo2 = $('#txtTel2').val();
      var id = session().get('id');
      var param = {
        'clientType': constant().clientType,
        'sessionKey' : session().get('sessionKey'),
        'consigneeName' : name2,
        'detailAddress' : address2,
        'location' :location2,
        'mobileNo' : mobileNo2,
        'id':id
      };
      $.post(constant().url + '/addressManage/updateAddress',param,function(data,status){
        if (data.resultCode == '0') {
          var data = data.data;
        }
      });
    },
    //删除地址
    delAddress : function(){
      var id = session().get('id');
      var param = {
        'clientType': constant().clientType,
        'sessionKey' : session().get('sessionKey'),
        'id':id
      };
      $.post(constant().url + '/addressManage/delAddress',param,function(data,status){
        if (data.resultCode == '0') {
          var data = data.data;
        }
        if (jQuery.isEmptyObject(data) == false) {
          $('#propeditors').show();
        }else{
          $('.none_address').show();
          $('#propeditors').hide();
        }
      })
    },
    //初始化方法
    init : function(){
      $('#city-picker3').citypicker({

      });
      app.getAddress();
    }
  };
  app.init();
  $('.address_but').on('click',function(){
    //触发所有输入的验证
    user().testSubmit(app.addEvent);
    //是否有错误
    if ($('#form').find('.validate-failed').length != 0) {
      return false;
    } else {
      var name =strUtil().trim($('#txtName').val());
      var location = $('#city-picker3').val();
      var addressdetail = $('#detailAddress').val();
      var mobileNo = $('#txtTel').val();
      app.address(name,addressdetail,location,mobileNo);
    }
  });
  $('.address_but2').on('click',function(){
    //触发所有输入的验证
    user().testSubmit(app.addEvent);
    //是否有错误
    if ($('#form2').find('.validate-failed').length != 0) {
      return false;
    } else {
      var name2 =strUtil().trim($('#txtName2').val());
      var location2 = $('#city_two').val();
      var addressdetail2 = $('#detailAddress2').val();
      var mobileNo2 = $('#txtTel2').val();
      app.updateAddress(name2,addressdetail2,location2,mobileNo2);
      window.location.reload();
      $('#propeditors').show();
      $('.big_box3').hide();
    }
  });
});
