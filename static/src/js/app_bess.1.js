
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Ractive = require('ractive');

require('ractive-adaptors-backbone');
require('./controller/canvas.js');
Backbone.$ = $;

var SensorCollection = require('./model/SensorCollection');
var BessView = Ractive.extend(require("./view/bess.html"));


// settings
var cols = 2;
var url = "http://localhost:8000/display/default/api/";

var url0 = url + "sensor_allgemein500.json";
var url1 = url + "sensor_gewerk1.json";
var url2 = url + "sensor_gewerk2.json";
var url3 = url + "sensor_all500.json";
var s0 = require('../config/sensor_allgemein500.json');
var s1 = require('../config/sensor_gewerk1.json'); 
var s2 = require('../config/sensor_gewerk2.json');
var s3 = require('../config/sensor_all500.json');


// initial sensor models
sensorGroupAllg500 = new SensorCollection(s0);
sensorGroupGewerk1 = new SensorCollection(s1);
sensorGroupGewerk2 = new SensorCollection(s2);
sensorGroupAll500  = new SensorCollection(s3);

sensorGroupAllg500.url = url0;
sensorGroupGewerk1.url = url1;
sensorGroupGewerk2.url = url2;
sensorGroupAll500.url  = url3;

sensorGroupAllg500.fetch();
sensorGroupGewerk1.fetch();
sensorGroupGewerk2.fetch();
sensorGroupAll500.fetch();

// update sensor
$(function() {
    setInterval(function() {
        sensorGroupAllg500.fetch();
        sensorGroupGewerk1.fetch();
        sensorGroupGewerk2.fetch();
        sensorGroupAll500.fetch();
    }, 10000);
});


// initialize canvas
$('#content').canvas({cols: cols});
var col_width = $('#content').data('colwidth');
var unit0 = Math.floor(col_width/12);


// sensor views
bessview = new BessView({
    el: "#canvas-col-0",
    append: true,
    data: { unit0: unit0 }
});

var solar = [];
var battery1 = [];
var battery2 = [];
var grid = [];
for (var i=0; i < sensorGroupAllg500.length; i++) {
    solar.push(sensorGroupAllg500.get(i));
}
for (var i=0; i < sensorGroupGewerk1.length; i++) {
    battery1.push(sensorGroupGewerk1.get(i));
}
for (var i=0; i < sensorGroupGewerk2.length; i++) {
    battery2.push(sensorGroupGewerk2.get(i));
}
for (var i=0; i < sensorGroupAll500.length; i++) {
    grid.push(sensorGroupAll500.get(i));
}

bessview.set('sensors', solar);
bessview.set('battery1', battery1);
bessview.set('battery2', battery2);
bessview.set('grid', grid);


