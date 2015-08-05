/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 03-08-2015

*****************************************************************************/

/*Pair BondPair_crossing_gradient(*/
		/*const BondPairPointer bpr, */
		/*const VertexPointer v0, */
		/*const VertexPointer v1*/
    /*)*/
/*{*/

    /*Vector d0, d1;*/
    /*d0 = Vector_sub(bpr->cross, v0->pos); */
    /*d1 = Vector_sub(bpr->cross, v1->pos); */

    /*float len0, len1;*/
    /*len0 = Vector_norm(d0); len1 = Vector_norm(d1);*/

    /*if (Util_equal(len0, 0.0)) {*/
        /*len0 = MIN_DIST;*/
    /*} else if (Util_equal(len1, 0.0)) {*/
        /*len1 = MIN_DIST;*/
    /*}*/
    
    /*float dx0, dy0, dx1, dy1; */
    /*dx0 = d0.x / len0;*/
    /*dy0 = d0.y / len0;*/
    /*dx1 = d1.x / len1;*/
    /*dy1 = d1.y / len1;*/

    /*Vector *frc0, *frc1; */
    /*frc0 = Vector_create(dx0, dy0);*/
    /*frc1 = Vector_create(dx1, dy1);*/
    
    /*float w0, w1;*/
    /*w0 = crossing_weight(bpr);*/
    /*w1 = crossing_weight(bpr);*/

    /**frc0 = Vector_scalar_mult(*frc0, w0);  */
    /**frc1 = Vector_scalar_mult(*frc1, w1);  */
    
    /*return Pair_initialize(frc0, frc1);*/
/*}*/

