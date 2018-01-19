$(function () {

  'use strict';

  var $distpicker = $('#distpicker');
  var $citypicker1 = $('#city-picker1');
      $citypicker1.citypicker();
  var $citypicker2 = $('#city-picker2');
      $citypicker2.citypicker({
        province: '江苏省',
        city: '常州市',
        district: '溧阳市'
    });

    var $citypicker3 = $('#city-picker3');
    var $city_two = $('#city_two');

    $('#reset').click(function () {
        $citypicker3.citypicker('reset');
    });

    $('#destroy').click(function () {
        $citypicker3.citypicker('destroy');
    });
    $('#reset2').click(function () {
        $citypicker3.citypicker('reset');
    });

    $('#destroy2').click(function () {
        $citypicker3.citypicker('destroy');
    });

  $distpicker.distpicker({
    province: '福建省',
    city: '厦门市',
    district: '思明区'
  });

  $('#reset').click(function () {
    $distpicker.distpicker('reset');
  });

  $('#reset-deep').click(function () {
    $distpicker.distpicker('reset', true);
  });

  $('#destroy').click(function () {
    $distpicker.distpicker('destroy');
  });

  $('#distpicker1').distpicker();

  $('#distpicker2').distpicker({
    province: '---- 所在省 ----',
    city: '---- 所在市 ----',
    district: '---- 所在区 ----'
  });

  $('#distpicker3').distpicker({
    province: '浙江省',
    city: '杭州市',
    district: '西湖区'
  });

  $('#distpicker4').distpicker({
    placeholder: false
  });

  $('#distpicker5').distpicker({
    autoSelect: false
  });

});
