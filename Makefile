
emscript: c_src/util.c c_src/brent.c c_src/mnbrak.c c_src/linmin.c \
  c_src/frprmn.c minimizer.c
	emcc -O1 -Wall -g -std=c99 c_src/util.c c_src/brent.c c_src/mnbrak.c \
	c_src/linmin.c c_src/frprmn.c \
	minimizer.c -o c_assets.js -s \
	EXPORTED_FUNCTIONS="['_minimize']" \
	--preload-file data/dmt_clusters_subset1 \
	--preload-file data/dmt_cluster_64.csv
