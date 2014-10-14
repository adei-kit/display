import os
import numpy
import gluon.contrib.simplejson as json
from pprint import pprint
from gluon.custom_import import track_changes; track_changes(True)
from adeireader.adeireader import ADEIReader
import collections

f_server = open(os.path.join(request.folder, 'static/config/server.json'))
config_server = json.load(f_server)
f_server.close()
pprint(config_server)

def index():
    return locals()

@request.restful()
def api():
    response.view = 'generic.'+request.extension
    if request.env.http_origin:
        response.headers['Access-Control-Allow-Origin'] = '*'
    def GET(*args, **kargs):
        """
            Case 1:
                '/api/server_name/group_name/sensor_mask.json'
            Case 2:
                '/api/sensor_file.json'
        """
        # case 1
        if len(args) == 3:
            server, group, sensor = args
            if server not in config_server:
                return "Error: server setting (%s) not found" %s
            else:
                ar = ADEIReader( config_server[server]['host'],
                                 config_server[server]['server'],
                                 config_server[server]['database'])
                res = ar.query(group=group, sensor=sensor)
                return dict(timestamp=res[0][0], value=res[0][1])
        # case 2
        elif len(args) == 1:
            if 'w' in kargs:
                window = int( kargs['w'] )
            else:
                window = 0
            if 'r' in kargs:
                resample = int( kargs['r'] )
            else:
                resample = 10
            if ( window / resample > 30 ):
                resample = window/30 + 1
            try:
                f_sensor = open(os.path.join(request.folder, 'static/config/' + args[0] + '.json'))
                sensors = json.load(f_sensor)
                f_sensor.close()
            except IOError:
                return "Error: %s.json not found on server" % args[0]
            for i in range(len(sensors)-1):
                if sensors[i]['server'] != sensors[i+1]['server']:
                    return "Error: sensors from different SERVER is found in %s.json" % args[0]
                if sensors[i]['group'] != sensors[i+1]['group']:
                    return "Error: sensors from different GROUP is found in %s.json" % args[0]
            server = sensors[0]['server']
            group = sensors[0]['group']
            # initial output
            output = {}
            sensor_masks = []
            sensor_ids = []
            for i, s in enumerate(sensors):
                output['sensor-'+str(i)] = []
                if s['sensor'] >= 0:
                    sensor_masks.append(s['sensor'])
                    sensor_ids.append(i)
            # query
            ar = ADEIReader( config_server[server]['host'],
                             config_server[server]['server'],
                             config_server[server]['database'])
            query_res = ar.query(group=group, sensor=sensor_masks, window=window, resample=resample)
            query_res = numpy.array( query_res )
            timestamp = query_res[ :,0 ].tolist()
            for i in sensor_ids:
                output['sensor-'+str(i)] = query_res[:, i+1].tolist()
            return dict(timestamp=timestamp, value=output)
    return locals()
