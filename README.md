## Public interface

The interface for the minimizer is `float *Minimizer_run(const char *fname)` where 
`fname` is a JSON-file of the following format:

`
{
  "vertices":
    [
      {
        "id":       Integer,
        "position": null or [Float, Float],
        "radius":   Integer,
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
`

`vertices` Data representing the vertices of the graph to be visualized

`id` is a non-negative integer, ordered as the indices of the elements of the
vertex array

`position` Either null (for automatic initial placement) or an array [x, y] for
specific placement. (x, y) are floats of values in range [0, 1[

`radius` The radius of a vertex. Affects the placement.

`type` Type of vertex. Affects nothing at the moment.

## Usage

Running `make develop` will compile a development version and place the
executable as `./bin/minimize`.

### Javascript 

The minimizer can be converted to javascript by compiling with 
`make emscript`. This will produce `c_assets.js`, which can be
inbedded into an html-page and run locally. 

### Samples

Samples of some drawings are in mocha.html

For Chrome and IE you need to serve the files with a web server:

* `python -m http.server` or `python -m SimpleHTTPServer` (python 2)

* `http://localhost:8000/mocha.html`

With Firefox, the application should run even as a local file.

## Work to be done.

More features are to be implemented, and optimization of the algorithm. Details
soon.

