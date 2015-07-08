
EMFLAGS=-O1
CFLAGS=-std=c99 -Wall -g

SRC_DIR=lib/c
DATA_DIR=data

SRCS := $(shell find $(SRC_DIR) -name '*.c')

DATAS= $(DATA_DIR)/c_32/dmt_cluster.csv\
 $(DATA_DIR)/c_32/dmt_sizes.json\
 $(DATA_DIR)/c_64/dmt_cluster.csv\
 $(DATA_DIR)/c_64/dmt_sizes.json\
 $(DATA_DIR)/c_128/dmt_cluster.csv\
 $(DATA_DIR)/c_128/dmt_sizes.json\
 $(DATA_DIR)/c_256/dmt_cluster.csv\
 $(DATA_DIR)/c_256/dmt_sizes.json\
 $(DATA_DIR)/c_64/subsets/dmt_clusters_subset1/\
 $(DATA_DIR)/test.csv\
 $(DATA_DIR)/testsizes.json 

emscript: $(SRCS)
	emcc $(EMFLAGS) $(CFLAGS) $(SRCS) \
	-o lib/c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	$(foreach var,$(DATAS),--preload-file $(var))

test: test.c
	gcc $(CFLAGS) test.c -o test/ctest 

runtest: test
	./test/ctest
