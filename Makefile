
emscript: c_src/util.c \
	  c_src/brent.c \
	  c_src/mnbrak.c \
	  c_src/linmin.c \
  	  c_src/frprmn.c \
	  c_src/json.c \
	  c_src/get_clustersizes.c\
	  minimizer.c
	emcc -O1 -Wall -g -std=c99 \
	c_src/util.c \
	c_src/brent.c \
	c_src/mnbrak.c \
	c_src/linmin.c \
	c_src/frprmn.c \
	c_src/json.c \
	c_src/get_clustersizes.c \
	minimizer.c \
	-o c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	--preload-file data/c_32/dmt_cluster.csv \
	--preload-file data/c_32/dmt_sizes.json \
	--preload-file data/c_64/dmt_cluster.csv \
	--preload-file data/c_64/dmt_sizes.json \
	--preload-file data/c_128/dmt_cluster.csv \
	--preload-file data/c_128/dmt_sizes.json \
	--preload-file data/c_256/dmt_cluster.csv \
	--preload-file data/c_256/dmt_sizes.json \
	--preload-file data/c_64/subsets/dmt_clusters_subset1/ \


