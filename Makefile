
EMFLAGS=-O1 -D EMSCRIPT=1 -s PRECISE_F32=1 
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/minimizer
TEST_SRC_DIR=tests
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')

DATAS=$(DATA_DIR)/52.json\
 $(DATA_DIR)/23.json\
 $(DATA_DIR)/43.json\
 $(DATA_DIR)/69.json\

emscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_Minimizer_run']" \
	$(foreach var,$(DATAS),--preload-file $(var))

smallemscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_Minimizer_run']" \
	--preload-file test.csv

develop: $(SRCS)
	gcc $(CFLAGS) $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

production: $(SRCS)
	gcc $(CFLAGS) -DNDEBUG $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

test: $(SRCS) 
	gcc $(CFLAGS) -D TEST=1 \
	  $(TEST_SRCS) $(SRCS) -o bin/test -lm

runtest: test
	./bin/test

run: develop
	./bin/minimize
