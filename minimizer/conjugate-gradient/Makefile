
standard: nrutil.c brent.c mnbrak.c linmin.c frprmn.c minimizer.c
	gcc -Wall -g -std=c99 nrutil.c brent.c mnbrak.c linmin.c frprmn.c \
	minimizer.c -o minimizer -lm

emscript: nrutil.c brent.c mnbrak.c linmin.c frprmn.c minimizer.c
	emcc -Wall -g -std=c99 nrutil.c brent.c mnbrak.c linmin.c frprmn.c \
	minimizer.c -o ../../minimizer.js -s EXPORTED_FUNCTIONS="['_minimize']"

clean: 
	rm *.o *.html.map *.html *.js *.js.map
