
#ifndef CONSTANTS_H
#define CONSTANTS_H

#if !TEST

#define L_ITMAX 200
#define G_ITMAX 100 
#define T_ITMAX 1 

#define TEMPERATURE 0.0

#define FTOL 1.0e-5
#define TOL 2.0e-4 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20

#define MAX_NV 100
#define STEP 0
#define INTERVAL 500

#define PANEL_X 1.0
#define PANEL_Y 1.0
#define PADDING 0.12
#define SPRING_LENGTH 0.12

#define GRID_DIM_X (int) (PANEL_X / PADDING)
#define GRID_DIM_Y (int) (PANEL_Y / PADDING)

#define VERTEX_BASE_WIDTH 0.001
#define VERTEX_BASE_HEIGHT  0.001

#define REPULSION_REDUCE 1.0

#define WATR 15.0
#define WREP 500.0
#define WPOT 15.0
#define WANG 0.002
#define WCRS 1.55

#define COMP_EPS 1.0e-4

#define DEFAULT_TYPE 'v' 
#define DISTANCE_DELIMITER 0.4

#define MIN_DIST 0.01
#define PRECISION_DIGITS 8
#define M_PI 3.14159265358979323846

#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#else 

////////////////////////////////////////////////////////////////

#define L_ITMAX 200
#define G_ITMAX 10
#define T_ITMAX 5

#define FTOL 1.0e-3
#define TOL 2.0e-4 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20
#define MIN_DIST 0.01

#define TEMP 0

#define INTERVAL 800

#define MAX_NV 100

#define PANEL_X 1.0
#define PANEL_Y 1.0
#define PADDING 0.1
#define SPRING_LENGTH 0.1

#define GRID_DIM_X (int) (PANEL_X / PADDING)
#define GRID_DIM_Y (int) (PANEL_Y / PADDING)

#define VERTEX_BASE_WIDTH 0
#define VERTEX_BASE_HEIGHT 0

#define THETA0 M_PI

#define DEFAULT_STIFFNESS 1.0
#define REPULSION_REDUCE 1.0

#define WATR 1.0
#define WREP 1.0
#define WPOT 1.0
#define WANG 1.0
#define WCRS 1.0

#define COMP_EPS 1.0e-4

#define DEFAULT_TYPE 'v' 
#define DISTANCE_DELIMITER 0.4

#define PRECISION_DIGITS 8
#define M_PI 3.14159265358979323846

#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#endif

#endif
