;define(['backbone', 'underscore'], function(Backbone, _){
    var SensorModel = Backbone.Model.extend({
        initialize: function(sensor) {
            _.extend(this.attributes, sensor);
            _.extend(this.attributes, {value : '-'});
            _.extend(this.attributes, {values : '-'});
            _.extend(this.attributes, {ts : '-'});
            _.extend(this.attributes, {tss : '-'});
        },
        urlRoot: '/display4/default/api'
        ,url: function() {
            return this.urlRoot + '/' + this.attributes.server 
                                + '/' + this.attributes.group 
                                + '/' + this.attributes.sensor 
                                + '.json';
        }
        ,parse: function(rawdata) {
            var digit = this.attributes.digit || 3;
            if ( rawdata.ts )
                if ( rawdata.ts.length === 10 )
                    rawdata.ts = Number(rawdata.ts) * 1000;
            if ( rawdata.tss )
                for ( s in rawdata.tss )
                    if ( rawdata.tss[s].length === 10 )
                        rawdata.tss[s] = Number(rawdata.tss[s]) * 1000;
            if ( rawdata.value )
                rawdata.value = Number(rawdata.value).toPrecision(digit);
            if ( rawdata.values )
                for (var s in rawdata.values)
                    rawdata.values[s] = Number(Number(rawdata.values[s]).toPrecision(digit));
            return rawdata; 
        }
    });

    var SensorCollection = Backbone.Collection.extend({
        model: SensorModel
        ,initialize: function(sensors) {
            for ( s in sensors )
                _.extend(sensors[s], {id: parseInt(s)});
        }
        ,url: 'http://localhost:8000/display4/default/api/sensor.json'
        ,parse: function(rawdata) {
            //console.log( rawdata.timestamp, rawdata.value['sensor-0'] );
            var re = /sensor-(\d+)/;
            var data = new Array();
            if ( rawdata.timestamp.length === 1 ) {
                for (var s in rawdata.value) {
                    var i  = re.exec(s)[1];
                    data.push({
                        'ts': rawdata.timestamp[0],
                        'value': rawdata.value[s][0],
                        'id': parseInt(i)});
                }
            } else {
                for (var s in rawdata.value) {
                    var i  = re.exec(s)[1];
                    data.push({
                        'tss': rawdata.timestamp,
                        'values': rawdata.value[s],
                        'id': parseInt(i)});
                }
            }
            return data;
        }
    });

    return SensorCollection;
});
