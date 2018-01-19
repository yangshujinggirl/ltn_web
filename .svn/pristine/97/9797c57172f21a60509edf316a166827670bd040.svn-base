var Url = {};

Url.getHash = function() {
  return window.location.hash;
};

Url.getHashParts = function(index) {
  var hash = Url.getHash().split("/");
  hash.shift();
  return index !== undefined ? hash[index] : hash;
};

Url.setHash = function(hashList) {
  hashList.unshift(Config.get('baseHash'));
  window.location.hash = hashList.join('/');
}

Url.setHash = function(data) {
  var header = Config.get('baseHash');
  window.location.hash = header + "/" + data.join("/");
};

Url.getSearch = function() {
  return window.location.search;
};

Url.getSearchParts = function(key) {
  var search = Url.getSearch().substr(1).split('&');
  var ret = {}, idx, len = search.length;
  for (idx = 0; idx < len; idx++) {
    var keyVal = search[idx].split('=');
    ret[keyVal[0]] = keyVal[1];
  }
  return key ? ret[key] : ret;
};