import unittest
import os, sys; sys.path.insert(0, os.path.abspath(".."))
print sys.path
import adeireader
print adeireader
print dir(adeireader)

host = "http://katrin.kit.edu/adei"
server = "fpd"
database = "katrin_rep"
ar = adeireader.ADEIReader(host, server, database)

class AdeiQueryTests(unittest.TestCase):
    def testGetQuery(self):
        self.assertEqual( len( ar.query('get', group=1, sensor='1-5')[0] ), 6 )
        self.assertEqual( len(ar.query('get', group=1, sensor=1)), 1 )
        self.assertGreater(len( ar.query('get', group=1, sensor=1, window=30) ), 1) 
        self.assertEqual( len(ar.query('get', group=1, sensor=1, window=100, resample=15)), 5 )
        assert False

def main():
    unittest.main()

if __name__ == '__main__':
    main()
