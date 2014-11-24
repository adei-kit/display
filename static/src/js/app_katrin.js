
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
var col_min_width = 320;

// parameters
screenWidth = screen.availWidth;
screenHeight = screen.availHeight;

// sensor configuration
var sensorConfig = require('../config/sensor.json');    
var SensorCollection = require('./model/SensorCollection');
var sensorGroup = new SensorCollection(sensorConfig);


// fetch sensor data
sensorGroup.url = url_api;
sensorGroup.fetch();
sensorGroup.fetch({data: {w: 600, r: 60}});


// initialize canvas
var col_width, content_height, unit0;
$('#content').canvas({layout: "1"});
col_width = $('#content').data('colWidth');
col_width = (col_width < col_min_width) ? col_min_width : col_width

unit0 = 0.0833 * col_width;
content_height = 400;


//var content_height = 0.95 * $('#content').data('contentHeight');
//var unit0 = Math.floor(col_width/12);
//console.log(col_width, unit0);


// sensor views
// cols 0
var col = "#canvas-col-1";
alarmview   = new AlarmView({el: col, append: true, data: {unit0: unit0}});
sensorview1 = new SensorView({el: col, append: true, data: {unit0: unit0}});

// cols 1
var col = "#canvas-col-2";
var sensorview2 = new SensorView({ el: col, append: true, data: {unit0: unit0}});

// cols 2
var col = "#canvas-col-3";
trendview1 = new TrendView({ el: col, append: true, data: {unit0: unit0, width: 2*col_width}});
//var trendview2 = new TrendView({ el: col, append: true});


views = {
//    sensorview0: [0,  1,  2,  3,  4,  5],
     sensorview1: [8, 10,  8, 10,  8, 10,  9, 14],
     sensorview2: [8, 10,  8, 10,  8, 10,  9, 14],
//    sensorview3: [8, 10,  9, 14],
//    sensorview4: [8, 10,  8, 10],
//    sensorview5: [8, 10,  8, 10,  8, 10,  9, 14],
    trendview1:  [0, 3, 4],
//    trendview2:  [5, 6, 7, 8],
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

trendview1.set('height', content_height/2);
//trendview2.set('height', content_height/2);
trendview1.initchart();
//trendview2.initchart();
