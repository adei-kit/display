
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Ractive = require('ractive');

require('ractive-adaptors-backbone');
require('./controller/canvas.js');
Backbone.$ = $;

var AlarmView = Ractive.extend(require("./view/alarm.html"));
var SensorView = Ractive.extend(require("./view/sensor.html"));
var TrendView = Ractive.extend(require("./view/trend.html"));


// settings
var url_api = "http://localhost:8000/katrin/default/api/sensor.json";
var cols = 4;


// sensor configuration
var sensorConfig = require('../config/sensor.json');    
var SensorCollection = require('./model/SensorCollection');
var sensorGroup = new SensorCollection(sensorConfig);


// fetch sensor data
sensorGroup.url = url_api;
sensorGroup.fetch();
sensorGroup.fetch({data: {w: 600, r: 60}});


// initialize canvas
$('#content').canvas({cols: cols});
var col_width = $('#content').data('colwidth');
var unit0 = Math.floor(col_width/12);


// sensor views

// cols 0
var col = "#canvas-col-0";
var alarmview   = new AlarmView({el: col, append: true});
var sensorview1 = new SensorView({ el: col, append: true});

// cols 1
var col = "#canvas-col-1";

// cols 2
var col = "#canvas-col-2";
var trendview1 = new TrendView({ el: col, append: true});
var trendview2 = new TrendView({ el: col, append: true});

trendview1.set('W', 36);
trendview2.set('W', 36);


views = {
//    sensorview0: [0,  1,  2,  3,  4,  5],
    sensorview1: [8, 10,  8, 10,  8, 10,  9, 14],
//    sensorview2: [8, 10,  8, 10,  8, 10,  9, 14],
//    sensorview3: [8, 10,  9, 14],
//    sensorview4: [8, 10,  8, 10,  8, 10,  9, 14],
//    sensorview5: [8, 10,  8, 10,  8, 10,  9, 14],
    trendview1:  [0, 3, 4],
    trendview2:  [5, 6, 7, 8],
    alarmview: [0, 2]
};

_.each(views, function(v, k) {
    var k = eval(k);
    console.log(v);
    k.set('unit0', unit0);
    k.set('sensorlist', v);
    k.set('sensorGroup', sensorGroup);
    k.setSensors();
});

trendview1.initchart();
trendview2.initchart();
