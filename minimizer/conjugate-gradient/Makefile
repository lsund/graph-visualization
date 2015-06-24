
standard:
	gcc -Wall -g -std=c99 nrutil.c brent.c mnbrak.c linmin.c frprmn.c -o cg

emscript: nrutil.c  brent.c mnbrak.c linmin.c frprmn.c
	emcc -Wall -g -std=c99 nrutil.c brent.c mnbrak.c linmin.c frprmn.c \
	-o ../../minimizer.js -s EXPORTED_FUNCTIONS="['_cAdd']"

clean: 
	rm *.o *.html.map *.html *.js *.js.map
