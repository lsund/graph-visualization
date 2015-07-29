
EMFLAGS=-O1 -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 -D EMSCRIPT=1
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/c
TEST_SRC_DIR=tests
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')

DATAS=$(DATA_DIR)/52.json\
 $(DATA_DIR)/23.json\
 $(DATA_DIR)/43.json\
 $(DATA_DIR)/10.json\
 $(DATA_DIR)/4.json\
 $(DATA_DIR)/3.json\
 $(DATA_DIR)/3-1.json\
 $(DATA_DIR)/4-1.json\
 $(DATA_DIR)/3-2.json\

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
	gcc $(CFLAGS) $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

test: $(SRCS) 
	gcc $(CFLAGS) -D TEST=1 $(TEST_SRCS) $(SRCS) -o bin/test -lm

runtest: test
	./bin/test

run: normal
	./bin/minimize
