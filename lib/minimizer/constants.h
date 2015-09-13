
#ifndef CONSTANTS_H
#define CONSTANTS_H

// Print information about the run to standard output
#define PRINT_STATISTICS 1

// Data defined data labels 
#define MAX_LABEL_LENGTH 8 + 1 
// File name macx length
#define MAX_FILENAME_LENGTH 128

// Maximum number of allowed vertices
#define MAX_NV 100

// The outputed coordinates will lie in range [0..PANEL_X[, [0..PANEL_Y[
#define PANEL_X 1.0
#define PANEL_Y 1.0
// Dimension of individual grid rectangles
#define GRID_DIM_X (int) (PANEL_X / PADDING)
#define GRID_DIM_Y (int) (PANEL_Y / PADDING)

//IF COMBINED WITH EMSCRIPTEN/////////////////////////////////////////////////
// Toggle animation
#define STEP 0
// Animation interval 
#define INTERVAL 500
//////////////////////////////////////////////////////////////////////////////

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

// Individual energy constants 
#define WATR 15.0
#define WREP 500.0
#define WPOT 1.0
#define WANG 0.002
#define WCRS 1.65

// Vertex default type
#define DEFAULT_TYPE 'd' 

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