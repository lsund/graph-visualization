/*****************************************************************************

* File Name: 

* Author: Ludvig Sundström

* Description: 

* Creation Date: 20-07-2015

*****************************************************************************/

static void calc_gradient(float xji, float yji, float xjk, float yjk, float a1,
        float a2, float b, float c1, float c2, float d, 
        float *dxji, float *dyji, float *dxjk, float *dyjk) 
{
        float aver[4];

        aver[0] = 2 * yji * a1;
        aver[1] = 2 * xji * a2;
        aver[2] = 2 * yjk * a2;
        aver[3] = 2 * xjk * a1;

        *dxji = (aver[0] * b) / (c1 * d);
        *dyji = (aver[1] * b) / (c1 * d);
        *dxjk = (aver[2] * b) / (c2 * d);
        *dyjk = (aver[3] * b) / (c2 * d);
}

static void prepare_d3(Vector2d vecji, Vector2d vecjk, float xji, float yji, 
        float xjk, float yjk, float *a1, float *a2, float *b, float *c1, 
        float *c2, float *d)
{
    float scalp = dot(vecji, vecjk);
    float lenp = vecji.len * vecjk.len;

    *a1 = (xjk * yji - yjk * xji);
    *a2 = (yjk * xji - xjk * yji);
    *b = THETA0 - acosf(scalp / lenp);
    *c1 = vecjk.len * powf((powf(xji, 2) + powf(yji, 2)), (3/2));
    *c2 = vecji.len * powf((powf(xjk, 2) + powf(yjk, 2)), (3/2));
    float dn = pow(*a2, 2);
    float dd = (powf(xji, 2) + powf(yji, 2)) * (powf(xjk, 2) + powf(yjk, 2));
    *d = sqrtf(dn / dd);
}

void dfunc3(const Gptr graph)
{
    if (graph->connected == NULL) {
        return;
    }
    float xji, yji, xjk, yjk, a1, a2, b, c1, c2, d, dxji, dyji, dxjk, dyjk;
    Vector2d vecji, vecjk, frcji, frcjk;
    Vptr vi, vj, vk;
    BpairPtr cur = graph->connected;
    while (cur) {

        vi = cur->other1; 
        vj = cur->common;
        vk = cur->other2; 

        get_coords(vi, vj, vk, &xji, &yji, &xjk, &yjk);
        mk_vectors(xji, yji, xjk, yjk, &vecji, &vecjk, &frcji, &frcjk);
        
        prepare_d3(vecji, vecjk, xji, yji, xjk, yjk, 
                &a1, &a2, &b, &c1, &c2, &d);
        calc_gradient(xji, yji, xjk, yjk, a1, a2, b, c1, c2, d, 
                &dxji, &dyji, &dxjk, &dyjk);

        calc_gradient(xji, yji, xjk, yjk, a, bj, bk, c, d, 
                &dxji, &dyji, &dxjk, &dyjk);

        frcji.x = dxji; 
        frcji.y = dyji; 

        frcjk.x = dxjk; 
        frcjk.y = dyjk; 

        vi->vel = add(vi->vel, frcji);
        vk->vel = add(vk->vel, frcjk);

        cur = cur->next;
    }
}



///////////////////////////////////////////////

static void prepare_d3(Vector2d vecji, Vector2d vecjk, float xji, float yji, 
        float xjk, float yjk, float *bsqji, float *bsqjk, float *dsq, float
        *dsub, float *div, float *a, float *bj, float *bk)
{
    float scalp = dot(vecji, vecjk);
    float lenp = vecji.len * vecjk.len;
    *bsqji = powf((powf(xji, 2) + powf(yji, 2)), (3/2)) * vecjk.len;
    *bsqjk = powf((powf(xjk, 2) + powf(yjk, 2)), (3/2)) * vecji.len;
    *dsq = (powf(xji, 2) + powf(yji, 2)) * (powf(xjk, 2) + powf(yjk, 2));
    *dsub = pow(scalp, 2) / *dsq;
    *div = scalp / lenp;
    *bj = scalp / *bsqji;
    *bk = scalp / *bsqjk;
    *a = 1 / lenp;
}

static void calc_gradient(float xji, float yji, float xjk, float yjk, float a,
        float bj, float bk, float c, float d, float *dxji, float *dyji, float
        *dxjk, float *dyjk) 
{
        float aver[4], bver[4];

        aver[0] = xjk * a;
        bver[0] = xji * bj;
        aver[1] = yjk * a;
        bver[1] = yji * bj;
        aver[2] = xji * a;
        bver[2] = xjk * bk;
        aver[3] = yji * a;
        bver[3] = yjk * bk;
        
        if (equal(d, 0.0)) rt_error("calc_gradient: division by zero"); 
        *dxji = -2 * WANG * (aver[0] - bver[0]) * c / d;
        *dyji = -2 * WANG * (aver[1] - bver[1]) * c / d;
        *dxjk = -2 * WANG * (aver[2] - bver[2]) * c / d;
        *dyjk = -2 * WANG * (aver[3] - bver[3]) * c / d;
}

void dfunc3(const Gptr graph)
{
    if (graph->connected == NULL) {
        return;
    }
    float xji, yji, xjk, yjk, bsqji, bsqjk, dsq, dsub, div, a, bj,
          bk, c, d, dxji, dyji, dxjk, dyjk;
    Vector2d vecji, vecjk, frcji, frcjk;
    Vptr vi, vj, vk;
    BpairPtr cur = graph->connected;
    while (cur) {

        vi = cur->other1; 
        vj = cur->common;
        vk = cur->other2; 
        
        get_coords(vi, vj, vk, &xji, &yji, &xjk, &yjk);
        mk_vectors(xji, yji, xjk, yjk, &vecji, &vecjk, &frcji, &frcjk);

        prepare_d3(vecji, vecjk, xji, yji, xjk, yjk, &bsqji, &bsqjk, &dsq,
                &dsub, &div, &a, &bj, &bk);
        
        if (!in_range(-1.0, 1.0, div)) {
            rt_error("Wrong acos range");
        }
        c = acosf(div) - THETA0;

        if (dsub > 1.0) {
            rt_error("Negative square root argument");
        }
        d = sqrtf(1 - dsub);  

        calc_gradient(xji, yji, xjk, yjk, a, bj, bk, c, d, 
                &dxji, &dyji, &dxjk, &dyjk);


        frcji.x = dxji; 
        frcji.y = dyji; 

        frcjk.x = dxjk; 
        frcjk.y = dyjk; 

        vi->vel = add(vi->vel, frcji);
        vk->vel = add(vk->vel, frcjk);

        cur = cur->next;
    }
}

        /*float xij, yij, xil, yil, xkj, ykj, xkl, ykl;*/
        /*xij = vj->pos.x - vi->pos.x; yij = vj->pos.y - vi->pos.y;*/
        /*xil = vl->pos.x - vi->pos.x; yil = vl->pos.y - vi->pos.y;*/
        /*xkj = vj->pos.x - vk->pos.x; ykj = vj->pos.y - vk->pos.y;*/
        /*xkl = vl->pos.x - vk->pos.x; ykl = vl->pos.y - vk->pos.y;*/

        /*Vector2d vecij, vecil, veckj, veckl;*/
        /*vecij = mk_vector2d(xij, yij); vecil = mk_vector2d(xil, yil);*/
        /*veckj = mk_vector2d(xkj, ykj); veckl = mk_vector2d(xkl, ykl);*/

        /*float up, down;*/
        /*up = vector2d_cross(vecij, vecil); down = vector2d_cross(veckl, veckj);*/

        /*Vector2d frci, frcj, frck, frcl;*/

        /*frci.x = WCRS * yil * down;*/
        /*frci.y = WCRS * xil * (ykj * xkl - xkj * ykl);*/
        /*frcj.x = WCRS * yij * (ykj * xkl - xkj * ykl);*/
        /*frcj.y = WCRS * xij * down;*/
        /*frck.x = WCRS * ykl * up;*/
        /*frck.y = WCRS * xkl * (yij * xil - xij * yil);*/
        /*frcl.x = WCRS * ykj * (yij * xil - xij * yil);*/
        /*frcl.y = WCRS * xkj * up; */
     
        /*vi->vel = add(vi->vel, frci);*/
        /*vj->vel = add(vj->vel, frcj);*/
        /*vk->vel = add(vk->vel, frck);*/
        /*vl->vel = add(vl->vel, frcl);*/
