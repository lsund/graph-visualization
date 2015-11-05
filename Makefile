
EMFLAGS=-O1 -D EMSCRIPT=1 -s PRECISE_F32=1 -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/minimizer
TEST_SRC_DIR=tests
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')

DATAS=$(DATA_DIR)/12.json \
	  $(DATA_DIR)/23.json \
	  $(DATA_DIR)/25.json \
	  $(DATA_DIR)/28.json \
	  $(DATA_DIR)/2.json \
	  $(DATA_DIR)/33.json \
	  $(DATA_DIR)/43.json \
	  $(DATA_DIR)/45.json \
	  $(DATA_DIR)/51.json \
	  $(DATA_DIR)/52.json \
	  $(DATA_DIR)/52-2.json \
	  $(DATA_DIR)/63.json \
	  $(DATA_DIR)/67.json \
	  $(DATA_DIR)/71.json \

emscript-fromsingle: lib/metafile.c
	emcc $(EMFLAGS) $(CFLAGS) lib/metafile.c \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_Minimizer_run']" \
	$(foreach var,$(DATAS),--preload-file $(var))

executable-fromsingle: lib/minimizer/metafile.c lib/minimizer/main_sample.c
	gcc $(CFLAGS) -DNDEBUG lib/minimizer/metafile.c lib/minimizer/main_sample.c \
	  -o bin/minimize -lm

object-fromsingle: lib/minimizer/metafile.c 
	gcc $(CFLAGS) -c -DNDEBUG lib/minimizer/metafile.c -o obj/minimize.o -lm

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
