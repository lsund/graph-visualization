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
          name: '/data/c_64/subsets/dmt_clusters_subset1/dmt_2_52.csv', 
          nv: 52 
        },
        { 
          name: '/data/c_64/subsets/dmt_clusters_subset1/dmt_3_96.csv', 
          nv: 96 
        },
        { 
          name: '/data/c_64/subsets/dmt_clusters_subset1/dmt_10_106.csv',  
          nv: 106 
        }, 
        {
          name: '/data/c_64/subsets/dmt_clusters_subset1/dmt_11_43.csv',  
          nv: 43 
        }, 
        { 
          name: '/data/c_64/subsets/dmt_clusters_subset1/dmt_56_71.csv', 
          nv: 71 
        },

        { name: '/data/c_32/dmt_cluster.csv', nv: 32 },
        { name: '/data/c_64/dmt_cluster.csv', nv: 64 },
        { name: '/data/c_128/dmt_cluster.csv', nv: 128 },
        { name: '/data/c_256/dmt_cluster.csv', nv: 256 },
        { name: '/data/test.csv', nv: 3 },

      ];

    window.DATA.ssfopts = 
      [ 
        { name: '/data/c_32/dmt_sizes.json', nv: 32 },
        { name: '/data/c_64/dmt_sizes.json', nv: 64 },
        { name: '/data/c_128/dmt_sizes.json', nv: 128 },
        { name: '/data/c_256/dmt_sizes.json', nv: 256 },
        { name: '/data/testsizes.json', nv: 3 },
      ];

  });
}());

