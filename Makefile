
#ASYNCFLAGS= -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 
CFLAGS=-std=c99 -Wall -g
SRC_DIR=src/minimizer
TEST_SRC_DIR=tests
DATA_DIR=data
OBJ_DIR=obj
CC=gcc

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
OBJS = $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRCS))
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')
DATAS := $(shell find $(DATA_DIR)/* -maxdepth 0 -name '*.json')

develop: $(SRCS)
	$(CC) $(CFLAGS) $(SRCS) src/main_sample.c -o bin/minimize -lm

production: $(SRCS)
	$(CC) $(CFLAGS) -DNDEBUG $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

$(OBJS): $(OBJ_DIR)/%.o : $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -fPIC -c $< -o $@ -lm

lib: dirs $(OBJS)
	$(CC) -shared -o lib/libminimizer.so $(OBJS)

test: $(SRCS) 
	$(CC) $(CFLAGS) -D TEST=1 \
	  $(TEST_SRCS) $(SRCS) -o bin/test -lm

dirs:
	mkdir -p lib obj

runtest: test
	./bin/test

run: develop
	./bin/minimize

.PHONY: clean 

clean: 
	rm -f obj/*

