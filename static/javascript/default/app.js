
var Ractive = require('ractive');

require('ractive-adaptors-backbone');

var AlarmView = Ractive.extend(require("./component/alarm.ract"));

var foo = new AlarmView({el: '#content', append: true});

var ractive = new Ractive({
    el: '#output',
    //template: require('../templates/template.html'),
    //template: require('./component/alarm.html').template,
    data: {
        name: 'World'
    }
});

