import xml.etree.ElementTree as ET
import csv
import sys
import colorstring
import traceback

def xmlparser(handler):
    tree = ET.parse(handler)
    result = []
    for child in tree.getroot():
        result.append(child.attrib)
    return result 

def csvparser(handler):
    rows = csv.reader(handler, skipinitialspace=True)                                                                      
    fields = rows.next()
    data = [row for row in rows if row]
    return zip(fields, *data)

def print_exc():
    exctype, value, tb  = sys.exc_info()
    filename, linenumber, functionname, text =  traceback.extract_tb(tb, 1)[0]
    sys.stderr.write("[Error] Unexpected exception\n")
    sys.stderr.write("            type: %s\n" % exctype)
    sys.stderr.write("         message: %s\n" % colorstring.ERROR(value.message))
    sys.stderr.write("        function: %s\n" % colorstring.ERROR(functionname))
    sys.stderr.write("            text: %s\n" % text)
    sys.stderr.write("            file: %s: %s\n" % (filename, linenumber))



