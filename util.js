/*****************************************************************************

* Author : Ludvig Sundström

* File Name : util.js

* Purpose : 

* Creation Date : 18-06-2015

* Last Modified : 

*****************************************************************************/

window.util = {

  distance : function (p1, p2) {
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    if (dx === 0 && dy === 0) {
      return { x : dx, y: dy, abs: 0, ui: 0, uj: 0 };
    }
    var abs = Math.sqrt(dx * dx + dy * dy);
    return { x: dx, y: dy, abs: abs, ui: dx / abs, uj: dy / abs };
  }

}


