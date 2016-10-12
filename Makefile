
#ASYNCFLAGS= -s EMTERPRETIFY=1 -s EMTERPRETIFY_ASYNC=1 
CFLAGS=-std=c99 -Wall -g
SRC_DIR=src/minimizer
JSON_GEN_SRC_DIR=src/jsongen
TEST_SRC_DIR=tests
DATA_DIR=data
OBJ_DIR=obj
CC=gcc

SRCS := $(shell find $(SRC_DIR)/* -maxdepth 0 -name '*.c')
JSON_GEN_SRCS := $(shell find $(JSON_GEN_SRC_DIR)/* -maxdepth 0 -name '*.hs')
OBJS = $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRCS))
TEST_SRCS := $(shell find $(TEST_SRC_DIR)/* -maxdepth 0 -name '*.c')
DATAS := $(shell find $(DATA_DIR)/* -maxdepth 0 -name '*.json')

### Minimizer

all: minimizer

$(OBJS): $(OBJ_DIR)/%.o : $(SRC_DIR)/%.c
	$(CC) $(CFLAGS) -fPIC -c $< -o $@ -lm

lib: dirs clean $(OBJS) $(SRCS)
	$(CC) -shared -o lib/libminimizer.so $(OBJS)

minimizer: $(OBJS)

install: $(SRCS)
	$(CC) $(CFLAGS) $(SRCS) src/main.c -o bin/minimize -lm

install_test: $(SRCS) $(TEST_SRCS)
	$(CC) $(CFLAGS) \
	  $(TEST_SRCS) $(SRCS) -o bin/test -lm

install_prod: $(SRCS)
	$(CC) $(CFLAGS) -DNDEBUG $(TEST_SRCS) $(SRCS) -o bin/minimize -lm

run: install
	./bin/minimize

runtest: install_test
	./bin/test

### JsonGen

jsongen: $(JSON_GEN_SRCS)
	ghc $(JSON_GEN_SRCS) -o bin/jsongen 

### Misc

dirs:
	mkdir -p lib obj

.PHONY: clean 

clean: 
	rm -f obj/*

