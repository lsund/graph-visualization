
EMFLAGS=-O1 -s ALLOW_MEMORY_GROWTH=1
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/c
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')

DATAS=$(DATA_DIR)/52.json\
 $(DATA_DIR)/23.json\
 $(DATA_DIR)/43.json\

emscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	$(foreach var,$(DATAS),--preload-file $(var))

smallemscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	--preload-file test.csv

normal: $(SRCS)
	gcc $(CFLAGS) $(SRCS) -o minimize -lm

test: tests/test.c
	gcc -D $(CFLAGS) tests/test.c $(SRCS) -o tests/ctest -lm

runtest: test
	./tests/ctest
