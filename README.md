# MinGrad

Minimizer component for force directed graph visualization. Will turn JSON into
a set of vertex coordinates representing a good graph layout.

## Usage

Including `minimizer.h` gives access to `float *Minimizer_run(const char *fname)` where 
`fname` is the path to a JSON-file of the following format:

```
{
  "vertices":
    [
      {
        "id":       Integer,
        "fixed": null or [Number, Number],
        "label":   null or String,
        "type":     String
      },
      ...
    ],
  "bonds":
    [
      {
        "fst":  Integer,
        "snd":  Integer
        "len":  Float
      },
      ...
    ]
}
```

`vertices` Data representing the vertices of the graph to be visualized

`id` is a non-negative integer, ordered as the indices of the elements of the
vertex array

`fixed` Either null (for automatic initial placement) or an array [x, y] for
specific placement. (x, y) are floats of values in range [0, 1[

`label` A textual representation of the vertex

`type` Type of vertex. Affects nothing at the moment.

Returned are an array A of floats where A[i] is the x coordinate, A[i + 1] is
the y coordinate of vertex indexed by i / 2 provided that i is an even,
non-negative integer.

Settings can be changed by modifying the literals in `lib/minimize/constants.h`
descriptions are provided.

#### Compiling

Running `make` will compile a executable as `./bin/minimize`.

## TODO

1. Create a usable view
2. Create a json data generator, basic usage: gen-json nvertices nbonds
3. couple view wiwh minimizer using nodejs ffi 

Optimization of global minimizer, support for labels and more to come...
