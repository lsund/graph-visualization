

typedef struct vertex {
    int id, mass;
    Vector2d pos, vel, g, h;
    float radius;
    char type;
    struct vertex *next;
} V, *Vptr;

typedef struct bond {
    Vptr fst, snd;
    float dist0, k;
} B, *Bptr;

typedef struct bondpair {
  Bptr fst, snd;
  Vptr common, other1, other2;
  struct bondpair *next;
} Bpair, *BpairPtr;

typedef struct zone2d {
  int id, i, j, minx, miny, width, height;
  Vptr members;
} Z, *Zptr;

typedef struct zonepair {
  Zptr fst, snd;
  struct zonepair *next;
} Zpair, *ZpairPtr;

typedef struct graph {
  int nv, nb, nz, npz;
  float energy;
  Vptr *vs;
  Bptr *bs;
  Zptr *zs;
  BpairPtr connected, crosses; 
  Zptr *populated_zones;
  ZpairPtr adjacent_zones;
  int *is_populated;
} G, *Gptr;

