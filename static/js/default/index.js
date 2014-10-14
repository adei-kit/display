;define(function(require) {
    // load dependencies
    var $ = require('jquery'),
        _ = require('underscore'),
        SensorView = require('rvc!./component/SensorComponent'),
        SensorView2 = require('rvc!./component/SensorComponent_2'),
        TrendView = require('rvc!./component/trend'),
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
    var unit0 = Math.round(col_width/12);


    /********* create widghet views *********/
    /********* create widghet views *********/
    /********* create widghet views *********/
    
    sensorview0 = new SensorView2({ el: "#canvas-div-0", append: true });
    var sensorview1 = new SensorView({ el: "#canvas-div-0", append: true});
    var sensorview2 = new SensorView({ el: "#canvas-div-0", append: true});
    var sensorview3 = new SensorView({ el: "#canvas-div-1", append: true});
    var sensorview4 = new SensorView({ el: "#canvas-div-1", append: true});
    var sensorview5 = new SensorView({ el: "#canvas-div-1", append: true});

    sensorviews = {
        sensorview0: [0,  1,  2,  3,  4,  5],
        sensorview1: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview2: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview3: [8, 10,  9, 14],
        sensorview4: [8, 10,  8, 10,  8, 10,  9, 14],
        sensorview5: [8, 10,  8, 10,  8, 10,  9, 14],
    }

    _.each(sensorviews, function(v, k) {
        var k = eval(k);
        k.set('unit0', unit0);
        k.set('sensorlist', v);
        k.setSensors(sensorGroup);
    })

    //  list0 = sensorview1.findAll('li', {live: true});

    trendview1 = new TrendView({ el: "#canvas-div-2", append: true });
    trendview1.set('unit0', unit0);
    trendview1.set('sensorlist', [0, 2, 3, 4]);
    trendview1.set('sensors', 
            [sensorGroup.get(0), sensorGroup.get(2), 
             sensorGroup.get(3), sensorGroup.get(4)] );
    trendview1.initchart();


    trend2 = $('<div class="widget-group"></div>').appendTo('#canvas-div-2');
    trendview2 = new TrendView({
        el: trend2,
        data: {
            unit0: unit0,
        }
    });

    /********* post processing *********/
    /********* post processing *********/
    /********* post processing *********/
    //$("#content").canvas("align");
});
