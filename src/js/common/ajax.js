/*************************************************
 * Notice: this obj depends on "jquery": "^1.12.1"
 *************************************************/

var Ajax = {};

Ajax.commonOption = {
    method: "POST",
    url: null,
    data: null
  }

Ajax.request = function(url, data) {

  var opt = Ajax.commonOption;
  opt.url = url;
  opt.data = data;

  return $.ajax(opt)
}