
struct point 
{
    float x;
    float y;
};

struct vector2D 
{
    struct point src; 
    struct point tar;
    float len;
    float x;
    float y;
};

struct point negate(struct point p);

struct point add(struct point p1, struct point p2);

struct vector2D mk_vector(struct point src, struct point tar);

float dot(struct vector2D v1, struct vector2D v2);
