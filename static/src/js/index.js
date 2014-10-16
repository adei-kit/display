;define(function(require) {
    // load dependencies
    var $ = require('jquery'),
        _ = require('underscore'),
        SensorView = require('rvc!./component/SensorComponent'),
        SensorView2 = require('rvc!./component/SensorComponent_2'),
        TrendView = require('rvc!./component/trend'),
        AlarmView = require('rvc!./component/alarm'),
        SensorCollection = require('./model/SensorModel');
        s0 = require('json!config/sensor.json');    // sensor configuration
    
    require('ractive');
    require('ractive-adaptors-backbone');
    require('highcharts');
    require('./module/canvas');

    // settings
    var url_api = "http://localhost:8000/katrin/default/api/sensor.json";
    var cols = 4;


    /********* codes start here *********/
    /********* codes start here *********/
    /********* codes start here *********/
    //var sensorGroup; 

    // initial sensor models
    sensorGroup = new SensorCollection(s0);
    sensorGroup.url = url_api;

    sensorGroup.fetch();
    sensorGroup.fetch({data: {w: 600, r: 60}});
    //sensorGroup.fetch({data: {w: 3600, r: 300}});
    //sensorGroup.fetch({data: $.param({w: 1000, r: 50})});

    // update sensor
    $(function() {
        setInterval(function() {
            sensorGroup.fetch();
        }, 10000);
        setInterval(function() {
            sensorGroup.fetch({data: {w: 600, r: 60}});
        }, 60000);
    });
    
    /********* intialize canvas *********/
    /********* intialize canvas *********/
    /********* intialize canvas *********/

    $('#content').canvas({cols: cols});
    var col_width = $('#content').data('colwidth');
    var unit0 = Math.floor(col_width/12);


    /********* create widghet views *********/
    /********* create widghet views *********/
    /********* create widghet views *********/
    
    var sensorview1 = new SensorView({ el: "#canvas-col-0", append: true});
    var sensorview2 = new SensorView({ el: "#canvas-col-0", append: true});
    var sensorview3 = new SensorView({ el: "#canvas-col-1", append: true});
    var sensorview4 = new SensorView({ el: "#canvas-col-1", append: true});
    var sensorview5 = new SensorView({ el: "#canvas-col-1", append: true});
    var sensorview0 = new SensorView2({ el: "#canvas-col-2", append: true });
    var alarmview   = new AlarmView({el: "#canvas-col-2", append: true});
    var trendview1  = new TrendView({ el: "#canvas-col-2", append: true });
    var trendview2  = new TrendView({ el: "#canvas-col-2", append: true });

    views = {
        sensorview0: [0,  1,  2,  3,  4,  5],
        sensorview1: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview2: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview3: [8, 10,  9, 14],
        sensorview4: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview5: [8, 10,  8, 10,  8, 10,  9, 14],
        trendview1:  [0, 2, 3, 4],
        trendview2:  [5, 6, 7, 8],
        alarmview: [0,2]
    };

    _.each(views, function(v, k) {
        var k = eval(k);
        console.log(v);
        k.set('unit0', unit0);
        k.set('sensorlist', v);
        k.setSensors(sensorGroup);
    });


    trendview1.initchart();
    trendview2.initchart();


    /********* post processing *********/
    /********* post processing *********/
    /********* post processing *********/
    //$("#content").canvas("align");
});
