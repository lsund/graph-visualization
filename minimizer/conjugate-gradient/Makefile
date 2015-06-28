
standard: util.c brent.c mnbrak.c linmin.c frprmn.c minimizer.c
	gcc -Wall -g -std=c99 util.c brent.c mnbrak.c linmin.c frprmn.c \
	minimizer.c -c -lm

emscript: util.c brent.c mnbrak.c linmin.c frprmn.c minimizer.c
	emcc -Wall -g -std=c99 util.c brent.c mnbrak.c linmin.c frprmn.c \
	minimizer.c -o ../../minimizer.js -s EXPORTED_FUNCTIONS="['_minimize']"

