
#include <assert.h>
#include <stdlib.h>
#include <math.h>
#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include <ctype.h>
#include <string.h>
#include <unistd.h>
#include <sys/stat.h>

#ifndef CONSTANTS_H
#define CONSTANTS_H

// Print information about the run to standard output
#define PRINT_STATISTICS 1

// Maximum number of allowed vertices
#define MAX_NV 100

// The outputed coordinates will lie in range [0..PANEL_X[, [0..PANEL_Y[
#define PANEL_X 1.0
#define PANEL_Y 1.0

// WEIGHTS FOR PENALTY TERMS
// 
// ATTRACTION
#define WATR 15.0

//REPULSION
#define WREP 500.0

// GRAVITY
#define WPOT 1.0

// ANGULAR RESOLUTION
#define WANG 0.002

// OVERLAP
#define WCRS 1.65

// Toggle animation
#define STEP 0
// Animation interval 
#define INTERVAL 500

// CONSTANTS BELOW THIS LINE SHOULD PROBABLY NOT BE CHANGED ///////////////////

// Data defined data labels 
#define MAX_LABEL_LENGTH 8 + 1 
// File name macx length
#define MAX_FILENAME_LENGTH 128

// Dimension of individual grid rectangles
#define GRID_DIM_X (int) (PANEL_X / PADDING)
#define GRID_DIM_Y (int) (PANEL_Y / PADDING)

// Vertex default type
#define DEFAULT_TYPE 'd' 

// Small numbers  
#define FTOL 1.0e-5
#define TOL 2.0e-4 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20
#define COMP_EPS 1.0e-4
#define MIN_DIST 0.01

#define M_PI 3.14159265358979323846

// Minimizer magic numbers
#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#if !TEST

// Max iterations of local minimizer
#define L_ITMAX 200
// Max iterations of global minimizer
#define G_ITMAX 10 

// 'Acceptance' temperature of global minimizer
#define TEMPERATURE 0.0

// Padding between nodes. 
#define PADDING 0.12
// Optimal bond-length 
#define SPRING_LENGTH 0.09

#define VERTEX_BASE_WIDTH 0.001
#define VERTEX_BASE_HEIGHT  0.001

// Vertex mass
#define DEFAULT_MASS 0

#else 

//TEST CONSTANTS////////////////////////////////////////////////

#define L_ITMAX 200
#define G_ITMAX 10
#define T_ITMAX 5

#define TEMPERATURE 0

#define PADDING 0.1
#define SPRING_LENGTH 0.1

#define VERTEX_BASE_WIDTH 0
#define VERTEX_BASE_HEIGHT 0

#define THETA0 M_PI

#define DEFAULT_STIFFNESS 1.0
#define DEFAULT_MASS 0

#define WATR 1.0
#define WREP 1.0
#define WPOT 1.0
#define WANG 1.0
#define WCRS 1.0

#endif

#endif

/* vim: set et ts=3 sw=3 sts=3 ft=c:
 *
 * Copyright (C) 2012, 2013, 2014 James McLaughlin et al.  All rights reserved.
 * https://github.com/udp/json-parser
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer in the
 *   documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

#ifndef _JSON_H
#define _JSON_H

#ifndef json_char
   #define json_char char
#endif

#ifndef json_int_t
   #ifndef _MSC_VER
      #include <inttypes.h>
      #define json_int_t int64_t
   #else
      #define json_int_t __int64
   #endif
#endif


#ifdef __cplusplus

   #include <string.h>

   extern "C"
   {

#endif

typedef struct
{
   unsigned long max_memory;
   int settings;

   /* Custom allocator support (leave null to use malloc/free)
    */

   void * (* mem_alloc) (size_t, int zero, void * user_data);
   void (* mem_free) (void *, void * user_data);

   void * user_data;  /* will be passed to mem_alloc and mem_free */

   size_t value_extra;  /* how much extra space to allocate for values? */

} json_settings;

#define json_enable_comments  0x01

typedef enum
{
   json_none,
   json_object,
   json_array,
   json_integer,
   json_double,
   json_string,
   json_boolean,
   json_null

} json_type;

extern const struct _json_value json_value_none;
       
typedef struct _json_object_entry
{
    json_char * name;
    unsigned int name_length;
    
    struct _json_value * value;
    
} json_object_entry;

typedef struct _json_value
{
   struct _json_value * parent;

   json_type type;

   union
   {
      int boolean;
      json_int_t integer;
      double dbl;

      struct
      {
         unsigned int length;
         json_char * ptr; /* null terminated */

      } string;

      struct
      {
         unsigned int length;

         json_object_entry * values;

         #if defined(__cplusplus) && __cplusplus >= 201103L
         decltype(values) begin () const
         {  return values;
         }
         decltype(values) end () const
         {  return values + length;
         }
         #endif

      } object;

      struct
      {
         unsigned int length;
         struct _json_value ** values;

         #if defined(__cplusplus) && __cplusplus >= 201103L
         decltype(values) begin () const
         {  return values;
         }
         decltype(values) end () const
         {  return values + length;
         }
         #endif

      } array;

   } u;

   union
   {
      struct _json_value * next_alloc;
      void * object_mem;

   } _reserved;

   #ifdef JSON_TRACK_SOURCE

      /* Location of the value in the source JSON
       */
      unsigned int line, col;

   #endif


   /* Some C++ operator sugar */

   #ifdef __cplusplus

      public:

         inline _json_value ()
         {  memset (this, 0, sizeof (_json_value));
         }

         inline const struct _json_value &operator [] (int index) const
         {
            if (type != json_array || index < 0
                     || ((unsigned int) index) >= u.array.length)
            {
               return json_value_none;
            }

            return *u.array.values [index];
         }

         inline const struct _json_value &operator [] (const char * index) const
         { 
            if (type != json_object)
               return json_value_none;

            for (unsigned int i = 0; i < u.object.length; ++ i)
               if (!strcmp (u.object.values [i].name, index))
                  return *u.object.values [i].value;

            return json_value_none;
         }

         inline operator const char * () const
         {  
            switch (type)
            {
               case json_string:
                  return u.string.ptr;

               default:
                  return "";
            };
         }

         inline operator json_int_t () const
         {  
            switch (type)
            {
               case json_integer:
                  return u.integer;

               case json_double:
                  return (json_int_t) u.dbl;

               default:
                  return 0;
            };
         }

         inline operator bool () const
         {  
            if (type != json_boolean)
               return false;

            return u.boolean != 0;
         }

         inline operator double () const
         {  
            switch (type)
            {
               case json_integer:
                  return (double) u.integer;

               case json_double:
                  return u.dbl;

               default:
                  return 0;
            };
         }

   #endif

} json_value;
       
json_value * json_parse (const json_char * json,
                         size_t length);

#define json_error_max 128
json_value * json_parse_ex (json_settings * settings,
                            const json_char * json,
                            size_t length,
                            char * error);

void json_value_free (json_value *);


/* Not usually necessary, unless you used a custom mem_alloc and now want to
 * use a custom mem_free.
 */
void json_value_free_ex (json_settings * settings,
                         json_value *);


#ifdef __cplusplus
   } /* extern "C" */
#endif

#endif


#ifndef UTIL_H
#define UTIL_H

#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define SIGN(a,b) ((b) > 0.0 ? fabs(a) : -fabs(a))
#define SHFT(a,b,c,d) (a)=(b);(b)=(c);(c)=(d);

typedef enum { INITIALIZE, UPDATE } Strategy;

typedef enum { PLUS, MINUS } Sign;

// The sign as type Sign of its arguments
Sign Util_sign(const double x);

// The minimum value of a set of doubles;
double Util_doubles_min(const double *set, const int n);

// The maximum value of a set of doubles.
double Util_doubles_max(const double *set, const int n);

// Normalizes a set of doubles to range [0, upper] where the domain of the set
// is [min, max]
void Util_normalize(
        double *set, 
        const int n, 
        const double upper, 
        const double min, 
        const double max 
    );

// 1 if tar and x are "equal" (high precision), 0 otherwise
int Util_equal(const double tar, const double x);

// 1 if x is equal to zero (high precision), 0 otherwise
int Util_is_zero(const double x);

// 1 if tar and x are "equal" (medium precision), 0 otherwise
int Util_about(const double tar, const double x);

// 1 if tar and x are "equal" (low precision), 0 otherwise
int Util_close_to(const double tar, const double x);

// 1 if x has a value between lower and upper or x is "equal" to (high
// precision) to lower or upper, 0 otherwise
int Util_in_range(const double lower, const double upper, const double x);

// 1 if x has a value between lower and upper, 0 otherwise
int Util_in_range_strict(
        const double lower, 
        const double upper, 
        const double x
    );

// Prints the specified message to stderr and terminates the program
void Util_runtime_error(char []);

// A pointer to a number of nmemb allocated memory-blocks of size size bytes,
// initialized to zero.
void *Util_allocate_initialize(int nmemb, int size);

// A pointer to a number of nmemb allocated memory-blocks of size size bytes
void *Util_allocate(int nmemb, int size);

#endif

#ifndef VECTOR_H
#define VECTOR_H

// A vector is a measure of direction and length in 2D-space. It is represented
// as thee values: (x, y) for the x and y coordinates the vector is pointind at
// and (len) for its length. The root of a vector is at origo (0, 0)
typedef struct vector Vector, *VectorPointer;

struct vector
{
    double x, y, len;
};

// The vector pointing at (x, y)
Vector Vector_initialize(const double x, const double y);

// The pointer to the vector pointing at (x, y)
VectorPointer Vector_create(const double x, const double y);

// The vector pointing at (0, 0)
Vector Vector_zero();

// The resulting vector from the summation of vectors vec0, vec1
Vector Vector_add(Vector vec0, Vector vec1);

// The resulting vector from the negation of vectors vec0, vec1
Vector Vector_sub(Vector vec0, Vector vec1);

// The resulting vector from the multiplication of vectors vec0, vec1
Vector Vector_mult(Vector vec0, Vector vec1);

// The resulting vector from the negation of vector vec
Vector Vector_negate(Vector vec);

// The resulting vector from the element-wise multiplication of vector vec and
// scalar c
Vector Vector_scalar_mult(Vector vec, double c);

// The resulting vector from the element-wise addition of vector vec and scalar
// c
Vector Vector_scalar_add(Vector vec, double c);

// The dot product of vectors vec0, vec1
double Vector_dot(Vector vec0, Vector vec1);

// The norm (length) of vector v
double Vector_norm(Vector v);

// The angle between vectors vec0, vec1
double Vector_angle(Vector vec0, Vector vec1);

// 1 if vectors vec0, vec1 are parallel, 0 otherwise
int Vector_parallel(Vector vec0, Vector vec1);

// 1 if vectors vec0, vec1 are equal 0 otherwise
int Vector_equal(Vector vec0, Vector vec1);

#endif
#define ANSI_COLOR_RED "\x1b[31m"
#define ANSI_COLOR_RESET "\x1b[0m"

#ifndef ANGULAR_GRADIENT_H
#define ANGULAR_GRADIENT_H

double AngularGradient_dfx0(Vector v0, Vector v1, Vector v2, double w, int mass);
double AngularGradient_dfy0(Vector v0, Vector v1, Vector v2, double w, int mass);
double AngularGradient_dfx1(Vector v0, Vector v1, Vector v2, double w, int mass);
double AngularGradient_dfy1(Vector v0, Vector v1, Vector v2, double w, int mass);
double AngularGradient_dfx2(Vector v0, Vector v1, Vector v2, double w, int mass);
double AngularGradient_dfy2(Vector v0, Vector v1, Vector v2, double w, int mass);

#endif

#ifndef VERTEX_H
#define VERTEX_H

// A vertex is the structure representing a specific data point. A vertex is
// represented a rectangle in the 2d-plane with a position coordinate (pos), a
// topleft coordinate (tl) and a bottomright coordinate (br). A vertex is
// identified by its (id), a unique non-negative integer. A vertex has a mass
// which is a measure of how many relations it has to other vertices and a
// (fixed) flag, which indicates weather or not this vertex will move from its
// initial placement position. 
// A vertex also has a specified type, and a label - a brief textual
// representation of the data the vertex is representing. A vertex also keeps
// track of its (energy), its current (gradient). 
// (g), (h), (pos0) and (grad0) are values used in minimization.
typedef struct vertex Vertex, *VertexPointer;

struct vertex 
{
    Vector pos, tl, br;
    Vector gradient, g, h;
    Vector pos0, grad0;
    int id, mass, fixed;
    char type;
    char *label;
    VertexPointer next;
    double energy;
};

// A vertex with the specified values for  id, position, label, type and a
// fixed flag
Vertex Vertex_initialize(
        const int id, 
        const Vector pos, 
        char *label,
        const char type,
        const int fixed
);

// A pointer to a vertex with the specified values for  id, position, label,
// type and a fixed flag
VertexPointer Vertex_create(
        const int id, 
        const Vector pos, 
        char *label,
        const char type,
        const int fixed
);

// A copy of the vertex v
Vertex Vertex_copy(const Vertex v);

// A pointer to the copy of vertex v
VertexPointer Vertex_copy_pointer(const VertexPointer v);

// Resets the non-constant quantities of a vertex to an appropriate value.
void Vertex_reset_dynamics(VertexPointer v);

// Set the position of a vertex
void Vertex_set_position(const VertexPointer v, const Vector pos);

// Move vertex at v along vector s 
void Vertex_move(const VertexPointer v, const Vector s);

// The potential energy of the vertex at v, proportional to the distance
// from v->pos to the center of the screen 
double Vertex_potential_energy(const VertexPointer v);

// The gradient of the potential energy of the vertex at v, the x and y
// derivative.
Vector Vertex_potential_gradient(const VertexPointer v);

// Frees the vertex at v
void Vertex_free(VertexPointer v);

#endif

#ifndef PAIR_H
#define PAIR_H

// A pair is a generic set of two void pointers.
typedef struct Pair Pair, *PairPointer;

struct Pair {
    void *fst, *snd; 
};

// The Pair of the specified pointers.
Pair Pair_initialize(void *fst, void *snd);

// The pointer to the pair of the specified pointer.
PairPointer Pair_create(void *fst, void *snd);

#endif

#ifndef BOND_H
#define BOND_H

// A bond is a connection between the two vertices pointed at by fst and snd. A
// bond has a preferred length dist0 and a stiffness value which is a measure
// of the rate this particular bond is attempting to preserve that length.
typedef struct Bond Bond, *BondPointer;

struct Bond {
    VertexPointer fst, snd;
    double dist0;
    double stiffness;
};

// A bond with the specified values for vertices and preferred
// length.
Bond Bond_initialize(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

// A pointer to a bond with the specified values for vertices and
// preferred length.
BondPointer Bond_create(
        const VertexPointer fst, 
        const VertexPointer snd, 
        const double dist0
    );

// The energy value of the bond at b.
double Bond_attraction_energy(const BondPointer b);

// The x and y derivatives of the bond at b
Vector Bond_attraction_gradient(const BondPointer b);

// Free the bond at bp
void Bond_free(BondPointer b);

#endif

#ifndef BOND_PAIR_H
#define BOND_PAIR_H

// A bond pair is a collection of two pointers to bonds
typedef struct bondpair BondPair, *BondPairPointer;

struct bondpair {
  BondPointer fst, snd;
};

// A bond pair from the specified pair pr
BondPair BondPair_initialize(const Pair pr);

// A pointer to the bond pair from the specified pair pr
BondPairPointer BondPair_create(const Pair pr);

// 1 if the bondpair intersect in which case the intersection coordinates will
// be stored in v, 0 otherwise in which case v will take the value of 0.
int BondPair_intersect(const BondPair bpr, VectorPointer v);

// 1 if the bondpair share a common vertex, 0 otherwise
int BondPair_has_common_vertex(const BondPair bpr);

#endif

#ifndef BOND_CONNECTION_H
#define BOND_CONNECTION_H

// A bond connection is a pair of bonds which share a common vertex. They are
// internally stored as a linked list, so each structure has a pointer to the
// next element in this list.
typedef struct bondconnection BondConnection, *BondConnectionPointer;

struct bondconnection {
    VertexPointer common, other1, other2;
    BondPair bpr;
    BondConnectionPointer next;
};

// A bond connection speciied by the pair pr
BondConnection BondConnection_initialize(const Pair pr);

// A pointer to the bond connection specified by the pair pr
BondConnectionPointer BondConnection_create(const Pair pr);

// The angular energy of the bondconnection at bcon 
double BondConnection_angular_energy(const BondConnectionPointer bcon);

// The angular gradient, the x and y derivative  of the bondconnection at bcon
VectorPointer BondConnection_angular_gradient(const BondConnectionPointer bcon);

// Frees the bondconnection at bcons and its linked elements
void BondConnections_free(const BondConnectionPointer bcons);

#endif

#ifndef BOND_OVERLAP_H
#define BOND_OVERLAP_H

// A bond overlap is a pair of bonds such that if drawn in the 2d-plane, they
// overlap. Bond overlaps are internally stored as a linked list, which means
// each bond overlap structure has a pointer to the next bond overlap
// structure. 
typedef struct bondoverlap BondOverlap, *BondOverlapPointer;

struct bondoverlap {
    BondPair bpr;
    Vector cross;
    BondOverlapPointer next;
};

// A bond overlap of the bond pair bpr and the position of the intersection as
// cross
BondOverlap BondOverlap_initialize(const BondPair bpr, const Vector cross);

// A pointer to the bond overlap of the bond pair bpr and the position of the
// intersection as cross
BondOverlapPointer BondOverlap_create(
        const BondPair bpr, 
        const Vector cross
    );

// The energy value of the bond overlap. 
double BondOverlap_overlap_energy(const BondOverlapPointer bpr);

// The gradient of the bond overlap, the x and y derivative.
VectorPointer BondOverlap_overlap_gradient(const BondOverlapPointer bpr);

// Frees the bond overlap, and any linked bond overlaps.
void BondOverlap_free(const BondOverlapPointer bprs);

#endif

#ifndef BOND_SET_H
#define BOND_SET_H

// A bondset is a set of pointers to bonds. (set) is the array of bonds and (n)
// is the length of that array
typedef struct bondset BondSet, *BondSetPointer;

struct bondset {
    BondPointer *set;
    int n;
};

// An empty set of bonds capable of holding a number of nb bonds.
BondSet BondSet_initialize(int nb);

// The pointer to the bond in bondset bs at index i.
BondPointer BondSet_get_bond(const BondSet bs, const int i);

// Converts bondset bs to an array A of integers of length 2n, where A[i] is
// the index of the first vertex and A[i + 1] is the index of the second vertex
// of the bond at index i / 2.
int *Bondset_to_array(BondSet bs);

// Frees the memory allocated by bondset bs.
void BondSet_free(BondSet bs);

#endif


#ifndef CROSS_GRADIENT_H
#define CROSS_GRADIENT_H

double CrossingGradient_df0x0(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0y0(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0x1(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0y1(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0x2(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0y2(
    const Vector v0,
    const Vector v1,
    const Vector v2,
    const Vector v3
);

double CrossingGradient_df0x3(
  const Vector v0,
  const Vector v1,
  const Vector v2,
  const Vector v3
);
double CrossingGradient_df0y3(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);

double CrossingGradient_df1x0(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1y0(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1x1(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1y1(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1x2(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1y2(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1x3(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df1y3(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);

double CrossingGradient_df2x0(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2y0(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2x1(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2y1(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2x2(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2y2(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2x3(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);
double CrossingGradient_df2y3(
const Vector v0,
const Vector v1,
const Vector v2,
const Vector v3
);

#endif
#ifndef __emscripten_h__
#define __emscripten_h__

/**
 * This file contains a few useful things for compiling C/C++ code
 * with Emscripten.
 *
 * Documentation for the public APIs defined in this file must be updated in: 
 *    site/source/docs/api_reference/emscripten.h.rst
 * A prebuilt local version of the documentation is available at: 
 *    site/build/text/docs/api_reference/emscripten.h.txt
 * You can also build docs locally as HTML or other formats in site/
 * An online HTML version (which may be of a different version of Emscripten)
 *    is up at http://kripken.github.io/emscripten-site/docs/api_reference/emscripten.h.html
 */

#ifdef __cplusplus
extern "C" {
#endif

#if !__EMSCRIPTEN__
#include <SDL/SDL.h> /* for SDL_Delay in async_call */
#endif

#if __EMSCRIPTEN__
// This version of emscripten has <emscripten/vr.h> and associated support
#define EMSCRIPTEN_HAS_VR_SUPPORT 1
#endif

/* Typedefs */

typedef short __attribute__((aligned(1))) emscripten_align1_short;

typedef int __attribute__((aligned(2))) emscripten_align2_int;
typedef int __attribute__((aligned(1))) emscripten_align1_int;

typedef float __attribute__((aligned(2))) emscripten_align2_float;
typedef float __attribute__((aligned(1))) emscripten_align1_float;

typedef double __attribute__((aligned(4))) emscripten_align4_double;
typedef double __attribute__((aligned(2))) emscripten_align2_double;
typedef double __attribute__((aligned(1))) emscripten_align1_double;

typedef void (*em_callback_func)(void);
typedef void (*em_arg_callback_func)(void*);
typedef void (*em_str_callback_func)(const char *);


#define EM_ASM(...) emscripten_asm_const(#__VA_ARGS__)
#define EM_ASM_(code, ...) emscripten_asm_const_int(#code, __VA_ARGS__)
#define EM_ASM_ARGS(code, ...) emscripten_asm_const_int(#code, __VA_ARGS__)
#define EM_ASM_INT(code, ...) emscripten_asm_const_int(#code, __VA_ARGS__)
#define EM_ASM_DOUBLE(code, ...) emscripten_asm_const_double(#code, __VA_ARGS__)
#define EM_ASM_INT_V(code) emscripten_asm_const_int(#code)
#define EM_ASM_DOUBLE_V(code) emscripten_asm_const_double(#code)


#define EMSCRIPTEN_KEEPALIVE __attribute__((used))

extern void emscripten_run_script(const char *script);
extern int emscripten_run_script_int(const char *script);
extern char *emscripten_run_script_string(const char *script);
extern void emscripten_async_run_script(const char *script, int millis);
extern void emscripten_async_load_script(const char *script, em_callback_func onload, em_callback_func onerror);

#if __EMSCRIPTEN__
extern void emscripten_set_main_loop(em_callback_func func, int fps, int simulate_infinite_loop);

#define EM_TIMING_SETTIMEOUT 0
#define EM_TIMING_RAF 1

extern int emscripten_set_main_loop_timing(int mode, int value);
extern void emscripten_get_main_loop_timing(int *mode, int *value);
extern void emscripten_set_main_loop_arg(em_arg_callback_func func, void *arg, int fps, int simulate_infinite_loop);
extern void emscripten_pause_main_loop(void);
extern void emscripten_resume_main_loop(void);
extern void emscripten_cancel_main_loop(void);
#else
#define emscripten_set_main_loop(func, fps, simulateInfiniteLoop) \
  while (1) { func(); usleep(1000000/fps); }
#define emscripten_cancel_main_loop() exit(1);
#endif


typedef void (*em_socket_callback)(int fd, void *userData);
typedef void (*em_socket_error_callback)(int fd, int err, const char* msg, void *userData);

extern void emscripten_set_socket_error_callback(void *userData, em_socket_error_callback callback);
extern void emscripten_set_socket_open_callback(void *userData, em_socket_callback callback);
extern void emscripten_set_socket_listen_callback(void *userData, em_socket_callback callback);
extern void emscripten_set_socket_connection_callback(void *userData, em_socket_callback callback);
extern void emscripten_set_socket_message_callback(void *userData, em_socket_callback callback);
extern void emscripten_set_socket_close_callback(void *userData, em_socket_callback callback);


#if __EMSCRIPTEN__
extern void _emscripten_push_main_loop_blocker(em_arg_callback_func func, void *arg, const char *name);
extern void _emscripten_push_uncounted_main_loop_blocker(em_arg_callback_func func, void *arg, const char *name);
#else
inline void _emscripten_push_main_loop_blocker(em_arg_callback_func func, void *arg, const char *name) {
  func(arg);
}
inline void _emscripten_push_uncounted_main_loop_blocker(em_arg_callback_func func, void *arg, const char *name) {
  func(arg);
}
#endif
#define emscripten_push_main_loop_blocker(func, arg) \
  _emscripten_push_main_loop_blocker(func, arg, #func)
#define emscripten_push_uncounted_main_loop_blocker(func, arg) \
  _emscripten_push_uncounted_main_loop_blocker(func, arg, #func)

#if __EMSCRIPTEN__
extern void emscripten_set_main_loop_expected_blockers(int num);
#else
inline void emscripten_set_main_loop_expected_blockers(int num) {}
#endif


#if __EMSCRIPTEN__
extern void emscripten_async_call(em_arg_callback_func func, void *arg, int millis);
#else
inline void emscripten_async_call(em_arg_callback_func func, void *arg, int millis) {
  if (millis) SDL_Delay(millis);
  func(arg);
}
#endif


extern void emscripten_exit_with_live_runtime(void);
extern void emscripten_force_exit(int status);

double emscripten_get_device_pixel_ratio(void);

void emscripten_hide_mouse(void);
void emscripten_set_canvas_size(int width, int height);
void emscripten_get_canvas_size(int *width, int *height, int *isFullscreen);

#if __EMSCRIPTEN__
double emscripten_get_now(void);
#else
#include <time.h>
static inline double emscripten_get_now(void) {
  return (1000*clock())/(double)CLOCKS_PER_SEC;
}
#endif

float emscripten_random(void);

// wget

void emscripten_async_wget(const char* url, const char* file, em_str_callback_func onload, em_str_callback_func onerror);

typedef void (*em_async_wget_onload_func)(void*, void*, int);
void emscripten_async_wget_data(const char* url, void *arg, em_async_wget_onload_func onload, em_arg_callback_func onerror);

typedef void (*em_async_wget2_onload_func)(unsigned, void*, const char*);
typedef void (*em_async_wget2_onstatus_func)(unsigned, void*, int);

int emscripten_async_wget2(const char* url, const char* file,  const char* requesttype, const char* param, void *arg, em_async_wget2_onload_func onload, em_async_wget2_onstatus_func onerror, em_async_wget2_onstatus_func onprogress);

typedef void (*em_async_wget2_data_onload_func)(unsigned, void*, void*, unsigned);
typedef void (*em_async_wget2_data_onerror_func)(unsigned, void*, int, const char*);
typedef void (*em_async_wget2_data_onprogress_func)(unsigned, void*, int, int);

int emscripten_async_wget2_data(const char* url, const char* requesttype, const char* param, void *arg, int free, em_async_wget2_data_onload_func onload, em_async_wget2_data_onerror_func onerror, em_async_wget2_data_onprogress_func onprogress);

void emscripten_async_wget2_abort(int handle);

// wget "sync" (ASYNCIFY)

void emscripten_wget(const char* url, const char* file);

// wget data "sync" (EMTERPRETIFY_ASYNC)

void emscripten_wget_data(const char* url, void** pbuffer, int* pnum, int *perror);

// IDB

void emscripten_idb_async_load(const char *db_name, const char *file_id, void* arg, em_async_wget_onload_func onload, em_arg_callback_func onerror);
void emscripten_idb_async_store(const char *db_name, const char *file_id, void* ptr, int num, void* arg, em_arg_callback_func onstore, em_arg_callback_func onerror);
void emscripten_idb_async_delete(const char *db_name, const char *file_id, void* arg, em_arg_callback_func ondelete, em_arg_callback_func onerror);
typedef void (*em_idb_exists_func)(void*, int);
void emscripten_idb_async_exists(const char *db_name, const char *file_id, void* arg, em_idb_exists_func oncheck, em_arg_callback_func onerror);

// IDB "sync" (EMTERPRETIFY_ASYNC)

void emscripten_idb_load(const char *db_name, const char *file_id, void** pbuffer, int* pnum, int *perror);
void emscripten_idb_store(const char *db_name, const char *file_id, void* buffer, int num, int *perror);
void emscripten_idb_delete(const char *db_name, const char *file_id, int *perror);
void emscripten_idb_exists(const char *db_name, const char *file_id, int* pexists, int *perror);

void emscripten_idb_load_blob(const char *db_name, const char *file_id, int* pblob, int *perror);
void emscripten_idb_store_blob(const char *db_name, const char *file_id, void* buffer, int num, int *perror);
void emscripten_idb_read_from_blob(int blob, int start, int num, void* buffer);
void emscripten_idb_free_blob(int blob);

// other async utilities

int emscripten_async_prepare(const char* file, em_str_callback_func onload, em_str_callback_func onerror);

typedef void (*em_async_prepare_data_onload_func)(void*, const char*);
void emscripten_async_prepare_data(char* data, int size, const char *suffix, void *arg, em_async_prepare_data_onload_func onload, em_arg_callback_func onerror);

typedef int worker_handle;

worker_handle emscripten_create_worker(const char *url);
void emscripten_destroy_worker(worker_handle worker);

typedef void (*em_worker_callback_func)(char*, int, void*);
void emscripten_call_worker(worker_handle worker, const char *funcname, char *data, int size, em_worker_callback_func callback, void *arg);
void emscripten_worker_respond(char *data, int size);
void emscripten_worker_respond_provisionally(char *data, int size);

int emscripten_get_worker_queue_size(worker_handle worker);

int emscripten_get_compiler_setting(const char *name);

void emscripten_debugger();

char *emscripten_get_preloaded_image_data(const char *path, int *w, int *h);
char *emscripten_get_preloaded_image_data_from_FILE(FILE *file, int *w, int *h);

#define EM_LOG_CONSOLE   1
#define EM_LOG_WARN      2
#define EM_LOG_ERROR     4
#define EM_LOG_C_STACK   8
#define EM_LOG_JS_STACK 16
#define EM_LOG_DEMANGLE 32
#define EM_LOG_NO_PATHS 64
#define EM_LOG_FUNC_PARAMS 128

void emscripten_log(int flags, ...);

int emscripten_get_callstack(int flags, char *out, int maxbytes);


/* ===================================== */
/* Internal APIs. Be careful with these. */
/* ===================================== */

/* Helper API for EM_ASM - do not call this yourself */
void emscripten_asm_const(const char *code);
int emscripten_asm_const_int(const char *code, ...);
double emscripten_asm_const_double(const char *code, ...);

#if __EMSCRIPTEN__
void emscripten_sleep(unsigned int ms);
void emscripten_sleep_with_yield(unsigned int ms);
#else
#define emscripten_sleep SDL_Delay
#endif

typedef void * emscripten_coroutine;
emscripten_coroutine emscripten_coroutine_create(em_arg_callback_func func, void *arg, int stack_size);
int emscripten_coroutine_next(emscripten_coroutine);
void emscripten_yield(void);


#ifdef __cplusplus
}
#endif

#endif // __emscripten_h__

#ifndef VERTEX_SET_H
#define VERTEX_SET_H

// A vertexset is a set of pointers to vertices. (set) is the array of vertices
// and (n) is the length of that array
typedef struct vertexset VertexSet, *VertexSetPointer;

struct vertexset {
    VertexPointer *set;
    int n;
};

// The empty vertex set holding a number of nv vertices
VertexSet VertexSet_initialize(int nv);

// The pointer to the vertex at index i in the vertex set vs
VertexPointer VertexSet_get_vertex(const VertexSet vs, const int i);

// Sets the vertex pointer at index i in vertexset vs to vertex pointer v
void VertexSet_update_vertex(const VertexSet vs, const int i, const VertexPointer v);

// The deep copy of vertex set vs
VertexSet VertexSet_copy(const VertexSet vs);

// The array of positions, for each vertex in vertexset vs
VectorPointer VertexSet_positions(const VertexSet vs);

// Sets the field grad0 to the current gradient of each individual vertex in
// vertex set vs
void VertexSet_store_gradient(const VertexSet vs);

// Move all vertices in vertex set vs along the field grad0 proportional to x
void VertexSet_move(const VertexSet vs, double x);

// Scale up the gradient of all vertices in vertex set vs proportional to x
void VertexSet_boost(const VertexSet vs, const double x);

// The array A of floats of length 2vs where A[i] is the x coordinate and 
// A[i + 1] is the y coordinate of vertex at index i / 2 provided that i is an
// even non-negative integer
float *VertexSet_to_array(const VertexSet vs);

// Iteratively create the algebraic sequences used by the minimizer using the
// properties of vertexset vs, the score gam and whatever strategy { initialize
// , update }
void VertexSet_create_sequences(
        const VertexSet vs,
        const double gam, 
        const Strategy strat
    );

// Calculate the minimizer positional and gradient score of vertexset vs,
// storing them in gg and dgg respectively
void VertexSet_calculate_score(
        const VertexSet vs,
        double *gg, 
        double *dgg
    );

// Frees the memory allocated for vertex set vs
void VertexSet_free(VertexSet vs);

#endif

#ifndef ZONE_H
#define ZONE_H

// A zone is a rectangular partition of a larger quadratic area. A zone is
// indexed by its field (id), and it has a coordinates (i, j) that indicates
// the zone position, when the top-left zone has zone-coordinates (0, 0). A
// zone has fields (minx, miny) which are the coordinates of the top-left
// corner of the zone. A zone also has a (width, height). A zone is associated
// with a number of vertices, which are stored in the array (members)
typedef struct Zone Zone, *ZonePointer;

struct Zone {
      int id, i, j, minx, miny, width, height;
      VertexPointer members;
};

// The zone with the specified id, zone-coordinates, coordinates, width and
// height
ZonePointer Zone_create(
        const int id, 
        const int i, 
        const int j, 
        const double minx, 
        const double miny, 
        const double width, 
        const double height
    );

// Frees the memory allocated for all zones in array zones
void Zones_free(ZonePointer *zs, int nz);

#endif

#ifndef ZONE_PAIR_H
#define ZONE_PAIR_H

// A zonepair is a pair of zones. They are stored as a linked list, so each
// zone keeps track of the next element in that list
typedef struct ZonePair ZonePair, *ZonePairPointer;

struct ZonePair {
  ZonePointer fst, snd;
  ZonePairPointer next;
};

// The pointer to the zone pair created from the pair pr, linked to the next
// element next
ZonePairPointer ZonePair_create(const Pair pr, const ZonePairPointer next);

// Frees the memory allocated for the zone pointed at by zprs, and iteratively
// the next linked zone
void ZonePairs_free(const ZonePairPointer zprs);

#endif
#ifndef GRID_H
#define GRID_H

// A grid is a partition of a rectangular plane. Each part of the grid can be
// inhabited by a number of vertices. It consists of a set of
// pointers to its zones (zps), a set of pointers to its populated zones
// (pzps) and a structure holding the adjecent zones (azps). In addition, (nz),
// (npz) and (is_populated) keeps track of the total number of zones, the total
// number of populated zones and weather a given zone is populated
// respectively.
typedef struct grid Grid, *GridPointer;

struct grid {
    ZonePointer *zps;
    ZonePointer *pzps;
    ZonePairPointer azps;
    int nz; 
    int npz; 
    int *is_populated;
};

// A grid
GridPointer Grid_create();

// Adds a vertex to the grid, assigning it to the proper part.
void Grid_append_vertex(const GridPointer grid, const VertexPointer v);

// Get the pointer to the zone indexed by x and y. the top-left zone has index
// (0, 0)
ZonePointer Grid_get_zone(const GridPointer grid, const int x, const int y);

// Reset all non-static data of the grid.
void Grid_reset_dynamic_data(const GridPointer grid);

// Detect all adjecent zones and update field azps accordingly.
void Grid_detect_adjacent_zones(const GridPointer grid);

// Converts the grid to an array of integers A of length 3nz where A[i] is the
// top-left corner x-coordinate , A[i + 1] is the top-left corner y-coordinate
// and A[i + 2] is the dimension of the zone indexed by i / 3.
int *Grid_to_array(const GridPointer grid);

// Frees the memory allocated for this grid.
void Grid_free(const GridPointer grid);

#endif

#ifndef GRAPH_H 
#define GRAPH_H

// A graph consists of a set of vertices, a set of bonds and other data to
// support these structures: (grid) is a partition of the graph. (con) is the
// set of all bonds which share a common vertex. (crs) is the set of all
// overlapping bonds. (energy) is a placeholder for the graphs energy value
// which should be set by external routines. (center) is the vector to the
// center of the graph. (ncrosses) and (ang_res) is statistical data for the
// number of bond overlaps and the angular resolution of the graph.
typedef struct graph Graph, *GraphPointer;

struct graph
{
    VertexSet vs;
    BondSet bs;
    GridPointer grid;
    BondConnectionPointer con;
    BondOverlapPointer crs;
    Vertex center;
    double energy;
    int ncrosses;
    double ang_res;
};

// The pointer to the graph created from parsing the file fname which should
// contain properly formatted JSON
GraphPointer Graph_create(const char *fname);

// Detects the connected bonds in the graph and updates the field con
// accordingly
void Graph_detect_connected(const GraphPointer graph);

// Detects the overlapping bonds in the graph and updates the field crs
// accordingly
void Graph_detect_overlapping_bonds(const GraphPointer graph);

// Reset all non-static data in the graph
void Graph_reset_dynamic_data(const GraphPointer graph);

// Calculate the angular resolution for the graph
double Graph_angular_resolution(const GraphPointer graph);

// Free the memory allocated for the graph
void Graph_free(const GraphPointer graph);

#endif


#ifndef ENERGY_H
#define ENERGY_H

// Calculates the energy of the graph and stores in its internal field: energy
void Energy_calculate(const GraphPointer graph);

#endif

#ifndef GLOBAL_MINIMIZER
#define GLOBAL_MINIMIZER

typedef enum { RANDOM, HIGH_ENERGY, LOW_CONNECTIVITY } PickingStrategy;

#define DEFAULT_STRAT RANDOM

void GlobalMinimizer_run(
        const GraphPointer graph,
        void (*e_fun)(GraphPointer),
        void (*g_fun)(GraphPointer)
    );

#endif

#ifndef GRADIENT_H
#define GRADIENT_H

// Calculates the gradient for each individual vertex of the graph and stores
// it at each vertex field: gradient
void Gradient_calculate(const GraphPointer graph);

#endif

#ifndef LINMIN_H
#define LINMIN_H

// The minimum value of the function pointed to by e_fun
void linmin(
      const GraphPointer graph, 
      void (*e_fun)(GraphPointer), 
      double *o_min
  );

#endif
#ifndef LOCAL_MINIMIZER_H
#define LOCAL_MINIMIZER_H

// Iteratively find a local minimum of the function pointed to by e_fun,
// provided its gradient g_fun and a tolerance of ftol. Use those values to
// modify the specified graph, for a good representation.
void LocalMinimizer_run(
        const GraphPointer graph, 
        void (*e_fun)(GraphPointer), 
        void (*g_fun)(GraphPointer),
        const double ftol
    );

#endif

#ifndef MINIMIZER_H
#define MINIMIZER_H

// Given a file F under name fname specifying a set of vertices V and a set of
// bonds B, return a set P of floating point coordinates of length 2n where n
// is the maximum index in F. If i is an even non-negative integer, then P[i]
// is the x-coordinate of vertex of index i (vi) and P[i+1] is the y-coordinate
// of vi.
// If the constant EMSCRIPT is set to 1, this procedure will attempt to call
// the javascript function window.processCdata() using emscripten and return
// NULL
float *Minimizer_run(const char *fname);

#endif

#ifndef PLACEMENT_H
#define PLACEMENT_H

// Assigns the positions of vertices in Vertex Set vs as a spiral. Starting
// from the central point of the panel whose dimension are specified by PANEL_X
// and PANEL_Y, place the vertices as a spiral in order of descending vertice
// mass. 
void Placement_set_spiral(const VertexSet vs);

// Assigs the positions of vertices in Vertex Set vs randomly
void Placement_set_random(const VertexSet vs);

// Assigns the positions of vertices vs.set as a grid in the panel whose dimension
// are specified by PANEL_X and PANEL_Y, starting in the upper-left corner with
// the vertex with the lowest id. 
void Placement_set_grid(const VertexSet vs);

#endif
#ifndef PROCESS_INPUT_H
#define PROCESS_INPUT_H

// Processes the JSON-formatted file specified under fname. Returned is a pair
// of two pointers to the vertex and bondset.
Pair process_json(const char *fname);

#endif


void (*test_first_order_gradient)(const GraphPointer graph);
void (*test_second_order_gradient)(const GraphPointer graph);
void (*test_second_order_attraction_gradient)(const BondSet bs);
void (*test_second_order_repulsion_gradient)( const GridPointer grid);
void (*test_third_order_gradient)(const BondConnectionPointer con);
void (*test_fourth_order_gradient)(const BondOverlapPointer crs);

void (*test_first_order_energy)(const GraphPointer graph);
void (*test_second_order_energy)(const GraphPointer graph);
void (*test_second_order_attraction_energy)(const GraphPointer graph);
void (*test_second_order_repulsion_energy)(const GraphPointer graph);
void (*test_third_order_energy)(const GraphPointer graph);
void (*test_fourth_order_energy)(const GraphPointer graph);


#ifndef VERTEX_PAIR_H
#define VERTEX_PAIR_H

// A vertex pair is a pair pointing at two vertices

// The repulsion energy between the two vertices pointed at by pair pr
double VertexPair_repulsion_energy(const Pair pr);

// The gradient (the x, y derivative) for both vertices pointed at by pair pr
Vector VertexPair_repulsion_gradient(const Pair pr);

#endif


