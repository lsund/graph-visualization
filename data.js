/*****************************************************************************

* Author: Ludvig Sundström

* File Name: data.js

* Description: 

* Creation Date: 01-07-2015

*****************************************************************************/

(function () {

  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    window.DATA = window.DATA || {};

    window.DATA.dmtsizes = 
      [
        {n:27, v:2},
        {n:52, v:1},
        {n:7, v:2},
        {n:59, v:7},
        {n:40, v:4},
        {n:26, v:3},
        {n:23, v:5},
        {n:58, v:5},
        {n:14, v:10},
        {n:28, v:2},
        {n:16, v:4},
        {n:25, v:2},
        {n:63, v:1},
        {n:38, v:38},
        {n:18, v:20},
        {n:51, v:4},
        {n:44, v:3},
        {n:4, v:11},
        {n:22, v:10},
        {n:19, v:23},
        {n:62, v:18},
        {n:54, v:3},
        {n:37, v:3},
        {n:45, v:3},
        {n:17, v:9},
        {n:56, v:71},
        {n:24, v:6},
        {n:11, v:43},
        {n:3, v:96},
        {n:31, v:168},
        {n:20, v:37},
        {n:32, v:2},
        {n:41, v:3},
        {n:50, v:1},
        {n:64, v:1},
        {n:15, v:2},
        {n:8, v:6},
        {n:9, v:486},
        {n:6, v:9},
        {n:39, v:3},
        {n:55, v:2},
        {n:21, v:2},
        {n:46, v:1},
        {n:60, v:1},
        {n:34, v:18},
        {n:10, v:106},
        {n:36, v:2},
        {n:13, v:9},
        {n:43, v:3},
        {n:33, v:304},
        {n:30, v:910},
        {n:35, v:1},
        {n:2, v:52},
        {n:48, v:1},
        {n:47, v:1},
        {n:29, v:1},
        {n:5, v:2},
        {n:53, v:2},
        {n:61, v:5},
        {n:42, v:4},
        {n:12, v:7},
        {n:49, v:4},
        {n:57, v:2}
      ];

    window.DATA.fopts = 
      [ 
        { name: 'data/dmt_cluster_64.csv', nv: 64 },
        { name: 'data/dmt_clusters_subset1/dmt_2_52.csv', nv: 52 },
        { name: 'data/dmt_clusters_subset1/dmt_3_96.csv', nv: 96 },
        { name: 'data/dmt_clusters_subset1/dmt_10_106.csv',  nv: 106 }, 
        { name: 'data/dmt_clusters_subset1/dmt_11_43.csv',  nv: 43 }, 
        { name: 'data/dmt_clusters_subset1/dmt_56_71.csv', nv: 71 }
      ];

  });
}());

