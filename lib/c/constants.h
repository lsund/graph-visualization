
#ifndef CONSTANTS_H
#define CONSTANTS_H

#if !TEST

//TEMP
#define RADIUS 1

#define STEP 0
#define INTERVAL 500

#define PANEL_X 1000 
#define PANEL_Y 1000
#define PADDING 100.0f

#define GRID_DIM_X PANEL_X / (int) PADDING
#define GRID_DIM_Y PANEL_Y / (int) PADDING

#define SPRING_LENGTH 100.0f

#define DEFAULT_STIFFNESS 1.0f
#define WR 2.0f
#define WG 1.0f
#define WANG 500.0f
#define WCRS 0.0f

#define FTOL 1.0e-5
#define TOL 2.0e-4 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20

#define COMP_EPS 1.0e-4

#define DEFAULT_MASS 1.0
#define DEFAULT_RADIUS 1.0
#define DEFAULT_TYPE 'v' 
#define DISTANCE_DELIMITER 0.4

#define MIN_DIST 0.01
#define PRECISION_DIGITS 8
#define M_PI 3.14159265358979323846

#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#define ITMAX 200

#else 

////////////////////////////////////////////////////////////////

#define RADIUS 1

#define M_PI 3.14159265358979323846
#define INTERVAL 800

#define PANEL_X 1000 
#define PANEL_Y 1000
#define PADDING 100.0f

#define GRID_DIM_X PANEL_X / (int) PADDING
#define GRID_DIM_Y PANEL_Y / (int) PADDING


#define SPRING_LENGTH 100.0f
#define THETA0 M_PI

#define DEFAULT_STIFFNESS 1.0f

#define WR 1.0f
#define WG 1.0f

#define WANG 1.0f
#define WCRS 1e-9f

#define FTOL 1.0e-5
#define TOL 2.0e-4 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20

#define COMP_EPS 1.0e-4

#define DEFAULT_MASS 1.0
#define DEFAULT_RADIUS 1.0
#define DEFAULT_TYPE 'v' 
#define DISTANCE_DELIMITER 0.4

#define MIN_DIST 0.01
#define PRECISION_DIGITS 8

#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#define ITMAX 200

#endif

#endif
