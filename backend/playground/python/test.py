import sys

if (len(sys.argv) > 1):
    encodedBuffer = sys.argv[1].encode('utf-8')
    if (encodedBuffer is not None):
        print(True)
    else:
        print(False)
else:
    print(False)
