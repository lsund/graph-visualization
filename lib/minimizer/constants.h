
#ifndef CONSTANTS_H
#define CONSTANTS_H

extern double g_wpot, g_watr, g_wrep, g_wang, g_wcrs;

extern int g_findex;

extern int tot_overlaps;
extern double tot_energy;
extern double tot_angres;

// Debug flag
#define DEBUG 0

// Print information about the run to standard output
#define PRINT_STATISTICS 1

// use Data defined bond lengths
#define CUSTOM_LENGTHS 1

// Toggle animation
#define STEP 0
// Animation interval 
#define INTERVAL 500

// Do minimization
#define MINIMIZE 1

// Max iterations of local minimizer
#define L_ITMAX 200
// Max iterations of global minimizer
#define G_ITMAX 0

// 'Acceptance' temperature of global minimizer
#define TEMPERATURE 0.00

// Maximum number of allowed vertices
#define MAX_NV 105

// The outputed coordinates will lie in range [0..PANEL_X[, [0..PANEL_Y[
#define PANEL_X 1.0
#define PANEL_Y 1.0

// Padding between nodes. 
#define PADDING 0.1
// Optimal bond-length 
#define SPRING_LENGTH 0.02

// Data defined data labels 
#define MAX_LABEL_LENGTH 8 + 1 
// File name macx length
#define MAX_FILENAME_LENGTH 128

#define MAX_FILES 25

// Dimension of individual grid rectangles
#define GRID_DIM_X (int) (PANEL_X / PADDING)
#define GRID_DIM_Y (int) (PANEL_Y / PADDING)

// Vertex default type
#define DEFAULT_TYPE 'd' 

// Small numbers  
#define FTOL 1.0e-5
#define TOL 1.0e-6 
#define ZEPS 1.0e-10
#define EPS 1.0e-10
#define TINY 1.0e-20
#define COMP_EPS 1.0e-4
#define MIN_DIST 0.0001

// Minimizer magic numbers
#define CGOLD 0.3819660
#define GOLD 1.618034
#define GLIMIT 100.0

#define M_PI 3.14159265358979323846

#define VERTEX_BASE_WIDTH 0.001
#define VERTEX_BASE_HEIGHT  0.001

// Vertex mass
#define DEFAULT_MASS 1

//#else 

////TEST CONSTANTS////////////////////////////////////////////////

//#define L_ITMAX 200
//#define G_ITMAX 0
//#define T_ITMAX 5

//#define TEMPERATURE 0

//#define PADDING 0.1
//#define SPRING_LENGTH 0.1

//#define VERTEX_BASE_WIDTH 0
//#define VERTEX_BASE_HEIGHT 0

//#define THETA0 M_PI

//#define DEFAULT_STIFFNESS 1.0
//#define DEFAULT_MASS 0

//#define WATR 1.0
//#define WREP 1.0
//#define WPOT 1.0
//#define WANG 1.0
//#define WCRS 1.0

//#endif

#endif
