#!/usr/bin/env python
# -*- coding: utf-8 -*-

import datetime
import calendar
import urllib2 as urllib
from helper import csvparser, xmlparser, print_exc
import time

DEBUG = 1

ADEI_Time_Format = '%d-%b-%y %H:%M:%S.%f'

ADEI_QUERY_STRING = {
        'group': 'db_group',
        'sensor': 'db_mask'
}

def adei_timestamp(adeitimestr):
    timestamp = datetime.datetime.strptime(adeitimestr, ADEI_Time_Format)
    timestamp = calendar.timegm(timestamp.timetuple())
    return timestamp

def parse_csv(url):
    startTime = time.time()
    fp = urllib.urlopen(url)
    resp = csvparser(fp)
    elapsedTime = time.time() - startTime
    print elapsedTime
    #stamps = map(adei_timestamp, resp[0][1:])
    #data = [dict(zip(('name', 'values'), [s[0], s[1:]])) for s in resp[1:]]
    return resp
    #return stamps, data
    
def f(x):
    x = str(x)
    result = []
    try:
        for part in x.split(','):
            if '-' in part:
                a, b = part.split('-')
                a, b = int(a), int(b)
                result.extend(range(a, b + 1))
            else:
                a = int(part)
                result.append(a)
    except:
        pass
    return map(str, result )

def transpose_list(l):
    return map(list, zip(*l))


class ADEIError(Exception):
    pass


class ADEIReader:
    def __init__(self, host, server, db):
        self.host = host + '/services'
        self.server = server
        self.db = db
        return
    def qurl(self, qtype):
        url = ''
        if qtype == 'get':
            url = self.host \
                + '/getdata.php?db_server={server}&db_name={db}'\
                .format(server=self.server, db=self.db)
        return url
    def query(self, qtype='get', **postdata):
        # parse args
        group = str(postdata.get( 'group' )) or ''
        sensor = postdata.get( 'sensor' ) or []
        window = postdata.get( 'window' ) or 0
        resample = postdata.get( 'resample' ) or 0
        sensorMask = ','.join(map(str, sensor))
        #sensorMask = f(sensor)
        # build query url
        url = self.qurl(qtype)
        url += '&db_group=' + group
        url += '&db_mask=' + sensorMask
        if window == 0:
            url += '&window=-1'
        else:
            url += '&window=%d' % window
        url += '&resample=%d' % resample
        # fetch data
        data = parse_csv(url)
        # build sensor list
        #sensorlist = [ group+'__'+s for s in sensorMaskList ]
        #sensorlist.insert(0, 'timestamp')
        # pack data
        sname = [d[0] for d in data]
        svalue = [list( d[1:] ) for d in data]
        svalue[0]  = map(adei_timestamp, svalue[0])
        svalue = transpose_list(svalue)
        # resample data
        #if resample != 0:
            #res_value = [svalue[0]]
            #t0 = svalue[0][0]
            #for v in svalue:
                #if v[0] - t0  >= resample:
                    #res_value.append(v)
                    #t0 = v[0]
            #svalue = res_value
        # debug info
        if DEBUG == 1:
            #import pprint
            print '--------------------------------------------------'
            print url
            #print 'data:', len(data), data[0]
            #print 'sensor names', sname, len(sname)
            #print 'sensor values', svalue, len(svalue[0])
            #print 'sensor', len(sensor)
            print
        return svalue
    
