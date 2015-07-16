/*****************************************************************************

* Author: Ludvig Sundström

* File Name: /data.js

* Description: 

* Creation Date: 01-07-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.DATA = window.DATA || {};

    window.DATA.fopts = 
      [ 

        { 
          name: '/data/52.json' 
        },
        { 
          name: '/data/23.json' 
        },
        { 
          name: '/data/43.json'  
        },
        { 
          name: '/data/8.json' 
        }
      ];
  });
}());

