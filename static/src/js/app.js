
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Ractive = require('ractive');

require('ractive-adaptors-backbone');


// sensor configuration
var sensorConfig = require('../config/sensor.json');    
var SensorCollection = require('./model/SensorModel');
var sensorGroup = new SensorCollection(sensorConfig);
