# MinGrad

Graph visualization tool. Used to generate good looking simple graphs (graphs
without parallel edges and edge loops) in 2d-space.

## Usage

The main API is `float *Minimizer_run(const char *fname)` defined in `minimizer.h` where 
`fname` is the path to a JSON-file of the following format:

```
{
  "vertices":
    [
      {
        "id":       Number,
        "fixed":    null or [Number, Number],
        "label":    null or String
      },
      ...
    ],
  "bonds":
    [
      {
        "fst":      Number,
        "snd":      Number
        "len":      Number
      },
      ...
    ]
}
```

The data is formatted into two arrays describing the vetices and bonds of the
graph to be visualized. For verticies: 

`id` is an integer identifying the vertex. This number must be unique in respect
to other id's and has to take a value in range `(0, nv- 1)` if nv is the total number of
verticies.

`fixed` Specifies the type of placement of the vertex. Either null for dynamic
placement or an 2d-array of numbers in range [0, 1) for fixed placement. ex:
[0.5, 0.7]

`label` A textual representation of the vertex

For bonds:

`fst` Is the `id` identification nunmber of the first vertex.

`snd` Is the `id` identification nunmber of the second vertex.

`len` is the optimal length of the vertex, takes a value in range [0, 1)

Returned are an array A of floats where A[i] is the x coordinate, A[i + 1] is
the y coordinate of vertex indexed by i / 2 provided that i is an even,
non-negative integer.

#### Compiling

Running `make develop` will compile a executable as `./bin/minimize`.
Running `make lib` will compile standalone shared library as  `./lib/libminimizer.so`.

## TODO

1. test self-looping, parallel bonds
2. make force weights automatic
3. label data
4. Add unit tests for all functions
	```
	test_angular_gradient.c [ ]
	test_bond.c             [ ]
	test_bond_connection.c  [ ]
	test_bond_overlap.c     [ ]
	test_bond_pair.c        [ ]
	test_bond_set.c         [ ]
	test.c                  [ ]
	test_cross_gradient.c   [ ]
	test_energy.c           [ ]
	test_global_minimizer.c [ ]
	test_gradient.c         [ ]
	test_graph.c            [ ]
	test_grid.c             [ ]
	test_linmin.c           [ ]
	test_local_minimizer.c  [ ]
	test_minimizer.c        [ ]
	test_pair.c             [ ]
	test_parse_json.c       [ ]
	test_placement.c        [ ]
	test_util.c             [ ]
	test_vector.c           [ ]
	test_vertex.c           [ ]
	test_vertex_pair.c      [ ]
	test_vertex_set.c       [ ]
	test_zone.c             [ ]
	test_zone_pair.c        [ ]
	```


