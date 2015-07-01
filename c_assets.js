
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
  
      var REMOTE_PACKAGE_SIZE = 124307;
      var PACKAGE_UUID = 'cfa5d25b-6809-42bd-b810-6dff391cf327';
    
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
Module['FS_createPath']('/data', 'dmt_clusters_subset0', true, true);

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

      new DataRequest(0, 824, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_14_10.csv');
    new DataRequest(824, 932, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_16_4.csv');
    new DataRequest(932, 4270, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_18_20.csv');
    new DataRequest(4270, 8809, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_19_23.csv');
    new DataRequest(8809, 9478, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_17_9.csv');
    new DataRequest(9478, 25303, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_11_43.csv');
    new DataRequest(25303, 25327, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_15_2.csv');
    new DataRequest(25327, 123281, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_10_106.csv');
    new DataRequest(123281, 123918, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_13_9.csv');
    new DataRequest(123918, 124307, 0, 0).open('GET', '/data/dmt_clusters_subset0/dmt_12_7.csv');

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
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_14_10.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_16_4.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_18_20.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_19_23.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_17_9.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_11_43.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_15_2.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_10_106.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_13_9.csv"].onload();
          DataRequest.prototype.requests["/data/dmt_clusters_subset0/dmt_12_7.csv"].onload();
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
      assert(args.length == sig.length-1);
      if (!args.splice) args = Array.prototype.slice.call(args);
      args.splice(0, 0, ptr);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, args);
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
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
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+15)&-16);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+15)&-16); return ret; },
  dynamicAlloc: function (size) { var ret = DYNAMICTOP;DYNAMICTOP = (DYNAMICTOP + (assert(DYNAMICTOP > 0),size))|0;DYNAMICTOP = (((DYNAMICTOP)+15)&-16); if (DYNAMICTOP >= TOTAL_MEMORY) { var success = enlargeMemory(); if (!success) { DYNAMICTOP = ret; return 0; } }; return ret; },
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
    assert(returnType !== 'array', 'Return type should not be "array".');
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
    if ((!opts || !opts.async) && typeof EmterpreterAsync === 'object') {
      assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling ccall');
    }
    if (opts && opts.async) assert(!returnType, 'async ccalls cannot return values');
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
    funcstr += "if (typeof EmterpreterAsync === 'object') { assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling cwrap') }";
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
    assert(type, 'Must know what type to store in allocate!');

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
    assert(ptr + i < TOTAL_MEMORY);
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
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
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
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
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
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
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
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;

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
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
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
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
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
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module['addRunDependency'] = addRunDependency;
function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
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

STATICTOP = STATIC_BASE + 960;
  /* global initializers */  __ATINIT__.push();
  

/* memory initializer */ allocate([82,117,110,45,116,105,109,101,32,101,114,114,111,114,46,46,46,10,0,0,0,0,0,0,37,115,10,0,0,0,0,0,46,46,46,110,111,119,32,101,120,105,116,105,110,103,32,116,111,32,115,121,115,116,101,109,46,46,46,10,0,0,0,0,101,114,114,111,114,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,0,0,84,111,111,32,109,97,110,121,32,105,116,101,114,97,116,105,111,110,115,32,105,110,32,98,114,101,110,116,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,84,111,111,32,109,97,110,121,32,105,116,101,114,97,116,105,111,110,115,32,105,110,32,102,114,112,114,109,110,40,41,0,1,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,114,0,0,0,0,0,0,0,101,114,114,111,114,32,105,110,32,103,101,116,68,77,84,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,101,114,114,111,114,32,119,104,105,108,101,32,111,112,101,110,105,110,103,32,102,105,108,101,32,102,111,114,32,114,101,97,100,105,110,103,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,114,114,111,114,32,105,110,32,109,105,110,105,109,105,122,101,32,119,104,101,110,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,0,0,0,0,0,0,0,0,105,110,102,105,110,105,116,121,0,0,0,0,0,0,0,0,10,0,0,0,100,0,0,0,232,3,0,0,16,39,0,0,160,134,1,0,64,66,15,0,128,150,152,0,0,225,245,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);





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


  var _BDtoIHigh=true;

   
  Module["_i64Subtract"] = _i64Subtract;

  
  
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

  var _BDtoILow=true;

   
  Module["_memset"] = _memset;

  
  
  
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
              assert(position === 0, 'canOwn must imply no weird position inside the file');
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
          if (this.stack) this.stack = demangleAll(this.stack);
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
      }};function _close(fildes) {
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

   
  Module["_bitshift64Lshr"] = _bitshift64Lshr;

   
  Module["_bitshift64Shl"] = _bitshift64Shl;

  function _abort() {
      Module['abort']();
    }

  
  
  
  
  
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
        }}};function _send(fd, buf, len, flags) {
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

  
  
  
  
  function _recv(fd, buf, len, flags) {
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
    }function _fgetc(stream) {
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


  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 
  Module["_memcpy"] = _memcpy;

  var _llvm_pow_f64=Math_pow;

   
  Module["_i64Add"] = _i64Add;

  var _fabs=Math_abs;

  function ___errno_location() {
      return ___errno_state;
    }

  var _BItoD=true;

  var _sqrt=Math_sqrt;

  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
    }

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

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        HEAP32[((ptr)>>2)]=ret;
      }
      return ret;
    }

  
  
  function _emscripten_set_main_loop_timing(mode, value) {
      Browser.mainLoop.timingMode = mode;
      Browser.mainLoop.timingValue = value;
  
      if (!Browser.mainLoop.func) {
        console.error('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
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
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
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
            assert(typeof url == 'string', 'createObjectURL must return a url as a string');
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
          // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
          // and we have no viable fallback.
          assert((typeof scrollX !== 'undefined') && (typeof scrollY !== 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
  
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


function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_dd(x) { Module["printErr"]("Invalid function pointer called with signature 'dd'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_vii(x) { Module["printErr"]("Invalid function pointer called with signature 'vii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_di(x) { Module["printErr"]("Invalid function pointer called with signature 'di'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

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
Module.asmLibraryArg = { "abort": abort, "assert": assert, "nullFunc_iiii": nullFunc_iiii, "nullFunc_dd": nullFunc_dd, "nullFunc_vii": nullFunc_vii, "nullFunc_di": nullFunc_di, "invoke_iiii": invoke_iiii, "invoke_dd": invoke_dd, "invoke_vii": invoke_vii, "invoke_di": invoke_di, "_fabs": _fabs, "_llvm_pow_f64": _llvm_pow_f64, "_send": _send, "_fread": _fread, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_fflush": _fflush, "_pwrite": _pwrite, "_open": _open, "_sbrk": _sbrk, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fileno": _fileno, "_sysconf": _sysconf, "___setErrNo": ___setErrNo, "_fgets": _fgets, "_pread": _pread, "_mkport": _mkport, "_fclose": _fclose, "__reallyNegative": __reallyNegative, "_write": _write, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___errno_location": ___errno_location, "_recv": _recv, "_fgetc": _fgetc, "__exit": __exit, "_read": _read, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "__formatString": __formatString, "_sqrt": _sqrt, "_fopen": _fopen, "_exit": _exit, "_close": _close, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "_stderr": _stderr };
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
  'almost asm';
  
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
  var nullFunc_iiii=env.nullFunc_iiii;
  var nullFunc_dd=env.nullFunc_dd;
  var nullFunc_vii=env.nullFunc_vii;
  var nullFunc_di=env.nullFunc_di;
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
  var _open=env._open;
  var _sbrk=env._sbrk;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _fileno=env._fileno;
  var _sysconf=env._sysconf;
  var ___setErrNo=env.___setErrNo;
  var _fgets=env._fgets;
  var _pread=env._pread;
  var _mkport=env._mkport;
  var _fclose=env._fclose;
  var __reallyNegative=env.__reallyNegative;
  var _write=env._write;
  var _emscripten_set_main_loop=env._emscripten_set_main_loop;
  var ___errno_location=env.___errno_location;
  var _recv=env._recv;
  var _fgetc=env._fgetc;
  var __exit=env.__exit;
  var _read=env._read;
  var _abort=env._abort;
  var _fwrite=env._fwrite;
  var _time=env._time;
  var _fprintf=env._fprintf;
  var __formatString=env.__formatString;
  var _sqrt=env._sqrt;
  var _fopen=env._fopen;
  var _exit=env._exit;
  var _close=env._close;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS
function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
if ((STACKTOP|0) >= (STACK_MAX|0)) abort();

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
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $vararg_buffer = 0, $vararg_buffer1 = 0, $vararg_buffer3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $vararg_buffer3 = sp + 16|0;
 $vararg_buffer1 = sp + 8|0;
 $vararg_buffer = sp;
 $0 = $error_text;
 $1 = HEAP32[_stderr>>2]|0; //@line 20 "c_src/util.c"
 (_fprintf(($1|0),(8|0),($vararg_buffer|0))|0); //@line 20 "c_src/util.c"
 $2 = HEAP32[_stderr>>2]|0; //@line 21 "c_src/util.c"
 $3 = $0; //@line 21 "c_src/util.c"
 HEAP32[$vararg_buffer1>>2] = $3; //@line 21 "c_src/util.c"
 (_fprintf(($2|0),(32|0),($vararg_buffer1|0))|0); //@line 21 "c_src/util.c"
 $4 = HEAP32[_stderr>>2]|0; //@line 22 "c_src/util.c"
 (_fprintf(($4|0),(40|0),($vararg_buffer3|0))|0); //@line 22 "c_src/util.c"
 _exit(1); //@line 23 "c_src/util.c"
 // unreachable; //@line 23 "c_src/util.c"
}
function _vector($n) {
 $n = $n|0;
 var $0 = 0, $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $v = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $n;
 $1 = $0; //@line 29 "c_src/util.c"
 $2 = $1<<2; //@line 29 "c_src/util.c"
 $3 = (_malloc($2)|0); //@line 29 "c_src/util.c"
 $v = $3; //@line 29 "c_src/util.c"
 $4 = $v; //@line 30 "c_src/util.c"
 $5 = ($4|0)==(0|0); //@line 30 "c_src/util.c"
 if ($5) {
  _rt_error(72); //@line 31 "c_src/util.c"
 }
 $6 = $v; //@line 33 "c_src/util.c"
 STACKTOP = sp;return ($6|0); //@line 33 "c_src/util.c"
}
function _brent($ax,$bx,$cx,$f,$tol,$xmin) {
 $ax = +$ax;
 $bx = +$bx;
 $cx = +$cx;
 $f = $f|0;
 $tol = +$tol;
 $xmin = $xmin|0;
 var $0 = 0.0, $1 = 0.0, $10 = 0.0, $100 = 0.0, $101 = 0.0, $102 = 0.0, $103 = 0.0, $104 = 0.0, $105 = 0.0, $106 = 0.0, $107 = 0.0, $108 = 0.0, $109 = 0.0, $11 = 0.0, $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0.0;
 var $116 = 0.0, $117 = 0, $118 = 0.0, $119 = 0.0, $12 = 0.0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0.0, $129 = 0.0, $13 = 0.0, $130 = 0.0, $131 = 0, $132 = 0.0, $133 = 0.0;
 var $134 = 0, $135 = 0.0, $136 = 0.0, $137 = 0.0, $138 = 0.0, $139 = 0.0, $14 = 0.0, $140 = 0.0, $141 = 0.0, $142 = 0.0, $143 = 0.0, $144 = 0.0, $145 = 0.0, $146 = 0.0, $147 = 0.0, $148 = 0.0, $149 = 0.0, $15 = 0, $150 = 0.0, $151 = 0.0;
 var $152 = 0.0, $153 = 0.0, $154 = 0.0, $155 = 0, $156 = 0.0, $157 = 0.0, $158 = 0.0, $159 = 0.0, $16 = 0.0, $160 = 0, $161 = 0.0, $162 = 0.0, $163 = 0.0, $164 = 0.0, $165 = 0, $166 = 0.0, $167 = 0.0, $168 = 0.0, $169 = 0.0, $17 = 0.0;
 var $170 = 0.0, $171 = 0.0, $172 = 0.0, $173 = 0, $174 = 0.0, $175 = 0.0, $176 = 0.0, $177 = 0.0, $178 = 0.0, $179 = 0.0, $18 = 0.0, $180 = 0.0, $181 = 0.0, $182 = 0.0, $183 = 0.0, $184 = 0.0, $185 = 0.0, $186 = 0.0, $187 = 0.0, $188 = 0.0;
 var $189 = 0, $19 = 0.0, $190 = 0.0, $191 = 0.0, $192 = 0.0, $193 = 0.0, $194 = 0.0, $195 = 0.0, $196 = 0.0, $197 = 0, $198 = 0.0, $199 = 0.0, $2 = 0.0, $20 = 0, $200 = 0.0, $201 = 0.0, $202 = 0.0, $203 = 0.0, $204 = 0.0, $205 = 0.0;
 var $206 = 0, $207 = 0.0, $208 = 0.0, $209 = 0.0, $21 = 0.0, $210 = 0.0, $211 = 0, $212 = 0.0, $213 = 0.0, $214 = 0, $215 = 0.0, $216 = 0.0, $217 = 0.0, $218 = 0.0, $219 = 0.0, $22 = 0.0, $220 = 0.0, $221 = 0.0, $222 = 0, $223 = 0.0;
 var $224 = 0.0, $225 = 0.0, $226 = 0, $227 = 0.0, $228 = 0.0, $229 = 0, $23 = 0, $230 = 0.0, $231 = 0.0, $232 = 0.0, $233 = 0.0, $234 = 0.0, $235 = 0.0, $236 = 0, $237 = 0.0, $238 = 0.0, $239 = 0, $24 = 0, $240 = 0.0, $241 = 0.0;
 var $242 = 0, $243 = 0.0, $244 = 0.0, $245 = 0, $246 = 0, $247 = 0.0, $248 = 0, $249 = 0.0, $25 = 0.0, $250 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0;
 var $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0.0, $50 = 0.0, $51 = 0.0, $52 = 0.0;
 var $53 = 0.0, $54 = 0.0, $55 = 0, $56 = 0.0, $57 = 0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0, $65 = 0.0, $66 = 0.0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0.0, $70 = 0.0;
 var $71 = 0.0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0.0, $80 = 0.0, $81 = 0.0, $82 = 0.0, $83 = 0.0, $84 = 0.0, $85 = 0.0, $86 = 0.0, $87 = 0.0, $88 = 0.0, $89 = 0.0;
 var $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0.0, $95 = 0.0, $96 = 0.0, $97 = 0.0, $98 = 0, $99 = 0.0, $a = 0.0, $b = 0.0, $d = 0.0, $e = 0.0, $etemp = 0.0, $fu = 0.0, $fv = 0.0, $fw = 0.0, $fx = 0.0;
 var $iter = 0, $p = 0.0, $q = 0.0, $r = 0.0, $tol1 = 0.0, $tol2 = 0.0, $u = 0.0, $v = 0.0, $w = 0.0, $x = 0.0, $xm = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $ax;
 $2 = $bx;
 $3 = $cx;
 $4 = $f;
 $5 = $tol;
 $6 = $xmin;
 $e = 0.0; //@line 24 "c_src/brent.c"
 $7 = $1; //@line 27 "c_src/brent.c"
 $8 = $3; //@line 27 "c_src/brent.c"
 $9 = $7 < $8; //@line 27 "c_src/brent.c"
 $10 = $1; //@line 27 "c_src/brent.c"
 $11 = $3; //@line 27 "c_src/brent.c"
 $12 = $9 ? $10 : $11; //@line 27 "c_src/brent.c"
 $a = $12; //@line 27 "c_src/brent.c"
 $13 = $1; //@line 28 "c_src/brent.c"
 $14 = $3; //@line 28 "c_src/brent.c"
 $15 = $13 > $14; //@line 28 "c_src/brent.c"
 $16 = $1; //@line 28 "c_src/brent.c"
 $17 = $3; //@line 28 "c_src/brent.c"
 $18 = $15 ? $16 : $17; //@line 28 "c_src/brent.c"
 $b = $18; //@line 28 "c_src/brent.c"
 $19 = $2; //@line 29 "c_src/brent.c"
 $v = $19; //@line 29 "c_src/brent.c"
 $w = $19; //@line 29 "c_src/brent.c"
 $x = $19; //@line 29 "c_src/brent.c"
 $20 = $4; //@line 30 "c_src/brent.c"
 $21 = $x; //@line 30 "c_src/brent.c"
 $22 = (+FUNCTION_TABLE_dd[$20 & 3]($21)); //@line 30 "c_src/brent.c"
 $fx = $22; //@line 30 "c_src/brent.c"
 $fv = $22; //@line 30 "c_src/brent.c"
 $fw = $22; //@line 30 "c_src/brent.c"
 $iter = 1; //@line 31 "c_src/brent.c"
 while(1) {
  $23 = $iter; //@line 31 "c_src/brent.c"
  $24 = ($23|0)<=(100); //@line 31 "c_src/brent.c"
  if (!($24)) {
   label = 41;
   break;
  }
  $25 = $a; //@line 32 "c_src/brent.c"
  $26 = $b; //@line 32 "c_src/brent.c"
  $27 = $25 + $26; //@line 32 "c_src/brent.c"
  $28 = $27; //@line 32 "c_src/brent.c"
  $29 = 0.5 * $28; //@line 32 "c_src/brent.c"
  $30 = $29; //@line 32 "c_src/brent.c"
  $xm = $30; //@line 32 "c_src/brent.c"
  $31 = $5; //@line 33 "c_src/brent.c"
  $32 = $31; //@line 33 "c_src/brent.c"
  $33 = $x; //@line 33 "c_src/brent.c"
  $34 = $33; //@line 33 "c_src/brent.c"
  $35 = (+Math_abs((+$34))); //@line 33 "c_src/brent.c"
  $36 = $32 * $35; //@line 33 "c_src/brent.c"
  $37 = $36 + 1.0E-10; //@line 33 "c_src/brent.c"
  $38 = $37; //@line 33 "c_src/brent.c"
  $tol1 = $38; //@line 33 "c_src/brent.c"
  $39 = $38; //@line 33 "c_src/brent.c"
  $40 = 2.0 * $39; //@line 33 "c_src/brent.c"
  $41 = $40; //@line 33 "c_src/brent.c"
  $tol2 = $41; //@line 33 "c_src/brent.c"
  $42 = $x; //@line 34 "c_src/brent.c"
  $43 = $xm; //@line 34 "c_src/brent.c"
  $44 = $42 - $43; //@line 34 "c_src/brent.c"
  $45 = $44; //@line 34 "c_src/brent.c"
  $46 = (+Math_abs((+$45))); //@line 34 "c_src/brent.c"
  $47 = $tol2; //@line 34 "c_src/brent.c"
  $48 = $47; //@line 34 "c_src/brent.c"
  $49 = $b; //@line 34 "c_src/brent.c"
  $50 = $a; //@line 34 "c_src/brent.c"
  $51 = $49 - $50; //@line 34 "c_src/brent.c"
  $52 = $51; //@line 34 "c_src/brent.c"
  $53 = 0.5 * $52; //@line 34 "c_src/brent.c"
  $54 = $48 - $53; //@line 34 "c_src/brent.c"
  $55 = $46 <= $54; //@line 34 "c_src/brent.c"
  if ($55) {
   label = 4;
   break;
  }
  $59 = $e; //@line 38 "c_src/brent.c"
  $60 = $59; //@line 38 "c_src/brent.c"
  $61 = (+Math_abs((+$60))); //@line 38 "c_src/brent.c"
  $62 = $tol1; //@line 38 "c_src/brent.c"
  $63 = $62; //@line 38 "c_src/brent.c"
  $64 = $61 > $63; //@line 38 "c_src/brent.c"
  $65 = $x; //@line 39 "c_src/brent.c"
  do {
   if ($64) {
    $66 = $w; //@line 39 "c_src/brent.c"
    $67 = $65 - $66; //@line 39 "c_src/brent.c"
    $68 = $fx; //@line 39 "c_src/brent.c"
    $69 = $fv; //@line 39 "c_src/brent.c"
    $70 = $68 - $69; //@line 39 "c_src/brent.c"
    $71 = $67 * $70; //@line 39 "c_src/brent.c"
    $r = $71; //@line 39 "c_src/brent.c"
    $72 = $x; //@line 40 "c_src/brent.c"
    $73 = $v; //@line 40 "c_src/brent.c"
    $74 = $72 - $73; //@line 40 "c_src/brent.c"
    $75 = $fx; //@line 40 "c_src/brent.c"
    $76 = $fw; //@line 40 "c_src/brent.c"
    $77 = $75 - $76; //@line 40 "c_src/brent.c"
    $78 = $74 * $77; //@line 40 "c_src/brent.c"
    $q = $78; //@line 40 "c_src/brent.c"
    $79 = $x; //@line 41 "c_src/brent.c"
    $80 = $v; //@line 41 "c_src/brent.c"
    $81 = $79 - $80; //@line 41 "c_src/brent.c"
    $82 = $q; //@line 41 "c_src/brent.c"
    $83 = $81 * $82; //@line 41 "c_src/brent.c"
    $84 = $x; //@line 41 "c_src/brent.c"
    $85 = $w; //@line 41 "c_src/brent.c"
    $86 = $84 - $85; //@line 41 "c_src/brent.c"
    $87 = $r; //@line 41 "c_src/brent.c"
    $88 = $86 * $87; //@line 41 "c_src/brent.c"
    $89 = $83 - $88; //@line 41 "c_src/brent.c"
    $p = $89; //@line 41 "c_src/brent.c"
    $90 = $q; //@line 42 "c_src/brent.c"
    $91 = $r; //@line 42 "c_src/brent.c"
    $92 = $90 - $91; //@line 42 "c_src/brent.c"
    $93 = $92; //@line 42 "c_src/brent.c"
    $94 = 2.0 * $93; //@line 42 "c_src/brent.c"
    $95 = $94; //@line 42 "c_src/brent.c"
    $q = $95; //@line 42 "c_src/brent.c"
    $96 = $q; //@line 43 "c_src/brent.c"
    $97 = $96; //@line 43 "c_src/brent.c"
    $98 = $97 > 0.0; //@line 43 "c_src/brent.c"
    if ($98) {
     $99 = $p; //@line 43 "c_src/brent.c"
     $100 = -$99; //@line 43 "c_src/brent.c"
     $p = $100; //@line 43 "c_src/brent.c"
    }
    $101 = $q; //@line 44 "c_src/brent.c"
    $102 = $101; //@line 44 "c_src/brent.c"
    $103 = (+Math_abs((+$102))); //@line 44 "c_src/brent.c"
    $104 = $103; //@line 44 "c_src/brent.c"
    $q = $104; //@line 44 "c_src/brent.c"
    $105 = $e; //@line 45 "c_src/brent.c"
    $etemp = $105; //@line 45 "c_src/brent.c"
    $106 = $d; //@line 46 "c_src/brent.c"
    $e = $106; //@line 46 "c_src/brent.c"
    $107 = $p; //@line 47 "c_src/brent.c"
    $108 = $107; //@line 47 "c_src/brent.c"
    $109 = (+Math_abs((+$108))); //@line 47 "c_src/brent.c"
    $110 = $q; //@line 47 "c_src/brent.c"
    $111 = $110; //@line 47 "c_src/brent.c"
    $112 = 0.5 * $111; //@line 47 "c_src/brent.c"
    $113 = $etemp; //@line 47 "c_src/brent.c"
    $114 = $113; //@line 47 "c_src/brent.c"
    $115 = $112 * $114; //@line 47 "c_src/brent.c"
    $116 = (+Math_abs((+$115))); //@line 47 "c_src/brent.c"
    $117 = $109 >= $116; //@line 47 "c_src/brent.c"
    if (!($117)) {
     $118 = $p; //@line 47 "c_src/brent.c"
     $119 = $q; //@line 47 "c_src/brent.c"
     $120 = $a; //@line 47 "c_src/brent.c"
     $121 = $x; //@line 47 "c_src/brent.c"
     $122 = $120 - $121; //@line 47 "c_src/brent.c"
     $123 = $119 * $122; //@line 47 "c_src/brent.c"
     $124 = $118 <= $123; //@line 47 "c_src/brent.c"
     if (!($124)) {
      $125 = $p; //@line 47 "c_src/brent.c"
      $126 = $q; //@line 47 "c_src/brent.c"
      $127 = $b; //@line 47 "c_src/brent.c"
      $128 = $x; //@line 47 "c_src/brent.c"
      $129 = $127 - $128; //@line 47 "c_src/brent.c"
      $130 = $126 * $129; //@line 47 "c_src/brent.c"
      $131 = $125 >= $130; //@line 47 "c_src/brent.c"
      if (!($131)) {
       $145 = $p; //@line 50 "c_src/brent.c"
       $146 = $q; //@line 50 "c_src/brent.c"
       $147 = $145 / $146; //@line 50 "c_src/brent.c"
       $d = $147; //@line 50 "c_src/brent.c"
       $148 = $x; //@line 51 "c_src/brent.c"
       $149 = $d; //@line 51 "c_src/brent.c"
       $150 = $148 + $149; //@line 51 "c_src/brent.c"
       $u = $150; //@line 51 "c_src/brent.c"
       $151 = $u; //@line 52 "c_src/brent.c"
       $152 = $a; //@line 52 "c_src/brent.c"
       $153 = $151 - $152; //@line 52 "c_src/brent.c"
       $154 = $tol2; //@line 52 "c_src/brent.c"
       $155 = $153 < $154; //@line 52 "c_src/brent.c"
       if (!($155)) {
        $156 = $b; //@line 52 "c_src/brent.c"
        $157 = $u; //@line 52 "c_src/brent.c"
        $158 = $156 - $157; //@line 52 "c_src/brent.c"
        $159 = $tol2; //@line 52 "c_src/brent.c"
        $160 = $158 < $159; //@line 52 "c_src/brent.c"
        if (!($160)) {
         break;
        }
       }
       $161 = $xm; //@line 53 "c_src/brent.c"
       $162 = $x; //@line 53 "c_src/brent.c"
       $163 = $161 - $162; //@line 53 "c_src/brent.c"
       $164 = $163; //@line 53 "c_src/brent.c"
       $165 = $164 > 0.0; //@line 53 "c_src/brent.c"
       $166 = $tol1; //@line 53 "c_src/brent.c"
       $167 = $166; //@line 53 "c_src/brent.c"
       $168 = (+Math_abs((+$167))); //@line 53 "c_src/brent.c"
       $169 = -$168; //@line 53 "c_src/brent.c"
       $170 = $165 ? $168 : $169; //@line 53 "c_src/brent.c"
       $171 = $170; //@line 53 "c_src/brent.c"
       $d = $171; //@line 53 "c_src/brent.c"
       break;
      }
     }
    }
    $132 = $x; //@line 48 "c_src/brent.c"
    $133 = $xm; //@line 48 "c_src/brent.c"
    $134 = $132 >= $133; //@line 48 "c_src/brent.c"
    if ($134) {
     $135 = $a; //@line 48 "c_src/brent.c"
     $136 = $x; //@line 48 "c_src/brent.c"
     $137 = $135 - $136; //@line 48 "c_src/brent.c"
     $141 = $137;
    } else {
     $138 = $b; //@line 48 "c_src/brent.c"
     $139 = $x; //@line 48 "c_src/brent.c"
     $140 = $138 - $139; //@line 48 "c_src/brent.c"
     $141 = $140;
    }
    $e = $141; //@line 48 "c_src/brent.c"
    $142 = $141; //@line 48 "c_src/brent.c"
    $143 = 0.38196600000000003 * $142; //@line 48 "c_src/brent.c"
    $144 = $143; //@line 48 "c_src/brent.c"
    $d = $144; //@line 48 "c_src/brent.c"
   } else {
    $172 = $xm; //@line 56 "c_src/brent.c"
    $173 = $65 >= $172; //@line 56 "c_src/brent.c"
    if ($173) {
     $174 = $a; //@line 56 "c_src/brent.c"
     $175 = $x; //@line 56 "c_src/brent.c"
     $176 = $174 - $175; //@line 56 "c_src/brent.c"
     $180 = $176;
    } else {
     $177 = $b; //@line 56 "c_src/brent.c"
     $178 = $x; //@line 56 "c_src/brent.c"
     $179 = $177 - $178; //@line 56 "c_src/brent.c"
     $180 = $179;
    }
    $e = $180; //@line 56 "c_src/brent.c"
    $181 = $180; //@line 56 "c_src/brent.c"
    $182 = 0.38196600000000003 * $181; //@line 56 "c_src/brent.c"
    $183 = $182; //@line 56 "c_src/brent.c"
    $d = $183; //@line 56 "c_src/brent.c"
   }
  } while(0);
  $184 = $d; //@line 58 "c_src/brent.c"
  $185 = $184; //@line 58 "c_src/brent.c"
  $186 = (+Math_abs((+$185))); //@line 58 "c_src/brent.c"
  $187 = $tol1; //@line 58 "c_src/brent.c"
  $188 = $187; //@line 58 "c_src/brent.c"
  $189 = $186 >= $188; //@line 58 "c_src/brent.c"
  $190 = $x; //@line 58 "c_src/brent.c"
  if ($189) {
   $191 = $d; //@line 58 "c_src/brent.c"
   $192 = $190 + $191; //@line 58 "c_src/brent.c"
   $193 = $192; //@line 58 "c_src/brent.c"
   $205 = $193;
  } else {
   $194 = $190; //@line 58 "c_src/brent.c"
   $195 = $d; //@line 58 "c_src/brent.c"
   $196 = $195; //@line 58 "c_src/brent.c"
   $197 = $196 > 0.0; //@line 58 "c_src/brent.c"
   $198 = $tol1; //@line 58 "c_src/brent.c"
   $199 = $198; //@line 58 "c_src/brent.c"
   $200 = (+Math_abs((+$199))); //@line 58 "c_src/brent.c"
   $201 = -$200; //@line 58 "c_src/brent.c"
   $202 = $197 ? $200 : $201; //@line 58 "c_src/brent.c"
   $203 = $194 + $202; //@line 58 "c_src/brent.c"
   $205 = $203;
  }
  $204 = $205; //@line 58 "c_src/brent.c"
  $u = $204; //@line 58 "c_src/brent.c"
  $206 = $4; //@line 59 "c_src/brent.c"
  $207 = $u; //@line 59 "c_src/brent.c"
  $208 = (+FUNCTION_TABLE_dd[$206 & 3]($207)); //@line 59 "c_src/brent.c"
  $fu = $208; //@line 59 "c_src/brent.c"
  $209 = $fu; //@line 60 "c_src/brent.c"
  $210 = $fx; //@line 60 "c_src/brent.c"
  $211 = $209 <= $210; //@line 60 "c_src/brent.c"
  $212 = $u; //@line 61 "c_src/brent.c"
  $213 = $x; //@line 61 "c_src/brent.c"
  do {
   if ($211) {
    $214 = $212 >= $213; //@line 61 "c_src/brent.c"
    $215 = $x; //@line 61 "c_src/brent.c"
    if ($214) {
     $a = $215; //@line 61 "c_src/brent.c"
    } else {
     $b = $215; //@line 61 "c_src/brent.c"
    }
    $216 = $w; //@line 62 "c_src/brent.c"
    $v = $216; //@line 62 "c_src/brent.c"
    $217 = $x; //@line 62 "c_src/brent.c"
    $w = $217; //@line 62 "c_src/brent.c"
    $218 = $u; //@line 62 "c_src/brent.c"
    $x = $218; //@line 62 "c_src/brent.c"
    $219 = $fw; //@line 63 "c_src/brent.c"
    $fv = $219; //@line 63 "c_src/brent.c"
    $220 = $fx; //@line 63 "c_src/brent.c"
    $fw = $220; //@line 63 "c_src/brent.c"
    $221 = $fu; //@line 63 "c_src/brent.c"
    $fx = $221; //@line 63 "c_src/brent.c"
   } else {
    $222 = $212 < $213; //@line 65 "c_src/brent.c"
    $223 = $u; //@line 65 "c_src/brent.c"
    if ($222) {
     $a = $223; //@line 65 "c_src/brent.c"
    } else {
     $b = $223; //@line 65 "c_src/brent.c"
    }
    $224 = $fu; //@line 66 "c_src/brent.c"
    $225 = $fw; //@line 66 "c_src/brent.c"
    $226 = $224 <= $225; //@line 66 "c_src/brent.c"
    if (!($226)) {
     $227 = $w; //@line 66 "c_src/brent.c"
     $228 = $x; //@line 66 "c_src/brent.c"
     $229 = $227 == $228; //@line 66 "c_src/brent.c"
     if (!($229)) {
      $234 = $fu; //@line 71 "c_src/brent.c"
      $235 = $fv; //@line 71 "c_src/brent.c"
      $236 = $234 <= $235; //@line 71 "c_src/brent.c"
      if (!($236)) {
       $237 = $v; //@line 71 "c_src/brent.c"
       $238 = $x; //@line 71 "c_src/brent.c"
       $239 = $237 == $238; //@line 71 "c_src/brent.c"
       if (!($239)) {
        $240 = $v; //@line 71 "c_src/brent.c"
        $241 = $w; //@line 71 "c_src/brent.c"
        $242 = $240 == $241; //@line 71 "c_src/brent.c"
        if (!($242)) {
         break;
        }
       }
      }
      $243 = $u; //@line 72 "c_src/brent.c"
      $v = $243; //@line 72 "c_src/brent.c"
      $244 = $fu; //@line 73 "c_src/brent.c"
      $fv = $244; //@line 73 "c_src/brent.c"
      break;
     }
    }
    $230 = $w; //@line 67 "c_src/brent.c"
    $v = $230; //@line 67 "c_src/brent.c"
    $231 = $u; //@line 68 "c_src/brent.c"
    $w = $231; //@line 68 "c_src/brent.c"
    $232 = $fw; //@line 69 "c_src/brent.c"
    $fv = $232; //@line 69 "c_src/brent.c"
    $233 = $fu; //@line 70 "c_src/brent.c"
    $fw = $233; //@line 70 "c_src/brent.c"
   }
  } while(0);
  $245 = $iter; //@line 31 "c_src/brent.c"
  $246 = (($245) + 1)|0; //@line 31 "c_src/brent.c"
  $iter = $246; //@line 31 "c_src/brent.c"
 }
 if ((label|0) == 4) {
  $56 = $x; //@line 35 "c_src/brent.c"
  $57 = $6; //@line 35 "c_src/brent.c"
  HEAPF32[$57>>2] = $56; //@line 35 "c_src/brent.c"
  $58 = $fx; //@line 36 "c_src/brent.c"
  $0 = $58; //@line 36 "c_src/brent.c"
  $250 = $0; //@line 80 "c_src/brent.c"
  STACKTOP = sp;return (+$250); //@line 80 "c_src/brent.c"
 }
 else if ((label|0) == 41) {
  _rt_error(104); //@line 77 "c_src/brent.c"
  $247 = $x; //@line 78 "c_src/brent.c"
  $248 = $6; //@line 78 "c_src/brent.c"
  HEAPF32[$248>>2] = $247; //@line 78 "c_src/brent.c"
  $249 = $fx; //@line 79 "c_src/brent.c"
  $0 = $249; //@line 79 "c_src/brent.c"
  $250 = $0; //@line 80 "c_src/brent.c"
  STACKTOP = sp;return (+$250); //@line 80 "c_src/brent.c"
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
 var $0 = 0, $1 = 0, $10 = 0.0, $100 = 0.0, $101 = 0.0, $102 = 0.0, $103 = 0.0, $104 = 0.0, $105 = 0.0, $106 = 0.0, $107 = 0, $108 = 0.0, $109 = 0.0, $11 = 0.0, $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0, $114 = 0.0, $115 = 0.0;
 var $116 = 0.0, $117 = 0.0, $118 = 0.0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0.0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0.0, $129 = 0.0, $13 = 0, $130 = 0.0, $131 = 0.0, $132 = 0.0, $133 = 0.0;
 var $134 = 0, $135 = 0.0, $136 = 0.0, $137 = 0, $138 = 0.0, $139 = 0, $14 = 0, $140 = 0.0, $141 = 0.0, $142 = 0.0, $143 = 0.0, $144 = 0.0, $145 = 0.0, $146 = 0, $147 = 0.0, $148 = 0.0, $149 = 0.0, $15 = 0.0, $150 = 0.0, $151 = 0;
 var $152 = 0.0, $153 = 0.0, $154 = 0.0, $155 = 0.0, $156 = 0, $157 = 0, $158 = 0.0, $159 = 0.0, $16 = 0.0, $160 = 0.0, $161 = 0.0, $162 = 0, $163 = 0.0, $164 = 0, $165 = 0, $166 = 0.0, $167 = 0, $168 = 0.0, $169 = 0, $17 = 0.0;
 var $170 = 0, $171 = 0.0, $172 = 0, $173 = 0.0, $174 = 0, $175 = 0.0, $176 = 0, $177 = 0.0, $178 = 0, $179 = 0.0, $18 = 0, $180 = 0, $181 = 0.0, $182 = 0, $183 = 0, $184 = 0.0, $185 = 0.0, $186 = 0, $187 = 0.0, $188 = 0;
 var $189 = 0.0, $19 = 0, $190 = 0.0, $191 = 0.0, $192 = 0.0, $193 = 0.0, $194 = 0.0, $195 = 0, $196 = 0.0, $197 = 0.0, $198 = 0.0, $199 = 0, $2 = 0, $20 = 0.0, $200 = 0.0, $201 = 0.0, $202 = 0.0, $203 = 0.0, $204 = 0.0, $205 = 0.0;
 var $206 = 0.0, $207 = 0.0, $208 = 0, $209 = 0, $21 = 0, $210 = 0.0, $211 = 0.0, $212 = 0.0, $213 = 0.0, $214 = 0, $215 = 0.0, $216 = 0, $217 = 0, $218 = 0.0, $219 = 0, $22 = 0.0, $220 = 0.0, $221 = 0, $222 = 0, $223 = 0.0;
 var $224 = 0.0, $225 = 0, $226 = 0.0, $227 = 0, $228 = 0.0, $229 = 0.0, $23 = 0, $230 = 0.0, $231 = 0.0, $232 = 0.0, $233 = 0.0, $234 = 0, $235 = 0.0, $236 = 0, $237 = 0.0, $238 = 0, $239 = 0, $24 = 0, $240 = 0.0, $241 = 0.0;
 var $242 = 0.0, $243 = 0.0, $244 = 0.0, $245 = 0.0, $246 = 0.0, $247 = 0, $248 = 0.0, $249 = 0.0, $25 = 0.0, $250 = 0.0, $251 = 0.0, $252 = 0, $253 = 0.0, $254 = 0, $255 = 0.0, $256 = 0.0, $257 = 0.0, $258 = 0, $259 = 0.0, $26 = 0;
 var $260 = 0.0, $261 = 0, $262 = 0.0, $263 = 0, $264 = 0.0, $265 = 0.0, $266 = 0.0, $267 = 0.0, $268 = 0.0, $269 = 0.0, $27 = 0.0, $270 = 0, $271 = 0.0, $272 = 0.0, $273 = 0.0, $274 = 0, $275 = 0.0, $276 = 0, $277 = 0, $278 = 0.0;
 var $279 = 0, $28 = 0, $280 = 0.0, $281 = 0, $282 = 0, $283 = 0.0, $284 = 0, $285 = 0, $286 = 0.0, $287 = 0, $288 = 0.0, $289 = 0, $29 = 0.0, $3 = 0, $30 = 0, $31 = 0, $32 = 0.0, $33 = 0, $34 = 0.0, $35 = 0;
 var $36 = 0.0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0.0, $43 = 0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0.0;
 var $54 = 0.0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0.0, $59 = 0, $6 = 0, $60 = 0.0, $61 = 0, $62 = 0, $63 = 0.0, $64 = 0, $65 = 0.0, $66 = 0.0, $67 = 0, $68 = 0.0, $69 = 0, $7 = 0, $70 = 0.0, $71 = 0.0;
 var $72 = 0.0, $73 = 0, $74 = 0.0, $75 = 0, $76 = 0.0, $77 = 0.0, $78 = 0, $79 = 0.0, $8 = 0, $80 = 0, $81 = 0.0, $82 = 0.0, $83 = 0.0, $84 = 0, $85 = 0.0, $86 = 0.0, $87 = 0, $88 = 0.0, $89 = 0, $9 = 0.0;
 var $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0, $95 = 0.0, $96 = 0, $97 = 0.0, $98 = 0.0, $99 = 0.0, $dum = 0.0, $fu = 0.0, $q = 0.0, $r = 0.0, $u = 0.0, $ulim = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ax;
 $1 = $bx;
 $2 = $cx;
 $3 = $fa;
 $4 = $fb;
 $5 = $fc;
 $6 = $func;
 $7 = $6; //@line 15 "c_src/mnbrak.c"
 $8 = $0; //@line 15 "c_src/mnbrak.c"
 $9 = +HEAPF32[$8>>2]; //@line 15 "c_src/mnbrak.c"
 $10 = $9; //@line 15 "c_src/mnbrak.c"
 $11 = (+FUNCTION_TABLE_dd[$7 & 3]($10)); //@line 15 "c_src/mnbrak.c"
 $12 = $3; //@line 15 "c_src/mnbrak.c"
 HEAPF32[$12>>2] = $11; //@line 15 "c_src/mnbrak.c"
 $13 = $6; //@line 16 "c_src/mnbrak.c"
 $14 = $1; //@line 16 "c_src/mnbrak.c"
 $15 = +HEAPF32[$14>>2]; //@line 16 "c_src/mnbrak.c"
 $16 = $15; //@line 16 "c_src/mnbrak.c"
 $17 = (+FUNCTION_TABLE_dd[$13 & 3]($16)); //@line 16 "c_src/mnbrak.c"
 $18 = $4; //@line 16 "c_src/mnbrak.c"
 HEAPF32[$18>>2] = $17; //@line 16 "c_src/mnbrak.c"
 $19 = $4; //@line 17 "c_src/mnbrak.c"
 $20 = +HEAPF32[$19>>2]; //@line 17 "c_src/mnbrak.c"
 $21 = $3; //@line 17 "c_src/mnbrak.c"
 $22 = +HEAPF32[$21>>2]; //@line 17 "c_src/mnbrak.c"
 $23 = $20 > $22; //@line 17 "c_src/mnbrak.c"
 if ($23) {
  $24 = $0; //@line 18 "c_src/mnbrak.c"
  $25 = +HEAPF32[$24>>2]; //@line 18 "c_src/mnbrak.c"
  $dum = $25; //@line 18 "c_src/mnbrak.c"
  $26 = $1; //@line 18 "c_src/mnbrak.c"
  $27 = +HEAPF32[$26>>2]; //@line 18 "c_src/mnbrak.c"
  $28 = $0; //@line 18 "c_src/mnbrak.c"
  HEAPF32[$28>>2] = $27; //@line 18 "c_src/mnbrak.c"
  $29 = $dum; //@line 18 "c_src/mnbrak.c"
  $30 = $1; //@line 18 "c_src/mnbrak.c"
  HEAPF32[$30>>2] = $29; //@line 18 "c_src/mnbrak.c"
  $31 = $4; //@line 19 "c_src/mnbrak.c"
  $32 = +HEAPF32[$31>>2]; //@line 19 "c_src/mnbrak.c"
  $dum = $32; //@line 19 "c_src/mnbrak.c"
  $33 = $3; //@line 19 "c_src/mnbrak.c"
  $34 = +HEAPF32[$33>>2]; //@line 19 "c_src/mnbrak.c"
  $35 = $4; //@line 19 "c_src/mnbrak.c"
  HEAPF32[$35>>2] = $34; //@line 19 "c_src/mnbrak.c"
  $36 = $dum; //@line 19 "c_src/mnbrak.c"
  $37 = $3; //@line 19 "c_src/mnbrak.c"
  HEAPF32[$37>>2] = $36; //@line 19 "c_src/mnbrak.c"
 }
 $38 = $1; //@line 21 "c_src/mnbrak.c"
 $39 = +HEAPF32[$38>>2]; //@line 21 "c_src/mnbrak.c"
 $40 = $39; //@line 21 "c_src/mnbrak.c"
 $41 = $1; //@line 21 "c_src/mnbrak.c"
 $42 = +HEAPF32[$41>>2]; //@line 21 "c_src/mnbrak.c"
 $43 = $0; //@line 21 "c_src/mnbrak.c"
 $44 = +HEAPF32[$43>>2]; //@line 21 "c_src/mnbrak.c"
 $45 = $42 - $44; //@line 21 "c_src/mnbrak.c"
 $46 = $45; //@line 21 "c_src/mnbrak.c"
 $47 = 1.618034 * $46; //@line 21 "c_src/mnbrak.c"
 $48 = $40 + $47; //@line 21 "c_src/mnbrak.c"
 $49 = $48; //@line 21 "c_src/mnbrak.c"
 $50 = $2; //@line 21 "c_src/mnbrak.c"
 HEAPF32[$50>>2] = $49; //@line 21 "c_src/mnbrak.c"
 $51 = $6; //@line 22 "c_src/mnbrak.c"
 $52 = $2; //@line 22 "c_src/mnbrak.c"
 $53 = +HEAPF32[$52>>2]; //@line 22 "c_src/mnbrak.c"
 $54 = $53; //@line 22 "c_src/mnbrak.c"
 $55 = (+FUNCTION_TABLE_dd[$51 & 3]($54)); //@line 22 "c_src/mnbrak.c"
 $56 = $5; //@line 22 "c_src/mnbrak.c"
 HEAPF32[$56>>2] = $55; //@line 22 "c_src/mnbrak.c"
 L4: while(1) {
  $57 = $4; //@line 23 "c_src/mnbrak.c"
  $58 = +HEAPF32[$57>>2]; //@line 23 "c_src/mnbrak.c"
  $59 = $5; //@line 23 "c_src/mnbrak.c"
  $60 = +HEAPF32[$59>>2]; //@line 23 "c_src/mnbrak.c"
  $61 = $58 > $60; //@line 23 "c_src/mnbrak.c"
  if (!($61)) {
   label = 25;
   break;
  }
  $62 = $1; //@line 24 "c_src/mnbrak.c"
  $63 = +HEAPF32[$62>>2]; //@line 24 "c_src/mnbrak.c"
  $64 = $0; //@line 24 "c_src/mnbrak.c"
  $65 = +HEAPF32[$64>>2]; //@line 24 "c_src/mnbrak.c"
  $66 = $63 - $65; //@line 24 "c_src/mnbrak.c"
  $67 = $4; //@line 24 "c_src/mnbrak.c"
  $68 = +HEAPF32[$67>>2]; //@line 24 "c_src/mnbrak.c"
  $69 = $5; //@line 24 "c_src/mnbrak.c"
  $70 = +HEAPF32[$69>>2]; //@line 24 "c_src/mnbrak.c"
  $71 = $68 - $70; //@line 24 "c_src/mnbrak.c"
  $72 = $66 * $71; //@line 24 "c_src/mnbrak.c"
  $r = $72; //@line 24 "c_src/mnbrak.c"
  $73 = $1; //@line 25 "c_src/mnbrak.c"
  $74 = +HEAPF32[$73>>2]; //@line 25 "c_src/mnbrak.c"
  $75 = $2; //@line 25 "c_src/mnbrak.c"
  $76 = +HEAPF32[$75>>2]; //@line 25 "c_src/mnbrak.c"
  $77 = $74 - $76; //@line 25 "c_src/mnbrak.c"
  $78 = $4; //@line 25 "c_src/mnbrak.c"
  $79 = +HEAPF32[$78>>2]; //@line 25 "c_src/mnbrak.c"
  $80 = $3; //@line 25 "c_src/mnbrak.c"
  $81 = +HEAPF32[$80>>2]; //@line 25 "c_src/mnbrak.c"
  $82 = $79 - $81; //@line 25 "c_src/mnbrak.c"
  $83 = $77 * $82; //@line 25 "c_src/mnbrak.c"
  $q = $83; //@line 25 "c_src/mnbrak.c"
  $84 = $1; //@line 26 "c_src/mnbrak.c"
  $85 = +HEAPF32[$84>>2]; //@line 26 "c_src/mnbrak.c"
  $86 = $85; //@line 26 "c_src/mnbrak.c"
  $87 = $1; //@line 26 "c_src/mnbrak.c"
  $88 = +HEAPF32[$87>>2]; //@line 26 "c_src/mnbrak.c"
  $89 = $2; //@line 26 "c_src/mnbrak.c"
  $90 = +HEAPF32[$89>>2]; //@line 26 "c_src/mnbrak.c"
  $91 = $88 - $90; //@line 26 "c_src/mnbrak.c"
  $92 = $q; //@line 26 "c_src/mnbrak.c"
  $93 = $91 * $92; //@line 26 "c_src/mnbrak.c"
  $94 = $1; //@line 26 "c_src/mnbrak.c"
  $95 = +HEAPF32[$94>>2]; //@line 26 "c_src/mnbrak.c"
  $96 = $0; //@line 26 "c_src/mnbrak.c"
  $97 = +HEAPF32[$96>>2]; //@line 26 "c_src/mnbrak.c"
  $98 = $95 - $97; //@line 26 "c_src/mnbrak.c"
  $99 = $r; //@line 26 "c_src/mnbrak.c"
  $100 = $98 * $99; //@line 26 "c_src/mnbrak.c"
  $101 = $93 - $100; //@line 26 "c_src/mnbrak.c"
  $102 = $101; //@line 26 "c_src/mnbrak.c"
  $103 = $q; //@line 26 "c_src/mnbrak.c"
  $104 = $r; //@line 26 "c_src/mnbrak.c"
  $105 = $103 - $104; //@line 26 "c_src/mnbrak.c"
  $106 = $105; //@line 26 "c_src/mnbrak.c"
  $107 = $106 > 0.0; //@line 26 "c_src/mnbrak.c"
  $108 = $q; //@line 26 "c_src/mnbrak.c"
  $109 = $r; //@line 26 "c_src/mnbrak.c"
  $110 = $108 - $109; //@line 26 "c_src/mnbrak.c"
  $111 = $110; //@line 26 "c_src/mnbrak.c"
  $112 = (+Math_abs((+$111))); //@line 26 "c_src/mnbrak.c"
  $113 = $112 > 9.9999999999999995E-21; //@line 26 "c_src/mnbrak.c"
  if ($107) {
   if ($113) {
    $114 = $q; //@line 26 "c_src/mnbrak.c"
    $115 = $r; //@line 26 "c_src/mnbrak.c"
    $116 = $114 - $115; //@line 26 "c_src/mnbrak.c"
    $117 = $116; //@line 26 "c_src/mnbrak.c"
    $118 = (+Math_abs((+$117))); //@line 26 "c_src/mnbrak.c"
    $119 = $118;
   } else {
    $119 = 9.9999999999999995E-21;
   }
   $120 = (+Math_abs((+$119))); //@line 26 "c_src/mnbrak.c"
   $130 = $120;
  } else {
   if ($113) {
    $121 = $q; //@line 26 "c_src/mnbrak.c"
    $122 = $r; //@line 26 "c_src/mnbrak.c"
    $123 = $121 - $122; //@line 26 "c_src/mnbrak.c"
    $124 = $123; //@line 26 "c_src/mnbrak.c"
    $125 = (+Math_abs((+$124))); //@line 26 "c_src/mnbrak.c"
    $126 = $125;
   } else {
    $126 = 9.9999999999999995E-21;
   }
   $127 = (+Math_abs((+$126))); //@line 26 "c_src/mnbrak.c"
   $128 = -$127; //@line 26 "c_src/mnbrak.c"
   $130 = $128;
  }
  $129 = 2.0 * $130; //@line 26 "c_src/mnbrak.c"
  $131 = $102 / $129; //@line 26 "c_src/mnbrak.c"
  $132 = $86 - $131; //@line 26 "c_src/mnbrak.c"
  $133 = $132; //@line 26 "c_src/mnbrak.c"
  $u = $133; //@line 26 "c_src/mnbrak.c"
  $134 = $1; //@line 27 "c_src/mnbrak.c"
  $135 = +HEAPF32[$134>>2]; //@line 27 "c_src/mnbrak.c"
  $136 = $135; //@line 27 "c_src/mnbrak.c"
  $137 = $2; //@line 27 "c_src/mnbrak.c"
  $138 = +HEAPF32[$137>>2]; //@line 27 "c_src/mnbrak.c"
  $139 = $1; //@line 27 "c_src/mnbrak.c"
  $140 = +HEAPF32[$139>>2]; //@line 27 "c_src/mnbrak.c"
  $141 = $138 - $140; //@line 27 "c_src/mnbrak.c"
  $142 = $141; //@line 27 "c_src/mnbrak.c"
  $143 = 100.0 * $142; //@line 27 "c_src/mnbrak.c"
  $144 = $136 + $143; //@line 27 "c_src/mnbrak.c"
  $145 = $144; //@line 27 "c_src/mnbrak.c"
  $ulim = $145; //@line 27 "c_src/mnbrak.c"
  $146 = $1; //@line 28 "c_src/mnbrak.c"
  $147 = +HEAPF32[$146>>2]; //@line 28 "c_src/mnbrak.c"
  $148 = $u; //@line 28 "c_src/mnbrak.c"
  $149 = $147 - $148; //@line 28 "c_src/mnbrak.c"
  $150 = $u; //@line 28 "c_src/mnbrak.c"
  $151 = $2; //@line 28 "c_src/mnbrak.c"
  $152 = +HEAPF32[$151>>2]; //@line 28 "c_src/mnbrak.c"
  $153 = $150 - $152; //@line 28 "c_src/mnbrak.c"
  $154 = $149 * $153; //@line 28 "c_src/mnbrak.c"
  $155 = $154; //@line 28 "c_src/mnbrak.c"
  $156 = $155 > 0.0; //@line 28 "c_src/mnbrak.c"
  do {
   if ($156) {
    $157 = $6; //@line 29 "c_src/mnbrak.c"
    $158 = $u; //@line 29 "c_src/mnbrak.c"
    $159 = $158; //@line 29 "c_src/mnbrak.c"
    $160 = (+FUNCTION_TABLE_dd[$157 & 3]($159)); //@line 29 "c_src/mnbrak.c"
    $fu = $160; //@line 29 "c_src/mnbrak.c"
    $161 = $fu; //@line 30 "c_src/mnbrak.c"
    $162 = $5; //@line 30 "c_src/mnbrak.c"
    $163 = +HEAPF32[$162>>2]; //@line 30 "c_src/mnbrak.c"
    $164 = $161 < $163; //@line 30 "c_src/mnbrak.c"
    if ($164) {
     label = 14;
     break L4;
    }
    $175 = $fu; //@line 36 "c_src/mnbrak.c"
    $176 = $4; //@line 36 "c_src/mnbrak.c"
    $177 = +HEAPF32[$176>>2]; //@line 36 "c_src/mnbrak.c"
    $178 = $175 > $177; //@line 36 "c_src/mnbrak.c"
    if ($178) {
     label = 16;
     break L4;
    }
    $183 = $2; //@line 41 "c_src/mnbrak.c"
    $184 = +HEAPF32[$183>>2]; //@line 41 "c_src/mnbrak.c"
    $185 = $184; //@line 41 "c_src/mnbrak.c"
    $186 = $2; //@line 41 "c_src/mnbrak.c"
    $187 = +HEAPF32[$186>>2]; //@line 41 "c_src/mnbrak.c"
    $188 = $1; //@line 41 "c_src/mnbrak.c"
    $189 = +HEAPF32[$188>>2]; //@line 41 "c_src/mnbrak.c"
    $190 = $187 - $189; //@line 41 "c_src/mnbrak.c"
    $191 = $190; //@line 41 "c_src/mnbrak.c"
    $192 = 1.618034 * $191; //@line 41 "c_src/mnbrak.c"
    $193 = $185 + $192; //@line 41 "c_src/mnbrak.c"
    $194 = $193; //@line 41 "c_src/mnbrak.c"
    $u = $194; //@line 41 "c_src/mnbrak.c"
    $195 = $6; //@line 42 "c_src/mnbrak.c"
    $196 = $u; //@line 42 "c_src/mnbrak.c"
    $197 = $196; //@line 42 "c_src/mnbrak.c"
    $198 = (+FUNCTION_TABLE_dd[$195 & 3]($197)); //@line 42 "c_src/mnbrak.c"
    $fu = $198; //@line 42 "c_src/mnbrak.c"
   } else {
    $199 = $2; //@line 43 "c_src/mnbrak.c"
    $200 = +HEAPF32[$199>>2]; //@line 43 "c_src/mnbrak.c"
    $201 = $u; //@line 43 "c_src/mnbrak.c"
    $202 = $200 - $201; //@line 43 "c_src/mnbrak.c"
    $203 = $u; //@line 43 "c_src/mnbrak.c"
    $204 = $ulim; //@line 43 "c_src/mnbrak.c"
    $205 = $203 - $204; //@line 43 "c_src/mnbrak.c"
    $206 = $202 * $205; //@line 43 "c_src/mnbrak.c"
    $207 = $206; //@line 43 "c_src/mnbrak.c"
    $208 = $207 > 0.0; //@line 43 "c_src/mnbrak.c"
    if ($208) {
     $209 = $6; //@line 44 "c_src/mnbrak.c"
     $210 = $u; //@line 44 "c_src/mnbrak.c"
     $211 = $210; //@line 44 "c_src/mnbrak.c"
     $212 = (+FUNCTION_TABLE_dd[$209 & 3]($211)); //@line 44 "c_src/mnbrak.c"
     $fu = $212; //@line 44 "c_src/mnbrak.c"
     $213 = $fu; //@line 45 "c_src/mnbrak.c"
     $214 = $5; //@line 45 "c_src/mnbrak.c"
     $215 = +HEAPF32[$214>>2]; //@line 45 "c_src/mnbrak.c"
     $216 = $213 < $215; //@line 45 "c_src/mnbrak.c"
     if (!($216)) {
      break;
     }
     $217 = $2; //@line 46 "c_src/mnbrak.c"
     $218 = +HEAPF32[$217>>2]; //@line 46 "c_src/mnbrak.c"
     $219 = $1; //@line 46 "c_src/mnbrak.c"
     HEAPF32[$219>>2] = $218; //@line 46 "c_src/mnbrak.c"
     $220 = $u; //@line 46 "c_src/mnbrak.c"
     $221 = $2; //@line 46 "c_src/mnbrak.c"
     HEAPF32[$221>>2] = $220; //@line 46 "c_src/mnbrak.c"
     $222 = $2; //@line 46 "c_src/mnbrak.c"
     $223 = +HEAPF32[$222>>2]; //@line 46 "c_src/mnbrak.c"
     $224 = $223; //@line 46 "c_src/mnbrak.c"
     $225 = $2; //@line 46 "c_src/mnbrak.c"
     $226 = +HEAPF32[$225>>2]; //@line 46 "c_src/mnbrak.c"
     $227 = $1; //@line 46 "c_src/mnbrak.c"
     $228 = +HEAPF32[$227>>2]; //@line 46 "c_src/mnbrak.c"
     $229 = $226 - $228; //@line 46 "c_src/mnbrak.c"
     $230 = $229; //@line 46 "c_src/mnbrak.c"
     $231 = 1.618034 * $230; //@line 46 "c_src/mnbrak.c"
     $232 = $224 + $231; //@line 46 "c_src/mnbrak.c"
     $233 = $232; //@line 46 "c_src/mnbrak.c"
     $u = $233; //@line 46 "c_src/mnbrak.c"
     $234 = $5; //@line 47 "c_src/mnbrak.c"
     $235 = +HEAPF32[$234>>2]; //@line 47 "c_src/mnbrak.c"
     $236 = $4; //@line 47 "c_src/mnbrak.c"
     HEAPF32[$236>>2] = $235; //@line 47 "c_src/mnbrak.c"
     $237 = $fu; //@line 47 "c_src/mnbrak.c"
     $238 = $5; //@line 47 "c_src/mnbrak.c"
     HEAPF32[$238>>2] = $237; //@line 47 "c_src/mnbrak.c"
     $239 = $6; //@line 47 "c_src/mnbrak.c"
     $240 = $u; //@line 47 "c_src/mnbrak.c"
     $241 = $240; //@line 47 "c_src/mnbrak.c"
     $242 = (+FUNCTION_TABLE_dd[$239 & 3]($241)); //@line 47 "c_src/mnbrak.c"
     $fu = $242; //@line 47 "c_src/mnbrak.c"
     break;
    }
    $243 = $u; //@line 49 "c_src/mnbrak.c"
    $244 = $ulim; //@line 49 "c_src/mnbrak.c"
    $245 = $243 - $244; //@line 49 "c_src/mnbrak.c"
    $246 = $ulim; //@line 49 "c_src/mnbrak.c"
    $247 = $2; //@line 49 "c_src/mnbrak.c"
    $248 = +HEAPF32[$247>>2]; //@line 49 "c_src/mnbrak.c"
    $249 = $246 - $248; //@line 49 "c_src/mnbrak.c"
    $250 = $245 * $249; //@line 49 "c_src/mnbrak.c"
    $251 = $250; //@line 49 "c_src/mnbrak.c"
    $252 = $251 >= 0.0; //@line 49 "c_src/mnbrak.c"
    if ($252) {
     $253 = $ulim; //@line 50 "c_src/mnbrak.c"
     $u = $253; //@line 50 "c_src/mnbrak.c"
     $254 = $6; //@line 51 "c_src/mnbrak.c"
     $255 = $u; //@line 51 "c_src/mnbrak.c"
     $256 = $255; //@line 51 "c_src/mnbrak.c"
     $257 = (+FUNCTION_TABLE_dd[$254 & 3]($256)); //@line 51 "c_src/mnbrak.c"
     $fu = $257; //@line 51 "c_src/mnbrak.c"
     break;
    } else {
     $258 = $2; //@line 53 "c_src/mnbrak.c"
     $259 = +HEAPF32[$258>>2]; //@line 53 "c_src/mnbrak.c"
     $260 = $259; //@line 53 "c_src/mnbrak.c"
     $261 = $2; //@line 53 "c_src/mnbrak.c"
     $262 = +HEAPF32[$261>>2]; //@line 53 "c_src/mnbrak.c"
     $263 = $1; //@line 53 "c_src/mnbrak.c"
     $264 = +HEAPF32[$263>>2]; //@line 53 "c_src/mnbrak.c"
     $265 = $262 - $264; //@line 53 "c_src/mnbrak.c"
     $266 = $265; //@line 53 "c_src/mnbrak.c"
     $267 = 1.618034 * $266; //@line 53 "c_src/mnbrak.c"
     $268 = $260 + $267; //@line 53 "c_src/mnbrak.c"
     $269 = $268; //@line 53 "c_src/mnbrak.c"
     $u = $269; //@line 53 "c_src/mnbrak.c"
     $270 = $6; //@line 54 "c_src/mnbrak.c"
     $271 = $u; //@line 54 "c_src/mnbrak.c"
     $272 = $271; //@line 54 "c_src/mnbrak.c"
     $273 = (+FUNCTION_TABLE_dd[$270 & 3]($272)); //@line 54 "c_src/mnbrak.c"
     $fu = $273; //@line 54 "c_src/mnbrak.c"
     break;
    }
   }
  } while(0);
  $274 = $1; //@line 56 "c_src/mnbrak.c"
  $275 = +HEAPF32[$274>>2]; //@line 56 "c_src/mnbrak.c"
  $276 = $0; //@line 56 "c_src/mnbrak.c"
  HEAPF32[$276>>2] = $275; //@line 56 "c_src/mnbrak.c"
  $277 = $2; //@line 56 "c_src/mnbrak.c"
  $278 = +HEAPF32[$277>>2]; //@line 56 "c_src/mnbrak.c"
  $279 = $1; //@line 56 "c_src/mnbrak.c"
  HEAPF32[$279>>2] = $278; //@line 56 "c_src/mnbrak.c"
  $280 = $u; //@line 56 "c_src/mnbrak.c"
  $281 = $2; //@line 56 "c_src/mnbrak.c"
  HEAPF32[$281>>2] = $280; //@line 56 "c_src/mnbrak.c"
  $282 = $4; //@line 57 "c_src/mnbrak.c"
  $283 = +HEAPF32[$282>>2]; //@line 57 "c_src/mnbrak.c"
  $284 = $3; //@line 57 "c_src/mnbrak.c"
  HEAPF32[$284>>2] = $283; //@line 57 "c_src/mnbrak.c"
  $285 = $5; //@line 57 "c_src/mnbrak.c"
  $286 = +HEAPF32[$285>>2]; //@line 57 "c_src/mnbrak.c"
  $287 = $4; //@line 57 "c_src/mnbrak.c"
  HEAPF32[$287>>2] = $286; //@line 57 "c_src/mnbrak.c"
  $288 = $fu; //@line 57 "c_src/mnbrak.c"
  $289 = $5; //@line 57 "c_src/mnbrak.c"
  HEAPF32[$289>>2] = $288; //@line 57 "c_src/mnbrak.c"
 }
 if ((label|0) == 14) {
  $165 = $1; //@line 31 "c_src/mnbrak.c"
  $166 = +HEAPF32[$165>>2]; //@line 31 "c_src/mnbrak.c"
  $167 = $0; //@line 31 "c_src/mnbrak.c"
  HEAPF32[$167>>2] = $166; //@line 31 "c_src/mnbrak.c"
  $168 = $u; //@line 32 "c_src/mnbrak.c"
  $169 = $1; //@line 32 "c_src/mnbrak.c"
  HEAPF32[$169>>2] = $168; //@line 32 "c_src/mnbrak.c"
  $170 = $4; //@line 33 "c_src/mnbrak.c"
  $171 = +HEAPF32[$170>>2]; //@line 33 "c_src/mnbrak.c"
  $172 = $3; //@line 33 "c_src/mnbrak.c"
  HEAPF32[$172>>2] = $171; //@line 33 "c_src/mnbrak.c"
  $173 = $fu; //@line 34 "c_src/mnbrak.c"
  $174 = $4; //@line 34 "c_src/mnbrak.c"
  HEAPF32[$174>>2] = $173; //@line 34 "c_src/mnbrak.c"
  STACKTOP = sp;return; //@line 59 "c_src/mnbrak.c"
 }
 else if ((label|0) == 16) {
  $179 = $u; //@line 37 "c_src/mnbrak.c"
  $180 = $2; //@line 37 "c_src/mnbrak.c"
  HEAPF32[$180>>2] = $179; //@line 37 "c_src/mnbrak.c"
  $181 = $fu; //@line 38 "c_src/mnbrak.c"
  $182 = $5; //@line 38 "c_src/mnbrak.c"
  HEAPF32[$182>>2] = $181; //@line 38 "c_src/mnbrak.c"
  STACKTOP = sp;return; //@line 59 "c_src/mnbrak.c"
 }
 else if ((label|0) == 25) {
  STACKTOP = sp;return; //@line 59 "c_src/mnbrak.c"
 }
}
function _linmin($p,$xi,$n,$fret,$func) {
 $p = $p|0;
 $xi = $xi|0;
 $n = $n|0;
 $fret = $fret|0;
 $func = $func|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0.0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0.0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0.0, $43 = 0.0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0.0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $ax = 0, $bx = 0, $fa = 0;
 var $fb = 0, $fx = 0, $i = 0, $xmin = 0, $xx = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $xx = sp + 24|0;
 $xmin = sp + 20|0;
 $fx = sp + 16|0;
 $fb = sp + 12|0;
 $fa = sp + 8|0;
 $bx = sp + 4|0;
 $ax = sp;
 $0 = $p;
 $1 = $xi;
 $2 = $n;
 $3 = $fret;
 $4 = $func;
 $5 = $2; //@line 37 "c_src/linmin.c"
 HEAP32[136>>2] = $5; //@line 37 "c_src/linmin.c"
 $6 = $2; //@line 38 "c_src/linmin.c"
 $7 = (_vector($6)|0); //@line 38 "c_src/linmin.c"
 HEAP32[144>>2] = $7; //@line 38 "c_src/linmin.c"
 $8 = $2; //@line 39 "c_src/linmin.c"
 $9 = (_vector($8)|0); //@line 39 "c_src/linmin.c"
 HEAP32[152>>2] = $9; //@line 39 "c_src/linmin.c"
 $10 = $4; //@line 40 "c_src/linmin.c"
 HEAP32[160>>2] = $10; //@line 40 "c_src/linmin.c"
 $i = 0; //@line 41 "c_src/linmin.c"
 while(1) {
  $11 = $i; //@line 41 "c_src/linmin.c"
  $12 = $2; //@line 41 "c_src/linmin.c"
  $13 = ($11|0)<($12|0); //@line 41 "c_src/linmin.c"
  if (!($13)) {
   break;
  }
  $14 = $i; //@line 42 "c_src/linmin.c"
  $15 = $0; //@line 42 "c_src/linmin.c"
  $16 = (($15) + ($14<<2)|0); //@line 42 "c_src/linmin.c"
  $17 = +HEAPF32[$16>>2]; //@line 42 "c_src/linmin.c"
  $18 = $i; //@line 42 "c_src/linmin.c"
  $19 = HEAP32[144>>2]|0; //@line 42 "c_src/linmin.c"
  $20 = (($19) + ($18<<2)|0); //@line 42 "c_src/linmin.c"
  HEAPF32[$20>>2] = $17; //@line 42 "c_src/linmin.c"
  $21 = $i; //@line 43 "c_src/linmin.c"
  $22 = $1; //@line 43 "c_src/linmin.c"
  $23 = (($22) + ($21<<2)|0); //@line 43 "c_src/linmin.c"
  $24 = +HEAPF32[$23>>2]; //@line 43 "c_src/linmin.c"
  $25 = $i; //@line 43 "c_src/linmin.c"
  $26 = HEAP32[152>>2]|0; //@line 43 "c_src/linmin.c"
  $27 = (($26) + ($25<<2)|0); //@line 43 "c_src/linmin.c"
  HEAPF32[$27>>2] = $24; //@line 43 "c_src/linmin.c"
  $28 = $i; //@line 41 "c_src/linmin.c"
  $29 = (($28) + 1)|0; //@line 41 "c_src/linmin.c"
  $i = $29; //@line 41 "c_src/linmin.c"
 }
 HEAPF32[$ax>>2] = 0.0; //@line 45 "c_src/linmin.c"
 HEAPF32[$xx>>2] = 1.0; //@line 46 "c_src/linmin.c"
 _mnbrak($ax,$xx,$bx,$fa,$fx,$fb,3); //@line 47 "c_src/linmin.c"
 $30 = +HEAPF32[$ax>>2]; //@line 48 "c_src/linmin.c"
 $31 = +HEAPF32[$xx>>2]; //@line 48 "c_src/linmin.c"
 $32 = +HEAPF32[$bx>>2]; //@line 48 "c_src/linmin.c"
 $33 = (+_brent($30,$31,$32,3,1.9999999494757503E-4,$xmin)); //@line 48 "c_src/linmin.c"
 $34 = $3; //@line 48 "c_src/linmin.c"
 HEAPF32[$34>>2] = $33; //@line 48 "c_src/linmin.c"
 $i = 0; //@line 49 "c_src/linmin.c"
 while(1) {
  $35 = $i; //@line 49 "c_src/linmin.c"
  $36 = $2; //@line 49 "c_src/linmin.c"
  $37 = ($35|0)<($36|0); //@line 49 "c_src/linmin.c"
  if (!($37)) {
   break;
  }
  $38 = +HEAPF32[$xmin>>2]; //@line 50 "c_src/linmin.c"
  $39 = $i; //@line 50 "c_src/linmin.c"
  $40 = $1; //@line 50 "c_src/linmin.c"
  $41 = (($40) + ($39<<2)|0); //@line 50 "c_src/linmin.c"
  $42 = +HEAPF32[$41>>2]; //@line 50 "c_src/linmin.c"
  $43 = $42 * $38; //@line 50 "c_src/linmin.c"
  HEAPF32[$41>>2] = $43; //@line 50 "c_src/linmin.c"
  $44 = $i; //@line 51 "c_src/linmin.c"
  $45 = $1; //@line 51 "c_src/linmin.c"
  $46 = (($45) + ($44<<2)|0); //@line 51 "c_src/linmin.c"
  $47 = +HEAPF32[$46>>2]; //@line 51 "c_src/linmin.c"
  $48 = $i; //@line 51 "c_src/linmin.c"
  $49 = $0; //@line 51 "c_src/linmin.c"
  $50 = (($49) + ($48<<2)|0); //@line 51 "c_src/linmin.c"
  $51 = +HEAPF32[$50>>2]; //@line 51 "c_src/linmin.c"
  $52 = $51 + $47; //@line 51 "c_src/linmin.c"
  HEAPF32[$50>>2] = $52; //@line 51 "c_src/linmin.c"
  $53 = $i; //@line 49 "c_src/linmin.c"
  $54 = (($53) + 1)|0; //@line 49 "c_src/linmin.c"
  $i = $54; //@line 49 "c_src/linmin.c"
 }
 $55 = HEAP32[152>>2]|0; //@line 53 "c_src/linmin.c"
 _free($55); //@line 53 "c_src/linmin.c"
 $56 = HEAP32[144>>2]|0; //@line 54 "c_src/linmin.c"
 _free($56); //@line 54 "c_src/linmin.c"
 STACKTOP = sp;return; //@line 55 "c_src/linmin.c"
}
function _f1dim($x) {
 $x = +$x;
 var $0 = 0.0, $1 = 0, $10 = 0.0, $11 = 0, $12 = 0, $13 = 0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0.0, $25 = 0, $26 = 0.0;
 var $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0.0, $f = 0.0, $i = 0, $xt = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $x;
 $1 = HEAP32[136>>2]|0; //@line 62 "c_src/linmin.c"
 $2 = (_vector($1)|0); //@line 62 "c_src/linmin.c"
 $xt = $2; //@line 62 "c_src/linmin.c"
 $i = 0; //@line 63 "c_src/linmin.c"
 while(1) {
  $3 = $i; //@line 63 "c_src/linmin.c"
  $4 = HEAP32[136>>2]|0; //@line 63 "c_src/linmin.c"
  $5 = ($3|0)<($4|0); //@line 63 "c_src/linmin.c"
  if (!($5)) {
   break;
  }
  $6 = $i; //@line 64 "c_src/linmin.c"
  $7 = HEAP32[144>>2]|0; //@line 64 "c_src/linmin.c"
  $8 = (($7) + ($6<<2)|0); //@line 64 "c_src/linmin.c"
  $9 = +HEAPF32[$8>>2]; //@line 64 "c_src/linmin.c"
  $10 = $0; //@line 64 "c_src/linmin.c"
  $11 = $i; //@line 64 "c_src/linmin.c"
  $12 = HEAP32[152>>2]|0; //@line 64 "c_src/linmin.c"
  $13 = (($12) + ($11<<2)|0); //@line 64 "c_src/linmin.c"
  $14 = +HEAPF32[$13>>2]; //@line 64 "c_src/linmin.c"
  $15 = $10 * $14; //@line 64 "c_src/linmin.c"
  $16 = $9 + $15; //@line 64 "c_src/linmin.c"
  $17 = $i; //@line 64 "c_src/linmin.c"
  $18 = $xt; //@line 64 "c_src/linmin.c"
  $19 = (($18) + ($17<<2)|0); //@line 64 "c_src/linmin.c"
  HEAPF32[$19>>2] = $16; //@line 64 "c_src/linmin.c"
  $20 = $i; //@line 63 "c_src/linmin.c"
  $21 = (($20) + 1)|0; //@line 63 "c_src/linmin.c"
  $i = $21; //@line 63 "c_src/linmin.c"
 }
 $22 = HEAP32[160>>2]|0; //@line 66 "c_src/linmin.c"
 $23 = $xt; //@line 66 "c_src/linmin.c"
 $24 = (+FUNCTION_TABLE_di[$22 & 1]($23)); //@line 66 "c_src/linmin.c"
 $f = $24; //@line 66 "c_src/linmin.c"
 $25 = $xt; //@line 67 "c_src/linmin.c"
 _free($25); //@line 67 "c_src/linmin.c"
 $26 = $f; //@line 68 "c_src/linmin.c"
 STACKTOP = sp;return (+$26); //@line 68 "c_src/linmin.c"
}
function _frprmn($p,$n,$ftol,$iter,$fret,$func,$dfunc) {
 $p = $p|0;
 $n = $n|0;
 $ftol = +$ftol;
 $iter = $iter|0;
 $fret = $fret|0;
 $func = $func|0;
 $dfunc = $dfunc|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0.0, $102 = 0.0, $103 = 0, $104 = 0, $105 = 0, $106 = 0.0, $107 = 0.0, $108 = 0.0, $109 = 0.0, $11 = 0, $110 = 0, $111 = 0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0.0, $129 = 0.0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0;
 var $134 = 0, $135 = 0, $136 = 0.0, $137 = 0.0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0.0, $142 = 0.0, $143 = 0.0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0.0, $150 = 0, $151 = 0;
 var $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0.0, $27 = 0, $28 = 0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0.0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0.0, $65 = 0.0;
 var $66 = 0.0, $67 = 0.0, $68 = 0.0, $69 = 0.0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0.0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0;
 var $84 = 0, $85 = 0, $86 = 0.0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0.0, $91 = 0.0, $92 = 0.0, $93 = 0.0, $94 = 0, $95 = 0, $96 = 0, $97 = 0.0, $98 = 0, $99 = 0, $dgg = 0.0, $fp = 0.0, $g = 0;
 var $gam = 0.0, $gg = 0.0, $h = 0, $its = 0, $j = 0, $xi = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $p;
 $1 = $n;
 $2 = $ftol;
 $3 = $iter;
 $4 = $fret;
 $5 = $func;
 $6 = $dfunc;
 $7 = $1; //@line 38 "c_src/frprmn.c"
 $8 = (_vector($7)|0); //@line 38 "c_src/frprmn.c"
 $g = $8; //@line 38 "c_src/frprmn.c"
 $9 = $1; //@line 39 "c_src/frprmn.c"
 $10 = (_vector($9)|0); //@line 39 "c_src/frprmn.c"
 $h = $10; //@line 39 "c_src/frprmn.c"
 $11 = $1; //@line 40 "c_src/frprmn.c"
 $12 = (_vector($11)|0); //@line 40 "c_src/frprmn.c"
 $xi = $12; //@line 40 "c_src/frprmn.c"
 $13 = $5; //@line 41 "c_src/frprmn.c"
 $14 = $0; //@line 41 "c_src/frprmn.c"
 $15 = (+FUNCTION_TABLE_di[$13 & 1]($14)); //@line 41 "c_src/frprmn.c"
 $fp = $15; //@line 41 "c_src/frprmn.c"
 $16 = $6; //@line 42 "c_src/frprmn.c"
 $17 = $0; //@line 42 "c_src/frprmn.c"
 $18 = $xi; //@line 42 "c_src/frprmn.c"
 FUNCTION_TABLE_vii[$16 & 3]($17,$18); //@line 42 "c_src/frprmn.c"
 $j = 0; //@line 43 "c_src/frprmn.c"
 while(1) {
  $19 = $j; //@line 43 "c_src/frprmn.c"
  $20 = $1; //@line 43 "c_src/frprmn.c"
  $21 = ($19|0)<($20|0); //@line 43 "c_src/frprmn.c"
  if (!($21)) {
   break;
  }
  $22 = $j; //@line 44 "c_src/frprmn.c"
  $23 = $xi; //@line 44 "c_src/frprmn.c"
  $24 = (($23) + ($22<<2)|0); //@line 44 "c_src/frprmn.c"
  $25 = +HEAPF32[$24>>2]; //@line 44 "c_src/frprmn.c"
  $26 = -$25; //@line 44 "c_src/frprmn.c"
  $27 = $j; //@line 44 "c_src/frprmn.c"
  $28 = $g; //@line 44 "c_src/frprmn.c"
  $29 = (($28) + ($27<<2)|0); //@line 44 "c_src/frprmn.c"
  HEAPF32[$29>>2] = $26; //@line 44 "c_src/frprmn.c"
  $30 = $j; //@line 45 "c_src/frprmn.c"
  $31 = $g; //@line 45 "c_src/frprmn.c"
  $32 = (($31) + ($30<<2)|0); //@line 45 "c_src/frprmn.c"
  $33 = +HEAPF32[$32>>2]; //@line 45 "c_src/frprmn.c"
  $34 = $j; //@line 45 "c_src/frprmn.c"
  $35 = $h; //@line 45 "c_src/frprmn.c"
  $36 = (($35) + ($34<<2)|0); //@line 45 "c_src/frprmn.c"
  HEAPF32[$36>>2] = $33; //@line 45 "c_src/frprmn.c"
  $37 = $j; //@line 45 "c_src/frprmn.c"
  $38 = $xi; //@line 45 "c_src/frprmn.c"
  $39 = (($38) + ($37<<2)|0); //@line 45 "c_src/frprmn.c"
  HEAPF32[$39>>2] = $33; //@line 45 "c_src/frprmn.c"
  $40 = $j; //@line 43 "c_src/frprmn.c"
  $41 = (($40) + 1)|0; //@line 43 "c_src/frprmn.c"
  $j = $41; //@line 43 "c_src/frprmn.c"
 }
 $its = 0; //@line 47 "c_src/frprmn.c"
 while(1) {
  $42 = $its; //@line 47 "c_src/frprmn.c"
  $43 = ($42|0)<(200); //@line 47 "c_src/frprmn.c"
  if (!($43)) {
   label = 17;
   break;
  }
  $44 = $its; //@line 48 "c_src/frprmn.c"
  $45 = $3; //@line 48 "c_src/frprmn.c"
  HEAP32[$45>>2] = $44; //@line 48 "c_src/frprmn.c"
  $46 = $0; //@line 49 "c_src/frprmn.c"
  $47 = $xi; //@line 49 "c_src/frprmn.c"
  $48 = $1; //@line 49 "c_src/frprmn.c"
  $49 = $4; //@line 49 "c_src/frprmn.c"
  $50 = $5; //@line 49 "c_src/frprmn.c"
  _linmin($46,$47,$48,$49,$50); //@line 49 "c_src/frprmn.c"
  $51 = $4; //@line 50 "c_src/frprmn.c"
  $52 = +HEAPF32[$51>>2]; //@line 50 "c_src/frprmn.c"
  $53 = $fp; //@line 50 "c_src/frprmn.c"
  $54 = $52 - $53; //@line 50 "c_src/frprmn.c"
  $55 = $54; //@line 50 "c_src/frprmn.c"
  $56 = (+Math_abs((+$55))); //@line 50 "c_src/frprmn.c"
  $57 = 2.0 * $56; //@line 50 "c_src/frprmn.c"
  $58 = $2; //@line 50 "c_src/frprmn.c"
  $59 = $58; //@line 50 "c_src/frprmn.c"
  $60 = $4; //@line 50 "c_src/frprmn.c"
  $61 = +HEAPF32[$60>>2]; //@line 50 "c_src/frprmn.c"
  $62 = $61; //@line 50 "c_src/frprmn.c"
  $63 = (+Math_abs((+$62))); //@line 50 "c_src/frprmn.c"
  $64 = $fp; //@line 50 "c_src/frprmn.c"
  $65 = $64; //@line 50 "c_src/frprmn.c"
  $66 = (+Math_abs((+$65))); //@line 50 "c_src/frprmn.c"
  $67 = $63 + $66; //@line 50 "c_src/frprmn.c"
  $68 = $67 + 1.0E-10; //@line 50 "c_src/frprmn.c"
  $69 = $59 * $68; //@line 50 "c_src/frprmn.c"
  $70 = $57 <= $69; //@line 50 "c_src/frprmn.c"
  if ($70) {
   label = 7;
   break;
  }
  $74 = $5; //@line 54 "c_src/frprmn.c"
  $75 = $0; //@line 54 "c_src/frprmn.c"
  $76 = (+FUNCTION_TABLE_di[$74 & 1]($75)); //@line 54 "c_src/frprmn.c"
  $fp = $76; //@line 54 "c_src/frprmn.c"
  $77 = $6; //@line 55 "c_src/frprmn.c"
  $78 = $0; //@line 55 "c_src/frprmn.c"
  $79 = $xi; //@line 55 "c_src/frprmn.c"
  FUNCTION_TABLE_vii[$77 & 3]($78,$79); //@line 55 "c_src/frprmn.c"
  $gg = 0.0; //@line 56 "c_src/frprmn.c"
  $dgg = 0.0; //@line 56 "c_src/frprmn.c"
  $j = 0; //@line 57 "c_src/frprmn.c"
  while(1) {
   $80 = $j; //@line 57 "c_src/frprmn.c"
   $81 = $1; //@line 57 "c_src/frprmn.c"
   $82 = ($80|0)<($81|0); //@line 57 "c_src/frprmn.c"
   if (!($82)) {
    break;
   }
   $83 = $j; //@line 58 "c_src/frprmn.c"
   $84 = $g; //@line 58 "c_src/frprmn.c"
   $85 = (($84) + ($83<<2)|0); //@line 58 "c_src/frprmn.c"
   $86 = +HEAPF32[$85>>2]; //@line 58 "c_src/frprmn.c"
   $87 = $j; //@line 58 "c_src/frprmn.c"
   $88 = $g; //@line 58 "c_src/frprmn.c"
   $89 = (($88) + ($87<<2)|0); //@line 58 "c_src/frprmn.c"
   $90 = +HEAPF32[$89>>2]; //@line 58 "c_src/frprmn.c"
   $91 = $86 * $90; //@line 58 "c_src/frprmn.c"
   $92 = $gg; //@line 58 "c_src/frprmn.c"
   $93 = $92 + $91; //@line 58 "c_src/frprmn.c"
   $gg = $93; //@line 58 "c_src/frprmn.c"
   $94 = $j; //@line 59 "c_src/frprmn.c"
   $95 = $xi; //@line 59 "c_src/frprmn.c"
   $96 = (($95) + ($94<<2)|0); //@line 59 "c_src/frprmn.c"
   $97 = +HEAPF32[$96>>2]; //@line 59 "c_src/frprmn.c"
   $98 = $j; //@line 59 "c_src/frprmn.c"
   $99 = $g; //@line 59 "c_src/frprmn.c"
   $100 = (($99) + ($98<<2)|0); //@line 59 "c_src/frprmn.c"
   $101 = +HEAPF32[$100>>2]; //@line 59 "c_src/frprmn.c"
   $102 = $97 + $101; //@line 59 "c_src/frprmn.c"
   $103 = $j; //@line 59 "c_src/frprmn.c"
   $104 = $xi; //@line 59 "c_src/frprmn.c"
   $105 = (($104) + ($103<<2)|0); //@line 59 "c_src/frprmn.c"
   $106 = +HEAPF32[$105>>2]; //@line 59 "c_src/frprmn.c"
   $107 = $102 * $106; //@line 59 "c_src/frprmn.c"
   $108 = $dgg; //@line 59 "c_src/frprmn.c"
   $109 = $108 + $107; //@line 59 "c_src/frprmn.c"
   $dgg = $109; //@line 59 "c_src/frprmn.c"
   $110 = $j; //@line 57 "c_src/frprmn.c"
   $111 = (($110) + 1)|0; //@line 57 "c_src/frprmn.c"
   $j = $111; //@line 57 "c_src/frprmn.c"
  }
  $112 = $gg; //@line 61 "c_src/frprmn.c"
  $113 = $112; //@line 61 "c_src/frprmn.c"
  $114 = (+Math_abs((+$113))); //@line 61 "c_src/frprmn.c"
  $115 = $114 < 1.0E-10; //@line 61 "c_src/frprmn.c"
  if ($115) {
   label = 12;
   break;
  }
  $119 = $dgg; //@line 65 "c_src/frprmn.c"
  $120 = $gg; //@line 65 "c_src/frprmn.c"
  $121 = $119 / $120; //@line 65 "c_src/frprmn.c"
  $gam = $121; //@line 65 "c_src/frprmn.c"
  $j = 0; //@line 66 "c_src/frprmn.c"
  while(1) {
   $122 = $j; //@line 66 "c_src/frprmn.c"
   $123 = $1; //@line 66 "c_src/frprmn.c"
   $124 = ($122|0)<($123|0); //@line 66 "c_src/frprmn.c"
   if (!($124)) {
    break;
   }
   $125 = $j; //@line 67 "c_src/frprmn.c"
   $126 = $xi; //@line 67 "c_src/frprmn.c"
   $127 = (($126) + ($125<<2)|0); //@line 67 "c_src/frprmn.c"
   $128 = +HEAPF32[$127>>2]; //@line 67 "c_src/frprmn.c"
   $129 = -$128; //@line 67 "c_src/frprmn.c"
   $130 = $j; //@line 67 "c_src/frprmn.c"
   $131 = $g; //@line 67 "c_src/frprmn.c"
   $132 = (($131) + ($130<<2)|0); //@line 67 "c_src/frprmn.c"
   HEAPF32[$132>>2] = $129; //@line 67 "c_src/frprmn.c"
   $133 = $j; //@line 68 "c_src/frprmn.c"
   $134 = $g; //@line 68 "c_src/frprmn.c"
   $135 = (($134) + ($133<<2)|0); //@line 68 "c_src/frprmn.c"
   $136 = +HEAPF32[$135>>2]; //@line 68 "c_src/frprmn.c"
   $137 = $gam; //@line 68 "c_src/frprmn.c"
   $138 = $j; //@line 68 "c_src/frprmn.c"
   $139 = $h; //@line 68 "c_src/frprmn.c"
   $140 = (($139) + ($138<<2)|0); //@line 68 "c_src/frprmn.c"
   $141 = +HEAPF32[$140>>2]; //@line 68 "c_src/frprmn.c"
   $142 = $137 * $141; //@line 68 "c_src/frprmn.c"
   $143 = $136 + $142; //@line 68 "c_src/frprmn.c"
   $144 = $j; //@line 68 "c_src/frprmn.c"
   $145 = $h; //@line 68 "c_src/frprmn.c"
   $146 = (($145) + ($144<<2)|0); //@line 68 "c_src/frprmn.c"
   HEAPF32[$146>>2] = $143; //@line 68 "c_src/frprmn.c"
   $147 = $j; //@line 68 "c_src/frprmn.c"
   $148 = $xi; //@line 68 "c_src/frprmn.c"
   $149 = (($148) + ($147<<2)|0); //@line 68 "c_src/frprmn.c"
   HEAPF32[$149>>2] = $143; //@line 68 "c_src/frprmn.c"
   $150 = $j; //@line 66 "c_src/frprmn.c"
   $151 = (($150) + 1)|0; //@line 66 "c_src/frprmn.c"
   $j = $151; //@line 66 "c_src/frprmn.c"
  }
  $152 = $its; //@line 47 "c_src/frprmn.c"
  $153 = (($152) + 1)|0; //@line 47 "c_src/frprmn.c"
  $its = $153; //@line 47 "c_src/frprmn.c"
 }
 if ((label|0) == 7) {
  $71 = $xi; //@line 51 "c_src/frprmn.c"
  _free($71); //@line 51 "c_src/frprmn.c"
  $72 = $h; //@line 51 "c_src/frprmn.c"
  _free($72); //@line 51 "c_src/frprmn.c"
  $73 = $g; //@line 51 "c_src/frprmn.c"
  _free($73); //@line 51 "c_src/frprmn.c"
  STACKTOP = sp;return; //@line 73 "c_src/frprmn.c"
 }
 else if ((label|0) == 12) {
  $116 = $xi; //@line 62 "c_src/frprmn.c"
  _free($116); //@line 62 "c_src/frprmn.c"
  $117 = $h; //@line 62 "c_src/frprmn.c"
  _free($117); //@line 62 "c_src/frprmn.c"
  $118 = $g; //@line 62 "c_src/frprmn.c"
  _free($118); //@line 62 "c_src/frprmn.c"
  STACKTOP = sp;return; //@line 73 "c_src/frprmn.c"
 }
 else if ((label|0) == 17) {
  $154 = $xi; //@line 71 "c_src/frprmn.c"
  _free($154); //@line 71 "c_src/frprmn.c"
  $155 = $h; //@line 71 "c_src/frprmn.c"
  _free($155); //@line 71 "c_src/frprmn.c"
  $156 = $g; //@line 71 "c_src/frprmn.c"
  _free($156); //@line 71 "c_src/frprmn.c"
  _rt_error(168); //@line 72 "c_src/frprmn.c"
  STACKTOP = sp;return; //@line 73 "c_src/frprmn.c"
 }
}
function _initDMT($fname) {
 $fname = $fname|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0.0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0;
 var $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $buf = 0, $fp = 0, $i = 0, $ij = 0, $j = 0, $p = 0, $pend = 0, $rowMaxLen = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $pend = sp + 24|0;
 $0 = $fname;
 $1 = HEAP32[216>>2]|0; //@line 36 "minimizer.c"
 $2 = ($1*11)|0; //@line 36 "minimizer.c"
 $rowMaxLen = $2; //@line 36 "minimizer.c"
 $3 = $rowMaxLen; //@line 37 "minimizer.c"
 $4 = $3; //@line 37 "minimizer.c"
 $5 = (_malloc($4)|0); //@line 37 "minimizer.c"
 $buf = $5; //@line 37 "minimizer.c"
 $6 = $0; //@line 38 "minimizer.c"
 $7 = (_fopen(($6|0),(224|0))|0); //@line 38 "minimizer.c"
 $fp = $7; //@line 38 "minimizer.c"
 $8 = $buf; //@line 40 "minimizer.c"
 $9 = ($8|0)==(0|0); //@line 40 "minimizer.c"
 if ($9) {
  _rt_error(232); //@line 41 "minimizer.c"
 }
 $10 = $fp; //@line 43 "minimizer.c"
 $11 = ($10|0)==(0|0); //@line 43 "minimizer.c"
 if ($11) {
  _rt_error(272); //@line 44 "minimizer.c"
 }
 $i = 0; //@line 47 "minimizer.c"
 while(1) {
  $12 = $i; //@line 47 "minimizer.c"
  $13 = HEAP32[216>>2]|0; //@line 47 "minimizer.c"
  $14 = ($12|0)<($13|0); //@line 47 "minimizer.c"
  if (!($14)) {
   break;
  }
  $15 = $buf; //@line 48 "minimizer.c"
  $16 = $rowMaxLen; //@line 48 "minimizer.c"
  $17 = $fp; //@line 48 "minimizer.c"
  (_fgets(($15|0),($16|0),($17|0))|0); //@line 48 "minimizer.c"
  $18 = $buf; //@line 49 "minimizer.c"
  $p = $18; //@line 49 "minimizer.c"
  $j = 0; //@line 50 "minimizer.c"
  while(1) {
   $19 = $j; //@line 50 "minimizer.c"
   $20 = HEAP32[216>>2]|0; //@line 50 "minimizer.c"
   $21 = ($19|0)<($20|0); //@line 50 "minimizer.c"
   if (!($21)) {
    break;
   }
   $22 = $j; //@line 51 "minimizer.c"
   $23 = $i; //@line 51 "minimizer.c"
   $24 = HEAP32[216>>2]|0; //@line 51 "minimizer.c"
   $25 = Math_imul($23, $24)|0; //@line 51 "minimizer.c"
   $26 = (($22) + ($25))|0; //@line 51 "minimizer.c"
   $ij = $26; //@line 51 "minimizer.c"
   $27 = $p; //@line 52 "minimizer.c"
   $28 = (+_strtof($27,$pend)); //@line 52 "minimizer.c"
   $29 = $ij; //@line 52 "minimizer.c"
   $30 = HEAP32[312>>2]|0; //@line 52 "minimizer.c"
   $31 = (($30) + ($29<<2)|0); //@line 52 "minimizer.c"
   HEAPF32[$31>>2] = $28; //@line 52 "minimizer.c"
   $32 = $ij; //@line 53 "minimizer.c"
   $33 = HEAP32[312>>2]|0; //@line 53 "minimizer.c"
   $34 = (($33) + ($32<<2)|0); //@line 53 "minimizer.c"
   $35 = +HEAPF32[$34>>2]; //@line 53 "minimizer.c"
   $36 = $35; //@line 53 "minimizer.c"
   $37 = (+Math_abs((+$36))); //@line 53 "minimizer.c"
   $38 = $37 < 0.10000000000000001; //@line 53 "minimizer.c"
   if ($38) {
    $39 = $ij; //@line 54 "minimizer.c"
    $40 = HEAP32[312>>2]|0; //@line 54 "minimizer.c"
    $41 = (($40) + ($39<<2)|0); //@line 54 "minimizer.c"
    HEAPF32[$41>>2] = 0.10000000149011612; //@line 54 "minimizer.c"
   }
   $42 = HEAP32[$pend>>2]|0; //@line 56 "minimizer.c"
   $43 = ((($42)) + 1|0); //@line 56 "minimizer.c"
   $p = $43; //@line 56 "minimizer.c"
   $44 = $j; //@line 50 "minimizer.c"
   $45 = (($44) + 1)|0; //@line 50 "minimizer.c"
   $j = $45; //@line 50 "minimizer.c"
  }
  $46 = $i; //@line 47 "minimizer.c"
  $47 = (($46) + 1)|0; //@line 47 "minimizer.c"
  $i = $47; //@line 47 "minimizer.c"
 }
 $48 = $fp; //@line 60 "minimizer.c"
 (_fclose(($48|0))|0); //@line 60 "minimizer.c"
 $49 = $buf; //@line 61 "minimizer.c"
 _free($49); //@line 61 "minimizer.c"
 STACKTOP = sp;return; //@line 62 "minimizer.c"
}
function _initFPS($ps) {
 $ps = $ps|0;
 var $0 = 0, $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0, $13 = 0, $14 = 0, $15 = 0.0, $16 = 0.0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0.0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0.0;
 var $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0.0, $40 = 0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0;
 var $45 = 0.0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0.0, $60 = 0, $61 = 0, $62 = 0;
 var $7 = 0.0, $8 = 0, $9 = 0.0, $cols = 0, $gapx = 0.0, $gapy = 0.0, $i = 0, $n = 0, $offsetx = 0.0, $offsety = 0.0, $rows = 0, $vdim = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $ps;
 $1 = HEAP32[216>>2]|0; //@line 68 "minimizer.c"
 $n = $1; //@line 68 "minimizer.c"
 while(1) {
  $2 = $n; //@line 69 "minimizer.c"
  $3 = (+($2|0)); //@line 69 "minimizer.c"
  $4 = (+Math_sqrt((+$3))); //@line 69 "minimizer.c"
  $5 = $n; //@line 69 "minimizer.c"
  $6 = (+($5|0)); //@line 69 "minimizer.c"
  $7 = (+Math_sqrt((+$6))); //@line 69 "minimizer.c"
  $8 = (~~(($7))); //@line 69 "minimizer.c"
  $9 = (+($8|0)); //@line 69 "minimizer.c"
  $10 = $4 - $9; //@line 69 "minimizer.c"
  $11 = (+Math_abs((+$10))); //@line 69 "minimizer.c"
  $12 = $11 > 0.01; //@line 69 "minimizer.c"
  $13 = $n; //@line 70 "minimizer.c"
  if (!($12)) {
   break;
  }
  $14 = (($13) + 1)|0; //@line 70 "minimizer.c"
  $n = $14; //@line 70 "minimizer.c"
 }
 $15 = (+($13|0)); //@line 72 "minimizer.c"
 $16 = (+Math_sqrt((+$15))); //@line 72 "minimizer.c"
 $17 = (~~(($16))); //@line 72 "minimizer.c"
 $vdim = $17; //@line 72 "minimizer.c"
 $18 = HEAP32[320>>2]|0; //@line 73 "minimizer.c"
 $19 = $vdim; //@line 73 "minimizer.c"
 $20 = (($18|0) / ($19|0))&-1; //@line 73 "minimizer.c"
 $21 = (+($20|0)); //@line 73 "minimizer.c"
 $gapx = $21; //@line 73 "minimizer.c"
 $22 = HEAP32[328>>2]|0; //@line 74 "minimizer.c"
 $23 = $vdim; //@line 74 "minimizer.c"
 $24 = (($22|0) / ($23|0))&-1; //@line 74 "minimizer.c"
 $25 = (+($24|0)); //@line 74 "minimizer.c"
 $gapy = $25; //@line 74 "minimizer.c"
 $26 = $gapx; //@line 75 "minimizer.c"
 $27 = $26 / 2.0; //@line 75 "minimizer.c"
 $offsetx = $27; //@line 75 "minimizer.c"
 $28 = $gapy; //@line 76 "minimizer.c"
 $29 = $28 / 2.0; //@line 76 "minimizer.c"
 $offsety = $29; //@line 76 "minimizer.c"
 $rows = 0; //@line 77 "minimizer.c"
 $cols = -1; //@line 78 "minimizer.c"
 $i = 0; //@line 79 "minimizer.c"
 while(1) {
  $30 = $i; //@line 79 "minimizer.c"
  $31 = HEAP32[336>>2]|0; //@line 79 "minimizer.c"
  $32 = ($30|0)<($31|0); //@line 79 "minimizer.c"
  if (!($32)) {
   break;
  }
  $33 = $i; //@line 80 "minimizer.c"
  $34 = $vdim; //@line 80 "minimizer.c"
  $35 = $34<<1; //@line 80 "minimizer.c"
  $36 = (($33|0) % ($35|0))&-1; //@line 80 "minimizer.c"
  $37 = ($36|0)==(0); //@line 80 "minimizer.c"
  if ($37) {
   $38 = $rows; //@line 81 "minimizer.c"
   $39 = (($38) + 1)|0; //@line 81 "minimizer.c"
   $rows = $39; //@line 81 "minimizer.c"
   $cols = 0; //@line 82 "minimizer.c"
  }
  $40 = $cols; //@line 84 "minimizer.c"
  $41 = (+($40|0)); //@line 84 "minimizer.c"
  $42 = $gapx; //@line 84 "minimizer.c"
  $43 = $41 * $42; //@line 84 "minimizer.c"
  $44 = $offsetx; //@line 84 "minimizer.c"
  $45 = $43 + $44; //@line 84 "minimizer.c"
  $46 = $i; //@line 84 "minimizer.c"
  $47 = $0; //@line 84 "minimizer.c"
  $48 = (($47) + ($46<<2)|0); //@line 84 "minimizer.c"
  HEAPF32[$48>>2] = $45; //@line 84 "minimizer.c"
  $49 = $rows; //@line 85 "minimizer.c"
  $50 = (+($49|0)); //@line 85 "minimizer.c"
  $51 = $gapy; //@line 85 "minimizer.c"
  $52 = $50 * $51; //@line 85 "minimizer.c"
  $53 = $offsety; //@line 85 "minimizer.c"
  $54 = $52 + $53; //@line 85 "minimizer.c"
  $55 = $i; //@line 85 "minimizer.c"
  $56 = (($55) + 1)|0; //@line 85 "minimizer.c"
  $57 = $0; //@line 85 "minimizer.c"
  $58 = (($57) + ($56<<2)|0); //@line 85 "minimizer.c"
  HEAPF32[$58>>2] = $54; //@line 85 "minimizer.c"
  $59 = $cols; //@line 86 "minimizer.c"
  $60 = (($59) + 1)|0; //@line 86 "minimizer.c"
  $cols = $60; //@line 86 "minimizer.c"
  $61 = $i; //@line 79 "minimizer.c"
  $62 = (($61) + 2)|0; //@line 79 "minimizer.c"
  $i = $62; //@line 79 "minimizer.c"
 }
 STACKTOP = sp;return; //@line 88 "minimizer.c"
}
function _energy($xi,$yi,$xj,$yj,$wij,$dij) {
 $xi = +$xi;
 $yi = +$yi;
 $xj = +$xj;
 $yj = +$yj;
 $wij = +$wij;
 $dij = +$dij;
 var $0 = 0.0, $1 = 0.0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0, $26 = 0.0;
 var $27 = 0.0, $28 = 0.0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $4 = 0.0, $5 = 0.0, $6 = 0.0, $7 = 0.0, $8 = 0.0, $9 = 0.0, $dist = 0.0, $dx = 0.0, $dy = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $xi;
 $1 = $yi;
 $2 = $xj;
 $3 = $yj;
 $4 = $wij;
 $5 = $dij;
 $6 = $0; //@line 92 "minimizer.c"
 $7 = $2; //@line 92 "minimizer.c"
 $8 = $6 - $7; //@line 92 "minimizer.c"
 $dx = $8; //@line 92 "minimizer.c"
 $9 = $1; //@line 93 "minimizer.c"
 $10 = $3; //@line 93 "minimizer.c"
 $11 = $9 - $10; //@line 93 "minimizer.c"
 $dy = $11; //@line 93 "minimizer.c"
 $12 = $dx; //@line 94 "minimizer.c"
 $13 = $dx; //@line 94 "minimizer.c"
 $14 = $12 * $13; //@line 94 "minimizer.c"
 $15 = $dy; //@line 94 "minimizer.c"
 $16 = $dy; //@line 94 "minimizer.c"
 $17 = $15 * $16; //@line 94 "minimizer.c"
 $18 = $14 + $17; //@line 94 "minimizer.c"
 $19 = $18; //@line 94 "minimizer.c"
 $20 = (+Math_sqrt((+$19))); //@line 94 "minimizer.c"
 $21 = $20; //@line 94 "minimizer.c"
 $dist = $21; //@line 94 "minimizer.c"
 $22 = $dist; //@line 95 "minimizer.c"
 $23 = $22; //@line 95 "minimizer.c"
 $24 = (+Math_abs((+$23))); //@line 95 "minimizer.c"
 $25 = $24 < 0.10000000000000001; //@line 95 "minimizer.c"
 if ($25) {
  $dist = 1.0; //@line 96 "minimizer.c"
 }
 $26 = $4; //@line 98 "minimizer.c"
 $27 = $dist; //@line 98 "minimizer.c"
 $28 = $5; //@line 98 "minimizer.c"
 $29 = $27 - $28; //@line 98 "minimizer.c"
 $30 = $29; //@line 98 "minimizer.c"
 $31 = (+Math_pow((+$30),2.0)); //@line 98 "minimizer.c"
 $32 = $31; //@line 98 "minimizer.c"
 $33 = $26 * $32; //@line 98 "minimizer.c"
 STACKTOP = sp;return (+$33); //@line 98 "minimizer.c"
}
function _force($xi,$yi,$xj,$yj,$wij,$dij,$dir) {
 $xi = +$xi;
 $yi = +$yi;
 $xj = +$xj;
 $yj = +$yj;
 $wij = +$wij;
 $dij = +$dij;
 $dir = $dir|0;
 var $0 = 0.0, $1 = 0.0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0.0, $26 = 0.0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0.0, $30 = 0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0.0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0.0, $40 = 0.0, $41 = 0.0, $42 = 0.0, $43 = 0.0, $44 = 0.0;
 var $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0.0, $5 = 0.0, $6 = 0.0, $7 = 0, $8 = 0.0, $9 = 0.0, $dist = 0.0, $dx = 0.0, $dy = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $1 = $xi;
 $2 = $yi;
 $3 = $xj;
 $4 = $yj;
 $5 = $wij;
 $6 = $dij;
 $7 = $dir;
 $8 = $1; //@line 104 "minimizer.c"
 $9 = $3; //@line 104 "minimizer.c"
 $10 = $8 - $9; //@line 104 "minimizer.c"
 $dx = $10; //@line 104 "minimizer.c"
 $11 = $2; //@line 105 "minimizer.c"
 $12 = $4; //@line 105 "minimizer.c"
 $13 = $11 - $12; //@line 105 "minimizer.c"
 $dy = $13; //@line 105 "minimizer.c"
 $14 = $dx; //@line 106 "minimizer.c"
 $15 = $dx; //@line 106 "minimizer.c"
 $16 = $14 * $15; //@line 106 "minimizer.c"
 $17 = $dy; //@line 106 "minimizer.c"
 $18 = $dy; //@line 106 "minimizer.c"
 $19 = $17 * $18; //@line 106 "minimizer.c"
 $20 = $16 + $19; //@line 106 "minimizer.c"
 $21 = $20; //@line 106 "minimizer.c"
 $22 = (+Math_sqrt((+$21))); //@line 106 "minimizer.c"
 $23 = $22; //@line 106 "minimizer.c"
 $dist = $23; //@line 106 "minimizer.c"
 $24 = $dist; //@line 107 "minimizer.c"
 $25 = $24; //@line 107 "minimizer.c"
 $26 = (+Math_abs((+$25))); //@line 107 "minimizer.c"
 $27 = $26 < 0.10000000000000001; //@line 107 "minimizer.c"
 if ($27) {
  $dist = 1.0; //@line 108 "minimizer.c"
 }
 $28 = $7; //@line 110 "minimizer.c"
 $29 = $28 << 24 >> 24; //@line 110 "minimizer.c"
 $30 = ($29|0)==(120); //@line 110 "minimizer.c"
 $31 = $5; //@line 111 "minimizer.c"
 $32 = -2.0 * $31; //@line 111 "minimizer.c"
 if ($30) {
  $33 = $dx; //@line 111 "minimizer.c"
  $34 = $32 * $33; //@line 111 "minimizer.c"
  $35 = $dist; //@line 111 "minimizer.c"
  $36 = $6; //@line 111 "minimizer.c"
  $37 = $35 - $36; //@line 111 "minimizer.c"
  $38 = $34 * $37; //@line 111 "minimizer.c"
  $39 = $dist; //@line 111 "minimizer.c"
  $40 = $38 / $39; //@line 111 "minimizer.c"
  $0 = $40; //@line 111 "minimizer.c"
  $49 = $0; //@line 114 "minimizer.c"
  STACKTOP = sp;return (+$49); //@line 114 "minimizer.c"
 } else {
  $41 = $dy; //@line 113 "minimizer.c"
  $42 = $32 * $41; //@line 113 "minimizer.c"
  $43 = $dist; //@line 113 "minimizer.c"
  $44 = $6; //@line 113 "minimizer.c"
  $45 = $43 - $44; //@line 113 "minimizer.c"
  $46 = $42 * $45; //@line 113 "minimizer.c"
  $47 = $dist; //@line 113 "minimizer.c"
  $48 = $46 / $47; //@line 113 "minimizer.c"
  $0 = $48; //@line 113 "minimizer.c"
  $49 = $0; //@line 114 "minimizer.c"
  STACKTOP = sp;return (+$49); //@line 114 "minimizer.c"
 }
 return +(0.0);
}
function _calcFunction($p) {
 $p = $p|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0.0, $2 = 0, $20 = 0, $21 = 0.0, $22 = 0.0, $23 = 0, $24 = 0.0, $25 = 0.0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0.0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0.0, $35 = 0, $36 = 0, $37 = 0, $38 = 0.0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0;
 var $45 = 0.0, $46 = 0.0, $47 = 0.0, $48 = 0.0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $d = 0.0, $dij = 0.0, $i = 0, $j = 0, $rtn = 0.0, $wij = 0.0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $p;
 $rtn = 0.0; //@line 120 "minimizer.c"
 $i = 0; //@line 121 "minimizer.c"
 while(1) {
  $1 = $i; //@line 121 "minimizer.c"
  $2 = HEAP32[336>>2]|0; //@line 121 "minimizer.c"
  $3 = (($2) - 1)|0; //@line 121 "minimizer.c"
  $4 = ($1|0)<($3|0); //@line 121 "minimizer.c"
  if (!($4)) {
   break;
  }
  $5 = $i; //@line 122 "minimizer.c"
  $6 = (($5) + 2)|0; //@line 122 "minimizer.c"
  $j = $6; //@line 122 "minimizer.c"
  while(1) {
   $7 = $j; //@line 122 "minimizer.c"
   $8 = HEAP32[336>>2]|0; //@line 122 "minimizer.c"
   $9 = ($7|0)<($8|0); //@line 122 "minimizer.c"
   $10 = $i; //@line 123 "minimizer.c"
   if (!($9)) {
    break;
   }
   $11 = (($10|0) / 2)&-1; //@line 123 "minimizer.c"
   $12 = HEAP32[216>>2]|0; //@line 123 "minimizer.c"
   $13 = Math_imul($11, $12)|0; //@line 123 "minimizer.c"
   $14 = $j; //@line 123 "minimizer.c"
   $15 = (($14|0) / 2)&-1; //@line 123 "minimizer.c"
   $16 = (($13) + ($15))|0; //@line 123 "minimizer.c"
   $17 = HEAP32[312>>2]|0; //@line 123 "minimizer.c"
   $18 = (($17) + ($16<<2)|0); //@line 123 "minimizer.c"
   $19 = +HEAPF32[$18>>2]; //@line 123 "minimizer.c"
   $d = $19; //@line 123 "minimizer.c"
   $20 = HEAP32[344>>2]|0; //@line 124 "minimizer.c"
   $21 = (+($20|0)); //@line 124 "minimizer.c"
   $wij = $21; //@line 124 "minimizer.c"
   $22 = $d; //@line 125 "minimizer.c"
   $23 = HEAP32[352>>2]|0; //@line 125 "minimizer.c"
   $24 = (+($23|0)); //@line 125 "minimizer.c"
   $25 = $22 * $24; //@line 125 "minimizer.c"
   $dij = $25; //@line 125 "minimizer.c"
   $26 = $i; //@line 126 "minimizer.c"
   $27 = $0; //@line 126 "minimizer.c"
   $28 = (($27) + ($26<<2)|0); //@line 126 "minimizer.c"
   $29 = +HEAPF32[$28>>2]; //@line 126 "minimizer.c"
   $30 = $i; //@line 126 "minimizer.c"
   $31 = (($30) + 1)|0; //@line 126 "minimizer.c"
   $32 = $0; //@line 126 "minimizer.c"
   $33 = (($32) + ($31<<2)|0); //@line 126 "minimizer.c"
   $34 = +HEAPF32[$33>>2]; //@line 126 "minimizer.c"
   $35 = $j; //@line 126 "minimizer.c"
   $36 = $0; //@line 126 "minimizer.c"
   $37 = (($36) + ($35<<2)|0); //@line 126 "minimizer.c"
   $38 = +HEAPF32[$37>>2]; //@line 126 "minimizer.c"
   $39 = $j; //@line 126 "minimizer.c"
   $40 = (($39) + 1)|0; //@line 126 "minimizer.c"
   $41 = $0; //@line 126 "minimizer.c"
   $42 = (($41) + ($40<<2)|0); //@line 126 "minimizer.c"
   $43 = +HEAPF32[$42>>2]; //@line 126 "minimizer.c"
   $44 = $wij; //@line 126 "minimizer.c"
   $45 = $dij; //@line 126 "minimizer.c"
   $46 = (+_energy($29,$34,$38,$43,$44,$45)); //@line 126 "minimizer.c"
   $47 = $rtn; //@line 126 "minimizer.c"
   $48 = $47 + $46; //@line 126 "minimizer.c"
   $rtn = $48; //@line 126 "minimizer.c"
   $49 = $j; //@line 122 "minimizer.c"
   $50 = (($49) + 2)|0; //@line 122 "minimizer.c"
   $j = $50; //@line 122 "minimizer.c"
  }
  $51 = (($10) + 2)|0; //@line 121 "minimizer.c"
  $i = $51; //@line 121 "minimizer.c"
 }
 $52 = $rtn; //@line 129 "minimizer.c"
 STACKTOP = sp;return (+$52); //@line 129 "minimizer.c"
}
function _calcGradient($p,$df) {
 $p = $p|0;
 $df = $df|0;
 var $0 = 0, $1 = 0, $10 = 0, $100 = 0.0, $101 = 0, $102 = 0, $103 = 0, $104 = 0.0, $105 = 0.0, $106 = 0, $107 = 0, $108 = 0, $109 = 0.0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0.0, $115 = 0;
 var $116 = 0, $117 = 0, $118 = 0.0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0.0, $124 = 0.0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0.0, $133 = 0.0;
 var $134 = 0, $135 = 0, $136 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0.0, $2 = 0, $20 = 0, $21 = 0.0, $22 = 0.0, $23 = 0, $24 = 0.0, $25 = 0.0, $26 = 0, $27 = 0, $28 = 0, $29 = 0.0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0.0, $35 = 0, $36 = 0, $37 = 0, $38 = 0.0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0.0, $61 = 0, $62 = 0, $63 = 0, $64 = 0.0, $65 = 0;
 var $66 = 0, $67 = 0, $68 = 0, $69 = 0.0, $7 = 0, $70 = 0.0, $71 = 0.0, $72 = 0.0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0.0, $78 = 0.0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0.0, $83 = 0;
 var $84 = 0, $85 = 0, $86 = 0, $87 = 0.0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0.0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0.0, $97 = 0.0, $98 = 0.0, $99 = 0.0, $d = 0.0, $dij = 0.0, $i = 0;
 var $j = 0, $wij = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $p;
 $1 = $df;
 $i = 0; //@line 136 "minimizer.c"
 while(1) {
  $2 = $i; //@line 136 "minimizer.c"
  $3 = HEAP32[336>>2]|0; //@line 136 "minimizer.c"
  $4 = ($2|0)<($3|0); //@line 136 "minimizer.c"
  if (!($4)) {
   break;
  }
  $5 = $i; //@line 137 "minimizer.c"
  $6 = (($5) + 2)|0; //@line 137 "minimizer.c"
  $j = $6; //@line 137 "minimizer.c"
  while(1) {
   $7 = $j; //@line 137 "minimizer.c"
   $8 = HEAP32[336>>2]|0; //@line 137 "minimizer.c"
   $9 = ($7|0)<($8|0); //@line 137 "minimizer.c"
   $10 = $i; //@line 138 "minimizer.c"
   if (!($9)) {
    break;
   }
   $11 = (($10|0) / 2)&-1; //@line 138 "minimizer.c"
   $12 = HEAP32[216>>2]|0; //@line 138 "minimizer.c"
   $13 = Math_imul($11, $12)|0; //@line 138 "minimizer.c"
   $14 = $j; //@line 138 "minimizer.c"
   $15 = (($14|0) / 2)&-1; //@line 138 "minimizer.c"
   $16 = (($13) + ($15))|0; //@line 138 "minimizer.c"
   $17 = HEAP32[312>>2]|0; //@line 138 "minimizer.c"
   $18 = (($17) + ($16<<2)|0); //@line 138 "minimizer.c"
   $19 = +HEAPF32[$18>>2]; //@line 138 "minimizer.c"
   $d = $19; //@line 138 "minimizer.c"
   $20 = HEAP32[344>>2]|0; //@line 139 "minimizer.c"
   $21 = (+($20|0)); //@line 139 "minimizer.c"
   $wij = $21; //@line 139 "minimizer.c"
   $22 = $d; //@line 140 "minimizer.c"
   $23 = HEAP32[352>>2]|0; //@line 140 "minimizer.c"
   $24 = (+($23|0)); //@line 140 "minimizer.c"
   $25 = $22 * $24; //@line 140 "minimizer.c"
   $dij = $25; //@line 140 "minimizer.c"
   $26 = $i; //@line 141 "minimizer.c"
   $27 = $0; //@line 141 "minimizer.c"
   $28 = (($27) + ($26<<2)|0); //@line 141 "minimizer.c"
   $29 = +HEAPF32[$28>>2]; //@line 141 "minimizer.c"
   $30 = $i; //@line 141 "minimizer.c"
   $31 = (($30) + 1)|0; //@line 141 "minimizer.c"
   $32 = $0; //@line 141 "minimizer.c"
   $33 = (($32) + ($31<<2)|0); //@line 141 "minimizer.c"
   $34 = +HEAPF32[$33>>2]; //@line 141 "minimizer.c"
   $35 = $j; //@line 141 "minimizer.c"
   $36 = $0; //@line 141 "minimizer.c"
   $37 = (($36) + ($35<<2)|0); //@line 141 "minimizer.c"
   $38 = +HEAPF32[$37>>2]; //@line 141 "minimizer.c"
   $39 = $j; //@line 141 "minimizer.c"
   $40 = (($39) + 1)|0; //@line 141 "minimizer.c"
   $41 = $0; //@line 141 "minimizer.c"
   $42 = (($41) + ($40<<2)|0); //@line 141 "minimizer.c"
   $43 = +HEAPF32[$42>>2]; //@line 141 "minimizer.c"
   $44 = $wij; //@line 141 "minimizer.c"
   $45 = $dij; //@line 141 "minimizer.c"
   $46 = (+_force($29,$34,$38,$43,$44,$45,120)); //@line 141 "minimizer.c"
   $47 = $i; //@line 141 "minimizer.c"
   $48 = $1; //@line 141 "minimizer.c"
   $49 = (($48) + ($47<<2)|0); //@line 141 "minimizer.c"
   $50 = +HEAPF32[$49>>2]; //@line 141 "minimizer.c"
   $51 = $50 + $46; //@line 141 "minimizer.c"
   HEAPF32[$49>>2] = $51; //@line 141 "minimizer.c"
   $52 = $i; //@line 142 "minimizer.c"
   $53 = $0; //@line 142 "minimizer.c"
   $54 = (($53) + ($52<<2)|0); //@line 142 "minimizer.c"
   $55 = +HEAPF32[$54>>2]; //@line 142 "minimizer.c"
   $56 = $i; //@line 142 "minimizer.c"
   $57 = (($56) + 1)|0; //@line 142 "minimizer.c"
   $58 = $0; //@line 142 "minimizer.c"
   $59 = (($58) + ($57<<2)|0); //@line 142 "minimizer.c"
   $60 = +HEAPF32[$59>>2]; //@line 142 "minimizer.c"
   $61 = $j; //@line 142 "minimizer.c"
   $62 = $0; //@line 142 "minimizer.c"
   $63 = (($62) + ($61<<2)|0); //@line 142 "minimizer.c"
   $64 = +HEAPF32[$63>>2]; //@line 142 "minimizer.c"
   $65 = $j; //@line 142 "minimizer.c"
   $66 = (($65) + 1)|0; //@line 142 "minimizer.c"
   $67 = $0; //@line 142 "minimizer.c"
   $68 = (($67) + ($66<<2)|0); //@line 142 "minimizer.c"
   $69 = +HEAPF32[$68>>2]; //@line 142 "minimizer.c"
   $70 = $wij; //@line 142 "minimizer.c"
   $71 = $dij; //@line 142 "minimizer.c"
   $72 = (+_force($55,$60,$64,$69,$70,$71,121)); //@line 142 "minimizer.c"
   $73 = $i; //@line 142 "minimizer.c"
   $74 = (($73) + 1)|0; //@line 142 "minimizer.c"
   $75 = $1; //@line 142 "minimizer.c"
   $76 = (($75) + ($74<<2)|0); //@line 142 "minimizer.c"
   $77 = +HEAPF32[$76>>2]; //@line 142 "minimizer.c"
   $78 = $77 + $72; //@line 142 "minimizer.c"
   HEAPF32[$76>>2] = $78; //@line 142 "minimizer.c"
   $79 = $i; //@line 143 "minimizer.c"
   $80 = $0; //@line 143 "minimizer.c"
   $81 = (($80) + ($79<<2)|0); //@line 143 "minimizer.c"
   $82 = +HEAPF32[$81>>2]; //@line 143 "minimizer.c"
   $83 = $i; //@line 143 "minimizer.c"
   $84 = (($83) + 1)|0; //@line 143 "minimizer.c"
   $85 = $0; //@line 143 "minimizer.c"
   $86 = (($85) + ($84<<2)|0); //@line 143 "minimizer.c"
   $87 = +HEAPF32[$86>>2]; //@line 143 "minimizer.c"
   $88 = $j; //@line 143 "minimizer.c"
   $89 = $0; //@line 143 "minimizer.c"
   $90 = (($89) + ($88<<2)|0); //@line 143 "minimizer.c"
   $91 = +HEAPF32[$90>>2]; //@line 143 "minimizer.c"
   $92 = $j; //@line 143 "minimizer.c"
   $93 = (($92) + 1)|0; //@line 143 "minimizer.c"
   $94 = $0; //@line 143 "minimizer.c"
   $95 = (($94) + ($93<<2)|0); //@line 143 "minimizer.c"
   $96 = +HEAPF32[$95>>2]; //@line 143 "minimizer.c"
   $97 = $wij; //@line 143 "minimizer.c"
   $98 = $dij; //@line 143 "minimizer.c"
   $99 = (+_force($82,$87,$91,$96,$97,$98,120)); //@line 143 "minimizer.c"
   $100 = -$99; //@line 143 "minimizer.c"
   $101 = $j; //@line 143 "minimizer.c"
   $102 = $1; //@line 143 "minimizer.c"
   $103 = (($102) + ($101<<2)|0); //@line 143 "minimizer.c"
   $104 = +HEAPF32[$103>>2]; //@line 143 "minimizer.c"
   $105 = $104 + $100; //@line 143 "minimizer.c"
   HEAPF32[$103>>2] = $105; //@line 143 "minimizer.c"
   $106 = $i; //@line 144 "minimizer.c"
   $107 = $0; //@line 144 "minimizer.c"
   $108 = (($107) + ($106<<2)|0); //@line 144 "minimizer.c"
   $109 = +HEAPF32[$108>>2]; //@line 144 "minimizer.c"
   $110 = $i; //@line 144 "minimizer.c"
   $111 = (($110) + 1)|0; //@line 144 "minimizer.c"
   $112 = $0; //@line 144 "minimizer.c"
   $113 = (($112) + ($111<<2)|0); //@line 144 "minimizer.c"
   $114 = +HEAPF32[$113>>2]; //@line 144 "minimizer.c"
   $115 = $j; //@line 144 "minimizer.c"
   $116 = $0; //@line 144 "minimizer.c"
   $117 = (($116) + ($115<<2)|0); //@line 144 "minimizer.c"
   $118 = +HEAPF32[$117>>2]; //@line 144 "minimizer.c"
   $119 = $j; //@line 144 "minimizer.c"
   $120 = (($119) + 1)|0; //@line 144 "minimizer.c"
   $121 = $0; //@line 144 "minimizer.c"
   $122 = (($121) + ($120<<2)|0); //@line 144 "minimizer.c"
   $123 = +HEAPF32[$122>>2]; //@line 144 "minimizer.c"
   $124 = $wij; //@line 144 "minimizer.c"
   $125 = $dij; //@line 144 "minimizer.c"
   $126 = (+_force($109,$114,$118,$123,$124,$125,121)); //@line 144 "minimizer.c"
   $127 = -$126; //@line 144 "minimizer.c"
   $128 = $j; //@line 144 "minimizer.c"
   $129 = (($128) + 1)|0; //@line 144 "minimizer.c"
   $130 = $1; //@line 144 "minimizer.c"
   $131 = (($130) + ($129<<2)|0); //@line 144 "minimizer.c"
   $132 = +HEAPF32[$131>>2]; //@line 144 "minimizer.c"
   $133 = $132 + $127; //@line 144 "minimizer.c"
   HEAPF32[$131>>2] = $133; //@line 144 "minimizer.c"
   $134 = $j; //@line 137 "minimizer.c"
   $135 = (($134) + 2)|0; //@line 137 "minimizer.c"
   $j = $135; //@line 137 "minimizer.c"
  }
  $136 = (($10) + 2)|0; //@line 136 "minimizer.c"
  $i = $136; //@line 136 "minimizer.c"
 }
 STACKTOP = sp;return; //@line 147 "minimizer.c"
}
function _minimize($dmtFilename,$flatpos,$len,$bondlen,$panelx,$panely) {
 $dmtFilename = $dmtFilename|0;
 $flatpos = $flatpos|0;
 $len = $len|0;
 $bondlen = $bondlen|0;
 $panelx = $panelx|0;
 $panely = $panely|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0;
 var $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0;
 var $fret = 0, $iter = 0, $or$cond = 0, $or$cond3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $0 = $dmtFilename;
 $1 = $flatpos;
 $2 = $len;
 $3 = $bondlen;
 $4 = $panelx;
 $5 = $panely;
 $6 = $4; //@line 158 "minimizer.c"
 HEAP32[320>>2] = $6; //@line 158 "minimizer.c"
 $7 = $5; //@line 159 "minimizer.c"
 HEAP32[328>>2] = $7; //@line 159 "minimizer.c"
 $8 = $2; //@line 161 "minimizer.c"
 HEAP32[336>>2] = $8; //@line 161 "minimizer.c"
 $9 = $2; //@line 162 "minimizer.c"
 $10 = (($9|0) / 2)&-1; //@line 162 "minimizer.c"
 HEAP32[216>>2] = $10; //@line 162 "minimizer.c"
 $11 = $4; //@line 163 "minimizer.c"
 $12 = $5; //@line 163 "minimizer.c"
 $13 = Math_imul($11, $12)|0; //@line 163 "minimizer.c"
 $14 = (($13|0) / 1000)&-1; //@line 163 "minimizer.c"
 HEAP32[344>>2] = $14; //@line 163 "minimizer.c"
 $15 = HEAP32[216>>2]|0; //@line 165 "minimizer.c"
 $16 = HEAP32[216>>2]|0; //@line 165 "minimizer.c"
 $17 = Math_imul($15, $16)|0; //@line 165 "minimizer.c"
 $18 = $17<<2; //@line 165 "minimizer.c"
 $19 = (_malloc($18)|0); //@line 165 "minimizer.c"
 HEAP32[312>>2] = $19; //@line 165 "minimizer.c"
 $20 = (_malloc(4)|0); //@line 166 "minimizer.c"
 $iter = $20; //@line 166 "minimizer.c"
 $21 = (_malloc(4)|0); //@line 167 "minimizer.c"
 $fret = $21; //@line 167 "minimizer.c"
 $22 = $0; //@line 169 "minimizer.c"
 _initDMT($22); //@line 169 "minimizer.c"
 $23 = $1; //@line 170 "minimizer.c"
 _initFPS($23); //@line 170 "minimizer.c"
 $24 = $iter; //@line 172 "minimizer.c"
 $25 = ($24|0)==(0|0); //@line 172 "minimizer.c"
 $26 = $fret;
 $27 = ($26|0)==(0|0); //@line 172 "minimizer.c"
 $or$cond = $25 | $27; //@line 172 "minimizer.c"
 $28 = HEAP32[312>>2]|0;
 $29 = ($28|0)==(0|0); //@line 172 "minimizer.c"
 $or$cond3 = $or$cond | $29; //@line 172 "minimizer.c"
 if ($or$cond3) {
  _rt_error(360); //@line 173 "minimizer.c"
 }
 $30 = $3; //@line 176 "minimizer.c"
 HEAP32[352>>2] = $30; //@line 176 "minimizer.c"
 $31 = $1; //@line 177 "minimizer.c"
 $32 = HEAP32[336>>2]|0; //@line 177 "minimizer.c"
 $33 = $iter; //@line 177 "minimizer.c"
 $34 = $fret; //@line 177 "minimizer.c"
 $35 = HEAP32[200>>2]|0; //@line 177 "minimizer.c"
 $36 = HEAP32[208>>2]|0; //@line 177 "minimizer.c"
 _frprmn($31,$32,9.9999997473787516E-6,$33,$34,$35,$36); //@line 177 "minimizer.c"
 $37 = HEAP32[312>>2]|0; //@line 179 "minimizer.c"
 _free($37); //@line 179 "minimizer.c"
 $38 = $fret; //@line 180 "minimizer.c"
 _free($38); //@line 180 "minimizer.c"
 $39 = $iter; //@line 181 "minimizer.c"
 _free($39); //@line 181 "minimizer.c"
 STACKTOP = sp;return 0; //@line 183 "minimizer.c"
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
 STACKTOP = STACKTOP + 512|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
 $x$i = sp;
 if ((($prec|0) == 2)) {
  $bits$0$ph = 53;$emin$0$ph = -1074;
 } else if ((($prec|0) == 1)) {
  $bits$0$ph = 53;$emin$0$ph = -1074;
 } else if ((($prec|0) == 0)) {
  $bits$0$ph = 24;$emin$0$ph = -149;
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
  $24 = (408 + ($i$084)|0);
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
          $483 = (424 + ($482<<2)|0);
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
          $496 = (424 + ($495<<2)|0);
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
        $506 = (424 + ($505<<2)|0);
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
  (FUNCTION_TABLE_iiii[$12 & 0]($f,0,0)|0);
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
function ___uflow($f) {
 $f = $f|0;
 var $$0 = 0, $0 = 0, $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $c = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
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
  $7 = (FUNCTION_TABLE_iiii[$6 & 0]($f,$c,1)|0);
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
function _strtof($s,$p) {
 $s = $s|0;
 $p = $p|0;
 var $0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0.0, $2 = 0, $3 = 0, $4 = 0.0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $f$i = 0, dest = 0;
 var label = 0, sp = 0, stop = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abort();
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
   $6 = HEAP32[456>>2]|0;
   $7 = $6 >>> $5;
   $8 = $7 & 3;
   $9 = ($8|0)==(0);
   if (!($9)) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = (($11) + ($5))|0;
    $13 = $12 << 1;
    $14 = (496 + ($13<<2)|0);
    $$sum10 = (($13) + 2)|0;
    $15 = (496 + ($$sum10<<2)|0);
    $16 = HEAP32[$15>>2]|0;
    $17 = ((($16)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ($14|0)==($18|0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[456>>2] = $22;
     } else {
      $23 = HEAP32[(472)>>2]|0;
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
   $34 = HEAP32[(464)>>2]|0;
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
     $66 = (496 + ($65<<2)|0);
     $$sum4 = (($65) + 2)|0;
     $67 = (496 + ($$sum4<<2)|0);
     $68 = HEAP32[$67>>2]|0;
     $69 = ((($68)) + 8|0);
     $70 = HEAP32[$69>>2]|0;
     $71 = ($66|0)==($70|0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[456>>2] = $74;
       $88 = $34;
      } else {
       $75 = HEAP32[(472)>>2]|0;
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
        $$pre = HEAP32[(464)>>2]|0;
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
      $90 = HEAP32[(476)>>2]|0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = (496 + ($92<<2)|0);
      $94 = HEAP32[456>>2]|0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96|0)==(0);
      if ($97) {
       $98 = $94 | $95;
       HEAP32[456>>2] = $98;
       $$pre105 = (($92) + 2)|0;
       $$pre106 = (496 + ($$pre105<<2)|0);
       $$pre$phiZ2D = $$pre106;$F4$0 = $93;
      } else {
       $$sum9 = (($92) + 2)|0;
       $99 = (496 + ($$sum9<<2)|0);
       $100 = HEAP32[$99>>2]|0;
       $101 = HEAP32[(472)>>2]|0;
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
     HEAP32[(464)>>2] = $81;
     HEAP32[(476)>>2] = $84;
     $mem$0 = $69;
     return ($mem$0|0);
    }
    $106 = HEAP32[(460)>>2]|0;
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
     $131 = (760 + ($130<<2)|0);
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
     $149 = HEAP32[(472)>>2]|0;
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
       $183 = (760 + ($182<<2)|0);
       $184 = HEAP32[$183>>2]|0;
       $185 = ($v$0$i$lcssa|0)==($184|0);
       if ($185) {
        HEAP32[$183>>2] = $R$1$i;
        $cond$i = ($R$1$i|0)==(0|0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[(460)>>2]|0;
         $189 = $188 & $187;
         HEAP32[(460)>>2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[(472)>>2]|0;
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
       $197 = HEAP32[(472)>>2]|0;
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
        $209 = HEAP32[(472)>>2]|0;
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
      $225 = HEAP32[(464)>>2]|0;
      $226 = ($225|0)==(0);
      if (!($226)) {
       $227 = HEAP32[(476)>>2]|0;
       $228 = $225 >>> 3;
       $229 = $228 << 1;
       $230 = (496 + ($229<<2)|0);
       $231 = HEAP32[456>>2]|0;
       $232 = 1 << $228;
       $233 = $231 & $232;
       $234 = ($233|0)==(0);
       if ($234) {
        $235 = $231 | $232;
        HEAP32[456>>2] = $235;
        $$pre$i = (($229) + 2)|0;
        $$pre8$i = (496 + ($$pre$i<<2)|0);
        $$pre$phi$iZ2D = $$pre8$i;$F1$0$i = $230;
       } else {
        $$sum3$i = (($229) + 2)|0;
        $236 = (496 + ($$sum3$i<<2)|0);
        $237 = HEAP32[$236>>2]|0;
        $238 = HEAP32[(472)>>2]|0;
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
      HEAP32[(464)>>2] = $rsize$0$i$lcssa;
      HEAP32[(476)>>2] = $151;
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
    $247 = HEAP32[(460)>>2]|0;
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
     $275 = (760 + ($idx$0$i<<2)|0);
     $276 = HEAP32[$275>>2]|0;
     $277 = ($276|0)==(0|0);
     L9: do {
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
          break L9;
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
       $328 = (760 + ($327<<2)|0);
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
      $343 = HEAP32[(464)>>2]|0;
      $344 = (($343) - ($246))|0;
      $345 = ($rsize$3$lcssa$i>>>0)<($344>>>0);
      if ($345) {
       $346 = HEAP32[(472)>>2]|0;
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
         $380 = (760 + ($379<<2)|0);
         $381 = HEAP32[$380>>2]|0;
         $382 = ($v$3$lcssa$i|0)==($381|0);
         if ($382) {
          HEAP32[$380>>2] = $R$1$i20;
          $cond$i21 = ($R$1$i20|0)==(0|0);
          if ($cond$i21) {
           $383 = 1 << $379;
           $384 = $383 ^ -1;
           $385 = HEAP32[(460)>>2]|0;
           $386 = $385 & $384;
           HEAP32[(460)>>2] = $386;
           break;
          }
         } else {
          $387 = HEAP32[(472)>>2]|0;
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
         $394 = HEAP32[(472)>>2]|0;
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
          $406 = HEAP32[(472)>>2]|0;
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
       L85: do {
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
          $425 = (496 + ($424<<2)|0);
          $426 = HEAP32[456>>2]|0;
          $427 = 1 << $422;
          $428 = $426 & $427;
          $429 = ($428|0)==(0);
          if ($429) {
           $430 = $426 | $427;
           HEAP32[456>>2] = $430;
           $$pre$i25 = (($424) + 2)|0;
           $$pre43$i = (496 + ($$pre$i25<<2)|0);
           $$pre$phi$i26Z2D = $$pre43$i;$F5$0$i = $425;
          } else {
           $$sum17$i = (($424) + 2)|0;
           $431 = (496 + ($$sum17$i<<2)|0);
           $432 = HEAP32[$431>>2]|0;
           $433 = HEAP32[(472)>>2]|0;
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
         $463 = (760 + ($I7$0$i<<2)|0);
         $$sum2$i = (($246) + 28)|0;
         $464 = (($v$3$lcssa$i) + ($$sum2$i)|0);
         HEAP32[$464>>2] = $I7$0$i;
         $$sum3$i27 = (($246) + 16)|0;
         $465 = (($v$3$lcssa$i) + ($$sum3$i27)|0);
         $$sum4$i28 = (($246) + 20)|0;
         $466 = (($v$3$lcssa$i) + ($$sum4$i28)|0);
         HEAP32[$466>>2] = 0;
         HEAP32[$465>>2] = 0;
         $467 = HEAP32[(460)>>2]|0;
         $468 = 1 << $I7$0$i;
         $469 = $467 & $468;
         $470 = ($469|0)==(0);
         if ($470) {
          $471 = $467 | $468;
          HEAP32[(460)>>2] = $471;
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
         L103: do {
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
             break L103;
            } else {
             $K12$029$i = $485;$T$028$i = $487;
            }
           }
           $494 = HEAP32[(472)>>2]|0;
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
            break L85;
           }
          }
         } while(0);
         $499 = ((($T$0$lcssa$i)) + 8|0);
         $500 = HEAP32[$499>>2]|0;
         $501 = HEAP32[(472)>>2]|0;
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
 $509 = HEAP32[(464)>>2]|0;
 $510 = ($509>>>0)<($nb$0>>>0);
 if (!($510)) {
  $511 = (($509) - ($nb$0))|0;
  $512 = HEAP32[(476)>>2]|0;
  $513 = ($511>>>0)>(15);
  if ($513) {
   $514 = (($512) + ($nb$0)|0);
   HEAP32[(476)>>2] = $514;
   HEAP32[(464)>>2] = $511;
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
   HEAP32[(464)>>2] = 0;
   HEAP32[(476)>>2] = 0;
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
 $526 = HEAP32[(468)>>2]|0;
 $527 = ($526>>>0)>($nb$0>>>0);
 if ($527) {
  $528 = (($526) - ($nb$0))|0;
  HEAP32[(468)>>2] = $528;
  $529 = HEAP32[(480)>>2]|0;
  $530 = (($529) + ($nb$0)|0);
  HEAP32[(480)>>2] = $530;
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
 $536 = HEAP32[928>>2]|0;
 $537 = ($536|0)==(0);
 do {
  if ($537) {
   $538 = (_sysconf(30)|0);
   $539 = (($538) + -1)|0;
   $540 = $539 & $538;
   $541 = ($540|0)==(0);
   if ($541) {
    HEAP32[(936)>>2] = $538;
    HEAP32[(932)>>2] = $538;
    HEAP32[(940)>>2] = -1;
    HEAP32[(944)>>2] = -1;
    HEAP32[(948)>>2] = 0;
    HEAP32[(900)>>2] = 0;
    $542 = (_time((0|0))|0);
    $543 = $542 & -16;
    $544 = $543 ^ 1431655768;
    HEAP32[928>>2] = $544;
    break;
   } else {
    _abort();
    // unreachable;
   }
  }
 } while(0);
 $545 = (($nb$0) + 48)|0;
 $546 = HEAP32[(936)>>2]|0;
 $547 = (($nb$0) + 47)|0;
 $548 = (($546) + ($547))|0;
 $549 = (0 - ($546))|0;
 $550 = $548 & $549;
 $551 = ($550>>>0)>($nb$0>>>0);
 if (!($551)) {
  $mem$0 = 0;
  return ($mem$0|0);
 }
 $552 = HEAP32[(896)>>2]|0;
 $553 = ($552|0)==(0);
 if (!($553)) {
  $554 = HEAP32[(888)>>2]|0;
  $555 = (($554) + ($550))|0;
  $556 = ($555>>>0)<=($554>>>0);
  $557 = ($555>>>0)>($552>>>0);
  $or$cond1$i = $556 | $557;
  if ($or$cond1$i) {
   $mem$0 = 0;
   return ($mem$0|0);
  }
 }
 $558 = HEAP32[(900)>>2]|0;
 $559 = $558 & 4;
 $560 = ($559|0)==(0);
 L258: do {
  if ($560) {
   $561 = HEAP32[(480)>>2]|0;
   $562 = ($561|0)==(0|0);
   L260: do {
    if ($562) {
     label = 174;
    } else {
     $sp$0$i$i = (904);
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
     $594 = HEAP32[(468)>>2]|0;
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
      $575 = HEAP32[(932)>>2]|0;
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
      $584 = HEAP32[(888)>>2]|0;
      $585 = (($584) + ($ssize$0$i))|0;
      $586 = ($ssize$0$i>>>0)>($nb$0>>>0);
      $587 = ($ssize$0$i>>>0)<(2147483647);
      $or$cond$i30 = $586 & $587;
      if ($or$cond$i30) {
       $588 = HEAP32[(896)>>2]|0;
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
       $608 = HEAP32[(936)>>2]|0;
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
   $618 = HEAP32[(900)>>2]|0;
   $619 = $618 | 4;
   HEAP32[(900)>>2] = $619;
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
  $631 = HEAP32[(888)>>2]|0;
  $632 = (($631) + ($tsize$254$i))|0;
  HEAP32[(888)>>2] = $632;
  $633 = HEAP32[(892)>>2]|0;
  $634 = ($632>>>0)>($633>>>0);
  if ($634) {
   HEAP32[(892)>>2] = $632;
  }
  $635 = HEAP32[(480)>>2]|0;
  $636 = ($635|0)==(0|0);
  L299: do {
   if ($636) {
    $637 = HEAP32[(472)>>2]|0;
    $638 = ($637|0)==(0|0);
    $639 = ($tbase$255$i>>>0)<($637>>>0);
    $or$cond9$i = $638 | $639;
    if ($or$cond9$i) {
     HEAP32[(472)>>2] = $tbase$255$i;
    }
    HEAP32[(904)>>2] = $tbase$255$i;
    HEAP32[(908)>>2] = $tsize$254$i;
    HEAP32[(916)>>2] = 0;
    $640 = HEAP32[928>>2]|0;
    HEAP32[(492)>>2] = $640;
    HEAP32[(488)>>2] = -1;
    $i$02$i$i = 0;
    while(1) {
     $641 = $i$02$i$i << 1;
     $642 = (496 + ($641<<2)|0);
     $$sum$i$i = (($641) + 3)|0;
     $643 = (496 + ($$sum$i$i<<2)|0);
     HEAP32[$643>>2] = $642;
     $$sum1$i$i = (($641) + 2)|0;
     $644 = (496 + ($$sum1$i$i<<2)|0);
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
    HEAP32[(480)>>2] = $654;
    HEAP32[(468)>>2] = $655;
    $656 = $655 | 1;
    $$sum$i13$i = (($653) + 4)|0;
    $657 = (($tbase$255$i) + ($$sum$i13$i)|0);
    HEAP32[$657>>2] = $656;
    $$sum2$i$i = (($tsize$254$i) + -36)|0;
    $658 = (($tbase$255$i) + ($$sum2$i$i)|0);
    HEAP32[$658>>2] = 40;
    $659 = HEAP32[(944)>>2]|0;
    HEAP32[(484)>>2] = $659;
   } else {
    $sp$084$i = (904);
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
       $675 = HEAP32[(468)>>2]|0;
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
       HEAP32[(480)>>2] = $684;
       HEAP32[(468)>>2] = $685;
       $686 = $685 | 1;
       $$sum$i17$i = (($683) + 4)|0;
       $687 = (($635) + ($$sum$i17$i)|0);
       HEAP32[$687>>2] = $686;
       $$sum2$i18$i = (($676) + 4)|0;
       $688 = (($635) + ($$sum2$i18$i)|0);
       HEAP32[$688>>2] = 40;
       $689 = HEAP32[(944)>>2]|0;
       HEAP32[(484)>>2] = $689;
       break;
      }
     }
    }
    $690 = HEAP32[(472)>>2]|0;
    $691 = ($tbase$255$i>>>0)<($690>>>0);
    if ($691) {
     HEAP32[(472)>>2] = $tbase$255$i;
     $755 = $tbase$255$i;
    } else {
     $755 = $690;
    }
    $692 = (($tbase$255$i) + ($tsize$254$i)|0);
    $sp$183$i = (904);
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
      $sp$0$i$i$i = (904);
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
      L324: do {
       if ($728) {
        $729 = HEAP32[(468)>>2]|0;
        $730 = (($729) + ($725))|0;
        HEAP32[(468)>>2] = $730;
        HEAP32[(480)>>2] = $724;
        $731 = $730 | 1;
        $$sum42$i$i = (($$sum$i19$i) + 4)|0;
        $732 = (($tbase$255$i) + ($$sum42$i$i)|0);
        HEAP32[$732>>2] = $731;
       } else {
        $733 = HEAP32[(476)>>2]|0;
        $734 = ($720|0)==($733|0);
        if ($734) {
         $735 = HEAP32[(464)>>2]|0;
         $736 = (($735) + ($725))|0;
         HEAP32[(464)>>2] = $736;
         HEAP32[(476)>>2] = $724;
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
         L331: do {
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
           $752 = (496 + ($751<<2)|0);
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
            $762 = HEAP32[456>>2]|0;
            $763 = $762 & $761;
            HEAP32[456>>2] = $763;
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
           $800 = (760 + ($799<<2)|0);
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
             $805 = HEAP32[(460)>>2]|0;
             $806 = $805 & $804;
             HEAP32[(460)>>2] = $806;
             break L331;
            } else {
             $807 = HEAP32[(472)>>2]|0;
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
              break L331;
             }
            }
           } while(0);
           $814 = HEAP32[(472)>>2]|0;
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
           $826 = HEAP32[(472)>>2]|0;
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
         $841 = (496 + ($840<<2)|0);
         $842 = HEAP32[456>>2]|0;
         $843 = 1 << $838;
         $844 = $842 & $843;
         $845 = ($844|0)==(0);
         do {
          if ($845) {
           $846 = $842 | $843;
           HEAP32[456>>2] = $846;
           $$pre$i22$i = (($840) + 2)|0;
           $$pre56$i$i = (496 + ($$pre$i22$i<<2)|0);
           $$pre$phi$i23$iZ2D = $$pre56$i$i;$F4$0$i$i = $841;
          } else {
           $$sum29$i$i = (($840) + 2)|0;
           $847 = (496 + ($$sum29$i$i<<2)|0);
           $848 = HEAP32[$847>>2]|0;
           $849 = HEAP32[(472)>>2]|0;
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
        $879 = (760 + ($I7$0$i$i<<2)|0);
        $$sum12$i$i = (($$sum$i19$i) + 28)|0;
        $880 = (($tbase$255$i) + ($$sum12$i$i)|0);
        HEAP32[$880>>2] = $I7$0$i$i;
        $$sum13$i$i = (($$sum$i19$i) + 16)|0;
        $881 = (($tbase$255$i) + ($$sum13$i$i)|0);
        $$sum14$i$i = (($$sum$i19$i) + 20)|0;
        $882 = (($tbase$255$i) + ($$sum14$i$i)|0);
        HEAP32[$882>>2] = 0;
        HEAP32[$881>>2] = 0;
        $883 = HEAP32[(460)>>2]|0;
        $884 = 1 << $I7$0$i$i;
        $885 = $883 & $884;
        $886 = ($885|0)==(0);
        if ($886) {
         $887 = $883 | $884;
         HEAP32[(460)>>2] = $887;
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
        L417: do {
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
            break L417;
           } else {
            $K8$051$i$i = $901;$T$050$i$i = $903;
           }
          }
          $910 = HEAP32[(472)>>2]|0;
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
           break L324;
          }
         }
        } while(0);
        $915 = ((($T$0$lcssa$i25$i)) + 8|0);
        $916 = HEAP32[$915>>2]|0;
        $917 = HEAP32[(472)>>2]|0;
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
      $sp$0$i$i$i = (904);
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
    HEAP32[(480)>>2] = $953;
    HEAP32[(468)>>2] = $954;
    $955 = $954 | 1;
    $$sum$i$i$i = (($952) + 4)|0;
    $956 = (($tbase$255$i) + ($$sum$i$i$i)|0);
    HEAP32[$956>>2] = $955;
    $$sum2$i$i$i = (($tsize$254$i) + -36)|0;
    $957 = (($tbase$255$i) + ($$sum2$i$i$i)|0);
    HEAP32[$957>>2] = 40;
    $958 = HEAP32[(944)>>2]|0;
    HEAP32[(484)>>2] = $958;
    $959 = ((($943)) + 4|0);
    HEAP32[$959>>2] = 27;
    ;HEAP32[$944>>2]=HEAP32[(904)>>2]|0;HEAP32[$944+4>>2]=HEAP32[(904)+4>>2]|0;HEAP32[$944+8>>2]=HEAP32[(904)+8>>2]|0;HEAP32[$944+12>>2]=HEAP32[(904)+12>>2]|0;
    HEAP32[(904)>>2] = $tbase$255$i;
    HEAP32[(908)>>2] = $tsize$254$i;
    HEAP32[(916)>>2] = 0;
    HEAP32[(912)>>2] = $944;
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
      $978 = (496 + ($977<<2)|0);
      $979 = HEAP32[456>>2]|0;
      $980 = 1 << $975;
      $981 = $979 & $980;
      $982 = ($981|0)==(0);
      if ($982) {
       $983 = $979 | $980;
       HEAP32[456>>2] = $983;
       $$pre$i$i = (($977) + 2)|0;
       $$pre14$i$i = (496 + ($$pre$i$i<<2)|0);
       $$pre$phi$i$iZ2D = $$pre14$i$i;$F$0$i$i = $978;
      } else {
       $$sum4$i$i = (($977) + 2)|0;
       $984 = (496 + ($$sum4$i$i<<2)|0);
       $985 = HEAP32[$984>>2]|0;
       $986 = HEAP32[(472)>>2]|0;
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
     $1016 = (760 + ($I1$0$i$i<<2)|0);
     $1017 = ((($635)) + 28|0);
     HEAP32[$1017>>2] = $I1$0$i$i;
     $1018 = ((($635)) + 20|0);
     HEAP32[$1018>>2] = 0;
     HEAP32[$941>>2] = 0;
     $1019 = HEAP32[(460)>>2]|0;
     $1020 = 1 << $I1$0$i$i;
     $1021 = $1019 & $1020;
     $1022 = ($1021|0)==(0);
     if ($1022) {
      $1023 = $1019 | $1020;
      HEAP32[(460)>>2] = $1023;
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
     L459: do {
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
         break L459;
        } else {
         $K2$07$i$i = $1037;$T$06$i$i = $1039;
        }
       }
       $1046 = HEAP32[(472)>>2]|0;
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
     $1053 = HEAP32[(472)>>2]|0;
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
  $1060 = HEAP32[(468)>>2]|0;
  $1061 = ($1060>>>0)>($nb$0>>>0);
  if ($1061) {
   $1062 = (($1060) - ($nb$0))|0;
   HEAP32[(468)>>2] = $1062;
   $1063 = HEAP32[(480)>>2]|0;
   $1064 = (($1063) + ($nb$0)|0);
   HEAP32[(480)>>2] = $1064;
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
 $2 = HEAP32[(472)>>2]|0;
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
   $17 = HEAP32[(476)>>2]|0;
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
    HEAP32[(464)>>2] = $15;
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
    $26 = (496 + ($25<<2)|0);
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
     $35 = HEAP32[456>>2]|0;
     $36 = $35 & $34;
     HEAP32[456>>2] = $36;
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
    $73 = (760 + ($72<<2)|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($14|0)==($74|0);
    if ($75) {
     HEAP32[$73>>2] = $R$1;
     $cond = ($R$1|0)==(0|0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[(460)>>2]|0;
      $79 = $78 & $77;
      HEAP32[(460)>>2] = $79;
      $p$0 = $14;$psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[(472)>>2]|0;
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
    $87 = HEAP32[(472)>>2]|0;
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
     $99 = HEAP32[(472)>>2]|0;
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
  $117 = HEAP32[(480)>>2]|0;
  $118 = ($9|0)==($117|0);
  if ($118) {
   $119 = HEAP32[(468)>>2]|0;
   $120 = (($119) + ($psize$0))|0;
   HEAP32[(468)>>2] = $120;
   HEAP32[(480)>>2] = $p$0;
   $121 = $120 | 1;
   $122 = ((($p$0)) + 4|0);
   HEAP32[$122>>2] = $121;
   $123 = HEAP32[(476)>>2]|0;
   $124 = ($p$0|0)==($123|0);
   if (!($124)) {
    return;
   }
   HEAP32[(476)>>2] = 0;
   HEAP32[(464)>>2] = 0;
   return;
  }
  $125 = HEAP32[(476)>>2]|0;
  $126 = ($9|0)==($125|0);
  if ($126) {
   $127 = HEAP32[(464)>>2]|0;
   $128 = (($127) + ($psize$0))|0;
   HEAP32[(464)>>2] = $128;
   HEAP32[(476)>>2] = $p$0;
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
    $141 = (496 + ($140<<2)|0);
    $142 = ($137|0)==($141|0);
    if (!($142)) {
     $143 = HEAP32[(472)>>2]|0;
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
     $151 = HEAP32[456>>2]|0;
     $152 = $151 & $150;
     HEAP32[456>>2] = $152;
     break;
    }
    $153 = ($139|0)==($141|0);
    if ($153) {
     $$pre58 = ((($139)) + 8|0);
     $$pre$phi59Z2D = $$pre58;
    } else {
     $154 = HEAP32[(472)>>2]|0;
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
      $187 = HEAP32[(472)>>2]|0;
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
      $167 = HEAP32[(472)>>2]|0;
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
     $192 = (760 + ($191<<2)|0);
     $193 = HEAP32[$192>>2]|0;
     $194 = ($9|0)==($193|0);
     if ($194) {
      HEAP32[$192>>2] = $R7$1;
      $cond47 = ($R7$1|0)==(0|0);
      if ($cond47) {
       $195 = 1 << $191;
       $196 = $195 ^ -1;
       $197 = HEAP32[(460)>>2]|0;
       $198 = $197 & $196;
       HEAP32[(460)>>2] = $198;
       break;
      }
     } else {
      $199 = HEAP32[(472)>>2]|0;
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
     $206 = HEAP32[(472)>>2]|0;
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
      $218 = HEAP32[(472)>>2]|0;
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
  $225 = HEAP32[(476)>>2]|0;
  $226 = ($p$0|0)==($225|0);
  if ($226) {
   HEAP32[(464)>>2] = $133;
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
  $234 = (496 + ($233<<2)|0);
  $235 = HEAP32[456>>2]|0;
  $236 = 1 << $231;
  $237 = $235 & $236;
  $238 = ($237|0)==(0);
  if ($238) {
   $239 = $235 | $236;
   HEAP32[456>>2] = $239;
   $$pre = (($233) + 2)|0;
   $$pre57 = (496 + ($$pre<<2)|0);
   $$pre$phiZ2D = $$pre57;$F16$0 = $234;
  } else {
   $$sum11 = (($233) + 2)|0;
   $240 = (496 + ($$sum11<<2)|0);
   $241 = HEAP32[$240>>2]|0;
   $242 = HEAP32[(472)>>2]|0;
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
 $272 = (760 + ($I18$0<<2)|0);
 $273 = ((($p$0)) + 28|0);
 HEAP32[$273>>2] = $I18$0;
 $274 = ((($p$0)) + 16|0);
 $275 = ((($p$0)) + 20|0);
 HEAP32[$275>>2] = 0;
 HEAP32[$274>>2] = 0;
 $276 = HEAP32[(460)>>2]|0;
 $277 = 1 << $I18$0;
 $278 = $276 & $277;
 $279 = ($278|0)==(0);
 L199: do {
  if ($279) {
   $280 = $276 | $277;
   HEAP32[(460)>>2] = $280;
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
     $303 = HEAP32[(472)>>2]|0;
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
   $310 = HEAP32[(472)>>2]|0;
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
 $317 = HEAP32[(488)>>2]|0;
 $318 = (($317) + -1)|0;
 HEAP32[(488)>>2] = $318;
 $319 = ($318|0)==(0);
 if ($319) {
  $sp$0$in$i = (912);
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
 HEAP32[(488)>>2] = -1;
 return;
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
  return FUNCTION_TABLE_iiii[index&0](a1|0,a2|0,a3|0)|0;
}


function dynCall_dd(index,a1) {
  index = index|0;
  a1=+a1;
  return +FUNCTION_TABLE_dd[index&3](+a1);
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

function b0(p0,p1,p2) { p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(0);return 0; }
function b1(p0) { p0 = +p0; nullFunc_dd(1);return +0; }
function b2(p0,p1) { p0 = p0|0;p1 = p1|0; nullFunc_vii(2); }
function b3(p0) { p0 = p0|0; nullFunc_di(3);return +0; }

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_iiii = [b0];
var FUNCTION_TABLE_dd = [b1,b1,b1,_f1dim];
var FUNCTION_TABLE_vii = [b2,b2,_calcGradient,b2];
var FUNCTION_TABLE_di = [b3,_calcFunction];

  return { _i64Subtract: _i64Subtract, _free: _free, _i64Add: _i64Add, _strlen: _strlen, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _bitshift64Lshr: _bitshift64Lshr, _minimize: _minimize, _bitshift64Shl: _bitshift64Shl, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, dynCall_iiii: dynCall_iiii, dynCall_dd: dynCall_dd, dynCall_vii: dynCall_vii, dynCall_di: dynCall_di };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
var real__i64Subtract = asm["_i64Subtract"]; asm["_i64Subtract"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__i64Subtract.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__free.apply(null, arguments);
};

var real__i64Add = asm["_i64Add"]; asm["_i64Add"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__i64Add.apply(null, arguments);
};

var real__strlen = asm["_strlen"]; asm["_strlen"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__strlen.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__malloc.apply(null, arguments);
};

var real__bitshift64Lshr = asm["_bitshift64Lshr"]; asm["_bitshift64Lshr"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__bitshift64Lshr.apply(null, arguments);
};

var real__minimize = asm["_minimize"]; asm["_minimize"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__minimize.apply(null, arguments);
};

var real__bitshift64Shl = asm["_bitshift64Shl"]; asm["_bitshift64Shl"] = function() {
assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
return real__bitshift64Shl.apply(null, arguments);
};
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _free = Module["_free"] = asm["_free"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
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
    Module.printErr('run() called, but dependencies remain, so not running');
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
    Module.printErr('exit(' + status + ') implicitly called by end of main(), but noExitRuntime, so not exiting the runtime (you can use emscripten_force_exit, if you want to force a true shutdown)');
    return;
  }

  if (Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') called, but noExitRuntime, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)');
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

  var extra = '';

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