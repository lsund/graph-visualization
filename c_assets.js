
var Module;

if (typeof Module === 'undefined') Module = {};

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'c_assets.data';
    var REMOTE_PACKAGE_BASE = 'c_assets.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
      var REMOTE_PACKAGE_SIZE = 1316540;
      var PACKAGE_UUID = '2426ed7a-dd45-4320-b2ef-4fa340c01724';
    
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'data', true, true);
Module['FS_createPath']('/data', 'c_64', true, true);
Module['FS_createPath']('/data/c_64', 'subsets', true, true);
Module['FS_createPath']('/data/c_64/subsets', 'dmt_clusters_subset1', true, true);
Module['FS_createPath']('/data', 'c_32', true, true);
Module['FS_createPath']('/data', 'c_128', true, true);
Module['FS_createPath']('/data', 'c_256', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;
        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            Module.printErr('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        this.requests[this.name] = null;
      },
    };

      new DataRequest(0, 22, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_27_2.csv');
    new DataRequest(22, 25, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_52_1.csv');
    new DataRequest(25, 53, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_7_2.csv');
    new DataRequest(53, 450, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_59_7.csv');
    new DataRequest(450, 570, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_40_4.csv');
    new DataRequest(570, 633, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_26_3.csv');
    new DataRequest(633, 814, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_23_5.csv');
    new DataRequest(814, 979, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_58_5.csv');
    new DataRequest(979, 1803, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_14_10.csv');
    new DataRequest(1803, 1827, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_28_2.csv');
    new DataRequest(1827, 1935, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_16_4.csv');
    new DataRequest(1935, 1959, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_25_2.csv');
    new DataRequest(1959, 1962, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_63_1.csv');
    new DataRequest(1962, 14142, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_38_38.csv');
    new DataRequest(14142, 17480, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_18_20.csv');
    new DataRequest(17480, 17590, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_51_4.csv');
    new DataRequest(17590, 17649, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_44_3.csv');
    new DataRequest(17649, 18636, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_4_11.csv');
    new DataRequest(18636, 19442, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_22_10.csv');
    new DataRequest(19442, 23981, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_19_23.csv');
    new DataRequest(23981, 26269, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_62_18.csv');
    new DataRequest(26269, 26332, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_54_3.csv');
    new DataRequest(26332, 26395, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_37_3.csv');
    new DataRequest(26395, 26460, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_45_3.csv');
    new DataRequest(26460, 27129, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_17_9.csv');
    new DataRequest(27129, 68794, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_56_71.csv');
    new DataRequest(68794, 69076, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_24_6.csv');
    new DataRequest(69076, 84901, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_11_43.csv');
    new DataRequest(84901, 165291, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_3_96.csv');
    new DataRequest(165291, 410293, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_31_168.csv');
    new DataRequest(410293, 422016, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_20_37.csv');
    new DataRequest(422016, 422040, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_32_2.csv');
    new DataRequest(422040, 422103, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_41_3.csv');
    new DataRequest(422103, 422937, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_sizes.txt');
    new DataRequest(422937, 422940, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_50_1.csv');
    new DataRequest(422940, 422943, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_64_1.csv');
    new DataRequest(422943, 422967, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_15_2.csv');
    new DataRequest(422967, 423247, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_8_6.csv');
    new DataRequest(423247, 423896, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_6_9.csv');
    new DataRequest(423896, 423959, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_39_3.csv');
    new DataRequest(423959, 423983, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_55_2.csv');
    new DataRequest(423983, 424007, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_21_2.csv');
    new DataRequest(424007, 424010, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_46_1.csv');
    new DataRequest(424010, 424013, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_60_1.csv');
    new DataRequest(424013, 426687, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_34_18.csv');
    new DataRequest(426687, 524641, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_10_106.csv');
    new DataRequest(524641, 524665, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_36_2.csv');
    new DataRequest(524665, 525302, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_13_9.csv');
    new DataRequest(525302, 525363, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_43_3.csv');
    new DataRequest(525363, 525366, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_35_1.csv');
    new DataRequest(525366, 548934, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_2_52.csv');
    new DataRequest(548934, 548937, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_48_1.csv');
    new DataRequest(548937, 548940, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_47_1.csv');
    new DataRequest(548940, 548943, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_29_1.csv');
    new DataRequest(548943, 548967, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_5_2.csv');
    new DataRequest(548967, 548983, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_53_2.csv');
    new DataRequest(548983, 549164, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_61_5.csv');
    new DataRequest(549164, 549284, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_42_4.csv');
    new DataRequest(549284, 549673, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_12_7.csv');
    new DataRequest(549673, 549783, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_49_4.csv');
    new DataRequest(549783, 549807, 0, 0).open('GET', '/data/c_64/subsets/dmt_clusters_subset1/dmt_57_2.csv');
    new DataRequest(549807, 558583, 0, 0).open('GET', '/data/c_32/dmt_cluster.csv');
    new DataRequest(558583, 559067, 0, 0).open('GET', '/data/c_32/dmt_sizes.json');
    new DataRequest(559067, 594471, 0, 0).open('GET', '/data/c_64/dmt_cluster.csv');
    new DataRequest(594471, 595449, 0, 0).open('GET', '/data/c_64/dmt_sizes.json');
    new DataRequest(595449, 737741, 0, 0).open('GET', '/data/c_128/dmt_cluster.csv');
    new DataRequest(737741, 739733, 0, 0).open('GET', '/data/c_128/dmt_sizes.json');
    new DataRequest(739733, 1312453, 0, 0).open('GET', '/data/c_256/dmt_cluster.csv');
    new DataRequest(1312453, 1316540, 0, 0).open('GET', '/data/c_256/dmt_sizes.json');

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
      // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
      // (we may be allocating before malloc is ready, during startup).
      var ptr = Module['getMemory'](byteArray.length);
      Module['HEAPU8'].set(byteArray, ptr);
      DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_27_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_52_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_7_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_59_7.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_40_4.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_26_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_23_5.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_58_5.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_14_10.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_28_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_16_4.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_25_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_63_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_38_38.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_18_20.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_51_4.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_44_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_4_11.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_22_10.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_19_23.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_62_18.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_54_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_37_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_45_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_17_9.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_56_71.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_24_6.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_11_43.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_3_96.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_31_168.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_20_37.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_32_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_41_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_sizes.txt"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_50_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_64_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_15_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_8_6.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_6_9.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_39_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_55_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_21_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_46_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_60_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_34_18.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_10_106.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_36_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_13_9.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_43_3.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_35_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_2_52.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_48_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_47_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_29_1.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_5_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_53_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_61_5.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_42_4.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_12_7.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_49_4.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/subsets/dmt_clusters_subset1/dmt_57_2.csv"].onload();
          DataRequest.prototype.requests["/data/c_32/dmt_cluster.csv"].onload();
          DataRequest.prototype.requests["/data/c_32/dmt_sizes.json"].onload();
          DataRequest.prototype.requests["/data/c_64/dmt_cluster.csv"].onload();
          DataRequest.prototype.requests["/data/c_64/dmt_sizes.json"].onload();
          DataRequest.prototype.requests["/data/c_128/dmt_cluster.csv"].onload();
          DataRequest.prototype.requests["/data/c_128/dmt_sizes.json"].onload();
          DataRequest.prototype.requests["/data/c_256/dmt_cluster.csv"].onload();
          DataRequest.prototype.requests["/data/c_256/dmt_sizes.json"].onload();
          Module['removeRunDependency']('datafile_c_assets.data');

    };
    Module['addRunDependency']('datafile_c_assets.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage();

})();

// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = (typeof Module !== 'undefined' ? Module : null) || {};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_WEB = typeof window === 'object';
var ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB;
// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)
var ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = function print(x) {
    process['stdout'].write(x + '\n');
  };
  if (!Module['printErr']) Module['printErr'] = function printErr(x) {
    process['stderr'].write(x + '\n');
  };

  var nodeFS = require('fs');
  var nodePath = require('path');

  Module['read'] = function read(filename, binary) {
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    // The path is absolute if the normalized version is the same as the resolved.
    if (!ret && filename != nodePath['resolve'](filename)) {
      filename = path.join(__dirname, '..', 'src', filename);
      ret = nodeFS['readFileSync'](filename);
    }
    if (ret && !binary) ret = ret.toString();
    return ret;
  };

  Module['readBinary'] = function readBinary(filename) { return Module['read'](filename, true) };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  if (!Module['thisProgram']) {
    if (process['argv'].length > 1) {
      Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
    } else {
      Module['thisProgram'] = 'unknown-program';
    }
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function read() { throw 'no read() available (jsc?)' };
  }

  Module['readBinary'] = function readBinary(f) {
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    var data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function printErr(x) {
      console.log(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WORKER) {
    Module['load'] = importScripts;
  }

  if (typeof Module['setWindowTitle'] === 'undefined') {
    Module['setWindowTitle'] = function(title) { document.title = title };
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}



// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in: 
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at: 
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  setTempRet0: function (value) {
    tempRet0 = value;
  },
  getTempRet0: function () {
    return tempRet0;
  },
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  STACK_ALIGN: 16,
  prepVararg: function (ptr, type) {
    if (type === 'double' || type === 'i64') {
      // move so the load is aligned
      if (ptr & 7) {
        assert((ptr & 7) === 4);
        ptr += 4;
      }
    } else {
      assert((ptr & 3) === 0);
    }
    return ptr;
  },
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }
    var sigCache = Runtime.funcWrappers[sig];
    if (!sigCache[func]) {
      sigCache[func] = function dynCall_wrapper() {
        return Runtime.dynCall(sig, func, arguments);
      };
    }
    return sigCache[func];
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+15)&-16); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + size)|0;STATICTOP = (((STATICTOP)+15)&-16); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + size)|0;DYNAMICTOP = (((DYNAMICTOP)+15)&-16); if (DYNAMICTOP >= TOTAL_MEMORY) { var success = enlargeMemory(); if (!success) { DYNAMICTOP = ret; return 0; } }; return ret; },
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 16))*(quantum ? quantum : 16); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}


Module['Runtime'] = Runtime;



//========================================
// Runtime essentials
//========================================

var __THREW__ = 0; // Used in checking for thrown exceptions.

var ABORT = false; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

var undef = 0;
// tempInt is used for 32-bit signed values or smaller. tempBigInt is used
// for 32-bit unsigned values or more than 32 bits. TODO: audit all uses of tempInt
var tempValue, tempInt, tempBigInt, tempInt2, tempBigInt2, tempPair, tempBigIntI, tempBigIntR, tempBigIntS, tempBigIntP, tempBigIntD, tempDouble, tempFloat;
var tempI64, tempI64b;
var tempRet0, tempRet1, tempRet2, tempRet3, tempRet4, tempRet5, tempRet6, tempRet7, tempRet8, tempRet9;

function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  if (!func) {
    try {
      func = eval('_' + ident); // explicit lookup
    } catch(e) {}
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

var cwrap, ccall;
(function(){
  var JSfuncs = {
    // Helpers for cwrap -- it can't refer to Runtime directly because it might
    // be renamed by closure, instead it calls JSfuncs['stackSave'].body to find
    // out what the minified function name is.
    'stackSave': function() {
      Runtime.stackSave()
    },
    'stackRestore': function() {
      Runtime.stackRestore()
    },
    // type conversion from js to c
    'arrayToC' : function(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    'stringToC' : function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        ret = Runtime.stackAlloc((str.length << 2) + 1);
        writeStringToMemory(str, ret);
      }
      return ret;
    }
  };
  // For fast lookup of conversion functions
  var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

  // C calling interface. 
  ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    if (returnType === 'string') ret = Pointer_stringify(ret);
    if (stack !== 0) {
      if (opts && opts.async) {
        EmterpreterAsync.asyncFinalizers.push(function() {
          Runtime.stackRestore(stack);
        });
        return;
      }
      Runtime.stackRestore(stack);
    }
    return ret;
  }

  var sourceRegex = /^function\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
  function parseJSFunc(jsfunc) {
    // Match the body and the return value of a javascript function source
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  }
  var JSsource = {};
  for (var fun in JSfuncs) {
    if (JSfuncs.hasOwnProperty(fun)) {
      // Elements of toCsource are arrays of three items:
      // the code, and the return value
      JSsource[fun] = parseJSFunc(JSfuncs[fun]);
    }
  }

  
  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    // When the function takes numbers and returns a number, we can just return
    // the original function
    var numericArgs = argTypes.every(function(type){ return type === 'number'});
    var numericRet = (returnType !== 'string');
    if ( numericRet && numericArgs) {
      return cfunc;
    }
    // Creation of the arguments list (["$1","$2",...,"$nargs"])
    var argNames = argTypes.map(function(x,i){return '$'+i});
    var funcstr = "(function(" + argNames.join(',') + ") {";
    var nargs = argTypes.length;
    if (!numericArgs) {
      // Generate the code needed to convert the arguments from javascript
      // values to pointers
      funcstr += 'var stack = ' + JSsource['stackSave'].body + ';';
      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i], type = argTypes[i];
        if (type === 'number') continue;
        var convertCode = JSsource[type + 'ToC']; // [code, return]
        funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
        funcstr += convertCode.body + ';';
        funcstr += arg + '=' + convertCode.returnValue + ';';
      }
    }

    // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
    var cfuncname = parseJSFunc(function(){return cfunc}).returnValue;
    // Call the function
    funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
    if (!numericRet) { // Return type can only by 'string' or 'number'
      // Convert the result to a string
      var strgfy = parseJSFunc(function(){return Pointer_stringify}).returnValue;
      funcstr += 'ret = ' + strgfy + '(ret);';
    }
    if (!numericArgs) {
      // If we had a stack, restore it
      funcstr += JSsource['stackRestore'].body.replace('()', '(stack)') + ';';
    }
    funcstr += 'return ret})';
    return eval(funcstr);
  };
})();
Module["cwrap"] = cwrap;
Module["ccall"] = ccall;


function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module['setValue'] = setValue;


function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module['getValue'] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module['ALLOC_NORMAL'] = ALLOC_NORMAL;
Module['ALLOC_STACK'] = ALLOC_STACK;
Module['ALLOC_STATIC'] = ALLOC_STATIC;
Module['ALLOC_DYNAMIC'] = ALLOC_DYNAMIC;
Module['ALLOC_NONE'] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(slab, ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module['allocate'] = allocate;

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!staticSealed) return Runtime.staticAlloc(size);
  if ((typeof _sbrk !== 'undefined' && !_sbrk.called) || !runtimeInitialized) return Runtime.dynamicAlloc(size);
  return _malloc(size);
}
Module['getMemory'] = getMemory;

function Pointer_stringify(ptr, /* optional */ length) {
  if (length === 0 || !ptr) return '';
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = 0;
  var t;
  var i = 0;
  while (1) {
    t = HEAPU8[(((ptr)+(i))>>0)];
    hasUtf |= t;
    if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (hasUtf < 128) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  return Module['UTF8ToString'](ptr);
}
Module['Pointer_stringify'] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAP8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}
Module['AsciiToString'] = AsciiToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}
Module['stringToAscii'] = stringToAscii;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

function UTF8ArrayToString(u8Array, idx) {
  var u0, u1, u2, u3, u4, u5;

  var str = '';
  while (1) {
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    u0 = u8Array[idx++];
    if (!u0) return str;
    if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
    u1 = u8Array[idx++] & 63;
    if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
    u2 = u8Array[idx++] & 63;
    if ((u0 & 0xF0) == 0xE0) {
      u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
    } else {
      u3 = u8Array[idx++] & 63;
      if ((u0 & 0xF8) == 0xF0) {
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
      } else {
        u4 = u8Array[idx++] & 63;
        if ((u0 & 0xFC) == 0xF8) {
          u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
        } else {
          u5 = u8Array[idx++] & 63;
          u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
        }
      }
    }
    if (u0 < 0x10000) {
      str += String.fromCharCode(u0);
    } else {
      var ch = u0 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    }
  }
}
Module['UTF8ArrayToString'] = UTF8ArrayToString;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF8ToString(ptr) {
  return UTF8ArrayToString(HEAPU8, ptr);
}
Module['UTF8ToString'] = UTF8ToString;

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x1FFFFF) {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x3FFFFFF) {
      if (outIdx + 4 >= endIdx) break;
      outU8Array[outIdx++] = 0xF8 | (u >> 24);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 5 >= endIdx) break;
      outU8Array[outIdx++] = 0xFC | (u >> 30);
      outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}
Module['stringToUTF8Array'] = stringToUTF8Array;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}
Module['stringToUTF8'] = stringToUTF8;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      ++len;
    } else if (u <= 0x7FF) {
      len += 2;
    } else if (u <= 0xFFFF) {
      len += 3;
    } else if (u <= 0x1FFFFF) {
      len += 4;
    } else if (u <= 0x3FFFFFF) {
      len += 5;
    } else {
      len += 6;
    }
  }
  return len;
}
Module['lengthBytesUTF8'] = lengthBytesUTF8;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF16ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
    if (codeUnit == 0)
      return str;
    ++i;
    // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
    str += String.fromCharCode(codeUnit);
  }
}
Module['UTF16ToString'] = UTF16ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}
Module['stringToUTF16'] = stringToUTF16;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}
Module['lengthBytesUTF16'] = lengthBytesUTF16;

function UTF32ToString(ptr) {
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}
Module['UTF32ToString'] = UTF32ToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null 
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}
Module['stringToUTF32'] = stringToUTF32;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}
Module['lengthBytesUTF32'] = lengthBytesUTF32;

function demangle(func) {
  var hasLibcxxabi = !!Module['___cxa_demangle'];
  if (hasLibcxxabi) {
    try {
      var buf = _malloc(func.length);
      writeStringToMemory(func.substr(1), buf);
      var status = _malloc(4);
      var ret = Module['___cxa_demangle'](buf, 0, 0, status);
      if (getValue(status, 'i32') === 0 && ret) {
        return Pointer_stringify(ret);
      }
      // otherwise, libcxxabi failed, we can try ours which may return a partial result
    } catch(e) {
      // failure when using libcxxabi, we can try ours which may return a partial result
    } finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
  }
  var i = 3;
  // params, etc.
  var basicTypes = {
    'v': 'void',
    'b': 'bool',
    'c': 'char',
    's': 'short',
    'i': 'int',
    'l': 'long',
    'f': 'float',
    'd': 'double',
    'w': 'wchar_t',
    'a': 'signed char',
    'h': 'unsigned char',
    't': 'unsigned short',
    'j': 'unsigned int',
    'm': 'unsigned long',
    'x': 'long long',
    'y': 'unsigned long long',
    'z': '...'
  };
  var subs = [];
  var first = true;
  function dump(x) {
    //return;
    if (x) Module.print(x);
    Module.print(func);
    var pre = '';
    for (var a = 0; a < i; a++) pre += ' ';
    Module.print (pre + '^');
  }
  function parseNested() {
    i++;
    if (func[i] === 'K') i++; // ignore const
    var parts = [];
    while (func[i] !== 'E') {
      if (func[i] === 'S') { // substitution
        i++;
        var next = func.indexOf('_', i);
        var num = func.substring(i, next) || 0;
        parts.push(subs[num] || '?');
        i = next+1;
        continue;
      }
      if (func[i] === 'C') { // constructor
        parts.push(parts[parts.length-1]);
        i += 2;
        continue;
      }
      var size = parseInt(func.substr(i));
      var pre = size.toString().length;
      if (!size || !pre) { i--; break; } // counter i++ below us
      var curr = func.substr(i + pre, size);
      parts.push(curr);
      subs.push(curr);
      i += pre + size;
    }
    i++; // skip E
    return parts;
  }
  function parse(rawList, limit, allowVoid) { // main parser
    limit = limit || Infinity;
    var ret = '', list = [];
    function flushList() {
      return '(' + list.join(', ') + ')';
    }
    var name;
    if (func[i] === 'N') {
      // namespaced N-E
      name = parseNested().join('::');
      limit--;
      if (limit === 0) return rawList ? [name] : name;
    } else {
      // not namespaced
      if (func[i] === 'K' || (first && func[i] === 'L')) i++; // ignore const and first 'L'
      var size = parseInt(func.substr(i));
      if (size) {
        var pre = size.toString().length;
        name = func.substr(i + pre, size);
        i += pre + size;
      }
    }
    first = false;
    if (func[i] === 'I') {
      i++;
      var iList = parse(true);
      var iRet = parse(true, 1, true);
      ret += iRet[0] + ' ' + name + '<' + iList.join(', ') + '>';
    } else {
      ret = name;
    }
    paramLoop: while (i < func.length && limit-- > 0) {
      //dump('paramLoop');
      var c = func[i++];
      if (c in basicTypes) {
        list.push(basicTypes[c]);
      } else {
        switch (c) {
          case 'P': list.push(parse(true, 1, true)[0] + '*'); break; // pointer
          case 'R': list.push(parse(true, 1, true)[0] + '&'); break; // reference
          case 'L': { // literal
            i++; // skip basic type
            var end = func.indexOf('E', i);
            var size = end - i;
            list.push(func.substr(i, size));
            i += size + 2; // size + 'EE'
            break;
          }
          case 'A': { // array
            var size = parseInt(func.substr(i));
            i += size.toString().length;
            if (func[i] !== '_') throw '?';
            i++; // skip _
            list.push(parse(true, 1, true)[0] + ' [' + size + ']');
            break;
          }
          case 'E': break paramLoop;
          default: ret += '?' + c; break paramLoop;
        }
      }
    }
    if (!allowVoid && list.length === 1 && list[0] === 'void') list = []; // avoid (void)
    if (rawList) {
      if (ret) {
        list.push(ret + '?');
      }
      return list;
    } else {
      return ret + flushList();
    }
  }
  var parsed = func;
  try {
    // Special-case the entry point, since its name differs from other name mangling.
    if (func == 'Object._main' || func == '_main') {
      return 'main()';
    }
    if (typeof func === 'number') func = Pointer_stringify(func);
    if (func[0] !== '_') return func;
    if (func[1] !== '_') return func; // C function
    if (func[2] !== 'Z') return func;
    switch (func[3]) {
      case 'n': return 'operator new()';
      case 'd': return 'operator delete()';
    }
    parsed = parse();
  } catch(e) {
    parsed += '?';
  }
  if (parsed.indexOf('?') >= 0 && !hasLibcxxabi) {
    Runtime.warnOnce('warning: a problem occurred in builtin C++ name demangling; build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  }
  return parsed;
}

function demangleAll(text) {
  return text.replace(/__Z[\w\d_]+/g, function(x) { var y = demangle(x); return x === y ? x : (x + ' [' + y + ']') });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  return demangleAll(jsStackTrace());
}
Module['stackTrace'] = stackTrace;

// Memory management

var PAGE_SIZE = 4096;

function alignMemoryPage(x) {
  if (x % 4096 > 0) {
    x += (4096 - (x % 4096));
  }
  return x;
}

var HEAP;
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

var STATIC_BASE = 0, STATICTOP = 0, staticSealed = false; // static area
var STACK_BASE = 0, STACKTOP = 0, STACK_MAX = 0; // stack area
var DYNAMIC_BASE = 0, DYNAMICTOP = 0; // dynamic area handled by sbrk


function enlargeMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with ALLOW_MEMORY_GROWTH which adjusts the size at runtime but prevents some optimizations, or (3) set Module.TOTAL_MEMORY before the program runs.');
}


var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 30777216;

var totalMemory = 64*1024;
while (totalMemory < TOTAL_MEMORY || totalMemory < 2*TOTAL_STACK) {
  if (totalMemory < 16*1024*1024) {
    totalMemory *= 2;
  } else {
    totalMemory += 16*1024*1024
  }
}
if (totalMemory !== TOTAL_MEMORY) {
  Module.printErr('increasing TOTAL_MEMORY to ' + totalMemory + ' to be compliant with the asm.js spec (and given that TOTAL_STACK=' + TOTAL_STACK + ')');
  TOTAL_MEMORY = totalMemory;
}

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && !!(new Int32Array(1)['subarray']) && !!(new Int32Array(1)['set']),
       'JS engine does not provide full typed array support');

var buffer;
buffer = new ArrayBuffer(TOTAL_MEMORY);
HEAP8 = new Int8Array(buffer);
HEAP16 = new Int16Array(buffer);
HEAP32 = new Int32Array(buffer);
HEAPU8 = new Uint8Array(buffer);
HEAPU16 = new Uint16Array(buffer);
HEAPU32 = new Uint32Array(buffer);
HEAPF32 = new Float32Array(buffer);
HEAPF64 = new Float64Array(buffer);

// Endianness check (note: assumes compiler arch was little-endian)
HEAP32[0] = 255;
assert(HEAPU8[0] === 255 && HEAPU8[3] === 0, 'Typed arrays 2 must be run on a little-endian system');

Module['HEAP'] = HEAP;
Module['buffer'] = buffer;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Runtime.dynCall('v', func);
      } else {
        Runtime.dynCall('vi', func, [callback.arg]);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module['addOnPreRun'] = Module.addOnPreRun = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module['addOnInit'] = Module.addOnInit = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module['addOnPreMain'] = Module.addOnPreMain = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module['addOnExit'] = Module.addOnExit = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module['addOnPostRun'] = Module.addOnPostRun = addOnPostRun;

// Tools


function intArrayFromString(stringy, dontAddNull, length /* optional */) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}
Module['intArrayFromString'] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module['intArrayToString'] = intArrayToString;

function writeStringToMemory(string, buffer, dontAddNull) {
  var array = intArrayFromString(string, dontAddNull);
  var i = 0;
  while (i < array.length) {
    var chr = array[i];
    HEAP8[(((buffer)+(i))>>0)]=chr;
    i = i + 1;
  }
}
Module['writeStringToMemory'] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  for (var i = 0; i < array.length; i++) {
    HEAP8[((buffer++)>>0)]=array[i];
  }
}
Module['writeArrayToMemory'] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}
Module['writeAsciiToMemory'] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}


// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


if (!Math['clz32']) Math['clz32'] = function(x) {
  x = x >>> 0;
  for (var i = 0; i < 32; i++) {
    if (x & (1 << (31 - i))) return i;
  }
  return 32;
};
Math.clz32 = Math['clz32']

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_min = Math.min;
var Math_clz32 = Math.clz32;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled

function getUniqueRunDependency(id) {
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module['removeRunDependency'] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data



var memoryInitializer = null;



// === Body ===

var ASM_CONSTS = [];




STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 2576;
  /* global initializers */  __ATINIT__.push();
  

/* memory initializer */ allocate([82,117,110,45,116,105,109,101,32,101,114,114,111,114,46,46,46,10,0,0,0,0,0,0,37,115,10,0,0,0,0,0,46,46,46,110,111,119,32,101,120,105,116,105,110,103,32,116,111,32,115,121,115,116,101,109,46,46,46,10,0,0,0,0,101,114,114,111,114,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,0,0,84,111,111,32,109,97,110,121,32,105,116,101,114,97,116,105,111,110,115,32,105,110,32,98,114,101,110,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,111,111,32,109,97,110,121,32,105,116,101,114,97,116,105,111,110,115,32,105,110,32,102,114,112,114,109,110,40,41,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,114,0,0,0,0,0,0,0,101,114,114,111,114,32,105,110,32,103,101,116,68,77,84,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,69,114,114,111,114,32,119,104,105,108,101,32,111,112,101,110,105,110,103,32,102,105,108,101,58,32,37,115,32,102,111,114,32,114,101,97,100,105,110,103,0,0,0,0,0,0,0,0,69,114,114,111,114,46,46,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,110,111,67,108,117,115,116,101,114,83,105,122,101,0,0,0,0,0,0,0,0,0,0,0,69,114,114,111,114,32,105,110,32,109,105,110,105,109,105,122,101,32,119,104,101,110,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,0,0,0,0,0,0,0,70,105,108,101,32,37,115,32,110,111,116,32,102,111,117,110,100,10,0,0,0,0,0,0,77,101,109,111,114,121,32,101,114,114,111,114,58,32,117,110,97,98,108,101,32,116,111,32,97,108,108,111,99,97,116,101,32,37,100,32,98,121,116,101,115,10,0,0,0,0,0,0,114,116,0,0,0,0,0,0,85,110,97,98,108,101,32,116,111,32,111,112,101,110,32,37,115,10,0,0,0,0,0,0,85,110,97,98,108,101,32,116,32,114,101,97,100,32,99,111,110,116,101,110,116,32,111,102,32,37,115,10,0,0,0,0,85,110,97,98,108,101,32,116,111,32,112,97,114,115,101,32,100,97,116,97,10,0,0,0,85,110,101,120,112,101,99,116,101,100,32,69,79,70,32,105,110,32,115,116,114,105,110,103,32,40,97,116,32,37,100,58,37,100,41,0,0,0,0,0,73,110,118,97,108,105,100,32,99,104,97,114,97,99,116,101,114,32,118,97,108,117,101,32,96,37,99,96,32,40,97,116,32,37,100,58,37,100,41,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,69,79,70,32,105,110,32,98,108,111,99,107,32,99,111,109,109,101,110,116,0,0,37,100,58,37,100,58,32,67,111,109,109,101,110,116,32,110,111,116,32,97,108,108,111,119,101,100,32,104,101,114,101,0,37,100,58,37,100,58,32,69,79,70,32,117,110,101,120,112,101,99,116,101,100,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,37,99,96,32,105,110,32,99,111,109,109,101,110,116,32,111,112,101,110,105,110,103,32,115,101,113,117,101,110,99,101,0,0,0,0,0,0,37,100,58,37,100,58,32,84,114,97,105,108,105,110,103,32,103,97,114,98,97,103,101,58,32,96,37,99,96,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,93,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,44,32,98,101,102,111,114,101,32,37,99,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,58,32,98,101,102,111,114,101,32,37,99,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,37,99,32,119,104,101,110,32,115,101,101,107,105,110,103,32,118,97,108,117,101,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,44,32,98,101,102,111,114,101,32,34,0,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,37,99,96,32,105,110,32,111,98,106,101,99,116,0,0,0,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,48,96,32,98,101,102,111,114,101,32,96,37,99,96,0,0,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,98,101,102,111,114,101,32,96,46,96,0,0,0,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,97,102,116,101,114,32,96,46,96,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,97,102,116,101,114,32,96,101,96,0,37,100,58,37,100,58,32,85,110,107,110,111,119,110,32,118,97,108,117,101,0,0,0,0,77,101,109,111,114,121,32,97,108,108,111,99,97,116,105,111,110,32,102,97,105,108,117,114,101,0,0,0,0,0,0,0,37,100,58,37,100,58,32,84,111,111,32,108,111,110,103,32,40,99,97,117,103,104,116,32,111,118,101,114,102,108,111,119,41,0,0,0,0,0,0,0,85,110,107,110,111,119,110,32,101,114,114,111,114,0,0,0,105,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,10,0,0,0,100,0,0,0,232,3,0,0,16,39,0,0,160,134,1,0,64,66,15,0,128,150,152,0,0,225,245,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,0,0,0,0,0,0,40,110,117,108,108,41,0,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,0,0,0,0,0,105,110,102,0,0,0,0,0,73,78,70,0,0,0,0,0,110,97,110,0,0,0,0,0,78,65,78,0,0,0,0,0,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);





/* no memory initializer */
var tempDoublePtr = Runtime.alignMemory(allocate(12, "i8", ALLOC_STATIC), 8);

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}

// {{PRE_LIBRARY}}


   
  Module["_i64Subtract"] = _i64Subtract;

  var _fabsf=Math_abs;

  
  
  var ___errno_state=0;function ___setErrNo(value) {
      // For convenient setting and returning of errno.
      HEAP32[((___errno_state)>>2)]=value;
      return value;
    }
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};function _sysconf(name) {
      // long sysconf(int name);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/sysconf.html
      switch(name) {
        case 30: return PAGE_SIZE;
        case 85: return totalMemory / PAGE_SIZE;
        case 132:
        case 133:
        case 12:
        case 137:
        case 138:
        case 15:
        case 235:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 149:
        case 13:
        case 10:
        case 236:
        case 153:
        case 9:
        case 21:
        case 22:
        case 159:
        case 154:
        case 14:
        case 77:
        case 78:
        case 139:
        case 80:
        case 81:
        case 82:
        case 68:
        case 67:
        case 164:
        case 11:
        case 29:
        case 47:
        case 48:
        case 95:
        case 52:
        case 51:
        case 46:
          return 200809;
        case 79:
          return 0;
        case 27:
        case 246:
        case 127:
        case 128:
        case 23:
        case 24:
        case 160:
        case 161:
        case 181:
        case 182:
        case 242:
        case 183:
        case 184:
        case 243:
        case 244:
        case 245:
        case 165:
        case 178:
        case 179:
        case 49:
        case 50:
        case 168:
        case 169:
        case 175:
        case 170:
        case 171:
        case 172:
        case 97:
        case 76:
        case 32:
        case 173:
        case 35:
          return -1;
        case 176:
        case 177:
        case 7:
        case 155:
        case 8:
        case 157:
        case 125:
        case 126:
        case 92:
        case 93:
        case 129:
        case 130:
        case 131:
        case 94:
        case 91:
          return 1;
        case 74:
        case 60:
        case 69:
        case 70:
        case 4:
          return 1024;
        case 31:
        case 42:
        case 72:
          return 32;
        case 87:
        case 26:
        case 33:
          return 2147483647;
        case 34:
        case 1:
          return 47839;
        case 38:
        case 36:
          return 99;
        case 43:
        case 37:
          return 2048;
        case 0: return 2097152;
        case 3: return 65536;
        case 28: return 32768;
        case 44: return 32767;
        case 75: return 16384;
        case 39: return 1000;
        case 89: return 700;
        case 71: return 256;
        case 40: return 255;
        case 2: return 100;
        case 180: return 64;
        case 25: return 20;
        case 5: return 16;
        case 6: return 6;
        case 73: return 4;
        case 84: {
          if (typeof navigator === 'object') return navigator['hardwareConcurrency'] || 1;
          return 1;
        }
      }
      ___setErrNo(ERRNO_CODES.EINVAL);
      return -1;
    }

  var _SItoD=true;

  
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up--; up) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/kripken/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function (stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          for (var i = 0; i < length; i++) {
            try {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              var fd = process.stdin.fd;
              // Linux and Mac cannot use process.stdin.fd (which isn't set up as sync)
              var usingDevice = false;
              try {
                fd = fs.openSync('/dev/stdin', 'r');
                usingDevice = true;
              } catch (e) {}
  
              bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
  
              if (usingDevice) { fs.closeSync(fd); }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
  
            } else if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['print'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            Module['print'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            Module['printErr'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            Module['printErr'](UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.buffer.byteLength which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
        // If we are asked to expand the size of a file that already exists, revert to using a standard JS array to store the file
        // instead of a typed array. This makes resizing the array more flexible because we can just .push() elements at the back to
        // increase the size.
        if (node.contents && node.contents.subarray && newCapacity > node.contents.length) {
          node.contents = MEMFS.getFileDataAsRegularArray(node);
          node.usedBytes = node.contents.length; // We might be writing to a lazy-loaded file which had overridden this property, so force-reset it.
        }
  
        if (!node.contents || node.contents.subarray) { // Keep using a typed array if creating a new storage, or if old one was a typed array as well.
          var prevCapacity = node.contents ? node.contents.buffer.byteLength : 0;
          if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
          // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
          // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
          // avoid overshooting the allocation cap by a very large margin.
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity); // Allocate new storage.
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
          return;
        }
        // Not using a typed array to back the file storage. Use a standard JS array instead.
        if (!node.contents && newCapacity > 0) node.contents = [];
        while (node.contents.length < newCapacity) node.contents.push(0);
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) { // Can we just reuse the buffer we are given?
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
          transaction.onerror = function(e) {
            callback(this.error);
            e.preventDefault();
          };
  
          var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
          var index = store.index('timestamp');
  
          index.openKeyCursor().onsuccess = function(event) {
            var cursor = event.target.result;
  
            if (!cursor) {
              return callback(null, { type: 'remote', db: db, entries: entries });
            }
  
            entries[cursor.primaryKey] = { timestamp: cursor.key };
  
            cursor.continue();
          };
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { encoding: 'binary', canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function(e) {
          done(this.error);
          e.preventDefault();
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // On Windows, directories return permission bits 'rw-rw-rw-', even though they have 'rwxrwxrwx', so
            // propagate write bits to execute bits.
            stat.mode = stat.mode | ((stat.mode & 146) >> 1);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsToPermissionStringMap:{0:"r",1:"r+",2:"r+",64:"r",65:"r+",66:"r+",129:"rx+",193:"rx+",514:"w+",577:"w",578:"w+",705:"wx",706:"wx+",1024:"a",1025:"a",1026:"a+",1089:"a",1090:"a+",1153:"ax",1154:"ax+",1217:"ax",1218:"ax+",4096:"rs",4098:"rs+"},flagsToPermissionString:function (flags) {
        if (flags in NODEFS.flagsToPermissionStringMap) {
          return NODEFS.flagsToPermissionStringMap[flags];
        } else {
          return flags;
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsToPermissionString(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          if (length === 0) return 0; // node errors on 0 length reads
          // FIXME this is terrible.
          var nbuffer = new Buffer(length);
          var res;
          try {
            res = fs.readSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          if (res > 0) {
            for (var i = 0; i < res; i++) {
              buffer[offset + i] = nbuffer[i];
            }
          }
          return res;
        },write:function (stream, buffer, offset, length, position) {
          // FIXME this is terrible.
          var nbuffer = new Buffer(buffer.subarray(offset, offset + length));
          var res;
          try {
            res = fs.writeSync(stream.nfd, nbuffer, 0, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return res;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          return position;
        }}};
  
  var _stdin=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stdout=allocate(1, "i32*", ALLOC_STATIC);
  
  var _stderr=allocate(1, "i32*", ALLOC_STATIC);
  
  function _fflush(stream) {
      // int fflush(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fflush.html
  
      /*
      // Disabled, see https://github.com/kripken/emscripten/issues/2770
      stream = FS.getStreamFromPtr(stream);
      if (stream.stream_ops.flush) {
        stream.stream_ops.flush(stream);
      }
      */
    }var FS={root:null,mounts:[],devices:[null],streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(ERRNO_CODES.ELOOP);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); }
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); }
            }
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var accmode = flag & 2097155;
        var perms = ['r', 'w', 'rw'][accmode];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return ERRNO_CODES.EACCES;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return ERRNO_CODES.EACCES;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return ERRNO_CODES.EACCES;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return ERRNO_CODES.EEXIST;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return ERRNO_CODES.ENOTDIR;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return ERRNO_CODES.EBUSY;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return ERRNO_CODES.ENOENT;
        }
        if (FS.isLink(node.mode)) {
          return ERRNO_CODES.ELOOP;
        } else if (FS.isDir(node.mode)) {
          if ((flags & 2097155) !== 0 ||  // opening for write
              (flags & 512)) {
            return ERRNO_CODES.EISDIR;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(ERRNO_CODES.EMFILE);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },getStreamFromPtr:function (ptr) {
        return FS.streams[ptr - 1];
      },getPtrForStream:function (stream) {
        return stream ? stream.fd + 1 : 0;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            callback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(ERRNO_CODES.EXDEV);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // POSIX says unlink should set EPERM, not EISDIR
          if (err === ERRNO_CODES.EISDIR) err = ERRNO_CODES.EPERM;
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(ERRNO_CODES.EBUSY);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        return PATH.resolve(FS.getPath(lookup.node.parent), link.node_ops.readlink(link));
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(ERRNO_CODES.EEXIST);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            Module['printErr']('read file: ' + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
      },llseek:function (stream, offset, whence) {
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EISDIR);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = true;
        if (typeof position === 'undefined') {
          position = stream.position;
          seeking = false;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(ERRNO_CODES.ESPIPE);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(ERRNO_CODES.EACCES);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function (stream) {
        return 0;
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTTY);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        opts.encoding = opts.encoding || 'utf8';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var stream = FS.open(path, opts.flags, opts.mode);
        if (opts.encoding === 'utf8') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, 0, opts.canOwn);
        } else if (opts.encoding === 'binary') {
          FS.write(stream, data, 0, data.length, 0, opts.canOwn);
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOTDIR);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto !== 'undefined') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else if (ENVIRONMENT_IS_NODE) {
          // for nodejs
          random_device = function() { return require('crypto').randomBytes(1)[0]; };
        } else {
          // default for ES5 platforms
          random_device = function() { return (Math.random()*256)|0; };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        HEAP32[((_stdin)>>2)]=FS.getPtrForStream(stdin);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
  
        var stdout = FS.open('/dev/stdout', 'w');
        HEAP32[((_stdout)>>2)]=FS.getPtrForStream(stdout);
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
  
        var stderr = FS.open('/dev/stderr', 'w');
        HEAP32[((_stderr)>>2)]=FS.getPtrForStream(stderr);
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [ERRNO_CODES.ENOENT].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES.EIO);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(ERRNO_CODES.EIO);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperty(lazyArray, "length", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._length;
              }
          });
          Object.defineProperty(lazyArray, "chunkSize", {
              get: function() {
                  if(!this.lengthKnown) {
                      this.cacheLength();
                  }
                  return this._chunkSize;
              }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperty(node, "usedBytes", {
            get: function() { return this.contents.length; }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init();
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};
  
  
  
  
  function _mkport() { throw 'TODO' }var SOCKFS={mount:function (mount) {
        // If Module['websocket'] has already been defined (e.g. for configuring
        // the subprotocol/url) use that, if not initialise it to a new object.
        Module['websocket'] = (Module['websocket'] && 
                               ('object' === typeof Module['websocket'])) ? Module['websocket'] : {};
  
        // Add the Event registration mechanism to the exported websocket configuration
        // object so we can register network callbacks from native JavaScript too.
        // For more documentation see system/include/emscripten/emscripten.h
        Module['websocket']._callbacks = {};
        Module['websocket']['on'] = function(event, callback) {
  	    if ('function' === typeof callback) {
  		  this._callbacks[event] = callback;
          }
  	    return this;
        };
  
        Module['websocket'].emit = function(event, param) {
  	    if ('function' === typeof this._callbacks[event]) {
  		  this._callbacks[event].call(this, param);
          }
        };
  
        // If debug is enabled register simple default logging callbacks for each Event.
  
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createSocket:function (family, type, protocol) {
        var streaming = type == 1;
        if (protocol) {
          assert(streaming == (protocol == 6)); // if SOCK_STREAM, must be tcp
        }
  
        // create our internal socket structure
        var sock = {
          family: family,
          type: type,
          protocol: protocol,
          server: null,
          error: null, // Used in getsockopt for SOL_SOCKET/SO_ERROR test
          peers: {},
          pending: [],
          recv_queue: [],
          sock_ops: SOCKFS.websocket_sock_ops
        };
  
        // create the filesystem node to store the socket structure
        var name = SOCKFS.nextname();
        var node = FS.createNode(SOCKFS.root, name, 49152, 0);
        node.sock = sock;
  
        // and the wrapping stream that enables library functions such
        // as read and write to indirectly interact with the socket
        var stream = FS.createStream({
          path: name,
          node: node,
          flags: FS.modeStringToFlags('r+'),
          seekable: false,
          stream_ops: SOCKFS.stream_ops
        });
  
        // map the new stream to the socket structure (sockets have a 1:1
        // relationship with a stream)
        sock.stream = stream;
  
        return sock;
      },getSocket:function (fd) {
        var stream = FS.getStream(fd);
        if (!stream || !FS.isSocket(stream.node.mode)) {
          return null;
        }
        return stream.node.sock;
      },stream_ops:{poll:function (stream) {
          var sock = stream.node.sock;
          return sock.sock_ops.poll(sock);
        },ioctl:function (stream, request, varargs) {
          var sock = stream.node.sock;
          return sock.sock_ops.ioctl(sock, request, varargs);
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          var msg = sock.sock_ops.recvmsg(sock, length);
          if (!msg) {
            // socket is closed
            return 0;
          }
          buffer.set(msg.buffer, offset);
          return msg.buffer.length;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var sock = stream.node.sock;
          return sock.sock_ops.sendmsg(sock, buffer, offset, length);
        },close:function (stream) {
          var sock = stream.node.sock;
          sock.sock_ops.close(sock);
        }},nextname:function () {
        if (!SOCKFS.nextname.current) {
          SOCKFS.nextname.current = 0;
        }
        return 'socket[' + (SOCKFS.nextname.current++) + ']';
      },websocket_sock_ops:{createPeer:function (sock, addr, port) {
          var ws;
  
          if (typeof addr === 'object') {
            ws = addr;
            addr = null;
            port = null;
          }
  
          if (ws) {
            // for sockets that've already connected (e.g. we're the server)
            // we can inspect the _socket property for the address
            if (ws._socket) {
              addr = ws._socket.remoteAddress;
              port = ws._socket.remotePort;
            }
            // if we're just now initializing a connection to the remote,
            // inspect the url property
            else {
              var result = /ws[s]?:\/\/([^:]+):(\d+)/.exec(ws.url);
              if (!result) {
                throw new Error('WebSocket URL must be in the format ws(s)://address:port');
              }
              addr = result[1];
              port = parseInt(result[2], 10);
            }
          } else {
            // create the actual websocket object and connect
            try {
              // runtimeConfig gets set to true if WebSocket runtime configuration is available.
              var runtimeConfig = (Module['websocket'] && ('object' === typeof Module['websocket']));
  
              // The default value is 'ws://' the replace is needed because the compiler replaces '//' comments with '#'
              // comments without checking context, so we'd end up with ws:#, the replace swaps the '#' for '//' again.
              var url = 'ws:#'.replace('#', '//');
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['url']) {
                  url = Module['websocket']['url']; // Fetch runtime WebSocket URL config.
                }
              }
  
              if (url === 'ws://' || url === 'wss://') { // Is the supplied URL config just a prefix, if so complete it.
                var parts = addr.split('/');
                url = url + parts[0] + ":" + port + "/" + parts.slice(1).join('/');
              }
  
              // Make the WebSocket subprotocol (Sec-WebSocket-Protocol) default to binary if no configuration is set.
              var subProtocols = 'binary'; // The default value is 'binary'
  
              if (runtimeConfig) {
                if ('string' === typeof Module['websocket']['subprotocol']) {
                  subProtocols = Module['websocket']['subprotocol']; // Fetch runtime WebSocket subprotocol config.
                }
              }
  
              // The regex trims the string (removes spaces at the beginning and end, then splits the string by
              // <any space>,<any space> into an Array. Whitespace removal is important for Websockify and ws.
              subProtocols = subProtocols.replace(/^ +| +$/g,"").split(/ *, */);
  
              // The node ws library API for specifying optional subprotocol is slightly different than the browser's.
              var opts = ENVIRONMENT_IS_NODE ? {'protocol': subProtocols.toString()} : subProtocols;
  
              // If node we use the ws library.
              var WebSocket = ENVIRONMENT_IS_NODE ? require('ws') : window['WebSocket'];
              ws = new WebSocket(url, opts);
              ws.binaryType = 'arraybuffer';
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EHOSTUNREACH);
            }
          }
  
  
          var peer = {
            addr: addr,
            port: port,
            socket: ws,
            dgram_send_queue: []
          };
  
          SOCKFS.websocket_sock_ops.addPeer(sock, peer);
          SOCKFS.websocket_sock_ops.handlePeerEvents(sock, peer);
  
          // if this is a bound dgram socket, send the port number first to allow
          // us to override the ephemeral port reported to us by remotePort on the
          // remote end.
          if (sock.type === 2 && typeof sock.sport !== 'undefined') {
            peer.dgram_send_queue.push(new Uint8Array([
                255, 255, 255, 255,
                'p'.charCodeAt(0), 'o'.charCodeAt(0), 'r'.charCodeAt(0), 't'.charCodeAt(0),
                ((sock.sport & 0xff00) >> 8) , (sock.sport & 0xff)
            ]));
          }
  
          return peer;
        },getPeer:function (sock, addr, port) {
          return sock.peers[addr + ':' + port];
        },addPeer:function (sock, peer) {
          sock.peers[peer.addr + ':' + peer.port] = peer;
        },removePeer:function (sock, peer) {
          delete sock.peers[peer.addr + ':' + peer.port];
        },handlePeerEvents:function (sock, peer) {
          var first = true;
  
          var handleOpen = function () {
  
            Module['websocket'].emit('open', sock.stream.fd);
  
            try {
              var queued = peer.dgram_send_queue.shift();
              while (queued) {
                peer.socket.send(queued);
                queued = peer.dgram_send_queue.shift();
              }
            } catch (e) {
              // not much we can do here in the way of proper error handling as we've already
              // lied and said this data was sent. shut it down.
              peer.socket.close();
            }
          };
  
          function handleMessage(data) {
            assert(typeof data !== 'string' && data.byteLength !== undefined);  // must receive an ArrayBuffer
            data = new Uint8Array(data);  // make a typed array view on the array buffer
  
  
            // if this is the port message, override the peer's port with it
            var wasfirst = first;
            first = false;
            if (wasfirst &&
                data.length === 10 &&
                data[0] === 255 && data[1] === 255 && data[2] === 255 && data[3] === 255 &&
                data[4] === 'p'.charCodeAt(0) && data[5] === 'o'.charCodeAt(0) && data[6] === 'r'.charCodeAt(0) && data[7] === 't'.charCodeAt(0)) {
              // update the peer's port and it's key in the peer map
              var newport = ((data[8] << 8) | data[9]);
              SOCKFS.websocket_sock_ops.removePeer(sock, peer);
              peer.port = newport;
              SOCKFS.websocket_sock_ops.addPeer(sock, peer);
              return;
            }
  
            sock.recv_queue.push({ addr: peer.addr, port: peer.port, data: data });
            Module['websocket'].emit('message', sock.stream.fd);
          };
  
          if (ENVIRONMENT_IS_NODE) {
            peer.socket.on('open', handleOpen);
            peer.socket.on('message', function(data, flags) {
              if (!flags.binary) {
                return;
              }
              handleMessage((new Uint8Array(data)).buffer);  // copy from node Buffer -> ArrayBuffer
            });
            peer.socket.on('close', function() {
              Module['websocket'].emit('close', sock.stream.fd);
            });
            peer.socket.on('error', function(error) {
              // Although the ws library may pass errors that may be more descriptive than
              // ECONNREFUSED they are not necessarily the expected error code e.g. 
              // ENOTFOUND on getaddrinfo seems to be node.js specific, so using ECONNREFUSED
              // is still probably the most useful thing to do.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
              // don't throw
            });
          } else {
            peer.socket.onopen = handleOpen;
            peer.socket.onclose = function() {
              Module['websocket'].emit('close', sock.stream.fd);
            };
            peer.socket.onmessage = function peer_socket_onmessage(event) {
              handleMessage(event.data);
            };
            peer.socket.onerror = function(error) {
              // The WebSocket spec only allows a 'simple event' to be thrown on error,
              // so we only really know as much as ECONNREFUSED.
              sock.error = ERRNO_CODES.ECONNREFUSED; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
              Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'ECONNREFUSED: Connection refused']);
            };
          }
        },poll:function (sock) {
          if (sock.type === 1 && sock.server) {
            // listen sockets should only say they're available for reading
            // if there are pending clients.
            return sock.pending.length ? (64 | 1) : 0;
          }
  
          var mask = 0;
          var dest = sock.type === 1 ?  // we only care about the socket state for connection-based sockets
            SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport) :
            null;
  
          if (sock.recv_queue.length ||
              !dest ||  // connection-less sockets are always ready to read
              (dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {  // let recv return 0 once closed
            mask |= (64 | 1);
          }
  
          if (!dest ||  // connection-less sockets are always ready to write
              (dest && dest.socket.readyState === dest.socket.OPEN)) {
            mask |= 4;
          }
  
          if ((dest && dest.socket.readyState === dest.socket.CLOSING) ||
              (dest && dest.socket.readyState === dest.socket.CLOSED)) {
            mask |= 16;
          }
  
          return mask;
        },ioctl:function (sock, request, arg) {
          switch (request) {
            case 21531:
              var bytes = 0;
              if (sock.recv_queue.length) {
                bytes = sock.recv_queue[0].data.length;
              }
              HEAP32[((arg)>>2)]=bytes;
              return 0;
            default:
              return ERRNO_CODES.EINVAL;
          }
        },close:function (sock) {
          // if we've spawned a listen server, close it
          if (sock.server) {
            try {
              sock.server.close();
            } catch (e) {
            }
            sock.server = null;
          }
          // close any peer connections
          var peers = Object.keys(sock.peers);
          for (var i = 0; i < peers.length; i++) {
            var peer = sock.peers[peers[i]];
            try {
              peer.socket.close();
            } catch (e) {
            }
            SOCKFS.websocket_sock_ops.removePeer(sock, peer);
          }
          return 0;
        },bind:function (sock, addr, port) {
          if (typeof sock.saddr !== 'undefined' || typeof sock.sport !== 'undefined') {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already bound
          }
          sock.saddr = addr;
          sock.sport = port || _mkport();
          // in order to emulate dgram sockets, we need to launch a listen server when
          // binding on a connection-less socket
          // note: this is only required on the server side
          if (sock.type === 2) {
            // close the existing server if it exists
            if (sock.server) {
              sock.server.close();
              sock.server = null;
            }
            // swallow error operation not supported error that occurs when binding in the
            // browser where this isn't supported
            try {
              sock.sock_ops.listen(sock, 0);
            } catch (e) {
              if (!(e instanceof FS.ErrnoError)) throw e;
              if (e.errno !== ERRNO_CODES.EOPNOTSUPP) throw e;
            }
          }
        },connect:function (sock, addr, port) {
          if (sock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
  
          // TODO autobind
          // if (!sock.addr && sock.type == 2) {
          // }
  
          // early out if we're already connected / in the middle of connecting
          if (typeof sock.daddr !== 'undefined' && typeof sock.dport !== 'undefined') {
            var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
            if (dest) {
              if (dest.socket.readyState === dest.socket.CONNECTING) {
                throw new FS.ErrnoError(ERRNO_CODES.EALREADY);
              } else {
                throw new FS.ErrnoError(ERRNO_CODES.EISCONN);
              }
            }
          }
  
          // add the socket to our peer list and set our
          // destination address / port to match
          var peer = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
          sock.daddr = peer.addr;
          sock.dport = peer.port;
  
          // always "fail" in non-blocking mode
          throw new FS.ErrnoError(ERRNO_CODES.EINPROGRESS);
        },listen:function (sock, backlog) {
          if (!ENVIRONMENT_IS_NODE) {
            throw new FS.ErrnoError(ERRNO_CODES.EOPNOTSUPP);
          }
          if (sock.server) {
             throw new FS.ErrnoError(ERRNO_CODES.EINVAL);  // already listening
          }
          var WebSocketServer = require('ws').Server;
          var host = sock.saddr;
          sock.server = new WebSocketServer({
            host: host,
            port: sock.sport
            // TODO support backlog
          });
          Module['websocket'].emit('listen', sock.stream.fd); // Send Event with listen fd.
  
          sock.server.on('connection', function(ws) {
            if (sock.type === 1) {
              var newsock = SOCKFS.createSocket(sock.family, sock.type, sock.protocol);
  
              // create a peer on the new socket
              var peer = SOCKFS.websocket_sock_ops.createPeer(newsock, ws);
              newsock.daddr = peer.addr;
              newsock.dport = peer.port;
  
              // push to queue for accept to pick up
              sock.pending.push(newsock);
              Module['websocket'].emit('connection', newsock.stream.fd);
            } else {
              // create a peer on the listen socket so calling sendto
              // with the listen socket and an address will resolve
              // to the correct client
              SOCKFS.websocket_sock_ops.createPeer(sock, ws);
              Module['websocket'].emit('connection', sock.stream.fd);
            }
          });
          sock.server.on('closed', function() {
            Module['websocket'].emit('close', sock.stream.fd);
            sock.server = null;
          });
          sock.server.on('error', function(error) {
            // Although the ws library may pass errors that may be more descriptive than
            // ECONNREFUSED they are not necessarily the expected error code e.g. 
            // ENOTFOUND on getaddrinfo seems to be node.js specific, so using EHOSTUNREACH
            // is still probably the most useful thing to do. This error shouldn't
            // occur in a well written app as errors should get trapped in the compiled
            // app's own getaddrinfo call.
            sock.error = ERRNO_CODES.EHOSTUNREACH; // Used in getsockopt for SOL_SOCKET/SO_ERROR test.
            Module['websocket'].emit('error', [sock.stream.fd, sock.error, 'EHOSTUNREACH: Host is unreachable']);
            // don't throw
          });
        },accept:function (listensock) {
          if (!listensock.server) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          var newsock = listensock.pending.shift();
          newsock.stream.flags = listensock.stream.flags;
          return newsock;
        },getname:function (sock, peer) {
          var addr, port;
          if (peer) {
            if (sock.daddr === undefined || sock.dport === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            }
            addr = sock.daddr;
            port = sock.dport;
          } else {
            // TODO saddr and sport will be set for bind()'d UDP sockets, but what
            // should we be returning for TCP sockets that've been connect()'d?
            addr = sock.saddr || 0;
            port = sock.sport || 0;
          }
          return { addr: addr, port: port };
        },sendmsg:function (sock, buffer, offset, length, addr, port) {
          if (sock.type === 2) {
            // connection-less sockets will honor the message address,
            // and otherwise fall back to the bound destination address
            if (addr === undefined || port === undefined) {
              addr = sock.daddr;
              port = sock.dport;
            }
            // if there was no address to fall back to, error out
            if (addr === undefined || port === undefined) {
              throw new FS.ErrnoError(ERRNO_CODES.EDESTADDRREQ);
            }
          } else {
            // connection-based sockets will only use the bound
            addr = sock.daddr;
            port = sock.dport;
          }
  
          // find the peer for the destination address
          var dest = SOCKFS.websocket_sock_ops.getPeer(sock, addr, port);
  
          // early out if not connected with a connection-based socket
          if (sock.type === 1) {
            if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
            } else if (dest.socket.readyState === dest.socket.CONNECTING) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // create a copy of the incoming data to send, as the WebSocket API
          // doesn't work entirely with an ArrayBufferView, it'll just send
          // the entire underlying buffer
          var data;
          if (buffer instanceof Array || buffer instanceof ArrayBuffer) {
            data = buffer.slice(offset, offset + length);
          } else {  // ArrayBufferView
            data = buffer.buffer.slice(buffer.byteOffset + offset, buffer.byteOffset + offset + length);
          }
  
          // if we're emulating a connection-less dgram socket and don't have
          // a cached connection, queue the buffer to send upon connect and
          // lie, saying the data was sent now.
          if (sock.type === 2) {
            if (!dest || dest.socket.readyState !== dest.socket.OPEN) {
              // if we're not connected, open a new connection
              if (!dest || dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                dest = SOCKFS.websocket_sock_ops.createPeer(sock, addr, port);
              }
              dest.dgram_send_queue.push(data);
              return length;
            }
          }
  
          try {
            // send the actual data
            dest.socket.send(data);
            return length;
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
        },recvmsg:function (sock, length) {
          // http://pubs.opengroup.org/onlinepubs/7908799/xns/recvmsg.html
          if (sock.type === 1 && sock.server) {
            // tcp servers should not be recv()'ing on the listen socket
            throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
          }
  
          var queued = sock.recv_queue.shift();
          if (!queued) {
            if (sock.type === 1) {
              var dest = SOCKFS.websocket_sock_ops.getPeer(sock, sock.daddr, sock.dport);
  
              if (!dest) {
                // if we have a destination address but are not connected, error out
                throw new FS.ErrnoError(ERRNO_CODES.ENOTCONN);
              }
              else if (dest.socket.readyState === dest.socket.CLOSING || dest.socket.readyState === dest.socket.CLOSED) {
                // return null if the socket has closed
                return null;
              }
              else {
                // else, our socket is in a valid state but truly has nothing available
                throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
              }
            } else {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
          }
  
          // queued.data will be an ArrayBuffer if it's unadulterated, but if it's
          // requeued TCP data it'll be an ArrayBufferView
          var queuedLength = queued.data.byteLength || queued.data.length;
          var queuedOffset = queued.data.byteOffset || 0;
          var queuedBuffer = queued.data.buffer || queued.data;
          var bytesRead = Math.min(length, queuedLength);
          var res = {
            buffer: new Uint8Array(queuedBuffer, queuedOffset, bytesRead),
            addr: queued.addr,
            port: queued.port
          };
  
  
          // push back any unread data for TCP connections
          if (sock.type === 1 && bytesRead < queuedLength) {
            var bytesRemaining = queuedLength - bytesRead;
            queued.data = new Uint8Array(queuedBuffer, queuedOffset + bytesRead, bytesRemaining);
            sock.recv_queue.unshift(queued);
          }
  
          return res;
        }}};function _recv(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _read(fd, buf, len);
    }
  
  function _pread(fildes, buf, nbyte, offset) {
      // ssize_t pread(int fildes, void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _read(fildes, buf, nbyte) {
      // ssize_t read(int fildes, void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/read.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.read(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fread(ptr, size, nitems, stream) {
      // size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fread.html
      var bytesToRead = nitems * size;
      if (bytesToRead == 0) {
        return 0;
      }
      var bytesRead = 0;
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return 0;
      }
      while (streamObj.ungotten.length && bytesToRead > 0) {
        HEAP8[((ptr++)>>0)]=streamObj.ungotten.pop();
        bytesToRead--;
        bytesRead++;
      }
      var err = _read(streamObj.fd, ptr, bytesToRead);
      if (err == -1) {
        if (streamObj) streamObj.error = true;
        return 0;
      }
      bytesRead += err;
      if (bytesRead < bytesToRead) streamObj.eof = true;
      return (bytesRead / size)|0;
    }

  
  function _close(fildes) {
      // int close(int fildes);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/close.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        FS.close(stream);
        return 0;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }
  
  function _fileno(stream) {
      // int fileno(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fileno.html
      stream = FS.getStreamFromPtr(stream);
      if (!stream) return -1;
      return stream.fd;
    }function _fclose(stream) {
      // int fclose(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fclose.html
      var fd = _fileno(stream);
      return _close(fd);
    }

  function _stat(path, buf, dontResolveLastLink) {
      // http://pubs.opengroup.org/onlinepubs/7908799/xsh/stat.html
      // int stat(const char *path, struct stat *buf);
      // NOTE: dontResolveLastLink is a shortcut for lstat(). It should never be
      //       used in client code.
      path = typeof path !== 'string' ? Pointer_stringify(path) : path;
      try {
        var stat = dontResolveLastLink ? FS.lstat(path) : FS.stat(path);
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      } catch (e) {
        if (e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
          // an error occurred while trying to look up the path; we should just report ENOTDIR
          e.setErrno(ERRNO_CODES.ENOTDIR);
        }
        FS.handleFSError(e);
        return -1;
      }
    }

  
  function _strerror_r(errnum, strerrbuf, buflen) {
      if (errnum in ERRNO_MESSAGES) {
        if (ERRNO_MESSAGES[errnum].length > buflen - 1) {
          return ___setErrNo(ERRNO_CODES.ERANGE);
        } else {
          var msg = ERRNO_MESSAGES[errnum];
          writeAsciiToMemory(msg, strerrbuf);
          return 0;
        }
      } else {
        return ___setErrNo(ERRNO_CODES.EINVAL);
      }
    }function _strerror(errnum) {
      if (!_strerror.buffer) _strerror.buffer = _malloc(256);
      _strerror_r(errnum, _strerror.buffer, 256);
      return _strerror.buffer;
    }

   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  function _abort() {
      Module['abort']();
    }

  
  
  
  function _send(fd, buf, len, flags) {
      var sock = SOCKFS.getSocket(fd);
      if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      // TODO honor flags
      return _write(fd, buf, len);
    }
  
  function _pwrite(fildes, buf, nbyte, offset) {
      // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _write(fildes, buf, nbyte) {
      // ssize_t write(int fildes, const void *buf, size_t nbyte);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
      var stream = FS.getStream(fildes);
      if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
      }
  
  
      try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte);
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fwrite(ptr, size, nitems, stream) {
      // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
      var bytesToWrite = nitems * size;
      if (bytesToWrite == 0) return 0;
      var fd = _fileno(stream);
      var bytesWritten = _write(fd, ptr, bytesToWrite);
      if (bytesWritten == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return 0;
      } else {
        return (bytesWritten / size)|0;
      }
    }
  
  
   
  Module["_strlen"] = _strlen;
  
  function __reallyNegative(x) {
      return x < 0 || (x === 0 && (1/x) === -Infinity);
    }function __formatString(format, varargs) {
      assert((varargs & 3) === 0);
      var textIndex = format;
      var argIndex = 0;
      function getNextArg(type) {
        // NOTE: Explicitly ignoring type safety. Otherwise this fails:
        //       int x = 4; printf("%c\n", (char)x);
        var ret;
        argIndex = Runtime.prepVararg(argIndex, type);
        if (type === 'double') {
          ret = (HEAP32[((tempDoublePtr)>>2)]=HEAP32[(((varargs)+(argIndex))>>2)],HEAP32[(((tempDoublePtr)+(4))>>2)]=HEAP32[(((varargs)+((argIndex)+(4)))>>2)],(+(HEAPF64[(tempDoublePtr)>>3])));
          argIndex += 8;
        } else if (type == 'i64') {
          ret = [HEAP32[(((varargs)+(argIndex))>>2)],
                 HEAP32[(((varargs)+(argIndex+4))>>2)]];
  
          argIndex += 8;
        } else {
          assert((argIndex & 3) === 0);
          type = 'i32'; // varargs are always i32, i64, or double
          ret = HEAP32[(((varargs)+(argIndex))>>2)];
          argIndex += 4;
        }
        return ret;
      }
  
      var ret = [];
      var curr, next, currArg;
      while(1) {
        var startTextIndex = textIndex;
        curr = HEAP8[((textIndex)>>0)];
        if (curr === 0) break;
        next = HEAP8[((textIndex+1)>>0)];
        if (curr == 37) {
          // Handle flags.
          var flagAlwaysSigned = false;
          var flagLeftAlign = false;
          var flagAlternative = false;
          var flagZeroPad = false;
          var flagPadSign = false;
          flagsLoop: while (1) {
            switch (next) {
              case 43:
                flagAlwaysSigned = true;
                break;
              case 45:
                flagLeftAlign = true;
                break;
              case 35:
                flagAlternative = true;
                break;
              case 48:
                if (flagZeroPad) {
                  break flagsLoop;
                } else {
                  flagZeroPad = true;
                  break;
                }
              case 32:
                flagPadSign = true;
                break;
              default:
                break flagsLoop;
            }
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
          }
  
          // Handle width.
          var width = 0;
          if (next == 42) {
            width = getNextArg('i32');
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
          } else {
            while (next >= 48 && next <= 57) {
              width = width * 10 + (next - 48);
              textIndex++;
              next = HEAP8[((textIndex+1)>>0)];
            }
          }
  
          // Handle precision.
          var precisionSet = false, precision = -1;
          if (next == 46) {
            precision = 0;
            precisionSet = true;
            textIndex++;
            next = HEAP8[((textIndex+1)>>0)];
            if (next == 42) {
              precision = getNextArg('i32');
              textIndex++;
            } else {
              while(1) {
                var precisionChr = HEAP8[((textIndex+1)>>0)];
                if (precisionChr < 48 ||
                    precisionChr > 57) break;
                precision = precision * 10 + (precisionChr - 48);
                textIndex++;
              }
            }
            next = HEAP8[((textIndex+1)>>0)];
          }
          if (precision < 0) {
            precision = 6; // Standard default.
            precisionSet = false;
          }
  
          // Handle integer sizes. WARNING: These assume a 32-bit architecture!
          var argSize;
          switch (String.fromCharCode(next)) {
            case 'h':
              var nextNext = HEAP8[((textIndex+2)>>0)];
              if (nextNext == 104) {
                textIndex++;
                argSize = 1; // char (actually i32 in varargs)
              } else {
                argSize = 2; // short (actually i32 in varargs)
              }
              break;
            case 'l':
              var nextNext = HEAP8[((textIndex+2)>>0)];
              if (nextNext == 108) {
                textIndex++;
                argSize = 8; // long long
              } else {
                argSize = 4; // long
              }
              break;
            case 'L': // long long
            case 'q': // int64_t
            case 'j': // intmax_t
              argSize = 8;
              break;
            case 'z': // size_t
            case 't': // ptrdiff_t
            case 'I': // signed ptrdiff_t or unsigned size_t
              argSize = 4;
              break;
            default:
              argSize = null;
          }
          if (argSize) textIndex++;
          next = HEAP8[((textIndex+1)>>0)];
  
          // Handle type specifier.
          switch (String.fromCharCode(next)) {
            case 'd': case 'i': case 'u': case 'o': case 'x': case 'X': case 'p': {
              // Integer.
              var signed = next == 100 || next == 105;
              argSize = argSize || 4;
              var currArg = getNextArg('i' + (argSize * 8));
              var origArg = currArg;
              var argText;
              // Flatten i64-1 [low, high] into a (slightly rounded) double
              if (argSize == 8) {
                currArg = Runtime.makeBigInt(currArg[0], currArg[1], next == 117);
              }
              // Truncate to requested size.
              if (argSize <= 4) {
                var limit = Math.pow(256, argSize) - 1;
                currArg = (signed ? reSign : unSign)(currArg & limit, argSize * 8);
              }
              // Format the number.
              var currAbsArg = Math.abs(currArg);
              var prefix = '';
              if (next == 100 || next == 105) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], null); else
                argText = reSign(currArg, 8 * argSize, 1).toString(10);
              } else if (next == 117) {
                if (argSize == 8 && i64Math) argText = i64Math.stringify(origArg[0], origArg[1], true); else
                argText = unSign(currArg, 8 * argSize, 1).toString(10);
                currArg = Math.abs(currArg);
              } else if (next == 111) {
                argText = (flagAlternative ? '0' : '') + currAbsArg.toString(8);
              } else if (next == 120 || next == 88) {
                prefix = (flagAlternative && currArg != 0) ? '0x' : '';
                if (argSize == 8 && i64Math) {
                  if (origArg[1]) {
                    argText = (origArg[1]>>>0).toString(16);
                    var lower = (origArg[0]>>>0).toString(16);
                    while (lower.length < 8) lower = '0' + lower;
                    argText += lower;
                  } else {
                    argText = (origArg[0]>>>0).toString(16);
                  }
                } else
                if (currArg < 0) {
                  // Represent negative numbers in hex as 2's complement.
                  currArg = -currArg;
                  argText = (currAbsArg - 1).toString(16);
                  var buffer = [];
                  for (var i = 0; i < argText.length; i++) {
                    buffer.push((0xF - parseInt(argText[i], 16)).toString(16));
                  }
                  argText = buffer.join('');
                  while (argText.length < argSize * 2) argText = 'f' + argText;
                } else {
                  argText = currAbsArg.toString(16);
                }
                if (next == 88) {
                  prefix = prefix.toUpperCase();
                  argText = argText.toUpperCase();
                }
              } else if (next == 112) {
                if (currAbsArg === 0) {
                  argText = '(nil)';
                } else {
                  prefix = '0x';
                  argText = currAbsArg.toString(16);
                }
              }
              if (precisionSet) {
                while (argText.length < precision) {
                  argText = '0' + argText;
                }
              }
  
              // Add sign if needed
              if (currArg >= 0) {
                if (flagAlwaysSigned) {
                  prefix = '+' + prefix;
                } else if (flagPadSign) {
                  prefix = ' ' + prefix;
                }
              }
  
              // Move sign to prefix so we zero-pad after the sign
              if (argText.charAt(0) == '-') {
                prefix = '-' + prefix;
                argText = argText.substr(1);
              }
  
              // Add padding.
              while (prefix.length + argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad) {
                    argText = '0' + argText;
                  } else {
                    prefix = ' ' + prefix;
                  }
                }
              }
  
              // Insert the result into the buffer.
              argText = prefix + argText;
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 'f': case 'F': case 'e': case 'E': case 'g': case 'G': {
              // Float.
              var currArg = getNextArg('double');
              var argText;
              if (isNaN(currArg)) {
                argText = 'nan';
                flagZeroPad = false;
              } else if (!isFinite(currArg)) {
                argText = (currArg < 0 ? '-' : '') + 'inf';
                flagZeroPad = false;
              } else {
                var isGeneral = false;
                var effectivePrecision = Math.min(precision, 20);
  
                // Convert g/G to f/F or e/E, as per:
                // http://pubs.opengroup.org/onlinepubs/9699919799/functions/printf.html
                if (next == 103 || next == 71) {
                  isGeneral = true;
                  precision = precision || 1;
                  var exponent = parseInt(currArg.toExponential(effectivePrecision).split('e')[1], 10);
                  if (precision > exponent && exponent >= -4) {
                    next = ((next == 103) ? 'f' : 'F').charCodeAt(0);
                    precision -= exponent + 1;
                  } else {
                    next = ((next == 103) ? 'e' : 'E').charCodeAt(0);
                    precision--;
                  }
                  effectivePrecision = Math.min(precision, 20);
                }
  
                if (next == 101 || next == 69) {
                  argText = currArg.toExponential(effectivePrecision);
                  // Make sure the exponent has at least 2 digits.
                  if (/[eE][-+]\d$/.test(argText)) {
                    argText = argText.slice(0, -1) + '0' + argText.slice(-1);
                  }
                } else if (next == 102 || next == 70) {
                  argText = currArg.toFixed(effectivePrecision);
                  if (currArg === 0 && __reallyNegative(currArg)) {
                    argText = '-' + argText;
                  }
                }
  
                var parts = argText.split('e');
                if (isGeneral && !flagAlternative) {
                  // Discard trailing zeros and periods.
                  while (parts[0].length > 1 && parts[0].indexOf('.') != -1 &&
                         (parts[0].slice(-1) == '0' || parts[0].slice(-1) == '.')) {
                    parts[0] = parts[0].slice(0, -1);
                  }
                } else {
                  // Make sure we have a period in alternative mode.
                  if (flagAlternative && argText.indexOf('.') == -1) parts[0] += '.';
                  // Zero pad until required precision.
                  while (precision > effectivePrecision++) parts[0] += '0';
                }
                argText = parts[0] + (parts.length > 1 ? 'e' + parts[1] : '');
  
                // Capitalize 'E' if needed.
                if (next == 69) argText = argText.toUpperCase();
  
                // Add sign.
                if (currArg >= 0) {
                  if (flagAlwaysSigned) {
                    argText = '+' + argText;
                  } else if (flagPadSign) {
                    argText = ' ' + argText;
                  }
                }
              }
  
              // Add padding.
              while (argText.length < width) {
                if (flagLeftAlign) {
                  argText += ' ';
                } else {
                  if (flagZeroPad && (argText[0] == '-' || argText[0] == '+')) {
                    argText = argText[0] + '0' + argText.slice(1);
                  } else {
                    argText = (flagZeroPad ? '0' : ' ') + argText;
                  }
                }
              }
  
              // Adjust case.
              if (next < 97) argText = argText.toUpperCase();
  
              // Insert the result into the buffer.
              argText.split('').forEach(function(chr) {
                ret.push(chr.charCodeAt(0));
              });
              break;
            }
            case 's': {
              // String.
              var arg = getNextArg('i8*');
              var argLength = arg ? _strlen(arg) : '(null)'.length;
              if (precisionSet) argLength = Math.min(argLength, precision);
              if (!flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              if (arg) {
                for (var i = 0; i < argLength; i++) {
                  ret.push(HEAPU8[((arg++)>>0)]);
                }
              } else {
                ret = ret.concat(intArrayFromString('(null)'.substr(0, argLength), true));
              }
              if (flagLeftAlign) {
                while (argLength < width--) {
                  ret.push(32);
                }
              }
              break;
            }
            case 'c': {
              // Character.
              if (flagLeftAlign) ret.push(getNextArg('i8'));
              while (--width > 0) {
                ret.push(32);
              }
              if (!flagLeftAlign) ret.push(getNextArg('i8'));
              break;
            }
            case 'n': {
              // Write the length written so far to the next parameter.
              var ptr = getNextArg('i32*');
              HEAP32[((ptr)>>2)]=ret.length;
              break;
            }
            case '%': {
              // Literal percent sign.
              ret.push(curr);
              break;
            }
            default: {
              // Unknown specifiers remain untouched.
              for (var i = startTextIndex; i < textIndex + 2; i++) {
                ret.push(HEAP8[((i)>>0)]);
              }
            }
          }
          textIndex += 2;
          // TODO: Support a/A (hex float) and m (last error) specifiers.
          // TODO: Support %1${specifier} for arg selection.
        } else {
          ret.push(curr);
          textIndex += 1;
        }
      }
      return ret;
    }function _fprintf(stream, format, varargs) {
      // int fprintf(FILE *restrict stream, const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var result = __formatString(format, varargs);
      var stack = Runtime.stackSave();
      var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
      Runtime.stackRestore(stack);
      return ret;
    }

  function _printf(format, varargs) {
      // int printf(const char *restrict format, ...);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
      var stdout = HEAP32[((_stdout)>>2)];
      return _fprintf(stdout, format, varargs);
    }

  
  function _fgetc(stream) {
      // int fgetc(FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgetc.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return -1;
      if (streamObj.eof || streamObj.error) return -1;
      var ret = _fread(_fgetc.ret, 1, 1, stream);
      if (ret == 0) {
        return -1;
      } else if (ret == -1) {
        streamObj.error = true;
        return -1;
      } else {
        return HEAPU8[((_fgetc.ret)>>0)];
      }
    }function _fgets(s, n, stream) {
      // char *fgets(char *restrict s, int n, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fgets.html
      var streamObj = FS.getStreamFromPtr(stream);
      if (!streamObj) return 0;
      if (streamObj.error || streamObj.eof) return 0;
      var byte_;
      for (var i = 0; i < n - 1 && byte_ != 10; i++) {
        byte_ = _fgetc(stream);
        if (byte_ == -1) {
          if (streamObj.error || (streamObj.eof && i == 0)) return 0;
          else if (streamObj.eof) break;
        }
        HEAP8[(((s)+(i))>>0)]=byte_;
      }
      HEAP8[(((s)+(i))>>0)]=0;
      return s;
    }

  
  function _open(path, oflag, varargs) {
      // int open(const char *path, int oflag, ...);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/open.html
      var mode = HEAP32[((varargs)>>2)];
      path = Pointer_stringify(path);
      try {
        var stream = FS.open(path, oflag, mode);
        return stream.fd;
      } catch (e) {
        FS.handleFSError(e);
        return -1;
      }
    }function _fopen(filename, mode) {
      // FILE *fopen(const char *restrict filename, const char *restrict mode);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fopen.html
      var flags;
      mode = Pointer_stringify(mode);
      if (mode[0] == 'r') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 0;
        }
      } else if (mode[0] == 'w') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 512;
      } else if (mode[0] == 'a') {
        if (mode.indexOf('+') != -1) {
          flags = 2;
        } else {
          flags = 1;
        }
        flags |= 64;
        flags |= 1024;
      } else {
        ___setErrNo(ERRNO_CODES.EINVAL);
        return 0;
      }
      var fd = _open(filename, flags, allocate([0x1FF, 0, 0, 0], 'i32', ALLOC_STACK));  // All creation permissions.
      return fd === -1 ? 0 : FS.getPtrForStream(FS.getStream(fd));
    }


  var _sqrtf=Math_sqrt;

   
  Module["_i64Add"] = _i64Add;

  var _fabs=Math_abs;


  var _sqrt=Math_sqrt;

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

  
  
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (mode == 0 /*EM_TIMING_SETTIMEOUT*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          setTimeout(Browser.mainLoop.runner, value); // doing this each time means that on exception, we stop
        };
        Browser.mainLoop.method = 'timeout';
      } else if (mode == 1 /*EM_TIMING_RAF*/) {
        Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler() {
          Browser.requestAnimationFrame(Browser.mainLoop.runner);
        };
        Browser.mainLoop.method = 'rAF';
      }
      return 0;
    }function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
      Module['noExitRuntime'] = true;
  
      assert(!Browser.mainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
  
      Browser.mainLoop.func = func;
      Browser.mainLoop.arg = arg;
  
      var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
  
      Browser.mainLoop.runner = function Browser_mainLoop_runner() {
        if (ABORT) return;
        if (Browser.mainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = Browser.mainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (Browser.mainLoop.remainingBlockers) {
            var remaining = Browser.mainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              Browser.mainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              Browser.mainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + ' ms'); //, left: ' + Browser.mainLoop.remainingBlockers);
          Browser.mainLoop.updateStatus();
          setTimeout(Browser.mainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Implement very basic swap interval control
        Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
        if (Browser.mainLoop.timingMode == 1/*EM_TIMING_RAF*/ && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          Browser.mainLoop.scheduler();
          return;
        }
  
        // Signal GL rendering layer that processing of a new frame is about to start. This helps it optimize
        // VBO double-buffering and reduce GPU stalls.
  
        if (Browser.mainLoop.method === 'timeout' && Module.ctx) {
          Module.printErr('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          Browser.mainLoop.method = ''; // just warn once per call to set main loop
        }
  
        Browser.mainLoop.runIter(function() {
          if (typeof arg !== 'undefined') {
            Runtime.dynCall('vi', func, [arg]);
          } else {
            Runtime.dynCall('v', func);
          }
        });
  
        // catch pauses from the main loop itself
        if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
  
        // Queue new audio data. This is important to be right after the main loop invocation, so that we will immediately be able
        // to queue the newest produced audio samples.
        // TODO: Consider adding pre- and post- rAF callbacks so that GL.newRenderingFrameStarted() and SDL.audio.queueNewAudioData()
        //       do not need to be hardcoded into this function, but can be more generic.
        if (typeof SDL === 'object' && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
  
        Browser.mainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) _emscripten_set_main_loop_timing(0/*EM_TIMING_SETTIMEOUT*/, 1000.0 / fps);
        else _emscripten_set_main_loop_timing(1/*EM_TIMING_RAF*/, 1); // Do rAF by rendering each frame (no decimating)
  
        Browser.mainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'SimulateInfiniteLoop';
      }
    }var Browser={mainLoop:{scheduler:null,method:"",currentlyRunningMainloop:0,func:null,arg:0,timingMode:0,timingValue:0,currentFrameNumber:0,queue:[],pause:function () {
          Browser.mainLoop.scheduler = null;
          Browser.mainLoop.currentlyRunningMainloop++; // Incrementing this signals the previous main loop that it's now become old, and it must return.
        },resume:function () {
          Browser.mainLoop.currentlyRunningMainloop++;
          var timingMode = Browser.mainLoop.timingMode;
          var timingValue = Browser.mainLoop.timingValue;
          var func = Browser.mainLoop.func;
          Browser.mainLoop.func = null;
          _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true /* do not set timing and call scheduler, we will do it on the next lines */);
          _emscripten_set_main_loop_timing(timingMode, timingValue);
          Browser.mainLoop.scheduler();
        },updateStatus:function () {
          if (Module['setStatus']) {
            var message = Module['statusMessage'] || 'Please wait...';
            var remaining = Browser.mainLoop.remainingBlockers;
            var expected = Browser.mainLoop.expectedBlockers;
            if (remaining) {
              if (remaining < expected) {
                Module['setStatus'](message + ' (' + (expected - remaining) + '/' + expected + ')');
              } else {
                Module['setStatus'](message);
              }
            } else {
              Module['setStatus']('');
            }
          }
        },runIter:function (func) {
          if (ABORT) return;
          if (Module['preMainLoop']) {
            var preRet = Module['preMainLoop']();
            if (preRet === false) {
              return; // |return false| skips a frame
            }
          }
          try {
            func();
          } catch (e) {
            if (e instanceof ExitStatus) {
              return;
            } else {
              if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
              throw e;
            }
          }
          if (Module['postMainLoop']) Module['postMainLoop']();
        }},isFullScreen:false,pointerLock:false,moduleContextCreatedCallbacks:[],workers:[],init:function () {
        if (!Module["preloadPlugins"]) Module["preloadPlugins"] = []; // needs to exist even in workers
  
        if (Browser.initted) return;
        Browser.initted = true;
  
        try {
          new Blob();
          Browser.hasBlobConstructor = true;
        } catch(e) {
          Browser.hasBlobConstructor = false;
          console.log("warning: no blob constructor, cannot create blobs with mimetypes");
        }
        Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : (typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : (!Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null));
        Browser.URLObject = typeof window != "undefined" ? (window.URL ? window.URL : window.webkitURL) : undefined;
        if (!Module.noImageDecoding && typeof Browser.URLObject === 'undefined') {
          console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
          Module.noImageDecoding = true;
        }
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to Module.preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = null;
          if (Browser.hasBlobConstructor) {
            try {
              b = new Blob([byteArray], { type: Browser.getMimetype(name) });
              if (b.size !== byteArray.length) { // Safari bug #118630
                // Safari's Blob can only take an ArrayBuffer
                b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
              }
            } catch(e) {
              Runtime.warnOnce('Blob constructor present but fails: ' + e + '; falling back to blob builder');
            }
          }
          if (!b) {
            var bb = new Browser.BlobBuilder();
            bb.append((new Uint8Array(byteArray)).buffer); // we need to pass a buffer, and must copy the array to get the right data range
            b = bb.getBlob();
          }
          var url = Browser.URLObject.createObjectURL(b);
          var img = new Image();
          img.onload = function img_onload() {
            assert(img.complete, 'Image ' + name + ' could not be decoded');
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Module["preloadedImages"][name] = canvas;
            Browser.URLObject.revokeObjectURL(url);
            if (onload) onload(byteArray);
          };
          img.onerror = function img_onerror(event) {
            console.log('Image ' + url + ' could not be decoded');
            if (onerror) onerror();
          };
          img.src = url;
        };
        Module['preloadPlugins'].push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module.noAudioDecoding && name.substr(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = audio;
            if (onload) onload(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Module["preloadedAudios"][name] = new Audio(); // empty shim
            if (onerror) onerror();
          }
          if (Browser.hasBlobConstructor) {
            try {
              var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
            } catch(e) {
              return fail();
            }
            var url = Browser.URLObject.createObjectURL(b); // XXX we never revoke this!
            var audio = new Audio();
            audio.addEventListener('canplaythrough', function() { finish(audio) }, false); // use addEventListener due to chromium bug 124926
            audio.onerror = function audio_onerror(event) {
              if (done) return;
              console.log('warning: browser could not fully decode audio ' + name + ', trying slower base64 approach');
              function encode64(data) {
                var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
                var PAD = '=';
                var ret = '';
                var leftchar = 0;
                var leftbits = 0;
                for (var i = 0; i < data.length; i++) {
                  leftchar = (leftchar << 8) | data[i];
                  leftbits += 8;
                  while (leftbits >= 6) {
                    var curr = (leftchar >> (leftbits-6)) & 0x3f;
                    leftbits -= 6;
                    ret += BASE[curr];
                  }
                }
                if (leftbits == 2) {
                  ret += BASE[(leftchar&3) << 4];
                  ret += PAD + PAD;
                } else if (leftbits == 4) {
                  ret += BASE[(leftchar&0xf) << 2];
                  ret += PAD;
                }
                return ret;
              }
              audio.src = 'data:audio/x-' + name.substr(-3) + ';base64,' + encode64(byteArray);
              finish(audio); // we don't wait for confirmation this worked - but it's worth trying
            };
            audio.src = url;
            // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
            Browser.safeSetTimeout(function() {
              finish(audio); // try to use it even though it is not necessarily ready to play
            }, 10000);
          } else {
            return fail();
          }
        };
        Module['preloadPlugins'].push(audioPlugin);
  
        // Canvas event setup
  
        var canvas = Module['canvas'];
        function pointerLockChange() {
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
          
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      function(){};
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   function(){}; // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", function(ev) {
              if (!Browser.pointerLock && canvas.requestPointerLock) {
                canvas.requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },createContext:function (canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          contextHandle = GL.createContext(canvas, contextAttributes);
          if (contextHandle) {
            ctx = GL.getContext(contextHandle).GLctx;
          }
          // Set the background of the WebGL canvas to black
          canvas.style.backgroundColor = "black";
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx === 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
  
          Module.ctx = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Module.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach(function(callback) { callback() });
          Browser.init();
        }
        return ctx;
      },destroyContext:function (canvas, useWebGL, setInModule) {},fullScreenHandlersInstalled:false,lockPointer:undefined,resizeCanvas:undefined,requestFullScreen:function (lockPointer, resizeCanvas, vrDevice) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        Browser.vrDevice = vrDevice;
        if (typeof Browser.lockPointer === 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas === 'undefined') Browser.resizeCanvas = false;
        if (typeof Browser.vrDevice === 'undefined') Browser.vrDevice = null;
  
        var canvas = Module['canvas'];
        function fullScreenChange() {
          Browser.isFullScreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
               document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
               document['fullScreenElement'] || document['fullscreenElement'] ||
               document['msFullScreenElement'] || document['msFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.cancelFullScreen = document['cancelFullScreen'] ||
                                      document['mozCancelFullScreen'] ||
                                      document['webkitCancelFullScreen'] ||
                                      document['msExitFullscreen'] ||
                                      document['exitFullscreen'] ||
                                      function() {};
            canvas.cancelFullScreen = canvas.cancelFullScreen.bind(document);
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullScreen = true;
            if (Browser.resizeCanvas) Browser.setFullScreenCanvasSize();
          } else {
            
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
            
            if (Browser.resizeCanvas) Browser.setWindowedCanvasSize();
          }
          if (Module['onFullScreen']) Module['onFullScreen'](Browser.isFullScreen);
          Browser.updateCanvasDimensions(canvas);
        }
  
        if (!Browser.fullScreenHandlersInstalled) {
          Browser.fullScreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullScreenChange, false);
          document.addEventListener('mozfullscreenchange', fullScreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullScreenChange, false);
          document.addEventListener('MSFullscreenChange', fullScreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullScreen = canvasContainer['requestFullScreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullScreen'] ? function() { canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) } : null);
  
        if (vrDevice) {
          canvasContainer.requestFullScreen({ vrDisplay: vrDevice });
        } else {
          canvasContainer.requestFullScreen();
        }
      },nextRAF:0,fakeRequestAnimationFrame:function (func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (Browser.nextRAF === 0) {
          Browser.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= Browser.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            Browser.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(Browser.nextRAF - now, 0);
        setTimeout(func, delay);
      },requestAnimationFrame:function requestAnimationFrame(func) {
        if (typeof window === 'undefined') { // Provide fallback to setTimeout if window is undefined (e.g. in Node.js)
          Browser.fakeRequestAnimationFrame(func);
        } else {
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = window['requestAnimationFrame'] ||
                                           window['mozRequestAnimationFrame'] ||
                                           window['webkitRequestAnimationFrame'] ||
                                           window['msRequestAnimationFrame'] ||
                                           window['oRequestAnimationFrame'] ||
                                           Browser.fakeRequestAnimationFrame;
          }
          window.requestAnimationFrame(func);
        }
      },safeCallback:function (func) {
        return function() {
          if (!ABORT) return func.apply(null, arguments);
        };
      },allowAsyncCallbacks:true,queuedAsyncCallbacks:[],pauseAsyncCallbacks:function () {
        Browser.allowAsyncCallbacks = false;
      },resumeAsyncCallbacks:function () { // marks future callbacks as ok to execute, and synchronously runs any remaining ones right now
        Browser.allowAsyncCallbacks = true;
        if (Browser.queuedAsyncCallbacks.length > 0) {
          var callbacks = Browser.queuedAsyncCallbacks;
          Browser.queuedAsyncCallbacks = [];
          callbacks.forEach(function(func) {
            func();
          });
        }
      },safeRequestAnimationFrame:function (func) {
        return Browser.requestAnimationFrame(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        });
      },safeSetTimeout:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setTimeout(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } else {
            Browser.queuedAsyncCallbacks.push(func);
          }
        }, timeout);
      },safeSetInterval:function (func, timeout) {
        Module['noExitRuntime'] = true;
        return setInterval(function() {
          if (ABORT) return;
          if (Browser.allowAsyncCallbacks) {
            func();
          } // drop it on the floor otherwise, next interval will kick in
        }, timeout);
      },getMimetype:function (name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.substr(name.lastIndexOf('.')+1)];
      },getUserMedia:function (func) {
        if(!window.getUserMedia) {
          window.getUserMedia = navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        }
        window.getUserMedia(func);
      },getMovementX:function (event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },getMovementY:function (event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },getMouseWheelDelta:function (event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll': 
            delta = event.detail;
            break;
          case 'mousewheel': 
            delta = event.wheelDelta;
            break;
          case 'wheel': 
            delta = event['deltaY'];
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },mouseX:0,mouseY:0,mouseMovementX:0,mouseMovementY:0,touches:{},lastTouches:{},calculateMouseEvent:function (event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
          
          // check if SDL is available
          if (typeof SDL != "undefined") {
          	Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
          	Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
          } else {
          	// just add the mouse delta to the current absolut mouse position
          	// FIXME: ideally this should be clamped against the canvas size and zero
          	Browser.mouseX += Browser.mouseMovementX;
          	Browser.mouseY += Browser.mouseMovementY;
          }        
        } else {
          // Otherwise, calculate the movement based on the changes
          // in the coordinates.
          var rect = Module["canvas"].getBoundingClientRect();
          var cw = Module["canvas"].width;
          var ch = Module["canvas"].height;
  
          // Neither .scrollX or .pageXOffset are defined in a spec, but
          // we prefer .scrollX because it is currently in a spec draft.
          // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
          var scrollX = ((typeof window.scrollX !== 'undefined') ? window.scrollX : window.pageXOffset);
          var scrollY = ((typeof window.scrollY !== 'undefined') ? window.scrollY : window.pageYOffset);
  
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var adjustedX = touch.pageX - (scrollX + rect.left);
            var adjustedY = touch.pageY - (scrollY + rect.top);
  
            adjustedX = adjustedX * (cw / rect.width);
            adjustedY = adjustedY * (ch / rect.height);
  
            var coords = { x: adjustedX, y: adjustedY };
            
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              if (!last) last = coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            } 
            return;
          }
  
          var x = event.pageX - (scrollX + rect.left);
          var y = event.pageY - (scrollY + rect.top);
  
          // the canvas might be CSS-scaled compared to its backbuffer;
          // SDL-using content will want mouse coordinates in terms
          // of backbuffer units.
          x = x * (cw / rect.width);
          y = y * (ch / rect.height);
  
          Browser.mouseMovementX = x - Browser.mouseX;
          Browser.mouseMovementY = y - Browser.mouseY;
          Browser.mouseX = x;
          Browser.mouseY = y;
        }
      },xhrLoad:function (url, onload, onerror) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function xhr_onload() {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            onload(xhr.response);
          } else {
            onerror();
          }
        };
        xhr.onerror = onerror;
        xhr.send(null);
      },asyncLoad:function (url, onload, onerror, noRunDep) {
        Browser.xhrLoad(url, function(arrayBuffer) {
          assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
          onload(new Uint8Array(arrayBuffer));
          if (!noRunDep) removeRunDependency('al ' + url);
        }, function(event) {
          if (onerror) {
            onerror();
          } else {
            throw 'Loading data file "' + url + '" failed.';
          }
        });
        if (!noRunDep) addRunDependency('al ' + url);
      },resizeListeners:[],updateResizeListeners:function () {
        var canvas = Module['canvas'];
        Browser.resizeListeners.forEach(function(listener) {
          listener(canvas.width, canvas.height);
        });
      },setCanvasSize:function (width, height, noUpdates) {
        var canvas = Module['canvas'];
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },windowedWidth:0,windowedHeight:0,setFullScreenCanvasSize:function () {
        // check if SDL is available   
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },setWindowedCanvasSize:function () {
        // check if SDL is available       
        if (typeof SDL != "undefined") {
        	var flags = HEAPU32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)];
        	flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
        	HEAP32[((SDL.screen+Runtime.QUANTUM_SIZE*0)>>2)]=flags
        }
        Browser.updateResizeListeners();
      },updateCanvasDimensions:function (canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] && Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['webkitFullScreenElement'] || document['webkitFullscreenElement'] ||
             document['mozFullScreenElement'] || document['mozFullscreenElement'] ||
             document['fullScreenElement'] || document['fullscreenElement'] ||
             document['msFullScreenElement'] || document['msFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },wgetRequests:{},nextWgetRequestHandle:0,getNextWgetRequestHandle:function () {
        var handle = Browser.nextWgetRequestHandle;
        Browser.nextWgetRequestHandle++;
        return handle;
      }};

   
  Module["_bitshift64Lshr"] = _bitshift64Lshr;

   
  Module["_memset"] = _memset;

  var _BDtoILow=true;

  var _BDtoIHigh=true;

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  var _llvm_pow_f64=Math_pow;

  function _sbrk(bytes) {
      // Implement a Linux-like 'memory area' for our 'process'.
      // Changes the size of the memory area by |bytes|; returns the
      // address of the previous top ('break') of the memory area
      // We control the "dynamic" memory - DYNAMIC_BASE to DYNAMICTOP
      var self = _sbrk;
      if (!self.called) {
        DYNAMICTOP = alignMemoryPage(DYNAMICTOP); // make sure we start out aligned
        self.called = true;
        assert(Runtime.dynamicAlloc);
        self.alloc = Runtime.dynamicAlloc;
        Runtime.dynamicAlloc = function() { abort('cannot dynamically allocate, sbrk now has control') };
      }
      var ret = DYNAMICTOP;
      if (bytes != 0) {
        var success = self.alloc(bytes);
        if (!success) return -1 >>> 0; // sbrk failure code
      }
      return ret;  // Previous break location.
    }

  function ___errno_location() {
      return ___errno_state;
    }

  var _BItoD=true;

   
  Module["_strcpy"] = _strcpy;

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

___errno_state = Runtime.staticAlloc(4); HEAP32[((___errno_state)>>2)]=0;
FS.staticInit();__ATINIT__.unshift(function() { if (!Module["noFSInit"] && !FS.init.initialized) FS.init() });__ATMAIN__.push(function() { FS.ignorePermissions = false });__ATEXIT__.push(function() { FS.quit() });Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;
__ATINIT__.unshift(function() { TTY.init() });__ATEXIT__.push(function() { TTY.shutdown() });
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); var NODEJS_PATH = require("path"); NODEFS.staticInit(); }
__ATINIT__.push(function() { SOCKFS.root = FS.mount(SOCKFS, {}, null); });
_fgetc.ret = allocate([0], "i8", ALLOC_STATIC);
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) { Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
  Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) { return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes) }
STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

staticSealed = true; // seal the static portion of memory

STACK_MAX = STACK_BASE + TOTAL_STACK;

DYNAMIC_BASE = DYNAMICTOP = Runtime.alignMemory(STACK_MAX);

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");

 var cttz_i8 = allocate([8,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,7,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,6,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,5,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0,4,0,1,0,2,0,1,0,3,0,1,0,2,0,1,0], "i8", ALLOC_DYNAMIC);


function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_dd(index,a1) {
  try {
    return Module["dynCall_dd"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  try {
    Module["dynCall_vii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_di(index,a1) {
  try {
    return Module["dynCall_di"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };
Module.asmLibraryArg = { "abort": abort, "assert": assert, "invoke_iiii": invoke_iiii, "invoke_dd": invoke_dd, "invoke_vii": invoke_vii, "invoke_di": invoke_di, "_fabs": _fabs, "_llvm_pow_f64": _llvm_pow_f64, "_send": _send, "_fread": _fread, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_fflush": _fflush, "_pwrite": _pwrite, "_strerror_r": _strerror_r, "__reallyNegative": __reallyNegative, "_open": _open, "_fabsf": _fabsf, "_sbrk": _sbrk, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fileno": _fileno, "_sysconf": _sysconf, "_close": _close, "__formatString": __formatString, "_pread": _pread, "_mkport": _mkport, "_fclose": _fclose, "_sqrtf": _sqrtf, "_write": _write, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___errno_location": ___errno_location, "_stat": _stat, "_recv": _recv, "_fgetc": _fgetc, "_printf": _printf, "__exit": __exit, "_read": _read, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_strerror": _strerror, "_fgets": _fgets, "_sqrt": _sqrt, "_fopen": _fopen, "_exit": _exit, "___setErrNo": ___setErrNo, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "_stderr": _stderr };
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
  'use asm';
  
  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);


  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var cttz_i8=env.cttz_i8|0;
  var _stderr=env._stderr|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntP = 0, tempBigIntS = 0, tempBigIntR = 0.0, tempBigIntI = 0, tempBigIntD = 0, tempValue = 0, tempDouble = 0.0;

  var tempRet0 = 0;
  var tempRet1 = 0;
  var tempRet2 = 0;
  var tempRet3 = 0;
  var tempRet4 = 0;
  var tempRet5 = 0;
  var tempRet6 = 0;
  var tempRet7 = 0;
  var tempRet8 = 0;
  var tempRet9 = 0;
  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_clz32=global.Math.clz32;
  var abort=env.abort;
  var assert=env.assert;
  var invoke_iiii=env.invoke_iiii;
  var invoke_dd=env.invoke_dd;
  var invoke_vii=env.invoke_vii;
  var invoke_di=env.invoke_di;
  var _fabs=env._fabs;
  var _llvm_pow_f64=env._llvm_pow_f64;
  var _send=env._send;
  var _fread=env._fread;
  var _emscripten_set_main_loop_timing=env._emscripten_set_main_loop_timing;
  var _fflush=env._fflush;
  var _pwrite=env._pwrite;
  var _strerror_r=env._strerror_r;
  var __reallyNegative=env.__reallyNegative;
  var _open=env._open;
  var _fabsf=env._fabsf;
  var _sbrk=env._sbrk;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _fileno=env._fileno;
  var _sysconf=env._sysconf;
  var _close=env._close;
  var __formatString=env.__formatString;
  var _pread=env._pread;
  var _mkport=env._mkport;
  var _fclose=env._fclose;
  var _sqrtf=env._sqrtf;
  var _write=env._write;
  var _emscripten_set_main_loop=env._emscripten_set_main_loop;
  var ___errno_location=env.___errno_location;
  var _stat=env._stat;
  var _recv=env._recv;
  var _fgetc=env._fgetc;
  var _printf=env._printf;
  var __exit=env.__exit;
  var _read=env._read;
  var _abort=env._abort;
  var _fwrite=env._fwrite;
  var _time=env._time;
  var _fprintf=env._fprintf;
  var _strerror=env._strerror;
  var _fgets=env._fgets;
  var _sqrt=env._sqrt;
  var _fopen=env._fopen;
  var _exit=env._exit;
  var ___setErrNo=env.___setErrNo;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}
function copyTempFloat(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
}
function copyTempDouble(ptr) {
  ptr = ptr|0;
  HEAP8[tempDoublePtr>>0] = HEAP8[ptr>>0];
  HEAP8[tempDoublePtr+1>>0] = HEAP8[ptr+1>>0];
  HEAP8[tempDoublePtr+2>>0] = HEAP8[ptr+2>>0];
  HEAP8[tempDoublePtr+3>>0] = HEAP8[ptr+3>>0];
  HEAP8[tempDoublePtr+4>>0] = HEAP8[ptr+4>>0];
  HEAP8[tempDoublePtr+5>>0] = HEAP8[ptr+5>>0];
  HEAP8[tempDoublePtr+6>>0] = HEAP8[ptr+6>>0];
  HEAP8[tempDoublePtr+7>>0] = HEAP8[ptr+7>>0];
}

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function _rt_error($error_text) {
 $error_text = $error_text|0;
 var $0 = 0, $1 = 0, $2 = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $vararg_buffer = sp; //@line 18 "c_src/util.c"
 $0 = HEAP32[_stderr>>2]|0; //@line 20 "c_src/util.c"
 (_fwrite((8|0),18,1,($0|0))|0); //@line 20 "c_src/util.c"
 $1 = HEAP32[_stderr>>2]|0; //@line 21 "c_src/util.c"
 HEAP32[$vararg_buffer>>2] = $error_text; //@line 21 "c_src/util.c"
 (_fprintf(($1|0),(32|0),($vararg_buffer|0))|0); //@line 21 "c_src/util.c"
 $2 = HEAP32[_stderr>>2]|0; //@line 22 "c_src/util.c"
 (_fwrite((40|0),28,1,($2|0))|0); //@line 22 "c_src/util.c"
 _exit(1); //@line 23 "c_src/util.c"
 // unreachable; //@line 23 "c_src/util.c"
}
function _vector($n) {
 $n = $n|0;
 var $0 = 0, $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $n << 2; //@line 29 "c_src/util.c"
 $1 = (_malloc($0)|0); //@line 29 "c_src/util.c"
 $2 = ($1|0)==(0|0); //@line 30 "c_src/util.c"
 if ($2) {
  _rt_error(72); //@line 31 "c_src/util.c"
  // unreachable;
 } else {
  return ($1|0); //@line 33 "c_src/util.c"
 }
 return (0)|0;
}
function _brent($ax,$bx,$cx,$f,$tol,$xmin) {
 $ax = +$ax;
 $bx = +$bx;
 $cx = +$cx;
 $f = $f|0;
 $tol = +$tol;
 $xmin = $xmin|0;
 var $$a$0 = 0.0, $$fv$0 = 0.0, $$v$0 = 0.0, $0 = 0, $1 = 0.0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0, $22 = 0, $23 = 0.0;
 var $24 = 0.0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0.0, $40 = 0.0, $41 = 0.0;
 var $42 = 0, $43 = 0.0, $44 = 0.0, $45 = 0, $46 = 0.0, $47 = 0.0, $48 = 0, $49 = 0, $5 = 0.0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0, $58 = 0.0, $59 = 0, $6 = 0.0;
 var $60 = 0.0, $61 = 0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0, $66 = 0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0.0, $70 = 0.0, $71 = 0, $72 = 0.0, $73 = 0.0, $74 = 0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0;
 var $79 = 0.0, $8 = 0.0, $80 = 0.0, $81 = 0.0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0.0, $90 = 0, $91 = 0, $a$0$x$0 = 0.0, $a$023 = 0.0, $a$3 = 0.0, $b$0$ = 0.0, $b$0$a$0 = 0.0;
 var $b$0$a$010 = 0.0, $b$022 = 0.0, $b$3 = 0.0, $d$018 = 0.0, $d$1 = 0.0, $e$028 = 0.0, $e$1 = 0.0, $fabsf = 0.0, $fabsf1 = 0.0, $fabsf2 = 0.0, $fabsf3 = 0.0, $fabsf4 = 0.0, $fabsf5 = 0.0, $fabsf6 = 0.0, $fabsf7 = 0.0, $fv$019 = 0.0, $fv$1 = 0.0, $fw$020 = 0.0, $fw$1 = 0.0, $fx$021 = 0.0;
 var $fx$021$lcssa = 0.0, $fx$1 = 0.0, $iter$024 = 0, $or$cond = 0, $or$cond11 = 0, $or$cond12 = 0, $or$cond13 = 0, $p$0 = 0.0, $v$025 = 0.0, $v$1 = 0.0, $w$026 = 0.0, $w$1 = 0.0, $x$0$b$0 = 0.0, $x$027 = 0.0, $x$027$lcssa = 0.0, $x$1 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $ax < $cx; //@line 27 "c_src/brent.c"
 $1 = $0 ? $ax : $cx; //@line 27 "c_src/brent.c"
 $2 = $ax > $cx; //@line 28 "c_src/brent.c"
 $3 = $2 ? $ax : $cx; //@line 28 "c_src/brent.c"
 $4 = (+FUNCTION_TABLE_dd[$f & 1]($bx)); //@line 30 "c_src/brent.c"
 $5 = $tol; //@line 33 "c_src/brent.c"
 $a$023 = $1;$b$022 = $3;$d$018 = 0.0;$e$028 = 0.0;$fv$019 = $4;$fw$020 = $4;$fx$021 = $4;$iter$024 = 1;$v$025 = $bx;$w$026 = $bx;$x$027 = $bx;
 while(1) {
  $6 = $b$022 + $a$023; //@line 32 "c_src/brent.c"
  $7 = $6 * 0.5; //@line 32 "c_src/brent.c"
  $8 = $x$027; //@line 33 "c_src/brent.c"
  $fabsf = (+Math_abs((+$x$027))); //@line 33 "c_src/brent.c"
  $9 = $fabsf; //@line 33 "c_src/brent.c"
  $10 = $5 * $9; //@line 33 "c_src/brent.c"
  $11 = $10 + 1.0E-10; //@line 33 "c_src/brent.c"
  $12 = $11; //@line 33 "c_src/brent.c"
  $13 = $12 * 2.0; //@line 33 "c_src/brent.c"
  $14 = $x$027 - $7; //@line 34 "c_src/brent.c"
  $fabsf1 = (+Math_abs((+$14))); //@line 34 "c_src/brent.c"
  $15 = $fabsf1; //@line 34 "c_src/brent.c"
  $16 = $13; //@line 34 "c_src/brent.c"
  $17 = $b$022 - $a$023; //@line 34 "c_src/brent.c"
  $18 = $17; //@line 34 "c_src/brent.c"
  $19 = $18 * 0.5; //@line 34 "c_src/brent.c"
  $20 = $16 - $19; //@line 34 "c_src/brent.c"
  $21 = !($15 <= $20); //@line 34 "c_src/brent.c"
  if (!($21)) {
   $fx$021$lcssa = $fx$021;$x$027$lcssa = $x$027;
   label = 20;
   break;
  }
  $fabsf2 = (+Math_abs((+$e$028))); //@line 38 "c_src/brent.c"
  $22 = $fabsf2 > $12; //@line 38 "c_src/brent.c"
  do {
   if ($22) {
    $23 = $e$028; //@line 38 "c_src/brent.c"
    $24 = $x$027 - $w$026; //@line 39 "c_src/brent.c"
    $25 = $fx$021 - $fv$019; //@line 39 "c_src/brent.c"
    $26 = $25 * $24; //@line 39 "c_src/brent.c"
    $27 = $x$027 - $v$025; //@line 40 "c_src/brent.c"
    $28 = $fx$021 - $fw$020; //@line 40 "c_src/brent.c"
    $29 = $28 * $27; //@line 40 "c_src/brent.c"
    $30 = $27 * $29; //@line 41 "c_src/brent.c"
    $31 = $24 * $26; //@line 41 "c_src/brent.c"
    $32 = $30 - $31; //@line 41 "c_src/brent.c"
    $33 = $29 - $26; //@line 42 "c_src/brent.c"
    $34 = $33 * 2.0; //@line 42 "c_src/brent.c"
    $35 = $34 > 0.0; //@line 43 "c_src/brent.c"
    $36 = -$32; //@line 43 "c_src/brent.c"
    $p$0 = $35 ? $36 : $32; //@line 43 "c_src/brent.c"
    $fabsf5 = (+Math_abs((+$34))); //@line 44 "c_src/brent.c"
    $fabsf6 = (+Math_abs((+$p$0))); //@line 47 "c_src/brent.c"
    $37 = $fabsf6; //@line 47 "c_src/brent.c"
    $38 = $fabsf5; //@line 47 "c_src/brent.c"
    $39 = $38 * 0.5; //@line 47 "c_src/brent.c"
    $40 = $23 * $39; //@line 47 "c_src/brent.c"
    $41 = (+Math_abs((+$40))); //@line 47 "c_src/brent.c"
    $42 = !($37 >= $41); //@line 47 "c_src/brent.c"
    if ($42) {
     $43 = $a$023 - $x$027; //@line 47 "c_src/brent.c"
     $44 = $43 * $fabsf5; //@line 47 "c_src/brent.c"
     $45 = !($p$0 <= $44); //@line 47 "c_src/brent.c"
     if ($45) {
      $46 = $b$022 - $x$027; //@line 47 "c_src/brent.c"
      $47 = $46 * $fabsf5; //@line 47 "c_src/brent.c"
      $48 = !($p$0 >= $47); //@line 47 "c_src/brent.c"
      if ($48) {
       $54 = $p$0 / $fabsf5; //@line 50 "c_src/brent.c"
       $55 = $x$027 + $54; //@line 51 "c_src/brent.c"
       $56 = $55 - $a$023; //@line 52 "c_src/brent.c"
       $57 = $56 < $13; //@line 52 "c_src/brent.c"
       $58 = $b$022 - $55;
       $59 = $58 < $13; //@line 52 "c_src/brent.c"
       $or$cond = $57 | $59; //@line 52 "c_src/brent.c"
       if (!($or$cond)) {
        $d$1 = $54;$e$1 = $d$018;
        break;
       }
       $60 = $7 - $x$027; //@line 53 "c_src/brent.c"
       $61 = $60 > 0.0; //@line 53 "c_src/brent.c"
       $fabsf7 = (+Math_abs((+$12))); //@line 53 "c_src/brent.c"
       $62 = $fabsf7; //@line 53 "c_src/brent.c"
       $63 = -$62; //@line 53 "c_src/brent.c"
       $64 = $61 ? $62 : $63; //@line 53 "c_src/brent.c"
       $65 = $64; //@line 53 "c_src/brent.c"
       $d$1 = $65;$e$1 = $d$018;
       break;
      }
     }
    }
    $49 = !($x$027 >= $7); //@line 48 "c_src/brent.c"
    $b$0$a$0 = $49 ? $b$022 : $a$023; //@line 48 "c_src/brent.c"
    $50 = $b$0$a$0 - $x$027; //@line 48 "c_src/brent.c"
    $51 = $50; //@line 48 "c_src/brent.c"
    $52 = $51 * 0.38196600000000003; //@line 48 "c_src/brent.c"
    $53 = $52; //@line 48 "c_src/brent.c"
    $d$1 = $53;$e$1 = $50;
   } else {
    $66 = !($x$027 >= $7); //@line 56 "c_src/brent.c"
    $b$0$a$010 = $66 ? $b$022 : $a$023; //@line 56 "c_src/brent.c"
    $67 = $b$0$a$010 - $x$027; //@line 56 "c_src/brent.c"
    $68 = $67; //@line 56 "c_src/brent.c"
    $69 = $68 * 0.38196600000000003; //@line 56 "c_src/brent.c"
    $70 = $69; //@line 56 "c_src/brent.c"
    $d$1 = $70;$e$1 = $67;
   }
  } while(0);
  $fabsf3 = (+Math_abs((+$d$1))); //@line 58 "c_src/brent.c"
  $71 = !($fabsf3 >= $12); //@line 58 "c_src/brent.c"
  if ($71) {
   $74 = $d$1 > 0.0; //@line 58 "c_src/brent.c"
   $fabsf4 = (+Math_abs((+$12))); //@line 58 "c_src/brent.c"
   $75 = $fabsf4; //@line 58 "c_src/brent.c"
   $76 = -$75; //@line 58 "c_src/brent.c"
   $77 = $74 ? $75 : $76; //@line 58 "c_src/brent.c"
   $78 = $8 + $77; //@line 58 "c_src/brent.c"
   $80 = $78;
  } else {
   $72 = $x$027 + $d$1; //@line 58 "c_src/brent.c"
   $73 = $72; //@line 58 "c_src/brent.c"
   $80 = $73;
  }
  $79 = $80; //@line 58 "c_src/brent.c"
  $81 = (+FUNCTION_TABLE_dd[$f & 1]($79)); //@line 59 "c_src/brent.c"
  $82 = !($81 <= $fx$021); //@line 60 "c_src/brent.c"
  if ($82) {
   $84 = $79 < $x$027; //@line 65 "c_src/brent.c"
   $b$0$ = $84 ? $b$022 : $79; //@line 65 "c_src/brent.c"
   $$a$0 = $84 ? $79 : $a$023; //@line 65 "c_src/brent.c"
   $85 = $81 <= $fw$020; //@line 66 "c_src/brent.c"
   $86 = $w$026 == $x$027; //@line 66 "c_src/brent.c"
   $or$cond11 = $86 | $85; //@line 66 "c_src/brent.c"
   if ($or$cond11) {
    $a$3 = $$a$0;$b$3 = $b$0$;$fv$1 = $fw$020;$fw$1 = $81;$fx$1 = $fx$021;$v$1 = $w$026;$w$1 = $79;$x$1 = $x$027;
   } else {
    $87 = $81 <= $fv$019; //@line 71 "c_src/brent.c"
    $88 = $v$025 == $x$027; //@line 71 "c_src/brent.c"
    $or$cond12 = $88 | $87; //@line 71 "c_src/brent.c"
    $89 = $v$025 == $w$026; //@line 71 "c_src/brent.c"
    $or$cond13 = $89 | $or$cond12; //@line 71 "c_src/brent.c"
    $$fv$0 = $or$cond13 ? $81 : $fv$019; //@line 71 "c_src/brent.c"
    $$v$0 = $or$cond13 ? $79 : $v$025; //@line 71 "c_src/brent.c"
    $a$3 = $$a$0;$b$3 = $b$0$;$fv$1 = $$fv$0;$fw$1 = $fw$020;$fx$1 = $fx$021;$v$1 = $$v$0;$w$1 = $w$026;$x$1 = $x$027;
   }
  } else {
   $83 = !($79 >= $x$027); //@line 61 "c_src/brent.c"
   $x$0$b$0 = $83 ? $x$027 : $b$022;
   $a$0$x$0 = $83 ? $a$023 : $x$027;
   $a$3 = $a$0$x$0;$b$3 = $x$0$b$0;$fv$1 = $fw$020;$fw$1 = $fx$021;$fx$1 = $81;$v$1 = $w$026;$w$1 = $x$027;$x$1 = $79;
  }
  $90 = (($iter$024) + 1)|0; //@line 31 "c_src/brent.c"
  $91 = ($90|0)<(101); //@line 31 "c_src/brent.c"
  if ($91) {
   $a$023 = $a$3;$b$022 = $b$3;$d$018 = $d$1;$e$028 = $e$1;$fv$019 = $fv$1;$fw$020 = $fw$1;$fx$021 = $fx$1;$iter$024 = $90;$v$025 = $v$1;$w$026 = $w$1;$x$027 = $x$1;
  } else {
   label = 19;
   break;
  }
 }
 if ((label|0) == 19) {
  _rt_error(104); //@line 77 "c_src/brent.c"
  // unreachable;
 }
 else if ((label|0) == 20) {
  HEAPF32[$xmin>>2] = $x$027$lcssa; //@line 35 "c_src/brent.c"
  return (+$fx$021$lcssa); //@line 80 "c_src/brent.c"
 }
 return +(0.0);
}
function _mnbrak($ax,$bx,$cx,$fa,$fb,$fc,$func) {
 $ax = $ax|0;
 $bx = $bx|0;
 $cx = $cx|0;
 $fa = $fa|0;
 $fb = $fb|0;
 $fc = $fc|0;
 $func = $func|0;
 var $$lcssa = 0.0, $$lcssa21 = 0.0, $$lcssa23 = 0.0, $$lcssa24 = 0.0, $0 = 0.0, $1 = 0.0, $10 = 0, $100 = 0.0, $101 = 0.0, $102 = 0.0, $103 = 0.0, $104 = 0.0, $105 = 0.0, $106 = 0.0, $107 = 0.0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0.0, $113 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0, $24 = 0.0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0.0;
 var $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0.0, $40 = 0.0, $41 = 0, $42 = 0.0, $43 = 0, $44 = 0.0, $45 = 0.0, $46 = 0.0;
 var $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0.0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0.0, $60 = 0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0;
 var $65 = 0, $66 = 0, $67 = 0.0, $68 = 0, $69 = 0.0, $7 = 0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0, $80 = 0.0, $81 = 0.0, $82 = 0;
 var $83 = 0.0, $84 = 0.0, $85 = 0.0, $86 = 0, $87 = 0, $88 = 0.0, $89 = 0.0, $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0, $95 = 0.0, $96 = 0.0, $97 = 0.0, $98 = 0.0, $99 = 0, $fabsf = 0.0, $fu$0 = 0.0;
 var $storemerge4 = 0.0, $u$0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = +HEAPF32[$ax>>2]; //@line 15 "c_src/mnbrak.c"
 $1 = $0; //@line 15 "c_src/mnbrak.c"
 $2 = (+FUNCTION_TABLE_dd[$func & 1]($1)); //@line 15 "c_src/mnbrak.c"
 HEAPF32[$fa>>2] = $2; //@line 15 "c_src/mnbrak.c"
 $3 = +HEAPF32[$bx>>2]; //@line 16 "c_src/mnbrak.c"
 $4 = $3; //@line 16 "c_src/mnbrak.c"
 $5 = (+FUNCTION_TABLE_dd[$func & 1]($4)); //@line 16 "c_src/mnbrak.c"
 HEAPF32[$fb>>2] = $5; //@line 16 "c_src/mnbrak.c"
 $6 = +HEAPF32[$fa>>2]; //@line 17 "c_src/mnbrak.c"
 $7 = $5 > $6; //@line 17 "c_src/mnbrak.c"
 if ($7) {
  $8 = HEAP32[$ax>>2]|0; //@line 18 "c_src/mnbrak.c"
  $9 = HEAP32[$bx>>2]|0; //@line 18 "c_src/mnbrak.c"
  HEAP32[$ax>>2] = $9; //@line 18 "c_src/mnbrak.c"
  HEAP32[$bx>>2] = $8; //@line 18 "c_src/mnbrak.c"
  $10 = HEAP32[$fb>>2]|0; //@line 19 "c_src/mnbrak.c"
  $11 = HEAP32[$fa>>2]|0; //@line 19 "c_src/mnbrak.c"
  HEAP32[$fb>>2] = $11; //@line 19 "c_src/mnbrak.c"
  HEAP32[$fa>>2] = $10; //@line 19 "c_src/mnbrak.c"
 }
 $12 = +HEAPF32[$bx>>2]; //@line 21 "c_src/mnbrak.c"
 $13 = $12; //@line 21 "c_src/mnbrak.c"
 $14 = +HEAPF32[$ax>>2]; //@line 21 "c_src/mnbrak.c"
 $15 = $12 - $14; //@line 21 "c_src/mnbrak.c"
 $16 = $15; //@line 21 "c_src/mnbrak.c"
 $17 = $16 * 1.618034; //@line 21 "c_src/mnbrak.c"
 $18 = $13 + $17; //@line 21 "c_src/mnbrak.c"
 $19 = $18; //@line 21 "c_src/mnbrak.c"
 HEAPF32[$cx>>2] = $19; //@line 21 "c_src/mnbrak.c"
 $20 = $19; //@line 22 "c_src/mnbrak.c"
 $21 = (+FUNCTION_TABLE_dd[$func & 1]($20)); //@line 22 "c_src/mnbrak.c"
 HEAPF32[$fc>>2] = $21; //@line 57 "c_src/mnbrak.c"
 $22 = +HEAPF32[$fb>>2]; //@line 23 "c_src/mnbrak.c"
 $23 = $22 > $21; //@line 23 "c_src/mnbrak.c"
 if (!($23)) {
  return; //@line 59 "c_src/mnbrak.c"
 }
 $28 = $22;$storemerge4 = $21;
 L7: while(1) {
  $24 = +HEAPF32[$bx>>2]; //@line 24 "c_src/mnbrak.c"
  $25 = +HEAPF32[$ax>>2]; //@line 24 "c_src/mnbrak.c"
  $26 = $24 - $25; //@line 24 "c_src/mnbrak.c"
  $27 = $28 - $storemerge4; //@line 24 "c_src/mnbrak.c"
  $29 = $27 * $26; //@line 24 "c_src/mnbrak.c"
  $30 = +HEAPF32[$cx>>2]; //@line 25 "c_src/mnbrak.c"
  $31 = $24 - $30; //@line 25 "c_src/mnbrak.c"
  $32 = +HEAPF32[$fa>>2]; //@line 25 "c_src/mnbrak.c"
  $33 = $28 - $32; //@line 25 "c_src/mnbrak.c"
  $34 = $31 * $33; //@line 25 "c_src/mnbrak.c"
  $35 = $24; //@line 26 "c_src/mnbrak.c"
  $36 = $31 * $34; //@line 26 "c_src/mnbrak.c"
  $37 = $26 * $29; //@line 26 "c_src/mnbrak.c"
  $38 = $36 - $37; //@line 26 "c_src/mnbrak.c"
  $39 = $38; //@line 26 "c_src/mnbrak.c"
  $40 = $34 - $29; //@line 26 "c_src/mnbrak.c"
  $41 = $40 > 0.0; //@line 26 "c_src/mnbrak.c"
  $fabsf = (+Math_abs((+$40))); //@line 26 "c_src/mnbrak.c"
  $42 = $fabsf; //@line 26 "c_src/mnbrak.c"
  $43 = $42 > 9.9999999999999995E-21; //@line 26 "c_src/mnbrak.c"
  $44 = $43 ? $42 : 9.9999999999999995E-21; //@line 26 "c_src/mnbrak.c"
  $45 = (+Math_abs((+$44))); //@line 26 "c_src/mnbrak.c"
  $46 = -$45; //@line 26 "c_src/mnbrak.c"
  $47 = $41 ? $45 : $46; //@line 26 "c_src/mnbrak.c"
  $48 = $47 * 2.0; //@line 26 "c_src/mnbrak.c"
  $49 = $39 / $48; //@line 26 "c_src/mnbrak.c"
  $50 = $35 - $49; //@line 26 "c_src/mnbrak.c"
  $51 = $50; //@line 26 "c_src/mnbrak.c"
  $52 = $30 - $24; //@line 27 "c_src/mnbrak.c"
  $53 = $52; //@line 27 "c_src/mnbrak.c"
  $54 = $53 * 100.0; //@line 27 "c_src/mnbrak.c"
  $55 = $35 + $54; //@line 27 "c_src/mnbrak.c"
  $56 = $55; //@line 27 "c_src/mnbrak.c"
  $57 = $24 - $51; //@line 28 "c_src/mnbrak.c"
  $58 = $51 - $30; //@line 28 "c_src/mnbrak.c"
  $59 = $57 * $58; //@line 28 "c_src/mnbrak.c"
  $60 = $59 > 0.0; //@line 28 "c_src/mnbrak.c"
  do {
   if ($60) {
    $61 = $51; //@line 29 "c_src/mnbrak.c"
    $62 = (+FUNCTION_TABLE_dd[$func & 1]($61)); //@line 29 "c_src/mnbrak.c"
    $63 = +HEAPF32[$fc>>2]; //@line 30 "c_src/mnbrak.c"
    $64 = $62 < $63; //@line 30 "c_src/mnbrak.c"
    if ($64) {
     $$lcssa = $51;$$lcssa23 = $62;
     label = 7;
     break L7;
    }
    $67 = +HEAPF32[$fb>>2]; //@line 36 "c_src/mnbrak.c"
    $68 = $62 > $67; //@line 36 "c_src/mnbrak.c"
    if ($68) {
     $$lcssa21 = $51;$$lcssa24 = $62;
     label = 9;
     break L7;
    }
    $69 = +HEAPF32[$cx>>2]; //@line 41 "c_src/mnbrak.c"
    $70 = $69; //@line 41 "c_src/mnbrak.c"
    $71 = +HEAPF32[$bx>>2]; //@line 41 "c_src/mnbrak.c"
    $72 = $69 - $71; //@line 41 "c_src/mnbrak.c"
    $73 = $72; //@line 41 "c_src/mnbrak.c"
    $74 = $73 * 1.618034; //@line 41 "c_src/mnbrak.c"
    $75 = $70 + $74; //@line 41 "c_src/mnbrak.c"
    $76 = $75; //@line 41 "c_src/mnbrak.c"
    $77 = $76; //@line 42 "c_src/mnbrak.c"
    $78 = (+FUNCTION_TABLE_dd[$func & 1]($77)); //@line 42 "c_src/mnbrak.c"
    $fu$0 = $78;$u$0 = $76;
   } else {
    $79 = $30 - $51; //@line 43 "c_src/mnbrak.c"
    $80 = $51 - $56; //@line 43 "c_src/mnbrak.c"
    $81 = $79 * $80; //@line 43 "c_src/mnbrak.c"
    $82 = $81 > 0.0; //@line 43 "c_src/mnbrak.c"
    if ($82) {
     $83 = $51; //@line 44 "c_src/mnbrak.c"
     $84 = (+FUNCTION_TABLE_dd[$func & 1]($83)); //@line 44 "c_src/mnbrak.c"
     $85 = +HEAPF32[$fc>>2]; //@line 45 "c_src/mnbrak.c"
     $86 = $84 < $85; //@line 45 "c_src/mnbrak.c"
     if (!($86)) {
      $fu$0 = $84;$u$0 = $51;
      break;
     }
     $87 = HEAP32[$cx>>2]|0; //@line 46 "c_src/mnbrak.c"
     HEAP32[$bx>>2] = $87; //@line 46 "c_src/mnbrak.c"
     HEAPF32[$cx>>2] = $51; //@line 46 "c_src/mnbrak.c"
     $88 = +HEAPF32[$bx>>2]; //@line 46 "c_src/mnbrak.c"
     $89 = $51 - $88; //@line 46 "c_src/mnbrak.c"
     $90 = $89; //@line 46 "c_src/mnbrak.c"
     $91 = $90 * 1.618034; //@line 46 "c_src/mnbrak.c"
     $92 = $83 + $91; //@line 46 "c_src/mnbrak.c"
     $93 = $92; //@line 46 "c_src/mnbrak.c"
     $94 = HEAP32[$fc>>2]|0; //@line 47 "c_src/mnbrak.c"
     HEAP32[$fb>>2] = $94; //@line 47 "c_src/mnbrak.c"
     HEAPF32[$fc>>2] = $84; //@line 47 "c_src/mnbrak.c"
     $95 = $93; //@line 47 "c_src/mnbrak.c"
     $96 = (+FUNCTION_TABLE_dd[$func & 1]($95)); //@line 47 "c_src/mnbrak.c"
     $fu$0 = $96;$u$0 = $93;
     break;
    }
    $97 = $56 - $30; //@line 49 "c_src/mnbrak.c"
    $98 = $97 * $80; //@line 49 "c_src/mnbrak.c"
    $99 = !($98 >= 0.0); //@line 49 "c_src/mnbrak.c"
    if ($99) {
     $102 = $30; //@line 53 "c_src/mnbrak.c"
     $103 = $53 * 1.618034; //@line 53 "c_src/mnbrak.c"
     $104 = $102 + $103; //@line 53 "c_src/mnbrak.c"
     $105 = $104; //@line 53 "c_src/mnbrak.c"
     $106 = $105; //@line 54 "c_src/mnbrak.c"
     $107 = (+FUNCTION_TABLE_dd[$func & 1]($106)); //@line 54 "c_src/mnbrak.c"
     $fu$0 = $107;$u$0 = $105;
     break;
    } else {
     $100 = $56; //@line 51 "c_src/mnbrak.c"
     $101 = (+FUNCTION_TABLE_dd[$func & 1]($100)); //@line 51 "c_src/mnbrak.c"
     $fu$0 = $101;$u$0 = $56;
     break;
    }
   }
  } while(0);
  $108 = HEAP32[$bx>>2]|0; //@line 56 "c_src/mnbrak.c"
  HEAP32[$ax>>2] = $108; //@line 56 "c_src/mnbrak.c"
  $109 = HEAP32[$cx>>2]|0; //@line 56 "c_src/mnbrak.c"
  HEAP32[$bx>>2] = $109; //@line 56 "c_src/mnbrak.c"
  HEAPF32[$cx>>2] = $u$0; //@line 56 "c_src/mnbrak.c"
  $110 = HEAP32[$fb>>2]|0; //@line 57 "c_src/mnbrak.c"
  HEAP32[$fa>>2] = $110; //@line 57 "c_src/mnbrak.c"
  $111 = HEAP32[$fc>>2]|0; //@line 57 "c_src/mnbrak.c"
  HEAP32[$fb>>2] = $111; //@line 57 "c_src/mnbrak.c"
  HEAPF32[$fc>>2] = $fu$0; //@line 57 "c_src/mnbrak.c"
  $112 = +HEAPF32[$fb>>2]; //@line 23 "c_src/mnbrak.c"
  $113 = $112 > $fu$0; //@line 23 "c_src/mnbrak.c"
  if ($113) {
   $28 = $112;$storemerge4 = $fu$0;
  } else {
   label = 18;
   break;
  }
 }
 if ((label|0) == 7) {
  $65 = HEAP32[$bx>>2]|0; //@line 31 "c_src/mnbrak.c"
  HEAP32[$ax>>2] = $65; //@line 31 "c_src/mnbrak.c"
  HEAPF32[$bx>>2] = $$lcssa; //@line 32 "c_src/mnbrak.c"
  $66 = HEAP32[$fb>>2]|0; //@line 33 "c_src/mnbrak.c"
  HEAP32[$fa>>2] = $66; //@line 33 "c_src/mnbrak.c"
  HEAPF32[$fb>>2] = $$lcssa23; //@line 34 "c_src/mnbrak.c"
  return; //@line 59 "c_src/mnbrak.c"
 }
 else if ((label|0) == 9) {
  HEAPF32[$cx>>2] = $$lcssa21; //@line 37 "c_src/mnbrak.c"
  HEAPF32[$fc>>2] = $$lcssa24; //@line 38 "c_src/mnbrak.c"
  return; //@line 59 "c_src/mnbrak.c"
 }
 else if ((label|0) == 18) {
  return; //@line 59 "c_src/mnbrak.c"
 }
}
function _linmin($p,$xi,$n,$fret,$func) {
 $p = $p|0;
 $xi = $xi|0;
 $n = $n|0;
 $fret = $fret|0;
 $func = $func|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0, $17 = 0.0, $18 = 0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0, $22 = 0.0, $23 = 0.0, $24 = 0, $25 = 0, $26 = 0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ax = 0, $bx = 0, $exitcond = 0, $exitcond6 = 0, $fa = 0, $fb = 0, $fx = 0, $i$02 = 0, $i$11 = 0, $xmin = 0, $xx = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0;
 $xx = sp + 24|0;
 $xmin = sp + 20|0;
 $fx = sp + 16|0;
 $fb = sp + 12|0;
 $fa = sp + 8|0;
 $bx = sp + 4|0;
 $ax = sp;
 HEAP32[136>>2] = $n; //@line 37 "c_src/linmin.c"
 $0 = (_vector($n)|0); //@line 38 "c_src/linmin.c"
 HEAP32[144>>2] = $0; //@line 38 "c_src/linmin.c"
 $1 = (_vector($n)|0); //@line 39 "c_src/linmin.c"
 HEAP32[152>>2] = $1; //@line 39 "c_src/linmin.c"
 HEAP32[160>>2] = $func; //@line 40 "c_src/linmin.c"
 $2 = ($n|0)>(0); //@line 41 "c_src/linmin.c"
 if ($2) {
  $3 = HEAP32[144>>2]|0; //@line 42 "c_src/linmin.c"
  $4 = HEAP32[152>>2]|0; //@line 43 "c_src/linmin.c"
  $i$02 = 0;
  while(1) {
   $5 = (($p) + ($i$02<<2)|0); //@line 42 "c_src/linmin.c"
   $6 = HEAP32[$5>>2]|0; //@line 42 "c_src/linmin.c"
   $7 = (($3) + ($i$02<<2)|0); //@line 42 "c_src/linmin.c"
   HEAP32[$7>>2] = $6; //@line 42 "c_src/linmin.c"
   $8 = (($xi) + ($i$02<<2)|0); //@line 43 "c_src/linmin.c"
   $9 = HEAP32[$8>>2]|0; //@line 43 "c_src/linmin.c"
   $10 = (($4) + ($i$02<<2)|0); //@line 43 "c_src/linmin.c"
   HEAP32[$10>>2] = $9; //@line 43 "c_src/linmin.c"
   $11 = (($i$02) + 1)|0; //@line 41 "c_src/linmin.c"
   $exitcond6 = ($11|0)==($n|0); //@line 41 "c_src/linmin.c"
   if ($exitcond6) {
    break;
   } else {
    $i$02 = $11;
   }
  }
 }
 HEAPF32[$ax>>2] = 0.0; //@line 45 "c_src/linmin.c"
 HEAPF32[$xx>>2] = 1.0; //@line 46 "c_src/linmin.c"
 _mnbrak($ax,$xx,$bx,$fa,$fx,$fb,1); //@line 47 "c_src/linmin.c"
 $12 = +HEAPF32[$ax>>2]; //@line 48 "c_src/linmin.c"
 $13 = +HEAPF32[$xx>>2]; //@line 48 "c_src/linmin.c"
 $14 = +HEAPF32[$bx>>2]; //@line 48 "c_src/linmin.c"
 $15 = (+_brent($12,$13,$14,1,1.9999999494757503E-4,$xmin)); //@line 48 "c_src/linmin.c"
 HEAPF32[$fret>>2] = $15; //@line 48 "c_src/linmin.c"
 $16 = ($n|0)>(0); //@line 49 "c_src/linmin.c"
 if (!($16)) {
  $25 = HEAP32[152>>2]|0; //@line 53 "c_src/linmin.c"
  _free($25); //@line 53 "c_src/linmin.c"
  $26 = HEAP32[144>>2]|0; //@line 54 "c_src/linmin.c"
  _free($26); //@line 54 "c_src/linmin.c"
  STACKTOP = sp;return; //@line 55 "c_src/linmin.c"
 }
 $17 = +HEAPF32[$xmin>>2]; //@line 50 "c_src/linmin.c"
 $i$11 = 0;
 while(1) {
  $18 = (($xi) + ($i$11<<2)|0); //@line 50 "c_src/linmin.c"
  $19 = +HEAPF32[$18>>2]; //@line 50 "c_src/linmin.c"
  $20 = $17 * $19; //@line 50 "c_src/linmin.c"
  HEAPF32[$18>>2] = $20; //@line 50 "c_src/linmin.c"
  $21 = (($p) + ($i$11<<2)|0); //@line 51 "c_src/linmin.c"
  $22 = +HEAPF32[$21>>2]; //@line 51 "c_src/linmin.c"
  $23 = $22 + $20; //@line 51 "c_src/linmin.c"
  HEAPF32[$21>>2] = $23; //@line 51 "c_src/linmin.c"
  $24 = (($i$11) + 1)|0; //@line 49 "c_src/linmin.c"
  $exitcond = ($24|0)==($n|0); //@line 49 "c_src/linmin.c"
  if ($exitcond) {
   break;
  } else {
   $i$11 = $24;
  }
 }
 $25 = HEAP32[152>>2]|0; //@line 53 "c_src/linmin.c"
 _free($25); //@line 53 "c_src/linmin.c"
 $26 = HEAP32[144>>2]|0; //@line 54 "c_src/linmin.c"
 _free($26); //@line 54 "c_src/linmin.c"
 STACKTOP = sp;return; //@line 55 "c_src/linmin.c"
}
function _f1dim($x) {
 $x = +$x;
 var $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0, $i$01 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[136>>2]|0; //@line 62 "c_src/linmin.c"
 $1 = (_vector($0)|0); //@line 62 "c_src/linmin.c"
 $2 = HEAP32[136>>2]|0; //@line 63 "c_src/linmin.c"
 $3 = ($2|0)>(0); //@line 63 "c_src/linmin.c"
 if (!($3)) {
  $16 = HEAP32[160>>2]|0; //@line 66 "c_src/linmin.c"
  $17 = (+FUNCTION_TABLE_di[$16 & 1]($1)); //@line 66 "c_src/linmin.c"
  _free($1); //@line 67 "c_src/linmin.c"
  return (+$17); //@line 68 "c_src/linmin.c"
 }
 $4 = HEAP32[144>>2]|0; //@line 64 "c_src/linmin.c"
 $5 = HEAP32[152>>2]|0; //@line 64 "c_src/linmin.c"
 $6 = HEAP32[136>>2]|0; //@line 63 "c_src/linmin.c"
 $i$01 = 0;
 while(1) {
  $7 = (($4) + ($i$01<<2)|0); //@line 64 "c_src/linmin.c"
  $8 = +HEAPF32[$7>>2]; //@line 64 "c_src/linmin.c"
  $9 = (($5) + ($i$01<<2)|0); //@line 64 "c_src/linmin.c"
  $10 = +HEAPF32[$9>>2]; //@line 64 "c_src/linmin.c"
  $11 = $10 * $x; //@line 64 "c_src/linmin.c"
  $12 = $8 + $11; //@line 64 "c_src/linmin.c"
  $13 = (($1) + ($i$01<<2)|0); //@line 64 "c_src/linmin.c"
  HEAPF32[$13>>2] = $12; //@line 64 "c_src/linmin.c"
  $14 = (($i$01) + 1)|0; //@line 63 "c_src/linmin.c"
  $15 = ($14|0)<($6|0); //@line 63 "c_src/linmin.c"
  if ($15) {
   $i$01 = $14;
  } else {
   break;
  }
 }
 $16 = HEAP32[160>>2]|0; //@line 66 "c_src/linmin.c"
 $17 = (+FUNCTION_TABLE_di[$16 & 1]($1)); //@line 66 "c_src/linmin.c"
 _free($1); //@line 67 "c_src/linmin.c"
 return (+$17); //@line 68 "c_src/linmin.c"
}
function _frprmn($p,$n,$ftol,$iter,$fret,$func,$dfunc) {
 $p = $p|0;
 $n = $n|0;
 $ftol = +$ftol;
 $iter = $iter|0;
 $fret = $fret|0;
 $func = $func|0;
 $dfunc = $dfunc|0;
 var $0 = 0, $1 = 0, $10 = 0.0, $11 = 0, $12 = 0, $13 = 0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0, $24 = 0.0, $25 = 0, $26 = 0.0;
 var $27 = 0.0, $28 = 0.0, $29 = 0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0, $35 = 0.0, $36 = 0, $37 = 0.0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0;
 var $45 = 0.0, $46 = 0, $47 = 0, $48 = 0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0, $dgg$0$lcssa = 0.0, $dgg$04 = 0.0, $exitcond = 0, $exitcond18 = 0, $exitcond19 = 0, $fabsf = 0.0, $fabsf1 = 0.0, $fabsf2 = 0.0, $fabsf3 = 0.0, $fp$012 = 0.0, $gg$0$lcssa = 0.0;
 var $gg$05 = 0.0, $its$013 = 0, $j$014 = 0, $j$16 = 0, $j$28 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_vector($n)|0); //@line 38 "c_src/frprmn.c"
 $1 = (_vector($n)|0); //@line 39 "c_src/frprmn.c"
 $2 = (_vector($n)|0); //@line 40 "c_src/frprmn.c"
 $3 = (+FUNCTION_TABLE_di[$func & 1]($p)); //@line 41 "c_src/frprmn.c"
 FUNCTION_TABLE_vii[$dfunc & 3]($p,$2); //@line 42 "c_src/frprmn.c"
 $4 = ($n|0)>(0); //@line 43 "c_src/frprmn.c"
 if ($4) {
  $j$014 = 0;
  while(1) {
   $8 = (($2) + ($j$014<<2)|0); //@line 44 "c_src/frprmn.c"
   $9 = +HEAPF32[$8>>2]; //@line 44 "c_src/frprmn.c"
   $10 = -$9; //@line 44 "c_src/frprmn.c"
   $11 = (($0) + ($j$014<<2)|0); //@line 44 "c_src/frprmn.c"
   HEAPF32[$11>>2] = $10; //@line 44 "c_src/frprmn.c"
   $12 = (($1) + ($j$014<<2)|0); //@line 45 "c_src/frprmn.c"
   HEAPF32[$12>>2] = $10; //@line 45 "c_src/frprmn.c"
   HEAPF32[$8>>2] = $10; //@line 45 "c_src/frprmn.c"
   $13 = (($j$014) + 1)|0; //@line 43 "c_src/frprmn.c"
   $exitcond19 = ($13|0)==($n|0); //@line 43 "c_src/frprmn.c"
   if ($exitcond19) {
    break;
   } else {
    $j$014 = $13;
   }
  }
 }
 $5 = $ftol; //@line 50 "c_src/frprmn.c"
 $6 = ($n|0)>(0); //@line 57 "c_src/frprmn.c"
 $7 = ($n|0)>(0); //@line 66 "c_src/frprmn.c"
 $fp$012 = $3;$its$013 = 0;
 while(1) {
  HEAP32[$iter>>2] = $its$013; //@line 48 "c_src/frprmn.c"
  _linmin($p,$2,$n,$fret,$func); //@line 49 "c_src/frprmn.c"
  $14 = +HEAPF32[$fret>>2]; //@line 50 "c_src/frprmn.c"
  $15 = $14 - $fp$012; //@line 50 "c_src/frprmn.c"
  $fabsf = (+Math_abs((+$15))); //@line 50 "c_src/frprmn.c"
  $16 = $fabsf; //@line 50 "c_src/frprmn.c"
  $17 = $16 * 2.0; //@line 50 "c_src/frprmn.c"
  $fabsf1 = (+Math_abs((+$14))); //@line 50 "c_src/frprmn.c"
  $18 = $fabsf1; //@line 50 "c_src/frprmn.c"
  $fabsf2 = (+Math_abs((+$fp$012))); //@line 50 "c_src/frprmn.c"
  $19 = $fabsf2; //@line 50 "c_src/frprmn.c"
  $20 = $18 + $19; //@line 50 "c_src/frprmn.c"
  $21 = $20 + 1.0E-10; //@line 50 "c_src/frprmn.c"
  $22 = $5 * $21; //@line 50 "c_src/frprmn.c"
  $23 = !($17 <= $22); //@line 50 "c_src/frprmn.c"
  if (!($23)) {
   label = 5;
   break;
  }
  $24 = (+FUNCTION_TABLE_di[$func & 1]($p)); //@line 54 "c_src/frprmn.c"
  FUNCTION_TABLE_vii[$dfunc & 3]($p,$2); //@line 55 "c_src/frprmn.c"
  if ($6) {
   $dgg$04 = 0.0;$gg$05 = 0.0;$j$16 = 0;
   while(1) {
    $25 = (($0) + ($j$16<<2)|0); //@line 58 "c_src/frprmn.c"
    $26 = +HEAPF32[$25>>2]; //@line 58 "c_src/frprmn.c"
    $27 = $26 * $26; //@line 58 "c_src/frprmn.c"
    $28 = $gg$05 + $27; //@line 58 "c_src/frprmn.c"
    $29 = (($2) + ($j$16<<2)|0); //@line 59 "c_src/frprmn.c"
    $30 = +HEAPF32[$29>>2]; //@line 59 "c_src/frprmn.c"
    $31 = $26 + $30; //@line 59 "c_src/frprmn.c"
    $32 = $30 * $31; //@line 59 "c_src/frprmn.c"
    $33 = $dgg$04 + $32; //@line 59 "c_src/frprmn.c"
    $34 = (($j$16) + 1)|0; //@line 57 "c_src/frprmn.c"
    $exitcond = ($34|0)==($n|0); //@line 57 "c_src/frprmn.c"
    if ($exitcond) {
     $dgg$0$lcssa = $33;$gg$0$lcssa = $28;
     break;
    } else {
     $dgg$04 = $33;$gg$05 = $28;$j$16 = $34;
    }
   }
  } else {
   $dgg$0$lcssa = 0.0;$gg$0$lcssa = 0.0;
  }
  $fabsf3 = (+Math_abs((+$gg$0$lcssa))); //@line 61 "c_src/frprmn.c"
  $35 = $fabsf3; //@line 61 "c_src/frprmn.c"
  $36 = $35 < 1.0E-10; //@line 61 "c_src/frprmn.c"
  if ($36) {
   label = 9;
   break;
  }
  $37 = $dgg$0$lcssa / $gg$0$lcssa; //@line 65 "c_src/frprmn.c"
  if ($7) {
   $j$28 = 0;
   while(1) {
    $38 = (($2) + ($j$28<<2)|0); //@line 67 "c_src/frprmn.c"
    $39 = +HEAPF32[$38>>2]; //@line 67 "c_src/frprmn.c"
    $40 = -$39; //@line 67 "c_src/frprmn.c"
    $41 = (($0) + ($j$28<<2)|0); //@line 67 "c_src/frprmn.c"
    HEAPF32[$41>>2] = $40; //@line 67 "c_src/frprmn.c"
    $42 = (($1) + ($j$28<<2)|0); //@line 68 "c_src/frprmn.c"
    $43 = +HEAPF32[$42>>2]; //@line 68 "c_src/frprmn.c"
    $44 = $37 * $43; //@line 68 "c_src/frprmn.c"
    $45 = $44 - $39; //@line 68 "c_src/frprmn.c"
    HEAPF32[$42>>2] = $45; //@line 68 "c_src/frprmn.c"
    HEAPF32[$38>>2] = $45; //@line 68 "c_src/frprmn.c"
    $46 = (($j$28) + 1)|0; //@line 66 "c_src/frprmn.c"
    $exitcond18 = ($46|0)==($n|0); //@line 66 "c_src/frprmn.c"
    if ($exitcond18) {
     break;
    } else {
     $j$28 = $46;
    }
   }
  }
  $47 = (($its$013) + 1)|0; //@line 47 "c_src/frprmn.c"
  $48 = ($47|0)<(200); //@line 47 "c_src/frprmn.c"
  if ($48) {
   $fp$012 = $24;$its$013 = $47;
  } else {
   label = 13;
   break;
  }
 }
 if ((label|0) == 5) {
  _free($2); //@line 51 "c_src/frprmn.c"
  _free($1); //@line 51 "c_src/frprmn.c"
  _free($0); //@line 51 "c_src/frprmn.c"
  return; //@line 73 "c_src/frprmn.c"
 }
 else if ((label|0) == 9) {
  _free($2); //@line 62 "c_src/frprmn.c"
  _free($1); //@line 62 "c_src/frprmn.c"
  _free($0); //@line 62 "c_src/frprmn.c"
  return; //@line 73 "c_src/frprmn.c"
 }
 else if ((label|0) == 13) {
  _free($2); //@line 71 "c_src/frprmn.c"
  _free($1); //@line 71 "c_src/frprmn.c"
  _free($0); //@line 71 "c_src/frprmn.c"
  _rt_error(168); //@line 72 "c_src/frprmn.c"
  // unreachable;
 }
}
function _initDMT($fname) {
 $fname = $fname|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $fabsf = 0.0, $i$03 = 0, $j$01 = 0, $p$02 = 0, $pend = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $vararg_buffer = sp;
 $pend = sp + 4|0;
 $0 = HEAP32[216>>2]|0; //@line 39 "minimizer.c"
 $1 = ($0*11)|0; //@line 39 "minimizer.c"
 $2 = (_malloc($1)|0); //@line 40 "minimizer.c"
 $3 = (_fopen(($fname|0),(224|0))|0); //@line 41 "minimizer.c"
 $4 = ($2|0)==(0|0); //@line 43 "minimizer.c"
 if ($4) {
  _rt_error(232); //@line 44 "minimizer.c"
  // unreachable;
 }
 $5 = ($3|0)==(0|0); //@line 46 "minimizer.c"
 if ($5) {
  HEAP32[$vararg_buffer>>2] = $fname; //@line 47 "minimizer.c"
  (_printf((272|0),($vararg_buffer|0))|0); //@line 47 "minimizer.c"
  _rt_error(320); //@line 48 "minimizer.c"
  // unreachable;
 }
 $6 = HEAP32[216>>2]|0; //@line 51 "minimizer.c"
 $7 = ($6|0)>(0); //@line 51 "minimizer.c"
 if ($7) {
  $i$03 = 0;
 } else {
  (_fclose(($3|0))|0); //@line 64 "minimizer.c"
  _free($2); //@line 65 "minimizer.c"
  STACKTOP = sp;return; //@line 66 "minimizer.c"
 }
 while(1) {
  (_fgets(($2|0),($1|0),($3|0))|0); //@line 52 "minimizer.c"
  $8 = HEAP32[216>>2]|0; //@line 54 "minimizer.c"
  $9 = ($8|0)>(0); //@line 54 "minimizer.c"
  if ($9) {
   $11 = $8;$j$01 = 0;$p$02 = $2;
   while(1) {
    $10 = Math_imul($11, $i$03)|0; //@line 55 "minimizer.c"
    $12 = (($10) + ($j$01))|0; //@line 55 "minimizer.c"
    $13 = (+_strtof($p$02,$pend)); //@line 56 "minimizer.c"
    $14 = HEAP32[336>>2]|0; //@line 56 "minimizer.c"
    $15 = (($14) + ($12<<2)|0); //@line 56 "minimizer.c"
    HEAPF32[$15>>2] = $13; //@line 56 "minimizer.c"
    $16 = HEAP32[336>>2]|0; //@line 57 "minimizer.c"
    $17 = (($16) + ($12<<2)|0); //@line 57 "minimizer.c"
    $18 = +HEAPF32[$17>>2]; //@line 57 "minimizer.c"
    $fabsf = (+Math_abs((+$18))); //@line 57 "minimizer.c"
    $19 = $fabsf; //@line 57 "minimizer.c"
    $20 = $19 < 0.10000000000000001; //@line 57 "minimizer.c"
    if ($20) {
     HEAPF32[$17>>2] = 0.10000000149011612; //@line 58 "minimizer.c"
    }
    $21 = HEAP32[$pend>>2]|0; //@line 60 "minimizer.c"
    $22 = ((($21)) + 1|0); //@line 60 "minimizer.c"
    $23 = (($j$01) + 1)|0; //@line 54 "minimizer.c"
    $24 = HEAP32[216>>2]|0; //@line 54 "minimizer.c"
    $25 = ($23|0)<($24|0); //@line 54 "minimizer.c"
    if ($25) {
     $11 = $24;$j$01 = $23;$p$02 = $22;
    } else {
     break;
    }
   }
  }
  $26 = (($i$03) + 1)|0; //@line 51 "minimizer.c"
  $27 = HEAP32[216>>2]|0; //@line 51 "minimizer.c"
  $28 = ($26|0)<($27|0); //@line 51 "minimizer.c"
  if ($28) {
   $i$03 = $26;
  } else {
   break;
  }
 }
 (_fclose(($3|0))|0); //@line 64 "minimizer.c"
 _free($2); //@line 65 "minimizer.c"
 STACKTOP = sp;return; //@line 66 "minimizer.c"
}
function _initFPS($ps) {
 $ps = $ps|0;
 var $$cols$0 = 0, $$lcssa = 0, $$rows$0 = 0, $0 = 0, $1 = 0.0, $10 = 0, $11 = 0.0, $12 = 0, $13 = 0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0.0, $22 = 0, $23 = 0.0;
 var $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0.0, $29 = 0.0, $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0, $38 = 0, $39 = 0, $4 = 0.0, $40 = 0, $41 = 0;
 var $5 = 0.0, $6 = 0.0, $7 = 0, $8 = 0, $9 = 0, $cols$03 = 0, $i$01 = 0, $n$0 = 0, $rows$02 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[216>>2]|0; //@line 72 "minimizer.c"
 $n$0 = $0;
 while(1) {
  $1 = (+($n$0|0)); //@line 73 "minimizer.c"
  $2 = (+Math_sqrt((+$1))); //@line 73 "minimizer.c"
  $3 = (~~(($2))); //@line 73 "minimizer.c"
  $4 = (+($3|0)); //@line 73 "minimizer.c"
  $5 = $2 - $4; //@line 73 "minimizer.c"
  $6 = (+Math_abs((+$5))); //@line 73 "minimizer.c"
  $7 = $6 > 0.01; //@line 73 "minimizer.c"
  $8 = (($n$0) + 1)|0; //@line 74 "minimizer.c"
  if ($7) {
   $n$0 = $8;
  } else {
   $$lcssa = $3;
   break;
  }
 }
 $9 = HEAP32[344>>2]|0; //@line 77 "minimizer.c"
 $10 = (($9|0) / ($$lcssa|0))&-1; //@line 77 "minimizer.c"
 $11 = (+($10|0)); //@line 77 "minimizer.c"
 $12 = HEAP32[352>>2]|0; //@line 78 "minimizer.c"
 $13 = (($12|0) / ($$lcssa|0))&-1; //@line 78 "minimizer.c"
 $14 = (+($13|0)); //@line 78 "minimizer.c"
 $15 = $11 * 0.5; //@line 79 "minimizer.c"
 $16 = $14 * 0.5; //@line 80 "minimizer.c"
 $17 = HEAP32[360>>2]|0; //@line 83 "minimizer.c"
 $18 = ($17|0)>(0); //@line 83 "minimizer.c"
 if (!($18)) {
  return; //@line 92 "minimizer.c"
 }
 $19 = $$lcssa << 1; //@line 84 "minimizer.c"
 $20 = HEAP32[368>>2]|0; //@line 88 "minimizer.c"
 $21 = (+($20|0)); //@line 88 "minimizer.c"
 $22 = HEAP32[376>>2]|0; //@line 89 "minimizer.c"
 $23 = (+($22|0)); //@line 89 "minimizer.c"
 $24 = HEAP32[360>>2]|0; //@line 83 "minimizer.c"
 $cols$03 = -1;$i$01 = 0;$rows$02 = 0;
 while(1) {
  $25 = (($i$01|0) % ($19|0))&-1; //@line 84 "minimizer.c"
  $26 = ($25|0)==(0); //@line 84 "minimizer.c"
  $27 = $26&1; //@line 84 "minimizer.c"
  $$rows$0 = (($27) + ($rows$02))|0; //@line 84 "minimizer.c"
  $$cols$0 = $26 ? 0 : $cols$03; //@line 84 "minimizer.c"
  $28 = (+($$cols$0|0)); //@line 88 "minimizer.c"
  $29 = $11 * $28; //@line 88 "minimizer.c"
  $30 = $15 + $29; //@line 88 "minimizer.c"
  $31 = $21 + $30; //@line 88 "minimizer.c"
  $32 = (($ps) + ($i$01<<2)|0); //@line 88 "minimizer.c"
  HEAPF32[$32>>2] = $31; //@line 88 "minimizer.c"
  $33 = (+($$rows$0|0)); //@line 89 "minimizer.c"
  $34 = $14 * $33; //@line 89 "minimizer.c"
  $35 = $16 + $34; //@line 89 "minimizer.c"
  $36 = $23 + $35; //@line 89 "minimizer.c"
  $37 = $i$01 | 1; //@line 89 "minimizer.c"
  $38 = (($ps) + ($37<<2)|0); //@line 89 "minimizer.c"
  HEAPF32[$38>>2] = $36; //@line 89 "minimizer.c"
  $39 = (($$cols$0) + 1)|0; //@line 90 "minimizer.c"
  $40 = (($i$01) + 2)|0; //@line 83 "minimizer.c"
  $41 = ($40|0)<($24|0); //@line 83 "minimizer.c"
  if ($41) {
   $cols$03 = $39;$i$01 = $40;$rows$02 = $$rows$0;
  } else {
   break;
  }
 }
 return; //@line 92 "minimizer.c"
}
function _energy($xi,$yi,$xj,$yj,$wij,$dij) {
 $xi = +$xi;
 $yi = +$yi;
 $xj = +$xj;
 $yj = +$yj;
 $wij = +$wij;
 $dij = +$dij;
 var $0 = 0.0, $1 = 0.0, $2 = 0.0, $3 = 0.0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0.0, $8 = 0.0, $9 = 0.0, $dist$0 = 0.0, $fabsf = 0.0, $sqrtf = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $xi - $xj; //@line 96 "minimizer.c"
 $1 = $yi - $yj; //@line 97 "minimizer.c"
 $2 = $0 * $0; //@line 98 "minimizer.c"
 $3 = $1 * $1; //@line 98 "minimizer.c"
 $4 = $2 + $3; //@line 98 "minimizer.c"
 $sqrtf = (+Math_sqrt((+$4))); //@line 98 "minimizer.c"
 $fabsf = (+Math_abs((+$sqrtf))); //@line 99 "minimizer.c"
 $5 = $fabsf; //@line 99 "minimizer.c"
 $6 = $5 < 0.10000000000000001; //@line 99 "minimizer.c"
 $dist$0 = $6 ? 1.0 : $sqrtf; //@line 99 "minimizer.c"
 $7 = $dist$0 - $dij; //@line 102 "minimizer.c"
 $8 = $7 * $7; //@line 102 "minimizer.c"
 $9 = $8 * $wij; //@line 102 "minimizer.c"
 return (+$9); //@line 102 "minimizer.c"
}
function _force($xi,$yi,$xj,$yj,$wij,$dij,$dir) {
 $xi = +$xi;
 $yi = +$yi;
 $xj = +$xj;
 $yj = +$yj;
 $wij = +$wij;
 $dij = +$dij;
 $dir = $dir|0;
 var $$0 = 0.0, $$pn = 0.0, $0 = 0.0, $1 = 0.0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $2 = 0.0, $3 = 0.0, $4 = 0.0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0.0, $9 = 0.0, $dist$0 = 0.0, $fabsf = 0.0, $sqrtf = 0.0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $xi - $xj; //@line 108 "minimizer.c"
 $1 = $yi - $yj; //@line 109 "minimizer.c"
 $2 = $0 * $0; //@line 110 "minimizer.c"
 $3 = $1 * $1; //@line 110 "minimizer.c"
 $4 = $2 + $3; //@line 110 "minimizer.c"
 $sqrtf = (+Math_sqrt((+$4))); //@line 110 "minimizer.c"
 $fabsf = (+Math_abs((+$sqrtf))); //@line 111 "minimizer.c"
 $5 = $fabsf; //@line 111 "minimizer.c"
 $6 = $5 < 0.10000000000000001; //@line 111 "minimizer.c"
 $dist$0 = $6 ? 1.0 : $sqrtf; //@line 111 "minimizer.c"
 $7 = ($dir<<24>>24)==(120); //@line 114 "minimizer.c"
 $8 = $wij * -2.0; //@line 115 "minimizer.c"
 if ($7) {
  $9 = $0 * $8; //@line 115 "minimizer.c"
  $10 = $dist$0 - $dij; //@line 115 "minimizer.c"
  $11 = $9 * $10; //@line 115 "minimizer.c"
  $$pn = $11;
  $$0 = $$pn / $dist$0; //@line 115 "minimizer.c"
  return (+$$0); //@line 118 "minimizer.c"
 } else {
  $12 = $1 * $8; //@line 117 "minimizer.c"
  $13 = $dist$0 - $dij; //@line 117 "minimizer.c"
  $14 = $12 * $13; //@line 117 "minimizer.c"
  $$pn = $14;
  $$0 = $$pn / $dist$0; //@line 115 "minimizer.c"
  return (+$$0); //@line 118 "minimizer.c"
 }
 return +(0.0);
}
function _calcFunction($p) {
 $p = $p|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $18 = 0, $19 = 0, $2 = 0, $20 = 0.0, $21 = 0, $22 = 0, $23 = 0, $24 = 0.0, $25 = 0.0, $26 = 0;
 var $27 = 0.0, $28 = 0, $29 = 0, $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0, $34 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0.0, $8 = 0, $9 = 0.0, $i$04 = 0, $j$02 = 0, $rtn$0$lcssa = 0.0, $rtn$03 = 0.0, $rtn$1$lcssa = 0.0;
 var $rtn$11 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[360>>2]|0; //@line 125 "minimizer.c"
 $1 = ($0|0)>(1); //@line 125 "minimizer.c"
 if (!($1)) {
  $rtn$0$lcssa = 0.0;
  return (+$rtn$0$lcssa); //@line 134 "minimizer.c"
 }
 $2 = HEAP32[360>>2]|0; //@line 126 "minimizer.c"
 $3 = (($2) + -1)|0; //@line 125 "minimizer.c"
 $4 = HEAP32[216>>2]|0; //@line 128 "minimizer.c"
 $5 = HEAP32[336>>2]|0; //@line 128 "minimizer.c"
 $6 = HEAP32[384>>2]|0; //@line 129 "minimizer.c"
 $7 = (+($6|0)); //@line 129 "minimizer.c"
 $8 = HEAP32[392>>2]|0; //@line 130 "minimizer.c"
 $9 = (+($8|0)); //@line 130 "minimizer.c"
 $10 = HEAP32[360>>2]|0; //@line 126 "minimizer.c"
 $i$04 = 0;$rtn$03 = 0.0;
 while(1) {
  $11 = (($i$04) + 2)|0; //@line 126 "minimizer.c"
  $13 = ($11|0)<($2|0); //@line 126 "minimizer.c"
  if ($13) {
   $14 = (($i$04|0) / 2)&-1; //@line 128 "minimizer.c"
   $15 = Math_imul($4, $14)|0; //@line 128 "minimizer.c"
   $16 = (($p) + ($i$04<<2)|0); //@line 131 "minimizer.c"
   $17 = +HEAPF32[$16>>2]; //@line 131 "minimizer.c"
   $18 = $i$04 | 1; //@line 131 "minimizer.c"
   $19 = (($p) + ($18<<2)|0); //@line 131 "minimizer.c"
   $20 = +HEAPF32[$19>>2]; //@line 131 "minimizer.c"
   $j$02 = $11;$rtn$11 = $rtn$03;
   while(1) {
    $21 = (($j$02|0) / 2)&-1; //@line 128 "minimizer.c"
    $22 = (($15) + ($21))|0; //@line 128 "minimizer.c"
    $23 = (($5) + ($22<<2)|0); //@line 128 "minimizer.c"
    $24 = +HEAPF32[$23>>2]; //@line 128 "minimizer.c"
    $25 = $24 * $9; //@line 130 "minimizer.c"
    $26 = (($p) + ($j$02<<2)|0); //@line 131 "minimizer.c"
    $27 = +HEAPF32[$26>>2]; //@line 131 "minimizer.c"
    $28 = (($j$02) + 1)|0; //@line 131 "minimizer.c"
    $29 = (($p) + ($28<<2)|0); //@line 131 "minimizer.c"
    $30 = +HEAPF32[$29>>2]; //@line 131 "minimizer.c"
    $31 = (+_energy($17,$20,$27,$30,$7,$25)); //@line 131 "minimizer.c"
    $32 = $rtn$11 + $31; //@line 131 "minimizer.c"
    $33 = (($j$02) + 2)|0; //@line 126 "minimizer.c"
    $34 = ($33|0)<($10|0); //@line 126 "minimizer.c"
    if ($34) {
     $j$02 = $33;$rtn$11 = $32;
    } else {
     $rtn$1$lcssa = $32;
     break;
    }
   }
  } else {
   $rtn$1$lcssa = $rtn$03;
  }
  $12 = ($11|0)<($3|0); //@line 125 "minimizer.c"
  if ($12) {
   $i$04 = $11;$rtn$03 = $rtn$1$lcssa;
  } else {
   $rtn$0$lcssa = $rtn$1$lcssa;
   break;
  }
 }
 return (+$rtn$0$lcssa); //@line 134 "minimizer.c"
}
function _calcGradient($p,$df) {
 $p = $p|0;
 $df = $df|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0.0, $24 = 0.0, $25 = 0.0, $26 = 0.0;
 var $27 = 0, $28 = 0.0, $29 = 0, $3 = 0, $30 = 0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0;
 var $45 = 0.0, $46 = 0.0, $47 = 0, $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0, $56 = 0.0, $57 = 0.0, $58 = 0, $59 = 0, $6 = 0.0, $7 = 0, $8 = 0.0, $9 = 0;
 var $i$02 = 0, $j$01 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[360>>2]|0; //@line 141 "minimizer.c"
 $1 = ($0|0)>(0); //@line 141 "minimizer.c"
 if (!($1)) {
  return; //@line 153 "minimizer.c"
 }
 $2 = HEAP32[360>>2]|0; //@line 142 "minimizer.c"
 $3 = HEAP32[216>>2]|0; //@line 144 "minimizer.c"
 $4 = HEAP32[336>>2]|0; //@line 144 "minimizer.c"
 $5 = HEAP32[384>>2]|0; //@line 145 "minimizer.c"
 $6 = (+($5|0)); //@line 145 "minimizer.c"
 $7 = HEAP32[392>>2]|0; //@line 146 "minimizer.c"
 $8 = (+($7|0)); //@line 146 "minimizer.c"
 $9 = HEAP32[360>>2]|0; //@line 142 "minimizer.c"
 $i$02 = 0;
 while(1) {
  $10 = (($i$02) + 2)|0; //@line 142 "minimizer.c"
  $12 = ($10|0)<($2|0); //@line 142 "minimizer.c"
  if ($12) {
   $13 = (($i$02|0) / 2)&-1; //@line 144 "minimizer.c"
   $14 = Math_imul($3, $13)|0; //@line 144 "minimizer.c"
   $15 = (($p) + ($i$02<<2)|0); //@line 147 "minimizer.c"
   $16 = $i$02 | 1; //@line 147 "minimizer.c"
   $17 = (($p) + ($16<<2)|0); //@line 147 "minimizer.c"
   $18 = (($df) + ($i$02<<2)|0); //@line 147 "minimizer.c"
   $19 = (($df) + ($16<<2)|0); //@line 148 "minimizer.c"
   $j$01 = $10;
   while(1) {
    $20 = (($j$01|0) / 2)&-1; //@line 144 "minimizer.c"
    $21 = (($14) + ($20))|0; //@line 144 "minimizer.c"
    $22 = (($4) + ($21<<2)|0); //@line 144 "minimizer.c"
    $23 = +HEAPF32[$22>>2]; //@line 144 "minimizer.c"
    $24 = $23 * $8; //@line 146 "minimizer.c"
    $25 = +HEAPF32[$15>>2]; //@line 147 "minimizer.c"
    $26 = +HEAPF32[$17>>2]; //@line 147 "minimizer.c"
    $27 = (($p) + ($j$01<<2)|0); //@line 147 "minimizer.c"
    $28 = +HEAPF32[$27>>2]; //@line 147 "minimizer.c"
    $29 = (($j$01) + 1)|0; //@line 147 "minimizer.c"
    $30 = (($p) + ($29<<2)|0); //@line 147 "minimizer.c"
    $31 = +HEAPF32[$30>>2]; //@line 147 "minimizer.c"
    $32 = (+_force($25,$26,$28,$31,$6,$24,120)); //@line 147 "minimizer.c"
    $33 = +HEAPF32[$18>>2]; //@line 147 "minimizer.c"
    $34 = $32 + $33; //@line 147 "minimizer.c"
    HEAPF32[$18>>2] = $34; //@line 147 "minimizer.c"
    $35 = +HEAPF32[$15>>2]; //@line 148 "minimizer.c"
    $36 = +HEAPF32[$17>>2]; //@line 148 "minimizer.c"
    $37 = +HEAPF32[$27>>2]; //@line 148 "minimizer.c"
    $38 = +HEAPF32[$30>>2]; //@line 148 "minimizer.c"
    $39 = (+_force($35,$36,$37,$38,$6,$24,121)); //@line 148 "minimizer.c"
    $40 = +HEAPF32[$19>>2]; //@line 148 "minimizer.c"
    $41 = $39 + $40; //@line 148 "minimizer.c"
    HEAPF32[$19>>2] = $41; //@line 148 "minimizer.c"
    $42 = +HEAPF32[$15>>2]; //@line 149 "minimizer.c"
    $43 = +HEAPF32[$17>>2]; //@line 149 "minimizer.c"
    $44 = +HEAPF32[$27>>2]; //@line 149 "minimizer.c"
    $45 = +HEAPF32[$30>>2]; //@line 149 "minimizer.c"
    $46 = (+_force($42,$43,$44,$45,$6,$24,120)); //@line 149 "minimizer.c"
    $47 = (($df) + ($j$01<<2)|0); //@line 149 "minimizer.c"
    $48 = +HEAPF32[$47>>2]; //@line 149 "minimizer.c"
    $49 = $48 - $46; //@line 149 "minimizer.c"
    HEAPF32[$47>>2] = $49; //@line 149 "minimizer.c"
    $50 = +HEAPF32[$15>>2]; //@line 150 "minimizer.c"
    $51 = +HEAPF32[$17>>2]; //@line 150 "minimizer.c"
    $52 = +HEAPF32[$27>>2]; //@line 150 "minimizer.c"
    $53 = +HEAPF32[$30>>2]; //@line 150 "minimizer.c"
    $54 = (+_force($50,$51,$52,$53,$6,$24,121)); //@line 150 "minimizer.c"
    $55 = (($df) + ($29<<2)|0); //@line 150 "minimizer.c"
    $56 = +HEAPF32[$55>>2]; //@line 150 "minimizer.c"
    $57 = $56 - $54; //@line 150 "minimizer.c"
    HEAPF32[$55>>2] = $57; //@line 150 "minimizer.c"
    $58 = (($j$01) + 2)|0; //@line 142 "minimizer.c"
    $59 = ($58|0)<($9|0); //@line 142 "minimizer.c"
    if ($59) {
     $j$01 = $58;
    } else {
     break;
    }
   }
  }
  $11 = ($10|0)<($2|0); //@line 141 "minimizer.c"
  if ($11) {
   $i$02 = $10;
  } else {
   break;
  }
 }
 return; //@line 153 "minimizer.c"
}
function _minimize($dmtFilename,$ssFilename,$flatpos,$len,$edgelen,$panelx,$panely,$panelOffsetX,$panelOffsetY,$fact) {
 $dmtFilename = $dmtFilename|0;
 $ssFilename = $ssFilename|0;
 $flatpos = $flatpos|0;
 $len = $len|0;
 $edgelen = $edgelen|0;
 $panelx = $panelx|0;
 $panely = $panely|0;
 $panelOffsetX = $panelOffsetX|0;
 $panelOffsetY = $panelOffsetY|0;
 $fact = +$fact;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0.0, $30 = 0, $31 = 0, $4 = 0, $5 = 0.0, $6 = 0.0, $7 = 0, $8 = 0.0, $9 = 0.0, $or$cond = 0, $or$cond3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_strcmp($ssFilename,400)|0); //@line 165 "minimizer.c"
 $1 = ($0|0)!=(0); //@line 165 "minimizer.c"
 HEAP32[368>>2] = $panelOffsetX; //@line 167 "minimizer.c"
 HEAP32[376>>2] = $panelOffsetY; //@line 168 "minimizer.c"
 $2 = (+($panelx|0)); //@line 169 "minimizer.c"
 $3 = $2 * $fact; //@line 169 "minimizer.c"
 $4 = (~~(($3))); //@line 169 "minimizer.c"
 HEAP32[344>>2] = $4; //@line 169 "minimizer.c"
 $5 = (+($panely|0)); //@line 170 "minimizer.c"
 $6 = $5 * $fact; //@line 170 "minimizer.c"
 $7 = (~~(($6))); //@line 170 "minimizer.c"
 HEAP32[352>>2] = $7; //@line 170 "minimizer.c"
 $8 = (+($edgelen|0)); //@line 171 "minimizer.c"
 $9 = $8 * $fact; //@line 171 "minimizer.c"
 $10 = (~~(($9))); //@line 171 "minimizer.c"
 HEAP32[392>>2] = $10; //@line 171 "minimizer.c"
 HEAP32[360>>2] = $len; //@line 173 "minimizer.c"
 $11 = (($len|0) / 2)&-1; //@line 174 "minimizer.c"
 HEAP32[216>>2] = $11; //@line 174 "minimizer.c"
 $12 = Math_imul($panely, $panelx)|0; //@line 175 "minimizer.c"
 $13 = (($12|0) / 1000)&-1; //@line 175 "minimizer.c"
 HEAP32[384>>2] = $13; //@line 175 "minimizer.c"
 $14 = $11 << 2; //@line 177 "minimizer.c"
 $15 = Math_imul($14, $11)|0; //@line 177 "minimizer.c"
 $16 = (_malloc($15)|0); //@line 177 "minimizer.c"
 HEAP32[336>>2] = $16; //@line 177 "minimizer.c"
 $17 = (_malloc(4)|0); //@line 178 "minimizer.c"
 $18 = (_malloc(4)|0); //@line 179 "minimizer.c"
 if ($1) {
  $19 = HEAP32[216>>2]|0; //@line 182 "minimizer.c"
  $20 = $19 << 2; //@line 182 "minimizer.c"
  $21 = (_malloc($20)|0); //@line 182 "minimizer.c"
  HEAP32[416>>2] = $21; //@line 182 "minimizer.c"
  $22 = HEAP32[216>>2]|0; //@line 183 "minimizer.c"
  (_get_sizes($21,$ssFilename,$22)|0); //@line 183 "minimizer.c"
 }
 $23 = ($17|0)==(0|0); //@line 186 "minimizer.c"
 $24 = ($18|0)==(0|0); //@line 186 "minimizer.c"
 $or$cond = $23 | $24; //@line 186 "minimizer.c"
 $25 = HEAP32[336>>2]|0;
 $26 = ($25|0)==(0|0); //@line 186 "minimizer.c"
 $or$cond3 = $or$cond | $26; //@line 186 "minimizer.c"
 if ($or$cond3) {
  _rt_error(424); //@line 187 "minimizer.c"
  // unreachable;
 }
 _initDMT($dmtFilename); //@line 190 "minimizer.c"
 _initFPS($flatpos); //@line 191 "minimizer.c"
 $27 = HEAP32[360>>2]|0; //@line 193 "minimizer.c"
 $28 = HEAP32[200>>2]|0; //@line 193 "minimizer.c"
 $29 = HEAP32[208>>2]|0; //@line 193 "minimizer.c"
 _frprmn($flatpos,$27,9.9999997473787516E-6,$17,$18,$28,$29); //@line 193 "minimizer.c"
 $30 = HEAP32[336>>2]|0; //@line 195 "minimizer.c"
 _free($30); //@line 195 "minimizer.c"
 _free($18); //@line 196 "minimizer.c"
 _free($17); //@line 197 "minimizer.c"
 if (!($1)) {
  return 0; //@line 202 "minimizer.c"
 }
 $31 = HEAP32[416>>2]|0; //@line 199 "minimizer.c"
 _free($31); //@line 199 "minimizer.c"
 return 0; //@line 202 "minimizer.c"
}
function _norm($arr,$length) {
 $arr = $arr|0;
 $length = $length|0;
 var $$lcssa = 0.0, $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0, $2 = 0.0, $3 = 0.0, $4 = 0.0, $5 = 0, $6 = 0.0, $7 = 0, $8 = 0, $9 = 0.0, $exitcond = 0, $exitcond7 = 0, $i$03 = 0, $i$11 = 0, $pow2 = 0.0;
 var $sum$02 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($length|0)>(0); //@line 22 "get_sizes.c"
 if ($0) {
  $i$03 = 0;$sum$02 = 0.0;
 } else {
  return; //@line 29 "get_sizes.c"
 }
 while(1) {
  $1 = (($arr) + ($i$03<<2)|0); //@line 23 "get_sizes.c"
  $2 = +HEAPF32[$1>>2]; //@line 23 "get_sizes.c"
  $3 = $2; //@line 23 "get_sizes.c"
  $pow2 = $3 * $3; //@line 23 "get_sizes.c"
  $4 = $sum$02 + $pow2; //@line 23 "get_sizes.c"
  $5 = (($i$03) + 1)|0; //@line 22 "get_sizes.c"
  $exitcond7 = ($5|0)==($length|0); //@line 22 "get_sizes.c"
  if ($exitcond7) {
   $$lcssa = $4;
   break;
  } else {
   $i$03 = $5;$sum$02 = $4;
  }
 }
 $6 = (+Math_sqrt((+$$lcssa))); //@line 25 "get_sizes.c"
 $7 = ($length|0)>(0); //@line 26 "get_sizes.c"
 if ($7) {
  $i$11 = 0;
 } else {
  return; //@line 29 "get_sizes.c"
 }
 while(1) {
  $8 = (($arr) + ($i$11<<2)|0); //@line 27 "get_sizes.c"
  $9 = +HEAPF32[$8>>2]; //@line 27 "get_sizes.c"
  $10 = $9; //@line 27 "get_sizes.c"
  $11 = $10 / $6; //@line 27 "get_sizes.c"
  $12 = $11; //@line 27 "get_sizes.c"
  HEAPF32[$8>>2] = $12; //@line 27 "get_sizes.c"
  $13 = (($i$11) + 1)|0; //@line 26 "get_sizes.c"
  $exitcond = ($13|0)==($length|0); //@line 26 "get_sizes.c"
  if ($exitcond) {
   break;
  } else {
   $i$11 = $13;
  }
 }
 return; //@line 29 "get_sizes.c"
}
function _sort($rtn,$sizes,$length) {
 $rtn = $rtn|0;
 $sizes = $sizes|0;
 $length = $length|0;
 var $$lcssa = 0, $0 = 0, $1 = 0.0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0.0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $index$02 = 0, $iter$01 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($length|0)<(1); //@line 34 "get_sizes.c"
 if ($0) {
  _free($sizes); //@line 42 "get_sizes.c"
  return; //@line 43 "get_sizes.c"
 } else {
  $index$02 = 1;
 }
 while(1) {
  $1 = (+($index$02|0)); //@line 36 "get_sizes.c"
  $iter$01 = 0;
  while(1) {
   $4 = $iter$01 << 1; //@line 36 "get_sizes.c"
   $5 = (($sizes) + ($4<<2)|0); //@line 36 "get_sizes.c"
   $6 = +HEAPF32[$5>>2]; //@line 36 "get_sizes.c"
   $7 = $6 == $1; //@line 36 "get_sizes.c"
   $2 = (($iter$01) + 1)|0; //@line 35 "get_sizes.c"
   if ($7) {
    $$lcssa = $4;
    label = 5;
    break;
   }
   $3 = ($2|0)<($length|0); //@line 35 "get_sizes.c"
   if ($3) {
    $iter$01 = $2;
   } else {
    break;
   }
  }
  if ((label|0) == 5) {
   label = 0;
   $8 = $$lcssa | 1; //@line 37 "get_sizes.c"
   $9 = (($sizes) + ($8<<2)|0); //@line 37 "get_sizes.c"
   $10 = HEAP32[$9>>2]|0; //@line 37 "get_sizes.c"
   $11 = (($index$02) + -1)|0; //@line 37 "get_sizes.c"
   $12 = (($rtn) + ($11<<2)|0); //@line 37 "get_sizes.c"
   HEAP32[$12>>2] = $10; //@line 37 "get_sizes.c"
  }
  $13 = (($index$02) + 1)|0; //@line 34 "get_sizes.c"
  $exitcond = ($index$02|0)==($length|0); //@line 34 "get_sizes.c"
  if ($exitcond) {
   break;
  } else {
   $index$02 = $13;
  }
 }
 _free($sizes); //@line 42 "get_sizes.c"
 return; //@line 43 "get_sizes.c"
}
function _get_sizes($fss,$filename,$nv) {
 $fss = $fss|0;
 $filename = $filename|0;
 $nv = $nv|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $filestatus = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer4 = 0, $vararg_buffer7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0;
 $vararg_buffer7 = sp + 24|0;
 $vararg_buffer4 = sp + 16|0;
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $filestatus = sp + 28|0;
 $0 = (_stat(($filename|0),($filestatus|0))|0); //@line 78 "get_sizes.c"
 $1 = ($0|0)==(0); //@line 78 "get_sizes.c"
 if (!($1)) {
  $2 = HEAP32[_stderr>>2]|0; //@line 79 "get_sizes.c"
  HEAP32[$vararg_buffer>>2] = $filename; //@line 79 "get_sizes.c"
  (_fprintf(($2|0),(472|0),($vararg_buffer|0))|0); //@line 79 "get_sizes.c"
  $$0 = 1;
  STACKTOP = sp;return ($$0|0); //@line 127 "get_sizes.c"
 }
 $3 = ((($filestatus)) + 36|0); //@line 83 "get_sizes.c"
 $4 = HEAP32[$3>>2]|0; //@line 83 "get_sizes.c"
 $5 = (_malloc($4)|0); //@line 84 "get_sizes.c"
 $6 = ($5|0)==(0|0); //@line 85 "get_sizes.c"
 if ($6) {
  $7 = HEAP32[_stderr>>2]|0; //@line 86 "get_sizes.c"
  HEAP32[$vararg_buffer1>>2] = $4; //@line 86 "get_sizes.c"
  (_fprintf(($7|0),(496|0),($vararg_buffer1|0))|0); //@line 86 "get_sizes.c"
  $$0 = 1;
  STACKTOP = sp;return ($$0|0); //@line 127 "get_sizes.c"
 }
 $8 = (_fopen(($filename|0),(544|0))|0); //@line 90 "get_sizes.c"
 $9 = ($8|0)==(0|0); //@line 91 "get_sizes.c"
 if ($9) {
  $10 = HEAP32[_stderr>>2]|0; //@line 92 "get_sizes.c"
  HEAP32[$vararg_buffer4>>2] = $filename; //@line 92 "get_sizes.c"
  (_fprintf(($10|0),(552|0),($vararg_buffer4|0))|0); //@line 92 "get_sizes.c"
  (_fclose(($8|0))|0); //@line 93 "get_sizes.c"
  _free($5); //@line 94 "get_sizes.c"
  $$0 = 1;
  STACKTOP = sp;return ($$0|0); //@line 127 "get_sizes.c"
 }
 $11 = (_fread(($5|0),($4|0),1,($8|0))|0); //@line 98 "get_sizes.c"
 $12 = ($11|0)==(1); //@line 98 "get_sizes.c"
 if (!($12)) {
  $13 = HEAP32[_stderr>>2]|0; //@line 99 "get_sizes.c"
  HEAP32[$vararg_buffer7>>2] = $filename; //@line 99 "get_sizes.c"
  (_fprintf(($13|0),(576|0),($vararg_buffer7|0))|0); //@line 99 "get_sizes.c"
  (_fclose(($8|0))|0); //@line 100 "get_sizes.c"
  _free($5); //@line 101 "get_sizes.c"
  $$0 = 1;
  STACKTOP = sp;return ($$0|0); //@line 127 "get_sizes.c"
 }
 (_fclose(($8|0))|0); //@line 104 "get_sizes.c"
 $14 = (_json_parse($5,$4)|0); //@line 107 "get_sizes.c"
 $15 = ($14|0)==(0|0); //@line 108 "get_sizes.c"
 if ($15) {
  $16 = HEAP32[_stderr>>2]|0; //@line 109 "get_sizes.c"
  (_fwrite((608|0),21,1,($16|0))|0); //@line 109 "get_sizes.c"
  _free($5); //@line 110 "get_sizes.c"
  _exit(1); //@line 111 "get_sizes.c"
  // unreachable; //@line 111 "get_sizes.c"
 }
 $17 = $nv << 3; //@line 114 "get_sizes.c"
 $18 = (_malloc($17)|0); //@line 114 "get_sizes.c"
 _fill_arr($18,$14); //@line 116 "get_sizes.c"
 _sort($fss,$18,$nv); //@line 118 "get_sizes.c"
 _norm($fss,$nv); //@line 119 "get_sizes.c"
 _json_value_free($14); //@line 121 "get_sizes.c"
 _free($5); //@line 123 "get_sizes.c"
 $$0 = 0;
 STACKTOP = sp;return ($$0|0); //@line 127 "get_sizes.c"
}
function _fill_arr($sizes,$value) {
 $sizes = $sizes|0;
 $value = $value|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $18 = 0, $19 = 0, $2 = 0, $20 = 0.0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $exitcond = 0, $i$01 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($value|0)==(0|0); //@line 52 "get_sizes.c"
 if ($0) {
  return; //@line 67 "get_sizes.c"
 }
 $1 = ((($value)) + 8|0); //@line 57 "get_sizes.c"
 $2 = HEAP32[$1>>2]|0; //@line 57 "get_sizes.c"
 $3 = ($2|0)>(0); //@line 59 "get_sizes.c"
 if (!($3)) {
  return; //@line 67 "get_sizes.c"
 }
 $4 = ((($1)) + 4|0); //@line 60 "get_sizes.c"
 $i$01 = 0;
 while(1) {
  $5 = HEAP32[$4>>2]|0; //@line 60 "get_sizes.c"
  $6 = (($5) + ($i$01<<2)|0); //@line 60 "get_sizes.c"
  $7 = HEAP32[$6>>2]|0; //@line 60 "get_sizes.c"
  $8 = ((($7)) + 8|0); //@line 61 "get_sizes.c"
  $9 = ((($8)) + 4|0); //@line 61 "get_sizes.c"
  $10 = HEAP32[$9>>2]|0; //@line 61 "get_sizes.c"
  $11 = ((($10)) + 8|0); //@line 61 "get_sizes.c"
  $12 = HEAP32[$11>>2]|0; //@line 61 "get_sizes.c"
  $13 = (_get_intval($12)|0); //@line 61 "get_sizes.c"
  $14 = ((($10)) + 20|0); //@line 62 "get_sizes.c"
  $15 = HEAP32[$14>>2]|0; //@line 62 "get_sizes.c"
  $16 = (_get_intval($15)|0); //@line 62 "get_sizes.c"
  $17 = (+($13|0)); //@line 63 "get_sizes.c"
  $18 = $i$01 << 1; //@line 63 "get_sizes.c"
  $19 = (($sizes) + ($18<<2)|0); //@line 63 "get_sizes.c"
  HEAPF32[$19>>2] = $17; //@line 63 "get_sizes.c"
  $20 = (+($16|0)); //@line 64 "get_sizes.c"
  $21 = $18 | 1; //@line 64 "get_sizes.c"
  $22 = (($sizes) + ($21<<2)|0); //@line 64 "get_sizes.c"
  HEAPF32[$22>>2] = $20; //@line 64 "get_sizes.c"
  $23 = (($i$01) + 1)|0; //@line 59 "get_sizes.c"
  $exitcond = ($23|0)==($2|0); //@line 59 "get_sizes.c"
  if ($exitcond) {
   break;
  } else {
   $i$01 = $23;
  }
 }
 return; //@line 67 "get_sizes.c"
}
function _get_intval($value) {
 $value = $value|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($value)) + 8|0); //@line 47 "get_sizes.c"
 $1 = $0; //@line 47 "get_sizes.c"
 $2 = $1; //@line 47 "get_sizes.c"
 $3 = HEAP32[$2>>2]|0; //@line 47 "get_sizes.c"
 $4 = (($1) + 4)|0; //@line 47 "get_sizes.c"
 $5 = $4; //@line 47 "get_sizes.c"
 $6 = HEAP32[$5>>2]|0; //@line 47 "get_sizes.c"
 return ($3|0); //@line 47 "get_sizes.c"
}
function _json_parse_ex($settings,$json,$length,$error_buf) {
 $settings = $settings|0;
 $json = $json|0;
 $length = $length|0;
 $error_buf = $error_buf|0;
 var $$ = 0, $$$v = 0, $$0 = 0, $$06 = 0, $$07 = 0, $$28 = 0, $$28$v = 0, $$lcssa = 0, $$lcssa544 = 0, $$lcssa545 = 0, $$lcssa551 = 0, $$lcssa553 = 0, $$lcssa554 = 0, $$lcssa557 = 0, $$lcssa561 = 0, $$lcssa562 = 0, $$masked = 0, $$masked13 = 0, $$masked15 = 0, $$masked16 = 0;
 var $$ph = 0, $$pr = 0, $$sum = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0;
 var $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0;
 var $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0;
 var $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0;
 var $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0;
 var $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0;
 var $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0;
 var $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0;
 var $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0;
 var $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0;
 var $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0;
 var $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0;
 var $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0;
 var $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0;
 var $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0;
 var $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0;
 var $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0;
 var $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0;
 var $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0;
 var $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0;
 var $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0;
 var $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0.0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0;
 var $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0.0, $514 = 0.0, $515 = 0.0, $516 = 0.0, $517 = 0, $518 = 0.0, $519 = 0.0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0;
 var $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0.0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0.0, $544 = 0.0, $545 = 0;
 var $546 = 0, $547 = 0.0, $548 = 0.0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0;
 var $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0.0, $569 = 0.0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0;
 var $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0;
 var $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0;
 var $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0;
 var $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0;
 var $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0;
 var $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $alloc = 0, $b$0 = 0, $error = 0, $flags$0 = 0, $flags$1 = 0, $flags$2 = 0, $flags$3 = 0, $flags$4 = 0;
 var $flags$6 = 0, $isdigit = 0, $isdigit10 = 0, $isdigit12 = 0, $isdigittmp = 0, $isdigittmp11 = 0, $isdigittmp9 = 0, $num_digits$0141 = 0, $num_digits$1 = 0, $num_digits$1$lcssa487 = 0, $num_digits$2 = 0, $num_digits$3 = 0, $num_e$0142 = 0, $num_e$1 = 0, $num_e$1$lcssa508 = 0, $num_e$2 = 0, $num_e$3 = 0, $or$cond = 0, $or$cond17 = 0, $or$cond24 = 0;
 var $or$cond25 = 0, $root = 0, $state = 0, $storemerge8 = 0, $string$0 = 0, $string$1 = 0, $string$2 = 0, $string$3 = 0, $string_length$0 = 0, $string_length$1 = 0, $string_length$2 = 0, $top = 0, $vararg_buffer = 0, $vararg_buffer12 = 0, $vararg_buffer16 = 0, $vararg_buffer2 = 0, $vararg_buffer20 = 0, $vararg_buffer24 = 0, $vararg_buffer29 = 0, $vararg_buffer34 = 0;
 var $vararg_buffer38 = 0, $vararg_buffer43 = 0, $vararg_buffer48 = 0, $vararg_buffer53 = 0, $vararg_buffer57 = 0, $vararg_buffer62 = 0, $vararg_buffer67 = 0, $vararg_buffer7 = 0, $vararg_buffer71 = 0, $vararg_buffer75 = 0, $vararg_buffer79 = 0, $vararg_buffer83 = 0, $vararg_ptr1 = 0, $vararg_ptr10 = 0, $vararg_ptr11 = 0, $vararg_ptr15 = 0, $vararg_ptr19 = 0, $vararg_ptr23 = 0, $vararg_ptr27 = 0, $vararg_ptr28 = 0;
 var $vararg_ptr32 = 0, $vararg_ptr33 = 0, $vararg_ptr37 = 0, $vararg_ptr41 = 0, $vararg_ptr42 = 0, $vararg_ptr46 = 0, $vararg_ptr47 = 0, $vararg_ptr5 = 0, $vararg_ptr51 = 0, $vararg_ptr52 = 0, $vararg_ptr56 = 0, $vararg_ptr6 = 0, $vararg_ptr60 = 0, $vararg_ptr61 = 0, $vararg_ptr65 = 0, $vararg_ptr66 = 0, $vararg_ptr70 = 0, $vararg_ptr74 = 0, $vararg_ptr78 = 0, $vararg_ptr82 = 0;
 var $vararg_ptr86 = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 432|0;
 $vararg_buffer83 = sp + 224|0;
 $vararg_buffer79 = sp + 216|0;
 $vararg_buffer75 = sp + 208|0;
 $vararg_buffer71 = sp + 200|0;
 $vararg_buffer67 = sp + 192|0;
 $vararg_buffer62 = sp + 176|0;
 $vararg_buffer57 = sp + 160|0;
 $vararg_buffer53 = sp + 152|0;
 $vararg_buffer48 = sp + 136|0;
 $vararg_buffer43 = sp + 120|0;
 $vararg_buffer38 = sp + 104|0;
 $vararg_buffer34 = sp + 96|0;
 $vararg_buffer29 = sp + 80|0;
 $vararg_buffer24 = sp + 64|0;
 $vararg_buffer20 = sp + 56|0;
 $vararg_buffer16 = sp + 48|0;
 $vararg_buffer12 = sp + 40|0;
 $vararg_buffer7 = sp + 24|0;
 $vararg_buffer2 = sp + 8|0;
 $vararg_buffer = sp;
 $error = sp + 296|0;
 $top = sp + 292|0;
 $root = sp + 288|0;
 $alloc = sp + 284|0;
 $state = sp + 232|0;
 HEAP32[$alloc>>2] = 0; //@line 228 "json-parser/json.c"
 dest=$state; stop=dest+52|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0)); //@line 229 "json-parser/json.c"
 $0 = ($length>>>0)>(2); //@line 236 "json-parser/json.c"
 if ($0) {
  $1 = HEAP8[$json>>0]|0; //@line 236 "json-parser/json.c"
  $2 = ($1<<24>>24)==(-17); //@line 236 "json-parser/json.c"
  if ($2) {
   $3 = ((($json)) + 1|0); //@line 237 "json-parser/json.c"
   $4 = HEAP8[$3>>0]|0; //@line 237 "json-parser/json.c"
   $5 = ($4<<24>>24)==(-69); //@line 237 "json-parser/json.c"
   if ($5) {
    $6 = ((($json)) + 2|0); //@line 238 "json-parser/json.c"
    $7 = HEAP8[$6>>0]|0; //@line 238 "json-parser/json.c"
    $8 = ($7<<24>>24)==(-65); //@line 238 "json-parser/json.c"
    if ($8) {
     $9 = ((($json)) + 3|0); //@line 240 "json-parser/json.c"
     $10 = (($length) + -3)|0; //@line 241 "json-parser/json.c"
     $$06 = $9;$$07 = $10;
    } else {
     $$06 = $json;$$07 = $length;
    }
   } else {
    $$06 = $json;$$07 = $length;
   }
  } else {
   $$06 = $json;$$07 = $length;
  }
 } else {
  $$06 = $json;$$07 = $length;
 }
 HEAP8[$error>>0] = 0; //@line 244 "json-parser/json.c"
 $11 = (($$06) + ($$07)|0); //@line 245 "json-parser/json.c"
 $12 = ((($state)) + 12|0); //@line 247 "json-parser/json.c"
 ;HEAP32[$12>>2]=HEAP32[$settings>>2]|0;HEAP32[$12+4>>2]=HEAP32[$settings+4>>2]|0;HEAP32[$12+8>>2]=HEAP32[$settings+8>>2]|0;HEAP32[$12+12>>2]=HEAP32[$settings+12>>2]|0;HEAP32[$12+16>>2]=HEAP32[$settings+16>>2]|0;HEAP32[$12+20>>2]=HEAP32[$settings+20>>2]|0; //@line 247 "json-parser/json.c"
 $13 = ((($state)) + 20|0); //@line 249 "json-parser/json.c"
 $14 = HEAP32[$13>>2]|0; //@line 249 "json-parser/json.c"
 $15 = ($14|0)==(0|0); //@line 249 "json-parser/json.c"
 if ($15) {
  HEAP32[$13>>2] = 2; //@line 250 "json-parser/json.c"
 }
 $16 = ((($state)) + 24|0); //@line 252 "json-parser/json.c"
 $17 = HEAP32[$16>>2]|0; //@line 252 "json-parser/json.c"
 $18 = ($17|0)==(0|0); //@line 252 "json-parser/json.c"
 if ($18) {
  HEAP32[$16>>2] = 2; //@line 253 "json-parser/json.c"
 }
 $19 = ((($state)) + 4|0); //@line 255 "json-parser/json.c"
 HEAP32[$19>>2] = -1; //@line 255 "json-parser/json.c"
 $20 = ((($state)) + 8|0); //@line 256 "json-parser/json.c"
 HEAP32[$20>>2] = -1; //@line 256 "json-parser/json.c"
 $21 = HEAP32[$19>>2]|0; //@line 258 "json-parser/json.c"
 $22 = (($21) + -8)|0; //@line 258 "json-parser/json.c"
 HEAP32[$19>>2] = $22; //@line 258 "json-parser/json.c"
 $23 = HEAP32[$20>>2]|0; //@line 259 "json-parser/json.c"
 $24 = (($23) + -8)|0; //@line 259 "json-parser/json.c"
 HEAP32[$20>>2] = $24; //@line 259 "json-parser/json.c"
 $25 = ((($state)) + 36|0); //@line 261 "json-parser/json.c"
 HEAP32[$25>>2] = 1; //@line 261 "json-parser/json.c"
 $26 = ((($state)) + 44|0); //@line 271 "json-parser/json.c"
 $27 = ((($state)) + 40|0); //@line 273 "json-parser/json.c"
 $28 = ((($state)) + 16|0); //@line 434 "json-parser/json.c"
 $29 = ((($state)) + 48|0); //@line 696 "json-parser/json.c"
 $30 = $11; //@line 596 "json-parser/json.c"
 $31 = $11; //@line 612 "json-parser/json.c"
 $32 = $11; //@line 627 "json-parser/json.c"
 $33 = ((($state)) + 48|0); //@line 517 "json-parser/json.c"
 $34 = ((($state)) + 48|0); //@line 501 "json-parser/json.c"
 $$sum = (($$07) + -1)|0; //@line 456 "json-parser/json.c"
 $35 = (($$06) + ($$sum)|0); //@line 456 "json-parser/json.c"
 $36 = $11; //@line 300 "json-parser/json.c"
 $641 = 0;$642 = 0;$num_digits$0141 = 0;$num_e$0142 = 0;
 L13: while(1) {
  HEAP32[$root>>2] = 0; //@line 268 "json-parser/json.c"
  HEAP32[$top>>2] = 0; //@line 268 "json-parser/json.c"
  HEAP32[$26>>2] = 1; //@line 271 "json-parser/json.c"
  $475 = $641;$476 = $642;$flags$0 = 8;$num_digits$1 = $num_digits$0141;$num_e$1 = $num_e$0142;$storemerge8 = $$06;$string$0 = 0;$string_length$0 = 0;
  L15: while(1) {
   HEAP32[$27>>2] = $storemerge8; //@line 273 "json-parser/json.c"
   $37 = ($storemerge8|0)==($11|0); //@line 275 "json-parser/json.c"
   if ($37) {
    $41 = 0;
   } else {
    $38 = HEAP8[$storemerge8>>0]|0; //@line 275 "json-parser/json.c"
    $39 = $38 << 24 >> 24; //@line 275 "json-parser/json.c"
    $41 = $39;
   }
   $40 = $41&255; //@line 275 "json-parser/json.c"
   $42 = $flags$0 & 32; //@line 277 "json-parser/json.c"
   $43 = ($42|0)==(0); //@line 277 "json-parser/json.c"
   L20: do {
    if ($43) {
     $flags$1 = $flags$0;$string$1 = $string$0;
     label = 81;
    } else {
     $44 = ($40<<24>>24)==(0); //@line 279 "json-parser/json.c"
     if ($44) {
      label = 16;
      break L13;
     }
     $48 = HEAP32[$19>>2]|0; //@line 284 "json-parser/json.c"
     $49 = ($string_length$0>>>0)>($48>>>0); //@line 284 "json-parser/json.c"
     if ($49) {
      label = 219;
      break L13;
     }
     $50 = $flags$0 & 16; //@line 287 "json-parser/json.c"
     $51 = ($50|0)==(0); //@line 287 "json-parser/json.c"
     if ($51) {
      $211 = ($41|0)==(92); //@line 382 "json-parser/json.c"
      if ($211) {
       $212 = $flags$0 | 16; //@line 384 "json-parser/json.c"
       $643 = $475;$644 = $476;$flags$6 = $212;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $string_length$0;
       break;
      }
      $213 = ($41|0)==(34); //@line 388 "json-parser/json.c"
      $214 = HEAP32[$25>>2]|0; //@line 390 "json-parser/json.c"
      $215 = ($214|0)!=(0); //@line 390 "json-parser/json.c"
      if (!($213)) {
       if (!($215)) {
        $249 = (($string$0) + ($string_length$0)|0); //@line 429 "json-parser/json.c"
        HEAP8[$249>>0] = $40; //@line 429 "json-parser/json.c"
       }
       $250 = (($string_length$0) + 1)|0; //@line 429 "json-parser/json.c"
       $643 = $475;$644 = $476;$flags$6 = $flags$0;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $250;
       break;
      }
      if (!($215)) {
       $216 = (($string$0) + ($string_length$0)|0); //@line 391 "json-parser/json.c"
       HEAP8[$216>>0] = 0; //@line 391 "json-parser/json.c"
      }
      $217 = $flags$0 & -33; //@line 393 "json-parser/json.c"
      $218 = HEAP32[$top>>2]|0; //@line 396 "json-parser/json.c"
      $219 = ((($218)) + 4|0); //@line 396 "json-parser/json.c"
      $220 = HEAP32[$219>>2]|0; //@line 396 "json-parser/json.c"
      if ((($220|0) == 5)) {
       $221 = ((($218)) + 8|0); //@line 400 "json-parser/json.c"
       HEAP32[$221>>2] = $string_length$0; //@line 400 "json-parser/json.c"
       $222 = $217 | 1; //@line 401 "json-parser/json.c"
       $flags$1 = $222;$string$1 = 0;
       label = 81;
       break;
      } else if (!((($220|0) == 1))) {
       $flags$1 = $217;$string$1 = 0;
       label = 81;
       break;
      }
      $223 = HEAP32[$25>>2]|0; //@line 407 "json-parser/json.c"
      $224 = ($223|0)==(0); //@line 407 "json-parser/json.c"
      if ($224) {
       $230 = ((($218)) + 16|0); //@line 412 "json-parser/json.c"
       $231 = HEAP32[$230>>2]|0; //@line 412 "json-parser/json.c"
       $232 = ((($218)) + 8|0); //@line 411 "json-parser/json.c"
       $233 = HEAP32[$232>>2]|0; //@line 411 "json-parser/json.c"
       $234 = ((($232)) + 4|0); //@line 411 "json-parser/json.c"
       $235 = HEAP32[$234>>2]|0; //@line 411 "json-parser/json.c"
       $236 = (($235) + (($233*12)|0)|0); //@line 411 "json-parser/json.c"
       HEAP32[$236>>2] = $231; //@line 412 "json-parser/json.c"
       $237 = HEAP32[$top>>2]|0; //@line 414 "json-parser/json.c"
       $238 = ((($237)) + 8|0); //@line 414 "json-parser/json.c"
       $239 = HEAP32[$238>>2]|0; //@line 414 "json-parser/json.c"
       $240 = ((($238)) + 4|0); //@line 414 "json-parser/json.c"
       $241 = HEAP32[$240>>2]|0; //@line 414 "json-parser/json.c"
       $242 = (((($241) + (($239*12)|0)|0)) + 4|0); //@line 414 "json-parser/json.c"
       HEAP32[$242>>2] = $string_length$0; //@line 415 "json-parser/json.c"
       $243 = (($string_length$0) + 1)|0; //@line 417 "json-parser/json.c"
       $244 = HEAP32[$top>>2]|0; //@line 417 "json-parser/json.c"
       $245 = ((($244)) + 16|0); //@line 417 "json-parser/json.c"
       $246 = HEAP32[$245>>2]|0; //@line 417 "json-parser/json.c"
       $247 = (($246) + ($243)|0); //@line 417 "json-parser/json.c"
       HEAP32[$245>>2] = $247; //@line 417 "json-parser/json.c"
      } else {
       $225 = (($string_length$0) + 1)|0; //@line 408 "json-parser/json.c"
       $226 = ((($218)) + 8|0); //@line 408 "json-parser/json.c"
       $227 = ((($226)) + 4|0); //@line 408 "json-parser/json.c"
       $228 = HEAP32[$227>>2]|0; //@line 408 "json-parser/json.c"
       $229 = (($228) + ($225)|0); //@line 408 "json-parser/json.c"
       HEAP32[$227>>2] = $229; //@line 408 "json-parser/json.c"
      }
      $248 = $217 | 72; //@line 420 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $248;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = 0;$string_length$2 = $string_length$0;
      break;
     }
     $52 = $flags$0 & -17; //@line 289 "json-parser/json.c"
     switch ($41|0) {
     case 98:  {
      $53 = HEAP32[$25>>2]|0; //@line 293 "json-parser/json.c"
      $54 = ($53|0)==(0); //@line 293 "json-parser/json.c"
      if ($54) {
       $55 = (($string$0) + ($string_length$0)|0); //@line 293 "json-parser/json.c"
       HEAP8[$55>>0] = 8; //@line 293 "json-parser/json.c"
      }
      $56 = (($string_length$0) + 1)|0; //@line 293 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $56;
      break L20;
      break;
     }
     case 110:  {
      $61 = HEAP32[$25>>2]|0; //@line 295 "json-parser/json.c"
      $62 = ($61|0)==(0); //@line 295 "json-parser/json.c"
      if ($62) {
       $63 = (($string$0) + ($string_length$0)|0); //@line 295 "json-parser/json.c"
       HEAP8[$63>>0] = 10; //@line 295 "json-parser/json.c"
      }
      $64 = (($string_length$0) + 1)|0; //@line 295 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $64;
      break L20;
      break;
     }
     case 114:  {
      $65 = HEAP32[$25>>2]|0; //@line 296 "json-parser/json.c"
      $66 = ($65|0)==(0); //@line 296 "json-parser/json.c"
      if ($66) {
       $67 = (($string$0) + ($string_length$0)|0); //@line 296 "json-parser/json.c"
       HEAP8[$67>>0] = 13; //@line 296 "json-parser/json.c"
      }
      $68 = (($string_length$0) + 1)|0; //@line 296 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $68;
      break L20;
      break;
     }
     case 116:  {
      $69 = HEAP32[$25>>2]|0; //@line 297 "json-parser/json.c"
      $70 = ($69|0)==(0); //@line 297 "json-parser/json.c"
      if ($70) {
       $71 = (($string$0) + ($string_length$0)|0); //@line 297 "json-parser/json.c"
       HEAP8[$71>>0] = 9; //@line 297 "json-parser/json.c"
      }
      $72 = (($string_length$0) + 1)|0; //@line 297 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $72;
      break L20;
      break;
     }
     case 117:  {
      $73 = HEAP32[$27>>2]|0; //@line 300 "json-parser/json.c"
      $74 = $73; //@line 300 "json-parser/json.c"
      $75 = (($36) - ($74))|0; //@line 300 "json-parser/json.c"
      $76 = ($75|0)<(4); //@line 300 "json-parser/json.c"
      if ($76) {
       $$lcssa544 = $41;
       label = 40;
       break L13;
      }
      $77 = ((($73)) + 1|0); //@line 301 "json-parser/json.c"
      HEAP32[$27>>2] = $77; //@line 301 "json-parser/json.c"
      $78 = HEAP8[$77>>0]|0; //@line 301 "json-parser/json.c"
      $79 = (_hex_value($78)|0); //@line 301 "json-parser/json.c"
      $80 = $79&255; //@line 301 "json-parser/json.c"
      $81 = ($79<<24>>24)==(-1); //@line 301 "json-parser/json.c"
      if ($81) {
       $$lcssa544 = $41;
       label = 40;
       break L13;
      }
      $82 = ((($73)) + 2|0); //@line 302 "json-parser/json.c"
      HEAP32[$27>>2] = $82; //@line 302 "json-parser/json.c"
      $83 = HEAP8[$82>>0]|0; //@line 302 "json-parser/json.c"
      $84 = (_hex_value($83)|0); //@line 302 "json-parser/json.c"
      $85 = $84&255; //@line 302 "json-parser/json.c"
      $86 = ($84<<24>>24)==(-1); //@line 302 "json-parser/json.c"
      if ($86) {
       $$lcssa544 = $41;
       label = 40;
       break L13;
      }
      $87 = ((($73)) + 3|0); //@line 303 "json-parser/json.c"
      HEAP32[$27>>2] = $87; //@line 303 "json-parser/json.c"
      $88 = HEAP8[$87>>0]|0; //@line 303 "json-parser/json.c"
      $89 = (_hex_value($88)|0); //@line 303 "json-parser/json.c"
      $90 = $89&255; //@line 303 "json-parser/json.c"
      $91 = ($89<<24>>24)==(-1); //@line 303 "json-parser/json.c"
      if ($91) {
       $$lcssa544 = $41;
       label = 40;
       break L13;
      }
      $92 = ((($73)) + 4|0); //@line 304 "json-parser/json.c"
      HEAP32[$27>>2] = $92; //@line 304 "json-parser/json.c"
      $93 = HEAP8[$92>>0]|0; //@line 304 "json-parser/json.c"
      $94 = (_hex_value($93)|0); //@line 304 "json-parser/json.c"
      $95 = ($94<<24>>24)==(-1); //@line 304 "json-parser/json.c"
      if ($95) {
       $$lcssa544 = $41;
       label = 40;
       break L13;
      }
      $99 = $94&255; //@line 304 "json-parser/json.c"
      $100 = $80 << 4; //@line 310 "json-parser/json.c"
      $101 = $90 << 4; //@line 311 "json-parser/json.c"
      $$masked = $100 & 240; //@line 312 "json-parser/json.c"
      $102 = $85 | $$masked; //@line 312 "json-parser/json.c"
      $103 = $102 << 8; //@line 312 "json-parser/json.c"
      $$masked13 = $101 & 240; //@line 312 "json-parser/json.c"
      $104 = $99 | $$masked13; //@line 312 "json-parser/json.c"
      $105 = $104 | $103; //@line 312 "json-parser/json.c"
      $106 = $103 & 63488; //@line 314 "json-parser/json.c"
      $107 = ($106|0)==(55296); //@line 314 "json-parser/json.c"
      if ($107) {
       $108 = $92; //@line 317 "json-parser/json.c"
       $109 = (($36) - ($108))|0; //@line 317 "json-parser/json.c"
       $110 = ($109|0)<(6); //@line 317 "json-parser/json.c"
       if ($110) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $111 = ((($73)) + 5|0); //@line 317 "json-parser/json.c"
       HEAP32[$27>>2] = $111; //@line 317 "json-parser/json.c"
       $112 = HEAP8[$111>>0]|0; //@line 317 "json-parser/json.c"
       $113 = ($112<<24>>24)==(92); //@line 317 "json-parser/json.c"
       if (!($113)) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $114 = ((($73)) + 6|0); //@line 317 "json-parser/json.c"
       HEAP32[$27>>2] = $114; //@line 317 "json-parser/json.c"
       $115 = HEAP8[$114>>0]|0; //@line 317 "json-parser/json.c"
       $116 = ($115<<24>>24)==(117); //@line 317 "json-parser/json.c"
       if (!($116)) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $117 = ((($73)) + 7|0); //@line 318 "json-parser/json.c"
       HEAP32[$27>>2] = $117; //@line 318 "json-parser/json.c"
       $118 = HEAP8[$117>>0]|0; //@line 318 "json-parser/json.c"
       $119 = (_hex_value($118)|0); //@line 318 "json-parser/json.c"
       $120 = ($119<<24>>24)==(-1); //@line 318 "json-parser/json.c"
       if ($120) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $121 = ((($73)) + 8|0); //@line 319 "json-parser/json.c"
       HEAP32[$27>>2] = $121; //@line 319 "json-parser/json.c"
       $122 = HEAP8[$121>>0]|0; //@line 319 "json-parser/json.c"
       $123 = (_hex_value($122)|0); //@line 319 "json-parser/json.c"
       $124 = $123&255; //@line 319 "json-parser/json.c"
       $125 = ($123<<24>>24)==(-1); //@line 319 "json-parser/json.c"
       if ($125) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $126 = ((($73)) + 9|0); //@line 320 "json-parser/json.c"
       HEAP32[$27>>2] = $126; //@line 320 "json-parser/json.c"
       $127 = HEAP8[$126>>0]|0; //@line 320 "json-parser/json.c"
       $128 = (_hex_value($127)|0); //@line 320 "json-parser/json.c"
       $129 = $128&255; //@line 320 "json-parser/json.c"
       $130 = ($128<<24>>24)==(-1); //@line 320 "json-parser/json.c"
       if ($130) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $131 = ((($73)) + 10|0); //@line 321 "json-parser/json.c"
       HEAP32[$27>>2] = $131; //@line 321 "json-parser/json.c"
       $132 = HEAP8[$131>>0]|0; //@line 321 "json-parser/json.c"
       $133 = (_hex_value($132)|0); //@line 321 "json-parser/json.c"
       $134 = ($133<<24>>24)==(-1); //@line 321 "json-parser/json.c"
       if ($134) {
        $$lcssa545 = $41;
        label = 49;
        break L13;
       }
       $138 = $133&255; //@line 321 "json-parser/json.c"
       $139 = $129 << 4; //@line 328 "json-parser/json.c"
       $140 = $124 << 8; //@line 329 "json-parser/json.c"
       $$masked15 = $139 & 240; //@line 329 "json-parser/json.c"
       $141 = $105 << 10; //@line 331 "json-parser/json.c"
       $142 = $141 & 982016; //@line 331 "json-parser/json.c"
       $$masked16 = $140 & 768; //@line 331 "json-parser/json.c"
       $143 = $142 | $$masked16; //@line 331 "json-parser/json.c"
       $144 = $143 | $$masked15; //@line 331 "json-parser/json.c"
       $145 = $144 | $138; //@line 331 "json-parser/json.c"
       $146 = HEAP32[$25>>2]|0; //@line 353 "json-parser/json.c"
       $147 = ($146|0)==(0); //@line 353 "json-parser/json.c"
       if ($147) {
        $186 = $142 >>> 18; //@line 367 "json-parser/json.c"
        $187 = $186 | 240; //@line 367 "json-parser/json.c"
        $188 = $187&255; //@line 367 "json-parser/json.c"
        $189 = (($string_length$0) + 1)|0; //@line 367 "json-parser/json.c"
        $190 = (($string$0) + ($string_length$0)|0); //@line 367 "json-parser/json.c"
        HEAP8[$190>>0] = $188; //@line 367 "json-parser/json.c"
        $191 = $104 >>> 2; //@line 368 "json-parser/json.c"
        $192 = $191 | 144; //@line 368 "json-parser/json.c"
        $193 = $192&255; //@line 368 "json-parser/json.c"
        $194 = (($string_length$0) + 2)|0; //@line 368 "json-parser/json.c"
        $195 = (($string$0) + ($189)|0); //@line 368 "json-parser/json.c"
        HEAP8[$195>>0] = $193; //@line 368 "json-parser/json.c"
        $196 = $145 >>> 6; //@line 369 "json-parser/json.c"
        $197 = $196 & 63; //@line 369 "json-parser/json.c"
        $198 = $197 | 128; //@line 369 "json-parser/json.c"
        $199 = $198&255; //@line 369 "json-parser/json.c"
        $200 = (($string_length$0) + 3)|0; //@line 369 "json-parser/json.c"
        $201 = (($string$0) + ($194)|0); //@line 369 "json-parser/json.c"
        HEAP8[$201>>0] = $199; //@line 369 "json-parser/json.c"
        $202 = $145 & 63; //@line 370 "json-parser/json.c"
        $203 = $202 | 128; //@line 370 "json-parser/json.c"
        $204 = $203&255; //@line 370 "json-parser/json.c"
        $205 = (($string_length$0) + 4)|0; //@line 370 "json-parser/json.c"
        $206 = (($string$0) + ($200)|0); //@line 370 "json-parser/json.c"
        HEAP8[$206>>0] = $204; //@line 370 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $205;
        break L20;
       } else {
        $185 = (($string_length$0) + 4)|0; //@line 365 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $185;
        break L20;
       }
      }
      $148 = ($105>>>0)<(128); //@line 334 "json-parser/json.c"
      if ($148) {
       $149 = HEAP32[$25>>2]|0; //@line 336 "json-parser/json.c"
       $150 = ($149|0)==(0); //@line 336 "json-parser/json.c"
       if ($150) {
        $151 = $104&255; //@line 336 "json-parser/json.c"
        $152 = (($string$0) + ($string_length$0)|0); //@line 336 "json-parser/json.c"
        HEAP8[$152>>0] = $151; //@line 336 "json-parser/json.c"
       }
       $153 = (($string_length$0) + 1)|0; //@line 336 "json-parser/json.c"
       $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $153;
       break L20;
      }
      $154 = ($105>>>0)<(2048); //@line 340 "json-parser/json.c"
      $155 = HEAP32[$25>>2]|0; //@line 342 "json-parser/json.c"
      $156 = ($155|0)==(0); //@line 342 "json-parser/json.c"
      if ($154) {
       if ($156) {
        $158 = $105 >>> 6; //@line 345 "json-parser/json.c"
        $159 = $158 | 192; //@line 345 "json-parser/json.c"
        $160 = $159&255; //@line 345 "json-parser/json.c"
        $161 = (($string_length$0) + 1)|0; //@line 345 "json-parser/json.c"
        $162 = (($string$0) + ($string_length$0)|0); //@line 345 "json-parser/json.c"
        HEAP8[$162>>0] = $160; //@line 345 "json-parser/json.c"
        $163 = $104 & 63; //@line 346 "json-parser/json.c"
        $164 = $163 | 128; //@line 346 "json-parser/json.c"
        $165 = $164&255; //@line 346 "json-parser/json.c"
        $166 = (($string_length$0) + 2)|0; //@line 346 "json-parser/json.c"
        $167 = (($string$0) + ($161)|0); //@line 346 "json-parser/json.c"
        HEAP8[$167>>0] = $165; //@line 346 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $166;
        break L20;
       } else {
        $157 = (($string_length$0) + 2)|0; //@line 343 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $157;
        break L20;
       }
      } else {
       if ($156) {
        $169 = $102 >>> 4; //@line 356 "json-parser/json.c"
        $170 = $169 | 224; //@line 356 "json-parser/json.c"
        $171 = $170&255; //@line 356 "json-parser/json.c"
        $172 = (($string_length$0) + 1)|0; //@line 356 "json-parser/json.c"
        $173 = (($string$0) + ($string_length$0)|0); //@line 356 "json-parser/json.c"
        HEAP8[$173>>0] = $171; //@line 356 "json-parser/json.c"
        $174 = $105 >>> 6; //@line 357 "json-parser/json.c"
        $175 = $174 & 63; //@line 357 "json-parser/json.c"
        $176 = $175 | 128; //@line 357 "json-parser/json.c"
        $177 = $176&255; //@line 357 "json-parser/json.c"
        $178 = (($string_length$0) + 2)|0; //@line 357 "json-parser/json.c"
        $179 = (($string$0) + ($172)|0); //@line 357 "json-parser/json.c"
        HEAP8[$179>>0] = $177; //@line 357 "json-parser/json.c"
        $180 = $104 & 63; //@line 358 "json-parser/json.c"
        $181 = $180 | 128; //@line 358 "json-parser/json.c"
        $182 = $181&255; //@line 358 "json-parser/json.c"
        $183 = (($string_length$0) + 3)|0; //@line 358 "json-parser/json.c"
        $184 = (($string$0) + ($178)|0); //@line 358 "json-parser/json.c"
        HEAP8[$184>>0] = $182; //@line 358 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $183;
        break L20;
       } else {
        $168 = (($string_length$0) + 3)|0; //@line 354 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $168;
        break L20;
       }
      }
      break;
     }
     case 102:  {
      $57 = HEAP32[$25>>2]|0; //@line 294 "json-parser/json.c"
      $58 = ($57|0)==(0); //@line 294 "json-parser/json.c"
      if ($58) {
       $59 = (($string$0) + ($string_length$0)|0); //@line 294 "json-parser/json.c"
       HEAP8[$59>>0] = 12; //@line 294 "json-parser/json.c"
      }
      $60 = (($string_length$0) + 1)|0; //@line 294 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $60;
      break L20;
      break;
     }
     default: {
      $207 = HEAP32[$25>>2]|0; //@line 376 "json-parser/json.c"
      $208 = ($207|0)==(0); //@line 376 "json-parser/json.c"
      if ($208) {
       $209 = (($string$0) + ($string_length$0)|0); //@line 376 "json-parser/json.c"
       HEAP8[$209>>0] = $40; //@line 376 "json-parser/json.c"
      }
      $210 = (($string_length$0) + 1)|0; //@line 376 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $52;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$0;$string_length$2 = $210;
      break L20;
     }
     }
    }
   } while(0);
   L105: do {
    if ((label|0) == 81) {
     label = 0;
     $251 = HEAP32[$28>>2]|0; //@line 434 "json-parser/json.c"
     $252 = $251 & 1; //@line 434 "json-parser/json.c"
     $253 = ($252|0)==(0); //@line 434 "json-parser/json.c"
     do {
      if (!($253)) {
       $254 = $flags$1 & 24576; //@line 436 "json-parser/json.c"
       $255 = ($254|0)==(0); //@line 436 "json-parser/json.c"
       if ($255) {
        $277 = ($41|0)==(47); //@line 465 "json-parser/json.c"
        if (!($277)) {
         break;
        }
        $278 = $flags$1 & 136; //@line 467 "json-parser/json.c"
        $279 = ($278|0)==(0); //@line 467 "json-parser/json.c"
        if ($279) {
         $280 = HEAP32[$top>>2]|0; //@line 467 "json-parser/json.c"
         $281 = ((($280)) + 4|0); //@line 467 "json-parser/json.c"
         $282 = HEAP32[$281>>2]|0; //@line 467 "json-parser/json.c"
         $283 = ($282|0)==(1); //@line 467 "json-parser/json.c"
         if (!($283)) {
          label = 97;
          break L13;
         }
        }
        $287 = HEAP32[$27>>2]|0; //@line 472 "json-parser/json.c"
        $288 = ((($287)) + 1|0); //@line 472 "json-parser/json.c"
        HEAP32[$27>>2] = $288; //@line 472 "json-parser/json.c"
        $289 = ($288|0)==($11|0); //@line 472 "json-parser/json.c"
        if ($289) {
         label = 99;
         break L13;
        }
        $293 = HEAP8[$288>>0]|0; //@line 477 "json-parser/json.c"
        $294 = $293 << 24 >> 24; //@line 477 "json-parser/json.c"
        if ((($294|0) == 47)) {
         $295 = $flags$1 | 8192; //@line 480 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $295;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        } else if ((($294|0) == 42)) {
         $296 = $flags$1 | 16384; //@line 484 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $296;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        } else {
         $$lcssa = $294;
         label = 103;
         break L13;
        }
       }
       $256 = $flags$1 & 8192; //@line 438 "json-parser/json.c"
       $257 = ($256|0)==(0); //@line 438 "json-parser/json.c"
       if (!($257)) {
        $258 = ($41|0)==(13); //@line 440 "json-parser/json.c"
        if (!($258)) {
         $259 = ($41|0)!=(10); //@line 440 "json-parser/json.c"
         $260 = ($40<<24>>24)!=(0); //@line 440 "json-parser/json.c"
         $or$cond = $259 & $260; //@line 440 "json-parser/json.c"
         if ($or$cond) {
          $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
          break L105;
         }
        }
        $261 = $flags$1 & -8193; //@line 442 "json-parser/json.c"
        $262 = HEAP32[$27>>2]|0; //@line 443 "json-parser/json.c"
        $263 = ((($262)) + -1|0); //@line 443 "json-parser/json.c"
        HEAP32[$27>>2] = $263; //@line 443 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $261;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
        break L105;
       }
       $264 = $flags$1 & 16384; //@line 449 "json-parser/json.c"
       $265 = ($264|0)==(0); //@line 449 "json-parser/json.c"
       if (!($265)) {
        $266 = ($40<<24>>24)==(0); //@line 451 "json-parser/json.c"
        if ($266) {
         label = 89;
         break L13;
        }
        $270 = ($41|0)==(42); //@line 456 "json-parser/json.c"
        if (!($270)) {
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $271 = HEAP32[$27>>2]|0; //@line 456 "json-parser/json.c"
        $272 = ($271>>>0)<($35>>>0); //@line 456 "json-parser/json.c"
        if (!($272)) {
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $273 = ((($271)) + 1|0); //@line 456 "json-parser/json.c"
        $274 = HEAP8[$273>>0]|0; //@line 456 "json-parser/json.c"
        $275 = ($274<<24>>24)==(47); //@line 456 "json-parser/json.c"
        if (!($275)) {
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $276 = $flags$1 & -16385; //@line 458 "json-parser/json.c"
        HEAP32[$27>>2] = $273; //@line 459 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $276;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
        break L105;
       }
      }
     } while(0);
     $300 = $flags$1 & 128; //@line 494 "json-parser/json.c"
     $301 = ($300|0)==(0); //@line 494 "json-parser/json.c"
     if (!($301)) {
      $302 = ($40<<24>>24)==(0); //@line 496 "json-parser/json.c"
      if ($302) {
       $645 = $475;$646 = $476;$num_digits$1$lcssa487 = $num_digits$1;$num_e$1$lcssa508 = $num_e$1;
       break L15;
      }
      if ((($41|0) == 13) | (($41|0) == 9) | (($41|0) == 32)) {
       $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
       break;
      } else if (!((($41|0) == 10))) {
       $$lcssa551 = $41;
       label = 108;
       break L13;
      }
      $303 = HEAP32[$26>>2]|0; //@line 501 "json-parser/json.c"
      $304 = (($303) + 1)|0; //@line 501 "json-parser/json.c"
      HEAP32[$26>>2] = $304; //@line 501 "json-parser/json.c"
      HEAP32[$34>>2] = 0; //@line 501 "json-parser/json.c"
      $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
      break;
     }
     $308 = $flags$1 & 8; //@line 513 "json-parser/json.c"
     $309 = ($308|0)==(0); //@line 513 "json-parser/json.c"
     L137: do {
      if ($309) {
       $419 = HEAP32[$top>>2]|0; //@line 690 "json-parser/json.c"
       $420 = ((($419)) + 4|0); //@line 690 "json-parser/json.c"
       $421 = HEAP32[$420>>2]|0; //@line 690 "json-parser/json.c"
       if ((($421|0) == 1)) {
        switch ($41|0) {
        case 10:  {
         $422 = HEAP32[$26>>2]|0; //@line 696 "json-parser/json.c"
         $423 = (($422) + 1)|0; //@line 696 "json-parser/json.c"
         HEAP32[$26>>2] = $423; //@line 696 "json-parser/json.c"
         HEAP32[$29>>2] = 0; //@line 696 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
         break;
        }
        case 34:  {
         $424 = $flags$1 & 4; //@line 701 "json-parser/json.c"
         $425 = ($424|0)==(0); //@line 701 "json-parser/json.c"
         if (!($425)) {
          label = 165;
          break L13;
         }
         $429 = $flags$1 | 32; //@line 706 "json-parser/json.c"
         $430 = ((($419)) + 16|0); //@line 708 "json-parser/json.c"
         $431 = HEAP32[$430>>2]|0; //@line 708 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $429;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $431;$string_length$1 = 0;
         break L137;
         break;
        }
        case 125:  {
         $432 = $flags$1 & -6; //@line 715 "json-parser/json.c"
         $433 = $432 | 1; //@line 715 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $433;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
         break;
        }
        case 44:  {
         $434 = $flags$1 & 4; //@line 720 "json-parser/json.c"
         $435 = ($434|0)==(0); //@line 720 "json-parser/json.c"
         if ($435) {
          $$lcssa562 = $41;
          label = 170;
          break L13;
         }
         $436 = $flags$1 & -5; //@line 722 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $436;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
         break;
        }
        case 13: case 9: case 32:  {
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
         break;
        }
        default: {
         $$lcssa562 = $41;
         label = 170;
         break L13;
        }
        }
       } else if (!((($421|0) == 4) | (($421|0) == 3))) {
        $647 = $475;$648 = $476;$flags$3 = $flags$1;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
        break;
       }
       $isdigittmp = (($41) + -48)|0; //@line 736 "json-parser/json.c"
       $isdigit = ($isdigittmp>>>0)<(10); //@line 736 "json-parser/json.c"
       if ($isdigit) {
        $440 = (($num_digits$1) + 1)|0; //@line 738 "json-parser/json.c"
        $441 = HEAP32[$top>>2]|0; //@line 740 "json-parser/json.c"
        $442 = ((($441)) + 4|0); //@line 740 "json-parser/json.c"
        $443 = HEAP32[$442>>2]|0; //@line 740 "json-parser/json.c"
        $444 = ($443|0)!=(3); //@line 740 "json-parser/json.c"
        $445 = $flags$1 & 1024;
        $446 = ($445|0)==(0); //@line 740 "json-parser/json.c"
        $or$cond24 = $446 & $444; //@line 740 "json-parser/json.c"
        if ($or$cond24) {
         $477 = (___muldi3(($475|0),($476|0),10,0)|0); //@line 763 "json-parser/json.c"
         $478 = tempRet0; //@line 763 "json-parser/json.c"
         $479 = ($isdigittmp|0)<(0); //@line 763 "json-parser/json.c"
         $480 = $479 << 31 >> 31; //@line 763 "json-parser/json.c"
         $481 = (_i64Add(($isdigittmp|0),($480|0),($477|0),($478|0))|0); //@line 763 "json-parser/json.c"
         $482 = tempRet0; //@line 763 "json-parser/json.c"
         $643 = $481;$644 = $482;$flags$6 = $flags$1;$num_digits$3 = $440;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        if (!($446)) {
         $472 = $flags$1 | 2048; //@line 754 "json-parser/json.c"
         $473 = ($num_e$1*10)|0; //@line 755 "json-parser/json.c"
         $474 = (($isdigittmp) + ($473))|0; //@line 755 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $472;$num_digits$3 = $440;$num_e$3 = $474;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $447 = $flags$1 & 512; //@line 744 "json-parser/json.c"
        $448 = ($447|0)==(0); //@line 744 "json-parser/json.c"
        if (!($448)) {
         $$lcssa561 = $41;
         label = 175;
         break L13;
        }
        $452 = ($num_digits$1|0)==(0); //@line 749 "json-parser/json.c"
        $453 = ($41|0)==(48); //@line 749 "json-parser/json.c"
        $or$cond25 = $452 & $453; //@line 749 "json-parser/json.c"
        $454 = $flags$1 | 512; //@line 750 "json-parser/json.c"
        $flags$2 = $or$cond25 ? $454 : $flags$1; //@line 749 "json-parser/json.c"
        $455 = ((($441)) + 8|0); //@line 759 "json-parser/json.c"
        $456 = $455; //@line 759 "json-parser/json.c"
        $457 = $456; //@line 759 "json-parser/json.c"
        $458 = HEAP32[$457>>2]|0; //@line 759 "json-parser/json.c"
        $459 = (($456) + 4)|0; //@line 759 "json-parser/json.c"
        $460 = $459; //@line 759 "json-parser/json.c"
        $461 = HEAP32[$460>>2]|0; //@line 759 "json-parser/json.c"
        $462 = (___muldi3(($458|0),($461|0),10,0)|0); //@line 759 "json-parser/json.c"
        $463 = tempRet0; //@line 759 "json-parser/json.c"
        $464 = ($isdigittmp|0)<(0); //@line 759 "json-parser/json.c"
        $465 = $464 << 31 >> 31; //@line 759 "json-parser/json.c"
        $466 = (_i64Add(($462|0),($463|0),($isdigittmp|0),($465|0))|0); //@line 759 "json-parser/json.c"
        $467 = tempRet0; //@line 759 "json-parser/json.c"
        $468 = $455; //@line 759 "json-parser/json.c"
        $469 = $468; //@line 759 "json-parser/json.c"
        HEAP32[$469>>2] = $466; //@line 759 "json-parser/json.c"
        $470 = (($468) + 4)|0; //@line 759 "json-parser/json.c"
        $471 = $470; //@line 759 "json-parser/json.c"
        HEAP32[$471>>2] = $467; //@line 759 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $flags$2;$num_digits$3 = $440;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
        break L105;
       }
       if ((($41|0) == 45) | (($41|0) == 43)) {
        $483 = $flags$1 & 3072; //@line 769 "json-parser/json.c"
        $484 = ($483|0)==(1024); //@line 769 "json-parser/json.c"
        if ($484) {
         $485 = ($41|0)==(45); //@line 773 "json-parser/json.c"
         $$$v = $485 ? 6144 : 2048; //@line 773 "json-parser/json.c"
         $$ = $flags$1 | $$$v; //@line 773 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $$;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
       } else if ((($41|0) == 46)) {
        $486 = HEAP32[$top>>2]|0; //@line 779 "json-parser/json.c"
        $487 = ((($486)) + 4|0); //@line 779 "json-parser/json.c"
        $488 = HEAP32[$487>>2]|0; //@line 779 "json-parser/json.c"
        $489 = ($488|0)==(3); //@line 779 "json-parser/json.c"
        if ($489) {
         $490 = ($num_digits$1|0)==(0); //@line 781 "json-parser/json.c"
         if ($490) {
          label = 184;
          break L13;
         }
         HEAP32[$487>>2] = 4; //@line 786 "json-parser/json.c"
         $494 = HEAP32[$top>>2]|0; //@line 787 "json-parser/json.c"
         $495 = ((($494)) + 8|0); //@line 787 "json-parser/json.c"
         $496 = $495; //@line 787 "json-parser/json.c"
         $497 = $496; //@line 787 "json-parser/json.c"
         $498 = HEAP32[$497>>2]|0; //@line 787 "json-parser/json.c"
         $499 = (($496) + 4)|0; //@line 787 "json-parser/json.c"
         $500 = $499; //@line 787 "json-parser/json.c"
         $501 = HEAP32[$500>>2]|0; //@line 787 "json-parser/json.c"
         $502 = (+($498>>>0)) + (4294967296.0*(+($501|0))); //@line 787 "json-parser/json.c"
         HEAPF64[$495>>3] = $502; //@line 787 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = 0;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
       }
       $503 = $flags$1 & 1024; //@line 793 "json-parser/json.c"
       $504 = ($503|0)==(0); //@line 793 "json-parser/json.c"
       if ($504) {
        $505 = HEAP32[$top>>2]|0; //@line 795 "json-parser/json.c"
        $506 = ((($505)) + 4|0); //@line 795 "json-parser/json.c"
        $507 = HEAP32[$506>>2]|0; //@line 795 "json-parser/json.c"
        $508 = ($507|0)==(4); //@line 795 "json-parser/json.c"
        if ($508) {
         $509 = ($num_digits$1|0)==(0); //@line 797 "json-parser/json.c"
         if ($509) {
          label = 189;
          break L13;
         }
         $513 = (+($475>>>0)) + (4294967296.0*(+($476|0))); //@line 802 "json-parser/json.c"
         $514 = (+($num_digits$1|0)); //@line 802 "json-parser/json.c"
         $515 = (+Math_pow(10.0,(+$514))); //@line 802 "json-parser/json.c"
         $516 = $513 / $515; //@line 802 "json-parser/json.c"
         $517 = ((($505)) + 8|0); //@line 802 "json-parser/json.c"
         $518 = +HEAPF64[$517>>3]; //@line 802 "json-parser/json.c"
         $519 = $516 + $518; //@line 802 "json-parser/json.c"
         HEAPF64[$517>>3] = $519; //@line 802 "json-parser/json.c"
        }
        if ((($41|0) == 69) | (($41|0) == 101)) {
         $520 = HEAP32[$top>>2]|0; //@line 809 "json-parser/json.c"
         $521 = ((($520)) + 4|0); //@line 809 "json-parser/json.c"
         $522 = HEAP32[$521>>2]|0; //@line 809 "json-parser/json.c"
         $523 = ($522|0)==(3); //@line 809 "json-parser/json.c"
         if ($523) {
          HEAP32[$521>>2] = 4; //@line 811 "json-parser/json.c"
          $524 = HEAP32[$top>>2]|0; //@line 812 "json-parser/json.c"
          $525 = ((($524)) + 8|0); //@line 812 "json-parser/json.c"
          $526 = $525; //@line 812 "json-parser/json.c"
          $527 = $526; //@line 812 "json-parser/json.c"
          $528 = HEAP32[$527>>2]|0; //@line 812 "json-parser/json.c"
          $529 = (($526) + 4)|0; //@line 812 "json-parser/json.c"
          $530 = $529; //@line 812 "json-parser/json.c"
          $531 = HEAP32[$530>>2]|0; //@line 812 "json-parser/json.c"
          $532 = (+($528>>>0)) + (4294967296.0*(+($531|0))); //@line 812 "json-parser/json.c"
          HEAPF64[$525>>3] = $532; //@line 812 "json-parser/json.c"
         }
         $533 = $flags$1 & -1537; //@line 816 "json-parser/json.c"
         $534 = $533 | 1024; //@line 816 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $534;$num_digits$3 = 0;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
       } else {
        $535 = ($num_digits$1|0)==(0); //@line 823 "json-parser/json.c"
        if ($535) {
         label = 196;
         break L13;
        }
        $539 = $flags$1 & 4096; //@line 829 "json-parser/json.c"
        $540 = ($539|0)!=(0); //@line 829 "json-parser/json.c"
        $541 = (0 - ($num_e$1))|0; //@line 829 "json-parser/json.c"
        $542 = $540 ? $541 : $num_e$1; //@line 829 "json-parser/json.c"
        $543 = (+($542|0)); //@line 828 "json-parser/json.c"
        $544 = (+Math_pow(10.0,(+$543))); //@line 828 "json-parser/json.c"
        $545 = HEAP32[$top>>2]|0; //@line 828 "json-parser/json.c"
        $546 = ((($545)) + 8|0); //@line 828 "json-parser/json.c"
        $547 = +HEAPF64[$546>>3]; //@line 828 "json-parser/json.c"
        $548 = $544 * $547; //@line 828 "json-parser/json.c"
        HEAPF64[$546>>3] = $548; //@line 828 "json-parser/json.c"
       }
       $549 = $flags$1 & 256; //@line 832 "json-parser/json.c"
       $550 = ($549|0)==(0); //@line 832 "json-parser/json.c"
       do {
        if (!($550)) {
         $551 = HEAP32[$top>>2]|0; //@line 834 "json-parser/json.c"
         $552 = ((($551)) + 4|0); //@line 834 "json-parser/json.c"
         $553 = HEAP32[$552>>2]|0; //@line 834 "json-parser/json.c"
         $554 = ($553|0)==(3); //@line 834 "json-parser/json.c"
         $555 = ((($551)) + 8|0); //@line 835 "json-parser/json.c"
         if ($554) {
          $556 = $555; //@line 835 "json-parser/json.c"
          $557 = $556; //@line 835 "json-parser/json.c"
          $558 = HEAP32[$557>>2]|0; //@line 835 "json-parser/json.c"
          $559 = (($556) + 4)|0; //@line 835 "json-parser/json.c"
          $560 = $559; //@line 835 "json-parser/json.c"
          $561 = HEAP32[$560>>2]|0; //@line 835 "json-parser/json.c"
          $562 = (_i64Subtract(0,0,($558|0),($561|0))|0); //@line 835 "json-parser/json.c"
          $563 = tempRet0; //@line 835 "json-parser/json.c"
          $564 = $555; //@line 835 "json-parser/json.c"
          $565 = $564; //@line 835 "json-parser/json.c"
          HEAP32[$565>>2] = $562; //@line 835 "json-parser/json.c"
          $566 = (($564) + 4)|0; //@line 835 "json-parser/json.c"
          $567 = $566; //@line 835 "json-parser/json.c"
          HEAP32[$567>>2] = $563; //@line 835 "json-parser/json.c"
          break;
         } else {
          $568 = +HEAPF64[$555>>3]; //@line 837 "json-parser/json.c"
          $569 = -$568; //@line 837 "json-parser/json.c"
          HEAPF64[$555>>3] = $569; //@line 837 "json-parser/json.c"
          break;
         }
        }
       } while(0);
       $570 = $flags$1 | 3; //@line 840 "json-parser/json.c"
       $647 = $475;$648 = $476;$flags$3 = $570;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
      } else {
       switch ($41|0) {
       case 10:  {
        $310 = HEAP32[$26>>2]|0; //@line 517 "json-parser/json.c"
        $311 = (($310) + 1)|0; //@line 517 "json-parser/json.c"
        HEAP32[$26>>2] = $311; //@line 517 "json-parser/json.c"
        HEAP32[$33>>2] = 0; //@line 517 "json-parser/json.c"
        $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
        break L105;
        break;
       }
       case 93:  {
        $312 = HEAP32[$top>>2]|0; //@line 522 "json-parser/json.c"
        $313 = ($312|0)==(0|0); //@line 522 "json-parser/json.c"
        if ($313) {
         label = 115;
         break L13;
        }
        $314 = ((($312)) + 4|0); //@line 522 "json-parser/json.c"
        $315 = HEAP32[$314>>2]|0; //@line 522 "json-parser/json.c"
        $316 = ($315|0)==(2); //@line 522 "json-parser/json.c"
        if (!($316)) {
         label = 115;
         break L13;
        }
        $317 = $flags$1 & -14; //@line 523 "json-parser/json.c"
        $318 = $317 | 1; //@line 523 "json-parser/json.c"
        $647 = $475;$648 = $476;$flags$3 = $318;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
        break L137;
        break;
       }
       case 13: case 9: case 32:  {
        $643 = $475;$644 = $476;$flags$6 = $flags$1;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
        break L105;
        break;
       }
       default: {
        $322 = $flags$1 & 4; //@line 533 "json-parser/json.c"
        $323 = ($322|0)==(0); //@line 533 "json-parser/json.c"
        if (!($323)) {
         $324 = ($41|0)==(44); //@line 535 "json-parser/json.c"
         if (!($324)) {
          $$lcssa553 = $41;
          label = 119;
          break L13;
         }
         $325 = $flags$1 & -5; //@line 536 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $325;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $329 = $flags$1 & 64; //@line 548 "json-parser/json.c"
        $330 = ($329|0)==(0); //@line 548 "json-parser/json.c"
        if (!($330)) {
         $331 = ($41|0)==(58); //@line 550 "json-parser/json.c"
         if (!($331)) {
          $$lcssa554 = $41;
          label = 123;
          break L13;
         }
         $332 = $flags$1 & -65; //@line 551 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $332;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
        }
        $336 = $flags$1 & -9; //@line 563 "json-parser/json.c"
        switch ($41|0) {
        case 123:  {
         $337 = (_new_value($state,$top,$root,$alloc,1)|0); //@line 569 "json-parser/json.c"
         $338 = ($337|0)==(0); //@line 569 "json-parser/json.c"
         if ($338) {
          label = 218;
          break L13;
         } else {
          $643 = $475;$644 = $476;$flags$6 = $336;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
          break L105;
         }
         break;
        }
        case 91:  {
         $339 = (_new_value($state,$top,$root,$alloc,2)|0); //@line 576 "json-parser/json.c"
         $340 = ($339|0)==(0); //@line 576 "json-parser/json.c"
         if ($340) {
          label = 218;
          break L13;
         }
         $341 = $flags$1 | 8; //@line 579 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $341;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $string$1;$string_length$2 = $string_length$0;
         break L105;
         break;
        }
        case 34:  {
         $342 = (_new_value($state,$top,$root,$alloc,5)|0); //@line 584 "json-parser/json.c"
         $343 = ($342|0)==(0); //@line 584 "json-parser/json.c"
         if ($343) {
          label = 218;
          break L13;
         }
         $344 = $336 | 32; //@line 587 "json-parser/json.c"
         $345 = HEAP32[$top>>2]|0; //@line 589 "json-parser/json.c"
         $346 = ((($345)) + 8|0); //@line 589 "json-parser/json.c"
         $347 = ((($346)) + 4|0); //@line 589 "json-parser/json.c"
         $348 = HEAP32[$347>>2]|0; //@line 589 "json-parser/json.c"
         $643 = $475;$644 = $476;$flags$6 = $344;$num_digits$3 = $num_digits$1;$num_e$3 = $num_e$1;$string$3 = $348;$string_length$2 = 0;
         break L105;
         break;
        }
        case 102:  {
         $367 = HEAP32[$27>>2]|0; //@line 612 "json-parser/json.c"
         $368 = $367; //@line 612 "json-parser/json.c"
         $369 = (($31) - ($368))|0; //@line 612 "json-parser/json.c"
         $370 = ($369|0)<(4); //@line 612 "json-parser/json.c"
         if ($370) {
          label = 217;
          break L13;
         }
         $371 = ((($367)) + 1|0); //@line 612 "json-parser/json.c"
         HEAP32[$27>>2] = $371; //@line 612 "json-parser/json.c"
         $372 = HEAP8[$371>>0]|0; //@line 612 "json-parser/json.c"
         $373 = ($372<<24>>24)==(97); //@line 612 "json-parser/json.c"
         if (!($373)) {
          label = 217;
          break L13;
         }
         $374 = ((($367)) + 2|0); //@line 613 "json-parser/json.c"
         HEAP32[$27>>2] = $374; //@line 613 "json-parser/json.c"
         $375 = HEAP8[$374>>0]|0; //@line 613 "json-parser/json.c"
         $376 = ($375<<24>>24)==(108); //@line 613 "json-parser/json.c"
         if (!($376)) {
          label = 217;
          break L13;
         }
         $377 = ((($367)) + 3|0); //@line 613 "json-parser/json.c"
         HEAP32[$27>>2] = $377; //@line 613 "json-parser/json.c"
         $378 = HEAP8[$377>>0]|0; //@line 613 "json-parser/json.c"
         $379 = ($378<<24>>24)==(115); //@line 613 "json-parser/json.c"
         if (!($379)) {
          label = 217;
          break L13;
         }
         $380 = ((($367)) + 4|0); //@line 614 "json-parser/json.c"
         HEAP32[$27>>2] = $380; //@line 614 "json-parser/json.c"
         $381 = HEAP8[$380>>0]|0; //@line 614 "json-parser/json.c"
         $382 = ($381<<24>>24)==(101); //@line 614 "json-parser/json.c"
         if (!($382)) {
          label = 217;
          break L13;
         }
         $383 = (_new_value($state,$top,$root,$alloc,6)|0); //@line 619 "json-parser/json.c"
         $384 = ($383|0)==(0); //@line 619 "json-parser/json.c"
         if ($384) {
          label = 218;
          break L13;
         }
         $385 = $336 | 1; //@line 622 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $385;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
         break;
        }
        case 116:  {
         $349 = HEAP32[$27>>2]|0; //@line 596 "json-parser/json.c"
         $350 = $349; //@line 596 "json-parser/json.c"
         $351 = (($30) - ($350))|0; //@line 596 "json-parser/json.c"
         $352 = ($351|0)<(3); //@line 596 "json-parser/json.c"
         if ($352) {
          label = 217;
          break L13;
         }
         $353 = ((($349)) + 1|0); //@line 596 "json-parser/json.c"
         HEAP32[$27>>2] = $353; //@line 596 "json-parser/json.c"
         $354 = HEAP8[$353>>0]|0; //@line 596 "json-parser/json.c"
         $355 = ($354<<24>>24)==(114); //@line 596 "json-parser/json.c"
         if (!($355)) {
          label = 217;
          break L13;
         }
         $356 = ((($349)) + 2|0); //@line 597 "json-parser/json.c"
         HEAP32[$27>>2] = $356; //@line 597 "json-parser/json.c"
         $357 = HEAP8[$356>>0]|0; //@line 597 "json-parser/json.c"
         $358 = ($357<<24>>24)==(117); //@line 597 "json-parser/json.c"
         if (!($358)) {
          label = 217;
          break L13;
         }
         $359 = ((($349)) + 3|0); //@line 597 "json-parser/json.c"
         HEAP32[$27>>2] = $359; //@line 597 "json-parser/json.c"
         $360 = HEAP8[$359>>0]|0; //@line 597 "json-parser/json.c"
         $361 = ($360<<24>>24)==(101); //@line 597 "json-parser/json.c"
         if (!($361)) {
          label = 217;
          break L13;
         }
         $362 = (_new_value($state,$top,$root,$alloc,6)|0); //@line 602 "json-parser/json.c"
         $363 = ($362|0)==(0); //@line 602 "json-parser/json.c"
         if ($363) {
          label = 218;
          break L13;
         }
         $364 = HEAP32[$top>>2]|0; //@line 605 "json-parser/json.c"
         $365 = ((($364)) + 8|0); //@line 605 "json-parser/json.c"
         HEAP32[$365>>2] = 1; //@line 605 "json-parser/json.c"
         $366 = $336 | 1; //@line 607 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $366;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
         break;
        }
        case 110:  {
         $386 = HEAP32[$27>>2]|0; //@line 627 "json-parser/json.c"
         $387 = $386; //@line 627 "json-parser/json.c"
         $388 = (($32) - ($387))|0; //@line 627 "json-parser/json.c"
         $389 = ($388|0)<(3); //@line 627 "json-parser/json.c"
         if ($389) {
          label = 217;
          break L13;
         }
         $390 = ((($386)) + 1|0); //@line 627 "json-parser/json.c"
         HEAP32[$27>>2] = $390; //@line 627 "json-parser/json.c"
         $391 = HEAP8[$390>>0]|0; //@line 627 "json-parser/json.c"
         $392 = ($391<<24>>24)==(117); //@line 627 "json-parser/json.c"
         if (!($392)) {
          label = 217;
          break L13;
         }
         $393 = ((($386)) + 2|0); //@line 628 "json-parser/json.c"
         HEAP32[$27>>2] = $393; //@line 628 "json-parser/json.c"
         $394 = HEAP8[$393>>0]|0; //@line 628 "json-parser/json.c"
         $395 = ($394<<24>>24)==(108); //@line 628 "json-parser/json.c"
         if (!($395)) {
          label = 217;
          break L13;
         }
         $396 = ((($386)) + 3|0); //@line 628 "json-parser/json.c"
         HEAP32[$27>>2] = $396; //@line 628 "json-parser/json.c"
         $397 = HEAP8[$396>>0]|0; //@line 628 "json-parser/json.c"
         $398 = ($397<<24>>24)==(108); //@line 628 "json-parser/json.c"
         if (!($398)) {
          label = 217;
          break L13;
         }
         $399 = (_new_value($state,$top,$root,$alloc,7)|0); //@line 633 "json-parser/json.c"
         $400 = ($399|0)==(0); //@line 633 "json-parser/json.c"
         if ($400) {
          label = 218;
          break L13;
         }
         $401 = $336 | 1; //@line 636 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $401;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
         break;
        }
        default: {
         $isdigittmp9 = (($41) + -48)|0; //@line 641 "json-parser/json.c"
         $isdigit10 = ($isdigittmp9>>>0)<(10); //@line 641 "json-parser/json.c"
         $402 = ($41|0)==(45); //@line 641 "json-parser/json.c"
         $or$cond17 = $402 | $isdigit10; //@line 641 "json-parser/json.c"
         if (!($or$cond17)) {
          $$lcssa557 = $41;
          label = 160;
          break L13;
         }
         $403 = (_new_value($state,$top,$root,$alloc,3)|0); //@line 643 "json-parser/json.c"
         $404 = ($403|0)==(0); //@line 643 "json-parser/json.c"
         if ($404) {
          label = 218;
          break L13;
         }
         $405 = HEAP32[$25>>2]|0; //@line 646 "json-parser/json.c"
         $406 = ($405|0)==(0); //@line 646 "json-parser/json.c"
         if ($406) {
          $b$0 = $40;
         } else {
          $413 = $flags$1 & -7945; //@line 664 "json-parser/json.c"
          if ($402) {
           $415 = $413 | 256; //@line 678 "json-parser/json.c"
           $643 = 0;$644 = 0;$flags$6 = $415;$num_digits$3 = 0;$num_e$3 = 0;$string$3 = $string$1;$string_length$2 = $string_length$0;
           break L105;
          } else {
           $414 = $413 | 2; //@line 674 "json-parser/json.c"
           $647 = 0;$648 = 0;$flags$3 = $414;$num_digits$2 = 0;$num_e$2 = 0;$string$2 = $string$1;$string_length$1 = $string_length$0;
           break L137;
          }
         }
         L186: while(1) {
          $407 = $b$0 << 24 >> 24; //@line 648 "json-parser/json.c"
          $isdigittmp11 = (($407) + -48)|0; //@line 648 "json-parser/json.c"
          $isdigit12 = ($isdigittmp11>>>0)<(10); //@line 648 "json-parser/json.c"
          if (!($isdigit12)) {
           switch ($b$0<<24>>24) {
           case 43: case 45: case 46: case 69: case 101:  {
            break;
           }
           default: {
            break L186;
           }
           }
          }
          $408 = HEAP32[$27>>2]|0; //@line 651 "json-parser/json.c"
          $409 = ((($408)) + 1|0); //@line 651 "json-parser/json.c"
          HEAP32[$27>>2] = $409; //@line 651 "json-parser/json.c"
          $410 = ($409|0)==($11|0); //@line 651 "json-parser/json.c"
          if ($410) {
           break;
          }
          $411 = HEAP8[$409>>0]|0; //@line 657 "json-parser/json.c"
          $b$0 = $411;
         }
         $412 = $336 | 3; //@line 660 "json-parser/json.c"
         $647 = $475;$648 = $476;$flags$3 = $412;$num_digits$2 = $num_digits$1;$num_e$2 = $num_e$1;$string$2 = $string$1;$string_length$1 = $string_length$0;
         break L137;
        }
        }
       }
       }
      }
     } while(0);
     $571 = $flags$3 & 2; //@line 848 "json-parser/json.c"
     $572 = ($571|0)==(0); //@line 848 "json-parser/json.c"
     if ($572) {
      $flags$4 = $flags$3;
     } else {
      $573 = $flags$3 & -3; //@line 850 "json-parser/json.c"
      $574 = HEAP32[$27>>2]|0; //@line 851 "json-parser/json.c"
      $575 = ((($574)) + -1|0); //@line 851 "json-parser/json.c"
      HEAP32[$27>>2] = $575; //@line 851 "json-parser/json.c"
      $flags$4 = $573;
     }
     $576 = $flags$4 & 1; //@line 854 "json-parser/json.c"
     $577 = ($576|0)==(0); //@line 854 "json-parser/json.c"
     if ($577) {
      $643 = $647;$644 = $648;$flags$6 = $flags$4;$num_digits$3 = $num_digits$2;$num_e$3 = $num_e$2;$string$3 = $string$2;$string_length$2 = $string_length$1;
     } else {
      $578 = $flags$4 & -6; //@line 856 "json-parser/json.c"
      $579 = HEAP32[$top>>2]|0; //@line 858 "json-parser/json.c"
      $580 = HEAP32[$579>>2]|0; //@line 858 "json-parser/json.c"
      $581 = ($580|0)==(0|0); //@line 858 "json-parser/json.c"
      if ($581) {
       $582 = $578 | 132; //@line 862 "json-parser/json.c"
       $643 = $647;$644 = $648;$flags$6 = $582;$num_digits$3 = $num_digits$2;$num_e$3 = $num_e$2;$string$3 = $string$2;$string_length$2 = $string_length$1;
       break;
      }
      $583 = ((($580)) + 4|0); //@line 866 "json-parser/json.c"
      $584 = HEAP32[$583>>2]|0; //@line 866 "json-parser/json.c"
      $585 = ($584|0)==(2); //@line 866 "json-parser/json.c"
      $$28$v = $585 ? 12 : 4; //@line 866 "json-parser/json.c"
      $$28 = $$28$v | $578; //@line 866 "json-parser/json.c"
      $586 = HEAP32[$25>>2]|0; //@line 869 "json-parser/json.c"
      $587 = ($586|0)==(0); //@line 869 "json-parser/json.c"
      do {
       if ($587) {
        if ((($584|0) == 1)) {
         $588 = ((($580)) + 8|0); //@line 878 "json-parser/json.c"
         $589 = HEAP32[$588>>2]|0; //@line 878 "json-parser/json.c"
         $590 = ((($588)) + 4|0); //@line 877 "json-parser/json.c"
         $591 = HEAP32[$590>>2]|0; //@line 877 "json-parser/json.c"
         $592 = (((($591) + (($589*12)|0)|0)) + 8|0); //@line 878 "json-parser/json.c"
         HEAP32[$592>>2] = $579; //@line 878 "json-parser/json.c"
         break;
        } else if ((($584|0) == 2)) {
         $593 = ((($580)) + 8|0); //@line 885 "json-parser/json.c"
         $594 = HEAP32[$593>>2]|0; //@line 885 "json-parser/json.c"
         $595 = ((($593)) + 4|0); //@line 884 "json-parser/json.c"
         $596 = HEAP32[$595>>2]|0; //@line 884 "json-parser/json.c"
         $597 = (($596) + ($594<<2)|0); //@line 884 "json-parser/json.c"
         HEAP32[$597>>2] = $579; //@line 885 "json-parser/json.c"
         break;
        } else {
         break;
        }
       }
      } while(0);
      $598 = HEAP32[$top>>2]|0; //@line 894 "json-parser/json.c"
      $599 = HEAP32[$598>>2]|0; //@line 894 "json-parser/json.c"
      $600 = ((($599)) + 8|0); //@line 894 "json-parser/json.c"
      $601 = HEAP32[$600>>2]|0; //@line 894 "json-parser/json.c"
      $602 = (($601) + 1)|0; //@line 894 "json-parser/json.c"
      HEAP32[$600>>2] = $602; //@line 894 "json-parser/json.c"
      $603 = HEAP32[$19>>2]|0; //@line 894 "json-parser/json.c"
      $604 = ($602>>>0)>($603>>>0); //@line 894 "json-parser/json.c"
      if ($604) {
       label = 219;
       break L13;
      }
      $605 = HEAP32[$top>>2]|0; //@line 897 "json-parser/json.c"
      $606 = HEAP32[$605>>2]|0; //@line 897 "json-parser/json.c"
      HEAP32[$top>>2] = $606; //@line 897 "json-parser/json.c"
      $643 = $647;$644 = $648;$flags$6 = $$28;$num_digits$3 = $num_digits$2;$num_e$3 = $num_e$2;$string$3 = $string$2;$string_length$2 = $string_length$1;
     }
    }
   } while(0);
   $607 = HEAP32[$27>>2]|0; //@line 273 "json-parser/json.c"
   $608 = ((($607)) + 1|0); //@line 273 "json-parser/json.c"
   $475 = $643;$476 = $644;$flags$0 = $flags$6;$num_digits$1 = $num_digits$3;$num_e$1 = $num_e$3;$storemerge8 = $608;$string$0 = $string$3;$string_length$0 = $string_length$2;
  }
  $609 = HEAP32[$root>>2]|0; //@line 903 "json-parser/json.c"
  HEAP32[$alloc>>2] = $609; //@line 903 "json-parser/json.c"
  $610 = HEAP32[$25>>2]|0; //@line 261 "json-parser/json.c"
  $611 = (($610) + -1)|0; //@line 261 "json-parser/json.c"
  HEAP32[$25>>2] = $611; //@line 261 "json-parser/json.c"
  $612 = ($610|0)>(0); //@line 261 "json-parser/json.c"
  if ($612) {
   $641 = $645;$642 = $646;$num_digits$0141 = $num_digits$1$lcssa487;$num_e$0142 = $num_e$1$lcssa508;
  } else {
   label = 216;
   break;
  }
 }
 switch (label|0) {
  case 16: {
   $45 = HEAP32[$26>>2]|0; //@line 280 "json-parser/json.c"
   $46 = ((($state)) + 48|0); //@line 280 "json-parser/json.c"
   $47 = HEAP32[$46>>2]|0; //@line 280 "json-parser/json.c"
   HEAP32[$vararg_buffer>>2] = $45; //@line 280 "json-parser/json.c"
   $vararg_ptr1 = ((($vararg_buffer)) + 4|0); //@line 280 "json-parser/json.c"
   HEAP32[$vararg_ptr1>>2] = $47; //@line 280 "json-parser/json.c"
   (_sprintf($error,632,$vararg_buffer)|0); //@line 280 "json-parser/json.c"
   break;
  }
  case 40: {
   $96 = HEAP32[$26>>2]|0; //@line 306 "json-parser/json.c"
   $97 = ((($state)) + 48|0); //@line 306 "json-parser/json.c"
   $98 = HEAP32[$97>>2]|0; //@line 306 "json-parser/json.c"
   HEAP32[$vararg_buffer2>>2] = $$lcssa544; //@line 306 "json-parser/json.c"
   $vararg_ptr5 = ((($vararg_buffer2)) + 4|0); //@line 306 "json-parser/json.c"
   HEAP32[$vararg_ptr5>>2] = $96; //@line 306 "json-parser/json.c"
   $vararg_ptr6 = ((($vararg_buffer2)) + 8|0); //@line 306 "json-parser/json.c"
   HEAP32[$vararg_ptr6>>2] = $98; //@line 306 "json-parser/json.c"
   (_sprintf($error,672,$vararg_buffer2)|0); //@line 306 "json-parser/json.c"
   break;
  }
  case 49: {
   $135 = HEAP32[$26>>2]|0; //@line 323 "json-parser/json.c"
   $136 = ((($state)) + 48|0); //@line 323 "json-parser/json.c"
   $137 = HEAP32[$136>>2]|0; //@line 323 "json-parser/json.c"
   HEAP32[$vararg_buffer7>>2] = $$lcssa545; //@line 323 "json-parser/json.c"
   $vararg_ptr10 = ((($vararg_buffer7)) + 4|0); //@line 323 "json-parser/json.c"
   HEAP32[$vararg_ptr10>>2] = $135; //@line 323 "json-parser/json.c"
   $vararg_ptr11 = ((($vararg_buffer7)) + 8|0); //@line 323 "json-parser/json.c"
   HEAP32[$vararg_ptr11>>2] = $137; //@line 323 "json-parser/json.c"
   (_sprintf($error,672,$vararg_buffer7)|0); //@line 323 "json-parser/json.c"
   break;
  }
  case 89: {
   $267 = HEAP32[$26>>2]|0; //@line 452 "json-parser/json.c"
   $268 = ((($state)) + 48|0); //@line 452 "json-parser/json.c"
   $269 = HEAP32[$268>>2]|0; //@line 452 "json-parser/json.c"
   HEAP32[$vararg_buffer12>>2] = $267; //@line 452 "json-parser/json.c"
   $vararg_ptr15 = ((($vararg_buffer12)) + 4|0); //@line 452 "json-parser/json.c"
   HEAP32[$vararg_ptr15>>2] = $269; //@line 452 "json-parser/json.c"
   (_sprintf($error,712,$vararg_buffer12)|0); //@line 452 "json-parser/json.c"
   break;
  }
  case 97: {
   $284 = HEAP32[$26>>2]|0; //@line 468 "json-parser/json.c"
   $285 = ((($state)) + 48|0); //@line 468 "json-parser/json.c"
   $286 = HEAP32[$285>>2]|0; //@line 468 "json-parser/json.c"
   HEAP32[$vararg_buffer16>>2] = $284; //@line 468 "json-parser/json.c"
   $vararg_ptr19 = ((($vararg_buffer16)) + 4|0); //@line 468 "json-parser/json.c"
   HEAP32[$vararg_ptr19>>2] = $286; //@line 468 "json-parser/json.c"
   (_sprintf($error,752,$vararg_buffer16)|0); //@line 468 "json-parser/json.c"
   break;
  }
  case 99: {
   $290 = HEAP32[$26>>2]|0; //@line 473 "json-parser/json.c"
   $291 = ((($state)) + 48|0); //@line 473 "json-parser/json.c"
   $292 = HEAP32[$291>>2]|0; //@line 473 "json-parser/json.c"
   HEAP32[$vararg_buffer20>>2] = $290; //@line 473 "json-parser/json.c"
   $vararg_ptr23 = ((($vararg_buffer20)) + 4|0); //@line 473 "json-parser/json.c"
   HEAP32[$vararg_ptr23>>2] = $292; //@line 473 "json-parser/json.c"
   (_sprintf($error,784,$vararg_buffer20)|0); //@line 473 "json-parser/json.c"
   break;
  }
  case 103: {
   $297 = HEAP32[$26>>2]|0; //@line 488 "json-parser/json.c"
   $298 = ((($state)) + 48|0); //@line 488 "json-parser/json.c"
   $299 = HEAP32[$298>>2]|0; //@line 488 "json-parser/json.c"
   HEAP32[$vararg_buffer24>>2] = $297; //@line 488 "json-parser/json.c"
   $vararg_ptr27 = ((($vararg_buffer24)) + 4|0); //@line 488 "json-parser/json.c"
   HEAP32[$vararg_ptr27>>2] = $299; //@line 488 "json-parser/json.c"
   $vararg_ptr28 = ((($vararg_buffer24)) + 8|0); //@line 488 "json-parser/json.c"
   HEAP32[$vararg_ptr28>>2] = $$lcssa; //@line 488 "json-parser/json.c"
   (_sprintf($error,808,$vararg_buffer24)|0); //@line 488 "json-parser/json.c"
   break;
  }
  case 108: {
   $305 = HEAP32[$26>>2]|0; //@line 507 "json-parser/json.c"
   $306 = ((($state)) + 48|0); //@line 507 "json-parser/json.c"
   $307 = HEAP32[$306>>2]|0; //@line 507 "json-parser/json.c"
   HEAP32[$vararg_buffer29>>2] = $305; //@line 506 "json-parser/json.c"
   $vararg_ptr32 = ((($vararg_buffer29)) + 4|0); //@line 506 "json-parser/json.c"
   HEAP32[$vararg_ptr32>>2] = $307; //@line 506 "json-parser/json.c"
   $vararg_ptr33 = ((($vararg_buffer29)) + 8|0); //@line 506 "json-parser/json.c"
   HEAP32[$vararg_ptr33>>2] = $$lcssa551; //@line 506 "json-parser/json.c"
   (_sprintf($error,864,$vararg_buffer29)|0); //@line 506 "json-parser/json.c"
   break;
  }
  case 115: {
   $319 = HEAP32[$26>>2]|0; //@line 525 "json-parser/json.c"
   $320 = ((($state)) + 48|0); //@line 525 "json-parser/json.c"
   $321 = HEAP32[$320>>2]|0; //@line 525 "json-parser/json.c"
   HEAP32[$vararg_buffer34>>2] = $319; //@line 525 "json-parser/json.c"
   $vararg_ptr37 = ((($vararg_buffer34)) + 4|0); //@line 525 "json-parser/json.c"
   HEAP32[$vararg_ptr37>>2] = $321; //@line 525 "json-parser/json.c"
   (_sprintf($error,896,$vararg_buffer34)|0); //@line 525 "json-parser/json.c"
   break;
  }
  case 119: {
   $326 = HEAP32[$26>>2]|0; //@line 542 "json-parser/json.c"
   $327 = ((($state)) + 48|0); //@line 542 "json-parser/json.c"
   $328 = HEAP32[$327>>2]|0; //@line 542 "json-parser/json.c"
   HEAP32[$vararg_buffer38>>2] = $326; //@line 541 "json-parser/json.c"
   $vararg_ptr41 = ((($vararg_buffer38)) + 4|0); //@line 541 "json-parser/json.c"
   HEAP32[$vararg_ptr41>>2] = $328; //@line 541 "json-parser/json.c"
   $vararg_ptr42 = ((($vararg_buffer38)) + 8|0); //@line 541 "json-parser/json.c"
   HEAP32[$vararg_ptr42>>2] = $$lcssa553; //@line 541 "json-parser/json.c"
   (_sprintf($error,920,$vararg_buffer38)|0); //@line 541 "json-parser/json.c"
   break;
  }
  case 123: {
   $333 = HEAP32[$26>>2]|0; //@line 557 "json-parser/json.c"
   $334 = ((($state)) + 48|0); //@line 557 "json-parser/json.c"
   $335 = HEAP32[$334>>2]|0; //@line 557 "json-parser/json.c"
   HEAP32[$vararg_buffer43>>2] = $333; //@line 556 "json-parser/json.c"
   $vararg_ptr46 = ((($vararg_buffer43)) + 4|0); //@line 556 "json-parser/json.c"
   HEAP32[$vararg_ptr46>>2] = $335; //@line 556 "json-parser/json.c"
   $vararg_ptr47 = ((($vararg_buffer43)) + 8|0); //@line 556 "json-parser/json.c"
   HEAP32[$vararg_ptr47>>2] = $$lcssa554; //@line 556 "json-parser/json.c"
   (_sprintf($error,952,$vararg_buffer43)|0); //@line 556 "json-parser/json.c"
   break;
  }
  case 160: {
   $416 = HEAP32[$26>>2]|0; //@line 682 "json-parser/json.c"
   $417 = ((($state)) + 48|0); //@line 682 "json-parser/json.c"
   $418 = HEAP32[$417>>2]|0; //@line 682 "json-parser/json.c"
   HEAP32[$vararg_buffer48>>2] = $416; //@line 682 "json-parser/json.c"
   $vararg_ptr51 = ((($vararg_buffer48)) + 4|0); //@line 682 "json-parser/json.c"
   HEAP32[$vararg_ptr51>>2] = $418; //@line 682 "json-parser/json.c"
   $vararg_ptr52 = ((($vararg_buffer48)) + 8|0); //@line 682 "json-parser/json.c"
   HEAP32[$vararg_ptr52>>2] = $$lcssa557; //@line 682 "json-parser/json.c"
   (_sprintf($error,984,$vararg_buffer48)|0); //@line 682 "json-parser/json.c"
   break;
  }
  case 165: {
   $426 = HEAP32[$26>>2]|0; //@line 702 "json-parser/json.c"
   $427 = ((($state)) + 48|0); //@line 702 "json-parser/json.c"
   $428 = HEAP32[$427>>2]|0; //@line 702 "json-parser/json.c"
   HEAP32[$vararg_buffer53>>2] = $426; //@line 702 "json-parser/json.c"
   $vararg_ptr56 = ((($vararg_buffer53)) + 4|0); //@line 702 "json-parser/json.c"
   HEAP32[$vararg_ptr56>>2] = $428; //@line 702 "json-parser/json.c"
   (_sprintf($error,1024,$vararg_buffer53)|0); //@line 702 "json-parser/json.c"
   break;
  }
  case 170: {
   $437 = HEAP32[$26>>2]|0; //@line 727 "json-parser/json.c"
   $438 = ((($state)) + 48|0); //@line 727 "json-parser/json.c"
   $439 = HEAP32[$438>>2]|0; //@line 727 "json-parser/json.c"
   HEAP32[$vararg_buffer57>>2] = $437; //@line 727 "json-parser/json.c"
   $vararg_ptr60 = ((($vararg_buffer57)) + 4|0); //@line 727 "json-parser/json.c"
   HEAP32[$vararg_ptr60>>2] = $439; //@line 727 "json-parser/json.c"
   $vararg_ptr61 = ((($vararg_buffer57)) + 8|0); //@line 727 "json-parser/json.c"
   HEAP32[$vararg_ptr61>>2] = $$lcssa562; //@line 727 "json-parser/json.c"
   (_sprintf($error,1056,$vararg_buffer57)|0); //@line 727 "json-parser/json.c"
   break;
  }
  case 175: {
   $449 = HEAP32[$26>>2]|0; //@line 745 "json-parser/json.c"
   $450 = ((($state)) + 48|0); //@line 745 "json-parser/json.c"
   $451 = HEAP32[$450>>2]|0; //@line 745 "json-parser/json.c"
   HEAP32[$vararg_buffer62>>2] = $449; //@line 745 "json-parser/json.c"
   $vararg_ptr65 = ((($vararg_buffer62)) + 4|0); //@line 745 "json-parser/json.c"
   HEAP32[$vararg_ptr65>>2] = $451; //@line 745 "json-parser/json.c"
   $vararg_ptr66 = ((($vararg_buffer62)) + 8|0); //@line 745 "json-parser/json.c"
   HEAP32[$vararg_ptr66>>2] = $$lcssa561; //@line 745 "json-parser/json.c"
   (_sprintf($error,1096,$vararg_buffer62)|0); //@line 745 "json-parser/json.c"
   break;
  }
  case 184: {
   $491 = HEAP32[$26>>2]|0; //@line 782 "json-parser/json.c"
   $492 = ((($state)) + 48|0); //@line 782 "json-parser/json.c"
   $493 = HEAP32[$492>>2]|0; //@line 782 "json-parser/json.c"
   HEAP32[$vararg_buffer67>>2] = $491; //@line 782 "json-parser/json.c"
   $vararg_ptr70 = ((($vararg_buffer67)) + 4|0); //@line 782 "json-parser/json.c"
   HEAP32[$vararg_ptr70>>2] = $493; //@line 782 "json-parser/json.c"
   (_sprintf($error,1136,$vararg_buffer67)|0); //@line 782 "json-parser/json.c"
   break;
  }
  case 189: {
   $510 = HEAP32[$26>>2]|0; //@line 798 "json-parser/json.c"
   $511 = ((($state)) + 48|0); //@line 798 "json-parser/json.c"
   $512 = HEAP32[$511>>2]|0; //@line 798 "json-parser/json.c"
   HEAP32[$vararg_buffer71>>2] = $510; //@line 798 "json-parser/json.c"
   $vararg_ptr74 = ((($vararg_buffer71)) + 4|0); //@line 798 "json-parser/json.c"
   HEAP32[$vararg_ptr74>>2] = $512; //@line 798 "json-parser/json.c"
   (_sprintf($error,1176,$vararg_buffer71)|0); //@line 798 "json-parser/json.c"
   break;
  }
  case 196: {
   $536 = HEAP32[$26>>2]|0; //@line 824 "json-parser/json.c"
   $537 = ((($state)) + 48|0); //@line 824 "json-parser/json.c"
   $538 = HEAP32[$537>>2]|0; //@line 824 "json-parser/json.c"
   HEAP32[$vararg_buffer75>>2] = $536; //@line 824 "json-parser/json.c"
   $vararg_ptr78 = ((($vararg_buffer75)) + 4|0); //@line 824 "json-parser/json.c"
   HEAP32[$vararg_ptr78>>2] = $538; //@line 824 "json-parser/json.c"
   (_sprintf($error,1208,$vararg_buffer75)|0); //@line 824 "json-parser/json.c"
   break;
  }
  case 216: {
   $613 = HEAP32[$root>>2]|0; //@line 906 "json-parser/json.c"
   $$0 = $613;
   STACKTOP = sp;return ($$0|0); //@line 947 "json-parser/json.c"
   break;
  }
  case 217: {
   $614 = HEAP32[$26>>2]|0; //@line 910 "json-parser/json.c"
   $615 = ((($state)) + 48|0); //@line 910 "json-parser/json.c"
   $616 = HEAP32[$615>>2]|0; //@line 910 "json-parser/json.c"
   HEAP32[$vararg_buffer79>>2] = $614; //@line 910 "json-parser/json.c"
   $vararg_ptr82 = ((($vararg_buffer79)) + 4|0); //@line 910 "json-parser/json.c"
   HEAP32[$vararg_ptr82>>2] = $616; //@line 910 "json-parser/json.c"
   (_sprintf($error,1240,$vararg_buffer79)|0); //@line 910 "json-parser/json.c"
   break;
  }
  case 218: {
   dest=$error; src=1264; stop=dest+26|0; do { HEAP8[dest>>0]=HEAP8[src>>0]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0)); //@line 915 "json-parser/json.c"
   break;
  }
  case 219: {
   $617 = HEAP32[$26>>2]|0; //@line 920 "json-parser/json.c"
   $618 = ((($state)) + 48|0); //@line 920 "json-parser/json.c"
   $619 = HEAP32[$618>>2]|0; //@line 920 "json-parser/json.c"
   HEAP32[$vararg_buffer83>>2] = $617; //@line 920 "json-parser/json.c"
   $vararg_ptr86 = ((($vararg_buffer83)) + 4|0); //@line 920 "json-parser/json.c"
   HEAP32[$vararg_ptr86>>2] = $619; //@line 920 "json-parser/json.c"
   (_sprintf($error,1296,$vararg_buffer83)|0); //@line 920 "json-parser/json.c"
   break;
  }
 }
 $620 = ($error_buf|0)==(0|0); //@line 925 "json-parser/json.c"
 do {
  if (!($620)) {
   $621 = HEAP8[$error>>0]|0; //@line 927 "json-parser/json.c"
   $622 = ($621<<24>>24)==(0); //@line 927 "json-parser/json.c"
   if ($622) {
    dest=$error_buf; src=1336; stop=dest+14|0; do { HEAP8[dest>>0]=HEAP8[src>>0]|0; dest=dest+1|0; src=src+1|0; } while ((dest|0) < (stop|0)); //@line 930 "json-parser/json.c"
    break;
   } else {
    (_strcpy(($error_buf|0),($error|0))|0); //@line 928 "json-parser/json.c"
    break;
   }
  }
 } while(0);
 $623 = HEAP32[$25>>2]|0; //@line 933 "json-parser/json.c"
 $624 = ($623|0)==(0); //@line 933 "json-parser/json.c"
 if ($624) {
  $$pr = HEAP32[$alloc>>2]|0; //@line 936 "json-parser/json.c"
  $$ph = $$pr;
 } else {
  $625 = HEAP32[$root>>2]|0; //@line 934 "json-parser/json.c"
  HEAP32[$alloc>>2] = $625; //@line 934 "json-parser/json.c"
  $626 = $625;
  $$ph = $626;
 }
 $627 = ($$ph|0)==(0|0); //@line 936 "json-parser/json.c"
 if (!($627)) {
  $628 = ((($state)) + 28|0); //@line 939 "json-parser/json.c"
  $630 = $$ph;
  while(1) {
   $629 = ((($630)) + 16|0); //@line 938 "json-parser/json.c"
   $631 = HEAP32[$629>>2]|0; //@line 938 "json-parser/json.c"
   HEAP32[$top>>2] = $631; //@line 938 "json-parser/json.c"
   $632 = HEAP32[$16>>2]|0; //@line 939 "json-parser/json.c"
   $633 = HEAP32[$alloc>>2]|0; //@line 939 "json-parser/json.c"
   $634 = HEAP32[$628>>2]|0; //@line 939 "json-parser/json.c"
   FUNCTION_TABLE_vii[$632 & 3]($633,$634); //@line 939 "json-parser/json.c"
   $635 = HEAP32[$top>>2]|0; //@line 940 "json-parser/json.c"
   HEAP32[$alloc>>2] = $635; //@line 940 "json-parser/json.c"
   $636 = $635;
   $637 = ($635|0)==(0); //@line 936 "json-parser/json.c"
   if ($637) {
    break;
   } else {
    $630 = $636;
   }
  }
 }
 $638 = HEAP32[$25>>2]|0; //@line 943 "json-parser/json.c"
 $639 = ($638|0)==(0); //@line 943 "json-parser/json.c"
 if (!($639)) {
  $$0 = 0;
  STACKTOP = sp;return ($$0|0); //@line 947 "json-parser/json.c"
 }
 $640 = HEAP32[$root>>2]|0; //@line 944 "json-parser/json.c"
 _json_value_free_ex($12,$640); //@line 944 "json-parser/json.c"
 $$0 = 0;
 STACKTOP = sp;return ($$0|0); //@line 947 "json-parser/json.c"
}
function _json_value_free_ex($settings,$value) {
 $settings = $settings|0;
 $value = $value|0;
 var $$0$be = 0, $$01 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($value|0)==(0|0); //@line 959 "json-parser/json.c"
 if ($0) {
  return; //@line 1003 "json-parser/json.c"
 }
 HEAP32[$value>>2] = 0; //@line 962 "json-parser/json.c"
 $1 = ((($settings)) + 12|0); //@line 1001 "json-parser/json.c"
 $2 = ((($settings)) + 16|0); //@line 1001 "json-parser/json.c"
 $3 = ((($settings)) + 12|0); //@line 972 "json-parser/json.c"
 $4 = ((($settings)) + 16|0); //@line 972 "json-parser/json.c"
 $5 = ((($settings)) + 12|0); //@line 983 "json-parser/json.c"
 $6 = ((($settings)) + 16|0); //@line 983 "json-parser/json.c"
 $7 = ((($settings)) + 12|0); //@line 992 "json-parser/json.c"
 $8 = ((($settings)) + 16|0); //@line 992 "json-parser/json.c"
 $$01 = $value;
 while(1) {
  $9 = ((($$01)) + 4|0); //@line 966 "json-parser/json.c"
  $10 = HEAP32[$9>>2]|0; //@line 966 "json-parser/json.c"
  do {
   if ((($10|0) == 1)) {
    $24 = ((($$01)) + 8|0); //@line 981 "json-parser/json.c"
    $25 = HEAP32[$24>>2]|0; //@line 981 "json-parser/json.c"
    $26 = ($25|0)==(0); //@line 981 "json-parser/json.c"
    if ($26) {
     $27 = HEAP32[$5>>2]|0; //@line 983 "json-parser/json.c"
     $28 = ((($24)) + 4|0); //@line 983 "json-parser/json.c"
     $29 = HEAP32[$28>>2]|0; //@line 983 "json-parser/json.c"
     $30 = HEAP32[$6>>2]|0; //@line 983 "json-parser/json.c"
     FUNCTION_TABLE_vii[$27 & 3]($29,$30); //@line 983 "json-parser/json.c"
     label = 12;
     break;
    } else {
     $31 = (($25) + -1)|0; //@line 987 "json-parser/json.c"
     HEAP32[$24>>2] = $31; //@line 987 "json-parser/json.c"
     $32 = ((($24)) + 4|0); //@line 987 "json-parser/json.c"
     $33 = HEAP32[$32>>2]|0; //@line 987 "json-parser/json.c"
     $34 = (((($33) + (($31*12)|0)|0)) + 8|0); //@line 987 "json-parser/json.c"
     $35 = HEAP32[$34>>2]|0; //@line 987 "json-parser/json.c"
     $$0$be = $35;
     break;
    }
   } else if ((($10|0) == 2)) {
    $11 = ((($$01)) + 8|0); //@line 970 "json-parser/json.c"
    $12 = HEAP32[$11>>2]|0; //@line 970 "json-parser/json.c"
    $13 = ($12|0)==(0); //@line 970 "json-parser/json.c"
    if ($13) {
     $14 = HEAP32[$3>>2]|0; //@line 972 "json-parser/json.c"
     $15 = ((($11)) + 4|0); //@line 972 "json-parser/json.c"
     $16 = HEAP32[$15>>2]|0; //@line 972 "json-parser/json.c"
     $17 = HEAP32[$4>>2]|0; //@line 972 "json-parser/json.c"
     FUNCTION_TABLE_vii[$14 & 3]($16,$17); //@line 972 "json-parser/json.c"
     label = 12;
     break;
    } else {
     $18 = (($12) + -1)|0; //@line 976 "json-parser/json.c"
     HEAP32[$11>>2] = $18; //@line 976 "json-parser/json.c"
     $19 = ((($11)) + 4|0); //@line 976 "json-parser/json.c"
     $20 = HEAP32[$19>>2]|0; //@line 976 "json-parser/json.c"
     $21 = (($20) + ($18<<2)|0); //@line 976 "json-parser/json.c"
     $22 = HEAP32[$21>>2]|0; //@line 976 "json-parser/json.c"
     $$0$be = $22;
     break;
    }
   } else if ((($10|0) == 5)) {
    $36 = HEAP32[$7>>2]|0; //@line 992 "json-parser/json.c"
    $37 = ((($$01)) + 8|0); //@line 992 "json-parser/json.c"
    $38 = ((($37)) + 4|0); //@line 992 "json-parser/json.c"
    $39 = HEAP32[$38>>2]|0; //@line 992 "json-parser/json.c"
    $40 = HEAP32[$8>>2]|0; //@line 992 "json-parser/json.c"
    FUNCTION_TABLE_vii[$36 & 3]($39,$40); //@line 992 "json-parser/json.c"
    label = 12;
   } else {
    label = 12;
   }
  } while(0);
  if ((label|0) == 12) {
   label = 0;
   $41 = HEAP32[$$01>>2]|0; //@line 1000 "json-parser/json.c"
   $42 = HEAP32[$1>>2]|0; //@line 1001 "json-parser/json.c"
   $43 = HEAP32[$2>>2]|0; //@line 1001 "json-parser/json.c"
   FUNCTION_TABLE_vii[$42 & 3]($$01,$43); //@line 1001 "json-parser/json.c"
   $$0$be = $41;
  }
  $23 = ($$0$be|0)==(0|0); //@line 964 "json-parser/json.c"
  if ($23) {
   break;
  } else {
   $$01 = $$0$be;
  }
 }
 return; //@line 1003 "json-parser/json.c"
}
function _json_parse($json,$length) {
 $json = $json|0;
 $length = $length|0;
 var $0 = 0, $settings = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0;
 $settings = sp;
 ;HEAP32[$settings>>2]=0|0;HEAP32[$settings+4>>2]=0|0;HEAP32[$settings+8>>2]=0|0;HEAP32[$settings+12>>2]=0|0;HEAP32[$settings+16>>2]=0|0;HEAP32[$settings+20>>2]=0|0; //@line 951 "json-parser/json.c"
 $0 = (_json_parse_ex($settings,$json,$length,0)|0); //@line 952 "json-parser/json.c"
 STACKTOP = sp;return ($0|0); //@line 952 "json-parser/json.c"
}
function _json_value_free($value) {
 $value = $value|0;
 var $0 = 0, $settings = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0;
 $settings = sp;
 ;HEAP32[$settings>>2]=0|0;HEAP32[$settings+4>>2]=0|0;HEAP32[$settings+8>>2]=0|0;HEAP32[$settings+12>>2]=0|0;HEAP32[$settings+16>>2]=0|0;HEAP32[$settings+20>>2]=0|0; //@line 1007 "json-parser/json.c"
 $0 = ((($settings)) + 12|0); //@line 1008 "json-parser/json.c"
 HEAP32[$0>>2] = 2; //@line 1008 "json-parser/json.c"
 _json_value_free_ex($settings,$value); //@line 1009 "json-parser/json.c"
 STACKTOP = sp;return; //@line 1010 "json-parser/json.c"
}
function _default_alloc($size,$zero,$user_data) {
 $size = $size|0;
 $zero = $zero|0;
 $user_data = $user_data|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($zero|0)==(0); //@line 80 "json-parser/json.c"
 if ($0) {
  $2 = (_malloc($size)|0); //@line 80 "json-parser/json.c"
  $3 = $2;
 } else {
  $1 = (_calloc(1,$size)|0); //@line 80 "json-parser/json.c"
  $3 = $1;
 }
 return ($3|0); //@line 80 "json-parser/json.c"
}
function _default_free($ptr,$user_data) {
 $ptr = $ptr|0;
 $user_data = $user_data|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 _free($ptr); //@line 85 "json-parser/json.c"
 return; //@line 86 "json-parser/json.c"
}
function _hex_value($c) {
 $c = $c|0;
 var $$0 = 0, $0 = 0, $1 = 0, $2 = 0, $isdigit = 0, $isdigittmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $c << 24 >> 24; //@line 49 "json-parser/json.c"
 $isdigittmp = (($0) + -48)|0; //@line 49 "json-parser/json.c"
 $isdigit = ($isdigittmp>>>0)<(10); //@line 49 "json-parser/json.c"
 L1: do {
  if ($isdigit) {
   $1 = (($0) + 208)|0; //@line 50 "json-parser/json.c"
   $2 = $1&255; //@line 50 "json-parser/json.c"
   $$0 = $2;
  } else {
   switch ($0|0) {
   case 65: case 97:  {
    $$0 = 10;
    break L1;
    break;
   }
   case 66: case 98:  {
    $$0 = 11;
    break L1;
    break;
   }
   case 67: case 99:  {
    $$0 = 12;
    break L1;
    break;
   }
   case 69: case 101:  {
    $$0 = 14;
    break L1;
    break;
   }
   case 68: case 100:  {
    $$0 = 13;
    break L1;
    break;
   }
   case 70: case 102:  {
    $$0 = 15;
    break L1;
    break;
   }
   default: {
    $$0 = -1;
    break L1;
   }
   }
  }
 } while(0);
 return ($$0|0); //@line 61 "json-parser/json.c"
}
function _new_value($state,$top,$root,$alloc,$type) {
 $state = $state|0;
 $top = $top|0;
 $root = $root|0;
 $alloc = $alloc|0;
 $type = $type|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $46 = 0, $47 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($state)) + 36|0); //@line 109 "json-parser/json.c"
 $1 = HEAP32[$0>>2]|0; //@line 109 "json-parser/json.c"
 $2 = ($1|0)==(0); //@line 109 "json-parser/json.c"
 if (!($2)) {
  $36 = ((($state)) + 32|0); //@line 170 "json-parser/json.c"
  $37 = HEAP32[$36>>2]|0; //@line 170 "json-parser/json.c"
  $38 = (($37) + 24)|0; //@line 170 "json-parser/json.c"
  $39 = (_json_alloc($state,$38,1)|0); //@line 169 "json-parser/json.c"
  $40 = ($39|0)==(0|0); //@line 169 "json-parser/json.c"
  if ($40) {
   $$0 = 0;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  $41 = HEAP32[$root>>2]|0; //@line 175 "json-parser/json.c"
  $42 = ($41|0)==(0|0); //@line 175 "json-parser/json.c"
  if ($42) {
   HEAP32[$root>>2] = $39; //@line 176 "json-parser/json.c"
  }
  $43 = ((($39)) + 4|0); //@line 178 "json-parser/json.c"
  HEAP32[$43>>2] = $type; //@line 178 "json-parser/json.c"
  $44 = HEAP32[$top>>2]|0; //@line 179 "json-parser/json.c"
  HEAP32[$39>>2] = $44; //@line 179 "json-parser/json.c"
  $45 = HEAP32[$alloc>>2]|0; //@line 186 "json-parser/json.c"
  $46 = ($45|0)==(0|0); //@line 186 "json-parser/json.c"
  if (!($46)) {
   $47 = ((($45)) + 16|0); //@line 187 "json-parser/json.c"
   HEAP32[$47>>2] = $39; //@line 187 "json-parser/json.c"
  }
  HEAP32[$top>>2] = $39; //@line 189 "json-parser/json.c"
  HEAP32[$alloc>>2] = $39; //@line 189 "json-parser/json.c"
  $$0 = 1;
  return ($$0|0); //@line 192 "json-parser/json.c"
 }
 $3 = HEAP32[$alloc>>2]|0; //@line 111 "json-parser/json.c"
 HEAP32[$top>>2] = $3; //@line 111 "json-parser/json.c"
 $4 = HEAP32[$alloc>>2]|0; //@line 112 "json-parser/json.c"
 $5 = ((($4)) + 16|0); //@line 112 "json-parser/json.c"
 $6 = HEAP32[$5>>2]|0; //@line 112 "json-parser/json.c"
 HEAP32[$alloc>>2] = $6; //@line 112 "json-parser/json.c"
 $7 = HEAP32[$root>>2]|0; //@line 114 "json-parser/json.c"
 $8 = ($7|0)==(0|0); //@line 114 "json-parser/json.c"
 if ($8) {
  HEAP32[$root>>2] = $3; //@line 115 "json-parser/json.c"
 }
 $9 = ((($3)) + 4|0); //@line 117 "json-parser/json.c"
 $10 = HEAP32[$9>>2]|0; //@line 117 "json-parser/json.c"
 if ((($10|0) == 1)) {
  $18 = ((($3)) + 8|0); //@line 135 "json-parser/json.c"
  $19 = HEAP32[$18>>2]|0; //@line 135 "json-parser/json.c"
  $20 = ($19|0)==(0); //@line 135 "json-parser/json.c"
  if ($20) {
   $$0 = 1;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  $21 = ($19*12)|0; //@line 138 "json-parser/json.c"
  $22 = ((($18)) + 4|0); //@line 141 "json-parser/json.c"
  $23 = HEAP32[$22>>2]|0; //@line 141 "json-parser/json.c"
  $24 = $23; //@line 141 "json-parser/json.c"
  $25 = (($24) + ($21))|0; //@line 141 "json-parser/json.c"
  $26 = (_json_alloc($state,$25,0)|0); //@line 140 "json-parser/json.c"
  HEAP32[$22>>2] = $26; //@line 140 "json-parser/json.c"
  $27 = ($26|0)==(0|0); //@line 140 "json-parser/json.c"
  if ($27) {
   $$0 = 0;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  $28 = (($26) + ($21)|0); //@line 146 "json-parser/json.c"
  $29 = ((($3)) + 16|0); //@line 146 "json-parser/json.c"
  HEAP32[$29>>2] = $28; //@line 146 "json-parser/json.c"
  HEAP32[$18>>2] = 0; //@line 148 "json-parser/json.c"
  $$0 = 1;
  return ($$0|0); //@line 192 "json-parser/json.c"
 } else if ((($10|0) == 5)) {
  $30 = ((($3)) + 8|0); //@line 154 "json-parser/json.c"
  $31 = HEAP32[$30>>2]|0; //@line 154 "json-parser/json.c"
  $32 = (($31) + 1)|0; //@line 154 "json-parser/json.c"
  $33 = (_json_alloc($state,$32,0)|0); //@line 153 "json-parser/json.c"
  $34 = ((($30)) + 4|0); //@line 153 "json-parser/json.c"
  HEAP32[$34>>2] = $33; //@line 153 "json-parser/json.c"
  $35 = ($33|0)==(0|0); //@line 153 "json-parser/json.c"
  if ($35) {
   $$0 = 0;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  HEAP32[$30>>2] = 0; //@line 159 "json-parser/json.c"
  $$0 = 1;
  return ($$0|0); //@line 192 "json-parser/json.c"
 } else if ((($10|0) == 2)) {
  $11 = ((($3)) + 8|0); //@line 121 "json-parser/json.c"
  $12 = HEAP32[$11>>2]|0; //@line 121 "json-parser/json.c"
  $13 = ($12|0)==(0); //@line 121 "json-parser/json.c"
  if ($13) {
   $$0 = 1;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  $14 = $12 << 2; //@line 125 "json-parser/json.c"
  $15 = (_json_alloc($state,$14,0)|0); //@line 124 "json-parser/json.c"
  $16 = ((($11)) + 4|0); //@line 124 "json-parser/json.c"
  HEAP32[$16>>2] = $15; //@line 124 "json-parser/json.c"
  $17 = ($15|0)==(0|0); //@line 124 "json-parser/json.c"
  if ($17) {
   $$0 = 0;
   return ($$0|0); //@line 192 "json-parser/json.c"
  }
  HEAP32[$11>>2] = 0; //@line 130 "json-parser/json.c"
  $$0 = 1;
  return ($$0|0); //@line 192 "json-parser/json.c"
 } else {
  $$0 = 1;
  return ($$0|0); //@line 192 "json-parser/json.c"
 }
 return (0)|0;
}
function _json_alloc($state,$size,$zero) {
 $state = $state|0;
 $size = $size|0;
 $zero = $zero|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($state)) + 8|0); //@line 90 "json-parser/json.c"
 $1 = HEAP32[$0>>2]|0; //@line 90 "json-parser/json.c"
 $2 = HEAP32[$state>>2]|0; //@line 90 "json-parser/json.c"
 $3 = (($1) - ($2))|0; //@line 90 "json-parser/json.c"
 $4 = ($3>>>0)<($size>>>0); //@line 90 "json-parser/json.c"
 if ($4) {
  $$0 = 0;
  return ($$0|0); //@line 100 "json-parser/json.c"
 }
 $5 = ((($state)) + 12|0); //@line 93 "json-parser/json.c"
 $6 = HEAP32[$5>>2]|0; //@line 93 "json-parser/json.c"
 $7 = ($6|0)==(0); //@line 93 "json-parser/json.c"
 if (!($7)) {
  $8 = (($2) + ($size))|0; //@line 94 "json-parser/json.c"
  HEAP32[$state>>2] = $8; //@line 94 "json-parser/json.c"
  $9 = HEAP32[$5>>2]|0; //@line 94 "json-parser/json.c"
  $10 = ($8>>>0)>($9>>>0); //@line 94 "json-parser/json.c"
  if ($10) {
   $$0 = 0;
   return ($$0|0); //@line 100 "json-parser/json.c"
  }
 }
 $11 = ((($state)) + 20|0); //@line 99 "json-parser/json.c"
 $12 = HEAP32[$11>>2]|0; //@line 99 "json-parser/json.c"
 $13 = ((($state)) + 28|0); //@line 99 "json-parser/json.c"
 $14 = HEAP32[$13>>2]|0; //@line 99 "json-parser/json.c"
 $15 = (FUNCTION_TABLE_iiii[$12 & 3]($size,$zero,$14)|0); //@line 99 "json-parser/json.c"
 $$0 = $15;
 return ($$0|0); //@line 100 "json-parser/json.c"
}
function _isspace($c) {
 $c = $c|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($c|0)==(32);
 $1 = (($c) + -9)|0;
 $2 = ($1>>>0)<(5);
 $3 = $0 | $2;
 $4 = $3&1;
 return ($4|0);
}
function ___floatscan($f,$prec,$pok) {
 $f = $f|0;
 $prec = $prec|0;
 $pok = $pok|0;
 var $$$i = 0, $$0 = 0.0, $$0$i25 = 0.0, $$010$i = 0, $$07$i = 0, $$0710$i = 0, $$0711$i = 0, $$09$i = 0, $$1$be$i = 0, $$1$ph$i = 0, $$11$i = 0, $$18$i = 0, $$2$i = 0, $$3$be$i = 0, $$3$lcssa$i = 0, $$3121$i = 0, $$in = 0, $$k$0$i = 0, $$lcssa = 0, $$lcssa288 = 0;
 var $$lcssa289 = 0, $$lcssa308 = 0, $$lcssa308$lcssa = 0, $$lcssa309 = 0, $$lcssa309$lcssa = 0, $$lcssa322 = 0, $$lcssa323 = 0, $$lcssa333 = 0, $$lcssa50$i = 0, $$lnz$0$i = 0, $$neg32$i = 0, $$not$i = 0, $$old8 = 0, $$pn$i = 0.0, $$pre$i = 0, $$pre$i17 = 0, $$pre$phi42$iZ2D = 0.0, $$pre41$i = 0.0, $$promoted = 0, $$promoted$i = 0;
 var $$promoted185 = 0, $$sink$off0$us$i = 0, $$sink$off0$us93$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0;
 var $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0;
 var $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0;
 var $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0.0, $177 = 0.0, $178 = 0.0, $179 = 0.0, $18 = 0, $180 = 0, $181 = 0, $182 = 0.0, $183 = 0.0, $184 = 0, $185 = 0;
 var $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0;
 var $203 = 0.0, $204 = 0.0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0;
 var $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0;
 var $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0.0, $253 = 0.0, $254 = 0, $255 = 0, $256 = 0, $257 = 0;
 var $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0.0, $262 = 0.0, $263 = 0.0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0.0, $275 = 0.0;
 var $276 = 0.0, $277 = 0, $278 = 0, $279 = 0.0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0;
 var $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0.0, $304 = 0.0, $305 = 0.0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0;
 var $311 = 0.0, $312 = 0.0, $313 = 0.0, $314 = 0.0, $315 = 0.0, $316 = 0.0, $317 = 0, $318 = 0, $319 = 0.0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0;
 var $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0;
 var $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0;
 var $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0;
 var $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0;
 var $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0.0, $419 = 0.0;
 var $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0.0, $436 = 0.0, $437 = 0.0;
 var $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0.0, $448 = 0.0, $449 = 0.0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0;
 var $456 = 0, $457 = 0, $458 = 0, $459 = 0.0, $46 = 0, $460 = 0.0, $461 = 0.0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0.0;
 var $474 = 0, $475 = 0.0, $476 = 0.0, $477 = 0, $478 = 0.0, $479 = 0, $48 = 0.0, $480 = 0.0, $481 = 0.0, $482 = 0, $483 = 0, $484 = 0, $485 = 0.0, $486 = 0.0, $487 = 0, $488 = 0, $489 = 0, $49 = 0.0, $490 = 0, $491 = 0;
 var $492 = 0.0, $493 = 0.0, $494 = 0.0, $495 = 0, $496 = 0, $497 = 0, $498 = 0.0, $499 = 0.0, $5 = 0, $50 = 0.0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0;
 var $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0;
 var $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0;
 var $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0;
 var $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0;
 var $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0;
 var $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0;
 var $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0;
 var $636 = 0, $637 = 0.0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0.0, $643 = 0.0, $644 = 0.0, $645 = 0, $646 = 0.0, $647 = 0.0, $648 = 0.0, $649 = 0.0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0;
 var $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0.0, $661 = 0.0, $662 = 0.0, $663 = 0, $664 = 0.0, $665 = 0.0, $666 = 0, $667 = 0, $668 = 0, $669 = 0.0, $67 = 0, $670 = 0.0, $671 = 0.0;
 var $672 = 0.0, $673 = 0, $674 = 0, $675 = 0.0, $676 = 0, $677 = 0.0, $678 = 0.0, $679 = 0.0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0.0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0.0, $69 = 0;
 var $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0.0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0.0, $702 = 0, $703 = 0, $704 = 0.0, $705 = 0.0, $706 = 0, $707 = 0;
 var $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0;
 var $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0;
 var $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
 var $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $a$0$lcssa177$i = 0, $a$0101$i = 0, $a$1$i = 0, $a$1$i$lcssa = 0, $a$2$ph38$i = 0, $a$3$i = 0;
 var $a$3$i$lcssa300 = 0, $a$3$i301 = 0, $a$3$ph$i = 0, $a$3$ph183$i = 0, $a$478$i = 0, $a$5$i = 0, $a$5$i$lcssa = 0, $a$5$i$lcssa$lcssa = 0, $bias$0$i = 0.0, $bias$0$i23 = 0.0, $bits$0$ph = 0, $brmerge = 0, $brmerge$i26 = 0, $brmerge187 = 0, $c$0 = 0, $c$0$i = 0, $c$1$lcssa = 0, $c$1$ph$i = 0, $c$185 = 0, $c$2 = 0;
 var $c$2$i = 0, $c$2$lcssa$i = 0, $c$4 = 0, $c$4$1 = 0, $c$6 = 0, $carry$0103$i = 0, $carry1$0$us$i = 0, $carry1$0$us89$i = 0, $carry1$1$lcssa$lcssa$i = 0, $carry1$1$us$i = 0, $carry1$1$us$i$lcssa = 0, $carry1$1$us94$i = 0, $carry1$1$us94$i$lcssa = 0, $carry3$081$i = 0, $cond$i = 0, $d$0$i = 0, $denormal$0$i = 0, $denormal$1$i = 0, $denormal$2$i = 0, $e2$0$ph$i = 0;
 var $e2$0$us$i = 0, $e2$0$us84$i = 0, $e2$1$i = 0, $e2$1$i298 = 0, $e2$1$ph$i = 0, $e2$1$ph182$i = 0, $e2$2$i = 0, $e2$3$i = 0, $emin$0$ph = 0, $exitcond$i = 0, $frac$0$i = 0.0, $frac$1$i = 0.0, $frac$2$i = 0.0, $gotdig$0$i = 0, $gotdig$0$i$lcssa294 = 0, $gotdig$0$i12 = 0, $gotdig$0$i12$lcssa331 = 0, $gotdig$2$i = 0, $gotdig$2$i$lcssa = 0, $gotdig$2$i13 = 0;
 var $gotdig$3$i = 0, $gotdig$3$lcssa$i = 0, $gotdig$3117$i = 0, $gotdig$3117$i$lcssa = 0, $gotdig$4$i = 0, $gotrad$0$i = 0, $gotrad$0$i$lcssa = 0, $gotrad$0$i14 = 0, $gotrad$1$i = 0, $gotrad$1$lcssa$i = 0, $gotrad$1118$i = 0, $gotrad$2$i = 0, $gottail$0$i = 0, $gottail$1$i = 0, $gottail$2$i = 0, $i$0$lcssa = 0, $i$084 = 0, $i$1 = 0, $i$4 = 0, $i$4$lcssa = 0;
 var $j$0$lcssa$i = 0, $j$0120$i = 0, $j$0120$i$lcssa = 0, $j$067$i = 0, $j$068$i = 0, $j$069$i = 0, $j$2$i = 0, $j$3110$i = 0, $k$0$lcssa$i = 0, $k$0119$i = 0, $k$0119$i$lcssa = 0, $k$063$i = 0, $k$064$i = 0, $k$065$i = 0, $k$2$i = 0, $k$3$i = 0, $k$4102$i = 0, $k$5$in$us$i = 0, $k$5$in$us88$i = 0, $k$5$us$i = 0;
 var $k$5$us90$i = 0, $k$5$z$2$us$i = 0, $k$5$z$2$us96$i = 0, $k$679$i = 0, $lnz$0$lcssa$i = 0, $lnz$0116$i = 0, $lnz$0116$i$lcssa = 0, $lnz$057$i = 0, $lnz$058$i = 0, $lnz$059$i = 0, $lnz$2$i = 0, $notlhs = 0, $notrhs = 0, $or$cond = 0, $or$cond$i = 0, $or$cond$i16 = 0, $or$cond13$i = 0, $or$cond15$i = 0, $or$cond16$i = 0, $or$cond17$us$i = 0;
 var $or$cond17$us95$i = 0, $or$cond19$i = 0, $or$cond20$i = 0, $or$cond216$i = 0, $or$cond3$i = 0, $or$cond4$i = 0, $or$cond5 = 0, $or$cond6$i = 0, $or$cond7 = 0, $or$cond8$i = 0, $or$cond9$i = 0, $or$cond9$not = 0, $rp$0$lcssa178$i = 0, $rp$0100$i = 0, $rp$1$i18 = 0, $rp$1$i18$lcssa = 0, $rp$2$ph36$i = 0, $rp$3$ph$i = 0, $rp$3$ph34$i = 0, $rp$477$i = 0;
 var $rp$5$i = 0, $rp$5$i$lcssa = 0, $rp$5$i$lcssa$lcssa = 0, $scale$0$i = 0.0, $scale$1$i = 0.0, $scale$2$i = 0.0, $sign$0 = 0, $storemerge$i = 0, $sum$i = 0, $x$0$i = 0, $x$0$i$lcssa = 0, $x$1$i = 0, $x$2$i = 0, $x$3$lcssa$i = 0, $x$324$i = 0, $x$4$lcssa$i = 0, $x$419$i = 0, $x$5$i = 0, $x$6$i = 0, $x$i = 0;
 var $y$0$i = 0.0, $y$0$i$lcssa = 0.0, $y$1$i = 0.0, $y$1$i22 = 0.0, $y$2$i = 0.0, $y$2$i24 = 0.0, $y$3$i = 0.0, $y$3$lcssa$i = 0.0, $y$320$i = 0.0, $y$4$i = 0.0, $y$5$i = 0.0, $z$0$i = 0, $z$1$ph37$i = 0, $z$1$us$i = 0, $z$1$us85$i = 0, $z$2$us$i = 0, $z$2$us87$i = 0, $z$3$lcssa$lcssa$i = 0, $z$3$us$i = 0, $z$3$us$i$lcssa = 0;
 var $z$3$us97$i = 0, $z$3$us97$i$lcssa = 0, $z$4$i = 0, $z$5$ph$i = 0, $z$7$1$i = 0, $z$7$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 512|0;
 $x$i = sp;
 if ((($prec|0) == 0)) {
  $bits$0$ph = 24;$emin$0$ph = -149;
 } else if ((($prec|0) == 2)) {
  $bits$0$ph = 53;$emin$0$ph = -1074;
 } else if ((($prec|0) == 1)) {
  $bits$0$ph = 53;$emin$0$ph = -1074;
 } else {
  $$0 = 0.0;
  STACKTOP = sp;return (+$$0);
 }
 $0 = ((($f)) + 4|0);
 $1 = ((($f)) + 100|0);
 while(1) {
  $2 = HEAP32[$0>>2]|0;
  $3 = HEAP32[$1>>2]|0;
  $4 = ($2>>>0)<($3>>>0);
  if ($4) {
   $5 = ((($2)) + 1|0);
   HEAP32[$0>>2] = $5;
   $6 = HEAP8[$2>>0]|0;
   $7 = $6&255;
   $9 = $7;
  } else {
   $8 = (___shgetc($f)|0);
   $9 = $8;
  }
  $10 = (_isspace($9)|0);
  $11 = ($10|0)==(0);
  if ($11) {
   $$lcssa333 = $9;
   break;
  }
 }
 $12 = ($$lcssa333|0)==(45);
 do {
  if ((($$lcssa333|0) == 43) | (($$lcssa333|0) == 45)) {
   $13 = $12&1;
   $14 = $13 << 1;
   $15 = (1 - ($14))|0;
   $16 = HEAP32[$0>>2]|0;
   $17 = HEAP32[$1>>2]|0;
   $18 = ($16>>>0)<($17>>>0);
   if ($18) {
    $19 = ((($16)) + 1|0);
    HEAP32[$0>>2] = $19;
    $20 = HEAP8[$16>>0]|0;
    $21 = $20&255;
    $c$0 = $21;$sign$0 = $15;
    break;
   } else {
    $22 = (___shgetc($f)|0);
    $c$0 = $22;$sign$0 = $15;
    break;
   }
  } else {
   $c$0 = $$lcssa333;$sign$0 = 1;
  }
 } while(0);
 $c$185 = $c$0;$i$084 = 0;
 while(1) {
  $23 = $c$185 | 32;
  $24 = (1352 + ($i$084)|0);
  $25 = HEAP8[$24>>0]|0;
  $26 = $25 << 24 >> 24;
  $27 = ($23|0)==($26|0);
  if (!($27)) {
   $c$1$lcssa = $c$185;$i$0$lcssa = $i$084;
   break;
  }
  $28 = ($i$084>>>0)<(7);
  do {
   if ($28) {
    $29 = HEAP32[$0>>2]|0;
    $30 = HEAP32[$1>>2]|0;
    $31 = ($29>>>0)<($30>>>0);
    if ($31) {
     $32 = ((($29)) + 1|0);
     HEAP32[$0>>2] = $32;
     $33 = HEAP8[$29>>0]|0;
     $34 = $33&255;
     $c$2 = $34;
     break;
    } else {
     $35 = (___shgetc($f)|0);
     $c$2 = $35;
     break;
    }
   } else {
    $c$2 = $c$185;
   }
  } while(0);
  $36 = (($i$084) + 1)|0;
  $37 = ($36>>>0)<(8);
  if ($37) {
   $c$185 = $c$2;$i$084 = $36;
  } else {
   $c$1$lcssa = $c$2;$i$0$lcssa = $36;
   break;
  }
 }
 do {
  if ((($i$0$lcssa|0) == 3)) {
   label = 23;
  } else if (!((($i$0$lcssa|0) == 8))) {
   $38 = ($i$0$lcssa>>>0)>(3);
   $39 = ($pok|0)!=(0);
   $or$cond5 = $39 & $38;
   if ($or$cond5) {
    $40 = ($i$0$lcssa|0)==(8);
    if ($40) {
     break;
    } else {
     label = 23;
     break;
    }
   }
   $51 = ($i$0$lcssa|0)==(0);
   do {
    if ($51) {
     $52 = $c$1$lcssa | 32;
     $53 = ($52|0)==(110);
     if ($53) {
      $54 = HEAP32[$0>>2]|0;
      $55 = HEAP32[$1>>2]|0;
      $56 = ($54>>>0)<($55>>>0);
      if ($56) {
       $57 = ((($54)) + 1|0);
       HEAP32[$0>>2] = $57;
       $58 = HEAP8[$54>>0]|0;
       $59 = $58&255;
       $c$4 = $59;
      } else {
       $60 = (___shgetc($f)|0);
       $c$4 = $60;
      }
      $61 = $c$4 | 32;
      $62 = ($61|0)==(97);
      if (!($62)) {
       break;
      }
      $712 = HEAP32[$0>>2]|0;
      $713 = HEAP32[$1>>2]|0;
      $714 = ($712>>>0)<($713>>>0);
      if ($714) {
       $716 = ((($712)) + 1|0);
       HEAP32[$0>>2] = $716;
       $717 = HEAP8[$712>>0]|0;
       $718 = $717&255;
       $c$4$1 = $718;
      } else {
       $715 = (___shgetc($f)|0);
       $c$4$1 = $715;
      }
      $719 = $c$4$1 | 32;
      $720 = ($719|0)==(110);
      if (!($720)) {
       break;
      }
      $63 = HEAP32[$0>>2]|0;
      $64 = HEAP32[$1>>2]|0;
      $65 = ($63>>>0)<($64>>>0);
      if ($65) {
       $66 = ((($63)) + 1|0);
       HEAP32[$0>>2] = $66;
       $67 = HEAP8[$63>>0]|0;
       $68 = $67&255;
       $70 = $68;
      } else {
       $69 = (___shgetc($f)|0);
       $70 = $69;
      }
      $71 = ($70|0)==(40);
      if ($71) {
       $i$4 = 1;
      } else {
       $72 = HEAP32[$1>>2]|0;
       $73 = ($72|0)==(0|0);
       if ($73) {
        $$0 = nan;
        STACKTOP = sp;return (+$$0);
       }
       $74 = HEAP32[$0>>2]|0;
       $75 = ((($74)) + -1|0);
       HEAP32[$0>>2] = $75;
       $$0 = nan;
       STACKTOP = sp;return (+$$0);
      }
      while(1) {
       $76 = HEAP32[$0>>2]|0;
       $77 = HEAP32[$1>>2]|0;
       $78 = ($76>>>0)<($77>>>0);
       if ($78) {
        $79 = ((($76)) + 1|0);
        HEAP32[$0>>2] = $79;
        $80 = HEAP8[$76>>0]|0;
        $81 = $80&255;
        $84 = $81;
       } else {
        $82 = (___shgetc($f)|0);
        $84 = $82;
       }
       $83 = (($84) + -48)|0;
       $85 = ($83>>>0)<(10);
       $86 = (($84) + -65)|0;
       $87 = ($86>>>0)<(26);
       $or$cond = $85 | $87;
       if (!($or$cond)) {
        $88 = (($84) + -97)|0;
        $89 = ($88>>>0)<(26);
        $90 = ($84|0)==(95);
        $or$cond7 = $90 | $89;
        if (!($or$cond7)) {
         $$lcssa289 = $84;$i$4$lcssa = $i$4;
         break;
        }
       }
       $102 = (($i$4) + 1)|0;
       $i$4 = $102;
      }
      $91 = ($$lcssa289|0)==(41);
      if ($91) {
       $$0 = nan;
       STACKTOP = sp;return (+$$0);
      }
      $92 = HEAP32[$1>>2]|0;
      $93 = ($92|0)==(0|0);
      if (!($93)) {
       $94 = HEAP32[$0>>2]|0;
       $95 = ((($94)) + -1|0);
       HEAP32[$0>>2] = $95;
      }
      if (!($39)) {
       $97 = (___errno_location()|0);
       HEAP32[$97>>2] = 22;
       ___shlim($f,0);
       $$0 = 0.0;
       STACKTOP = sp;return (+$$0);
      }
      $96 = ($i$4$lcssa|0)==(0);
      $brmerge187 = $96 | $93;
      if ($brmerge187) {
       $$0 = nan;
       STACKTOP = sp;return (+$$0);
      }
      $$promoted185 = HEAP32[$0>>2]|0;
      $$in = $i$4$lcssa;$100 = $$promoted185;
      while(1) {
       $98 = (($$in) + -1)|0;
       $99 = ((($100)) + -1|0);
       $101 = ($98|0)==(0);
       if ($101) {
        $$lcssa288 = $99;
        break;
       } else {
        $$in = $98;$100 = $99;
       }
      }
      HEAP32[$0>>2] = $$lcssa288;
      $$0 = nan;
      STACKTOP = sp;return (+$$0);
     }
     $108 = ($c$1$lcssa|0)==(48);
     do {
      if ($108) {
       $109 = HEAP32[$0>>2]|0;
       $110 = HEAP32[$1>>2]|0;
       $111 = ($109>>>0)<($110>>>0);
       if ($111) {
        $112 = ((($109)) + 1|0);
        HEAP32[$0>>2] = $112;
        $113 = HEAP8[$109>>0]|0;
        $114 = $113&255;
        $117 = $114;
       } else {
        $115 = (___shgetc($f)|0);
        $117 = $115;
       }
       $116 = $117 | 32;
       $118 = ($116|0)==(120);
       if (!($118)) {
        $320 = HEAP32[$1>>2]|0;
        $321 = ($320|0)==(0|0);
        if ($321) {
         $c$6 = 48;
         break;
        }
        $322 = HEAP32[$0>>2]|0;
        $323 = ((($322)) + -1|0);
        HEAP32[$0>>2] = $323;
        $c$6 = 48;
        break;
       }
       $119 = HEAP32[$0>>2]|0;
       $120 = HEAP32[$1>>2]|0;
       $121 = ($119>>>0)<($120>>>0);
       if ($121) {
        $122 = ((($119)) + 1|0);
        HEAP32[$0>>2] = $122;
        $123 = HEAP8[$119>>0]|0;
        $124 = $123&255;
        $c$0$i = $124;$gotdig$0$i = 0;
       } else {
        $125 = (___shgetc($f)|0);
        $c$0$i = $125;$gotdig$0$i = 0;
       }
       while(1) {
        if ((($c$0$i|0) == 46)) {
         $gotdig$0$i$lcssa294 = $gotdig$0$i;
         label = 71;
         break;
        } else if (!((($c$0$i|0) == 48))) {
         $162 = 0;$164 = 0;$721 = 0;$722 = 0;$c$2$i = $c$0$i;$gotdig$2$i = $gotdig$0$i;$gotrad$0$i = 0;$gottail$0$i = 0;$scale$0$i = 1.0;$x$0$i = 0;$y$0$i = 0.0;
         break;
        }
        $126 = HEAP32[$0>>2]|0;
        $127 = HEAP32[$1>>2]|0;
        $128 = ($126>>>0)<($127>>>0);
        if ($128) {
         $129 = ((($126)) + 1|0);
         HEAP32[$0>>2] = $129;
         $130 = HEAP8[$126>>0]|0;
         $131 = $130&255;
         $c$0$i = $131;$gotdig$0$i = 1;
         continue;
        } else {
         $132 = (___shgetc($f)|0);
         $c$0$i = $132;$gotdig$0$i = 1;
         continue;
        }
       }
       if ((label|0) == 71) {
        $133 = HEAP32[$0>>2]|0;
        $134 = HEAP32[$1>>2]|0;
        $135 = ($133>>>0)<($134>>>0);
        if ($135) {
         $136 = ((($133)) + 1|0);
         HEAP32[$0>>2] = $136;
         $137 = HEAP8[$133>>0]|0;
         $138 = $137&255;
         $c$1$ph$i = $138;
        } else {
         $139 = (___shgetc($f)|0);
         $c$1$ph$i = $139;
        }
        $140 = ($c$1$ph$i|0)==(48);
        if ($140) {
         $148 = 0;$149 = 0;
         while(1) {
          $141 = HEAP32[$0>>2]|0;
          $142 = HEAP32[$1>>2]|0;
          $143 = ($141>>>0)<($142>>>0);
          if ($143) {
           $144 = ((($141)) + 1|0);
           HEAP32[$0>>2] = $144;
           $145 = HEAP8[$141>>0]|0;
           $146 = $145&255;
           $152 = $146;
          } else {
           $147 = (___shgetc($f)|0);
           $152 = $147;
          }
          $150 = (_i64Add(($148|0),($149|0),-1,-1)|0);
          $151 = tempRet0;
          $153 = ($152|0)==(48);
          if ($153) {
           $148 = $150;$149 = $151;
          } else {
           $162 = 0;$164 = 0;$721 = $150;$722 = $151;$c$2$i = $152;$gotdig$2$i = 1;$gotrad$0$i = 1;$gottail$0$i = 0;$scale$0$i = 1.0;$x$0$i = 0;$y$0$i = 0.0;
           break;
          }
         }
        } else {
         $162 = 0;$164 = 0;$721 = 0;$722 = 0;$c$2$i = $c$1$ph$i;$gotdig$2$i = $gotdig$0$i$lcssa294;$gotrad$0$i = 1;$gottail$0$i = 0;$scale$0$i = 1.0;$x$0$i = 0;$y$0$i = 0.0;
        }
       }
       while(1) {
        $154 = (($c$2$i) + -48)|0;
        $155 = ($154>>>0)<(10);
        $$pre$i = $c$2$i | 32;
        if ($155) {
         label = 83;
        } else {
         $156 = (($$pre$i) + -97)|0;
         $157 = ($156>>>0)<(6);
         $158 = ($c$2$i|0)==(46);
         $or$cond6$i = $158 | $157;
         if (!($or$cond6$i)) {
          $206 = $721;$207 = $164;$209 = $722;$210 = $162;$c$2$lcssa$i = $c$2$i;$gotdig$2$i$lcssa = $gotdig$2$i;$gotrad$0$i$lcssa = $gotrad$0$i;$x$0$i$lcssa = $x$0$i;$y$0$i$lcssa = $y$0$i;
          break;
         }
         if ($158) {
          $159 = ($gotrad$0$i|0)==(0);
          if ($159) {
           $723 = $164;$724 = $162;$725 = $164;$726 = $162;$gotdig$3$i = $gotdig$2$i;$gotrad$1$i = 1;$gottail$2$i = $gottail$0$i;$scale$2$i = $scale$0$i;$x$2$i = $x$0$i;$y$2$i = $y$0$i;
          } else {
           $206 = $721;$207 = $164;$209 = $722;$210 = $162;$c$2$lcssa$i = 46;$gotdig$2$i$lcssa = $gotdig$2$i;$gotrad$0$i$lcssa = $gotrad$0$i;$x$0$i$lcssa = $x$0$i;$y$0$i$lcssa = $y$0$i;
           break;
          }
         } else {
          label = 83;
         }
        }
        if ((label|0) == 83) {
         label = 0;
         $160 = ($c$2$i|0)>(57);
         $161 = (($$pre$i) + -87)|0;
         $d$0$i = $160 ? $161 : $154;
         $163 = ($162|0)<(0);
         $165 = ($164>>>0)<(8);
         $166 = ($162|0)==(0);
         $167 = $166 & $165;
         $168 = $163 | $167;
         do {
          if ($168) {
           $169 = $x$0$i << 4;
           $170 = (($d$0$i) + ($169))|0;
           $gottail$1$i = $gottail$0$i;$scale$1$i = $scale$0$i;$x$1$i = $170;$y$1$i = $y$0$i;
          } else {
           $171 = ($162|0)<(0);
           $172 = ($164>>>0)<(14);
           $173 = ($162|0)==(0);
           $174 = $173 & $172;
           $175 = $171 | $174;
           if ($175) {
            $176 = (+($d$0$i|0));
            $177 = $scale$0$i * 0.0625;
            $178 = $177 * $176;
            $179 = $y$0$i + $178;
            $gottail$1$i = $gottail$0$i;$scale$1$i = $177;$x$1$i = $x$0$i;$y$1$i = $179;
            break;
           }
           $180 = ($d$0$i|0)==(0);
           $181 = ($gottail$0$i|0)!=(0);
           $or$cond$i = $181 | $180;
           if ($or$cond$i) {
            $gottail$1$i = $gottail$0$i;$scale$1$i = $scale$0$i;$x$1$i = $x$0$i;$y$1$i = $y$0$i;
           } else {
            $182 = $scale$0$i * 0.5;
            $183 = $y$0$i + $182;
            $gottail$1$i = 1;$scale$1$i = $scale$0$i;$x$1$i = $x$0$i;$y$1$i = $183;
           }
          }
         } while(0);
         $184 = (_i64Add(($164|0),($162|0),1,0)|0);
         $185 = tempRet0;
         $723 = $721;$724 = $722;$725 = $184;$726 = $185;$gotdig$3$i = 1;$gotrad$1$i = $gotrad$0$i;$gottail$2$i = $gottail$1$i;$scale$2$i = $scale$1$i;$x$2$i = $x$1$i;$y$2$i = $y$1$i;
        }
        $186 = HEAP32[$0>>2]|0;
        $187 = HEAP32[$1>>2]|0;
        $188 = ($186>>>0)<($187>>>0);
        if ($188) {
         $189 = ((($186)) + 1|0);
         HEAP32[$0>>2] = $189;
         $190 = HEAP8[$186>>0]|0;
         $191 = $190&255;
         $162 = $726;$164 = $725;$721 = $723;$722 = $724;$c$2$i = $191;$gotdig$2$i = $gotdig$3$i;$gotrad$0$i = $gotrad$1$i;$gottail$0$i = $gottail$2$i;$scale$0$i = $scale$2$i;$x$0$i = $x$2$i;$y$0$i = $y$2$i;
         continue;
        } else {
         $192 = (___shgetc($f)|0);
         $162 = $726;$164 = $725;$721 = $723;$722 = $724;$c$2$i = $192;$gotdig$2$i = $gotdig$3$i;$gotrad$0$i = $gotrad$1$i;$gottail$0$i = $gottail$2$i;$scale$0$i = $scale$2$i;$x$0$i = $x$2$i;$y$0$i = $y$2$i;
         continue;
        }
       }
       $193 = ($gotdig$2$i$lcssa|0)==(0);
       if ($193) {
        $194 = HEAP32[$1>>2]|0;
        $195 = ($194|0)==(0|0);
        if (!($195)) {
         $196 = HEAP32[$0>>2]|0;
         $197 = ((($196)) + -1|0);
         HEAP32[$0>>2] = $197;
        }
        $198 = ($pok|0)==(0);
        if ($198) {
         ___shlim($f,0);
        } else {
         if (!($195)) {
          $199 = HEAP32[$0>>2]|0;
          $200 = ((($199)) + -1|0);
          HEAP32[$0>>2] = $200;
          $201 = ($gotrad$0$i$lcssa|0)==(0);
          if (!($201)) {
           $202 = ((($199)) + -2|0);
           HEAP32[$0>>2] = $202;
          }
         }
        }
        $203 = (+($sign$0|0));
        $204 = $203 * 0.0;
        $$0 = $204;
        STACKTOP = sp;return (+$$0);
       }
       $205 = ($gotrad$0$i$lcssa|0)==(0);
       $208 = $205 ? $207 : $206;
       $211 = $205 ? $210 : $209;
       $212 = ($210|0)<(0);
       $213 = ($207>>>0)<(8);
       $214 = ($210|0)==(0);
       $215 = $214 & $213;
       $216 = $212 | $215;
       if ($216) {
        $218 = $207;$219 = $210;$x$324$i = $x$0$i$lcssa;
        while(1) {
         $217 = $x$324$i << 4;
         $220 = (_i64Add(($218|0),($219|0),1,0)|0);
         $221 = tempRet0;
         $222 = ($221|0)<(0);
         $223 = ($220>>>0)<(8);
         $224 = ($221|0)==(0);
         $225 = $224 & $223;
         $226 = $222 | $225;
         if ($226) {
          $218 = $220;$219 = $221;$x$324$i = $217;
         } else {
          $x$3$lcssa$i = $217;
          break;
         }
        }
       } else {
        $x$3$lcssa$i = $x$0$i$lcssa;
       }
       $227 = $c$2$lcssa$i | 32;
       $228 = ($227|0)==(112);
       do {
        if ($228) {
         $229 = (_scanexp($f,$pok)|0);
         $230 = tempRet0;
         $231 = ($229|0)==(0);
         $232 = ($230|0)==(-2147483648);
         $233 = $231 & $232;
         if ($233) {
          $234 = ($pok|0)==(0);
          if ($234) {
           ___shlim($f,0);
           $$0 = 0.0;
           STACKTOP = sp;return (+$$0);
          } else {
           $235 = HEAP32[$1>>2]|0;
           $236 = ($235|0)==(0|0);
           if ($236) {
            $247 = 0;$248 = 0;
            break;
           }
           $237 = HEAP32[$0>>2]|0;
           $238 = ((($237)) + -1|0);
           HEAP32[$0>>2] = $238;
           $247 = 0;$248 = 0;
           break;
          }
         } else {
          $247 = $229;$248 = $230;
         }
        } else {
         $239 = HEAP32[$1>>2]|0;
         $240 = ($239|0)==(0|0);
         if ($240) {
          $247 = 0;$248 = 0;
         } else {
          $241 = HEAP32[$0>>2]|0;
          $242 = ((($241)) + -1|0);
          HEAP32[$0>>2] = $242;
          $247 = 0;$248 = 0;
         }
        }
       } while(0);
       $243 = (_bitshift64Shl(($208|0),($211|0),2)|0);
       $244 = tempRet0;
       $245 = (_i64Add(($243|0),($244|0),-32,-1)|0);
       $246 = tempRet0;
       $249 = (_i64Add(($245|0),($246|0),($247|0),($248|0))|0);
       $250 = tempRet0;
       $251 = ($x$3$lcssa$i|0)==(0);
       if ($251) {
        $252 = (+($sign$0|0));
        $253 = $252 * 0.0;
        $$0 = $253;
        STACKTOP = sp;return (+$$0);
       }
       $254 = (0 - ($emin$0$ph))|0;
       $255 = ($250|0)>(0);
       $256 = ($249>>>0)>($254>>>0);
       $257 = ($250|0)==(0);
       $258 = $257 & $256;
       $259 = $255 | $258;
       if ($259) {
        $260 = (___errno_location()|0);
        HEAP32[$260>>2] = 34;
        $261 = (+($sign$0|0));
        $262 = $261 * 1.7976931348623157E+308;
        $263 = $262 * 1.7976931348623157E+308;
        $$0 = $263;
        STACKTOP = sp;return (+$$0);
       }
       $264 = (($emin$0$ph) + -106)|0;
       $265 = ($264|0)<(0);
       $266 = $265 << 31 >> 31;
       $267 = ($250|0)<($266|0);
       $268 = ($249>>>0)<($264>>>0);
       $269 = ($250|0)==($266|0);
       $270 = $269 & $268;
       $271 = $267 | $270;
       if ($271) {
        $273 = (___errno_location()|0);
        HEAP32[$273>>2] = 34;
        $274 = (+($sign$0|0));
        $275 = $274 * 2.2250738585072014E-308;
        $276 = $275 * 2.2250738585072014E-308;
        $$0 = $276;
        STACKTOP = sp;return (+$$0);
       }
       $272 = ($x$3$lcssa$i|0)>(-1);
       if ($272) {
        $282 = $249;$283 = $250;$x$419$i = $x$3$lcssa$i;$y$320$i = $y$0$i$lcssa;
        while(1) {
         $277 = !($y$320$i >= 0.5);
         $278 = $x$419$i << 1;
         $279 = $y$320$i + -1.0;
         $280 = $277&1;
         $281 = $280 | $278;
         $x$5$i = $281 ^ 1;
         $$pn$i = $277 ? $y$320$i : $279;
         $y$4$i = $y$320$i + $$pn$i;
         $284 = (_i64Add(($282|0),($283|0),-1,-1)|0);
         $285 = tempRet0;
         $286 = ($281|0)>(-1);
         if ($286) {
          $282 = $284;$283 = $285;$x$419$i = $x$5$i;$y$320$i = $y$4$i;
         } else {
          $291 = $284;$292 = $285;$x$4$lcssa$i = $x$5$i;$y$3$lcssa$i = $y$4$i;
          break;
         }
        }
       } else {
        $291 = $249;$292 = $250;$x$4$lcssa$i = $x$3$lcssa$i;$y$3$lcssa$i = $y$0$i$lcssa;
       }
       $287 = ($emin$0$ph|0)<(0);
       $288 = $287 << 31 >> 31;
       $289 = (_i64Subtract(32,0,($emin$0$ph|0),($288|0))|0);
       $290 = tempRet0;
       $293 = (_i64Add(($291|0),($292|0),($289|0),($290|0))|0);
       $294 = tempRet0;
       $295 = (0)>($294|0);
       $296 = ($bits$0$ph>>>0)>($293>>>0);
       $297 = (0)==($294|0);
       $298 = $297 & $296;
       $299 = $295 | $298;
       if ($299) {
        $300 = ($293|0)<(0);
        if ($300) {
         $$0710$i = 0;
         label = 124;
        } else {
         $$07$i = $293;
         label = 122;
        }
       } else {
        $$07$i = $bits$0$ph;
        label = 122;
       }
       do {
        if ((label|0) == 122) {
         $301 = ($$07$i|0)<(53);
         if ($301) {
          $$0710$i = $$07$i;
          label = 124;
          break;
         }
         $$pre41$i = (+($sign$0|0));
         $$0711$i = $$07$i;$$pre$phi42$iZ2D = $$pre41$i;$bias$0$i = 0.0;
        }
       } while(0);
       if ((label|0) == 124) {
        $302 = (84 - ($$0710$i))|0;
        $303 = (+_scalbn(1.0,$302));
        $304 = (+($sign$0|0));
        $305 = (+_copysignl($303,$304));
        $$0711$i = $$0710$i;$$pre$phi42$iZ2D = $304;$bias$0$i = $305;
       }
       $306 = ($$0711$i|0)<(32);
       $307 = $y$3$lcssa$i != 0.0;
       $or$cond4$i = $307 & $306;
       $308 = $x$4$lcssa$i & 1;
       $309 = ($308|0)==(0);
       $or$cond9$i = $309 & $or$cond4$i;
       $310 = $or$cond9$i&1;
       $x$6$i = (($310) + ($x$4$lcssa$i))|0;
       $y$5$i = $or$cond9$i ? 0.0 : $y$3$lcssa$i;
       $311 = (+($x$6$i>>>0));
       $312 = $$pre$phi42$iZ2D * $311;
       $313 = $bias$0$i + $312;
       $314 = $$pre$phi42$iZ2D * $y$5$i;
       $315 = $314 + $313;
       $316 = $315 - $bias$0$i;
       $317 = $316 != 0.0;
       if (!($317)) {
        $318 = (___errno_location()|0);
        HEAP32[$318>>2] = 34;
       }
       $319 = (+_scalbnl($316,$291));
       $$0 = $319;
       STACKTOP = sp;return (+$$0);
      } else {
       $c$6 = $c$1$lcssa;
      }
     } while(0);
     $sum$i = (($emin$0$ph) + ($bits$0$ph))|0;
     $324 = (0 - ($sum$i))|0;
     $$09$i = $c$6;$gotdig$0$i12 = 0;
     while(1) {
      if ((($$09$i|0) == 46)) {
       $gotdig$0$i12$lcssa331 = $gotdig$0$i12;
       label = 135;
       break;
      } else if (!((($$09$i|0) == 48))) {
       $$2$i = $$09$i;$727 = 0;$728 = 0;$gotdig$2$i13 = $gotdig$0$i12;$gotrad$0$i14 = 0;
       break;
      }
      $325 = HEAP32[$0>>2]|0;
      $326 = HEAP32[$1>>2]|0;
      $327 = ($325>>>0)<($326>>>0);
      if ($327) {
       $328 = ((($325)) + 1|0);
       HEAP32[$0>>2] = $328;
       $329 = HEAP8[$325>>0]|0;
       $330 = $329&255;
       $$09$i = $330;$gotdig$0$i12 = 1;
       continue;
      } else {
       $331 = (___shgetc($f)|0);
       $$09$i = $331;$gotdig$0$i12 = 1;
       continue;
      }
     }
     if ((label|0) == 135) {
      $332 = HEAP32[$0>>2]|0;
      $333 = HEAP32[$1>>2]|0;
      $334 = ($332>>>0)<($333>>>0);
      if ($334) {
       $335 = ((($332)) + 1|0);
       HEAP32[$0>>2] = $335;
       $336 = HEAP8[$332>>0]|0;
       $337 = $336&255;
       $$1$ph$i = $337;
      } else {
       $338 = (___shgetc($f)|0);
       $$1$ph$i = $338;
      }
      $339 = ($$1$ph$i|0)==(48);
      if ($339) {
       $340 = 0;$341 = 0;
       while(1) {
        $342 = (_i64Add(($340|0),($341|0),-1,-1)|0);
        $343 = tempRet0;
        $344 = HEAP32[$0>>2]|0;
        $345 = HEAP32[$1>>2]|0;
        $346 = ($344>>>0)<($345>>>0);
        if ($346) {
         $347 = ((($344)) + 1|0);
         HEAP32[$0>>2] = $347;
         $348 = HEAP8[$344>>0]|0;
         $349 = $348&255;
         $$1$be$i = $349;
        } else {
         $350 = (___shgetc($f)|0);
         $$1$be$i = $350;
        }
        $351 = ($$1$be$i|0)==(48);
        if ($351) {
         $340 = $342;$341 = $343;
        } else {
         $$2$i = $$1$be$i;$727 = $342;$728 = $343;$gotdig$2$i13 = 1;$gotrad$0$i14 = 1;
         break;
        }
       }
      } else {
       $$2$i = $$1$ph$i;$727 = 0;$728 = 0;$gotdig$2$i13 = $gotdig$0$i12$lcssa331;$gotrad$0$i14 = 1;
      }
     }
     HEAP32[$x$i>>2] = 0;
     $352 = (($$2$i) + -48)|0;
     $353 = ($352>>>0)<(10);
     $354 = ($$2$i|0)==(46);
     $355 = $354 | $353;
     L214: do {
      if ($355) {
       $356 = ((($x$i)) + 496|0);
       $$3121$i = $$2$i;$359 = 0;$360 = 0;$729 = $354;$730 = $352;$731 = $727;$732 = $728;$gotdig$3117$i = $gotdig$2$i13;$gotrad$1118$i = $gotrad$0$i14;$j$0120$i = 0;$k$0119$i = 0;$lnz$0116$i = 0;
       L216: while(1) {
        do {
         if ($729) {
          $cond$i = ($gotrad$1118$i|0)==(0);
          if ($cond$i) {
           $733 = $359;$734 = $360;$735 = $359;$736 = $360;$gotdig$4$i = $gotdig$3117$i;$gotrad$2$i = 1;$j$2$i = $j$0120$i;$k$2$i = $k$0119$i;$lnz$2$i = $lnz$0116$i;
          } else {
           $737 = $731;$738 = $732;$739 = $359;$740 = $360;$gotdig$3117$i$lcssa = $gotdig$3117$i;$j$0120$i$lcssa = $j$0120$i;$k$0119$i$lcssa = $k$0119$i;$lnz$0116$i$lcssa = $lnz$0116$i;
           break L216;
          }
         } else {
          $358 = ($k$0119$i|0)<(125);
          $361 = (_i64Add(($359|0),($360|0),1,0)|0);
          $362 = tempRet0;
          $363 = ($$3121$i|0)!=(48);
          if (!($358)) {
           if (!($363)) {
            $733 = $731;$734 = $732;$735 = $361;$736 = $362;$gotdig$4$i = $gotdig$3117$i;$gotrad$2$i = $gotrad$1118$i;$j$2$i = $j$0120$i;$k$2$i = $k$0119$i;$lnz$2$i = $lnz$0116$i;
            break;
           }
           $373 = HEAP32[$356>>2]|0;
           $374 = $373 | 1;
           HEAP32[$356>>2] = $374;
           $733 = $731;$734 = $732;$735 = $361;$736 = $362;$gotdig$4$i = $gotdig$3117$i;$gotrad$2$i = $gotrad$1118$i;$j$2$i = $j$0120$i;$k$2$i = $k$0119$i;$lnz$2$i = $lnz$0116$i;
           break;
          }
          $$lnz$0$i = $363 ? $361 : $lnz$0116$i;
          $364 = ($j$0120$i|0)==(0);
          $365 = (($x$i) + ($k$0119$i<<2)|0);
          if ($364) {
           $storemerge$i = $730;
          } else {
           $366 = HEAP32[$365>>2]|0;
           $367 = ($366*10)|0;
           $368 = (($$3121$i) + -48)|0;
           $369 = (($368) + ($367))|0;
           $storemerge$i = $369;
          }
          HEAP32[$365>>2] = $storemerge$i;
          $370 = (($j$0120$i) + 1)|0;
          $371 = ($370|0)==(9);
          $372 = $371&1;
          $$k$0$i = (($372) + ($k$0119$i))|0;
          $$11$i = $371 ? 0 : $370;
          $733 = $731;$734 = $732;$735 = $361;$736 = $362;$gotdig$4$i = 1;$gotrad$2$i = $gotrad$1118$i;$j$2$i = $$11$i;$k$2$i = $$k$0$i;$lnz$2$i = $$lnz$0$i;
         }
        } while(0);
        $375 = HEAP32[$0>>2]|0;
        $376 = HEAP32[$1>>2]|0;
        $377 = ($375>>>0)<($376>>>0);
        if ($377) {
         $378 = ((($375)) + 1|0);
         HEAP32[$0>>2] = $378;
         $379 = HEAP8[$375>>0]|0;
         $380 = $379&255;
         $$3$be$i = $380;
        } else {
         $381 = (___shgetc($f)|0);
         $$3$be$i = $381;
        }
        $382 = (($$3$be$i) + -48)|0;
        $383 = ($382>>>0)<(10);
        $384 = ($$3$be$i|0)==(46);
        $385 = $384 | $383;
        if ($385) {
         $$3121$i = $$3$be$i;$359 = $735;$360 = $736;$729 = $384;$730 = $382;$731 = $733;$732 = $734;$gotdig$3117$i = $gotdig$4$i;$gotrad$1118$i = $gotrad$2$i;$j$0120$i = $j$2$i;$k$0119$i = $k$2$i;$lnz$0116$i = $lnz$2$i;
        } else {
         $$3$lcssa$i = $$3$be$i;$387 = $733;$388 = $735;$390 = $734;$391 = $736;$gotdig$3$lcssa$i = $gotdig$4$i;$gotrad$1$lcssa$i = $gotrad$2$i;$j$0$lcssa$i = $j$2$i;$k$0$lcssa$i = $k$2$i;$lnz$0$lcssa$i = $lnz$2$i;
         label = 158;
         break L214;
        }
       }
       $357 = ($gotdig$3117$i$lcssa|0)!=(0);
       $741 = $739;$742 = $740;$743 = $737;$744 = $738;$745 = $357;$j$069$i = $j$0120$i$lcssa;$k$065$i = $k$0119$i$lcssa;$lnz$059$i = $lnz$0116$i$lcssa;
       label = 166;
      } else {
       $$3$lcssa$i = $$2$i;$387 = $727;$388 = 0;$390 = $728;$391 = 0;$gotdig$3$lcssa$i = $gotdig$2$i13;$gotrad$1$lcssa$i = $gotrad$0$i14;$j$0$lcssa$i = 0;$k$0$lcssa$i = 0;$lnz$0$lcssa$i = 0;
       label = 158;
      }
     } while(0);
     do {
      if ((label|0) == 158) {
       $386 = ($gotrad$1$lcssa$i|0)==(0);
       $389 = $386 ? $388 : $387;
       $392 = $386 ? $391 : $390;
       $393 = ($gotdig$3$lcssa$i|0)!=(0);
       $394 = $$3$lcssa$i | 32;
       $395 = ($394|0)==(101);
       $or$cond13$i = $395 & $393;
       if (!($or$cond13$i)) {
        $410 = ($$3$lcssa$i|0)>(-1);
        if ($410) {
         $741 = $388;$742 = $391;$743 = $389;$744 = $392;$745 = $393;$j$069$i = $j$0$lcssa$i;$k$065$i = $k$0$lcssa$i;$lnz$059$i = $lnz$0$lcssa$i;
         label = 166;
         break;
        } else {
         $746 = $388;$747 = $391;$748 = $393;$749 = $389;$750 = $392;$j$068$i = $j$0$lcssa$i;$k$064$i = $k$0$lcssa$i;$lnz$058$i = $lnz$0$lcssa$i;
         label = 168;
         break;
        }
       }
       $396 = (_scanexp($f,$pok)|0);
       $397 = tempRet0;
       $398 = ($396|0)==(0);
       $399 = ($397|0)==(-2147483648);
       $400 = $398 & $399;
       if ($400) {
        $401 = ($pok|0)==(0);
        if ($401) {
         ___shlim($f,0);
         $$0$i25 = 0.0;
         break;
        }
        $402 = HEAP32[$1>>2]|0;
        $403 = ($402|0)==(0|0);
        if ($403) {
         $406 = 0;$407 = 0;
        } else {
         $404 = HEAP32[$0>>2]|0;
         $405 = ((($404)) + -1|0);
         HEAP32[$0>>2] = $405;
         $406 = 0;$407 = 0;
        }
       } else {
        $406 = $396;$407 = $397;
       }
       $408 = (_i64Add(($406|0),($407|0),($389|0),($392|0))|0);
       $409 = tempRet0;
       $420 = $408;$422 = $388;$423 = $409;$425 = $391;$j$067$i = $j$0$lcssa$i;$k$063$i = $k$0$lcssa$i;$lnz$057$i = $lnz$0$lcssa$i;
       label = 170;
      }
     } while(0);
     if ((label|0) == 166) {
      $411 = HEAP32[$1>>2]|0;
      $412 = ($411|0)==(0|0);
      if ($412) {
       $746 = $741;$747 = $742;$748 = $745;$749 = $743;$750 = $744;$j$068$i = $j$069$i;$k$064$i = $k$065$i;$lnz$058$i = $lnz$059$i;
       label = 168;
      } else {
       $413 = HEAP32[$0>>2]|0;
       $414 = ((($413)) + -1|0);
       HEAP32[$0>>2] = $414;
       if ($745) {
        $420 = $743;$422 = $741;$423 = $744;$425 = $742;$j$067$i = $j$069$i;$k$063$i = $k$065$i;$lnz$057$i = $lnz$059$i;
        label = 170;
       } else {
        label = 169;
       }
      }
     }
     if ((label|0) == 168) {
      if ($748) {
       $420 = $749;$422 = $746;$423 = $750;$425 = $747;$j$067$i = $j$068$i;$k$063$i = $k$064$i;$lnz$057$i = $lnz$058$i;
       label = 170;
      } else {
       label = 169;
      }
     }
     do {
      if ((label|0) == 169) {
       $415 = (___errno_location()|0);
       HEAP32[$415>>2] = 22;
       ___shlim($f,0);
       $$0$i25 = 0.0;
      }
      else if ((label|0) == 170) {
       $416 = HEAP32[$x$i>>2]|0;
       $417 = ($416|0)==(0);
       if ($417) {
        $418 = (+($sign$0|0));
        $419 = $418 * 0.0;
        $$0$i25 = $419;
        break;
       }
       $421 = ($420|0)==($422|0);
       $424 = ($423|0)==($425|0);
       $426 = $421 & $424;
       $427 = ($425|0)<(0);
       $428 = ($422>>>0)<(10);
       $429 = ($425|0)==(0);
       $430 = $429 & $428;
       $431 = $427 | $430;
       $or$cond$i16 = $431 & $426;
       if ($or$cond$i16) {
        $432 = ($bits$0$ph>>>0)>(30);
        $433 = $416 >>> $bits$0$ph;
        $434 = ($433|0)==(0);
        $or$cond15$i = $432 | $434;
        if ($or$cond15$i) {
         $435 = (+($sign$0|0));
         $436 = (+($416>>>0));
         $437 = $435 * $436;
         $$0$i25 = $437;
         break;
        }
       }
       $438 = (($emin$0$ph|0) / -2)&-1;
       $439 = ($438|0)<(0);
       $440 = $439 << 31 >> 31;
       $441 = ($423|0)>($440|0);
       $442 = ($420>>>0)>($438>>>0);
       $443 = ($423|0)==($440|0);
       $444 = $443 & $442;
       $445 = $441 | $444;
       if ($445) {
        $446 = (___errno_location()|0);
        HEAP32[$446>>2] = 34;
        $447 = (+($sign$0|0));
        $448 = $447 * 1.7976931348623157E+308;
        $449 = $448 * 1.7976931348623157E+308;
        $$0$i25 = $449;
        break;
       }
       $450 = (($emin$0$ph) + -106)|0;
       $451 = ($450|0)<(0);
       $452 = $451 << 31 >> 31;
       $453 = ($423|0)<($452|0);
       $454 = ($420>>>0)<($450>>>0);
       $455 = ($423|0)==($452|0);
       $456 = $455 & $454;
       $457 = $453 | $456;
       if ($457) {
        $458 = (___errno_location()|0);
        HEAP32[$458>>2] = 34;
        $459 = (+($sign$0|0));
        $460 = $459 * 2.2250738585072014E-308;
        $461 = $460 * 2.2250738585072014E-308;
        $$0$i25 = $461;
        break;
       }
       $462 = ($j$067$i|0)==(0);
       if ($462) {
        $k$3$i = $k$063$i;
       } else {
        $463 = ($j$067$i|0)<(9);
        if ($463) {
         $464 = (($x$i) + ($k$063$i<<2)|0);
         $$promoted$i = HEAP32[$464>>2]|0;
         $466 = $$promoted$i;$j$3110$i = $j$067$i;
         while(1) {
          $465 = ($466*10)|0;
          $467 = (($j$3110$i) + 1)|0;
          $exitcond$i = ($467|0)==(9);
          if ($exitcond$i) {
           $$lcssa323 = $465;
           break;
          } else {
           $466 = $465;$j$3110$i = $467;
          }
         }
         HEAP32[$464>>2] = $$lcssa323;
        }
        $468 = (($k$063$i) + 1)|0;
        $k$3$i = $468;
       }
       $469 = ($lnz$057$i|0)<(9);
       if ($469) {
        $470 = ($lnz$057$i|0)<=($420|0);
        $471 = ($420|0)<(18);
        $or$cond3$i = $470 & $471;
        if ($or$cond3$i) {
         $472 = ($420|0)==(9);
         if ($472) {
          $473 = (+($sign$0|0));
          $474 = HEAP32[$x$i>>2]|0;
          $475 = (+($474>>>0));
          $476 = $473 * $475;
          $$0$i25 = $476;
          break;
         }
         $477 = ($420|0)<(9);
         if ($477) {
          $478 = (+($sign$0|0));
          $479 = HEAP32[$x$i>>2]|0;
          $480 = (+($479>>>0));
          $481 = $478 * $480;
          $482 = (8 - ($420))|0;
          $483 = (1368 + ($482<<2)|0);
          $484 = HEAP32[$483>>2]|0;
          $485 = (+($484|0));
          $486 = $481 / $485;
          $$0$i25 = $486;
          break;
         }
         $$neg32$i = (($bits$0$ph) + 27)|0;
         $487 = Math_imul($420, -3)|0;
         $488 = (($$neg32$i) + ($487))|0;
         $489 = ($488|0)>(30);
         $$pre$i17 = HEAP32[$x$i>>2]|0;
         $490 = $$pre$i17 >>> $488;
         $491 = ($490|0)==(0);
         $or$cond216$i = $489 | $491;
         if ($or$cond216$i) {
          $492 = (+($sign$0|0));
          $493 = (+($$pre$i17>>>0));
          $494 = $492 * $493;
          $495 = (($420) + -10)|0;
          $496 = (1368 + ($495<<2)|0);
          $497 = HEAP32[$496>>2]|0;
          $498 = (+($497|0));
          $499 = $494 * $498;
          $$0$i25 = $499;
          break;
         }
        }
       }
       $500 = (($420|0) % 9)&-1;
       $501 = ($500|0)==(0);
       if ($501) {
        $a$2$ph38$i = 0;$e2$0$ph$i = 0;$rp$2$ph36$i = $420;$z$1$ph37$i = $k$3$i;
       } else {
        $502 = ($420|0)>(-1);
        $503 = (($500) + 9)|0;
        $504 = $502 ? $500 : $503;
        $505 = (8 - ($504))|0;
        $506 = (1368 + ($505<<2)|0);
        $507 = HEAP32[$506>>2]|0;
        $508 = ($k$3$i|0)==(0);
        if ($508) {
         $a$0$lcssa177$i = 0;$rp$0$lcssa178$i = $420;$z$0$i = 0;
        } else {
         $509 = (1000000000 / ($507|0))&-1;
         $a$0101$i = 0;$carry$0103$i = 0;$k$4102$i = 0;$rp$0100$i = $420;
         while(1) {
          $510 = (($x$i) + ($k$4102$i<<2)|0);
          $511 = HEAP32[$510>>2]|0;
          $512 = (($511>>>0) % ($507>>>0))&-1;
          $513 = (($511>>>0) / ($507>>>0))&-1;
          $514 = (($513) + ($carry$0103$i))|0;
          HEAP32[$510>>2] = $514;
          $515 = Math_imul($512, $509)|0;
          $516 = ($k$4102$i|0)==($a$0101$i|0);
          $517 = ($514|0)==(0);
          $or$cond16$i = $516 & $517;
          $518 = (($k$4102$i) + 1)|0;
          $519 = $518 & 127;
          $520 = (($rp$0100$i) + -9)|0;
          $rp$1$i18 = $or$cond16$i ? $520 : $rp$0100$i;
          $a$1$i = $or$cond16$i ? $519 : $a$0101$i;
          $521 = ($518|0)==($k$3$i|0);
          if ($521) {
           $$lcssa322 = $515;$a$1$i$lcssa = $a$1$i;$rp$1$i18$lcssa = $rp$1$i18;
           break;
          } else {
           $a$0101$i = $a$1$i;$carry$0103$i = $515;$k$4102$i = $518;$rp$0100$i = $rp$1$i18;
          }
         }
         $522 = ($$lcssa322|0)==(0);
         if ($522) {
          $a$0$lcssa177$i = $a$1$i$lcssa;$rp$0$lcssa178$i = $rp$1$i18$lcssa;$z$0$i = $k$3$i;
         } else {
          $523 = (($k$3$i) + 1)|0;
          $524 = (($x$i) + ($k$3$i<<2)|0);
          HEAP32[$524>>2] = $$lcssa322;
          $a$0$lcssa177$i = $a$1$i$lcssa;$rp$0$lcssa178$i = $rp$1$i18$lcssa;$z$0$i = $523;
         }
        }
        $525 = (9 - ($504))|0;
        $526 = (($525) + ($rp$0$lcssa178$i))|0;
        $a$2$ph38$i = $a$0$lcssa177$i;$e2$0$ph$i = 0;$rp$2$ph36$i = $526;$z$1$ph37$i = $z$0$i;
       }
       L296: while(1) {
        $527 = ($rp$2$ph36$i|0)<(18);
        $528 = (($x$i) + ($a$2$ph38$i<<2)|0);
        if ($527) {
         $e2$0$us$i = $e2$0$ph$i;$z$1$us$i = $z$1$ph37$i;
         while(1) {
          $530 = (($z$1$us$i) + 127)|0;
          $carry1$0$us$i = 0;$k$5$in$us$i = $530;$z$2$us$i = $z$1$us$i;
          while(1) {
           $k$5$us$i = $k$5$in$us$i & 127;
           $531 = (($x$i) + ($k$5$us$i<<2)|0);
           $532 = HEAP32[$531>>2]|0;
           $533 = (_bitshift64Shl(($532|0),0,29)|0);
           $534 = tempRet0;
           $535 = (_i64Add(($533|0),($534|0),($carry1$0$us$i|0),0)|0);
           $536 = tempRet0;
           $537 = ($536>>>0)>(0);
           $538 = ($535>>>0)>(1000000000);
           $539 = ($536|0)==(0);
           $540 = $539 & $538;
           $541 = $537 | $540;
           if ($541) {
            $542 = (___udivdi3(($535|0),($536|0),1000000000,0)|0);
            $543 = tempRet0;
            $544 = (___uremdi3(($535|0),($536|0),1000000000,0)|0);
            $545 = tempRet0;
            $$sink$off0$us$i = $544;$carry1$1$us$i = $542;
           } else {
            $$sink$off0$us$i = $535;$carry1$1$us$i = 0;
           }
           HEAP32[$531>>2] = $$sink$off0$us$i;
           $546 = (($z$2$us$i) + 127)|0;
           $547 = $546 & 127;
           $548 = ($k$5$us$i|0)!=($547|0);
           $549 = ($k$5$us$i|0)==($a$2$ph38$i|0);
           $or$cond17$us$i = $548 | $549;
           $550 = ($$sink$off0$us$i|0)==(0);
           $k$5$z$2$us$i = $550 ? $k$5$us$i : $z$2$us$i;
           $z$3$us$i = $or$cond17$us$i ? $z$2$us$i : $k$5$z$2$us$i;
           $551 = (($k$5$us$i) + -1)|0;
           if ($549) {
            $carry1$1$us$i$lcssa = $carry1$1$us$i;$z$3$us$i$lcssa = $z$3$us$i;
            break;
           } else {
            $carry1$0$us$i = $carry1$1$us$i;$k$5$in$us$i = $551;$z$2$us$i = $z$3$us$i;
           }
          }
          $552 = (($e2$0$us$i) + -29)|0;
          $553 = ($carry1$1$us$i$lcssa|0)==(0);
          if ($553) {
           $e2$0$us$i = $552;$z$1$us$i = $z$3$us$i$lcssa;
          } else {
           $$lcssa50$i = $552;$carry1$1$lcssa$lcssa$i = $carry1$1$us$i$lcssa;$z$3$lcssa$lcssa$i = $z$3$us$i$lcssa;
           break;
          }
         }
        } else {
         $529 = ($rp$2$ph36$i|0)==(18);
         if ($529) {
          $e2$0$us84$i = $e2$0$ph$i;$z$1$us85$i = $z$1$ph37$i;
         } else {
          $a$3$ph$i = $a$2$ph38$i;$e2$1$ph$i = $e2$0$ph$i;$rp$3$ph34$i = $rp$2$ph36$i;$z$5$ph$i = $z$1$ph37$i;
          break;
         }
         while(1) {
          $554 = HEAP32[$528>>2]|0;
          $555 = ($554>>>0)<(9007199);
          if (!($555)) {
           $a$3$ph$i = $a$2$ph38$i;$e2$1$ph$i = $e2$0$us84$i;$rp$3$ph34$i = 18;$z$5$ph$i = $z$1$us85$i;
           break L296;
          }
          $556 = (($z$1$us85$i) + 127)|0;
          $carry1$0$us89$i = 0;$k$5$in$us88$i = $556;$z$2$us87$i = $z$1$us85$i;
          while(1) {
           $k$5$us90$i = $k$5$in$us88$i & 127;
           $557 = (($x$i) + ($k$5$us90$i<<2)|0);
           $558 = HEAP32[$557>>2]|0;
           $559 = (_bitshift64Shl(($558|0),0,29)|0);
           $560 = tempRet0;
           $561 = (_i64Add(($559|0),($560|0),($carry1$0$us89$i|0),0)|0);
           $562 = tempRet0;
           $563 = ($562>>>0)>(0);
           $564 = ($561>>>0)>(1000000000);
           $565 = ($562|0)==(0);
           $566 = $565 & $564;
           $567 = $563 | $566;
           if ($567) {
            $568 = (___udivdi3(($561|0),($562|0),1000000000,0)|0);
            $569 = tempRet0;
            $570 = (___uremdi3(($561|0),($562|0),1000000000,0)|0);
            $571 = tempRet0;
            $$sink$off0$us93$i = $570;$carry1$1$us94$i = $568;
           } else {
            $$sink$off0$us93$i = $561;$carry1$1$us94$i = 0;
           }
           HEAP32[$557>>2] = $$sink$off0$us93$i;
           $572 = (($z$2$us87$i) + 127)|0;
           $573 = $572 & 127;
           $574 = ($k$5$us90$i|0)!=($573|0);
           $575 = ($k$5$us90$i|0)==($a$2$ph38$i|0);
           $or$cond17$us95$i = $574 | $575;
           $576 = ($$sink$off0$us93$i|0)==(0);
           $k$5$z$2$us96$i = $576 ? $k$5$us90$i : $z$2$us87$i;
           $z$3$us97$i = $or$cond17$us95$i ? $z$2$us87$i : $k$5$z$2$us96$i;
           $577 = (($k$5$us90$i) + -1)|0;
           if ($575) {
            $carry1$1$us94$i$lcssa = $carry1$1$us94$i;$z$3$us97$i$lcssa = $z$3$us97$i;
            break;
           } else {
            $carry1$0$us89$i = $carry1$1$us94$i;$k$5$in$us88$i = $577;$z$2$us87$i = $z$3$us97$i;
           }
          }
          $578 = (($e2$0$us84$i) + -29)|0;
          $579 = ($carry1$1$us94$i$lcssa|0)==(0);
          if ($579) {
           $e2$0$us84$i = $578;$z$1$us85$i = $z$3$us97$i$lcssa;
          } else {
           $$lcssa50$i = $578;$carry1$1$lcssa$lcssa$i = $carry1$1$us94$i$lcssa;$z$3$lcssa$lcssa$i = $z$3$us97$i$lcssa;
           break;
          }
         }
        }
        $580 = (($rp$2$ph36$i) + 9)|0;
        $581 = (($a$2$ph38$i) + 127)|0;
        $582 = $581 & 127;
        $583 = ($582|0)==($z$3$lcssa$lcssa$i|0);
        if ($583) {
         $584 = (($z$3$lcssa$lcssa$i) + 127)|0;
         $585 = $584 & 127;
         $586 = (($x$i) + ($585<<2)|0);
         $587 = HEAP32[$586>>2]|0;
         $588 = (($z$3$lcssa$lcssa$i) + 126)|0;
         $589 = $588 & 127;
         $590 = (($x$i) + ($589<<2)|0);
         $591 = HEAP32[$590>>2]|0;
         $592 = $591 | $587;
         HEAP32[$590>>2] = $592;
         $z$4$i = $585;
        } else {
         $z$4$i = $z$3$lcssa$lcssa$i;
        }
        $593 = (($x$i) + ($582<<2)|0);
        HEAP32[$593>>2] = $carry1$1$lcssa$lcssa$i;
        $a$2$ph38$i = $582;$e2$0$ph$i = $$lcssa50$i;$rp$2$ph36$i = $580;$z$1$ph37$i = $z$4$i;
       }
       L321: while(1) {
        $624 = (($z$5$ph$i) + 1)|0;
        $621 = $624 & 127;
        $625 = (($z$5$ph$i) + 127)|0;
        $626 = $625 & 127;
        $627 = (($x$i) + ($626<<2)|0);
        $a$3$ph183$i = $a$3$ph$i;$e2$1$ph182$i = $e2$1$ph$i;$rp$3$ph$i = $rp$3$ph34$i;
        while(1) {
         $628 = ($rp$3$ph$i|0)==(18);
         $629 = ($rp$3$ph$i|0)>(27);
         $$18$i = $629 ? 9 : 1;
         $$not$i = $628 ^ 1;
         $a$3$i = $a$3$ph183$i;$e2$1$i = $e2$1$ph182$i;
         while(1) {
          $594 = $a$3$i & 127;
          $595 = ($594|0)==($z$5$ph$i|0);
          do {
           if ($595) {
            label = 220;
           } else {
            $596 = (($x$i) + ($594<<2)|0);
            $597 = HEAP32[$596>>2]|0;
            $598 = ($597>>>0)<(9007199);
            if ($598) {
             label = 220;
             break;
            }
            $599 = ($597>>>0)>(9007199);
            if ($599) {
             break;
            }
            $600 = (($a$3$i) + 1)|0;
            $601 = $600 & 127;
            $602 = ($601|0)==($z$5$ph$i|0);
            if ($602) {
             label = 220;
             break;
            }
            $708 = (($x$i) + ($601<<2)|0);
            $709 = HEAP32[$708>>2]|0;
            $710 = ($709>>>0)<(254740991);
            if ($710) {
             label = 220;
             break;
            }
            $711 = ($709>>>0)>(254740991);
            $brmerge$i26 = $711 | $$not$i;
            if (!($brmerge$i26)) {
             $635 = $594;$a$3$i301 = $a$3$i;$e2$1$i298 = $e2$1$i;$z$7$i = $z$5$ph$i;
             break L321;
            }
           }
          } while(0);
          if ((label|0) == 220) {
           label = 0;
           if ($628) {
            label = 221;
            break L321;
           }
          }
          $603 = (($e2$1$i) + ($$18$i))|0;
          $604 = ($a$3$i|0)==($z$5$ph$i|0);
          if ($604) {
           $a$3$i = $z$5$ph$i;$e2$1$i = $603;
          } else {
           $$lcssa308 = $603;$a$3$i$lcssa300 = $a$3$i;
           break;
          }
         }
         $605 = 1 << $$18$i;
         $606 = (($605) + -1)|0;
         $607 = 1000000000 >>> $$18$i;
         $a$478$i = $a$3$i$lcssa300;$carry3$081$i = 0;$k$679$i = $a$3$i$lcssa300;$rp$477$i = $rp$3$ph$i;
         while(1) {
          $608 = (($x$i) + ($k$679$i<<2)|0);
          $609 = HEAP32[$608>>2]|0;
          $610 = $609 & $606;
          $611 = $609 >>> $$18$i;
          $612 = (($611) + ($carry3$081$i))|0;
          HEAP32[$608>>2] = $612;
          $613 = Math_imul($610, $607)|0;
          $614 = ($k$679$i|0)==($a$478$i|0);
          $615 = ($612|0)==(0);
          $or$cond19$i = $614 & $615;
          $616 = (($k$679$i) + 1)|0;
          $617 = $616 & 127;
          $618 = (($rp$477$i) + -9)|0;
          $rp$5$i = $or$cond19$i ? $618 : $rp$477$i;
          $a$5$i = $or$cond19$i ? $617 : $a$478$i;
          $619 = ($617|0)==($z$5$ph$i|0);
          if ($619) {
           $$lcssa309 = $613;$a$5$i$lcssa = $a$5$i;$rp$5$i$lcssa = $rp$5$i;
           break;
          } else {
           $a$478$i = $a$5$i;$carry3$081$i = $613;$k$679$i = $617;$rp$477$i = $rp$5$i;
          }
         }
         $620 = ($$lcssa309|0)==(0);
         if ($620) {
          $a$3$ph183$i = $a$5$i$lcssa;$e2$1$ph182$i = $$lcssa308;$rp$3$ph$i = $rp$5$i$lcssa;
          continue;
         }
         $622 = ($621|0)==($a$5$i$lcssa|0);
         if (!($622)) {
          $$lcssa308$lcssa = $$lcssa308;$$lcssa309$lcssa = $$lcssa309;$a$5$i$lcssa$lcssa = $a$5$i$lcssa;$rp$5$i$lcssa$lcssa = $rp$5$i$lcssa;
          break;
         }
         $630 = HEAP32[$627>>2]|0;
         $631 = $630 | 1;
         HEAP32[$627>>2] = $631;
         $a$3$ph183$i = $a$5$i$lcssa;$e2$1$ph182$i = $$lcssa308;$rp$3$ph$i = $rp$5$i$lcssa;
        }
        $623 = (($x$i) + ($z$5$ph$i<<2)|0);
        HEAP32[$623>>2] = $$lcssa309$lcssa;
        $a$3$ph$i = $a$5$i$lcssa$lcssa;$e2$1$ph$i = $$lcssa308$lcssa;$rp$3$ph34$i = $rp$5$i$lcssa$lcssa;$z$5$ph$i = $621;
       }
       if ((label|0) == 221) {
        if ($595) {
         $632 = (($621) + -1)|0;
         $633 = (($x$i) + ($632<<2)|0);
         HEAP32[$633>>2] = 0;
         $635 = $z$5$ph$i;$a$3$i301 = $a$3$i;$e2$1$i298 = $e2$1$i;$z$7$i = $621;
        } else {
         $635 = $594;$a$3$i301 = $a$3$i;$e2$1$i298 = $e2$1$i;$z$7$i = $z$5$ph$i;
        }
       }
       $634 = (($x$i) + ($635<<2)|0);
       $636 = HEAP32[$634>>2]|0;
       $637 = (+($636>>>0));
       $638 = (($a$3$i301) + 1)|0;
       $639 = $638 & 127;
       $640 = ($639|0)==($z$7$i|0);
       if ($640) {
        $697 = (($a$3$i301) + 2)|0;
        $698 = $697 & 127;
        $699 = (($698) + -1)|0;
        $700 = (($x$i) + ($699<<2)|0);
        HEAP32[$700>>2] = 0;
        $z$7$1$i = $698;
       } else {
        $z$7$1$i = $z$7$i;
       }
       $701 = $637 * 1.0E+9;
       $702 = (($x$i) + ($639<<2)|0);
       $703 = HEAP32[$702>>2]|0;
       $704 = (+($703>>>0));
       $705 = $701 + $704;
       $661 = (+($sign$0|0));
       $643 = $661 * $705;
       $681 = (($e2$1$i298) + 53)|0;
       $687 = (($681) - ($emin$0$ph))|0;
       $688 = ($687|0)<($bits$0$ph|0);
       $706 = ($687|0)<(0);
       $$$i = $706 ? 0 : $687;
       $denormal$0$i = $688&1;
       $$010$i = $688 ? $$$i : $bits$0$ph;
       $707 = ($$010$i|0)<(53);
       if ($707) {
        $641 = (105 - ($$010$i))|0;
        $642 = (+_scalbn(1.0,$641));
        $644 = (+_copysignl($642,$643));
        $645 = (53 - ($$010$i))|0;
        $646 = (+_scalbn(1.0,$645));
        $647 = (+_fmodl($643,$646));
        $648 = $643 - $647;
        $649 = $644 + $648;
        $bias$0$i23 = $644;$frac$0$i = $647;$y$1$i22 = $649;
       } else {
        $bias$0$i23 = 0.0;$frac$0$i = 0.0;$y$1$i22 = $643;
       }
       $650 = (($a$3$i301) + 2)|0;
       $651 = $650 & 127;
       $652 = ($651|0)==($z$7$1$i|0);
       do {
        if ($652) {
         $frac$2$i = $frac$0$i;
        } else {
         $653 = (($x$i) + ($651<<2)|0);
         $654 = HEAP32[$653>>2]|0;
         $655 = ($654>>>0)<(500000000);
         do {
          if ($655) {
           $656 = ($654|0)==(0);
           if ($656) {
            $657 = (($a$3$i301) + 3)|0;
            $658 = $657 & 127;
            $659 = ($658|0)==($z$7$1$i|0);
            if ($659) {
             $frac$1$i = $frac$0$i;
             break;
            }
           }
           $660 = $661 * 0.25;
           $662 = $660 + $frac$0$i;
           $frac$1$i = $662;
          } else {
           $663 = ($654>>>0)>(500000000);
           if ($663) {
            $664 = $661 * 0.75;
            $665 = $664 + $frac$0$i;
            $frac$1$i = $665;
            break;
           }
           $666 = (($a$3$i301) + 3)|0;
           $667 = $666 & 127;
           $668 = ($667|0)==($z$7$1$i|0);
           if ($668) {
            $669 = $661 * 0.5;
            $670 = $669 + $frac$0$i;
            $frac$1$i = $670;
            break;
           } else {
            $671 = $661 * 0.75;
            $672 = $671 + $frac$0$i;
            $frac$1$i = $672;
            break;
           }
          }
         } while(0);
         $673 = (53 - ($$010$i))|0;
         $674 = ($673|0)>(1);
         if (!($674)) {
          $frac$2$i = $frac$1$i;
          break;
         }
         $675 = (+_fmodl($frac$1$i,1.0));
         $676 = $675 != 0.0;
         if ($676) {
          $frac$2$i = $frac$1$i;
          break;
         }
         $677 = $frac$1$i + 1.0;
         $frac$2$i = $677;
        }
       } while(0);
       $678 = $y$1$i22 + $frac$2$i;
       $679 = $678 - $bias$0$i23;
       $680 = $681 & 2147483647;
       $682 = (-2 - ($sum$i))|0;
       $683 = ($680|0)>($682|0);
       do {
        if ($683) {
         $684 = (+Math_abs((+$679)));
         $685 = !($684 >= 9007199254740992.0);
         if ($685) {
          $denormal$2$i = $denormal$0$i;$e2$2$i = $e2$1$i298;$y$2$i24 = $679;
         } else {
          $686 = ($$010$i|0)==($687|0);
          $or$cond20$i = $688 & $686;
          $denormal$1$i = $or$cond20$i ? 0 : $denormal$0$i;
          $689 = $679 * 0.5;
          $690 = (($e2$1$i298) + 1)|0;
          $denormal$2$i = $denormal$1$i;$e2$2$i = $690;$y$2$i24 = $689;
         }
         $691 = (($e2$2$i) + 50)|0;
         $692 = ($691|0)>($324|0);
         if (!($692)) {
          $693 = ($denormal$2$i|0)!=(0);
          $694 = $frac$2$i != 0.0;
          $or$cond8$i = $694 & $693;
          if (!($or$cond8$i)) {
           $e2$3$i = $e2$2$i;$y$3$i = $y$2$i24;
           break;
          }
         }
         $695 = (___errno_location()|0);
         HEAP32[$695>>2] = 34;
         $e2$3$i = $e2$2$i;$y$3$i = $y$2$i24;
        } else {
         $e2$3$i = $e2$1$i298;$y$3$i = $679;
        }
       } while(0);
       $696 = (+_scalbnl($y$3$i,$e2$3$i));
       $$0$i25 = $696;
      }
     } while(0);
     $$0 = $$0$i25;
     STACKTOP = sp;return (+$$0);
    }
   } while(0);
   $103 = HEAP32[$1>>2]|0;
   $104 = ($103|0)==(0|0);
   if (!($104)) {
    $105 = HEAP32[$0>>2]|0;
    $106 = ((($105)) + -1|0);
    HEAP32[$0>>2] = $106;
   }
   $107 = (___errno_location()|0);
   HEAP32[$107>>2] = 22;
   ___shlim($f,0);
   $$0 = 0.0;
   STACKTOP = sp;return (+$$0);
  }
 } while(0);
 if ((label|0) == 23) {
  $41 = HEAP32[$1>>2]|0;
  $42 = ($41|0)==(0|0);
  if (!($42)) {
   $43 = HEAP32[$0>>2]|0;
   $44 = ((($43)) + -1|0);
   HEAP32[$0>>2] = $44;
  }
  $notlhs = ($pok|0)==(0);
  $notrhs = ($i$0$lcssa>>>0)<(4);
  $or$cond9$not = $notrhs | $notlhs;
  $brmerge = $or$cond9$not | $42;
  if (!($brmerge)) {
   $$promoted = HEAP32[$0>>2]|0;
   $46 = $$promoted;$i$1 = $i$0$lcssa;
   while(1) {
    $45 = ((($46)) + -1|0);
    $47 = (($i$1) + -1)|0;
    $$old8 = ($47>>>0)>(3);
    if ($$old8) {
     $46 = $45;$i$1 = $47;
    } else {
     $$lcssa = $45;
     break;
    }
   }
   HEAP32[$0>>2] = $$lcssa;
  }
 }
 $48 = (+($sign$0|0));
 $49 = $48 * inf;
 $50 = $49;
 $$0 = $50;
 STACKTOP = sp;return (+$$0);
}
function ___shlim($f,$lim) {
 $f = $f|0;
 $lim = $lim|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 104|0);
 HEAP32[$0>>2] = $lim;
 $1 = ((($f)) + 8|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($f)) + 4|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = $2;
 $6 = $4;
 $7 = (($5) - ($6))|0;
 $8 = ((($f)) + 108|0);
 HEAP32[$8>>2] = $7;
 $9 = ($lim|0)!=(0);
 $10 = ($7|0)>($lim|0);
 $or$cond = $9 & $10;
 if ($or$cond) {
  $11 = (($4) + ($lim)|0);
  $12 = ((($f)) + 100|0);
  HEAP32[$12>>2] = $11;
  return;
 } else {
  $13 = ((($f)) + 100|0);
  HEAP32[$13>>2] = $5;
  return;
 }
}
function ___shgetc($f) {
 $f = $f|0;
 var $$0 = 0, $$phi$trans$insert = 0, $$phi$trans$insert3 = 0, $$pre = 0, $$pre4 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0;
 var $40 = 0, $41 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 104|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0);
 if ($2) {
  label = 3;
 } else {
  $3 = ((($f)) + 108|0);
  $4 = HEAP32[$3>>2]|0;
  $5 = ($4|0)<($1|0);
  if ($5) {
   label = 3;
  }
 }
 if ((label|0) == 3) {
  $6 = (___uflow($f)|0);
  $7 = ($6|0)<(0);
  if (!($7)) {
   $9 = HEAP32[$0>>2]|0;
   $10 = ($9|0)==(0);
   $$phi$trans$insert = ((($f)) + 8|0);
   if ($10) {
    $$pre = HEAP32[$$phi$trans$insert>>2]|0;
    $11 = $$pre;
    $26 = $$pre;$41 = $11;
    label = 9;
   } else {
    $12 = HEAP32[$$phi$trans$insert>>2]|0;
    $13 = ((($f)) + 4|0);
    $14 = HEAP32[$13>>2]|0;
    $15 = $12;
    $16 = $14;
    $17 = (($15) - ($16))|0;
    $18 = ((($f)) + 108|0);
    $19 = HEAP32[$18>>2]|0;
    $20 = (($9) - ($19))|0;
    $21 = (($20) + -1)|0;
    $22 = ($17|0)>($21|0);
    if ($22) {
     $23 = (($14) + ($21)|0);
     $24 = ((($f)) + 100|0);
     HEAP32[$24>>2] = $23;
     $27 = $12;
    } else {
     $26 = $15;$41 = $12;
     label = 9;
    }
   }
   if ((label|0) == 9) {
    $25 = ((($f)) + 100|0);
    HEAP32[$25>>2] = $26;
    $27 = $41;
   }
   $28 = ($27|0)==(0|0);
   $$phi$trans$insert3 = ((($f)) + 4|0);
   $$pre4 = HEAP32[$$phi$trans$insert3>>2]|0;
   if (!($28)) {
    $29 = $27;
    $30 = $$pre4;
    $31 = ((($f)) + 108|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = (($29) + 1)|0;
    $34 = (($33) - ($30))|0;
    $35 = (($34) + ($32))|0;
    HEAP32[$31>>2] = $35;
   }
   $36 = ((($$pre4)) + -1|0);
   $37 = HEAP8[$36>>0]|0;
   $38 = $37&255;
   $39 = ($38|0)==($6|0);
   if ($39) {
    $$0 = $6;
    return ($$0|0);
   }
   $40 = $6&255;
   HEAP8[$36>>0] = $40;
   $$0 = $6;
   return ($$0|0);
  }
 }
 $8 = ((($f)) + 100|0);
 HEAP32[$8>>2] = 0;
 $$0 = -1;
 return ($$0|0);
}
function _copysign($x,$y) {
 $x = +$x;
 $y = +$y;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $x;$0 = HEAP32[tempDoublePtr>>2]|0;
 $1 = HEAP32[tempDoublePtr+4>>2]|0;
 HEAPF64[tempDoublePtr>>3] = $y;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 $4 = $1 & 2147483647;
 $5 = $3 & -2147483648;
 $6 = $5 | $4;
 HEAP32[tempDoublePtr>>2] = $0;HEAP32[tempDoublePtr+4>>2] = $6;$7 = +HEAPF64[tempDoublePtr>>3];
 return (+$7);
}
function _copysignl($x,$y) {
 $x = +$x;
 $y = +$y;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_copysign($x,$y));
 return (+$0);
}
function _fmod($x,$y) {
 $x = +$x;
 $y = +$y;
 var $$0 = 0.0, $$lcssa7 = 0, $$x = 0.0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0;
 var $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0.0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0;
 var $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0;
 var $15 = 0, $150 = 0.0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0.0, $24 = 0.0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0.0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0;
 var $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0;
 var $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0.0;
 var $ex$0$lcssa = 0, $ex$026 = 0, $ex$1 = 0, $ex$2$lcssa = 0, $ex$212 = 0, $ex$3$lcssa = 0, $ex$39 = 0, $ey$0$lcssa = 0, $ey$020 = 0, $ey$1$ph = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $x;$0 = HEAP32[tempDoublePtr>>2]|0;
 $1 = HEAP32[tempDoublePtr+4>>2]|0;
 HEAPF64[tempDoublePtr>>3] = $y;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 $4 = (_bitshift64Lshr(($0|0),($1|0),52)|0);
 $5 = tempRet0;
 $6 = $4 & 2047;
 $7 = (_bitshift64Lshr(($2|0),($3|0),52)|0);
 $8 = tempRet0;
 $9 = $7 & 2047;
 $10 = $1 & -2147483648;
 $11 = (_bitshift64Shl(($2|0),($3|0),1)|0);
 $12 = tempRet0;
 $13 = ($11|0)==(0);
 $14 = ($12|0)==(0);
 $15 = $13 & $14;
 if (!($15)) {
  $16 = $3 & 2147483647;
  $17 = ($16>>>0)>(2146435072);
  $18 = ($2>>>0)>(0);
  $19 = ($16|0)==(2146435072);
  $20 = $19 & $18;
  $21 = $17 | $20;
  $22 = ($6|0)==(2047);
  $or$cond = $21 | $22;
  if (!($or$cond)) {
   $25 = (_bitshift64Shl(($0|0),($1|0),1)|0);
   $26 = tempRet0;
   $27 = ($26>>>0)>($12>>>0);
   $28 = ($25>>>0)>($11>>>0);
   $29 = ($26|0)==($12|0);
   $30 = $29 & $28;
   $31 = $27 | $30;
   if (!($31)) {
    $32 = ($25|0)==($11|0);
    $33 = ($26|0)==($12|0);
    $34 = $32 & $33;
    $35 = $x * 0.0;
    $$x = $34 ? $35 : $x;
    return (+$$x);
   }
   $36 = ($6|0)==(0);
   if ($36) {
    $37 = (_bitshift64Shl(($0|0),($1|0),12)|0);
    $38 = tempRet0;
    $39 = ($38|0)>(-1);
    $40 = ($37>>>0)>(4294967295);
    $41 = ($38|0)==(-1);
    $42 = $41 & $40;
    $43 = $39 | $42;
    if ($43) {
     $45 = $37;$46 = $38;$ex$026 = 0;
     while(1) {
      $44 = (($ex$026) + -1)|0;
      $47 = (_bitshift64Shl(($45|0),($46|0),1)|0);
      $48 = tempRet0;
      $49 = ($48|0)>(-1);
      $50 = ($47>>>0)>(4294967295);
      $51 = ($48|0)==(-1);
      $52 = $51 & $50;
      $53 = $49 | $52;
      if ($53) {
       $45 = $47;$46 = $48;$ex$026 = $44;
      } else {
       $ex$0$lcssa = $44;
       break;
      }
     }
    } else {
     $ex$0$lcssa = 0;
    }
    $54 = (1 - ($ex$0$lcssa))|0;
    $55 = (_bitshift64Shl(($0|0),($1|0),($54|0))|0);
    $56 = tempRet0;
    $83 = $55;$84 = $56;$ex$1 = $ex$0$lcssa;
   } else {
    $57 = $1 & 1048575;
    $58 = $57 | 1048576;
    $83 = $0;$84 = $58;$ex$1 = $6;
   }
   $59 = ($9|0)==(0);
   if ($59) {
    $60 = (_bitshift64Shl(($2|0),($3|0),12)|0);
    $61 = tempRet0;
    $62 = ($61|0)>(-1);
    $63 = ($60>>>0)>(4294967295);
    $64 = ($61|0)==(-1);
    $65 = $64 & $63;
    $66 = $62 | $65;
    if ($66) {
     $68 = $60;$69 = $61;$ey$020 = 0;
     while(1) {
      $67 = (($ey$020) + -1)|0;
      $70 = (_bitshift64Shl(($68|0),($69|0),1)|0);
      $71 = tempRet0;
      $72 = ($71|0)>(-1);
      $73 = ($70>>>0)>(4294967295);
      $74 = ($71|0)==(-1);
      $75 = $74 & $73;
      $76 = $72 | $75;
      if ($76) {
       $68 = $70;$69 = $71;$ey$020 = $67;
      } else {
       $ey$0$lcssa = $67;
       break;
      }
     }
    } else {
     $ey$0$lcssa = 0;
    }
    $77 = (1 - ($ey$0$lcssa))|0;
    $78 = (_bitshift64Shl(($2|0),($3|0),($77|0))|0);
    $79 = tempRet0;
    $85 = $78;$86 = $79;$ey$1$ph = $ey$0$lcssa;
   } else {
    $80 = $3 & 1048575;
    $81 = $80 | 1048576;
    $85 = $2;$86 = $81;$ey$1$ph = $9;
   }
   $82 = ($ex$1|0)>($ey$1$ph|0);
   $87 = (_i64Subtract(($83|0),($84|0),($85|0),($86|0))|0);
   $88 = tempRet0;
   $89 = ($88|0)>(-1);
   $90 = ($87>>>0)>(4294967295);
   $91 = ($88|0)==(-1);
   $92 = $91 & $90;
   $93 = $89 | $92;
   L23: do {
    if ($82) {
     $152 = $93;$153 = $87;$154 = $88;$94 = $83;$96 = $84;$ex$212 = $ex$1;
     while(1) {
      if ($152) {
       $95 = ($94|0)==($85|0);
       $97 = ($96|0)==($86|0);
       $98 = $95 & $97;
       if ($98) {
        break;
       } else {
        $100 = $153;$101 = $154;
       }
      } else {
       $100 = $94;$101 = $96;
      }
      $102 = (_bitshift64Shl(($100|0),($101|0),1)|0);
      $103 = tempRet0;
      $104 = (($ex$212) + -1)|0;
      $105 = ($104|0)>($ey$1$ph|0);
      $106 = (_i64Subtract(($102|0),($103|0),($85|0),($86|0))|0);
      $107 = tempRet0;
      $108 = ($107|0)>(-1);
      $109 = ($106>>>0)>(4294967295);
      $110 = ($107|0)==(-1);
      $111 = $110 & $109;
      $112 = $108 | $111;
      if ($105) {
       $152 = $112;$153 = $106;$154 = $107;$94 = $102;$96 = $103;$ex$212 = $104;
      } else {
       $$lcssa7 = $112;$113 = $102;$115 = $103;$155 = $106;$156 = $107;$ex$2$lcssa = $104;
       break L23;
      }
     }
     $99 = $x * 0.0;
     $$0 = $99;
     return (+$$0);
    } else {
     $$lcssa7 = $93;$113 = $83;$115 = $84;$155 = $87;$156 = $88;$ex$2$lcssa = $ex$1;
    }
   } while(0);
   if ($$lcssa7) {
    $114 = ($113|0)==($85|0);
    $116 = ($115|0)==($86|0);
    $117 = $114 & $116;
    if ($117) {
     $125 = $x * 0.0;
     $$0 = $125;
     return (+$$0);
    } else {
     $118 = $156;$120 = $155;
    }
   } else {
    $118 = $115;$120 = $113;
   }
   $119 = ($118>>>0)<(1048576);
   $121 = ($120>>>0)<(0);
   $122 = ($118|0)==(1048576);
   $123 = $122 & $121;
   $124 = $119 | $123;
   if ($124) {
    $126 = $120;$127 = $118;$ex$39 = $ex$2$lcssa;
    while(1) {
     $128 = (_bitshift64Shl(($126|0),($127|0),1)|0);
     $129 = tempRet0;
     $130 = (($ex$39) + -1)|0;
     $131 = ($129>>>0)<(1048576);
     $132 = ($128>>>0)<(0);
     $133 = ($129|0)==(1048576);
     $134 = $133 & $132;
     $135 = $131 | $134;
     if ($135) {
      $126 = $128;$127 = $129;$ex$39 = $130;
     } else {
      $137 = $128;$138 = $129;$ex$3$lcssa = $130;
      break;
     }
    }
   } else {
    $137 = $120;$138 = $118;$ex$3$lcssa = $ex$2$lcssa;
   }
   $136 = ($ex$3$lcssa|0)>(0);
   if ($136) {
    $139 = (_i64Add(($137|0),($138|0),0,-1048576)|0);
    $140 = tempRet0;
    $141 = (_bitshift64Shl(($ex$3$lcssa|0),0,52)|0);
    $142 = tempRet0;
    $143 = $139 | $141;
    $144 = $140 | $142;
    $149 = $144;$151 = $143;
   } else {
    $145 = (1 - ($ex$3$lcssa))|0;
    $146 = (_bitshift64Lshr(($137|0),($138|0),($145|0))|0);
    $147 = tempRet0;
    $149 = $147;$151 = $146;
   }
   $148 = $149 | $10;
   HEAP32[tempDoublePtr>>2] = $151;HEAP32[tempDoublePtr+4>>2] = $148;$150 = +HEAPF64[tempDoublePtr>>3];
   $$0 = $150;
   return (+$$0);
  }
 }
 $23 = $x * $y;
 $24 = $23 / $23;
 $$0 = $24;
 return (+$$0);
}
function _fmodl($x,$y) {
 $x = +$x;
 $y = +$y;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_fmod($x,$y));
 return (+$0);
}
function _frexp($x,$e) {
 $x = +$x;
 $e = $e|0;
 var $$0 = 0.0, $$01 = 0.0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0.0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0.0, $7 = 0.0, $8 = 0, $9 = 0, $storemerge = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $x;$0 = HEAP32[tempDoublePtr>>2]|0;
 $1 = HEAP32[tempDoublePtr+4>>2]|0;
 $2 = (_bitshift64Lshr(($0|0),($1|0),52)|0);
 $3 = tempRet0;
 $4 = $2 & 2047;
 if ((($4|0) == 2047)) {
  $$0 = $x;
  return (+$$0);
 } else if ((($4|0) == 0)) {
  $5 = $x != 0.0;
  if ($5) {
   $6 = $x * 1.8446744073709552E+19;
   $7 = (+_frexp($6,$e));
   $8 = HEAP32[$e>>2]|0;
   $9 = (($8) + -64)|0;
   $$01 = $7;$storemerge = $9;
  } else {
   $$01 = $x;$storemerge = 0;
  }
  HEAP32[$e>>2] = $storemerge;
  $$0 = $$01;
  return (+$$0);
 } else {
  $10 = (($4) + -1022)|0;
  HEAP32[$e>>2] = $10;
  $11 = $1 & -2146435073;
  $12 = $11 | 1071644672;
  HEAP32[tempDoublePtr>>2] = $0;HEAP32[tempDoublePtr+4>>2] = $12;$13 = +HEAPF64[tempDoublePtr>>3];
  $$0 = $13;
  return (+$$0);
 }
 return +(0.0);
}
function _frexpl($x,$e) {
 $x = +$x;
 $e = $e|0;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_frexp($x,$e));
 return (+$0);
}
function _scalbn($x,$n) {
 $x = +$x;
 $n = $n|0;
 var $$ = 0, $$0 = 0, $$1 = 0, $0 = 0, $1 = 0.0, $10 = 0, $11 = 0.0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $18 = 0.0, $2 = 0, $3 = 0, $4 = 0.0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0.0, $9 = 0, $y$0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n|0)>(1023);
 if ($0) {
  $1 = $x * 8.9884656743115795E+307;
  $2 = (($n) + -1023)|0;
  $3 = ($2|0)>(1023);
  if ($3) {
   $4 = $1 * 8.9884656743115795E+307;
   $5 = (($n) + -2046)|0;
   $6 = ($5|0)>(1023);
   $$ = $6 ? 1023 : $5;
   $$0 = $$;$y$0 = $4;
  } else {
   $$0 = $2;$y$0 = $1;
  }
 } else {
  $7 = ($n|0)<(-1022);
  if ($7) {
   $8 = $x * 2.2250738585072014E-308;
   $9 = (($n) + 1022)|0;
   $10 = ($9|0)<(-1022);
   if ($10) {
    $11 = $8 * 2.2250738585072014E-308;
    $12 = (($n) + 2044)|0;
    $13 = ($12|0)<(-1022);
    $$1 = $13 ? -1022 : $12;
    $$0 = $$1;$y$0 = $11;
   } else {
    $$0 = $9;$y$0 = $8;
   }
  } else {
   $$0 = $n;$y$0 = $x;
  }
 }
 $14 = (($$0) + 1023)|0;
 $15 = (_bitshift64Shl(($14|0),0,52)|0);
 $16 = tempRet0;
 HEAP32[tempDoublePtr>>2] = $15;HEAP32[tempDoublePtr+4>>2] = $16;$17 = +HEAPF64[tempDoublePtr>>3];
 $18 = $y$0 * $17;
 return (+$18);
}
function _scalbnl($x,$n) {
 $x = +$x;
 $n = $n|0;
 var $0 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (+_scalbn($x,$n));
 return (+$0);
}
function _wctomb($s,$wc) {
 $s = $s|0;
 $wc = $wc|0;
 var $$0 = 0, $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($s|0)==(0|0);
 if ($0) {
  $$0 = 0;
 } else {
  $1 = (_wcrtomb($s,$wc,0)|0);
  $$0 = $1;
 }
 return ($$0|0);
}
function _wcrtomb($s,$wc,$st) {
 $s = $s|0;
 $wc = $wc|0;
 $st = $st|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($s|0)==(0|0);
 if ($0) {
  $$0 = 1;
  return ($$0|0);
 }
 $1 = ($wc>>>0)<(128);
 if ($1) {
  $2 = $wc&255;
  HEAP8[$s>>0] = $2;
  $$0 = 1;
  return ($$0|0);
 }
 $3 = ($wc>>>0)<(2048);
 if ($3) {
  $4 = $wc >>> 6;
  $5 = $4 | 192;
  $6 = $5&255;
  $7 = ((($s)) + 1|0);
  HEAP8[$s>>0] = $6;
  $8 = $wc & 63;
  $9 = $8 | 128;
  $10 = $9&255;
  HEAP8[$7>>0] = $10;
  $$0 = 2;
  return ($$0|0);
 }
 $11 = ($wc>>>0)<(55296);
 $12 = $wc & -8192;
 $13 = ($12|0)==(57344);
 $or$cond = $11 | $13;
 if ($or$cond) {
  $14 = $wc >>> 12;
  $15 = $14 | 224;
  $16 = $15&255;
  $17 = ((($s)) + 1|0);
  HEAP8[$s>>0] = $16;
  $18 = $wc >>> 6;
  $19 = $18 & 63;
  $20 = $19 | 128;
  $21 = $20&255;
  $22 = ((($s)) + 2|0);
  HEAP8[$17>>0] = $21;
  $23 = $wc & 63;
  $24 = $23 | 128;
  $25 = $24&255;
  HEAP8[$22>>0] = $25;
  $$0 = 3;
  return ($$0|0);
 }
 $26 = (($wc) + -65536)|0;
 $27 = ($26>>>0)<(1048576);
 if ($27) {
  $28 = $wc >>> 18;
  $29 = $28 | 240;
  $30 = $29&255;
  $31 = ((($s)) + 1|0);
  HEAP8[$s>>0] = $30;
  $32 = $wc >>> 12;
  $33 = $32 & 63;
  $34 = $33 | 128;
  $35 = $34&255;
  $36 = ((($s)) + 2|0);
  HEAP8[$31>>0] = $35;
  $37 = $wc >>> 6;
  $38 = $37 & 63;
  $39 = $38 | 128;
  $40 = $39&255;
  $41 = ((($s)) + 3|0);
  HEAP8[$36>>0] = $40;
  $42 = $wc & 63;
  $43 = $42 | 128;
  $44 = $43&255;
  HEAP8[$41>>0] = $44;
  $$0 = 4;
  return ($$0|0);
 } else {
  $45 = (___errno_location()|0);
  HEAP32[$45>>2] = 84;
  $$0 = -1;
  return ($$0|0);
 }
 return (0)|0;
}
function ___toread($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $3 = 0, $4 = 0;
 var $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 74|0);
 $1 = HEAP8[$0>>0]|0;
 $2 = $1 << 24 >> 24;
 $3 = (($2) + 255)|0;
 $4 = $3 | $2;
 $5 = $4&255;
 HEAP8[$0>>0] = $5;
 $6 = ((($f)) + 20|0);
 $7 = HEAP32[$6>>2]|0;
 $8 = ((($f)) + 44|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = ($7>>>0)>($9>>>0);
 if ($10) {
  $11 = ((($f)) + 36|0);
  $12 = HEAP32[$11>>2]|0;
  (FUNCTION_TABLE_iiii[$12 & 3]($f,0,0)|0);
 }
 $13 = ((($f)) + 16|0);
 HEAP32[$13>>2] = 0;
 $14 = ((($f)) + 28|0);
 HEAP32[$14>>2] = 0;
 HEAP32[$6>>2] = 0;
 $15 = HEAP32[$f>>2]|0;
 $16 = $15 & 20;
 $17 = ($16|0)==(0);
 if ($17) {
  $21 = HEAP32[$8>>2]|0;
  $22 = ((($f)) + 8|0);
  HEAP32[$22>>2] = $21;
  $23 = ((($f)) + 4|0);
  HEAP32[$23>>2] = $21;
  $$0 = 0;
  return ($$0|0);
 }
 $18 = $15 & 4;
 $19 = ($18|0)==(0);
 if ($19) {
  $$0 = -1;
  return ($$0|0);
 }
 $20 = $15 | 32;
 HEAP32[$f>>2] = $20;
 $$0 = -1;
 return ($$0|0);
}
function ___towrite($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 74|0);
 $1 = HEAP8[$0>>0]|0;
 $2 = $1 << 24 >> 24;
 $3 = (($2) + 255)|0;
 $4 = $3 | $2;
 $5 = $4&255;
 HEAP8[$0>>0] = $5;
 $6 = HEAP32[$f>>2]|0;
 $7 = $6 & 8;
 $8 = ($7|0)==(0);
 if ($8) {
  $10 = ((($f)) + 8|0);
  HEAP32[$10>>2] = 0;
  $11 = ((($f)) + 4|0);
  HEAP32[$11>>2] = 0;
  $12 = ((($f)) + 44|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = ((($f)) + 28|0);
  HEAP32[$14>>2] = $13;
  $15 = ((($f)) + 20|0);
  HEAP32[$15>>2] = $13;
  $16 = $13;
  $17 = ((($f)) + 48|0);
  $18 = HEAP32[$17>>2]|0;
  $19 = (($16) + ($18)|0);
  $20 = ((($f)) + 16|0);
  HEAP32[$20>>2] = $19;
  $$0 = 0;
  return ($$0|0);
 } else {
  $9 = $6 | 32;
  HEAP32[$f>>2] = $9;
  $$0 = -1;
  return ($$0|0);
 }
 return (0)|0;
}
function ___uflow($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $c = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $c = sp;
 $0 = ((($f)) + 8|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 if ($2) {
  $3 = (___toread($f)|0);
  $4 = ($3|0)==(0);
  if ($4) {
   label = 3;
  } else {
   $$0 = -1;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  $5 = ((($f)) + 32|0);
  $6 = HEAP32[$5>>2]|0;
  $7 = (FUNCTION_TABLE_iiii[$6 & 3]($f,$c,1)|0);
  $8 = ($7|0)==(1);
  if ($8) {
   $9 = HEAP8[$c>>0]|0;
   $10 = $9&255;
   $$0 = $10;
  } else {
   $$0 = -1;
  }
 }
 STACKTOP = sp;return ($$0|0);
}
function ___fwritex($s,$l,$f) {
 $s = $s|0;
 $l = $l|0;
 $f = $f|0;
 var $$0 = 0, $$01 = 0, $$02 = 0, $$pre = 0, $$pre6 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0;
 var $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $i$0 = 0, $i$0$lcssa10 = 0;
 var $i$1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 16|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ($1|0)==(0|0);
 do {
  if ($2) {
   $3 = (___towrite($f)|0);
   $4 = ($3|0)==(0);
   if ($4) {
    $$pre = HEAP32[$0>>2]|0;
    $7 = $$pre;
    break;
   } else {
    $$0 = 0;
    return ($$0|0);
   }
  } else {
   $7 = $1;
  }
 } while(0);
 $5 = ((($f)) + 20|0);
 $6 = HEAP32[$5>>2]|0;
 $8 = $7;
 $9 = $6;
 $10 = (($8) - ($9))|0;
 $11 = ($10>>>0)<($l>>>0);
 if ($11) {
  $12 = ((($f)) + 36|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = (FUNCTION_TABLE_iiii[$13 & 3]($f,$s,$l)|0);
  $$0 = $14;
  return ($$0|0);
 }
 $15 = ((($f)) + 75|0);
 $16 = HEAP8[$15>>0]|0;
 $17 = ($16<<24>>24)>(-1);
 L11: do {
  if ($17) {
   $i$0 = $l;
   while(1) {
    $18 = ($i$0|0)==(0);
    if ($18) {
     $$01 = $l;$$02 = $s;$29 = $6;$i$1 = 0;
     break L11;
    }
    $19 = (($i$0) + -1)|0;
    $20 = (($s) + ($19)|0);
    $21 = HEAP8[$20>>0]|0;
    $22 = ($21<<24>>24)==(10);
    if ($22) {
     $i$0$lcssa10 = $i$0;
     break;
    } else {
     $i$0 = $19;
    }
   }
   $23 = ((($f)) + 36|0);
   $24 = HEAP32[$23>>2]|0;
   $25 = (FUNCTION_TABLE_iiii[$24 & 3]($f,$s,$i$0$lcssa10)|0);
   $26 = ($25>>>0)<($i$0$lcssa10>>>0);
   if ($26) {
    $$0 = $i$0$lcssa10;
    return ($$0|0);
   } else {
    $27 = (($s) + ($i$0$lcssa10)|0);
    $28 = (($l) - ($i$0$lcssa10))|0;
    $$pre6 = HEAP32[$5>>2]|0;
    $$01 = $28;$$02 = $27;$29 = $$pre6;$i$1 = $i$0$lcssa10;
    break;
   }
  } else {
   $$01 = $l;$$02 = $s;$29 = $6;$i$1 = 0;
  }
 } while(0);
 _memcpy(($29|0),($$02|0),($$01|0))|0;
 $30 = HEAP32[$5>>2]|0;
 $31 = (($30) + ($$01)|0);
 HEAP32[$5>>2] = $31;
 $32 = (($i$1) + ($$01))|0;
 $$0 = $32;
 return ($$0|0);
}
function _sprintf($s,$fmt,$varargs) {
 $s = $s|0;
 $fmt = $fmt|0;
 $varargs = $varargs|0;
 var $0 = 0, $ap = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0;
 $ap = sp;
 HEAP32[$ap>>2] = $varargs;
 $0 = (_vsprintf($s,$fmt,$ap)|0);
 STACKTOP = sp;return ($0|0);
}
function _MUSL_vfprintf($f,$fmt,$ap) {
 $f = $f|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $$ = 0, $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $ap2 = 0, $internal_buf = 0, $nl_arg = 0, $nl_type = 0, $ret$1 = 0, $vacopy_currentptr = 0, dest = 0, label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 224|0;
 $ap2 = sp + 120|0;
 $nl_type = sp + 80|0;
 $nl_arg = sp;
 $internal_buf = sp + 136|0;
 dest=$nl_type; stop=dest+40|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $vacopy_currentptr = HEAP32[$ap>>2]|0;
 HEAP32[$ap2>>2] = $vacopy_currentptr;
 $0 = (_printf_core(0,$fmt,$ap2,$nl_arg,$nl_type)|0);
 $1 = ($0|0)<(0);
 if ($1) {
  $$0 = -1;
  STACKTOP = sp;return ($$0|0);
 }
 $2 = ((($f)) + 48|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($3|0)==(0);
 if ($4) {
  $6 = ((($f)) + 44|0);
  $7 = HEAP32[$6>>2]|0;
  HEAP32[$6>>2] = $internal_buf;
  $8 = ((($f)) + 28|0);
  HEAP32[$8>>2] = $internal_buf;
  $9 = ((($f)) + 20|0);
  HEAP32[$9>>2] = $internal_buf;
  HEAP32[$2>>2] = 80;
  $10 = ((($internal_buf)) + 80|0);
  $11 = ((($f)) + 16|0);
  HEAP32[$11>>2] = $10;
  $12 = (_printf_core($f,$fmt,$ap2,$nl_arg,$nl_type)|0);
  $13 = ($7|0)==(0|0);
  if ($13) {
   $ret$1 = $12;
  } else {
   $14 = ((($f)) + 36|0);
   $15 = HEAP32[$14>>2]|0;
   (FUNCTION_TABLE_iiii[$15 & 3]($f,0,0)|0);
   $16 = HEAP32[$9>>2]|0;
   $17 = ($16|0)==(0|0);
   $$ = $17 ? -1 : $12;
   HEAP32[$6>>2] = $7;
   HEAP32[$2>>2] = 0;
   HEAP32[$11>>2] = 0;
   HEAP32[$8>>2] = 0;
   HEAP32[$9>>2] = 0;
   $ret$1 = $$;
  }
 } else {
  $5 = (_printf_core($f,$fmt,$ap2,$nl_arg,$nl_type)|0);
  $ret$1 = $5;
 }
 $$0 = $ret$1;
 STACKTOP = sp;return ($$0|0);
}
function _vsnprintf($s,$n,$fmt,$ap) {
 $s = $s|0;
 $n = $n|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $$$02 = 0, $$0 = 0, $$01 = 0, $$02 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0;
 var $6 = 0, $7 = 0, $8 = 0, $9 = 0, $b = 0, $f = 0, dest = 0, label = 0, sp = 0, src = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 128|0;
 $b = sp + 112|0;
 $f = sp;
 dest=$f; src=1400; stop=dest+112|0; do { HEAP32[dest>>2]=HEAP32[src>>2]|0; dest=dest+4|0; src=src+4|0; } while ((dest|0) < (stop|0));
 $0 = (($n) + -1)|0;
 $1 = ($0>>>0)>(2147483646);
 if ($1) {
  $2 = ($n|0)==(0);
  if ($2) {
   $$01 = $b;$$02 = 1;
  } else {
   $3 = (___errno_location()|0);
   HEAP32[$3>>2] = 75;
   $$0 = -1;
   STACKTOP = sp;return ($$0|0);
  }
 } else {
  $$01 = $s;$$02 = $n;
 }
 $4 = $$01;
 $5 = (-2 - ($4))|0;
 $6 = ($$02>>>0)>($5>>>0);
 $$$02 = $6 ? $5 : $$02;
 $7 = ((($f)) + 48|0);
 HEAP32[$7>>2] = $$$02;
 $8 = ((($f)) + 20|0);
 HEAP32[$8>>2] = $$01;
 $9 = ((($f)) + 44|0);
 HEAP32[$9>>2] = $$01;
 $10 = (($$01) + ($$$02)|0);
 $11 = ((($f)) + 16|0);
 HEAP32[$11>>2] = $10;
 $12 = ((($f)) + 28|0);
 HEAP32[$12>>2] = $10;
 $13 = (_MUSL_vfprintf($f,$fmt,$ap)|0);
 $14 = ($$$02|0)==(0);
 if ($14) {
  $$0 = $13;
  STACKTOP = sp;return ($$0|0);
 }
 $15 = HEAP32[$8>>2]|0;
 $16 = HEAP32[$11>>2]|0;
 $17 = ($15|0)==($16|0);
 $18 = $17 << 31 >> 31;
 $19 = (($15) + ($18)|0);
 HEAP8[$19>>0] = 0;
 $$0 = $13;
 STACKTOP = sp;return ($$0|0);
}
function _vsprintf($s,$fmt,$ap) {
 $s = $s|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_vsnprintf($s,2147483647,$fmt,$ap)|0);
 return ($0|0);
}
function _strtof($s,$p) {
 $s = $s|0;
 $p = $p|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $2 = 0, $3 = 0, $4 = 0.0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $f$i = 0, dest = 0;
 var label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0;
 $f$i = sp;
 dest=$f$i; stop=dest+112|0; do { HEAP32[dest>>2]=0|0; dest=dest+4|0; } while ((dest|0) < (stop|0));
 $0 = ((($f$i)) + 4|0);
 HEAP32[$0>>2] = $s;
 $1 = ((($f$i)) + 8|0);
 HEAP32[$1>>2] = (-1);
 $2 = ((($f$i)) + 44|0);
 HEAP32[$2>>2] = $s;
 $3 = ((($f$i)) + 76|0);
 HEAP32[$3>>2] = -1;
 ___shlim($f$i,0);
 $4 = (+___floatscan($f$i,0,1));
 $5 = ((($f$i)) + 108|0);
 $6 = HEAP32[$5>>2]|0;
 $7 = HEAP32[$0>>2]|0;
 $8 = HEAP32[$1>>2]|0;
 $9 = $7;
 $10 = $8;
 $11 = (($9) - ($10))|0;
 $12 = (($11) + ($6))|0;
 $13 = ($p|0)==(0|0);
 if ($13) {
  $17 = $4;
  STACKTOP = sp;return (+$17);
 }
 $14 = ($12|0)!=(0);
 $15 = (($s) + ($12)|0);
 $16 = $14 ? $15 : $s;
 HEAP32[$p>>2] = $16;
 $17 = $4;
 STACKTOP = sp;return (+$17);
}
function _memchr($src,$c,$n) {
 $src = $src|0;
 $c = $c|0;
 $n = $n|0;
 var $$0$lcssa = 0, $$0$lcssa44 = 0, $$019 = 0, $$1$lcssa = 0, $$110 = 0, $$110$lcssa = 0, $$24 = 0, $$3 = 0, $$lcssa = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0;
 var $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0;
 var $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond18 = 0, $s$0$lcssa = 0, $s$0$lcssa43 = 0, $s$020 = 0, $s$15 = 0, $s$2 = 0, $w$0$lcssa = 0, $w$011 = 0, $w$011$lcssa = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = $c & 255;
 $1 = $src;
 $2 = $1 & 3;
 $3 = ($2|0)!=(0);
 $4 = ($n|0)!=(0);
 $or$cond18 = $4 & $3;
 L1: do {
  if ($or$cond18) {
   $5 = $c&255;
   $$019 = $n;$s$020 = $src;
   while(1) {
    $6 = HEAP8[$s$020>>0]|0;
    $7 = ($6<<24>>24)==($5<<24>>24);
    if ($7) {
     $$0$lcssa44 = $$019;$s$0$lcssa43 = $s$020;
     label = 6;
     break L1;
    }
    $8 = ((($s$020)) + 1|0);
    $9 = (($$019) + -1)|0;
    $10 = $8;
    $11 = $10 & 3;
    $12 = ($11|0)!=(0);
    $13 = ($9|0)!=(0);
    $or$cond = $13 & $12;
    if ($or$cond) {
     $$019 = $9;$s$020 = $8;
    } else {
     $$0$lcssa = $9;$$lcssa = $13;$s$0$lcssa = $8;
     label = 5;
     break;
    }
   }
  } else {
   $$0$lcssa = $n;$$lcssa = $4;$s$0$lcssa = $src;
   label = 5;
  }
 } while(0);
 if ((label|0) == 5) {
  if ($$lcssa) {
   $$0$lcssa44 = $$0$lcssa;$s$0$lcssa43 = $s$0$lcssa;
   label = 6;
  } else {
   $$3 = 0;$s$2 = $s$0$lcssa;
  }
 }
 L8: do {
  if ((label|0) == 6) {
   $14 = HEAP8[$s$0$lcssa43>>0]|0;
   $15 = $c&255;
   $16 = ($14<<24>>24)==($15<<24>>24);
   if ($16) {
    $$3 = $$0$lcssa44;$s$2 = $s$0$lcssa43;
   } else {
    $17 = Math_imul($0, 16843009)|0;
    $18 = ($$0$lcssa44>>>0)>(3);
    L11: do {
     if ($18) {
      $$110 = $$0$lcssa44;$w$011 = $s$0$lcssa43;
      while(1) {
       $19 = HEAP32[$w$011>>2]|0;
       $20 = $19 ^ $17;
       $21 = (($20) + -16843009)|0;
       $22 = $20 & -2139062144;
       $23 = $22 ^ -2139062144;
       $24 = $23 & $21;
       $25 = ($24|0)==(0);
       if (!($25)) {
        $$110$lcssa = $$110;$w$011$lcssa = $w$011;
        break;
       }
       $26 = ((($w$011)) + 4|0);
       $27 = (($$110) + -4)|0;
       $28 = ($27>>>0)>(3);
       if ($28) {
        $$110 = $27;$w$011 = $26;
       } else {
        $$1$lcssa = $27;$w$0$lcssa = $26;
        label = 11;
        break L11;
       }
      }
      $$24 = $$110$lcssa;$s$15 = $w$011$lcssa;
     } else {
      $$1$lcssa = $$0$lcssa44;$w$0$lcssa = $s$0$lcssa43;
      label = 11;
     }
    } while(0);
    if ((label|0) == 11) {
     $29 = ($$1$lcssa|0)==(0);
     if ($29) {
      $$3 = 0;$s$2 = $w$0$lcssa;
      break;
     } else {
      $$24 = $$1$lcssa;$s$15 = $w$0$lcssa;
     }
    }
    while(1) {
     $30 = HEAP8[$s$15>>0]|0;
     $31 = ($30<<24>>24)==($15<<24>>24);
     if ($31) {
      $$3 = $$24;$s$2 = $s$15;
      break L8;
     }
     $32 = ((($s$15)) + 1|0);
     $33 = (($$24) + -1)|0;
     $34 = ($33|0)==(0);
     if ($34) {
      $$3 = 0;$s$2 = $32;
      break;
     } else {
      $$24 = $33;$s$15 = $32;
     }
    }
   }
  }
 } while(0);
 $35 = ($$3|0)!=(0);
 $36 = $35 ? $s$2 : 0;
 return ($36|0);
}
function _strcmp($l,$r) {
 $l = $l|0;
 $r = $r|0;
 var $$014 = 0, $$05 = 0, $$lcssa = 0, $$lcssa2 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $or$cond = 0, $or$cond3 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 $0 = HEAP8[$l>>0]|0;
 $1 = HEAP8[$r>>0]|0;
 $2 = ($0<<24>>24)!=($1<<24>>24);
 $3 = ($0<<24>>24)==(0);
 $or$cond3 = $3 | $2;
 if ($or$cond3) {
  $$lcssa = $0;$$lcssa2 = $1;
 } else {
  $$014 = $l;$$05 = $r;
  while(1) {
   $4 = ((($$014)) + 1|0);
   $5 = ((($$05)) + 1|0);
   $6 = HEAP8[$4>>0]|0;
   $7 = HEAP8[$5>>0]|0;
   $8 = ($6<<24>>24)!=($7<<24>>24);
   $9 = ($6<<24>>24)==(0);
   $or$cond = $9 | $8;
   if ($or$cond) {
    $$lcssa = $6;$$lcssa2 = $7;
    break;
   } else {
    $$014 = $4;$$05 = $5;
   }
  }
 }
 $10 = $$lcssa&255;
 $11 = $$lcssa2&255;
 $12 = (($10) - ($11))|0;
 return ($12|0);
}
function _scanexp($f,$pok) {
 $f = $f|0;
 $pok = $pok|0;
 var $$lcssa22 = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0;
 var $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0;
 var $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0;
 var $99 = 0, $c$0 = 0, $c$1$be = 0, $c$1$be$lcssa = 0, $c$112 = 0, $c$2$be = 0, $c$2$lcssa = 0, $c$27 = 0, $c$3$be = 0, $neg$0 = 0, $or$cond3 = 0, $x$013 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 4|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($f)) + 100|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = ($1>>>0)<($3>>>0);
 if ($4) {
  $5 = ((($1)) + 1|0);
  HEAP32[$0>>2] = $5;
  $6 = HEAP8[$1>>0]|0;
  $7 = $6&255;
  $9 = $7;
 } else {
  $8 = (___shgetc($f)|0);
  $9 = $8;
 }
 $10 = ($9|0)==(45);
 if ((($9|0) == 43) | (($9|0) == 45)) {
  $11 = $10&1;
  $12 = HEAP32[$0>>2]|0;
  $13 = HEAP32[$2>>2]|0;
  $14 = ($12>>>0)<($13>>>0);
  if ($14) {
   $15 = ((($12)) + 1|0);
   HEAP32[$0>>2] = $15;
   $16 = HEAP8[$12>>0]|0;
   $17 = $16&255;
   $20 = $17;
  } else {
   $18 = (___shgetc($f)|0);
   $20 = $18;
  }
  $19 = (($20) + -48)|0;
  $21 = ($19>>>0)>(9);
  $22 = ($pok|0)!=(0);
  $or$cond3 = $22 & $21;
  if ($or$cond3) {
   $23 = HEAP32[$2>>2]|0;
   $24 = ($23|0)==(0|0);
   if ($24) {
    $c$0 = $20;$neg$0 = $11;
   } else {
    $25 = HEAP32[$0>>2]|0;
    $26 = ((($25)) + -1|0);
    HEAP32[$0>>2] = $26;
    $c$0 = $20;$neg$0 = $11;
   }
  } else {
   $c$0 = $20;$neg$0 = $11;
  }
 } else {
  $c$0 = $9;$neg$0 = 0;
 }
 $27 = (($c$0) + -48)|0;
 $28 = ($27>>>0)>(9);
 if ($28) {
  $29 = HEAP32[$2>>2]|0;
  $30 = ($29|0)==(0|0);
  if ($30) {
   $98 = -2147483648;$99 = 0;
   tempRet0 = ($98);
   return ($99|0);
  }
  $31 = HEAP32[$0>>2]|0;
  $32 = ((($31)) + -1|0);
  HEAP32[$0>>2] = $32;
  $98 = -2147483648;$99 = 0;
  tempRet0 = ($98);
  return ($99|0);
 } else {
  $c$112 = $c$0;$x$013 = 0;
 }
 while(1) {
  $33 = ($x$013*10)|0;
  $34 = (($c$112) + -48)|0;
  $35 = (($34) + ($33))|0;
  $36 = HEAP32[$0>>2]|0;
  $37 = HEAP32[$2>>2]|0;
  $38 = ($36>>>0)<($37>>>0);
  if ($38) {
   $39 = ((($36)) + 1|0);
   HEAP32[$0>>2] = $39;
   $40 = HEAP8[$36>>0]|0;
   $41 = $40&255;
   $c$1$be = $41;
  } else {
   $42 = (___shgetc($f)|0);
   $c$1$be = $42;
  }
  $43 = (($c$1$be) + -48)|0;
  $44 = ($43>>>0)<(10);
  $45 = ($35|0)<(214748364);
  $46 = $44 & $45;
  if ($46) {
   $c$112 = $c$1$be;$x$013 = $35;
  } else {
   $$lcssa22 = $35;$c$1$be$lcssa = $c$1$be;
   break;
  }
 }
 $47 = ($$lcssa22|0)<(0);
 $48 = $47 << 31 >> 31;
 $49 = (($c$1$be$lcssa) + -48)|0;
 $50 = ($49>>>0)<(10);
 if ($50) {
  $53 = $$lcssa22;$54 = $48;$c$27 = $c$1$be$lcssa;
  while(1) {
   $55 = (___muldi3(($53|0),($54|0),10,0)|0);
   $56 = tempRet0;
   $57 = ($c$27|0)<(0);
   $58 = $57 << 31 >> 31;
   $59 = (_i64Add(($c$27|0),($58|0),-48,-1)|0);
   $60 = tempRet0;
   $61 = (_i64Add(($59|0),($60|0),($55|0),($56|0))|0);
   $62 = tempRet0;
   $63 = HEAP32[$0>>2]|0;
   $64 = HEAP32[$2>>2]|0;
   $65 = ($63>>>0)<($64>>>0);
   if ($65) {
    $66 = ((($63)) + 1|0);
    HEAP32[$0>>2] = $66;
    $67 = HEAP8[$63>>0]|0;
    $68 = $67&255;
    $c$2$be = $68;
   } else {
    $69 = (___shgetc($f)|0);
    $c$2$be = $69;
   }
   $70 = (($c$2$be) + -48)|0;
   $71 = ($70>>>0)<(10);
   $72 = ($62|0)<(21474836);
   $73 = ($61>>>0)<(2061584302);
   $74 = ($62|0)==(21474836);
   $75 = $74 & $73;
   $76 = $72 | $75;
   $77 = $71 & $76;
   if ($77) {
    $53 = $61;$54 = $62;$c$27 = $c$2$be;
   } else {
    $92 = $61;$93 = $62;$c$2$lcssa = $c$2$be;
    break;
   }
  }
 } else {
  $92 = $$lcssa22;$93 = $48;$c$2$lcssa = $c$1$be$lcssa;
 }
 $51 = (($c$2$lcssa) + -48)|0;
 $52 = ($51>>>0)<(10);
 if ($52) {
  while(1) {
   $78 = HEAP32[$0>>2]|0;
   $79 = HEAP32[$2>>2]|0;
   $80 = ($78>>>0)<($79>>>0);
   if ($80) {
    $81 = ((($78)) + 1|0);
    HEAP32[$0>>2] = $81;
    $82 = HEAP8[$78>>0]|0;
    $83 = $82&255;
    $c$3$be = $83;
   } else {
    $84 = (___shgetc($f)|0);
    $c$3$be = $84;
   }
   $85 = (($c$3$be) + -48)|0;
   $86 = ($85>>>0)<(10);
   if (!($86)) {
    break;
   }
  }
 }
 $87 = HEAP32[$2>>2]|0;
 $88 = ($87|0)==(0|0);
 if (!($88)) {
  $89 = HEAP32[$0>>2]|0;
  $90 = ((($89)) + -1|0);
  HEAP32[$0>>2] = $90;
 }
 $91 = ($neg$0|0)!=(0);
 $94 = (_i64Subtract(0,0,($92|0),($93|0))|0);
 $95 = tempRet0;
 $96 = $91 ? $94 : $92;
 $97 = $91 ? $95 : $93;
 $98 = $97;$99 = $96;
 tempRet0 = ($98);
 return ($99|0);
}
function _printf_core($f,$fmt,$ap,$nl_arg,$nl_type) {
 $f = $f|0;
 $fmt = $fmt|0;
 $ap = $ap|0;
 $nl_arg = $nl_arg|0;
 $nl_type = $nl_type|0;
 var $$ = 0, $$$i = 0, $$0 = 0, $$0$i = 0, $$0$lcssa$i = 0, $$0$lcssa$i$i = 0, $$0$lcssa$i104$i = 0, $$0$lcssa$i128$i = 0, $$0$lcssa$i143$i = 0, $$0$lcssa$i39$i = 0, $$0$lcssa$i46 = 0, $$0$lcssa$i46$i = 0, $$0$lcssa$i48$i = 0, $$0$lcssa$i51 = 0, $$0$lcssa$i53 = 0, $$0$lcssa$i56$i = 0, $$0$lcssa$i61 = 0, $$0$lcssa$i63$i = 0, $$0$lcssa$i68 = 0, $$0$lcssa$i69$i = 0;
 var $$0$lcssa$i75 = 0, $$0$lcssa$i76$i = 0, $$0$lcssa$i84$i = 0, $$0$lcssa$i85 = 0, $$0$lcssa$i97$i = 0, $$01$i = 0, $$01$i$i = 0, $$01$i102$i = 0, $$01$i126$i = 0, $$01$i141$i = 0, $$01$i37$i = 0, $$01$i44 = 0, $$01$i44$i = 0, $$01$i54$i = 0, $$01$i59 = 0, $$01$i61$i = 0, $$01$i66 = 0, $$01$i67$i = 0, $$01$i73 = 0, $$01$i74$i = 0;
 var $$01$i83 = 0, $$01$i95$i = 0, $$01$lcssa$off0$i = 0, $$01$lcssa$off0$i$i = 0, $$01$lcssa$off0$i85$i = 0, $$012$i = 0, $$013$i = 0, $$03$i48 = 0, $$05$i = 0, $$05$i$i = 0, $$05$i79$i = 0, $$07$i = 0.0, $$1$i = 0.0, $$1$lcssa$i$i = 0, $$1$lcssa$i112$i = 0, $$114$i = 0, $$12$i = 0, $$12$i$i = 0, $$12$i110$i = 0, $$12$i119$i = 0;
 var $$12$i134$i = 0, $$12$i134$i$lcssa = 0, $$12$i87$i = 0, $$2$i = 0.0, $$2$us$i = 0.0, $$2$us$us$i = 0.0, $$20$i = 0.0, $$21$i = 0, $$210$$22$i = 0, $$210$$24$i = 0, $$210$i = 0, $$23$i = 0, $$24 = 0, $$25 = 0, $$3$i = 0.0, $$31$i = 0, $$311$i = 0, $$4$i = 0.0, $$412$lcssa$i = 0, $$412184$i = 0;
 var $$5196$i = 0, $$92 = 0, $$a$3$i = 0, $$a$3$us$i = 0, $$a$3$us303$i = 0, $$a$3$us304$i = 0, $$a$3305$i = 0, $$a$3306$i = 0, $$fl$4 = 0, $$l10n$0 = 0, $$lcssa106 = 0, $$lcssa275$i = 0, $$lcssa450 = 0, $$lcssa451 = 0, $$lcssa455 = 0, $$lcssa457 = 0, $$lcssa458 = 0, $$lcssa459 = 0, $$lcssa460 = 0, $$lcssa461 = 0;
 var $$lcssa463 = 0, $$lcssa464 = 0, $$lcssa470 = 0, $$lcssa474 = 0, $$lcssa476 = 0, $$lcssa479 = 0, $$lcssa480 = 0, $$lcssa483 = 0.0, $$lcssa484 = 0, $$lcssa487 = 0, $$lcssa491 = 0, $$mask$i = 0, $$mask$i38 = 0, $$mask1$i = 0, $$mask1$i37 = 0, $$neg151$i = 0, $$neg152$i = 0, $$p$$i = 0, $$p$5 = 0, $$p$i = 0;
 var $$pn$i = 0, $$pr$i = 0, $$pr146$i = 0, $$pre = 0, $$pre$i = 0, $$pre$phi302$iZ2D = 0, $$pre270 = 0, $$pre300$i = 0, $$pre301$i = 0, $$sum$i = 0, $$sum15$i = 0, $$sum16$i = 0, $$z$3$i = 0, $$z$4$i = 0, $$z$4$us$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0;
 var $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0;
 var $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0;
 var $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0;
 var $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $1071 = 0, $1072 = 0, $1073 = 0;
 var $1074 = 0, $1075 = 0, $1076 = 0, $1077 = 0, $1078 = 0, $1079 = 0, $108 = 0, $1080 = 0, $1081 = 0, $1082 = 0, $1083 = 0, $1084 = 0, $1085 = 0, $1086 = 0, $1087 = 0, $1088 = 0, $1089 = 0, $109 = 0, $1090 = 0, $1091 = 0;
 var $1092 = 0, $1093 = 0, $1094 = 0, $1095 = 0, $1096 = 0, $1097 = 0, $1098 = 0, $1099 = 0, $11 = 0, $110 = 0, $1100 = 0, $1101 = 0, $1102 = 0, $1103 = 0, $1104 = 0, $1105 = 0, $1106 = 0, $1107 = 0, $1108 = 0, $1109 = 0;
 var $111 = 0, $1110 = 0, $1111 = 0, $1112 = 0, $1113 = 0, $1114 = 0, $1115 = 0, $1116 = 0, $1117 = 0, $1118 = 0, $1119 = 0, $112 = 0, $1120 = 0, $1121 = 0, $1122 = 0, $1123 = 0, $1124 = 0, $1125 = 0, $1126 = 0, $1127 = 0;
 var $1128 = 0, $1129 = 0, $113 = 0, $1130 = 0, $1131 = 0, $1132 = 0, $1133 = 0, $1134 = 0, $1135 = 0, $1136 = 0, $1137 = 0, $1138 = 0, $1139 = 0, $114 = 0, $1140 = 0, $1141 = 0, $1142 = 0, $1143 = 0, $1144 = 0, $1145 = 0;
 var $1146 = 0, $1147 = 0, $1148 = 0, $1149 = 0, $115 = 0, $1150 = 0, $1151 = 0, $1152 = 0, $1153 = 0, $1154 = 0.0, $1155 = 0, $1156 = 0, $1157 = 0, $1158 = 0, $1159 = 0, $116 = 0, $1160 = 0, $1161 = 0.0, $1162 = 0, $1163 = 0;
 var $1164 = 0, $1165 = 0, $1166 = 0, $1167 = 0, $1168 = 0, $1169 = 0, $1169$phi = 0, $117 = 0, $1170 = 0, $1170$phi = 0, $1171 = 0, $1172 = 0, $1173 = 0, $1174 = 0, $1175 = 0, $1176 = 0, $1177 = 0, $1178 = 0, $1179 = 0, $118 = 0;
 var $1180 = 0, $1181 = 0, $1182 = 0, $1183 = 0, $1184 = 0, $1185 = 0, $1186 = 0, $1187 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0;
 var $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0;
 var $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0;
 var $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0;
 var $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0;
 var $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0;
 var $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0;
 var $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0.0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0.0, $253 = 0, $254 = 0, $255 = 0;
 var $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0;
 var $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0;
 var $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0;
 var $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0;
 var $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0;
 var $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0;
 var $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0;
 var $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0;
 var $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0;
 var $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0.0, $431 = 0, $432 = 0.0, $433 = 0, $434 = 0, $435 = 0;
 var $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0;
 var $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0.0;
 var $472 = 0.0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0.0, $488 = 0, $489 = 0, $49 = 0;
 var $490 = 0, $491 = 0.0, $492 = 0.0, $493 = 0.0, $494 = 0.0, $495 = 0.0, $496 = 0.0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0;
 var $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0;
 var $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0;
 var $544 = 0.0, $545 = 0.0, $546 = 0.0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0.0, $56 = 0, $560 = 0.0, $561 = 0.0;
 var $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0.0, $575 = 0.0, $576 = 0.0, $577 = 0, $578 = 0, $579 = 0, $58 = 0;
 var $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0;
 var $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0;
 var $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0.0, $632 = 0, $633 = 0;
 var $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0.0, $64 = 0, $640 = 0.0, $641 = 0.0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0;
 var $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0;
 var $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0;
 var $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0;
 var $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0;
 var $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0;
 var $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0;
 var $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0;
 var $779 = 0, $78 = 0, $780 = 0.0, $781 = 0.0, $782 = 0, $783 = 0.0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0;
 var $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0;
 var $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0;
 var $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0;
 var $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0;
 var $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0;
 var $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0;
 var $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0;
 var $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0;
 var $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0;
 var $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0;
 var $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0;
 var $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $a$0 = 0, $a$1 = 0, $a$1$lcssa$i = 0, $a$1253$i = 0, $a$2 = 0, $a$2$ph$i = 0, $a$3$lcssa$i = 0, $a$3240$i = 0, $a$3240$us$i = 0, $a$5$lcssa$i = 0, $a$5215$i = 0, $a$6$i = 0, $a$7$i = 0, $a$8$ph$i = 0, $arglist_current = 0;
 var $arglist_current11 = 0, $arglist_current14 = 0, $arglist_current17 = 0, $arglist_current2 = 0, $arglist_current20 = 0, $arglist_current23 = 0, $arglist_current26 = 0, $arglist_current29 = 0, $arglist_current32 = 0, $arglist_current35 = 0, $arglist_current38 = 0, $arglist_current41 = 0, $arglist_current44 = 0, $arglist_current47 = 0, $arglist_current5 = 0, $arglist_current50 = 0, $arglist_current53 = 0, $arglist_current56 = 0, $arglist_current59 = 0, $arglist_current62 = 0;
 var $arglist_current8 = 0, $arglist_next = 0, $arglist_next12 = 0, $arglist_next15 = 0, $arglist_next18 = 0, $arglist_next21 = 0, $arglist_next24 = 0, $arglist_next27 = 0, $arglist_next3 = 0, $arglist_next30 = 0, $arglist_next33 = 0, $arglist_next36 = 0, $arglist_next39 = 0, $arglist_next42 = 0, $arglist_next45 = 0, $arglist_next48 = 0, $arglist_next51 = 0, $arglist_next54 = 0, $arglist_next57 = 0, $arglist_next6 = 0;
 var $arglist_next60 = 0, $arglist_next63 = 0, $arglist_next9 = 0, $argpos$0 = 0, $big$i = 0, $buf = 0, $buf$i = 0, $carry$0246$i = 0, $carry3$0234$i = 0, $carry3$0234$us$i = 0, $cnt$0 = 0, $cnt$1 = 0, $cnt$1$lcssa = 0, $d$0$i = 0, $d$0245$i = 0, $d$0247$i = 0, $d$1233$i = 0, $d$1233$us$i = 0, $d$2$lcssa$i = 0, $d$2214$i = 0;
 var $d$3$i = 0, $d$4191$i = 0, $d$5183$i = 0, $d$6195$i = 0, $e$0229$i = 0, $e$1$i = 0, $e$2210$i = 0, $e$3$i = 0, $e$4$ph$i = 0, $e2$i = 0, $ebuf0$i = 0, $estr$0$i = 0, $estr$1$lcssa$i = 0, $estr$1$ph$i = 0, $estr$1201$i = 0, $estr$2$i = 0, $exitcond$i = 0, $expanded = 0, $expanded101 = 0, $expanded102 = 0;
 var $expanded103 = 0, $expanded105 = 0, $expanded106 = 0, $expanded108 = 0, $expanded109 = 0, $expanded110 = 0, $expanded112 = 0, $expanded113 = 0, $expanded115 = 0, $expanded116 = 0, $expanded117 = 0, $expanded119 = 0, $expanded120 = 0, $expanded122 = 0, $expanded123 = 0, $expanded124 = 0, $expanded126 = 0, $expanded127 = 0, $expanded129 = 0, $expanded130 = 0;
 var $expanded131 = 0, $expanded133 = 0, $expanded134 = 0, $expanded136 = 0, $expanded137 = 0, $expanded138 = 0, $expanded140 = 0, $expanded141 = 0, $expanded143 = 0, $expanded144 = 0, $expanded145 = 0, $expanded147 = 0, $expanded148 = 0, $expanded150 = 0, $expanded151 = 0, $expanded152 = 0, $expanded154 = 0, $expanded155 = 0, $expanded157 = 0, $expanded158 = 0;
 var $expanded159 = 0, $expanded161 = 0, $expanded162 = 0, $expanded164 = 0, $expanded165 = 0, $expanded166 = 0, $expanded168 = 0, $expanded169 = 0, $expanded171 = 0, $expanded172 = 0, $expanded173 = 0, $expanded175 = 0, $expanded176 = 0, $expanded178 = 0, $expanded179 = 0, $expanded180 = 0, $expanded182 = 0, $expanded183 = 0, $expanded185 = 0, $expanded186 = 0;
 var $expanded187 = 0, $expanded189 = 0, $expanded190 = 0, $expanded192 = 0, $expanded193 = 0, $expanded194 = 0, $expanded196 = 0, $expanded197 = 0, $expanded199 = 0, $expanded200 = 0, $expanded201 = 0, $expanded203 = 0, $expanded204 = 0, $expanded206 = 0, $expanded207 = 0, $expanded208 = 0, $expanded210 = 0, $expanded211 = 0, $expanded213 = 0, $expanded214 = 0;
 var $expanded215 = 0, $expanded64 = 0, $expanded66 = 0, $expanded67 = 0, $expanded68 = 0, $expanded70 = 0, $expanded71 = 0, $expanded73 = 0, $expanded74 = 0, $expanded75 = 0, $expanded77 = 0, $expanded78 = 0, $expanded80 = 0, $expanded81 = 0, $expanded82 = 0, $expanded84 = 0, $expanded85 = 0, $expanded87 = 0, $expanded88 = 0, $expanded89 = 0;
 var $expanded91 = 0, $expanded92 = 0, $expanded94 = 0, $expanded95 = 0, $expanded96 = 0, $expanded98 = 0, $expanded99 = 0, $fl$0110 = 0, $fl$0170 = 0, $fl$1 = 0, $fl$1$ = 0, $fl$3 = 0, $fl$4 = 0, $fl$6 = 0, $i$0$lcssa = 0, $i$0$lcssa273 = 0, $i$0175 = 0, $i$0228$i = 0, $i$03$i = 0, $i$03$i30 = 0;
 var $i$1$lcssa$i = 0, $i$1186 = 0, $i$1222$i = 0, $i$2162 = 0, $i$2162$lcssa = 0, $i$2209$i = 0, $i$3160 = 0, $i$3205$i = 0, $isdigit = 0, $isdigit$i = 0, $isdigit$i32 = 0, $isdigit10 = 0, $isdigit12 = 0, $isdigit2$i = 0, $isdigit2$i28 = 0, $isdigittmp = 0, $isdigittmp$ = 0, $isdigittmp$i = 0, $isdigittmp$i31 = 0, $isdigittmp1$i = 0;
 var $isdigittmp1$i27 = 0, $isdigittmp11 = 0, $isdigittmp4$i = 0, $isdigittmp4$i29 = 0, $isdigittmp9 = 0, $j$0$i = 0, $j$0221$i = 0, $j$0223$i = 0, $j$1206$i = 0, $j$2$i = 0, $l$0 = 0, $l$0$i = 0, $l$1$i = 0, $l$1174 = 0, $l$2 = 0, $l10n$0 = 0, $l10n$0$lcssa = 0, $l10n$0$phi = 0, $l10n$1 = 0, $l10n$2 = 0;
 var $l10n$3 = 0, $mb = 0, $notlhs$us$us$i = 0, $notrhs$i = 0, $or$cond = 0, $or$cond$i = 0, $or$cond$i$i = 0, $or$cond$i100$i = 0, $or$cond$i35$i = 0, $or$cond$i42$i = 0, $or$cond$i52$i = 0, $or$cond$i57 = 0, $or$cond$i59$i = 0, $or$cond$i64 = 0, $or$cond$i71 = 0, $or$cond$i72$i = 0, $or$cond$i79 = 0, $or$cond$i81 = 0, $or$cond$i93$i = 0, $or$cond15 = 0;
 var $or$cond19 = 0, $or$cond22 = 0, $or$cond29$i = 0, $or$cond332 = 0, $or$cond6$i = 0, $p$0 = 0, $p$1 = 0, $p$2 = 0, $p$2$ = 0, $p$3 = 0, $p$4272 = 0, $p$5 = 0, $pad$i = 0, $pl$0 = 0, $pl$0$i = 0, $pl$1 = 0, $pl$1$i = 0, $pl$2 = 0, $prefix$0 = 0, $prefix$0$$i = 0;
 var $prefix$0$i = 0, $prefix$1 = 0, $prefix$2 = 0, $r$0$a$8$i = 0, $re$1179$i = 0, $round$0178$i = 0.0, $round6$1$i = 0.0, $s$0$i = 0, $s$0$us$i = 0, $s$0$us$us$i = 0, $s$1$i = 0, $s$1$lcssa$i = 0, $s$1$us$i = 0, $s$1$us$us$i = 0, $s1$0$i = 0, $s7$0188$i = 0, $s7$1$i = 0, $s8$0$lcssa$i = 0, $s8$0180$i = 0, $s9$0$i = 0;
 var $s9$1192$i = 0, $s9$2$i = 0, $sext = 0, $sext93 = 0, $small$0$i = 0.0, $small$1$i = 0.0, $st$0 = 0, $st$0$lcssa456 = 0, $storemerge = 0, $storemerge13 = 0, $storemerge8108 = 0, $storemerge8169 = 0, $t$0 = 0, $t$1 = 0, $w$$i = 0, $w$0 = 0, $w$1 = 0, $w$2 = 0, $w$30$i = 0, $wc = 0;
 var $ws$0176 = 0, $ws$1187 = 0, $y$03$i = 0, $y$03$i$i = 0, $y$03$i109$i = 0, $y$03$i118$i = 0, $y$03$i133$i = 0, $y$03$i86$i = 0, $z$0$i = 0, $z$0$lcssa = 0, $z$0163 = 0, $z$1 = 0, $z$1$lcssa$i = 0, $z$1252$i = 0, $z$2 = 0, $z$2$i = 0, $z$2$i$lcssa = 0, $z$3$lcssa$i = 0, $z$3239$i = 0, $z$3239$us$i = 0;
 var $z$4$i = 0, $z$4$us$i = 0, $z$6$$i = 0, $z$6$i = 0, $z$6$i$lcssa = 0, $z$6$ph$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 864|0;
 $big$i = sp + 16|0;
 $e2$i = sp + 8|0;
 $buf$i = sp + 836|0;
 $0 = $buf$i;
 $ebuf0$i = sp + 824|0;
 $pad$i = sp + 568|0;
 $buf = sp + 528|0;
 $wc = sp;
 $mb = sp + 520|0;
 $1 = ($f|0)!=(0|0);
 $2 = ((($buf)) + 40|0);
 $3 = $2;
 $4 = ((($buf)) + 39|0);
 $5 = ((($wc)) + 4|0);
 $6 = $wc;
 $7 = ((($ebuf0$i)) + 12|0);
 $8 = ((($ebuf0$i)) + 11|0);
 $9 = $7;
 $10 = (($9) - ($0))|0;
 $11 = (-2 - ($0))|0;
 $12 = (($9) + 2)|0;
 $13 = ((($big$i)) + 288|0);
 $14 = ((($buf$i)) + 9|0);
 $15 = $14;
 $16 = ((($buf$i)) + 8|0);
 $1169 = 0;$1170 = 0;$23 = $fmt;$cnt$0 = 0;$l$0 = 0;$l10n$0 = 0;
 L1: while(1) {
  $17 = ($cnt$0|0)>(-1);
  do {
   if ($17) {
    $18 = (2147483647 - ($cnt$0))|0;
    $19 = ($l$0|0)>($18|0);
    if ($19) {
     $20 = (___errno_location()|0);
     HEAP32[$20>>2] = 75;
     $cnt$1 = -1;
     break;
    } else {
     $21 = (($l$0) + ($cnt$0))|0;
     $cnt$1 = $21;
     break;
    }
   } else {
    $cnt$1 = $cnt$0;
   }
  } while(0);
  $22 = HEAP8[$23>>0]|0;
  $24 = ($22<<24>>24)==(0);
  if ($24) {
   $cnt$1$lcssa = $cnt$1;$l10n$0$lcssa = $l10n$0;
   label = 344;
   break;
  } else {
   $1171 = $22;$26 = $23;
  }
  while(1) {
   if ((($1171<<24>>24) == 37)) {
    $28 = $26;$z$0163 = $26;
    label = 9;
    break;
   } else if ((($1171<<24>>24) == 0)) {
    $$lcssa106 = $26;$z$0$lcssa = $26;
    break;
   }
   $25 = ((($26)) + 1|0);
   $$pre = HEAP8[$25>>0]|0;
   $1171 = $$pre;$26 = $25;
  }
  L12: do {
   if ((label|0) == 9) {
    while(1) {
     label = 0;
     $27 = ((($28)) + 1|0);
     $29 = HEAP8[$27>>0]|0;
     $30 = ($29<<24>>24)==(37);
     if (!($30)) {
      $$lcssa106 = $28;$z$0$lcssa = $z$0163;
      break L12;
     }
     $31 = ((($z$0163)) + 1|0);
     $32 = ((($28)) + 2|0);
     $33 = HEAP8[$32>>0]|0;
     $34 = ($33<<24>>24)==(37);
     if ($34) {
      $28 = $32;$z$0163 = $31;
      label = 9;
     } else {
      $$lcssa106 = $32;$z$0$lcssa = $31;
      break;
     }
    }
   }
  } while(0);
  $35 = $z$0$lcssa;
  $36 = $23;
  $37 = (($35) - ($36))|0;
  if ($1) {
   (___fwritex($23,$37,$f)|0);
  }
  $38 = ($z$0$lcssa|0)==($23|0);
  if (!($38)) {
   $l10n$0$phi = $l10n$0;$1170$phi = $1170;$1169$phi = $1169;$23 = $$lcssa106;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$0$phi;$1170 = $1170$phi;$1169 = $1169$phi;
   continue;
  }
  $39 = ((($$lcssa106)) + 1|0);
  $40 = HEAP8[$39>>0]|0;
  $41 = $40 << 24 >> 24;
  $isdigittmp = (($41) + -48)|0;
  $isdigit = ($isdigittmp>>>0)<(10);
  if ($isdigit) {
   $42 = ((($$lcssa106)) + 2|0);
   $43 = HEAP8[$42>>0]|0;
   $44 = ($43<<24>>24)==(36);
   $45 = ((($$lcssa106)) + 3|0);
   $$92 = $44 ? $45 : $39;
   $$l10n$0 = $44 ? 1 : $l10n$0;
   $isdigittmp$ = $44 ? $isdigittmp : -1;
   $$pre270 = HEAP8[$$92>>0]|0;
   $47 = $$pre270;$argpos$0 = $isdigittmp$;$l10n$1 = $$l10n$0;$storemerge = $$92;
  } else {
   $47 = $40;$argpos$0 = -1;$l10n$1 = $l10n$0;$storemerge = $39;
  }
  $46 = $47 << 24 >> 24;
  $48 = $46 & -32;
  $49 = ($48|0)==(32);
  L24: do {
   if ($49) {
    $51 = $46;$56 = $47;$fl$0170 = 0;$storemerge8169 = $storemerge;
    while(1) {
     $50 = (($51) + -32)|0;
     $52 = 1 << $50;
     $53 = $52 & 75913;
     $54 = ($53|0)==(0);
     if ($54) {
      $65 = $56;$fl$0110 = $fl$0170;$storemerge8108 = $storemerge8169;
      break L24;
     }
     $55 = $56 << 24 >> 24;
     $57 = (($55) + -32)|0;
     $58 = 1 << $57;
     $59 = $58 | $fl$0170;
     $60 = ((($storemerge8169)) + 1|0);
     $61 = HEAP8[$60>>0]|0;
     $62 = $61 << 24 >> 24;
     $63 = $62 & -32;
     $64 = ($63|0)==(32);
     if ($64) {
      $51 = $62;$56 = $61;$fl$0170 = $59;$storemerge8169 = $60;
     } else {
      $65 = $61;$fl$0110 = $59;$storemerge8108 = $60;
      break;
     }
    }
   } else {
    $65 = $47;$fl$0110 = 0;$storemerge8108 = $storemerge;
   }
  } while(0);
  $66 = ($65<<24>>24)==(42);
  do {
   if ($66) {
    $67 = ((($storemerge8108)) + 1|0);
    $68 = HEAP8[$67>>0]|0;
    $69 = $68 << 24 >> 24;
    $isdigittmp11 = (($69) + -48)|0;
    $isdigit12 = ($isdigittmp11>>>0)<(10);
    if ($isdigit12) {
     $70 = ((($storemerge8108)) + 2|0);
     $71 = HEAP8[$70>>0]|0;
     $72 = ($71<<24>>24)==(36);
     if ($72) {
      $73 = (($nl_type) + ($isdigittmp11<<2)|0);
      HEAP32[$73>>2] = 10;
      $74 = HEAP8[$67>>0]|0;
      $75 = $74 << 24 >> 24;
      $76 = (($75) + -48)|0;
      $77 = (($nl_arg) + ($76<<3)|0);
      $78 = $77;
      $79 = $78;
      $80 = HEAP32[$79>>2]|0;
      $81 = (($78) + 4)|0;
      $82 = $81;
      $83 = HEAP32[$82>>2]|0;
      $84 = ((($storemerge8108)) + 3|0);
      $l10n$2 = 1;$storemerge13 = $84;$w$0 = $80;
     } else {
      label = 23;
     }
    } else {
     label = 23;
    }
    if ((label|0) == 23) {
     label = 0;
     $85 = ($l10n$1|0)==(0);
     if (!($85)) {
      $$0 = -1;
      label = 363;
      break L1;
     }
     if (!($1)) {
      $105 = $67;$fl$1 = $fl$0110;$l10n$3 = 0;$w$1 = 0;
      break;
     }
     $arglist_current = HEAP32[$ap>>2]|0;
     $86 = $arglist_current;
     $87 = ((0) + 4|0);
     $expanded64 = $87;
     $expanded = (($expanded64) - 1)|0;
     $88 = (($86) + ($expanded))|0;
     $89 = ((0) + 4|0);
     $expanded68 = $89;
     $expanded67 = (($expanded68) - 1)|0;
     $expanded66 = $expanded67 ^ -1;
     $90 = $88 & $expanded66;
     $91 = $90;
     $92 = HEAP32[$91>>2]|0;
     $arglist_next = ((($91)) + 4|0);
     HEAP32[$ap>>2] = $arglist_next;
     $l10n$2 = 0;$storemerge13 = $67;$w$0 = $92;
    }
    $93 = ($w$0|0)<(0);
    if ($93) {
     $94 = $fl$0110 | 8192;
     $95 = (0 - ($w$0))|0;
     $105 = $storemerge13;$fl$1 = $94;$l10n$3 = $l10n$2;$w$1 = $95;
    } else {
     $105 = $storemerge13;$fl$1 = $fl$0110;$l10n$3 = $l10n$2;$w$1 = $w$0;
    }
   } else {
    $96 = $65 << 24 >> 24;
    $isdigittmp1$i = (($96) + -48)|0;
    $isdigit2$i = ($isdigittmp1$i>>>0)<(10);
    if ($isdigit2$i) {
     $100 = $storemerge8108;$i$03$i = 0;$isdigittmp4$i = $isdigittmp1$i;
     while(1) {
      $97 = ($i$03$i*10)|0;
      $98 = (($97) + ($isdigittmp4$i))|0;
      $99 = ((($100)) + 1|0);
      $101 = HEAP8[$99>>0]|0;
      $102 = $101 << 24 >> 24;
      $isdigittmp$i = (($102) + -48)|0;
      $isdigit$i = ($isdigittmp$i>>>0)<(10);
      if ($isdigit$i) {
       $100 = $99;$i$03$i = $98;$isdigittmp4$i = $isdigittmp$i;
      } else {
       $$lcssa450 = $98;$$lcssa451 = $99;
       break;
      }
     }
     $103 = ($$lcssa450|0)<(0);
     if ($103) {
      $$0 = -1;
      label = 363;
      break L1;
     } else {
      $105 = $$lcssa451;$fl$1 = $fl$0110;$l10n$3 = $l10n$1;$w$1 = $$lcssa450;
     }
    } else {
     $105 = $storemerge8108;$fl$1 = $fl$0110;$l10n$3 = $l10n$1;$w$1 = 0;
    }
   }
  } while(0);
  $104 = HEAP8[$105>>0]|0;
  $106 = ($104<<24>>24)==(46);
  L45: do {
   if ($106) {
    $107 = ((($105)) + 1|0);
    $108 = HEAP8[$107>>0]|0;
    $109 = ($108<<24>>24)==(42);
    if (!($109)) {
     $136 = $108 << 24 >> 24;
     $isdigittmp1$i27 = (($136) + -48)|0;
     $isdigit2$i28 = ($isdigittmp1$i27>>>0)<(10);
     if ($isdigit2$i28) {
      $140 = $107;$i$03$i30 = 0;$isdigittmp4$i29 = $isdigittmp1$i27;
     } else {
      $1172 = $107;$p$0 = 0;
      break;
     }
     while(1) {
      $137 = ($i$03$i30*10)|0;
      $138 = (($137) + ($isdigittmp4$i29))|0;
      $139 = ((($140)) + 1|0);
      $141 = HEAP8[$139>>0]|0;
      $142 = $141 << 24 >> 24;
      $isdigittmp$i31 = (($142) + -48)|0;
      $isdigit$i32 = ($isdigittmp$i31>>>0)<(10);
      if ($isdigit$i32) {
       $140 = $139;$i$03$i30 = $138;$isdigittmp4$i29 = $isdigittmp$i31;
      } else {
       $1172 = $139;$p$0 = $138;
       break L45;
      }
     }
    }
    $110 = ((($105)) + 2|0);
    $111 = HEAP8[$110>>0]|0;
    $112 = $111 << 24 >> 24;
    $isdigittmp9 = (($112) + -48)|0;
    $isdigit10 = ($isdigittmp9>>>0)<(10);
    if ($isdigit10) {
     $113 = ((($105)) + 3|0);
     $114 = HEAP8[$113>>0]|0;
     $115 = ($114<<24>>24)==(36);
     if ($115) {
      $116 = (($nl_type) + ($isdigittmp9<<2)|0);
      HEAP32[$116>>2] = 10;
      $117 = HEAP8[$110>>0]|0;
      $118 = $117 << 24 >> 24;
      $119 = (($118) + -48)|0;
      $120 = (($nl_arg) + ($119<<3)|0);
      $121 = $120;
      $122 = $121;
      $123 = HEAP32[$122>>2]|0;
      $124 = (($121) + 4)|0;
      $125 = $124;
      $126 = HEAP32[$125>>2]|0;
      $127 = ((($105)) + 4|0);
      $1172 = $127;$p$0 = $123;
      break;
     }
    }
    $128 = ($l10n$3|0)==(0);
    if (!($128)) {
     $$0 = -1;
     label = 363;
     break L1;
    }
    if ($1) {
     $arglist_current2 = HEAP32[$ap>>2]|0;
     $129 = $arglist_current2;
     $130 = ((0) + 4|0);
     $expanded71 = $130;
     $expanded70 = (($expanded71) - 1)|0;
     $131 = (($129) + ($expanded70))|0;
     $132 = ((0) + 4|0);
     $expanded75 = $132;
     $expanded74 = (($expanded75) - 1)|0;
     $expanded73 = $expanded74 ^ -1;
     $133 = $131 & $expanded73;
     $134 = $133;
     $135 = HEAP32[$134>>2]|0;
     $arglist_next3 = ((($134)) + 4|0);
     HEAP32[$ap>>2] = $arglist_next3;
     $1172 = $110;$p$0 = $135;
    } else {
     $1172 = $110;$p$0 = 0;
    }
   } else {
    $1172 = $105;$p$0 = -1;
   }
  } while(0);
  $144 = $1172;$st$0 = 0;
  while(1) {
   $143 = HEAP8[$144>>0]|0;
   $145 = $143 << 24 >> 24;
   $146 = (($145) + -65)|0;
   $147 = ($146>>>0)>(57);
   if ($147) {
    $$0 = -1;
    label = 363;
    break L1;
   }
   $148 = ((($144)) + 1|0);
   $149 = ((1512 + (($st$0*58)|0)|0) + ($146)|0);
   $150 = HEAP8[$149>>0]|0;
   $151 = $150&255;
   $152 = (($151) + -1)|0;
   $153 = ($152>>>0)<(8);
   if ($153) {
    $144 = $148;$st$0 = $151;
   } else {
    $$lcssa455 = $144;$$lcssa457 = $148;$$lcssa458 = $150;$$lcssa459 = $151;$st$0$lcssa456 = $st$0;
    break;
   }
  }
  $154 = ($$lcssa458<<24>>24)==(0);
  if ($154) {
   $$0 = -1;
   label = 363;
   break;
  }
  $155 = ($$lcssa458<<24>>24)==(19);
  $156 = ($argpos$0|0)>(-1);
  L64: do {
   if ($155) {
    if ($156) {
     $$0 = -1;
     label = 363;
     break L1;
    } else {
     $1173 = $1169;$1174 = $1170;
     label = 62;
    }
   } else {
    if ($156) {
     $157 = (($nl_type) + ($argpos$0<<2)|0);
     HEAP32[$157>>2] = $$lcssa459;
     $158 = (($nl_arg) + ($argpos$0<<3)|0);
     $159 = HEAP32[$158>>2]|0;
     $160 = ((($158)) + 4|0);
     $161 = HEAP32[$160>>2]|0;
     $1173 = $161;$1174 = $159;
     label = 62;
     break;
    }
    if (!($1)) {
     $$0 = 0;
     label = 363;
     break L1;
    }
    $162 = ($$lcssa458&255)>(20);
    if ($162) {
     $264 = $1170;$291 = $1169;
    } else {
     do {
      switch ($$lcssa459|0) {
      case 18:  {
       $arglist_current32 = HEAP32[$ap>>2]|0;
       $246 = $arglist_current32;
       $247 = ((0) + 8|0);
       $expanded141 = $247;
       $expanded140 = (($expanded141) - 1)|0;
       $248 = (($246) + ($expanded140))|0;
       $249 = ((0) + 8|0);
       $expanded145 = $249;
       $expanded144 = (($expanded145) - 1)|0;
       $expanded143 = $expanded144 ^ -1;
       $250 = $248 & $expanded143;
       $251 = $250;
       $252 = +HEAPF64[$251>>3];
       $arglist_next33 = ((($251)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next33;
       HEAPF64[tempDoublePtr>>3] = $252;$253 = HEAP32[tempDoublePtr>>2]|0;
       $254 = HEAP32[tempDoublePtr+4>>2]|0;
       $264 = $253;$291 = $254;
       break L64;
       break;
      }
      case 9:  {
       $arglist_current5 = HEAP32[$ap>>2]|0;
       $163 = $arglist_current5;
       $164 = ((0) + 4|0);
       $expanded78 = $164;
       $expanded77 = (($expanded78) - 1)|0;
       $165 = (($163) + ($expanded77))|0;
       $166 = ((0) + 4|0);
       $expanded82 = $166;
       $expanded81 = (($expanded82) - 1)|0;
       $expanded80 = $expanded81 ^ -1;
       $167 = $165 & $expanded80;
       $168 = $167;
       $169 = HEAP32[$168>>2]|0;
       $arglist_next6 = ((($168)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next6;
       $170 = $169;
       $264 = $170;$291 = $1169;
       break L64;
       break;
      }
      case 10:  {
       $arglist_current8 = HEAP32[$ap>>2]|0;
       $171 = $arglist_current8;
       $172 = ((0) + 4|0);
       $expanded85 = $172;
       $expanded84 = (($expanded85) - 1)|0;
       $173 = (($171) + ($expanded84))|0;
       $174 = ((0) + 4|0);
       $expanded89 = $174;
       $expanded88 = (($expanded89) - 1)|0;
       $expanded87 = $expanded88 ^ -1;
       $175 = $173 & $expanded87;
       $176 = $175;
       $177 = HEAP32[$176>>2]|0;
       $arglist_next9 = ((($176)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next9;
       $178 = ($177|0)<(0);
       $179 = $178 << 31 >> 31;
       $264 = $177;$291 = $179;
       break L64;
       break;
      }
      case 11:  {
       $arglist_current11 = HEAP32[$ap>>2]|0;
       $180 = $arglist_current11;
       $181 = ((0) + 4|0);
       $expanded92 = $181;
       $expanded91 = (($expanded92) - 1)|0;
       $182 = (($180) + ($expanded91))|0;
       $183 = ((0) + 4|0);
       $expanded96 = $183;
       $expanded95 = (($expanded96) - 1)|0;
       $expanded94 = $expanded95 ^ -1;
       $184 = $182 & $expanded94;
       $185 = $184;
       $186 = HEAP32[$185>>2]|0;
       $arglist_next12 = ((($185)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next12;
       $264 = $186;$291 = 0;
       break L64;
       break;
      }
      case 12:  {
       $arglist_current14 = HEAP32[$ap>>2]|0;
       $187 = $arglist_current14;
       $188 = ((0) + 8|0);
       $expanded99 = $188;
       $expanded98 = (($expanded99) - 1)|0;
       $189 = (($187) + ($expanded98))|0;
       $190 = ((0) + 8|0);
       $expanded103 = $190;
       $expanded102 = (($expanded103) - 1)|0;
       $expanded101 = $expanded102 ^ -1;
       $191 = $189 & $expanded101;
       $192 = $191;
       $193 = $192;
       $194 = $193;
       $195 = HEAP32[$194>>2]|0;
       $196 = (($193) + 4)|0;
       $197 = $196;
       $198 = HEAP32[$197>>2]|0;
       $arglist_next15 = ((($192)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next15;
       $264 = $195;$291 = $198;
       break L64;
       break;
      }
      case 13:  {
       $arglist_current17 = HEAP32[$ap>>2]|0;
       $199 = $arglist_current17;
       $200 = ((0) + 4|0);
       $expanded106 = $200;
       $expanded105 = (($expanded106) - 1)|0;
       $201 = (($199) + ($expanded105))|0;
       $202 = ((0) + 4|0);
       $expanded110 = $202;
       $expanded109 = (($expanded110) - 1)|0;
       $expanded108 = $expanded109 ^ -1;
       $203 = $201 & $expanded108;
       $204 = $203;
       $205 = HEAP32[$204>>2]|0;
       $arglist_next18 = ((($204)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next18;
       $206 = $205&65535;
       $207 = $206 << 16 >> 16;
       $208 = ($207|0)<(0);
       $209 = $208 << 31 >> 31;
       $sext93 = $205 << 16;
       $210 = $sext93 >> 16;
       $264 = $210;$291 = $209;
       break L64;
       break;
      }
      case 14:  {
       $arglist_current20 = HEAP32[$ap>>2]|0;
       $211 = $arglist_current20;
       $212 = ((0) + 4|0);
       $expanded113 = $212;
       $expanded112 = (($expanded113) - 1)|0;
       $213 = (($211) + ($expanded112))|0;
       $214 = ((0) + 4|0);
       $expanded117 = $214;
       $expanded116 = (($expanded117) - 1)|0;
       $expanded115 = $expanded116 ^ -1;
       $215 = $213 & $expanded115;
       $216 = $215;
       $217 = HEAP32[$216>>2]|0;
       $arglist_next21 = ((($216)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next21;
       $$mask1$i37 = $217 & 65535;
       $264 = $$mask1$i37;$291 = 0;
       break L64;
       break;
      }
      case 15:  {
       $arglist_current23 = HEAP32[$ap>>2]|0;
       $218 = $arglist_current23;
       $219 = ((0) + 4|0);
       $expanded120 = $219;
       $expanded119 = (($expanded120) - 1)|0;
       $220 = (($218) + ($expanded119))|0;
       $221 = ((0) + 4|0);
       $expanded124 = $221;
       $expanded123 = (($expanded124) - 1)|0;
       $expanded122 = $expanded123 ^ -1;
       $222 = $220 & $expanded122;
       $223 = $222;
       $224 = HEAP32[$223>>2]|0;
       $arglist_next24 = ((($223)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next24;
       $225 = $224&255;
       $226 = $225 << 24 >> 24;
       $227 = ($226|0)<(0);
       $228 = $227 << 31 >> 31;
       $sext = $224 << 24;
       $229 = $sext >> 24;
       $264 = $229;$291 = $228;
       break L64;
       break;
      }
      case 16:  {
       $arglist_current26 = HEAP32[$ap>>2]|0;
       $230 = $arglist_current26;
       $231 = ((0) + 4|0);
       $expanded127 = $231;
       $expanded126 = (($expanded127) - 1)|0;
       $232 = (($230) + ($expanded126))|0;
       $233 = ((0) + 4|0);
       $expanded131 = $233;
       $expanded130 = (($expanded131) - 1)|0;
       $expanded129 = $expanded130 ^ -1;
       $234 = $232 & $expanded129;
       $235 = $234;
       $236 = HEAP32[$235>>2]|0;
       $arglist_next27 = ((($235)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next27;
       $$mask$i38 = $236 & 255;
       $264 = $$mask$i38;$291 = 0;
       break L64;
       break;
      }
      case 17:  {
       $arglist_current29 = HEAP32[$ap>>2]|0;
       $237 = $arglist_current29;
       $238 = ((0) + 8|0);
       $expanded134 = $238;
       $expanded133 = (($expanded134) - 1)|0;
       $239 = (($237) + ($expanded133))|0;
       $240 = ((0) + 8|0);
       $expanded138 = $240;
       $expanded137 = (($expanded138) - 1)|0;
       $expanded136 = $expanded137 ^ -1;
       $241 = $239 & $expanded136;
       $242 = $241;
       $243 = +HEAPF64[$242>>3];
       $arglist_next30 = ((($242)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next30;
       HEAPF64[tempDoublePtr>>3] = $243;$244 = HEAP32[tempDoublePtr>>2]|0;
       $245 = HEAP32[tempDoublePtr+4>>2]|0;
       $264 = $244;$291 = $245;
       break L64;
       break;
      }
      default: {
       $264 = $1170;$291 = $1169;
       break L64;
      }
      }
     } while(0);
    }
   }
  } while(0);
  if ((label|0) == 62) {
   label = 0;
   if ($1) {
    $264 = $1174;$291 = $1173;
   } else {
    $1169 = $1173;$1170 = $1174;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
    continue;
   }
  }
  $255 = HEAP8[$$lcssa455>>0]|0;
  $256 = $255 << 24 >> 24;
  $257 = ($st$0$lcssa456|0)!=(0);
  $258 = $256 & 15;
  $259 = ($258|0)==(3);
  $or$cond15 = $257 & $259;
  $260 = $256 & -33;
  $t$0 = $or$cond15 ? $260 : $256;
  $261 = $fl$1 & 8192;
  $262 = ($261|0)==(0);
  $263 = $fl$1 & -65537;
  $fl$1$ = $262 ? $fl$1 : $263;
  L86: do {
   switch ($t$0|0) {
   case 112:  {
    $286 = ($p$0>>>0)>(8);
    $287 = $286 ? $p$0 : 8;
    $288 = $fl$1$ | 8;
    $fl$3 = $288;$p$1 = $287;$t$1 = 120;
    label = 73;
    break;
   }
   case 111:  {
    $312 = ($264|0)==(0);
    $313 = ($291|0)==(0);
    $314 = $312 & $313;
    if ($314) {
     $$0$lcssa$i51 = $2;
    } else {
     $$03$i48 = $2;$316 = $264;$320 = $291;
     while(1) {
      $315 = $316 & 7;
      $317 = $315 | 48;
      $318 = $317&255;
      $319 = ((($$03$i48)) + -1|0);
      HEAP8[$319>>0] = $318;
      $321 = (_bitshift64Lshr(($316|0),($320|0),3)|0);
      $322 = tempRet0;
      $323 = ($321|0)==(0);
      $324 = ($322|0)==(0);
      $325 = $323 & $324;
      if ($325) {
       $$0$lcssa$i51 = $319;
       break;
      } else {
       $$03$i48 = $319;$316 = $321;$320 = $322;
      }
     }
    }
    $326 = $fl$1$ & 8;
    $327 = ($326|0)==(0);
    $or$cond19 = $327 | $314;
    $$24 = $or$cond19 ? 1992 : (1997);
    $328 = $or$cond19&1;
    $$25 = $328 ^ 1;
    $366 = $264;$368 = $291;$a$0 = $$0$lcssa$i51;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $$25;$prefix$1 = $$24;
    label = 89;
    break;
   }
   case 110:  {
    switch ($st$0$lcssa456|0) {
    case 2:  {
     $267 = ($cnt$1|0)<(0);
     $268 = $267 << 31 >> 31;
     $269 = $264;
     $270 = $269;
     $271 = $270;
     HEAP32[$271>>2] = $cnt$1;
     $272 = (($270) + 4)|0;
     $273 = $272;
     HEAP32[$273>>2] = $268;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 3:  {
     $274 = $cnt$1&65535;
     $275 = $264;
     HEAP16[$275>>1] = $274;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 4:  {
     $276 = $cnt$1&255;
     $277 = $264;
     HEAP8[$277>>0] = $276;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 6:  {
     $278 = $264;
     HEAP32[$278>>2] = $cnt$1;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 7:  {
     $279 = ($cnt$1|0)<(0);
     $280 = $279 << 31 >> 31;
     $281 = $264;
     $282 = $281;
     $283 = $282;
     HEAP32[$283>>2] = $cnt$1;
     $284 = (($282) + 4)|0;
     $285 = $284;
     HEAP32[$285>>2] = $280;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 0:  {
     $265 = $264;
     HEAP32[$265>>2] = $cnt$1;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    case 1:  {
     $266 = $264;
     HEAP32[$266>>2] = $cnt$1;
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
     break;
    }
    default: {
     $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $37;$l10n$0 = $l10n$3;
     continue L1;
    }
    }
    break;
   }
   case 67:  {
    HEAP32[$wc>>2] = $264;
    HEAP32[$5>>2] = 0;
    $1179 = $wc;$1180 = $6;$p$4272 = -1;
    label = 97;
    break;
   }
   case 83:  {
    $391 = $264;
    $392 = ($p$0|0)==(0);
    if ($392) {
     $1181 = $264;$1182 = $391;$i$0$lcssa273 = 0;
     label = 102;
    } else {
     $1179 = $391;$1180 = $264;$p$4272 = $p$0;
     label = 97;
    }
    break;
   }
   case 109:  {
    $379 = (___errno_location()|0);
    $380 = HEAP32[$379>>2]|0;
    $381 = (_strerror(($380|0))|0);
    $a$1 = $381;
    label = 94;
    break;
   }
   case 115:  {
    $382 = $264;
    $383 = ($264|0)!=(0);
    $384 = $383 ? $382 : 2008;
    $a$1 = $384;
    label = 94;
    break;
   }
   case 65: case 71: case 70: case 69: case 97: case 103: case 102: case 101:  {
    HEAP32[tempDoublePtr>>2] = $264;HEAP32[tempDoublePtr+4>>2] = $291;$430 = +HEAPF64[tempDoublePtr>>3];
    HEAP32[$e2$i>>2] = 0;
    $431 = ($291|0)<(0);
    if ($431) {
     $432 = -$430;
     $$07$i = $432;$pl$0$i = 1;$prefix$0$i = 2016;
    } else {
     $433 = $fl$1$ & 2048;
     $434 = ($433|0)==(0);
     if ($434) {
      $435 = $fl$1$ & 1;
      $436 = ($435|0)==(0);
      $$$i = $436 ? (2017) : (2022);
      $$07$i = $430;$pl$0$i = $435;$prefix$0$i = $$$i;
     } else {
      $$07$i = $430;$pl$0$i = 1;$prefix$0$i = (2019);
     }
    }
    HEAPF64[tempDoublePtr>>3] = $$07$i;$437 = HEAP32[tempDoublePtr>>2]|0;
    $438 = HEAP32[tempDoublePtr+4>>2]|0;
    $439 = $438 & 2146435072;
    $440 = ($439>>>0)<(2146435072);
    $441 = (0)<(0);
    $442 = ($439|0)==(2146435072);
    $443 = $442 & $441;
    $444 = $440 | $443;
    do {
     if ($444) {
      $471 = (+_frexpl($$07$i,$e2$i));
      $472 = $471 * 2.0;
      $473 = $472 != 0.0;
      if ($473) {
       $474 = HEAP32[$e2$i>>2]|0;
       $475 = (($474) + -1)|0;
       HEAP32[$e2$i>>2] = $475;
      }
      $476 = $t$0 | 32;
      $477 = ($476|0)==(97);
      if ($477) {
       $478 = $t$0 & 32;
       $479 = ($478|0)==(0);
       $480 = ((($prefix$0$i)) + 9|0);
       $prefix$0$$i = $479 ? $prefix$0$i : $480;
       $481 = $pl$0$i | 2;
       $482 = ($p$0>>>0)>(11);
       $483 = (12 - ($p$0))|0;
       $484 = ($483|0)==(0);
       $485 = $482 | $484;
       do {
        if ($485) {
         $$1$i = $472;
        } else {
         $re$1179$i = $483;$round$0178$i = 8.0;
         while(1) {
          $486 = (($re$1179$i) + -1)|0;
          $487 = $round$0178$i * 16.0;
          $488 = ($486|0)==(0);
          if ($488) {
           $$lcssa483 = $487;
           break;
          } else {
           $re$1179$i = $486;$round$0178$i = $487;
          }
         }
         $489 = HEAP8[$prefix$0$$i>>0]|0;
         $490 = ($489<<24>>24)==(45);
         if ($490) {
          $491 = -$472;
          $492 = $491 - $$lcssa483;
          $493 = $$lcssa483 + $492;
          $494 = -$493;
          $$1$i = $494;
          break;
         } else {
          $495 = $472 + $$lcssa483;
          $496 = $495 - $$lcssa483;
          $$1$i = $496;
          break;
         }
        }
       } while(0);
       $497 = HEAP32[$e2$i>>2]|0;
       $498 = ($497|0)<(0);
       $499 = (0 - ($497))|0;
       $500 = $498 ? $499 : $497;
       $501 = ($500|0)<(0);
       if ($501) {
        $502 = ($500|0)<(0);
        $503 = $502 << 31 >> 31;
        $$05$i$i = $7;$504 = $500;$505 = $503;
        while(1) {
         $506 = (___uremdi3(($504|0),($505|0),10,0)|0);
         $507 = tempRet0;
         $508 = $506 | 48;
         $509 = $508&255;
         $510 = ((($$05$i$i)) + -1|0);
         HEAP8[$510>>0] = $509;
         $511 = (___udivdi3(($504|0),($505|0),10,0)|0);
         $512 = tempRet0;
         $513 = ($505>>>0)>(9);
         $514 = ($504>>>0)>(4294967295);
         $515 = ($505|0)==(9);
         $516 = $515 & $514;
         $517 = $513 | $516;
         if ($517) {
          $$05$i$i = $510;$504 = $511;$505 = $512;
         } else {
          $$lcssa484 = $510;$1183 = $511;$1184 = $512;
          break;
         }
        }
        $$0$lcssa$i48$i = $$lcssa484;$$01$lcssa$off0$i$i = $1183;
       } else {
        $$0$lcssa$i48$i = $7;$$01$lcssa$off0$i$i = $500;
       }
       $518 = ($$01$lcssa$off0$i$i|0)==(0);
       if ($518) {
        $$1$lcssa$i$i = $$0$lcssa$i48$i;
       } else {
        $$12$i$i = $$0$lcssa$i48$i;$y$03$i$i = $$01$lcssa$off0$i$i;
        while(1) {
         $519 = (($y$03$i$i>>>0) % 10)&-1;
         $520 = $519 | 48;
         $521 = $520&255;
         $522 = ((($$12$i$i)) + -1|0);
         HEAP8[$522>>0] = $521;
         $523 = (($y$03$i$i>>>0) / 10)&-1;
         $524 = ($y$03$i$i>>>0)<(10);
         if ($524) {
          $$1$lcssa$i$i = $522;
          break;
         } else {
          $$12$i$i = $522;$y$03$i$i = $523;
         }
        }
       }
       $525 = ($$1$lcssa$i$i|0)==($7|0);
       if ($525) {
        HEAP8[$8>>0] = 48;
        $estr$0$i = $8;
       } else {
        $estr$0$i = $$1$lcssa$i$i;
       }
       $526 = HEAP32[$e2$i>>2]|0;
       $527 = $526 >> 31;
       $528 = $527 & 2;
       $529 = (($528) + 43)|0;
       $530 = $529&255;
       $531 = ((($estr$0$i)) + -1|0);
       HEAP8[$531>>0] = $530;
       $532 = (($t$0) + 15)|0;
       $533 = $532&255;
       $534 = ((($estr$0$i)) + -2|0);
       HEAP8[$534>>0] = $533;
       $535 = $fl$1$ & 8;
       $536 = ($535|0)==(0);
       if ($536) {
        $notrhs$i = ($p$0|0)<(1);
        if ($notrhs$i) {
         $$2$us$us$i = $$1$i;$s$0$us$us$i = $buf$i;
         while(1) {
          $537 = (~~(($$2$us$us$i)));
          $538 = (1976 + ($537)|0);
          $539 = HEAP8[$538>>0]|0;
          $540 = $539&255;
          $541 = $540 | $478;
          $542 = $541&255;
          $543 = ((($s$0$us$us$i)) + 1|0);
          HEAP8[$s$0$us$us$i>>0] = $542;
          $544 = (+($537|0));
          $545 = $$2$us$us$i - $544;
          $546 = $545 * 16.0;
          $547 = $543;
          $548 = (($547) - ($0))|0;
          $549 = ($548|0)!=(1);
          $notlhs$us$us$i = $546 == 0.0;
          $or$cond$i79 = $549 | $notlhs$us$us$i;
          if ($or$cond$i79) {
           $s$1$us$us$i = $543;
          } else {
           $550 = ((($s$0$us$us$i)) + 2|0);
           HEAP8[$543>>0] = 46;
           $s$1$us$us$i = $550;
          }
          $551 = $546 != 0.0;
          if ($551) {
           $$2$us$us$i = $546;$s$0$us$us$i = $s$1$us$us$i;
          } else {
           $s$1$lcssa$i = $s$1$us$us$i;
           break;
          }
         }
        } else {
         $$2$us$i = $$1$i;$s$0$us$i = $buf$i;
         while(1) {
          $552 = (~~(($$2$us$i)));
          $553 = (1976 + ($552)|0);
          $554 = HEAP8[$553>>0]|0;
          $555 = $554&255;
          $556 = $555 | $478;
          $557 = $556&255;
          $558 = ((($s$0$us$i)) + 1|0);
          HEAP8[$s$0$us$i>>0] = $557;
          $559 = (+($552|0));
          $560 = $$2$us$i - $559;
          $561 = $560 * 16.0;
          $562 = $558;
          $563 = (($562) - ($0))|0;
          $564 = ($563|0)==(1);
          if ($564) {
           $565 = ((($s$0$us$i)) + 2|0);
           HEAP8[$558>>0] = 46;
           $s$1$us$i = $565;
          } else {
           $s$1$us$i = $558;
          }
          $566 = $561 != 0.0;
          if ($566) {
           $$2$us$i = $561;$s$0$us$i = $s$1$us$i;
          } else {
           $s$1$lcssa$i = $s$1$us$i;
           break;
          }
         }
        }
       } else {
        $$2$i = $$1$i;$s$0$i = $buf$i;
        while(1) {
         $567 = (~~(($$2$i)));
         $568 = (1976 + ($567)|0);
         $569 = HEAP8[$568>>0]|0;
         $570 = $569&255;
         $571 = $570 | $478;
         $572 = $571&255;
         $573 = ((($s$0$i)) + 1|0);
         HEAP8[$s$0$i>>0] = $572;
         $574 = (+($567|0));
         $575 = $$2$i - $574;
         $576 = $575 * 16.0;
         $577 = $573;
         $578 = (($577) - ($0))|0;
         $579 = ($578|0)==(1);
         if ($579) {
          $580 = ((($s$0$i)) + 2|0);
          HEAP8[$573>>0] = 46;
          $s$1$i = $580;
         } else {
          $s$1$i = $573;
         }
         $581 = $576 != 0.0;
         if ($581) {
          $$2$i = $576;$s$0$i = $s$1$i;
         } else {
          $s$1$lcssa$i = $s$1$i;
          break;
         }
        }
       }
       $582 = ($p$0|0)!=(0);
       $$pre300$i = $s$1$lcssa$i;
       $583 = (($11) + ($$pre300$i))|0;
       $584 = ($583|0)<($p$0|0);
       $or$cond332 = $582 & $584;
       $585 = $534;
       $586 = (($12) + ($p$0))|0;
       $587 = (($586) - ($585))|0;
       $588 = $534;
       $589 = (($10) - ($588))|0;
       $590 = (($589) + ($$pre300$i))|0;
       $l$0$i = $or$cond332 ? $587 : $590;
       $591 = (($l$0$i) + ($481))|0;
       $592 = $fl$1$ & 73728;
       $593 = ($592|0)==(0);
       $594 = ($w$1|0)>($591|0);
       $or$cond$i52$i = $593 & $594;
       if ($or$cond$i52$i) {
        $595 = (($w$1) - ($591))|0;
        $596 = ($595>>>0)>(256);
        $597 = $596 ? 256 : $595;
        _memset(($pad$i|0),32,($597|0))|0;
        $598 = ($595>>>0)>(255);
        if ($598) {
         $$01$i54$i = $595;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $599 = (($$01$i54$i) + -256)|0;
          $600 = ($599>>>0)>(255);
          if ($600) {
           $$01$i54$i = $599;
          } else {
           break;
          }
         }
         $601 = $595 & 255;
         $$0$lcssa$i56$i = $601;
        } else {
         $$0$lcssa$i56$i = $595;
        }
        (___fwritex($pad$i,$$0$lcssa$i56$i,$f)|0);
       }
       (___fwritex($prefix$0$$i,$481,$f)|0);
       $602 = ($592|0)==(65536);
       $or$cond$i59$i = $602 & $594;
       if ($or$cond$i59$i) {
        $603 = (($w$1) - ($591))|0;
        $604 = ($603>>>0)>(256);
        $605 = $604 ? 256 : $603;
        _memset(($pad$i|0),48,($605|0))|0;
        $606 = ($603>>>0)>(255);
        if ($606) {
         $$01$i61$i = $603;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $607 = (($$01$i61$i) + -256)|0;
          $608 = ($607>>>0)>(255);
          if ($608) {
           $$01$i61$i = $607;
          } else {
           break;
          }
         }
         $609 = $603 & 255;
         $$0$lcssa$i63$i = $609;
        } else {
         $$0$lcssa$i63$i = $603;
        }
        (___fwritex($pad$i,$$0$lcssa$i63$i,$f)|0);
       }
       $610 = (($$pre300$i) - ($0))|0;
       (___fwritex($buf$i,$610,$f)|0);
       $611 = $534;
       $612 = (($9) - ($611))|0;
       $613 = (($l$0$i) - ($612))|0;
       $614 = (($613) - ($610))|0;
       $615 = ($614|0)>(0);
       if ($615) {
        $616 = ($614>>>0)>(256);
        $617 = $616 ? 256 : $614;
        _memset(($pad$i|0),48,($617|0))|0;
        $618 = ($614>>>0)>(255);
        if ($618) {
         $$01$i67$i = $614;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $619 = (($$01$i67$i) + -256)|0;
          $620 = ($619>>>0)>(255);
          if ($620) {
           $$01$i67$i = $619;
          } else {
           break;
          }
         }
         $621 = $614 & 255;
         $$0$lcssa$i69$i = $621;
        } else {
         $$0$lcssa$i69$i = $614;
        }
        (___fwritex($pad$i,$$0$lcssa$i69$i,$f)|0);
       }
       (___fwritex($534,$612,$f)|0);
       $622 = ($592|0)==(8192);
       $or$cond$i72$i = $622 & $594;
       if ($or$cond$i72$i) {
        $623 = (($w$1) - ($591))|0;
        $624 = ($623>>>0)>(256);
        $625 = $624 ? 256 : $623;
        _memset(($pad$i|0),32,($625|0))|0;
        $626 = ($623>>>0)>(255);
        if ($626) {
         $$01$i74$i = $623;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $627 = (($$01$i74$i) + -256)|0;
          $628 = ($627>>>0)>(255);
          if ($628) {
           $$01$i74$i = $627;
          } else {
           break;
          }
         }
         $629 = $623 & 255;
         $$0$lcssa$i76$i = $629;
        } else {
         $$0$lcssa$i76$i = $623;
        }
        (___fwritex($pad$i,$$0$lcssa$i76$i,$f)|0);
       }
       $w$$i = $594 ? $w$1 : $591;
       $$0$i = $w$$i;
       break;
      }
      $630 = ($p$0|0)<(0);
      $$p$i = $630 ? 6 : $p$0;
      if ($473) {
       $631 = $472 * 268435456.0;
       $632 = HEAP32[$e2$i>>2]|0;
       $633 = (($632) + -28)|0;
       HEAP32[$e2$i>>2] = $633;
       $$3$i = $631;$634 = $633;
      } else {
       $$pre$i = HEAP32[$e2$i>>2]|0;
       $$3$i = $472;$634 = $$pre$i;
      }
      $635 = ($634|0)<(0);
      $$31$i = $635 ? $big$i : $13;
      $636 = $$31$i;
      $$4$i = $$3$i;$z$0$i = $$31$i;
      while(1) {
       $637 = (~~(($$4$i))>>>0);
       HEAP32[$z$0$i>>2] = $637;
       $638 = ((($z$0$i)) + 4|0);
       $639 = (+($637>>>0));
       $640 = $$4$i - $639;
       $641 = $640 * 1.0E+9;
       $642 = $641 != 0.0;
       if ($642) {
        $$4$i = $641;$z$0$i = $638;
       } else {
        $$lcssa460 = $638;
        break;
       }
      }
      $$pr$i = HEAP32[$e2$i>>2]|0;
      $643 = ($$pr$i|0)>(0);
      if ($643) {
       $644 = $$pr$i;$a$1253$i = $$31$i;$z$1252$i = $$lcssa460;
       while(1) {
        $645 = ($644|0)>(29);
        $646 = $645 ? 29 : $644;
        $d$0245$i = ((($z$1252$i)) + -4|0);
        $647 = ($d$0245$i>>>0)<($a$1253$i>>>0);
        do {
         if ($647) {
          $a$2$ph$i = $a$1253$i;
         } else {
          $carry$0246$i = 0;$d$0247$i = $d$0245$i;
          while(1) {
           $648 = HEAP32[$d$0247$i>>2]|0;
           $649 = (_bitshift64Shl(($648|0),0,($646|0))|0);
           $650 = tempRet0;
           $651 = (_i64Add(($649|0),($650|0),($carry$0246$i|0),0)|0);
           $652 = tempRet0;
           $653 = (___uremdi3(($651|0),($652|0),1000000000,0)|0);
           $654 = tempRet0;
           HEAP32[$d$0247$i>>2] = $653;
           $655 = (___udivdi3(($651|0),($652|0),1000000000,0)|0);
           $656 = tempRet0;
           $d$0$i = ((($d$0247$i)) + -4|0);
           $657 = ($d$0$i>>>0)<($a$1253$i>>>0);
           if ($657) {
            $$lcssa461 = $655;
            break;
           } else {
            $carry$0246$i = $655;$d$0247$i = $d$0$i;
           }
          }
          $658 = ($$lcssa461|0)==(0);
          if ($658) {
           $a$2$ph$i = $a$1253$i;
           break;
          }
          $659 = ((($a$1253$i)) + -4|0);
          HEAP32[$659>>2] = $$lcssa461;
          $a$2$ph$i = $659;
         }
        } while(0);
        $z$2$i = $z$1252$i;
        while(1) {
         $660 = ($z$2$i>>>0)>($a$2$ph$i>>>0);
         if (!($660)) {
          $z$2$i$lcssa = $z$2$i;
          break;
         }
         $661 = ((($z$2$i)) + -4|0);
         $662 = HEAP32[$661>>2]|0;
         $663 = ($662|0)==(0);
         if ($663) {
          $z$2$i = $661;
         } else {
          $z$2$i$lcssa = $z$2$i;
          break;
         }
        }
        $664 = HEAP32[$e2$i>>2]|0;
        $665 = (($664) - ($646))|0;
        HEAP32[$e2$i>>2] = $665;
        $666 = ($665|0)>(0);
        if ($666) {
         $644 = $665;$a$1253$i = $a$2$ph$i;$z$1252$i = $z$2$i$lcssa;
        } else {
         $$pr146$i = $665;$a$1$lcssa$i = $a$2$ph$i;$z$1$lcssa$i = $z$2$i$lcssa;
         break;
        }
       }
      } else {
       $$pr146$i = $$pr$i;$a$1$lcssa$i = $$31$i;$z$1$lcssa$i = $$lcssa460;
      }
      $667 = ($$pr146$i|0)<(0);
      L231: do {
       if ($667) {
        $668 = (($$p$i) + 25)|0;
        $669 = (($668|0) / 9)&-1;
        $670 = (($669) + 1)|0;
        $671 = ($476|0)==(102);
        if (!($671)) {
         $704 = $$pr146$i;$a$3240$i = $a$1$lcssa$i;$z$3239$i = $z$1$lcssa$i;
         while(1) {
          $703 = (0 - ($704))|0;
          $705 = ($703|0)>(9);
          $706 = $705 ? 9 : $703;
          $707 = ($a$3240$i>>>0)<($z$3239$i>>>0);
          do {
           if ($707) {
            $711 = 1 << $706;
            $712 = (($711) + -1)|0;
            $713 = 1000000000 >>> $706;
            $carry3$0234$i = 0;$d$1233$i = $a$3240$i;
            while(1) {
             $714 = HEAP32[$d$1233$i>>2]|0;
             $715 = $714 & $712;
             $716 = $714 >>> $706;
             $717 = (($716) + ($carry3$0234$i))|0;
             HEAP32[$d$1233$i>>2] = $717;
             $718 = Math_imul($715, $713)|0;
             $719 = ((($d$1233$i)) + 4|0);
             $720 = ($719>>>0)<($z$3239$i>>>0);
             if ($720) {
              $carry3$0234$i = $718;$d$1233$i = $719;
             } else {
              $$lcssa463 = $718;
              break;
             }
            }
            $721 = HEAP32[$a$3240$i>>2]|0;
            $722 = ($721|0)==(0);
            $723 = ((($a$3240$i)) + 4|0);
            $$a$3$i = $722 ? $723 : $a$3240$i;
            $724 = ($$lcssa463|0)==(0);
            if ($724) {
             $$a$3306$i = $$a$3$i;$z$4$i = $z$3239$i;
             break;
            }
            $725 = ((($z$3239$i)) + 4|0);
            HEAP32[$z$3239$i>>2] = $$lcssa463;
            $$a$3306$i = $$a$3$i;$z$4$i = $725;
           } else {
            $708 = HEAP32[$a$3240$i>>2]|0;
            $709 = ($708|0)==(0);
            $710 = ((($a$3240$i)) + 4|0);
            $$a$3305$i = $709 ? $710 : $a$3240$i;
            $$a$3306$i = $$a$3305$i;$z$4$i = $z$3239$i;
           }
          } while(0);
          $726 = $z$4$i;
          $727 = $$a$3306$i;
          $728 = (($726) - ($727))|0;
          $729 = $728 >> 2;
          $730 = ($729|0)>($670|0);
          $731 = (($$a$3306$i) + ($670<<2)|0);
          $$z$4$i = $730 ? $731 : $z$4$i;
          $732 = HEAP32[$e2$i>>2]|0;
          $733 = (($732) + ($706))|0;
          HEAP32[$e2$i>>2] = $733;
          $734 = ($733|0)<(0);
          if ($734) {
           $704 = $733;$a$3240$i = $$a$3306$i;$z$3239$i = $$z$4$i;
          } else {
           $a$3$lcssa$i = $$a$3306$i;$z$3$lcssa$i = $$z$4$i;
           break L231;
          }
         }
        }
        $672 = (($$31$i) + ($670<<2)|0);
        $674 = $$pr146$i;$a$3240$us$i = $a$1$lcssa$i;$z$3239$us$i = $z$1$lcssa$i;
        while(1) {
         $673 = (0 - ($674))|0;
         $675 = ($673|0)>(9);
         $676 = $675 ? 9 : $673;
         $677 = ($a$3240$us$i>>>0)<($z$3239$us$i>>>0);
         do {
          if ($677) {
           $702 = 1 << $676;
           $695 = (($702) + -1)|0;
           $699 = 1000000000 >>> $676;
           $carry3$0234$us$i = 0;$d$1233$us$i = $a$3240$us$i;
           while(1) {
            $693 = HEAP32[$d$1233$us$i>>2]|0;
            $694 = $693 & $695;
            $696 = $693 >>> $676;
            $697 = (($696) + ($carry3$0234$us$i))|0;
            HEAP32[$d$1233$us$i>>2] = $697;
            $698 = Math_imul($694, $699)|0;
            $700 = ((($d$1233$us$i)) + 4|0);
            $701 = ($700>>>0)<($z$3239$us$i>>>0);
            if ($701) {
             $carry3$0234$us$i = $698;$d$1233$us$i = $700;
            } else {
             $$lcssa464 = $698;
             break;
            }
           }
           $681 = HEAP32[$a$3240$us$i>>2]|0;
           $682 = ($681|0)==(0);
           $683 = ((($a$3240$us$i)) + 4|0);
           $$a$3$us$i = $682 ? $683 : $a$3240$us$i;
           $684 = ($$lcssa464|0)==(0);
           if ($684) {
            $$a$3$us304$i = $$a$3$us$i;$z$4$us$i = $z$3239$us$i;
            break;
           }
           $685 = ((($z$3239$us$i)) + 4|0);
           HEAP32[$z$3239$us$i>>2] = $$lcssa464;
           $$a$3$us304$i = $$a$3$us$i;$z$4$us$i = $685;
          } else {
           $678 = HEAP32[$a$3240$us$i>>2]|0;
           $679 = ($678|0)==(0);
           $680 = ((($a$3240$us$i)) + 4|0);
           $$a$3$us303$i = $679 ? $680 : $a$3240$us$i;
           $$a$3$us304$i = $$a$3$us303$i;$z$4$us$i = $z$3239$us$i;
          }
         } while(0);
         $686 = $z$4$us$i;
         $687 = (($686) - ($636))|0;
         $688 = $687 >> 2;
         $689 = ($688|0)>($670|0);
         $$z$4$us$i = $689 ? $672 : $z$4$us$i;
         $690 = HEAP32[$e2$i>>2]|0;
         $691 = (($690) + ($676))|0;
         HEAP32[$e2$i>>2] = $691;
         $692 = ($691|0)<(0);
         if ($692) {
          $674 = $691;$a$3240$us$i = $$a$3$us304$i;$z$3239$us$i = $$z$4$us$i;
         } else {
          $a$3$lcssa$i = $$a$3$us304$i;$z$3$lcssa$i = $$z$4$us$i;
          break;
         }
        }
       } else {
        $a$3$lcssa$i = $a$1$lcssa$i;$z$3$lcssa$i = $z$1$lcssa$i;
       }
      } while(0);
      $735 = ($a$3$lcssa$i>>>0)<($z$3$lcssa$i>>>0);
      do {
       if ($735) {
        $736 = $a$3$lcssa$i;
        $737 = (($636) - ($736))|0;
        $738 = $737 >> 2;
        $739 = ($738*9)|0;
        $740 = HEAP32[$a$3$lcssa$i>>2]|0;
        $741 = ($740>>>0)<(10);
        if ($741) {
         $e$1$i = $739;
         break;
        } else {
         $e$0229$i = $739;$i$0228$i = 10;
        }
        while(1) {
         $742 = ($i$0228$i*10)|0;
         $743 = (($e$0229$i) + 1)|0;
         $744 = ($740>>>0)<($742>>>0);
         if ($744) {
          $e$1$i = $743;
          break;
         } else {
          $e$0229$i = $743;$i$0228$i = $742;
         }
        }
       } else {
        $e$1$i = 0;
       }
      } while(0);
      $745 = ($476|0)!=(102);
      $746 = $745 ? $e$1$i : 0;
      $747 = (($$p$i) - ($746))|0;
      $748 = ($476|0)==(103);
      $749 = ($$p$i|0)!=(0);
      $750 = $749 & $748;
      $$neg151$i = $750 << 31 >> 31;
      $751 = (($747) + ($$neg151$i))|0;
      $752 = $z$3$lcssa$i;
      $753 = (($752) - ($636))|0;
      $754 = $753 >> 2;
      $755 = ($754*9)|0;
      $756 = (($755) + -9)|0;
      $757 = ($751|0)<($756|0);
      if ($757) {
       $758 = (($751) + 9216)|0;
       $759 = (($758|0) / 9)&-1;
       $$sum$i = (($759) + -1023)|0;
       $760 = (($$31$i) + ($$sum$i<<2)|0);
       $761 = (($758|0) % 9)&-1;
       $j$0221$i = (($761) + 1)|0;
       $762 = ($j$0221$i|0)<(9);
       if ($762) {
        $i$1222$i = 10;$j$0223$i = $j$0221$i;
        while(1) {
         $763 = ($i$1222$i*10)|0;
         $j$0$i = (($j$0223$i) + 1)|0;
         $exitcond$i = ($j$0$i|0)==(9);
         if ($exitcond$i) {
          $i$1$lcssa$i = $763;
          break;
         } else {
          $i$1222$i = $763;$j$0223$i = $j$0$i;
         }
        }
       } else {
        $i$1$lcssa$i = 10;
       }
       $764 = HEAP32[$760>>2]|0;
       $765 = (($764>>>0) % ($i$1$lcssa$i>>>0))&-1;
       $766 = ($765|0)==(0);
       if ($766) {
        $$sum15$i = (($759) + -1022)|0;
        $767 = (($$31$i) + ($$sum15$i<<2)|0);
        $768 = ($767|0)==($z$3$lcssa$i|0);
        if ($768) {
         $a$7$i = $a$3$lcssa$i;$d$3$i = $760;$e$3$i = $e$1$i;
        } else {
         label = 221;
        }
       } else {
        label = 221;
       }
       do {
        if ((label|0) == 221) {
         label = 0;
         $769 = (($764>>>0) / ($i$1$lcssa$i>>>0))&-1;
         $770 = $769 & 1;
         $771 = ($770|0)==(0);
         $$20$i = $771 ? 9007199254740992.0 : 9007199254740994.0;
         $772 = (($i$1$lcssa$i|0) / 2)&-1;
         $773 = ($765>>>0)<($772>>>0);
         do {
          if ($773) {
           $small$0$i = 0.5;
          } else {
           $774 = ($765|0)==($772|0);
           if ($774) {
            $$sum16$i = (($759) + -1022)|0;
            $775 = (($$31$i) + ($$sum16$i<<2)|0);
            $776 = ($775|0)==($z$3$lcssa$i|0);
            if ($776) {
             $small$0$i = 1.0;
             break;
            }
           }
           $small$0$i = 1.5;
          }
         } while(0);
         $777 = ($pl$0$i|0)==(0);
         do {
          if ($777) {
           $round6$1$i = $$20$i;$small$1$i = $small$0$i;
          } else {
           $778 = HEAP8[$prefix$0$i>>0]|0;
           $779 = ($778<<24>>24)==(45);
           if (!($779)) {
            $round6$1$i = $$20$i;$small$1$i = $small$0$i;
            break;
           }
           $780 = -$$20$i;
           $781 = -$small$0$i;
           $round6$1$i = $780;$small$1$i = $781;
          }
         } while(0);
         $782 = (($764) - ($765))|0;
         HEAP32[$760>>2] = $782;
         $783 = $round6$1$i + $small$1$i;
         $784 = $783 != $round6$1$i;
         if (!($784)) {
          $a$7$i = $a$3$lcssa$i;$d$3$i = $760;$e$3$i = $e$1$i;
          break;
         }
         $785 = (($782) + ($i$1$lcssa$i))|0;
         HEAP32[$760>>2] = $785;
         $786 = ($785>>>0)>(999999999);
         if ($786) {
          $a$5215$i = $a$3$lcssa$i;$d$2214$i = $760;
          while(1) {
           $787 = ((($d$2214$i)) + -4|0);
           HEAP32[$d$2214$i>>2] = 0;
           $788 = ($787>>>0)<($a$5215$i>>>0);
           if ($788) {
            $789 = ((($a$5215$i)) + -4|0);
            HEAP32[$789>>2] = 0;
            $a$6$i = $789;
           } else {
            $a$6$i = $a$5215$i;
           }
           $790 = HEAP32[$787>>2]|0;
           $791 = (($790) + 1)|0;
           HEAP32[$787>>2] = $791;
           $792 = ($791>>>0)>(999999999);
           if ($792) {
            $a$5215$i = $a$6$i;$d$2214$i = $787;
           } else {
            $a$5$lcssa$i = $a$6$i;$d$2$lcssa$i = $787;
            break;
           }
          }
         } else {
          $a$5$lcssa$i = $a$3$lcssa$i;$d$2$lcssa$i = $760;
         }
         $793 = $a$5$lcssa$i;
         $794 = (($636) - ($793))|0;
         $795 = $794 >> 2;
         $796 = ($795*9)|0;
         $797 = HEAP32[$a$5$lcssa$i>>2]|0;
         $798 = ($797>>>0)<(10);
         if ($798) {
          $a$7$i = $a$5$lcssa$i;$d$3$i = $d$2$lcssa$i;$e$3$i = $796;
          break;
         } else {
          $e$2210$i = $796;$i$2209$i = 10;
         }
         while(1) {
          $799 = ($i$2209$i*10)|0;
          $800 = (($e$2210$i) + 1)|0;
          $801 = ($797>>>0)<($799>>>0);
          if ($801) {
           $a$7$i = $a$5$lcssa$i;$d$3$i = $d$2$lcssa$i;$e$3$i = $800;
           break;
          } else {
           $e$2210$i = $800;$i$2209$i = $799;
          }
         }
        }
       } while(0);
       $802 = ((($d$3$i)) + 4|0);
       $803 = ($z$3$lcssa$i>>>0)>($802>>>0);
       $$z$3$i = $803 ? $802 : $z$3$lcssa$i;
       $a$8$ph$i = $a$7$i;$e$4$ph$i = $e$3$i;$z$6$ph$i = $$z$3$i;
      } else {
       $a$8$ph$i = $a$3$lcssa$i;$e$4$ph$i = $e$1$i;$z$6$ph$i = $z$3$lcssa$i;
      }
      $804 = (0 - ($e$4$ph$i))|0;
      $z$6$i = $z$6$ph$i;
      while(1) {
       $805 = ($z$6$i>>>0)>($a$8$ph$i>>>0);
       if (!($805)) {
        $$lcssa275$i = 0;$z$6$i$lcssa = $z$6$i;
        break;
       }
       $806 = ((($z$6$i)) + -4|0);
       $807 = HEAP32[$806>>2]|0;
       $808 = ($807|0)==(0);
       if ($808) {
        $z$6$i = $806;
       } else {
        $$lcssa275$i = 1;$z$6$i$lcssa = $z$6$i;
        break;
       }
      }
      do {
       if ($748) {
        $809 = $749&1;
        $810 = $809 ^ 1;
        $$p$$i = (($810) + ($$p$i))|0;
        $811 = ($$p$$i|0)>($e$4$ph$i|0);
        $812 = ($e$4$ph$i|0)>(-5);
        $or$cond6$i = $811 & $812;
        if ($or$cond6$i) {
         $813 = (($t$0) + -1)|0;
         $$neg152$i = (($$p$$i) + -1)|0;
         $814 = (($$neg152$i) - ($e$4$ph$i))|0;
         $$013$i = $813;$$210$i = $814;
        } else {
         $815 = (($t$0) + -2)|0;
         $816 = (($$p$$i) + -1)|0;
         $$013$i = $815;$$210$i = $816;
        }
        $817 = $fl$1$ & 8;
        $818 = ($817|0)==(0);
        if (!($818)) {
         $$114$i = $$013$i;$$311$i = $$210$i;$$pre$phi302$iZ2D = $817;
         break;
        }
        do {
         if ($$lcssa275$i) {
          $819 = ((($z$6$i$lcssa)) + -4|0);
          $820 = HEAP32[$819>>2]|0;
          $821 = ($820|0)==(0);
          if ($821) {
           $j$2$i = 9;
           break;
          }
          $822 = (($820>>>0) % 10)&-1;
          $823 = ($822|0)==(0);
          if ($823) {
           $i$3205$i = 10;$j$1206$i = 0;
          } else {
           $j$2$i = 0;
           break;
          }
          while(1) {
           $824 = ($i$3205$i*10)|0;
           $825 = (($j$1206$i) + 1)|0;
           $826 = (($820>>>0) % ($824>>>0))&-1;
           $827 = ($826|0)==(0);
           if ($827) {
            $i$3205$i = $824;$j$1206$i = $825;
           } else {
            $j$2$i = $825;
            break;
           }
          }
         } else {
          $j$2$i = 9;
         }
        } while(0);
        $828 = $$013$i | 32;
        $829 = ($828|0)==(102);
        $830 = $z$6$i$lcssa;
        $831 = (($830) - ($636))|0;
        $832 = $831 >> 2;
        $833 = ($832*9)|0;
        $834 = (($833) + -9)|0;
        if ($829) {
         $835 = (($834) - ($j$2$i))|0;
         $836 = ($835|0)<(0);
         $$21$i = $836 ? 0 : $835;
         $837 = ($$210$i|0)<($$21$i|0);
         $$210$$22$i = $837 ? $$210$i : $$21$i;
         $$114$i = $$013$i;$$311$i = $$210$$22$i;$$pre$phi302$iZ2D = 0;
         break;
        } else {
         $838 = (($834) + ($e$4$ph$i))|0;
         $839 = (($838) - ($j$2$i))|0;
         $840 = ($839|0)<(0);
         $$23$i = $840 ? 0 : $839;
         $841 = ($$210$i|0)<($$23$i|0);
         $$210$$24$i = $841 ? $$210$i : $$23$i;
         $$114$i = $$013$i;$$311$i = $$210$$24$i;$$pre$phi302$iZ2D = 0;
         break;
        }
       } else {
        $$pre301$i = $fl$1$ & 8;
        $$114$i = $t$0;$$311$i = $$p$i;$$pre$phi302$iZ2D = $$pre301$i;
       }
      } while(0);
      $842 = $$311$i | $$pre$phi302$iZ2D;
      $843 = ($842|0)!=(0);
      $844 = $843&1;
      $845 = $$114$i | 32;
      $846 = ($845|0)==(102);
      if ($846) {
       $847 = ($e$4$ph$i|0)>(0);
       $848 = $847 ? $e$4$ph$i : 0;
       $$pn$i = $848;$estr$2$i = 0;
      } else {
       $849 = ($e$4$ph$i|0)<(0);
       $850 = $849 ? $804 : $e$4$ph$i;
       $851 = ($850|0)<(0);
       if ($851) {
        $852 = ($850|0)<(0);
        $853 = $852 << 31 >> 31;
        $$05$i79$i = $7;$854 = $850;$855 = $853;
        while(1) {
         $856 = (___uremdi3(($854|0),($855|0),10,0)|0);
         $857 = tempRet0;
         $858 = $856 | 48;
         $859 = $858&255;
         $860 = ((($$05$i79$i)) + -1|0);
         HEAP8[$860>>0] = $859;
         $861 = (___udivdi3(($854|0),($855|0),10,0)|0);
         $862 = tempRet0;
         $863 = ($855>>>0)>(9);
         $864 = ($854>>>0)>(4294967295);
         $865 = ($855|0)==(9);
         $866 = $865 & $864;
         $867 = $863 | $866;
         if ($867) {
          $$05$i79$i = $860;$854 = $861;$855 = $862;
         } else {
          $$lcssa470 = $860;$1185 = $861;$1186 = $862;
          break;
         }
        }
        $$0$lcssa$i84$i = $$lcssa470;$$01$lcssa$off0$i85$i = $1185;
       } else {
        $$0$lcssa$i84$i = $7;$$01$lcssa$off0$i85$i = $850;
       }
       $868 = ($$01$lcssa$off0$i85$i|0)==(0);
       if ($868) {
        $estr$1$ph$i = $$0$lcssa$i84$i;
       } else {
        $$12$i87$i = $$0$lcssa$i84$i;$y$03$i86$i = $$01$lcssa$off0$i85$i;
        while(1) {
         $869 = (($y$03$i86$i>>>0) % 10)&-1;
         $870 = $869 | 48;
         $871 = $870&255;
         $872 = ((($$12$i87$i)) + -1|0);
         HEAP8[$872>>0] = $871;
         $873 = (($y$03$i86$i>>>0) / 10)&-1;
         $874 = ($y$03$i86$i>>>0)<(10);
         if ($874) {
          $estr$1$ph$i = $872;
          break;
         } else {
          $$12$i87$i = $872;$y$03$i86$i = $873;
         }
        }
       }
       $875 = $estr$1$ph$i;
       $876 = (($9) - ($875))|0;
       $877 = ($876|0)<(2);
       if ($877) {
        $estr$1201$i = $estr$1$ph$i;
        while(1) {
         $878 = ((($estr$1201$i)) + -1|0);
         HEAP8[$878>>0] = 48;
         $879 = $878;
         $880 = (($9) - ($879))|0;
         $881 = ($880|0)<(2);
         if ($881) {
          $estr$1201$i = $878;
         } else {
          $estr$1$lcssa$i = $878;
          break;
         }
        }
       } else {
        $estr$1$lcssa$i = $estr$1$ph$i;
       }
       $882 = $e$4$ph$i >> 31;
       $883 = $882 & 2;
       $884 = (($883) + 43)|0;
       $885 = $884&255;
       $886 = ((($estr$1$lcssa$i)) + -1|0);
       HEAP8[$886>>0] = $885;
       $887 = $$114$i&255;
       $888 = ((($estr$1$lcssa$i)) + -2|0);
       HEAP8[$888>>0] = $887;
       $889 = $888;
       $890 = (($9) - ($889))|0;
       $$pn$i = $890;$estr$2$i = $888;
      }
      $891 = (($pl$0$i) + 1)|0;
      $892 = (($891) + ($$311$i))|0;
      $l$1$i = (($892) + ($844))|0;
      $893 = (($l$1$i) + ($$pn$i))|0;
      $894 = $fl$1$ & 73728;
      $895 = ($894|0)==(0);
      $896 = ($w$1|0)>($893|0);
      $or$cond$i93$i = $895 & $896;
      if ($or$cond$i93$i) {
       $897 = (($w$1) - ($893))|0;
       $898 = ($897>>>0)>(256);
       $899 = $898 ? 256 : $897;
       _memset(($pad$i|0),32,($899|0))|0;
       $900 = ($897>>>0)>(255);
       if ($900) {
        $$01$i95$i = $897;
        while(1) {
         (___fwritex($pad$i,256,$f)|0);
         $901 = (($$01$i95$i) + -256)|0;
         $902 = ($901>>>0)>(255);
         if ($902) {
          $$01$i95$i = $901;
         } else {
          break;
         }
        }
        $903 = $897 & 255;
        $$0$lcssa$i97$i = $903;
       } else {
        $$0$lcssa$i97$i = $897;
       }
       (___fwritex($pad$i,$$0$lcssa$i97$i,$f)|0);
      }
      (___fwritex($prefix$0$i,$pl$0$i,$f)|0);
      $904 = ($894|0)==(65536);
      $or$cond$i100$i = $904 & $896;
      if ($or$cond$i100$i) {
       $905 = (($w$1) - ($893))|0;
       $906 = ($905>>>0)>(256);
       $907 = $906 ? 256 : $905;
       _memset(($pad$i|0),48,($907|0))|0;
       $908 = ($905>>>0)>(255);
       if ($908) {
        $$01$i102$i = $905;
        while(1) {
         (___fwritex($pad$i,256,$f)|0);
         $909 = (($$01$i102$i) + -256)|0;
         $910 = ($909>>>0)>(255);
         if ($910) {
          $$01$i102$i = $909;
         } else {
          break;
         }
        }
        $911 = $905 & 255;
        $$0$lcssa$i104$i = $911;
       } else {
        $$0$lcssa$i104$i = $905;
       }
       (___fwritex($pad$i,$$0$lcssa$i104$i,$f)|0);
      }
      if ($846) {
       $912 = ($a$8$ph$i>>>0)>($$31$i>>>0);
       $r$0$a$8$i = $912 ? $$31$i : $a$8$ph$i;
       $d$4191$i = $r$0$a$8$i;
       while(1) {
        $913 = HEAP32[$d$4191$i>>2]|0;
        $914 = ($913|0)==(0);
        if ($914) {
         $$1$lcssa$i112$i = $14;
        } else {
         $$12$i110$i = $14;$y$03$i109$i = $913;
         while(1) {
          $915 = (($y$03$i109$i>>>0) % 10)&-1;
          $916 = $915 | 48;
          $917 = $916&255;
          $918 = ((($$12$i110$i)) + -1|0);
          HEAP8[$918>>0] = $917;
          $919 = (($y$03$i109$i>>>0) / 10)&-1;
          $920 = ($y$03$i109$i>>>0)<(10);
          if ($920) {
           $$1$lcssa$i112$i = $918;
           break;
          } else {
           $$12$i110$i = $918;$y$03$i109$i = $919;
          }
         }
        }
        $921 = ($d$4191$i|0)==($r$0$a$8$i|0);
        do {
         if ($921) {
          $925 = ($$1$lcssa$i112$i|0)==($14|0);
          if (!($925)) {
           $s7$1$i = $$1$lcssa$i112$i;
           break;
          }
          HEAP8[$16>>0] = 48;
          $s7$1$i = $16;
         } else {
          $922 = ($$1$lcssa$i112$i>>>0)>($buf$i>>>0);
          if ($922) {
           $s7$0188$i = $$1$lcssa$i112$i;
          } else {
           $s7$1$i = $$1$lcssa$i112$i;
           break;
          }
          while(1) {
           $923 = ((($s7$0188$i)) + -1|0);
           HEAP8[$923>>0] = 48;
           $924 = ($923>>>0)>($buf$i>>>0);
           if ($924) {
            $s7$0188$i = $923;
           } else {
            $s7$1$i = $923;
            break;
           }
          }
         }
        } while(0);
        $926 = $s7$1$i;
        $927 = (($15) - ($926))|0;
        (___fwritex($s7$1$i,$927,$f)|0);
        $928 = ((($d$4191$i)) + 4|0);
        $929 = ($928>>>0)>($$31$i>>>0);
        if ($929) {
         $$lcssa479 = $928;
         break;
        } else {
         $d$4191$i = $928;
        }
       }
       $930 = ($842|0)==(0);
       if (!($930)) {
        (___fwritex(2072,1,$f)|0);
       }
       $931 = ($$lcssa479>>>0)<($z$6$i$lcssa>>>0);
       $932 = ($$311$i|0)>(0);
       $933 = $932 & $931;
       if ($933) {
        $$412184$i = $$311$i;$d$5183$i = $$lcssa479;
        while(1) {
         $934 = HEAP32[$d$5183$i>>2]|0;
         $935 = ($934|0)==(0);
         if ($935) {
          $s8$0180$i = $14;
          label = 289;
         } else {
          $$12$i119$i = $14;$y$03$i118$i = $934;
          while(1) {
           $936 = (($y$03$i118$i>>>0) % 10)&-1;
           $937 = $936 | 48;
           $938 = $937&255;
           $939 = ((($$12$i119$i)) + -1|0);
           HEAP8[$939>>0] = $938;
           $940 = (($y$03$i118$i>>>0) / 10)&-1;
           $941 = ($y$03$i118$i>>>0)<(10);
           if ($941) {
            $$lcssa480 = $939;
            break;
           } else {
            $$12$i119$i = $939;$y$03$i118$i = $940;
           }
          }
          $942 = ($$lcssa480>>>0)>($buf$i>>>0);
          if ($942) {
           $s8$0180$i = $$lcssa480;
           label = 289;
          } else {
           $s8$0$lcssa$i = $$lcssa480;
          }
         }
         if ((label|0) == 289) {
          while(1) {
           label = 0;
           $943 = ((($s8$0180$i)) + -1|0);
           HEAP8[$943>>0] = 48;
           $944 = ($943>>>0)>($buf$i>>>0);
           if ($944) {
            $s8$0180$i = $943;
            label = 289;
           } else {
            $s8$0$lcssa$i = $943;
            break;
           }
          }
         }
         $945 = ($$412184$i|0)>(9);
         $946 = $945 ? 9 : $$412184$i;
         (___fwritex($s8$0$lcssa$i,$946,$f)|0);
         $947 = ((($d$5183$i)) + 4|0);
         $948 = (($$412184$i) + -9)|0;
         $949 = ($947>>>0)<($z$6$i$lcssa>>>0);
         $950 = $945 & $949;
         if ($950) {
          $$412184$i = $948;$d$5183$i = $947;
         } else {
          $$412$lcssa$i = $948;
          break;
         }
        }
       } else {
        $$412$lcssa$i = $$311$i;
       }
       $951 = ($$412$lcssa$i|0)>(0);
       if ($951) {
        $952 = ($$412$lcssa$i>>>0)>(256);
        $953 = $952 ? 256 : $$412$lcssa$i;
        _memset(($pad$i|0),48,($953|0))|0;
        $954 = ($$412$lcssa$i>>>0)>(255);
        if ($954) {
         $$01$i126$i = $$412$lcssa$i;
         while(1) {
          (___fwritex($pad$i,256,$f)|0);
          $955 = (($$01$i126$i) + -256)|0;
          $956 = ($955>>>0)>(255);
          if ($956) {
           $$01$i126$i = $955;
          } else {
           break;
          }
         }
         $957 = $$412$lcssa$i & 255;
         $$0$lcssa$i128$i = $957;
        } else {
         $$0$lcssa$i128$i = $$412$lcssa$i;
        }
        (___fwritex($pad$i,$$0$lcssa$i128$i,$f)|0);
       }
      } else {
       $958 = ((($a$8$ph$i)) + 4|0);
       $z$6$$i = $$lcssa275$i ? $z$6$i$lcssa : $958;
       $959 = ($$311$i|0)>(-1);
       do {
        if ($959) {
         $960 = ($$pre$phi302$iZ2D|0)==(0);
         $$5196$i = $$311$i;$d$6195$i = $a$8$ph$i;
         while(1) {
          $961 = HEAP32[$d$6195$i>>2]|0;
          $962 = ($961|0)==(0);
          if ($962) {
           label = 303;
          } else {
           $$12$i134$i = $14;$y$03$i133$i = $961;
           while(1) {
            $963 = (($y$03$i133$i>>>0) % 10)&-1;
            $964 = $963 | 48;
            $965 = $964&255;
            $966 = ((($$12$i134$i)) + -1|0);
            HEAP8[$966>>0] = $965;
            $967 = (($y$03$i133$i>>>0) / 10)&-1;
            $968 = ($y$03$i133$i>>>0)<(10);
            if ($968) {
             $$12$i134$i$lcssa = $$12$i134$i;$$lcssa474 = $966;
             break;
            } else {
             $$12$i134$i = $966;$y$03$i133$i = $967;
            }
           }
           $969 = ($$lcssa474|0)==($14|0);
           if ($969) {
            label = 303;
           } else {
            $1187 = $$12$i134$i$lcssa;$s9$0$i = $$lcssa474;
           }
          }
          if ((label|0) == 303) {
           label = 0;
           HEAP8[$16>>0] = 48;
           $1187 = $14;$s9$0$i = $16;
          }
          $970 = ($d$6195$i|0)==($a$8$ph$i|0);
          do {
           if ($970) {
            (___fwritex($s9$0$i,1,$f)|0);
            $974 = ($$5196$i|0)<(1);
            $or$cond29$i = $960 & $974;
            if ($or$cond29$i) {
             $s9$2$i = $1187;
             break;
            }
            (___fwritex(2072,1,$f)|0);
            $s9$2$i = $1187;
           } else {
            $971 = ($s9$0$i>>>0)>($buf$i>>>0);
            if ($971) {
             $s9$1192$i = $s9$0$i;
            } else {
             $s9$2$i = $s9$0$i;
             break;
            }
            while(1) {
             $972 = ((($s9$1192$i)) + -1|0);
             HEAP8[$972>>0] = 48;
             $973 = ($972>>>0)>($buf$i>>>0);
             if ($973) {
              $s9$1192$i = $972;
             } else {
              $s9$2$i = $972;
              break;
             }
            }
           }
          } while(0);
          $975 = $s9$2$i;
          $976 = (($15) - ($975))|0;
          $977 = ($$5196$i|0)>($976|0);
          $978 = $977 ? $976 : $$5196$i;
          (___fwritex($s9$2$i,$978,$f)|0);
          $979 = (($$5196$i) - ($976))|0;
          $980 = ((($d$6195$i)) + 4|0);
          $981 = ($980>>>0)<($z$6$$i>>>0);
          $982 = ($979|0)>(-1);
          $983 = $981 & $982;
          if ($983) {
           $$5196$i = $979;$d$6195$i = $980;
          } else {
           $$lcssa476 = $979;
           break;
          }
         }
         $984 = ($$lcssa476|0)>(0);
         if (!($984)) {
          break;
         }
         $985 = ($$lcssa476>>>0)>(256);
         $986 = $985 ? 256 : $$lcssa476;
         _memset(($pad$i|0),48,($986|0))|0;
         $987 = ($$lcssa476>>>0)>(255);
         if ($987) {
          $$01$i141$i = $$lcssa476;
          while(1) {
           (___fwritex($pad$i,256,$f)|0);
           $988 = (($$01$i141$i) + -256)|0;
           $989 = ($988>>>0)>(255);
           if ($989) {
            $$01$i141$i = $988;
           } else {
            break;
           }
          }
          $990 = $$lcssa476 & 255;
          $$0$lcssa$i143$i = $990;
         } else {
          $$0$lcssa$i143$i = $$lcssa476;
         }
         (___fwritex($pad$i,$$0$lcssa$i143$i,$f)|0);
        } else {
        }
       } while(0);
       $991 = $estr$2$i;
       $992 = (($9) - ($991))|0;
       (___fwritex($estr$2$i,$992,$f)|0);
      }
      $993 = ($894|0)==(8192);
      $or$cond$i$i = $993 & $896;
      if ($or$cond$i$i) {
       $994 = (($w$1) - ($893))|0;
       $995 = ($994>>>0)>(256);
       $996 = $995 ? 256 : $994;
       _memset(($pad$i|0),32,($996|0))|0;
       $997 = ($994>>>0)>(255);
       if ($997) {
        $$01$i$i = $994;
        while(1) {
         (___fwritex($pad$i,256,$f)|0);
         $998 = (($$01$i$i) + -256)|0;
         $999 = ($998>>>0)>(255);
         if ($999) {
          $$01$i$i = $998;
         } else {
          break;
         }
        }
        $1000 = $994 & 255;
        $$0$lcssa$i$i = $1000;
       } else {
        $$0$lcssa$i$i = $994;
       }
       (___fwritex($pad$i,$$0$lcssa$i$i,$f)|0);
      }
      $w$30$i = $896 ? $w$1 : $893;
      $$0$i = $w$30$i;
     } else {
      $445 = $t$0 & 32;
      $446 = ($445|0)!=(0);
      $447 = $446 ? 2040 : 2048;
      $448 = ($$07$i != $$07$i) | (0.0 != 0.0);
      $449 = $446 ? 2056 : 2064;
      $pl$1$i = $448 ? 0 : $pl$0$i;
      $s1$0$i = $448 ? $449 : $447;
      $450 = (($pl$1$i) + 3)|0;
      $451 = $fl$1$ & 8192;
      $452 = ($451|0)==(0);
      $453 = ($w$1|0)>($450|0);
      $or$cond$i35$i = $452 & $453;
      if ($or$cond$i35$i) {
       $454 = (($w$1) - ($450))|0;
       $455 = ($454>>>0)>(256);
       $456 = $455 ? 256 : $454;
       _memset(($pad$i|0),32,($456|0))|0;
       $457 = ($454>>>0)>(255);
       if ($457) {
        $$01$i37$i = $454;
        while(1) {
         (___fwritex($pad$i,256,$f)|0);
         $458 = (($$01$i37$i) + -256)|0;
         $459 = ($458>>>0)>(255);
         if ($459) {
          $$01$i37$i = $458;
         } else {
          break;
         }
        }
        $460 = $454 & 255;
        $$0$lcssa$i39$i = $460;
       } else {
        $$0$lcssa$i39$i = $454;
       }
       (___fwritex($pad$i,$$0$lcssa$i39$i,$f)|0);
      }
      (___fwritex($prefix$0$i,$pl$1$i,$f)|0);
      (___fwritex($s1$0$i,3,$f)|0);
      $461 = $fl$1$ & 73728;
      $462 = ($461|0)==(8192);
      $or$cond$i42$i = $462 & $453;
      if ($or$cond$i42$i) {
       $463 = (($w$1) - ($450))|0;
       $464 = ($463>>>0)>(256);
       $465 = $464 ? 256 : $463;
       _memset(($pad$i|0),32,($465|0))|0;
       $466 = ($463>>>0)>(255);
       if ($466) {
        $$01$i44$i = $463;
        while(1) {
         (___fwritex($pad$i,256,$f)|0);
         $467 = (($$01$i44$i) + -256)|0;
         $468 = ($467>>>0)>(255);
         if ($468) {
          $$01$i44$i = $467;
         } else {
          break;
         }
        }
        $469 = $463 & 255;
        $$0$lcssa$i46$i = $469;
       } else {
        $$0$lcssa$i46$i = $463;
       }
       (___fwritex($pad$i,$$0$lcssa$i46$i,$f)|0);
      }
      $470 = $453 ? $w$1 : $450;
      $$0$i = $470;
     }
    } while(0);
    $1169 = $291;$1170 = $264;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $$0$i;$l10n$0 = $l10n$3;
    continue L1;
    break;
   }
   case 88: case 120:  {
    $fl$3 = $fl$1$;$p$1 = $p$0;$t$1 = $t$0;
    label = 73;
    break;
   }
   case 99:  {
    $378 = $264&255;
    HEAP8[$4>>0] = $378;
    $1175 = $291;$1176 = $264;$a$2 = $4;$fl$6 = $263;$p$5 = 1;$pl$2 = 0;$prefix$2 = 1992;$z$2 = $2;
    break;
   }
   case 105: case 100:  {
    $329 = ($291|0)<(0);
    if ($329) {
     $330 = (_i64Subtract(0,0,($264|0),($291|0))|0);
     $331 = tempRet0;
     $336 = $331;$338 = $330;$pl$0 = 1;$prefix$0 = 1992;
     label = 84;
     break L86;
    }
    $332 = $fl$1$ & 2048;
    $333 = ($332|0)==(0);
    if ($333) {
     $334 = $fl$1$ & 1;
     $335 = ($334|0)==(0);
     $$ = $335 ? 1992 : (1994);
     $336 = $291;$338 = $264;$pl$0 = $334;$prefix$0 = $$;
     label = 84;
    } else {
     $336 = $291;$338 = $264;$pl$0 = 1;$prefix$0 = (1993);
     label = 84;
    }
    break;
   }
   case 117:  {
    $336 = $291;$338 = $264;$pl$0 = 0;$prefix$0 = 1992;
    label = 84;
    break;
   }
   default: {
    $1175 = $291;$1176 = $264;$a$2 = $23;$fl$6 = $fl$1$;$p$5 = $p$0;$pl$2 = 0;$prefix$2 = 1992;$z$2 = $2;
   }
   }
  } while(0);
  if ((label|0) == 73) {
   label = 0;
   $289 = $t$1 & 32;
   $290 = ($264|0)==(0);
   $292 = ($291|0)==(0);
   $293 = $290 & $292;
   if ($293) {
    $366 = $264;$368 = $291;$a$0 = $2;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 0;$prefix$1 = 1992;
    label = 89;
   } else {
    $$012$i = $2;$295 = $264;$302 = $291;
    while(1) {
     $294 = $295 & 15;
     $296 = (1976 + ($294)|0);
     $297 = HEAP8[$296>>0]|0;
     $298 = $297&255;
     $299 = $298 | $289;
     $300 = $299&255;
     $301 = ((($$012$i)) + -1|0);
     HEAP8[$301>>0] = $300;
     $303 = (_bitshift64Lshr(($295|0),($302|0),4)|0);
     $304 = tempRet0;
     $305 = ($303|0)==(0);
     $306 = ($304|0)==(0);
     $307 = $305 & $306;
     if ($307) {
      $$lcssa491 = $301;
      break;
     } else {
      $$012$i = $301;$295 = $303;$302 = $304;
     }
    }
    $308 = $fl$3 & 8;
    $309 = ($308|0)==(0);
    if ($309) {
     $366 = $264;$368 = $291;$a$0 = $$lcssa491;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 0;$prefix$1 = 1992;
     label = 89;
    } else {
     $310 = $t$1 >> 4;
     $311 = (1992 + ($310)|0);
     $366 = $264;$368 = $291;$a$0 = $$lcssa491;$fl$4 = $fl$3;$p$2 = $p$1;$pl$1 = 2;$prefix$1 = $311;
     label = 89;
    }
   }
  }
  else if ((label|0) == 84) {
   label = 0;
   $337 = ($336>>>0)>(0);
   $339 = ($338>>>0)>(4294967295);
   $340 = ($336|0)==(0);
   $341 = $340 & $339;
   $342 = $337 | $341;
   if ($342) {
    $$05$i = $2;$343 = $338;$344 = $336;
    while(1) {
     $345 = (___uremdi3(($343|0),($344|0),10,0)|0);
     $346 = tempRet0;
     $347 = $345 | 48;
     $348 = $347&255;
     $349 = ((($$05$i)) + -1|0);
     HEAP8[$349>>0] = $348;
     $350 = (___udivdi3(($343|0),($344|0),10,0)|0);
     $351 = tempRet0;
     $352 = ($344>>>0)>(9);
     $353 = ($343>>>0)>(4294967295);
     $354 = ($344|0)==(9);
     $355 = $354 & $353;
     $356 = $352 | $355;
     if ($356) {
      $$05$i = $349;$343 = $350;$344 = $351;
     } else {
      $$lcssa487 = $349;$1177 = $350;$1178 = $351;
      break;
     }
    }
    $$0$lcssa$i53 = $$lcssa487;$$01$lcssa$off0$i = $1177;
   } else {
    $$0$lcssa$i53 = $2;$$01$lcssa$off0$i = $338;
   }
   $357 = ($$01$lcssa$off0$i|0)==(0);
   if ($357) {
    $366 = $338;$368 = $336;$a$0 = $$0$lcssa$i53;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $pl$0;$prefix$1 = $prefix$0;
    label = 89;
   } else {
    $$12$i = $$0$lcssa$i53;$y$03$i = $$01$lcssa$off0$i;
    while(1) {
     $358 = (($y$03$i>>>0) % 10)&-1;
     $359 = $358 | 48;
     $360 = $359&255;
     $361 = ((($$12$i)) + -1|0);
     HEAP8[$361>>0] = $360;
     $362 = (($y$03$i>>>0) / 10)&-1;
     $363 = ($y$03$i>>>0)<(10);
     if ($363) {
      $366 = $338;$368 = $336;$a$0 = $361;$fl$4 = $fl$1$;$p$2 = $p$0;$pl$1 = $pl$0;$prefix$1 = $prefix$0;
      label = 89;
      break;
     } else {
      $$12$i = $361;$y$03$i = $362;
     }
    }
   }
  }
  else if ((label|0) == 94) {
   label = 0;
   $385 = (_memchr($a$1,0,$p$0)|0);
   $386 = ($385|0)==(0|0);
   $387 = $385;
   $388 = $a$1;
   $389 = (($387) - ($388))|0;
   $390 = (($a$1) + ($p$0)|0);
   $z$1 = $386 ? $390 : $385;
   $p$3 = $386 ? $p$0 : $389;
   $1175 = $291;$1176 = $264;$a$2 = $a$1;$fl$6 = $263;$p$5 = $p$3;$pl$2 = 0;$prefix$2 = 1992;$z$2 = $z$1;
  }
  else if ((label|0) == 97) {
   label = 0;
   $i$0175 = 0;$l$1174 = 0;$ws$0176 = $1179;
   while(1) {
    $393 = HEAP32[$ws$0176>>2]|0;
    $394 = ($393|0)==(0);
    if ($394) {
     $i$0$lcssa = $i$0175;$l$2 = $l$1174;
     break;
    }
    $395 = (_wctomb($mb,$393)|0);
    $396 = ($395|0)<(0);
    $397 = (($p$4272) - ($i$0175))|0;
    $398 = ($395>>>0)>($397>>>0);
    $or$cond22 = $396 | $398;
    if ($or$cond22) {
     $i$0$lcssa = $i$0175;$l$2 = $395;
     break;
    }
    $399 = ((($ws$0176)) + 4|0);
    $400 = (($395) + ($i$0175))|0;
    $401 = ($p$4272>>>0)>($400>>>0);
    if ($401) {
     $i$0175 = $400;$l$1174 = $395;$ws$0176 = $399;
    } else {
     $i$0$lcssa = $400;$l$2 = $395;
     break;
    }
   }
   $402 = ($l$2|0)<(0);
   if ($402) {
    $$0 = -1;
    label = 363;
    break;
   } else {
    $1181 = $1180;$1182 = $1179;$i$0$lcssa273 = $i$0$lcssa;
    label = 102;
   }
  }
  if ((label|0) == 89) {
   label = 0;
   $364 = ($p$2|0)>(-1);
   $365 = $fl$4 & -65537;
   $$fl$4 = $364 ? $365 : $fl$4;
   $367 = ($366|0)!=(0);
   $369 = ($368|0)!=(0);
   $370 = $367 | $369;
   $371 = ($p$2|0)!=(0);
   $or$cond = $370 | $371;
   if ($or$cond) {
    $372 = $a$0;
    $373 = (($3) - ($372))|0;
    $374 = $370&1;
    $375 = $374 ^ 1;
    $376 = (($375) + ($373))|0;
    $377 = ($p$2|0)>($376|0);
    $p$2$ = $377 ? $p$2 : $376;
    $1175 = $368;$1176 = $366;$a$2 = $a$0;$fl$6 = $$fl$4;$p$5 = $p$2$;$pl$2 = $pl$1;$prefix$2 = $prefix$1;$z$2 = $2;
   } else {
    $1175 = $368;$1176 = $366;$a$2 = $2;$fl$6 = $$fl$4;$p$5 = 0;$pl$2 = $pl$1;$prefix$2 = $prefix$1;$z$2 = $2;
   }
  }
  else if ((label|0) == 102) {
   label = 0;
   $403 = $fl$1$ & 73728;
   $404 = ($403|0)==(0);
   $405 = ($w$1|0)>($i$0$lcssa273|0);
   $or$cond$i64 = $404 & $405;
   if ($or$cond$i64) {
    $406 = (($w$1) - ($i$0$lcssa273))|0;
    $407 = ($406>>>0)>(256);
    $408 = $407 ? 256 : $406;
    _memset(($pad$i|0),32,($408|0))|0;
    $409 = ($406>>>0)>(255);
    if ($409) {
     $$01$i66 = $406;
     while(1) {
      (___fwritex($pad$i,256,$f)|0);
      $410 = (($$01$i66) + -256)|0;
      $411 = ($410>>>0)>(255);
      if ($411) {
       $$01$i66 = $410;
      } else {
       break;
      }
     }
     $412 = $406 & 255;
     $$0$lcssa$i68 = $412;
    } else {
     $$0$lcssa$i68 = $406;
    }
    (___fwritex($pad$i,$$0$lcssa$i68,$f)|0);
   }
   $413 = ($i$0$lcssa273|0)==(0);
   L463: do {
    if (!($413)) {
     $i$1186 = 0;$ws$1187 = $1182;
     while(1) {
      $414 = HEAP32[$ws$1187>>2]|0;
      $415 = ($414|0)==(0);
      if ($415) {
       break L463;
      }
      $416 = (_wctomb($mb,$414)|0);
      $417 = (($416) + ($i$1186))|0;
      $418 = ($417|0)>($i$0$lcssa273|0);
      if ($418) {
       break L463;
      }
      $419 = ((($ws$1187)) + 4|0);
      (___fwritex($mb,$416,$f)|0);
      $420 = ($417>>>0)<($i$0$lcssa273>>>0);
      if ($420) {
       $i$1186 = $417;$ws$1187 = $419;
      } else {
       break;
      }
     }
    }
   } while(0);
   $421 = ($403|0)==(8192);
   $or$cond$i71 = $421 & $405;
   if ($or$cond$i71) {
    $422 = (($w$1) - ($i$0$lcssa273))|0;
    $423 = ($422>>>0)>(256);
    $424 = $423 ? 256 : $422;
    _memset(($pad$i|0),32,($424|0))|0;
    $425 = ($422>>>0)>(255);
    if ($425) {
     $$01$i73 = $422;
     while(1) {
      (___fwritex($pad$i,256,$f)|0);
      $426 = (($$01$i73) + -256)|0;
      $427 = ($426>>>0)>(255);
      if ($427) {
       $$01$i73 = $426;
      } else {
       break;
      }
     }
     $428 = $422 & 255;
     $$0$lcssa$i75 = $428;
    } else {
     $$0$lcssa$i75 = $422;
    }
    (___fwritex($pad$i,$$0$lcssa$i75,$f)|0);
   }
   $429 = $405 ? $w$1 : $i$0$lcssa273;
   $1169 = $291;$1170 = $1181;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $429;$l10n$0 = $l10n$3;
   continue;
  }
  $1001 = $z$2;
  $1002 = $a$2;
  $1003 = (($1001) - ($1002))|0;
  $1004 = ($p$5|0)<($1003|0);
  $$p$5 = $1004 ? $1003 : $p$5;
  $1005 = (($pl$2) + ($$p$5))|0;
  $1006 = ($w$1|0)<($1005|0);
  $w$2 = $1006 ? $1005 : $w$1;
  $1007 = $fl$6 & 73728;
  $1008 = ($1007|0)==(0);
  $1009 = ($w$2|0)>($1005|0);
  $or$cond$i81 = $1008 & $1009;
  if ($or$cond$i81) {
   $1010 = (($w$2) - ($1005))|0;
   $1011 = ($1010>>>0)>(256);
   $1012 = $1011 ? 256 : $1010;
   _memset(($pad$i|0),32,($1012|0))|0;
   $1013 = ($1010>>>0)>(255);
   if ($1013) {
    $$01$i83 = $1010;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $1014 = (($$01$i83) + -256)|0;
     $1015 = ($1014>>>0)>(255);
     if ($1015) {
      $$01$i83 = $1014;
     } else {
      break;
     }
    }
    $1016 = $1010 & 255;
    $$0$lcssa$i85 = $1016;
   } else {
    $$0$lcssa$i85 = $1010;
   }
   (___fwritex($pad$i,$$0$lcssa$i85,$f)|0);
  }
  (___fwritex($prefix$2,$pl$2,$f)|0);
  $1017 = ($1007|0)==(65536);
  $or$cond$i57 = $1017 & $1009;
  if ($or$cond$i57) {
   $1018 = (($w$2) - ($1005))|0;
   $1019 = ($1018>>>0)>(256);
   $1020 = $1019 ? 256 : $1018;
   _memset(($pad$i|0),48,($1020|0))|0;
   $1021 = ($1018>>>0)>(255);
   if ($1021) {
    $$01$i59 = $1018;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $1022 = (($$01$i59) + -256)|0;
     $1023 = ($1022>>>0)>(255);
     if ($1023) {
      $$01$i59 = $1022;
     } else {
      break;
     }
    }
    $1024 = $1018 & 255;
    $$0$lcssa$i61 = $1024;
   } else {
    $$0$lcssa$i61 = $1018;
   }
   (___fwritex($pad$i,$$0$lcssa$i61,$f)|0);
  }
  $1025 = ($$p$5|0)>($1003|0);
  if ($1025) {
   $1026 = (($$p$5) - ($1003))|0;
   $1027 = ($1026>>>0)>(256);
   $1028 = $1027 ? 256 : $1026;
   _memset(($pad$i|0),48,($1028|0))|0;
   $1029 = ($1026>>>0)>(255);
   if ($1029) {
    $$01$i44 = $1026;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $1030 = (($$01$i44) + -256)|0;
     $1031 = ($1030>>>0)>(255);
     if ($1031) {
      $$01$i44 = $1030;
     } else {
      break;
     }
    }
    $1032 = $1026 & 255;
    $$0$lcssa$i46 = $1032;
   } else {
    $$0$lcssa$i46 = $1026;
   }
   (___fwritex($pad$i,$$0$lcssa$i46,$f)|0);
  }
  (___fwritex($a$2,$1003,$f)|0);
  $1033 = ($1007|0)==(8192);
  $or$cond$i = $1033 & $1009;
  if ($or$cond$i) {
   $1034 = (($w$2) - ($1005))|0;
   $1035 = ($1034>>>0)>(256);
   $1036 = $1035 ? 256 : $1034;
   _memset(($pad$i|0),32,($1036|0))|0;
   $1037 = ($1034>>>0)>(255);
   if ($1037) {
    $$01$i = $1034;
    while(1) {
     (___fwritex($pad$i,256,$f)|0);
     $1038 = (($$01$i) + -256)|0;
     $1039 = ($1038>>>0)>(255);
     if ($1039) {
      $$01$i = $1038;
     } else {
      break;
     }
    }
    $1040 = $1034 & 255;
    $$0$lcssa$i = $1040;
   } else {
    $$0$lcssa$i = $1034;
   }
   (___fwritex($pad$i,$$0$lcssa$i,$f)|0);
  }
  $1169 = $1175;$1170 = $1176;$23 = $$lcssa457;$cnt$0 = $cnt$1;$l$0 = $w$2;$l10n$0 = $l10n$3;
 }
 if ((label|0) == 344) {
  $1041 = ($f|0)==(0|0);
  if (!($1041)) {
   $$0 = $cnt$1$lcssa;
   STACKTOP = sp;return ($$0|0);
  }
  $1042 = ($l10n$0$lcssa|0)==(0);
  if ($1042) {
   $$0 = 0;
   STACKTOP = sp;return ($$0|0);
  } else {
   $i$2162 = 1;
  }
  while(1) {
   $1043 = (($nl_type) + ($i$2162<<2)|0);
   $1044 = HEAP32[$1043>>2]|0;
   $1045 = ($1044|0)==(0);
   if ($1045) {
    $i$2162$lcssa = $i$2162;
    break;
   }
   $1047 = (($nl_arg) + ($i$2162<<3)|0);
   $1048 = ($1044>>>0)>(20);
   L522: do {
    if (!($1048)) {
     do {
      switch ($1044|0) {
      case 9:  {
       $arglist_current35 = HEAP32[$ap>>2]|0;
       $1049 = $arglist_current35;
       $1050 = ((0) + 4|0);
       $expanded148 = $1050;
       $expanded147 = (($expanded148) - 1)|0;
       $1051 = (($1049) + ($expanded147))|0;
       $1052 = ((0) + 4|0);
       $expanded152 = $1052;
       $expanded151 = (($expanded152) - 1)|0;
       $expanded150 = $expanded151 ^ -1;
       $1053 = $1051 & $expanded150;
       $1054 = $1053;
       $1055 = HEAP32[$1054>>2]|0;
       $arglist_next36 = ((($1054)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next36;
       HEAP32[$1047>>2] = $1055;
       break L522;
       break;
      }
      case 10:  {
       $arglist_current38 = HEAP32[$ap>>2]|0;
       $1056 = $arglist_current38;
       $1057 = ((0) + 4|0);
       $expanded155 = $1057;
       $expanded154 = (($expanded155) - 1)|0;
       $1058 = (($1056) + ($expanded154))|0;
       $1059 = ((0) + 4|0);
       $expanded159 = $1059;
       $expanded158 = (($expanded159) - 1)|0;
       $expanded157 = $expanded158 ^ -1;
       $1060 = $1058 & $expanded157;
       $1061 = $1060;
       $1062 = HEAP32[$1061>>2]|0;
       $arglist_next39 = ((($1061)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next39;
       $1063 = ($1062|0)<(0);
       $1064 = $1063 << 31 >> 31;
       $1065 = $1047;
       $1066 = $1065;
       HEAP32[$1066>>2] = $1062;
       $1067 = (($1065) + 4)|0;
       $1068 = $1067;
       HEAP32[$1068>>2] = $1064;
       break L522;
       break;
      }
      case 11:  {
       $arglist_current41 = HEAP32[$ap>>2]|0;
       $1069 = $arglist_current41;
       $1070 = ((0) + 4|0);
       $expanded162 = $1070;
       $expanded161 = (($expanded162) - 1)|0;
       $1071 = (($1069) + ($expanded161))|0;
       $1072 = ((0) + 4|0);
       $expanded166 = $1072;
       $expanded165 = (($expanded166) - 1)|0;
       $expanded164 = $expanded165 ^ -1;
       $1073 = $1071 & $expanded164;
       $1074 = $1073;
       $1075 = HEAP32[$1074>>2]|0;
       $arglist_next42 = ((($1074)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next42;
       $1076 = $1047;
       $1077 = $1076;
       HEAP32[$1077>>2] = $1075;
       $1078 = (($1076) + 4)|0;
       $1079 = $1078;
       HEAP32[$1079>>2] = 0;
       break L522;
       break;
      }
      case 12:  {
       $arglist_current44 = HEAP32[$ap>>2]|0;
       $1080 = $arglist_current44;
       $1081 = ((0) + 8|0);
       $expanded169 = $1081;
       $expanded168 = (($expanded169) - 1)|0;
       $1082 = (($1080) + ($expanded168))|0;
       $1083 = ((0) + 8|0);
       $expanded173 = $1083;
       $expanded172 = (($expanded173) - 1)|0;
       $expanded171 = $expanded172 ^ -1;
       $1084 = $1082 & $expanded171;
       $1085 = $1084;
       $1086 = $1085;
       $1087 = $1086;
       $1088 = HEAP32[$1087>>2]|0;
       $1089 = (($1086) + 4)|0;
       $1090 = $1089;
       $1091 = HEAP32[$1090>>2]|0;
       $arglist_next45 = ((($1085)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next45;
       $1092 = $1047;
       $1093 = $1092;
       HEAP32[$1093>>2] = $1088;
       $1094 = (($1092) + 4)|0;
       $1095 = $1094;
       HEAP32[$1095>>2] = $1091;
       break L522;
       break;
      }
      case 13:  {
       $arglist_current47 = HEAP32[$ap>>2]|0;
       $1096 = $arglist_current47;
       $1097 = ((0) + 4|0);
       $expanded176 = $1097;
       $expanded175 = (($expanded176) - 1)|0;
       $1098 = (($1096) + ($expanded175))|0;
       $1099 = ((0) + 4|0);
       $expanded180 = $1099;
       $expanded179 = (($expanded180) - 1)|0;
       $expanded178 = $expanded179 ^ -1;
       $1100 = $1098 & $expanded178;
       $1101 = $1100;
       $1102 = HEAP32[$1101>>2]|0;
       $arglist_next48 = ((($1101)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next48;
       $1103 = $1102&65535;
       $1104 = $1103 << 16 >> 16;
       $1105 = ($1104|0)<(0);
       $1106 = $1105 << 31 >> 31;
       $1107 = $1047;
       $1108 = $1107;
       HEAP32[$1108>>2] = $1104;
       $1109 = (($1107) + 4)|0;
       $1110 = $1109;
       HEAP32[$1110>>2] = $1106;
       break L522;
       break;
      }
      case 14:  {
       $arglist_current50 = HEAP32[$ap>>2]|0;
       $1111 = $arglist_current50;
       $1112 = ((0) + 4|0);
       $expanded183 = $1112;
       $expanded182 = (($expanded183) - 1)|0;
       $1113 = (($1111) + ($expanded182))|0;
       $1114 = ((0) + 4|0);
       $expanded187 = $1114;
       $expanded186 = (($expanded187) - 1)|0;
       $expanded185 = $expanded186 ^ -1;
       $1115 = $1113 & $expanded185;
       $1116 = $1115;
       $1117 = HEAP32[$1116>>2]|0;
       $arglist_next51 = ((($1116)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next51;
       $$mask1$i = $1117 & 65535;
       $1118 = $1047;
       $1119 = $1118;
       HEAP32[$1119>>2] = $$mask1$i;
       $1120 = (($1118) + 4)|0;
       $1121 = $1120;
       HEAP32[$1121>>2] = 0;
       break L522;
       break;
      }
      case 15:  {
       $arglist_current53 = HEAP32[$ap>>2]|0;
       $1122 = $arglist_current53;
       $1123 = ((0) + 4|0);
       $expanded190 = $1123;
       $expanded189 = (($expanded190) - 1)|0;
       $1124 = (($1122) + ($expanded189))|0;
       $1125 = ((0) + 4|0);
       $expanded194 = $1125;
       $expanded193 = (($expanded194) - 1)|0;
       $expanded192 = $expanded193 ^ -1;
       $1126 = $1124 & $expanded192;
       $1127 = $1126;
       $1128 = HEAP32[$1127>>2]|0;
       $arglist_next54 = ((($1127)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next54;
       $1129 = $1128&255;
       $1130 = $1129 << 24 >> 24;
       $1131 = ($1130|0)<(0);
       $1132 = $1131 << 31 >> 31;
       $1133 = $1047;
       $1134 = $1133;
       HEAP32[$1134>>2] = $1130;
       $1135 = (($1133) + 4)|0;
       $1136 = $1135;
       HEAP32[$1136>>2] = $1132;
       break L522;
       break;
      }
      case 16:  {
       $arglist_current56 = HEAP32[$ap>>2]|0;
       $1137 = $arglist_current56;
       $1138 = ((0) + 4|0);
       $expanded197 = $1138;
       $expanded196 = (($expanded197) - 1)|0;
       $1139 = (($1137) + ($expanded196))|0;
       $1140 = ((0) + 4|0);
       $expanded201 = $1140;
       $expanded200 = (($expanded201) - 1)|0;
       $expanded199 = $expanded200 ^ -1;
       $1141 = $1139 & $expanded199;
       $1142 = $1141;
       $1143 = HEAP32[$1142>>2]|0;
       $arglist_next57 = ((($1142)) + 4|0);
       HEAP32[$ap>>2] = $arglist_next57;
       $$mask$i = $1143 & 255;
       $1144 = $1047;
       $1145 = $1144;
       HEAP32[$1145>>2] = $$mask$i;
       $1146 = (($1144) + 4)|0;
       $1147 = $1146;
       HEAP32[$1147>>2] = 0;
       break L522;
       break;
      }
      case 17:  {
       $arglist_current59 = HEAP32[$ap>>2]|0;
       $1148 = $arglist_current59;
       $1149 = ((0) + 8|0);
       $expanded204 = $1149;
       $expanded203 = (($expanded204) - 1)|0;
       $1150 = (($1148) + ($expanded203))|0;
       $1151 = ((0) + 8|0);
       $expanded208 = $1151;
       $expanded207 = (($expanded208) - 1)|0;
       $expanded206 = $expanded207 ^ -1;
       $1152 = $1150 & $expanded206;
       $1153 = $1152;
       $1154 = +HEAPF64[$1153>>3];
       $arglist_next60 = ((($1153)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next60;
       HEAPF64[$1047>>3] = $1154;
       break L522;
       break;
      }
      case 18:  {
       $arglist_current62 = HEAP32[$ap>>2]|0;
       $1155 = $arglist_current62;
       $1156 = ((0) + 8|0);
       $expanded211 = $1156;
       $expanded210 = (($expanded211) - 1)|0;
       $1157 = (($1155) + ($expanded210))|0;
       $1158 = ((0) + 8|0);
       $expanded215 = $1158;
       $expanded214 = (($expanded215) - 1)|0;
       $expanded213 = $expanded214 ^ -1;
       $1159 = $1157 & $expanded213;
       $1160 = $1159;
       $1161 = +HEAPF64[$1160>>3];
       $arglist_next63 = ((($1160)) + 8|0);
       HEAP32[$ap>>2] = $arglist_next63;
       HEAPF64[$1047>>3] = $1161;
       break L522;
       break;
      }
      default: {
       break L522;
      }
      }
     } while(0);
    }
   } while(0);
   $1162 = (($i$2162) + 1)|0;
   $1163 = ($1162|0)<(10);
   if ($1163) {
    $i$2162 = $1162;
   } else {
    $$0 = 1;
    label = 363;
    break;
   }
  }
  if ((label|0) == 363) {
   STACKTOP = sp;return ($$0|0);
  }
  $1046 = ($i$2162$lcssa|0)<(10);
  if ($1046) {
   $i$3160 = $i$2162$lcssa;
  } else {
   $$0 = 1;
   STACKTOP = sp;return ($$0|0);
  }
  while(1) {
   $1166 = (($nl_type) + ($i$3160<<2)|0);
   $1167 = HEAP32[$1166>>2]|0;
   $1168 = ($1167|0)==(0);
   $1164 = (($i$3160) + 1)|0;
   if (!($1168)) {
    $$0 = -1;
    label = 363;
    break;
   }
   $1165 = ($1164|0)<(10);
   if ($1165) {
    $i$3160 = $1164;
   } else {
    $$0 = 1;
    label = 363;
    break;
   }
  }
  if ((label|0) == 363) {
   STACKTOP = sp;return ($$0|0);
  }
 }
 else if ((label|0) == 363) {
  STACKTOP = sp;return ($$0|0);
 }
 return (0)|0;
}
function _sn_write($f,$s,$l) {
 $f = $f|0;
 $s = $s|0;
 $l = $l|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $l$ = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ((($f)) + 16|0);
 $1 = HEAP32[$0>>2]|0;
 $2 = ((($f)) + 20|0);
 $3 = HEAP32[$2>>2]|0;
 $4 = $1;
 $5 = $3;
 $6 = (($4) - ($5))|0;
 $7 = ($6>>>0)>($l>>>0);
 $l$ = $7 ? $l : $6;
 _memcpy(($3|0),($s|0),($l$|0))|0;
 $8 = HEAP32[$2>>2]|0;
 $9 = (($8) + ($l$)|0);
 HEAP32[$2>>2] = $9;
 return ($l|0);
}
function _malloc($bytes) {
 $bytes = $bytes|0;
 var $$3$i = 0, $$lcssa = 0, $$lcssa211 = 0, $$lcssa215 = 0, $$lcssa216 = 0, $$lcssa217 = 0, $$lcssa219 = 0, $$lcssa222 = 0, $$lcssa224 = 0, $$lcssa226 = 0, $$lcssa228 = 0, $$lcssa230 = 0, $$lcssa232 = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i22$i = 0, $$pre$i25 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i23$iZ2D = 0;
 var $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre105 = 0, $$pre106 = 0, $$pre14$i$i = 0, $$pre43$i = 0, $$pre56$i$i = 0, $$pre57$i$i = 0, $$pre8$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0, $$sum$i13$i = 0, $$sum$i14$i = 0, $$sum$i17$i = 0, $$sum$i19$i = 0;
 var $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i15$i = 0, $$sum1$i20$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum11$i = 0, $$sum11$i$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0;
 var $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum121$i = 0, $$sum122$i = 0, $$sum123$i = 0, $$sum124$i = 0, $$sum125$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0;
 var $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i16$i = 0, $$sum2$i18$i = 0, $$sum2$i21$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0, $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i27 = 0;
 var $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0, $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0;
 var $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0;
 var $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0;
 var $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0;
 var $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0;
 var $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0;
 var $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0;
 var $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0;
 var $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0;
 var $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0;
 var $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0;
 var $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0;
 var $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0;
 var $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0;
 var $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0;
 var $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0;
 var $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0;
 var $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0;
 var $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0;
 var $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0;
 var $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0;
 var $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0;
 var $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0;
 var $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0;
 var $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0;
 var $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0;
 var $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0;
 var $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0;
 var $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0;
 var $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0;
 var $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0;
 var $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0;
 var $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0;
 var $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0;
 var $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0;
 var $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0;
 var $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0;
 var $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0;
 var $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0;
 var $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0;
 var $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0;
 var $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0;
 var $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0;
 var $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0;
 var $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0;
 var $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0;
 var $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0;
 var $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0;
 var $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0;
 var $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0;
 var $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0;
 var $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0;
 var $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0;
 var $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0;
 var $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0;
 var $F5$0$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$029$i = 0, $K2$07$i$i = 0, $K8$051$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i$i$lcssa = 0, $R$0$i$lcssa = 0, $R$0$i18 = 0, $R$0$i18$lcssa = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i$i$lcssa = 0, $RP$0$i$lcssa = 0;
 var $RP$0$i17 = 0, $RP$0$i17$lcssa = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i25$i = 0, $T$028$i = 0, $T$028$i$lcssa = 0, $T$050$i$i = 0, $T$050$i$i$lcssa = 0, $T$06$i$i = 0, $T$06$i$i$lcssa = 0, $br$0$ph$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0;
 var $not$$i = 0, $not$$i$i = 0, $not$$i26$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i30 = 0, $or$cond1$i = 0, $or$cond19$i = 0, $or$cond2$i = 0, $or$cond3$i = 0, $or$cond5$i = 0, $or$cond57$i = 0, $or$cond6$i = 0, $or$cond8$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i$lcssa = 0, $rsize$0$i15 = 0, $rsize$1$i = 0;
 var $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$331$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$084$i = 0, $sp$084$i$lcssa = 0, $sp$183$i = 0, $sp$183$i$lcssa = 0, $ssize$0$$i = 0, $ssize$0$i = 0, $ssize$1$ph$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0;
 var $t$2$v$3$i = 0, $t$230$i = 0, $tbase$255$i = 0, $tsize$0$ph$i = 0, $tsize$0323944$i = 0, $tsize$1$i = 0, $tsize$254$i = 0, $v$0$i = 0, $v$0$i$lcssa = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0, $v$3$ph$i = 0, $v$332$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($bytes>>>0)<(245);
 do {
  if ($0) {
   $1 = ($bytes>>>0)<(11);
   $2 = (($bytes) + 11)|0;
   $3 = $2 & -8;
   $4 = $1 ? 16 : $3;
   $5 = $4 >>> 3;
   $6 = HEAP32[2080>>2]|0;
   $7 = $6 >>> $5;
   $8 = $7 & 3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = (($11) + ($5))|0;
    $13 = $12 << 1;
    $14 = (2120 + ($13<<2)|0);
    $$sum10 = (($13) + 2)|0;
    $15 = (2120 + ($$sum10<<2)|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = ((($16)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ($14|0)==($18|0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[2080>>2] = $22;
     } else {
      $23 = HEAP32[(2096)>>2]|0;
      $24 = ($18>>>0)<($23>>>0);
      if ($24) {
       _abort();
       // unreachable;
      }
      $25 = ((($18)) + 12|0);
      $26 = HEAP32[$25>>2]|0;
      $27 = ($26|0)==($16|0);
      if ($27) {
       HEAP32[$25>>2] = $14;
       HEAP32[$15>>2] = $18;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $28 = $12 << 3;
    $29 = $28 | 3;
    $30 = ((($16)) + 4|0);
    HEAP32[$30>>2] = $29;
    $$sum1112 = $28 | 4;
    $31 = (($16) + ($$sum1112)|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = $32 | 1;
    HEAP32[$31>>2] = $33;
    $mem$0 = $17;
    return ($mem$0|0);
   }
   $34 = HEAP32[(2088)>>2]|0;
   $35 = ($4>>>0)>($34>>>0);
   if ($35) {
    $36 = ($7|0)==(0);
    if (!($36)) {
     $37 = $7 << $5;
     $38 = 2 << $5;
     $39 = (0 - ($38))|0;
     $40 = $38 | $39;
     $41 = $37 & $40;
     $42 = (0 - ($41))|0;
     $43 = $41 & $42;
     $44 = (($43) + -1)|0;
     $45 = $44 >>> 12;
     $46 = $45 & 16;
     $47 = $44 >>> $46;
     $48 = $47 >>> 5;
     $49 = $48 & 8;
     $50 = $49 | $46;
     $51 = $47 >>> $49;
     $52 = $51 >>> 2;
     $53 = $52 & 4;
     $54 = $50 | $53;
     $55 = $51 >>> $53;
     $56 = $55 >>> 1;
     $57 = $56 & 2;
     $58 = $54 | $57;
     $59 = $55 >>> $57;
     $60 = $59 >>> 1;
     $61 = $60 & 1;
     $62 = $58 | $61;
     $63 = $59 >>> $61;
     $64 = (($62) + ($63))|0;
     $65 = $64 << 1;
     $66 = (2120 + ($65<<2)|0);
     $$sum4 = (($65) + 2)|0;
     $67 = (2120 + ($$sum4<<2)|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = ((($68)) + 8|0);
     $70 = HEAP32[$69>>2]|0;
     $71 = ($66|0)==($70|0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[2080>>2] = $74;
       $88 = $34;
      } else {
       $75 = HEAP32[(2096)>>2]|0;
       $76 = ($70>>>0)<($75>>>0);
       if ($76) {
        _abort();
        // unreachable;
       }
       $77 = ((($70)) + 12|0);
       $78 = HEAP32[$77>>2]|0;
       $79 = ($78|0)==($68|0);
       if ($79) {
        HEAP32[$77>>2] = $66;
        HEAP32[$67>>2] = $70;
        $$pre = HEAP32[(2088)>>2]|0;
        $88 = $$pre;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $80 = $64 << 3;
     $81 = (($80) - ($4))|0;
     $82 = $4 | 3;
     $83 = ((($68)) + 4|0);
     HEAP32[$83>>2] = $82;
     $84 = (($68) + ($4)|0);
     $85 = $81 | 1;
     $$sum56 = $4 | 4;
     $86 = (($68) + ($$sum56)|0);
     HEAP32[$86>>2] = $85;
     $87 = (($68) + ($80)|0);
     HEAP32[$87>>2] = $81;
     $89 = ($88|0)==(0);
     if (!($89)) {
      $90 = HEAP32[(2100)>>2]|0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = (2120 + ($92<<2)|0);
      $94 = HEAP32[2080>>2]|0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96|0)==(0);
      if ($97) {
       $98 = $94 | $95;
       HEAP32[2080>>2] = $98;
       $$pre105 = (($92) + 2)|0;
       $$pre106 = (2120 + ($$pre105<<2)|0);
       $$pre$phiZ2D = $$pre106;$F4$0 = $93;
      } else {
       $$sum9 = (($92) + 2)|0;
       $99 = (2120 + ($$sum9<<2)|0);
       $100 = HEAP32[$99>>2]|0;
       $101 = HEAP32[(2096)>>2]|0;
       $102 = ($100>>>0)<($101>>>0);
       if ($102) {
        _abort();
        // unreachable;
       } else {
        $$pre$phiZ2D = $99;$F4$0 = $100;
       }
      }
      HEAP32[$$pre$phiZ2D>>2] = $90;
      $103 = ((($F4$0)) + 12|0);
      HEAP32[$103>>2] = $90;
      $104 = ((($90)) + 8|0);
      HEAP32[$104>>2] = $F4$0;
      $105 = ((($90)) + 12|0);
      HEAP32[$105>>2] = $93;
     }
     HEAP32[(2088)>>2] = $81;
     HEAP32[(2100)>>2] = $84;
     $mem$0 = $69;
     return ($mem$0|0);
    }
    $106 = HEAP32[(2084)>>2]|0;
    $107 = ($106|0)==(0);
    if ($107) {
     $nb$0 = $4;
    } else {
     $108 = (0 - ($106))|0;
     $109 = $106 & $108;
     $110 = (($109) + -1)|0;
     $111 = $110 >>> 12;
     $112 = $111 & 16;
     $113 = $110 >>> $112;
     $114 = $113 >>> 5;
     $115 = $114 & 8;
     $116 = $115 | $112;
     $117 = $113 >>> $115;
     $118 = $117 >>> 2;
     $119 = $118 & 4;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = $121 >>> 1;
     $123 = $122 & 2;
     $124 = $120 | $123;
     $125 = $121 >>> $123;
     $126 = $125 >>> 1;
     $127 = $126 & 1;
     $128 = $124 | $127;
     $129 = $125 >>> $127;
     $130 = (($128) + ($129))|0;
     $131 = (2384 + ($130<<2)|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = ((($132)) + 4|0);
     $134 = HEAP32[$133>>2]|0;
     $135 = $134 & -8;
     $136 = (($135) - ($4))|0;
     $rsize$0$i = $136;$t$0$i = $132;$v$0$i = $132;
     while(1) {
      $137 = ((($t$0$i)) + 16|0);
      $138 = HEAP32[$137>>2]|0;
      $139 = ($138|0)==(0|0);
      if ($139) {
       $140 = ((($t$0$i)) + 20|0);
       $141 = HEAP32[$140>>2]|0;
       $142 = ($141|0)==(0|0);
       if ($142) {
        $rsize$0$i$lcssa = $rsize$0$i;$v$0$i$lcssa = $v$0$i;
        break;
       } else {
        $144 = $141;
       }
      } else {
       $144 = $138;
      }
      $143 = ((($144)) + 4|0);
      $145 = HEAP32[$143>>2]|0;
      $146 = $145 & -8;
      $147 = (($146) - ($4))|0;
      $148 = ($147>>>0)<($rsize$0$i>>>0);
      $$rsize$0$i = $148 ? $147 : $rsize$0$i;
      $$v$0$i = $148 ? $144 : $v$0$i;
      $rsize$0$i = $$rsize$0$i;$t$0$i = $144;$v$0$i = $$v$0$i;
     }
     $149 = HEAP32[(2096)>>2]|0;
     $150 = ($v$0$i$lcssa>>>0)<($149>>>0);
     if ($150) {
      _abort();
      // unreachable;
     }
     $151 = (($v$0$i$lcssa) + ($4)|0);
     $152 = ($v$0$i$lcssa>>>0)<($151>>>0);
     if (!($152)) {
      _abort();
      // unreachable;
     }
     $153 = ((($v$0$i$lcssa)) + 24|0);
     $154 = HEAP32[$153>>2]|0;
     $155 = ((($v$0$i$lcssa)) + 12|0);
     $156 = HEAP32[$155>>2]|0;
     $157 = ($156|0)==($v$0$i$lcssa|0);
     do {
      if ($157) {
       $167 = ((($v$0$i$lcssa)) + 20|0);
       $168 = HEAP32[$167>>2]|0;
       $169 = ($168|0)==(0|0);
       if ($169) {
        $170 = ((($v$0$i$lcssa)) + 16|0);
        $171 = HEAP32[$170>>2]|0;
        $172 = ($171|0)==(0|0);
        if ($172) {
         $R$1$i = 0;
         break;
        } else {
         $R$0$i = $171;$RP$0$i = $170;
        }
       } else {
        $R$0$i = $168;$RP$0$i = $167;
       }
       while(1) {
        $173 = ((($R$0$i)) + 20|0);
        $174 = HEAP32[$173>>2]|0;
        $175 = ($174|0)==(0|0);
        if (!($175)) {
         $R$0$i = $174;$RP$0$i = $173;
         continue;
        }
        $176 = ((($R$0$i)) + 16|0);
        $177 = HEAP32[$176>>2]|0;
        $178 = ($177|0)==(0|0);
        if ($178) {
         $R$0$i$lcssa = $R$0$i;$RP$0$i$lcssa = $RP$0$i;
         break;
        } else {
         $R$0$i = $177;$RP$0$i = $176;
        }
       }
       $179 = ($RP$0$i$lcssa>>>0)<($149>>>0);
       if ($179) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$RP$0$i$lcssa>>2] = 0;
        $R$1$i = $R$0$i$lcssa;
        break;
       }
      } else {
       $158 = ((($v$0$i$lcssa)) + 8|0);
       $159 = HEAP32[$158>>2]|0;
       $160 = ($159>>>0)<($149>>>0);
       if ($160) {
        _abort();
        // unreachable;
       }
       $161 = ((($159)) + 12|0);
       $162 = HEAP32[$161>>2]|0;
       $163 = ($162|0)==($v$0$i$lcssa|0);
       if (!($163)) {
        _abort();
        // unreachable;
       }
       $164 = ((($156)) + 8|0);
       $165 = HEAP32[$164>>2]|0;
       $166 = ($165|0)==($v$0$i$lcssa|0);
       if ($166) {
        HEAP32[$161>>2] = $156;
        HEAP32[$164>>2] = $159;
        $R$1$i = $156;
        break;
       } else {
        _abort();
        // unreachable;
       }
      }
     } while(0);
     $180 = ($154|0)==(0|0);
     do {
      if (!($180)) {
       $181 = ((($v$0$i$lcssa)) + 28|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = (2384 + ($182<<2)|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($v$0$i$lcssa|0)==($184|0);
       if ($185) {
        HEAP32[$183>>2] = $R$1$i;
        $cond$i = ($R$1$i|0)==(0|0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[(2084)>>2]|0;
         $189 = $188 & $187;
         HEAP32[(2084)>>2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[(2096)>>2]|0;
        $191 = ($154>>>0)<($190>>>0);
        if ($191) {
         _abort();
         // unreachable;
        }
        $192 = ((($154)) + 16|0);
        $193 = HEAP32[$192>>2]|0;
        $194 = ($193|0)==($v$0$i$lcssa|0);
        if ($194) {
         HEAP32[$192>>2] = $R$1$i;
        } else {
         $195 = ((($154)) + 20|0);
         HEAP32[$195>>2] = $R$1$i;
        }
        $196 = ($R$1$i|0)==(0|0);
        if ($196) {
         break;
        }
       }
       $197 = HEAP32[(2096)>>2]|0;
       $198 = ($R$1$i>>>0)<($197>>>0);
       if ($198) {
        _abort();
        // unreachable;
       }
       $199 = ((($R$1$i)) + 24|0);
       HEAP32[$199>>2] = $154;
       $200 = ((($v$0$i$lcssa)) + 16|0);
       $201 = HEAP32[$200>>2]|0;
       $202 = ($201|0)==(0|0);
       do {
        if (!($202)) {
         $203 = ($201>>>0)<($197>>>0);
         if ($203) {
          _abort();
          // unreachable;
         } else {
          $204 = ((($R$1$i)) + 16|0);
          HEAP32[$204>>2] = $201;
          $205 = ((($201)) + 24|0);
          HEAP32[$205>>2] = $R$1$i;
          break;
         }
        }
       } while(0);
       $206 = ((($v$0$i$lcssa)) + 20|0);
       $207 = HEAP32[$206>>2]|0;
       $208 = ($207|0)==(0|0);
       if (!($208)) {
        $209 = HEAP32[(2096)>>2]|0;
        $210 = ($207>>>0)<($209>>>0);
        if ($210) {
         _abort();
         // unreachable;
        } else {
         $211 = ((($R$1$i)) + 20|0);
         HEAP32[$211>>2] = $207;
         $212 = ((($207)) + 24|0);
         HEAP32[$212>>2] = $R$1$i;
         break;
        }
       }
      }
     } while(0);
     $213 = ($rsize$0$i$lcssa>>>0)<(16);
     if ($213) {
      $214 = (($rsize$0$i$lcssa) + ($4))|0;
      $215 = $214 | 3;
      $216 = ((($v$0$i$lcssa)) + 4|0);
      HEAP32[$216>>2] = $215;
      $$sum4$i = (($214) + 4)|0;
      $217 = (($v$0$i$lcssa) + ($$sum4$i)|0);
      $218 = HEAP32[$217>>2]|0;
      $219 = $218 | 1;
      HEAP32[$217>>2] = $219;
     } else {
      $220 = $4 | 3;
      $221 = ((($v$0$i$lcssa)) + 4|0);
      HEAP32[$221>>2] = $220;
      $222 = $rsize$0$i$lcssa | 1;
      $$sum$i35 = $4 | 4;
      $223 = (($v$0$i$lcssa) + ($$sum$i35)|0);
      HEAP32[$223>>2] = $222;
      $$sum1$i = (($rsize$0$i$lcssa) + ($4))|0;
      $224 = (($v$0$i$lcssa) + ($$sum1$i)|0);
      HEAP32[$224>>2] = $rsize$0$i$lcssa;
      $225 = HEAP32[(2088)>>2]|0;
      $226 = ($225|0)==(0);
      if (!($226)) {
       $227 = HEAP32[(2100)>>2]|0;
       $228 = $225 >>> 3;
       $229 = $228 << 1;
       $230 = (2120 + ($229<<2)|0);
       $231 = HEAP32[2080>>2]|0;
       $232 = 1 << $228;
       $233 = $231 & $232;
       $234 = ($233|0)==(0);
       if ($234) {
        $235 = $231 | $232;
        HEAP32[2080>>2] = $235;
        $$pre$i = (($229) + 2)|0;
        $$pre8$i = (2120 + ($$pre$i<<2)|0);
        $$pre$phi$iZ2D = $$pre8$i;$F1$0$i = $230;
       } else {
        $$sum3$i = (($229) + 2)|0;
        $236 = (2120 + ($$sum3$i<<2)|0);
        $237 = HEAP32[$236>>2]|0;
        $238 = HEAP32[(2096)>>2]|0;
        $239 = ($237>>>0)<($238>>>0);
        if ($239) {
         _abort();
         // unreachable;
        } else {
         $$pre$phi$iZ2D = $236;$F1$0$i = $237;
        }
       }
       HEAP32[$$pre$phi$iZ2D>>2] = $227;
       $240 = ((($F1$0$i)) + 12|0);
       HEAP32[$240>>2] = $227;
       $241 = ((($227)) + 8|0);
       HEAP32[$241>>2] = $F1$0$i;
       $242 = ((($227)) + 12|0);
       HEAP32[$242>>2] = $230;
      }
      HEAP32[(2088)>>2] = $rsize$0$i$lcssa;
      HEAP32[(2100)>>2] = $151;
     }
     $243 = ((($v$0$i$lcssa)) + 8|0);
     $mem$0 = $243;
     return ($mem$0|0);
    }
   } else {
    $nb$0 = $4;
   }
  } else {
   $244 = ($bytes>>>0)>(4294967231);
   if ($244) {
    $nb$0 = -1;
   } else {
    $245 = (($bytes) + 11)|0;
    $246 = $245 & -8;
    $247 = HEAP32[(2084)>>2]|0;
    $248 = ($247|0)==(0);
    if ($248) {
     $nb$0 = $246;
    } else {
     $249 = (0 - ($246))|0;
     $250 = $245 >>> 8;
     $251 = ($250|0)==(0);
     if ($251) {
      $idx$0$i = 0;
     } else {
      $252 = ($246>>>0)>(16777215);
      if ($252) {
       $idx$0$i = 31;
      } else {
       $253 = (($250) + 1048320)|0;
       $254 = $253 >>> 16;
       $255 = $254 & 8;
       $256 = $250 << $255;
       $257 = (($256) + 520192)|0;
       $258 = $257 >>> 16;
       $259 = $258 & 4;
       $260 = $259 | $255;
       $261 = $256 << $259;
       $262 = (($261) + 245760)|0;
       $263 = $262 >>> 16;
       $264 = $263 & 2;
       $265 = $260 | $264;
       $266 = (14 - ($265))|0;
       $267 = $261 << $264;
       $268 = $267 >>> 15;
       $269 = (($266) + ($268))|0;
       $270 = $269 << 1;
       $271 = (($269) + 7)|0;
       $272 = $246 >>> $271;
       $273 = $272 & 1;
       $274 = $273 | $270;
       $idx$0$i = $274;
      }
     }
     $275 = (2384 + ($idx$0$i<<2)|0);
     $276 = HEAP32[$275>>2]|0;
     $277 = ($276|0)==(0|0);
     L123: do {
      if ($277) {
       $rsize$2$i = $249;$t$1$i = 0;$v$2$i = 0;
       label = 86;
      } else {
       $278 = ($idx$0$i|0)==(31);
       $279 = $idx$0$i >>> 1;
       $280 = (25 - ($279))|0;
       $281 = $278 ? 0 : $280;
       $282 = $246 << $281;
       $rsize$0$i15 = $249;$rst$0$i = 0;$sizebits$0$i = $282;$t$0$i14 = $276;$v$0$i16 = 0;
       while(1) {
        $283 = ((($t$0$i14)) + 4|0);
        $284 = HEAP32[$283>>2]|0;
        $285 = $284 & -8;
        $286 = (($285) - ($246))|0;
        $287 = ($286>>>0)<($rsize$0$i15>>>0);
        if ($287) {
         $288 = ($285|0)==($246|0);
         if ($288) {
          $rsize$331$i = $286;$t$230$i = $t$0$i14;$v$332$i = $t$0$i14;
          label = 90;
          break L123;
         } else {
          $rsize$1$i = $286;$v$1$i = $t$0$i14;
         }
        } else {
         $rsize$1$i = $rsize$0$i15;$v$1$i = $v$0$i16;
        }
        $289 = ((($t$0$i14)) + 20|0);
        $290 = HEAP32[$289>>2]|0;
        $291 = $sizebits$0$i >>> 31;
        $292 = (((($t$0$i14)) + 16|0) + ($291<<2)|0);
        $293 = HEAP32[$292>>2]|0;
        $294 = ($290|0)==(0|0);
        $295 = ($290|0)==($293|0);
        $or$cond19$i = $294 | $295;
        $rst$1$i = $or$cond19$i ? $rst$0$i : $290;
        $296 = ($293|0)==(0|0);
        $297 = $sizebits$0$i << 1;
        if ($296) {
         $rsize$2$i = $rsize$1$i;$t$1$i = $rst$1$i;$v$2$i = $v$1$i;
         label = 86;
         break;
        } else {
         $rsize$0$i15 = $rsize$1$i;$rst$0$i = $rst$1$i;$sizebits$0$i = $297;$t$0$i14 = $293;$v$0$i16 = $v$1$i;
        }
       }
      }
     } while(0);
     if ((label|0) == 86) {
      $298 = ($t$1$i|0)==(0|0);
      $299 = ($v$2$i|0)==(0|0);
      $or$cond$i = $298 & $299;
      if ($or$cond$i) {
       $300 = 2 << $idx$0$i;
       $301 = (0 - ($300))|0;
       $302 = $300 | $301;
       $303 = $247 & $302;
       $304 = ($303|0)==(0);
       if ($304) {
        $nb$0 = $246;
        break;
       }
       $305 = (0 - ($303))|0;
       $306 = $303 & $305;
       $307 = (($306) + -1)|0;
       $308 = $307 >>> 12;
       $309 = $308 & 16;
       $310 = $307 >>> $309;
       $311 = $310 >>> 5;
       $312 = $311 & 8;
       $313 = $312 | $309;
       $314 = $310 >>> $312;
       $315 = $314 >>> 2;
       $316 = $315 & 4;
       $317 = $313 | $316;
       $318 = $314 >>> $316;
       $319 = $318 >>> 1;
       $320 = $319 & 2;
       $321 = $317 | $320;
       $322 = $318 >>> $320;
       $323 = $322 >>> 1;
       $324 = $323 & 1;
       $325 = $321 | $324;
       $326 = $322 >>> $324;
       $327 = (($325) + ($326))|0;
       $328 = (2384 + ($327<<2)|0);
       $329 = HEAP32[$328>>2]|0;
       $t$2$ph$i = $329;$v$3$ph$i = 0;
      } else {
       $t$2$ph$i = $t$1$i;$v$3$ph$i = $v$2$i;
      }
      $330 = ($t$2$ph$i|0)==(0|0);
      if ($330) {
       $rsize$3$lcssa$i = $rsize$2$i;$v$3$lcssa$i = $v$3$ph$i;
      } else {
       $rsize$331$i = $rsize$2$i;$t$230$i = $t$2$ph$i;$v$332$i = $v$3$ph$i;
       label = 90;
      }
     }
     if ((label|0) == 90) {
      while(1) {
       label = 0;
       $331 = ((($t$230$i)) + 4|0);
       $332 = HEAP32[$331>>2]|0;
       $333 = $332 & -8;
       $334 = (($333) - ($246))|0;
       $335 = ($334>>>0)<($rsize$331$i>>>0);
       $$rsize$3$i = $335 ? $334 : $rsize$331$i;
       $t$2$v$3$i = $335 ? $t$230$i : $v$332$i;
       $336 = ((($t$230$i)) + 16|0);
       $337 = HEAP32[$336>>2]|0;
       $338 = ($337|0)==(0|0);
       if (!($338)) {
        $rsize$331$i = $$rsize$3$i;$t$230$i = $337;$v$332$i = $t$2$v$3$i;
        label = 90;
        continue;
       }
       $339 = ((($t$230$i)) + 20|0);
       $340 = HEAP32[$339>>2]|0;
       $341 = ($340|0)==(0|0);
       if ($341) {
        $rsize$3$lcssa$i = $$rsize$3$i;$v$3$lcssa$i = $t$2$v$3$i;
        break;
       } else {
        $rsize$331$i = $$rsize$3$i;$t$230$i = $340;$v$332$i = $t$2$v$3$i;
        label = 90;
       }
      }
     }
     $342 = ($v$3$lcssa$i|0)==(0|0);
     if ($342) {
      $nb$0 = $246;
     } else {
      $343 = HEAP32[(2088)>>2]|0;
      $344 = (($343) - ($246))|0;
      $345 = ($rsize$3$lcssa$i>>>0)<($344>>>0);
      if ($345) {
       $346 = HEAP32[(2096)>>2]|0;
       $347 = ($v$3$lcssa$i>>>0)<($346>>>0);
       if ($347) {
        _abort();
        // unreachable;
       }
       $348 = (($v$3$lcssa$i) + ($246)|0);
       $349 = ($v$3$lcssa$i>>>0)<($348>>>0);
       if (!($349)) {
        _abort();
        // unreachable;
       }
       $350 = ((($v$3$lcssa$i)) + 24|0);
       $351 = HEAP32[$350>>2]|0;
       $352 = ((($v$3$lcssa$i)) + 12|0);
       $353 = HEAP32[$352>>2]|0;
       $354 = ($353|0)==($v$3$lcssa$i|0);
       do {
        if ($354) {
         $364 = ((($v$3$lcssa$i)) + 20|0);
         $365 = HEAP32[$364>>2]|0;
         $366 = ($365|0)==(0|0);
         if ($366) {
          $367 = ((($v$3$lcssa$i)) + 16|0);
          $368 = HEAP32[$367>>2]|0;
          $369 = ($368|0)==(0|0);
          if ($369) {
           $R$1$i20 = 0;
           break;
          } else {
           $R$0$i18 = $368;$RP$0$i17 = $367;
          }
         } else {
          $R$0$i18 = $365;$RP$0$i17 = $364;
         }
         while(1) {
          $370 = ((($R$0$i18)) + 20|0);
          $371 = HEAP32[$370>>2]|0;
          $372 = ($371|0)==(0|0);
          if (!($372)) {
           $R$0$i18 = $371;$RP$0$i17 = $370;
           continue;
          }
          $373 = ((($R$0$i18)) + 16|0);
          $374 = HEAP32[$373>>2]|0;
          $375 = ($374|0)==(0|0);
          if ($375) {
           $R$0$i18$lcssa = $R$0$i18;$RP$0$i17$lcssa = $RP$0$i17;
           break;
          } else {
           $R$0$i18 = $374;$RP$0$i17 = $373;
          }
         }
         $376 = ($RP$0$i17$lcssa>>>0)<($346>>>0);
         if ($376) {
          _abort();
          // unreachable;
         } else {
          HEAP32[$RP$0$i17$lcssa>>2] = 0;
          $R$1$i20 = $R$0$i18$lcssa;
          break;
         }
        } else {
         $355 = ((($v$3$lcssa$i)) + 8|0);
         $356 = HEAP32[$355>>2]|0;
         $357 = ($356>>>0)<($346>>>0);
         if ($357) {
          _abort();
          // unreachable;
         }
         $358 = ((($356)) + 12|0);
         $359 = HEAP32[$358>>2]|0;
         $360 = ($359|0)==($v$3$lcssa$i|0);
         if (!($360)) {
          _abort();
          // unreachable;
         }
         $361 = ((($353)) + 8|0);
         $362 = HEAP32[$361>>2]|0;
         $363 = ($362|0)==($v$3$lcssa$i|0);
         if ($363) {
          HEAP32[$358>>2] = $353;
          HEAP32[$361>>2] = $356;
          $R$1$i20 = $353;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $377 = ($351|0)==(0|0);
       do {
        if (!($377)) {
         $378 = ((($v$3$lcssa$i)) + 28|0);
         $379 = HEAP32[$378>>2]|0;
         $380 = (2384 + ($379<<2)|0);
         $381 = HEAP32[$380>>2]|0;
         $382 = ($v$3$lcssa$i|0)==($381|0);
         if ($382) {
          HEAP32[$380>>2] = $R$1$i20;
          $cond$i21 = ($R$1$i20|0)==(0|0);
          if ($cond$i21) {
           $383 = 1 << $379;
           $384 = $383 ^ -1;
           $385 = HEAP32[(2084)>>2]|0;
           $386 = $385 & $384;
           HEAP32[(2084)>>2] = $386;
           break;
          }
         } else {
          $387 = HEAP32[(2096)>>2]|0;
          $388 = ($351>>>0)<($387>>>0);
          if ($388) {
           _abort();
           // unreachable;
          }
          $389 = ((($351)) + 16|0);
          $390 = HEAP32[$389>>2]|0;
          $391 = ($390|0)==($v$3$lcssa$i|0);
          if ($391) {
           HEAP32[$389>>2] = $R$1$i20;
          } else {
           $392 = ((($351)) + 20|0);
           HEAP32[$392>>2] = $R$1$i20;
          }
          $393 = ($R$1$i20|0)==(0|0);
          if ($393) {
           break;
          }
         }
         $394 = HEAP32[(2096)>>2]|0;
         $395 = ($R$1$i20>>>0)<($394>>>0);
         if ($395) {
          _abort();
          // unreachable;
         }
         $396 = ((($R$1$i20)) + 24|0);
         HEAP32[$396>>2] = $351;
         $397 = ((($v$3$lcssa$i)) + 16|0);
         $398 = HEAP32[$397>>2]|0;
         $399 = ($398|0)==(0|0);
         do {
          if (!($399)) {
           $400 = ($398>>>0)<($394>>>0);
           if ($400) {
            _abort();
            // unreachable;
           } else {
            $401 = ((($R$1$i20)) + 16|0);
            HEAP32[$401>>2] = $398;
            $402 = ((($398)) + 24|0);
            HEAP32[$402>>2] = $R$1$i20;
            break;
           }
          }
         } while(0);
         $403 = ((($v$3$lcssa$i)) + 20|0);
         $404 = HEAP32[$403>>2]|0;
         $405 = ($404|0)==(0|0);
         if (!($405)) {
          $406 = HEAP32[(2096)>>2]|0;
          $407 = ($404>>>0)<($406>>>0);
          if ($407) {
           _abort();
           // unreachable;
          } else {
           $408 = ((($R$1$i20)) + 20|0);
           HEAP32[$408>>2] = $404;
           $409 = ((($404)) + 24|0);
           HEAP32[$409>>2] = $R$1$i20;
           break;
          }
         }
        }
       } while(0);
       $410 = ($rsize$3$lcssa$i>>>0)<(16);
       L199: do {
        if ($410) {
         $411 = (($rsize$3$lcssa$i) + ($246))|0;
         $412 = $411 | 3;
         $413 = ((($v$3$lcssa$i)) + 4|0);
         HEAP32[$413>>2] = $412;
         $$sum18$i = (($411) + 4)|0;
         $414 = (($v$3$lcssa$i) + ($$sum18$i)|0);
         $415 = HEAP32[$414>>2]|0;
         $416 = $415 | 1;
         HEAP32[$414>>2] = $416;
        } else {
         $417 = $246 | 3;
         $418 = ((($v$3$lcssa$i)) + 4|0);
         HEAP32[$418>>2] = $417;
         $419 = $rsize$3$lcssa$i | 1;
         $$sum$i2334 = $246 | 4;
         $420 = (($v$3$lcssa$i) + ($$sum$i2334)|0);
         HEAP32[$420>>2] = $419;
         $$sum1$i24 = (($rsize$3$lcssa$i) + ($246))|0;
         $421 = (($v$3$lcssa$i) + ($$sum1$i24)|0);
         HEAP32[$421>>2] = $rsize$3$lcssa$i;
         $422 = $rsize$3$lcssa$i >>> 3;
         $423 = ($rsize$3$lcssa$i>>>0)<(256);
         if ($423) {
          $424 = $422 << 1;
          $425 = (2120 + ($424<<2)|0);
          $426 = HEAP32[2080>>2]|0;
          $427 = 1 << $422;
          $428 = $426 & $427;
          $429 = ($428|0)==(0);
          if ($429) {
           $430 = $426 | $427;
           HEAP32[2080>>2] = $430;
           $$pre$i25 = (($424) + 2)|0;
           $$pre43$i = (2120 + ($$pre$i25<<2)|0);
           $$pre$phi$i26Z2D = $$pre43$i;$F5$0$i = $425;
          } else {
           $$sum17$i = (($424) + 2)|0;
           $431 = (2120 + ($$sum17$i<<2)|0);
           $432 = HEAP32[$431>>2]|0;
           $433 = HEAP32[(2096)>>2]|0;
           $434 = ($432>>>0)<($433>>>0);
           if ($434) {
            _abort();
            // unreachable;
           } else {
            $$pre$phi$i26Z2D = $431;$F5$0$i = $432;
           }
          }
          HEAP32[$$pre$phi$i26Z2D>>2] = $348;
          $435 = ((($F5$0$i)) + 12|0);
          HEAP32[$435>>2] = $348;
          $$sum15$i = (($246) + 8)|0;
          $436 = (($v$3$lcssa$i) + ($$sum15$i)|0);
          HEAP32[$436>>2] = $F5$0$i;
          $$sum16$i = (($246) + 12)|0;
          $437 = (($v$3$lcssa$i) + ($$sum16$i)|0);
          HEAP32[$437>>2] = $425;
          break;
         }
         $438 = $rsize$3$lcssa$i >>> 8;
         $439 = ($438|0)==(0);
         if ($439) {
          $I7$0$i = 0;
         } else {
          $440 = ($rsize$3$lcssa$i>>>0)>(16777215);
          if ($440) {
           $I7$0$i = 31;
          } else {
           $441 = (($438) + 1048320)|0;
           $442 = $441 >>> 16;
           $443 = $442 & 8;
           $444 = $438 << $443;
           $445 = (($444) + 520192)|0;
           $446 = $445 >>> 16;
           $447 = $446 & 4;
           $448 = $447 | $443;
           $449 = $444 << $447;
           $450 = (($449) + 245760)|0;
           $451 = $450 >>> 16;
           $452 = $451 & 2;
           $453 = $448 | $452;
           $454 = (14 - ($453))|0;
           $455 = $449 << $452;
           $456 = $455 >>> 15;
           $457 = (($454) + ($456))|0;
           $458 = $457 << 1;
           $459 = (($457) + 7)|0;
           $460 = $rsize$3$lcssa$i >>> $459;
           $461 = $460 & 1;
           $462 = $461 | $458;
           $I7$0$i = $462;
          }
         }
         $463 = (2384 + ($I7$0$i<<2)|0);
         $$sum2$i = (($246) + 28)|0;
         $464 = (($v$3$lcssa$i) + ($$sum2$i)|0);
         HEAP32[$464>>2] = $I7$0$i;
         $$sum3$i27 = (($246) + 16)|0;
         $465 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
         $$sum4$i28 = (($246) + 20)|0;
         $466 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
         HEAP32[$466>>2] = 0;
         HEAP32[$465>>2] = 0;
         $467 = HEAP32[(2084)>>2]|0;
         $468 = 1 << $I7$0$i;
         $469 = $467 & $468;
         $470 = ($469|0)==(0);
         if ($470) {
          $471 = $467 | $468;
          HEAP32[(2084)>>2] = $471;
          HEAP32[$463>>2] = $348;
          $$sum5$i = (($246) + 24)|0;
          $472 = (($v$3$lcssa$i) + ($$sum5$i)|0);
          HEAP32[$472>>2] = $463;
          $$sum6$i = (($246) + 12)|0;
          $473 = (($v$3$lcssa$i) + ($$sum6$i)|0);
          HEAP32[$473>>2] = $348;
          $$sum7$i = (($246) + 8)|0;
          $474 = (($v$3$lcssa$i) + ($$sum7$i)|0);
          HEAP32[$474>>2] = $348;
          break;
         }
         $475 = HEAP32[$463>>2]|0;
         $476 = ((($475)) + 4|0);
         $477 = HEAP32[$476>>2]|0;
         $478 = $477 & -8;
         $479 = ($478|0)==($rsize$3$lcssa$i|0);
         L217: do {
          if ($479) {
           $T$0$lcssa$i = $475;
          } else {
           $480 = ($I7$0$i|0)==(31);
           $481 = $I7$0$i >>> 1;
           $482 = (25 - ($481))|0;
           $483 = $480 ? 0 : $482;
           $484 = $rsize$3$lcssa$i << $483;
           $K12$029$i = $484;$T$028$i = $475;
           while(1) {
            $491 = $K12$029$i >>> 31;
            $492 = (((($T$028$i)) + 16|0) + ($491<<2)|0);
            $487 = HEAP32[$492>>2]|0;
            $493 = ($487|0)==(0|0);
            if ($493) {
             $$lcssa232 = $492;$T$028$i$lcssa = $T$028$i;
             break;
            }
            $485 = $K12$029$i << 1;
            $486 = ((($487)) + 4|0);
            $488 = HEAP32[$486>>2]|0;
            $489 = $488 & -8;
            $490 = ($489|0)==($rsize$3$lcssa$i|0);
            if ($490) {
             $T$0$lcssa$i = $487;
             break L217;
            } else {
             $K12$029$i = $485;$T$028$i = $487;
            }
           }
           $494 = HEAP32[(2096)>>2]|0;
           $495 = ($$lcssa232>>>0)<($494>>>0);
           if ($495) {
            _abort();
            // unreachable;
           } else {
            HEAP32[$$lcssa232>>2] = $348;
            $$sum11$i = (($246) + 24)|0;
            $496 = (($v$3$lcssa$i) + ($$sum11$i)|0);
            HEAP32[$496>>2] = $T$028$i$lcssa;
            $$sum12$i = (($246) + 12)|0;
            $497 = (($v$3$lcssa$i) + ($$sum12$i)|0);
            HEAP32[$497>>2] = $348;
            $$sum13$i = (($246) + 8)|0;
            $498 = (($v$3$lcssa$i) + ($$sum13$i)|0);
            HEAP32[$498>>2] = $348;
            break L199;
           }
          }
         } while(0);
         $499 = ((($T$0$lcssa$i)) + 8|0);
         $500 = HEAP32[$499>>2]|0;
         $501 = HEAP32[(2096)>>2]|0;
         $502 = ($500>>>0)>=($501>>>0);
         $not$$i = ($T$0$lcssa$i>>>0)>=($501>>>0);
         $503 = $502 & $not$$i;
         if ($503) {
          $504 = ((($500)) + 12|0);
          HEAP32[$504>>2] = $348;
          HEAP32[$499>>2] = $348;
          $$sum8$i = (($246) + 8)|0;
          $505 = (($v$3$lcssa$i) + ($$sum8$i)|0);
          HEAP32[$505>>2] = $500;
          $$sum9$i = (($246) + 12)|0;
          $506 = (($v$3$lcssa$i) + ($$sum9$i)|0);
          HEAP32[$506>>2] = $T$0$lcssa$i;
          $$sum10$i = (($246) + 24)|0;
          $507 = (($v$3$lcssa$i) + ($$sum10$i)|0);
          HEAP32[$507>>2] = 0;
          break;
         } else {
          _abort();
          // unreachable;
         }
        }
       } while(0);
       $508 = ((($v$3$lcssa$i)) + 8|0);
       $mem$0 = $508;
       return ($mem$0|0);
      } else {
       $nb$0 = $246;
      }
     }
    }
   }
  }
 } while(0);
 $509 = HEAP32[(2088)>>2]|0;
 $510 = ($509>>>0)<($nb$0>>>0);
 if (!($510)) {
  $511 = (($509) - ($nb$0))|0;
  $512 = HEAP32[(2100)>>2]|0;
  $513 = ($511>>>0)>(15);
  if ($513) {
   $514 = (($512) + ($nb$0)|0);
   HEAP32[(2100)>>2] = $514;
   HEAP32[(2088)>>2] = $511;
   $515 = $511 | 1;
   $$sum2 = (($nb$0) + 4)|0;
   $516 = (($512) + ($$sum2)|0);
   HEAP32[$516>>2] = $515;
   $517 = (($512) + ($509)|0);
   HEAP32[$517>>2] = $511;
   $518 = $nb$0 | 3;
   $519 = ((($512)) + 4|0);
   HEAP32[$519>>2] = $518;
  } else {
   HEAP32[(2088)>>2] = 0;
   HEAP32[(2100)>>2] = 0;
   $520 = $509 | 3;
   $521 = ((($512)) + 4|0);
   HEAP32[$521>>2] = $520;
   $$sum1 = (($509) + 4)|0;
   $522 = (($512) + ($$sum1)|0);
   $523 = HEAP32[$522>>2]|0;
   $524 = $523 | 1;
   HEAP32[$522>>2] = $524;
  }
  $525 = ((($512)) + 8|0);
  $mem$0 = $525;
  return ($mem$0|0);
 }
 $526 = HEAP32[(2092)>>2]|0;
 $527 = ($526>>>0)>($nb$0>>>0);
 if ($527) {
  $528 = (($526) - ($nb$0))|0;
  HEAP32[(2092)>>2] = $528;
  $529 = HEAP32[(2104)>>2]|0;
  $530 = (($529) + ($nb$0)|0);
  HEAP32[(2104)>>2] = $530;
  $531 = $528 | 1;
  $$sum = (($nb$0) + 4)|0;
  $532 = (($529) + ($$sum)|0);
  HEAP32[$532>>2] = $531;
  $533 = $nb$0 | 3;
  $534 = ((($529)) + 4|0);
  HEAP32[$534>>2] = $533;
  $535 = ((($529)) + 8|0);
  $mem$0 = $535;
  return ($mem$0|0);
 }
 $536 = HEAP32[2552>>2]|0;
 $537 = ($536|0)==(0);
 do {
  if ($537) {
   $538 = (_sysconf(30)|0);
   $539 = (($538) + -1)|0;
   $540 = $539 & $538;
   $541 = ($540|0)==(0);
   if ($541) {
    HEAP32[(2560)>>2] = $538;
    HEAP32[(2556)>>2] = $538;
    HEAP32[(2564)>>2] = -1;
    HEAP32[(2568)>>2] = -1;
    HEAP32[(2572)>>2] = 0;
    HEAP32[(2524)>>2] = 0;
    $542 = (_time((0|0))|0);
    $543 = $542 & -16;
    $544 = $543 ^ 1431655768;
    HEAP32[2552>>2] = $544;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $545 = (($nb$0) + 48)|0;
 $546 = HEAP32[(2560)>>2]|0;
 $547 = (($nb$0) + 47)|0;
 $548 = (($546) + ($547))|0;
 $549 = (0 - ($546))|0;
 $550 = $548 & $549;
 $551 = ($550>>>0)>($nb$0>>>0);
 if (!($551)) {
  $mem$0 = 0;
  return ($mem$0|0);
 }
 $552 = HEAP32[(2520)>>2]|0;
 $553 = ($552|0)==(0);
 if (!($553)) {
  $554 = HEAP32[(2512)>>2]|0;
  $555 = (($554) + ($550))|0;
  $556 = ($555>>>0)<=($554>>>0);
  $557 = ($555>>>0)>($552>>>0);
  $or$cond1$i = $556 | $557;
  if ($or$cond1$i) {
   $mem$0 = 0;
   return ($mem$0|0);
  }
 }
 $558 = HEAP32[(2524)>>2]|0;
 $559 = $558 & 4;
 $560 = ($559|0)==(0);
 L258: do {
  if ($560) {
   $561 = HEAP32[(2104)>>2]|0;
   $562 = ($561|0)==(0|0);
   L260: do {
    if ($562) {
     label = 174;
    } else {
     $sp$0$i$i = (2528);
     while(1) {
      $563 = HEAP32[$sp$0$i$i>>2]|0;
      $564 = ($563>>>0)>($561>>>0);
      if (!($564)) {
       $565 = ((($sp$0$i$i)) + 4|0);
       $566 = HEAP32[$565>>2]|0;
       $567 = (($563) + ($566)|0);
       $568 = ($567>>>0)>($561>>>0);
       if ($568) {
        $$lcssa228 = $sp$0$i$i;$$lcssa230 = $565;
        break;
       }
      }
      $569 = ((($sp$0$i$i)) + 8|0);
      $570 = HEAP32[$569>>2]|0;
      $571 = ($570|0)==(0|0);
      if ($571) {
       label = 174;
       break L260;
      } else {
       $sp$0$i$i = $570;
      }
     }
     $594 = HEAP32[(2092)>>2]|0;
     $595 = (($548) - ($594))|0;
     $596 = $595 & $549;
     $597 = ($596>>>0)<(2147483647);
     if ($597) {
      $598 = (_sbrk(($596|0))|0);
      $599 = HEAP32[$$lcssa228>>2]|0;
      $600 = HEAP32[$$lcssa230>>2]|0;
      $601 = (($599) + ($600)|0);
      $602 = ($598|0)==($601|0);
      $$3$i = $602 ? $596 : 0;
      if ($602) {
       $603 = ($598|0)==((-1)|0);
       if ($603) {
        $tsize$0323944$i = $$3$i;
       } else {
        $tbase$255$i = $598;$tsize$254$i = $$3$i;
        label = 194;
        break L258;
       }
      } else {
       $br$0$ph$i = $598;$ssize$1$ph$i = $596;$tsize$0$ph$i = $$3$i;
       label = 184;
      }
     } else {
      $tsize$0323944$i = 0;
     }
    }
   } while(0);
   do {
    if ((label|0) == 174) {
     $572 = (_sbrk(0)|0);
     $573 = ($572|0)==((-1)|0);
     if ($573) {
      $tsize$0323944$i = 0;
     } else {
      $574 = $572;
      $575 = HEAP32[(2556)>>2]|0;
      $576 = (($575) + -1)|0;
      $577 = $576 & $574;
      $578 = ($577|0)==(0);
      if ($578) {
       $ssize$0$i = $550;
      } else {
       $579 = (($576) + ($574))|0;
       $580 = (0 - ($575))|0;
       $581 = $579 & $580;
       $582 = (($550) - ($574))|0;
       $583 = (($582) + ($581))|0;
       $ssize$0$i = $583;
      }
      $584 = HEAP32[(2512)>>2]|0;
      $585 = (($584) + ($ssize$0$i))|0;
      $586 = ($ssize$0$i>>>0)>($nb$0>>>0);
      $587 = ($ssize$0$i>>>0)<(2147483647);
      $or$cond$i30 = $586 & $587;
      if ($or$cond$i30) {
       $588 = HEAP32[(2520)>>2]|0;
       $589 = ($588|0)==(0);
       if (!($589)) {
        $590 = ($585>>>0)<=($584>>>0);
        $591 = ($585>>>0)>($588>>>0);
        $or$cond2$i = $590 | $591;
        if ($or$cond2$i) {
         $tsize$0323944$i = 0;
         break;
        }
       }
       $592 = (_sbrk(($ssize$0$i|0))|0);
       $593 = ($592|0)==($572|0);
       $ssize$0$$i = $593 ? $ssize$0$i : 0;
       if ($593) {
        $tbase$255$i = $572;$tsize$254$i = $ssize$0$$i;
        label = 194;
        break L258;
       } else {
        $br$0$ph$i = $592;$ssize$1$ph$i = $ssize$0$i;$tsize$0$ph$i = $ssize$0$$i;
        label = 184;
       }
      } else {
       $tsize$0323944$i = 0;
      }
     }
    }
   } while(0);
   L280: do {
    if ((label|0) == 184) {
     $604 = (0 - ($ssize$1$ph$i))|0;
     $605 = ($br$0$ph$i|0)!=((-1)|0);
     $606 = ($ssize$1$ph$i>>>0)<(2147483647);
     $or$cond5$i = $606 & $605;
     $607 = ($545>>>0)>($ssize$1$ph$i>>>0);
     $or$cond6$i = $607 & $or$cond5$i;
     do {
      if ($or$cond6$i) {
       $608 = HEAP32[(2560)>>2]|0;
       $609 = (($547) - ($ssize$1$ph$i))|0;
       $610 = (($609) + ($608))|0;
       $611 = (0 - ($608))|0;
       $612 = $610 & $611;
       $613 = ($612>>>0)<(2147483647);
       if ($613) {
        $614 = (_sbrk(($612|0))|0);
        $615 = ($614|0)==((-1)|0);
        if ($615) {
         (_sbrk(($604|0))|0);
         $tsize$0323944$i = $tsize$0$ph$i;
         break L280;
        } else {
         $616 = (($612) + ($ssize$1$ph$i))|0;
         $ssize$2$i = $616;
         break;
        }
       } else {
        $ssize$2$i = $ssize$1$ph$i;
       }
      } else {
       $ssize$2$i = $ssize$1$ph$i;
      }
     } while(0);
     $617 = ($br$0$ph$i|0)==((-1)|0);
     if ($617) {
      $tsize$0323944$i = $tsize$0$ph$i;
     } else {
      $tbase$255$i = $br$0$ph$i;$tsize$254$i = $ssize$2$i;
      label = 194;
      break L258;
     }
    }
   } while(0);
   $618 = HEAP32[(2524)>>2]|0;
   $619 = $618 | 4;
   HEAP32[(2524)>>2] = $619;
   $tsize$1$i = $tsize$0323944$i;
   label = 191;
  } else {
   $tsize$1$i = 0;
   label = 191;
  }
 } while(0);
 if ((label|0) == 191) {
  $620 = ($550>>>0)<(2147483647);
  if ($620) {
   $621 = (_sbrk(($550|0))|0);
   $622 = (_sbrk(0)|0);
   $623 = ($621|0)!=((-1)|0);
   $624 = ($622|0)!=((-1)|0);
   $or$cond3$i = $623 & $624;
   $625 = ($621>>>0)<($622>>>0);
   $or$cond8$i = $625 & $or$cond3$i;
   if ($or$cond8$i) {
    $626 = $622;
    $627 = $621;
    $628 = (($626) - ($627))|0;
    $629 = (($nb$0) + 40)|0;
    $630 = ($628>>>0)>($629>>>0);
    $$tsize$1$i = $630 ? $628 : $tsize$1$i;
    if ($630) {
     $tbase$255$i = $621;$tsize$254$i = $$tsize$1$i;
     label = 194;
    }
   }
  }
 }
 if ((label|0) == 194) {
  $631 = HEAP32[(2512)>>2]|0;
  $632 = (($631) + ($tsize$254$i))|0;
  HEAP32[(2512)>>2] = $632;
  $633 = HEAP32[(2516)>>2]|0;
  $634 = ($632>>>0)>($633>>>0);
  if ($634) {
   HEAP32[(2516)>>2] = $632;
  }
  $635 = HEAP32[(2104)>>2]|0;
  $636 = ($635|0)==(0|0);
  L299: do {
   if ($636) {
    $637 = HEAP32[(2096)>>2]|0;
    $638 = ($637|0)==(0|0);
    $639 = ($tbase$255$i>>>0)<($637>>>0);
    $or$cond9$i = $638 | $639;
    if ($or$cond9$i) {
     HEAP32[(2096)>>2] = $tbase$255$i;
    }
    HEAP32[(2528)>>2] = $tbase$255$i;
    HEAP32[(2532)>>2] = $tsize$254$i;
    HEAP32[(2540)>>2] = 0;
    $640 = HEAP32[2552>>2]|0;
    HEAP32[(2116)>>2] = $640;
    HEAP32[(2112)>>2] = -1;
    $i$02$i$i = 0;
    while(1) {
     $641 = $i$02$i$i << 1;
     $642 = (2120 + ($641<<2)|0);
     $$sum$i$i = (($641) + 3)|0;
     $643 = (2120 + ($$sum$i$i<<2)|0);
     HEAP32[$643>>2] = $642;
     $$sum1$i$i = (($641) + 2)|0;
     $644 = (2120 + ($$sum1$i$i<<2)|0);
     HEAP32[$644>>2] = $642;
     $645 = (($i$02$i$i) + 1)|0;
     $exitcond$i$i = ($645|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $i$02$i$i = $645;
     }
    }
    $646 = (($tsize$254$i) + -40)|0;
    $647 = ((($tbase$255$i)) + 8|0);
    $648 = $647;
    $649 = $648 & 7;
    $650 = ($649|0)==(0);
    $651 = (0 - ($648))|0;
    $652 = $651 & 7;
    $653 = $650 ? 0 : $652;
    $654 = (($tbase$255$i) + ($653)|0);
    $655 = (($646) - ($653))|0;
    HEAP32[(2104)>>2] = $654;
    HEAP32[(2092)>>2] = $655;
    $656 = $655 | 1;
    $$sum$i13$i = (($653) + 4)|0;
    $657 = (($tbase$255$i) + ($$sum$i13$i)|0);
    HEAP32[$657>>2] = $656;
    $$sum2$i$i = (($tsize$254$i) + -36)|0;
    $658 = (($tbase$255$i) + ($$sum2$i$i)|0);
    HEAP32[$658>>2] = 40;
    $659 = HEAP32[(2568)>>2]|0;
    HEAP32[(2108)>>2] = $659;
   } else {
    $sp$084$i = (2528);
    while(1) {
     $660 = HEAP32[$sp$084$i>>2]|0;
     $661 = ((($sp$084$i)) + 4|0);
     $662 = HEAP32[$661>>2]|0;
     $663 = (($660) + ($662)|0);
     $664 = ($tbase$255$i|0)==($663|0);
     if ($664) {
      $$lcssa222 = $660;$$lcssa224 = $661;$$lcssa226 = $662;$sp$084$i$lcssa = $sp$084$i;
      label = 204;
      break;
     }
     $665 = ((($sp$084$i)) + 8|0);
     $666 = HEAP32[$665>>2]|0;
     $667 = ($666|0)==(0|0);
     if ($667) {
      break;
     } else {
      $sp$084$i = $666;
     }
    }
    if ((label|0) == 204) {
     $668 = ((($sp$084$i$lcssa)) + 12|0);
     $669 = HEAP32[$668>>2]|0;
     $670 = $669 & 8;
     $671 = ($670|0)==(0);
     if ($671) {
      $672 = ($635>>>0)>=($$lcssa222>>>0);
      $673 = ($635>>>0)<($tbase$255$i>>>0);
      $or$cond57$i = $673 & $672;
      if ($or$cond57$i) {
       $674 = (($$lcssa226) + ($tsize$254$i))|0;
       HEAP32[$$lcssa224>>2] = $674;
       $675 = HEAP32[(2092)>>2]|0;
       $676 = (($675) + ($tsize$254$i))|0;
       $677 = ((($635)) + 8|0);
       $678 = $677;
       $679 = $678 & 7;
       $680 = ($679|0)==(0);
       $681 = (0 - ($678))|0;
       $682 = $681 & 7;
       $683 = $680 ? 0 : $682;
       $684 = (($635) + ($683)|0);
       $685 = (($676) - ($683))|0;
       HEAP32[(2104)>>2] = $684;
       HEAP32[(2092)>>2] = $685;
       $686 = $685 | 1;
       $$sum$i17$i = (($683) + 4)|0;
       $687 = (($635) + ($$sum$i17$i)|0);
       HEAP32[$687>>2] = $686;
       $$sum2$i18$i = (($676) + 4)|0;
       $688 = (($635) + ($$sum2$i18$i)|0);
       HEAP32[$688>>2] = 40;
       $689 = HEAP32[(2568)>>2]|0;
       HEAP32[(2108)>>2] = $689;
       break;
      }
     }
    }
    $690 = HEAP32[(2096)>>2]|0;
    $691 = ($tbase$255$i>>>0)<($690>>>0);
    if ($691) {
     HEAP32[(2096)>>2] = $tbase$255$i;
     $755 = $tbase$255$i;
    } else {
     $755 = $690;
    }
    $692 = (($tbase$255$i) + ($tsize$254$i)|0);
    $sp$183$i = (2528);
    while(1) {
     $693 = HEAP32[$sp$183$i>>2]|0;
     $694 = ($693|0)==($692|0);
     if ($694) {
      $$lcssa219 = $sp$183$i;$sp$183$i$lcssa = $sp$183$i;
      label = 212;
      break;
     }
     $695 = ((($sp$183$i)) + 8|0);
     $696 = HEAP32[$695>>2]|0;
     $697 = ($696|0)==(0|0);
     if ($697) {
      $sp$0$i$i$i = (2528);
      break;
     } else {
      $sp$183$i = $696;
     }
    }
    if ((label|0) == 212) {
     $698 = ((($sp$183$i$lcssa)) + 12|0);
     $699 = HEAP32[$698>>2]|0;
     $700 = $699 & 8;
     $701 = ($700|0)==(0);
     if ($701) {
      HEAP32[$$lcssa219>>2] = $tbase$255$i;
      $702 = ((($sp$183$i$lcssa)) + 4|0);
      $703 = HEAP32[$702>>2]|0;
      $704 = (($703) + ($tsize$254$i))|0;
      HEAP32[$702>>2] = $704;
      $705 = ((($tbase$255$i)) + 8|0);
      $706 = $705;
      $707 = $706 & 7;
      $708 = ($707|0)==(0);
      $709 = (0 - ($706))|0;
      $710 = $709 & 7;
      $711 = $708 ? 0 : $710;
      $712 = (($tbase$255$i) + ($711)|0);
      $$sum112$i = (($tsize$254$i) + 8)|0;
      $713 = (($tbase$255$i) + ($$sum112$i)|0);
      $714 = $713;
      $715 = $714 & 7;
      $716 = ($715|0)==(0);
      $717 = (0 - ($714))|0;
      $718 = $717 & 7;
      $719 = $716 ? 0 : $718;
      $$sum113$i = (($719) + ($tsize$254$i))|0;
      $720 = (($tbase$255$i) + ($$sum113$i)|0);
      $721 = $720;
      $722 = $712;
      $723 = (($721) - ($722))|0;
      $$sum$i19$i = (($711) + ($nb$0))|0;
      $724 = (($tbase$255$i) + ($$sum$i19$i)|0);
      $725 = (($723) - ($nb$0))|0;
      $726 = $nb$0 | 3;
      $$sum1$i20$i = (($711) + 4)|0;
      $727 = (($tbase$255$i) + ($$sum1$i20$i)|0);
      HEAP32[$727>>2] = $726;
      $728 = ($720|0)==($635|0);
      L317: do {
       if ($728) {
        $729 = HEAP32[(2092)>>2]|0;
        $730 = (($729) + ($725))|0;
        HEAP32[(2092)>>2] = $730;
        HEAP32[(2104)>>2] = $724;
        $731 = $730 | 1;
        $$sum42$i$i = (($$sum$i19$i) + 4)|0;
        $732 = (($tbase$255$i) + ($$sum42$i$i)|0);
        HEAP32[$732>>2] = $731;
       } else {
        $733 = HEAP32[(2100)>>2]|0;
        $734 = ($720|0)==($733|0);
        if ($734) {
         $735 = HEAP32[(2088)>>2]|0;
         $736 = (($735) + ($725))|0;
         HEAP32[(2088)>>2] = $736;
         HEAP32[(2100)>>2] = $724;
         $737 = $736 | 1;
         $$sum40$i$i = (($$sum$i19$i) + 4)|0;
         $738 = (($tbase$255$i) + ($$sum40$i$i)|0);
         HEAP32[$738>>2] = $737;
         $$sum41$i$i = (($736) + ($$sum$i19$i))|0;
         $739 = (($tbase$255$i) + ($$sum41$i$i)|0);
         HEAP32[$739>>2] = $736;
         break;
        }
        $$sum2$i21$i = (($tsize$254$i) + 4)|0;
        $$sum114$i = (($$sum2$i21$i) + ($719))|0;
        $740 = (($tbase$255$i) + ($$sum114$i)|0);
        $741 = HEAP32[$740>>2]|0;
        $742 = $741 & 3;
        $743 = ($742|0)==(1);
        if ($743) {
         $744 = $741 & -8;
         $745 = $741 >>> 3;
         $746 = ($741>>>0)<(256);
         L325: do {
          if ($746) {
           $$sum3738$i$i = $719 | 8;
           $$sum124$i = (($$sum3738$i$i) + ($tsize$254$i))|0;
           $747 = (($tbase$255$i) + ($$sum124$i)|0);
           $748 = HEAP32[$747>>2]|0;
           $$sum39$i$i = (($tsize$254$i) + 12)|0;
           $$sum125$i = (($$sum39$i$i) + ($719))|0;
           $749 = (($tbase$255$i) + ($$sum125$i)|0);
           $750 = HEAP32[$749>>2]|0;
           $751 = $745 << 1;
           $752 = (2120 + ($751<<2)|0);
           $753 = ($748|0)==($752|0);
           do {
            if (!($753)) {
             $754 = ($748>>>0)<($755>>>0);
             if ($754) {
              _abort();
              // unreachable;
             }
             $756 = ((($748)) + 12|0);
             $757 = HEAP32[$756>>2]|0;
             $758 = ($757|0)==($720|0);
             if ($758) {
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $759 = ($750|0)==($748|0);
           if ($759) {
            $760 = 1 << $745;
            $761 = $760 ^ -1;
            $762 = HEAP32[2080>>2]|0;
            $763 = $762 & $761;
            HEAP32[2080>>2] = $763;
            break;
           }
           $764 = ($750|0)==($752|0);
           do {
            if ($764) {
             $$pre57$i$i = ((($750)) + 8|0);
             $$pre$phi58$i$iZ2D = $$pre57$i$i;
            } else {
             $765 = ($750>>>0)<($755>>>0);
             if ($765) {
              _abort();
              // unreachable;
             }
             $766 = ((($750)) + 8|0);
             $767 = HEAP32[$766>>2]|0;
             $768 = ($767|0)==($720|0);
             if ($768) {
              $$pre$phi58$i$iZ2D = $766;
              break;
             }
             _abort();
             // unreachable;
            }
           } while(0);
           $769 = ((($748)) + 12|0);
           HEAP32[$769>>2] = $750;
           HEAP32[$$pre$phi58$i$iZ2D>>2] = $748;
          } else {
           $$sum34$i$i = $719 | 24;
           $$sum115$i = (($$sum34$i$i) + ($tsize$254$i))|0;
           $770 = (($tbase$255$i) + ($$sum115$i)|0);
           $771 = HEAP32[$770>>2]|0;
           $$sum5$i$i = (($tsize$254$i) + 12)|0;
           $$sum116$i = (($$sum5$i$i) + ($719))|0;
           $772 = (($tbase$255$i) + ($$sum116$i)|0);
           $773 = HEAP32[$772>>2]|0;
           $774 = ($773|0)==($720|0);
           do {
            if ($774) {
             $$sum67$i$i = $719 | 16;
             $$sum122$i = (($$sum2$i21$i) + ($$sum67$i$i))|0;
             $784 = (($tbase$255$i) + ($$sum122$i)|0);
             $785 = HEAP32[$784>>2]|0;
             $786 = ($785|0)==(0|0);
             if ($786) {
              $$sum123$i = (($$sum67$i$i) + ($tsize$254$i))|0;
              $787 = (($tbase$255$i) + ($$sum123$i)|0);
              $788 = HEAP32[$787>>2]|0;
              $789 = ($788|0)==(0|0);
              if ($789) {
               $R$1$i$i = 0;
               break;
              } else {
               $R$0$i$i = $788;$RP$0$i$i = $787;
              }
             } else {
              $R$0$i$i = $785;$RP$0$i$i = $784;
             }
             while(1) {
              $790 = ((($R$0$i$i)) + 20|0);
              $791 = HEAP32[$790>>2]|0;
              $792 = ($791|0)==(0|0);
              if (!($792)) {
               $R$0$i$i = $791;$RP$0$i$i = $790;
               continue;
              }
              $793 = ((($R$0$i$i)) + 16|0);
              $794 = HEAP32[$793>>2]|0;
              $795 = ($794|0)==(0|0);
              if ($795) {
               $R$0$i$i$lcssa = $R$0$i$i;$RP$0$i$i$lcssa = $RP$0$i$i;
               break;
              } else {
               $R$0$i$i = $794;$RP$0$i$i = $793;
              }
             }
             $796 = ($RP$0$i$i$lcssa>>>0)<($755>>>0);
             if ($796) {
              _abort();
              // unreachable;
             } else {
              HEAP32[$RP$0$i$i$lcssa>>2] = 0;
              $R$1$i$i = $R$0$i$i$lcssa;
              break;
             }
            } else {
             $$sum3536$i$i = $719 | 8;
             $$sum117$i = (($$sum3536$i$i) + ($tsize$254$i))|0;
             $775 = (($tbase$255$i) + ($$sum117$i)|0);
             $776 = HEAP32[$775>>2]|0;
             $777 = ($776>>>0)<($755>>>0);
             if ($777) {
              _abort();
              // unreachable;
             }
             $778 = ((($776)) + 12|0);
             $779 = HEAP32[$778>>2]|0;
             $780 = ($779|0)==($720|0);
             if (!($780)) {
              _abort();
              // unreachable;
             }
             $781 = ((($773)) + 8|0);
             $782 = HEAP32[$781>>2]|0;
             $783 = ($782|0)==($720|0);
             if ($783) {
              HEAP32[$778>>2] = $773;
              HEAP32[$781>>2] = $776;
              $R$1$i$i = $773;
              break;
             } else {
              _abort();
              // unreachable;
             }
            }
           } while(0);
           $797 = ($771|0)==(0|0);
           if ($797) {
            break;
           }
           $$sum30$i$i = (($tsize$254$i) + 28)|0;
           $$sum118$i = (($$sum30$i$i) + ($719))|0;
           $798 = (($tbase$255$i) + ($$sum118$i)|0);
           $799 = HEAP32[$798>>2]|0;
           $800 = (2384 + ($799<<2)|0);
           $801 = HEAP32[$800>>2]|0;
           $802 = ($720|0)==($801|0);
           do {
            if ($802) {
             HEAP32[$800>>2] = $R$1$i$i;
             $cond$i$i = ($R$1$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $803 = 1 << $799;
             $804 = $803 ^ -1;
             $805 = HEAP32[(2084)>>2]|0;
             $806 = $805 & $804;
             HEAP32[(2084)>>2] = $806;
             break L325;
            } else {
             $807 = HEAP32[(2096)>>2]|0;
             $808 = ($771>>>0)<($807>>>0);
             if ($808) {
              _abort();
              // unreachable;
             }
             $809 = ((($771)) + 16|0);
             $810 = HEAP32[$809>>2]|0;
             $811 = ($810|0)==($720|0);
             if ($811) {
              HEAP32[$809>>2] = $R$1$i$i;
             } else {
              $812 = ((($771)) + 20|0);
              HEAP32[$812>>2] = $R$1$i$i;
             }
             $813 = ($R$1$i$i|0)==(0|0);
             if ($813) {
              break L325;
             }
            }
           } while(0);
           $814 = HEAP32[(2096)>>2]|0;
           $815 = ($R$1$i$i>>>0)<($814>>>0);
           if ($815) {
            _abort();
            // unreachable;
           }
           $816 = ((($R$1$i$i)) + 24|0);
           HEAP32[$816>>2] = $771;
           $$sum3132$i$i = $719 | 16;
           $$sum119$i = (($$sum3132$i$i) + ($tsize$254$i))|0;
           $817 = (($tbase$255$i) + ($$sum119$i)|0);
           $818 = HEAP32[$817>>2]|0;
           $819 = ($818|0)==(0|0);
           do {
            if (!($819)) {
             $820 = ($818>>>0)<($814>>>0);
             if ($820) {
              _abort();
              // unreachable;
             } else {
              $821 = ((($R$1$i$i)) + 16|0);
              HEAP32[$821>>2] = $818;
              $822 = ((($818)) + 24|0);
              HEAP32[$822>>2] = $R$1$i$i;
              break;
             }
            }
           } while(0);
           $$sum120$i = (($$sum2$i21$i) + ($$sum3132$i$i))|0;
           $823 = (($tbase$255$i) + ($$sum120$i)|0);
           $824 = HEAP32[$823>>2]|0;
           $825 = ($824|0)==(0|0);
           if ($825) {
            break;
           }
           $826 = HEAP32[(2096)>>2]|0;
           $827 = ($824>>>0)<($826>>>0);
           if ($827) {
            _abort();
            // unreachable;
           } else {
            $828 = ((($R$1$i$i)) + 20|0);
            HEAP32[$828>>2] = $824;
            $829 = ((($824)) + 24|0);
            HEAP32[$829>>2] = $R$1$i$i;
            break;
           }
          }
         } while(0);
         $$sum9$i$i = $744 | $719;
         $$sum121$i = (($$sum9$i$i) + ($tsize$254$i))|0;
         $830 = (($tbase$255$i) + ($$sum121$i)|0);
         $831 = (($744) + ($725))|0;
         $oldfirst$0$i$i = $830;$qsize$0$i$i = $831;
        } else {
         $oldfirst$0$i$i = $720;$qsize$0$i$i = $725;
        }
        $832 = ((($oldfirst$0$i$i)) + 4|0);
        $833 = HEAP32[$832>>2]|0;
        $834 = $833 & -2;
        HEAP32[$832>>2] = $834;
        $835 = $qsize$0$i$i | 1;
        $$sum10$i$i = (($$sum$i19$i) + 4)|0;
        $836 = (($tbase$255$i) + ($$sum10$i$i)|0);
        HEAP32[$836>>2] = $835;
        $$sum11$i$i = (($qsize$0$i$i) + ($$sum$i19$i))|0;
        $837 = (($tbase$255$i) + ($$sum11$i$i)|0);
        HEAP32[$837>>2] = $qsize$0$i$i;
        $838 = $qsize$0$i$i >>> 3;
        $839 = ($qsize$0$i$i>>>0)<(256);
        if ($839) {
         $840 = $838 << 1;
         $841 = (2120 + ($840<<2)|0);
         $842 = HEAP32[2080>>2]|0;
         $843 = 1 << $838;
         $844 = $842 & $843;
         $845 = ($844|0)==(0);
         do {
          if ($845) {
           $846 = $842 | $843;
           HEAP32[2080>>2] = $846;
           $$pre$i22$i = (($840) + 2)|0;
           $$pre56$i$i = (2120 + ($$pre$i22$i<<2)|0);
           $$pre$phi$i23$iZ2D = $$pre56$i$i;$F4$0$i$i = $841;
          } else {
           $$sum29$i$i = (($840) + 2)|0;
           $847 = (2120 + ($$sum29$i$i<<2)|0);
           $848 = HEAP32[$847>>2]|0;
           $849 = HEAP32[(2096)>>2]|0;
           $850 = ($848>>>0)<($849>>>0);
           if (!($850)) {
            $$pre$phi$i23$iZ2D = $847;$F4$0$i$i = $848;
            break;
           }
           _abort();
           // unreachable;
          }
         } while(0);
         HEAP32[$$pre$phi$i23$iZ2D>>2] = $724;
         $851 = ((($F4$0$i$i)) + 12|0);
         HEAP32[$851>>2] = $724;
         $$sum27$i$i = (($$sum$i19$i) + 8)|0;
         $852 = (($tbase$255$i) + ($$sum27$i$i)|0);
         HEAP32[$852>>2] = $F4$0$i$i;
         $$sum28$i$i = (($$sum$i19$i) + 12)|0;
         $853 = (($tbase$255$i) + ($$sum28$i$i)|0);
         HEAP32[$853>>2] = $841;
         break;
        }
        $854 = $qsize$0$i$i >>> 8;
        $855 = ($854|0)==(0);
        do {
         if ($855) {
          $I7$0$i$i = 0;
         } else {
          $856 = ($qsize$0$i$i>>>0)>(16777215);
          if ($856) {
           $I7$0$i$i = 31;
           break;
          }
          $857 = (($854) + 1048320)|0;
          $858 = $857 >>> 16;
          $859 = $858 & 8;
          $860 = $854 << $859;
          $861 = (($860) + 520192)|0;
          $862 = $861 >>> 16;
          $863 = $862 & 4;
          $864 = $863 | $859;
          $865 = $860 << $863;
          $866 = (($865) + 245760)|0;
          $867 = $866 >>> 16;
          $868 = $867 & 2;
          $869 = $864 | $868;
          $870 = (14 - ($869))|0;
          $871 = $865 << $868;
          $872 = $871 >>> 15;
          $873 = (($870) + ($872))|0;
          $874 = $873 << 1;
          $875 = (($873) + 7)|0;
          $876 = $qsize$0$i$i >>> $875;
          $877 = $876 & 1;
          $878 = $877 | $874;
          $I7$0$i$i = $878;
         }
        } while(0);
        $879 = (2384 + ($I7$0$i$i<<2)|0);
        $$sum12$i$i = (($$sum$i19$i) + 28)|0;
        $880 = (($tbase$255$i) + ($$sum12$i$i)|0);
        HEAP32[$880>>2] = $I7$0$i$i;
        $$sum13$i$i = (($$sum$i19$i) + 16)|0;
        $881 = (($tbase$255$i) + ($$sum13$i$i)|0);
        $$sum14$i$i = (($$sum$i19$i) + 20)|0;
        $882 = (($tbase$255$i) + ($$sum14$i$i)|0);
        HEAP32[$882>>2] = 0;
        HEAP32[$881>>2] = 0;
        $883 = HEAP32[(2084)>>2]|0;
        $884 = 1 << $I7$0$i$i;
        $885 = $883 & $884;
        $886 = ($885|0)==(0);
        if ($886) {
         $887 = $883 | $884;
         HEAP32[(2084)>>2] = $887;
         HEAP32[$879>>2] = $724;
         $$sum15$i$i = (($$sum$i19$i) + 24)|0;
         $888 = (($tbase$255$i) + ($$sum15$i$i)|0);
         HEAP32[$888>>2] = $879;
         $$sum16$i$i = (($$sum$i19$i) + 12)|0;
         $889 = (($tbase$255$i) + ($$sum16$i$i)|0);
         HEAP32[$889>>2] = $724;
         $$sum17$i$i = (($$sum$i19$i) + 8)|0;
         $890 = (($tbase$255$i) + ($$sum17$i$i)|0);
         HEAP32[$890>>2] = $724;
         break;
        }
        $891 = HEAP32[$879>>2]|0;
        $892 = ((($891)) + 4|0);
        $893 = HEAP32[$892>>2]|0;
        $894 = $893 & -8;
        $895 = ($894|0)==($qsize$0$i$i|0);
        L411: do {
         if ($895) {
          $T$0$lcssa$i25$i = $891;
         } else {
          $896 = ($I7$0$i$i|0)==(31);
          $897 = $I7$0$i$i >>> 1;
          $898 = (25 - ($897))|0;
          $899 = $896 ? 0 : $898;
          $900 = $qsize$0$i$i << $899;
          $K8$051$i$i = $900;$T$050$i$i = $891;
          while(1) {
           $907 = $K8$051$i$i >>> 31;
           $908 = (((($T$050$i$i)) + 16|0) + ($907<<2)|0);
           $903 = HEAP32[$908>>2]|0;
           $909 = ($903|0)==(0|0);
           if ($909) {
            $$lcssa = $908;$T$050$i$i$lcssa = $T$050$i$i;
            break;
           }
           $901 = $K8$051$i$i << 1;
           $902 = ((($903)) + 4|0);
           $904 = HEAP32[$902>>2]|0;
           $905 = $904 & -8;
           $906 = ($905|0)==($qsize$0$i$i|0);
           if ($906) {
            $T$0$lcssa$i25$i = $903;
            break L411;
           } else {
            $K8$051$i$i = $901;$T$050$i$i = $903;
           }
          }
          $910 = HEAP32[(2096)>>2]|0;
          $911 = ($$lcssa>>>0)<($910>>>0);
          if ($911) {
           _abort();
           // unreachable;
          } else {
           HEAP32[$$lcssa>>2] = $724;
           $$sum23$i$i = (($$sum$i19$i) + 24)|0;
           $912 = (($tbase$255$i) + ($$sum23$i$i)|0);
           HEAP32[$912>>2] = $T$050$i$i$lcssa;
           $$sum24$i$i = (($$sum$i19$i) + 12)|0;
           $913 = (($tbase$255$i) + ($$sum24$i$i)|0);
           HEAP32[$913>>2] = $724;
           $$sum25$i$i = (($$sum$i19$i) + 8)|0;
           $914 = (($tbase$255$i) + ($$sum25$i$i)|0);
           HEAP32[$914>>2] = $724;
           break L317;
          }
         }
        } while(0);
        $915 = ((($T$0$lcssa$i25$i)) + 8|0);
        $916 = HEAP32[$915>>2]|0;
        $917 = HEAP32[(2096)>>2]|0;
        $918 = ($916>>>0)>=($917>>>0);
        $not$$i26$i = ($T$0$lcssa$i25$i>>>0)>=($917>>>0);
        $919 = $918 & $not$$i26$i;
        if ($919) {
         $920 = ((($916)) + 12|0);
         HEAP32[$920>>2] = $724;
         HEAP32[$915>>2] = $724;
         $$sum20$i$i = (($$sum$i19$i) + 8)|0;
         $921 = (($tbase$255$i) + ($$sum20$i$i)|0);
         HEAP32[$921>>2] = $916;
         $$sum21$i$i = (($$sum$i19$i) + 12)|0;
         $922 = (($tbase$255$i) + ($$sum21$i$i)|0);
         HEAP32[$922>>2] = $T$0$lcssa$i25$i;
         $$sum22$i$i = (($$sum$i19$i) + 24)|0;
         $923 = (($tbase$255$i) + ($$sum22$i$i)|0);
         HEAP32[$923>>2] = 0;
         break;
        } else {
         _abort();
         // unreachable;
        }
       }
      } while(0);
      $$sum1819$i$i = $711 | 8;
      $924 = (($tbase$255$i) + ($$sum1819$i$i)|0);
      $mem$0 = $924;
      return ($mem$0|0);
     } else {
      $sp$0$i$i$i = (2528);
     }
    }
    while(1) {
     $925 = HEAP32[$sp$0$i$i$i>>2]|0;
     $926 = ($925>>>0)>($635>>>0);
     if (!($926)) {
      $927 = ((($sp$0$i$i$i)) + 4|0);
      $928 = HEAP32[$927>>2]|0;
      $929 = (($925) + ($928)|0);
      $930 = ($929>>>0)>($635>>>0);
      if ($930) {
       $$lcssa215 = $925;$$lcssa216 = $928;$$lcssa217 = $929;
       break;
      }
     }
     $931 = ((($sp$0$i$i$i)) + 8|0);
     $932 = HEAP32[$931>>2]|0;
     $sp$0$i$i$i = $932;
    }
    $$sum$i14$i = (($$lcssa216) + -47)|0;
    $$sum1$i15$i = (($$lcssa216) + -39)|0;
    $933 = (($$lcssa215) + ($$sum1$i15$i)|0);
    $934 = $933;
    $935 = $934 & 7;
    $936 = ($935|0)==(0);
    $937 = (0 - ($934))|0;
    $938 = $937 & 7;
    $939 = $936 ? 0 : $938;
    $$sum2$i16$i = (($$sum$i14$i) + ($939))|0;
    $940 = (($$lcssa215) + ($$sum2$i16$i)|0);
    $941 = ((($635)) + 16|0);
    $942 = ($940>>>0)<($941>>>0);
    $943 = $942 ? $635 : $940;
    $944 = ((($943)) + 8|0);
    $945 = (($tsize$254$i) + -40)|0;
    $946 = ((($tbase$255$i)) + 8|0);
    $947 = $946;
    $948 = $947 & 7;
    $949 = ($948|0)==(0);
    $950 = (0 - ($947))|0;
    $951 = $950 & 7;
    $952 = $949 ? 0 : $951;
    $953 = (($tbase$255$i) + ($952)|0);
    $954 = (($945) - ($952))|0;
    HEAP32[(2104)>>2] = $953;
    HEAP32[(2092)>>2] = $954;
    $955 = $954 | 1;
    $$sum$i$i$i = (($952) + 4)|0;
    $956 = (($tbase$255$i) + ($$sum$i$i$i)|0);
    HEAP32[$956>>2] = $955;
    $$sum2$i$i$i = (($tsize$254$i) + -36)|0;
    $957 = (($tbase$255$i) + ($$sum2$i$i$i)|0);
    HEAP32[$957>>2] = 40;
    $958 = HEAP32[(2568)>>2]|0;
    HEAP32[(2108)>>2] = $958;
    $959 = ((($943)) + 4|0);
    HEAP32[$959>>2] = 27;
    ;HEAP32[$944>>2]=HEAP32[(2528)>>2]|0;HEAP32[$944+4>>2]=HEAP32[(2528)+4>>2]|0;HEAP32[$944+8>>2]=HEAP32[(2528)+8>>2]|0;HEAP32[$944+12>>2]=HEAP32[(2528)+12>>2]|0;
    HEAP32[(2528)>>2] = $tbase$255$i;
    HEAP32[(2532)>>2] = $tsize$254$i;
    HEAP32[(2540)>>2] = 0;
    HEAP32[(2536)>>2] = $944;
    $960 = ((($943)) + 28|0);
    HEAP32[$960>>2] = 7;
    $961 = ((($943)) + 32|0);
    $962 = ($961>>>0)<($$lcssa217>>>0);
    if ($962) {
     $964 = $960;
     while(1) {
      $963 = ((($964)) + 4|0);
      HEAP32[$963>>2] = 7;
      $965 = ((($964)) + 8|0);
      $966 = ($965>>>0)<($$lcssa217>>>0);
      if ($966) {
       $964 = $963;
      } else {
       break;
      }
     }
    }
    $967 = ($943|0)==($635|0);
    if (!($967)) {
     $968 = $943;
     $969 = $635;
     $970 = (($968) - ($969))|0;
     $971 = HEAP32[$959>>2]|0;
     $972 = $971 & -2;
     HEAP32[$959>>2] = $972;
     $973 = $970 | 1;
     $974 = ((($635)) + 4|0);
     HEAP32[$974>>2] = $973;
     HEAP32[$943>>2] = $970;
     $975 = $970 >>> 3;
     $976 = ($970>>>0)<(256);
     if ($976) {
      $977 = $975 << 1;
      $978 = (2120 + ($977<<2)|0);
      $979 = HEAP32[2080>>2]|0;
      $980 = 1 << $975;
      $981 = $979 & $980;
      $982 = ($981|0)==(0);
      if ($982) {
       $983 = $979 | $980;
       HEAP32[2080>>2] = $983;
       $$pre$i$i = (($977) + 2)|0;
       $$pre14$i$i = (2120 + ($$pre$i$i<<2)|0);
       $$pre$phi$i$iZ2D = $$pre14$i$i;$F$0$i$i = $978;
      } else {
       $$sum4$i$i = (($977) + 2)|0;
       $984 = (2120 + ($$sum4$i$i<<2)|0);
       $985 = HEAP32[$984>>2]|0;
       $986 = HEAP32[(2096)>>2]|0;
       $987 = ($985>>>0)<($986>>>0);
       if ($987) {
        _abort();
        // unreachable;
       } else {
        $$pre$phi$i$iZ2D = $984;$F$0$i$i = $985;
       }
      }
      HEAP32[$$pre$phi$i$iZ2D>>2] = $635;
      $988 = ((($F$0$i$i)) + 12|0);
      HEAP32[$988>>2] = $635;
      $989 = ((($635)) + 8|0);
      HEAP32[$989>>2] = $F$0$i$i;
      $990 = ((($635)) + 12|0);
      HEAP32[$990>>2] = $978;
      break;
     }
     $991 = $970 >>> 8;
     $992 = ($991|0)==(0);
     if ($992) {
      $I1$0$i$i = 0;
     } else {
      $993 = ($970>>>0)>(16777215);
      if ($993) {
       $I1$0$i$i = 31;
      } else {
       $994 = (($991) + 1048320)|0;
       $995 = $994 >>> 16;
       $996 = $995 & 8;
       $997 = $991 << $996;
       $998 = (($997) + 520192)|0;
       $999 = $998 >>> 16;
       $1000 = $999 & 4;
       $1001 = $1000 | $996;
       $1002 = $997 << $1000;
       $1003 = (($1002) + 245760)|0;
       $1004 = $1003 >>> 16;
       $1005 = $1004 & 2;
       $1006 = $1001 | $1005;
       $1007 = (14 - ($1006))|0;
       $1008 = $1002 << $1005;
       $1009 = $1008 >>> 15;
       $1010 = (($1007) + ($1009))|0;
       $1011 = $1010 << 1;
       $1012 = (($1010) + 7)|0;
       $1013 = $970 >>> $1012;
       $1014 = $1013 & 1;
       $1015 = $1014 | $1011;
       $I1$0$i$i = $1015;
      }
     }
     $1016 = (2384 + ($I1$0$i$i<<2)|0);
     $1017 = ((($635)) + 28|0);
     HEAP32[$1017>>2] = $I1$0$i$i;
     $1018 = ((($635)) + 20|0);
     HEAP32[$1018>>2] = 0;
     HEAP32[$941>>2] = 0;
     $1019 = HEAP32[(2084)>>2]|0;
     $1020 = 1 << $I1$0$i$i;
     $1021 = $1019 & $1020;
     $1022 = ($1021|0)==(0);
     if ($1022) {
      $1023 = $1019 | $1020;
      HEAP32[(2084)>>2] = $1023;
      HEAP32[$1016>>2] = $635;
      $1024 = ((($635)) + 24|0);
      HEAP32[$1024>>2] = $1016;
      $1025 = ((($635)) + 12|0);
      HEAP32[$1025>>2] = $635;
      $1026 = ((($635)) + 8|0);
      HEAP32[$1026>>2] = $635;
      break;
     }
     $1027 = HEAP32[$1016>>2]|0;
     $1028 = ((($1027)) + 4|0);
     $1029 = HEAP32[$1028>>2]|0;
     $1030 = $1029 & -8;
     $1031 = ($1030|0)==($970|0);
     L452: do {
      if ($1031) {
       $T$0$lcssa$i$i = $1027;
      } else {
       $1032 = ($I1$0$i$i|0)==(31);
       $1033 = $I1$0$i$i >>> 1;
       $1034 = (25 - ($1033))|0;
       $1035 = $1032 ? 0 : $1034;
       $1036 = $970 << $1035;
       $K2$07$i$i = $1036;$T$06$i$i = $1027;
       while(1) {
        $1043 = $K2$07$i$i >>> 31;
        $1044 = (((($T$06$i$i)) + 16|0) + ($1043<<2)|0);
        $1039 = HEAP32[$1044>>2]|0;
        $1045 = ($1039|0)==(0|0);
        if ($1045) {
         $$lcssa211 = $1044;$T$06$i$i$lcssa = $T$06$i$i;
         break;
        }
        $1037 = $K2$07$i$i << 1;
        $1038 = ((($1039)) + 4|0);
        $1040 = HEAP32[$1038>>2]|0;
        $1041 = $1040 & -8;
        $1042 = ($1041|0)==($970|0);
        if ($1042) {
         $T$0$lcssa$i$i = $1039;
         break L452;
        } else {
         $K2$07$i$i = $1037;$T$06$i$i = $1039;
        }
       }
       $1046 = HEAP32[(2096)>>2]|0;
       $1047 = ($$lcssa211>>>0)<($1046>>>0);
       if ($1047) {
        _abort();
        // unreachable;
       } else {
        HEAP32[$$lcssa211>>2] = $635;
        $1048 = ((($635)) + 24|0);
        HEAP32[$1048>>2] = $T$06$i$i$lcssa;
        $1049 = ((($635)) + 12|0);
        HEAP32[$1049>>2] = $635;
        $1050 = ((($635)) + 8|0);
        HEAP32[$1050>>2] = $635;
        break L299;
       }
      }
     } while(0);
     $1051 = ((($T$0$lcssa$i$i)) + 8|0);
     $1052 = HEAP32[$1051>>2]|0;
     $1053 = HEAP32[(2096)>>2]|0;
     $1054 = ($1052>>>0)>=($1053>>>0);
     $not$$i$i = ($T$0$lcssa$i$i>>>0)>=($1053>>>0);
     $1055 = $1054 & $not$$i$i;
     if ($1055) {
      $1056 = ((($1052)) + 12|0);
      HEAP32[$1056>>2] = $635;
      HEAP32[$1051>>2] = $635;
      $1057 = ((($635)) + 8|0);
      HEAP32[$1057>>2] = $1052;
      $1058 = ((($635)) + 12|0);
      HEAP32[$1058>>2] = $T$0$lcssa$i$i;
      $1059 = ((($635)) + 24|0);
      HEAP32[$1059>>2] = 0;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   }
  } while(0);
  $1060 = HEAP32[(2092)>>2]|0;
  $1061 = ($1060>>>0)>($nb$0>>>0);
  if ($1061) {
   $1062 = (($1060) - ($nb$0))|0;
   HEAP32[(2092)>>2] = $1062;
   $1063 = HEAP32[(2104)>>2]|0;
   $1064 = (($1063) + ($nb$0)|0);
   HEAP32[(2104)>>2] = $1064;
   $1065 = $1062 | 1;
   $$sum$i32 = (($nb$0) + 4)|0;
   $1066 = (($1063) + ($$sum$i32)|0);
   HEAP32[$1066>>2] = $1065;
   $1067 = $nb$0 | 3;
   $1068 = ((($1063)) + 4|0);
   HEAP32[$1068>>2] = $1067;
   $1069 = ((($1063)) + 8|0);
   $mem$0 = $1069;
   return ($mem$0|0);
  }
 }
 $1070 = (___errno_location()|0);
 HEAP32[$1070>>2] = 12;
 $mem$0 = 0;
 return ($mem$0|0);
}
function _free($mem) {
 $mem = $mem|0;
 var $$lcssa = 0, $$pre = 0, $$pre$phi59Z2D = 0, $$pre$phi61Z2D = 0, $$pre$phiZ2D = 0, $$pre57 = 0, $$pre58 = 0, $$pre60 = 0, $$sum = 0, $$sum11 = 0, $$sum12 = 0, $$sum13 = 0, $$sum14 = 0, $$sum1718 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0;
 var $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0;
 var $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0;
 var $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0;
 var $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0;
 var $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0;
 var $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0;
 var $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0;
 var $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0;
 var $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0;
 var $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0;
 var $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0;
 var $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0;
 var $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0;
 var $321 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0;
 var $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0;
 var $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0;
 var $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $K19$052 = 0, $R$0 = 0, $R$0$lcssa = 0, $R$1 = 0;
 var $R7$0 = 0, $R7$0$lcssa = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$lcssa = 0, $RP9$0 = 0, $RP9$0$lcssa = 0, $T$0$lcssa = 0, $T$051 = 0, $T$051$lcssa = 0, $cond = 0, $cond47 = 0, $not$ = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($mem|0)==(0|0);
 if ($0) {
  return;
 }
 $1 = ((($mem)) + -8|0);
 $2 = HEAP32[(2096)>>2]|0;
 $3 = ($1>>>0)<($2>>>0);
 if ($3) {
  _abort();
  // unreachable;
 }
 $4 = ((($mem)) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & 3;
 $7 = ($6|0)==(1);
 if ($7) {
  _abort();
  // unreachable;
 }
 $8 = $5 & -8;
 $$sum = (($8) + -8)|0;
 $9 = (($mem) + ($$sum)|0);
 $10 = $5 & 1;
 $11 = ($10|0)==(0);
 do {
  if ($11) {
   $12 = HEAP32[$1>>2]|0;
   $13 = ($6|0)==(0);
   if ($13) {
    return;
   }
   $$sum2 = (-8 - ($12))|0;
   $14 = (($mem) + ($$sum2)|0);
   $15 = (($12) + ($8))|0;
   $16 = ($14>>>0)<($2>>>0);
   if ($16) {
    _abort();
    // unreachable;
   }
   $17 = HEAP32[(2100)>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $$sum3 = (($8) + -4)|0;
    $103 = (($mem) + ($$sum3)|0);
    $104 = HEAP32[$103>>2]|0;
    $105 = $104 & 3;
    $106 = ($105|0)==(3);
    if (!($106)) {
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    HEAP32[(2088)>>2] = $15;
    $107 = $104 & -2;
    HEAP32[$103>>2] = $107;
    $108 = $15 | 1;
    $$sum20 = (($$sum2) + 4)|0;
    $109 = (($mem) + ($$sum20)|0);
    HEAP32[$109>>2] = $108;
    HEAP32[$9>>2] = $15;
    return;
   }
   $19 = $12 >>> 3;
   $20 = ($12>>>0)<(256);
   if ($20) {
    $$sum30 = (($$sum2) + 8)|0;
    $21 = (($mem) + ($$sum30)|0);
    $22 = HEAP32[$21>>2]|0;
    $$sum31 = (($$sum2) + 12)|0;
    $23 = (($mem) + ($$sum31)|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = $19 << 1;
    $26 = (2120 + ($25<<2)|0);
    $27 = ($22|0)==($26|0);
    if (!($27)) {
     $28 = ($22>>>0)<($2>>>0);
     if ($28) {
      _abort();
      // unreachable;
     }
     $29 = ((($22)) + 12|0);
     $30 = HEAP32[$29>>2]|0;
     $31 = ($30|0)==($14|0);
     if (!($31)) {
      _abort();
      // unreachable;
     }
    }
    $32 = ($24|0)==($22|0);
    if ($32) {
     $33 = 1 << $19;
     $34 = $33 ^ -1;
     $35 = HEAP32[2080>>2]|0;
     $36 = $35 & $34;
     HEAP32[2080>>2] = $36;
     $p$0 = $14;$psize$0 = $15;
     break;
    }
    $37 = ($24|0)==($26|0);
    if ($37) {
     $$pre60 = ((($24)) + 8|0);
     $$pre$phi61Z2D = $$pre60;
    } else {
     $38 = ($24>>>0)<($2>>>0);
     if ($38) {
      _abort();
      // unreachable;
     }
     $39 = ((($24)) + 8|0);
     $40 = HEAP32[$39>>2]|0;
     $41 = ($40|0)==($14|0);
     if ($41) {
      $$pre$phi61Z2D = $39;
     } else {
      _abort();
      // unreachable;
     }
    }
    $42 = ((($22)) + 12|0);
    HEAP32[$42>>2] = $24;
    HEAP32[$$pre$phi61Z2D>>2] = $22;
    $p$0 = $14;$psize$0 = $15;
    break;
   }
   $$sum22 = (($$sum2) + 24)|0;
   $43 = (($mem) + ($$sum22)|0);
   $44 = HEAP32[$43>>2]|0;
   $$sum23 = (($$sum2) + 12)|0;
   $45 = (($mem) + ($$sum23)|0);
   $46 = HEAP32[$45>>2]|0;
   $47 = ($46|0)==($14|0);
   do {
    if ($47) {
     $$sum25 = (($$sum2) + 20)|0;
     $57 = (($mem) + ($$sum25)|0);
     $58 = HEAP32[$57>>2]|0;
     $59 = ($58|0)==(0|0);
     if ($59) {
      $$sum24 = (($$sum2) + 16)|0;
      $60 = (($mem) + ($$sum24)|0);
      $61 = HEAP32[$60>>2]|0;
      $62 = ($61|0)==(0|0);
      if ($62) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $61;$RP$0 = $60;
      }
     } else {
      $R$0 = $58;$RP$0 = $57;
     }
     while(1) {
      $63 = ((($R$0)) + 20|0);
      $64 = HEAP32[$63>>2]|0;
      $65 = ($64|0)==(0|0);
      if (!($65)) {
       $R$0 = $64;$RP$0 = $63;
       continue;
      }
      $66 = ((($R$0)) + 16|0);
      $67 = HEAP32[$66>>2]|0;
      $68 = ($67|0)==(0|0);
      if ($68) {
       $R$0$lcssa = $R$0;$RP$0$lcssa = $RP$0;
       break;
      } else {
       $R$0 = $67;$RP$0 = $66;
      }
     }
     $69 = ($RP$0$lcssa>>>0)<($2>>>0);
     if ($69) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$RP$0$lcssa>>2] = 0;
      $R$1 = $R$0$lcssa;
      break;
     }
    } else {
     $$sum29 = (($$sum2) + 8)|0;
     $48 = (($mem) + ($$sum29)|0);
     $49 = HEAP32[$48>>2]|0;
     $50 = ($49>>>0)<($2>>>0);
     if ($50) {
      _abort();
      // unreachable;
     }
     $51 = ((($49)) + 12|0);
     $52 = HEAP32[$51>>2]|0;
     $53 = ($52|0)==($14|0);
     if (!($53)) {
      _abort();
      // unreachable;
     }
     $54 = ((($46)) + 8|0);
     $55 = HEAP32[$54>>2]|0;
     $56 = ($55|0)==($14|0);
     if ($56) {
      HEAP32[$51>>2] = $46;
      HEAP32[$54>>2] = $49;
      $R$1 = $46;
      break;
     } else {
      _abort();
      // unreachable;
     }
    }
   } while(0);
   $70 = ($44|0)==(0|0);
   if ($70) {
    $p$0 = $14;$psize$0 = $15;
   } else {
    $$sum26 = (($$sum2) + 28)|0;
    $71 = (($mem) + ($$sum26)|0);
    $72 = HEAP32[$71>>2]|0;
    $73 = (2384 + ($72<<2)|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($14|0)==($74|0);
    if ($75) {
     HEAP32[$73>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[(2084)>>2]|0;
      $79 = $78 & $77;
      HEAP32[(2084)>>2] = $79;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[(2096)>>2]|0;
     $81 = ($44>>>0)<($80>>>0);
     if ($81) {
      _abort();
      // unreachable;
     }
     $82 = ((($44)) + 16|0);
     $83 = HEAP32[$82>>2]|0;
     $84 = ($83|0)==($14|0);
     if ($84) {
      HEAP32[$82>>2] = $R$1;
     } else {
      $85 = ((($44)) + 20|0);
      HEAP32[$85>>2] = $R$1;
     }
     $86 = ($R$1|0)==(0|0);
     if ($86) {
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
    $87 = HEAP32[(2096)>>2]|0;
    $88 = ($R$1>>>0)<($87>>>0);
    if ($88) {
     _abort();
     // unreachable;
    }
    $89 = ((($R$1)) + 24|0);
    HEAP32[$89>>2] = $44;
    $$sum27 = (($$sum2) + 16)|0;
    $90 = (($mem) + ($$sum27)|0);
    $91 = HEAP32[$90>>2]|0;
    $92 = ($91|0)==(0|0);
    do {
     if (!($92)) {
      $93 = ($91>>>0)<($87>>>0);
      if ($93) {
       _abort();
       // unreachable;
      } else {
       $94 = ((($R$1)) + 16|0);
       HEAP32[$94>>2] = $91;
       $95 = ((($91)) + 24|0);
       HEAP32[$95>>2] = $R$1;
       break;
      }
     }
    } while(0);
    $$sum28 = (($$sum2) + 20)|0;
    $96 = (($mem) + ($$sum28)|0);
    $97 = HEAP32[$96>>2]|0;
    $98 = ($97|0)==(0|0);
    if ($98) {
     $p$0 = $14;$psize$0 = $15;
    } else {
     $99 = HEAP32[(2096)>>2]|0;
     $100 = ($97>>>0)<($99>>>0);
     if ($100) {
      _abort();
      // unreachable;
     } else {
      $101 = ((($R$1)) + 20|0);
      HEAP32[$101>>2] = $97;
      $102 = ((($97)) + 24|0);
      HEAP32[$102>>2] = $R$1;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    }
   }
  } else {
   $p$0 = $1;$psize$0 = $8;
  }
 } while(0);
 $110 = ($p$0>>>0)<($9>>>0);
 if (!($110)) {
  _abort();
  // unreachable;
 }
 $$sum19 = (($8) + -4)|0;
 $111 = (($mem) + ($$sum19)|0);
 $112 = HEAP32[$111>>2]|0;
 $113 = $112 & 1;
 $114 = ($113|0)==(0);
 if ($114) {
  _abort();
  // unreachable;
 }
 $115 = $112 & 2;
 $116 = ($115|0)==(0);
 if ($116) {
  $117 = HEAP32[(2104)>>2]|0;
  $118 = ($9|0)==($117|0);
  if ($118) {
   $119 = HEAP32[(2092)>>2]|0;
   $120 = (($119) + ($psize$0))|0;
   HEAP32[(2092)>>2] = $120;
   HEAP32[(2104)>>2] = $p$0;
   $121 = $120 | 1;
   $122 = ((($p$0)) + 4|0);
   HEAP32[$122>>2] = $121;
   $123 = HEAP32[(2100)>>2]|0;
   $124 = ($p$0|0)==($123|0);
   if (!($124)) {
    return;
   }
   HEAP32[(2100)>>2] = 0;
   HEAP32[(2088)>>2] = 0;
   return;
  }
  $125 = HEAP32[(2100)>>2]|0;
  $126 = ($9|0)==($125|0);
  if ($126) {
   $127 = HEAP32[(2088)>>2]|0;
   $128 = (($127) + ($psize$0))|0;
   HEAP32[(2088)>>2] = $128;
   HEAP32[(2100)>>2] = $p$0;
   $129 = $128 | 1;
   $130 = ((($p$0)) + 4|0);
   HEAP32[$130>>2] = $129;
   $131 = (($p$0) + ($128)|0);
   HEAP32[$131>>2] = $128;
   return;
  }
  $132 = $112 & -8;
  $133 = (($132) + ($psize$0))|0;
  $134 = $112 >>> 3;
  $135 = ($112>>>0)<(256);
  do {
   if ($135) {
    $136 = (($mem) + ($8)|0);
    $137 = HEAP32[$136>>2]|0;
    $$sum1718 = $8 | 4;
    $138 = (($mem) + ($$sum1718)|0);
    $139 = HEAP32[$138>>2]|0;
    $140 = $134 << 1;
    $141 = (2120 + ($140<<2)|0);
    $142 = ($137|0)==($141|0);
    if (!($142)) {
     $143 = HEAP32[(2096)>>2]|0;
     $144 = ($137>>>0)<($143>>>0);
     if ($144) {
      _abort();
      // unreachable;
     }
     $145 = ((($137)) + 12|0);
     $146 = HEAP32[$145>>2]|0;
     $147 = ($146|0)==($9|0);
     if (!($147)) {
      _abort();
      // unreachable;
     }
    }
    $148 = ($139|0)==($137|0);
    if ($148) {
     $149 = 1 << $134;
     $150 = $149 ^ -1;
     $151 = HEAP32[2080>>2]|0;
     $152 = $151 & $150;
     HEAP32[2080>>2] = $152;
     break;
    }
    $153 = ($139|0)==($141|0);
    if ($153) {
     $$pre58 = ((($139)) + 8|0);
     $$pre$phi59Z2D = $$pre58;
    } else {
     $154 = HEAP32[(2096)>>2]|0;
     $155 = ($139>>>0)<($154>>>0);
     if ($155) {
      _abort();
      // unreachable;
     }
     $156 = ((($139)) + 8|0);
     $157 = HEAP32[$156>>2]|0;
     $158 = ($157|0)==($9|0);
     if ($158) {
      $$pre$phi59Z2D = $156;
     } else {
      _abort();
      // unreachable;
     }
    }
    $159 = ((($137)) + 12|0);
    HEAP32[$159>>2] = $139;
    HEAP32[$$pre$phi59Z2D>>2] = $137;
   } else {
    $$sum5 = (($8) + 16)|0;
    $160 = (($mem) + ($$sum5)|0);
    $161 = HEAP32[$160>>2]|0;
    $$sum67 = $8 | 4;
    $162 = (($mem) + ($$sum67)|0);
    $163 = HEAP32[$162>>2]|0;
    $164 = ($163|0)==($9|0);
    do {
     if ($164) {
      $$sum9 = (($8) + 12)|0;
      $175 = (($mem) + ($$sum9)|0);
      $176 = HEAP32[$175>>2]|0;
      $177 = ($176|0)==(0|0);
      if ($177) {
       $$sum8 = (($8) + 8)|0;
       $178 = (($mem) + ($$sum8)|0);
       $179 = HEAP32[$178>>2]|0;
       $180 = ($179|0)==(0|0);
       if ($180) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $179;$RP9$0 = $178;
       }
      } else {
       $R7$0 = $176;$RP9$0 = $175;
      }
      while(1) {
       $181 = ((($R7$0)) + 20|0);
       $182 = HEAP32[$181>>2]|0;
       $183 = ($182|0)==(0|0);
       if (!($183)) {
        $R7$0 = $182;$RP9$0 = $181;
        continue;
       }
       $184 = ((($R7$0)) + 16|0);
       $185 = HEAP32[$184>>2]|0;
       $186 = ($185|0)==(0|0);
       if ($186) {
        $R7$0$lcssa = $R7$0;$RP9$0$lcssa = $RP9$0;
        break;
       } else {
        $R7$0 = $185;$RP9$0 = $184;
       }
      }
      $187 = HEAP32[(2096)>>2]|0;
      $188 = ($RP9$0$lcssa>>>0)<($187>>>0);
      if ($188) {
       _abort();
       // unreachable;
      } else {
       HEAP32[$RP9$0$lcssa>>2] = 0;
       $R7$1 = $R7$0$lcssa;
       break;
      }
     } else {
      $165 = (($mem) + ($8)|0);
      $166 = HEAP32[$165>>2]|0;
      $167 = HEAP32[(2096)>>2]|0;
      $168 = ($166>>>0)<($167>>>0);
      if ($168) {
       _abort();
       // unreachable;
      }
      $169 = ((($166)) + 12|0);
      $170 = HEAP32[$169>>2]|0;
      $171 = ($170|0)==($9|0);
      if (!($171)) {
       _abort();
       // unreachable;
      }
      $172 = ((($163)) + 8|0);
      $173 = HEAP32[$172>>2]|0;
      $174 = ($173|0)==($9|0);
      if ($174) {
       HEAP32[$169>>2] = $163;
       HEAP32[$172>>2] = $166;
       $R7$1 = $163;
       break;
      } else {
       _abort();
       // unreachable;
      }
     }
    } while(0);
    $189 = ($161|0)==(0|0);
    if (!($189)) {
     $$sum12 = (($8) + 20)|0;
     $190 = (($mem) + ($$sum12)|0);
     $191 = HEAP32[$190>>2]|0;
     $192 = (2384 + ($191<<2)|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = ($9|0)==($193|0);
     if ($194) {
      HEAP32[$192>>2] = $R7$1;
      $cond47 = ($R7$1|0)==(0|0);
      if ($cond47) {
       $195 = 1 << $191;
       $196 = $195 ^ -1;
       $197 = HEAP32[(2084)>>2]|0;
       $198 = $197 & $196;
       HEAP32[(2084)>>2] = $198;
       break;
      }
     } else {
      $199 = HEAP32[(2096)>>2]|0;
      $200 = ($161>>>0)<($199>>>0);
      if ($200) {
       _abort();
       // unreachable;
      }
      $201 = ((($161)) + 16|0);
      $202 = HEAP32[$201>>2]|0;
      $203 = ($202|0)==($9|0);
      if ($203) {
       HEAP32[$201>>2] = $R7$1;
      } else {
       $204 = ((($161)) + 20|0);
       HEAP32[$204>>2] = $R7$1;
      }
      $205 = ($R7$1|0)==(0|0);
      if ($205) {
       break;
      }
     }
     $206 = HEAP32[(2096)>>2]|0;
     $207 = ($R7$1>>>0)<($206>>>0);
     if ($207) {
      _abort();
      // unreachable;
     }
     $208 = ((($R7$1)) + 24|0);
     HEAP32[$208>>2] = $161;
     $$sum13 = (($8) + 8)|0;
     $209 = (($mem) + ($$sum13)|0);
     $210 = HEAP32[$209>>2]|0;
     $211 = ($210|0)==(0|0);
     do {
      if (!($211)) {
       $212 = ($210>>>0)<($206>>>0);
       if ($212) {
        _abort();
        // unreachable;
       } else {
        $213 = ((($R7$1)) + 16|0);
        HEAP32[$213>>2] = $210;
        $214 = ((($210)) + 24|0);
        HEAP32[$214>>2] = $R7$1;
        break;
       }
      }
     } while(0);
     $$sum14 = (($8) + 12)|0;
     $215 = (($mem) + ($$sum14)|0);
     $216 = HEAP32[$215>>2]|0;
     $217 = ($216|0)==(0|0);
     if (!($217)) {
      $218 = HEAP32[(2096)>>2]|0;
      $219 = ($216>>>0)<($218>>>0);
      if ($219) {
       _abort();
       // unreachable;
      } else {
       $220 = ((($R7$1)) + 20|0);
       HEAP32[$220>>2] = $216;
       $221 = ((($216)) + 24|0);
       HEAP32[$221>>2] = $R7$1;
       break;
      }
     }
    }
   }
  } while(0);
  $222 = $133 | 1;
  $223 = ((($p$0)) + 4|0);
  HEAP32[$223>>2] = $222;
  $224 = (($p$0) + ($133)|0);
  HEAP32[$224>>2] = $133;
  $225 = HEAP32[(2100)>>2]|0;
  $226 = ($p$0|0)==($225|0);
  if ($226) {
   HEAP32[(2088)>>2] = $133;
   return;
  } else {
   $psize$1 = $133;
  }
 } else {
  $227 = $112 & -2;
  HEAP32[$111>>2] = $227;
  $228 = $psize$0 | 1;
  $229 = ((($p$0)) + 4|0);
  HEAP32[$229>>2] = $228;
  $230 = (($p$0) + ($psize$0)|0);
  HEAP32[$230>>2] = $psize$0;
  $psize$1 = $psize$0;
 }
 $231 = $psize$1 >>> 3;
 $232 = ($psize$1>>>0)<(256);
 if ($232) {
  $233 = $231 << 1;
  $234 = (2120 + ($233<<2)|0);
  $235 = HEAP32[2080>>2]|0;
  $236 = 1 << $231;
  $237 = $235 & $236;
  $238 = ($237|0)==(0);
  if ($238) {
   $239 = $235 | $236;
   HEAP32[2080>>2] = $239;
   $$pre = (($233) + 2)|0;
   $$pre57 = (2120 + ($$pre<<2)|0);
   $$pre$phiZ2D = $$pre57;$F16$0 = $234;
  } else {
   $$sum11 = (($233) + 2)|0;
   $240 = (2120 + ($$sum11<<2)|0);
   $241 = HEAP32[$240>>2]|0;
   $242 = HEAP32[(2096)>>2]|0;
   $243 = ($241>>>0)<($242>>>0);
   if ($243) {
    _abort();
    // unreachable;
   } else {
    $$pre$phiZ2D = $240;$F16$0 = $241;
   }
  }
  HEAP32[$$pre$phiZ2D>>2] = $p$0;
  $244 = ((($F16$0)) + 12|0);
  HEAP32[$244>>2] = $p$0;
  $245 = ((($p$0)) + 8|0);
  HEAP32[$245>>2] = $F16$0;
  $246 = ((($p$0)) + 12|0);
  HEAP32[$246>>2] = $234;
  return;
 }
 $247 = $psize$1 >>> 8;
 $248 = ($247|0)==(0);
 if ($248) {
  $I18$0 = 0;
 } else {
  $249 = ($psize$1>>>0)>(16777215);
  if ($249) {
   $I18$0 = 31;
  } else {
   $250 = (($247) + 1048320)|0;
   $251 = $250 >>> 16;
   $252 = $251 & 8;
   $253 = $247 << $252;
   $254 = (($253) + 520192)|0;
   $255 = $254 >>> 16;
   $256 = $255 & 4;
   $257 = $256 | $252;
   $258 = $253 << $256;
   $259 = (($258) + 245760)|0;
   $260 = $259 >>> 16;
   $261 = $260 & 2;
   $262 = $257 | $261;
   $263 = (14 - ($262))|0;
   $264 = $258 << $261;
   $265 = $264 >>> 15;
   $266 = (($263) + ($265))|0;
   $267 = $266 << 1;
   $268 = (($266) + 7)|0;
   $269 = $psize$1 >>> $268;
   $270 = $269 & 1;
   $271 = $270 | $267;
   $I18$0 = $271;
  }
 }
 $272 = (2384 + ($I18$0<<2)|0);
 $273 = ((($p$0)) + 28|0);
 HEAP32[$273>>2] = $I18$0;
 $274 = ((($p$0)) + 16|0);
 $275 = ((($p$0)) + 20|0);
 HEAP32[$275>>2] = 0;
 HEAP32[$274>>2] = 0;
 $276 = HEAP32[(2084)>>2]|0;
 $277 = 1 << $I18$0;
 $278 = $276 & $277;
 $279 = ($278|0)==(0);
 L199: do {
  if ($279) {
   $280 = $276 | $277;
   HEAP32[(2084)>>2] = $280;
   HEAP32[$272>>2] = $p$0;
   $281 = ((($p$0)) + 24|0);
   HEAP32[$281>>2] = $272;
   $282 = ((($p$0)) + 12|0);
   HEAP32[$282>>2] = $p$0;
   $283 = ((($p$0)) + 8|0);
   HEAP32[$283>>2] = $p$0;
  } else {
   $284 = HEAP32[$272>>2]|0;
   $285 = ((($284)) + 4|0);
   $286 = HEAP32[$285>>2]|0;
   $287 = $286 & -8;
   $288 = ($287|0)==($psize$1|0);
   L202: do {
    if ($288) {
     $T$0$lcssa = $284;
    } else {
     $289 = ($I18$0|0)==(31);
     $290 = $I18$0 >>> 1;
     $291 = (25 - ($290))|0;
     $292 = $289 ? 0 : $291;
     $293 = $psize$1 << $292;
     $K19$052 = $293;$T$051 = $284;
     while(1) {
      $300 = $K19$052 >>> 31;
      $301 = (((($T$051)) + 16|0) + ($300<<2)|0);
      $296 = HEAP32[$301>>2]|0;
      $302 = ($296|0)==(0|0);
      if ($302) {
       $$lcssa = $301;$T$051$lcssa = $T$051;
       break;
      }
      $294 = $K19$052 << 1;
      $295 = ((($296)) + 4|0);
      $297 = HEAP32[$295>>2]|0;
      $298 = $297 & -8;
      $299 = ($298|0)==($psize$1|0);
      if ($299) {
       $T$0$lcssa = $296;
       break L202;
      } else {
       $K19$052 = $294;$T$051 = $296;
      }
     }
     $303 = HEAP32[(2096)>>2]|0;
     $304 = ($$lcssa>>>0)<($303>>>0);
     if ($304) {
      _abort();
      // unreachable;
     } else {
      HEAP32[$$lcssa>>2] = $p$0;
      $305 = ((($p$0)) + 24|0);
      HEAP32[$305>>2] = $T$051$lcssa;
      $306 = ((($p$0)) + 12|0);
      HEAP32[$306>>2] = $p$0;
      $307 = ((($p$0)) + 8|0);
      HEAP32[$307>>2] = $p$0;
      break L199;
     }
    }
   } while(0);
   $308 = ((($T$0$lcssa)) + 8|0);
   $309 = HEAP32[$308>>2]|0;
   $310 = HEAP32[(2096)>>2]|0;
   $311 = ($309>>>0)>=($310>>>0);
   $not$ = ($T$0$lcssa>>>0)>=($310>>>0);
   $312 = $311 & $not$;
   if ($312) {
    $313 = ((($309)) + 12|0);
    HEAP32[$313>>2] = $p$0;
    HEAP32[$308>>2] = $p$0;
    $314 = ((($p$0)) + 8|0);
    HEAP32[$314>>2] = $309;
    $315 = ((($p$0)) + 12|0);
    HEAP32[$315>>2] = $T$0$lcssa;
    $316 = ((($p$0)) + 24|0);
    HEAP32[$316>>2] = 0;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $317 = HEAP32[(2112)>>2]|0;
 $318 = (($317) + -1)|0;
 HEAP32[(2112)>>2] = $318;
 $319 = ($318|0)==(0);
 if ($319) {
  $sp$0$in$i = (2536);
 } else {
  return;
 }
 while(1) {
  $sp$0$i = HEAP32[$sp$0$in$i>>2]|0;
  $320 = ($sp$0$i|0)==(0|0);
  $321 = ((($sp$0$i)) + 8|0);
  if ($320) {
   break;
  } else {
   $sp$0$in$i = $321;
  }
 }
 HEAP32[(2112)>>2] = -1;
 return;
}
function _calloc($n_elements,$elem_size) {
 $n_elements = $n_elements|0;
 $elem_size = $elem_size|0;
 var $$ = 0, $0 = 0, $1 = 0, $10 = 0, $11 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $req$0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = ($n_elements|0)==(0);
 if ($0) {
  $req$0 = 0;
 } else {
  $1 = Math_imul($elem_size, $n_elements)|0;
  $2 = $elem_size | $n_elements;
  $3 = ($2>>>0)>(65535);
  if ($3) {
   $4 = (($1>>>0) / ($n_elements>>>0))&-1;
   $5 = ($4|0)==($elem_size|0);
   $$ = $5 ? $1 : -1;
   $req$0 = $$;
  } else {
   $req$0 = $1;
  }
 }
 $6 = (_malloc($req$0)|0);
 $7 = ($6|0)==(0|0);
 if ($7) {
  return ($6|0);
 }
 $8 = ((($6)) + -4|0);
 $9 = HEAP32[$8>>2]|0;
 $10 = $9 & 3;
 $11 = ($10|0)==(0);
 if ($11) {
  return ($6|0);
 }
 _memset(($6|0),0,($req$0|0))|0;
 return ($6|0);
}
function runPostSets() {

}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
}
function _strlen(ptr) {
    ptr = ptr|0;
    var curr = 0;
    curr = ptr;
    while (((HEAP8[((curr)>>0)])|0)) {
      curr = (curr + 1)|0;
    }
    return (curr - ptr)|0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
}
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
    stop = (ptr + num)|0;
    if ((num|0) >= 20) {
      // This is unaligned, but quite large, so work hard to get to aligned settings
      value = value & 0xff;
      unaligned = ptr & 3;
      value4 = value | (value << 8) | (value << 16) | (value << 24);
      stop4 = stop & ~3;
      if (unaligned) {
        unaligned = (ptr + 4 - unaligned)|0;
        while ((ptr|0) < (unaligned|0)) { // no need to check for stop, since we have large num
          HEAP8[((ptr)>>0)]=value;
          ptr = (ptr+1)|0;
        }
      }
      while ((ptr|0) < (stop4|0)) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    while ((ptr|0) < (stop|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (ptr-num)|0;
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    if ((num|0) >= 4096) return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    ret = dest|0;
    if ((dest&3) == (src&3)) {
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      while ((num|0) >= 4) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
        num = (num-4)|0;
      }
    }
    while ((num|0) > 0) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
      num = (num-1)|0;
    }
    return ret|0;
}
function _strcpy(pdest, psrc) {
    pdest = pdest|0; psrc = psrc|0;
    var i = 0;
    do {
      HEAP8[(((pdest+i)|0)>>0)]=HEAP8[(((psrc+i)|0)>>0)];
      i = (i+1)|0;
    } while (((HEAP8[(((psrc)+(i-1))>>0)])|0));
    return pdest|0;
}
function _bitshift64Ashr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = (high|0) < 0 ? -1 : 0;
    return (high >> (bits - 32))|0;
  }
function _llvm_cttz_i32(x) {
    x = x|0;
    var ret = 0;
    ret = ((HEAP8[(((cttz_i8)+(x & 0xff))>>0)])|0);
    if ((ret|0) < 8) return ret|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 8)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 8)|0;
    ret = ((HEAP8[(((cttz_i8)+((x >> 16)&0xff))>>0)])|0);
    if ((ret|0) < 8) return (ret + 16)|0;
    return (((HEAP8[(((cttz_i8)+(x >>> 24))>>0)])|0) + 24)|0;
  }

// ======== compiled code from system/lib/compiler-rt , see readme therein
function ___muldsi3($a, $b) {
  $a = $a | 0;
  $b = $b | 0;
  var $1 = 0, $2 = 0, $3 = 0, $6 = 0, $8 = 0, $11 = 0, $12 = 0;
  $1 = $a & 65535;
  $2 = $b & 65535;
  $3 = Math_imul($2, $1) | 0;
  $6 = $a >>> 16;
  $8 = ($3 >>> 16) + (Math_imul($2, $6) | 0) | 0;
  $11 = $b >>> 16;
  $12 = Math_imul($11, $1) | 0;
  return (tempRet0 = (($8 >>> 16) + (Math_imul($11, $6) | 0) | 0) + ((($8 & 65535) + $12 | 0) >>> 16) | 0, 0 | ($8 + $12 << 16 | $3 & 65535)) | 0;
}
function ___divdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $7$0 = 0, $7$1 = 0, $8$0 = 0, $10$0 = 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  $7$0 = $2$0 ^ $1$0;
  $7$1 = $2$1 ^ $1$1;
  $8$0 = ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, 0) | 0;
  $10$0 = _i64Subtract($8$0 ^ $7$0, tempRet0 ^ $7$1, $7$0, $7$1) | 0;
  return $10$0 | 0;
}
function ___remdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, $1$0 = 0, $1$1 = 0, $2$0 = 0, $2$1 = 0, $4$0 = 0, $4$1 = 0, $6$0 = 0, $10$0 = 0, $10$1 = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  $1$0 = $a$1 >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $1$1 = (($a$1 | 0) < 0 ? -1 : 0) >> 31 | (($a$1 | 0) < 0 ? -1 : 0) << 1;
  $2$0 = $b$1 >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $2$1 = (($b$1 | 0) < 0 ? -1 : 0) >> 31 | (($b$1 | 0) < 0 ? -1 : 0) << 1;
  $4$0 = _i64Subtract($1$0 ^ $a$0, $1$1 ^ $a$1, $1$0, $1$1) | 0;
  $4$1 = tempRet0;
  $6$0 = _i64Subtract($2$0 ^ $b$0, $2$1 ^ $b$1, $2$0, $2$1) | 0;
  ___udivmoddi4($4$0, $4$1, $6$0, tempRet0, $rem) | 0;
  $10$0 = _i64Subtract(HEAP32[$rem >> 2] ^ $1$0, HEAP32[$rem + 4 >> 2] ^ $1$1, $1$0, $1$1) | 0;
  $10$1 = tempRet0;
  STACKTOP = __stackBase__;
  return (tempRet0 = $10$1, $10$0) | 0;
}
function ___muldi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $x_sroa_0_0_extract_trunc = 0, $y_sroa_0_0_extract_trunc = 0, $1$0 = 0, $1$1 = 0, $2 = 0;
  $x_sroa_0_0_extract_trunc = $a$0;
  $y_sroa_0_0_extract_trunc = $b$0;
  $1$0 = ___muldsi3($x_sroa_0_0_extract_trunc, $y_sroa_0_0_extract_trunc) | 0;
  $1$1 = tempRet0;
  $2 = Math_imul($a$1, $y_sroa_0_0_extract_trunc) | 0;
  return (tempRet0 = ((Math_imul($b$1, $x_sroa_0_0_extract_trunc) | 0) + $2 | 0) + $1$1 | $1$1 & 0, 0 | $1$0 & -1) | 0;
}
function ___udivdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $1$0 = 0;
  $1$0 = ___udivmoddi4($a$0, $a$1, $b$0, $b$1, 0) | 0;
  return $1$0 | 0;
}
function ___uremdi3($a$0, $a$1, $b$0, $b$1) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  var $rem = 0, __stackBase__ = 0;
  __stackBase__ = STACKTOP;
  STACKTOP = STACKTOP + 8 | 0;
  $rem = __stackBase__ | 0;
  ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) | 0;
  STACKTOP = __stackBase__;
  return (tempRet0 = HEAP32[$rem + 4 >> 2] | 0, HEAP32[$rem >> 2] | 0) | 0;
}
function ___udivmoddi4($a$0, $a$1, $b$0, $b$1, $rem) {
  $a$0 = $a$0 | 0;
  $a$1 = $a$1 | 0;
  $b$0 = $b$0 | 0;
  $b$1 = $b$1 | 0;
  $rem = $rem | 0;
  var $n_sroa_0_0_extract_trunc = 0, $n_sroa_1_4_extract_shift$0 = 0, $n_sroa_1_4_extract_trunc = 0, $d_sroa_0_0_extract_trunc = 0, $d_sroa_1_4_extract_shift$0 = 0, $d_sroa_1_4_extract_trunc = 0, $4 = 0, $17 = 0, $37 = 0, $49 = 0, $51 = 0, $57 = 0, $58 = 0, $66 = 0, $78 = 0, $86 = 0, $88 = 0, $89 = 0, $91 = 0, $92 = 0, $95 = 0, $105 = 0, $117 = 0, $119 = 0, $125 = 0, $126 = 0, $130 = 0, $q_sroa_1_1_ph = 0, $q_sroa_0_1_ph = 0, $r_sroa_1_1_ph = 0, $r_sroa_0_1_ph = 0, $sr_1_ph = 0, $d_sroa_0_0_insert_insert99$0 = 0, $d_sroa_0_0_insert_insert99$1 = 0, $137$0 = 0, $137$1 = 0, $carry_0203 = 0, $sr_1202 = 0, $r_sroa_0_1201 = 0, $r_sroa_1_1200 = 0, $q_sroa_0_1199 = 0, $q_sroa_1_1198 = 0, $147 = 0, $149 = 0, $r_sroa_0_0_insert_insert42$0 = 0, $r_sroa_0_0_insert_insert42$1 = 0, $150$1 = 0, $151$0 = 0, $152 = 0, $154$0 = 0, $r_sroa_0_0_extract_trunc = 0, $r_sroa_1_4_extract_trunc = 0, $155 = 0, $carry_0_lcssa$0 = 0, $carry_0_lcssa$1 = 0, $r_sroa_0_1_lcssa = 0, $r_sroa_1_1_lcssa = 0, $q_sroa_0_1_lcssa = 0, $q_sroa_1_1_lcssa = 0, $q_sroa_0_0_insert_ext75$0 = 0, $q_sroa_0_0_insert_ext75$1 = 0, $q_sroa_0_0_insert_insert77$1 = 0, $_0$0 = 0, $_0$1 = 0;
  $n_sroa_0_0_extract_trunc = $a$0;
  $n_sroa_1_4_extract_shift$0 = $a$1;
  $n_sroa_1_4_extract_trunc = $n_sroa_1_4_extract_shift$0;
  $d_sroa_0_0_extract_trunc = $b$0;
  $d_sroa_1_4_extract_shift$0 = $b$1;
  $d_sroa_1_4_extract_trunc = $d_sroa_1_4_extract_shift$0;
  if (($n_sroa_1_4_extract_trunc | 0) == 0) {
    $4 = ($rem | 0) != 0;
    if (($d_sroa_1_4_extract_trunc | 0) == 0) {
      if ($4) {
        HEAP32[$rem >> 2] = ($n_sroa_0_0_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
        HEAP32[$rem + 4 >> 2] = 0;
      }
      $_0$1 = 0;
      $_0$0 = ($n_sroa_0_0_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$4) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    }
  }
  $17 = ($d_sroa_1_4_extract_trunc | 0) == 0;
  do {
    if (($d_sroa_0_0_extract_trunc | 0) == 0) {
      if ($17) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_0_0_extract_trunc >>> 0);
          HEAP32[$rem + 4 >> 2] = 0;
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_0_0_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      if (($n_sroa_0_0_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0;
          HEAP32[$rem + 4 >> 2] = ($n_sroa_1_4_extract_trunc >>> 0) % ($d_sroa_1_4_extract_trunc >>> 0);
        }
        $_0$1 = 0;
        $_0$0 = ($n_sroa_1_4_extract_trunc >>> 0) / ($d_sroa_1_4_extract_trunc >>> 0) >>> 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $37 = $d_sroa_1_4_extract_trunc - 1 | 0;
      if (($37 & $d_sroa_1_4_extract_trunc | 0) == 0) {
        if (($rem | 0) != 0) {
          HEAP32[$rem >> 2] = 0 | $a$0 & -1;
          HEAP32[$rem + 4 >> 2] = $37 & $n_sroa_1_4_extract_trunc | $a$1 & 0;
        }
        $_0$1 = 0;
        $_0$0 = $n_sroa_1_4_extract_trunc >>> ((_llvm_cttz_i32($d_sroa_1_4_extract_trunc | 0) | 0) >>> 0);
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $49 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
      $51 = $49 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
      if ($51 >>> 0 <= 30) {
        $57 = $51 + 1 | 0;
        $58 = 31 - $51 | 0;
        $sr_1_ph = $57;
        $r_sroa_0_1_ph = $n_sroa_1_4_extract_trunc << $58 | $n_sroa_0_0_extract_trunc >>> ($57 >>> 0);
        $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($57 >>> 0);
        $q_sroa_0_1_ph = 0;
        $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $58;
        break;
      }
      if (($rem | 0) == 0) {
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      HEAP32[$rem >> 2] = 0 | $a$0 & -1;
      HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
      $_0$1 = 0;
      $_0$0 = 0;
      return (tempRet0 = $_0$1, $_0$0) | 0;
    } else {
      if (!$17) {
        $117 = Math_clz32($d_sroa_1_4_extract_trunc | 0) | 0;
        $119 = $117 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        if ($119 >>> 0 <= 31) {
          $125 = $119 + 1 | 0;
          $126 = 31 - $119 | 0;
          $130 = $119 - 31 >> 31;
          $sr_1_ph = $125;
          $r_sroa_0_1_ph = $n_sroa_0_0_extract_trunc >>> ($125 >>> 0) & $130 | $n_sroa_1_4_extract_trunc << $126;
          $r_sroa_1_1_ph = $n_sroa_1_4_extract_trunc >>> ($125 >>> 0) & $130;
          $q_sroa_0_1_ph = 0;
          $q_sroa_1_1_ph = $n_sroa_0_0_extract_trunc << $126;
          break;
        }
        if (($rem | 0) == 0) {
          $_0$1 = 0;
          $_0$0 = 0;
          return (tempRet0 = $_0$1, $_0$0) | 0;
        }
        HEAP32[$rem >> 2] = 0 | $a$0 & -1;
        HEAP32[$rem + 4 >> 2] = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$1 = 0;
        $_0$0 = 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
      $66 = $d_sroa_0_0_extract_trunc - 1 | 0;
      if (($66 & $d_sroa_0_0_extract_trunc | 0) != 0) {
        $86 = (Math_clz32($d_sroa_0_0_extract_trunc | 0) | 0) + 33 | 0;
        $88 = $86 - (Math_clz32($n_sroa_1_4_extract_trunc | 0) | 0) | 0;
        $89 = 64 - $88 | 0;
        $91 = 32 - $88 | 0;
        $92 = $91 >> 31;
        $95 = $88 - 32 | 0;
        $105 = $95 >> 31;
        $sr_1_ph = $88;
        $r_sroa_0_1_ph = $91 - 1 >> 31 & $n_sroa_1_4_extract_trunc >>> ($95 >>> 0) | ($n_sroa_1_4_extract_trunc << $91 | $n_sroa_0_0_extract_trunc >>> ($88 >>> 0)) & $105;
        $r_sroa_1_1_ph = $105 & $n_sroa_1_4_extract_trunc >>> ($88 >>> 0);
        $q_sroa_0_1_ph = $n_sroa_0_0_extract_trunc << $89 & $92;
        $q_sroa_1_1_ph = ($n_sroa_1_4_extract_trunc << $89 | $n_sroa_0_0_extract_trunc >>> ($95 >>> 0)) & $92 | $n_sroa_0_0_extract_trunc << $91 & $88 - 33 >> 31;
        break;
      }
      if (($rem | 0) != 0) {
        HEAP32[$rem >> 2] = $66 & $n_sroa_0_0_extract_trunc;
        HEAP32[$rem + 4 >> 2] = 0;
      }
      if (($d_sroa_0_0_extract_trunc | 0) == 1) {
        $_0$1 = $n_sroa_1_4_extract_shift$0 | $a$1 & 0;
        $_0$0 = 0 | $a$0 & -1;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      } else {
        $78 = _llvm_cttz_i32($d_sroa_0_0_extract_trunc | 0) | 0;
        $_0$1 = 0 | $n_sroa_1_4_extract_trunc >>> ($78 >>> 0);
        $_0$0 = $n_sroa_1_4_extract_trunc << 32 - $78 | $n_sroa_0_0_extract_trunc >>> ($78 >>> 0) | 0;
        return (tempRet0 = $_0$1, $_0$0) | 0;
      }
    }
  } while (0);
  if (($sr_1_ph | 0) == 0) {
    $q_sroa_1_1_lcssa = $q_sroa_1_1_ph;
    $q_sroa_0_1_lcssa = $q_sroa_0_1_ph;
    $r_sroa_1_1_lcssa = $r_sroa_1_1_ph;
    $r_sroa_0_1_lcssa = $r_sroa_0_1_ph;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = 0;
  } else {
    $d_sroa_0_0_insert_insert99$0 = 0 | $b$0 & -1;
    $d_sroa_0_0_insert_insert99$1 = $d_sroa_1_4_extract_shift$0 | $b$1 & 0;
    $137$0 = _i64Add($d_sroa_0_0_insert_insert99$0 | 0, $d_sroa_0_0_insert_insert99$1 | 0, -1, -1) | 0;
    $137$1 = tempRet0;
    $q_sroa_1_1198 = $q_sroa_1_1_ph;
    $q_sroa_0_1199 = $q_sroa_0_1_ph;
    $r_sroa_1_1200 = $r_sroa_1_1_ph;
    $r_sroa_0_1201 = $r_sroa_0_1_ph;
    $sr_1202 = $sr_1_ph;
    $carry_0203 = 0;
    while (1) {
      $147 = $q_sroa_0_1199 >>> 31 | $q_sroa_1_1198 << 1;
      $149 = $carry_0203 | $q_sroa_0_1199 << 1;
      $r_sroa_0_0_insert_insert42$0 = 0 | ($r_sroa_0_1201 << 1 | $q_sroa_1_1198 >>> 31);
      $r_sroa_0_0_insert_insert42$1 = $r_sroa_0_1201 >>> 31 | $r_sroa_1_1200 << 1 | 0;
      _i64Subtract($137$0, $137$1, $r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1) | 0;
      $150$1 = tempRet0;
      $151$0 = $150$1 >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1;
      $152 = $151$0 & 1;
      $154$0 = _i64Subtract($r_sroa_0_0_insert_insert42$0, $r_sroa_0_0_insert_insert42$1, $151$0 & $d_sroa_0_0_insert_insert99$0, ((($150$1 | 0) < 0 ? -1 : 0) >> 31 | (($150$1 | 0) < 0 ? -1 : 0) << 1) & $d_sroa_0_0_insert_insert99$1) | 0;
      $r_sroa_0_0_extract_trunc = $154$0;
      $r_sroa_1_4_extract_trunc = tempRet0;
      $155 = $sr_1202 - 1 | 0;
      if (($155 | 0) == 0) {
        break;
      } else {
        $q_sroa_1_1198 = $147;
        $q_sroa_0_1199 = $149;
        $r_sroa_1_1200 = $r_sroa_1_4_extract_trunc;
        $r_sroa_0_1201 = $r_sroa_0_0_extract_trunc;
        $sr_1202 = $155;
        $carry_0203 = $152;
      }
    }
    $q_sroa_1_1_lcssa = $147;
    $q_sroa_0_1_lcssa = $149;
    $r_sroa_1_1_lcssa = $r_sroa_1_4_extract_trunc;
    $r_sroa_0_1_lcssa = $r_sroa_0_0_extract_trunc;
    $carry_0_lcssa$1 = 0;
    $carry_0_lcssa$0 = $152;
  }
  $q_sroa_0_0_insert_ext75$0 = $q_sroa_0_1_lcssa;
  $q_sroa_0_0_insert_ext75$1 = 0;
  $q_sroa_0_0_insert_insert77$1 = $q_sroa_1_1_lcssa | $q_sroa_0_0_insert_ext75$1;
  if (($rem | 0) != 0) {
    HEAP32[$rem >> 2] = 0 | $r_sroa_0_1_lcssa;
    HEAP32[$rem + 4 >> 2] = $r_sroa_1_1_lcssa | 0;
  }
  $_0$1 = (0 | $q_sroa_0_0_insert_ext75$0) >>> 31 | $q_sroa_0_0_insert_insert77$1 << 1 | ($q_sroa_0_0_insert_ext75$1 << 1 | $q_sroa_0_0_insert_ext75$0 >>> 31) & 0 | $carry_0_lcssa$1;
  $_0$0 = ($q_sroa_0_0_insert_ext75$0 << 1 | 0 >>> 31) & -2 | $carry_0_lcssa$0;
  return (tempRet0 = $_0$1, $_0$0) | 0;
}
// =======================================================================



  
function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return FUNCTION_TABLE_iiii[index&3](a1|0,a2|0,a3|0)|0;
}


function dynCall_dd(index,a1) {
  index = index|0;
  a1=+a1;
  return +FUNCTION_TABLE_dd[index&1](+a1);
}


function dynCall_vii(index,a1,a2) {
  index = index|0;
  a1=a1|0; a2=a2|0;
  FUNCTION_TABLE_vii[index&3](a1|0,a2|0);
}


function dynCall_di(index,a1) {
  index = index|0;
  a1=a1|0;
  return +FUNCTION_TABLE_di[index&1](a1|0);
}

function b0(p0,p1,p2) { p0 = p0|0;p1 = p1|0;p2 = p2|0; abort(0);return 0; }
function b1(p0) { p0 = +p0; abort(1);return +0; }
function b2(p0,p1) { p0 = p0|0;p1 = p1|0; abort(2); }
function b3(p0) { p0 = p0|0; abort(3);return +0; }

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_iiii = [b0,_sn_write,_default_alloc,b0];
var FUNCTION_TABLE_dd = [b1,_f1dim];
var FUNCTION_TABLE_vii = [b2,_calcGradient,_default_free,b2];
var FUNCTION_TABLE_di = [b3,_calcFunction];

  return { _i64Subtract: _i64Subtract, _free: _free, _i64Add: _i64Add, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _strlen: _strlen, _bitshift64Lshr: _bitshift64Lshr, _strcpy: _strcpy, _minimize: _minimize, _bitshift64Shl: _bitshift64Shl, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_iiii: dynCall_iiii, dynCall_dd: dynCall_dd, dynCall_vii: dynCall_vii, dynCall_di: dynCall_di };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _free = Module["_free"] = asm["_free"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _minimize = Module["_minimize"] = asm["_minimize"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_dd = Module["dynCall_dd"] = asm["dynCall_dd"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_di = Module["dynCall_di"] = asm["dynCall_di"];
;

Runtime.stackAlloc = asm['stackAlloc'];
Runtime.stackSave = asm['stackSave'];
Runtime.stackRestore = asm['stackRestore'];
Runtime.establishStackSpace = asm['establishStackSpace'];

Runtime.setTempRet0 = asm['setTempRet0'];
Runtime.getTempRet0 = asm['getTempRet0'];


// TODO: strip out parts of this we do not need

//======= begin closure i64 code =======

// Copyright 2009 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Defines a Long class for representing a 64-bit two's-complement
 * integer value, which faithfully simulates the behavior of a Java "long". This
 * implementation is derived from LongLib in GWT.
 *
 */

var i64Math = (function() { // Emscripten wrapper
  var goog = { math: {} };


  /**
   * Constructs a 64-bit two's-complement integer, given its low and high 32-bit
   * values as *signed* integers.  See the from* functions below for more
   * convenient ways of constructing Longs.
   *
   * The internal representation of a long is the two given signed, 32-bit values.
   * We use 32-bit pieces because these are the size of integers on which
   * Javascript performs bit-operations.  For operations like addition and
   * multiplication, we split each number into 16-bit pieces, which can easily be
   * multiplied within Javascript's floating-point representation without overflow
   * or change in sign.
   *
   * In the algorithms below, we frequently reduce the negative case to the
   * positive case by negating the input(s) and then post-processing the result.
   * Note that we must ALWAYS check specially whether those values are MIN_VALUE
   * (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
   * a positive number, it overflows back into a negative).  Not handling this
   * case would often result in infinite recursion.
   *
   * @param {number} low  The low (signed) 32 bits of the long.
   * @param {number} high  The high (signed) 32 bits of the long.
   * @constructor
   */
  goog.math.Long = function(low, high) {
    /**
     * @type {number}
     * @private
     */
    this.low_ = low | 0;  // force into 32 signed bits.

    /**
     * @type {number}
     * @private
     */
    this.high_ = high | 0;  // force into 32 signed bits.
  };


  // NOTE: Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the
  // from* methods on which they depend.


  /**
   * A cache of the Long representations of small integer values.
   * @type {!Object}
   * @private
   */
  goog.math.Long.IntCache_ = {};


  /**
   * Returns a Long representing the given (32-bit) integer value.
   * @param {number} value The 32-bit integer in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromInt = function(value) {
    if (-128 <= value && value < 128) {
      var cachedObj = goog.math.Long.IntCache_[value];
      if (cachedObj) {
        return cachedObj;
      }
    }

    var obj = new goog.math.Long(value | 0, value < 0 ? -1 : 0);
    if (-128 <= value && value < 128) {
      goog.math.Long.IntCache_[value] = obj;
    }
    return obj;
  };


  /**
   * Returns a Long representing the given value, provided that it is a finite
   * number.  Otherwise, zero is returned.
   * @param {number} value The number in question.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromNumber = function(value) {
    if (isNaN(value) || !isFinite(value)) {
      return goog.math.Long.ZERO;
    } else if (value <= -goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MIN_VALUE;
    } else if (value + 1 >= goog.math.Long.TWO_PWR_63_DBL_) {
      return goog.math.Long.MAX_VALUE;
    } else if (value < 0) {
      return goog.math.Long.fromNumber(-value).negate();
    } else {
      return new goog.math.Long(
          (value % goog.math.Long.TWO_PWR_32_DBL_) | 0,
          (value / goog.math.Long.TWO_PWR_32_DBL_) | 0);
    }
  };


  /**
   * Returns a Long representing the 64-bit integer that comes by concatenating
   * the given high and low bits.  Each is assumed to use 32 bits.
   * @param {number} lowBits The low 32-bits.
   * @param {number} highBits The high 32-bits.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromBits = function(lowBits, highBits) {
    return new goog.math.Long(lowBits, highBits);
  };


  /**
   * Returns a Long representation of the given string, written using the given
   * radix.
   * @param {string} str The textual representation of the Long.
   * @param {number=} opt_radix The radix in which the text is written.
   * @return {!goog.math.Long} The corresponding Long value.
   */
  goog.math.Long.fromString = function(str, opt_radix) {
    if (str.length == 0) {
      throw Error('number format error: empty string');
    }

    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (str.charAt(0) == '-') {
      return goog.math.Long.fromString(str.substring(1), radix).negate();
    } else if (str.indexOf('-') >= 0) {
      throw Error('number format error: interior "-" character: ' + str);
    }

    // Do several (8) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 8));

    var result = goog.math.Long.ZERO;
    for (var i = 0; i < str.length; i += 8) {
      var size = Math.min(8, str.length - i);
      var value = parseInt(str.substring(i, i + size), radix);
      if (size < 8) {
        var power = goog.math.Long.fromNumber(Math.pow(radix, size));
        result = result.multiply(power).add(goog.math.Long.fromNumber(value));
      } else {
        result = result.multiply(radixToPower);
        result = result.add(goog.math.Long.fromNumber(value));
      }
    }
    return result;
  };


  // NOTE: the compiler should inline these constant values below and then remove
  // these variables, so there should be no runtime penalty for these.


  /**
   * Number used repeated below in calculations.  This must appear before the
   * first call to any from* function below.
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_16_DBL_ = 1 << 16;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_32_DBL_ =
      goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_31_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ / 2;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_48_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_64_DBL_ =
      goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_;


  /**
   * @type {number}
   * @private
   */
  goog.math.Long.TWO_PWR_63_DBL_ =
      goog.math.Long.TWO_PWR_64_DBL_ / 2;


  /** @type {!goog.math.Long} */
  goog.math.Long.ZERO = goog.math.Long.fromInt(0);


  /** @type {!goog.math.Long} */
  goog.math.Long.ONE = goog.math.Long.fromInt(1);


  /** @type {!goog.math.Long} */
  goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1);


  /** @type {!goog.math.Long} */
  goog.math.Long.MAX_VALUE =
      goog.math.Long.fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0);


  /** @type {!goog.math.Long} */
  goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, 0x80000000 | 0);


  /**
   * @type {!goog.math.Long}
   * @private
   */
  goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24);


  /** @return {number} The value, assuming it is a 32-bit integer. */
  goog.math.Long.prototype.toInt = function() {
    return this.low_;
  };


  /** @return {number} The closest floating-point representation to this value. */
  goog.math.Long.prototype.toNumber = function() {
    return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ +
           this.getLowBitsUnsigned();
  };


  /**
   * @param {number=} opt_radix The radix in which the text should be written.
   * @return {string} The textual representation of this value.
   */
  goog.math.Long.prototype.toString = function(opt_radix) {
    var radix = opt_radix || 10;
    if (radix < 2 || 36 < radix) {
      throw Error('radix out of range: ' + radix);
    }

    if (this.isZero()) {
      return '0';
    }

    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        // We need to change the Long value before it can be negated, so we remove
        // the bottom-most digit in this base and then recurse to do the rest.
        var radixLong = goog.math.Long.fromNumber(radix);
        var div = this.div(radixLong);
        var rem = div.multiply(radixLong).subtract(this);
        return div.toString(radix) + rem.toInt().toString(radix);
      } else {
        return '-' + this.negate().toString(radix);
      }
    }

    // Do several (6) digits each time through the loop, so as to
    // minimize the calls to the very expensive emulated div.
    var radixToPower = goog.math.Long.fromNumber(Math.pow(radix, 6));

    var rem = this;
    var result = '';
    while (true) {
      var remDiv = rem.div(radixToPower);
      var intval = rem.subtract(remDiv.multiply(radixToPower)).toInt();
      var digits = intval.toString(radix);

      rem = remDiv;
      if (rem.isZero()) {
        return digits + result;
      } else {
        while (digits.length < 6) {
          digits = '0' + digits;
        }
        result = '' + digits + result;
      }
    }
  };


  /** @return {number} The high 32-bits as a signed value. */
  goog.math.Long.prototype.getHighBits = function() {
    return this.high_;
  };


  /** @return {number} The low 32-bits as a signed value. */
  goog.math.Long.prototype.getLowBits = function() {
    return this.low_;
  };


  /** @return {number} The low 32-bits as an unsigned value. */
  goog.math.Long.prototype.getLowBitsUnsigned = function() {
    return (this.low_ >= 0) ?
        this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_;
  };


  /**
   * @return {number} Returns the number of bits needed to represent the absolute
   *     value of this Long.
   */
  goog.math.Long.prototype.getNumBitsAbs = function() {
    if (this.isNegative()) {
      if (this.equals(goog.math.Long.MIN_VALUE)) {
        return 64;
      } else {
        return this.negate().getNumBitsAbs();
      }
    } else {
      var val = this.high_ != 0 ? this.high_ : this.low_;
      for (var bit = 31; bit > 0; bit--) {
        if ((val & (1 << bit)) != 0) {
          break;
        }
      }
      return this.high_ != 0 ? bit + 33 : bit + 1;
    }
  };


  /** @return {boolean} Whether this value is zero. */
  goog.math.Long.prototype.isZero = function() {
    return this.high_ == 0 && this.low_ == 0;
  };


  /** @return {boolean} Whether this value is negative. */
  goog.math.Long.prototype.isNegative = function() {
    return this.high_ < 0;
  };


  /** @return {boolean} Whether this value is odd. */
  goog.math.Long.prototype.isOdd = function() {
    return (this.low_ & 1) == 1;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long equals the other.
   */
  goog.math.Long.prototype.equals = function(other) {
    return (this.high_ == other.high_) && (this.low_ == other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long does not equal the other.
   */
  goog.math.Long.prototype.notEquals = function(other) {
    return (this.high_ != other.high_) || (this.low_ != other.low_);
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than the other.
   */
  goog.math.Long.prototype.lessThan = function(other) {
    return this.compare(other) < 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is less than or equal to the other.
   */
  goog.math.Long.prototype.lessThanOrEqual = function(other) {
    return this.compare(other) <= 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than the other.
   */
  goog.math.Long.prototype.greaterThan = function(other) {
    return this.compare(other) > 0;
  };


  /**
   * @param {goog.math.Long} other Long to compare against.
   * @return {boolean} Whether this Long is greater than or equal to the other.
   */
  goog.math.Long.prototype.greaterThanOrEqual = function(other) {
    return this.compare(other) >= 0;
  };


  /**
   * Compares this Long with the given one.
   * @param {goog.math.Long} other Long to compare against.
   * @return {number} 0 if they are the same, 1 if the this is greater, and -1
   *     if the given one is greater.
   */
  goog.math.Long.prototype.compare = function(other) {
    if (this.equals(other)) {
      return 0;
    }

    var thisNeg = this.isNegative();
    var otherNeg = other.isNegative();
    if (thisNeg && !otherNeg) {
      return -1;
    }
    if (!thisNeg && otherNeg) {
      return 1;
    }

    // at this point, the signs are the same, so subtraction will not overflow
    if (this.subtract(other).isNegative()) {
      return -1;
    } else {
      return 1;
    }
  };


  /** @return {!goog.math.Long} The negation of this value. */
  goog.math.Long.prototype.negate = function() {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.MIN_VALUE;
    } else {
      return this.not().add(goog.math.Long.ONE);
    }
  };


  /**
   * Returns the sum of this and the given Long.
   * @param {goog.math.Long} other Long to add to this one.
   * @return {!goog.math.Long} The sum of this and the given Long.
   */
  goog.math.Long.prototype.add = function(other) {
    // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 + b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 + b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 + b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 + b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns the difference of this and the given Long.
   * @param {goog.math.Long} other Long to subtract from this.
   * @return {!goog.math.Long} The difference of this and the given Long.
   */
  goog.math.Long.prototype.subtract = function(other) {
    return this.add(other.negate());
  };


  /**
   * Returns the product of this and the given long.
   * @param {goog.math.Long} other Long to multiply with this.
   * @return {!goog.math.Long} The product of this and the other.
   */
  goog.math.Long.prototype.multiply = function(other) {
    if (this.isZero()) {
      return goog.math.Long.ZERO;
    } else if (other.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      return other.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().multiply(other.negate());
      } else {
        return this.negate().multiply(other).negate();
      }
    } else if (other.isNegative()) {
      return this.multiply(other.negate()).negate();
    }

    // If both longs are small, use float multiplication
    if (this.lessThan(goog.math.Long.TWO_PWR_24_) &&
        other.lessThan(goog.math.Long.TWO_PWR_24_)) {
      return goog.math.Long.fromNumber(this.toNumber() * other.toNumber());
    }

    // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
    // We can skip products that would overflow.

    var a48 = this.high_ >>> 16;
    var a32 = this.high_ & 0xFFFF;
    var a16 = this.low_ >>> 16;
    var a00 = this.low_ & 0xFFFF;

    var b48 = other.high_ >>> 16;
    var b32 = other.high_ & 0xFFFF;
    var b16 = other.low_ >>> 16;
    var b00 = other.low_ & 0xFFFF;

    var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xFFFF;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xFFFF;
    c32 += a32 * b00;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c32 += a00 * b32;
    c48 += c32 >>> 16;
    c32 &= 0xFFFF;
    c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
    c48 &= 0xFFFF;
    return goog.math.Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32);
  };


  /**
   * Returns this Long divided by the given one.
   * @param {goog.math.Long} other Long by which to divide.
   * @return {!goog.math.Long} This Long divided by the given one.
   */
  goog.math.Long.prototype.div = function(other) {
    if (other.isZero()) {
      throw Error('division by zero');
    } else if (this.isZero()) {
      return goog.math.Long.ZERO;
    }

    if (this.equals(goog.math.Long.MIN_VALUE)) {
      if (other.equals(goog.math.Long.ONE) ||
          other.equals(goog.math.Long.NEG_ONE)) {
        return goog.math.Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
      } else if (other.equals(goog.math.Long.MIN_VALUE)) {
        return goog.math.Long.ONE;
      } else {
        // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
        var halfThis = this.shiftRight(1);
        var approx = halfThis.div(other).shiftLeft(1);
        if (approx.equals(goog.math.Long.ZERO)) {
          return other.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
        } else {
          var rem = this.subtract(other.multiply(approx));
          var result = approx.add(rem.div(other));
          return result;
        }
      }
    } else if (other.equals(goog.math.Long.MIN_VALUE)) {
      return goog.math.Long.ZERO;
    }

    if (this.isNegative()) {
      if (other.isNegative()) {
        return this.negate().div(other.negate());
      } else {
        return this.negate().div(other).negate();
      }
    } else if (other.isNegative()) {
      return this.div(other.negate()).negate();
    }

    // Repeat the following until the remainder is less than other:  find a
    // floating-point that approximates remainder / other *from below*, add this
    // into the result, and subtract it from the remainder.  It is critical that
    // the approximate value is less than or equal to the real value so that the
    // remainder never becomes negative.
    var res = goog.math.Long.ZERO;
    var rem = this;
    while (rem.greaterThanOrEqual(other)) {
      // Approximate the result of division. This may be a little greater or
      // smaller than the actual value.
      var approx = Math.max(1, Math.floor(rem.toNumber() / other.toNumber()));

      // We will tweak the approximate result by changing it in the 48-th digit or
      // the smallest non-fractional digit, whichever is larger.
      var log2 = Math.ceil(Math.log(approx) / Math.LN2);
      var delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48);

      // Decrease the approximation until it is smaller than the remainder.  Note
      // that if it is too large, the product overflows and is negative.
      var approxRes = goog.math.Long.fromNumber(approx);
      var approxRem = approxRes.multiply(other);
      while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
        approx -= delta;
        approxRes = goog.math.Long.fromNumber(approx);
        approxRem = approxRes.multiply(other);
      }

      // We know the answer can't be zero... and actually, zero would cause
      // infinite recursion since we would make no progress.
      if (approxRes.isZero()) {
        approxRes = goog.math.Long.ONE;
      }

      res = res.add(approxRes);
      rem = rem.subtract(approxRem);
    }
    return res;
  };


  /**
   * Returns this Long modulo the given one.
   * @param {goog.math.Long} other Long by which to mod.
   * @return {!goog.math.Long} This Long modulo the given one.
   */
  goog.math.Long.prototype.modulo = function(other) {
    return this.subtract(this.div(other).multiply(other));
  };


  /** @return {!goog.math.Long} The bitwise-NOT of this value. */
  goog.math.Long.prototype.not = function() {
    return goog.math.Long.fromBits(~this.low_, ~this.high_);
  };


  /**
   * Returns the bitwise-AND of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to AND.
   * @return {!goog.math.Long} The bitwise-AND of this and the other.
   */
  goog.math.Long.prototype.and = function(other) {
    return goog.math.Long.fromBits(this.low_ & other.low_,
                                   this.high_ & other.high_);
  };


  /**
   * Returns the bitwise-OR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to OR.
   * @return {!goog.math.Long} The bitwise-OR of this and the other.
   */
  goog.math.Long.prototype.or = function(other) {
    return goog.math.Long.fromBits(this.low_ | other.low_,
                                   this.high_ | other.high_);
  };


  /**
   * Returns the bitwise-XOR of this Long and the given one.
   * @param {goog.math.Long} other The Long with which to XOR.
   * @return {!goog.math.Long} The bitwise-XOR of this and the other.
   */
  goog.math.Long.prototype.xor = function(other) {
    return goog.math.Long.fromBits(this.low_ ^ other.low_,
                                   this.high_ ^ other.high_);
  };


  /**
   * Returns this Long with bits shifted to the left by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the left by the given amount.
   */
  goog.math.Long.prototype.shiftLeft = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var low = this.low_;
      if (numBits < 32) {
        var high = this.high_;
        return goog.math.Long.fromBits(
            low << numBits,
            (high << numBits) | (low >>> (32 - numBits)));
      } else {
        return goog.math.Long.fromBits(0, low << (numBits - 32));
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount.
   */
  goog.math.Long.prototype.shiftRight = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >> numBits);
      } else {
        return goog.math.Long.fromBits(
            high >> (numBits - 32),
            high >= 0 ? 0 : -1);
      }
    }
  };


  /**
   * Returns this Long with bits shifted to the right by the given amount, with
   * the new top bits matching the current sign bit.
   * @param {number} numBits The number of bits by which to shift.
   * @return {!goog.math.Long} This shifted to the right by the given amount, with
   *     zeros placed into the new leading bits.
   */
  goog.math.Long.prototype.shiftRightUnsigned = function(numBits) {
    numBits &= 63;
    if (numBits == 0) {
      return this;
    } else {
      var high = this.high_;
      if (numBits < 32) {
        var low = this.low_;
        return goog.math.Long.fromBits(
            (low >>> numBits) | (high << (32 - numBits)),
            high >>> numBits);
      } else if (numBits == 32) {
        return goog.math.Long.fromBits(high, 0);
      } else {
        return goog.math.Long.fromBits(high >>> (numBits - 32), 0);
      }
    }
  };

  //======= begin jsbn =======

  var navigator = { appName: 'Modern Browser' }; // polyfill a little

  // Copyright (c) 2005  Tom Wu
  // All Rights Reserved.
  // http://www-cs-students.stanford.edu/~tjw/jsbn/

  /*
   * Copyright (c) 2003-2005  Tom Wu
   * All Rights Reserved.
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
   * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
   * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
   *
   * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
   * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
   * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
   * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
   * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
   *
   * In addition, the following condition applies:
   *
   * All redistributions must retain an intact copy of this copyright notice
   * and disclaimer.
   */

  // Basic JavaScript BN library - subset useful for RSA encryption.

  // Bits per digit
  var dbits;

  // JavaScript engine analysis
  var canary = 0xdeadbeefcafe;
  var j_lm = ((canary&0xffffff)==0xefcafe);

  // (public) Constructor
  function BigInteger(a,b,c) {
    if(a != null)
      if("number" == typeof a) this.fromNumber(a,b,c);
      else if(b == null && "string" != typeof a) this.fromString(a,256);
      else this.fromString(a,b);
  }

  // return new, unset BigInteger
  function nbi() { return new BigInteger(null); }

  // am: Compute w_j += (x*this_i), propagate carries,
  // c is initial carry, returns final carry.
  // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
  // We need to select the fastest one that works in this environment.

  // am1: use a single mult and divide to get the high bits,
  // max digit bits should be 26 because
  // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
  function am1(i,x,w,j,c,n) {
    while(--n >= 0) {
      var v = x*this[i++]+w[j]+c;
      c = Math.floor(v/0x4000000);
      w[j++] = v&0x3ffffff;
    }
    return c;
  }
  // am2 avoids a big mult-and-extract completely.
  // Max digit bits should be <= 30 because we do bitwise ops
  // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
  function am2(i,x,w,j,c,n) {
    var xl = x&0x7fff, xh = x>>15;
    while(--n >= 0) {
      var l = this[i]&0x7fff;
      var h = this[i++]>>15;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
      c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
      w[j++] = l&0x3fffffff;
    }
    return c;
  }
  // Alternately, set max digit bits to 28 since some
  // browsers slow down when dealing with 32-bit numbers.
  function am3(i,x,w,j,c,n) {
    var xl = x&0x3fff, xh = x>>14;
    while(--n >= 0) {
      var l = this[i]&0x3fff;
      var h = this[i++]>>14;
      var m = xh*l+h*xl;
      l = xl*l+((m&0x3fff)<<14)+w[j]+c;
      c = (l>>28)+(m>>14)+xh*h;
      w[j++] = l&0xfffffff;
    }
    return c;
  }
  if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
    BigInteger.prototype.am = am2;
    dbits = 30;
  }
  else if(j_lm && (navigator.appName != "Netscape")) {
    BigInteger.prototype.am = am1;
    dbits = 26;
  }
  else { // Mozilla/Netscape seems to prefer am3
    BigInteger.prototype.am = am3;
    dbits = 28;
  }

  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = ((1<<dbits)-1);
  BigInteger.prototype.DV = (1<<dbits);

  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2,BI_FP);
  BigInteger.prototype.F1 = BI_FP-dbits;
  BigInteger.prototype.F2 = 2*dbits-BI_FP;

  // Digit conversions
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  var BI_RC = new Array();
  var rr,vv;
  rr = "0".charCodeAt(0);
  for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
  rr = "a".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
  rr = "A".charCodeAt(0);
  for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

  function int2char(n) { return BI_RM.charAt(n); }
  function intAt(s,i) {
    var c = BI_RC[s.charCodeAt(i)];
    return (c==null)?-1:c;
  }

  // (protected) copy this to r
  function bnpCopyTo(r) {
    for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
    r.t = this.t;
    r.s = this.s;
  }

  // (protected) set from integer value x, -DV <= x < DV
  function bnpFromInt(x) {
    this.t = 1;
    this.s = (x<0)?-1:0;
    if(x > 0) this[0] = x;
    else if(x < -1) this[0] = x+DV;
    else this.t = 0;
  }

  // return bigint initialized to value
  function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

  // (protected) set from string and radix
  function bnpFromString(s,b) {
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 256) k = 8; // byte array
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else { this.fromRadix(s,b); return; }
    this.t = 0;
    this.s = 0;
    var i = s.length, mi = false, sh = 0;
    while(--i >= 0) {
      var x = (k==8)?s[i]&0xff:intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-") mi = true;
        continue;
      }
      mi = false;
      if(sh == 0)
        this[this.t++] = x;
      else if(sh+k > this.DB) {
        this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
        this[this.t++] = (x>>(this.DB-sh));
      }
      else
        this[this.t-1] |= x<<sh;
      sh += k;
      if(sh >= this.DB) sh -= this.DB;
    }
    if(k == 8 && (s[0]&0x80) != 0) {
      this.s = -1;
      if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
    }
    this.clamp();
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) clamp off excess high words
  function bnpClamp() {
    var c = this.s&this.DM;
    while(this.t > 0 && this[this.t-1] == c) --this.t;
  }

  // (public) return string representation in given radix
  function bnToString(b) {
    if(this.s < 0) return "-"+this.negate().toString(b);
    var k;
    if(b == 16) k = 4;
    else if(b == 8) k = 3;
    else if(b == 2) k = 1;
    else if(b == 32) k = 5;
    else if(b == 4) k = 2;
    else return this.toRadix(b);
    var km = (1<<k)-1, d, m = false, r = "", i = this.t;
    var p = this.DB-(i*this.DB)%k;
    if(i-- > 0) {
      if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
      while(i >= 0) {
        if(p < k) {
          d = (this[i]&((1<<p)-1))<<(k-p);
          d |= this[--i]>>(p+=this.DB-k);
        }
        else {
          d = (this[i]>>(p-=k))&km;
          if(p <= 0) { p += this.DB; --i; }
        }
        if(d > 0) m = true;
        if(m) r += int2char(d);
      }
    }
    return m?r:"0";
  }

  // (public) -this
  function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

  // (public) |this|
  function bnAbs() { return (this.s<0)?this.negate():this; }

  // (public) return + if this > a, - if this < a, 0 if equal
  function bnCompareTo(a) {
    var r = this.s-a.s;
    if(r != 0) return r;
    var i = this.t;
    r = i-a.t;
    if(r != 0) return (this.s<0)?-r:r;
    while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
    return 0;
  }

  // returns bit length of the integer x
  function nbits(x) {
    var r = 1, t;
    if((t=x>>>16) != 0) { x = t; r += 16; }
    if((t=x>>8) != 0) { x = t; r += 8; }
    if((t=x>>4) != 0) { x = t; r += 4; }
    if((t=x>>2) != 0) { x = t; r += 2; }
    if((t=x>>1) != 0) { x = t; r += 1; }
    return r;
  }

  // (public) return the number of bits in "this"
  function bnBitLength() {
    if(this.t <= 0) return 0;
    return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
  }

  // (protected) r = this << n*DB
  function bnpDLShiftTo(n,r) {
    var i;
    for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
    for(i = n-1; i >= 0; --i) r[i] = 0;
    r.t = this.t+n;
    r.s = this.s;
  }

  // (protected) r = this >> n*DB
  function bnpDRShiftTo(n,r) {
    for(var i = n; i < this.t; ++i) r[i-n] = this[i];
    r.t = Math.max(this.t-n,0);
    r.s = this.s;
  }

  // (protected) r = this << n
  function bnpLShiftTo(n,r) {
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<cbs)-1;
    var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
    for(i = this.t-1; i >= 0; --i) {
      r[i+ds+1] = (this[i]>>cbs)|c;
      c = (this[i]&bm)<<bs;
    }
    for(i = ds-1; i >= 0; --i) r[i] = 0;
    r[ds] = c;
    r.t = this.t+ds+1;
    r.s = this.s;
    r.clamp();
  }

  // (protected) r = this >> n
  function bnpRShiftTo(n,r) {
    r.s = this.s;
    var ds = Math.floor(n/this.DB);
    if(ds >= this.t) { r.t = 0; return; }
    var bs = n%this.DB;
    var cbs = this.DB-bs;
    var bm = (1<<bs)-1;
    r[0] = this[ds]>>bs;
    for(var i = ds+1; i < this.t; ++i) {
      r[i-ds-1] |= (this[i]&bm)<<cbs;
      r[i-ds] = this[i]>>bs;
    }
    if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
    r.t = this.t-ds;
    r.clamp();
  }

  // (protected) r = this - a
  function bnpSubTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]-a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c -= a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c -= a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c -= a.s;
    }
    r.s = (c<0)?-1:0;
    if(c < -1) r[i++] = this.DV+c;
    else if(c > 0) r[i++] = c;
    r.t = i;
    r.clamp();
  }

  // (protected) r = this * a, r != this,a (HAC 14.12)
  // "this" should be the larger one if appropriate.
  function bnpMultiplyTo(a,r) {
    var x = this.abs(), y = a.abs();
    var i = x.t;
    r.t = i+y.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
    r.s = 0;
    r.clamp();
    if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
  }

  // (protected) r = this^2, r != this (HAC 14.16)
  function bnpSquareTo(r) {
    var x = this.abs();
    var i = r.t = 2*x.t;
    while(--i >= 0) r[i] = 0;
    for(i = 0; i < x.t-1; ++i) {
      var c = x.am(i,x[i],r,2*i,0,1);
      if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
        r[i+x.t] -= x.DV;
        r[i+x.t+1] = 1;
      }
    }
    if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
    r.s = 0;
    r.clamp();
  }

  // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
  // r != q, this != m.  q or r may be null.
  function bnpDivRemTo(m,q,r) {
    var pm = m.abs();
    if(pm.t <= 0) return;
    var pt = this.abs();
    if(pt.t < pm.t) {
      if(q != null) q.fromInt(0);
      if(r != null) this.copyTo(r);
      return;
    }
    if(r == null) r = nbi();
    var y = nbi(), ts = this.s, ms = m.s;
    var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
    if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
    else { pm.copyTo(y); pt.copyTo(r); }
    var ys = y.t;
    var y0 = y[ys-1];
    if(y0 == 0) return;
    var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
    var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
    var i = r.t, j = i-ys, t = (q==null)?nbi():q;
    y.dlShiftTo(j,t);
    if(r.compareTo(t) >= 0) {
      r[r.t++] = 1;
      r.subTo(t,r);
    }
    BigInteger.ONE.dlShiftTo(ys,t);
    t.subTo(y,y);	// "negative" y so we can replace sub with am later
    while(y.t < ys) y[y.t++] = 0;
    while(--j >= 0) {
      // Estimate quotient digit
      var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
      if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
        y.dlShiftTo(j,t);
        r.subTo(t,r);
        while(r[i] < --qd) r.subTo(t,r);
      }
    }
    if(q != null) {
      r.drShiftTo(ys,q);
      if(ts != ms) BigInteger.ZERO.subTo(q,q);
    }
    r.t = ys;
    r.clamp();
    if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
    if(ts < 0) BigInteger.ZERO.subTo(r,r);
  }

  // (public) this mod a
  function bnMod(a) {
    var r = nbi();
    this.abs().divRemTo(a,null,r);
    if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
    return r;
  }

  // Modular reduction using "classic" algorithm
  function Classic(m) { this.m = m; }
  function cConvert(x) {
    if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
    else return x;
  }
  function cRevert(x) { return x; }
  function cReduce(x) { x.divRemTo(this.m,null,x); }
  function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
  function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  Classic.prototype.convert = cConvert;
  Classic.prototype.revert = cRevert;
  Classic.prototype.reduce = cReduce;
  Classic.prototype.mulTo = cMulTo;
  Classic.prototype.sqrTo = cSqrTo;

  // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
  // justification:
  //         xy == 1 (mod m)
  //         xy =  1+km
  //   xy(2-xy) = (1+km)(1-km)
  // x[y(2-xy)] = 1-k^2m^2
  // x[y(2-xy)] == 1 (mod m^2)
  // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
  // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
  // JS multiply "overflows" differently from C/C++, so care is needed here.
  function bnpInvDigit() {
    if(this.t < 1) return 0;
    var x = this[0];
    if((x&1) == 0) return 0;
    var y = x&3;		// y == 1/x mod 2^2
    y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
    y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
    y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
    // last step - calculate inverse mod DV directly;
    // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
    y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
    // we really want the negative inverse, and -DV < y < DV
    return (y>0)?this.DV-y:-y;
  }

  // Montgomery reduction
  function Montgomery(m) {
    this.m = m;
    this.mp = m.invDigit();
    this.mpl = this.mp&0x7fff;
    this.mph = this.mp>>15;
    this.um = (1<<(m.DB-15))-1;
    this.mt2 = 2*m.t;
  }

  // xR mod m
  function montConvert(x) {
    var r = nbi();
    x.abs().dlShiftTo(this.m.t,r);
    r.divRemTo(this.m,null,r);
    if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
    return r;
  }

  // x/R mod m
  function montRevert(x) {
    var r = nbi();
    x.copyTo(r);
    this.reduce(r);
    return r;
  }

  // x = x/R mod m (HAC 14.32)
  function montReduce(x) {
    while(x.t <= this.mt2)	// pad x so am has enough room later
      x[x.t++] = 0;
    for(var i = 0; i < this.m.t; ++i) {
      // faster way of calculating u0 = x[i]*mp mod DV
      var j = x[i]&0x7fff;
      var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
      // use am to combine the multiply-shift-add into one call
      j = i+this.m.t;
      x[j] += this.m.am(0,u0,x,i,0,this.m.t);
      // propagate carry
      while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
    }
    x.clamp();
    x.drShiftTo(this.m.t,x);
    if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
  }

  // r = "x^2/R mod m"; x != r
  function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

  // r = "xy/R mod m"; x,y != r
  function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

  Montgomery.prototype.convert = montConvert;
  Montgomery.prototype.revert = montRevert;
  Montgomery.prototype.reduce = montReduce;
  Montgomery.prototype.mulTo = montMulTo;
  Montgomery.prototype.sqrTo = montSqrTo;

  // (protected) true iff this is even
  function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

  // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
  function bnpExp(e,z) {
    if(e > 0xffffffff || e < 1) return BigInteger.ONE;
    var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
    g.copyTo(r);
    while(--i >= 0) {
      z.sqrTo(r,r2);
      if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
      else { var t = r; r = r2; r2 = t; }
    }
    return z.revert(r);
  }

  // (public) this^e % m, 0 <= e < 2^32
  function bnModPowInt(e,m) {
    var z;
    if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
    return this.exp(e,z);
  }

  // protected
  BigInteger.prototype.copyTo = bnpCopyTo;
  BigInteger.prototype.fromInt = bnpFromInt;
  BigInteger.prototype.fromString = bnpFromString;
  BigInteger.prototype.clamp = bnpClamp;
  BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
  BigInteger.prototype.drShiftTo = bnpDRShiftTo;
  BigInteger.prototype.lShiftTo = bnpLShiftTo;
  BigInteger.prototype.rShiftTo = bnpRShiftTo;
  BigInteger.prototype.subTo = bnpSubTo;
  BigInteger.prototype.multiplyTo = bnpMultiplyTo;
  BigInteger.prototype.squareTo = bnpSquareTo;
  BigInteger.prototype.divRemTo = bnpDivRemTo;
  BigInteger.prototype.invDigit = bnpInvDigit;
  BigInteger.prototype.isEven = bnpIsEven;
  BigInteger.prototype.exp = bnpExp;

  // public
  BigInteger.prototype.toString = bnToString;
  BigInteger.prototype.negate = bnNegate;
  BigInteger.prototype.abs = bnAbs;
  BigInteger.prototype.compareTo = bnCompareTo;
  BigInteger.prototype.bitLength = bnBitLength;
  BigInteger.prototype.mod = bnMod;
  BigInteger.prototype.modPowInt = bnModPowInt;

  // "constants"
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);

  // jsbn2 stuff

  // (protected) convert from radix string
  function bnpFromRadix(s,b) {
    this.fromInt(0);
    if(b == null) b = 10;
    var cs = this.chunkSize(b);
    var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
    for(var i = 0; i < s.length; ++i) {
      var x = intAt(s,i);
      if(x < 0) {
        if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
        continue;
      }
      w = b*w+x;
      if(++j >= cs) {
        this.dMultiply(d);
        this.dAddOffset(w,0);
        j = 0;
        w = 0;
      }
    }
    if(j > 0) {
      this.dMultiply(Math.pow(b,j));
      this.dAddOffset(w,0);
    }
    if(mi) BigInteger.ZERO.subTo(this,this);
  }

  // (protected) return x s.t. r^x < DV
  function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

  // (public) 0 if this == 0, 1 if this > 0
  function bnSigNum() {
    if(this.s < 0) return -1;
    else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
    else return 1;
  }

  // (protected) this *= n, this >= 0, 1 < n < DV
  function bnpDMultiply(n) {
    this[this.t] = this.am(0,n-1,this,0,0,this.t);
    ++this.t;
    this.clamp();
  }

  // (protected) this += n << w words, this >= 0
  function bnpDAddOffset(n,w) {
    if(n == 0) return;
    while(this.t <= w) this[this.t++] = 0;
    this[w] += n;
    while(this[w] >= this.DV) {
      this[w] -= this.DV;
      if(++w >= this.t) this[this.t++] = 0;
      ++this[w];
    }
  }

  // (protected) convert to radix string
  function bnpToRadix(b) {
    if(b == null) b = 10;
    if(this.signum() == 0 || b < 2 || b > 36) return "0";
    var cs = this.chunkSize(b);
    var a = Math.pow(b,cs);
    var d = nbv(a), y = nbi(), z = nbi(), r = "";
    this.divRemTo(d,y,z);
    while(y.signum() > 0) {
      r = (a+z.intValue()).toString(b).substr(1) + r;
      y.divRemTo(d,y,z);
    }
    return z.intValue().toString(b) + r;
  }

  // (public) return value as integer
  function bnIntValue() {
    if(this.s < 0) {
      if(this.t == 1) return this[0]-this.DV;
      else if(this.t == 0) return -1;
    }
    else if(this.t == 1) return this[0];
    else if(this.t == 0) return 0;
    // assumes 16 < DB < 32
    return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
  }

  // (protected) r = this + a
  function bnpAddTo(a,r) {
    var i = 0, c = 0, m = Math.min(a.t,this.t);
    while(i < m) {
      c += this[i]+a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    if(a.t < this.t) {
      c += a.s;
      while(i < this.t) {
        c += this[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += this.s;
    }
    else {
      c += this.s;
      while(i < a.t) {
        c += a[i];
        r[i++] = c&this.DM;
        c >>= this.DB;
      }
      c += a.s;
    }
    r.s = (c<0)?-1:0;
    if(c > 0) r[i++] = c;
    else if(c < -1) r[i++] = this.DV+c;
    r.t = i;
    r.clamp();
  }

  BigInteger.prototype.fromRadix = bnpFromRadix;
  BigInteger.prototype.chunkSize = bnpChunkSize;
  BigInteger.prototype.signum = bnSigNum;
  BigInteger.prototype.dMultiply = bnpDMultiply;
  BigInteger.prototype.dAddOffset = bnpDAddOffset;
  BigInteger.prototype.toRadix = bnpToRadix;
  BigInteger.prototype.intValue = bnIntValue;
  BigInteger.prototype.addTo = bnpAddTo;

  //======= end jsbn =======

  // Emscripten wrapper
  var Wrapper = {
    abs: function(l, h) {
      var x = new goog.math.Long(l, h);
      var ret;
      if (x.isNegative()) {
        ret = x.negate();
      } else {
        ret = x;
      }
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
    },
    ensureTemps: function() {
      if (Wrapper.ensuredTemps) return;
      Wrapper.ensuredTemps = true;
      Wrapper.two32 = new BigInteger();
      Wrapper.two32.fromString('4294967296', 10);
      Wrapper.two64 = new BigInteger();
      Wrapper.two64.fromString('18446744073709551616', 10);
      Wrapper.temp1 = new BigInteger();
      Wrapper.temp2 = new BigInteger();
    },
    lh2bignum: function(l, h) {
      var a = new BigInteger();
      a.fromString(h.toString(), 10);
      var b = new BigInteger();
      a.multiplyTo(Wrapper.two32, b);
      var c = new BigInteger();
      c.fromString(l.toString(), 10);
      var d = new BigInteger();
      c.addTo(b, d);
      return d;
    },
    stringify: function(l, h, unsigned) {
      var ret = new goog.math.Long(l, h).toString();
      if (unsigned && ret[0] == '-') {
        // unsign slowly using jsbn bignums
        Wrapper.ensureTemps();
        var bignum = new BigInteger();
        bignum.fromString(ret, 10);
        ret = new BigInteger();
        Wrapper.two64.addTo(bignum, ret);
        ret = ret.toString(10);
      }
      return ret;
    },
    fromString: function(str, base, min, max, unsigned) {
      Wrapper.ensureTemps();
      var bignum = new BigInteger();
      bignum.fromString(str, base);
      var bigmin = new BigInteger();
      bigmin.fromString(min, 10);
      var bigmax = new BigInteger();
      bigmax.fromString(max, 10);
      if (unsigned && bignum.compareTo(BigInteger.ZERO) < 0) {
        var temp = new BigInteger();
        bignum.addTo(Wrapper.two64, temp);
        bignum = temp;
      }
      var error = false;
      if (bignum.compareTo(bigmin) < 0) {
        bignum = bigmin;
        error = true;
      } else if (bignum.compareTo(bigmax) > 0) {
        bignum = bigmax;
        error = true;
      }
      var ret = goog.math.Long.fromString(bignum.toString()); // min-max checks should have clamped this to a range goog.math.Long can handle well
      HEAP32[tempDoublePtr>>2] = ret.low_;
      HEAP32[tempDoublePtr+4>>2] = ret.high_;
      if (error) throw 'range error';
    }
  };
  return Wrapper;
})();

//======= end closure i64 code =======



// === Auto-generated postamble setup entry stuff ===


function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);

  initialStackTop = STACKTOP;

  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      if (e && typeof e === 'object' && e.stack) Module.printErr('exception thrown: ' + [e, e.stack]);
      throw e;
    }
  } finally {
    calledMain = true;
  }
}




function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    return;
  }

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return; 

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
Module['run'] = Module.run = run;

function exit(status, implicit) {
  if (implicit && Module['noExitRuntime']) {
    return;
  }

  if (Module['noExitRuntime']) {
  } else {

    ABORT = true;
    EXITSTATUS = status;
    STACKTOP = initialStackTop;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  if (ENVIRONMENT_IS_NODE) {
    // Work around a node.js bug where stdout buffer is not flushed at process exit:
    // Instead of process.exit() directly, wait for stdout flush event.
    // See https://github.com/joyent/node/issues/1669 and https://github.com/kripken/emscripten/issues/2582
    // Workaround is based on https://github.com/RReverser/acorn/commit/50ab143cecc9ed71a2d66f78b4aec3bb2e9844f6
    process['stdout']['once']('drain', function () {
      process['exit'](status);
    });
    console.log(' '); // Make sure to print something to force the drain event to occur, in case the stdout buffer was empty.
    // Work around another node bug where sometimes 'drain' is never fired - make another effort
    // to emit the exit status, after a significant delay (if node hasn't fired drain by then, give up)
    setTimeout(function() {
      process['exit'](status);
    }, 500);
  } else
  if (ENVIRONMENT_IS_SHELL && typeof quit === 'function') {
    quit(status);
  }
  // if we reach here, we must throw an exception to halt the current execution
  throw new ExitStatus(status);
}
Module['exit'] = Module.exit = exit;

var abortDecorators = [];

function abort(what) {
  if (what !== undefined) {
    Module.print(what);
    Module.printErr(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.';

  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}






// {{MODULE_ADDITIONS}}



//# sourceMappingURL=c_assets.js.map