import sys
import json
import getopt


def usage():
    return


def main():
    try:
        opts, args = getopt.getopt( sys.argv[1:], "hm:v", [ "help", "mode=" ] )
    
    except getopt.GetoptError as err:
        # print help information and exit:
        print(err)  # will print something like "option -a not recognized"
        usage()
        sys.exit(2)
    
    mode = None
    verbose = False
    for o, a in opts:
        if o == "-v":
            verbose = True

        elif o in ("-h", "--help"):
            usage()
            sys.exit()

        elif o in ("-m", "--mode"):
            if a in ( 'frontend', 'release', 'backend' ):
                mode = a

            else:
                assert False, "incorrect mode option"    

        else:
            assert False, "unhandled option"

    with open( 'release.json', 'r' ) as stream:
        data = json.load( stream )
 

    data[ mode ][ 'build' ] += 1
    print( json.dumps( data, indent=4 ) )

    with open( 'release.json', 'w' ) as stream:
        json.dump( data, stream )

    return

if __name__ == '__main__':
    main()
    