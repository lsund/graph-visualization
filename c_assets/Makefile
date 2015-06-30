
emscript: util.c brent.c mnbrak.c linmin.c frprmn.c minimizer.c
	emcc -Wall -g -std=c99 util.c brent.c mnbrak.c linmin.c frprmn.c \
	minimizer.c -o ../c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	--preload-file data/dmt_14_10.csv --preload-file data/dmt_12_7.csv \
	--preload-file data/dmt_22_10.csv 
	
