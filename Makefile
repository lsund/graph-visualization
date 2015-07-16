
EMFLAGS=-O1 -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 -D EMSCRIPT=1
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/c
DATA_DIR=data

ALL_SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
SRCS := $(filter-out test.c, $(ALL_SRCS))


DATAS=$(DATA_DIR)/52.json\
 $(DATA_DIR)/23.json\
 $(DATA_DIR)/43.json\
 $(DATA_DIR)/8.json\
 $(DATA_DIR)/6.json\

emscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) -D TEST=1 $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	$(foreach var,$(DATAS),--preload-file $(var))

smallemscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	--preload-file test.csv

normal: $(SRCS)
	gcc $(CFLAGS) $(SRCS) -o bin/minimize -lm

test: $(ALL_SRCS) 
	gcc $(CFLAGS) $(ALL_SRCS) -o bin/test -lm

runtest: test
	./tests/ctest
