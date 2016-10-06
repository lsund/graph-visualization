
#ASYNCFLAGS= -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 
CFLAGS=-std=c99 -Wall -g

SRC_DIR=src/minimizer
TEST_SRC_DIR=tests
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')
DATAS := $(shell find $(DATA_DIR)/* -maxdepth 0 -name '*.json')

develop: $(SRCS)
	gcc $(CFLAGS) $(SRCS) src/main_sample.c -o bin/minimize -lm

production: $(SRCS)
	gcc $(CFLAGS) -DNDEBUG $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

test: $(SRCS) 
	gcc $(CFLAGS) -D TEST=1 \
	  $(TEST_SRCS) $(SRCS) -o bin/test -lm

runtest: test
	./bin/test

run: develop
	./bin/minimize
