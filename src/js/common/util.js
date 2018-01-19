var Util = {};


/**
 * 填补字符串
 * @param str 需要填补的字符串（默认""）
 * @param maxLen 需要填补后的字符串长度（默认0）
 * @param pack 需要填补的内容（单个字符，默认""）
 * @param isRight 是否从右侧填补（默认是）
 * @return 填补后的字符串
 */
Util.padStr = function (str, maxLen, pack, isRight) {
  var str = str || "",
    maxLen = maxLen || 0,
    isRight = isRight || true,
    pack = pack || "";

  var lenOri = str.length,
    padLen = maxLen - lenOri,
    padStr = "";

  if (padLen > 0)
    padStr = new Array(padLen + 1).join(pack);

  return isRight ? (str + padStr) : (padStr + str);
};

Util.padStrRight = function (str, len, pack) {
  return Util.padStr(str, len, pack);
};

Util.padStrLeft = function (str, len, pack) {
  return Util.padStr(str, len, pack, false);
};

/**
 * 填补浮点数字符串
 * @param str 需要填补的字符串（默认""）
 * @param len 需要填补后的字符串长度（默认0）
 * @return 填补后的字符串
 */
Util.padFloat = function (num, len) {
  var floatStr = parseFloat(num) + "",
    floatIndex = floatStr.indexOf("."),
    strLen = floatStr.length;
    floatLen = 0,
    addLen = 0;

  if (floatIndex > 0) {
    floatLen = strLen - (floatIndex + 1);
    addLen = strLen + len - floatLen;
  } else {
    floatStr += ".";
    addLen = strLen + 1 - addLen + len;
  }
  return Util.padStr(floatStr, addLen, "0");
};

Util.padFloatMoney = function (num, len) {
  return Util.addTausendstel(
    Util.padFloat(num, len || 2));
};

Util.padFloatRate = function (num, len) {
  return Util.padFloat(num, len || 1);
};

Util.padFloatPrecent = function (num, len) {
  return Util.padFloat(num, len || 0)
};

Util.addTausendstel = function (str) {
  str = str || "";
  if (/[^0-9\.]/.test(str)) return "";
  str = str.replace(/^(\d*)$/, "$1.")
    .replace(/(\d*\.\d\d)\d*/, "$1")
    .replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(str))
    str = str.replace(re, "$1,$2");
  str = str.replace(/,(\d\d)$/, ".$1");
  str = str.substr(str.length - 1, 1) == ',' ? str.substring(0, str.length - 1) : str;
  return str.replace(/^\./, "0.");
};

Util.updateUserType = function(callback,backUrl) {
  $.post(constant().url+ '/company/check',{
      clientType:'PC',
      sessionKey:constant().sessionKey
    }, function(data) {
        if (data.resultCode == '0') {
          session().set('userType', data.data.guestType);
          session().set('userStatus', data.data.status);
          if(typeof callback === 'function'){
            callback.call(this);
          }
        }else{
          window.location.href = backUrl || '/';
        }
  });
}

//获取用户信息
Util.updateUserInfo = function(callback,backUrl) {
  //把用户的实名信息,绑卡信息,充值协议，投资协议存储
  $.post(constant().url+ '/pc/user/info',{
      clientType:'PC',
      sessionKey:constant().sessionKey
    }, function(data) {
        if (data.resultCode == '0') {
          session().set('agreementCZ', data.data.agreementCZ);
          session().set('agreementTZ', data.data.agreementTZ);
          session().set('isBindCard', data.data.isBindCard);
          session().set('isNameAuth', data.data.isNameAuth);
          session().set('userName', data.data.userName);
          if (typeof callback == 'function') {
            callback().call(this); //运行绑定事件
          }
        } else {
          window.location.href = backUrl || '/';
        }
  });
}

// Util.getBackUrlHost = function() {
//   // 1.  判断环境
//   var currentUrl = window.location.href;
//   if(currentUrl.indexOf('lingtouniao') != -1){
//     return
//   }else{
//
//   }
//   var backUrl = Url.getSearchParts('url');
// }
