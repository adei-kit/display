
var $ = require('jquery');
var Ractive = require('ractive');

require('ractive-adaptors-backbone');
require('backbone');

var AlarmView = Ractive.extend(require("./component/alarm.ract"));
var foo = new AlarmView({el: '#content', append: true});

