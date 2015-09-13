# MinGrad

Minimizer component for force directed graph visualization. Will turn JSON into
a set of coordinates representing a good graph layout.

## Public interface

The interface for the minimizer is `float *Minimizer_run(const char *fname)` where 
`fname` is the path to a JSON-file of the following format:

```json
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

## Javascript 

The minimizer can be converted to javascript by compiling with 
`make emscript`. This will produce `lib/c_assets.js`, which can be
inbedded into an html-page and run locally. 

## Samples

A sample visualization application has been developed and is accesible through
`lib/index.html`
For Chrome and IE you need to serve the files with a web server:

* `python -m http.server` or `python -m SimpleHTTPServer` (python 2)

* `http://localhost:8000/index.html`

With Firefox, the application should run even as a local file.

## Work to be done.

Optimization of global minimizer, support for labels and more to come...
