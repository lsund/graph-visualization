# MinGrad

Graph visualization tool. Used to generate good looking graphs in 2d-space.

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
        "label":    null or String,
        "type":     Number
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

`id` is a non-negative integer identifying the vertex. These numbers must be
specified in increasing order.

`fixed` Specifies the type of placement of the vertex. Either null for dynamic
placement or an 2d-array of numbers in range [0, 1) for fixed placement. ex:
[0.5, 0.7]

`label` A textual representation of the vertex

`type` Type of vertex. Affects nothing at the moment.`TODO`

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

1. Create a usable view
2. Create a json data generator, basic usage: gen-json nvertices nbonds
3. Verify that json input has a) increasing order b) only has unique indicies c)
   the bonds connect only valid indicies 
4. remove type field from json
5. make padding automatic

Optimization of global minimizer, support for labels and more to come...
