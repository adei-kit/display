String.prototype.toNum = function() {
   if (this.length === 0) return 0;
   return parseInt(this);
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

function defaultFor(arg, val) {
    return typeof arg !== 'undefined' ? arg : val;
}

function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  };
  return arr;
}

function ts2date(ts) {
    ts = Number(ts);
    if (String(ts).length === 10)
        var date = new Date(ts*1000);
    else
        var date = new Date(ts);
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return h + ':' + m + ':' + s;
}
