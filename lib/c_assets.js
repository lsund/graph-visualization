
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
    var PACKAGE_NAME = 'lib/c_assets.data';
    var REMOTE_PACKAGE_BASE = 'c_assets.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
      var REMOTE_PACKAGE_SIZE = 15869;
      var PACKAGE_UUID = 'f8960441-48b6-4662-b274-312412f6f22d';
    
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

      new DataRequest(0, 6395, 0, 0).open('GET', '/data/52.json');
    new DataRequest(6395, 8493, 0, 0).open('GET', '/data/23.json');
    new DataRequest(8493, 13309, 0, 0).open('GET', '/data/43.json');
    new DataRequest(13309, 14079, 0, 0).open('GET', '/data/10.json');
    new DataRequest(14079, 14572, 0, 0).open('GET', '/data/4.json');
    new DataRequest(14572, 14874, 0, 0).open('GET', '/data/3.json');
    new DataRequest(14874, 15176, 0, 0).open('GET', '/data/3-1.json');
    new DataRequest(15176, 15534, 0, 0).open('GET', '/data/4-1.json');
    new DataRequest(15534, 15869, 0, 0).open('GET', '/data/3-2.json');

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
          DataRequest.prototype.requests["/data/52.json"].onload();
          DataRequest.prototype.requests["/data/23.json"].onload();
          DataRequest.prototype.requests["/data/43.json"].onload();
          DataRequest.prototype.requests["/data/10.json"].onload();
          DataRequest.prototype.requests["/data/4.json"].onload();
          DataRequest.prototype.requests["/data/3.json"].onload();
          DataRequest.prototype.requests["/data/3-1.json"].onload();
          DataRequest.prototype.requests["/data/4-1.json"].onload();
          DataRequest.prototype.requests["/data/3-2.json"].onload();
          Module['removeRunDependency']('datafile_lib/c_assets.data');

    };
    Module['addRunDependency']('datafile_lib/c_assets.data');
  
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
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*(+4294967296))) : ((+((low>>>0)))+((+((high|0)))*(+4294967296)))); return ret; },
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
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= (+1) ? (tempDouble > (+0) ? ((Math_min((+(Math_floor((tempDouble)/(+4294967296)))), (+4294967295)))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/(+4294967296))))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
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

var ASM_CONSTS = [function($0, $1, $2, $3, $4, $5) { { window.EXPORTS.processCdata($0, $1, $2, $3, $4, $5); } }];

function _emscripten_asm_const_6(code, a0, a1, a2, a3, a4, a5) {
 return ASM_CONSTS[code](a0, a1, a2, a3, a4, a5) | 0;
}



STATIC_BASE = 8;

STATICTOP = STATIC_BASE + 2960;
  /* global initializers */  __ATINIT__.push();
  

/* memory initializer */ allocate([78,101,103,97,116,105,118,101,32,115,113,117,97,114,101,32,114,111,111,116,32,97,114,103,117,109,101,110,116,0,0,0,69,114,114,111,114,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,58,32,99,114,101,97,116,101,95,98,111,110,100,115,40,41,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,10,0,0,84,111,111,32,109,97,110,121,32,105,116,101,114,97,116,105,111,110,115,32,105,110,32,98,114,101,110,116,0,0,0,0,123,32,119,105,110,100,111,119,46,69,88,80,79,82,84,83,46,112,114,111,99,101,115,115,67,100,97,116,97,40,36,48,44,32,36,49,44,32,36,50,44,32,36,51,44,32,36,52,44,32,36,53,41,59,32,125,0,0,0,0,0,0,0,0,87,97,114,110,105,110,103,58,32,66,32,103,114,101,97,116,101,114,32,116,104,97,110,32,86,32,42,32,108,111,103,40,86,41,0,0,0,0,0,0,85,110,101,120,112,101,99,116,101,100,32,69,79,70,32,105,110,32,115,116,114,105,110,103,32,40,97,116,32,37,100,58,37,100,41,0,0,0,0,0,73,110,118,97,108,105,100,32,99,104,97,114,97,99,116,101,114,32,118,97,108,117,101,32,96,37,99,96,32,40,97,116,32,37,100,58,37,100,41,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,69,79,70,32,105,110,32,98,108,111,99,107,32,99,111,109,109,101,110,116,0,0,37,100,58,37,100,58,32,67,111,109,109,101,110,116,32,110,111,116,32,97,108,108,111,119,101,100,32,104,101,114,101,0,37,100,58,37,100,58,32,69,79,70,32,117,110,101,120,112,101,99,116,101,100,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,37,99,96,32,105,110,32,99,111,109,109,101,110,116,32,111,112,101,110,105,110,103,32,115,101,113,117,101,110,99,101,0,0,0,0,0,0,37,100,58,37,100,58,32,84,114,97,105,108,105,110,103,32,103,97,114,98,97,103,101,58,32,96,37,99,96,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,93,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,44,32,98,101,102,111,114,101,32,37,99,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,58,32,98,101,102,111,114,101,32,37,99,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,37,99,32,119,104,101,110,32,115,101,101,107,105,110,103,32,118,97,108,117,101,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,44,32,98,101,102,111,114,101,32,34,0,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,37,99,96,32,105,110,32,111,98,106,101,99,116,0,0,0,0,0,0,0,0,37,100,58,37,100,58,32,85,110,101,120,112,101,99,116,101,100,32,96,48,96,32,98,101,102,111,114,101,32,96,37,99,96,0,0,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,98,101,102,111,114,101,32,96,46,96,0,0,0,0,0,0,0,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,97,102,116,101,114,32,96,46,96,0,37,100,58,37,100,58,32,69,120,112,101,99,116,101,100,32,100,105,103,105,116,32,97,102,116,101,114,32,96,101,96,0,37,100,58,37,100,58,32,85,110,107,110,111,119,110,32,118,97,108,117,101,0,0,0,0,77,101,109,111,114,121,32,97,108,108,111,99,97,116,105,111,110,32,102,97,105,108,117,114,101,0,0,0,0,0,0,0,37,100,58,37,100,58,32,84,111,111,32,108,111,110,103,32,40,99,97,117,103,104,116,32,111,118,101,114,102,108,111,119,41,0,0,0,0,0,0,0,85,110,107,110,111,119,110,32,101,114,114,111,114,0,0,0,69,114,114,111,114,32,119,104,101,110,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,58,32,109,105,110,105,109,105,122,101,40,41,0,0,0,0,0,0,0,0,68,111,110,101,44,32,108,111,99,97,108,32,111,112,116,105,109,105,122,97,116,105,111,110,0,0,0,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,70,105,108,101,32,110,111,116,32,102,111,117,110,100,58,32,0,0,0,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,85,110,97,98,108,101,32,116,111,32,97,108,108,111,99,97,116,101,32,109,101,109,111,114,121,0,0,0,0,0,0,0,114,116,0,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,85,110,97,98,108,101,32,116,111,32,111,112,101,110,32,102,105,108,101,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,85,110,97,98,108,101,32,116,111,32,114,101,97,100,32,102,105,108,101,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,85,110,97,98,108,101,32,116,111,32,112,97,114,115,101,32,100,97,116,97,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,87,114,111,110,103,32,110,117,109,98,101,114,32,111,102,32,107,101,121,115,0,0,0,0,118,101,114,116,105,99,101,115,0,0,0,0,0,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,70,105,114,115,116,32,107,101,121,32,105,115,32,110,111,116,32,118,101,114,116,105,99,101,115,0,0,0,0,0,0,0,98,111,110,100,115,0,0,0,112,114,111,99,101,115,115,95,106,115,111,110,40,41,58,32,83,101,99,111,110,100,32,107,101,121,32,105,115,32,110,111,116,32,39,98,111,110,100,115,39,0,0,0,0,0,0,0,27,91,51,49,109,82,117,110,116,105,109,101,45,101,114,114,111,114,58,37,115,10,27,91,48,109,0,0,0,0,0,0,68,105,118,105,115,105,111,110,32,98,121,32,122,101,114,111,0,0,0,0,0,0,0,0,97,110,103,108,101,58,32,78,97,110,32,115,99,97,108,112,0,0,0,0,0,0,0,0,79,117,116,115,105,100,101,32,97,99,111,115,32,114,97,110,103,101,0,0,0,0,0,0,69,114,114,111,114,32,119,104,105,108,101,32,97,108,108,111,99,97,116,105,110,103,32,109,101,109,111,114,121,58,32,99,114,101,97,116,101,95,118,101,114,116,105,99,101,115,40,41,0,0,0,0,0,0,0,0,78,111,32,118,101,114,116,105,99,101,115,0,0,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,58,32,105,100,101,110,116,0,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,44,32,112,111,115,105,116,105,111,110,32,100,105,109,101,110,115,105,111,110,32,110,111,116,32,50,0,66,97,100,32,74,83,79,78,32,100,97,116,97,58,32,112,111,115,105,116,105,111,110,58,32,120,0,0,0,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,58,32,112,111,115,105,116,105,111,110,58,32,121,0,0,0,0,0,0,66,97,100,32,74,83,79,78,32,100,97,116,97,58,32,112,111,115,105,116,105,111,110,0,66,97,100,32,74,83,79,78,32,100,97,116,97,58,32,116,121,112,101,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,17,0,10,0,17,17,17,0,0,0,0,5,0,0,0,0,0,0,9,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,15,10,17,17,17,3,10,7,0,1,19,9,11,11,0,0,9,6,11,0,0,11,0,6,17,0,0,0,17,17,17,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,17,0,10,10,17,17,17,0,10,0,0,2,0,9,11,0,0,0,9,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,14,0,0,0,0,0,0,0,0,0,0,0,13,0,0,0,4,13,0,0,0,0,9,14,0,0,0,0,0,14,0,0,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,15,0,0,0,0,9,16,0,0,0,0,0,16,0,0,16,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,18,0,0,0,18,18,18,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,10,0,0,0,0,9,11,0,0,0,0,0,11,0,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,0,0,0,0,0,0,0,12,0,0,0,0,12,0,0,0,0,9,12,0,0,0,0,0,12,0,0,12,0,0,48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,45,43,32,32,32,48,88,48,120,0,0,0,0,0,0,0,40,110,117,108,108,41,0,0,45,48,88,43,48,88,32,48,88,45,48,120,43,48,120,32,48,120,0,0,0,0,0,0,105,110,102,0,0,0,0,0,73,78,70,0,0,0,0,0,110,97,110,0,0,0,0,0,78,65,78,0,0,0,0,0,46,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);





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

var EMTSTACKTOP = getMemory(1048576);
var EMT_STACK_MAX = EMTSTACKTOP + 1048576;

var eb = getMemory(81408);
//assert(eb % 8 === 0);
__ATPRERUN__.push(function() {
  HEAPU8.set([140,5,137,3,0,0,0,0,2,200,0,0,0,202,154,59,2,201,0,0,68,3,0,0,2,202,0,0,255,0,0,0,1,203,0,0,143,203,135,3,136,204,0,0,0,203,204,0,143,203,136,3,136,203,0,0,1,204,96,3,3,203,203,204,137,203,0,0,141,203,136,3,3,111,203,201,141,204,136,3,1,205,16,2,3,204,204,205,25,203,204,40,143,203,16,1,141,204,136,3,1,205,56,3,3,204,204,205,25,203,204,12,143,203,32,2,141,203,136,3,3,203,203,201,25,191,203,9,1,165,0,0,1,168,0,0,0,203,1,0,143,203,26,1,1,203,0,0,143,203,251,2,1,203,0,0,143,203,47,3,1,203,0,0,143,203,51,3,1,204,255,255,141,205,251,2,15,203,204,205,143,203,6,1,141,203,6,1,121,203,28,0,2,205,0,0,255,255,255,127,141,204,251,2,4,203,205,204,143,203,9,1,141,204,9,1,141,205,47,3,15,203,204,205,143,203,12,1,141,203,12,1,121,203,9,0,135,203,0,0,143,203,17,1,141,203,17,1,1,205,75,0,85,203,205,0,1,205,255,255,143,205,252,2,119,0,12,0,141,203,47,3,141,204,251,2,3,205,203,204,143,205,20,1,141,204,20,1,0,205,204,0,143,205,252,2,119,0,4,0,141,204,251,2,0,205,204,0,143,205,252,2,141,204,26,1,78,205,204,0,143,205,23,1,141,205,23,1,41,205,205,24,42,205,205,24,32,205,205,0,121,205,10,0,141,204,252,2,0,205,204,0,143,205,253,2,141,204,51,3,0,205,204,0,143,205,52,3,1,205,88,1,143,205,135,3,119,0,53,24,141,205,23,1,0,170,205,0,141,204,26,1,0,205,204,0,143,205,39,1,41,205,170,24,42,205,205,24,32,205,205,37,121,205,10,0,141,204,39,1,0,205,204,0,143,205,54,1,141,204,39,1,0,205,204,0,143,205,119,3,1,205,9,0,143,205,135,3,119,0,21,0,41,205,170,24,42,205,205,24,32,205,205,0,121,205,7,0,141,205,39,1,0,94,205,0,141,204,39,1,0,205,204,0,143,205,118,3,119,0,11,0,141,204,39,1,25,205,204,1,143,205,33,1,141,205,33,1,78,103,205,0,0,170,103,0,141,204,33,1,0,205,204,0,143,205,39,1,119,0,224,255,141,205,135,3,32,205,205,9,121,205,49,0,1,205,0,0,143,205,135,3,141,204,54,1,25,205,204,1,143,205,47,1,141,204,47,1,78,205,204,0,143,205,59,1,141,205,59,1,41,205,205,24,42,205,205,24,32,205,205,37,120,205,7,0,141,205,54,1,0,94,205,0,141,204,119,3,0,205,204,0,143,205,118,3,119,0,30,0,141,204,119,3,25,205,204,1,143,205,71,1,141,204,54,1,25,205,204,2,143,205,78,1,141,204,78,1,78,205,204,0,143,205,83,1,141,205,83,1,41,205,205,24,42,205,205,24,32,205,205,37,121,205,10,0,141,204,78,1,0,205,204,0,143,205,54,1,141,204,71,1,0,205,204,0,143,205,119,3,1,205,9,0,143,205,135,3,119,0,215,255,141,205,78,1,0,94,205,0,141,204,71,1,0,205,204,0,143,205,118,3,119,0,1,0,141,204,118,3,0,205,204,0,143,205,96,1,141,204,26,1,0,205,204,0,143,205,104,1,1,205,0,0,46,205,0,205,32,3,0,0,141,204,26,1,141,203,96,1,141,206,104,1,4,203,203,206,134,205,0,0,84,2,1,0,204,203,0,0,141,203,118,3,141,204,26,1,13,205,203,204,143,205,119,1,141,205,119,1,120,205,21,0,141,204,51,3,0,205,204,0,143,205,53,3,0,169,168,0,0,166,165,0,0,205,94,0,143,205,26,1,141,204,252,2,0,205,204,0,143,205,251,2,141,204,96,1,141,203,104,1,4,205,204,203,143,205,47,3,141,203,53,3,0,205,203,0,143,205,51,3,0,168,169,0,0,165,166,0,119,0,73,255,25,205,94,1,143,205,127,1,141,203,127,1,78,205,203,0,143,205,135,1,141,205,135,1,41,205,205,24,42,205,205,24,26,205,205,48,35,205,205,10,121,205,50,0,25,205,94,2,143,205,149,1,141,203,149,1,78,205,203,0,143,205,155,1,25,205,94,3,143,205,163,1,141,205,155,1,41,205,205,24,42,205,205,24,32,205,205,36,141,203,163,1,141,204,127,1,125,85,205,203,204,0,0,0,141,204,155,1,41,204,204,24,42,204,204,24,32,204,204,36,1,203,1,0,141,205,51,3,125,93,204,203,205,0,0,0,141,204,155,1,41,204,204,24,42,204,204,24,32,204,204,36,121,204,7,0,141,204,135,1,41,204,204,24,42,204,204,24,26,204,204,48,0,203,204,0,119,0,3,0,1,204,255,255,0,203,204,0,0,205,203,0,143,205,40,3,78,106,85,0,0,205,106,0,143,205,172,1,141,203,40,3,0,205,203,0,143,205,247,2,0,205,93,0,143,205,54,3,0,205,85,0,143,205,98,3,119,0,12,0,141,203,135,1,0,205,203,0,143,205,172,1,1,205,255,255,143,205,247,2,141,203,51,3,0,205,203,0,143,205,54,3,141,203,127,1,0,205,203,0,143,205,98,3,141,203,172,1,41,203,203,24,42,203,203,24,0,205,203,0,143,205,168,1,141,205,168,1,38,205,205,224,32,205,205,32,121,205,83,0,141,203,168,1,0,205,203,0,143,205,190,1,141,203,172,1,0,205,203,0,143,205,215,1,1,205,0,0,143,205,20,3,141,203,98,3,0,205,203,0,143,205,101,3,141,203,190,1,26,205,203,32,143,205,184,1,1,205,1,0,141,203,184,1,22,205,205,203,2,203,0,0,137,40,1,0,19,205,205,203,32,205,205,0,121,205,11,0,141,203,215,1,0,205,203,0,143,205,255,1,141,203,20,3,0,205,203,0,143,205,19,3,141,203,101,3,0,205,203,0,143,205,100,3,119,0,59,0,141,203,215,1,41,203,203,24,42,203,203,24,0,205,203,0,143,205,210,1,1,203,1,0,141,204,210,1,26,204,204,32,22,203,203,204,141,204,20,3,20,203,203,204,0,205,203,0,143,205,226,1,141,203,101,3,25,205,203,1,143,205,231,1,141,203,231,1,78,205,203,0,143,205,235,1,141,205,235,1,41,205,205,24,42,205,205,24,38,205,205,224,32,205,205,32,121,205,16,0,141,203,235,1,41,203,203,24,42,203,203,24,0,205,203,0,143,205,190,1,141,203,235,1,0,205,203,0,143,205,215,1,141,203,226,1,0,205,203,0,143,205,20,3,141,203,231,1,0,205,203,0,143,205,101,3,119,0,196,255,141,203,235,1,0,205,203,0,143,205,255,1,141,203,226,1,0,205,203,0,143,205,19,3,141,203,231,1,0,205,203,0,143,205,100,3,119,0,9,0,141,203,172,1,0,205,203,0,143,205,255,1,1,205,0,0,143,205,19,3,141,203,98,3,0,205,203,0,143,205,100,3,141,203,255,1,41,203,203,24,42,203,203,24,32,205,203,42,143,205,9,2,141,205,9,2,121,205,157,0,141,203,100,3,25,205,203,1,143,205,15,2,141,203,15,2,78,205,203,0,143,205,22,2,141,205,22,2,41,205,205,24,42,205,205,24,26,205,205,48,35,205,205,10,121,205,50,0,141,203,100,3,25,205,203,2,143,205,33,2,141,203,33,2,78,205,203,0,143,205,41,2,141,205,41,2,41,205,205,24,42,205,205,24,32,205,205,36,121,205,36,0,141,205,22,2,41,205,205,24,42,205,205,24,26,205,205,48,41,205,205,2,1,203,10,0,97,4,205,203,141,205,15,2,78,203,205,0,143,203,57,2,141,205,57,2,41,205,205,24,42,205,205,24,26,205,205,48,41,205,205,3,3,203,3,205,143,203,74,2,141,205,74,2,82,203,205,0,143,203,86,2,141,205,74,2,106,203,205,4,143,203,102,2,141,205,100,3,25,203,205,3,143,203,108,2,1,203,1,0,143,203,55,3,141,205,108,2,0,203,205,0,143,203,99,3,141,205,86,2,0,203,205,0,143,203,105,3,119,0,6,0,1,203,23,0,143,203,135,3,119,0,3,0,1,203,23,0,143,203,135,3,141,203,135,3,32,203,203,23,121,203,53,0,1,203,0,0,143,203,135,3,141,205,54,3,32,203,205,0,143,203,115,2,141,203,115,2,120,203,5,0,1,7,255,255,1,203,107,1,143,203,135,3,119,0,180,22,1,203,0,0,53,203,0,203,180,7,0,0,141,203,15,2,0,133,203,0,141,205,19,3,0,203,205,0,143,203,21,3,1,203,0,0,143,203,56,3,1,203,0,0,143,203,106,3,119,0,138,0,82,203,2,0,143,203,225,2,141,205,225,2,1,204,0,0,25,204,204,4,26,204,204,1,3,205,205,204,1,204,0,0,25,204,204,4,26,204,204,1,40,204,204,255,19,205,205,204,0,203,205,0,143,203,148,2,141,205,148,2,82,203,205,0,143,203,154,2,141,203,148,2,25,203,203,4,85,2,203,0,1,203,0,0,143,203,55,3,141,205,15,2,0,203,205,0,143,203,99,3,141,205,154,2,0,203,205,0,143,203,105,3,141,205,105,3,34,203,205,0,143,203,162,2,141,203,162,2,121,203,22,0,141,205,19,3,1,204,0,32,20,205,205,204,0,203,205,0,143,203,168,2,1,205,0,0,141,204,105,3,4,203,205,204,143,203,177,2,141,203,99,3,0,133,203,0,141,204,168,2,0,203,204,0,143,203,21,3,141,204,55,3,0,203,204,0,143,203,56,3,141,204,177,2,0,203,204,0,143,203,106,3,119,0,84,0,141,203,99,3,0,133,203,0,141,204,19,3,0,203,204,0,143,203,21,3,141,204,55,3,0,203,204,0,143,203,56,3,141,204,105,3,0,203,204,0,143,203,106,3,119,0,72,0,141,204,255,1,41,204,204,24,42,204,204,24,0,203,204,0,143,203,186,2,141,203,186,2,26,203,203,48,35,203,203,10,121,203,53,0,141,203,100,3,0,112,203,0,1,203,0,0,143,203,30,3,141,204,186,2,26,203,204,48,143,203,41,3,141,204,30,3,27,203,204,10,143,203,193,2,141,204,193,2,141,205,41,3,3,203,204,205,143,203,202,2,25,203,112,1,143,203,206,2,141,203,206,2,78,119,203,0,41,203,119,24,42,203,203,24,26,203,203,48,35,203,203,10,121,203,11,0,141,203,206,2,0,112,203,0,141,205,202,2,0,203,205,0,143,203,30,3,41,205,119,24,42,205,205,24,26,203,205,48,143,203,41,3,119,0,231,255,141,203,202,2,34,203,203,0,121,203,5,0,1,7,255,255,1,203,107,1,143,203,135,3,119,0,52,22,141,203,206,2,0,133,203,0,141,205,19,3,0,203,205,0,143,203,21,3,141,205,54,3,0,203,205,0,143,203,56,3,141,205,202,2,0,203,205,0,143,203,106,3,119,0,11,0,141,203,100,3,0,133,203,0,141,205,19,3,0,203,205,0,143,203,21,3,141,205,54,3,0,203,205,0,143,203,56,3,1,203,0,0,143,203,106,3,78,129,133,0,41,203,129,24,42,203,203,24,32,203,203,46,121,203,113,0,25,138,133,1,78,141,138,0,41,203,141,24,42,203,203,24,32,203,203,42,120,203,41,0,41,203,141,24,42,203,203,24,26,203,203,48,35,203,203,10,121,203,9,0,0,192,138,0,1,203,0,0,143,203,31,3,41,205,141,24,42,205,205,24,26,203,205,48,143,203,42,3,119,0,5,0,0,171,138,0,1,203,0,0,143,203,58,3,119,0,93,0,141,203,31,3,27,188,203,10,141,203,42,3,3,189,188,203,25,190,192,1,78,193,190,0,41,203,193,24,42,203,203,24,26,203,203,48,35,203,203,10,121,203,9,0,0,192,190,0,0,203,189,0,143,203,31,3,41,205,193,24,42,205,205,24,26,203,205,48,143,203,42,3,119,0,238,255,0,171,190,0,0,203,189,0,143,203,58,3,119,0,70,0,25,145,133,2,78,148,145,0,41,203,148,24,42,203,203,24,26,203,203,48,35,203,203,10,121,203,26,0,25,153,133,3,78,154,153,0,41,203,154,24,42,203,203,24,32,203,203,36,121,203,20,0,41,203,148,24,42,203,203,24,26,203,203,48,41,203,203,2,1,205,10,0,97,4,203,205,78,167,145,0,41,205,167,24,42,205,205,24,26,205,205,48,41,205,205,3,3,181,3,205,82,182,181,0,106,183,181,4,25,184,133,4,0,171,184,0,0,205,182,0,143,205,58,3,119,0,38,0,141,205,56,3,32,185,205,0,120,185,5,0,1,7,255,255,1,205,107,1,143,205,135,3,119,0,196,21,1,205,0,0,46,205,0,205,156,11,0,0,82,205,2,0,143,205,229,2,141,205,229,2,1,203,0,0,25,203,203,4,26,203,203,1,3,205,205,203,1,203,0,0,25,203,203,4,26,203,203,1,40,203,203,255,19,205,205,203,0,186,205,0,82,187,186,0,25,205,186,4,85,2,205,0,0,171,145,0,0,205,187,0,143,205,58,3,119,0,8,0,0,171,145,0,1,205,0,0,143,205,58,3,119,0,4,0,0,171,133,0,1,205,255,255,143,205,58,3,0,195,171,0,1,205,0,0,143,205,96,3,78,194,195,0,1,205,57,0,41,203,194,24,42,203,203,24,26,203,203,65,48,205,205,203,240,11,0,0,1,7,255,255,1,205,107,1,143,205,135,3,119,0,152,21,25,196,195,1,1,205,104,7,141,203,96,3,27,203,203,58,3,205,205,203,41,203,194,24,42,203,203,24,26,203,203,65,3,197,205,203,78,198,197,0,19,203,198,202,26,203,203,1,35,203,203,8,121,203,6,0,0,195,196,0,19,205,198,202,0,203,205,0,143,203,96,3,119,0,227,255,0,96,195,0,141,205,96,3,0,203,205,0,143,203,97,3,119,0,1,0,41,203,198,24,42,203,203,24,32,203,203,0,121,203,5,0,1,7,255,255,1,203,107,1,143,203,135,3,119,0,120,21,1,203,255,255,141,205,247,2,15,199,203,205,41,205,198,24,42,205,205,24,32,205,205,19,121,205,11,0,121,199,5,0,1,7,255,255,1,205,107,1,143,205,135,3,119,0,108,21,0,172,165,0,0,173,168,0,1,205,62,0,143,205,135,3,119,0,117,1,121,199,25,0,141,203,247,2,41,203,203,2,3,205,4,203,143,205,0,1,141,205,0,1,19,203,198,202,85,205,203,0,141,205,247,2,41,205,205,3,3,203,3,205,143,203,1,1,141,205,1,1,82,203,205,0,143,203,2,1,141,205,1,1,106,203,205,4,143,203,3,1,141,203,3,1,0,172,203,0,141,203,2,1,0,173,203,0,1,203,62,0,143,203,135,3,119,0,92,1,1,203,0,0,53,203,0,203,52,13,0,0,1,7,0,0,1,203,107,1,143,203,135,3,119,0,71,21,1,203,20,0,19,205,198,202,47,203,203,205,88,13,0,0,0,203,168,0,143,203,42,1,0,203,165,0,143,203,61,1,119,0,76,1,19,203,198,202,1,205,9,0,1,204,10,0,138,203,205,204,164,13,0,0,12,14,0,0,132,14,0,0,236,14,0,0,100,15,0,0,248,15,0,0,108,16,0,0,248,16,0,0,100,17,0,0,244,17,0,0,0,205,168,0,143,205,42,1,0,205,165,0,143,205,61,1,119,0,57,1,82,205,2,0,143,205,240,2,141,204,240,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,4,1,141,204,4,1,82,205,204,0,143,205,5,1,141,205,4,1,25,205,205,4,85,2,205,0,141,204,5,1,0,205,204,0,143,205,42,1,0,205,165,0,143,205,61,1,119,0,31,1,82,205,2,0,143,205,246,2,141,204,246,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,7,1,141,204,7,1,82,205,204,0,143,205,8,1,141,205,7,1,25,205,205,4,85,2,205,0,141,204,8,1,0,205,204,0,143,205,42,1,141,204,8,1,34,204,204,0,41,204,204,31,42,204,204,31,0,205,204,0,143,205,61,1,119,0,1,1,82,205,2,0,143,205,226,2,141,204,226,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,10,1,141,204,10,1,82,205,204,0,143,205,11,1,141,205,10,1,25,205,205,4,85,2,205,0,141,204,11,1,0,205,204,0,143,205,42,1,1,205,0,0,143,205,61,1,119,0,231,0,82,205,2,0,143,205,227,2,141,204,227,2,1,206,0,0,25,206,206,8,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,13,1,141,204,13,1,82,205,204,0,143,205,14,1,141,204,13,1,106,205,204,4,143,205,15,1,141,205,13,1,25,205,205,8,85,2,205,0,141,204,14,1,0,205,204,0,143,205,42,1,141,204,15,1,0,205,204,0,143,205,61,1,119,0,201,0,82,205,2,0,143,205,228,2,141,204,228,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,18,1,141,204,18,1,82,205,204,0,143,205,19,1,141,205,18,1,25,205,205,4,85,2,205,0,141,204,19,1,41,204,204,16,42,204,204,16,0,205,204,0,143,205,42,1,141,204,19,1,2,206,0,0,255,255,0,0,19,204,204,206,41,204,204,16,42,204,204,16,34,204,204,0,41,204,204,31,42,204,204,31,0,205,204,0,143,205,61,1,119,0,164,0,82,205,2,0,143,205,230,2,141,204,230,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,21,1,141,204,21,1,82,205,204,0,143,205,22,1,141,205,21,1,25,205,205,4,85,2,205,0,141,204,22,1,2,206,0,0,255,255,0,0,19,204,204,206,0,205,204,0,143,205,42,1,1,205,0,0,143,205,61,1,119,0,135,0,82,205,2,0,143,205,231,2,141,204,231,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,24,1,141,204,24,1,82,205,204,0,143,205,25,1,141,205,24,1,25,205,205,4,85,2,205,0,141,204,25,1,41,204,204,24,42,204,204,24,0,205,204,0,143,205,42,1,141,204,25,1,19,204,204,202,41,204,204,24,42,204,204,24,34,204,204,0,41,204,204,31,42,204,204,31,0,205,204,0,143,205,61,1,119,0,100,0,82,205,2,0,143,205,232,2,141,204,232,2,1,206,0,0,25,206,206,4,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,27,1,141,204,27,1,82,205,204,0,143,205,28,1,141,205,27,1,25,205,205,4,85,2,205,0,141,204,28,1,19,204,204,202,0,205,204,0,143,205,42,1,1,205,0,0,143,205,61,1,119,0,73,0,82,205,2,0,143,205,233,2,141,204,233,2,1,206,0,0,25,206,206,8,26,206,206,1,3,204,204,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,204,204,206,0,205,204,0,143,205,29,1,141,204,29,1,86,205,204,0,144,205,30,1,141,205,29,1,25,205,205,8,85,2,205,0,127,205,0,0,142,204,30,1,87,205,204,0,127,205,0,0,82,204,205,0,143,204,31,1,127,205,0,0,106,204,205,4,143,204,32,1,141,205,31,1,0,204,205,0,143,204,42,1,141,205,32,1,0,204,205,0,143,204,61,1,119,0,37,0,82,204,2,0,143,204,234,2,141,205,234,2,1,206,0,0,25,206,206,8,26,206,206,1,3,205,205,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,205,205,206,0,204,205,0,143,204,34,1,141,205,34,1,86,204,205,0,144,204,35,1,141,204,34,1,25,204,204,8,85,2,204,0,127,204,0,0,142,205,35,1,87,204,205,0,127,204,0,0,82,205,204,0,143,205,36,1,127,204,0,0,106,205,204,4,143,205,37,1,141,204,36,1,0,205,204,0,143,205,42,1,141,204,37,1,0,205,204,0,143,205,61,1,119,0,1,0,141,203,135,3,32,203,203,62,121,203,26,0,1,203,0,0,143,203,135,3,1,203,0,0,46,203,0,203,184,18,0,0,0,203,173,0,143,203,42,1,0,203,172,0,143,203,61,1,119,0,16,0,0,165,172,0,0,168,173,0,0,203,196,0,143,203,26,1,141,205,252,2,0,203,205,0,143,203,251,2,141,205,96,1,141,204,104,1,4,203,205,204,143,203,47,3,141,204,56,3,0,203,204,0,143,203,51,3,119,0,110,251,78,203,96,0,143,203,38,1,141,205,97,3,33,205,205,0,141,206,38,1,41,206,206,24,42,206,206,24,38,206,206,15,32,206,206,3,19,205,205,206,121,205,7,0,141,205,38,1,41,205,205,24,42,205,205,24,38,205,205,223,0,204,205,0,119,0,5,0,141,205,38,1,41,205,205,24,42,205,205,24,0,204,205,0,0,203,204,0,143,203,102,3,141,204,21,3,1,205,0,32,19,204,204,205,0,203,204,0,143,203,40,1,141,204,21,3,2,205,0,0,255,255,254,255,19,204,204,205,0,203,204,0,143,203,41,1,141,204,40,1,32,204,204,0,141,205,21,3,141,206,41,1,125,203,204,205,206,0,0,0,143,203,22,3,141,203,102,3,1,207,65,0,1,208,56,0,138,203,207,208,220,20,0,0,136,20,0,0,224,20,0,0,136,20,0,0,28,21,0,0,32,21,0,0,36,21,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,40,21,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,148,21,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,136,20,0,0,152,21,0,0,136,20,0,0,156,21,0,0,24,22,0,0,44,23,0,0,112,75,0,0,116,75,0,0,136,20,0,0,120,75,0,0,136,20,0,0,136,20,0,0,136,20,0,0,124,75,0,0,184,75,0,0,24,79,0,0,168,80,0,0,136,20,0,0,136,20,0,0,0,81,0,0,136,20,0,0,72,81,0,0,136,20,0,0,136,20,0,0,124,81,0,0,141,207,61,1,0,174,207,0,141,207,42,1,0,175,207,0,141,208,26,1,0,207,208,0,143,207,215,2,141,208,22,3,0,207,208,0,143,207,25,3,141,208,58,3,0,207,208,0,143,207,64,3,1,207,0,0,143,207,69,3,1,207,72,9,143,207,74,3,141,208,16,1,0,207,208,0,143,207,123,3,119,0,53,15,119,0,148,0,141,207,136,3,141,208,42,1,85,207,208,0,141,208,136,3,1,207,0,0,109,208,4,207,141,207,136,3,0,176,207,0,141,207,136,3,0,177,207,0,1,207,255,255,143,207,63,3,1,207,97,0,143,207,135,3,119,0,37,15,119,0,132,0,119,0,131,0,119,0,130,0,141,208,42,1,0,207,208,0,143,207,129,1,141,208,58,3,32,207,208,0,143,207,130,1,141,207,130,1,121,207,10,0,141,207,42,1,0,178,207,0,141,207,129,1,0,179,207,0,1,207,0,0,143,207,27,3,1,207,102,0,143,207,135,3,119,0,17,15,141,207,129,1,0,176,207,0,141,207,42,1,0,177,207,0,141,208,58,3,0,207,208,0,143,207,63,3,1,207,97,0,143,207,135,3,119,0,7,15,119,0,250,14,119,0,101,0,141,207,42,1,19,207,207,202,0,206,207,0,143,206,117,1,141,206,136,3,1,207,16,2,3,206,206,207,141,207,117,1,107,206,39,207,141,207,61,1,0,174,207,0,141,207,42,1,0,175,207,0,141,206,136,3,1,205,16,2,3,206,206,205,25,207,206,39,143,207,215,2,141,206,41,1,0,207,206,0,143,207,25,3,1,207,1,0,143,207,64,3,1,207,0,0,143,207,69,3,1,207,72,9,143,207,74,3,141,206,16,1,0,207,206,0,143,207,123,3,119,0,230,14,141,204,61,1,34,205,204,0,143,205,82,1,141,205,82,1,121,205,25,0,1,204,0,0,1,207,0,0,141,206,42,1,141,208,61,1,134,205,0,0,136,59,1,0,204,207,206,208,143,205,84,1,128,208,0,0,0,205,208,0,143,205,85,1,141,208,85,1,0,205,208,0,143,205,86,1,141,208,84,1,0,205,208,0,143,205,88,1,1,205,1,0,143,205,65,3,1,205,72,9,143,205,70,3,1,205,84,0,143,205,135,3,119,0,201,14,141,205,22,3,1,208,0,8,19,205,205,208,32,205,205,0,121,205,23,0,141,205,22,3,38,205,205,1,32,205,205,0,1,208,72,9,1,206,74,9,125,5,205,208,206,0,0,0,141,208,61,1,0,206,208,0,143,206,86,1,141,208,42,1,0,206,208,0,143,206,88,1,141,208,22,3,38,208,208,1,0,206,208,0,143,206,65,3,0,206,5,0,143,206,70,3,1,206,84,0,143,206,135,3,119,0,174,14,141,208,61,1,0,206,208,0,143,206,86,1,141,208,42,1,0,206,208,0,143,206,88,1,1,206,1,0,143,206,65,3,1,206,73,9,143,206,70,3,1,206,84,0,143,206,135,3,119,0,161,14,127,207,0,0,141,208,42,1,85,207,208,0,127,208,0,0,141,207,61,1,109,208,4,207,127,208,0,0,86,207,208,0,144,207,156,1,141,207,136,3,1,208,0,0,109,207,8,208,141,207,61,1,34,208,207,0,143,208,157,1,141,208,157,1,121,208,8,0,142,208,156,1,68,56,208,0,1,208,1,0,143,208,66,3,1,208,96,9,143,208,72,3,119,0,28,0,141,208,22,3,1,207,0,8,19,208,208,207,32,208,208,0,121,208,17,0,141,208,22,3,38,208,208,1,32,208,208,0,1,207,97,9,1,205,102,9,125,6,208,207,205,0,0,0,142,205,156,1,58,56,205,0,141,207,22,3,38,207,207,1,0,205,207,0,143,205,66,3,0,205,6,0,143,205,72,3,119,0,7,0,142,205,156,1,58,56,205,0,1,205,1,0,143,205,66,3,1,205,99,9,143,205,72,3,127,205,0,0,87,205,56,0,127,207,0,0,82,205,207,0,143,205,158,1,127,207,0,0,106,205,207,4,143,205,159,1,141,205,159,1,2,207,0,0,0,0,240,127,19,205,205,207,2,207,0,0,0,0,240,127,16,205,205,207,141,207,159,1,2,208,0,0,0,0,240,127,19,207,207,208,2,208,0,0,0,0,240,127,13,207,207,208,1,208,0,0,34,208,208,0,19,207,207,208,20,205,205,207,121,205,251,11,141,207,136,3,25,207,207,8,134,205,0,0,84,61,1,0,56,207,0,0,144,205,174,1,142,205,174,1,59,207,2,0,65,205,205,207,59,207,0,0,70,205,205,207,121,205,8,0,141,207,136,3,106,205,207,8,143,205,175,1,141,205,136,3,141,207,175,1,26,207,207,1,109,205,8,207,141,207,102,3,39,207,207,32,32,207,207,97,121,207,1,3,141,205,72,3,25,207,205,9,143,207,176,1,141,205,102,3,38,205,205,32,32,205,205,0,141,208,72,3,141,206,176,1,125,207,205,208,206,0,0,0,143,207,71,3,141,206,66,3,39,206,206,2,0,207,206,0,143,207,177,1,1,206,11,0,141,208,58,3,16,207,206,208,143,207,178,1,1,208,12,0,141,206,58,3,4,207,208,206,143,207,179,1,141,207,178,1,141,206,179,1,32,206,206,0,20,207,207,206,121,207,5,0,142,207,174,1,59,206,2,0,65,57,207,206,119,0,49,0,141,207,179,1,0,206,207,0,143,206,76,3,59,206,8,0,144,206,77,3,141,207,76,3,26,206,207,1,143,206,180,1,142,207,77,3,59,208,16,0,65,206,207,208,144,206,181,1,141,206,180,1,32,206,206,0,120,206,8,0,141,208,180,1,0,206,208,0,143,206,76,3,142,208,181,1,58,206,208,0,144,206,77,3,119,0,240,255,141,208,71,3,78,206,208,0,143,206,182,1,141,206,182,1,41,206,206,24,42,206,206,24,32,206,206,45,121,206,11,0,142,206,181,1,142,208,174,1,59,207,2,0,65,208,208,207,68,208,208,0,142,207,181,1,64,208,208,207,63,206,206,208,68,57,206,0,119,0,9,0,142,206,174,1,59,208,2,0,65,206,206,208,142,208,181,1,63,206,206,208,142,208,181,1,64,57,206,208,119,0,1,0,141,206,136,3,106,208,206,8,143,208,183,1,141,207,183,1,34,207,207,0,121,207,6,0,1,207,0,0,141,205,183,1,4,207,207,205,0,206,207,0,119,0,3,0,141,207,183,1,0,206,207,0,0,208,206,0,143,208,185,1,141,208,185,1,34,208,208,0,121,208,72,0,141,208,32,2,0,54,208,0,141,206,185,1,0,208,206,0,143,208,186,1,141,206,185,1,34,206,206,0,41,206,206,31,42,206,206,31,0,208,206,0,143,208,187,1,141,206,186,1,141,207,187,1,1,205,10,0,1,204,0,0,134,208,0,0,76,56,1,0,206,207,205,204,143,208,188,1,128,204,0,0,0,208,204,0,143,208,189,1,26,208,54,1,143,208,191,1,141,208,191,1,141,204,188,1,39,204,204,48,19,204,204,202,83,208,204,0,141,208,186,1,141,205,187,1,1,207,10,0,1,206,0,0,134,204,0,0,12,60,1,0,208,205,207,206,143,204,192,1,128,206,0,0,0,204,206,0,143,204,193,1,1,206,9,0,141,207,187,1,16,204,206,207,143,204,194,1,1,207,255,255,141,206,186,1,16,204,207,206,143,204,195,1,141,206,187,1,32,204,206,9,143,204,196,1,141,204,194,1,141,206,196,1,141,207,195,1,19,206,206,207,20,204,204,206,121,204,10,0,141,204,191,1,0,54,204,0,141,206,192,1,0,204,206,0,143,204,186,1,141,206,193,1,0,204,206,0,143,204,187,1,119,0,202,255,141,204,191,1,0,17,204,0,141,204,192,1,0,48,204,0,119,0,5,0,141,204,32,2,0,17,204,0,141,204,185,1,0,48,204,0,32,204,48,0,143,204,197,1,141,204,197,1,121,204,3,0,0,58,17,0,119,0,35,0,0,62,17,0,0,204,48,0,143,204,112,3,141,206,112,3,31,206,206,10,38,206,206,255,0,204,206,0,143,204,198,1,26,204,62,1,143,204,199,1,141,204,199,1,141,206,198,1,39,206,206,48,19,206,206,202,83,204,206,0,141,204,112,3,29,204,204,10,38,204,204,255,0,206,204,0,143,206,200,1,141,204,112,3,35,206,204,10,143,206,201,1,141,206,201,1,121,206,4,0,141,206,199,1,0,58,206,0,119,0,7,0,141,206,199,1,0,62,206,0,141,204,200,1,0,206,204,0,143,206,112,3,119,0,226,255,141,204,32,2,13,206,58,204,143,206,202,1,141,206,202,1,121,206,12,0,141,206,136,3,1,204,56,3,3,206,206,204,1,204,48,0,107,206,11,204,141,206,136,3,1,207,56,3,3,206,206,207,25,204,206,11,143,204,14,3,119,0,3,0,0,204,58,0,143,204,14,3,141,206,136,3,106,204,206,8,143,204,203,1,141,206,14,3,26,204,206,1,143,204,204,1,141,204,204,1,141,206,203,1,42,206,206,31,38,206,206,2,25,206,206,43,19,206,206,202,83,204,206,0,141,204,14,3,26,206,204,2,143,206,205,1,141,206,205,1,141,204,102,3,25,204,204,15,19,204,204,202,83,206,204,0,141,204,22,3,38,204,204,8,32,204,204,0,121,204,130,0,141,206,58,3,34,204,206,1,143,204,57,3,141,204,57,3,121,204,66,0,58,70,57,0,141,206,136,3,3,204,206,201,143,204,81,3,75,204,70,0,143,204,206,1,1,206,56,9,141,207,206,1,90,204,206,207,143,204,207,1,141,206,81,3,25,204,206,1,143,204,208,1,141,204,81,3,141,206,207,1,19,206,206,202,141,207,102,3,38,207,207,32,20,206,206,207,19,206,206,202,83,204,206,0,141,204,206,1,76,204,204,0,64,206,70,204,144,206,209,1,141,206,208,1,4,206,206,111,33,206,206,1,142,204,209,1,59,207,16,0,65,204,204,207,59,207,0,0,69,204,204,207,20,206,206,204,121,206,5,0,141,204,208,1,0,206,204,0,143,206,85,3,119,0,10,0,141,204,81,3,25,206,204,2,143,206,211,1,141,206,208,1,1,204,46,0,83,206,204,0,141,206,211,1,0,204,206,0,143,204,85,3,142,204,209,1,59,206,16,0,65,204,204,206,59,206,0,0,70,204,204,206,121,204,8,0,142,204,209,1,59,206,16,0,65,70,204,206,141,204,85,3,0,206,204,0,143,206,81,3,119,0,200,255,141,204,85,3,0,206,204,0,143,206,83,3,119,0,119,0,58,69,57,0,141,204,136,3,3,206,204,201,143,206,80,3,75,206,69,0,143,206,212,1,1,204,56,9,141,207,212,1,90,206,204,207,143,206,213,1,141,204,80,3,25,206,204,1,143,206,214,1,141,206,80,3,141,204,213,1,19,204,204,202,141,207,102,3,38,207,207,32,20,204,204,207,19,204,204,202,83,206,204,0,141,206,212,1,76,206,206,0,64,204,69,206,144,204,216,1,141,204,214,1,4,204,204,111,32,204,204,1,121,204,11,0,141,206,80,3,25,204,206,2,143,204,217,1,141,204,214,1,1,206,46,0,83,204,206,0,141,204,217,1,0,206,204,0,143,206,84,3,119,0,4,0,141,204,214,1,0,206,204,0,143,206,84,3,142,206,216,1,59,204,16,0,65,206,206,204,59,204,0,0,70,206,206,204,121,206,8,0,142,206,216,1,59,204,16,0,65,69,206,204,141,206,84,3,0,204,206,0,143,204,80,3,119,0,206,255,141,206,84,3,0,204,206,0,143,204,83,3,119,0,60,0,58,68,57,0,141,206,136,3,3,204,206,201,143,204,79,3,75,204,68,0,143,204,218,1,1,206,56,9,141,207,218,1,90,204,206,207,143,204,219,1,141,206,79,3,25,204,206,1,143,204,220,1,141,204,79,3,141,206,219,1,19,206,206,202,141,207,102,3,38,207,207,32,20,206,206,207,19,206,206,202,83,204,206,0,141,204,218,1,76,204,204,0,64,206,68,204,144,206,221,1,141,206,220,1,4,206,206,111,32,206,206,1,121,206,11,0,141,204,79,3,25,206,204,2,143,206,222,1,141,206,220,1,1,204,46,0,83,206,204,0,141,206,222,1,0,204,206,0,143,204,82,3,119,0,4,0,141,206,220,1,0,204,206,0,143,204,82,3,142,204,221,1,59,206,16,0,65,204,204,206,59,206,0,0,70,204,204,206,121,204,8,0,142,204,221,1,59,206,16,0,65,68,204,206,141,204,82,3,0,206,204,0,143,206,79,3,119,0,206,255,141,204,82,3,0,206,204,0,143,206,83,3,119,0,1,0,141,204,58,3,33,206,204,0,143,206,223,1,141,206,83,3,0,107,206,0,1,204,254,255,4,204,204,111,3,204,204,107,141,207,58,3,15,206,204,207,143,206,224,1,141,207,32,2,25,207,207,2,141,204,58,3,3,206,207,204,143,206,225,1,141,207,223,1,141,205,224,1,19,207,207,205,121,207,6,0,141,207,225,1,141,205,205,1,4,207,207,205,0,204,207,0,119,0,7,0,141,207,32,2,4,207,207,111,141,205,205,1,4,207,207,205,3,207,207,107,0,204,207,0,0,206,204,0,143,206,48,3,141,204,48,3,141,207,177,1,3,204,204,207,141,207,106,3,15,206,204,207,143,206,227,1,141,206,22,3,2,207,0,0,0,32,1,0,19,206,206,207,32,206,206,0,141,207,227,1,19,206,206,207,121,206,56,0,141,207,106,3,141,204,48,3,141,205,177,1,3,204,204,205,4,206,207,204,143,206,228,1,1,204,0,1,141,207,228,1,16,204,204,207,1,207,0,1,141,205,228,1,125,206,204,207,205,0,0,0,143,206,229,1,141,205,136,3,1,207,56,2,3,205,205,207,1,207,32,0,141,204,229,1,135,206,1,0,205,207,204,0,141,206,228,1,48,206,202,206,40,33,0,0,141,206,228,1,0,38,206,0,141,204,136,3,1,207,56,2,3,204,204,207,1,207,0,1,134,206,0,0,84,2,1,0,204,207,0,0,1,207,0,1,4,206,38,207,143,206,230,1,141,206,230,1,48,206,202,206,20,33,0,0,141,206,230,1,0,38,206,0,119,0,241,255,119,0,1,0,141,206,228,1,19,206,206,202,0,20,206,0,119,0,3,0,141,206,228,1,0,20,206,0,141,207,136,3,1,204,56,2,3,207,207,204,134,206,0,0,84,2,1,0,207,20,0,0,141,207,71,3,141,204,177,1,134,206,0,0,84,2,1,0,207,204,0,0,141,206,22,3,2,204,0,0,0,32,1,0,19,206,206,204,2,204,0,0,0,0,1,0,13,206,206,204,141,204,227,1,19,206,206,204,121,206,56,0,141,204,106,3,141,207,48,3,141,205,177,1,3,207,207,205,4,206,204,207,143,206,232,1,1,207,0,1,141,204,232,1,16,207,207,204,1,204,0,1,141,205,232,1,125,206,207,204,205,0,0,0,143,206,233,1,141,205,136,3,1,204,56,2,3,205,205,204,1,204,48,0,141,207,233,1,135,206,1,0,205,204,207,0,141,206,232,1,48,206,202,206,64,34,0,0,141,206,232,1,0,40,206,0,141,207,136,3,1,204,56,2,3,207,207,204,1,204,0,1,134,206,0,0,84,2,1,0,207,204,0,0,1,204,0,1,4,206,40,204,143,206,234,1,141,206,234,1,48,206,202,206,44,34,0,0,141,206,234,1,0,40,206,0,119,0,241,255,119,0,1,0,141,206,232,1,19,206,206,202,0,22,206,0,119,0,3,0,141,206,232,1,0,22,206,0,141,204,136,3,1,207,56,2,3,204,204,207,134,206,0,0,84,2,1,0,204,22,0,0,141,204,136,3,3,204,204,201,4,207,107,111,134,206,0,0,84,2,1,0,204,207,0,0,141,207,48,3,141,204,32,2,141,205,205,1,4,204,204,205,4,207,207,204,4,204,107,111,4,206,207,204,143,206,236,1,1,206,0,0,141,204,236,1,47,206,206,204,108,35,0,0,1,204,0,1,141,207,236,1,16,204,204,207,1,207,0,1,141,205,236,1,125,206,204,207,205,0,0,0,143,206,237,1,141,205,136,3,1,207,56,2,3,205,205,207,1,207,48,0,141,204,237,1,135,206,1,0,205,207,204,0,141,206,236,1,48,206,202,206,76,35,0,0,141,206,236,1,0,42,206,0,141,204,136,3,1,207,56,2,3,204,204,207,1,207,0,1,134,206,0,0,84,2,1,0,204,207,0,0,1,207,0,1,4,206,42,207,143,206,238,1,141,206,238,1,48,206,202,206,56,35,0,0,141,206,238,1,0,42,206,0,119,0,241,255,119,0,1,0,141,206,236,1,19,206,206,202,0,24,206,0,119,0,3,0,141,206,236,1,0,24,206,0,141,207,136,3,1,204,56,2,3,207,207,204,134,206,0,0,84,2,1,0,207,24,0,0,141,207,205,1,141,204,32,2,141,205,205,1,4,204,204,205,134,206,0,0,84,2,1,0,207,204,0,0,141,206,22,3,2,204,0,0,0,32,1,0,19,206,206,204,1,204,0,32,13,206,206,204,141,204,227,1,19,206,206,204,121,206,56,0,141,204,106,3,141,207,48,3,141,205,177,1,3,207,207,205,4,206,204,207,143,206,239,1,1,207,0,1,141,204,239,1,16,207,207,204,1,204,0,1,141,205,239,1,125,206,207,204,205,0,0,0,143,206,240,1,141,205,136,3,1,204,56,2,3,205,205,204,1,204,32,0,141,207,240,1,135,206,1,0,205,204,207,0,141,206,239,1,48,206,202,206,104,36,0,0,141,206,239,1,0,44,206,0,141,207,136,3,1,204,56,2,3,207,207,204,1,204,0,1,134,206,0,0,84,2,1,0,207,204,0,0,1,204,0,1,4,206,44,204,143,206,241,1,141,206,241,1,48,206,202,206,84,36,0,0,141,206,241,1,0,44,206,0,119,0,241,255,119,0,1,0,141,206,239,1,19,206,206,202,0,26,206,0,119,0,3,0,141,206,239,1,0,26,206,0,141,204,136,3,1,207,56,2,3,204,204,207,134,206,0,0,84,2,1,0,204,26,0,0,141,207,227,1,121,207,4,0,141,207,106,3,0,204,207,0,119,0,5,0,141,207,48,3,141,205,177,1,3,207,207,205,0,204,207,0,0,206,204,0,143,206,104,3,141,206,104,3,0,8,206,0,119,0,158,9,141,204,58,3,34,206,204,0,143,206,242,1,141,206,242,1,1,204,6,0,141,207,58,3,125,99,206,204,207,0,0,0,142,207,174,1,59,204,2,0,65,207,207,204,59,204,0,0,70,207,207,204,121,207,18,0,141,204,136,3,106,207,204,8,143,207,243,1,141,207,136,3,141,204,243,1,26,204,204,28,109,207,8,204,142,204,174,1,59,207,2,0,65,204,204,207,60,207,0,0,0,0,0,16,65,78,204,207,141,204,243,1,26,207,204,28,143,207,244,1,119,0,8,0,141,207,136,3,106,104,207,8,142,207,174,1,59,204,2,0,65,78,207,204,0,204,104,0,143,204,244,1,141,207,244,1,34,204,207,0,143,204,245,1,141,207,245,1,121,207,5,0,141,207,136,3,25,207,207,16,0,204,207,0,119,0,6,0,141,207,136,3,25,207,207,16,1,206,32,1,3,207,207,206,0,204,207,0,0,79,204,0,58,81,78,0,0,204,79,0,143,204,117,3,75,204,81,0,143,204,246,1,141,204,117,3,141,207,246,1,85,204,207,0,141,204,117,3,25,207,204,4,143,207,247,1,141,204,246,1,77,204,204,0,64,207,81,204,144,207,248,1,142,207,248,1,60,204,0,0,0,202,154,59,65,207,207,204,59,204,0,0,70,207,207,204,121,207,9,0,142,207,248,1,60,204,0,0,0,202,154,59,65,81,207,204,141,207,247,1,0,204,207,0,143,204,117,3,119,0,230,255,141,204,136,3,106,101,204,8,1,204,0,0,47,204,204,101,232,40,0,0,0,204,101,0,143,204,249,1,0,204,79,0,143,204,214,2,141,207,247,1,0,204,207,0,143,204,122,3,1,207,29,0,141,206,249,1,15,204,207,206,143,204,250,1,141,206,250,1,1,207,29,0,141,205,249,1,125,204,206,207,205,0,0,0,143,204,251,1,141,205,122,3,26,204,205,4,143,204,255,2,141,205,255,2,141,207,214,2,16,204,205,207,143,204,252,1,141,204,252,1,121,204,5,0,141,207,214,2,0,204,207,0,143,204,216,2,119,0,84,0,1,204,0,0,143,204,248,2,141,207,255,2,0,204,207,0,143,204,0,3,141,207,0,3,82,204,207,0,143,204,253,1,141,207,253,1,1,205,0,0,141,206,251,1,135,204,2,0,207,205,206,0,143,204,254,1,128,206,0,0,0,204,206,0,143,204,0,2,141,206,254,1,141,205,0,2,141,207,248,2,1,208,0,0,134,204,0,0,44,60,1,0,206,205,207,208,143,204,1,2,128,208,0,0,0,204,208,0,143,204,2,2,141,208,1,2,141,207,2,2,1,205,0,0,134,204,0,0,76,56,1,0,208,207,200,205,143,204,3,2,128,205,0,0,0,204,205,0,143,204,4,2,141,204,0,3,141,205,3,2,85,204,205,0,141,204,1,2,141,207,2,2,1,208,0,0,134,205,0,0,12,60,1,0,204,207,200,208,143,205,5,2,128,208,0,0,0,205,208,0,143,205,6,2,141,208,0,3,26,205,208,4,143,205,254,2,141,208,254,2,141,207,214,2,16,205,208,207,143,205,7,2,141,205,7,2,120,205,8,0,141,207,5,2,0,205,207,0,143,205,248,2,141,207,254,2,0,205,207,0,143,205,0,3,119,0,195,255,141,205,5,2,32,205,205,0,121,205,5,0,141,207,214,2,0,205,207,0,143,205,216,2,119,0,10,0,141,207,214,2,26,205,207,4,143,205,8,2,141,205,8,2,141,207,5,2,85,205,207,0,141,205,8,2,0,207,205,0,143,207,216,2,141,205,122,3,0,207,205,0,143,207,124,3,141,205,216,2,141,208,124,3,16,207,205,208,143,207,10,2], eb + 0);
  HEAPU8.set([141,207,10,2,120,207,5,0,141,208,124,3,0,207,208,0,143,207,125,3,119,0,18,0,141,208,124,3,26,207,208,4,143,207,11,2,141,208,11,2,82,207,208,0,143,207,12,2,141,207,12,2,32,207,207,0,121,207,5,0,141,208,11,2,0,207,208,0,143,207,124,3,119,0,234,255,141,208,124,3,0,207,208,0,143,207,125,3,119,0,1,0,141,208,136,3,106,207,208,8,143,207,13,2,141,207,136,3,141,208,13,2,141,205,251,1,4,208,208,205,109,207,8,208,1,208,0,0,141,207,13,2,141,205,251,1,4,207,207,205,47,208,208,207,192,40,0,0,141,207,13,2,141,205,251,1,4,208,207,205,143,208,249,1,141,205,216,2,0,208,205,0,143,208,214,2,141,205,125,3,0,208,205,0,143,208,122,3,119,0,96,255,141,208,13,2,141,205,251,1,4,102,208,205,141,208,216,2,0,205,208,0,143,205,213,2,141,208,125,3,0,205,208,0,143,205,121,3,119,0,7,0,0,102,101,0,0,205,79,0,143,205,213,2,141,208,247,1,0,205,208,0,143,205,121,3,34,205,102,0,143,205,14,2,141,205,14,2,121,205,76,1,25,208,99,25,28,208,208,9,38,208,208,255,25,205,208,1,143,205,16,2,141,205,102,3,39,205,205,32,32,205,205,102,120,205,163,0,0,205,102,0,143,205,37,2,141,208,213,2,0,205,208,0,143,205,218,2,141,208,121,3,0,205,208,0,143,205,127,3,1,208,0,0,141,207,37,2,4,205,208,207,143,205,36,2,1,207,9,0,141,208,36,2,15,207,207,208,1,208,9,0,141,204,36,2,125,205,207,208,204,0,0,0,143,205,38,2,141,204,218,2,141,208,127,3,16,205,204,208,143,205,39,2,141,205,39,2,121,205,75,0,1,205,0,0,143,205,249,2,141,208,218,2,0,205,208,0,143,205,1,3,141,208,1,3,82,205,208,0,143,205,43,2,141,208,43,2,141,204,38,2,24,208,208,204,141,204,249,2,3,205,208,204,143,205,44,2,141,205,1,3,141,204,44,2,85,205,204,0,141,205,43,2,1,208,1,0,141,207,38,2,22,208,208,207,26,208,208,1,19,205,205,208,141,208,38,2,24,208,200,208,5,204,205,208,143,204,45,2,141,208,1,3,25,204,208,4,143,204,46,2,141,208,46,2,141,205,127,3,16,204,208,205,143,204,47,2,141,204,47,2,121,204,8,0,141,205,45,2,0,204,205,0,143,204,249,2,141,205,46,2,0,204,205,0,143,204,1,3,119,0,219,255,141,205,218,2,82,204,205,0,143,204,48,2,141,205,218,2,25,204,205,4,143,204,49,2,141,204,48,2,32,204,204,0,141,205,49,2,141,208,218,2,125,86,204,205,208,0,0,0,141,208,45,2,32,208,208,0,121,208,6,0,0,91,86,0,141,205,127,3,0,208,205,0,143,208,129,3,119,0,28,0,141,205,127,3,25,208,205,4,143,208,50,2,141,208,127,3,141,205,45,2,85,208,205,0,0,91,86,0,141,208,50,2,0,205,208,0,143,205,129,3,119,0,17,0,141,208,218,2,82,205,208,0,143,205,40,2,141,208,218,2,25,205,208,4,143,205,42,2,141,205,40,2,32,205,205,0,141,208,42,2,141,204,218,2,125,90,205,208,204,0,0,0,0,91,90,0,141,208,127,3,0,204,208,0,143,204,129,3,141,208,129,3,0,204,208,0,143,204,51,2,0,204,91,0,143,204,52,2,141,208,16,2,41,208,208,2,3,204,91,208,143,204,53,2,141,204,16,2,141,208,51,2,141,205,52,2,4,208,208,205,42,208,208,2,15,204,204,208,141,208,53,2,141,205,129,3,125,109,204,208,205,0,0,0,141,208,136,3,106,205,208,8,143,205,54,2,141,205,136,3,141,208,54,2,141,204,38,2,3,208,208,204,109,205,8,208,141,208,54,2,141,205,38,2,3,208,208,205,34,208,208,0,121,208,10,0,141,205,54,2,141,204,38,2,3,208,205,204,143,208,37,2,0,208,91,0,143,208,218,2,0,208,109,0,143,208,127,3,119,0,108,255,0,208,91,0,143,208,217,2,0,208,109,0,143,208,126,3,119,0,167,0,0,208,102,0,143,208,18,2,141,204,213,2,0,208,204,0,143,208,219,2,141,204,121,3,0,208,204,0,143,208,128,3,1,204,0,0,141,205,18,2,4,208,204,205,143,208,17,2,1,205,9,0,141,204,17,2,15,205,205,204,1,204,9,0,141,207,17,2,125,208,205,204,207,0,0,0,143,208,19,2,141,207,219,2,141,204,128,3,16,208,207,204,143,208,20,2,141,208,20,2,121,208,75,0,1,208,0,0,143,208,250,2,141,204,219,2,0,208,204,0,143,208,2,3,141,204,2,3,82,208,204,0,143,208,29,2,141,204,29,2,141,207,19,2,24,204,204,207,141,207,250,2,3,208,204,207,143,208,30,2,141,208,2,3,141,207,30,2,85,208,207,0,141,208,29,2,1,204,1,0,141,205,19,2,22,204,204,205,26,204,204,1,19,208,208,204,141,204,19,2,24,204,200,204,5,207,208,204,143,207,31,2,141,204,2,3,25,207,204,4,143,207,34,2,141,204,34,2,141,208,128,3,16,207,204,208,143,207,35,2,141,207,35,2,121,207,8,0,141,208,31,2,0,207,208,0,143,207,250,2,141,208,34,2,0,207,208,0,143,207,2,3,119,0,219,255,141,208,219,2,82,207,208,0,143,207,24,2,141,208,219,2,25,207,208,4,143,207,25,2,141,207,24,2,32,207,207,0,141,208,25,2,141,204,219,2,125,87,207,208,204,0,0,0,141,204,31,2,32,204,204,0,121,204,6,0,0,89,87,0,141,208,128,3,0,204,208,0,143,204,130,3,119,0,28,0,141,208,128,3,25,204,208,4,143,204,26,2,141,204,128,3,141,208,31,2,85,204,208,0,0,89,87,0,141,204,26,2,0,208,204,0,143,208,130,3,119,0,17,0,141,204,219,2,82,208,204,0,143,208,21,2,141,204,219,2,25,208,204,4,143,208,23,2,141,208,21,2,32,208,208,0,141,204,23,2,141,207,219,2,125,88,208,204,207,0,0,0,0,89,88,0,141,204,128,3,0,207,204,0,143,207,130,3,141,204,130,3,0,207,204,0,143,207,27,2,141,204,16,2,141,208,27,2,4,208,208,79,42,208,208,2,47,204,204,208,196,45,0,0,141,204,16,2,41,204,204,2,3,204,79,204,0,207,204,0,119,0,3,0,141,204,130,3,0,207,204,0,0,110,207,0,141,204,136,3,106,207,204,8,143,207,28,2,141,207,136,3,141,204,28,2,141,208,19,2,3,204,204,208,109,207,8,204,141,204,28,2,141,207,19,2,3,204,204,207,34,204,204,0,121,204,10,0,141,207,28,2,141,208,19,2,3,204,207,208,143,204,18,2,0,204,89,0,143,204,219,2,0,204,110,0,143,204,128,3,119,0,110,255,0,204,89,0,143,204,217,2,0,204,110,0,143,204,126,3,119,0,7,0,141,208,213,2,0,204,208,0,143,204,217,2,141,208,121,3,0,204,208,0,143,204,126,3,141,208,217,2,141,207,126,3,16,204,208,207,143,204,55,2,141,204,55,2,121,204,44,0,141,207,217,2,0,204,207,0,143,204,56,2,141,207,217,2,82,204,207,0,143,204,58,2,141,204,58,2,35,204,204,10,121,204,7,0,141,207,56,2,4,207,79,207,42,207,207,2,27,204,207,9,143,204,10,3,119,0,31,0,141,207,56,2,4,207,79,207,42,207,207,2,27,204,207,9,143,204,9,3,1,204,10,0,143,204,29,3,141,207,29,3,27,204,207,10,143,204,59,2,141,207,9,3,25,204,207,1,143,204,60,2,141,204,58,2,141,207,59,2,48,204,204,207,252,46,0,0,141,207,60,2,0,204,207,0,143,204,10,3,119,0,10,0,141,207,60,2,0,204,207,0,143,204,9,3,141,207,59,2,0,204,207,0,143,204,29,3,119,0,236,255,1,204,0,0,143,204,10,3,141,207,102,3,39,207,207,32,33,207,207,102,141,208,10,3,1,205,0,0,125,204,207,208,205,0,0,0,143,204,61,2,141,205,61,2,4,205,99,205,33,208,99,0,141,207,102,3,39,207,207,32,32,207,207,103,19,208,208,207,41,208,208,31,42,208,208,31,3,204,205,208,143,204,62,2,141,208,126,3,0,204,208,0,143,204,63,2,141,204,62,2,141,208,63,2,4,208,208,79,42,208,208,2,27,208,208,9,26,208,208,9,47,204,204,208,72,53,0,0,141,208,62,2,1,205,0,36,3,208,208,205,28,208,208,9,38,208,208,255,1,205,255,3,4,208,208,205,41,208,208,2,3,204,79,208,143,204,64,2,141,204,62,2,1,208,0,36,3,204,204,208,30,204,204,9,38,204,204,255,25,204,204,1,34,204,204,9,121,204,30,0,1,204,10,0,143,204,34,3,141,208,62,2,1,205,0,36,3,208,208,205,30,208,208,9,38,208,208,255,25,204,208,1,143,204,44,3,141,208,34,3,27,204,208,10,143,204,65,2,141,208,44,3,25,204,208,1,143,204,43,3,141,204,43,3,32,204,204,9,121,204,5,0,141,208,65,2,0,204,208,0,143,204,32,3,119,0,10,0,141,208,65,2,0,204,208,0,143,204,34,3,141,208,43,3,0,204,208,0,143,204,44,3,119,0,237,255,1,204,10,0,143,204,32,3,141,208,64,2,82,204,208,0,143,204,66,2,141,208,66,2,141,205,32,3,9,208,208,205,38,208,208,255,0,204,208,0,143,204,67,2,141,204,67,2,32,204,204,0,121,204,28,0,141,208,62,2,1,205,0,36,3,208,208,205,28,208,208,9,38,208,208,255,1,205,254,3,4,208,208,205,41,208,208,2,3,208,79,208,141,205,126,3,13,204,208,205,143,204,68,2,141,204,68,2,121,204,11,0,141,205,217,2,0,204,205,0,143,204,223,2,141,205,64,2,0,204,205,0,143,204,5,3,141,205,10,3,0,204,205,0,143,204,12,3,119,0,6,0,1,204,221,0,143,204,135,3,119,0,3,0,1,204,221,0,143,204,135,3,141,204,135,3,1,205,221,0,45,204,204,205,244,52,0,0,1,204,0,0,143,204,135,3,141,205,66,2,141,208,32,3,7,205,205,208,38,205,205,255,0,204,205,0,143,204,69,2,141,205,69,2,38,205,205,1,32,205,205,0,121,205,5,0,61,205,0,0,0,0,0,90,58,204,205,0,119,0,5,0,62,205,0,0,1,0,0,0,0,0,64,67,58,204,205,0,58,71,204,0,141,205,32,3,28,205,205,2,38,205,205,255,0,204,205,0,143,204,70,2,141,204,67,2,141,205,70,2,48,204,204,205,152,49,0,0,61,204,0,0,0,0,0,63,144,204,94,3,119,0,25,0,141,204,67,2,141,205,70,2,45,204,204,205,236,49,0,0,141,205,62,2,1,208,0,36,3,205,205,208,28,205,205,9,38,205,205,255,1,208,254,3,4,205,205,208,41,205,205,2,3,205,79,205,141,208,126,3,13,204,205,208,143,204,71,2,141,204,71,2,121,204,4,0,59,204,1,0,144,204,94,3,119,0,4,0,61,204,0,0,0,0,192,63,144,204,94,3,141,208,66,3,32,204,208,0,143,204,72,2,141,204,72,2,121,204,7,0,58,204,71,0,144,204,78,3,142,208,94,3,58,204,208,0,144,204,95,3,119,0,23,0,141,208,72,3,78,204,208,0,143,204,73,2,141,204,73,2,41,204,204,24,42,204,204,24,32,204,204,45,120,204,7,0,58,204,71,0,144,204,78,3,142,208,94,3,58,204,208,0,144,204,95,3,119,0,9,0,142,208,94,3,68,204,208,0,144,204,75,2,68,204,71,0,144,204,78,3,142,208,75,2,58,204,208,0,144,204,95,3,141,204,64,2,141,208,66,2,141,205,67,2,4,208,208,205,85,204,208,0,142,204,78,3,142,205,95,3,63,208,204,205,144,208,76,2,142,205,76,2,142,204,78,3,70,208,205,204,143,208,77,2,141,208,77,2,120,208,11,0,141,204,217,2,0,208,204,0,143,208,223,2,141,204,64,2,0,208,204,0,143,208,5,3,141,204,10,3,0,208,204,0,143,208,12,3,119,0,134,0,141,204,66,2,141,205,67,2,4,204,204,205,141,205,32,3,3,208,204,205,143,208,78,2,141,208,64,2,141,205,78,2,85,208,205,0,2,205,0,0,255,201,154,59,141,208,78,2,48,205,205,208,0,52,0,0,141,208,217,2,0,205,208,0,143,205,221,2,141,208,64,2,0,205,208,0,143,205,4,3,141,208,4,3,26,205,208,4,143,205,79,2,141,205,4,3,1,208,0,0,85,205,208,0,141,205,79,2,141,204,221,2,16,208,205,204,143,208,80,2,141,208,80,2,121,208,11,0,141,204,221,2,26,208,204,4,143,208,81,2,141,208,81,2,1,204,0,0,85,208,204,0,141,208,81,2,0,204,208,0,143,204,222,2,119,0,4,0,141,208,221,2,0,204,208,0,143,204,222,2,141,208,79,2,82,204,208,0,143,204,82,2,141,204,79,2,141,208,82,2,25,208,208,1,85,204,208,0,2,208,0,0,255,201,154,59,141,204,82,2,25,204,204,1,48,208,208,204,228,51,0,0,141,204,222,2,0,208,204,0,143,208,221,2,141,204,79,2,0,208,204,0,143,208,4,3,119,0,212,255,141,204,222,2,0,208,204,0,143,208,220,2,141,204,79,2,0,208,204,0,143,208,3,3,119,0,7,0,141,204,217,2,0,208,204,0,143,208,220,2,141,204,64,2,0,208,204,0,143,208,3,3,141,204,220,2,0,208,204,0,143,208,83,2,141,204,220,2,82,208,204,0,143,208,84,2,141,208,84,2,35,208,208,10,121,208,13,0,141,204,220,2,0,208,204,0,143,208,223,2,141,204,3,3,0,208,204,0,143,208,5,3,141,204,83,2,4,204,79,204,42,204,204,2,27,208,204,9,143,208,12,3,119,0,35,0,141,204,83,2,4,204,79,204,42,204,204,2,27,208,204,9,143,208,11,3,1,208,10,0,143,208,37,3,141,204,37,3,27,208,204,10,143,208,85,2,141,204,11,3,25,208,204,1,143,208,87,2,141,208,84,2,141,204,85,2,48,208,208,204,216,52,0,0,141,204,220,2,0,208,204,0,143,208,223,2,141,204,3,3,0,208,204,0,143,208,5,3,141,204,87,2,0,208,204,0,143,208,12,3,119,0,8,0,141,204,87,2,0,208,204,0,143,208,11,3,141,204,85,2,0,208,204,0,143,208,37,3,119,0,230,255,141,204,5,3,25,208,204,4,143,208,88,2,141,204,88,2,141,205,126,3,16,208,204,205,143,208,89,2,141,208,89,2,141,205,88,2,141,204,126,3,125,108,208,205,204,0,0,0,141,205,223,2,0,204,205,0,143,204,224,2,141,205,12,3,0,204,205,0,143,204,13,3,0,204,108,0,143,204,134,3,119,0,10,0,141,205,217,2,0,204,205,0,143,204,224,2,141,205,10,3,0,204,205,0,143,204,13,3,141,205,126,3,0,204,205,0,143,204,134,3,1,205,0,0,141,208,13,3,4,204,205,208,143,204,90,2,141,208,134,3,0,204,208,0,143,204,132,3,141,208,224,2,141,205,132,3,16,204,208,205,143,204,91,2,141,204,91,2,120,204,6,0,1,95,0,0,141,205,132,3,0,204,205,0,143,204,133,3,119,0,19,0,141,205,132,3,26,204,205,4,143,204,92,2,141,205,92,2,82,204,205,0,143,204,93,2,141,204,93,2,32,204,204,0,121,204,5,0,141,205,92,2,0,204,205,0,143,204,132,3,119,0,233,255,1,95,1,0,141,205,132,3,0,204,205,0,143,204,133,3,119,0,1,0,141,204,102,3,39,204,204,32,32,204,204,103,121,204,148,0,33,204,99,0,38,204,204,1,40,204,204,1,3,97,204,99,141,205,13,3,15,204,205,97,143,204,94,2,1,205,251,255,141,208,13,3,15,204,205,208,143,204,95,2,141,204,94,2,141,208,95,2,19,204,204,208,121,204,10,0,26,208,97,1,141,205,13,3,4,204,208,205,143,204,96,2,141,204,102,3,26,51,204,1,141,204,96,2,0,75,204,0,119,0,4,0,141,204,102,3,26,51,204,2,26,75,97,1,141,204,22,3,38,204,204,8,32,204,204,0,120,204,7,0,0,60,51,0,0,80,75,0,141,204,22,3,38,204,204,8,0,105,204,0,119,0,117,0,121,95,49,0,141,205,133,3,26,204,205,4,143,204,97,2,141,205,97,2,82,204,205,0,143,204,98,2,141,204,98,2,32,204,204,0,121,204,4,0,1,204,9,0,143,204,46,3,119,0,39,0,141,204,98,2,31,204,204,10,38,204,204,255,32,204,204,0,121,204,6,0,1,204,10,0,143,204,39,3,1,204,0,0,143,204,45,3,119,0,4,0,1,204,0,0,143,204,46,3,119,0,26,0,141,205,39,3,27,204,205,10,143,204,99,2,141,205,45,3,25,204,205,1,143,204,100,2,141,204,98,2,141,205,99,2,9,204,204,205,38,204,204,255,32,204,204,0,121,204,8,0,141,205,99,2,0,204,205,0,143,204,39,3,141,205,100,2,0,204,205,0,143,204,45,3,119,0,238,255,141,205,100,2,0,204,205,0,143,204,46,3,119,0,3,0,1,204,9,0,143,204,46,3,39,205,51,32,0,204,205,0,143,204,101,2,141,205,133,3,0,204,205,0,143,204,103,2,141,204,101,2,32,204,204,102,121,204,24,0,141,205,103,2,4,205,205,79,42,205,205,2,27,205,205,9,26,205,205,9,141,208,46,3,4,204,205,208,143,204,104,2,141,204,104,2,34,204,204,0,1,208,0,0,141,205,104,2,125,72,204,208,205,0,0,0,15,205,75,72,143,205,105,2,141,205,105,2,125,73,205,75,72,0,0,0,0,60,51,0,0,80,73,0,1,105,0,0,119,0,34,0,141,208,103,2,4,208,208,79,42,208,208,2,27,208,208,9,26,208,208,9,141,204,13,3,3,205,208,204,143,205,106,2,141,204,106,2,141,208,46,3,4,205,204,208,143,205,107,2,141,205,107,2,34,205,205,0,1,208,0,0,141,204,107,2,125,76,205,208,204,0,0,0,15,204,75,76,143,204,109,2,141,204,109,2,125,74,204,75,76,0,0,0,0,60,51,0,0,80,74,0,1,105,0,0,119,0,7,0,141,204,102,3,0,60,204,0,0,80,99,0,141,204,22,3,38,204,204,8,0,105,204,0,20,208,80,105,0,204,208,0,143,204,110,2,39,208,60,32,0,204,208,0,143,204,111,2,141,204,111,2,32,204,204,102,121,204,16,0,1,208,0,0,141,205,13,3,15,204,208,205,143,204,112,2,141,205,112,2,141,208,13,3,1,207,0,0,125,204,205,208,207,0,0,0,143,204,113,2,141,204,113,2,0,100,204,0,1,204,0,0,143,204,18,3,119,0,191,0,141,207,13,3,34,204,207,0,143,204,114,2,141,207,114,2,141,208,90,2,141,205,13,3,125,204,207,208,205,0,0,0,143,204,116,2,141,204,116,2,34,204,204,0,121,204,72,0,141,204,32,2,0,55,204,0,141,205,116,2,0,204,205,0,143,204,117,2,141,205,116,2,34,205,205,0,41,205,205,31,42,205,205,31,0,204,205,0,143,204,118,2,141,205,117,2,141,208,118,2,1,207,10,0,1,206,0,0,134,204,0,0,76,56,1,0,205,208,207,206,143,204,119,2,128,206,0,0,0,204,206,0,143,204,120,2,26,204,55,1,143,204,121,2,141,204,121,2,141,206,119,2,39,206,206,48,19,206,206,202,83,204,206,0,141,204,117,2,141,207,118,2,1,208,10,0,1,205,0,0,134,206,0,0,12,60,1,0,204,207,208,205,143,206,122,2,128,205,0,0,0,206,205,0,143,206,123,2,1,205,9,0,141,208,118,2,16,206,205,208,143,206,124,2,1,208,255,255,141,205,117,2,16,206,208,205,143,206,125,2,141,205,118,2,32,206,205,9,143,206,126,2,141,206,124,2,141,205,126,2,141,208,125,2,19,205,205,208,20,206,206,205,121,206,10,0,141,206,121,2,0,55,206,0,141,205,122,2,0,206,205,0,143,206,117,2,141,205,123,2,0,206,205,0,143,206,118,2,119,0,202,255,141,206,121,2,0,27,206,0,141,206,122,2,0,49,206,0,119,0,5,0,141,206,32,2,0,27,206,0,141,206,116,2,0,49,206,0,32,206,49,0,143,206,127,2,141,206,127,2,121,206,4,0,0,206,27,0,143,206,16,3,119,0,36,0,0,67,27,0,0,206,49,0,143,206,116,3,141,205,116,3,31,205,205,10,38,205,205,255,0,206,205,0,143,206,128,2,26,206,67,1,143,206,129,2,141,206,129,2,141,205,128,2,39,205,205,48,19,205,205,202,83,206,205,0,141,206,116,3,29,206,206,10,38,206,206,255,0,205,206,0,143,205,130,2,141,206,116,3,35,205,206,10,143,205,131,2,141,205,131,2,121,205,5,0,141,206,129,2,0,205,206,0,143,205,16,3,119,0,7,0,141,205,129,2,0,67,205,0,141,206,130,2,0,205,206,0,143,205,116,3,119,0,225,255,141,206,16,3,0,205,206,0,143,205,132,2,141,205,32,2,141,206,132,2,4,205,205,206,34,205,205,2,121,205,23,0,141,206,16,3,0,205,206,0,143,205,17,3,141,206,17,3,26,205,206,1,143,205,133,2,141,205,133,2,1,206,48,0,83,205,206,0,141,206,32,2,141,205,133,2,4,206,206,205,34,206,206,2,121,206,5,0,141,205,133,2,0,206,205,0,143,206,17,3,119,0,242,255,141,205,133,2,0,206,205,0,143,206,15,3,119,0,4,0,141,205,16,3,0,206,205,0,143,206,15,3,141,205,13,3,42,205,205,31,0,206,205,0,143,206,134,2,141,205,15,3,26,206,205,1,143,206,135,2,141,206,135,2,141,205,134,2,38,205,205,2,25,205,205,43,19,205,205,202,83,206,205,0,19,206,60,202,0,205,206,0,143,205,136,2,141,206,15,3,26,205,206,2,143,205,137,2,141,205,137,2,141,206,136,2,83,205,206,0,141,206,32,2,141,205,137,2,4,100,206,205,141,206,137,2,0,205,206,0,143,205,18,3,141,206,66,3,25,205,206,1,143,205,138,2,141,206,138,2,3,205,206,80,143,205,139,2,141,206,139,2,141,208,110,2,33,208,208,0,38,208,208,1,3,206,206,208,3,205,206,100,143,205,140,2,141,206,140,2,141,208,106,3,15,205,206,208,143,205,141,2,141,205,22,3,2,208,0,0,0,32,1,0,19,205,205,208,32,205,205,0,141,208,141,2,19,205,205,208,121,205,54,0,141,208,106,3,141,206,140,2,4,205,208,206,143,205,142,2,1,206,0,1,141,208,142,2,16,206,206,208,1,208,0,1,141,207,142,2,125,205,206,208,207,0,0,0,143,205,143,2,141,207,136,3,1,208,56,2,3,207,207,208,1,208,32,0,141,206,143,2,135,205,1,0,207,208,206,0,141,205,142,2,48,205,202,205,224,60,0,0,141,205,142,2,0,46,205,0,141,206,136,3,1,208,56,2,3,206,206,208,1,208,0,1,134,205,0,0,84,2,1,0,206,208,0,0,1,208,0,1,4,205,46,208,143,205,144,2,141,205,144,2,48,205,202,205,204,60,0,0,141,205,144,2,0,46,205,0,119,0,241,255,119,0,1,0,141,205,142,2,19,205,205,202,0,29,205,0,119,0,3,0,141,205,142,2,0,29,205,0,141,208,136,3,1,206,56,2,3,208,208,206,134,205,0,0,84,2,1,0,208,29,0,0,141,208,72,3,141,206,66,3,134,205,0,0,84,2,1,0,208,206,0,0,141,205,22,3,2,206,0,0,0,32,1,0,19,205,205,206,2,206,0,0,0,0,1,0,13,205,205,206,141,206,141,2,19,205,205,206,121,205,54,0,141,206,106,3,141,208,140,2,4,205,206,208,143,205,145,2,1,208,0,1,141,206,145,2,16,208,208,206,1,206,0,1,141,207,145,2,125,205,208,206,207,0,0,0,143,205,146,2,141,207,136,3,1,206,56,2,3,207,207,206,1,206,48,0,141,208,146,2,135,205,1,0,207,206,208,0,141,205,145,2,48,205,202,205,240,61,0,0,141,205,145,2,0,32,205,0,141,208,136,3,1,206,56,2,3,208,208,206,1,206,0,1,134,205,0,0,84,2,1,0,208,206,0,0,1,206,0,1,4,205,32,206,143,205,147,2,141,205,147,2,48,205,202,205,220,61,0,0,141,205,147,2,0,32,205,0,119,0,241,255,119,0,1,0,141,205,145,2,19,205,205,202,0,11,205,0,119,0,3,0,141,205,145,2,0,11,205,0,141,206,136,3,1,208,56,2,3,206,206,208,134,205,0,0,84,2,1,0,206,11,0,0,141,205,111,2,32,205,205,102,121,205,70,1,141,206,224,2,16,205,79,206,143,205,149,2,141,206,149,2,141,208,224,2,125,205,206,79,208,0,0,0,143,205,75,3,141,208,75,3,0,205,208,0,143,205,6,3,141,208,6,3,82,205,208,0,143,205,150,2,141,205,150,2,32,205,205,0,121,205,3,0,0,59,191,0,119,0,36,0,0,63,191,0,141,208,150,2,0,205,208,0,143,205,113,3,141,208,113,3,31,208,208,10,38,208,208,255,0,205,208,0,143,205,151,2,26,205,63,1,143,205,152,2,141,205,152,2,141,208,151,2,39,208,208,48,19,208,208,202,83,205,208,0,141,205,113,3,29,205,205,10,38,205,205,255,0,208,205,0,143,208,153,2,141,205,113,3,35,208,205,10,143,208,155,2,141,208,155,2,121,208,4,0,141,208,152,2,0,59,208,0,119,0,7,0,141,208,152,2,0,63,208,0,141,205,153,2,0,208,205,0,143,208,113,3,119,0,226,255,141,205,6,3,141,206,75,3,13,208,205,206,143,208,156,2,141,208,156,2,121,208,17,0,13,208,59,191,143,208,159,2,141,208,159,2,120,208,4,0,0,208,59,0,143,208,88,3,119,0,41,0,141,208,136,3,3,208,208,201,1,206,48,0,107,208,8,206,141,208,136,3,3,208,208,201,25,206,208,8,143,206,88,3,119,0,32,0,141,208,136,3,3,208,208,201,16,206,208,59,143,206,157,2,141,206,157,2,121,206,4,0,0,206,59,0,143,206,87,3,119,0,4,0,0,206,59,0,143,206,88,3,119,0,20,0,141,208,87,3,26,206,208,1,143,206,158,2,141,206,158,2,1,208,48,0,83,206,208,0,141,208,136,3,3,208,208,201,141,206,158,2,48,208,208,206,184,63,0,0,141,206,158,2,0,208,206,0,143,208,87,3,119,0,242,255,141,206,158,2,0,208,206,0,143,208,88,3,119,0,1,0,141,206,88,3,0,208,206,0,143,208,160,2,141,206,88,3,141,205,160,2,4,205,191,205,134,208,0,0,84,2,1,0,206,205,0,0,141,205,6,3,25,208,205,4,143,208,161,2,141,208,161,2,55,208,79,208,20,64,0,0,141,205,161,2,0,208,205,0,143,208,6,3,119,0,142,255,141,208,110,2,32,208,208,0,120,208,6,0,1,205,152,9,1,206,1,0,134,208,0,0,84,2,1,0,205,206,0,0,141,206,161,2,141,205,133,3,16,208,206,205,143,208,163,2,1,205,0,0,15,208,205,80,143,208,164,2,141,208,164,2,141,205,163,2,19,208,208,205,121,208,124,0,0,83,80,0,141,205,161,2,0,208,205,0,143,208,7,3,141,205,7,3,82,208,205,0,143,208,165,2,141,208,165,2,32,208,208,0,121,208,6,0,0,208,191,0,143,208,90,3,1,208,33,1,143,208,135,3,119,0,47,0,0,64,191,0,141,205,165,2,0,208,205,0,143,208,114,3,141,205,114,3,31,205,205,10,38,205,205,255,0,208,205,0,143,208,166,2,26,208,64,1,143,208,167,2,141,208,167,2,141,205,166,2,39,205,205,48,19,205,205,202,83,208,205,0,141,208,114,3,29,208,208,10,38,208,208,255,0,205,208,0,143,205,169,2,141,208,114,3,35,205,208,10,143,205,170,2,141,205,170,2,120,205,7,0,141,205,167,2,0,64,205,0,141,208,169,2,0,205,208,0,143,205,114,3,119,0,229,255,141,205,136,3,3,205,205,201,141,208,167,2,48,205,205,208,72,65,0,0,141,208,167,2,0,205,208,0,143,205,90,3,1,205,33,1,143,205,135,3,119,0,4,0,141,208,167,2,0,205,208,0,143,205,89,3,141,205,135,3,1,208,33,1,45,205,205,208,192,65,0,0,1,205,0,0,143,205,135,3,141,208,90,3,26,205,208,1,143,205,171,2,141,205,171,2,1,208,48,0,83,205,208,0,141,208,136,3,3,208,208,201,141,205,171,2,48,208,208,205,176,65,0,0,141,205,171,2,0,208,205,0,143,208,90,3,1,208,33,1,143,208,135,3,119,0,238,255,141,205,171,2,0,208,205,0,143,208,89,3,119,0,1,0,1,205,9,0,15,208,205,83,143,208,172,2,141,205,172,2,1,206,9,0,125,208,205,206,83,0,0,0,143,208,173,2,141,206,89,3,141,205,173,2,134,208,0,0,84,2,1,0,206,205,0,0,141,205,7,3,25,208,205,4,143,208,174,2,26,208,83,9,143,208,175,2,141,205,174,2,141,206,133,3,16,208,205,206,143,208,176,2,141,208,172,2,141,206,176,2,19,208,208,206,121,208,7,0,141,208,175,2,0,83,208,0,141,206,174,2,0,208,206,0,143,208,7,3,119,0,141,255,141,208,175,2,0,82,208,0,119,0,2,0,0,82,80,0,1,206,0,0,15,208,206,82,143,208,178,2,141,208,178,2,121,208,52,1,1,206,0,1,16,208,206,82,143,208,179,2,141,206,179,2,1,205,0,1,125,208,206,205,82,0,0,0,143,208,180,2,141,205,136,3,1,206,56,2,3,205,205,206,1,206,48,0,141,207,180,2,135,208,1,0,205,206,207,0,16,208,202,82,143,208,181,2,141,208,181,2,121,208,25,0,0,33,82,0,141,207,136,3,1,206,56,2,3,207,207,206,1,206,0,1,134,208,0,0,84,2,1,0,207,206,0,0,1,206,0,1,4,208,33,206,143,208,182,2,141,208,182,2,48,208,202,208,244,66,0,0,141,208,182,2,0,33,208,0,119,0,241,255,119,0,1,0,19,206,82,202,0,208,206,0,143,208,183,2,141,208,183,2,0,12,208,0,119,0,2,0,0,12,82,0,141,206,136,3,1,207,56,2,3,206,206,207,134,208,0,0,84,2,1,0,206,12,0,0,119,0,1,1,141,206,224,2,25,208,206,4,143,208,184,2,141,206,133,3,141,207,184,2,125,208,95,206,207,0,0,0,143,208,131,3,1,207,255,255,15,208,207,80,143,208,185,2,141,208,185,2,121,208,234,0,32,208,105,0,143,208,187,2,0,84,80,0,141,207,224,2,0,208,207,0,143,208,8,3,141,207,8,3,82,208,207,0,143,208,188,2,141,208,188,2,32,208,208,0,121,208,4,0,1,208,47,1,143,208,135,3,119,0,45,0,0,65,191,0,141,207,188,2,0,208,207,0,143,208,115,3,141,207,115,3,31,207,207,10,38,207,207,255,0,208,207,0,143,208,189,2,26,208,65,1,143,208,190,2,141,208,190,2,141,207,189,2,39,207,207,48,19,207,207,202,83,208,207,0,141,208,115,3,29,208,208,10,38,208,208,255,0,207,208,0,143,207,191,2,141,208,115,3,35,207,208,10,143,207,192,2,141,207,192,2,121,207,3,0,0,66,65,0,119,0,7,0,141,207,190,2,0,65,207,0,141,208,191,2,0,207,208,0,143,207,115,3,119,0,227,255,141,207,190,2,45,207,207,191,64,68,0,0,1,207,47,1,143,207,135,3,119,0,5,0,0,180,66,0,141,208,190,2,0,207,208,0,143,207,91,3,141,207,135,3,1,208,47,1,45,207,207,208,140,68,0,0,1,207,0,0,143,207,135,3,141,207,136,3,3,207,207,201,1,208,48,0,107,207,8,208,0,180,191,0,141,207,136,3,3,207,207,201,25,208,207,8,143,208,91,3,141,207,8,3,141,206,224,2,13,208,207,206,143,208,194,2,141,208,194,2,121,208,23,0,141,206,91,3,1,207,1,0,134,208,0,0,84,2,1,0,206,207,0,0,34,208,84,1,143,208,197,2,141,208,187,2,141,207,197,2,19,208,208,207,121,208,4,0,0,208,180,0,143,208,93,3,119,0,43,0,1,207,152,9,1,206,1,0,134,208,0,0,84,2,1,0,207,206,0,0,0,208,180,0,143,208,93,3,119,0,35,0,141,206,136,3,3,206,206,201,141,207,91,3,16,208,206,207,143,208,195,2,141,208,195,2,121,208,5,0,141,207,91,3,0,208,207,0,143,208,92,3,119,0,5,0,141,207,91,3,0,208,207,0,143,208,93,3,119,0,20,0,141,207,92,3,26,208,207,1,143,208,196,2,141,208,196,2,1,207,48,0,83,208,207,0,141,207,136,3,3,207,207,201,141,208,196,2,48,207,207,208,116,69,0,0,141,208,196,2,0,207,208,0,143,207,92,3,119,0,242,255,141,208,196,2,0,207,208,0,143,207,93,3,119,0,1,0,141,208,93,3,0,207,208,0,143,207,198,2,141,208,198,2,4,208,191,208,15,207,208,84,143,207,199,2,141,206,199,2,121,206,5,0,141,206,198,2,4,206,191,206,0,208,206,0,119,0,2,0,0,208,84,0,0,207,208,0,143,207,200,2,141,208,93,3,141,206,200,2,134,207,0,0,84,2,1,0,208,206,0,0,141,206,198,2,4,206,191,206,4,207,84,206,143,207,201,2,141,206,8,3,25,207,206,4,143,207,203,2,141,207,203,2,141,206,131,3,16,207,207,206,1,206,255,255,141,208,201,2,15,206,206,208,19,207,207,206,121,207,7,0,141,207,201,2,0,84,207,0,141,206,203,2,0,207,206,0,143,207,8,3,119,0,85,255,1,207,0,0,141,206,201,2,54,207,207,206,64,70,0,0,119,0,51,0,1,206,0,1,141,208,201,2,16,206,206,208,1,208,0,1,141,205,201,2,125,207,206,208,205,0,0,0,143,207,204,2,141,205,136,3,1,208,56,2,3,205,205,208,1,208,48,0,141,206,204,2,135,207,1,0,205,208,206,0,141,207,201,2,48,207,202,207,228,70,0,0,141,207,201,2,0,34,207,0,141,206,136,3,1,208,56,2,3,206,206,208,1,208,0,1,134,207,0,0,84,2,1,0,206,208,0,0,1,208,0,1,4,207,34,208,143,207,205,2,141,207,205,2,48,207,202,207,208,70,0,0,141,207,205,2,0,34,207,0,119,0,241,255,119,0,1,0,141,207,201,2,19,207,207,202,0,13,207,0,119,0,3,0,141,207,201,2,0,13,207,0,141,208,136,3,1,206,56,2,3,208,208,206,134,207,0,0,84,2,1,0,208,13,0,0,119,0,1,0,141,208,18,3,0,207,208,0,143,207,207,2,141,208,18,3,141,206,32,2,141,205,207,2,4,206,206,205,134,207,0,0,84,2,1,0,208,206,0,0,141,207,22,3,2,206,0,0,0,32,1,0,19,207,207,206,1,206,0,32,13,207,207,206,141,206,141,2,19,207,207,206,121,207,54,0,141,206,106,3,141,208,140,2,4,207,206,208,143,207,208,2,1,208,0,1,141,206,208,2,16,208,208,206,1,206,0,1,141,205,208,2,125,207,208,206,205,0,0,0,143,207,209,2,141,205,136,3,1,206,56,2,3,205,205,206,1,206,32,0,141,208,209,2,135,207,1,0,205,206,208,0,141,207,208,2,48,207,202,207,8,72,0,0,141,207,208,2,0,31,207,0,141,208,136,3,1,206,56,2,3,208,208,206,1,206,0,1,134,207,0,0,84,2,1,0,208,206,0,0,1,206,0,1,4,207,31,206,143,207,210,2,141,207,210,2,48,207,202,207,244,71,0,0,141,207,210,2,0,31,207,0,119,0,241,255,119,0,1,0,141,207,208,2,19,207,207,202,0,10,207,0,119,0,3,0,141,207,208,2,0,10,207,0,141,206,136,3,1,208,56,2,3,206,206,208,134,207,0,0,84,2,1,0,206,10,0,0,141,206,141,2,141,208,106,3,141,205,140,2,125,207,206,208,205,0,0,0,143,207,108,3,141,207,108,3,0,8,207,0,119,0,187,0,141,205,102,3,38,205,205,32,33,205,205,0,1,208,120,9,1,206,128,9,125,207,205,208,206,0,0,0,143,207,160,1,70,206,56,56,59,208,0,0,59,205,0,0,70,208,208,205,20,206,206,208,0,207,206,0,143,207,161,1,141,206,102,3,38,206,206,32,33,206,206,0,1,208,136,9,1,205,144,9,125,207,206,208,205,0,0,0,143,207,162,1,141,205,161,1,1,208,0,0,141,206,66,3,125,207,205,208,206,0,0,0,143,207,68,3,141,206,161,1,141,208,162,1,141,205,160,1,125,207,206,208,205,0,0,0,143,207,86,3,141,205,68,3,25,205,205,3,141,208,106,3,15,207,205,208,143,207,164,1,141,207,22,3,1,208,0,32,19,207,207,208,32,207,207,0,141,208,164,1,19,207,207,208,121,207,55,0,141,208,106,3,141,205,68,3,25,205,205,3,4,207,208,205,143,207,165,1,1,205,0,1,141,208,165,1,16,205,205,208,1,208,0,1,141,206,165,1,125,207,205,208,206,0,0,0,143,207,166,1,141,206,136,3,1,208,56,2,3,206,206,208,1,208,32,0,141,205,166,1,135,207,1,0,206,208,205,0,141,207,165,1,48,207,202,207,192,73,0,0,141,207,165,1,0,35,207,0,141,205,136,3,1,208,56,2,3,205,205,208,1,208,0,1,134,207,0,0,84,2,1,0,205,208,0,0,1,208,0,1,4,207,35,208,143,207,167,1,141,207,167,1,48,207,202,207,172,73,0,0,141,207,167,1,0,35,207,0,119,0,241,255,119,0,1,0,141,207,165,1,19,207,207,202,0,14,207,0,119,0,3,0,141,207,165,1,0,14,207,0,141,208,136,3,1,205,56,2,3,208,208,205,134,207,0,0,84,2,1,0,208,14,0,0,141,208,72,3,141,205,68,3,134,207,0,0,84,2,1,0,208,205,0,0,141,205,86,3,1,208,3,0,134,207,0,0,84,2,1,0,205,208,0,0,141,207,22,3,2,208,0,0,0,32,1,0,19,207,207,208,1,208,0,32,13,207,207,208,141,208,164,1,19,207,207,208,121,207,55,0,141,208,106,3,141,205,68,3,25,205,205,3,4,207,208,205,143,207,169,1,1,205,0,1,141,208,169,1,16,205,205,208,1,208,0,1,141,206,169,1,125,207,205,208,206,0,0,0,143,207,170,1,141,206,136,3,1,208,56,2,3,206,206,208,1,208,32,0,141,205,170,1,135,207,1,0,206,208,205,0,141,207,169,1,48,207,202,207,228,74,0,0,141,207,169,1,0,37,207,0,141,205,136,3,1,208,56,2,3,205,205,208,1,208,0,1,134,207,0,0,84,2,1,0,205,208,0,0,1,208,0,1,4,207,37,208,143,207,171,1,141,207,171,1,48,207,202,207,208,74,0,0,141,207,171,1,0,37,207,0,119,0,241,255,119,0,1,0,141,207,169,1,19,207,207,202,0,16,207,0,119,0,3,0,141,207,169,1,0,16,207,0,141,208,136,3,1,205,56,2,3,208,208,205,134,207,0,0,84,2,1,0,208,16,0,0,141,205,164,1,121,205,4,0,141,205,106,3,0,208,205,0,119,0,4,0,141,205,68,3,25,205,205,3,0,208,205,0,0,207,208,0,143,207,173,1,141,207,173,1,0,8,207,0,141,207,61,1,0,165,207,0,141,207,42,1,0,168,207,0,0,207,196,0,143,207,26,1,141,208,252,2,0,207,208,0,143,207,251,2,0,207,8,0,143,207,47,3,141,208,56,3,0,207,208,0,143,207,51,3,119,0,79,237,119,0,239,242,119,0,238,242,119,0,168,242,135,207,0,0,143,207,118,1,141,206,118,1,82,207,206,0,143,207,120,1,141,206,120,1,135,207,3,0,206,0,0,0,143,207,121,1,141,206,121,1,0,207,206,0,143,207,212,2,1,207,94,0,143,207,135,3,119,0,126,1,141,206,97,3,1,207,0,0,1,205,8,0,138,206,207,205,44,76,0,0,136,76,0,0,228,76,0,0,96,77,0,0,212,77,0,0,232,75,0,0,64,78,0,0,156,78,0,0,141,207,61,1,0,165,207,0,141,207,42,1,0,168,207,0,0,207,196,0,143,207,26,1,141,208,252,2,0,207,208,0,143,207,251,2,141,208,96,1,141,205,104,1,4,207,208,205,143,207,47,3,141,205,56,3,0,207,205,0,143,207,51,3,119,0,32,237,141,205,42,1,0,208,205,0,143,208,43,1,141,208,43,1,141,205,252,2,85,208,205,0,141,205,61,1,0,165,205,0,141,205,42,1,0,168,205,0,0,205,196,0,143,205,26,1,141,208,252,2,0,205,208,0,143,205,251,2,141,208,96,1,141,207,104,1,4,205,208,207,143,205,47,3,141,207,56,3,0,205,207,0,143,205,51,3,119,0,9,237,141,207,42,1,0,205,207,0,143,205,44,1,141,205,44,1,141,207,252,2,85,205,207,0,141,207,61,1,0,165,207,0,141,207,42,1,0,168,207,0,0,207,196,0,143,207,26,1,141,205,252,2,0,207,205,0,143,207,251,2,141,205,96,1,141,208,104,1,4,207,205,208,143,207,47,3,141,208,56,3,0,207,208,0,143,207,51,3,119,0,242,236,141,205,252,2,34,208,205,0,143,208,45,1,141,205,42,1,0,208,205,0,143,208,46,1,141,208,46,1,141,205,252,2,85,208,205,0,141,205,46,1,141,208,45,1,41,208,208,31,42,208,208,31,109,205,4,208,141,208,61,1,0,165,208,0,141,208,42,1,0,168,208,0,0,208,196,0,143,208,26,1,141,205,252,2,0,208,205,0,143,208,251,2,141,205,96,1,141,207,104,1,4,208,205,207,143,208,47,3,141,207,56,3,0,208,207,0,143,208,51,3,119,0,211,236,141,207,252,2,2,205,0,0,255,255,0,0,19,207,207,205,0,208,207,0,143,208,48,1,141,207,42,1,0,208,207,0,143,208,49,1,141,208,49,1,141,207,48,1,84,208,207,0,141,207,61,1,0,165,207,0,141,207,42,1,0,168,207,0,0,207,196,0,143,207,26,1,141,208,252,2,0,207,208,0,143,207,251,2,141,208,96,1,141,205,104,1,4,207,208,205,143,207,47,3,141,205,56,3,0,207,205,0,143,207,51,3,119,0,182,236,141,205,252,2,19,205,205,202,0,207,205,0,143,207,50,1,141,205,42,1,0,207,205,0,143,207,51,1,141,207,51,1,141,205,50,1,83,207,205,0,141,205,61,1,0,165,205,0,141,205,42,1,0,168,205,0,0,205,196,0,143,205,26,1,141,207,252,2,0,205,207,0,143,205,251,2,141,207,96,1,141,208,104,1,4,205,207,208,143,205,47,3,141,208,56,3,0,205,208,0,143,205,51,3,119,0,155,236,141,208,42,1,0,205,208,0,143,205,52,1,141,205,52,1,141,208,252,2,85,205,208,0,141,208,61,1,0,165,208,0,141,208,42,1,0,168,208,0,0,208,196,0,143,208,26,1,141,205,252,2,0,208,205,0,143,208,251,2,141,205,96,1,141,207,104,1,4,208,205,207,143,208,47,3,141,207,56,3,0,208,207,0,143,208,51,3,119,0,132,236,141,207,252,2,34,208,207,0,143,208,53,1,141,207,42,1,0,208,207,0,143,208,55,1,141,208,55,1,141,207,252,2,85,208,207,0,141,207,55,1,141,208,53,1,41,208,208,31,42,208,208,31,109,207,4,208,141,208,61,1,0,165,208,0,141,208,42,1,0,168,208,0,0,208,196,0,143,208,26,1,141,207,252,2,0,208,207,0,143,208,251,2,141,207,96,1,141,205,104,1,4,208,207,205,143,208,47,3,141,205,56,3,0,208,205,0,143,208,51,3,119,0,101,236,141,207,42,1,32,206,207,0,143,206,73,1,141,207,61,1,32,206,207,0,143,206,74,1,141,206,73,1,141,207,74,1,19,206,206,207,121,206,4,0,141,206,16,1,0,18,206,0,119,0,47,0,141,206,16,1,0,52,206,0,141,207,42,1,0,206,207,0,143,206,76,1,141,207,61,1,0,206,207,0,143,206,79,1,141,207,76,1,38,207,207,7,0,206,207,0,143,206,75,1,26,206,52,1,143,206,77,1,141,206,77,1,141,207,75,1,39,207,207,48,19,207,207,202,83,206,207,0,141,206,76,1,141,205,79,1,1,204,3,0,135,207,4,0,206,205,204,0,143,207,80,1,128,204,0,0,0,207,204,0,143,207,81,1,141,207,80,1,32,207,207,0,141,204,81,1,32,204,204,0,19,207,207,204,121,207,4,0,141,207,77,1,0,18,207,0,119,0,10,0,141,207,77,1,0,52,207,0,141,204,80,1,0,207,204,0,143,207,76,1,141,204,81,1,0,207,204,0,143,207,79,1], eb + 10240);
  HEAPU8.set([119,0,219,255,141,207,22,3,38,207,207,8,32,207,207,0,141,204,73,1,141,205,74,1,19,204,204,205,20,207,207,204,1,204,72,9,1,205,77,9,125,77,207,204,205,0,0,0,141,204,42,1,0,205,204,0,143,205,110,1,141,204,61,1,0,205,204,0,143,205,112,1,0,205,18,0,143,205,211,2,141,204,22,3,0,205,204,0,143,205,24,3,141,204,58,3,0,205,204,0,143,205,60,3,141,204,22,3,38,204,204,8,32,204,204,0,141,207,73,1,141,206,74,1,19,207,207,206,20,204,204,207,38,204,204,1,40,204,204,1,0,205,204,0,143,205,67,3,0,205,77,0,143,205,73,3,1,205,89,0,143,205,135,3,119,0,66,0,1,205,8,0,141,204,58,3,16,206,205,204,143,206,56,1,141,204,56,1,141,205,58,3,1,207,8,0,125,206,204,205,207,0,0,0,143,206,57,1,141,207,22,3,39,207,207,8,0,206,207,0,143,206,23,3,141,207,57,1,0,206,207,0,143,206,59,3,1,206,120,0,143,206,103,3,1,206,73,0,143,206,135,3,119,0,44,0,141,206,42,1,0,207,206,0,143,207,122,1,141,206,42,1,33,207,206,0,143,207,123,1,141,206,123,1,141,205,122,1,1,208,88,9,125,207,206,205,208,0,0,0,143,207,124,1,141,208,124,1,0,207,208,0,143,207,212,2,1,207,94,0,143,207,135,3,119,0,26,0,141,207,61,1,0,206,207,0,143,206,86,1,141,207,42,1,0,206,207,0,143,206,88,1,1,206,0,0,143,206,65,3,1,206,72,9,143,206,70,3,1,206,84,0,143,206,135,3,119,0,13,0,141,207,22,3,0,206,207,0,143,206,23,3,141,207,58,3,0,206,207,0,143,206,59,3,141,207,102,3,0,206,207,0,143,206,103,3,1,206,73,0,143,206,135,3,119,0,1,0,141,203,135,3,32,203,203,73,121,203,145,0,1,203,0,0,143,203,135,3,141,207,103,3,38,207,207,32,0,203,207,0,143,203,58,1,141,207,42,1,32,203,207,0,143,203,60,1,141,207,61,1,32,203,207,0,143,203,62,1,141,203,60,1,141,207,62,1,19,203,203,207,121,203,23,0,141,207,42,1,0,203,207,0,143,203,110,1,141,207,61,1,0,203,207,0,143,203,112,1,141,207,16,1,0,203,207,0,143,203,211,2,141,207,23,3,0,203,207,0,143,203,24,3,141,207,59,3,0,203,207,0,143,203,60,3,1,203,0,0,143,203,67,3,1,203,72,9,143,203,73,3,1,203,89,0,143,203,135,3,119,0,184,1,141,203,16,1,0,50,203,0,141,207,42,1,0,203,207,0,143,203,64,1,141,207,61,1,0,203,207,0,143,203,67,1,141,207,64,1,38,207,207,15,0,203,207,0,143,203,63,1,1,207,56,9,141,208,63,1,90,203,207,208,143,203,65,1,26,203,50,1,143,203,66,1,141,203,66,1,141,207,65,1,19,207,207,202,141,208,58,1,20,207,207,208,19,207,207,202,83,203,207,0,141,203,64,1,141,208,67,1,1,205,4,0,135,207,4,0,203,208,205,0,143,207,68,1,128,205,0,0,0,207,205,0,143,207,69,1,141,207,68,1,32,207,207,0,141,205,69,1,32,205,205,0,19,207,207,205,120,207,10,0,141,207,66,1,0,50,207,0,141,205,68,1,0,207,205,0,143,207,64,1,141,205,69,1,0,207,205,0,143,207,67,1,119,0,216,255,141,205,23,3,38,205,205,8,0,207,205,0,143,207,70,1,141,207,70,1,32,207,207,0,121,207,23,0,141,205,42,1,0,207,205,0,143,207,110,1,141,205,61,1,0,207,205,0,143,207,112,1,141,205,66,1,0,207,205,0,143,207,211,2,141,205,23,3,0,207,205,0,143,207,24,3,141,205,59,3,0,207,205,0,143,207,60,3,1,207,0,0,143,207,67,3,1,207,72,9,143,207,73,3,1,207,89,0,143,207,135,3,119,0,106,1,141,205,103,3,42,205,205,4,0,207,205,0,143,207,72,1,141,205,42,1,0,207,205,0,143,207,110,1,141,205,61,1,0,207,205,0,143,207,112,1,141,205,66,1,0,207,205,0,143,207,211,2,141,205,23,3,0,207,205,0,143,207,24,3,141,205,59,3,0,207,205,0,143,207,60,3,1,207,2,0,143,207,67,3,1,205,72,9,141,208,72,1,3,207,205,208,143,207,73,3,1,207,89,0,143,207,135,3,119,0,78,1,141,207,135,3,32,207,207,84,121,207,174,0,1,207,0,0,143,207,135,3,1,208,0,0,141,205,86,1,16,207,208,205,143,207,87,1,1,205,255,255,141,208,88,1,16,207,205,208,143,207,89,1,141,208,86,1,32,207,208,0,143,207,90,1,141,207,87,1,141,208,90,1,141,205,89,1,19,208,208,205,20,207,207,208,121,207,69,0,141,207,16,1,0,53,207,0,141,208,88,1,0,207,208,0,143,207,91,1,141,208,86,1,0,207,208,0,143,207,92,1,141,208,91,1,141,205,92,1,1,203,10,0,1,206,0,0,134,207,0,0,76,56,1,0,208,205,203,206,143,207,93,1,128,206,0,0,0,207,206,0,143,207,94,1,26,207,53,1,143,207,95,1,141,207,95,1,141,206,93,1,39,206,206,48,19,206,206,202,83,207,206,0,141,207,91,1,141,203,92,1,1,205,10,0,1,208,0,0,134,206,0,0,12,60,1,0,207,203,205,208,143,206,97,1,128,208,0,0,0,206,208,0,143,206,98,1,1,208,9,0,141,205,92,1,16,206,208,205,143,206,99,1,1,205,255,255,141,208,91,1,16,206,205,208,143,206,100,1,141,208,92,1,32,206,208,9,143,206,101,1,141,206,99,1,141,208,101,1,141,205,100,1,19,208,208,205,20,206,206,208,121,206,10,0,141,206,95,1,0,53,206,0,141,208,97,1,0,206,208,0,143,206,91,1,141,208,98,1,0,206,208,0,143,206,92,1,119,0,202,255,141,206,95,1,0,19,206,0,141,206,97,1,0,47,206,0,119,0,5,0,141,206,16,1,0,19,206,0,141,206,88,1,0,47,206,0,32,206,47,0,143,206,102,1,141,206,102,1,121,206,24,0,141,208,88,1,0,206,208,0,143,206,110,1,141,208,86,1,0,206,208,0,143,206,112,1,0,206,19,0,143,206,211,2,141,208,22,3,0,206,208,0,143,206,24,3,141,208,58,3,0,206,208,0,143,206,60,3,141,208,65,3,0,206,208,0,143,206,67,3,141,208,70,3,0,206,208,0,143,206,73,3,1,206,89,0,143,206,135,3,119,0,213,0,0,61,19,0,0,206,47,0,143,206,111,3,141,208,111,3,31,208,208,10,38,208,208,255,0,206,208,0,143,206,103,1,26,206,61,1,143,206,105,1,141,206,105,1,141,208,103,1,39,208,208,48,19,208,208,202,83,206,208,0,141,206,111,3,29,206,206,10,38,206,206,255,0,208,206,0,143,208,106,1,141,206,111,3,35,208,206,10,143,208,107,1,141,208,107,1,121,208,25,0,141,206,88,1,0,208,206,0,143,208,110,1,141,206,86,1,0,208,206,0,143,208,112,1,141,206,105,1,0,208,206,0,143,208,211,2,141,206,22,3,0,208,206,0,143,208,24,3,141,206,58,3,0,208,206,0,143,208,60,3,141,206,65,3,0,208,206,0,143,208,67,3,141,206,70,3,0,208,206,0,143,208,73,3,1,208,89,0,143,208,135,3,119,0,164,0,141,208,105,1,0,61,208,0,141,206,106,1,0,208,206,0,143,208,111,3,119,0,205,255,141,208,135,3,32,208,208,94,121,208,59,0,1,208,0,0,143,208,135,3,141,206,212,2,1,205,0,0,141,203,58,3,134,208,0,0,136,229,0,0,206,205,203,0,143,208,125,1,141,203,212,2,0,208,203,0,143,208,126,1,141,203,212,2,141,205,58,3,3,208,203,205,143,208,128,1,141,205,125,1,1,203,0,0,13,205,205,203,141,203,128,1,141,206,125,1,125,208,205,203,206,0,0,0,143,208,120,3,141,203,125,1,1,205,0,0,45,203,203,205,64,87,0,0,141,203,58,3,0,206,203,0,119,0,5,0,141,203,125,1,141,205,126,1,4,203,203,205,0,206,203,0,0,208,206,0,143,208,62,3,141,208,61,1,0,174,208,0,141,208,42,1,0,175,208,0,141,206,212,2,0,208,206,0,143,208,215,2,141,206,41,1,0,208,206,0,143,208,25,3,141,206,62,3,0,208,206,0,143,208,64,3,1,208,0,0,143,208,69,3,1,208,72,9,143,208,74,3,141,206,120,3,0,208,206,0,143,208,123,3,119,0,97,0,141,208,135,3,32,208,208,97,121,208,94,0,1,208,0,0,143,208,135,3,1,208,0,0,143,208,28,3,1,208,0,0,143,208,49,3,0,208,176,0,143,208,109,3,141,206,109,3,82,208,206,0,143,208,131,1,141,208,131,1,32,208,208,0,121,208,8,0,141,206,28,3,0,208,206,0,143,208,26,3,141,206,49,3,0,208,206,0,143,208,50,3,119,0,57,0,141,206,136,3,1,203,8,2,3,206,206,203,141,203,131,1,134,208,0,0,216,58,1,0,206,203,0,0,143,208,132,1,141,203,63,3,141,206,28,3,4,208,203,206,143,208,133,1,141,208,132,1,34,208,208,0,141,206,133,1,141,203,132,1,16,206,206,203,20,208,208,206,121,208,8,0,141,206,28,3,0,208,206,0,143,208,26,3,141,206,132,1,0,208,206,0,143,208,50,3,119,0,31,0,141,206,109,3,25,208,206,4,143,208,134,1,141,206,132,1,141,203,28,3,3,208,206,203,143,208,136,1,141,203,136,1,141,206,63,3,16,208,203,206,143,208,137,1,141,208,137,1,121,208,11,0,141,206,136,1,0,208,206,0,143,208,28,3,141,206,132,1,0,208,206,0,143,208,49,3,141,206,134,1,0,208,206,0,143,208,109,3,119,0,195,255,141,206,136,1,0,208,206,0,143,208,26,3,141,206,132,1,0,208,206,0,143,208,50,3,119,0,1,0,141,206,50,3,34,208,206,0,143,208,138,1,141,208,138,1,121,208,5,0,1,7,255,255,1,208,107,1,143,208,135,3,119,0,80,2,0,178,177,0,0,179,176,0,141,206,26,3,0,208,206,0,143,208,27,3,1,208,102,0,143,208,135,3,141,208,135,3,32,208,208,89,121,208,108,0,1,208,0,0,143,208,135,3,1,206,255,255,141,203,60,3,15,208,206,203,143,208,108,1,141,203,24,3,2,206,0,0,255,255,254,255,19,203,203,206,0,208,203,0,143,208,109,1,141,208,108,1,141,203,109,1,141,206,24,3,125,92,208,203,206,0,0,0,141,203,110,1,33,206,203,0,143,206,111,1,141,203,112,1,33,206,203,0,143,206,113,1,141,203,60,3,33,206,203,0,143,206,114,1,141,206,111,1,141,203,113,1,20,206,206,203,141,203,114,1,20,206,206,203,121,206,55,0,141,203,211,2,0,206,203,0,143,206,115,1,141,203,111,1,141,208,113,1,20,203,203,208,38,203,203,1,40,203,203,1,141,208,16,1,141,205,115,1,4,208,208,205,3,203,203,208,141,208,60,3,15,206,203,208,143,206,116,1,141,203,116,1,121,203,4,0,141,203,60,3,0,208,203,0,119,0,11,0,141,203,111,1,141,205,113,1,20,203,203,205,38,203,203,1,40,203,203,1,141,205,16,1,141,207,115,1,4,205,205,207,3,203,203,205,0,208,203,0,0,206,208,0,143,206,61,3,141,206,112,1,0,174,206,0,141,206,110,1,0,175,206,0,141,208,211,2,0,206,208,0,143,206,215,2,0,206,92,0,143,206,25,3,141,208,61,3,0,206,208,0,143,206,64,3,141,208,67,3,0,206,208,0,143,206,69,3,141,208,73,3,0,206,208,0,143,206,74,3,141,208,16,1,0,206,208,0,143,206,123,3,119,0,231,0,141,206,112,1,0,174,206,0,141,206,110,1,0,175,206,0,141,208,16,1,0,206,208,0,143,206,215,2,0,206,92,0,143,206,25,3,1,206,0,0,143,206,64,3,141,208,67,3,0,206,208,0,143,206,69,3,141,208,73,3,0,206,208,0,143,206,74,3,141,208,16,1,0,206,208,0,143,206,123,3,119,0,210,0,141,206,135,3,32,206,206,102,121,206,207,0,1,206,0,0,143,206,135,3,141,208,27,3,141,203,106,3,15,206,208,203,143,206,139,1,141,206,22,3,2,203,0,0,0,32,1,0,19,206,206,203,32,206,206,0,141,203,139,1,19,206,206,203,121,206,54,0,141,203,106,3,141,208,27,3,4,206,203,208,143,206,140,1,1,208,0,1,141,203,140,1,16,208,208,203,1,203,0,1,141,205,140,1,125,206,208,203,205,0,0,0,143,206,141,1,141,205,136,3,1,203,56,2,3,205,205,203,1,203,32,0,141,208,141,1,135,206,1,0,205,203,208,0,141,206,140,1,48,206,202,206,220,91,0,0,141,206,140,1,0,41,206,0,141,208,136,3,1,203,56,2,3,208,208,203,1,203,0,1,134,206,0,0,84,2,1,0,208,203,0,0,1,203,0,1,4,206,41,203,143,206,142,1,141,206,142,1,48,206,202,206,200,91,0,0,141,206,142,1,0,41,206,0,119,0,241,255,119,0,1,0,141,206,140,1,19,206,206,202,0,23,206,0,119,0,3,0,141,206,140,1,0,23,206,0,141,203,136,3,1,208,56,2,3,203,203,208,134,206,0,0,84,2,1,0,203,23,0,0,141,203,27,3,32,206,203,0,143,206,143,1,141,206,143,1,120,206,52,0,1,206,0,0,143,206,33,3,0,206,179,0,143,206,110,3,141,203,110,3,82,206,203,0,143,206,144,1,141,206,144,1,32,206,206,0,120,206,42,0,141,203,136,3,1,208,8,2,3,203,203,208,141,208,144,1,134,206,0,0,216,58,1,0,203,208,0,0,143,206,145,1,141,208,145,1,141,203,33,3,3,206,208,203,143,206,146,1,141,203,27,3,141,208,146,1,15,206,203,208,143,206,147,1,141,206,147,1,120,206,24,0,141,208,110,3,25,206,208,4,143,206,148,1,141,208,136,3,1,203,8,2,3,208,208,203,141,203,145,1,134,206,0,0,84,2,1,0,208,203,0,0,141,203,146,1,141,208,27,3,16,206,203,208,143,206,150,1,141,206,150,1,121,206,8,0,141,208,146,1,0,206,208,0,143,206,33,3,141,208,148,1,0,206,208,0,143,206,110,3,119,0,210,255,141,206,22,3,2,208,0,0,0,32,1,0,19,206,206,208,1,208,0,32,13,206,206,208,141,208,139,1,19,206,206,208,121,206,54,0,141,208,106,3,141,203,27,3,4,206,208,203,143,206,151,1,1,203,0,1,141,208,151,1,16,203,203,208,1,208,0,1,141,205,151,1,125,206,203,208,205,0,0,0,143,206,152,1,141,205,136,3,1,208,56,2,3,205,205,208,1,208,32,0,141,203,152,1,135,206,1,0,205,208,203,0,141,206,151,1,48,206,202,206,180,93,0,0,141,206,151,1,0,43,206,0,141,203,136,3,1,208,56,2,3,203,203,208,1,208,0,1,134,206,0,0,84,2,1,0,203,208,0,0,1,208,0,1,4,206,43,208,143,206,153,1,141,206,153,1,48,206,202,206,160,93,0,0,141,206,153,1,0,43,206,0,119,0,241,255,119,0,1,0,141,206,151,1,19,206,206,202,0,25,206,0,119,0,3,0,141,206,151,1,0,25,206,0,141,208,136,3,1,203,56,2,3,208,208,203,134,206,0,0,84,2,1,0,208,25,0,0,141,208,139,1,141,203,106,3,141,205,27,3,125,206,208,203,205,0,0,0,143,206,154,1,141,206,61,1,0,165,206,0,0,168,178,0,0,206,196,0,143,206,26,1,141,205,252,2,0,206,205,0,143,206,251,2,141,205,154,1,0,206,205,0,143,206,47,3,141,205,56,3,0,206,205,0,143,206,51,3,119,0,161,232,141,206,123,3,0,113,206,0,141,206,215,2,0,114,206,0,141,206,64,3,4,205,113,114,15,115,206,205,121,115,4,0,4,206,113,114,0,205,206,0,119,0,3,0,141,206,64,3,0,205,206,0,0,98,205,0,141,205,69,3,3,116,205,98,141,205,106,3,15,117,205,116,141,206,106,3,125,205,117,116,206,0,0,0,143,205,107,3,141,205,25,3,2,206,0,0,0,32,1,0,19,205,205,206,0,118,205,0,32,205,118,0,141,206,107,3,15,206,116,206,19,205,205,206,121,205,52,0,1,206,0,1,141,203,107,3,4,203,203,116,48,206,206,203,200,94,0,0,1,206,0,1,0,205,206,0,119,0,4,0,141,206,107,3,4,206,206,116,0,205,206,0,0,120,205,0,141,206,136,3,1,203,56,2,3,206,206,203,1,203,32,0,135,205,1,0,206,203,120,0,141,205,107,3,4,205,205,116,48,205,202,205,84,95,0,0,141,205,107,3,4,45,205,116,141,203,136,3,1,206,56,2,3,203,203,206,1,206,0,1,134,205,0,0,84,2,1,0,203,206,0,0,1,205,0,1,4,121,45,205,48,205,202,121,60,95,0,0,0,45,121,0,119,0,244,255,119,0,1,0,141,205,107,3,4,205,205,116,19,205,205,202,0,28,205,0,119,0,3,0,141,205,107,3,4,28,205,116,141,206,136,3,1,203,56,2,3,206,206,203,134,205,0,0,84,2,1,0,206,28,0,0,141,206,74,3,141,203,69,3,134,205,0,0,84,2,1,0,206,203,0,0,2,205,0,0,0,0,1,0,13,205,118,205,141,203,107,3,15,203,116,203,19,205,205,203,121,205,52,0,1,203,0,1,141,206,107,3,4,206,206,116,48,203,203,206,196,95,0,0,1,203,0,1,0,205,203,0,119,0,4,0,141,203,107,3,4,203,203,116,0,205,203,0,0,122,205,0,141,203,136,3,1,206,56,2,3,203,203,206,1,206,48,0,135,205,1,0,203,206,122,0,141,205,107,3,4,205,205,116,48,205,202,205,80,96,0,0,141,205,107,3,4,39,205,116,141,206,136,3,1,203,56,2,3,206,206,203,1,203,0,1,134,205,0,0,84,2,1,0,206,203,0,0,1,205,0,1,4,123,39,205,48,205,202,123,56,96,0,0,0,39,123,0,119,0,244,255,119,0,1,0,141,205,107,3,4,205,205,116,19,205,205,202,0,21,205,0,119,0,3,0,141,205,107,3,4,21,205,116,141,203,136,3,1,206,56,2,3,203,203,206,134,205,0,0,84,2,1,0,203,21,0,0,4,205,113,114,47,205,205,98,28,97,0,0,4,205,113,114,4,124,98,205,1,205,0,1,16,205,205,124,1,203,0,1,125,125,205,203,124,0,0,0,141,205,136,3,1,206,56,2,3,205,205,206,1,206,48,0,135,203,1,0,205,206,125,0,48,203,202,124,0,97,0,0,0,36,124,0,141,206,136,3,1,205,56,2,3,206,206,205,1,205,0,1,134,203,0,0,84,2,1,0,206,205,0,0,1,203,0,1,4,126,36,203,48,203,202,126,240,96,0,0,0,36,126,0,119,0,244,255,119,0,1,0,19,203,124,202,0,15,203,0,119,0,2,0,0,15,124,0,141,205,136,3,1,206,56,2,3,205,205,206,134,203,0,0,84,2,1,0,205,15,0,0,141,205,215,2,4,206,113,114,134,203,0,0,84,2,1,0,205,206,0,0,1,203,0,32,13,203,118,203,141,206,107,3,15,206,116,206,19,203,203,206,121,203,52,0,1,206,0,1,141,205,107,3,4,205,205,116,48,206,206,205,104,97,0,0,1,206,0,1,0,203,206,0,119,0,4,0,141,206,107,3,4,206,206,116,0,203,206,0,0,127,203,0,141,206,136,3,1,205,56,2,3,206,206,205,1,205,32,0,135,203,1,0,206,205,127,0,141,203,107,3,4,203,203,116,48,203,202,203,244,97,0,0,141,203,107,3,4,30,203,116,141,205,136,3,1,206,56,2,3,205,205,206,1,206,0,1,134,203,0,0,84,2,1,0,205,206,0,0,1,203,0,1,4,128,30,203,48,203,202,128,220,97,0,0,0,30,128,0,119,0,244,255,119,0,1,0,141,203,107,3,4,203,203,116,19,203,203,202,0,9,203,0,119,0,3,0,141,203,107,3,4,9,203,116,141,206,136,3,1,205,56,2,3,206,206,205,134,203,0,0,84,2,1,0,206,9,0,0,0,165,174,0,0,168,175,0,0,203,196,0,143,203,26,1,141,206,252,2,0,203,206,0,143,203,251,2,141,206,107,3,0,203,206,0,143,203,47,3,141,206,56,3,0,203,206,0,143,203,51,3,119,0,152,231,141,203,135,3,1,206,88,1,45,203,203,206,116,103,0,0,1,203,0,0,52,203,0,203,124,98,0,0,141,203,253,2,0,7,203,0,141,203,136,3,137,203,0,0,139,7,0,0,141,203,52,3,32,203,203,0,121,203,6,0,1,7,0,0,141,203,136,3,137,203,0,0,139,7,0,0,119,0,3,0,1,203,1,0,143,203,35,3,141,203,35,3,41,203,203,2,3,130,4,203,82,131,130,0,32,203,131,0,121,203,5,0,141,206,35,3,0,203,206,0,143,203,36,3,119,0,252,0,141,203,35,3,41,203,203,3,3,132,3,203,1,203,20,0,55,203,203,131,140,102,0,0,1,203,9,0,1,206,10,0,138,131,203,206,28,99,0,0,100,99,0,0,188,99,0,0,12,100,0,0,92,100,0,0,220,100,0,0,56,101,0,0,168,101,0,0,252,101,0,0,68,102,0,0,119,0,221,0,82,203,2,0,143,203,235,2,141,203,235,2,1,206,0,0,25,206,206,4,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,203,203,206,0,134,203,0,82,135,134,0,25,203,134,4,85,2,203,0,85,132,135,0,119,0,203,0,82,203,2,0,143,203,236,2,141,203,236,2,1,206,0,0,25,206,206,4,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,203,203,206,0,136,203,0,82,137,136,0,25,203,136,4,85,2,203,0,85,132,137,0,34,206,137,0,41,206,206,31,42,206,206,31,109,132,4,206,119,0,181,0,82,206,2,0,143,206,237,2,141,206,237,2,1,203,0,0,25,203,203,4,26,203,203,1,3,206,206,203,1,203,0,0,25,203,203,4,26,203,203,1,40,203,203,255,19,206,206,203,0,139,206,0,82,140,139,0,25,206,139,4,85,2,206,0,85,132,140,0,1,203,0,0,109,132,4,203,119,0,161,0,82,203,2,0,143,203,238,2,141,203,238,2,1,206,0,0,25,206,206,8,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,203,203,206,0,142,203,0,82,143,142,0,106,144,142,4,25,203,142,8,85,2,203,0,85,132,143,0,109,132,4,144,119,0,141,0,82,203,2,0,143,203,239,2,141,203,239,2,1,206,0,0,25,206,206,4,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,203,203,206,0,146,203,0,82,147,146,0,25,203,146,4,85,2,203,0,2,203,0,0,255,255,0,0,19,203,147,203,41,203,203,16,42,203,203,16,85,132,203,0,2,206,0,0,255,255,0,0,19,206,147,206,41,206,206,16,42,206,206,16,34,206,206,0,41,206,206,31,42,206,206,31,109,132,4,206,119,0,109,0,82,206,2,0,143,206,241,2,141,206,241,2,1,203,0,0,25,203,203,4,26,203,203,1,3,206,206,203,1,203,0,0,25,203,203,4,26,203,203,1,40,203,203,255,19,206,206,203,0,149,206,0,82,150,149,0,25,206,149,4,85,2,206,0,2,206,0,0,255,255,0,0,19,206,150,206,85,132,206,0,1,203,0,0,109,132,4,203,119,0,86,0,82,203,2,0,143,203,242,2,141,203,242,2,1,206,0,0,25,206,206,4,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,4,26,206,206,1,40,206,206,255,19,203,203,206,0,151,203,0,82,152,151,0,25,203,151,4,85,2,203,0,19,203,152,202,41,203,203,24,42,203,203,24,85,132,203,0,19,206,152,202,41,206,206,24,42,206,206,24,34,206,206,0,41,206,206,31,42,206,206,31,109,132,4,206,119,0,58,0,82,206,2,0,143,206,243,2,141,206,243,2,1,203,0,0,25,203,203,4,26,203,203,1,3,206,206,203,1,203,0,0,25,203,203,4,26,203,203,1,40,203,203,255,19,206,206,203,0,155,206,0,82,156,155,0,25,206,155,4,85,2,206,0,19,206,156,202,85,132,206,0,1,203,0,0,109,132,4,203,119,0,37,0,82,203,2,0,143,203,244,2,141,203,244,2,1,206,0,0,25,206,206,8,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,203,203,206,0,157,203,0,86,158,157,0,25,203,157,8,85,2,203,0,87,132,158,0,119,0,19,0,82,203,2,0,143,203,245,2,141,203,245,2,1,206,0,0,25,206,206,8,26,206,206,1,3,203,203,206,1,206,0,0,25,206,206,8,26,206,206,1,40,206,206,255,19,203,203,206,0,159,203,0,86,160,159,0,25,203,159,8,85,2,203,0,87,132,160,0,119,0,1,0,141,203,35,3,25,161,203,1,34,203,161,10,121,203,4,0,0,203,161,0,143,203,35,3,119,0,0,255,1,7,1,0,1,203,107,1,143,203,135,3,119,0,1,0,141,203,135,3,1,206,107,1,45,203,203,206,212,102,0,0,141,203,136,3,137,203,0,0,139,7,0,0,141,203,36,3,34,203,203,10,121,203,5,0,141,206,36,3,0,203,206,0,143,203,38,3,119,0,5,0,1,7,1,0,141,203,136,3,137,203,0,0,139,7,0,0,141,203,38,3,41,203,203,2,3,163,4,203,82,164,163,0,141,203,38,3,25,162,203,1,32,203,164,0,120,203,5,0,1,7,255,255,1,203,107,1,143,203,135,3,119,0,10,0,34,203,162,10,121,203,4,0,0,203,162,0,143,203,38,3,119,0,240,255,1,7,1,0,1,203,107,1,143,203,135,3,119,0,1,0,141,203,135,3,1,206,107,1,45,203,203,206,112,103,0,0,141,203,136,3,137,203,0,0,139,7,0,0,119,0,8,0,141,203,135,3,1,206,107,1,45,203,203,206,144,103,0,0,141,203,136,3,137,203,0,0,139,7,0,0,1,203,0,0,139,203,0,0,140,4,181,1,0,0,0,0,2,200,0,0,36,1,0,0,2,201,0,0,217,0,0,0,2,202,0,0,232,0,0,0,1,203,0,0,143,203,177,1,136,204,0,0,0,203,204,0,143,203,178,1,136,203,0,0,1,204,176,1,3,203,203,204,137,203,0,0,141,203,178,1,1,204,28,1,1,205,0,0,97,203,204,205,141,204,178,1,3,205,204,202,143,205,176,1,141,204,176,1,25,205,204,52,143,205,180,1,141,205,176,1,1,204,0,0,85,205,204,0,141,205,176,1,25,204,205,4,143,204,176,1,141,204,176,1,141,205,180,1,54,204,204,205,4,104,0,0,1,204,2,0,48,204,204,2,172,104,0,0,78,21,1,0,41,204,21,24,42,204,204,24,32,204,204,239,121,204,22,0,102,174,1,1,41,204,174,24,42,204,204,24,32,204,204,187,121,204,14,0,102,204,1,2,143,204,135,1,141,204,135,1,41,204,204,24,42,204,204,24,32,204,204,191,121,204,4,0,25,7,1,3,26,8,2,3,119,0,12,0,0,7,1,0,0,8,2,0,119,0,9,0,0,7,1,0,0,8,2,0,119,0,6,0,0,7,1,0,0,8,2,0,119,0,3,0,0,7,1,0,0,8,2,0,141,204,178,1,1,205,40,1,1,203,0,0,95,204,205,203,3,24,7,8,141,203,178,1,3,203,203,202,25,29,203,12,82,203,0,0,85,29,203,0,106,205,0,4,109,29,4,205,106,203,0,8,109,29,8,203,106,205,0,12,109,29,12,205,106,203,0,16,109,29,16,203,106,205,0,20,109,29,20,205,141,205,178,1,3,205,205,202,106,38,205,20,1,205,0,0,45,205,38,205,44,105,0,0,141,205,178,1,3,205,205,202,1,203,2,0,109,205,20,203,141,203,178,1,3,203,203,202,106,51,203,24,1,203,0,0,45,203,51,203,84,105,0,0,141,203,178,1,3,203,203,202,1,205,1,0,109,203,24,205,141,205,178,1,3,205,205,202,25,60,205,4,1,205,255,255,85,60,205,0,141,205,178,1,3,205,205,202,1,203,255,255,109,205,8,203,82,70,60,0,26,203,70,8,85,60,203,0,141,203,178,1,3,203,203,202,106,83,203,8,141,203,178,1,3,203,203,202,26,205,83,8,109,203,8,205,141,205,178,1,3,205,205,202,25,94,205,36,1,205,1,0,85,94,205,0,141,205,178,1,3,205,205,202,25,101,205,44,141,205,178,1,3,205,205,202,25,107,205,40,26,20,8,1,3,155,7,20,1,205,0,0,143,205,123,1,1,205,0,0,143,205,124,1,1,205,0,0,143,205,158,1,1,205,0,0,143,205,163,1,141,205,178,1,1,203,32,1,1,204,0,0,97,205,203,204,141,204,178,1,1,203,0,0,97,204,200,203,1,203,1,0,85,101,203,0,141,204,123,1,0,203,204,0,143,203,20,1,141,204,124,1,0,203,204,0,143,203,21,1,1,203,8,0,143,203,150,1,141,204,158,1,0,203,204,0,143,203,159,1,141,204,163,1,0,203,204,0,143,203,164,1,0,203,7,0,143,203,168,1,1,203,0,0,143,203,169,1,1,203,0,0,143,203,173,1,141,203,168,1,85,107,203,0,141,203,168,1,13,162,203,24,121,162,3,0,1,181,0,0,119,0,6,0,141,203,168,1,78,166,203,0,41,203,166,24,42,203,203,24,0,181,203,0,1,203,255,0,19,203,181,203,0,175,203,0,141,203,150,1,38,203,203,32,0,187,203,0,32,203,187,0,121,203,10,0,141,204,150,1,0,203,204,0,143,203,151,1,141,204,169,1,0,203,204,0,143,203,170,1,1,203,81,0,143,203,177,1,119,0,183,3,41,203,175,24,42,203,203,24,32,203,203,0,121,203,4,0,1,203,16,0,143,203,177,1,119,0,251,12,82,203,60,0,143,203,24,1,141,204,24,1,141,205,173,1,16,203,204,205,143,203,31,1,141,203,31,1,121,203,4,0,1,203,219,0,143,203,177,1,119,0,240,12,141,205,150,1,38,205,205,16,0,203,205,0,143,203,37,1,141,203,37,1,32,203,203,0,121,203,147,0,32,72,181,92,121,72,25,0,141,203,150,1,39,203,203,16,0,73,203,0,141,205,20,1,0,203,205,0,143,203,125,1,141,205,21,1,0,203,205,0,143,203,126,1,0,203,73,0,143,203,155,1,141,205,159,1,0,203,205,0,143,203,162,1,141,205,164,1,0,203,205,0,143,203,167,1,141,205,169,1,0,203,205,0,143,203,172,1,141,205,173,1,0,203,205,0,143,203,175,1,119,0,132,3,32,74,181,34,82,75,94,0,120,74,30,0,33,203,75,0,120,203,5,0,141,203,169,1,141,205,173,1,3,93,203,205,83,93,175,0,141,205,173,1,25,95,205,1,141,203,20,1,0,205,203,0,143,205,125,1,141,203,21,1,0,205,203,0,143,205,126,1,141,203,150,1,0,205,203,0,143,205,155,1,141,203,159,1,0,205,203,0,143,205,162,1,141,203,164,1,0,205,203,0,143,205,167,1,141,203,169,1,0,205,203,0,143,205,172,1,0,205,95,0,143,205,175,1,119,0,100,3,33,205,75,0,120,205,6,0,141,205,169,1,141,203,173,1,3,76,205,203,1,203,0,0,83,76,203,0,141,203,150,1,38,203,203,223,0,77,203,0,141,203,178,1,94,78,203,200,106,79,78,4,32,203,79,5,121,203,11,0,141,205,173,1,109,78,8,205,39,203,77,1,0,205,203,0,143,205,151,1,1,205,0,0,143,205,170,1,1,205,81,0,143,205,177,1,119,0,75,3,32,205,79,1,120,205,8,0,0,205,77,0,143,205,151,1,1,205,0,0,143,205,170,1,1,205,81,0,143,205,177,1,119,0,66,3,82,80,94,0,32,205,80,0,121,205,24,0,106,84,78,16,106,85,78,8,25,205,78,8,106,86,205,4,27,205,85,12,97,86,205,84,141,205,178,1,94,87,205,200,106,88,87,8,25,205,87,8,106,89,205,4,27,205,88,12,3,205,89,205,141,203,173,1,109,205,4,203,141,203,173,1,25,90,203,1,141,203,178,1,94,91,203,200,106,92,91,16,3,205,92,90,109,91,16,205,119,0,8,0,141,205,173,1,25,81,205,1,25,205,78,8,106,82,205,4,25,205,78,8,3,203,82,81,109,205,4,203,141,205,20,1,0,203,205,0,143,203,125,1,141,205,21,1,0,203,205,0,143,203,126,1,39,205,77,72,0,203,205,0,143,203,155,1,141,205,159,1,0,203,205,0,143,203,162,1,141,205,164,1,0,203,205,0,143,203,167,1,1,203,0,0,143,203,172,1,141,205,173,1,0,203,205,0,143,203,175,1,119,0,12,3,141,205,150,1,38,205,205,239,0,203,205,0,143,203,49,1,1,204,98,0,1,205,20,0,138,181,204,205,108,110,0,0,244,109,0,0,244,109,0,0,244,109,0,0,0,111,0,0,244,109,0,0,244,109,0,0,244,109,0,0,244,109,0,0,244,109,0,0,244,109,0,0,244,109,0,0,148,111,0,0,244,109,0,0,244,109,0,0,244,109,0,0,40,112,0,0,244,109,0,0,188,112,0,0,80,113,0,0,82,68,94,0,32,205,68,0,121,205,5,0,141,205,169,1,141,204,173,1,3,69,205,204,83,69,175,0,141,204,173,1,25,71,204,1,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,49,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,169,1,0,204,205,0,143,204,172,1,0,204,71,0,143,204,175,1,119,0,211,2,82,203,94,0,143,203,54,1,141,203,54,1,32,203,203,0,121,203,8,0,141,205,169,1,141,204,173,1,3,203,205,204,143,203,67,1,141,203,67,1,1,204,8,0,83,203,204,0,141,203,173,1,25,204,203,1,143,204,71,1,141,203,20,1,0,204,203,0,143,204,125,1,141,203,21,1,0,204,203,0,143,204,126,1,141,203,49,1,0,204,203,0,143,204,155,1,141,203,159,1,0,204,203,0,143,204,162,1,141,203,164,1,0,204,203,0,143,204,167,1,141,203,169,1,0,204,203,0,143,204,172,1,141,203,71,1,0,204,203,0,143,204,175,1,119,0,174,2,82,204,94,0,143,204,76,1,141,204,76,1,32,204,204,0,121,204,8,0,141,203,169,1,141,205,173,1,3,204,203,205,143,204,88,1,141,204,88,1,1,205,12,0,83,204,205,0,141,204,173,1,25,205,204,1,143,205,94,1,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,49,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,169,1,0,205,204,0,143,205,172,1,141,204,94,1,0,205,204,0,143,205,175,1,119,0,137,2,82,205,94,0,143,205,101,1,141,205,101,1,32,205,205,0,121,205,8,0,141,204,169,1,141,203,173,1,3,205,204,203,143,205,113,1,141,205,113,1,1,203,10,0,83,205,203,0,141,205,173,1,25,203,205,1,143,203,121,1,141,205,20,1,0,203,205,0,143,203,125,1,141,205,21,1,0,203,205,0,143,203,126,1,141,205,49,1,0,203,205,0,143,203,155,1,141,205,159,1,0,203,205,0,143,203,162,1,141,205,164,1,0,203,205,0,143,203,167,1,141,205,169,1,0,203,205,0,143,203,172,1,141,205,121,1,0,203,205,0,143,203,175,1,119,0,100,2,82,203,94,0,143,203,131,1,141,203,131,1,32,203,203,0,121,203,8,0,141,205,169,1,141,204,173,1,3,203,205,204,143,203,132,1,141,203,132,1,1,204,13,0,83,203,204,0,141,203,173,1,25,204,203,1,143,204,133,1,141,203,20,1,0,204,203,0,143,204,125,1,141,203,21,1,0,204,203,0,143,204,126,1,141,203,49,1,0,204,203,0,143,204,155,1,141,203,159,1,0,204,203,0,143,204,162,1,141,203,164,1,0,204,203,0,143,204,167,1,141,203,169,1,0,204,203,0,143,204,172,1,141,203,133,1,0,204,203,0,143,204,175,1,119,0,63,2,82,204,94,0,143,204,134,1,141,204,134,1,32,204,204,0,121,204,8,0,141,203,169,1,141,205,173,1,3,204,203,205,143,204,136,1,141,204,136,1,1,205,9,0,83,204,205,0,141,204,173,1,25,205,204,1,143,205,137,1,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,49,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,169,1,0,205,204,0,143,205,172,1,141,204,137,1,0,205,204,0,143,205,175,1,119,0,26,2,82,205,107,0,143,205,138,1,141,205,138,1,4,205,24,205,34,205,205,4,121,205,5,0,0,10,181,0,1,205,40,0,143,205,177,1,119,0,91,11,141,205,138,1,25,205,205,1,85,107,205,0,141,204,138,1,102,205,204,1,143,205,139,1,141,204,139,1,134,205,0,0,172,36,1,0,204,0,0,0,143,205,140,1,141,205,140,1,41,205,205,24,42,205,205,24,32,205,205,255,121,205,5,0,0,10,181,0,1,205,40,0,143,205,177,1,119,0,71,11,141,205,138,1,25,205,205,2,85,107,205,0,141,204,138,1,102,205,204,2,143,205,141,1,141,204,141,1,134,205,0,0,172,36,1,0,204,0,0,0,143,205,142,1,141,205,142,1,41,205,205,24,42,205,205,24,32,205,205,255,121,205,5,0,0,10,181,0,1,205,40,0,143,205,177,1,119,0,51,11,141,205,138,1,25,205,205,3,85,107,205,0,141,204,138,1,102,205,204,3,143,205,143,1,141,204,143,1,134,205,0,0,172,36,1,0,204,0,0,0,143,205,144,1,141,205,144,1,41,205,205,24,42,205,205,24,32,205,205,255,121,205,5,0,0,10,181,0,1,205,40,0,143,205,177,1,119,0,31,11,141,205,138,1,25,205,205,4,85,107,205,0,141,204,138,1,102,205,204,4,143,205,145,1,141,204,145,1,134,205,0,0,172,36,1,0,204,0,0,0,143,205,146,1,141,205,146,1,41,205,205,24,42,205,205,24,32,205,205,255,121,205,5,0,0,10,181,0,1,205,40,0,143,205,177,1,119,0,11,11,141,205,146,1,1,204,255,0,19,205,205,204,141,204,144,1,1,203,255,0,19,204,204,203,41,204,204,4,1,203,240,0,19,204,204,203,20,205,205,204,0,22,205,0,141,205,142,1,1,204,255,0,19,205,205,204,141,204,140,1,1,203,255,0,19,204,204,203,41,204,204,4,1,203,240,0,19,204,204,203,20,205,205,204,41,205,205,8,20,205,22,205,0,23,205,0,141,205,142,1,1,204,255,0,19,205,205,204,141,204,140,1,1,203,255,0,19,204,204,203,41,204,204,4,1,203,240,0,19,204,204,203,20,205,205,204,41,205,205,8,2,204,0,0,0,248,0,0,19,205,205,204,2,204,0,0,0,216,0,0,45,205,205,204,176,118,0,0,141,205,138,1,25,205,205,4,4,205,24,205,34,205,205,6,121,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,216,10,141,205,138,1,25,205,205,5,85,107,205,0,141,205,138,1,102,25,205,5,41,205,25,24,42,205,205,24,32,205,205,92,120,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,203,10,141,205,138,1,25,205,205,6,85,107,205,0,141,205,138,1,102,26,205,6,41,205,26,24,42,205,205,24,32,205,205,117,120,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,190,10,141,205,138,1,25,205,205,7,85,107,205,0,141,205,138,1,102,27,205,7,134,28,0,0,172,36,1,0,27,0,0,0,41,205,28,24,42,205,205,24,32,205,205,255,121,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,174,10,141,205,138,1,25,205,205,8,85,107,205,0,141,205,138,1,102,30,205,8,134,31,0,0,172,36,1,0,30,0,0,0,41,205,31,24,42,205,205,24,32,205,205,255,121,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,158,10,141,205,138,1,25,205,205,9,85,107,205,0,141,205,138,1,102,32,205,9,134,33,0,0,172,36,1,0,32,0,0,0,41,205,33,24,42,205,205,24,32,205,205,255,121,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,142,10,141,205,138,1,25,205,205,10,85,107,205,0,141,205,138,1,102,34,205,10,134,35,0,0,172,36,1,0,34,0,0,0,41,205,35,24,42,205,205,24,32,205,205,255,121,205,5,0,0,11,181,0,1,205,49,0,143,205,177,1,119,0,126,10,41,205,23,10,2,204,0,0,0,252,14,0,19,205,205,204,1,204,255,0,19,204,31,204,41,204,204,8,1,203,0,3,19,204,204,203,20,205,205,204,1,204,255,0,19,204,33,204,41,204,204,4,1,203,240,0,19,204,204,203,20,205,205,204,1,204,255,0,19,204,35,204,20,205,205,204,0,39,205,0,82,40,94,0,32,205,40,0,121,205,68,0,141,205,173,1,25,59,205,1,141,205,169,1,141,204,173,1,3,61,205,204,41,204,23,10,2,205,0,0,0,252,14,0,19,204,204,205,43,204,204,18,1,205,240,0,20,204,204,205,1,205,255,0,19,204,204,205,83,61,204,0,141,204,173,1,25,62,204,2,141,204,169,1,3,63,204,59,43,204,22,2,1,205,144,0,20,204,204,205,1,205,255,0,19,204,204,205,83,63,204,0,141,204,173,1,25,64,204,3,141,204,169,1,3,65,204,62,43,204,39,6,38,204,204,63,1,205,128,0,20,204,204,205,1,205,255,0,19,204,204,205,83,65,204,0,141,204,173,1,25,66,204,4,141,204,169,1,3,67,204,64,38,204,39,63,1,205,128,0,20,204,204,205,1,205,255,0,19,204,204,205,83,67,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,49,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,169,1,0,204,205,0,143,204,172,1,0,204,66,0,143,204,175,1,119,0,217,0,141,204,173,1,25,58,204,4,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,49,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,169,1,0,204,205,0,143,204,172,1,0,204,58,0,143,204,175,1,119,0,194,0,35,204,23,128,121,204,33,0,82,41,94,0,32,204,41,0,121,204,7,0,141,204,169,1,141,205,173,1,3,42,204,205,1,205,255,0,19,205,22,205,83,42,205,0,141,205,173,1,25,43,205,1,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,49,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,169,1,0,205,204,0,143,205,172,1,0,205,43,0,143,205,175,1,119,0,160,0,82,44,94,0,1,205,0,8,48,205,23,205,84,120,0,0,32,205,44,0,121,205,43,0,141,205,173,1,25,46,205,1,141,205,169,1,141,204,173,1,3,47,205,204,43,204,23,6,1,205,192,0,20,204,204,205,1,205,255,0,19,204,204,205,83,47,204,0,141,204,173,1,25,48,204,2,141,204,169,1,3,49,204,46,38,204,22,63,1,205,128,0,20,204,204,205,1,205,255,0,19,204,204,205,83,49,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,49,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,169,1,0,204,205,0,143,204,172,1,0,204,48,0,143,204,175,1,119,0,112,0,141,204,173,1,25,45,204,2], eb + 20480);
  HEAPU8.set([141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,49,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,169,1,0,204,205,0,143,204,172,1,0,204,45,0,143,204,175,1,119,0,89,0,32,204,44,0,121,204,64,0,141,204,173,1,25,52,204,1,141,204,169,1,141,205,173,1,3,53,204,205,141,205,142,1,1,204,255,0,19,205,205,204,141,204,140,1,1,203,255,0,19,204,204,203,41,204,204,4,1,203,240,0,19,204,204,203,20,205,205,204,43,205,205,4,1,204,224,0,20,205,205,204,1,204,255,0,19,205,205,204,83,53,205,0,141,205,173,1,25,54,205,2,141,205,169,1,3,55,205,52,43,205,23,6,38,205,205,63,1,204,128,0,20,205,205,204,1,204,255,0,19,205,205,204,83,55,205,0,141,205,173,1,25,56,205,3,141,205,169,1,3,57,205,54,38,205,22,63,1,204,128,0,20,205,205,204,1,204,255,0,19,205,205,204,83,57,205,0,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,49,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,169,1,0,205,204,0,143,205,172,1,0,205,56,0,143,205,175,1,119,0,24,0,141,205,173,1,25,50,205,3,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,49,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,169,1,0,205,204,0,143,205,172,1,0,205,50,0,143,205,175,1,119,0,1,0,141,204,177,1,32,204,204,81,121,204,13,9,1,204,0,0,143,204,177,1,141,204,178,1,3,204,204,202,106,96,204,16,38,204,96,1,32,204,204,0,120,204,19,1,141,204,151,1,1,205,0,96,19,204,204,205,0,97,204,0,32,204,97,0,121,204,89,0,32,112,181,47,120,112,2,0,119,0,10,1,141,204,151,1,1,205,136,0,19,204,204,205,0,113,204,0,32,204,113,0,121,204,9,0,141,204,178,1,94,114,204,200,106,115,114,4,32,204,115,1,120,204,4,0,1,204,97,0,143,204,177,1,119,0,42,9,82,118,107,0,25,204,118,1,85,107,204,0,25,204,118,1,45,204,204,24,96,122,0,0,1,204,99,0,143,204,177,1,119,0,33,9,102,121,118,1,41,204,121,24,42,204,204,24,32,204,204,47,121,204,26,0,141,204,151,1,1,205,0,32,20,204,204,205,0,122,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,0,204,122,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,199,8,41,204,121,24,42,204,204,24,32,204,204,42,121,204,26,0,141,204,151,1,1,205,0,64,20,204,204,205,0,123,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,0,204,123,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,170,8,1,204,103,0,143,204,177,1,119,0,227,8,141,204,151,1,1,205,0,32,19,204,204,205,0,98,204,0,32,204,98,0,120,204,59,0,32,99,181,13,120,99,29,0,33,100,181,10,41,204,175,24,42,204,204,24,33,204,204,0,19,204,100,204,121,204,23,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,131,8,141,204,151,1,1,205,255,223,19,204,204,205,0,102,204,0,82,103,107,0,26,204,103,1,85,107,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,0,204,102,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,103,8,141,204,151,1,1,205,0,64,19,204,204,205,0,104,204,0,32,204,104,0,120,204,111,0,41,204,175,24,42,204,204,24,32,204,204,0,121,204,4,0,1,204,89,0,143,204,177,1,119,0,150,8,32,108,181,42,120,108,23,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,66,8,82,109,107,0,55,204,109,155,80,125,0,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,41,8,102,110,109,1,41,204,110,24,42,204,204,24,32,204,204,47,120,204,23,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,14,8,141,204,151,1,1,205,255,191,19,204,204,205,0,111,204,0,25,204,109,1,85,107,204,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,0,204,111,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,243,7,141,204,151,1,1,205,128,0,19,204,204,205,0,126,204,0,32,204,126,0,120,204,81,0,41,204,175,24,42,204,204,24,32,204,204,0,121,204,14,0,141,205,20,1,0,204,205,0,143,204,127,1,141,205,21,1,0,204,205,0,143,204,128,1,141,205,159,1,0,204,205,0,143,204,160,1,141,205,164,1,0,204,205,0,143,204,165,1,119,0,247,7,32,204,181,13,32,205,181,9,20,204,204,205,32,205,181,32,20,204,204,205,121,204,23,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,192,7,32,204,181,10,120,204,5,0,0,12,181,0,1,204,108,0,143,204,177,1,119,0,246,7,82,127,101,0,25,204,127,1,85,101,204,0,141,204,178,1,3,204,204,202,1,205,0,0,109,204,48,205,141,204,20,1,0,205,204,0,143,205,125,1,141,204,21,1,0,205,204,0,143,205,126,1,141,204,151,1,0,205,204,0,143,205,155,1,141,204,159,1,0,205,204,0,143,205,162,1,141,204,164,1,0,205,204,0,143,205,167,1,141,204,170,1,0,205,204,0,143,205,172,1,141,204,173,1,0,205,204,0,143,205,175,1,119,0,157,7,141,205,151,1,38,205,205,8,0,130,205,0,32,205,130,0,121,205,70,3,141,205,178,1,94,186,205,200,106,188,186,4,32,205,188,1,121,205,11,1,1,204,9,0,1,205,117,0,138,181,204,205,152,129,0,0,156,129,0,0,136,129,0,0,136,129,0,0,16,130,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,20,130,0,0,136,129,0,0,108,130,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,232,130,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,136,129,0,0,108,131,0,0,0,17,181,0,1,204,170,0,143,204,177,1,119,0,83,7,119,0,31,0,82,189,101,0,25,205,189,1,85,101,205,0,141,205,178,1,3,205,205,202,1,204,0,0,109,205,48,204,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,249,6,119,0,1,0,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,159,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,226,6,141,204,151,1,38,204,204,4,0,190,204,0,32,204,190,0,120,204,4,0,1,204,165,0,143,204,177,1,119,0,22,7,141,204,151,1,39,204,204,32,0,193,204,0,106,194,186,16,141,205,20,1,0,204,205,0,143,204,129,1,141,205,21,1,0,204,205,0,143,204,130,1,0,204,193,0,143,204,153,1,141,205,159,1,0,204,205,0,143,204,161,1,141,205,164,1,0,204,205,0,143,204,166,1,0,204,194,0,143,204,171,1,1,204,0,0,143,204,174,1,119,0,4,6,141,204,151,1,38,204,204,4,0,196,204,0,32,204,196,0,121,204,5,0,0,17,181,0,1,204,170,0,143,204,177,1,119,0,246,6,141,204,151,1,38,204,204,251,0,197,204,0,141,205,20,1,0,204,205,0,143,204,129,1,141,205,21,1,0,204,205,0,143,204,130,1,0,204,197,0,143,204,153,1,141,205,159,1,0,204,205,0,143,204,161,1,141,205,164,1,0,204,205,0,143,204,166,1,141,205,170,1,0,204,205,0,143,204,171,1,141,205,173,1,0,204,205,0,143,204,174,1,119,0,227,5,141,204,151,1,38,204,204,250,0,195,204,0,141,205,20,1,0,204,205,0,143,204,129,1,141,205,21,1,0,204,205,0,143,204,130,1,39,205,195,1,0,204,205,0,143,204,153,1,141,205,159,1,0,204,205,0,143,204,161,1,141,205,164,1,0,204,205,0,143,204,166,1,141,205,170,1,0,204,205,0,143,204,171,1,141,205,173,1,0,204,205,0,143,204,174,1,119,0,202,5,32,204,188,4,32,205,188,3,20,204,204,205,120,204,23,0,141,205,20,1,0,204,205,0,143,204,129,1,141,205,21,1,0,204,205,0,143,204,130,1,141,205,151,1,0,204,205,0,143,204,153,1,141,205,159,1,0,204,205,0,143,204,161,1,141,205,164,1,0,204,205,0,143,204,166,1,141,205,170,1,0,204,205,0,143,204,171,1,141,205,173,1,0,204,205,0,143,204,174,1,119,0,176,5,26,204,181,48,143,204,156,1,141,204,156,1,35,204,204,10,121,204,193,0,141,205,159,1,25,204,205,1,143,204,0,1,141,205,178,1,94,204,205,200,143,204,1,1,141,205,1,1,106,204,205,4,143,204,2,1,141,205,151,1,1,203,0,4,19,205,205,203,0,204,205,0,143,204,3,1,141,204,3,1,32,204,204,0,141,205,2,1,33,205,205,3,19,204,204,205,121,204,48,0,141,205,20,1,141,203,21,1,1,206,10,0,1,207,0,0,134,204,0,0,216,48,1,0,205,203,206,207,143,204,22,1,128,207,0,0,0,204,207,0,143,204,23,1,141,207,156,1,141,206,156,1,34,206,206,0,41,206,206,31,42,206,206,31,141,203,22,1,141,205,23,1,134,204,0,0,44,60,1,0,207,206,203,205,143,204,25,1,128,205,0,0,0,204,205,0,143,204,26,1,141,205,25,1,0,204,205,0,143,204,125,1,141,205,26,1,0,204,205,0,143,204,126,1,141,205,151,1,0,204,205,0,143,204,155,1,141,205,0,1,0,204,205,0,143,204,162,1,141,205,164,1,0,204,205,0,143,204,167,1,141,205,170,1,0,204,205,0,143,204,172,1,141,205,173,1,0,204,205,0,143,204,175,1,119,0,39,6,141,204,3,1,32,204,204,0,120,204,32,0,141,205,151,1,1,203,0,8,20,205,205,203,0,204,205,0,143,204,18,1,141,205,164,1,27,204,205,10,143,204,19,1,141,205,20,1,0,204,205,0,143,204,125,1,141,205,21,1,0,204,205,0,143,204,126,1,141,205,18,1,0,204,205,0,143,204,155,1,141,205,0,1,0,204,205,0,143,204,162,1,141,205,156,1,141,203,19,1,3,204,205,203,143,204,167,1,141,203,170,1,0,204,203,0,143,204,172,1,141,203,173,1,0,204,203,0,143,204,175,1,119,0,5,6,141,203,151,1,1,205,0,2,19,203,203,205,0,204,203,0,143,204,4,1,141,204,4,1,32,204,204,0,120,204,5,0,0,16,181,0,1,204,175,0,143,204,177,1,119,0,53,6,141,203,159,1,32,204,203,0,143,204,8,1,32,204,181,48,143,204,9,1,141,203,151,1,1,205,0,2,20,203,203,205,0,204,203,0,143,204,10,1,141,203,8,1,141,205,9,1,19,203,203,205,141,205,10,1,141,206,151,1,125,204,203,205,206,0,0,0,143,204,152,1,141,206,1,1,106,204,206,8,143,204,11,1,141,206,1,1,25,206,206,8,106,204,206,4,143,204,12,1,141,206,11,1,141,205,12,1,1,203,10,0,1,207,0,0,134,204,0,0,216,48,1,0,206,205,203,207,143,204,13,1,128,207,0,0,0,204,207,0,143,204,14,1,141,207,13,1,141,203,14,1,141,205,156,1,141,206,156,1,34,206,206,0,41,206,206,31,42,206,206,31,134,204,0,0,44,60,1,0,207,203,205,206,143,204,15,1,128,206,0,0,0,204,206,0,143,204,16,1,141,204,1,1,141,206,15,1,109,204,8,206,141,206,1,1,25,206,206,8,141,204,16,1,109,206,4,204,141,206,20,1,0,204,206,0,143,204,125,1,141,206,21,1,0,204,206,0,143,204,126,1,141,206,152,1,0,204,206,0,143,204,155,1,141,206,0,1,0,204,206,0,143,204,162,1,141,206,164,1,0,204,206,0,143,204,167,1,141,206,170,1,0,204,206,0,143,204,172,1,141,206,173,1,0,204,206,0,143,204,175,1,119,0,170,5,32,204,181,45,32,206,181,43,20,204,204,206,121,204,42,0,141,206,151,1,1,205,0,12,19,206,206,205,0,204,206,0,143,204,27,1,141,204,27,1,1,206,0,4,45,204,204,206,252,135,0,0,32,204,181,45,143,204,28,1,141,204,28,1,1,206,0,24,1,205,0,8,125,5,204,206,205,0,0,0,141,205,151,1,20,205,205,5,0,4,205,0,141,206,20,1,0,205,206,0,143,205,125,1,141,206,21,1,0,205,206,0,143,205,126,1,0,205,4,0,143,205,155,1,141,206,159,1,0,205,206,0,143,205,162,1,141,206,164,1,0,205,206,0,143,205,167,1,141,206,170,1,0,205,206,0,143,205,172,1,141,206,173,1,0,205,206,0,143,205,175,1,119,0,126,5,119,0,64,0,32,205,181,46,121,205,62,0,141,206,178,1,94,205,206,200,143,205,29,1,141,206,29,1,106,205,206,4,143,205,30,1,141,205,30,1,32,205,205,3,121,205,53,0,141,206,159,1,32,205,206,0,143,205,32,1,141,205,32,1,121,205,4,0,1,205,184,0,143,205,177,1,119,0,166,5,141,205,29,1,1,206,4,0,109,205,4,206,141,205,178,1,94,206,205,200,143,206,35,1,141,205,35,1,106,206,205,8,143,206,36,1,141,205,35,1,25,205,205,8,106,206,205,4,143,206,38,1,141,206,35,1,141,205,36,1,77,205,205,0,61,204,0,0,0,0,128,79,141,203,38,1,76,203,203,0,65,204,204,203,63,205,205,204,111,206,8,205,141,206,20,1,0,205,206,0,143,205,125,1,141,206,21,1,0,205,206,0,143,205,126,1,141,206,151,1,0,205,206,0,143,205,155,1,1,205,0,0,143,205,162,1,141,206,164,1,0,205,206,0,143,205,167,1,141,206,170,1,0,205,206,0,143,205,172,1,141,206,173,1,0,205,206,0,143,205,175,1,119,0,62,5,141,206,151,1,1,204,0,4,19,206,206,204,0,205,206,0,143,205,39,1,141,205,39,1,32,205,205,0,121,205,110,0,141,206,178,1,94,205,206,200,143,205,40,1,141,206,40,1,106,205,206,4,143,205,41,1,141,205,41,1,32,205,205,4,121,205,37,0,141,206,159,1,32,205,206,0,143,205,42,1,141,205,42,1,121,205,4,0,1,205,189,0,143,205,177,1,119,0,97,5,141,206,20,1,77,206,206,0,61,204,0,0,0,0,128,79,141,203,21,1,76,203,203,0,65,204,204,203,63,205,206,204,144,205,45,1,141,204,159,1,76,204,204,0,58,205,204,0,144,205,46,1,59,204,10,0,142,206,46,1,135,205,5,0,204,206,0,0,144,205,47,1,141,206,40,1,110,205,206,8,144,205,48,1,141,205,40,1,142,206,45,1,142,204,47,1,66,206,206,204,142,204,48,1,63,206,206,204,111,205,8,206,32,206,181,69,32,205,181,101,20,206,206,205,121,206,102,0,141,205,178,1,94,206,205,200,143,206,50,1,141,205,50,1,106,206,205,4,143,206,51,1,141,206,51,1,32,206,206,3,121,206,24,0,141,206,50,1,1,205,4,0,109,206,4,205,141,206,178,1,94,205,206,200,143,205,52,1,141,206,52,1,106,205,206,8,143,205,53,1,141,206,52,1,25,206,206,8,106,205,206,4,143,205,55,1,141,205,52,1,141,206,53,1,77,206,206,0,61,204,0,0,0,0,128,79,141,203,55,1,76,203,203,0,65,204,204,203,63,206,206,204,111,205,8,206,141,205,151,1,1,204,255,249,19,205,205,204,0,206,205,0,143,206,56,1,141,205,20,1,0,206,205,0,143,206,125,1,141,205,21,1,0,206,205,0,143,206,126,1,141,205,56,1,1,204,0,4,20,205,205,204,0,206,205,0,143,206,155,1,1,206,0,0,143,206,162,1,141,205,164,1,0,206,205,0,143,206,167,1,141,205,170,1,0,206,205,0,143,206,172,1,141,205,173,1,0,206,205,0,143,206,175,1,119,0,201,4,141,205,159,1,32,206,205,0,143,206,57,1,141,206,57,1,121,206,4,0,1,206,196,0,143,206,177,1,119,0,253,4,141,205,151,1,1,204,0,16,19,205,205,204,0,206,205,0,143,206,60,1,1,205,0,0,141,204,164,1,4,206,205,204,143,206,61,1,141,204,60,1,33,204,204,0,141,205,61,1,141,203,164,1,125,206,204,205,203,0,0,0,143,206,62,1,59,203,10,0,141,205,62,1,76,205,205,0,135,206,5,0,203,205,0,0,144,206,63,1,141,205,178,1,94,206,205,200,143,206,64,1,141,205,64,1,110,206,205,8,144,206,65,1,141,206,64,1,142,205,63,1,142,203,65,1,65,205,205,203,111,206,8,205,141,206,151,1,1,203,0,1,19,206,206,203,0,205,206,0,143,205,66,1,141,205,66,1,32,205,205,0,120,205,44,0,141,206,178,1,94,205,206,200,143,205,68,1,141,206,68,1,106,205,206,4,143,205,69,1,141,205,69,1,32,205,205,3,121,205,27,0,141,206,68,1,106,205,206,8,143,205,70,1,141,206,68,1,25,206,206,8,106,205,206,4,143,205,72,1,1,206,0,0,1,203,0,0,141,204,70,1,141,207,72,1,134,205,0,0,136,59,1,0,206,203,204,207,143,205,73,1,128,207,0,0,0,205,207,0,143,205,74,1,141,205,68,1,141,207,73,1,109,205,8,207,141,207,68,1,25,207,207,8,141,205,74,1,109,207,4,205,119,0,9,0,141,207,68,1,110,205,207,8,144,205,75,1,141,205,68,1,142,207,75,1,68,207,207,0,111,205,8,207,119,0,1,0,141,205,151,1,39,205,205,3,0,207,205,0,143,207,77,1,141,205,20,1,0,207,205,0,143,207,129,1,141,205,21,1,0,207,205,0,143,207,130,1,141,205,77,1,0,207,205,0,143,207,153,1,141,205,159,1,0,207,205,0,143,207,161,1,141,205,164,1,0,207,205,0,143,207,166,1,141,205,170,1,0,207,205,0,143,207,171,1,141,205,173,1,0,207,205,0,143,207,174,1,119,0,148,3,1,203,9,0,1,206,85,0,138,181,203,206,132,153,0,0,136,153,0,0,8,142,0,0,8,142,0,0,252,153,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,0,154,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,8,142,0,0,88,154,0,0,141,205,151,1,38,205,205,4,0,137,205,0,32,205,137,0,120,205,31,0,32,138,181,44,120,138,5,0,0,13,181,0,1,205,119,0,143,205,177,1,119,0,44,4,141,205,151,1,38,205,205,251,0,139,205,0,141,207,20,1,0,205,207,0,143,205,125,1,141,207,21,1,0,205,207,0,143,205,126,1,0,205,139,0,143,205,155,1,141,207,159,1,0,205,207,0,143,205,162,1,141,207,164,1,0,205,207,0,143,205,167,1,141,207,170,1,0,205,207,0,143,205,172,1,141,207,173,1,0,205,207,0,143,205,175,1,119,0,216,3,141,205,151,1,38,205,205,64,0,142,205,0,32,205,142,0,120,205,31,0,32,143,181,58,120,143,5,0,0,14,181,0,1,205,123,0,143,205,177,1,119,0,9,4,141,205,151,1,38,205,205,191,0,144,205,0,141,207,20,1,0,205,207,0,143,205,125,1,141,207,21,1,0,205,207,0,143,205,126,1,0,205,144,0,143,205,155,1,141,207,159,1,0,205,207,0,143,205,162,1,141,207,164,1,0,205,207,0,143,205,167,1,141,207,170,1,0,205,207,0,143,205,172,1,141,207,173,1,0,205,207,0,143,205,175,1,119,0,181,3,141,205,151,1,38,205,205,247,0,147,205,0,1,203,34,0,1,206,90,0,138,181,203,206,148,147,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,68,148,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,244,148,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,88,150,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,148,151,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,160,144,0,0,224,152,0,0,26,205,181,48,143,205,157,1,32,176,181,45,141,205,157,1,35,205,205,10,20,205,176,205,120,205,5,0,0,15,181,0,1,205,160,0,143,205,177,1,119,0,134,3,141,205,178,1,3,205,205,202,141,207,178,1,3,207,207,200,141,204,178,1,1,206,32,1,3,204,204,206,141,206,178,1,1,203,28,1,3,206,206,203,1,203,3,0,134,177,0,0,140,244,0,0,205,207,204,206,203,0,0,0,32,203,177,0,121,203,4,0,1,203,218,0,143,203,177,1,119,0,114,3,82,178,94,0,32,203,178,0,121,203,4,0,0,203,175,0,143,203,149,1,119,0,43,0,141,203,151,1,1,206,247,224,19,203,203,206,0,183,203,0,121,176,20,0,1,203,0,0,143,203,125,1,1,203,0,0,143,203,126,1,1,206,0,1,20,206,183,206,0,203,206,0,143,203,155,1,1,203,0,0,143,203,162,1,1,203,0,0,143,203,167,1,141,206,170,1,0,203,206,0,143,203,172,1,141,206,173,1,0,203,206,0,143,203,175,1,119,0,24,3,1,203,0,0,143,203,129,1,1,203,0,0,143,203,130,1,39,206,183,2,0,203,206,0,143,203,153,1,1,203,0,0,143,203,161,1,1,203,0,0,143,203,166,1,141,206,170,1,0,203,206,0,143,203,171,1,141,206,173,1,0,203,206,0,143,203,174,1,119,0,71,2,141,203,149,1,41,203,203,24,42,203,203,24,0,179,203,0,26,203,179,48,35,203,203,10,120,203,72,0,141,203,149,1,41,203,203,24,42,203,203,24,1,206,43,0,1,204,59,0,138,203,206,204,0,147,0,0,252,146,0,0,4,147,0,0,8,147,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,12,147,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,252,146,0,0,16,147,0,0,119,0,16,0,119,0,5,0,119,0,4,0,119,0,3,0,119,0,2,0,119,0,1,0,82,180,107,0,25,203,180,1,85,107,203,0,25,203,180,1,52,203,203,24,60,147,0,0,102,182,180,1,0,203,182,0,143,203,149,1,119,0,169,255,141,206,20,1,0,203,206,0,143,203,129,1,141,206,21,1,0,203,206,0,143,203,130,1,39,206,147,3,0,203,206,0,143,203,153,1,141,206,159,1,0,203,206,0,143,203,161,1,141,206,164,1,0,203,206,0,143,203,166,1,141,206,170,1,0,203,206,0,143,203,171,1,141,206,173,1,0,203,206,0,143,203,174,1,119,0,217,1,141,205,178,1,3,205,205,202,141,207,178,1,3,207,207,200,141,204,178,1,1,203,32,1,3,204,204,203,141,203,178,1,1,206,28,1,3,203,203,206,1,206,5,0,134,151,0,0,140,244,0,0,205,207,204,203,206,0,0,0,32,206,151,0,121,206,4,0,1,206,218,0,143,206,177,1,119,0,192,2,141,206,178,1,94,152,206,200,25,206,152,8,106,153,206,4,141,203,20,1,0,206,203,0,143,206,125,1,141,203,21,1,0,206,203,0,143,206,126,1,39,203,147,32,0,206,203,0,143,206,155,1,141,203,159,1,0,206,203,0,143,206,162,1,141,203,164,1,0,206,203,0,143,206,167,1,0,206,153,0,143,206,172,1,1,206,0,0,143,206,175,1,119,0,108,2,141,206,178,1,3,206,206,202,141,203,178,1,3,203,203,200,141,204,178,1,1,207,32,1,3,204,204,207,141,207,178,1,1,205,28,1,3,207,207,205,1,205,2,0,134,149,0,0,140,244,0,0,206,203,204,207,205,0,0,0,32,205,149,0,121,205,4,0,1,205,218,0,143,205,177,1,119,0,148,2,141,205,151,1,39,205,205,8,0,150,205,0,141,207,20,1,0,205,207,0,143,205,125,1,141,207,21,1,0,205,207,0,143,205,126,1,0,205,150,0,143,205,155,1,141,207,159,1,0,205,207,0,143,205,162,1,141,207,164,1,0,205,207,0,143,205,167,1,141,207,170,1,0,205,207,0,143,205,172,1,141,207,173,1,0,205,207,0,143,205,175,1,119,0,64,2,82,161,107,0,4,206,24,161,34,206,206,4,121,206,4,0,1,206,217,0,143,206,177,1,119,0,117,2,25,206,161,1,85,107,206,0,102,163,161,1,41,206,163,24,42,206,206,24,32,206,206,97,120,206,4,0,1,206,217,0,143,206,177,1,119,0,107,2,25,206,161,2,85,107,206,0,102,164,161,2,41,206,164,24,42,206,206,24,32,206,206,108,120,206,4,0,1,206,217,0,143,206,177,1,119,0,97,2,25,206,161,3,85,107,206,0,102,165,161,3,41,206,165,24,42,206,206,24,32,206,206,115,120,206,4,0,1,206,217,0,143,206,177,1,119,0,87,2,25,206,161,4,85,107,206,0,102,167,161,4,41,206,167,24,42,206,206,24,32,206,206,101,120,206,4,0,1,206,217,0,143,206,177,1,119,0,77,2,141,206,178,1,3,206,206,202,141,203,178,1,3,203,203,200,141,204,178,1,1,207,32,1,3,204,204,207,141,207,178,1,1,205,28,1,3,207,207,205,1,205,6,0,134,168,0,0,140,244,0,0,206,203,204,207,205,0,0,0,32,205,168,0,121,205,4,0,1,205,218,0,143,205,177,1,119,0,57,2,141,207,20,1,0,205,207,0,143,205,129,1,141,207,21,1,0,205,207,0,143,205,130,1,39,207,147,1,0,205,207,0,143,205,153,1,141,207,159,1,0,205,207,0,143,205,161,1,141,207,164,1,0,205,207,0,143,205,166,1,141,207,170,1,0,205,207,0,143,205,171,1,141,207,173,1,0,205,207,0,143,205,174,1,119,0,40,1,82,169,107,0,4,203,24,169,34,203,203,3,121,203,4,0,1,203,217,0,143,203,177,1,119,0,28,2,25,203,169,1,85,107,203,0,102,170,169,1,41,203,170,24,42,203,203,24,32,203,203,117,120,203,4,0,1,203,217,0,143,203,177,1,119,0,18,2,25,203,169,2,85,107,203,0,102,171,169,2,41,203,171,24,42,203,203,24,32,203,203,108,120,203,4,0,1,203,217,0,143,203,177,1,119,0,8,2,25,203,169,3,85,107,203,0,102,172,169,3,41,203,172,24,42,203,203,24,32,203,203,108,120,203,4,0,1,203,217,0,143,203,177,1,119,0,254,1,141,203,178,1,3,203,203,202,141,206,178,1,3,206,206,200,141,204,178,1,1,207,32,1,3,204,204,207,141,207,178,1,1,205,28,1,3,207,207,205,1,205,7,0,134,173,0,0,140,244,0,0,203,206,204,207,205,0,0,0,32,205,173,0,121,205,4,0,1,205,218,0,143,205,177,1,119,0,234,1,141,207,20,1,0,205,207,0,143,205,129,1,141,207,21,1,0,205,207,0,143,205,130,1,39,207,147,1,0,205,207,0,143,205,153,1,141,207,159,1,0,205,207,0,143,205,161,1,141,207,164,1,0,205,207,0,143,205,166,1,141,207,170,1,0,205,207,0,143,205,171,1,141,207,173,1,0,205,207,0,143,205,174,1,119,0,217,0,82,154,107,0,4,205,24,154,34,205,205,3,121,205,4,0,1,205,217,0,143,205,177,1,119,0,205,1,25,205,154,1,85,107,205,0,102,156,154,1,41,205,156,24,42,205,205,24,32,205,205,114,120,205,4,0,1,205,217,0,143,205,177,1,119,0,195,1,25,205,154,2,85,107,205,0,102,157,154,2,41,205,157,24,42,205,205,24,32,205,205,117,120,205,4,0,1,205,217,0,143,205,177,1,119,0,185,1,25,205,154,3,85,107,205,0,102,158,154,3,41,205,158,24,42,205,205,24,32,205,205,101,120,205,4,0,1,205,217,0,143,205,177,1,119,0,175,1,141,205,178,1,3,205,205,202,141,207,178,1,3,207,207,200,141,204,178,1,1,203,32,1,3,204,204,203,141,203,178,1,1,206,28,1,3,203,203,206,1,206,6,0,134,159,0,0,140,244,0,0,205,207,204,203,206,0,0,0,32,206,159,0,121,206,4,0,1,206,218,0,143,206,177,1,119,0,155,1,141,206,178,1,94,160,206,200,1,203,1,0,109,160,8,203,141,206,20,1,0,203,206,0,143,203,129,1,141,206,21,1,0,203,206,0,143,203,130,1,39,206,147,1,0,203,206,0,143,203,153,1,141,206,159,1,0,203,206,0,143,203,161,1,141,206,164,1,0,203,206,0,143,203,166,1,141,206,170,1,0,203,206,0,143,203,171,1,141,206,173,1,0,203,206,0,143,203,174,1,119,0,134,0,141,205,178,1,3,205,205,202,141,207,178,1,3,207,207,200,141,204,178,1,1,203,32,1,3,204,204,203,141,203,178,1,1,206,28,1,3,203,203,206,1,206,1,0,134,148,0,0,140,244,0,0,205,207,204,203,206,0,0,0,32,206,148,0,121,206,4,0,1,206,218,0,143,206,177,1,119,0,109,1,141,203,20,1,0,206,203,0,143,206,125,1,141,203,21,1,0,206,203,0,143,206,126,1,0,206,147,0,143,206,155,1,141,203,159,1,0,206,203,0,143,206,162,1,141,203,164,1,0,206,203,0,143,206,167,1,141,203,170,1,0,206,203,0,143,206,172,1,141,203,173,1,0,206,203,0,143,206,175,1,119,0,28,1,119,0,31,0,82,131,101,0,25,207,131,1,85,101,207,0,141,207,178,1,3,207,207,202,1,205,0,0,109,207,48,205,141,207,20,1,0,205,207,0,143,205,125,1,141,207,21,1,0,205,207,0,143,205,126,1,141,207,151,1,0,205,207,0,143,205,155,1,141,207,159,1,0,205,207,0,143,205,162,1,141,207,164,1,0,205,207,0,143,205,167,1,141,207,170,1,0,205,207,0,143,205,172,1,141,207,173,1,0,205,207,0,143,205,175,1,119,0,254,0,119,0,1,0,141,207,20,1,0,205,207,0,143,205,125,1,141,207,21,1,0,205,207,0,143,205,126,1,141,207,151,1,0,205,207,0,143,205,155,1,141,207,159,1,0,205,207,0,143,205,162,1,141,207,164,1,0,205,207,0,143,205,167,1,141,207,170,1,0,205,207,0,143,205,172,1,141,207,173,1,0,205,207,0,143,205,175,1,119,0,231,0,141,205,178,1,94,132,205,200,1,205,0,0,45,205,132,205,120,154,0,0,1,205,115,0,143,205,177,1,119,0,27,1,106,133,132,4,32,205,133,2,120,205,4,0,1,205,115,0,143,205,177,1,119,0,21,1,141,205,151,1,38,205,205,242,0,134,205,0,141,207,20,1,0,205,207,0,143,205,129,1,141,207,21,1,0,205,207,0,143,205,130,1,39,207,134,1,0,205,207,0,143,205,153,1,141,207,159,1,0,205,207,0,143,205,161,1,141,207,164,1,0,205,207,0,143,205,166,1,141,207,170,1,0,205,207,0,143,205,171,1,141,207,173,1,0,205,207,0,143,205,174,1,119,0,1,0,141,206,153,1,38,206,206,2,0,203,206,0,143,203,78,1,141,203,78,1,32,203,203,0,121,203,5,0,141,206,153,1,0,203,206,0,143,203,154,1,119,0,13,0,141,206,153,1,38,206,206,253,0,203,206,0,143,203,79,1,82,203,107,0,143,203,80,1,141,203,80,1,26,203,203,1,85,107,203,0,141,206,79,1,0,203,206,0,143,203,154,1,141,206,154,1,38,206,206,1,0,203,206,0,143,203,81,1,141,203,81,1,32,203,203,0,121,203,23,0,141,206,129,1,0,203,206,0,143,203,125,1,141,206,130,1,0,203,206,0,143,203,126,1,141,206,154,1,0,203,206,0,143,203,155,1,141,206,161,1,0,203,206,0,143,203,162,1,141,206,166,1,0,203,206,0,143,203,167,1,141,206,171,1,0,203,206,0,143,203,172,1,141,206,174,1,0,203,206,0,143,203,175,1,119,0,140,0,141,206,154,1,38,206,206,250,0,203,206,0,143,203,82,1,141,206,178,1,94,203,206,200,143,203,83,1,141,206,83,1,82,203,206,0,143,203,84,1,141,203,84,1,1,206,0,0,45,203,203,206,92,156,0,0,141,206,129,1,0,203,206,0,143,203,125,1,141,206,130,1,0,203,206,0,143,203,126,1,141,206,82,1,1,204,132,0,20,206,206,204,0,203,206,0,143,203,155,1,141,206,161,1,0,203,206,0,143,203,162,1,141,206,166,1,0,203,206,0,143,203,167,1,141,206,171,1,0,203,206,0,143,203,172,1,141,206,174,1,0,203,206,0,143,203,175,1,119,0,102,0,141,206,84,1,106,203,206,4,143,203,85,1,141,203,85,1,32,203,203,2,1,206,12,0,1,204,4,0,125,9,203,206,204,0,0,0,82,204,94,0,143,204,86,1,141,204,86,1,32,204,204,0,121,204,34,0,141,204,85,1,32,204,204,1,121,204,15,0,141,206,84,1,106,204,206,8,143,204,87,1,141,206,84,1,25,206,206,8,106,204,206,4,143,204,89,1,141,204,89,1,141,206,87,1,27,206,206,12,3,204,204,206,141,206,83,1,109,204,8,206,119,0,17,0,141,206,85,1,32,206,206,2,121,206,14,0,141,204,84,1,106,206,204,8,143,206,90,1,141,204,84,1,25,204,204,8,106,206,204,4,143,206,91,1,141,206,91,1,141,204,90,1,41,204,204,2,141,203,83,1,97,206,204,203,119,0,1,0,141,204,178,1,94,203,204,200,143,203,92,1,141,204,92,1,82,203,204,0,143,203,93,1,141,204,93,1,106,203,204,8,143,203,95,1,141,203,93,1,141,204,95,1,25,204,204,1,109,203,8,204,82,204,60,0,143,204,96,1,141,204,96,1,141,203,95,1,25,203,203,1,48,204,204,203,116,157,0,0,1,204,219,0,143,204,177,1,119,0,92,0,141,203,178,1,94,204,203,200,143,204,97,1,141,203,97,1,82,204,203,0,143,204,98,1,141,204,178,1,141,203,98,1,97,204,200,203,141,204,129,1,0,203,204,0,143,203,125,1,141,204,130,1,0,203,204,0,143,203,126,1,141,204,82,1,20,204,9,204,0,203,204,0,143,203,155,1,141,204,161,1,0,203,204,0,143,203,162,1,141,204,166,1,0,203,204,0,143,203,167,1,141,204,171,1,0,203,204,0,143,203,172,1,141,204,174,1,0,203,204,0,143,203,175,1,82,203,107,0,143,203,99,1,141,204,125,1,0,203,204,0,143,203,20,1,141,204,126,1,0,203,204,0,143,203,21,1,141,204,155,1,0,203,204,0,143,203,150,1,141,204,162,1,0,203,204,0,143,203,159,1,141,204,167,1,0,203,204,0,143,203,164,1,141,204,99,1,25,203,204,1,143,203,168,1,141,204,172,1,0,203,204,0,143,203,169,1,141,204,175,1,0,203,204,0,143,203,173,1,119,0,4,243,141,204,178,1,1,206,32,1,94,203,204,206,143,203,100,1,141,203,178,1,1,204,28,1,141,206,100,1,97,203,204,206,82,206,94,0,143,206,102,1,141,206,102,1,26,206,206,1,85,94,206,0,1,206,0,0,141,204,102,1,47,206,206,204,212,158,0,0,141,204,127,1,0,206,204,0,143,206,123,1,141,204,128,1,0,206,204,0,143,206,124,1,141,204,160,1,0,206,204,0,143,206,158,1,141,204,165,1,0,206,204,0,143,206,163,1,119,0,201,242,1,206,216,0,143,206,177,1,119,0,1,0,141,206,177,1,1,205,16,0,1,207,204,0,138,206,205,207,36,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,120,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,224,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0], eb + 30720);
  HEAPU8.set([32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,56,163,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,132,163,0,0,32,162,0,0,208,163,0,0,32,162,0,0,32,162,0,0,32,162,0,0,28,164,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,124,164,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,212,164,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,165,0,0,32,162,0,0,32,162,0,0,32,162,0,0,120,165,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,208,165,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,56,166,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,144,166,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,248,166,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,112,167,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,216,167,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,64,168,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,32,162,0,0,168,168,0,0,208,168,0,0,56,169,0,0,152,169,0,0,119,0,248,1,82,204,101,0,143,204,6,1,141,203,178,1,3,203,203,202,106,204,203,48,143,204,17,1,141,204,178,1,141,203,6,1,85,204,203,0,141,203,178,1,141,204,17,1,109,203,4,204,141,203,178,1,1,207,40,1,3,203,203,207,1,207,0,1,141,205,178,1,134,204,0,0,120,58,1,0,203,207,205,0,119,0,227,1,82,204,101,0,143,204,147,1,141,205,178,1,3,205,205,202,106,204,205,48,143,204,148,1,141,204,178,1,109,204,8,10,141,204,178,1,25,204,204,8,141,205,147,1,109,204,4,205,141,205,178,1,25,205,205,8,141,204,148,1,109,205,8,204,141,205,178,1,1,207,40,1,3,205,205,207,1,207,40,1,141,203,178,1,25,203,203,8,134,204,0,0,120,58,1,0,205,207,203,0,119,0,201,1,82,36,101,0,141,204,178,1,3,204,204,202,106,37,204,48,141,204,178,1,109,204,24,11,141,204,178,1,25,204,204,24,109,204,4,36,141,204,178,1,25,204,204,24,109,204,8,37,141,203,178,1,1,207,40,1,3,203,203,207,1,207,40,1,141,205,178,1,25,205,205,24,134,204,0,0,120,58,1,0,203,207,205,0,119,0,179,1,82,105,101,0,141,204,178,1,3,204,204,202,106,106,204,48,141,204,178,1,109,204,40,105,141,204,178,1,25,204,204,40,109,204,4,106,141,205,178,1,1,207,40,1,3,205,205,207,1,207,80,1,141,203,178,1,25,203,203,40,134,204,0,0,120,58,1,0,205,207,203,0,119,0,160,1,82,116,101,0,141,204,178,1,3,204,204,202,106,117,204,48,141,204,178,1,109,204,48,116,141,204,178,1,25,204,204,48,109,204,4,117,141,203,178,1,1,207,40,1,3,203,203,207,1,207,120,1,141,205,178,1,25,205,205,48,134,204,0,0,120,58,1,0,203,207,205,0,119,0,141,1,82,119,101,0,141,204,178,1,3,204,204,202,106,120,204,48,141,204,178,1,109,204,56,119,141,204,178,1,25,204,204,56,109,204,4,120,141,205,178,1,1,207,40,1,3,205,205,207,1,207,152,1,141,203,178,1,25,203,203,56,134,204,0,0,120,58,1,0,205,207,203,0,119,0,122,1,82,124,101,0,141,204,178,1,3,204,204,202,106,125,204,48,141,204,178,1,109,204,64,124,141,204,178,1,25,204,204,64,109,204,4,125,141,204,178,1,25,204,204,64,41,203,121,24,42,203,203,24,109,204,8,203,141,204,178,1,1,207,40,1,3,204,204,207,1,207,176,1,141,205,178,1,25,205,205,64,134,203,0,0,120,58,1,0,204,207,205,0,119,0,98,1,82,128,101,0,141,203,178,1,3,203,203,202,106,129,203,48,141,203,178,1,109,203,80,128,141,203,178,1,25,203,203,80,109,203,4,129,141,203,178,1,25,203,203,80,109,203,8,12,141,205,178,1,1,207,40,1,3,205,205,207,1,207,232,1,141,204,178,1,25,204,204,80,134,203,0,0,120,58,1,0,205,207,204,0,119,0,76,1,82,135,101,0,141,203,178,1,3,203,203,202,106,136,203,48,141,203,178,1,109,203,96,135,141,203,178,1,25,203,203,96,109,203,4,136,141,204,178,1,1,207,40,1,3,204,204,207,1,207,8,2,141,205,178,1,25,205,205,96,134,203,0,0,120,58,1,0,204,207,205,0,119,0,57,1,82,140,101,0,141,203,178,1,3,203,203,202,106,141,203,48,141,203,178,1,109,203,104,140,141,203,178,1,25,203,203,104,109,203,4,141,141,203,178,1,25,203,203,104,109,203,8,13,141,205,178,1,1,207,40,1,3,205,205,207,1,207,32,2,141,204,178,1,25,204,204,104,134,203,0,0,120,58,1,0,205,207,204,0,119,0,35,1,82,145,101,0,141,203,178,1,3,203,203,202,106,146,203,48,141,203,178,1,109,203,120,145,141,203,178,1,25,203,203,120,109,203,4,146,141,203,178,1,25,203,203,120,109,203,8,14,141,204,178,1,1,207,40,1,3,204,204,207,1,207,64,2,141,205,178,1,25,205,205,120,134,203,0,0,120,58,1,0,204,207,205,0,119,0,13,1,82,184,101,0,141,203,178,1,3,203,203,202,106,185,203,48,141,203,178,1,1,205,136,0,97,203,205,184,141,205,178,1,1,203,136,0,3,205,205,203,109,205,4,185,141,205,178,1,1,203,136,0,3,205,205,203,109,205,8,15,141,203,178,1,1,207,40,1,3,203,203,207,1,207,96,2,141,204,178,1,1,208,136,0,3,204,204,208,134,205,0,0,120,58,1,0,203,207,204,0,119,0,243,0,82,191,101,0,141,205,178,1,3,205,205,202,106,192,205,48,141,205,178,1,1,204,152,0,97,205,204,191,141,204,178,1,1,205,152,0,3,204,204,205,109,204,4,192,141,205,178,1,1,207,40,1,3,205,205,207,1,207,136,2,141,203,178,1,1,208,152,0,3,203,203,208,134,204,0,0,120,58,1,0,205,207,203,0,119,0,221,0,82,198,101,0,141,204,178,1,3,204,204,202,106,199,204,48,141,204,178,1,1,203,160,0,97,204,203,198,141,203,178,1,1,204,160,0,3,203,203,204,109,203,4,199,141,203,178,1,1,204,160,0,3,203,203,204,109,203,8,17,141,204,178,1,1,207,40,1,3,204,204,207,1,207,168,2,141,205,178,1,1,208,160,0,3,205,205,208,134,203,0,0,120,58,1,0,204,207,205,0,119,0,195,0,82,203,101,0,143,203,5,1,141,205,178,1,3,205,205,202,106,203,205,48,143,203,7,1,141,203,178,1,1,205,176,0,141,207,5,1,97,203,205,207,141,207,178,1,1,205,176,0,3,207,207,205,141,205,7,1,109,207,4,205,141,205,178,1,1,207,176,0,3,205,205,207,109,205,8,16,141,207,178,1,1,203,40,1,3,207,207,203,1,203,208,2,141,204,178,1,1,208,176,0,3,204,204,208,134,205,0,0,120,58,1,0,207,203,204,0,119,0,165,0,82,205,101,0,143,205,33,1,141,204,178,1,3,204,204,202,106,205,204,48,143,205,34,1,141,205,178,1,1,204,192,0,141,203,33,1,97,205,204,203,141,203,178,1,1,204,192,0,3,203,203,204,141,204,34,1,109,203,4,204,141,203,178,1,1,205,40,1,3,203,203,205,1,205,248,2,141,207,178,1,1,208,192,0,3,207,207,208,134,204,0,0,120,58,1,0,203,205,207,0,119,0,139,0,82,204,101,0,143,204,43,1,141,207,178,1,3,207,207,202,106,204,207,48,143,204,44,1,141,204,178,1,1,207,200,0,141,205,43,1,97,204,207,205,141,205,178,1,1,207,200,0,3,205,205,207,141,207,44,1,109,205,4,207,141,205,178,1,1,204,40,1,3,205,205,204,1,204,32,3,141,203,178,1,1,208,200,0,3,203,203,208,134,207,0,0,120,58,1,0,205,204,203,0,119,0,113,0,82,207,101,0,143,207,58,1,141,203,178,1,3,203,203,202,106,207,203,48,143,207,59,1,141,207,178,1,1,203,208,0,141,204,58,1,97,207,203,204,141,204,178,1,1,203,208,0,3,204,204,203,141,203,59,1,109,204,4,203,141,204,178,1,1,207,40,1,3,204,204,207,1,207,64,3,141,205,178,1,1,208,208,0,3,205,205,208,134,203,0,0,120,58,1,0,204,207,205,0,119,0,87,0,141,205,178,1,1,207,32,1,94,203,205,207,143,203,103,1,141,203,103,1,0,6,203,0,141,203,178,1,137,203,0,0,139,6,0,0,119,0,77,0,82,203,101,0,143,203,104,1,141,205,178,1,3,205,205,202,106,203,205,48,143,203,105,1,141,203,178,1,1,205,216,0,141,207,104,1,97,203,205,207,141,207,178,1,1,205,216,0,3,207,207,205,141,205,105,1,109,207,4,205,141,207,178,1,1,203,40,1,3,207,207,203,1,203,96,3,141,204,178,1,1,208,216,0,3,204,204,208,134,205,0,0,120,58,1,0,207,203,204,0,119,0,51,0,141,204,178,1,1,203,40,1,3,205,204,203,143,205,176,1,1,205,120,3,143,205,179,1,141,203,176,1,25,205,203,26,143,205,180,1,141,205,176,1,141,203,179,1,78,203,203,0,83,205,203,0,141,205,176,1,25,203,205,1,143,203,176,1,141,205,179,1,25,203,205,1,143,203,179,1,141,203,176,1,141,205,180,1,54,203,203,205,92,169,0,0,119,0,27,0,82,203,101,0,143,203,106,1,141,205,178,1,3,205,205,202,106,203,205,48,143,203,107,1,141,203,178,1,1,205,224,0,141,204,106,1,97,203,205,204,141,204,178,1,1,205,224,0,3,204,204,205,141,205,107,1,109,204,4,205,141,204,178,1,1,203,40,1,3,204,204,203,1,203,152,3,141,207,178,1,1,208,224,0,3,207,207,208,134,205,0,0,120,58,1,0,204,203,207,0,119,0,1,0,1,206,0,0,52,206,3,206,160,170,0,0,141,205,178,1,1,207,40,1,90,206,205,207,143,206,108,1,141,206,108,1,41,206,206,24,42,206,206,24,32,206,206,0,121,206,23,0,0,206,3,0,143,206,176,1,1,206,192,3,143,206,179,1,141,205,176,1,25,206,205,14,143,206,180,1,141,206,176,1,141,205,179,1,78,205,205,0,83,206,205,0,141,206,176,1,25,205,206,1,143,205,176,1,141,206,179,1,25,205,206,1,143,205,179,1,141,205,176,1,141,206,180,1,54,205,205,206,76,170,0,0,119,0,7,0,141,206,178,1,1,207,40,1,3,206,206,207,135,205,6,0,3,206,0,0,119,0,1,0,82,205,94,0,143,205,109,1,141,205,109,1,32,205,205,0,121,205,6,0,141,205,178,1,1,206,28,1,94,19,205,206,0,18,19,0,119,0,11,0,141,206,178,1,1,207,32,1,94,205,206,207,143,205,110,1,141,205,178,1,1,206,28,1,141,207,110,1,97,205,206,207,141,207,110,1,0,18,207,0,1,206,0,0,13,207,18,206,143,207,111,1,141,207,111,1,120,207,44,0,0,207,18,0,143,207,114,1,141,206,114,1,25,207,206,16,143,207,112,1,141,206,112,1,82,207,206,0,143,207,115,1,141,207,178,1,141,206,115,1,97,207,200,206,141,207,178,1,3,207,207,202,106,206,207,24,143,206,116,1,141,207,178,1,1,205,28,1,94,206,207,205,143,206,117,1,141,207,178,1,3,207,207,202,106,206,207,28,143,206,118,1,141,207,116,1,38,207,207,1,141,205,117,1,141,203,118,1,135,206,7,0,207,205,203,0,141,207,178,1,94,206,207,200,143,206,119,1,141,206,178,1,1,207,28,1,141,203,119,1,97,206,207,203,141,203,119,1,32,203,203,0,120,203,5,0,141,207,119,1,0,203,207,0,143,203,114,1,119,0,216,255,82,203,94,0,143,203,120,1,141,203,120,1,32,203,203,0,120,203,5,0,1,6,0,0,141,203,178,1,137,203,0,0,139,6,0,0,141,207,178,1,1,206,32,1,94,203,207,206,143,203,122,1,141,207,122,1,134,203,0,0,240,251,0,0,29,207,0,0,1,6,0,0,141,203,178,1,137,203,0,0,139,6,0,0,140,2,96,0,0,0,0,0,1,92,0,0,136,94,0,0,0,93,94,0,136,94,0,0,25,94,94,64,137,94,0,0,25,2,93,48,25,91,93,32,25,3,93,16,0,4,93,0,82,15,0,0,25,26,0,4,82,37,26,0,25,48,37,100,82,59,48,0,25,70,15,100,82,81,70,0,15,90,59,81,121,90,4,0,85,0,37,0,85,26,15,0,119,0,69,0,13,5,59,81,121,5,67,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,15,0,85,2,95,0,106,94,15,4,109,2,4,94,106,95,15,8,109,2,8,95,106,94,15,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,6,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,37,0,85,2,94,0,106,95,37,4,109,2,4,95,106,94,37,8,109,2,8,94,106,95,37,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,7,0,0,80,40,1,0,2,0,0,0,71,8,7,6,121,8,5,0,82,9,0,0,82,10,26,0,85,0,10,0,85,26,9,0,82,11,0,0,25,12,0,8,82,13,12,0,25,14,13,100,82,16,14,0,25,17,11,100,82,18,17,0,15,19,16,18,121,19,4,0,85,0,13,0,85,12,11,0,119,0,69,0,13,65,16,18,121,65,67,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,11,0,85,2,95,0,106,94,11,4,109,2,4,94,106,95,11,8,109,2,8,95,106,94,11,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,66,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,13,0,85,2,94,0,106,95,13,4,109,2,4,95,106,94,13,8,109,2,8,94,106,95,13,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,67,0,0,80,40,1,0,2,0,0,0,71,68,67,66,121,68,5,0,82,69,0,0,82,71,12,0,85,0,71,0,85,12,69,0,82,72,0,0,25,73,0,12,82,74,73,0,25,75,74,100,82,76,75,0,25,77,72,100,82,78,77,0,15,79,76,78,121,79,4,0,85,0,74,0,85,73,72,0,119,0,69,0,13,80,76,78,121,80,67,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,72,0,85,2,95,0,106,94,72,4,109,2,4,94,106,95,72,8,109,2,8,95,106,94,72,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,82,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,74,0,85,2,94,0,106,95,74,4,109,2,4,95,106,94,74,8,109,2,8,94,106,95,74,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,83,0,0,80,40,1,0,2,0,0,0,71,84,83,82,121,84,5,0,82,85,0,0,82,86,73,0,85,0,86,0,85,73,85,0,25,30,0,4,82,23,30,0,25,32,0,8,82,25,32,0,25,87,25,100,82,20,87,0,25,88,23,100,82,22,88,0,15,89,20,22,121,89,4,0,85,30,25,0,85,32,23,0,119,0,69,0,13,21,20,22,121,21,67,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,23,0,85,2,95,0,106,94,23,4,109,2,4,94,106,95,23,8,109,2,8,95,106,94,23,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,24,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,25,0,85,2,94,0,106,95,25,4,109,2,4,95,106,94,25,8,109,2,8,94,106,95,25,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,27,0,0,80,40,1,0,2,0,0,0,71,28,27,24,121,28,5,0,82,29,30,0,82,31,32,0,85,30,31,0,85,32,29,0,82,33,30,0,25,34,0,12,82,35,34,0,25,36,35,100,82,38,36,0,25,39,33,100,82,40,39,0,15,41,38,40,121,41,4,0,85,30,35,0,85,34,33,0,119,0,69,0,13,55,38,40,121,55,67,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,33,0,85,2,95,0,106,94,33,4,109,2,4,94,106,95,33,8,109,2,8,95,106,94,33,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,56,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,35,0,85,2,94,0,106,95,35,4,109,2,4,95,106,94,35,8,109,2,8,94,106,95,35,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,57,0,0,80,40,1,0,2,0,0,0,71,58,57,56,121,58,5,0,82,60,30,0,82,61,34,0,85,30,61,0,85,34,60,0,25,52,0,8,82,45,52,0,25,54,0,12,82,47,54,0,25,62,47,100,82,42,62,0,25,63,45,100,82,44,63,0,15,64,42,44,121,64,5,0,85,52,47,0,85,54,45,0,137,93,0,0,139,0,0,0,13,43,42,44,120,43,3,0,137,93,0,0,139,0,0,0,82,94,1,0,85,91,94,0,106,95,1,4,109,91,4,95,106,94,1,8,109,91,8,94,106,95,1,12,109,91,12,95,82,95,45,0,85,2,95,0,106,94,45,4,109,2,4,94,106,95,45,8,109,2,8,95,106,94,45,12,109,2,12,94,134,94,0,0,116,52,1,0,3,91,2,0,82,94,3,0,85,2,94,0,106,95,3,4,109,2,4,95,106,94,3,8,109,2,8,94,106,95,3,12,109,2,12,95,134,46,0,0,80,40,1,0,2,0,0,0,82,95,1,0,85,91,95,0,106,94,1,4,109,91,4,94,106,95,1,8,109,91,8,95,106,94,1,12,109,91,12,94,82,94,47,0,85,2,94,0,106,95,47,4,109,2,4,95,106,94,47,8,109,2,8,94,106,95,47,12,109,2,12,95,134,95,0,0,116,52,1,0,4,91,2,0,82,95,4,0,85,2,95,0,106,94,4,4,109,2,4,94,106,95,4,8,109,2,8,95,106,94,4,12,109,2,12,94,134,49,0,0,80,40,1,0,2,0,0,0,71,50,49,46,120,50,3,0,137,93,0,0,139,0,0,0,82,51,52,0,82,53,54,0,85,52,53,0,85,54,51,0,137,93,0,0,139,0,0,0,140,4,167,0,0,0,0,0,2,160,0,0,192,0,0,0,2,161,0,0,0,1,0,0,2,162,0,0,168,1,0,0,1,158,0,0,136,163,0,0,0,159,163,0,136,163,0,0,1,164,176,2,3,163,163,164,137,163,0,0,5,27,2,1,32,163,27,0,121,163,3,0,137,159,0,0,139,0,0,0,109,159,4,2,85,159,2,0,0,86,2,0,0,105,2,0,1,144,2,0,3,76,86,2,3,97,76,105,41,163,144,2,3,113,159,163,85,113,97,0,25,131,144,1,48,163,97,27,112,180,0,0,0,87,105,0,0,105,97,0,0,144,131,0,0,86,87,0,119,0,244,255,119,0,1,0,1,163,0,0,4,164,27,2,47,163,163,164,28,185,0,0,1,61,1,0,1,99,0,0,0,142,0,0,1,155,1,0,38,163,61,3,0,55,163,0,32,163,55,3,121,163,116,0,97,159,160,142,1,163,1,0,15,67,163,155,121,67,100,0,0,10,155,0,0,16,142,0,0,72,142,0,1,149,1,0,1,163,0,0,4,163,163,2,3,68,16,163,26,69,10,2,41,163,69,2,94,70,159,163,1,163,0,0,3,164,70,2,4,163,163,164,3,71,16,163,38,163,3,3,135,73,8,0,163,72,71,0,1,163,255,255,47,163,163,73,36,181,0,0,38,163,3,3,135,74,8,0,163,72,68,0,1,163,255,255,47,163,163,74,36,181,0,0,0,145,149,0,119,0,30,0,38,163,3,3,135,75,8,0,163,71,68,0,25,77,149,1,3,163,159,160,41,164,149,2,3,78,163,164,1,164,255,255,47,164,164,75,96,181,0,0,85,78,71,0,26,79,10,1,0,5,71,0,0,8,79,0,119,0,4,0,85,78,68,0,0,5,68,0,0,8,69,0,1,164,1,0,15,80,164,8,120,80,3,0,0,145,77,0,119,0,7,0,94,23,159,160,0,10,8,0,0,16,5,0,0,72,23,0,0,149,77,0,119,0,204,255,34,81,145,2,120,81,41,0,3,164,159,160,41,163,145,2,3,82,164,163,3,163,159,162,85,82,163,0,32,163,2,0,120,163,34,0,0,14,2,0,3,95,159,162,16,93,161,14,125,84,93,161,14,0,0,0,94,94,159,160,135,163,9,0,95,94,84,0,0,91,94,0,1,147,0,0,3,163,159,160,41,164,147,2,3,88,163,164,25,89,147,1,3,164,159,160,41,163,89,2,94,90,164,163,135,164,9,0,91,90,84,0,3,92,91,84,85,88,92,0,13,139,89,145,120,139,4,0,0,91,90,0,0,147,89,0,119,0,241,255,13,83,14,84,120,83,6,0,4,85,14,84,82,25,82,0,0,14,85,0,0,95,25,0,119,0,226,255,43,164,61,2,0,96,164,0,41,164,99,30,0,98,164,0,43,164,99,2,0,100,164,0,25,101,155,2,20,164,96,98,0,29,164,0,0,66,100,0,0,156,101,0,119,0,155,0,26,102,155,1,41,164,102,2,94,103,159,164,0,104,142,0,4,164,27,2,3,164,0,164,4,164,164,104,48,164,103,164,48,184,0,0,97,159,160,142,1,164,1,0,15,106,164,155,121,106,105,0,0,11,155,0,0,17,142,0,0,111,142,0,1,150,1,0,1,164,0,0,4,164,164,2,3,107,17,164,26,108,11,2,41,164,108,2,94,109,159,164,1,164,0,0,3,163,109,2,4,164,164,163,3,110,17,164,38,164,3,3,135,112,8,0,164,111,110,0,1,164,255,255,47,164,164,112,20,183,0,0,38,164,3,3,135,114,8,0,164,111,107,0,1,164,255,255,47,164,164,114,20,183,0,0,0,146,150,0,119,0,30,0,38,164,3,3,135,115,8,0,164,110,107,0,25,116,150,1,3,164,159,160,41,163,150,2,3,117,164,163,1,163,255,255,47,163,163,115,80,183,0,0,85,117,110,0,26,118,11,1,0,6,110,0,0,9,118,0,119,0,4,0,85,117,107,0,0,6,107,0,0,9,108,0,1,163,1,0,15,119,163,9,120,119,3,0,0,146,116,0,119,0,7,0,94,24,159,160,0,11,9,0,0,17,6,0,0,111,24,0,0,150,116,0,119,0,204,255,34,120,146,2,120,120,46,0,3,163,159,160,41,164,146,2,3,121,163,164,3,164,159,162,85,121,164,0,32,164,2,0,120,164,39,0,0,15,2,0,3,133,159,162,16,130,161,15,125,123,130,161,15,0,0,0,94,132,159,160,135,164,9,0,133,132,123,0,0,128,132,0,1,148,0,0,3,164,159,160,41,163,148,2,3,125,164,163,25,126,148,1,3,163,159,160,41,164,126,2,94,127,163,164,135,163,9,0,128,127,123,0,3,129,128,123,85,125,129,0,13,140,126,146,120,140,4,0,0,128,127,0,0,148,126,0,119,0,241,255,13,122,15,123,120,122,11,0,4,124,15,123,82,26,121,0,0,15,124,0,0,133,26,0,119,0,226,255,1,164,0,0,134,163,0,0,64,188,0,0,142,2,3,61,99,155,164,159,32,134,155,1,121,134,12,0,41,163,99,1,0,135,163,0,43,163,61,31,0,136,163,0,41,163,61,1,0,137,163,0,0,29,137,0,20,163,136,135,0,66,163,0,1,156,0,0,119,0,25,0,26,138,155,33,1,163,31,0,16,163,163,102,1,164,0,0,125,4,163,164,61,0,0,0,1,164,31,0,16,164,164,102,125,18,164,61,99,0,0,0,1,164,31,0,16,164,164,102,125,19,164,138,102,0,0,0,22,164,4,19,0,29,164,0,1,164,32,0,4,164,164,19,24,164,4,164,22,163,18,19,20,164,164,163,0,66,164,0,1,156,1,0,119,0,1,0,39,164,29,1,0,28,164,0,3,30,142,2,4,164,27,2,3,164,0,164,48,164,30,164,8,185,0,0,0,61,28,0,0,99,66,0,0,142,30,0,0,155,156,0,119,0,228,254,0,20,66,0,0,21,28,0,0,141,30,0,0,154,156,0,119,0,5,0,1,20,0,0,1,21,1,0,0,141,0,0,1,154,1,0,1,163,0,0,134,164,0,0,64,188,0,0,141,2,3,21,20,154,163,159,32,31,154,1,32,32,21,1,32,33,20,0,19,164,32,31,19,164,33,164,121,164,4,0,137,159,0,0,139,0,0,0,119,0,5,0,0,36,21,0,0,39,20,0,0,143,141,0,0,157,154,0,34,34,157,2,120,34,67,0,41,164,39,2,0,48,164,0,43,164,36,30,0,49,164,0,26,50,157,2,41,164,36,1,0,51,164,0,41,164,50,2,94,52,159,164,1,164,0,0,3,163,52,2,4,164,164,163,3,53,143,164,26,54,157,1,2,163,0,0,254,255,255,127,19,163,51,163,41,165,49,31,20,163,163,165,40,163,163,3,20,165,49,48,43,165,165,1,1,166,1,0,134,164,0,0,64,188,0,0,53,2,3,163,165,54,166,159,1,164,0,0,4,164,164,2,3,56,143,164,2,166,0,0,254,255,255,127,19,166,51,166,41,165,49,31,20,166,166,165,40,166,166,3,41,166,166,1,39,166,166,1,20,165,49,48,43,165,165,1,41,165,165,1,38,163,49,1,20,165,165,163,1,163,1,0,134,164,0,0,64,188,0,0,56,2,3,166,165,50,163,159,2,164,0,0,254,255,255,127,19,164,51,164,41,163,49,31,20,164,164,163,40,164,164,3,41,164,164,1,39,164,164,1,0,36,164,0,20,164,49,48,43,164,164,1,41,164,164,1,38,163,49,1,20,164,164,163,0,39,164,0,0,143,56,0,0,157,50,0,119,0,189,255,26,35,36,1,32,164,35,0,121,164,4,0,1,47,32,0,1,158,56,0,119,0,71,0,38,164,35,1,32,164,164,0,121,164,18,0,0,12,35,0,1,151,0,0,25,37,151,1,43,164,12,1,0,38,164,0,38,164,38,1,32,164,164,0,121,164,4,0,0,12,38,0,0,151,37,0,119,0,248,255,32,164,37,0,121,164,3,0,1,158,51,0,119,0,4,0,0,44,37,0,119,0,2,0,1,158,51,0,32,164,158,51,121,164,38,0,1,158,0,0,32,40,39,0,121,40,4,0,1,47,64,0,1,158,56,0,119,0,42,0,38,164,39,1,0,41,164,0,32,164,41,0,121,164,4,0,0,13,39,0,1,152,0,0,119,0,6,0,1,7,0,0,0,58,36,0,0,62,39,0,1,65,0,0,119,0,30,0,25,42,152,1,43,164,13,1,0,43,164,0,38,164,43,1,32,164,164,0,121,164,4,0,0,13,43,0,0,152,42,0,119,0,248,255,0,153,152,0,119,0,1,0,32,164,42,0,121,164,6,0,1,7,0,0,0,58,36,0,0,62,39,0,1,65,0,0,119,0,12,0,25,44,153,33,1,164,31,0,16,45,164,44,121,45,4,0,0,47,44,0,1,158,56,0,119,0,5,0,0,7,44,0,0,58,36,0,0,62,39,0,0,65,44,0,32,164,158,56,121,164,7,0,1,158,0,0,26,46,47,32,0,7,46,0,0,58,39,0,1,62,0,0,0,65,47,0,24,164,58,7,0,57,164,0,1,164,32,0,4,59,164,7,22,164,62,59,0,60,164,0,24,164,62,7,0,63,164,0,3,64,65,157,1,164,0,0,4,164,164,2,3,22,143,164,32,164,63,0,20,163,60,57,32,163,163,1,32,165,64,1,19,163,163,165,19,164,164,163,120,164,7,0,20,164,60,57,0,36,164,0,0,39,63,0,0,143,22,0,0,157,64,0,119,0,80,255,137,159,0,0,139,0,0,0,140,8,172,0,0,0,0,0,2,169,0,0,0,1,0,0,1,167,0,0,136,170,0,0,0,168,170,0,136,170,0,0,1,171,208,2,3,170,170,171,137,170,0,0,1,170,200,1,3,166,168,170,1,170,228,0,3,149,168,170,0,148,168,0,85,148,0,0,1,170,0,0,4,34,170,1,33,35,3,1,33,60,4,0,20,170,60,35,0,71,170,0,121,71,202,0,41,170,5,2,3,82,7,170,82,93,82,0,1,170,0,0,4,104,170,93,3,115,0,104,38,170,2,3,135,126,8,0,170,115,0,0,34,137,126,1,121,137,7,0,0,10,0,0,0,18,5,0,0,24,6,0,1,152,1,0,1,167,18,0,119,0,190,0,0,13,0,0,0,22,5,0,0,25,6,0,0,56,115,0,0,75,4,0,1,157,1,0,0,163,3,0,32,36,25,0,1,170,1,0,15,47,170,22,19,170,36,47,0,162,170,0,121,162,30,0,3,52,13,34,26,53,22,2,41,170,53,2,3,54,7,170,82,55,54,0,38,170,2,3,135,57,8,0,170,52,56,0,1,170,255,255,15,58,170,57,121,58,5,0,0,11,13,0,0,19,22,0,0,154,157,0,119,0,162,0,3,164,55,1,1,170,0,0,4,32,170,164,3,59,13,32,38,170,2,3,135,61,8,0,170,59,56,0,1,170,255,255,15,62,170,61,121,62,5,0,0,11,13,0,0,19,22,0,0,154,157,0,119,0,148,0,25,63,157,1,41,170,157,2,3,64,148,170,85,64,56,0,26,65,163,1,32,66,65,0,121,66,4,0,1,89,32,0,1,167,15,0,119,0,78,0,38,170,65,1,0,67,170,0,32,68,67,0,121,68,21,0,0,16,65,0,1,159,0,0,25,69,159,1,43,170,16,1,0,70,170,0,38,170,70,1,0,72,170,0,32,73,72,0,121,73,4,0,0,16,70,0,0,159,69,0,119,0,247,255,0,26,69,0,119,0,1,0,32,74,26,0,121,74,3,0,1,167,10,0,119,0,4,0,0,86,26,0,119,0,2,0,1,167,10,0,32,170,167,10,121,170,41,0,1,167,0,0,32,76,75,0,121,76,4,0,1,89,64,0,1,167,15,0,119,0,45,0,38,170,75,1,0,77,170,0,32,78,77,0,121,78,4,0,0,17,75,0,1,160,0,0,119,0,6,0,1,9,0,0,0,91,163,0,0,95,75,0,1,99,0,0,119,0,33,0,25,79,160,1,43,170,17,1,0,80,170,0,38,170,80,1,0,81,170,0,32,83,81,0,121,83,4,0,0,17,80,0,0,160,79,0,119,0,247,255,0,27,79,0,0,161,160,0,119,0,1,0,25,84,161,33,32,85,27,0,121,85,6,0,1,9,0,0,0,91,163,0,0,95,75,0,1,99,0,0,119,0,12,0,0,86,84,0,1,170,31,0,16,87,170,86,121,87,4,0,0,89,86,0,1,167,15,0,119,0,5,0,0,9,86,0,0,91,163,0,0,95,75,0,0,99,86,0,32,170,167,15,121,170,7,0,1,167,0,0,26,88,89,32,0,9,88,0,0,91,75,0,1,95,0,0,0,99,89,0,24,170,91,9,0,90,170,0,1,170,32,0,4,92,170,9,22,170,95,92,0,94,170,0,20,170,94,90,0,96,170,0,24,170,95,9,0,97,170,0,3,98,99,22,33,100,96,1,33,101,97,0,20,170,101,100,0,102,170,0,120,102,5,0,0,11,56,0,0,19,98,0,0,154,63,0,119,0,33,0,82,28,148,0,41,170,98,2,3,103,7,170,82,105,103,0,1,170,0,0,4,106,170,105,3,107,56,106,38,170,2,3,135,108,8,0,170,107,28,0,34,109,108,1,121,109,7,0,0,10,56,0,0,18,98,0,1,24,0,0,0,152,63,0,1,167,18,0,119,0,15,0,0,14,56,0,0,22,98,0,1,25,0,0,0,56,107,0,0,75,97,0,0,157,63,0,0,163,96,0,0,13,14,0,119,0,80,255,0,10,0,0,0,18,5,0,0,24,6,0,1,152,1,0,1,167,18,0,32,170,167,18,121,170,9,0,32,110,24,0,121,110,5,0,0,11,10,0,0,19,18,0,0,154,152,0,119,0,3,0,137,168,0,0,139,0,0,0,34,111,154,2,120,111,38,0,41,170,154,2,3,112,148,170,85,112,166,0,32,113,1,0,120,113,33,0,0,21,1,0,0,127,166,0,16,124,169,21,125,116,124,169,21,0,0,0,82,125,148,0,135,170,9,0,127,125,116,0,0,122,125,0,1,156,0,0,41,170,156,2,3,118,148,170,25,119,156,1,41,170,119,2,3,120,148,170,82,121,120,0,135,170,9,0,122,121,116,0,3,123,122,116,85,118,123,0,13,151,119,154,120,151,4,0,0,122,121,0,0,156,119,0,119,0,242,255,13,114,21,116,120,114,6,0,4,117,21,116,82,31,112,0,0,21,117,0,0,127,31,0,119,0,227,255,85,149,11,0,1,170,1,0,15,128,170,19,121,128,101,0,0,15,19,0,0,23,11,0,0,134,11,0,1,158,1,0,3,129,23,34,26,130,15,2,41,170,130,2,3,131,7,170,82,132,131,0,3,165,132,1,1,170,0,0,4,33,170,165,3,133,23,33,38,170,2,3,135,135,8,0,170,134,133,0,1,170,255,255,15,136,170,135,121,136,9,0,38,170,2,3,135,138,8,0,170,134,129,0,1,170,255,255,15,139,170,138,121,139,3,0,0,153,158,0,119,0,29,0,38,170,2,3,135,140,8,0,170,133,129,0,1,170,255,255,15,141,170,140,25,142,158,1,41,170,158,2,3,143,149,170,121,141,6,0,85,143,133,0,26,144,15,1,0,8,133,0,0,12,144,0,119,0,4,0,85,143,129,0,0,8,129,0,0,12,130,0,1,170,1,0,15,145,170,12,120,145,3,0,0,153,142,0,119,0,7,0,82,29,149,0,0,15,12,0,0,23,8,0,0,134,29,0,0,158,142,0,119,0,206,255,34,146,153,2,121,146,3,0,0,51,166,0,119,0,43,0,41,170,153,2,3,147,149,170,85,147,166,0,32,37,1,0,121,37,3,0,0,51,166,0,119,0,36,0,0,20,1,0,0,50,166,0,16,48,169,20,125,39,48,169,20,0,0,0,82,49,149,0,135,170,9,0,50,49,39,0,0,45,49,0,1,155,0,0,41,170,155,2,3,41,149,170,25,42,155,1,41,170,42,2,3,43,149,170,82,44,43,0,135,170,9,0,45,44,39,0,3,46,45,39,85,41,46,0,13,150,42,153,120,150,4,0,0,45,44,0,0,155,42,0,119,0,242,255,13,38,20,39,121,38,3,0,0,51,166,0,119,0,7,0,4,40,20,39,82,30,147,0,0,20,40,0,0,50,30,0,119,0,225,255,0,51,166,0,137,168,0,0,139,0,0,0,140,5,75,0,0,0,0,0,0,5,0,0,0,6,1,0,0,7,6,0,0,8,2,0,0,9,3,0,0,10,9,0,32,69,7,0,121,69,27,0,33,11,4,0,32,69,10,0,121,69,11,0,121,11,5,0,9,69,5,8,85,4,69,0,1,70,0,0,109,4,4,70,1,68,0,0,7,67,5,8,129,68,0,0,139,67,0,0,119,0,14,0,120,11,5,0,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,38,70,0,255,85,4,70,0,38,69,1,0,109,4,4,69,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,32,12,10,0,32,69,8,0,121,69,83,0,121,12,11,0,33,69,4,0,121,69,5,0,9,69,7,8,85,4,69,0,1,70,0,0,109,4,4,70,1,68,0,0,7,67,7,8,129,68,0,0,139,67,0,0,32,70,5,0,121,70,11,0,33,70,4,0,121,70,5,0,1,70,0,0,85,4,70,0,9,69,7,10,109,4,4,69,1,68,0,0,7,67,7,10,129,68,0,0,139,67,0,0,26,13,10,1,19,69,13,10,32,69,69,0,121,69,18,0,33,69,4,0,121,69,8,0,38,69,0,255,39,69,69,0,85,4,69,0,19,70,13,7,38,71,1,0,20,70,70,71,109,4,4,70,1,68,0,0,134,70,0,0,60,57,1,0,10,0,0,0,24,70,7,70,0,67,70,0,129,68,0,0,139,67,0,0,135,14,10,0,10,0,0,0,135,70,10,0,7,0,0,0,4,15,14,70,37,70,15,30,121,70,15,0,25,16,15,1,1,70,31,0,4,17,70,15,0,36,16,0,22,70,7,17,24,69,5,16,20,70,70,69,0,35,70,0,24,70,7,16,0,34,70,0,1,33,0,0,22,70,5,17,0,32,70,0,119,0,139,0,32,70,4,0,121,70,5,0,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,38,70,0,255,39,70,70,0,85,4,70,0,38,69,1,0,20,69,6,69,109,4,4,69,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,119,0,122,0,120,12,43,0,135,27,10,0,10,0,0,0,135,69,10,0,7,0,0,0,4,28,27,69,37,69,28,31,121,69,20,0,25,29,28,1,1,69,31,0,4,30,69,28,26,69,28,31,42,69,69,31,0,31,69,0,0,36,29,0,24,69,5,29,19,69,69,31,22,70,7,30,20,69,69,70,0,35,69,0,24,69,7,29,19,69,69,31,0,34,69,0,1,33,0,0,22,69,5,30,0,32,69,0,119,0,95,0,32,69,4,0,121,69,5,0,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,38,69,0,255,39,69,69,0,85,4,69,0,38,70,1,0,20,70,6,70,109,4,4,70,1,68,0,0,1,67,0,0,129,68,0,0,139,67,0,0,26,18,8,1,19,70,18,8,33,70,70,0,121,70,44,0,135,70,10,0,8,0,0,0,25,20,70,33,135,70,10,0,7,0,0,0,4,21,20,70,1,70,64,0,4,22,70,21,1,70,32,0,4,23,70,21,42,70,23,31,0,24,70,0,26,25,21,32,42,70,25,31,0,26,70,0,0,36,21,0,26,70,23,1,42,70,70,31,24,69,7,25,19,70,70,69,22,69,7,23,24,71,5,21,20,69,69,71,19,69,69,26,20,70,70,69,0,35,70,0,24,70,7,21,19,70,26,70,0,34,70,0,22,70,5,22,19,70,70,24,0,33,70,0,22,70,7,22,24,69,5,25,20,70,70,69,19,70,70,24,22,69,5,23,26,71,21,33,42,71,71,31,19,69,69,71,20,70,70,69,0,32,70,0,119,0,32,0,33,70,4,0,121,70,5,0,19,70,18,5,85,4,70,0,1,69,0,0,109,4,4,69,32,69,8,1,121,69,10,0,38,69,1,0,20,69,6,69,0,68,69,0,38,69,0,255,39,69,69,0,0,67,69,0,129,68,0,0,139,67,0,0,119,0,15,0,134,19,0,0,60,57,1,0,8,0,0,0,24,69,7,19,39,69,69,0,0,68,69,0,1,69,32,0,4,69,69,19,22,69,7,69,24,70,5,19,20,69,69,70,0,67,69,0,129,68,0,0,139,67,0,0,32,69,36,0,121,69,8,0,0,63,32,0,0,62,33,0,0,61,34,0,0,60,35,0,1,59,0,0,1,58,0,0,119,0,89,0,38,69,2,255,39,69,69,0,0,37,69,0,38,69,3,0,20,69,9,69,0,38,69,0,1,69,255,255,1,70,255,255,134,39,0,0,44,60,1,0,37,38,69,70,128,70,0,0,0,40,70,0,0,46,32,0,0,45,33,0,0,44,34,0,0,43,35,0,0,42,36,0,1,41,0,0,43,70,45,31,41,69,46,1,20,70,70,69,0,47,70,0,41,70,45,1,20,70,41,70,0,48,70,0,41,70,43,1,43,69,46,31,20,70,70,69,39,70,70,0,0,49,70,0,43,70,43,31,41,69,44,1,20,70,70,69,0,50,70,0,134,70,0,0,136,59,1,0,39,40,49,50,128,70,0,0,0,51,70,0,42,70,51,31,34,71,51,0,1,72,255,255,1,73,0,0,125,69,71,72,73,0,0,0,41,69,69,1,20,70,70,69,0,52,70,0,38,70,52,1,0,53,70,0,19,70,52,37,34,73,51,0,1,72,255,255,1,71,0,0,125,69,73,72,71,0,0,0,42,69,69,31,34,72,51,0,1,73,255,255,1,74,0,0,125,71,72,73,74,0,0,0,41,71,71,1,20,69,69,71,19,69,69,38,134,54,0,0,136,59,1,0,49,50,70,69,0,55,54,0,128,69,0,0,0,56,69,0,26,57,42,1,32,69,57,0,120,69,8,0,0,46,47,0,0,45,48,0,0,44,56,0,0,43,55,0,0,42,57,0,0,41,53,0,119,0,194,255,0,63,47,0,0,62,48,0,0,61,56,0,0,60,55,0,1,59,0,0,0,58,53,0,0,64,62,0,1,65,0,0,20,69,63,65,0,66,69,0,33,69,4,0,121,69,4,0,39,69,60,0,85,4,69,0,109,4,4,61,39,69,64,0,43,69,69,31,41,70,66,1,20,69,69,70,41,70,65,1,43,71,64,31,20,70,70,71,38,70,70,0,20,69,69,70,20,69,69,59,0,68,69,0,41,69,64,1,1,70,0,0,43,70,70,31,20,69,69,70,38,69,69,254,20,69,69,58,0,67,69,0], eb + 40960);
  HEAPU8.set([129,68,0,0,139,67,0,0,140,2,105,0,0,0,0,0,1,100,0,0,136,102,0,0,0,101,102,0,136,102,0,0,1,103,128,0,3,102,102,103,137,102,0,0,25,99,101,112,25,98,101,96,25,97,101,80,25,93,101,64,25,92,101,48,25,96,101,32,25,2,101,16,0,3,101,0,25,14,0,8,25,25,14,4,82,36,25,0,25,47,36,8,82,58,47,0,25,69,58,8,82,80,69,0,85,1,80,0,41,102,80,2,0,89,102,0,135,4,11,0,89,0,0,0,1,102,0,0,13,5,4,102,121,5,5,0,1,103,0,6,134,102,0,0,44,58,1,0,103,0,0,0,34,6,80,1,121,6,5,0,1,103,56,6,134,102,0,0,44,58,1,0,103,0,0,0,25,7,69,4,25,8,92,12,1,91,0,0,82,9,7,0,41,102,91,2,3,10,9,102,82,11,10,0,25,12,11,8,25,13,12,4,82,15,13,0,25,16,15,8,82,17,16,0,25,18,17,4,82,19,18,0,32,20,19,3,120,20,3,0,1,100,8,0,119,0,179,0,25,21,17,8,0,22,21,0,0,23,22,0,82,24,23,0,25,26,22,4,0,27,26,0,82,28,27,0,134,102,0,0,196,60,1,0,2,0,0,0,82,102,2,0,85,96,102,0,106,103,2,4,109,96,4,103,106,102,2,8,109,96,8,102,106,103,2,12,109,96,12,103,82,103,2,0,85,92,103,0,106,102,2,4,109,92,4,102,106,103,2,8,109,92,8,103,106,102,2,12,109,92,12,102,82,29,13,0,25,30,29,20,82,31,30,0,25,32,31,4,82,33,32,0,32,102,33,2,121,102,80,0,25,34,31,8,82,35,34,0,32,37,35,2,120,37,3,0,1,100,10,0,119,0,140,0,25,38,34,4,82,39,38,0,82,40,39,0,25,41,39,4,82,42,41,0,25,43,40,4,82,44,43,0,32,102,44,3,121,102,16,0,25,45,40,8,0,46,45,0,0,48,46,0,82,49,48,0,25,50,46,4,0,51,50,0,82,52,51,0,77,102,49,0,61,103,0,0,0,0,128,79,76,104,52,0,65,103,103,104,63,53,102,103,58,94,53,0,119,0,10,0,32,103,44,4,121,103,6,0,25,54,40,8,86,55,54,0,58,56,55,0,58,94,56,0,119,0,3,0,1,100,14,0,119,0,107,0,25,57,42,4,82,59,57,0,32,60,59,3,121,60,16,0,25,61,42,8,0,62,61,0,0,63,62,0,82,64,63,0,25,65,62,4,0,66,65,0,82,67,66,0,77,103,64,0,61,102,0,0,0,0,128,79,76,104,67,0,65,102,102,104,63,68,103,102,58,95,68,0,119,0,10,0,82,70,43,0,32,71,70,4,120,71,3,0,1,100,19,0,119,0,83,0,25,72,42,8,86,73,72,0,58,74,73,0,58,95,74,0,134,102,0,0,40,52,1,0,3,94,95,0,82,102,3,0,85,92,102,0,106,103,3,4,109,92,4,103,106,102,3,8,109,92,8,102,1,102,1,0,85,8,102,0,119,0,5,0,32,102,33,7,120,102,3,0,1,100,21,0,119,0,63,0,82,75,13,0,25,76,75,44,82,77,76,0,25,78,77,4,82,79,78,0,32,81,79,5,120,81,3,0,1,100,24,0,119,0,54,0,25,82,77,8,25,83,82,4,82,84,83,0,78,85,84,0,82,102,92,0,85,93,102,0,106,103,92,4,109,93,4,103,106,102,92,8,109,93,8,102,106,103,92,12,109,93,12,103,82,103,96,0,85,97,103,0,106,102,96,4,109,97,4,102,106,103,96,8,109,97,8,103,106,102,96,12,109,97,12,102,82,102,96,0,85,98,102,0,106,103,96,4,109,98,4,103,106,102,96,8,109,98,8,102,106,103,96,12,109,98,12,103,82,103,96,0,85,99,103,0,106,102,96,4,109,99,4,102,106,103,96,8,109,99,8,103,106,102,96,12,109,99,12,102,59,102,1,0,59,103,1,0,134,86,0,0,248,235,0,0,24,93,97,98,99,102,103,85,80,0,0,0,41,103,91,2,3,87,4,103,85,87,86,0,25,88,91,1,13,90,88,80,121,90,3,0,1,100,25,0,119,0,3,0,0,91,88,0,119,0,64,255,32,103,100,8,121,103,6,0,1,102,72,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,40,0,32,103,100,10,121,103,6,0,1,102,96,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,33,0,32,103,100,14,121,103,6,0,1,102,136,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,26,0,32,103,100,19,121,103,6,0,1,102,168,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,19,0,32,103,100,21,121,103,6,0,1,102,200,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,12,0,32,103,100,24,121,103,6,0,1,102,224,6,134,103,0,0,44,58,1,0,102,0,0,0,119,0,5,0,32,103,100,25,121,103,3,0,137,101,0,0,139,4,0,0,1,103,0,0,139,103,0,0,140,1,112,0,0,0,0,0,1,108,0,0,136,110,0,0,0,109,110,0,136,110,0,0,25,110,110,64,137,110,0,0,25,94,109,48,25,78,109,40,25,1,109,32,25,2,109,24,25,79,109,16,25,13,109,8,0,24,109,0,25,35,0,12,82,46,35,0,1,110,0,0,15,57,110,46,121,57,95,0,25,68,0,44,1,77,0,0,59,81,0,0,82,75,68,0,41,110,77,2,3,76,75,110,82,3,76,0,25,4,3,28,82,96,4,0,25,5,96,112,82,6,5,0,1,110,0,0,13,7,6,110,121,7,3,0,58,82,81,0,119,0,70,0,0,8,5,0,0,12,6,0,58,83,81,0,0,97,96,0,1,110,0,0,13,14,12,110,121,14,3,0,58,84,83,0,119,0,48,0,25,15,97,96,58,85,83,0,0,101,12,0,82,16,15,0,25,17,101,96,82,18,17,0,15,19,18,16,121,19,6,0,134,110,0,0,180,58,1,0,1,101,97,0,0,93,1,0,119,0,5,0,134,110,0,0,180,58,1,0,2,101,97,0,0,93,2,0,0,20,93,0,0,21,20,0,82,22,21,0,25,23,20,4,0,25,23,0,82,26,25,0,0,27,78,0,0,28,27,0,85,28,22,0,25,29,27,4,0,30,29,0,85,30,26,0,82,110,78,0,85,94,110,0,106,111,78,4,109,94,4,111,134,31,0,0,100,26,1,0,94,0,0,0,63,32,85,31,25,33,101,112,82,34,33,0,1,111,0,0,13,36,34,111,121,36,3,0,58,84,32,0,119,0,4,0,58,85,32,0,0,101,34,0,119,0,213,255,82,95,8,0,25,9,95,112,82,10,9,0,1,111,0,0,13,11,10,111,121,11,3,0,58,82,84,0,119,0,6,0,0,8,9,0,0,12,10,0,58,83,84,0,0,97,95,0,119,0,192,255,25,37,77,1,82,38,35,0,15,39,37,38,121,39,4,0,0,77,37,0,58,81,82,0,119,0,168,255,58,80,82,0,119,0,2,0,59,80,0,0,25,40,0,56,82,106,40,0,1,111,0,0,13,41,106,111,121,41,5,0,58,86,80,0,137,109,0,0,139,86,0,0,119,0,3,0,58,87,80,0,0,107,106,0,82,42,107,0,25,43,42,28,82,99,43,0,1,111,0,0,13,44,99,111,121,44,3,0,58,88,87,0,119,0,69,0,25,45,107,4,58,89,87,0,0,100,99,0,82,47,45,0,25,48,47,28,82,103,48,0,1,111,0,0,13,49,103,111,121,49,3,0,58,90,89,0,119,0,48,0,25,50,100,96,58,91,89,0,0,104,103,0,82,51,50,0,25,52,104,96,82,53,52,0,15,54,53,51,121,54,6,0,134,111,0,0,180,58,1,0,13,104,100,0,0,92,13,0,119,0,5,0,134,111,0,0,180,58,1,0,24,100,104,0,0,92,24,0,0,55,92,0,0,56,55,0,82,58,56,0,25,59,55,4,0,60,59,0,82,61,60,0,0,62,79,0,0,63,62,0,85,63,58,0,25,64,62,4,0,65,64,0,85,65,61,0,82,111,79,0,85,94,111,0,106,110,79,4,109,94,4,110,134,66,0,0,100,26,1,0,94,0,0,0,63,67,91,66,25,69,104,112,82,102,69,0,1,110,0,0,13,70,102,110,121,70,3,0,58,90,67,0,119,0,4,0,58,91,67,0,0,104,102,0,119,0,213,255,25,71,100,112,82,98,71,0,1,110,0,0,13,72,98,110,121,72,3,0,58,88,90,0,119,0,4,0,58,89,90,0,0,100,98,0,119,0,192,255,25,73,107,8,82,105,73,0,1,110,0,0,13,74,105,110,121,74,3,0,58,86,88,0,119,0,4,0,58,87,88,0,0,107,105,0,119,0,171,255,137,109,0,0,139,86,0,0,140,7,147,0,0,0,0,0,1,143,0,0,136,145,0,0,0,144,145,0,71,10,1,3,126,11,10,1,3,0,0,0,73,22,1,3,126,33,22,1,3,0,0,0,38,145,4,1,135,44,12,0,145,2,0,0,58,55,5,0,58,103,11,0,58,108,33,0,59,110,0,0,59,112,0,0,58,122,44,0,58,124,44,0,58,126,44,0,1,129,1,0,58,135,2,0,58,137,2,0,58,140,2,0,63,66,108,103,61,145,0,0,0,0,0,63,65,77,66,145,58,88,140,0,135,114,13,0,140,0,0,0,58,99,114,0,65,12,55,99,62,145,0,0,187,189,215,217,223,124,219,61,63,13,12,145,58,14,13,0,59,145,2,0,65,15,14,145,64,16,140,77,135,115,13,0,16,0,0,0,58,17,115,0,58,18,15,0,64,19,108,103,58,20,19,0,61,145,0,0,0,0,0,63,65,21,20,145,64,23,18,21,72,145,17,23,12,24,145,0,120,24,5,0,58,127,126,0,58,141,140,0,1,143,20,0,119,0,197,0,135,116,13,0,112,0,0,0,73,25,116,14,121,25,83,0,58,26,112,0,64,27,140,137,64,28,126,122,65,29,28,27,64,30,140,135,64,31,126,124,65,32,31,30,65,34,30,32,65,35,27,29,64,36,34,35,64,37,32,29,59,145,2,0,65,38,37,145,59,145,0,0,73,39,38,145,68,40,36,0,126,134,39,40,36,0,0,0,135,119,13,0,38,0,0,0,135,120,13,0,134,0,0,0,58,41,120,0,58,42,119,0,61,145,0,0,0,0,0,63,65,43,42,145,65,45,26,43,135,46,13,0,45,0,0,0,74,145,41,46,12,47,145,0,121,47,36,0,64,48,103,140,65,49,48,119,72,145,134,49,12,50,145,0,121,50,31,0,64,51,108,140,65,52,51,119,74,145,134,52,12,53,145,0,121,53,26,0,66,60,134,119,63,61,140,60,64,62,61,103,71,63,62,15,64,64,108,61,71,65,64,15,20,145,63,65,0,130,145,0,120,130,4,0,58,111,60,0,58,113,110,0,119,0,41,0,64,67,77,140,59,145,0,0,73,68,67,145,135,121,13,0,14,0,0,0,58,69,121,0,68,70,69,0,126,71,68,69,70,0,0,0,58,72,71,0,58,111,72,0,58,113,110,0,119,0,28,0,74,145,140,77,12,54,145,0,126,106,54,108,103,0,0,0,64,56,106,140,58,57,56,0,62,145,0,0,156,197,139,133,33,114,216,63,65,58,57,145,58,59,58,0,58,111,59,0,58,113,56,0,119,0,14,0,74,145,140,77,12,73,145,0,126,107,73,108,103,0,0,0,64,74,107,140,58,75,74,0,62,145,0,0,156,197,139,133,33,114,216,63,65,76,75,145,58,78,76,0,58,111,78,0,58,113,74,0,135,117,13,0,111,0,0,0,74,145,117,14,12,79,145,0,121,79,12,0,59,145,0,0,73,82,111,145,135,118,13,0,14,0,0,0,58,83,118,0,68,84,83,0,126,85,82,83,84,0,0,0,63,86,88,85,58,89,86,0,119,0,4,0,63,80,140,111,58,81,80,0,58,89,81,0,58,87,89,0,38,145,4,1,135,90,12,0,145,87,0,0,72,145,90,126,12,91,145,0,121,91,40,0,71,93,87,140,126,105,93,108,87,0,0,0,126,7,93,87,103,0,0,0,72,94,90,124,69,95,137,140,20,145,95,94,0,131,145,0,121,131,10,0,58,104,7,0,58,109,105,0,58,123,124,0,58,125,90,0,58,128,126,0,58,136,137,0,58,138,87,0,58,142,140,0,119,0,35,0,72,96,90,122,69,97,135,140,20,145,97,96,0,132,145,0,69,98,135,137,20,145,98,132,0,133,145,0,126,8,133,90,122,0,0,0,126,9,133,87,135,0,0,0,58,104,7,0,58,109,105,0,58,123,8,0,58,125,124,0,58,128,126,0,58,136,9,0,58,138,137,0,58,142,140,0,119,0,15,0,74,145,87,140,12,92,145,0,126,139,92,140,108,0,0,0,126,102,92,103,140,0,0,0,58,104,102,0,58,109,139,0,58,123,124,0,58,125,126,0,58,128,90,0,58,136,137,0,58,138,140,0,58,142,87,0,25,100,129,1,1,145,201,0,15,101,100,145,121,101,13,0,58,103,104,0,58,108,109,0,58,110,111,0,58,112,113,0,58,122,123,0,58,124,125,0,58,126,128,0,0,129,100,0,58,135,136,0,58,137,138,0,58,140,142,0,119,0,29,255,1,143,19,0,119,0,1,0,32,145,143,19,121,145,6,0,1,146,120,0,134,145,0,0,44,58,1,0,146,0,0,0,119,0,5,0,32,145,143,20,121,145,3,0,89,6,141,0,139,127,0,0,59,145,0,0,139,145,0,0,140,4,133,0,0,0,0,0,1,129,0,0,136,131,0,0,0,130,131,0,82,4,0,0,41,131,4,3,0,5,131,0,135,28,11,0,5,0,0,0,25,39,0,4,82,50,39,0,41,131,50,3,0,61,131,0,135,72,11,0,61,0,0,0,82,83,0,0,41,131,83,1,0,94,131,0,25,105,0,68,82,6,105,0,38,132,6,3,135,131,14,0,132,0,0,0,25,17,0,72,82,20,17,0,38,132,20,3,135,131,14,0,132,0,0,0,25,21,0,24,88,22,21,0,1,131,0,0,15,23,131,83,121,23,33,0,25,24,0,32,82,25,24,0,1,125,0,0,28,131,125,2,38,131,131,255,0,31,131,0,41,131,31,2,3,32,25,131,82,33,32,0,25,34,33,48,88,35,34,0,68,36,35,0,25,37,33,64,89,37,36,0,25,38,33,52,88,40,38,0,68,41,40,0,25,42,33,68,89,42,41,0,82,43,37,0,25,44,33,80,85,44,43,0,85,34,43,0,82,45,42,0,25,46,33,84,85,46,45,0,85,38,45,0,25,47,125,2,15,48,47,94,121,48,3,0,0,125,47,0,119,0,228,255,25,26,0,8,58,27,1,0,25,29,0,32,25,30,0,32,58,118,22,0,1,128,0,0,82,49,26,0,27,51,49,12,135,52,11,0,51,0,0,0,134,131,0,0,180,240,0,0,0,28,72,52,134,131,0,0,36,49,1,0,28,72,52,0,135,131,15,0,52,0,0,0,85,2,128,0,134,131,0,0,84,248,0,0,0,3,0,0,88,53,3,0,64,54,53,118,135,119,13,0,54,0,0,0,58,55,119,0,59,131,2,0,65,56,55,131,135,120,13,0,53,0,0,0,58,57,120,0,135,121,13,0,118,0,0,0,58,58,121,0,63,59,57,58,62,131,0,0,187,189,215,217,223,124,219,61,63,60,59,131,65,62,27,60,72,131,56,62,12,63,131,0,120,63,3,0,1,129,6,0,119,0,111,0,82,64,105,0,38,132,64,3,135,131,14,0,132,0,0,0,82,65,17,0,38,132,65,3,135,131,14,0,132,0,0,0,88,66,21,0,82,67,0,0,1,131,0,0,15,68,131,67,121,68,37,0,82,69,30,0,82,70,0,0,59,117,0,0,59,124,0,0,1,126,0,0,41,131,126,2,3,71,69,131,82,73,71,0,25,74,73,64,88,75,74,0,65,76,75,75,63,77,124,76,25,78,73,68,88,79,78,0,65,80,79,79,63,81,77,80,25,82,73,48,88,84,82,0,63,85,75,84,65,86,84,85,63,87,117,86,25,88,73,52,88,89,88,0,63,90,79,89,65,91,89,90,63,92,87,91,25,93,126,1,15,95,93,70,121,95,5,0,58,117,92,0,58,124,81,0,0,126,93,0,119,0,229,255,58,116,92,0,58,123,81,0,119,0,3,0,59,116,0,0,59,123,0,0,135,122,13,0,123,0,0,0,58,96,122,0,62,131,0,0,187,189,215,217,223,124,219,61,71,97,96,131,121,97,3,0,1,129,11,0,119,0,50,0,66,98,116,123,82,99,0,0,1,131,0,0,15,100,131,99,121,100,36,0,82,101,29,0,82,102,0,0,1,127,0,0,41,131,127,2,3,103,101,131,82,104,103,0,25,106,104,48,88,107,106,0,68,108,107,0,25,109,104,64,89,109,108,0,25,110,104,52,88,111,110,0,68,112,111,0,25,113,104,68,89,113,112,0,88,114,109,0,25,115,104,80,88,7,115,0,65,8,98,7,63,9,114,8,89,115,9,0,89,106,9,0,88,10,113,0,25,11,104,84,88,12,11,0,65,13,98,12,63,14,10,13,89,11,14,0,89,110,14,0,25,15,127,1,15,16,15,102,121,16,3,0,0,127,15,0,119,0,225,255,25,18,128,1,1,131,200,0,15,19,18,131,121,19,4,0,58,118,66,0,0,128,18,0,119,0,109,255,1,129,16,0,119,0,1,0,32,131,129,6,121,131,7,0,135,131,15,0,28,0,0,0,135,131,15,0,72,0,0,0,139,0,0,0,119,0,16,0,32,131,129,11,121,131,7,0,135,131,15,0,28,0,0,0,135,131,15,0,72,0,0,0,139,0,0,0,119,0,8,0,32,131,129,16,121,131,6,0,135,131,15,0,28,0,0,0,135,131,15,0,72,0,0,0,139,0,0,0,139,0,0,0,140,2,115,0,0,0,0,0,1,111,0,0,136,113,0,0,0,112,113,0,136,113,0,0,1,114,128,0,3,113,113,114,137,113,0,0,25,2,112,112,25,105,112,96,25,104,112,80,25,106,112,64,25,3,112,48,25,4,112,32,25,15,112,16,0,26,112,0,25,37,1,4,82,48,37,0,82,59,1,0,25,70,1,8,82,81,70,0,88,92,48,0,88,5,59,0,64,6,92,5,25,7,48,4,88,8,7,0,25,9,59,4,88,10,9,0,64,11,8,10,88,12,81,0,64,13,12,5,25,14,81,4,88,16,14,0,64,17,16,10,134,18,0,0,252,52,1,0,6,13,0,0,32,19,18,0,121,19,4,0,58,107,6,0,58,108,13,0,119,0,15,0,58,20,6,0,62,113,0,0,123,20,174,71,225,122,132,63,63,21,20,113,58,22,21,0,58,23,13,0,62,113,0,0,123,20,174,71,225,122,132,191,63,24,23,113,58,25,24,0,58,107,22,0,58,108,25,0,134,27,0,0,252,52,1,0,11,17,0,0,32,28,27,0,121,28,4,0,58,109,11,0,58,110,17,0,119,0,15,0,58,29,11,0,62,113,0,0,123,20,174,71,225,122,132,63,63,30,29,113,58,31,30,0,58,32,17,0,62,113,0,0,123,20,174,71,225,122,132,191,63,33,32,113,58,34,33,0,58,109,31,0,58,110,34,0,134,113,0,0,40,52,1,0,3,107,109,0,82,113,3,0,85,104,113,0,106,114,3,4,109,104,4,114,106,113,3,8,109,104,8,113,106,114,3,12,109,104,12,114,134,114,0,0,40,52,1,0,4,108,110,0,82,114,4,0,85,106,114,0,106,113,4,4,109,106,4,113,106,114,4,8,109,106,8,114,106,113,4,12,109,106,12,113,25,35,59,100,82,36,35,0,26,38,36,1,76,113,38,0,58,39,113,0,62,113,0,0,24,45,68,84,251,33,25,64,66,40,113,39,58,41,40,0,65,42,108,109,65,43,107,110,64,44,42,43,64,45,43,42,82,113,104,0,85,105,113,0,106,114,104,4,109,105,4,114,106,113,104,8,109,105,8,113,106,114,104,12,109,105,12,114,82,114,106,0,85,2,114,0,106,113,106,4,109,2,4,113,106,114,106,8,109,2,8,114,106,113,106,12,109,2,12,113,134,46,0,0,212,14,1,0,105,2,0,0,64,47,41,46,25,49,106,8,88,50,49,0,65,100,107,107,65,101,109,109,63,51,100,101,65,52,51,50,25,53,104,8,88,54,53,0,65,102,108,108,65,103,110,110,63,55,102,103,65,56,55,54,65,57,45,45,65,58,55,51,58,60,58,0,62,113,0,0,123,20,174,71,225,122,132,63,71,61,60,113,121,61,5,0,61,114,0,0,10,215,35,60,58,113,114,0,119,0,2,0,58,113,58,0,58,99,113,0,66,62,57,99,59,113,0,0,71,63,62,113,121,63,6,0,1,114,8,0,134,113,0,0,44,58,1,0,114,0,0,0,119,0,105,0,135,64,16,0,62,0,0,0,59,113,2,0,65,65,109,113,65,66,65,44,59,113,2,0,65,67,107,113,65,68,67,45,59,113,2,0,65,69,110,113,65,71,69,45,59,113,2,0,65,72,108,113,65,73,72,44,65,74,52,64,65,75,56,64,58,76,74,0,62,113,0,0,123,20,174,71,225,122,132,63,71,77,76,113,121,77,5,0,61,114,0,0,10,215,35,60,58,113,114,0,119,0,2,0,58,113,74,0,58,97,113,0,58,78,75,0,62,113,0,0,123,20,174,71,225,122,132,63,71,79,78,113,121,79,5,0,61,114,0,0,10,215,35,60,58,113,114,0,119,0,2,0,58,113,75,0,58,98,113,0,65,80,66,47,68,82,80,0,66,83,82,97,65,84,68,47,68,85,84,0,66,86,85,97,65,87,71,47,68,88,87,0,66,89,88,98,65,90,73,47,68,91,90,0,66,93,91,98,134,94,0,0,196,53,1,0,1,0,0,0,134,95,0,0,164,54,1,0,83,86,0,0,134,96,0,0,164,54,1,0,89,93,0,0,82,113,95,0,85,2,113,0,106,114,95,4,109,2,4,114,106,113,95,8,109,2,8,113,106,114,95,12,109,2,12,114,134,114,0,0,188,57,1,0,15,2,94,0,82,114,15,0,85,95,114,0,106,113,15,4,109,95,4,113,106,114,15,8,109,95,8,114,106,113,15,12,109,95,12,113,82,113,96,0,85,2,113,0,106,114,96,4,109,2,4,114,106,113,96,8,109,2,8,113,106,114,96,12,109,2,12,114,134,114,0,0,188,57,1,0,26,2,94,0,82,114,26,0,85,96,114,0,106,113,26,4,109,96,4,113,106,114,26,8,109,96,8,114,106,113,26,12,109,96,12,113,134,113,0,0,180,58,1,0,0,95,96,0,137,112,0,0,139,0,0,0,139,0,0,0,140,8,126,0,0,0,0,0,1,122,0,0,136,124,0,0,0,123,124,0,88,12,1,0,38,124,7,1,135,13,12,0,124,12,0,0,89,4,13,0,88,30,2,0,38,124,7,1,135,41,12,0,124,30,0,0,89,5,41,0,88,52,4,0,73,63,41,52,121,63,9,0,82,74,1,0,82,85,2,0,85,1,85,0,85,2,74,0,82,96,5,0,82,107,4,0,85,5,107,0,85,4,96,0,88,14,2,0,58,21,14,0,88,22,1,0,64,23,14,22,58,24,23,0,62,124,0,0,153,14,157,158,119,227,249,63,65,25,24,124,63,26,21,25,58,27,26,0,89,3,27,0,38,124,7,1,135,28,12,0,124,27,0,0,89,6,28,0,88,29,5,0,73,31,29,28,120,31,2,0,139,0,0,0,58,36,29,0,58,120,28,0,88,32,2,0,88,33,1,0,64,34,32,33,64,35,36,120,65,37,35,34,88,38,3,0,64,39,32,38,88,40,4,0,64,42,36,40,65,43,39,42,58,44,32,0,65,45,39,43,65,46,34,37,64,47,45,46,58,48,47,0,64,49,43,37,59,124,0,0,73,50,49,124,135,118,13,0,49,0,0,0,58,51,118,0,62,124,0,0,35,66,146,12,161,156,199,59,73,53,51,124,121,53,3,0,58,124,51,0,119,0,5,0,62,125,0,0,35,66,146,12,161,156,199,59,58,124,125,0,58,54,124,0,135,55,13,0,54,0,0,0,68,56,55,0,126,57,50,55,56,0,0,0,59,124,2,0,65,58,57,124,66,59,48,58,64,60,44,59,58,61,60,0,64,62,38,32,58,64,62,0,59,124,100,0,65,65,64,124,63,66,44,65,58,67,66,0,64,68,32,61,64,69,61,38,65,70,68,69,59,124,0,0,73,71,70,124,121,71,35,0,38,124,7,1,135,72,12,0,124,61,0,0,88,73,6,0,71,75,72,73,121,75,5,0,58,8,61,0,58,10,72,0,1,122,7,0,119,0,105,0,88,78,5,0,73,79,72,78,121,79,5,0,58,9,61,0,58,11,72,0,1,122,9,0,119,0,98,0,88,80,3,0,58,81,80,0,88,82,2,0,64,83,80,82,58,84,83,0,62,124,0,0,153,14,157,158,119,227,249,63,65,86,84,124,63,87,81,86,58,88,87,0,38,124,7,1,135,89,12,0,124,88,0,0,58,119,89,0,58,121,88,0,119,0,63,0,64,90,38,61,64,91,61,67,65,92,90,91,59,124,0,0,73,93,92,124,121,93,32,0,38,124,7,1,135,94,12,0,124,61,0,0,88,95,6,0,71,97,94,95,120,97,4,0,58,119,94,0,58,121,61,0,119,0,48,0,82,98,3,0,85,2,98,0,89,3,61,0,58,99,61,0,88,100,2,0,64,101,61,100,58,102,101,0,62,124,0,0,153,14,157,158,119,227,249,63,65,103,102,124,63,104,99,103,58,105,104,0,82,106,6,0,85,5,106,0,89,6,94,0,38,124,7,1,135,108,12,0,124,105,0,0,58,119,108,0,58,121,105,0,119,0,26,0,64,109,67,38,65,110,109,91,59,124,0,0,74,124,110,124,12,111,124,0,121,111,14,0,58,113,38,0,62,124,0,0,153,14,157,158,119,227,249,63,65,114,64,124,63,115,113,114,58,116,115,0,38,124,7,1,135,117,12,0,124,116,0,0,58,119,117,0,58,121,116,0,119,0,7,0,38,124,7,1,135,112,12,0,124,67,0,0,58,119,112,0,58,121,67,0,119,0,1,0,82,15,2,0,85,1,15,0,82,16,3,0,85,2,16,0,89,3,121,0,82,17,5,0,85,4,17,0,82,18,6,0,85,5,18,0,89,6,119,0,88,19,5,0,73,20,19,119,121,20,4,0,58,36,19,0,58,120,119,0,119,0,90,255,1,122,18,0,119,0,1,0,32,124,122,7,121,124,9,0,82,76,2,0,85,1,76,0,89,2,8,0,82,77,5,0,85,4,77,0,89,5,10,0,139,0,0,0,119,0,10,0,32,124,122,9,121,124,5,0,89,3,9,0,89,6,11,0,139,0,0,0,119,0,4,0,32,124,122,18,121,124,2,0,139,0,0,0,139,0,0,0,140,2,106,0,0,0,0,0,1,102,0,0,136,104,0,0,0,103,104,0,136,104,0,0,25,104,104,32,137,104,0,0,25,97,103,16,0,96,103,0,82,3,1,0,25,4,1,4,82,15,4,0,25,26,3,104,82,37,26,0,25,48,15,96,82,59,48,0,41,104,59,2,3,70,37,104,82,81,70,0,32,87,81,0,121,87,4,0,59,105,10,0,58,104,105,0,119,0,3,0,59,105,5,0,58,104,105,0,58,2,104,0,88,5,15,0,88,6,3,0,59,104,100,0,63,7,6,104,71,8,5,7,71,9,6,5,19,104,9,8,0,98,104,0,121,98,26,0,25,10,3,36,88,11,10,0,25,12,15,36,88,13,12,0,134,95,0,0,88,41,1,0,11,13,0,0,58,14,95,0,25,16,3,20,88,17,16,0,25,18,15,20,88,19,18,0,134,91,0,0,32,42,1,0,17,19,0,0,58,20,91,0,64,21,14,20,59,104,0,0,134,22,0,0,76,28,1,0,104,21,0,0,58,23,22,0,68,24,23,0,89,96,24,0,119,0,35,0,71,25,5,6,59,104,100,0,63,27,5,104,71,28,6,27,19,104,25,28,0,100,104,0,121,100,25,0,25,29,3,36,88,30,29,0,25,31,15,36,88,32,31,0,134,94,0,0,88,41,1,0,30,32,0,0,58,33,94,0,25,34,3,20,88,35,34,0,25,36,15,20,88,38,36,0,134,90,0,0,32,42,1,0,35,38,0,0,58,39,90,0,64,40,33,39,59,104,0,0,134,41,0,0,76,28,1,0,104,40,0,0,58,42,41,0,89,96,42,0,119,0,4,0,59,104,0,0,89,96,104,0,119,0,1,0,25,43,15,4,88,44,43,0,25,45,3,4,88,46,45,0,59,104,100,0,63,47,46,104,71,49,44,47,71,50,46,44,19,104,50,49,0,101,104,0,121,101,27,0,25,51,3,32,88,52,51,0,25,53,15,32,88,54,53,0,134,93,0,0,88,41,1,0,52,54,0,0,58,55,93,0,25,56,3,16,88,57,56,0,25,58,15,16,88,60,58,0,134,89,0,0,32,42,1,0,57,60,0,0,58,61,89,0,64,62,55,61,59,104,0,0,134,63,0,0,76,28,1,0,104,62,0,0,58,64,63,0,68,65,64,0,25,66,96,4,89,66,65,0,119,0,37,0,71,67,44,46,59,104,100,0,63,68,44,104,71,69,46,68,19,104,67,69,0,99,104,0,121,99,26,0,25,71,3,32,88,72,71,0,25,73,15,32,88,74,73,0,134,92,0,0,88,41,1,0,72,74,0,0,58,75,92,0,25,76,3,16,88,77,76,0,25,78,15,16,88,79,78,0,134,88,0,0,32,42,1,0,77,79,0,0,58,80,88,0,64,82,75,80,59,104,0,0,134,83,0,0,76,28,1,0,104,82,0,0,58,84,83,0,25,85,96,4,89,85,84,0,119,0,5,0,25,86,96,4,59,104,0,0,89,86,104,0,119,0,1,0,82,104,96,0,85,97,104,0,106,105,96,4,109,97,4,105,106,104,96,8,109,97,8,104,106,105,96,12,109,97,12,105,134,105,0,0,188,57,1,0,0,97,2,0,137,103,0,0,139,0,0,0,140,4,38,0,0,0,0,0,1,34,0,0,136,36,0,0,0,35,36,0,136,36,0,0,1,37,128,0,3,36,36,37,137,36,0,0,25,6,35,112,25,5,35,96,25,30,35,80,25,31,35,64,25,7,35,48,25,8,35,32,25,19,35,16,0,23,35,0,25,24,1,24,82,36,24,0,85,5,36,0,106,37,24,4,109,5,4,37,106,36,24,8,109,5,8,36,106,37,24,12,109,5,12,37,82,37,2,0,85,6,37,0,106,36,2,4,109,6,4,36,106,37,2,8,109,6,8,37,106,36,2,12,109,6,12,36,134,36,0,0,116,52,1,0,7,5,6,0,82,36,7,0,85,30,36,0,106,37,7,4,109,30,4,37,106,36,7,8,109,30,8,36,106,37,7,12,109,30,12,37,82,37,24,0,85,5,37,0,106,36,24,4,109,5,4,36,106,37,24,8,109,5,8,37,106,36,24,12,109,5,12,36,82,36,3,0,85,6,36,0,106,37,3,4,109,6,4,37,106,36,3,8,109,6,8,36,106,37,3,12,109,6,12,37,134,37,0,0,116,52,1,0,8,5,6,0,82,37,8,0,85,31,37,0,106,36,8,4,109,31,4,36,106,37,8,8,109,31,8,37,106,36,8,12,109,31,12,36,82,36,30,0,85,6,36,0,106,37,30,4,109,6,4,37,106,36,30,8,109,6,8,36,106,37,30,12,109,6,12,37,134,25,0,0,80,40,1,0,6,0,0,0,82,37,31,0,85,6,37,0,106,36,31,4,109,6,4,36,106,37,31,8,109,6,8,37,106,36,31,12,109,6,12,36,134,26,0,0,80,40,1,0,6,0,0,0,59,36,0,0,134,27,0,0,24,59,1,0,25,36,0,0,32,28,27,0,121,28,16,0,59,36,0,0,134,29,0,0,24,59,1,0,26,36,0,0,32,9,29,0,121,9,3,0,58,36,26,0,119,0,4,0,61,37,0,0,10,215,35,60,58,36,37,0,58,4,36,0,58,32,25,0,58,33,4,0,119,0,4,0,61,32,0,0,10,215,35,60,58,33,26,0,88,10,30,0,66,11,10,32,25,12,30,4,88,13,12,0,66,14,13,32,88,15,31,0,66,16,15,33,25,17,31,4,88,18,17,0,66,20,18,33,134,21,0,0,164,54,1,0,11,14,0,0,134,22,0,0,164,54,1,0,16,20,0,0,82,36,21,0,85,6,36,0,106,37,21,4,109,6,4,37,106,36,21,8,109,6,8,36,106,37,21,12,109,6,12,37,59,36,1,0,134,37,0,0,188,57,1,0,19,6,36,0,82,37,19,0,85,21,37,0,106,36,19,4,109,21,4,36,106,37,19,8,109,21,8,37,106,36,19,12,109,21,12,36,82,36,22,0,85,6,36,0,106,37,22,4,109,6,4,37,106,36,22,8,109,6,8,36,106,37,22,12,109,6,12,37,59,36,1,0,134,37,0,0,188,57,1,0,23,6,36,0,82,37,23,0,85,22,37,0,106,36,23,4,109,22,4,36,106,37,23,8,109,22,8,37,106,36,23,12,109,22,12,36,134,36,0,0,180,58,1,0,0,21,22,0,137,35,0,0,139,0,0,0,140,3,66,0,0,0,0,0,2,61,0,0,128,128,128,128,2,62,0,0,255,254,254,254,2,63,0,0,255,0,0,0,1,59,0,0,136,64,0,0,0,60,64,0,19,64,1,63,0,12,64,0,0,13,0,0,38,64,13,3,0,24,64,0,33,35,24,0,33,43,2,0,19,64,43,35,0,50,64,0,121,50,34,0,19,64,1,63,0,44,64,0,0,5,2,0,0,53,0,0,78,45,53,0,41,64,45,24,42,64,64,24,41,65,44,24,42,65,65,24,13,46,64,65,121,46,5,0,0,4,5,0,0,52,53,0,1,59,6,0,119,0,23,0,25,47,53,1,26,48,5,1,0,14,47,0,38,65,14,3,0,15,65,0,33,16,15,0,33,17,48,0,19,65,17,16,0,49,65,0,121,49,4,0,0,5,48,0,0,53,47,0,119,0,233,255,0,3,48,0,0,11,17,0,0,51,47,0,1,59,5,0,119,0,5,0,0,3,2,0,0,11,43,0,0,51,0,0,1,59,5,0,32,65,59,5,121,65,8,0,121,11,5,0,0,4,3,0,0,52,51,0,1,59,6,0,119,0,3,0,1,10,0,0,0,55,51,0,32,65,59,6,121,65,85,0,78,18,52,0,19,65,1,63,0,19,65,0,41,65,18,24,42,65,65,24,41,64,19,24,42,64,64,24,13,20,65,64,121,20,4,0,0,10,4,0,0,55,52,0,119,0,73,0,2,64,0,0,1,1,1,1,5,21,12,64,1,64,3,0,16,22,64,4,121,22,35,0,0,7,4,0,0,57,52,0,82,23,57,0,21,64,23,21,0,25,64,0,2,64,0,0,1,1,1,1,4,26,25,64,19,64,25,61,0,27,64,0,21,64,27,61,0,28,64,0,19,64,28,26,0,29,64,0,32,30,29,0,120,30,4,0,0,8,7,0,0,58,57,0,119,0,13,0,25,31,57,4,26,32,7,4,1,64,3,0,16,33,64,32,121,33,4,0,0,7,32,0,0,57,31,0,119,0,232,255,0,6,32,0,0,56,31,0,1,59,11,0,119,0,7,0,0,9,8,0,0,54,58,0,119,0,4,0,0,6,4,0,0,56,52,0,1,59,11,0,32,64,59,11,121,64,8,0,32,34,6,0,121,34,4,0,1,10,0,0,0,55,56,0,119,0,23,0,0,9,6,0,0,54,56,0,78,36,54,0,41,64,36,24,42,64,64,24,41,65,19,24,42,65,65,24,13,37,64,65,121,37,4,0,0,10,9,0,0,55,54,0,119,0,11,0,25,38,54,1,26,39,9,1,32,40,39,0,121,40,4,0,1,10,0,0,0,55,38,0,119,0,4,0,0,9,39,0,0,54,38,0,119,0,237,255,33,41,10,0,1,65,0,0,125,42,41,55,65,0,0,0,139,42,0,0,140,1,66,0,0,0,0,0,1,63,0,0,136,65,0,0,0,64,65,0,25,1,0,12,82,2,1,0,1,65,0,0,15,13,65,2,121,13,57,0,25,24,0,44,1,49,0,0,82,35,24,0,41,65,49,2,3,44,35,65,82,45,44,0,25,46,45,28,82,51,46,0,25,47,51,112,82,48,47,0,1,65,0,0,13,3,48,65,120,3,38,0,0,4,47,0,0,8,48,0,0,52,51,0,1,65,0,0,13,9,8,65,120,9,22,0,25,10,52,96,0,56,8,0,82,11,10,0,25,12,56,96,82,14,12,0,15,15,14,11,121,15,5,0,134,65,0,0,28,255,0,0,56,52,0,0,119,0,4,0,134,65,0,0,28,255,0,0,52,56,0,0,25,16,56,112,82,17,16,0,1,65,0,0,13,18,17,65,120,18,3,0,0,56,17,0,119,0,238,255,82,50,4,0,25,5,50,112,82,6,5,0,1,65,0,0,13,7,6,65,120,7,5,0,0,4,5,0,0,8,6,0,0,52,50,0,119,0,223,255,25,19,49,1,82,20,1,0,15,21,19,20,121,21,3,0,0,49,19,0,119,0,203,255,25,22,0,56,82,61,22,0,1,65,0,0,13,23,61,65,121,23,3,0,139,0,0,0,119,0,2,0,0,62,61,0,82,25,62,0,25,26,25,28,82,54,26,0,1,65,0,0,13,27,54,65,120,27,37,0,25,28,62,4,0,55,54,0,82,29,28,0,25,30,29,28,82,58,30,0,1,65,0,0,13,31,58,65,120,31,22,0,25,32,55,96,0,59,58,0,82,33,32,0,25,34,59,96,82,36,34,0,15,37,36,33,121,37,5,0,134,65,0,0,28,255,0,0,59,55,0,0,119,0,4,0,134,65,0,0,28,255,0,0,55,59,0,0,25,38,59,112,82,57,38,0,1,65,0,0,13,39,57,65,120,39,3,0,0,59,57,0,119,0,238,255,25,40,55,112,82,53,40,0,1,65,0,0,13,41,53,65,120,41,3,0,0,55,53,0,119,0,223,255,25,42,62,8,82,60,42,0,1,65,0,0,13,43,60,65,120,43,3,0,0,62,60,0,119,0,208,255,139,0,0,0,140,1,41,0,0,0,0,0,1,37,0,0,136,39,0,0,0,38,39,0,136,39,0,0,25,39,39,96,137,39,0,0,25,2,38,72,25,1,38,56,25,36,38,40,25,35,38,32,25,3,38,16,0,4,38,0,25,15,0,52,82,33,15,0,1,39,0,0,13,25,33,39,121,25,3,0,137,38,0,0,139,0,0,0,25,26,36,4,25,27,36,8,25,28,36,12,25,29,35,4,0,34,33,0,25,30,34,12,82,31,30,0,82,5,31,0,25,6,31,4,82,7,6,0,25,8,34,16,82,9,8,0,82,10,9,0,25,11,9,4,82,12,11,0,85,36,5,0,85,26,7,0,85,27,10,0,85,28,12,0,25,13,34,24,82,39,13,0,85,2,39,0,106,40,13,4,109,2,4,40,106,39,13,8,109,2,8,39,106,40,13,12,109,2,12,40,134,40,0,0,4,172,0,0,36,2,0,0,82,14,36,0,82,16,26,0,134,40,0,0,188,226,0,0,35,34,14,16,25,17,14,48,82,18,35,0,82,40,17,0,85,1,40,0,106,39,17,4,109,1,4,39,106,40,17,8,109,1,8,40,106,39,17,12,109,1,12,39,82,39,18,0,85,2,39,0,106,40,18,4,109,2,4,40,106,39,18,8,109,2,8,39,106,40,18,12,109,2,12,40,134,40,0,0,184,52,1,0,3,1,2,0,82,40,3,0,85,17,40,0,106,39,3,4,109,17,4,39,106,40,3,8,109,17,8,40,106,39,3,12,109,17,12,39,25,19,16,48,82,20,29,0,82,39,19,0,85,1,39,0,106,40,19,4,109,1,4,40,106,39,19,8,109,1,8,39,106,40,19,12,109,1,12,40,82,40,20,0,85,2,40,0,106,39,20,4,109,2,4,39,106,40,20,8,109,2,8,40,106,39,20,12,109,2,12,39,134,39,0,0,184,52,1,0,4,1,2,0,82,39,4,0,85,19,39,0,106,40,4,4,109,19,4,40,106,39,4,8,109,19,8,39,106,40,4,12,109,19,12,40,82,21,35,0,135,40,15,0,21,0,0,0,82,22,29,0,135,40,15,0,22,0,0,0,25,23,34,20,82,32,23,0,1,40,0,0,13,24,32,40,120,24,3,0,0,34,32,0,119,0,155,255,137,38,0,0,139,0,0,0,140,9,35,0,0,0,0,0,1,31,0,0,136,33,0,0,0,32,33,0,136,33,0,0,25,33,33,96,137,33,0,0,25,9,32,80,25,30,32,64,25,10,32,48,25,11,32,32,25,22,32,16,0,23,32,0,1,33,1,0,1,34,116,0,134,24,0,0,112,38,1,0,33,34,0,0,25,25,24,96,85,25,0,0,25,26,24,100,1,34,1,0,85,26,34,0,82,34,1,0,85,24,34,0,106,33,1,4,109,24,4,33,106,34,1,8,109,24,8,34,106,33,1,12,109,24,12,33,25,27,24,16,59,33,100,0,63,28,5,33,61,33,0,0,0,0,0,63,65,29,28,33,59,33,100,0,63,12,6,33,61,33,0,0,0,0,0,63,65,13,12,33,134,33,0,0,40,52,1,0,10,29,13,0,82,33,1,0,85,30,33,0,106,34,1,4,109,30,4,34,106,33,1,8,109,30,8,33,106,34,1,12,109,30,12,34,82,34,10,0,85,9,34,0,106,33,10,4,109,9,4,33,106,34,10,8,109,9,8,34,106,33,10,12,109,9,12,33,134,33,0,0,116,52,1,0,11,30,9,0,82,33,11,0,85,27,33,0,106,34,11,4,109,27,4,34,106,33,11,8,109,27,8,33,106,34,11,12,109,27,12,34,25,14,24,32,134,34,0,0,40,52,1,0,22,29,13,0,82,34,1,0,85,30,34,0,106,33,1,4,109,30,4,33,106,34,1,8,109,30,8,34,106,33,1,12,109,30,12,33,82,33,22,0,85,9,33,0,106,34,22,4,109,9,4,34,106,33,22,8,109,9,8,33,106,34,22,12,109,9,12,34,134,34,0,0,184,52,1,0,23,30,9,0,82,34,23,0,85,14,34,0,106,33,23,4,109,14,4,33,106,34,23,8,109,14,8,34,106,33,23,12,109,14,12,33,25,15,24,48,82,33,2,0,85,15,33,0,106,34,2,4,109,15,4,34,106,33,2,8,109,15,8,33,106,34,2,12,109,15,12,34,25,16,24,64,82,34,3,0,85,16,34,0,106,33,3,4,109,16,4,33,106,34,3,8,109,16,8,34,106,33,3,12,109,16,12,33,25,17,24,80,82,33,4,0,85,17,33,0,106,34,4,4,109,17,4,34,106,33,4,8,109,17,8,33,106,34,4,12,109,17,12,34,25,18,24,108,83,18,7,0,25,19,24,112,1,34,0,0,85,19,34,0,1,34,4,0,134,20,0,0,112,38,1,0,8,34,0,0,25,21,24,104,85,21,20,0,137,32,0,0,139,24,0,0,140,2,71,0,0,0,0,0,2,67,0,0,244,1,0,0,1,65,0,0,136,68,0,0,0,66,68,0,1,69,4,0,1,70,1,0,134,68,0,0,216,179,0,0,0,1,69,70,0,58,1,0,76,68,58,0,58,4,68,0,135,5,16,0,4,0,0,0,75,16,5,0,76,68,16,0,58,27,68,0,64,38,5,27,135,46,13,0,38,0,0,0,62,68,0,0,187,189,215,217,223,124,219,61,73,47,46,68,25,48,58,1,121,47,3,0,0,58,48,0,119,0,239,255,0,2,16,0,58,3,27,0,119,0,1,0,1,68,232,3,6,68,68,2,38,68,68,255,0,49,68,0,134,50,0,0,76,28,1,0,3,3,0,0,75,6,50,0,5,7,6,6,32,8,7,0,121,8,7,0,1,70,4,0,1,69,2,0,134,68,0,0,216,179,0,0,0,1,70,69,139,0,0,0,28,68,2,254,38,68,68,255,0,9,68,0,28,68,2,2,38,68,68,255,0,10,68,0,1,51,0,0,1,53,0,0,1,55,255,255,1,57,0,0,1,63,0,0,1,64,0,0,15,11,51,1,121,11,39,0,41,68,51,2,3,12,0,68,82,13,12,0,25,14,13,12,82,15,14,0,32,17,15,0,121,17,30,0,15,18,63,9,121,18,3,0,0,52,51,0,119,0,29,0,15,19,10,63,15,20,64,9,20,68,20,19,0,59,68,0,15,21,10,64,20,68,21,59,0,60,68,0,121,60,3,0,0,52,51,0,119,0,19,0,5,22,63,49,3,23,22,67,5,24,64,49,3,25,24,67,76,68,23,0,58,26,68,0,89,13,26,0,76,68,25,0,58,28,68,0,82,29,12,0,25,30,29,4,89,30,28,0,25,31,51,1,0,52,31,0,119,0,4,0,1,65,10,0,119,0,2,0,1,65,10,0,32,68,65,10,121,68,4,0,1,65,0,0,25,32,51,1,0,52,32,0,13,33,63,64,121,33,3,0,1,65,14,0,119,0,22,0,34,34,63,0], eb + 51200);
  HEAPU8.set([1,68,0,0,4,35,68,64,13,36,63,35,19,68,34,36,0,61,68,0,121,61,3,0,1,65,14,0,119,0,13,0,1,68,0,0,15,37,68,63,1,68,1,0,4,39,68,64,13,40,63,39,19,68,37,40,0,62,68,0,121,62,3,0,1,65,14,0,119,0,3,0,0,54,53,0,0,56,55,0,32,68,65,14,121,68,6,0,1,65,0,0,1,68,0,0,4,41,68,55,0,54,41,0,0,56,53,0,3,42,54,63,3,43,56,64,25,44,57,1,15,45,44,7,121,45,8,0,0,51,52,0,0,53,54,0,0,55,56,0,0,57,44,0,0,63,42,0,0,64,43,0,119,0,167,255,1,69,4,0,1,70,2,0,134,68,0,0,216,179,0,0,0,1,69,70,139,0,0,0,140,4,73,0,0,0,0,0,1,70,0,0,136,72,0,0,0,71,72,0,82,8,0,0,1,72,0,0,15,9,72,8,121,9,29,0,25,20,0,32,82,31,20,0,82,42,0,0,1,67,0,0,41,72,67,2,3,10,31,72,82,11,10,0,82,12,11,0,41,72,67,1,0,13,72,0,41,72,13,2,3,14,1,72,85,14,12,0,41,72,67,2,3,15,31,72,82,16,15,0,25,17,16,4,82,18,17,0,39,72,13,1,0,7,72,0,41,72,7,2,3,19,1,72,85,19,18,0,25,21,67,1,15,22,21,42,121,22,3,0,0,67,21,0,119,0,233,255,25,53,0,4,82,63,53,0,1,72,0,0,15,64,72,63,121,64,33,0,25,65,0,36,82,66,65,0,1,68,0,0,41,72,68,2,3,28,66,72,82,29,28,0,82,30,29,0,25,32,30,96,82,33,32,0,41,72,68,1,0,34,72,0,41,72,34,2,3,35,2,72,85,35,33,0,41,72,68,2,3,36,66,72,82,37,36,0,25,38,37,4,82,39,38,0,25,40,39,96,82,41,40,0,39,72,34,1,0,6,72,0,41,72,6,2,3,43,2,72,85,43,41,0,25,44,68,1,82,45,53,0,15,46,44,45,121,46,3,0,0,68,44,0,119,0,228,255,25,23,0,8,82,24,23,0,1,72,0,0,15,25,72,24,120,25,2,0,139,0,0,0,25,26,0,40,82,27,26,0,1,69,0,0,41,72,69,2,3,47,27,72,82,48,47,0,25,49,48,12,82,50,49,0,27,51,69,3,41,72,51,2,3,52,3,72,85,52,50,0,25,54,48,16,82,55,54,0,25,4,51,1,41,72,4,2,3,56,3,72,85,56,55,0,25,57,48,20,82,58,57,0,25,5,51,2,41,72,5,2,3,59,3,72,85,59,58,0,25,60,69,1,82,61,23,0,15,62,60,61,121,62,3,0,0,69,60,0,119,0,230,255,139,0,0,0,140,3,75,0,0,0,0,0,1,70,0,0,136,72,0,0,0,71,72,0,25,3,1,8,25,4,3,4,82,15,4,0,25,26,15,20,82,37,26,0,25,48,37,8,82,59,48,0,85,2,59,0,41,72,59,2,0,64,72,0,135,65,11,0,64,0,0,0,1,72,0,0,13,66,65,72,121,66,5,0,1,73,40,0,134,72,0,0,44,58,1,0,73,0,0,0,1,72,0,0,15,5,72,59,120,5,2,0,139,65,0,0,25,6,48,4,1,68,0,0,82,7,6,0,41,72,68,2,3,8,7,72,82,9,8,0,25,10,9,8,25,11,10,4,82,12,11,0,25,13,12,8,82,14,13,0,25,16,12,20,82,17,16,0,25,18,12,32,82,19,18,0,25,20,14,4,82,21,20,0,32,22,21,3,120,22,3,0,1,70,8,0,119,0,68,0,25,23,17,4,82,24,23,0,32,25,24,3,120,25,3,0,1,70,8,0,119,0,62,0,25,27,14,8,0,28,27,0,0,29,28,0,82,30,29,0,25,31,28,4,0,32,31,0,82,33,32,0,25,34,17,8,0,35,34,0,0,36,35,0,82,38,36,0,25,39,35,4,0,40,39,0,82,41,40,0,25,42,19,4,82,43,42,0,32,72,43,4,121,72,6,0,25,53,19,8,86,54,53,0,58,55,54,0,58,69,55,0,119,0,20,0,32,72,43,3,121,72,16,0,25,44,19,8,0,45,44,0,0,46,45,0,82,47,46,0,25,49,45,4,0,50,49,0,82,51,50,0,77,72,47,0,61,73,0,0,0,0,128,79,76,74,51,0,65,73,73,74,63,52,72,73,58,69,52,0,119,0,3,0,1,70,11,0,119,0,20,0,41,73,30,2,3,56,0,73,82,57,56,0,41,73,38,2,3,58,0,73,82,60,58,0,134,61,0,0,128,48,1,0,57,60,69,0,41,73,68,2,3,62,65,73,85,62,61,0,25,63,68,1,13,67,63,59,121,67,3,0,1,70,13,0,119,0,3,0,0,68,63,0,119,0,171,255,32,73,70,8,121,73,6,0,1,72,88,0,134,73,0,0,44,58,1,0,72,0,0,0,119,0,11,0,32,73,70,11,121,73,6,0,1,72,104,0,134,73,0,0,44,58,1,0,72,0,0,0,119,0,4,0,32,73,70,13,121,73,2,0,139,65,0,0,1,73,0,0,139,73,0,0,140,5,57,0,0,0,0,0,1,54,0,0,136,56,0,0,0,55,56,0,25,6,0,36,82,7,6,0,32,18,7,0,120,18,32,0,25,36,0,32,82,37,36,0,25,38,37,24,1,56,1,0,134,39,0,0,236,37,1,0,0,38,56,0,1,56,0,0,13,41,39,56,121,41,3,0,1,5,0,0,139,5,0,0,82,42,2,0,1,56,0,0,13,43,42,56,121,43,2,0,85,2,39,0,25,44,39,4,85,44,4,0,82,45,1,0,85,39,45,0,82,46,3,0,1,56,0,0,13,47,46,56,120,47,3,0,25,48,46,16,85,48,39,0,85,1,39,0,85,3,39,0,1,5,1,0,139,5,0,0,82,29,3,0,85,1,29,0,82,40,3,0,25,49,40,16,82,50,49,0,85,3,50,0,82,51,2,0,1,56,0,0,13,52,51,56,121,52,2,0,85,2,29,0,25,53,29,4,82,8,53,0,32,56,8,1,121,56,30,0,25,16,29,8,82,17,16,0,32,19,17,0,121,19,3,0,1,5,1,0,139,5,0,0,27,20,17,12,25,21,16,4,82,22,21,0,0,23,22,0,3,24,23,20,1,56,0,0,134,25,0,0,236,37,1,0,0,24,56,0,85,21,25,0,1,56,0,0,13,26,25,56,121,26,3,0,1,5,0,0,139,5,0,0,3,27,25,20,25,28,29,16,85,28,27,0,1,56,0,0,85,16,56,0,1,5,1,0,139,5,0,0,119,0,50,0,32,56,8,2,121,56,25,0,25,9,29,8,82,10,9,0,32,11,10,0,121,11,3,0,1,5,1,0,139,5,0,0,41,56,10,2,0,12,56,0,1,56,0,0,134,13,0,0,236,37,1,0,0,12,56,0,25,14,9,4,85,14,13,0,1,56,0,0,13,15,13,56,121,15,3,0,1,5,0,0,139,5,0,0,1,56,0,0,85,9,56,0,1,5,1,0,139,5,0,0,119,0,24,0,32,56,8,5,121,56,20,0,25,30,29,8,82,31,30,0,25,32,31,1,1,56,0,0,134,33,0,0,236,37,1,0,0,32,56,0,25,34,30,4,85,34,33,0,1,56,0,0,13,35,33,56,121,35,3,0,1,5,0,0,139,5,0,0,1,56,0,0,85,30,56,0,1,5,1,0,139,5,0,0,119,0,3,0,1,5,1,0,139,5,0,0,1,56,0,0,139,56,0,0,140,1,29,0,0,0,0,0,1,25,0,0,136,27,0,0,0,26,27,0,136,27,0,0,25,27,27,80,137,27,0,0,25,2,26,64,25,1,26,48,25,24,26,32,25,3,26,16,0,4,26,0,25,15,0,12,82,17,15,0,82,18,17,0,25,19,17,4,82,20,19,0,25,21,0,16,82,22,21,0,82,23,22,0,25,5,22,4,82,6,5,0,85,24,18,0,25,7,24,4,85,7,20,0,25,8,24,8,85,8,23,0,25,9,24,12,85,9,6,0,25,10,0,24,82,27,10,0,85,2,27,0,106,28,10,4,109,2,4,28,106,27,10,8,109,2,8,27,106,28,10,12,109,2,12,28,134,28,0,0,4,172,0,0,24,2,0,0,82,11,24,0,82,28,10,0,85,1,28,0,106,27,10,4,109,1,4,27,106,28,10,8,109,1,8,28,106,27,10,12,109,1,12,27,82,27,11,0,85,2,27,0,106,28,11,4,109,2,4,28,106,27,11,8,109,2,8,27,106,28,11,12,109,2,12,28,134,28,0,0,116,52,1,0,3,1,2,0,82,28,3,0,85,2,28,0,106,27,3,4,109,2,4,27,106,28,3,8,109,2,8,28,106,27,3,12,109,2,12,27,134,12,0,0,80,40,1,0,2,0,0,0,82,13,7,0,82,27,10,0,85,1,27,0,106,28,10,4,109,1,4,28,106,27,10,8,109,1,8,27,106,28,10,12,109,1,12,28,82,28,13,0,85,2,28,0,106,27,13,4,109,2,4,27,106,28,13,8,109,2,8,28,106,27,13,12,109,2,12,27,134,27,0,0,116,52,1,0,4,1,2,0,82,27,4,0,85,2,27,0,106,28,4,4,109,2,4,28,106,27,4,8,109,2,8,27,106,28,4,12,109,2,12,28,134,14,0,0,80,40,1,0,2,0,0,0,63,16,12,14,137,26,0,0,139,16,0,0,140,2,54,0,0,0,0,0,1,50,0,0,136,52,0,0,0,51,52,0,136,52,0,0,25,52,52,32,137,52,0,0,25,49,51,24,25,48,51,20,25,45,51,16,25,44,51,12,25,43,51,8,25,40,51,4,0,39,51,0,82,2,0,0,41,52,2,4,0,3,52,0,135,14,11,0,3,0,0,0,25,25,0,60,85,25,14,0,135,33,11,0,3,0,0,0,25,34,0,64,85,34,33,0,1,52,0,0,15,35,52,2,121,35,35,0,25,36,0,32,1,46,0,0,82,37,36,0,41,52,46,2,3,38,37,52,82,4,38,0,82,5,25,0,41,52,46,4,3,6,5,52,82,52,4,0,85,6,52,0,106,53,4,4,109,6,4,53,106,52,4,8,109,6,8,52,106,53,4,12,109,6,12,53,82,7,34,0,41,53,46,4,3,8,7,53,25,9,4,48,82,53,9,0,85,8,53,0,106,52,9,4,109,8,4,52,106,53,9,8,109,8,8,53,106,52,9,12,109,8,12,52,25,10,46,1,13,42,10,2,120,42,3,0,0,46,10,0,119,0,225,255,59,52,0,0,89,39,52,0,59,52,1,0,89,49,52,0,1,53,1,0,134,52,0,0,48,220,0,0,0,39,49,40,43,45,44,53,88,11,39,0,88,12,49,0,88,13,40,0,1,52,1,0,61,53,0,0,23,183,81,57,134,15,0,0,216,207,0,0,0,11,12,13,52,53,48,0,89,1,15,0,1,53,0,0,15,16,53,2,120,16,9,0,82,31,25,0,135,53,15,0,31,0,0,0,82,32,34,0,135,53,15,0,32,0,0,0,137,51,0,0,139,0,0,0,25,17,0,32,82,18,17,0,1,47,0,0,41,53,47,2,3,19,18,53,82,20,19,0,88,21,48,0,25,22,20,48,88,23,22,0,65,24,21,23,89,22,24,0,88,26,48,0,25,27,20,52,88,28,27,0,65,29,26,28,89,27,29,0,25,30,47,1,13,41,30,2,120,41,3,0,0,47,30,0,119,0,239,255,82,31,25,0,135,53,15,0,31,0,0,0,82,32,34,0,135,53,15,0,32,0,0,0,137,51,0,0,139,0,0,0,140,1,27,0,0,0,0,0,1,23,0,0,136,25,0,0,0,24,25,0,136,25,0,0,25,25,25,96,137,25,0,0,25,2,24,80,25,1,24,64,25,21,24,48,25,3,24,32,25,4,24,16,0,13,24,0,25,14,0,4,82,15,14,0,1,25,0,0,15,16,25,15,120,16,3,0,137,24,0,0,139,0,0,0,25,17,0,36,1,22,0,0,82,18,17,0,41,25,22,2,3,19,18,25,82,20,19,0,134,25,0,0,24,6,1,0,21,20,0,0,82,5,20,0,25,6,5,48,82,25,6,0,85,1,25,0,106,26,6,4,109,1,4,26,106,25,6,8,109,1,8,25,106,26,6,12,109,1,12,26,82,26,21,0,85,2,26,0,106,25,21,4,109,2,4,25,106,26,21,8,109,2,8,26,106,25,21,12,109,2,12,25,134,25,0,0,184,52,1,0,3,1,2,0,82,25,3,0,85,6,25,0,106,26,3,4,109,6,4,26,106,25,3,8,109,6,8,25,106,26,3,12,109,6,12,26,25,7,20,4,82,8,7,0,25,9,8,48,82,26,21,0,85,2,26,0,106,25,21,4,109,2,4,25,106,26,21,8,109,2,8,26,106,25,21,12,109,2,12,25,134,25,0,0,244,57,1,0,4,2,0,0,82,25,9,0,85,1,25,0,106,26,9,4,109,1,4,26,106,25,9,8,109,1,8,25,106,26,9,12,109,1,12,26,82,26,4,0,85,2,26,0,106,25,4,4,109,2,4,25,106,26,4,8,109,2,8,26,106,25,4,12,109,2,12,25,134,25,0,0,184,52,1,0,13,1,2,0,82,25,13,0,85,9,25,0,106,26,13,4,109,9,4,26,106,25,13,8,109,9,8,25,106,26,13,12,109,9,12,26,25,10,22,1,82,11,14,0,15,12,10,11,121,12,3,0,0,22,10,0,119,0,174,255,137,24,0,0,139,0,0,0,140,2,52,0,0,0,0,0,1,48,0,0,136,50,0,0,0,49,50,0,1,50,0,0,13,4,1,50,121,4,2,0,139,0,0,0,1,50,0,0,85,1,50,0,25,5,0,12,25,16,0,16,25,27,0,12,25,38,0,16,25,43,0,12,25,44,0,16,25,45,0,12,25,46,0,16,0,3,1,0,25,47,3,4,82,6,47,0,32,50,6,2,121,50,23,0,25,7,3,8,82,8,7,0,32,9,8,0,121,9,10,0,82,10,27,0,25,11,7,4,82,12,11,0,82,13,38,0,38,51,10,1,135,50,7,0,51,12,13,0,1,48,12,0,119,0,48,0,26,14,8,1,85,7,14,0,25,15,7,4,82,17,15,0,41,50,14,2,3,18,17,50,82,19,18,0,0,2,19,0,119,0,39,0,32,50,6,5,121,50,11,0,82,34,45,0,25,35,3,8,25,36,35,4,82,37,36,0,82,39,46,0,38,51,34,1,135,50,7,0,51,37,39,0,1,48,12,0,119,0,27,0,32,50,6,1,121,50,24,0,25,21,3,8,82,22,21,0,32,23,22,0,121,23,10,0,82,24,43,0,25,25,21,4,82,26,25,0,82,28,44,0,38,51,24,1,135,50,7,0,51,26,28,0,1,48,12,0,119,0,12,0,26,29,22,1,85,21,29,0,25,30,21,4,82,31,30,0,27,50,29,12,3,50,31,50,25,32,50,8,82,33,32,0,0,2,33,0,119,0,2,0,1,48,12,0,32,50,48,12,121,50,9,0,1,48,0,0,82,40,3,0,82,41,5,0,82,42,16,0,38,51,41,1,135,50,7,0,51,3,42,0,0,2,40,0,1,50,0,0,13,20,2,50,120,20,3,0,0,3,2,0,119,0,178,255,139,0,0,0,140,1,42,0,0,0,0,0,1,38,0,0,136,40,0,0,0,39,40,0,136,40,0,0,25,40,40,48,137,40,0,0,25,1,39,32,25,36,39,28,25,37,39,24,25,2,39,16,0,3,39,0,25,14,0,4,82,22,14,0,1,40,1,0,15,23,40,22,120,23,6,0,1,29,0,0,25,21,0,52,85,21,29,0,137,39,0,0,139,0,0,0,25,24,0,36,1,30,0,0,1,34,0,0,25,27,34,1,82,4,14,0,15,5,27,4,121,5,60,0,0,32,30,0,0,35,27,0,82,6,24,0,41,40,34,2,3,7,6,40,82,8,7,0,41,40,35,2,3,9,6,40,82,10,9,0,134,40,0,0,180,58,1,0,2,8,10,0,82,40,2,0,85,1,40,0,106,41,2,4,109,1,4,41,1,41,0,0,134,11,0,0,32,22,1,0,1,41,0,0,134,12,0,0,32,12,1,0,11,36,37,0,41,41,12,24,42,41,41,24,32,13,41,0,121,13,5,0,135,41,15,0,11,0,0,0,0,33,32,0,119,0,20,0,25,15,11,20,85,15,32,0,88,16,36,0,88,17,37,0,134,41,0,0,40,52,1,0,3,16,17,0,82,41,3,0,85,1,41,0,106,40,3,4,109,1,4,40,106,41,3,8,109,1,8,41,106,40,3,12,109,1,12,40,134,40,0,0,144,13,1,0,11,1,0,0,0,33,11,0,25,18,35,1,82,19,14,0,15,20,18,19,121,20,4,0,0,32,33,0,0,35,18,0,119,0,202,255,0,31,33,0,119,0,2,0,0,31,30,0,82,25,14,0,26,26,25,1,15,28,27,26,121,28,4,0,0,30,31,0,0,34,27,0,119,0,186,255,0,29,31,0,119,0,1,0,25,21,0,52,85,21,29,0,137,39,0,0,139,0,0,0,140,2,16,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,136,14,0,0,1,15,128,0,3,14,14,15,137,14,0,0,25,3,13,104,25,2,13,88,25,11,13,72,25,10,13,64,25,4,13,48,25,5,13,32,25,6,13,16,0,7,13,0,134,14,0,0,180,58,1,0,10,0,1,0,82,14,10,0,85,3,14,0,106,15,10,4,109,3,4,15,134,15,0,0,228,223,0,0,4,3,0,0,82,15,4,0,85,11,15,0,106,14,4,4,109,11,4,14,106,15,4,8,109,11,8,15,106,14,4,12,109,11,12,14,25,8,0,48,82,14,8,0,85,2,14,0,106,15,8,4,109,2,4,15,106,14,8,8,109,2,8,14,106,15,8,12,109,2,12,15,82,15,4,0,85,3,15,0,106,14,4,4,109,3,4,14,106,15,4,8,109,3,8,15,106,14,4,12,109,3,12,14,134,14,0,0,184,52,1,0,5,2,3,0,82,14,5,0,85,8,14,0,106,15,5,4,109,8,4,15,106,14,5,8,109,8,8,14,106,15,5,12,109,8,12,15,25,9,1,48,82,15,11,0,85,3,15,0,106,14,11,4,109,3,4,14,106,15,11,8,109,3,8,15,106,14,11,12,109,3,12,14,134,14,0,0,244,57,1,0,6,3,0,0,82,14,9,0,85,2,14,0,106,15,9,4,109,2,4,15,106,14,9,8,109,2,8,14,106,15,9,12,109,2,12,15,82,15,6,0,85,3,15,0,106,14,6,4,109,3,4,14,106,15,6,8,109,3,8,15,106,14,6,12,109,3,12,14,134,14,0,0,184,52,1,0,7,2,3,0,82,14,7,0,85,9,14,0,106,15,7,4,109,9,4,15,106,14,7,8,109,9,8,14,106,15,7,12,109,9,12,15,137,13,0,0,139,0,0,0,140,1,28,0,0,0,0,0,1,24,0,0,136,26,0,0,0,25,26,0,136,26,0,0,25,26,26,80,137,26,0,0,25,2,25,56,25,1,25,40,25,23,25,32,25,3,25,16,0,4,25,0,25,14,0,48,82,15,14,0,1,26,0,0,13,16,15,26,121,16,3,0,137,25,0,0,139,0,0,0,25,17,23,4,0,22,15,0,134,26,0,0,228,215,0,0,23,22,0,0,25,18,22,4,82,19,18,0,25,20,22,8,82,21,20,0,25,5,19,48,82,6,23,0,82,26,5,0,85,1,26,0,106,27,5,4,109,1,4,27,106,26,5,8,109,1,8,26,106,27,5,12,109,1,12,27,82,27,6,0,85,2,27,0,106,26,6,4,109,2,4,26,106,27,6,8,109,2,8,27,106,26,6,12,109,2,12,26,134,26,0,0,184,52,1,0,3,1,2,0,82,26,3,0,85,5,26,0,106,27,3,4,109,5,4,27,106,26,3,8,109,5,8,26,106,27,3,12,109,5,12,27,25,7,21,48,82,8,17,0,82,27,7,0,85,1,27,0,106,26,7,4,109,1,4,26,106,27,7,8,109,1,8,27,106,26,7,12,109,1,12,26,82,26,8,0,85,2,26,0,106,27,8,4,109,2,4,27,106,26,8,8,109,2,8,26,106,27,8,12,109,2,12,27,134,27,0,0,184,52,1,0,4,1,2,0,82,27,4,0,85,7,27,0,106,26,4,4,109,7,4,26,106,27,4,8,109,7,8,27,106,26,4,12,109,7,12,26,82,9,23,0,135,26,15,0,9,0,0,0,82,10,17,0,135,26,15,0,10,0,0,0,25,11,22,20,82,12,11,0,1,26,0,0,13,13,12,26,120,13,3,0,0,22,12,0,119,0,179,255,137,25,0,0,139,0,0,0,140,3,48,0,0,0,0,0,1,44,0,0,136,46,0,0,0,45,46,0,25,8,2,16,82,9,8,0,1,46,0,0,13,20,9,46,121,20,12,0,134,31,0,0,40,33,1,0,2,0,0,0,32,35,31,0,121,35,4,0,82,6,8,0,0,38,6,0,119,0,5,0,1,3,0,0,139,3,0,0,119,0,2,0,0,38,9,0,25,36,2,20,82,37,36,0,0,39,38,0,0,40,37,0,4,10,39,40,16,11,10,1,121,11,8,0,25,12,2,36,82,13,12,0,38,46,13,3,135,14,17,0,46,2,0,1,0,3,14,0,139,3,0,0,25,15,2,75,78,16,15,0,1,46,255,255,41,47,16,24,42,47,47,24,15,17,46,47,121,17,38,0,0,41,1,0,32,18,41,0,121,18,6,0,0,4,1,0,0,5,0,0,0,30,37,0,1,43,0,0,119,0,34,0,26,19,41,1,3,21,0,19,78,22,21,0,41,47,22,24,42,47,47,24,32,23,47,10,121,23,3,0,0,42,41,0,119,0,3,0,0,41,19,0,119,0,239,255,25,24,2,36,82,25,24,0,38,47,25,3,135,26,17,0,47,2,0,42,16,27,26,42,121,27,4,0,0,3,42,0,139,3,0,0,119,0,13,0,3,28,0,42,4,29,1,42,82,7,36,0,0,4,29,0,0,5,28,0,0,30,7,0,0,43,42,0,119,0,5,0,0,4,1,0,0,5,0,0,0,30,37,0,1,43,0,0,135,47,9,0,30,5,4,0,82,32,36,0,3,33,32,4,85,36,33,0,3,34,43,4,0,3,34,0,139,3,0,0,140,4,40,0,0,0,0,0,1,34,0,0,136,38,0,0,0,35,38,0,136,38,0,0,1,39,80,1,3,38,38,39,137,38,0,0,0,32,35,0,25,31,35,80,135,4,18,0,1,32,0,0,32,5,4,0,120,5,15,0,0,33,31,0,1,36,32,4,25,37,33,33,78,38,36,0,83,33,38,0,25,33,33,1,25,36,36,1,54,38,33,37,12,4,1,0,135,38,19,0,31,1,0,0,134,38,0,0,44,58,1,0,31,0,0,0,25,16,32,36,82,24,16,0,135,25,11,0,24,0,0,0,1,38,0,0,13,26,25,38,121,26,5,0,1,39,72,4,134,38,0,0,44,58,1,0,39,0,0,0,1,38,120,4,135,27,20,0,1,38,0,0,1,38,0,0,13,28,27,38,121,28,9,0,135,38,21,0,27,0,0,0,135,38,15,0,25,0,0,0,1,39,128,4,134,38,0,0,44,58,1,0,39,0,0,0,1,38,1,0,135,29,22,0,25,24,38,27,32,30,29,1,135,38,21,0,27,0,0,0,120,30,7,0,135,38,15,0,25,0,0,0,1,39,168,4,134,38,0,0,44,58,1,0,39,0,0,0,134,6,0,0,72,50,1,0,25,24,0,0,1,38,0,0,13,7,6,38,121,7,10,0,135,38,15,0,25,0,0,0,134,38,0,0,212,49,1,0,6,0,0,0,1,39,208,4,134,38,0,0,44,58,1,0,39,0,0,0,25,8,6,8,82,9,8,0,32,10,9,2,120,10,10,0,135,38,15,0,25,0,0,0,134,38,0,0,212,49,1,0,6,0,0,0,1,39,248,4,134,38,0,0,44,58,1,0,39,0,0,0,25,11,8,4,82,12,11,0,82,13,12,0,1,38,32,5,134,14,0,0,220,35,1,0,13,38,0,0,32,15,14,0,120,15,10,0,135,38,15,0,25,0,0,0,134,38,0,0,212,49,1,0,6,0,0,0,1,39,48,5,134,38,0,0,44,58,1,0,39,0,0,0,82,17,11,0,25,18,17,12,82,19,18,0,1,38,96,5,134,20,0,0,220,35,1,0,19,38,0,0,32,21,20,0,121,21,18,0,134,22,0,0,8,200,0,0,6,2,0,0,134,23,0,0,112,242,0,0,22,6,3,0,134,38,0,0,212,49,1,0,6,0,0,0,135,38,15,0,25,0,0,0,134,38,0,0,180,58,1,0,0,22,23,0,137,35,0,0,139,0,0,0,119,0,10,0,135,38,15,0,25,0,0,0,134,38,0,0,212,49,1,0,6,0,0,0,1,39,104,5,134,38,0,0,44,58,1,0,39,0,0,0,139,0,0,0,140,2,24,0,0,0,0,0,1,20,0,0,136,22,0,0,0,21,22,0,136,22,0,0,25,22,22,64,137,22,0,0,25,19,21,48,25,2,21,32,25,18,21,16,0,3,21,0,25,4,1,8,88,8,4,0,59,22,100,0,65,9,8,22,25,10,1,4,82,11,10,0,82,12,1,0,82,22,11,0,85,2,22,0,106,23,11,4,109,2,4,23,106,22,11,8,109,2,8,22,106,23,11,12,109,2,12,23,82,23,12,0,85,19,23,0,106,22,12,4,109,19,4,22,106,23,12,8,109,19,8,23,106,22,12,12,109,19,12,22,134,22,0,0,116,52,1,0,3,2,19,0,82,22,3,0,85,18,22,0,106,23,3,4,109,18,4,23,106,22,3,8,109,18,8,22,106,23,3,12,109,18,12,23,82,23,3,0,85,19,23,0,106,22,3,4,109,19,4,22,106,23,3,8,109,19,8,23,106,22,3,12,109,19,12,22,134,13,0,0,80,40,1,0,19,0,0,0,135,17,13,0,13,0,0,0,58,14,17,0,62,22,0,0,123,20,174,71,225,122,132,63,71,15,14,22,121,15,5,0,61,23,0,0,10,215,35,60,58,22,23,0,119,0,2,0,58,22,13,0,58,16,22,0,64,5,16,9,59,22,2,0,65,6,5,22,66,7,6,16,82,22,18,0,85,19,22,0,106,23,18,4,109,19,4,23,106,22,18,8,109,19,8,22,106,23,18,12,109,19,12,23,134,23,0,0,188,57,1,0,0,19,7,0,137,21,0,0,139,0,0,0,140,1,39,0,0,0,0,0,1,35,0,0,136,37,0,0,0,36,37,0,136,37,0,0,25,37,37,80,137,37,0,0,25,1,36,64,25,34,36,48,25,33,36,32,25,2,36,16,0,3,36,0,25,14,0,4,82,25,14,0,82,26,0,0,25,27,0,8,82,28,27,0,88,29,25,0,88,30,26,0,64,31,29,30,25,4,25,4,88,5,4,0,25,6,26,4,88,7,6,0,64,8,5,7,88,9,28,0,64,10,9,30,25,11,28,4,88,12,11,0,64,13,12,7,134,37,0,0,40,52,1,0,2,31,8,0,82,37,2,0,85,33,37,0,106,38,2,4,109,33,4,38,106,37,2,8,109,33,8,37,106,38,2,12,109,33,12,38,134,38,0,0,40,52,1,0,3,10,13,0,82,38,33,0,85,34,38,0,106,37,33,4,109,34,4,37,106,38,33,8,109,34,8,38,106,37,33,12,109,34,12,37,82,37,3,0,85,1,37,0,106,38,3,4,109,1,4,38,106,37,3,8,109,1,8,37,106,38,3,12,109,1,12,38,134,15,0,0,212,14,1,0,34,1,0,0,134,16,0,0,196,53,1,0,0,0,0,0,25,17,26,100,82,18,17,0,26,19,18,1,76,38,19,0,58,20,38,0,62,38,0,0,24,45,68,84,251,33,25,64,66,21,38,20,58,22,21,0,64,23,15,22,65,32,23,23,65,24,16,32,137,36,0,0,139,24,0,0,140,1,36,0,0,0,0,0,1,32,0,0,136,34,0,0,0,33,34,0,136,34,0,0,25,34,34,16,137,34,0,0,25,1,33,8,0,2,33,0,25,3,0,4,82,14,3,0,1,34,1,0,15,18,34,14,120,18,6,0,1,25,0,0,25,17,0,48,85,17,25,0,137,33,0,0,139,0,0,0,25,19,0,36,1,26,0,0,1,30,0,0,25,22,30,1,82,24,3,0,15,4,22,24,121,4,37,0,0,28,26,0,0,31,22,0,82,5,19,0,41,34,30,2,3,6,5,34,82,7,6,0,41,34,31,2,3,8,5,34,82,9,8,0,134,10,0,0,64,35,1,0,7,9,0,0,32,11,10,0,121,11,3,0,0,29,28,0,119,0,12,0,134,34,0,0,180,58,1,0,2,7,9,0,82,34,2,0,85,1,34,0,106,35,2,4,109,1,4,35,134,12,0,0,32,22,1,0,1,28,0,0,0,29,12,0,25,13,31,1,82,15,3,0,15,16,13,15,121,16,4,0,0,28,29,0,0,31,13,0,119,0,225,255,0,27,29,0,119,0,2,0,0,27,26,0,82,20,3,0,26,21,20,1,15,23,22,21,121,23,4,0,0,26,27,0,0,30,22,0,119,0,209,255,0,25,27,0,119,0,1,0,25,17,0,48,85,17,25,0,137,33,0,0,139,0,0,0,140,3,55,0,0,0,0,0,2,53,0,0,255,0,0,0,1,51,0,0,136,54,0,0,0,52,54,0,1,54,0,0,13,4,0,54,121,4,3,0,1,3,1,0,139,3,0,0,35,5,1,128,121,5,6,0,19,54,1,53,0,16,54,0,83,0,16,0,1,3,1,0,139,3,0,0,1,54,0,8,16,27,1,54,121,27,20,0,43,54,1,6,0,38,54,0,1,54,192,0,20,54,38,54,0,45,54,0,19,54,45,53,0,46,54,0,25,47,0,1,83,0,46,0,38,54,1,63,0,48,54,0,1,54,128,0,20,54,48,54,0,49,54,0,19,54,49,53,0,6,54,0,83,47,6,0,1,3,2,0,139,3,0,0,2,54,0,0,0,216,0,0,16,7,1,54,1,54,0,224,19,54,1,54,0,8,54,0,2,54,0,0,0,224,0,0,13,9,8,54,20,54,7,9,0,50,54,0,121,50,31,0,43,54,1,12,0,10,54,0,1,54,224,0,20,54,10,54,0,11,54,0,19,54,11,53,0,12,54,0,25,13,0,1,83,0,12,0,43,54,1,6,0,14,54,0,38,54,14,63,0,15,54,0,1,54,128,0,20,54,15,54,0,17,54,0,19,54,17,53,0,18,54,0,25,19,0,2,83,13,18,0,38,54,1,63,0,20,54,0,1,54,128,0,20,54,20,54,0,21,54,0,19,54,21,53,0,22,54,0,83,19,22,0,1,3,3,0,139,3,0,0,2,54,0,0,0,0,1,0,4,23,1,54,2,54,0,0,0,0,16,0,16,24,23,54,121,24,43,0,43,54,1,18,0,25,54,0,1,54,240,0,20,54,25,54,0,26,54,0,19,54,26,53,0,28,54,0,25,29,0,1,83,0,28,0,43,54,1,12,0,30,54,0,38,54,30,63,0,31,54,0,1,54,128,0,20,54,31,54,0,32,54,0,19,54,32,53,0,33,54,0,25,34,0,2,83,29,33,0,43,54,1,6,0,35,54,0,38,54,35,63,0,36,54,0,1,54,128,0,20,54,36,54,0,37,54,0,19,54,37,53,0,39,54,0,25,40,0,3,83,34,39,0,38,54,1,63,0,41,54,0,1,54,128,0,20,54,41,54,0,42,54,0,19,54,42,53,0,43,54,0,83,40,43,0,1,3,4,0,139,3,0,0,119,0,6,0,135,44,0,0,1,54,84,0,85,44,54,0,1,3,255,255,139,3,0,0,1,54,0,0,139,54,0,0,140,3,60,0,0,0,0,0,1,57,0,0,136,59,0,0,0,58,59,0,25,4,0,12,82,5,4,0,25,16,0,16,82,27,16,0,82,38,5,0,25,49,5,4,82,51,49,0,82,52,27,0,25,53,27,4,82,54,53,0,88,6,38,0,25,7,38,4,88,8,7,0,88,9,51,0,25,10,51,4,88,11,10,0,88,12,52,0,25,13,52,4,88,14,13,0,88,15,54,0,25,17,54,4,88,18,17,0,64,19,9,6,64,20,11,8,64,21,15,12,64,22,18,14,64,23,6,12,65,24,20,23,64,25,8,14,65,26,19,25,64,28,26,24,65,29,20,21,65,30,19,22,64,31,30,29,66,32,28,31,65,33,25,21,65,34,23,22,64,35,33,34,66,36,35,31,58,37,32,0,62,59,0,0,123,20,174,71,225,122,132,63,74,59,37,59,12,39,59,0,62,59,0,0,174,71,225,122,20,174,239,63,72,59,37,59,12,40,59,0,20,59,39,40,0,55,59,0,121,55,3,0,1,3,0,0,139,3,0,0,58,41,36,0,62,59,0,0,123,20,174,71,225,122,132,63,74,59,41,59,12,42,59,0,62,59,0,0,174,71,225,122,20,174,239,63,72,59,41,59,12,43,59,0,20,59,42,43,0,56,59,0,121,56,3,0,1,3,0,0,139,3,0,0,1,59,0,0,13,44,1,59,120,44,4,0,65,45,19,36,63,46,6,45,89,1,46,0,1,59,0,0,13,47,2,59,121,47,3,0,1,3,1,0,139,3,0,0,65,48,20,36,63,50,8,48,89,2,50,0,1,3,1,0,139,3,0,0,140,2,49,0,0,0,0,0,1,45,0,0,136,47,0,0,0,46,47,0,25,2,0,12,82,3,2,0,25,14,0,16,82,25,14,0,82,36,3,0,25,40,3,4,82,41,40,0,82,42,25,0,25,43,25,4,82,44,43,0,25,4,36,104,82,5,4,0,25,6,42,96,82,7,6,0,41,47,7,2,3,8,5,47,1,47,1,0,85,8,47,0,82,9,4,0,25,10,44,96,82,11,10,0,41,47,11,2,3,12,9,47,1,47,1,0,85,12,47,0,25,13,41,104,82,15,13,0,82,16,6,0,41,47,16,2,3,17,15,47,1,47,1,0,85,17,47,0,82,18,13,0,82,19,10,0,41,47,19,2,3,20,18,47,1,47,1,0,85,20,47,0,25,21,42,104,82,22,21,0,25,23,36,96,82,24,23,0,41,47,24,2,3,26,22,47,1,47,1,0,85,26,47,0,82,27,21,0,25,28,41,96,82,29,28,0,41,47,29,2,3,30,27,47,1,47,1,0,85,30,47,0,25,31,44,104,82,32,31,0,82,33,23,0,41,47,33,2,3,34,32,47,1,47,1,0,85,34,47,0,82,35,31,0,82,37,28,0,41,47,37,2,3,38,35,47,1,47,1,0,85,38,47,0,25,39,0,24,82,47,1,0,85,39,47,0,106,48,1,4,109,39,4,48,106,47,1,8,109,39,8,47,106,48,1,12,109,39,12,48,139,0,0,0,140,2,35,0,0,0,0,0,1,30,0,0,136,32,0,0,0,31,32,0,136,32,0,0,25,32,32,32,137,32,0,0,25,29,31,16,0,28,31,0,82,32,0,0,85,28,32,0,106,33,0,4,109,28,4,33,106,32,0,8,109,28,8,32,106,33,0,12,109,28,12,33,82,33,1,0,85,29,33,0,106,32,1,4,109,29,4,32,106,33,1,8,109,29,8,33,106,32,1,12,109,29,12,32,134,3,0,0,16,56,1,0,28,29,0,0,25,4,0,8,88,15,4,0,25,21,1,8,88,22,21,0,65,23,15,22,59,32,0,0,134,24,0,0,24,59,1,0,23,32,0,0,32,25,24,0,120,25,5,0,1,33,184,5,134,32,0,0,44,58,1,0,33,0,0,0,70,32,3,3,59,33,0,0,59,34,0,0,70,33,33,34,20,32,32,33,0,26,32,0,121,26,5,0,1,33,208,5,134,32,0,0,44,58,1,0,33,0,0,0,134,27,0,0,24,59,1,0,3,23,0,0,32,5,27,0,120,5,4,0,59,2,0,0,137,31,0,0,139,2,0,0,68,6,23,0,134,7,0,0,24,59,1,0,3,6,0,0,32,8,7,0,120,8,4,0,59,2,0,0,137,31,0,0,139,2,0,0,68,9,3,0,134,10,0,0,24,59,1,0,9,23,0,0,32,11,10,0,120,11,4,0,59,2,0,0,137,31,0,0,139,2,0,0,66,12,3,23,59,32,1,0,134,13,0,0,24,59,1,0,12,32,0,0,32,14,13,0,120,14,4,0,59,2,0,0,137,31,0,0,139,2,0,0,59,32,255,255,134,16,0,0,24,59,1,0,12,32,0,0,32,17,16,0,120,17,4,0,59,2,0,0,137,31,0,0,139,2,0,0,59,32,255,255,59,33,1,0,134,18,0,0,88,59,1,0,32,33,12,0,32,19,18,0,121,19,5,0,1,32,232,5,134,33,0,0,44,58,1,0,32,0,0,0,135,20,23,0,12,0,0,0,58,2,20,0,137,31,0,0,139,2,0,0,140,1,41,0,0,0,0,0,1,38,0,0,136,40,0,0,0,39,40,0,25,1,0,12,1,40,0,0,85,1,40,0,25,2,0,52,82,13,2,0,1,40,0,0,13,24,13,40,120,24,4,0,134,40,0,0,104,55,1,0,13,0,0,0,1,40,0,0,85,2,40,0,25,30,0,8,82,31,30,0,1,40,0,0,15,32,40,31,121,32,22,0,25,33,0,28,25,34,0,40,1,36,0,0,82,35,33,0,41,40,36,2,3,3,35,40,1,40,0,0,85,3,40,0,82,4,34,0,41,40,36,2,3,5,4,40,82,6,5,0,25,7,6,28,1,40,0,0,85,7,40,0,25,8,36,1,82,9,30,0,15,10,8,9,121,10,3,0,0,36,8,0,119,0,239,255,25,11,0,56,82,12,11,0,1,40,0,0,13,14,12,40,120,14,4,0,134,40,0,0,188,55,1,0,12,0,0,0,1,40,0,0,85,11,40,0,82,15,0,0,1,40,0,0,15,16,40,15,120,16,8,0,134,40,0,0,196,20,1,0,0,0,0,0,134,40,0,0,128,253,0,0,0,0,0,0,139,0,0,0,25,17,0,32,1,37,0,0,82,18,17,0,41,40,37,2,3,19,18,40,82,20,19,0,25,21,20,112,1,40,0,0,85,21,40,0,134,40,0,0,140,31,1,0,0,20,0,0,25,22,20,104,82,23,22,0,135,40,15,0,23,0,0,0,82,25,0,0,1,40,4,0,134,26,0,0,112,38,1,0,25,40,0,0,85,22,26,0,25,27,37,1,82,28,0,0,15,29,27,28,121,29,3,0,0,37,27,0,119,0,231,255,134,40,0,0,196,20,1,0,0,0,0,0,134,40,0,0,128,253,0,0,0,0,0,0,139,0,0,0,140,3,37,0,0,0,0,0,1,30,0,0,136,33,0,0,0,31,33,0,136,33,0,0,1,34,224,0,3,33,33,34,137,33,0,0,25,23,31,120,25,26,31,80,0,25,31,0,1,33,136,0,3,24,31,33,0,29,26,0,25,32,29,40,1,33,0,0,85,29,33,0,25,29,29,4,54,33,29,32,116,18,1,0,82,28,2,0,85,23,28,0,1,33,0,0,134,5,0,0,0,0,0,0,33,1,23,25,26,0,0,0,34,6,5,0,121,6,4,0,1,4,255,255,137,31,0,0,139,4,0,0,25,15,0,48,82,16,15,0,32,17,16,0,121,17,46,0,25,19,0,44,82,20,19,0,85,19,24,0,25,21,0,28,85,21,24,0,25,22,0,20,85,22,24,0,1,33,80,0,85,15,33,0,25,7,24,80,25,8,0,16,85,8,7,0,134,9,0,0,0,0,0,0,0,1,23,25,26,0,0,0,1,33,0,0,13,10,20,33,121,10,3,0,0,27,9,0,119,0,30,0,25,11,0,36,82,12,11,0,38,34,12,3,1,35,0,0,1,36,0,0,135,33,17,0,34,0,35,36,82,13,22,0,1,33,0,0,13,14,13,33,1,33,255,255,125,3,14,33,9,0,0,0,85,19,20,0,1,33,0,0,85,15,33,0,1,33,0,0,85,8,33,0,1,33,0,0,85,21,33,0,1,33,0,0,85,22,33,0,0,27,3,0,119,0,6,0,134,18,0,0,0,0,0,0,0,1,23,25,26,0,0,0,0,27,18,0,0,4,27,0,137,31,0,0,139,4,0,0,140,5,21,0,0,0,0,0,1,17,0,0,136,19,0,0,0,18,19,0,136,19,0,0,25,19,19,64,137,19,0,0,25,6,18,48,25,5,18,32,25,7,18,16,0,8,18,0,1,19,0,0,15,9,19,1,121,9,3,0,1,16,0,0,119,0,3,0,137,18,0,0,139,0,0,0,41,19,16,2,3,10,0,19,82,11,10,0,41,19,16,4,3,12,3,19,82,19,12,0,85,6,19,0,106,20,12,4,109,6,4,20,106,19,12,8,109,6,8,19,106,20,12,12,109,6,12,20,134,20,0,0,188,57,1,0,7,6,4,0,41,20,16,4,3,13,2,20,82,20,13,0,85,5,20,0,106,19,13,4,109,5,4,19,106,20,13,8,109,5,8,20,106,19,13,12,109,5,12,19,82,19,7,0,85,6,19,0,106,20,7,4,109,6,4,20,106,19,7,8,109,6,8,19,106,20,7,12,109,6,12,20,134,20,0,0,184,52,1,0,8,5,6,0,82,20,8,0,85,6,20,0,106,19,8,4,109,6,4,19,106,20,8,8,109,6,8,20,106,19,8,12,109,6,12,19,134,19,0,0,232,42,1,0,11,6,0,0,25,14,16,1,13,15,14,1,120,15,3,0,0,16,14,0,119,0,204,255,137,18,0,0,139,0,0,0,140,1,33,0,0,0,0,0,1,29,0,0,136,31,0,0,0,30,31,0,25,1,0,12,82,2,1,0,1,31,1,0,15,13,31,2,120,13,2,0,139,0,0,0,25,20,0,44,25,21,0,56,1,27,0,0,25,24,27,1,82,26,1,0,15,3,24,26,121,3,63,0,0,28,24,0,82,4,20,0,41,31,27,2,3,5,4,31,82,6,5,0,41,31,28,2,3,7,4,31,82,8,7,0,82,9,6,0,82,10,8,0,4,11,9,10,1,31,245,255,1,32,23,0,138,11,31,32,164,21,1,0,168,21,1,0,172,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,176,21,1,0,160,21,1,0,220,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,160,21,1,0,224,21,1,0,228,21,1,0,232,21,1,0,119,0,19,0,119,0,3,0,119,0,2,0,119,0,1,0,1,31,12,0,135,12,11,0,31,0,0,0,85,12,6,0,25,14,12,4,85,14,8,0,82,15,21,0,25,16,12,8,85,16,15,0,85,21,12,0,119,0,5,0,119,0,245,255,119,0,244,255,119,0,243,255,119,0,242,255,25,17,28,1,82,18,1,0,15,19,17,18,121,19,3,0,0,28,17,0,119,0,196,255,82,22,1,0,26,23,22,1,15,25,24,23,121,25,3,0,0,27,24,0,119,0,185,255,139,0,0,0,140,2,37,0,0,0,0,0,1,33,0,0,136,35,0,0,0,34,35,0,1,35,1,0,1,36,40,0,134,2,0,0,112,38,1,0,35,36,0,0,82,3,0,0,25,14,2,12,85,14,3,0,25,25,0,4,82,27,25,0,25,28,2,16,85,28,27,0,82,29,14,0,82,30,29,0,25,31,29,4,82,32,31,0,82,4,27,0,25,5,27,4,82,6,5,0,25,7,2,20,85,7,1,0,25,8,30,96,82,9,8,0,25,10,4,96,82,11,10,0,13,12,9,11,121,12,7,0,85,2,30,0,25,13,2,4,85,13,32,0,25,15,2,8,85,15,6,0,139,2,0,0,25,16,6,96,82,17,16,0,13,18,9,17,121,18,7,0,85,2,30,0,25,19,2,4,85,19,32,0,25,20,2,8,85,20,4,0,139,2,0,0,25,21,32,96,82,22,21,0,13,23,22,11,85,2,32,0,25,24,2,4,85,24,30,0,25,26,2,8,121,23,4,0,85,26,6,0,139,2,0,0,119,0,3,0,85,26,4,0,139,2,0,0,1,36,0,0,139,36,0,0,140,4,37,0,0,0,0,0,1,31,0,0,136,35,0,0,0,32,35,0,136,35,0,0,1,36,128,0,3,35,35,36,137,35,0,0,25,28,32,112,0,29,32,0,0,30,29,0,1,33,248,6,25,34,30,112,82,35,33,0,85,30,35,0,25,30,30,4,25,33,33,4,54,35,30,34,84,23,1,0,26,8,1,1,2,35,0,0,254,255,255,127,16,9,35,8,121,9,13,0,32,20,1,0,121,20,4,0,0,6,28,0,1,7,1,0,119,0,10,0,135,21,0,0,1,35,75,0,85,21,35,0,1,5,255,255,137,32,0,0,139,5,0,0,119,0,3,0,0,6,0,0,0,7,1,0,0,22,6,0,1,35,254,255,4,23,35,22,16,24,23,7,125,4,24,23,7,0,0,0,25,25,29,48,85,25,4,0,25,26,29,20,85,26,6,0,25,27,29,44,85,27,6,0,3,10,6,4,25,11,29,16,85,11,10,0,25,12,29,28,85,12,10,0,134,13,0,0], eb + 61440);
  HEAPU8.set([52,18,1,0,29,2,3,0,32,14,4,0,121,14,4,0,0,5,13,0,137,32,0,0,139,5,0,0,82,15,26,0,82,16,11,0,13,17,15,16,41,35,17,31,42,35,35,31,0,18,35,0,3,19,15,18,1,35,0,0,83,19,35,0,0,5,13,0,137,32,0,0,139,5,0,0,140,1,37,0,0,0,0,0,1,33,0,0,136,35,0,0,0,34,35,0,25,1,0,8,1,35,0,0,85,1,35,0,1,35,128,12,135,2,11,0,35,0,0,0,25,13,0,40,85,13,2,0,1,32,0,0,27,22,32,10,76,35,32,0,58,23,35,0,59,35,100,0,65,24,23,35,75,25,24,0,1,31,0,0,3,26,31,22,76,35,31,0,58,27,35,0,59,35,100,0,65,28,27,35,75,3,28,0,1,35,100,0,1,36,100,0,134,4,0,0,100,46,1,0,26,31,32,3,25,35,36,0,82,5,13,0,41,36,26,2,3,6,5,36,85,6,4,0,82,7,1,0,25,8,7,1,85,1,8,0,25,9,31,1,32,29,9,10,120,29,3,0,0,31,9,0,119,0,233,255,25,10,32,1,32,30,10,10,120,30,3,0,0,32,10,0,119,0,221,255,82,11,1,0,41,36,11,2,0,12,36,0,135,14,11,0,12,0,0,0,25,15,0,28,85,15,14,0,82,16,1,0,41,36,16,2,0,17,36,0,135,18,11,0,17,0,0,0,25,19,0,44,85,19,18,0,25,20,0,56,1,36,0,0,85,20,36,0,25,21,0,12,1,36,0,0,85,21,36,0,139,0,0,0,140,1,20,0,0,0,0,0,1,16,0,0,136,18,0,0,0,17,18,0,136,18,0,0,25,18,18,64,137,18,0,0,25,2,17,48,25,1,17,32,25,3,17,16,0,4,17,0,82,7,0,0,1,18,0,0,15,8,18,7,120,8,3,0,137,17,0,0,139,0,0,0,25,9,0,32,1,15,0,0,82,10,9,0,41,18,15,2,3,11,10,18,82,12,11,0,25,13,12,48,134,18,0,0,248,45,1,0,3,12,0,0,82,18,13,0,85,1,18,0,106,19,13,4,109,1,4,19,106,18,13,8,109,1,8,18,106,19,13,12,109,1,12,19,82,19,3,0,85,2,19,0,106,18,3,4,109,2,4,18,106,19,3,8,109,2,8,19,106,18,3,12,109,2,12,18,134,18,0,0,184,52,1,0,4,1,2,0,82,18,4,0,85,13,18,0,106,19,4,4,109,13,4,19,106,18,4,8,109,13,8,18,106,19,4,12,109,13,12,19,25,14,15,1,82,5,0,0,15,6,14,5,121,6,3,0,0,15,14,0,119,0,216,255,137,17,0,0,139,0,0,0,140,1,48,0,0,0,0,0,1,44,0,0,136,46,0,0,0,45,46,0,82,2,0,0,25,3,0,4,82,14,3,0,25,25,2,104,82,34,25,0,25,35,14,96,82,36,35,0,41,46,36,2,3,37,34,46,82,38,37,0,32,39,38,0,121,39,4,0,59,47,10,0,58,46,47,0,119,0,3,0,59,47,7,0,58,46,47,0,58,1,46,0,25,4,2,32,88,5,4,0,25,6,14,32,88,7,6,0,134,42,0,0,88,41,1,0,5,7,0,0,58,8,42,0,25,9,2,16,88,10,9,0,25,11,14,16,88,12,11,0,134,40,0,0,32,42,1,0,10,12,0,0,58,13,40,0,64,15,8,13,59,46,0,0,134,16,0,0,76,28,1,0,46,15,0,0,58,17,16,0,25,18,2,36,88,19,18,0,25,20,14,36,88,21,20,0,134,43,0,0,88,41,1,0,19,21,0,0,58,22,43,0,25,23,2,20,88,24,23,0,25,26,14,20,88,27,26,0,134,41,0,0,32,42,1,0,24,27,0,0,58,28,41,0,64,29,22,28,59,46,0,0,134,30,0,0,76,28,1,0,46,29,0,0,58,31,30,0,65,32,17,31,65,33,1,32,139,33,0,0,140,1,17,0,0,0,0,0,1,13,0,0,136,15,0,0,0,14,15,0,136,15,0,0,25,15,15,48,137,15,0,0,25,2,14,32,25,1,14,16,0,3,14,0,25,4,0,8,88,5,4,0,59,15,100,0,65,6,5,15,25,7,0,4,82,8,7,0,82,9,0,0,82,15,8,0,85,1,15,0,106,16,8,4,109,1,4,16,106,15,8,8,109,1,8,15,106,16,8,12,109,1,12,16,82,16,9,0,85,2,16,0,106,15,9,4,109,2,4,15,106,16,9,8,109,2,8,16,106,15,9,12,109,2,12,15,134,15,0,0,116,52,1,0,3,1,2,0,82,15,3,0,85,2,15,0,106,16,3,4,109,2,4,16,106,15,3,8,109,2,8,15,106,16,3,12,109,2,12,16,134,10,0,0,80,40,1,0,2,0,0,0,64,11,10,6,65,12,11,11,137,14,0,0,139,12,0,0,140,2,31,0,0,0,0,0,1,28,0,0,136,30,0,0,0,29,30,0,127,30,0,0,87,30,0,0,127,30,0,0,82,3,30,0,127,30,0,0,106,4,30,4,2,30,0,0,255,255,255,127,19,30,4,30,0,15,30,0,2,30,0,0,0,0,240,127,16,21,30,15,1,30,0,0,16,22,30,3,2,30,0,0,0,0,240,127,13,23,15,30,19,30,23,22,0,24,30,0,20,30,21,24,0,25,30,0,121,25,3,0,58,2,1,0,139,2,0,0,127,30,0,0,87,30,1,0,127,30,0,0,82,26,30,0,127,30,0,0,106,27,30,4,2,30,0,0,255,255,255,127,19,30,27,30,0,5,30,0,2,30,0,0,0,0,240,127,16,6,30,5,1,30,0,0,16,7,30,26,2,30,0,0,0,0,240,127,13,8,5,30,19,30,8,7,0,9,30,0,20,30,6,9,0,10,30,0,121,10,3,0,58,2,0,0,139,2,0,0,1,30,63,0,135,11,4,0,3,4,30,0,128,30,0,0,0,12,30,0,1,30,63,0,135,13,4,0,26,27,30,0,128,30,0,0,0,14,30,0,13,16,11,13,121,16,7,0,71,19,0,1,126,20,19,1,0,0,0,0,58,2,20,0,139,2,0,0,119,0,6,0,34,17,4,0,126,18,17,1,0,0,0,0,58,2,18,0,139,2,0,0,59,30,0,0,139,30,0,0,140,1,28,0,0,0,0,0,1,25,0,0,136,27,0,0,0,26,27,0,25,1,0,32,82,2,1,0,82,13,0,0,134,27,0,0,180,50,1,0,2,13,0,0,25,18,0,36,82,19,18,0,25,20,0,4,82,21,20,0,134,27,0,0,32,51,1,0,19,21,0,0,25,22,0,40,82,23,22,0,25,24,0,8,82,3,24,0,134,27,0,0,108,53,1,0,23,3,0,0,25,4,0,48,82,5,4,0,1,27,0,0,13,6,5,27,120,6,4,0,134,27,0,0,104,55,1,0,5,0,0,0,25,7,0,52,82,8,7,0,1,27,0,0,13,9,8,27,120,9,4,0,134,27,0,0,104,55,1,0,8,0,0,0,25,10,0,56,82,11,10,0,134,27,0,0,188,55,1,0,11,0,0,0,25,12,0,28,82,14,12,0,135,27,15,0,14,0,0,0,25,15,0,44,82,16,15,0,135,27,15,0,16,0,0,0,82,17,22,0,135,27,15,0,17,0,0,0,135,27,15,0,0,0,0,0,139,0,0,0,140,2,22,0,0,0,0,0,1,19,0,0,136,21,0,0,0,20,21,0,127,21,0,0,87,21,0,0,127,21,0,0,82,4,21,0,127,21,0,0,106,5,21,4,1,21,52,0,135,10,4,0,4,5,21,0,128,21,0,0,0,11,21,0,1,21,255,7,19,21,10,21,0,12,21,0,32,21,12,0,121,21,21,0,59,21,0,0,70,13,0,21,121,13,12,0,61,21,0,0,0,0,128,95,65,14,0,21,134,15,0,0,124,30,1,0,14,1,0,0,82,16,1,0,26,17,16,64,58,3,15,0,0,18,17,0,119,0,3,0,58,3,0,0,1,18,0,0,85,1,18,0,58,2,3,0,139,2,0,0,119,0,26,0,1,21,255,7,45,21,12,21,56,31,1,0,58,2,0,0,139,2,0,0,119,0,20,0,1,21,254,3,4,6,12,21,85,1,6,0,2,21,0,0,255,255,15,128,19,21,5,21,0,7,21,0,2,21,0,0,0,0,224,63,20,21,7,21,0,8,21,0,127,21,0,0,85,21,4,0,127,21,0,0,109,21,4,8,127,21,0,0,86,9,21,0,58,2,9,0,139,2,0,0,59,21,0,0,139,21,0,0,140,2,29,0,0,0,0,0,1,26,0,0,136,28,0,0,0,27,28,0,25,3,1,4,88,4,3,0,59,28,232,3,74,28,4,28,12,14,28,0,121,14,20,0,59,28,0,0,72,28,4,28,12,15,28,0,121,15,14,0,75,16,4,0,76,28,16,0,58,17,28,0,59,28,100,0,66,18,17,28,75,19,18,0,1,28,232,3,5,24,19,28,28,28,24,100,38,28,28,255,0,25,28,0,0,23,25,0,119,0,4,0,1,23,0,0,119,0,2,0,1,23,90,0,88,20,1,0,59,28,232,3,74,28,20,28,12,21,28,0,121,21,15,0,59,28,0,0,72,28,20,28,12,5,28,0,121,5,9,0,75,6,20,0,76,28,6,0,58,7,28,0,59,28,100,0,66,8,7,28,75,9,8,0,0,22,9,0,119,0,4,0,1,22,0,0,119,0,2,0,1,22,9,0,25,10,0,40,82,11,10,0,3,2,22,23,41,28,2,2,3,12,11,28,82,13,12,0,134,28,0,0,128,32,1,0,0,1,13,0,139,0,0,0,140,3,25,0,0,0,0,0,1,22,0,0,136,24,0,0,0,23,24,0,25,3,2,28,82,4,3,0,25,14,1,112,85,14,4,0,85,3,1,0,25,15,0,28,82,16,15,0,82,17,2,0,41,24,17,2,3,18,16,24,82,19,18,0,32,20,19,0,120,20,8,0,82,11,15,0,82,12,2,0,41,24,12,2,3,13,11,24,1,24,1,0,85,13,24,0,139,0,0,0,25,21,0,44,82,5,21,0,25,6,0,12,82,7,6,0,41,24,7,2,3,8,5,24,85,8,2,0,82,9,6,0,25,10,9,1,85,6,10,0,82,11,15,0,82,12,2,0,41,24,12,2,3,13,11,24,1,24,1,0,85,13,24,0,139,0,0,0,140,1,26,0,0,0,0,0,1,23,0,0,136,25,0,0,0,24,25,0,25,2,0,74,78,3,2,0,41,25,3,24,42,25,25,24,0,14,25,0,1,25,255,0,3,16,14,25,20,25,16,14,0,17,25,0,1,25,255,0,19,25,17,25,0,18,25,0,83,2,18,0,82,19,0,0,38,25,19,8,0,20,25,0,32,21,20,0,121,21,22,0,25,4,0,8,1,25,0,0,85,4,25,0,25,5,0,4,1,25,0,0,85,5,25,0,25,6,0,44,82,7,6,0,25,8,0,28,85,8,7,0,25,9,0,20,85,9,7,0,0,10,7,0,25,11,0,48,82,12,11,0,3,13,10,12,25,15,0,16,85,15,13,0,1,1,0,0,139,1,0,0,119,0,6,0,39,25,19,32,0,22,25,0,85,0,22,0,1,1,255,255,139,1,0,0,1,25,0,0,139,25,0,0,140,4,20,0,0,0,0,0,136,15,0,0,0,14,15,0,136,15,0,0,25,15,15,8,137,15,0,0,0,4,14,0,42,15,1,31,34,17,1,0,1,18,255,255,1,19,0,0,125,16,17,18,19,0,0,0,41,16,16,1,20,15,15,16,0,5,15,0,34,16,1,0,1,19,255,255,1,18,0,0,125,15,16,19,18,0,0,0,42,15,15,31,34,19,1,0,1,16,255,255,1,17,0,0,125,18,19,16,17,0,0,0,41,18,18,1,20,15,15,18,0,6,15,0,42,15,3,31,34,17,3,0,1,16,255,255,1,19,0,0,125,18,17,16,19,0,0,0,41,18,18,1,20,15,15,18,0,7,15,0,34,18,3,0,1,19,255,255,1,16,0,0,125,15,18,19,16,0,0,0,42,15,15,31,34,19,3,0,1,18,255,255,1,17,0,0,125,16,19,18,17,0,0,0,41,16,16,1,20,15,15,16,0,8,15,0,21,15,5,0,21,16,6,1,134,9,0,0,136,59,1,0,15,16,5,6,128,16,0,0,0,10,16,0,21,16,7,2,21,15,8,3,134,11,0,0,136,59,1,0,16,15,7,8,128,16,0,0,134,15,0,0,72,194,0,0,9,10,11,16,4,0,0,0,82,15,4,0,21,15,15,5,106,16,4,4,21,16,16,6,134,12,0,0,136,59,1,0,15,16,5,6,128,16,0,0,0,13,16,0,137,14,0,0,129,13,0,0,139,12,0,0,140,2,26,0,0,0,0,0,1,23,0,0,136,25,0,0,0,24,25,0,82,3,0,0,25,4,3,96,82,15,4,0,82,16,1,0,25,17,16,96,82,18,17,0,13,19,15,18,121,19,5,0,1,14,1,0,38,25,14,1,0,13,25,0,139,13,0,0,25,20,1,4,82,21,20,0,25,22,21,96,82,5,22,0,13,6,15,5,121,6,5,0,1,14,1,0,38,25,14,1,0,13,25,0,139,13,0,0,25,7,0,4,82,8,7,0,25,9,8,96,82,10,9,0,13,11,10,18,13,12,10,5,20,25,11,12,0,2,25,0,0,14,2,0,38,25,14,1,0,13,25,0,139,13,0,0,140,2,25,0,0,0,0,0,1,21,0,0,136,23,0,0,0,22,23,0,78,6,0,0,78,7,1,0,41,23,6,24,42,23,23,24,41,24,7,24,42,24,24,24,14,11,23,24,41,24,6,24,42,24,24,24,32,12,24,0,20,24,12,11,0,20,24,0,121,20,4,0,0,4,6,0,0,5,7,0,119,0,24,0,0,2,0,0,0,3,1,0,25,13,2,1,25,14,3,1,78,15,13,0,78,16,14,0,41,24,15,24,42,24,24,24,41,23,16,24,42,23,23,24,14,17,24,23,41,23,15,24,42,23,23,24,32,18,23,0,20,23,18,17,0,19,23,0,121,19,4,0,0,4,15,0,0,5,16,0,119,0,4,0,0,2,13,0,0,3,14,0,119,0,236,255,1,23,255,0,19,23,4,23,0,8,23,0,1,23,255,0,19,23,5,23,0,9,23,0,4,10,8,9,139,10,0,0,140,1,11,0,0,0,0,0,1,7,0,0,136,9,0,0,0,8,9,0,41,9,0,24,42,9,9,24,0,2,9,0,26,6,2,48,35,5,6,10,121,5,8,0,1,9,208,0,3,3,2,9,1,9,255,0,19,9,3,9,0,4,9,0,0,1,4,0,119,0,62,0,1,9,65,0,1,10,38,0,138,2,9,10,160,37,1,0,164,37,1,0,168,37,1,0,172,37,1,0,176,37,1,0,180,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,152,37,1,0,184,37,1,0,192,37,1,0,200,37,1,0,208,37,1,0,216,37,1,0,224,37,1,0,1,1,255,255,119,0,19,0,119,0,6,0,119,0,7,0,119,0,8,0,119,0,9,0,119,0,10,0,119,0,11,0,1,1,10,0,119,0,11,0,1,1,11,0,119,0,9,0,1,1,12,0,119,0,7,0,1,1,13,0,119,0,5,0,1,1,14,0,119,0,3,0,1,1,15,0,119,0,1,0,139,1,0,0,140,3,23,0,0,0,0,0,1,20,0,0,136,22,0,0,0,21,22,0,25,4,0,8,82,5,4,0,82,12,0,0,4,13,5,12,16,14,13,1,121,14,3,0,1,3,0,0,139,3,0,0,25,15,0,12,82,16,15,0,32,17,16,0,120,17,8,0,3,18,12,1,85,0,18,0,82,19,15,0,16,6,19,18,121,6,3,0,1,3,0,0,139,3,0,0,25,7,0,20,82,8,7,0,25,9,0,28,82,10,9,0,38,22,8,3,135,11,17,0,22,1,2,10,0,3,11,0,139,3,0,0,140,2,20,0,0,0,0,0,1,16,0,0,136,18,0,0,0,17,18,0,32,3,0,0,121,3,3,0,1,15,0,0,119,0,18,0,5,4,1,0,20,18,1,0,0,7,18,0,2,18,0,0,255,255,0,0,16,8,18,7,121,8,10,0,7,18,4,0,38,18,18,255,0,9,18,0,13,10,9,1,1,18,255,255,125,2,10,4,18,0,0,0,0,15,2,0,119,0,2,0,0,15,4,0,135,11,11,0,15,0,0,0,1,18,0,0,13,12,11,18,121,12,2,0,139,11,0,0,26,13,11,4,82,14,13,0,38,18,14,3,0,5,18,0,32,6,5,0,121,6,2,0,139,11,0,0,1,19,0,0,135,18,1,0,11,19,15,0,139,11,0,0,140,4,20,0,0,0,0,0,42,15,1,31,34,17,1,0,1,18,255,255,1,19,0,0,125,16,17,18,19,0,0,0,41,16,16,1,20,15,15,16,0,4,15,0,34,16,1,0,1,19,255,255,1,18,0,0,125,15,16,19,18,0,0,0,42,15,15,31,34,19,1,0,1,16,255,255,1,17,0,0,125,18,19,16,17,0,0,0,41,18,18,1,20,15,15,18,0,5,15,0,42,15,3,31,34,17,3,0,1,16,255,255,1,19,0,0,125,18,17,16,19,0,0,0,41,18,18,1,20,15,15,18,0,6,15,0,34,18,3,0,1,19,255,255,1,16,0,0,125,15,18,19,16,0,0,0,42,15,15,31,34,19,3,0,1,18,255,255,1,17,0,0,125,16,19,18,17,0,0,0,41,16,16,1,20,15,15,16,0,7,15,0,21,15,4,0,21,16,5,1,134,8,0,0,136,59,1,0,15,16,4,5,128,16,0,0,0,9,16,0,21,16,6,2,21,15,7,3,134,10,0,0,136,59,1,0,16,15,6,7,21,15,6,4,0,11,15,0,21,15,7,5,0,12,15,0,128,15,0,0,1,16,0,0,134,13,0,0,72,194,0,0,8,9,10,15,16,0,0,0,21,16,13,11,128,15,0,0,21,15,15,12,134,14,0,0,136,59,1,0,16,15,11,12,139,14,0,0,140,1,9,0,0,0,0,0,1,5,0,0,136,7,0,0,0,6,7,0,136,7,0,0,25,7,7,32,137,7,0,0,25,4,6,16,0,3,6,0,82,7,0,0,85,3,7,0,106,8,0,4,109,3,4,8,106,7,0,8,109,3,8,7,106,8,0,12,109,3,12,8,82,8,0,0,85,4,8,0,106,7,0,4,109,4,4,7,106,8,0,8,109,4,8,8,106,7,0,12,109,4,12,7,134,1,0,0,16,56,1,0,3,4,0,0,135,2,16,0,1,0,0,0,137,6,0,0,139,2,0,0,140,1,19,0,0,0,0,0,1,16,0,0,136,18,0,0,0,17,18,0,25,1,0,4,82,2,1,0,1,18,0,0,15,5,18,2,120,5,3,0,59,14,0,0,139,14,0,0,25,6,0,36,1,13,0,0,59,15,0,0,82,7,6,0,41,18,13,2,3,8,7,18,82,9,8,0,134,10,0,0,124,27,1,0,9,0,0,0,63,11,15,10,25,12,13,1,82,3,1,0,15,4,12,3,121,4,4,0,0,13,12,0,58,15,11,0,119,0,242,255,58,14,11,0,119,0,1,0,139,14,0,0,140,2,18,0,0,0,0,0,1,15,0,0,136,17,0,0,0,16,17,0,127,17,0,0,89,17,0,0,127,17,0,0,82,4,17,0,2,17,0,0,255,255,255,127,19,17,4,17,0,5,17,0,2,17,0,0,0,0,128,127,16,7,17,5,121,7,3,0,58,2,1,0,139,2,0,0,127,17,0,0,89,17,1,0,127,17,0,0,82,8,17,0,2,17,0,0,255,255,255,127,19,17,8,17,0,9,17,0,2,17,0,0,0,0,128,127,16,10,17,9,121,10,3,0,58,2,0,0,139,2,0,0,21,17,8,4,0,3,17,0,34,11,3,0,121,11,7,0,34,12,4,0,126,13,12,0,1,0,0,0,58,2,13,0,139,2,0,0,119,0,6,0,71,14,0,1,126,6,14,0,1,0,0,0,58,2,6,0,139,2,0,0,59,17,0,0,139,17,0,0,140,2,18,0,0,0,0,0,1,15,0,0,136,17,0,0,0,16,17,0,127,17,0,0,89,17,0,0,127,17,0,0,82,4,17,0,2,17,0,0,255,255,255,127,19,17,4,17,0,5,17,0,2,17,0,0,0,0,128,127,16,7,17,5,121,7,3,0,58,2,1,0,139,2,0,0,127,17,0,0,89,17,1,0,127,17,0,0,82,8,17,0,2,17,0,0,255,255,255,127,19,17,8,17,0,9,17,0,2,17,0,0,0,0,128,127,16,10,17,9,121,10,3,0,58,2,0,0,139,2,0,0,21,17,8,4,0,3,17,0,34,11,3,0,121,11,7,0,34,12,4,0,126,13,12,1,0,0,0,0,58,2,13,0,139,2,0,0,119,0,6,0,71,14,0,1,126,6,14,1,0,0,0,0,58,2,6,0,139,2,0,0,59,17,0,0,139,17,0,0,140,2,21,0,0,0,0,0,1,18,0,0,136,20,0,0,0,19,20,0,82,2,1,0,85,0,2,0,25,3,1,4,82,10,3,0,25,11,0,4,85,11,10,0,88,12,1,0,59,20,206,255,63,13,12,20,25,14,0,16,89,14,13,0,88,15,3,0,59,20,206,255,63,16,15,20,25,17,0,20,89,17,16,0,88,4,1,0,59,20,50,0,63,5,4,20,25,6,0,32,89,6,5,0,88,7,3,0,59,20,50,0,63,8,7,20,25,9,0,36,89,9,8,0,139,0,0,0,140,1,16,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,134,1,0,0,104,44,1,0,0,0,0,0,25,2,1,68,1,14,1,0,85,2,14,0,25,3,1,72,1,14,2,0,85,3,14,0,25,4,1,32,82,5,4,0,82,6,1,0,134,14,0,0,56,238,0,0,5,6,0,0,134,14,0,0,164,16,1,0,1,0,0,0,1,14,1,0,1,15,4,0,134,7,0,0,112,38,1,0,14,15,0,0,1,15,1,0,1,14,4,0,134,8,0,0,112,38,1,0,15,14,0,0,1,14,0,0,13,9,7,14,1,14,0,0,13,10,8,14,20,14,9,10,0,11,14,0,121,11,6,0,1,15,208,3,134,14,0,0,44,58,1,0,15,0,0,0,119,0,18,0,61,15,0,0,172,197,39,55,134,14,0,0,12,212,0,0,1,15,7,8,1,15,0,4,135,14,24,0,15,0,0,0,134,14,0,0,140,29,1,0,1,0,0,0,135,14,15,0,8,0,0,0,135,14,15,0,7,0,0,0,1,14,0,0,139,14,0,0,1,14,0,0,139,14,0,0,140,1,21,0,0,0,0,0,1,17,0,0,136,19,0,0,0,18,19,0,136,19,0,0,25,19,19,16,137,19,0,0,25,16,18,12,25,15,18,8,0,1,18,0,134,19,0,0,196,3,1,0,1,0,16,15,82,2,1,0,25,7,1,4,82,8,7,0,82,9,15,0,76,19,9,0,58,10,19,0,82,11,16,0,76,19,11,0,58,12,19,0,135,13,25,0,12,0,0,0,65,14,12,13,73,3,10,14,121,3,4,0,1,20,216,0,135,19,24,0,20,0,0,0,82,4,16,0,82,5,15,0,134,6,0,0,8,55,1,0,2,8,4,5,137,18,0,0,139,6,0,0,140,1,18,0,0,0,0,0,1,15,0,0,136,17,0,0,0,16,17,0,82,1,0,0,1,17,0,0,15,2,17,1,120,2,3,0,59,13,0,0,139,13,0,0,25,4,0,32,1,12,0,0,59,14,0,0,82,5,4,0,41,17,12,2,3,6,5,17,82,7,6,0,134,8,0,0,188,46,1,0,7,0,0,0,63,9,14,8,25,10,12,1,82,11,0,0,15,3,10,11,121,3,4,0,0,12,10,0,58,14,9,0,119,0,242,255,58,13,9,0,119,0,1,0,139,13,0,0,140,1,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,25,1,0,52,82,8,1,0,1,14,0,0,13,2,8,14,121,2,4,0,59,10,0,0,139,10,0,0,119,0,3,0,0,9,8,0,59,11,0,0,134,3,0,0,168,246,0,0,9,0,0,0,63,4,11,3,25,5,9,20,82,7,5,0,1,14,0,0,13,6,7,14,121,6,3,0,58,10,4,0,119,0,4,0,0,9,7,0,58,11,4,0,119,0,243,255,139,10,0,0,140,2,8,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,136,6,0,0,25,6,6,32,137,6,0,0,25,3,5,16,0,2,5,0,134,6,0,0,40,47,1,0,2,1,0,0,82,6,2,0,85,3,6,0,106,7,2,4,109,3,4,7,106,6,2,8,109,3,8,6,106,7,2,12,109,3,12,7,59,6,2,0,134,7,0,0,188,57,1,0,0,3,6,0,137,5,0,0,139,0,0,0,140,7,17,0,0,0,0,0,1,14,0,0,136,16,0,0,0,15,16,0,1,16,32,0,135,7,11,0,16,0,0,0,85,7,0,0,25,8,7,4,85,8,1,0,25,9,7,8,85,9,2,0,25,10,7,12,85,10,3,0,25,11,7,16,85,11,4,0,25,12,7,20,85,12,5,0,25,13,7,24,85,13,6,0,139,7,0,0,140,1,9,0,0,0,0,0,1,5,0,0,136,7,0,0,0,6,7,0,136,7,0,0,25,7,7,32,137,7,0,0,25,3,6,16,0,2,6,0,134,7,0,0,40,47,1,0,2,0,0,0,82,7,2,0,85,3,7,0,106,8,2,4,109,3,4,8,106,7,2,8,109,3,8,7,106,8,2,12,109,3,12,8,134,1,0,0,80,40,1,0,3,0,0,0,65,4,1,1,137,6,0,0,139,4,0,0,140,2,12,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,136,10,0,0,25,10,10,16,137,10,0,0,0,2,9,0,88,3,1,0,59,10,244,1,64,4,10,3,25,5,1,4,88,6,5,0,59,10,244,1,64,7,10,6,134,10,0,0,40,52,1,0,2,4,7,0,82,10,2,0,85,0,10,0,106,11,2,4,109,0,4,11,106,10,2,8,109,0,8,10,106,11,2,12,109,0,12,11,137,9,0,0,139,0,0,0,140,1,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,25,2,0,48,82,3,2,0,1,14,0,0,13,4,3,14,121,4,4,0,59,1,0,0,139,1,0,0,119,0,3,0,0,10,3,0,59,11,0,0,134,5,0,0,120,7,1,0,10,0,0,0,63,6,11,5,25,7,10,20,82,8,7,0,1,14,0,0,13,9,8,14,121,9,3,0,58,1,6,0,119,0,4,0,0,10,8,0,58,11,6,0,119,0,243,255,139,1,0,0,140,2,17,0,0,0,0,0,1,13,0,0,136,15,0,0,0,14,15,0,25,2,1,32,82,3,2,0,82,5,1,0,25,6,1,60,82,7,6,0,25,8,1,64,82,9,8,0,134,15,0,0,156,19,1,0,3,5,7,9,0,0,0,0,134,15,0,0,164,16,1,0,1,0,0,0,25,10,1,68,82,11,10,0,38,16,11,3,135,15,14,0,16,1,0,0,25,12,1,24,88,4,12,0,139,4,0,0,140,3,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,25,3,0,100,82,4,3,0,25,5,4,1,85,3,5,0,25,6,1,100,82,7,6,0,25,8,7,1,85,6,8,0,1,14,12,0,135,9,11,0,14,0,0,0,85,9,0,0,25,10,9,4,85,10,1,0,25,11,9,8,89,11,2,0,139,9,0,0,140,4,11,0,0,0,0,0,0,4,0,0,0,5,2,0,134,6,0,0,16,54,1,0,4,5,0,0,128,9,0,0,0,7,9,0,5,8,1,5,5,9,3,4,3,9,9,8,3,9,9,7,38,10,7,0,20,9,9,10,129,9,0,0,38,9,6,255,39,9,9,0,139,9,0,0,140,4,17,0,0,0,0,0,1,13,0,0,136,15,0,0,0,14,15,0,82,4,3,0,41,15,4,1,0,5,15,0,25,6,3,4,82,7,6,0,41,15,7,1,0,8,15,0,25,9,3,8,82,10,9,0,27,11,10,3,1,15,0,0,135,12,26,0,15,0,1,2,5,8,11,0,1,16,244,1,135,15,27,0,16,0,0,0,139,0,0,0,140,3,17,0,0,0,0,0,1,14,0,0,136,16,0,0,0,15,16,0,25,3,0,16,82,4,3,0,25,5,0,20,82,6,5,0,0,7,4,0,0,8,6,0,4,9,7,8,16,10,2,9,125,13,10,2,9,0,0,0,135,16,9,0,6,1,13,0,82,11,5,0,3,12,11,13,85,5,12,0,139,2,0,0,140,1,7,0,0,0,0,0,1,3,0,0,136,5,0,0,0,4,5,0,136,5,0,0,25,5,5,32,137,5,0,0,0,2,4,0,1,5,0,0,85,2,5,0,1,6,0,0,109,2,4,6,1,5,0,0,109,2,8,5,1,6,0,0,109,2,12,6,1,5,0,0,109,2,16,5,1,6,0,0,109,2,20,6,25,1,2,12,1,6,1,0,85,1,6,0,134,6,0,0,240,251,0,0,2,0,0,0,137,4,0,0,139,0,0,0,140,2,8,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,136,6,0,0,25,6,6,32,137,6,0,0,0,3,5,0,1,6,0,0,85,3,6,0,1,7,0,0,109,3,4,7,1,6,0,0,109,3,8,6,1,7,0,0,109,3,12,7,1,6,0,0,109,3,16,6,1,7,0,0,109,3,20,7,1,7,0,0,134,2,0,0,152,103,0,0,3,0,1,7,137,5,0,0,139,2,0,0,140,2,11,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,1,10,0,0,15,2,10,1,121,2,3,0,1,7,0,0,119,0,4,0,135,10,15,0,0,0,0,0,139,0,0,0,41,10,7,2,3,3,0,10,82,4,3,0,134,10,0,0,76,60,1,0,4,0,0,0,25,5,7,1,13,6,5,1,120,6,3,0,0,7,5,0,119,0,246,255,135,10,15,0,0,0,0,0,139,0,0,0,140,2,11,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,1,10,0,0,15,2,10,1,121,2,3,0,1,7,0,0,119,0,4,0,135,10,15,0,0,0,0,0,139,0,0,0,41,10,7,2,3,3,0,10,82,4,3,0,135,10,15,0,4,0,0,0,25,5,7,1,13,6,5,1,120,6,3,0,0,7,5,0,119,0,247,255,135,10,15,0,0,0,0,0,139,0,0,0,140,2,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,82,4,0,0,25,5,4,100,82,6,5,0,82,7,1,0,25,8,7,100,82,9,8,0,15,10,6,9,15,11,9,6,41,14,11,31,42,14,14,31,0,2,14,0,1,14,1,0,125,3,10,14,2,0,0,0,139,3,0,0,140,2,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,82,4,0,0,25,5,4,96,82,6,5,0,82,7,1,0,25,8,7,96,82,9,8,0,15,10,9,6,15,11,6,9,41,14,11,31,42,14,14,31,0,2,14,0,1,14,1,0,125,3,10,14,2,0,0,0,139,3,0,0,140,3,13,0,0,0,0,0,1,10,0,0,136,12,0,0,0,11,12,0,65,3,1,1,65,4,2,2,63,5,3,4,135,6,16,0,5,0,0,0,89,0,1,0,25,7,0,4,89,7,2,0,25,8,0,8,89,8,6,0,25,9,0,12,1,12,0,0,85,9,12,0,139,0,0,0,140,3,14,0,0,0,0,0,1,11,0,0,136,13,0,0,0,12,13,0,88,3,1,0,88,4,2,0,64,5,3,4,25,6,1,4,88,7,6,0,25,8,2,4,88,9,8,0,64,10,7,9,134,13,0,0,40,52,1,0,0,5,10,0,139,0,0,0,140,3,14,0,0,0,0,0,1,11,0,0,136,13,0,0,0,12,13,0,88,3,1,0,88,4,2,0,63,5,3,4,25,6,1,4,88,7,6,0,25,8,2,4,88,9,8,0,63,10,7,9,134,13,0,0,40,52,1,0,0,5,10,0,139,0,0,0,140,2,16,0,0,0,0,0,1,13,0,0,136,15,0,0,0,14,15,0,134,3,0,0,24,59,1,0,0,1,0,0,32,4,3,0,120,4,3,0,1,2,1,0,139,2,0,0,58,5,1,0,62,15,0,0,123,20,174,71,225,122,132,63,65,6,5,15,135,7,13,0,6,0,0,0,58,8,7,0,64,9,1,0,135,12,13,0,9,0,0,0,72,10,12,8,38,15,10,1,0,11,15,0,0,2,11,0,139,2,0,0,140,2,11,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,1,10,0,0,15,2,10,1,121,2,3,0,1,7,0,0,119,0,2,0,139,0,0,0,41,10,7,2,3,3,0,10,82,4,3,0,135,10,15,0,4,0,0,0,25,5,7,1,13,6,5,1,120,6,3,0,0,7,5,0,119,0,247,255,139,0,0,0,140,1,15,0,0,0,0,0,1,12,0,0,136,14,0,0,0,13,14,0,25,1,0,4,82,2,1,0,25,4,2,100,82,5,4,0,25,6,0,8,82,7,6,0,25,8,7,100,82,9,8,0,5,10,9,5,76,14,10,0,58,11,14,0,59,14,1,0,66,3,14,11,139,3,0,0,140,2,11,0,0,0,0,0,2,9,0,0,255,255,0,0,19,9,0,9,0,2,9,0,2,9,0,0,255,255,0,0,19,9,1,9,0,3,9,0,5,4,3,2,43,9,0,16,0,5,9,0,43,9,4,16,5,10,3,5,3,6,9,10,43,10,1,16,0,7,10,0,5,8,7,2,43,10,6,16,5,9,7,5,3,10,10,9,2,9,0,0,255,255,0,0,19,9,6,9,3,9,9,8,43,9,9,16,3,10,10,9,129,10,0,0,3,10,6,8,41,10,10,16,2,9,0,0,255,255,0,0,19,9,4,9,20,10,10,9,39,10,10,0,139,10,0,0,140,2,8,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,136,6,0,0,25,6,6,16,137,6,0,0,0,2,5,0,1,6,16,0,135,3,11,0,6,0,0,0,134,6,0,0,40,52,1,0,2,0,1,0,82,6,2,0,85,3,6,0,106,7,2,4,109,3,4,7,106,6,2,8,109,3,8,6,106,7,2,12,109,3,12,7,137,5,0,0,139,3,0,0,140,4,12,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,1,10,1,0,1,11,76,0,134,4,0,0,112,38,1,0,10,11,0,0,134,11,0,0,76,24,1,0,4,0,0,0,25,5,4,32,85,5,0,0,25,6,4,36,85,6,1,0,85,4,2,0,25,7,4,4,85,7,3,0,134,11,0,0,192,8,1,0,4,0,0,0,139,4,0,0,140,1,9,0,0,0,0,0,1,6,0,0,136,8,0,0,0,7,8,0,1,8,0,0,13,1,0,8,121,1,3,0,139,0,0,0,119,0,2,0,0,5,0,0,25,2,5,20,82,3,2,0,135,8,15,0,5,0,0,0,1,8,0,0,13,4,3,8,120,4,3,0,0,5,3,0,119,0,248,255,139,0,0,0,140,1,9,0,0,0,0,0,1,6,0,0,136,8,0,0,0,7,8,0,1,8,0,0,13,1,0,8,121,1,3,0,139,0,0,0,119,0,2,0,0,5,0,0,25,2,5,8,82,3,2,0,135,8,15,0,5,0,0,0,1,8,0,0,13,4,3,8,120,4,3,0,0,5,3,0,119,0,248,255,139,0,0,0,140,2,14,0,0,0,0,0,1,11,0,0,136,13,0,0,0,12,13,0,88,2,0,0,88,3,1,0,65,4,2,3,25,5,0,4,88,6,5,0,25,7,1,4,88,8,7,0,65,9,6,8,63,10,4,9,139,10,0,0,140,4,7,0,0,0,0,0,136,6,0,0,0,5,6,0,136,6,0,0,25,6,6,8,137,6,0,0,0,4,5,0,134,6,0,0,72,194,0,0,0,1,2,3,4,0,0,0,137,5,0,0,106,6,4,4,129,6,0,0,82,6,4,0,139,6,0,0,140,3,10,0,0,0,0,0,1,7,0,0,136,9,0,0,0,8,9,0,32,3,1,0,121,3,6,0,135,5,11,0,0,0,0,0,0,6,5,0,139,6,0,0,119,0,7,0,1,9,1,0,134,4,0,0,112,38,1,0,9,0,0,0,0,6,4,0,139,6,0,0,1,9,0,0,139,9,0,0,140,1,12,0,0,0,0,0,1,9,0,0,136,11,0,0,0,10,11,0,134,1,0,0,0,45,1,0,0,0,0,0,134,2,0,0,172,59,1,0,0,0,0,0,134,3,0,0,156,47,1,0,0,0,0,0,134,4,0,0,128,45,1,0,0,0,0,0,63,5,1,2,63,6,5,3,63,7,6,4,25,8,0,24,89,8,7,0,139,0,0,0,140,1,5,0,0,0,0,0,130,2,0,0,1,3,255,0,19,3,0,3,90,1,2,3,34,2,1,8,121,2,2,0,139,1,0,0,130,2,0,0,42,3,0,8,1,4,255,0,19,3,3,4,90,1,2,3,34,2,1,8,121,2,3,0,25,2,1,8,139,2,0,0,130,2,0,0,42,3,0,16,1,4,255,0,19,3,3,4,90,1,2,3,34,2,1,8,121,2,3,0,25,2,1,16,139,2,0,0,130,2,0,0,43,3,0,24,90,2,2,3,25,2,2,24,139,2,0,0,140,3,11,0,0,0,0,0,1,8,0,0,136,10,0,0,0,9,10,0,88,3,1,0,65,4,3,2,25,5,1,4,88,6,5,0,65,7,6,2,134,10,0,0,40,52,1,0,0,4,7,0,139,0,0,0,140,2,10,0,0,0,0,0,1,7,0,0,136,9,0,0,0,8,9,0,88,2,1,0,68,3,2,0,25,4,1,4,88,5,4,0,68,6,5,0,134,9,0,0,40,52,1,0,0,3,6,0,139,0,0,0,140,1,7,0,0,0,0,0,1,3,0,0,136,5,0,0,0,4,5,0,136,5,0,0,25,5,5,16,137,5,0,0,0,2,4,0,130,5,1,0,82,1,5,0,85,2,0,0,1,6,152,5,135,5,28,0,1,6,2,0,1,6,1,0,135,5,29,0,6,0,0,0,139,0,0,0,140,3,8,0,0,0,0,0,1,5,0,0,136,7,0,0,0,6,7,0,136,7,0,0,25,7,7,16,137,7,0,0,0,4,6,0,85,4,2,0,134,3,0,0,224,59,1,0,0,1,4,0,137,6,0,0,139,3,0,0,140,3,7,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,85,0,1,0,25,3,0,4,85,3,2,0,139,0,0,0,140,2,8,0,0,0,0,0,1,5,0,0,136,7,0,0,0,6,7,0,1,7,0,0,13,3,0,7,121,3,3,0,1,2,0,0,119,0,6,0,1,7,0,0,134,4,0,0,244,9,1,0,0,1,7,0,0,2,4,0,139,2,0,0,140,2,10,0,0,0,0,0,1,7,0,0,136,9,0,0,0,8,9,0,64,2,1,0,135,6,13,0,2,0,0,0,58,3,6,0,62,9,0,0,45,67,28,235,226,54,26,63,71,4,3,9,38,9,4,1,0,5,9,0,139,5,0,0,140,3,10,0,0,0,0,0,1,7,0,0,136,9,0,0,0,8,9,0,73,3,2,0,71,4,2,1,19,9,3,4,0,5,9,0,38,9,5,1,0,6,9,0,139,6,0,0,140,4,8,0,0,0,0,0,4,4,0,2,4,5,1,3,4,6,1,3,16,7,0,2,4,5,6,7,129,5,0,0,139,4,0,0,140,1,7,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,134,1,0,0,212,40,1,0,0,0,0,0,134,2,0,0,128,204,0,0,0,0,0,0,63,3,1,2,139,3,0,0,140,3,7,0,0,0,0,0,1,4,0,0,136,6,0,0,0,5,6,0,2,6,0,0,255,255,255,127,134,3,0,0,28,23,1,0,0,6,1,2,139,3,0,0,140,4,6,0,0,0,0,0,1,5,0,0,134,4,0,0,72,194,0,0,0,1,2,3,5,0,0,0,139,4,0,0,140,4,8,0,0,0,0,0,3,4,0,2,3,6,1,3,16,7,4,0,3,5,6,7,129,5,0,0,139,4,0,0,140,1,6,0,0,0,0,0,1,3,0,0,136,5,0,0,0,4,5,0,25,1,0,104,82,2,1,0,135,5,15,0,2,0,0,0,135,5,15,0,0,0,0,0,139,0,0,0,140,1,4,0,0,0,0,0,1,1,0,0,136,3,0,0,0,2,3,0,134,3,0,0,104,25,1,0,0,0,0,0,134,3,0,0,240,60,1,0,0,0,0,0,134,3,0,0,188,0,1,0,0,0,0,0,134,3,0,0,240,233,0,0,0,0,0,0,139,0,0,0,140,1,6,0,0,0,0,0,1,1,0,0,136,3,0,0,0,2,3,0,59,4,0,0,59,5,0,0,134,3,0,0,40,52,1,0,0,4,5,0,139,0,0,0,140,1,4,0,0,0,0,0,1,1,0,0,136,3,0,0,0,2,3,0,134,3,0,0,0,232,0,0,0,0,0,0,134,3,0,0,64,250,0,0,0,0,0,0,139,0,0,0,140,2,5,0,0,0,0,0,1,2,0,0,136,4,0,0,0,3,4,0,135,4,15,0,0,0,0,0,139,0,0,0,140,2,2,0,0,0,0,0,137,0,0,0,132,2,0,1,139,0,0,0,140,2,6,0,0,0,0,0,1,3,0,0,136,5,0,0,0,4,5,0,134,2,0,0,124,30,1,0,0,1,0,0,139,2,0,0,140,3,5,0,0,0,0,0,1,4,0,0,135,3,30,0,4,0,0,0,1,3,0,0,139,3,0,0,140,2,4,0,0,0,0,0,1,3,4,0,135,2,30,0,3,0,0,0,1,2,0,0,139,2,0,0,140,2,4,0,0,0,0,0,1,3,2,0,135,2,30,0,3,0,0,0,59,2,0,0,139,2,0,0,140,2,4,0,0,0,0,0,1,3,3,0,135,2,30,0,3,0,0,0,139,0,0,0,140,1,3,0,0,0,0,0,1,2,1,0,135,1,30,0,2,0,0,0,139,0,0,0,0,0,0,0], eb + 71680);

  var relocations = [];
  relocations = relocations.concat([768,1928,2888,3036,3360,3392,3432,3436,3440,3444,3448,3452,3456,3460,3464,3468,4768,5032,5036,5040,5044,5048,5052,5056,5060,5064,5068,5072,5076,5080,5084,5088,5092,5096,5100,5104,5108,5112,5116,5120,5124,5128,5132,5136,5140,5144,5148,5152,5156,5160,5164,5168,5172,5176,5180,5184,5188,5192,5196,5200,5204,5208,5212,5216,5220,5224,5228,5232,5236,5240,5244,5248,5252,8392,8452,8672,8732,8868,8940,9000,9224,9284,9756,10384,11692,12008,12180,12556,12676,12708,13076,13252,13484,15488,15548,15760,15820,16292,16384,16684,16736,16788,17124,17456,17500,17760,17976,18052,18112,18344,18404,18784,18844,19076,19136,19400,19404,19408,19412,19416,19420,19424,19428,22320,23420,23480,23892,23952,24248,24316,24368,24500,24568,24620,24696,24756,24804,24920,24988,25040,25176,25188,25312,25328,25332,25336,25340,25344,25348,25352,25356,25360,25364,26308,26464,26496,26664,26676,26904,26944,28068,28072,28076,28080,28084,28088,28092,28096,28100,28104,28108,28112,28116,28120,28124,28128,28132,28136,28140,28144,29532,30532,31312,31988,32692,32696,32700,32704,32708,32712,32716,32720,32724,32728,32732,32736,32740,32744,32748,32752,32756,32760,32764,32768,32772,32776,32780,32784,32788,32792,32796,32800,32804,32808,32812,32816,32820,32824,32828,32832,32836,32840,32844,32848,32852,32856,32860,32864,32868,32872,32876,32880,32884,32888,32892,32896,32900,32904,32908,32912,32916,32920,32924,32928,32932,32936,32940,32944,32948,32952,32956,32960,32964,32968,32972,32976,32980,32984,32988,32992,32996,33000,33004,33008,33012,33016,33020,33024,33028,33032,33036,33040,33044,33048,33052,33056,33060,33064,33068,33072,33076,33080,33084,33088,33092,33096,33100,33104,33108,33112,33116,33120,33124,33128,33132,33136,33140,33144,33148,33152,33156,34684,36020,36024,36028,36032,36036,36040,36044,36048,36052,36056,36060,36064,36068,36072,36076,36080,36084,36088,36092,36096,36100,36104,36108,36112,36116,36120,36124,36128,36132,36136,36140,36144,36148,36152,36156,36160,36164,36168,36172,36176,36180,36184,36188,36192,36196,36200,36204,36208,36212,36216,36220,36224,36228,36232,36236,36240,36244,36248,36252,36256,36260,36264,36268,36272,36276,36280,36284,36288,36292,36296,36300,36304,36308,36312,36316,36320,36324,36328,36332,36336,36340,36344,36348,36352,36356,36664,36668,36672,36676,36680,36684,36688,36692,36696,36700,36704,36708,36712,36716,36720,36724,36728,36732,36736,36740,36744,36748,36752,36756,36760,36764,36768,36772,36776,36780,36784,36788,36792,36796,36800,36804,36808,36812,36816,36820,36824,36828,36832,36836,36840,36844,36848,36852,36856,36860,36864,36868,36872,36876,36880,36884,36888,36892,36896,36900,36904,36908,36912,36916,36920,36924,36928,36932,36936,36940,36944,36948,36952,36956,36960,36964,36968,36972,36976,36980,36984,36988,36992,36996,37000,37004,37008,37012,37016,37020,37392,37396,37400,37404,37408,37412,37416,37420,37424,37428,37432,37436,37440,37444,37448,37452,37456,37460,37464,37468,37472,37476,37480,37484,37488,37492,37496,37500,37504,37508,37512,37516,37520,37524,37528,37532,37536,37540,37544,37548,37552,37556,37560,37564,37568,37572,37576,37580,37584,37588,37592,37596,37600,37604,37608,37612,37616,37620,37624,37672,39528,39928,40292,40604,40688,40692,40696,40700,40704,40708,40712,40716,40720,40724,40728,40732,40736,40740,40744,40748,40752,40756,40760,40764,40768,40772,40776,40780,40784,40788,40792,40796,40800,40804,40808,40812,40816,40820,40824,40828,40832,40836,40840,40844,40848,40852,40856,40860,40864,40868,40872,40876,40880,40884,40888,40892,40896,40900,40904,40908,40912,40916,40920,40924,40928,40932,40936,40940,40944,40948,40952,40956,40960,40964,40968,40972,40976,40980,40984,40988,40992,40996,41000,41004,41008,41012,41016,41020,41024,41028,41032,41036,41040,41044,41048,41052,41056,41060,41064,41068,41072,41076,41080,41084,41088,41092,41096,41100,41104,41108,41112,41116,41120,41124,41128,41132,41136,41140,41144,41148,41152,41156,41160,41164,41168,41172,41176,41180,41184,41188,41192,41196,41200,41204,41208,41212,41216,41220,41224,41228,41232,41236,41240,41244,41248,41252,41256,41260,41264,41268,41272,41276,41280,41284,41288,41292,41296,41300,41304,41308,41312,41316,41320,41324,41328,41332,41336,41340,41344,41348,41352,41356,41360,41364,41368,41372,41376,41380,41384,41388,41392,41396,41400,41404,41408,41412,41416,41420,41424,41428,41432,41436,41440,41444,41448,41452,41456,41460,41464,41468,41472,41476,41480,41484,41488,41492,41496,41500,43408,43528,43648,46168,46208,46336,46360,46408,46736,46832,46856,46904,47344,66592,70276,70980,70984,70988,70992,70996,71000,71004,71008,71012,71016,71020,71024,71028,71032,71036,71040,71044,71048,71052,71056,71060,71064,71068,71528,73512,75008,75012,75016,75020,75024,75028,75032,75036,75040,75044,75048,75052,75056,75060,75064,75068,75072,75076,75080,75084,75088,75092,75096,75100,75104,75108,75112,75116,75120,75124,75128,75132,75136,75140,75144,75148,75152,75156,792,5696,6256,6792,6864,8424,8512,8532,8704,8792,8816,8972,9060,9088,9256,9344,9968,10008,10060,14656,14728,15520,15608,15628,15792,15880,16356,16428,16876,17096,17188,17584,17640,17872,18084,18172,18216,18376,18464,18816,18904,18924,18944,19108,19196,21636,21708,22236,22560,23452,23540,23628,23712,23924,24012,24348,24428,24448,24600,24680,24784,24852,24872,25020,25100,29080,29160,29240,29320,29700,29764,29828,29892,33968,34024,34440,34496,35816,37116,37828,38004,38368,38684,39000,39184,41580,41684,41772,41848,41924,42000,42096,42184,42260,42348,42436,42540,42628,42732,42852,42956,43060,43164,43308,43508,44012,44208,44252,44328,44372,44528,44572,44648,44692,44848,44892,44968,45012,45172,45216,45292,45336,45492,45536,45612,45656,45828,45872,45948,45992,47160,47412,47580,47664,50044,50652,50776,50884,51008,51344,51368,51480,51852,52104,52176,52204,52232,52260,52288,52316,52568,52588,52668,52968,52988,53068,54248,54592,54604,54628,55412,55500,55588,55632,55796,55936,56160,56172,56184,56228,56304,56348,57484,57516,57540,57612,57644,57668,57764,57796,57820,57896,57928,57952,58028,58184,58292,58368,58412,58428,58452,58560,58572,58620,58700,58744,59540,59556,59776,59792,60088,60108,60192,60308,60476,60584,60660,60708,60784,60960,61024,61140,61176,61608,62152,62480,62544,62572,62660,62876,62988,63072,63304,63384,63428,63508,63552,63848,63888,64176,64260,64348,64424,65056,65088,65100,65160,65204,65380,65408,65520,65600,65676,65816,65916,66032,66176,66608,66652,66708,66760,66772,66804,66820,66856,66872,66900,66928,66944,66972,66992,67004,67016,67036,67068,67084,67240,67316,67432,67576,67620,67696,67708,67924,67952,67980,69440,69476,69500,69544,69556,69592,69628,69668,69704,69744,69768,69852,69996,70032,70044,70096,70132,70172,70184,70296,70396,70528,70688,70772,70816,71232,71680,71876,72144,72220,72404,72436,72460,72492,72524,72548,72712,72756,73136,73164,73192,73224,73256,73276,73452,73844,74456,74484,74500,74532,75752,75780,75816,75844,75964,76068,76672,76720,76732,76752,76772,76816,76840,76864,76952,77040,77132,77248,77348,77396,77544,77588,77676,77788,77896,77912,78060,78392,78500,78584,79020,79088,79124,79576,79656,79668,79708,79984,80072,80120,80132,80144,80156,80360,80416,80548,80648,80836,80848,80896,80924,81044,81056,81068,81080,81124,81160,81172,81260]);

  for (var i = 0; i < relocations.length; i++) {
    //assert(relocations[i] % 4 === 0);
    //assert(relocations[i] >= 0 && relocations[i] < eb + 81408); // in range
    //assert(HEAPU32[eb + relocations[i] >> 2] + eb < (-1 >>> 0), [i, relocations[i]]); // no overflows
    HEAPU32[eb + relocations[i] >> 2] += eb;
  }
});



   
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

  var _SItoF=true;

   
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

  
   
  Module["_strlen"] = _strlen; 
  Module["_strcat"] = _strcat;

  
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

  var _logf=Math_log;

   
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
      }};var EmterpreterAsync={initted:false,state:0,saveStack:"",yieldCallbacks:[],postAsync:null,asyncFinalizers:[],ensureInit:function () {
        if (this.initted) return;
        this.initted = true;
      },setState:function (s) {
        this.ensureInit();
        this.state = s;
        asm.setAsyncState(s);
      },handle:function (doAsyncOp, yieldDuring) {
        Module['noExitRuntime'] = true;
        if (EmterpreterAsync.state === 0) {
          // save the stack we want to resume. this lets other code run in between
          // XXX this assumes that this stack top never ever leak! exceptions might violate that
          var stack = new Int32Array(HEAP32.subarray(EMTSTACKTOP>>2, asm.emtStackSave()>>2));
          var stacktop = asm.stackSave();
  
          var resumedCallbacksForYield = false;
          function resumeCallbacksForYield() {
            if (resumedCallbacksForYield) return;
            resumedCallbacksForYield = true;
            // allow async callbacks, and also make sure to call the specified yield callbacks. we must
            // do this when nothing is on the stack, i.e. after it unwound
            EmterpreterAsync.yieldCallbacks.forEach(function(func) {
              func();
            });
            Browser.resumeAsyncCallbacks(); // if we were paused (e.g. we are after a sleep), then since we are now yielding, it is safe to call callbacks
          }
  
          var callingDoAsyncOp = 1; // if resume is called synchronously - during the doAsyncOp - we must make it truly async, for consistency
  
          doAsyncOp(function resume(post) {
            if (callingDoAsyncOp) {
              assert(callingDoAsyncOp === 1); // avoid infinite recursion
              callingDoAsyncOp++;
              setTimeout(function() {
                resume(post);
              }, 0);
              return;
            }
  
            assert(EmterpreterAsync.state === 1 || EmterpreterAsync.state === 3);
            EmterpreterAsync.setState(3);
            if (yieldDuring) {
              resumeCallbacksForYield();
            }
            // copy the stack back in and resume
            HEAP32.set(stack, EMTSTACKTOP>>2);
            EmterpreterAsync.setState(2);
            // Resume the main loop
            if (Browser.mainLoop.func) {
              Browser.mainLoop.resume();
            }
            assert(!EmterpreterAsync.postAsync);
            EmterpreterAsync.postAsync = post || null;
            asm.emterpret(stack[0]); // pc of the first function, from which we can reconstruct the rest, is at position 0 on the stack
            if (!yieldDuring && EmterpreterAsync.state === 0) {
              // if we did *not* do another async operation, then we know that nothing is conceptually on the stack now, and we can re-allow async callbacks as well as run the queued ones right now
              Browser.resumeAsyncCallbacks();
            }
            if (EmterpreterAsync.state === 0) {
              EmterpreterAsync.asyncFinalizers.forEach(function(func) {
                func();
              });
              EmterpreterAsync.asyncFinalizers.length = 0;
            }
          });
  
          callingDoAsyncOp = 0;
  
          EmterpreterAsync.setState(1);
          // Pause the main loop, until we resume
          if (Browser.mainLoop.func) {
            Browser.mainLoop.pause();
          }
          if (yieldDuring) {
            // do this when we are not on the stack, i.e., the stack unwound. we might be too late, in which case we do it in resume()
            setTimeout(function() {
              resumeCallbacksForYield();
            }, 0);
          } else {
            Browser.pauseAsyncCallbacks();
          }
        } else {
          // nothing to do here, the stack was just recreated. reset the state.
          assert(EmterpreterAsync.state === 2);
          EmterpreterAsync.setState(0);
  
          if (EmterpreterAsync.postAsync) {
            var ret = EmterpreterAsync.postAsync();
            EmterpreterAsync.postAsync = null;
            return ret;
          }
        }
      }};function _emscripten_sleep(ms) {
      EmterpreterAsync.handle(function(resume) {
        setTimeout(function() {
          if (ABORT) return; // do this manually; we can't call into Browser.safeSetTimeout, because that is paused/resumed!
          resume();
        }, ms);
      });
    }

  var _acosf=Math_acos;

  
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

  
  function _fputs(s, stream) {
      // int fputs(const char *restrict s, FILE *restrict stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
      var fd = _fileno(stream);
      return _write(fd, s, _strlen(s));
    }
  
  function _fputc(c, stream) {
      // int fputc(int c, FILE *stream);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
      var chr = unSign(c & 0xFF);
      HEAP8[((_fputc.ret)>>0)]=chr;
      var fd = _fileno(stream);
      var ret = _write(fd, _fputc.ret, 1);
      if (ret == -1) {
        var streamObj = FS.getStreamFromPtr(stream);
        if (streamObj) streamObj.error = true;
        return -1;
      } else {
        return chr;
      }
    }function _puts(s) {
      // int puts(const char *s);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
      // NOTE: puts() always writes an extra newline.
      var stdout = HEAP32[((_stdout)>>2)];
      var ret = _fputs(s, stdout);
      if (ret < 0) {
        return ret;
      } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
      }
    }

  var _sqrt=Math_sqrt;

  var _emscripten_asm_const_int=true;


  
  function __exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      Module['exit'](status);
    }function _exit(status) {
      __exit(status);
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

   
  Module["_bitshift64Lshr"] = _bitshift64Lshr;

  
  
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
    }

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

  var _fabs=Math_abs;

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
Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) { Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice) };
  Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) { Browser.requestAnimationFrame(func) };
  Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) { Browser.setCanvasSize(width, height, noUpdates) };
  Module["pauseMainLoop"] = function Module_pauseMainLoop() { Browser.mainLoop.pause() };
  Module["resumeMainLoop"] = function Module_resumeMainLoop() { Browser.mainLoop.resume() };
  Module["getUserMedia"] = function Module_getUserMedia() { Browser.getUserMedia() }
  Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) { return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes) }
_fputc.ret = allocate([0], "i8", ALLOC_STATIC);
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

function invoke_vi(index,a1) {
  try {
    Module["dynCall_vi"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

function invoke_ddi(index,a1,a2) {
  try {
    return Module["dynCall_ddi"](index,a1,a2);
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

function invoke_iii(index,a1,a2) {
  try {
    return Module["dynCall_iii"](index,a1,a2);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    asm["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };
Module.asmLibraryArg = { "abort": abort, "assert": assert, "invoke_iiii": invoke_iiii, "invoke_vi": invoke_vi, "invoke_ddi": invoke_ddi, "invoke_vii": invoke_vii, "invoke_iii": invoke_iii, "_fabs": _fabs, "_acosf": _acosf, "_send": _send, "_sqrtf": _sqrtf, "_fread": _fread, "_emscripten_set_main_loop_timing": _emscripten_set_main_loop_timing, "_logf": _logf, "_fopen": _fopen, "_fflush": _fflush, "_pwrite": _pwrite, "_strerror_r": _strerror_r, "_llvm_pow_f64": _llvm_pow_f64, "_open": _open, "_fabsf": _fabsf, "_sbrk": _sbrk, "_emscripten_memcpy_big": _emscripten_memcpy_big, "_fileno": _fileno, "_sysconf": _sysconf, "_close": _close, "_pread": _pread, "_puts": _puts, "_mkport": _mkport, "_fclose": _fclose, "__reallyNegative": __reallyNegative, "_write": _write, "_emscripten_set_main_loop": _emscripten_set_main_loop, "___errno_location": ___errno_location, "_stat": _stat, "_recv": _recv, "_emscripten_sleep": _emscripten_sleep, "_fputc": _fputc, "__exit": __exit, "_read": _read, "_abort": _abort, "_fwrite": _fwrite, "_time": _time, "_fprintf": _fprintf, "_strerror": _strerror, "__formatString": __formatString, "_fputs": _fputs, "_sqrt": _sqrt, "_emscripten_asm_const_6": _emscripten_asm_const_6, "_exit": _exit, "___setErrNo": ___setErrNo, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "cttz_i8": cttz_i8, "_stderr": _stderr };
Module.asmLibraryArg['EMTSTACKTOP'] = EMTSTACKTOP; Module.asmLibraryArg['EMT_STACK_MAX'] = EMT_STACK_MAX; Module.asmLibraryArg['eb'] = eb;
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
  var invoke_vi=env.invoke_vi;
  var invoke_ddi=env.invoke_ddi;
  var invoke_vii=env.invoke_vii;
  var invoke_iii=env.invoke_iii;
  var _fabs=env._fabs;
  var _acosf=env._acosf;
  var _send=env._send;
  var _sqrtf=env._sqrtf;
  var _fread=env._fread;
  var _emscripten_set_main_loop_timing=env._emscripten_set_main_loop_timing;
  var _logf=env._logf;
  var _fopen=env._fopen;
  var _fflush=env._fflush;
  var _pwrite=env._pwrite;
  var _strerror_r=env._strerror_r;
  var _llvm_pow_f64=env._llvm_pow_f64;
  var _open=env._open;
  var _fabsf=env._fabsf;
  var _sbrk=env._sbrk;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var _fileno=env._fileno;
  var _sysconf=env._sysconf;
  var _close=env._close;
  var _pread=env._pread;
  var _puts=env._puts;
  var _mkport=env._mkport;
  var _fclose=env._fclose;
  var __reallyNegative=env.__reallyNegative;
  var _write=env._write;
  var _emscripten_set_main_loop=env._emscripten_set_main_loop;
  var ___errno_location=env.___errno_location;
  var _stat=env._stat;
  var _recv=env._recv;
  var _emscripten_sleep=env._emscripten_sleep;
  var _fputc=env._fputc;
  var __exit=env.__exit;
  var _read=env._read;
  var _abort=env._abort;
  var _fwrite=env._fwrite;
  var _time=env._time;
  var _fprintf=env._fprintf;
  var _strerror=env._strerror;
  var __formatString=env.__formatString;
  var _fputs=env._fputs;
  var _sqrt=env._sqrt;
  var _emscripten_asm_const_6=env._emscripten_asm_const_6;
  var _exit=env._exit;
  var ___setErrNo=env.___setErrNo;
  var tempFloat = 0.0;
  var asyncState = 0;

var EMTSTACKTOP = env.EMTSTACKTOP|0;
var EMT_STACK_MAX = env.EMT_STACK_MAX|0;
var eb = env.eb|0;
// EMSCRIPTEN_START_FUNCS

function _malloc($bytes) {
 $bytes = $bytes | 0;
 var $$3$i = 0, $$lcssa = 0, $$lcssa211 = 0, $$lcssa215 = 0, $$lcssa216 = 0, $$lcssa217 = 0, $$lcssa219 = 0, $$lcssa222 = 0, $$lcssa224 = 0, $$lcssa226 = 0, $$lcssa228 = 0, $$lcssa230 = 0, $$lcssa232 = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i22$i = 0, $$pre$i25 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i23$iZ2D = 0, $$pre$phi$i26Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phi58$i$iZ2D = 0, $$pre$phiZ2D = 0, $$pre105 = 0, $$pre106 = 0, $$pre14$i$i = 0, $$pre43$i = 0, $$pre56$i$i = 0, $$pre57$i$i = 0, $$pre8$i = 0, $$rsize$0$i = 0, $$rsize$3$i = 0, $$sum = 0, $$sum$i$i = 0, $$sum$i$i$i = 0, $$sum$i13$i = 0, $$sum$i14$i = 0, $$sum$i17$i = 0, $$sum$i19$i = 0, $$sum$i2334 = 0, $$sum$i32 = 0, $$sum$i35 = 0, $$sum1 = 0, $$sum1$i = 0, $$sum1$i$i = 0, $$sum1$i15$i = 0, $$sum1$i20$i = 0, $$sum1$i24 = 0, $$sum10 = 0, $$sum10$i = 0, $$sum10$i$i = 0, $$sum11$i = 0, $$sum11$i$i = 0, $$sum1112 = 0, $$sum112$i = 0, $$sum113$i = 0, $$sum114$i = 0, $$sum115$i = 0, $$sum116$i = 0, $$sum117$i = 0, $$sum118$i = 0, $$sum119$i = 0, $$sum12$i = 0, $$sum12$i$i = 0, $$sum120$i = 0, $$sum121$i = 0, $$sum122$i = 0, $$sum123$i = 0, $$sum124$i = 0, $$sum125$i = 0, $$sum13$i = 0, $$sum13$i$i = 0, $$sum14$i$i = 0, $$sum15$i = 0, $$sum15$i$i = 0, $$sum16$i = 0, $$sum16$i$i = 0, $$sum17$i = 0, $$sum17$i$i = 0, $$sum18$i = 0, $$sum1819$i$i = 0, $$sum2 = 0, $$sum2$i = 0, $$sum2$i$i = 0, $$sum2$i$i$i = 0, $$sum2$i16$i = 0, $$sum2$i18$i = 0, $$sum2$i21$i = 0, $$sum20$i$i = 0, $$sum21$i$i = 0, $$sum22$i$i = 0, $$sum23$i$i = 0, $$sum24$i$i = 0, $$sum25$i$i = 0, $$sum27$i$i = 0, $$sum28$i$i = 0, $$sum29$i$i = 0, $$sum3$i = 0, $$sum3$i27 = 0, $$sum30$i$i = 0, $$sum3132$i$i = 0, $$sum34$i$i = 0, $$sum3536$i$i = 0, $$sum3738$i$i = 0, $$sum39$i$i = 0, $$sum4 = 0, $$sum4$i = 0, $$sum4$i$i = 0, $$sum4$i28 = 0, $$sum40$i$i = 0, $$sum41$i$i = 0, $$sum42$i$i = 0, $$sum5$i = 0, $$sum5$i$i = 0, $$sum56 = 0, $$sum6$i = 0, $$sum67$i$i = 0, $$sum7$i = 0, $$sum8$i = 0, $$sum9 = 0, $$sum9$i = 0, $$sum9$i$i = 0, $$tsize$1$i = 0, $$v$0$i = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $1000 = 0, $1001 = 0, $1002 = 0, $1003 = 0, $1004 = 0, $1005 = 0, $1006 = 0, $1007 = 0, $1008 = 0, $1009 = 0, $101 = 0, $1010 = 0, $1011 = 0, $1012 = 0, $1013 = 0, $1014 = 0, $1015 = 0, $1016 = 0, $1017 = 0, $1018 = 0, $1019 = 0, $102 = 0, $1020 = 0, $1021 = 0, $1022 = 0, $1023 = 0, $1024 = 0, $1025 = 0, $1026 = 0, $1027 = 0, $1028 = 0, $1029 = 0, $103 = 0, $1030 = 0, $1031 = 0, $1032 = 0, $1033 = 0, $1034 = 0, $1035 = 0, $1036 = 0, $1037 = 0, $1038 = 0, $1039 = 0, $104 = 0, $1040 = 0, $1041 = 0, $1042 = 0, $1043 = 0, $1044 = 0, $1045 = 0, $1046 = 0, $1047 = 0, $1048 = 0, $1049 = 0, $105 = 0, $1050 = 0, $1051 = 0, $1052 = 0, $1053 = 0, $1054 = 0, $1055 = 0, $1056 = 0, $1057 = 0, $1058 = 0, $1059 = 0, $106 = 0, $1060 = 0, $1061 = 0, $1062 = 0, $1063 = 0, $1064 = 0, $1065 = 0, $1066 = 0, $1067 = 0, $1068 = 0, $1069 = 0, $107 = 0, $1070 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0, $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0, $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0, $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0, $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0, $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0, $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0, $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0, $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0, $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0, $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0, $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0, $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0, $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0, $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0, $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0, $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0, $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0, $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0, $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0, $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0, $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0, $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0, $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0, $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0, $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0, $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0, $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0, $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0, $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0, $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0, $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0, $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0, $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0, $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $971 = 0, $972 = 0, $973 = 0, $974 = 0, $975 = 0, $976 = 0, $977 = 0, $978 = 0, $979 = 0, $98 = 0, $980 = 0, $981 = 0, $982 = 0, $983 = 0, $984 = 0, $985 = 0, $986 = 0, $987 = 0, $988 = 0, $989 = 0, $99 = 0, $990 = 0, $991 = 0, $992 = 0, $993 = 0, $994 = 0, $995 = 0, $996 = 0, $997 = 0, $998 = 0, $999 = 0, $F$0$i$i = 0, $F1$0$i = 0, $F4$0 = 0, $F4$0$i$i = 0, $F5$0$i = 0, $I1$0$i$i = 0, $I7$0$i = 0, $I7$0$i$i = 0, $K12$029$i = 0, $K2$07$i$i = 0, $K8$051$i$i = 0, $R$0$i = 0, $R$0$i$i = 0, $R$0$i$i$lcssa = 0, $R$0$i$lcssa = 0, $R$0$i18 = 0, $R$0$i18$lcssa = 0, $R$1$i = 0, $R$1$i$i = 0, $R$1$i20 = 0, $RP$0$i = 0, $RP$0$i$i = 0, $RP$0$i$i$lcssa = 0, $RP$0$i$lcssa = 0, $RP$0$i17 = 0, $RP$0$i17$lcssa = 0, $T$0$lcssa$i = 0, $T$0$lcssa$i$i = 0, $T$0$lcssa$i25$i = 0, $T$028$i = 0, $T$028$i$lcssa = 0, $T$050$i$i = 0, $T$050$i$i$lcssa = 0, $T$06$i$i = 0, $T$06$i$i$lcssa = 0, $br$0$ph$i = 0, $cond$i = 0, $cond$i$i = 0, $cond$i21 = 0, $exitcond$i$i = 0, $i$02$i$i = 0, $idx$0$i = 0, $mem$0 = 0, $nb$0 = 0, $not$$i = 0, $not$$i$i = 0, $not$$i26$i = 0, $oldfirst$0$i$i = 0, $or$cond$i = 0, $or$cond$i30 = 0, $or$cond1$i = 0, $or$cond19$i = 0, $or$cond2$i = 0, $or$cond3$i = 0, $or$cond5$i = 0, $or$cond57$i = 0, $or$cond6$i = 0, $or$cond8$i = 0, $or$cond9$i = 0, $qsize$0$i$i = 0, $rsize$0$i = 0, $rsize$0$i$lcssa = 0, $rsize$0$i15 = 0, $rsize$1$i = 0, $rsize$2$i = 0, $rsize$3$lcssa$i = 0, $rsize$331$i = 0, $rst$0$i = 0, $rst$1$i = 0, $sizebits$0$i = 0, $sp$0$i$i = 0, $sp$0$i$i$i = 0, $sp$084$i = 0, $sp$084$i$lcssa = 0, $sp$183$i = 0, $sp$183$i$lcssa = 0, $ssize$0$$i = 0, $ssize$0$i = 0, $ssize$1$ph$i = 0, $ssize$2$i = 0, $t$0$i = 0, $t$0$i14 = 0, $t$1$i = 0, $t$2$ph$i = 0, $t$2$v$3$i = 0, $t$230$i = 0, $tbase$255$i = 0, $tsize$0$ph$i = 0, $tsize$0323944$i = 0, $tsize$1$i = 0, $tsize$254$i = 0, $v$0$i = 0, $v$0$i$lcssa = 0, $v$0$i16 = 0, $v$1$i = 0, $v$2$i = 0, $v$3$lcssa$i = 0, $v$3$ph$i = 0, $v$332$i = 0, label = 0, sp = 0;
 label = 0;
 sp = STACKTOP;
 $0 = $bytes >>> 0 < 245;
 do {
  if ($0) {
   $1 = $bytes >>> 0 < 11;
   $2 = $bytes + 11 | 0;
   $3 = $2 & -8;
   $4 = $1 ? 16 : $3;
   $5 = $4 >>> 3;
   $6 = HEAP32[2464 >> 2] | 0;
   $7 = $6 >>> $5;
   $8 = $7 & 3;
   $9 = ($8 | 0) == 0;
   if (!$9) {
    $10 = $7 & 1;
    $11 = $10 ^ 1;
    $12 = $11 + $5 | 0;
    $13 = $12 << 1;
    $14 = 2504 + ($13 << 2) | 0;
    $$sum10 = $13 + 2 | 0;
    $15 = 2504 + ($$sum10 << 2) | 0;
    $16 = HEAP32[$15 >> 2] | 0;
    $17 = $16 + 8 | 0;
    $18 = HEAP32[$17 >> 2] | 0;
    $19 = ($14 | 0) == ($18 | 0);
    do {
     if ($19) {
      $20 = 1 << $12;
      $21 = $20 ^ -1;
      $22 = $6 & $21;
      HEAP32[2464 >> 2] = $22;
     } else {
      $23 = HEAP32[2480 >> 2] | 0;
      $24 = $18 >>> 0 < $23 >>> 0;
      if ($24) {
       _abort();
      }
      $25 = $18 + 12 | 0;
      $26 = HEAP32[$25 >> 2] | 0;
      $27 = ($26 | 0) == ($16 | 0);
      if ($27) {
       HEAP32[$25 >> 2] = $14;
       HEAP32[$15 >> 2] = $18;
       break;
      } else {
       _abort();
      }
     }
    } while (0);
    $28 = $12 << 3;
    $29 = $28 | 3;
    $30 = $16 + 4 | 0;
    HEAP32[$30 >> 2] = $29;
    $$sum1112 = $28 | 4;
    $31 = $16 + $$sum1112 | 0;
    $32 = HEAP32[$31 >> 2] | 0;
    $33 = $32 | 1;
    HEAP32[$31 >> 2] = $33;
    $mem$0 = $17;
    return $mem$0 | 0;
   }
   $34 = HEAP32[2472 >> 2] | 0;
   $35 = $4 >>> 0 > $34 >>> 0;
   if ($35) {
    $36 = ($7 | 0) == 0;
    if (!$36) {
     $37 = $7 << $5;
     $38 = 2 << $5;
     $39 = 0 - $38 | 0;
     $40 = $38 | $39;
     $41 = $37 & $40;
     $42 = 0 - $41 | 0;
     $43 = $41 & $42;
     $44 = $43 + -1 | 0;
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
     $64 = $62 + $63 | 0;
     $65 = $64 << 1;
     $66 = 2504 + ($65 << 2) | 0;
     $$sum4 = $65 + 2 | 0;
     $67 = 2504 + ($$sum4 << 2) | 0;
     $68 = HEAP32[$67 >> 2] | 0;
     $69 = $68 + 8 | 0;
     $70 = HEAP32[$69 >> 2] | 0;
     $71 = ($66 | 0) == ($70 | 0);
     do {
      if ($71) {
       $72 = 1 << $64;
       $73 = $72 ^ -1;
       $74 = $6 & $73;
       HEAP32[2464 >> 2] = $74;
       $88 = $34;
      } else {
       $75 = HEAP32[2480 >> 2] | 0;
       $76 = $70 >>> 0 < $75 >>> 0;
       if ($76) {
        _abort();
       }
       $77 = $70 + 12 | 0;
       $78 = HEAP32[$77 >> 2] | 0;
       $79 = ($78 | 0) == ($68 | 0);
       if ($79) {
        HEAP32[$77 >> 2] = $66;
        HEAP32[$67 >> 2] = $70;
        $$pre = HEAP32[2472 >> 2] | 0;
        $88 = $$pre;
        break;
       } else {
        _abort();
       }
      }
     } while (0);
     $80 = $64 << 3;
     $81 = $80 - $4 | 0;
     $82 = $4 | 3;
     $83 = $68 + 4 | 0;
     HEAP32[$83 >> 2] = $82;
     $84 = $68 + $4 | 0;
     $85 = $81 | 1;
     $$sum56 = $4 | 4;
     $86 = $68 + $$sum56 | 0;
     HEAP32[$86 >> 2] = $85;
     $87 = $68 + $80 | 0;
     HEAP32[$87 >> 2] = $81;
     $89 = ($88 | 0) == 0;
     if (!$89) {
      $90 = HEAP32[2484 >> 2] | 0;
      $91 = $88 >>> 3;
      $92 = $91 << 1;
      $93 = 2504 + ($92 << 2) | 0;
      $94 = HEAP32[2464 >> 2] | 0;
      $95 = 1 << $91;
      $96 = $94 & $95;
      $97 = ($96 | 0) == 0;
      if ($97) {
       $98 = $94 | $95;
       HEAP32[2464 >> 2] = $98;
       $$pre105 = $92 + 2 | 0;
       $$pre106 = 2504 + ($$pre105 << 2) | 0;
       $$pre$phiZ2D = $$pre106;
       $F4$0 = $93;
      } else {
       $$sum9 = $92 + 2 | 0;
       $99 = 2504 + ($$sum9 << 2) | 0;
       $100 = HEAP32[$99 >> 2] | 0;
       $101 = HEAP32[2480 >> 2] | 0;
       $102 = $100 >>> 0 < $101 >>> 0;
       if ($102) {
        _abort();
       } else {
        $$pre$phiZ2D = $99;
        $F4$0 = $100;
       }
      }
      HEAP32[$$pre$phiZ2D >> 2] = $90;
      $103 = $F4$0 + 12 | 0;
      HEAP32[$103 >> 2] = $90;
      $104 = $90 + 8 | 0;
      HEAP32[$104 >> 2] = $F4$0;
      $105 = $90 + 12 | 0;
      HEAP32[$105 >> 2] = $93;
     }
     HEAP32[2472 >> 2] = $81;
     HEAP32[2484 >> 2] = $84;
     $mem$0 = $69;
     return $mem$0 | 0;
    }
    $106 = HEAP32[2468 >> 2] | 0;
    $107 = ($106 | 0) == 0;
    if ($107) {
     $nb$0 = $4;
    } else {
     $108 = 0 - $106 | 0;
     $109 = $106 & $108;
     $110 = $109 + -1 | 0;
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
     $130 = $128 + $129 | 0;
     $131 = 2768 + ($130 << 2) | 0;
     $132 = HEAP32[$131 >> 2] | 0;
     $133 = $132 + 4 | 0;
     $134 = HEAP32[$133 >> 2] | 0;
     $135 = $134 & -8;
     $136 = $135 - $4 | 0;
     $rsize$0$i = $136;
     $t$0$i = $132;
     $v$0$i = $132;
     while (1) {
      $137 = $t$0$i + 16 | 0;
      $138 = HEAP32[$137 >> 2] | 0;
      $139 = ($138 | 0) == (0 | 0);
      if ($139) {
       $140 = $t$0$i + 20 | 0;
       $141 = HEAP32[$140 >> 2] | 0;
       $142 = ($141 | 0) == (0 | 0);
       if ($142) {
        $rsize$0$i$lcssa = $rsize$0$i;
        $v$0$i$lcssa = $v$0$i;
        break;
       } else {
        $144 = $141;
       }
      } else {
       $144 = $138;
      }
      $143 = $144 + 4 | 0;
      $145 = HEAP32[$143 >> 2] | 0;
      $146 = $145 & -8;
      $147 = $146 - $4 | 0;
      $148 = $147 >>> 0 < $rsize$0$i >>> 0;
      $$rsize$0$i = $148 ? $147 : $rsize$0$i;
      $$v$0$i = $148 ? $144 : $v$0$i;
      $rsize$0$i = $$rsize$0$i;
      $t$0$i = $144;
      $v$0$i = $$v$0$i;
     }
     $149 = HEAP32[2480 >> 2] | 0;
     $150 = $v$0$i$lcssa >>> 0 < $149 >>> 0;
     if ($150) {
      _abort();
     }
     $151 = $v$0$i$lcssa + $4 | 0;
     $152 = $v$0$i$lcssa >>> 0 < $151 >>> 0;
     if (!$152) {
      _abort();
     }
     $153 = $v$0$i$lcssa + 24 | 0;
     $154 = HEAP32[$153 >> 2] | 0;
     $155 = $v$0$i$lcssa + 12 | 0;
     $156 = HEAP32[$155 >> 2] | 0;
     $157 = ($156 | 0) == ($v$0$i$lcssa | 0);
     do {
      if ($157) {
       $167 = $v$0$i$lcssa + 20 | 0;
       $168 = HEAP32[$167 >> 2] | 0;
       $169 = ($168 | 0) == (0 | 0);
       if ($169) {
        $170 = $v$0$i$lcssa + 16 | 0;
        $171 = HEAP32[$170 >> 2] | 0;
        $172 = ($171 | 0) == (0 | 0);
        if ($172) {
         $R$1$i = 0;
         break;
        } else {
         $R$0$i = $171;
         $RP$0$i = $170;
        }
       } else {
        $R$0$i = $168;
        $RP$0$i = $167;
       }
       while (1) {
        $173 = $R$0$i + 20 | 0;
        $174 = HEAP32[$173 >> 2] | 0;
        $175 = ($174 | 0) == (0 | 0);
        if (!$175) {
         $R$0$i = $174;
         $RP$0$i = $173;
         continue;
        }
        $176 = $R$0$i + 16 | 0;
        $177 = HEAP32[$176 >> 2] | 0;
        $178 = ($177 | 0) == (0 | 0);
        if ($178) {
         $R$0$i$lcssa = $R$0$i;
         $RP$0$i$lcssa = $RP$0$i;
         break;
        } else {
         $R$0$i = $177;
         $RP$0$i = $176;
        }
       }
       $179 = $RP$0$i$lcssa >>> 0 < $149 >>> 0;
       if ($179) {
        _abort();
       } else {
        HEAP32[$RP$0$i$lcssa >> 2] = 0;
        $R$1$i = $R$0$i$lcssa;
        break;
       }
      } else {
       $158 = $v$0$i$lcssa + 8 | 0;
       $159 = HEAP32[$158 >> 2] | 0;
       $160 = $159 >>> 0 < $149 >>> 0;
       if ($160) {
        _abort();
       }
       $161 = $159 + 12 | 0;
       $162 = HEAP32[$161 >> 2] | 0;
       $163 = ($162 | 0) == ($v$0$i$lcssa | 0);
       if (!$163) {
        _abort();
       }
       $164 = $156 + 8 | 0;
       $165 = HEAP32[$164 >> 2] | 0;
       $166 = ($165 | 0) == ($v$0$i$lcssa | 0);
       if ($166) {
        HEAP32[$161 >> 2] = $156;
        HEAP32[$164 >> 2] = $159;
        $R$1$i = $156;
        break;
       } else {
        _abort();
       }
      }
     } while (0);
     $180 = ($154 | 0) == (0 | 0);
     do {
      if (!$180) {
       $181 = $v$0$i$lcssa + 28 | 0;
       $182 = HEAP32[$181 >> 2] | 0;
       $183 = 2768 + ($182 << 2) | 0;
       $184 = HEAP32[$183 >> 2] | 0;
       $185 = ($v$0$i$lcssa | 0) == ($184 | 0);
       if ($185) {
        HEAP32[$183 >> 2] = $R$1$i;
        $cond$i = ($R$1$i | 0) == (0 | 0);
        if ($cond$i) {
         $186 = 1 << $182;
         $187 = $186 ^ -1;
         $188 = HEAP32[2468 >> 2] | 0;
         $189 = $188 & $187;
         HEAP32[2468 >> 2] = $189;
         break;
        }
       } else {
        $190 = HEAP32[2480 >> 2] | 0;
        $191 = $154 >>> 0 < $190 >>> 0;
        if ($191) {
         _abort();
        }
        $192 = $154 + 16 | 0;
        $193 = HEAP32[$192 >> 2] | 0;
        $194 = ($193 | 0) == ($v$0$i$lcssa | 0);
        if ($194) {
         HEAP32[$192 >> 2] = $R$1$i;
        } else {
         $195 = $154 + 20 | 0;
         HEAP32[$195 >> 2] = $R$1$i;
        }
        $196 = ($R$1$i | 0) == (0 | 0);
        if ($196) {
         break;
        }
       }
       $197 = HEAP32[2480 >> 2] | 0;
       $198 = $R$1$i >>> 0 < $197 >>> 0;
       if ($198) {
        _abort();
       }
       $199 = $R$1$i + 24 | 0;
       HEAP32[$199 >> 2] = $154;
       $200 = $v$0$i$lcssa + 16 | 0;
       $201 = HEAP32[$200 >> 2] | 0;
       $202 = ($201 | 0) == (0 | 0);
       do {
        if (!$202) {
         $203 = $201 >>> 0 < $197 >>> 0;
         if ($203) {
          _abort();
         } else {
          $204 = $R$1$i + 16 | 0;
          HEAP32[$204 >> 2] = $201;
          $205 = $201 + 24 | 0;
          HEAP32[$205 >> 2] = $R$1$i;
          break;
         }
        }
       } while (0);
       $206 = $v$0$i$lcssa + 20 | 0;
       $207 = HEAP32[$206 >> 2] | 0;
       $208 = ($207 | 0) == (0 | 0);
       if (!$208) {
        $209 = HEAP32[2480 >> 2] | 0;
        $210 = $207 >>> 0 < $209 >>> 0;
        if ($210) {
         _abort();
        } else {
         $211 = $R$1$i + 20 | 0;
         HEAP32[$211 >> 2] = $207;
         $212 = $207 + 24 | 0;
         HEAP32[$212 >> 2] = $R$1$i;
         break;
        }
       }
      }
     } while (0);
     $213 = $rsize$0$i$lcssa >>> 0 < 16;
     if ($213) {
      $214 = $rsize$0$i$lcssa + $4 | 0;
      $215 = $214 | 3;
      $216 = $v$0$i$lcssa + 4 | 0;
      HEAP32[$216 >> 2] = $215;
      $$sum4$i = $214 + 4 | 0;
      $217 = $v$0$i$lcssa + $$sum4$i | 0;
      $218 = HEAP32[$217 >> 2] | 0;
      $219 = $218 | 1;
      HEAP32[$217 >> 2] = $219;
     } else {
      $220 = $4 | 3;
      $221 = $v$0$i$lcssa + 4 | 0;
      HEAP32[$221 >> 2] = $220;
      $222 = $rsize$0$i$lcssa | 1;
      $$sum$i35 = $4 | 4;
      $223 = $v$0$i$lcssa + $$sum$i35 | 0;
      HEAP32[$223 >> 2] = $222;
      $$sum1$i = $rsize$0$i$lcssa + $4 | 0;
      $224 = $v$0$i$lcssa + $$sum1$i | 0;
      HEAP32[$224 >> 2] = $rsize$0$i$lcssa;
      $225 = HEAP32[2472 >> 2] | 0;
      $226 = ($225 | 0) == 0;
      if (!$226) {
       $227 = HEAP32[2484 >> 2] | 0;
       $228 = $225 >>> 3;
       $229 = $228 << 1;
       $230 = 2504 + ($229 << 2) | 0;
       $231 = HEAP32[2464 >> 2] | 0;
       $232 = 1 << $228;
       $233 = $231 & $232;
       $234 = ($233 | 0) == 0;
       if ($234) {
        $235 = $231 | $232;
        HEAP32[2464 >> 2] = $235;
        $$pre$i = $229 + 2 | 0;
        $$pre8$i = 2504 + ($$pre$i << 2) | 0;
        $$pre$phi$iZ2D = $$pre8$i;
        $F1$0$i = $230;
       } else {
        $$sum3$i = $229 + 2 | 0;
        $236 = 2504 + ($$sum3$i << 2) | 0;
        $237 = HEAP32[$236 >> 2] | 0;
        $238 = HEAP32[2480 >> 2] | 0;
        $239 = $237 >>> 0 < $238 >>> 0;
        if ($239) {
         _abort();
        } else {
         $$pre$phi$iZ2D = $236;
         $F1$0$i = $237;
        }
       }
       HEAP32[$$pre$phi$iZ2D >> 2] = $227;
       $240 = $F1$0$i + 12 | 0;
       HEAP32[$240 >> 2] = $227;
       $241 = $227 + 8 | 0;
       HEAP32[$241 >> 2] = $F1$0$i;
       $242 = $227 + 12 | 0;
       HEAP32[$242 >> 2] = $230;
      }
      HEAP32[2472 >> 2] = $rsize$0$i$lcssa;
      HEAP32[2484 >> 2] = $151;
     }
     $243 = $v$0$i$lcssa + 8 | 0;
     $mem$0 = $243;
     return $mem$0 | 0;
    }
   } else {
    $nb$0 = $4;
   }
  } else {
   $244 = $bytes >>> 0 > 4294967231;
   if ($244) {
    $nb$0 = -1;
   } else {
    $245 = $bytes + 11 | 0;
    $246 = $245 & -8;
    $247 = HEAP32[2468 >> 2] | 0;
    $248 = ($247 | 0) == 0;
    if ($248) {
     $nb$0 = $246;
    } else {
     $249 = 0 - $246 | 0;
     $250 = $245 >>> 8;
     $251 = ($250 | 0) == 0;
     if ($251) {
      $idx$0$i = 0;
     } else {
      $252 = $246 >>> 0 > 16777215;
      if ($252) {
       $idx$0$i = 31;
      } else {
       $253 = $250 + 1048320 | 0;
       $254 = $253 >>> 16;
       $255 = $254 & 8;
       $256 = $250 << $255;
       $257 = $256 + 520192 | 0;
       $258 = $257 >>> 16;
       $259 = $258 & 4;
       $260 = $259 | $255;
       $261 = $256 << $259;
       $262 = $261 + 245760 | 0;
       $263 = $262 >>> 16;
       $264 = $263 & 2;
       $265 = $260 | $264;
       $266 = 14 - $265 | 0;
       $267 = $261 << $264;
       $268 = $267 >>> 15;
       $269 = $266 + $268 | 0;
       $270 = $269 << 1;
       $271 = $269 + 7 | 0;
       $272 = $246 >>> $271;
       $273 = $272 & 1;
       $274 = $273 | $270;
       $idx$0$i = $274;
      }
     }
     $275 = 2768 + ($idx$0$i << 2) | 0;
     $276 = HEAP32[$275 >> 2] | 0;
     $277 = ($276 | 0) == (0 | 0);
     L123 : do {
      if ($277) {
       $rsize$2$i = $249;
       $t$1$i = 0;
       $v$2$i = 0;
       label = 86;
      } else {
       $278 = ($idx$0$i | 0) == 31;
       $279 = $idx$0$i >>> 1;
       $280 = 25 - $279 | 0;
       $281 = $278 ? 0 : $280;
       $282 = $246 << $281;
       $rsize$0$i15 = $249;
       $rst$0$i = 0;
       $sizebits$0$i = $282;
       $t$0$i14 = $276;
       $v$0$i16 = 0;
       while (1) {
        $283 = $t$0$i14 + 4 | 0;
        $284 = HEAP32[$283 >> 2] | 0;
        $285 = $284 & -8;
        $286 = $285 - $246 | 0;
        $287 = $286 >>> 0 < $rsize$0$i15 >>> 0;
        if ($287) {
         $288 = ($285 | 0) == ($246 | 0);
         if ($288) {
          $rsize$331$i = $286;
          $t$230$i = $t$0$i14;
          $v$332$i = $t$0$i14;
          label = 90;
          break L123;
         } else {
          $rsize$1$i = $286;
          $v$1$i = $t$0$i14;
         }
        } else {
         $rsize$1$i = $rsize$0$i15;
         $v$1$i = $v$0$i16;
        }
        $289 = $t$0$i14 + 20 | 0;
        $290 = HEAP32[$289 >> 2] | 0;
        $291 = $sizebits$0$i >>> 31;
        $292 = ($t$0$i14 + 16 | 0) + ($291 << 2) | 0;
        $293 = HEAP32[$292 >> 2] | 0;
        $294 = ($290 | 0) == (0 | 0);
        $295 = ($290 | 0) == ($293 | 0);
        $or$cond19$i = $294 | $295;
        $rst$1$i = $or$cond19$i ? $rst$0$i : $290;
        $296 = ($293 | 0) == (0 | 0);
        $297 = $sizebits$0$i << 1;
        if ($296) {
         $rsize$2$i = $rsize$1$i;
         $t$1$i = $rst$1$i;
         $v$2$i = $v$1$i;
         label = 86;
         break;
        } else {
         $rsize$0$i15 = $rsize$1$i;
         $rst$0$i = $rst$1$i;
         $sizebits$0$i = $297;
         $t$0$i14 = $293;
         $v$0$i16 = $v$1$i;
        }
       }
      }
     } while (0);
     if ((label | 0) == 86) {
      $298 = ($t$1$i | 0) == (0 | 0);
      $299 = ($v$2$i | 0) == (0 | 0);
      $or$cond$i = $298 & $299;
      if ($or$cond$i) {
       $300 = 2 << $idx$0$i;
       $301 = 0 - $300 | 0;
       $302 = $300 | $301;
       $303 = $247 & $302;
       $304 = ($303 | 0) == 0;
       if ($304) {
        $nb$0 = $246;
        break;
       }
       $305 = 0 - $303 | 0;
       $306 = $303 & $305;
       $307 = $306 + -1 | 0;
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
       $327 = $325 + $326 | 0;
       $328 = 2768 + ($327 << 2) | 0;
       $329 = HEAP32[$328 >> 2] | 0;
       $t$2$ph$i = $329;
       $v$3$ph$i = 0;
      } else {
       $t$2$ph$i = $t$1$i;
       $v$3$ph$i = $v$2$i;
      }
      $330 = ($t$2$ph$i | 0) == (0 | 0);
      if ($330) {
       $rsize$3$lcssa$i = $rsize$2$i;
       $v$3$lcssa$i = $v$3$ph$i;
      } else {
       $rsize$331$i = $rsize$2$i;
       $t$230$i = $t$2$ph$i;
       $v$332$i = $v$3$ph$i;
       label = 90;
      }
     }
     if ((label | 0) == 90) {
      while (1) {
       label = 0;
       $331 = $t$230$i + 4 | 0;
       $332 = HEAP32[$331 >> 2] | 0;
       $333 = $332 & -8;
       $334 = $333 - $246 | 0;
       $335 = $334 >>> 0 < $rsize$331$i >>> 0;
       $$rsize$3$i = $335 ? $334 : $rsize$331$i;
       $t$2$v$3$i = $335 ? $t$230$i : $v$332$i;
       $336 = $t$230$i + 16 | 0;
       $337 = HEAP32[$336 >> 2] | 0;
       $338 = ($337 | 0) == (0 | 0);
       if (!$338) {
        $rsize$331$i = $$rsize$3$i;
        $t$230$i = $337;
        $v$332$i = $t$2$v$3$i;
        label = 90;
        continue;
       }
       $339 = $t$230$i + 20 | 0;
       $340 = HEAP32[$339 >> 2] | 0;
       $341 = ($340 | 0) == (0 | 0);
       if ($341) {
        $rsize$3$lcssa$i = $$rsize$3$i;
        $v$3$lcssa$i = $t$2$v$3$i;
        break;
       } else {
        $rsize$331$i = $$rsize$3$i;
        $t$230$i = $340;
        $v$332$i = $t$2$v$3$i;
        label = 90;
       }
      }
     }
     $342 = ($v$3$lcssa$i | 0) == (0 | 0);
     if ($342) {
      $nb$0 = $246;
     } else {
      $343 = HEAP32[2472 >> 2] | 0;
      $344 = $343 - $246 | 0;
      $345 = $rsize$3$lcssa$i >>> 0 < $344 >>> 0;
      if ($345) {
       $346 = HEAP32[2480 >> 2] | 0;
       $347 = $v$3$lcssa$i >>> 0 < $346 >>> 0;
       if ($347) {
        _abort();
       }
       $348 = $v$3$lcssa$i + $246 | 0;
       $349 = $v$3$lcssa$i >>> 0 < $348 >>> 0;
       if (!$349) {
        _abort();
       }
       $350 = $v$3$lcssa$i + 24 | 0;
       $351 = HEAP32[$350 >> 2] | 0;
       $352 = $v$3$lcssa$i + 12 | 0;
       $353 = HEAP32[$352 >> 2] | 0;
       $354 = ($353 | 0) == ($v$3$lcssa$i | 0);
       do {
        if ($354) {
         $364 = $v$3$lcssa$i + 20 | 0;
         $365 = HEAP32[$364 >> 2] | 0;
         $366 = ($365 | 0) == (0 | 0);
         if ($366) {
          $367 = $v$3$lcssa$i + 16 | 0;
          $368 = HEAP32[$367 >> 2] | 0;
          $369 = ($368 | 0) == (0 | 0);
          if ($369) {
           $R$1$i20 = 0;
           break;
          } else {
           $R$0$i18 = $368;
           $RP$0$i17 = $367;
          }
         } else {
          $R$0$i18 = $365;
          $RP$0$i17 = $364;
         }
         while (1) {
          $370 = $R$0$i18 + 20 | 0;
          $371 = HEAP32[$370 >> 2] | 0;
          $372 = ($371 | 0) == (0 | 0);
          if (!$372) {
           $R$0$i18 = $371;
           $RP$0$i17 = $370;
           continue;
          }
          $373 = $R$0$i18 + 16 | 0;
          $374 = HEAP32[$373 >> 2] | 0;
          $375 = ($374 | 0) == (0 | 0);
          if ($375) {
           $R$0$i18$lcssa = $R$0$i18;
           $RP$0$i17$lcssa = $RP$0$i17;
           break;
          } else {
           $R$0$i18 = $374;
           $RP$0$i17 = $373;
          }
         }
         $376 = $RP$0$i17$lcssa >>> 0 < $346 >>> 0;
         if ($376) {
          _abort();
         } else {
          HEAP32[$RP$0$i17$lcssa >> 2] = 0;
          $R$1$i20 = $R$0$i18$lcssa;
          break;
         }
        } else {
         $355 = $v$3$lcssa$i + 8 | 0;
         $356 = HEAP32[$355 >> 2] | 0;
         $357 = $356 >>> 0 < $346 >>> 0;
         if ($357) {
          _abort();
         }
         $358 = $356 + 12 | 0;
         $359 = HEAP32[$358 >> 2] | 0;
         $360 = ($359 | 0) == ($v$3$lcssa$i | 0);
         if (!$360) {
          _abort();
         }
         $361 = $353 + 8 | 0;
         $362 = HEAP32[$361 >> 2] | 0;
         $363 = ($362 | 0) == ($v$3$lcssa$i | 0);
         if ($363) {
          HEAP32[$358 >> 2] = $353;
          HEAP32[$361 >> 2] = $356;
          $R$1$i20 = $353;
          break;
         } else {
          _abort();
         }
        }
       } while (0);
       $377 = ($351 | 0) == (0 | 0);
       do {
        if (!$377) {
         $378 = $v$3$lcssa$i + 28 | 0;
         $379 = HEAP32[$378 >> 2] | 0;
         $380 = 2768 + ($379 << 2) | 0;
         $381 = HEAP32[$380 >> 2] | 0;
         $382 = ($v$3$lcssa$i | 0) == ($381 | 0);
         if ($382) {
          HEAP32[$380 >> 2] = $R$1$i20;
          $cond$i21 = ($R$1$i20 | 0) == (0 | 0);
          if ($cond$i21) {
           $383 = 1 << $379;
           $384 = $383 ^ -1;
           $385 = HEAP32[2468 >> 2] | 0;
           $386 = $385 & $384;
           HEAP32[2468 >> 2] = $386;
           break;
          }
         } else {
          $387 = HEAP32[2480 >> 2] | 0;
          $388 = $351 >>> 0 < $387 >>> 0;
          if ($388) {
           _abort();
          }
          $389 = $351 + 16 | 0;
          $390 = HEAP32[$389 >> 2] | 0;
          $391 = ($390 | 0) == ($v$3$lcssa$i | 0);
          if ($391) {
           HEAP32[$389 >> 2] = $R$1$i20;
          } else {
           $392 = $351 + 20 | 0;
           HEAP32[$392 >> 2] = $R$1$i20;
          }
          $393 = ($R$1$i20 | 0) == (0 | 0);
          if ($393) {
           break;
          }
         }
         $394 = HEAP32[2480 >> 2] | 0;
         $395 = $R$1$i20 >>> 0 < $394 >>> 0;
         if ($395) {
          _abort();
         }
         $396 = $R$1$i20 + 24 | 0;
         HEAP32[$396 >> 2] = $351;
         $397 = $v$3$lcssa$i + 16 | 0;
         $398 = HEAP32[$397 >> 2] | 0;
         $399 = ($398 | 0) == (0 | 0);
         do {
          if (!$399) {
           $400 = $398 >>> 0 < $394 >>> 0;
           if ($400) {
            _abort();
           } else {
            $401 = $R$1$i20 + 16 | 0;
            HEAP32[$401 >> 2] = $398;
            $402 = $398 + 24 | 0;
            HEAP32[$402 >> 2] = $R$1$i20;
            break;
           }
          }
         } while (0);
         $403 = $v$3$lcssa$i + 20 | 0;
         $404 = HEAP32[$403 >> 2] | 0;
         $405 = ($404 | 0) == (0 | 0);
         if (!$405) {
          $406 = HEAP32[2480 >> 2] | 0;
          $407 = $404 >>> 0 < $406 >>> 0;
          if ($407) {
           _abort();
          } else {
           $408 = $R$1$i20 + 20 | 0;
           HEAP32[$408 >> 2] = $404;
           $409 = $404 + 24 | 0;
           HEAP32[$409 >> 2] = $R$1$i20;
           break;
          }
         }
        }
       } while (0);
       $410 = $rsize$3$lcssa$i >>> 0 < 16;
       L199 : do {
        if ($410) {
         $411 = $rsize$3$lcssa$i + $246 | 0;
         $412 = $411 | 3;
         $413 = $v$3$lcssa$i + 4 | 0;
         HEAP32[$413 >> 2] = $412;
         $$sum18$i = $411 + 4 | 0;
         $414 = $v$3$lcssa$i + $$sum18$i | 0;
         $415 = HEAP32[$414 >> 2] | 0;
         $416 = $415 | 1;
         HEAP32[$414 >> 2] = $416;
        } else {
         $417 = $246 | 3;
         $418 = $v$3$lcssa$i + 4 | 0;
         HEAP32[$418 >> 2] = $417;
         $419 = $rsize$3$lcssa$i | 1;
         $$sum$i2334 = $246 | 4;
         $420 = $v$3$lcssa$i + $$sum$i2334 | 0;
         HEAP32[$420 >> 2] = $419;
         $$sum1$i24 = $rsize$3$lcssa$i + $246 | 0;
         $421 = $v$3$lcssa$i + $$sum1$i24 | 0;
         HEAP32[$421 >> 2] = $rsize$3$lcssa$i;
         $422 = $rsize$3$lcssa$i >>> 3;
         $423 = $rsize$3$lcssa$i >>> 0 < 256;
         if ($423) {
          $424 = $422 << 1;
          $425 = 2504 + ($424 << 2) | 0;
          $426 = HEAP32[2464 >> 2] | 0;
          $427 = 1 << $422;
          $428 = $426 & $427;
          $429 = ($428 | 0) == 0;
          if ($429) {
           $430 = $426 | $427;
           HEAP32[2464 >> 2] = $430;
           $$pre$i25 = $424 + 2 | 0;
           $$pre43$i = 2504 + ($$pre$i25 << 2) | 0;
           $$pre$phi$i26Z2D = $$pre43$i;
           $F5$0$i = $425;
          } else {
           $$sum17$i = $424 + 2 | 0;
           $431 = 2504 + ($$sum17$i << 2) | 0;
           $432 = HEAP32[$431 >> 2] | 0;
           $433 = HEAP32[2480 >> 2] | 0;
           $434 = $432 >>> 0 < $433 >>> 0;
           if ($434) {
            _abort();
           } else {
            $$pre$phi$i26Z2D = $431;
            $F5$0$i = $432;
           }
          }
          HEAP32[$$pre$phi$i26Z2D >> 2] = $348;
          $435 = $F5$0$i + 12 | 0;
          HEAP32[$435 >> 2] = $348;
          $$sum15$i = $246 + 8 | 0;
          $436 = $v$3$lcssa$i + $$sum15$i | 0;
          HEAP32[$436 >> 2] = $F5$0$i;
          $$sum16$i = $246 + 12 | 0;
          $437 = $v$3$lcssa$i + $$sum16$i | 0;
          HEAP32[$437 >> 2] = $425;
          break;
         }
         $438 = $rsize$3$lcssa$i >>> 8;
         $439 = ($438 | 0) == 0;
         if ($439) {
          $I7$0$i = 0;
         } else {
          $440 = $rsize$3$lcssa$i >>> 0 > 16777215;
          if ($440) {
           $I7$0$i = 31;
          } else {
           $441 = $438 + 1048320 | 0;
           $442 = $441 >>> 16;
           $443 = $442 & 8;
           $444 = $438 << $443;
           $445 = $444 + 520192 | 0;
           $446 = $445 >>> 16;
           $447 = $446 & 4;
           $448 = $447 | $443;
           $449 = $444 << $447;
           $450 = $449 + 245760 | 0;
           $451 = $450 >>> 16;
           $452 = $451 & 2;
           $453 = $448 | $452;
           $454 = 14 - $453 | 0;
           $455 = $449 << $452;
           $456 = $455 >>> 15;
           $457 = $454 + $456 | 0;
           $458 = $457 << 1;
           $459 = $457 + 7 | 0;
           $460 = $rsize$3$lcssa$i >>> $459;
           $461 = $460 & 1;
           $462 = $461 | $458;
           $I7$0$i = $462;
          }
         }
         $463 = 2768 + ($I7$0$i << 2) | 0;
         $$sum2$i = $246 + 28 | 0;
         $464 = $v$3$lcssa$i + $$sum2$i | 0;
         HEAP32[$464 >> 2] = $I7$0$i;
         $$sum3$i27 = $246 + 16 | 0;
         $465 = $v$3$lcssa$i + $$sum3$i27 | 0;
         $$sum4$i28 = $246 + 20 | 0;
         $466 = $v$3$lcssa$i + $$sum4$i28 | 0;
         HEAP32[$466 >> 2] = 0;
         HEAP32[$465 >> 2] = 0;
         $467 = HEAP32[2468 >> 2] | 0;
         $468 = 1 << $I7$0$i;
         $469 = $467 & $468;
         $470 = ($469 | 0) == 0;
         if ($470) {
          $471 = $467 | $468;
          HEAP32[2468 >> 2] = $471;
          HEAP32[$463 >> 2] = $348;
          $$sum5$i = $246 + 24 | 0;
          $472 = $v$3$lcssa$i + $$sum5$i | 0;
          HEAP32[$472 >> 2] = $463;
          $$sum6$i = $246 + 12 | 0;
          $473 = $v$3$lcssa$i + $$sum6$i | 0;
          HEAP32[$473 >> 2] = $348;
          $$sum7$i = $246 + 8 | 0;
          $474 = $v$3$lcssa$i + $$sum7$i | 0;
          HEAP32[$474 >> 2] = $348;
          break;
         }
         $475 = HEAP32[$463 >> 2] | 0;
         $476 = $475 + 4 | 0;
         $477 = HEAP32[$476 >> 2] | 0;
         $478 = $477 & -8;
         $479 = ($478 | 0) == ($rsize$3$lcssa$i | 0);
         L216 : do {
          if ($479) {
           $T$0$lcssa$i = $475;
          } else {
           $480 = ($I7$0$i | 0) == 31;
           $481 = $I7$0$i >>> 1;
           $482 = 25 - $481 | 0;
           $483 = $480 ? 0 : $482;
           $484 = $rsize$3$lcssa$i << $483;
           $K12$029$i = $484;
           $T$028$i = $475;
           while (1) {
            $491 = $K12$029$i >>> 31;
            $492 = ($T$028$i + 16 | 0) + ($491 << 2) | 0;
            $487 = HEAP32[$492 >> 2] | 0;
            $493 = ($487 | 0) == (0 | 0);
            if ($493) {
             $$lcssa232 = $492;
             $T$028$i$lcssa = $T$028$i;
             break;
            }
            $485 = $K12$029$i << 1;
            $486 = $487 + 4 | 0;
            $488 = HEAP32[$486 >> 2] | 0;
            $489 = $488 & -8;
            $490 = ($489 | 0) == ($rsize$3$lcssa$i | 0);
            if ($490) {
             $T$0$lcssa$i = $487;
             break L216;
            } else {
             $K12$029$i = $485;
             $T$028$i = $487;
            }
           }
           $494 = HEAP32[2480 >> 2] | 0;
           $495 = $$lcssa232 >>> 0 < $494 >>> 0;
           if ($495) {
            _abort();
           } else {
            HEAP32[$$lcssa232 >> 2] = $348;
            $$sum11$i = $246 + 24 | 0;
            $496 = $v$3$lcssa$i + $$sum11$i | 0;
            HEAP32[$496 >> 2] = $T$028$i$lcssa;
            $$sum12$i = $246 + 12 | 0;
            $497 = $v$3$lcssa$i + $$sum12$i | 0;
            HEAP32[$497 >> 2] = $348;
            $$sum13$i = $246 + 8 | 0;
            $498 = $v$3$lcssa$i + $$sum13$i | 0;
            HEAP32[$498 >> 2] = $348;
            break L199;
           }
          }
         } while (0);
         $499 = $T$0$lcssa$i + 8 | 0;
         $500 = HEAP32[$499 >> 2] | 0;
         $501 = HEAP32[2480 >> 2] | 0;
         $502 = $500 >>> 0 >= $501 >>> 0;
         $not$$i = $T$0$lcssa$i >>> 0 >= $501 >>> 0;
         $503 = $502 & $not$$i;
         if ($503) {
          $504 = $500 + 12 | 0;
          HEAP32[$504 >> 2] = $348;
          HEAP32[$499 >> 2] = $348;
          $$sum8$i = $246 + 8 | 0;
          $505 = $v$3$lcssa$i + $$sum8$i | 0;
          HEAP32[$505 >> 2] = $500;
          $$sum9$i = $246 + 12 | 0;
          $506 = $v$3$lcssa$i + $$sum9$i | 0;
          HEAP32[$506 >> 2] = $T$0$lcssa$i;
          $$sum10$i = $246 + 24 | 0;
          $507 = $v$3$lcssa$i + $$sum10$i | 0;
          HEAP32[$507 >> 2] = 0;
          break;
         } else {
          _abort();
         }
        }
       } while (0);
       $508 = $v$3$lcssa$i + 8 | 0;
       $mem$0 = $508;
       return $mem$0 | 0;
      } else {
       $nb$0 = $246;
      }
     }
    }
   }
  }
 } while (0);
 $509 = HEAP32[2472 >> 2] | 0;
 $510 = $509 >>> 0 < $nb$0 >>> 0;
 if (!$510) {
  $511 = $509 - $nb$0 | 0;
  $512 = HEAP32[2484 >> 2] | 0;
  $513 = $511 >>> 0 > 15;
  if ($513) {
   $514 = $512 + $nb$0 | 0;
   HEAP32[2484 >> 2] = $514;
   HEAP32[2472 >> 2] = $511;
   $515 = $511 | 1;
   $$sum2 = $nb$0 + 4 | 0;
   $516 = $512 + $$sum2 | 0;
   HEAP32[$516 >> 2] = $515;
   $517 = $512 + $509 | 0;
   HEAP32[$517 >> 2] = $511;
   $518 = $nb$0 | 3;
   $519 = $512 + 4 | 0;
   HEAP32[$519 >> 2] = $518;
  } else {
   HEAP32[2472 >> 2] = 0;
   HEAP32[2484 >> 2] = 0;
   $520 = $509 | 3;
   $521 = $512 + 4 | 0;
   HEAP32[$521 >> 2] = $520;
   $$sum1 = $509 + 4 | 0;
   $522 = $512 + $$sum1 | 0;
   $523 = HEAP32[$522 >> 2] | 0;
   $524 = $523 | 1;
   HEAP32[$522 >> 2] = $524;
  }
  $525 = $512 + 8 | 0;
  $mem$0 = $525;
  return $mem$0 | 0;
 }
 $526 = HEAP32[2476 >> 2] | 0;
 $527 = $526 >>> 0 > $nb$0 >>> 0;
 if ($527) {
  $528 = $526 - $nb$0 | 0;
  HEAP32[2476 >> 2] = $528;
  $529 = HEAP32[2488 >> 2] | 0;
  $530 = $529 + $nb$0 | 0;
  HEAP32[2488 >> 2] = $530;
  $531 = $528 | 1;
  $$sum = $nb$0 + 4 | 0;
  $532 = $529 + $$sum | 0;
  HEAP32[$532 >> 2] = $531;
  $533 = $nb$0 | 3;
  $534 = $529 + 4 | 0;
  HEAP32[$534 >> 2] = $533;
  $535 = $529 + 8 | 0;
  $mem$0 = $535;
  return $mem$0 | 0;
 }
 $536 = HEAP32[2936 >> 2] | 0;
 $537 = ($536 | 0) == 0;
 do {
  if ($537) {
   $538 = _sysconf(30) | 0;
   $539 = $538 + -1 | 0;
   $540 = $539 & $538;
   $541 = ($540 | 0) == 0;
   if ($541) {
    HEAP32[2944 >> 2] = $538;
    HEAP32[2940 >> 2] = $538;
    HEAP32[2948 >> 2] = -1;
    HEAP32[2952 >> 2] = -1;
    HEAP32[2956 >> 2] = 0;
    HEAP32[2908 >> 2] = 0;
    $542 = _time(0 | 0) | 0;
    $543 = $542 & -16;
    $544 = $543 ^ 1431655768;
    HEAP32[2936 >> 2] = $544;
    break;
   } else {
    _abort();
   }
  }
 } while (0);
 $545 = $nb$0 + 48 | 0;
 $546 = HEAP32[2944 >> 2] | 0;
 $547 = $nb$0 + 47 | 0;
 $548 = $546 + $547 | 0;
 $549 = 0 - $546 | 0;
 $550 = $548 & $549;
 $551 = $550 >>> 0 > $nb$0 >>> 0;
 if (!$551) {
  $mem$0 = 0;
  return $mem$0 | 0;
 }
 $552 = HEAP32[2904 >> 2] | 0;
 $553 = ($552 | 0) == 0;
 if (!$553) {
  $554 = HEAP32[2896 >> 2] | 0;
  $555 = $554 + $550 | 0;
  $556 = $555 >>> 0 <= $554 >>> 0;
  $557 = $555 >>> 0 > $552 >>> 0;
  $or$cond1$i = $556 | $557;
  if ($or$cond1$i) {
   $mem$0 = 0;
   return $mem$0 | 0;
  }
 }
 $558 = HEAP32[2908 >> 2] | 0;
 $559 = $558 & 4;
 $560 = ($559 | 0) == 0;
 L258 : do {
  if ($560) {
   $561 = HEAP32[2488 >> 2] | 0;
   $562 = ($561 | 0) == (0 | 0);
   L260 : do {
    if ($562) {
     label = 174;
    } else {
     $sp$0$i$i = 2912;
     while (1) {
      $563 = HEAP32[$sp$0$i$i >> 2] | 0;
      $564 = $563 >>> 0 > $561 >>> 0;
      if (!$564) {
       $565 = $sp$0$i$i + 4 | 0;
       $566 = HEAP32[$565 >> 2] | 0;
       $567 = $563 + $566 | 0;
       $568 = $567 >>> 0 > $561 >>> 0;
       if ($568) {
        $$lcssa228 = $sp$0$i$i;
        $$lcssa230 = $565;
        break;
       }
      }
      $569 = $sp$0$i$i + 8 | 0;
      $570 = HEAP32[$569 >> 2] | 0;
      $571 = ($570 | 0) == (0 | 0);
      if ($571) {
       label = 174;
       break L260;
      } else {
       $sp$0$i$i = $570;
      }
     }
     $594 = HEAP32[2476 >> 2] | 0;
     $595 = $548 - $594 | 0;
     $596 = $595 & $549;
     $597 = $596 >>> 0 < 2147483647;
     if ($597) {
      $598 = _sbrk($596 | 0) | 0;
      $599 = HEAP32[$$lcssa228 >> 2] | 0;
      $600 = HEAP32[$$lcssa230 >> 2] | 0;
      $601 = $599 + $600 | 0;
      $602 = ($598 | 0) == ($601 | 0);
      $$3$i = $602 ? $596 : 0;
      if ($602) {
       $603 = ($598 | 0) == (-1 | 0);
       if ($603) {
        $tsize$0323944$i = $$3$i;
       } else {
        $tbase$255$i = $598;
        $tsize$254$i = $$3$i;
        label = 194;
        break L258;
       }
      } else {
       $br$0$ph$i = $598;
       $ssize$1$ph$i = $596;
       $tsize$0$ph$i = $$3$i;
       label = 184;
      }
     } else {
      $tsize$0323944$i = 0;
     }
    }
   } while (0);
   do {
    if ((label | 0) == 174) {
     $572 = _sbrk(0) | 0;
     $573 = ($572 | 0) == (-1 | 0);
     if ($573) {
      $tsize$0323944$i = 0;
     } else {
      $574 = $572;
      $575 = HEAP32[2940 >> 2] | 0;
      $576 = $575 + -1 | 0;
      $577 = $576 & $574;
      $578 = ($577 | 0) == 0;
      if ($578) {
       $ssize$0$i = $550;
      } else {
       $579 = $576 + $574 | 0;
       $580 = 0 - $575 | 0;
       $581 = $579 & $580;
       $582 = $550 - $574 | 0;
       $583 = $582 + $581 | 0;
       $ssize$0$i = $583;
      }
      $584 = HEAP32[2896 >> 2] | 0;
      $585 = $584 + $ssize$0$i | 0;
      $586 = $ssize$0$i >>> 0 > $nb$0 >>> 0;
      $587 = $ssize$0$i >>> 0 < 2147483647;
      $or$cond$i30 = $586 & $587;
      if ($or$cond$i30) {
       $588 = HEAP32[2904 >> 2] | 0;
       $589 = ($588 | 0) == 0;
       if (!$589) {
        $590 = $585 >>> 0 <= $584 >>> 0;
        $591 = $585 >>> 0 > $588 >>> 0;
        $or$cond2$i = $590 | $591;
        if ($or$cond2$i) {
         $tsize$0323944$i = 0;
         break;
        }
       }
       $592 = _sbrk($ssize$0$i | 0) | 0;
       $593 = ($592 | 0) == ($572 | 0);
       $ssize$0$$i = $593 ? $ssize$0$i : 0;
       if ($593) {
        $tbase$255$i = $572;
        $tsize$254$i = $ssize$0$$i;
        label = 194;
        break L258;
       } else {
        $br$0$ph$i = $592;
        $ssize$1$ph$i = $ssize$0$i;
        $tsize$0$ph$i = $ssize$0$$i;
        label = 184;
       }
      } else {
       $tsize$0323944$i = 0;
      }
     }
    }
   } while (0);
   L280 : do {
    if ((label | 0) == 184) {
     $604 = 0 - $ssize$1$ph$i | 0;
     $605 = ($br$0$ph$i | 0) != (-1 | 0);
     $606 = $ssize$1$ph$i >>> 0 < 2147483647;
     $or$cond5$i = $606 & $605;
     $607 = $545 >>> 0 > $ssize$1$ph$i >>> 0;
     $or$cond6$i = $607 & $or$cond5$i;
     do {
      if ($or$cond6$i) {
       $608 = HEAP32[2944 >> 2] | 0;
       $609 = $547 - $ssize$1$ph$i | 0;
       $610 = $609 + $608 | 0;
       $611 = 0 - $608 | 0;
       $612 = $610 & $611;
       $613 = $612 >>> 0 < 2147483647;
       if ($613) {
        $614 = _sbrk($612 | 0) | 0;
        $615 = ($614 | 0) == (-1 | 0);
        if ($615) {
         _sbrk($604 | 0) | 0;
         $tsize$0323944$i = $tsize$0$ph$i;
         break L280;
        } else {
         $616 = $612 + $ssize$1$ph$i | 0;
         $ssize$2$i = $616;
         break;
        }
       } else {
        $ssize$2$i = $ssize$1$ph$i;
       }
      } else {
       $ssize$2$i = $ssize$1$ph$i;
      }
     } while (0);
     $617 = ($br$0$ph$i | 0) == (-1 | 0);
     if ($617) {
      $tsize$0323944$i = $tsize$0$ph$i;
     } else {
      $tbase$255$i = $br$0$ph$i;
      $tsize$254$i = $ssize$2$i;
      label = 194;
      break L258;
     }
    }
   } while (0);
   $618 = HEAP32[2908 >> 2] | 0;
   $619 = $618 | 4;
   HEAP32[2908 >> 2] = $619;
   $tsize$1$i = $tsize$0323944$i;
   label = 191;
  } else {
   $tsize$1$i = 0;
   label = 191;
  }
 } while (0);
 if ((label | 0) == 191) {
  $620 = $550 >>> 0 < 2147483647;
  if ($620) {
   $621 = _sbrk($550 | 0) | 0;
   $622 = _sbrk(0) | 0;
   $623 = ($621 | 0) != (-1 | 0);
   $624 = ($622 | 0) != (-1 | 0);
   $or$cond3$i = $623 & $624;
   $625 = $621 >>> 0 < $622 >>> 0;
   $or$cond8$i = $625 & $or$cond3$i;
   if ($or$cond8$i) {
    $626 = $622;
    $627 = $621;
    $628 = $626 - $627 | 0;
    $629 = $nb$0 + 40 | 0;
    $630 = $628 >>> 0 > $629 >>> 0;
    $$tsize$1$i = $630 ? $628 : $tsize$1$i;
    if ($630) {
     $tbase$255$i = $621;
     $tsize$254$i = $$tsize$1$i;
     label = 194;
    }
   }
  }
 }
 if ((label | 0) == 194) {
  $631 = HEAP32[2896 >> 2] | 0;
  $632 = $631 + $tsize$254$i | 0;
  HEAP32[2896 >> 2] = $632;
  $633 = HEAP32[2900 >> 2] | 0;
  $634 = $632 >>> 0 > $633 >>> 0;
  if ($634) {
   HEAP32[2900 >> 2] = $632;
  }
  $635 = HEAP32[2488 >> 2] | 0;
  $636 = ($635 | 0) == (0 | 0);
  L299 : do {
   if ($636) {
    $637 = HEAP32[2480 >> 2] | 0;
    $638 = ($637 | 0) == (0 | 0);
    $639 = $tbase$255$i >>> 0 < $637 >>> 0;
    $or$cond9$i = $638 | $639;
    if ($or$cond9$i) {
     HEAP32[2480 >> 2] = $tbase$255$i;
    }
    HEAP32[2912 >> 2] = $tbase$255$i;
    HEAP32[2916 >> 2] = $tsize$254$i;
    HEAP32[2924 >> 2] = 0;
    $640 = HEAP32[2936 >> 2] | 0;
    HEAP32[2500 >> 2] = $640;
    HEAP32[2496 >> 2] = -1;
    $i$02$i$i = 0;
    while (1) {
     $641 = $i$02$i$i << 1;
     $642 = 2504 + ($641 << 2) | 0;
     $$sum$i$i = $641 + 3 | 0;
     $643 = 2504 + ($$sum$i$i << 2) | 0;
     HEAP32[$643 >> 2] = $642;
     $$sum1$i$i = $641 + 2 | 0;
     $644 = 2504 + ($$sum1$i$i << 2) | 0;
     HEAP32[$644 >> 2] = $642;
     $645 = $i$02$i$i + 1 | 0;
     $exitcond$i$i = ($645 | 0) == 32;
     if ($exitcond$i$i) {
      break;
     } else {
      $i$02$i$i = $645;
     }
    }
    $646 = $tsize$254$i + -40 | 0;
    $647 = $tbase$255$i + 8 | 0;
    $648 = $647;
    $649 = $648 & 7;
    $650 = ($649 | 0) == 0;
    $651 = 0 - $648 | 0;
    $652 = $651 & 7;
    $653 = $650 ? 0 : $652;
    $654 = $tbase$255$i + $653 | 0;
    $655 = $646 - $653 | 0;
    HEAP32[2488 >> 2] = $654;
    HEAP32[2476 >> 2] = $655;
    $656 = $655 | 1;
    $$sum$i13$i = $653 + 4 | 0;
    $657 = $tbase$255$i + $$sum$i13$i | 0;
    HEAP32[$657 >> 2] = $656;
    $$sum2$i$i = $tsize$254$i + -36 | 0;
    $658 = $tbase$255$i + $$sum2$i$i | 0;
    HEAP32[$658 >> 2] = 40;
    $659 = HEAP32[2952 >> 2] | 0;
    HEAP32[2492 >> 2] = $659;
   } else {
    $sp$084$i = 2912;
    while (1) {
     $660 = HEAP32[$sp$084$i >> 2] | 0;
     $661 = $sp$084$i + 4 | 0;
     $662 = HEAP32[$661 >> 2] | 0;
     $663 = $660 + $662 | 0;
     $664 = ($tbase$255$i | 0) == ($663 | 0);
     if ($664) {
      $$lcssa222 = $660;
      $$lcssa224 = $661;
      $$lcssa226 = $662;
      $sp$084$i$lcssa = $sp$084$i;
      label = 204;
      break;
     }
     $665 = $sp$084$i + 8 | 0;
     $666 = HEAP32[$665 >> 2] | 0;
     $667 = ($666 | 0) == (0 | 0);
     if ($667) {
      break;
     } else {
      $sp$084$i = $666;
     }
    }
    if ((label | 0) == 204) {
     $668 = $sp$084$i$lcssa + 12 | 0;
     $669 = HEAP32[$668 >> 2] | 0;
     $670 = $669 & 8;
     $671 = ($670 | 0) == 0;
     if ($671) {
      $672 = $635 >>> 0 >= $$lcssa222 >>> 0;
      $673 = $635 >>> 0 < $tbase$255$i >>> 0;
      $or$cond57$i = $673 & $672;
      if ($or$cond57$i) {
       $674 = $$lcssa226 + $tsize$254$i | 0;
       HEAP32[$$lcssa224 >> 2] = $674;
       $675 = HEAP32[2476 >> 2] | 0;
       $676 = $675 + $tsize$254$i | 0;
       $677 = $635 + 8 | 0;
       $678 = $677;
       $679 = $678 & 7;
       $680 = ($679 | 0) == 0;
       $681 = 0 - $678 | 0;
       $682 = $681 & 7;
       $683 = $680 ? 0 : $682;
       $684 = $635 + $683 | 0;
       $685 = $676 - $683 | 0;
       HEAP32[2488 >> 2] = $684;
       HEAP32[2476 >> 2] = $685;
       $686 = $685 | 1;
       $$sum$i17$i = $683 + 4 | 0;
       $687 = $635 + $$sum$i17$i | 0;
       HEAP32[$687 >> 2] = $686;
       $$sum2$i18$i = $676 + 4 | 0;
       $688 = $635 + $$sum2$i18$i | 0;
       HEAP32[$688 >> 2] = 40;
       $689 = HEAP32[2952 >> 2] | 0;
       HEAP32[2492 >> 2] = $689;
       break;
      }
     }
    }
    $690 = HEAP32[2480 >> 2] | 0;
    $691 = $tbase$255$i >>> 0 < $690 >>> 0;
    if ($691) {
     HEAP32[2480 >> 2] = $tbase$255$i;
     $755 = $tbase$255$i;
    } else {
     $755 = $690;
    }
    $692 = $tbase$255$i + $tsize$254$i | 0;
    $sp$183$i = 2912;
    while (1) {
     $693 = HEAP32[$sp$183$i >> 2] | 0;
     $694 = ($693 | 0) == ($692 | 0);
     if ($694) {
      $$lcssa219 = $sp$183$i;
      $sp$183$i$lcssa = $sp$183$i;
      label = 212;
      break;
     }
     $695 = $sp$183$i + 8 | 0;
     $696 = HEAP32[$695 >> 2] | 0;
     $697 = ($696 | 0) == (0 | 0);
     if ($697) {
      $sp$0$i$i$i = 2912;
      break;
     } else {
      $sp$183$i = $696;
     }
    }
    if ((label | 0) == 212) {
     $698 = $sp$183$i$lcssa + 12 | 0;
     $699 = HEAP32[$698 >> 2] | 0;
     $700 = $699 & 8;
     $701 = ($700 | 0) == 0;
     if ($701) {
      HEAP32[$$lcssa219 >> 2] = $tbase$255$i;
      $702 = $sp$183$i$lcssa + 4 | 0;
      $703 = HEAP32[$702 >> 2] | 0;
      $704 = $703 + $tsize$254$i | 0;
      HEAP32[$702 >> 2] = $704;
      $705 = $tbase$255$i + 8 | 0;
      $706 = $705;
      $707 = $706 & 7;
      $708 = ($707 | 0) == 0;
      $709 = 0 - $706 | 0;
      $710 = $709 & 7;
      $711 = $708 ? 0 : $710;
      $712 = $tbase$255$i + $711 | 0;
      $$sum112$i = $tsize$254$i + 8 | 0;
      $713 = $tbase$255$i + $$sum112$i | 0;
      $714 = $713;
      $715 = $714 & 7;
      $716 = ($715 | 0) == 0;
      $717 = 0 - $714 | 0;
      $718 = $717 & 7;
      $719 = $716 ? 0 : $718;
      $$sum113$i = $719 + $tsize$254$i | 0;
      $720 = $tbase$255$i + $$sum113$i | 0;
      $721 = $720;
      $722 = $712;
      $723 = $721 - $722 | 0;
      $$sum$i19$i = $711 + $nb$0 | 0;
      $724 = $tbase$255$i + $$sum$i19$i | 0;
      $725 = $723 - $nb$0 | 0;
      $726 = $nb$0 | 3;
      $$sum1$i20$i = $711 + 4 | 0;
      $727 = $tbase$255$i + $$sum1$i20$i | 0;
      HEAP32[$727 >> 2] = $726;
      $728 = ($720 | 0) == ($635 | 0);
      L317 : do {
       if ($728) {
        $729 = HEAP32[2476 >> 2] | 0;
        $730 = $729 + $725 | 0;
        HEAP32[2476 >> 2] = $730;
        HEAP32[2488 >> 2] = $724;
        $731 = $730 | 1;
        $$sum42$i$i = $$sum$i19$i + 4 | 0;
        $732 = $tbase$255$i + $$sum42$i$i | 0;
        HEAP32[$732 >> 2] = $731;
       } else {
        $733 = HEAP32[2484 >> 2] | 0;
        $734 = ($720 | 0) == ($733 | 0);
        if ($734) {
         $735 = HEAP32[2472 >> 2] | 0;
         $736 = $735 + $725 | 0;
         HEAP32[2472 >> 2] = $736;
         HEAP32[2484 >> 2] = $724;
         $737 = $736 | 1;
         $$sum40$i$i = $$sum$i19$i + 4 | 0;
         $738 = $tbase$255$i + $$sum40$i$i | 0;
         HEAP32[$738 >> 2] = $737;
         $$sum41$i$i = $736 + $$sum$i19$i | 0;
         $739 = $tbase$255$i + $$sum41$i$i | 0;
         HEAP32[$739 >> 2] = $736;
         break;
        }
        $$sum2$i21$i = $tsize$254$i + 4 | 0;
        $$sum114$i = $$sum2$i21$i + $719 | 0;
        $740 = $tbase$255$i + $$sum114$i | 0;
        $741 = HEAP32[$740 >> 2] | 0;
        $742 = $741 & 3;
        $743 = ($742 | 0) == 1;
        if ($743) {
         $744 = $741 & -8;
         $745 = $741 >>> 3;
         $746 = $741 >>> 0 < 256;
         L325 : do {
          if ($746) {
           $$sum3738$i$i = $719 | 8;
           $$sum124$i = $$sum3738$i$i + $tsize$254$i | 0;
           $747 = $tbase$255$i + $$sum124$i | 0;
           $748 = HEAP32[$747 >> 2] | 0;
           $$sum39$i$i = $tsize$254$i + 12 | 0;
           $$sum125$i = $$sum39$i$i + $719 | 0;
           $749 = $tbase$255$i + $$sum125$i | 0;
           $750 = HEAP32[$749 >> 2] | 0;
           $751 = $745 << 1;
           $752 = 2504 + ($751 << 2) | 0;
           $753 = ($748 | 0) == ($752 | 0);
           do {
            if (!$753) {
             $754 = $748 >>> 0 < $755 >>> 0;
             if ($754) {
              _abort();
             }
             $756 = $748 + 12 | 0;
             $757 = HEAP32[$756 >> 2] | 0;
             $758 = ($757 | 0) == ($720 | 0);
             if ($758) {
              break;
             }
             _abort();
            }
           } while (0);
           $759 = ($750 | 0) == ($748 | 0);
           if ($759) {
            $760 = 1 << $745;
            $761 = $760 ^ -1;
            $762 = HEAP32[2464 >> 2] | 0;
            $763 = $762 & $761;
            HEAP32[2464 >> 2] = $763;
            break;
           }
           $764 = ($750 | 0) == ($752 | 0);
           do {
            if ($764) {
             $$pre57$i$i = $750 + 8 | 0;
             $$pre$phi58$i$iZ2D = $$pre57$i$i;
            } else {
             $765 = $750 >>> 0 < $755 >>> 0;
             if ($765) {
              _abort();
             }
             $766 = $750 + 8 | 0;
             $767 = HEAP32[$766 >> 2] | 0;
             $768 = ($767 | 0) == ($720 | 0);
             if ($768) {
              $$pre$phi58$i$iZ2D = $766;
              break;
             }
             _abort();
            }
           } while (0);
           $769 = $748 + 12 | 0;
           HEAP32[$769 >> 2] = $750;
           HEAP32[$$pre$phi58$i$iZ2D >> 2] = $748;
          } else {
           $$sum34$i$i = $719 | 24;
           $$sum115$i = $$sum34$i$i + $tsize$254$i | 0;
           $770 = $tbase$255$i + $$sum115$i | 0;
           $771 = HEAP32[$770 >> 2] | 0;
           $$sum5$i$i = $tsize$254$i + 12 | 0;
           $$sum116$i = $$sum5$i$i + $719 | 0;
           $772 = $tbase$255$i + $$sum116$i | 0;
           $773 = HEAP32[$772 >> 2] | 0;
           $774 = ($773 | 0) == ($720 | 0);
           do {
            if ($774) {
             $$sum67$i$i = $719 | 16;
             $$sum122$i = $$sum2$i21$i + $$sum67$i$i | 0;
             $784 = $tbase$255$i + $$sum122$i | 0;
             $785 = HEAP32[$784 >> 2] | 0;
             $786 = ($785 | 0) == (0 | 0);
             if ($786) {
              $$sum123$i = $$sum67$i$i + $tsize$254$i | 0;
              $787 = $tbase$255$i + $$sum123$i | 0;
              $788 = HEAP32[$787 >> 2] | 0;
              $789 = ($788 | 0) == (0 | 0);
              if ($789) {
               $R$1$i$i = 0;
               break;
              } else {
               $R$0$i$i = $788;
               $RP$0$i$i = $787;
              }
             } else {
              $R$0$i$i = $785;
              $RP$0$i$i = $784;
             }
             while (1) {
              $790 = $R$0$i$i + 20 | 0;
              $791 = HEAP32[$790 >> 2] | 0;
              $792 = ($791 | 0) == (0 | 0);
              if (!$792) {
               $R$0$i$i = $791;
               $RP$0$i$i = $790;
               continue;
              }
              $793 = $R$0$i$i + 16 | 0;
              $794 = HEAP32[$793 >> 2] | 0;
              $795 = ($794 | 0) == (0 | 0);
              if ($795) {
               $R$0$i$i$lcssa = $R$0$i$i;
               $RP$0$i$i$lcssa = $RP$0$i$i;
               break;
              } else {
               $R$0$i$i = $794;
               $RP$0$i$i = $793;
              }
             }
             $796 = $RP$0$i$i$lcssa >>> 0 < $755 >>> 0;
             if ($796) {
              _abort();
             } else {
              HEAP32[$RP$0$i$i$lcssa >> 2] = 0;
              $R$1$i$i = $R$0$i$i$lcssa;
              break;
             }
            } else {
             $$sum3536$i$i = $719 | 8;
             $$sum117$i = $$sum3536$i$i + $tsize$254$i | 0;
             $775 = $tbase$255$i + $$sum117$i | 0;
             $776 = HEAP32[$775 >> 2] | 0;
             $777 = $776 >>> 0 < $755 >>> 0;
             if ($777) {
              _abort();
             }
             $778 = $776 + 12 | 0;
             $779 = HEAP32[$778 >> 2] | 0;
             $780 = ($779 | 0) == ($720 | 0);
             if (!$780) {
              _abort();
             }
             $781 = $773 + 8 | 0;
             $782 = HEAP32[$781 >> 2] | 0;
             $783 = ($782 | 0) == ($720 | 0);
             if ($783) {
              HEAP32[$778 >> 2] = $773;
              HEAP32[$781 >> 2] = $776;
              $R$1$i$i = $773;
              break;
             } else {
              _abort();
             }
            }
           } while (0);
           $797 = ($771 | 0) == (0 | 0);
           if ($797) {
            break;
           }
           $$sum30$i$i = $tsize$254$i + 28 | 0;
           $$sum118$i = $$sum30$i$i + $719 | 0;
           $798 = $tbase$255$i + $$sum118$i | 0;
           $799 = HEAP32[$798 >> 2] | 0;
           $800 = 2768 + ($799 << 2) | 0;
           $801 = HEAP32[$800 >> 2] | 0;
           $802 = ($720 | 0) == ($801 | 0);
           do {
            if ($802) {
             HEAP32[$800 >> 2] = $R$1$i$i;
             $cond$i$i = ($R$1$i$i | 0) == (0 | 0);
             if (!$cond$i$i) {
              break;
             }
             $803 = 1 << $799;
             $804 = $803 ^ -1;
             $805 = HEAP32[2468 >> 2] | 0;
             $806 = $805 & $804;
             HEAP32[2468 >> 2] = $806;
             break L325;
            } else {
             $807 = HEAP32[2480 >> 2] | 0;
             $808 = $771 >>> 0 < $807 >>> 0;
             if ($808) {
              _abort();
             }
             $809 = $771 + 16 | 0;
             $810 = HEAP32[$809 >> 2] | 0;
             $811 = ($810 | 0) == ($720 | 0);
             if ($811) {
              HEAP32[$809 >> 2] = $R$1$i$i;
             } else {
              $812 = $771 + 20 | 0;
              HEAP32[$812 >> 2] = $R$1$i$i;
             }
             $813 = ($R$1$i$i | 0) == (0 | 0);
             if ($813) {
              break L325;
             }
            }
           } while (0);
           $814 = HEAP32[2480 >> 2] | 0;
           $815 = $R$1$i$i >>> 0 < $814 >>> 0;
           if ($815) {
            _abort();
           }
           $816 = $R$1$i$i + 24 | 0;
           HEAP32[$816 >> 2] = $771;
           $$sum3132$i$i = $719 | 16;
           $$sum119$i = $$sum3132$i$i + $tsize$254$i | 0;
           $817 = $tbase$255$i + $$sum119$i | 0;
           $818 = HEAP32[$817 >> 2] | 0;
           $819 = ($818 | 0) == (0 | 0);
           do {
            if (!$819) {
             $820 = $818 >>> 0 < $814 >>> 0;
             if ($820) {
              _abort();
             } else {
              $821 = $R$1$i$i + 16 | 0;
              HEAP32[$821 >> 2] = $818;
              $822 = $818 + 24 | 0;
              HEAP32[$822 >> 2] = $R$1$i$i;
              break;
             }
            }
           } while (0);
           $$sum120$i = $$sum2$i21$i + $$sum3132$i$i | 0;
           $823 = $tbase$255$i + $$sum120$i | 0;
           $824 = HEAP32[$823 >> 2] | 0;
           $825 = ($824 | 0) == (0 | 0);
           if ($825) {
            break;
           }
           $826 = HEAP32[2480 >> 2] | 0;
           $827 = $824 >>> 0 < $826 >>> 0;
           if ($827) {
            _abort();
           } else {
            $828 = $R$1$i$i + 20 | 0;
            HEAP32[$828 >> 2] = $824;
            $829 = $824 + 24 | 0;
            HEAP32[$829 >> 2] = $R$1$i$i;
            break;
           }
          }
         } while (0);
         $$sum9$i$i = $744 | $719;
         $$sum121$i = $$sum9$i$i + $tsize$254$i | 0;
         $830 = $tbase$255$i + $$sum121$i | 0;
         $831 = $744 + $725 | 0;
         $oldfirst$0$i$i = $830;
         $qsize$0$i$i = $831;
        } else {
         $oldfirst$0$i$i = $720;
         $qsize$0$i$i = $725;
        }
        $832 = $oldfirst$0$i$i + 4 | 0;
        $833 = HEAP32[$832 >> 2] | 0;
        $834 = $833 & -2;
        HEAP32[$832 >> 2] = $834;
        $835 = $qsize$0$i$i | 1;
        $$sum10$i$i = $$sum$i19$i + 4 | 0;
        $836 = $tbase$255$i + $$sum10$i$i | 0;
        HEAP32[$836 >> 2] = $835;
        $$sum11$i$i = $qsize$0$i$i + $$sum$i19$i | 0;
        $837 = $tbase$255$i + $$sum11$i$i | 0;
        HEAP32[$837 >> 2] = $qsize$0$i$i;
        $838 = $qsize$0$i$i >>> 3;
        $839 = $qsize$0$i$i >>> 0 < 256;
        if ($839) {
         $840 = $838 << 1;
         $841 = 2504 + ($840 << 2) | 0;
         $842 = HEAP32[2464 >> 2] | 0;
         $843 = 1 << $838;
         $844 = $842 & $843;
         $845 = ($844 | 0) == 0;
         do {
          if ($845) {
           $846 = $842 | $843;
           HEAP32[2464 >> 2] = $846;
           $$pre$i22$i = $840 + 2 | 0;
           $$pre56$i$i = 2504 + ($$pre$i22$i << 2) | 0;
           $$pre$phi$i23$iZ2D = $$pre56$i$i;
           $F4$0$i$i = $841;
          } else {
           $$sum29$i$i = $840 + 2 | 0;
           $847 = 2504 + ($$sum29$i$i << 2) | 0;
           $848 = HEAP32[$847 >> 2] | 0;
           $849 = HEAP32[2480 >> 2] | 0;
           $850 = $848 >>> 0 < $849 >>> 0;
           if (!$850) {
            $$pre$phi$i23$iZ2D = $847;
            $F4$0$i$i = $848;
            break;
           }
           _abort();
          }
         } while (0);
         HEAP32[$$pre$phi$i23$iZ2D >> 2] = $724;
         $851 = $F4$0$i$i + 12 | 0;
         HEAP32[$851 >> 2] = $724;
         $$sum27$i$i = $$sum$i19$i + 8 | 0;
         $852 = $tbase$255$i + $$sum27$i$i | 0;
         HEAP32[$852 >> 2] = $F4$0$i$i;
         $$sum28$i$i = $$sum$i19$i + 12 | 0;
         $853 = $tbase$255$i + $$sum28$i$i | 0;
         HEAP32[$853 >> 2] = $841;
         break;
        }
        $854 = $qsize$0$i$i >>> 8;
        $855 = ($854 | 0) == 0;
        do {
         if ($855) {
          $I7$0$i$i = 0;
         } else {
          $856 = $qsize$0$i$i >>> 0 > 16777215;
          if ($856) {
           $I7$0$i$i = 31;
           break;
          }
          $857 = $854 + 1048320 | 0;
          $858 = $857 >>> 16;
          $859 = $858 & 8;
          $860 = $854 << $859;
          $861 = $860 + 520192 | 0;
          $862 = $861 >>> 16;
          $863 = $862 & 4;
          $864 = $863 | $859;
          $865 = $860 << $863;
          $866 = $865 + 245760 | 0;
          $867 = $866 >>> 16;
          $868 = $867 & 2;
          $869 = $864 | $868;
          $870 = 14 - $869 | 0;
          $871 = $865 << $868;
          $872 = $871 >>> 15;
          $873 = $870 + $872 | 0;
          $874 = $873 << 1;
          $875 = $873 + 7 | 0;
          $876 = $qsize$0$i$i >>> $875;
          $877 = $876 & 1;
          $878 = $877 | $874;
          $I7$0$i$i = $878;
         }
        } while (0);
        $879 = 2768 + ($I7$0$i$i << 2) | 0;
        $$sum12$i$i = $$sum$i19$i + 28 | 0;
        $880 = $tbase$255$i + $$sum12$i$i | 0;
        HEAP32[$880 >> 2] = $I7$0$i$i;
        $$sum13$i$i = $$sum$i19$i + 16 | 0;
        $881 = $tbase$255$i + $$sum13$i$i | 0;
        $$sum14$i$i = $$sum$i19$i + 20 | 0;
        $882 = $tbase$255$i + $$sum14$i$i | 0;
        HEAP32[$882 >> 2] = 0;
        HEAP32[$881 >> 2] = 0;
        $883 = HEAP32[2468 >> 2] | 0;
        $884 = 1 << $I7$0$i$i;
        $885 = $883 & $884;
        $886 = ($885 | 0) == 0;
        if ($886) {
         $887 = $883 | $884;
         HEAP32[2468 >> 2] = $887;
         HEAP32[$879 >> 2] = $724;
         $$sum15$i$i = $$sum$i19$i + 24 | 0;
         $888 = $tbase$255$i + $$sum15$i$i | 0;
         HEAP32[$888 >> 2] = $879;
         $$sum16$i$i = $$sum$i19$i + 12 | 0;
         $889 = $tbase$255$i + $$sum16$i$i | 0;
         HEAP32[$889 >> 2] = $724;
         $$sum17$i$i = $$sum$i19$i + 8 | 0;
         $890 = $tbase$255$i + $$sum17$i$i | 0;
         HEAP32[$890 >> 2] = $724;
         break;
        }
        $891 = HEAP32[$879 >> 2] | 0;
        $892 = $891 + 4 | 0;
        $893 = HEAP32[$892 >> 2] | 0;
        $894 = $893 & -8;
        $895 = ($894 | 0) == ($qsize$0$i$i | 0);
        L411 : do {
         if ($895) {
          $T$0$lcssa$i25$i = $891;
         } else {
          $896 = ($I7$0$i$i | 0) == 31;
          $897 = $I7$0$i$i >>> 1;
          $898 = 25 - $897 | 0;
          $899 = $896 ? 0 : $898;
          $900 = $qsize$0$i$i << $899;
          $K8$051$i$i = $900;
          $T$050$i$i = $891;
          while (1) {
           $907 = $K8$051$i$i >>> 31;
           $908 = ($T$050$i$i + 16 | 0) + ($907 << 2) | 0;
           $903 = HEAP32[$908 >> 2] | 0;
           $909 = ($903 | 0) == (0 | 0);
           if ($909) {
            $$lcssa = $908;
            $T$050$i$i$lcssa = $T$050$i$i;
            break;
           }
           $901 = $K8$051$i$i << 1;
           $902 = $903 + 4 | 0;
           $904 = HEAP32[$902 >> 2] | 0;
           $905 = $904 & -8;
           $906 = ($905 | 0) == ($qsize$0$i$i | 0);
           if ($906) {
            $T$0$lcssa$i25$i = $903;
            break L411;
           } else {
            $K8$051$i$i = $901;
            $T$050$i$i = $903;
           }
          }
          $910 = HEAP32[2480 >> 2] | 0;
          $911 = $$lcssa >>> 0 < $910 >>> 0;
          if ($911) {
           _abort();
          } else {
           HEAP32[$$lcssa >> 2] = $724;
           $$sum23$i$i = $$sum$i19$i + 24 | 0;
           $912 = $tbase$255$i + $$sum23$i$i | 0;
           HEAP32[$912 >> 2] = $T$050$i$i$lcssa;
           $$sum24$i$i = $$sum$i19$i + 12 | 0;
           $913 = $tbase$255$i + $$sum24$i$i | 0;
           HEAP32[$913 >> 2] = $724;
           $$sum25$i$i = $$sum$i19$i + 8 | 0;
           $914 = $tbase$255$i + $$sum25$i$i | 0;
           HEAP32[$914 >> 2] = $724;
           break L317;
          }
         }
        } while (0);
        $915 = $T$0$lcssa$i25$i + 8 | 0;
        $916 = HEAP32[$915 >> 2] | 0;
        $917 = HEAP32[2480 >> 2] | 0;
        $918 = $916 >>> 0 >= $917 >>> 0;
        $not$$i26$i = $T$0$lcssa$i25$i >>> 0 >= $917 >>> 0;
        $919 = $918 & $not$$i26$i;
        if ($919) {
         $920 = $916 + 12 | 0;
         HEAP32[$920 >> 2] = $724;
         HEAP32[$915 >> 2] = $724;
         $$sum20$i$i = $$sum$i19$i + 8 | 0;
         $921 = $tbase$255$i + $$sum20$i$i | 0;
         HEAP32[$921 >> 2] = $916;
         $$sum21$i$i = $$sum$i19$i + 12 | 0;
         $922 = $tbase$255$i + $$sum21$i$i | 0;
         HEAP32[$922 >> 2] = $T$0$lcssa$i25$i;
         $$sum22$i$i = $$sum$i19$i + 24 | 0;
         $923 = $tbase$255$i + $$sum22$i$i | 0;
         HEAP32[$923 >> 2] = 0;
         break;
        } else {
         _abort();
        }
       }
      } while (0);
      $$sum1819$i$i = $711 | 8;
      $924 = $tbase$255$i + $$sum1819$i$i | 0;
      $mem$0 = $924;
      return $mem$0 | 0;
     } else {
      $sp$0$i$i$i = 2912;
     }
    }
    while (1) {
     $925 = HEAP32[$sp$0$i$i$i >> 2] | 0;
     $926 = $925 >>> 0 > $635 >>> 0;
     if (!$926) {
      $927 = $sp$0$i$i$i + 4 | 0;
      $928 = HEAP32[$927 >> 2] | 0;
      $929 = $925 + $928 | 0;
      $930 = $929 >>> 0 > $635 >>> 0;
      if ($930) {
       $$lcssa215 = $925;
       $$lcssa216 = $928;
       $$lcssa217 = $929;
       break;
      }
     }
     $931 = $sp$0$i$i$i + 8 | 0;
     $932 = HEAP32[$931 >> 2] | 0;
     $sp$0$i$i$i = $932;
    }
    $$sum$i14$i = $$lcssa216 + -47 | 0;
    $$sum1$i15$i = $$lcssa216 + -39 | 0;
    $933 = $$lcssa215 + $$sum1$i15$i | 0;
    $934 = $933;
    $935 = $934 & 7;
    $936 = ($935 | 0) == 0;
    $937 = 0 - $934 | 0;
    $938 = $937 & 7;
    $939 = $936 ? 0 : $938;
    $$sum2$i16$i = $$sum$i14$i + $939 | 0;
    $940 = $$lcssa215 + $$sum2$i16$i | 0;
    $941 = $635 + 16 | 0;
    $942 = $940 >>> 0 < $941 >>> 0;
    $943 = $942 ? $635 : $940;
    $944 = $943 + 8 | 0;
    $945 = $tsize$254$i + -40 | 0;
    $946 = $tbase$255$i + 8 | 0;
    $947 = $946;
    $948 = $947 & 7;
    $949 = ($948 | 0) == 0;
    $950 = 0 - $947 | 0;
    $951 = $950 & 7;
    $952 = $949 ? 0 : $951;
    $953 = $tbase$255$i + $952 | 0;
    $954 = $945 - $952 | 0;
    HEAP32[2488 >> 2] = $953;
    HEAP32[2476 >> 2] = $954;
    $955 = $954 | 1;
    $$sum$i$i$i = $952 + 4 | 0;
    $956 = $tbase$255$i + $$sum$i$i$i | 0;
    HEAP32[$956 >> 2] = $955;
    $$sum2$i$i$i = $tsize$254$i + -36 | 0;
    $957 = $tbase$255$i + $$sum2$i$i$i | 0;
    HEAP32[$957 >> 2] = 40;
    $958 = HEAP32[2952 >> 2] | 0;
    HEAP32[2492 >> 2] = $958;
    $959 = $943 + 4 | 0;
    HEAP32[$959 >> 2] = 27;
    HEAP32[$944 >> 2] = HEAP32[2912 >> 2] | 0;
    HEAP32[$944 + 4 >> 2] = HEAP32[2912 + 4 >> 2] | 0;
    HEAP32[$944 + 8 >> 2] = HEAP32[2912 + 8 >> 2] | 0;
    HEAP32[$944 + 12 >> 2] = HEAP32[2912 + 12 >> 2] | 0;
    HEAP32[2912 >> 2] = $tbase$255$i;
    HEAP32[2916 >> 2] = $tsize$254$i;
    HEAP32[2924 >> 2] = 0;
    HEAP32[2920 >> 2] = $944;
    $960 = $943 + 28 | 0;
    HEAP32[$960 >> 2] = 7;
    $961 = $943 + 32 | 0;
    $962 = $961 >>> 0 < $$lcssa217 >>> 0;
    if ($962) {
     $964 = $960;
     while (1) {
      $963 = $964 + 4 | 0;
      HEAP32[$963 >> 2] = 7;
      $965 = $964 + 8 | 0;
      $966 = $965 >>> 0 < $$lcssa217 >>> 0;
      if ($966) {
       $964 = $963;
      } else {
       break;
      }
     }
    }
    $967 = ($943 | 0) == ($635 | 0);
    if (!$967) {
     $968 = $943;
     $969 = $635;
     $970 = $968 - $969 | 0;
     $971 = HEAP32[$959 >> 2] | 0;
     $972 = $971 & -2;
     HEAP32[$959 >> 2] = $972;
     $973 = $970 | 1;
     $974 = $635 + 4 | 0;
     HEAP32[$974 >> 2] = $973;
     HEAP32[$943 >> 2] = $970;
     $975 = $970 >>> 3;
     $976 = $970 >>> 0 < 256;
     if ($976) {
      $977 = $975 << 1;
      $978 = 2504 + ($977 << 2) | 0;
      $979 = HEAP32[2464 >> 2] | 0;
      $980 = 1 << $975;
      $981 = $979 & $980;
      $982 = ($981 | 0) == 0;
      if ($982) {
       $983 = $979 | $980;
       HEAP32[2464 >> 2] = $983;
       $$pre$i$i = $977 + 2 | 0;
       $$pre14$i$i = 2504 + ($$pre$i$i << 2) | 0;
       $$pre$phi$i$iZ2D = $$pre14$i$i;
       $F$0$i$i = $978;
      } else {
       $$sum4$i$i = $977 + 2 | 0;
       $984 = 2504 + ($$sum4$i$i << 2) | 0;
       $985 = HEAP32[$984 >> 2] | 0;
       $986 = HEAP32[2480 >> 2] | 0;
       $987 = $985 >>> 0 < $986 >>> 0;
       if ($987) {
        _abort();
       } else {
        $$pre$phi$i$iZ2D = $984;
        $F$0$i$i = $985;
       }
      }
      HEAP32[$$pre$phi$i$iZ2D >> 2] = $635;
      $988 = $F$0$i$i + 12 | 0;
      HEAP32[$988 >> 2] = $635;
      $989 = $635 + 8 | 0;
      HEAP32[$989 >> 2] = $F$0$i$i;
      $990 = $635 + 12 | 0;
      HEAP32[$990 >> 2] = $978;
      break;
     }
     $991 = $970 >>> 8;
     $992 = ($991 | 0) == 0;
     if ($992) {
      $I1$0$i$i = 0;
     } else {
      $993 = $970 >>> 0 > 16777215;
      if ($993) {
       $I1$0$i$i = 31;
      } else {
       $994 = $991 + 1048320 | 0;
       $995 = $994 >>> 16;
       $996 = $995 & 8;
       $997 = $991 << $996;
       $998 = $997 + 520192 | 0;
       $999 = $998 >>> 16;
       $1000 = $999 & 4;
       $1001 = $1000 | $996;
       $1002 = $997 << $1000;
       $1003 = $1002 + 245760 | 0;
       $1004 = $1003 >>> 16;
       $1005 = $1004 & 2;
       $1006 = $1001 | $1005;
       $1007 = 14 - $1006 | 0;
       $1008 = $1002 << $1005;
       $1009 = $1008 >>> 15;
       $1010 = $1007 + $1009 | 0;
       $1011 = $1010 << 1;
       $1012 = $1010 + 7 | 0;
       $1013 = $970 >>> $1012;
       $1014 = $1013 & 1;
       $1015 = $1014 | $1011;
       $I1$0$i$i = $1015;
      }
     }
     $1016 = 2768 + ($I1$0$i$i << 2) | 0;
     $1017 = $635 + 28 | 0;
     HEAP32[$1017 >> 2] = $I1$0$i$i;
     $1018 = $635 + 20 | 0;
     HEAP32[$1018 >> 2] = 0;
     HEAP32[$941 >> 2] = 0;
     $1019 = HEAP32[2468 >> 2] | 0;
     $1020 = 1 << $I1$0$i$i;
     $1021 = $1019 & $1020;
     $1022 = ($1021 | 0) == 0;
     if ($1022) {
      $1023 = $1019 | $1020;
      HEAP32[2468 >> 2] = $1023;
      HEAP32[$1016 >> 2] = $635;
      $1024 = $635 + 24 | 0;
      HEAP32[$1024 >> 2] = $1016;
      $1025 = $635 + 12 | 0;
      HEAP32[$1025 >> 2] = $635;
      $1026 = $635 + 8 | 0;
      HEAP32[$1026 >> 2] = $635;
      break;
     }
     $1027 = HEAP32[$1016 >> 2] | 0;
     $1028 = $1027 + 4 | 0;
     $1029 = HEAP32[$1028 >> 2] | 0;
     $1030 = $1029 & -8;
     $1031 = ($1030 | 0) == ($970 | 0);
     L452 : do {
      if ($1031) {
       $T$0$lcssa$i$i = $1027;
      } else {
       $1032 = ($I1$0$i$i | 0) == 31;
       $1033 = $I1$0$i$i >>> 1;
       $1034 = 25 - $1033 | 0;
       $1035 = $1032 ? 0 : $1034;
       $1036 = $970 << $1035;
       $K2$07$i$i = $1036;
       $T$06$i$i = $1027;
       while (1) {
        $1043 = $K2$07$i$i >>> 31;
        $1044 = ($T$06$i$i + 16 | 0) + ($1043 << 2) | 0;
        $1039 = HEAP32[$1044 >> 2] | 0;
        $1045 = ($1039 | 0) == (0 | 0);
        if ($1045) {
         $$lcssa211 = $1044;
         $T$06$i$i$lcssa = $T$06$i$i;
         break;
        }
        $1037 = $K2$07$i$i << 1;
        $1038 = $1039 + 4 | 0;
        $1040 = HEAP32[$1038 >> 2] | 0;
        $1041 = $1040 & -8;
        $1042 = ($1041 | 0) == ($970 | 0);
        if ($1042) {
         $T$0$lcssa$i$i = $1039;
         break L452;
        } else {
         $K2$07$i$i = $1037;
         $T$06$i$i = $1039;
        }
       }
       $1046 = HEAP32[2480 >> 2] | 0;
       $1047 = $$lcssa211 >>> 0 < $1046 >>> 0;
       if ($1047) {
        _abort();
       } else {
        HEAP32[$$lcssa211 >> 2] = $635;
        $1048 = $635 + 24 | 0;
        HEAP32[$1048 >> 2] = $T$06$i$i$lcssa;
        $1049 = $635 + 12 | 0;
        HEAP32[$1049 >> 2] = $635;
        $1050 = $635 + 8 | 0;
        HEAP32[$1050 >> 2] = $635;
        break L299;
       }
      }
     } while (0);
     $1051 = $T$0$lcssa$i$i + 8 | 0;
     $1052 = HEAP32[$1051 >> 2] | 0;
     $1053 = HEAP32[2480 >> 2] | 0;
     $1054 = $1052 >>> 0 >= $1053 >>> 0;
     $not$$i$i = $T$0$lcssa$i$i >>> 0 >= $1053 >>> 0;
     $1055 = $1054 & $not$$i$i;
     if ($1055) {
      $1056 = $1052 + 12 | 0;
      HEAP32[$1056 >> 2] = $635;
      HEAP32[$1051 >> 2] = $635;
      $1057 = $635 + 8 | 0;
      HEAP32[$1057 >> 2] = $1052;
      $1058 = $635 + 12 | 0;
      HEAP32[$1058 >> 2] = $T$0$lcssa$i$i;
      $1059 = $635 + 24 | 0;
      HEAP32[$1059 >> 2] = 0;
      break;
     } else {
      _abort();
     }
    }
   }
  } while (0);
  $1060 = HEAP32[2476 >> 2] | 0;
  $1061 = $1060 >>> 0 > $nb$0 >>> 0;
  if ($1061) {
   $1062 = $1060 - $nb$0 | 0;
   HEAP32[2476 >> 2] = $1062;
   $1063 = HEAP32[2488 >> 2] | 0;
   $1064 = $1063 + $nb$0 | 0;
   HEAP32[2488 >> 2] = $1064;
   $1065 = $1062 | 1;
   $$sum$i32 = $nb$0 + 4 | 0;
   $1066 = $1063 + $$sum$i32 | 0;
   HEAP32[$1066 >> 2] = $1065;
   $1067 = $nb$0 | 3;
   $1068 = $1063 + 4 | 0;
   HEAP32[$1068 >> 2] = $1067;
   $1069 = $1063 + 8 | 0;
   $mem$0 = $1069;
   return $mem$0 | 0;
  }
 }
 $1070 = ___errno_location() | 0;
 HEAP32[$1070 >> 2] = 12;
 $mem$0 = 0;
 return $mem$0 | 0;
}
function emterpret(pc) {
 pc = pc | 0;
 var sp = 0, inst = 0, lx = 0, ly = 0, lz = 0;
 var ld = 0.0;
 HEAP32[EMTSTACKTOP >> 2] = pc;
 sp = EMTSTACKTOP + 8 | 0;
 lx = HEAPU16[pc + 2 >> 1] | 0;
 EMTSTACKTOP = EMTSTACKTOP + (lx + 1 << 3) | 0;
 if ((asyncState | 0) != 2) {} else {
  pc = (HEAP32[sp - 4 >> 2] | 0) - 8 | 0;
 }
 pc = pc + 4 | 0;
 while (1) {
  pc = pc + 4 | 0;
  inst = HEAP32[pc >> 2] | 0;
  lx = inst >> 8 & 255;
  ly = inst >> 16 & 255;
  lz = inst >>> 24;
  switch (inst & 255) {
  case 0:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] | 0;
   break;
  case 1:
   HEAP32[sp + (lx << 3) >> 2] = inst >> 16;
   break;
  case 2:
   pc = pc + 4 | 0;
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[pc >> 2] | 0;
   break;
  case 3:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) + (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 4:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) - (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 5:
   HEAP32[sp + (lx << 3) >> 2] = Math_imul(HEAP32[sp + (ly << 3) >> 2] | 0, HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 6:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) / (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 7:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] >>> 0) / (HEAP32[sp + (lz << 3) >> 2] >>> 0) >>> 0;
   break;
  case 9:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] >>> 0) % (HEAP32[sp + (lz << 3) >> 2] >>> 0) >>> 0;
   break;
  case 12:
   HEAP32[sp + (lx << 3) >> 2] = !(HEAP32[sp + (ly << 3) >> 2] | 0);
   break;
  case 13:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) == (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 14:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) != (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 15:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) < (HEAP32[sp + (lz << 3) >> 2] | 0) | 0;
   break;
  case 16:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] >>> 0 < HEAP32[sp + (lz << 3) >> 2] >>> 0 | 0;
   break;
  case 19:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) & (HEAP32[sp + (lz << 3) >> 2] | 0);
   break;
  case 20:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] | 0 | (HEAP32[sp + (lz << 3) >> 2] | 0);
   break;
  case 21:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) ^ (HEAP32[sp + (lz << 3) >> 2] | 0);
   break;
  case 22:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) << (HEAP32[sp + (lz << 3) >> 2] | 0);
   break;
  case 24:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) >>> (HEAP32[sp + (lz << 3) >> 2] | 0);
   break;
  case 25:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) + (inst >> 24) | 0;
   break;
  case 26:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) - (inst >> 24) | 0;
   break;
  case 27:
   HEAP32[sp + (lx << 3) >> 2] = Math_imul(HEAP32[sp + (ly << 3) >> 2] | 0, inst >> 24) | 0;
   break;
  case 28:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) / (inst >> 24) | 0;
   break;
  case 29:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] >>> 0) / (lz >>> 0) >>> 0;
   break;
  case 30:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) % (inst >> 24) | 0;
   break;
  case 31:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] >>> 0) % (lz >>> 0) >>> 0;
   break;
  case 32:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) == inst >> 24 | 0;
   break;
  case 33:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) != inst >> 24 | 0;
   break;
  case 34:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) < inst >> 24 | 0;
   break;
  case 35:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] >>> 0 < lz >>> 0 | 0;
   break;
  case 37:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] >>> 0 <= lz >>> 0 | 0;
   break;
  case 38:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) & inst >> 24;
   break;
  case 39:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] | 0 | inst >> 24;
   break;
  case 40:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) ^ inst >> 24;
   break;
  case 41:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) << lz;
   break;
  case 42:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) >> lz;
   break;
  case 43:
   HEAP32[sp + (lx << 3) >> 2] = (HEAP32[sp + (ly << 3) >> 2] | 0) >>> lz;
   break;
  case 45:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) == (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = pc + 4 | 0;
   } else {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 46:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) != (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = pc + 4 | 0;
   } else {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 47:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) < (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = pc + 4 | 0;
   } else {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 48:
   if (HEAP32[sp + (ly << 3) >> 2] >>> 0 < HEAP32[sp + (lz << 3) >> 2] >>> 0) {
    pc = pc + 4 | 0;
   } else {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 52:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) == (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   } else {
    pc = pc + 4 | 0;
   }
   break;
  case 53:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) != (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   } else {
    pc = pc + 4 | 0;
   }
   break;
  case 54:
   if ((HEAP32[sp + (ly << 3) >> 2] | 0) < (HEAP32[sp + (lz << 3) >> 2] | 0)) {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   } else {
    pc = pc + 4 | 0;
   }
   break;
  case 55:
   if (HEAP32[sp + (ly << 3) >> 2] >>> 0 < HEAP32[sp + (lz << 3) >> 2] >>> 0) {
    pc = HEAP32[pc + 4 >> 2] | 0;
    pc = pc - 4 | 0;
    continue;
   } else {
    pc = pc + 4 | 0;
   }
   break;
  case 58:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (ly << 3) >> 3];
   break;
  case 59:
   HEAPF64[sp + (lx << 3) >> 3] = +(inst >> 16);
   break;
  case 60:
   pc = pc + 4 | 0;
   HEAPF64[sp + (lx << 3) >> 3] = +(HEAP32[pc >> 2] | 0);
   break;
  case 61:
   pc = pc + 4 | 0;
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF32[pc >> 2];
   break;
  case 62:
   HEAP32[tempDoublePtr >> 2] = HEAP32[pc + 4 >> 2];
   HEAP32[tempDoublePtr + 4 >> 2] = HEAP32[pc + 8 >> 2];
   pc = pc + 8 | 0;
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[tempDoublePtr >> 3];
   break;
  case 63:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (ly << 3) >> 3] + +HEAPF64[sp + (lz << 3) >> 3];
   break;
  case 64:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (ly << 3) >> 3] - +HEAPF64[sp + (lz << 3) >> 3];
   break;
  case 65:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (ly << 3) >> 3] * +HEAPF64[sp + (lz << 3) >> 3];
   break;
  case 66:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (ly << 3) >> 3] / +HEAPF64[sp + (lz << 3) >> 3];
   break;
  case 68:
   HEAPF64[sp + (lx << 3) >> 3] = -+HEAPF64[sp + (ly << 3) >> 3];
   break;
  case 69:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] == +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 70:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] != +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 71:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] < +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 72:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] <= +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 73:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] > +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 74:
   HEAP32[sp + (lx << 3) >> 2] = +HEAPF64[sp + (ly << 3) >> 3] >= +HEAPF64[sp + (lz << 3) >> 3] | 0;
   break;
  case 75:
   HEAP32[sp + (lx << 3) >> 2] = ~~+HEAPF64[sp + (ly << 3) >> 3];
   break;
  case 76:
   HEAPF64[sp + (lx << 3) >> 3] = +(HEAP32[sp + (ly << 3) >> 2] | 0);
   break;
  case 77:
   HEAPF64[sp + (lx << 3) >> 3] = +(HEAP32[sp + (ly << 3) >> 2] >>> 0);
   break;
  case 78:
   HEAP32[sp + (lx << 3) >> 2] = HEAP8[HEAP32[sp + (ly << 3) >> 2] >> 0];
   break;
  case 82:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[HEAP32[sp + (ly << 3) >> 2] >> 2];
   break;
  case 83:
   HEAP8[HEAP32[sp + (lx << 3) >> 2] >> 0] = HEAP32[sp + (ly << 3) >> 2] | 0;
   break;
  case 84:
   HEAP16[HEAP32[sp + (lx << 3) >> 2] >> 1] = HEAP32[sp + (ly << 3) >> 2] | 0;
   break;
  case 85:
   HEAP32[HEAP32[sp + (lx << 3) >> 2] >> 2] = HEAP32[sp + (ly << 3) >> 2] | 0;
   break;
  case 86:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[HEAP32[sp + (ly << 3) >> 2] >> 3];
   break;
  case 87:
   HEAPF64[HEAP32[sp + (lx << 3) >> 2] >> 3] = +HEAPF64[sp + (ly << 3) >> 3];
   break;
  case 88:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF32[HEAP32[sp + (ly << 3) >> 2] >> 2];
   break;
  case 89:
   HEAPF32[HEAP32[sp + (lx << 3) >> 2] >> 2] = +HEAPF64[sp + (ly << 3) >> 3];
   break;
  case 90:
   HEAP32[sp + (lx << 3) >> 2] = HEAP8[(HEAP32[sp + (ly << 3) >> 2] | 0) + (HEAP32[sp + (lz << 3) >> 2] | 0) >> 0];
   break;
  case 94:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[(HEAP32[sp + (ly << 3) >> 2] | 0) + (HEAP32[sp + (lz << 3) >> 2] | 0) >> 2];
   break;
  case 95:
   HEAP8[(HEAP32[sp + (lx << 3) >> 2] | 0) + (HEAP32[sp + (ly << 3) >> 2] | 0) >> 0] = HEAP32[sp + (lz << 3) >> 2] | 0;
   break;
  case 97:
   HEAP32[(HEAP32[sp + (lx << 3) >> 2] | 0) + (HEAP32[sp + (ly << 3) >> 2] | 0) >> 2] = HEAP32[sp + (lz << 3) >> 2] | 0;
   break;
  case 102:
   HEAP32[sp + (lx << 3) >> 2] = HEAP8[(HEAP32[sp + (ly << 3) >> 2] | 0) + (inst >> 24) >> 0];
   break;
  case 106:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[(HEAP32[sp + (ly << 3) >> 2] | 0) + (inst >> 24) >> 2];
   break;
  case 107:
   HEAP8[(HEAP32[sp + (lx << 3) >> 2] | 0) + (ly << 24 >> 24) >> 0] = HEAP32[sp + (lz << 3) >> 2] | 0;
   break;
  case 109:
   HEAP32[(HEAP32[sp + (lx << 3) >> 2] | 0) + (ly << 24 >> 24) >> 2] = HEAP32[sp + (lz << 3) >> 2] | 0;
   break;
  case 110:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[(HEAP32[sp + (ly << 3) >> 2] | 0) + (inst >> 24) >> 3];
   break;
  case 111:
   HEAPF64[(HEAP32[sp + (lx << 3) >> 2] | 0) + (ly << 24 >> 24) >> 3] = +HEAPF64[sp + (lz << 3) >> 3];
   break;
  case 119:
   pc = pc + (inst >> 16 << 2) | 0;
   pc = pc - 4 | 0;
   continue;
   break;
  case 120:
   if (HEAP32[sp + (lx << 3) >> 2] | 0) {
    pc = pc + (inst >> 16 << 2) | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 121:
   if (!(HEAP32[sp + (lx << 3) >> 2] | 0)) {
    pc = pc + (inst >> 16 << 2) | 0;
    pc = pc - 4 | 0;
    continue;
   }
   break;
  case 125:
   pc = pc + 4 | 0;
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (ly << 3) >> 2] | 0 ? HEAP32[sp + (lz << 3) >> 2] | 0 : HEAP32[sp + ((HEAPU8[pc >> 0] | 0) << 3) >> 2] | 0;
   break;
  case 126:
   pc = pc + 4 | 0;
   HEAPF64[sp + (lx << 3) >> 3] = HEAP32[sp + (ly << 3) >> 2] | 0 ? +HEAPF64[sp + (lz << 3) >> 3] : +HEAPF64[sp + ((HEAPU8[pc >> 0] | 0) << 3) >> 3];
   break;
  case 127:
   HEAP32[sp + (lx << 3) >> 2] = tempDoublePtr;
   break;
  case 128:
   HEAP32[sp + (lx << 3) >> 2] = tempRet0;
   break;
  case 129:
   tempRet0 = HEAP32[sp + (lx << 3) >> 2] | 0;
   break;
  case 130:
   switch (ly | 0) {
   case 0:
    {
     HEAP32[sp + (lx << 3) >> 2] = cttz_i8;
     continue;
    }
   case 1:
    {
     HEAP32[sp + (lx << 3) >> 2] = _stderr;
     continue;
    }
   case 2:
    {
     HEAP32[sp + (lx << 3) >> 2] = STACK_MAX;
     continue;
    }
   default:
   }
   break;
  case 132:
   switch (inst >> 8 & 255) {
   case 0:
    {
     cttz_i8 = HEAP32[sp + (lz << 3) >> 2] | 0;
     continue;
    }
   case 1:
    {
     _stderr = HEAP32[sp + (lz << 3) >> 2] | 0;
     continue;
    }
   case 2:
    {
     STACK_MAX = HEAP32[sp + (lz << 3) >> 2] | 0;
     continue;
    }
   default:
   }
   break;
  case 134:
   lz = HEAPU8[(HEAP32[pc + 4 >> 2] | 0) + 1 | 0] | 0;
   ly = 0;
   if ((asyncState | 0) != 2) {
    while ((ly | 0) < (lz | 0)) {
     HEAP32[EMTSTACKTOP + (ly << 3) + 8 >> 2] = HEAP32[sp + (HEAPU8[pc + 8 + ly >> 0] << 3) >> 2] | 0;
     HEAP32[EMTSTACKTOP + (ly << 3) + 12 >> 2] = HEAP32[sp + (HEAPU8[pc + 8 + ly >> 0] << 3) + 4 >> 2] | 0;
     ly = ly + 1 | 0;
    }
   }
   HEAP32[sp - 4 >> 2] = pc;
   emterpret(HEAP32[pc + 4 >> 2] | 0);
   if ((asyncState | 0) == 1) {
    EMTSTACKTOP = sp - 8 | 0;
    return;
   }
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[EMTSTACKTOP >> 2] | 0;
   HEAP32[sp + (lx << 3) + 4 >> 2] = HEAP32[EMTSTACKTOP + 4 >> 2] | 0;
   pc = pc + (4 + lz + 3 >> 2 << 2) | 0;
   break;
  case 135:
   switch (inst >>> 16 | 0) {
   case 0:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = ___errno_location() | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     continue;
    }
   case 1:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _memset(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 2:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _bitshift64Shl(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 3:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _strerror(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 4:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _bitshift64Lshr(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 5:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +Math_pow(+HEAPF64[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 3], +HEAPF64[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 3]);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 6:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _strcpy(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 7:
    {
     HEAP32[sp - 4 >> 2] = pc;
     FUNCTION_TABLE_vii[HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] & 1](HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   case 8:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = FUNCTION_TABLE_iii[HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] & 3](HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 9:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _memcpy(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 10:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = Math_clz32(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 11:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _malloc(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 12:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +FUNCTION_TABLE_ddi[HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] & 1](+HEAPF64[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 3], HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 13:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +Math_abs(+HEAPF64[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 3]);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 14:
    {
     HEAP32[sp - 4 >> 2] = pc;
     FUNCTION_TABLE_vi[HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] & 3](HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   case 15:
    {
     HEAP32[sp - 4 >> 2] = pc;
     _free(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   case 16:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +Math_sqrt(+HEAPF64[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 3]);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 17:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = FUNCTION_TABLE_iiii[HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] & 3](HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 7 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 18:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _stat(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 19:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _strcat(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 20:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _fopen(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 21:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _fclose(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 22:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _fread(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 7 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 23:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +Math_acos(+HEAPF64[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 3]);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 24:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _puts(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 25:
    {
     HEAP32[sp - 4 >> 2] = pc;
     ld = +Math_log(+HEAPF64[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 3]);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAPF64[sp + (lx << 3) >> 3] = ld;
     pc = pc + 4 | 0;
     continue;
    }
   case 26:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _emscripten_asm_const_6(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 7 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 8 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 9 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 10 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 8 | 0;
     continue;
    }
   case 27:
    {
     HEAP32[sp - 4 >> 2] = pc;
     _emscripten_sleep(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   case 28:
    {
     HEAP32[sp - 4 >> 2] = pc;
     lz = _fprintf(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 5 >> 0] << 3) >> 2] | 0, HEAP32[sp + (HEAPU8[pc + 6 >> 0] << 3) >> 2] | 0) | 0;
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     } else HEAP32[sp + (lx << 3) >> 2] = lz;
     pc = pc + 4 | 0;
     continue;
    }
   case 29:
    {
     HEAP32[sp - 4 >> 2] = pc;
     _exit(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   case 30:
    {
     HEAP32[sp - 4 >> 2] = pc;
     abort(HEAP32[sp + (HEAPU8[pc + 4 >> 0] << 3) >> 2] | 0);
     if ((asyncState | 0) == 1) {
      EMTSTACKTOP = sp - 8 | 0;
      return;
     };
     pc = pc + 4 | 0;
     continue;
    }
   default:
   }
   break;
  case 136:
   HEAP32[sp + (lx << 3) >> 2] = STACKTOP;
   break;
  case 137:
   STACKTOP = HEAP32[sp + (lx << 3) >> 2] | 0;
   break;
  case 138:
   lz = HEAP32[sp + (lz << 3) >> 2] | 0;
   lx = (HEAP32[sp + (lx << 3) >> 2] | 0) - (HEAP32[sp + (ly << 3) >> 2] | 0) >>> 0;
   if (lx >>> 0 >= lz >>> 0) {
    pc = pc + (lz << 2) | 0;
    continue;
   }
   pc = HEAP32[pc + 4 + (lx << 2) >> 2] | 0;
   pc = pc - 4 | 0;
   continue;
   break;
  case 139:
   EMTSTACKTOP = sp - 8 | 0;
   HEAP32[EMTSTACKTOP >> 2] = HEAP32[sp + (lx << 3) >> 2] | 0;
   HEAP32[EMTSTACKTOP + 4 >> 2] = HEAP32[sp + (lx << 3) + 4 >> 2] | 0;
   return;
   break;
  case 141:
   HEAP32[sp + (lx << 3) >> 2] = HEAP32[sp + (inst >>> 16 << 3) >> 2] | 0;
   break;
  case 142:
   HEAPF64[sp + (lx << 3) >> 3] = +HEAPF64[sp + (inst >>> 16 << 3) >> 3];
   break;
  case 143:
   HEAP32[sp + (inst >>> 16 << 3) >> 2] = HEAP32[sp + (lx << 3) >> 2] | 0;
   break;
  case 144:
   HEAPF64[sp + (inst >>> 16 << 3) >> 3] = +HEAPF64[sp + (lx << 3) >> 3];
   break;
  default:
  }
 }
}

function _free($mem) {
 $mem = $mem | 0;
 var $$lcssa = 0, $$pre = 0, $$pre$phi59Z2D = 0, $$pre$phi61Z2D = 0, $$pre$phiZ2D = 0, $$pre57 = 0, $$pre58 = 0, $$pre60 = 0, $$sum = 0, $$sum11 = 0, $$sum12 = 0, $$sum13 = 0, $$sum14 = 0, $$sum1718 = 0, $$sum19 = 0, $$sum2 = 0, $$sum20 = 0, $$sum22 = 0, $$sum23 = 0, $$sum24 = 0, $$sum25 = 0, $$sum26 = 0, $$sum27 = 0, $$sum28 = 0, $$sum29 = 0, $$sum3 = 0, $$sum30 = 0, $$sum31 = 0, $$sum5 = 0, $$sum67 = 0, $$sum8 = 0, $$sum9 = 0, $0 = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0, $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $F16$0 = 0, $I18$0 = 0, $K19$052 = 0, $R$0 = 0, $R$0$lcssa = 0, $R$1 = 0, $R7$0 = 0, $R7$0$lcssa = 0, $R7$1 = 0, $RP$0 = 0, $RP$0$lcssa = 0, $RP9$0 = 0, $RP9$0$lcssa = 0, $T$0$lcssa = 0, $T$051 = 0, $T$051$lcssa = 0, $cond = 0, $cond47 = 0, $not$ = 0, $p$0 = 0, $psize$0 = 0, $psize$1 = 0, $sp$0$i = 0, $sp$0$in$i = 0, label = 0, sp = 0;
 label = 0;
 sp = STACKTOP;
 $0 = ($mem | 0) == (0 | 0);
 if ($0) {
  return;
 }
 $1 = $mem + -8 | 0;
 $2 = HEAP32[2480 >> 2] | 0;
 $3 = $1 >>> 0 < $2 >>> 0;
 if ($3) {
  _abort();
 }
 $4 = $mem + -4 | 0;
 $5 = HEAP32[$4 >> 2] | 0;
 $6 = $5 & 3;
 $7 = ($6 | 0) == 1;
 if ($7) {
  _abort();
 }
 $8 = $5 & -8;
 $$sum = $8 + -8 | 0;
 $9 = $mem + $$sum | 0;
 $10 = $5 & 1;
 $11 = ($10 | 0) == 0;
 do {
  if ($11) {
   $12 = HEAP32[$1 >> 2] | 0;
   $13 = ($6 | 0) == 0;
   if ($13) {
    return;
   }
   $$sum2 = -8 - $12 | 0;
   $14 = $mem + $$sum2 | 0;
   $15 = $12 + $8 | 0;
   $16 = $14 >>> 0 < $2 >>> 0;
   if ($16) {
    _abort();
   }
   $17 = HEAP32[2484 >> 2] | 0;
   $18 = ($14 | 0) == ($17 | 0);
   if ($18) {
    $$sum3 = $8 + -4 | 0;
    $103 = $mem + $$sum3 | 0;
    $104 = HEAP32[$103 >> 2] | 0;
    $105 = $104 & 3;
    $106 = ($105 | 0) == 3;
    if (!$106) {
     $p$0 = $14;
     $psize$0 = $15;
     break;
    }
    HEAP32[2472 >> 2] = $15;
    $107 = $104 & -2;
    HEAP32[$103 >> 2] = $107;
    $108 = $15 | 1;
    $$sum20 = $$sum2 + 4 | 0;
    $109 = $mem + $$sum20 | 0;
    HEAP32[$109 >> 2] = $108;
    HEAP32[$9 >> 2] = $15;
    return;
   }
   $19 = $12 >>> 3;
   $20 = $12 >>> 0 < 256;
   if ($20) {
    $$sum30 = $$sum2 + 8 | 0;
    $21 = $mem + $$sum30 | 0;
    $22 = HEAP32[$21 >> 2] | 0;
    $$sum31 = $$sum2 + 12 | 0;
    $23 = $mem + $$sum31 | 0;
    $24 = HEAP32[$23 >> 2] | 0;
    $25 = $19 << 1;
    $26 = 2504 + ($25 << 2) | 0;
    $27 = ($22 | 0) == ($26 | 0);
    if (!$27) {
     $28 = $22 >>> 0 < $2 >>> 0;
     if ($28) {
      _abort();
     }
     $29 = $22 + 12 | 0;
     $30 = HEAP32[$29 >> 2] | 0;
     $31 = ($30 | 0) == ($14 | 0);
     if (!$31) {
      _abort();
     }
    }
    $32 = ($24 | 0) == ($22 | 0);
    if ($32) {
     $33 = 1 << $19;
     $34 = $33 ^ -1;
     $35 = HEAP32[2464 >> 2] | 0;
     $36 = $35 & $34;
     HEAP32[2464 >> 2] = $36;
     $p$0 = $14;
     $psize$0 = $15;
     break;
    }
    $37 = ($24 | 0) == ($26 | 0);
    if ($37) {
     $$pre60 = $24 + 8 | 0;
     $$pre$phi61Z2D = $$pre60;
    } else {
     $38 = $24 >>> 0 < $2 >>> 0;
     if ($38) {
      _abort();
     }
     $39 = $24 + 8 | 0;
     $40 = HEAP32[$39 >> 2] | 0;
     $41 = ($40 | 0) == ($14 | 0);
     if ($41) {
      $$pre$phi61Z2D = $39;
     } else {
      _abort();
     }
    }
    $42 = $22 + 12 | 0;
    HEAP32[$42 >> 2] = $24;
    HEAP32[$$pre$phi61Z2D >> 2] = $22;
    $p$0 = $14;
    $psize$0 = $15;
    break;
   }
   $$sum22 = $$sum2 + 24 | 0;
   $43 = $mem + $$sum22 | 0;
   $44 = HEAP32[$43 >> 2] | 0;
   $$sum23 = $$sum2 + 12 | 0;
   $45 = $mem + $$sum23 | 0;
   $46 = HEAP32[$45 >> 2] | 0;
   $47 = ($46 | 0) == ($14 | 0);
   do {
    if ($47) {
     $$sum25 = $$sum2 + 20 | 0;
     $57 = $mem + $$sum25 | 0;
     $58 = HEAP32[$57 >> 2] | 0;
     $59 = ($58 | 0) == (0 | 0);
     if ($59) {
      $$sum24 = $$sum2 + 16 | 0;
      $60 = $mem + $$sum24 | 0;
      $61 = HEAP32[$60 >> 2] | 0;
      $62 = ($61 | 0) == (0 | 0);
      if ($62) {
       $R$1 = 0;
       break;
      } else {
       $R$0 = $61;
       $RP$0 = $60;
      }
     } else {
      $R$0 = $58;
      $RP$0 = $57;
     }
     while (1) {
      $63 = $R$0 + 20 | 0;
      $64 = HEAP32[$63 >> 2] | 0;
      $65 = ($64 | 0) == (0 | 0);
      if (!$65) {
       $R$0 = $64;
       $RP$0 = $63;
       continue;
      }
      $66 = $R$0 + 16 | 0;
      $67 = HEAP32[$66 >> 2] | 0;
      $68 = ($67 | 0) == (0 | 0);
      if ($68) {
       $R$0$lcssa = $R$0;
       $RP$0$lcssa = $RP$0;
       break;
      } else {
       $R$0 = $67;
       $RP$0 = $66;
      }
     }
     $69 = $RP$0$lcssa >>> 0 < $2 >>> 0;
     if ($69) {
      _abort();
     } else {
      HEAP32[$RP$0$lcssa >> 2] = 0;
      $R$1 = $R$0$lcssa;
      break;
     }
    } else {
     $$sum29 = $$sum2 + 8 | 0;
     $48 = $mem + $$sum29 | 0;
     $49 = HEAP32[$48 >> 2] | 0;
     $50 = $49 >>> 0 < $2 >>> 0;
     if ($50) {
      _abort();
     }
     $51 = $49 + 12 | 0;
     $52 = HEAP32[$51 >> 2] | 0;
     $53 = ($52 | 0) == ($14 | 0);
     if (!$53) {
      _abort();
     }
     $54 = $46 + 8 | 0;
     $55 = HEAP32[$54 >> 2] | 0;
     $56 = ($55 | 0) == ($14 | 0);
     if ($56) {
      HEAP32[$51 >> 2] = $46;
      HEAP32[$54 >> 2] = $49;
      $R$1 = $46;
      break;
     } else {
      _abort();
     }
    }
   } while (0);
   $70 = ($44 | 0) == (0 | 0);
   if ($70) {
    $p$0 = $14;
    $psize$0 = $15;
   } else {
    $$sum26 = $$sum2 + 28 | 0;
    $71 = $mem + $$sum26 | 0;
    $72 = HEAP32[$71 >> 2] | 0;
    $73 = 2768 + ($72 << 2) | 0;
    $74 = HEAP32[$73 >> 2] | 0;
    $75 = ($14 | 0) == ($74 | 0);
    if ($75) {
     HEAP32[$73 >> 2] = $R$1;
     $cond = ($R$1 | 0) == (0 | 0);
     if ($cond) {
      $76 = 1 << $72;
      $77 = $76 ^ -1;
      $78 = HEAP32[2468 >> 2] | 0;
      $79 = $78 & $77;
      HEAP32[2468 >> 2] = $79;
      $p$0 = $14;
      $psize$0 = $15;
      break;
     }
    } else {
     $80 = HEAP32[2480 >> 2] | 0;
     $81 = $44 >>> 0 < $80 >>> 0;
     if ($81) {
      _abort();
     }
     $82 = $44 + 16 | 0;
     $83 = HEAP32[$82 >> 2] | 0;
     $84 = ($83 | 0) == ($14 | 0);
     if ($84) {
      HEAP32[$82 >> 2] = $R$1;
     } else {
      $85 = $44 + 20 | 0;
      HEAP32[$85 >> 2] = $R$1;
     }
     $86 = ($R$1 | 0) == (0 | 0);
     if ($86) {
      $p$0 = $14;
      $psize$0 = $15;
      break;
     }
    }
    $87 = HEAP32[2480 >> 2] | 0;
    $88 = $R$1 >>> 0 < $87 >>> 0;
    if ($88) {
     _abort();
    }
    $89 = $R$1 + 24 | 0;
    HEAP32[$89 >> 2] = $44;
    $$sum27 = $$sum2 + 16 | 0;
    $90 = $mem + $$sum27 | 0;
    $91 = HEAP32[$90 >> 2] | 0;
    $92 = ($91 | 0) == (0 | 0);
    do {
     if (!$92) {
      $93 = $91 >>> 0 < $87 >>> 0;
      if ($93) {
       _abort();
      } else {
       $94 = $R$1 + 16 | 0;
       HEAP32[$94 >> 2] = $91;
       $95 = $91 + 24 | 0;
       HEAP32[$95 >> 2] = $R$1;
       break;
      }
     }
    } while (0);
    $$sum28 = $$sum2 + 20 | 0;
    $96 = $mem + $$sum28 | 0;
    $97 = HEAP32[$96 >> 2] | 0;
    $98 = ($97 | 0) == (0 | 0);
    if ($98) {
     $p$0 = $14;
     $psize$0 = $15;
    } else {
     $99 = HEAP32[2480 >> 2] | 0;
     $100 = $97 >>> 0 < $99 >>> 0;
     if ($100) {
      _abort();
     } else {
      $101 = $R$1 + 20 | 0;
      HEAP32[$101 >> 2] = $97;
      $102 = $97 + 24 | 0;
      HEAP32[$102 >> 2] = $R$1;
      $p$0 = $14;
      $psize$0 = $15;
      break;
     }
    }
   }
  } else {
   $p$0 = $1;
   $psize$0 = $8;
  }
 } while (0);
 $110 = $p$0 >>> 0 < $9 >>> 0;
 if (!$110) {
  _abort();
 }
 $$sum19 = $8 + -4 | 0;
 $111 = $mem + $$sum19 | 0;
 $112 = HEAP32[$111 >> 2] | 0;
 $113 = $112 & 1;
 $114 = ($113 | 0) == 0;
 if ($114) {
  _abort();
 }
 $115 = $112 & 2;
 $116 = ($115 | 0) == 0;
 if ($116) {
  $117 = HEAP32[2488 >> 2] | 0;
  $118 = ($9 | 0) == ($117 | 0);
  if ($118) {
   $119 = HEAP32[2476 >> 2] | 0;
   $120 = $119 + $psize$0 | 0;
   HEAP32[2476 >> 2] = $120;
   HEAP32[2488 >> 2] = $p$0;
   $121 = $120 | 1;
   $122 = $p$0 + 4 | 0;
   HEAP32[$122 >> 2] = $121;
   $123 = HEAP32[2484 >> 2] | 0;
   $124 = ($p$0 | 0) == ($123 | 0);
   if (!$124) {
    return;
   }
   HEAP32[2484 >> 2] = 0;
   HEAP32[2472 >> 2] = 0;
   return;
  }
  $125 = HEAP32[2484 >> 2] | 0;
  $126 = ($9 | 0) == ($125 | 0);
  if ($126) {
   $127 = HEAP32[2472 >> 2] | 0;
   $128 = $127 + $psize$0 | 0;
   HEAP32[2472 >> 2] = $128;
   HEAP32[2484 >> 2] = $p$0;
   $129 = $128 | 1;
   $130 = $p$0 + 4 | 0;
   HEAP32[$130 >> 2] = $129;
   $131 = $p$0 + $128 | 0;
   HEAP32[$131 >> 2] = $128;
   return;
  }
  $132 = $112 & -8;
  $133 = $132 + $psize$0 | 0;
  $134 = $112 >>> 3;
  $135 = $112 >>> 0 < 256;
  do {
   if ($135) {
    $136 = $mem + $8 | 0;
    $137 = HEAP32[$136 >> 2] | 0;
    $$sum1718 = $8 | 4;
    $138 = $mem + $$sum1718 | 0;
    $139 = HEAP32[$138 >> 2] | 0;
    $140 = $134 << 1;
    $141 = 2504 + ($140 << 2) | 0;
    $142 = ($137 | 0) == ($141 | 0);
    if (!$142) {
     $143 = HEAP32[2480 >> 2] | 0;
     $144 = $137 >>> 0 < $143 >>> 0;
     if ($144) {
      _abort();
     }
     $145 = $137 + 12 | 0;
     $146 = HEAP32[$145 >> 2] | 0;
     $147 = ($146 | 0) == ($9 | 0);
     if (!$147) {
      _abort();
     }
    }
    $148 = ($139 | 0) == ($137 | 0);
    if ($148) {
     $149 = 1 << $134;
     $150 = $149 ^ -1;
     $151 = HEAP32[2464 >> 2] | 0;
     $152 = $151 & $150;
     HEAP32[2464 >> 2] = $152;
     break;
    }
    $153 = ($139 | 0) == ($141 | 0);
    if ($153) {
     $$pre58 = $139 + 8 | 0;
     $$pre$phi59Z2D = $$pre58;
    } else {
     $154 = HEAP32[2480 >> 2] | 0;
     $155 = $139 >>> 0 < $154 >>> 0;
     if ($155) {
      _abort();
     }
     $156 = $139 + 8 | 0;
     $157 = HEAP32[$156 >> 2] | 0;
     $158 = ($157 | 0) == ($9 | 0);
     if ($158) {
      $$pre$phi59Z2D = $156;
     } else {
      _abort();
     }
    }
    $159 = $137 + 12 | 0;
    HEAP32[$159 >> 2] = $139;
    HEAP32[$$pre$phi59Z2D >> 2] = $137;
   } else {
    $$sum5 = $8 + 16 | 0;
    $160 = $mem + $$sum5 | 0;
    $161 = HEAP32[$160 >> 2] | 0;
    $$sum67 = $8 | 4;
    $162 = $mem + $$sum67 | 0;
    $163 = HEAP32[$162 >> 2] | 0;
    $164 = ($163 | 0) == ($9 | 0);
    do {
     if ($164) {
      $$sum9 = $8 + 12 | 0;
      $175 = $mem + $$sum9 | 0;
      $176 = HEAP32[$175 >> 2] | 0;
      $177 = ($176 | 0) == (0 | 0);
      if ($177) {
       $$sum8 = $8 + 8 | 0;
       $178 = $mem + $$sum8 | 0;
       $179 = HEAP32[$178 >> 2] | 0;
       $180 = ($179 | 0) == (0 | 0);
       if ($180) {
        $R7$1 = 0;
        break;
       } else {
        $R7$0 = $179;
        $RP9$0 = $178;
       }
      } else {
       $R7$0 = $176;
       $RP9$0 = $175;
      }
      while (1) {
       $181 = $R7$0 + 20 | 0;
       $182 = HEAP32[$181 >> 2] | 0;
       $183 = ($182 | 0) == (0 | 0);
       if (!$183) {
        $R7$0 = $182;
        $RP9$0 = $181;
        continue;
       }
       $184 = $R7$0 + 16 | 0;
       $185 = HEAP32[$184 >> 2] | 0;
       $186 = ($185 | 0) == (0 | 0);
       if ($186) {
        $R7$0$lcssa = $R7$0;
        $RP9$0$lcssa = $RP9$0;
        break;
       } else {
        $R7$0 = $185;
        $RP9$0 = $184;
       }
      }
      $187 = HEAP32[2480 >> 2] | 0;
      $188 = $RP9$0$lcssa >>> 0 < $187 >>> 0;
      if ($188) {
       _abort();
      } else {
       HEAP32[$RP9$0$lcssa >> 2] = 0;
       $R7$1 = $R7$0$lcssa;
       break;
      }
     } else {
      $165 = $mem + $8 | 0;
      $166 = HEAP32[$165 >> 2] | 0;
      $167 = HEAP32[2480 >> 2] | 0;
      $168 = $166 >>> 0 < $167 >>> 0;
      if ($168) {
       _abort();
      }
      $169 = $166 + 12 | 0;
      $170 = HEAP32[$169 >> 2] | 0;
      $171 = ($170 | 0) == ($9 | 0);
      if (!$171) {
       _abort();
      }
      $172 = $163 + 8 | 0;
      $173 = HEAP32[$172 >> 2] | 0;
      $174 = ($173 | 0) == ($9 | 0);
      if ($174) {
       HEAP32[$169 >> 2] = $163;
       HEAP32[$172 >> 2] = $166;
       $R7$1 = $163;
       break;
      } else {
       _abort();
      }
     }
    } while (0);
    $189 = ($161 | 0) == (0 | 0);
    if (!$189) {
     $$sum12 = $8 + 20 | 0;
     $190 = $mem + $$sum12 | 0;
     $191 = HEAP32[$190 >> 2] | 0;
     $192 = 2768 + ($191 << 2) | 0;
     $193 = HEAP32[$192 >> 2] | 0;
     $194 = ($9 | 0) == ($193 | 0);
     if ($194) {
      HEAP32[$192 >> 2] = $R7$1;
      $cond47 = ($R7$1 | 0) == (0 | 0);
      if ($cond47) {
       $195 = 1 << $191;
       $196 = $195 ^ -1;
       $197 = HEAP32[2468 >> 2] | 0;
       $198 = $197 & $196;
       HEAP32[2468 >> 2] = $198;
       break;
      }
     } else {
      $199 = HEAP32[2480 >> 2] | 0;
      $200 = $161 >>> 0 < $199 >>> 0;
      if ($200) {
       _abort();
      }
      $201 = $161 + 16 | 0;
      $202 = HEAP32[$201 >> 2] | 0;
      $203 = ($202 | 0) == ($9 | 0);
      if ($203) {
       HEAP32[$201 >> 2] = $R7$1;
      } else {
       $204 = $161 + 20 | 0;
       HEAP32[$204 >> 2] = $R7$1;
      }
      $205 = ($R7$1 | 0) == (0 | 0);
      if ($205) {
       break;
      }
     }
     $206 = HEAP32[2480 >> 2] | 0;
     $207 = $R7$1 >>> 0 < $206 >>> 0;
     if ($207) {
      _abort();
     }
     $208 = $R7$1 + 24 | 0;
     HEAP32[$208 >> 2] = $161;
     $$sum13 = $8 + 8 | 0;
     $209 = $mem + $$sum13 | 0;
     $210 = HEAP32[$209 >> 2] | 0;
     $211 = ($210 | 0) == (0 | 0);
     do {
      if (!$211) {
       $212 = $210 >>> 0 < $206 >>> 0;
       if ($212) {
        _abort();
       } else {
        $213 = $R7$1 + 16 | 0;
        HEAP32[$213 >> 2] = $210;
        $214 = $210 + 24 | 0;
        HEAP32[$214 >> 2] = $R7$1;
        break;
       }
      }
     } while (0);
     $$sum14 = $8 + 12 | 0;
     $215 = $mem + $$sum14 | 0;
     $216 = HEAP32[$215 >> 2] | 0;
     $217 = ($216 | 0) == (0 | 0);
     if (!$217) {
      $218 = HEAP32[2480 >> 2] | 0;
      $219 = $216 >>> 0 < $218 >>> 0;
      if ($219) {
       _abort();
      } else {
       $220 = $R7$1 + 20 | 0;
       HEAP32[$220 >> 2] = $216;
       $221 = $216 + 24 | 0;
       HEAP32[$221 >> 2] = $R7$1;
       break;
      }
     }
    }
   }
  } while (0);
  $222 = $133 | 1;
  $223 = $p$0 + 4 | 0;
  HEAP32[$223 >> 2] = $222;
  $224 = $p$0 + $133 | 0;
  HEAP32[$224 >> 2] = $133;
  $225 = HEAP32[2484 >> 2] | 0;
  $226 = ($p$0 | 0) == ($225 | 0);
  if ($226) {
   HEAP32[2472 >> 2] = $133;
   return;
  } else {
   $psize$1 = $133;
  }
 } else {
  $227 = $112 & -2;
  HEAP32[$111 >> 2] = $227;
  $228 = $psize$0 | 1;
  $229 = $p$0 + 4 | 0;
  HEAP32[$229 >> 2] = $228;
  $230 = $p$0 + $psize$0 | 0;
  HEAP32[$230 >> 2] = $psize$0;
  $psize$1 = $psize$0;
 }
 $231 = $psize$1 >>> 3;
 $232 = $psize$1 >>> 0 < 256;
 if ($232) {
  $233 = $231 << 1;
  $234 = 2504 + ($233 << 2) | 0;
  $235 = HEAP32[2464 >> 2] | 0;
  $236 = 1 << $231;
  $237 = $235 & $236;
  $238 = ($237 | 0) == 0;
  if ($238) {
   $239 = $235 | $236;
   HEAP32[2464 >> 2] = $239;
   $$pre = $233 + 2 | 0;
   $$pre57 = 2504 + ($$pre << 2) | 0;
   $$pre$phiZ2D = $$pre57;
   $F16$0 = $234;
  } else {
   $$sum11 = $233 + 2 | 0;
   $240 = 2504 + ($$sum11 << 2) | 0;
   $241 = HEAP32[$240 >> 2] | 0;
   $242 = HEAP32[2480 >> 2] | 0;
   $243 = $241 >>> 0 < $242 >>> 0;
   if ($243) {
    _abort();
   } else {
    $$pre$phiZ2D = $240;
    $F16$0 = $241;
   }
  }
  HEAP32[$$pre$phiZ2D >> 2] = $p$0;
  $244 = $F16$0 + 12 | 0;
  HEAP32[$244 >> 2] = $p$0;
  $245 = $p$0 + 8 | 0;
  HEAP32[$245 >> 2] = $F16$0;
  $246 = $p$0 + 12 | 0;
  HEAP32[$246 >> 2] = $234;
  return;
 }
 $247 = $psize$1 >>> 8;
 $248 = ($247 | 0) == 0;
 if ($248) {
  $I18$0 = 0;
 } else {
  $249 = $psize$1 >>> 0 > 16777215;
  if ($249) {
   $I18$0 = 31;
  } else {
   $250 = $247 + 1048320 | 0;
   $251 = $250 >>> 16;
   $252 = $251 & 8;
   $253 = $247 << $252;
   $254 = $253 + 520192 | 0;
   $255 = $254 >>> 16;
   $256 = $255 & 4;
   $257 = $256 | $252;
   $258 = $253 << $256;
   $259 = $258 + 245760 | 0;
   $260 = $259 >>> 16;
   $261 = $260 & 2;
   $262 = $257 | $261;
   $263 = 14 - $262 | 0;
   $264 = $258 << $261;
   $265 = $264 >>> 15;
   $266 = $263 + $265 | 0;
   $267 = $266 << 1;
   $268 = $266 + 7 | 0;
   $269 = $psize$1 >>> $268;
   $270 = $269 & 1;
   $271 = $270 | $267;
   $I18$0 = $271;
  }
 }
 $272 = 2768 + ($I18$0 << 2) | 0;
 $273 = $p$0 + 28 | 0;
 HEAP32[$273 >> 2] = $I18$0;
 $274 = $p$0 + 16 | 0;
 $275 = $p$0 + 20 | 0;
 HEAP32[$275 >> 2] = 0;
 HEAP32[$274 >> 2] = 0;
 $276 = HEAP32[2468 >> 2] | 0;
 $277 = 1 << $I18$0;
 $278 = $276 & $277;
 $279 = ($278 | 0) == 0;
 L199 : do {
  if ($279) {
   $280 = $276 | $277;
   HEAP32[2468 >> 2] = $280;
   HEAP32[$272 >> 2] = $p$0;
   $281 = $p$0 + 24 | 0;
   HEAP32[$281 >> 2] = $272;
   $282 = $p$0 + 12 | 0;
   HEAP32[$282 >> 2] = $p$0;
   $283 = $p$0 + 8 | 0;
   HEAP32[$283 >> 2] = $p$0;
  } else {
   $284 = HEAP32[$272 >> 2] | 0;
   $285 = $284 + 4 | 0;
   $286 = HEAP32[$285 >> 2] | 0;
   $287 = $286 & -8;
   $288 = ($287 | 0) == ($psize$1 | 0);
   L202 : do {
    if ($288) {
     $T$0$lcssa = $284;
    } else {
     $289 = ($I18$0 | 0) == 31;
     $290 = $I18$0 >>> 1;
     $291 = 25 - $290 | 0;
     $292 = $289 ? 0 : $291;
     $293 = $psize$1 << $292;
     $K19$052 = $293;
     $T$051 = $284;
     while (1) {
      $300 = $K19$052 >>> 31;
      $301 = ($T$051 + 16 | 0) + ($300 << 2) | 0;
      $296 = HEAP32[$301 >> 2] | 0;
      $302 = ($296 | 0) == (0 | 0);
      if ($302) {
       $$lcssa = $301;
       $T$051$lcssa = $T$051;
       break;
      }
      $294 = $K19$052 << 1;
      $295 = $296 + 4 | 0;
      $297 = HEAP32[$295 >> 2] | 0;
      $298 = $297 & -8;
      $299 = ($298 | 0) == ($psize$1 | 0);
      if ($299) {
       $T$0$lcssa = $296;
       break L202;
      } else {
       $K19$052 = $294;
       $T$051 = $296;
      }
     }
     $303 = HEAP32[2480 >> 2] | 0;
     $304 = $$lcssa >>> 0 < $303 >>> 0;
     if ($304) {
      _abort();
     } else {
      HEAP32[$$lcssa >> 2] = $p$0;
      $305 = $p$0 + 24 | 0;
      HEAP32[$305 >> 2] = $T$051$lcssa;
      $306 = $p$0 + 12 | 0;
      HEAP32[$306 >> 2] = $p$0;
      $307 = $p$0 + 8 | 0;
      HEAP32[$307 >> 2] = $p$0;
      break L199;
     }
    }
   } while (0);
   $308 = $T$0$lcssa + 8 | 0;
   $309 = HEAP32[$308 >> 2] | 0;
   $310 = HEAP32[2480 >> 2] | 0;
   $311 = $309 >>> 0 >= $310 >>> 0;
   $not$ = $T$0$lcssa >>> 0 >= $310 >>> 0;
   $312 = $311 & $not$;
   if ($312) {
    $313 = $309 + 12 | 0;
    HEAP32[$313 >> 2] = $p$0;
    HEAP32[$308 >> 2] = $p$0;
    $314 = $p$0 + 8 | 0;
    HEAP32[$314 >> 2] = $309;
    $315 = $p$0 + 12 | 0;
    HEAP32[$315 >> 2] = $T$0$lcssa;
    $316 = $p$0 + 24 | 0;
    HEAP32[$316 >> 2] = 0;
    break;
   } else {
    _abort();
   }
  }
 } while (0);
 $317 = HEAP32[2496 >> 2] | 0;
 $318 = $317 + -1 | 0;
 HEAP32[2496 >> 2] = $318;
 $319 = ($318 | 0) == 0;
 if ($319) {
  $sp$0$in$i = 2920;
 } else {
  return;
 }
 while (1) {
  $sp$0$i = HEAP32[$sp$0$in$i >> 2] | 0;
  $320 = ($sp$0$i | 0) == (0 | 0);
  $321 = $sp$0$i + 8 | 0;
  if ($320) {
   break;
  } else {
   $sp$0$in$i = $321;
  }
 }
 HEAP32[2496 >> 2] = -1;
 return;
}

function _memcpy(dest, src, num) {
 dest = dest | 0;
 src = src | 0;
 num = num | 0;
 var ret = 0;
 if ((num | 0) >= 4096) return _emscripten_memcpy_big(dest | 0, src | 0, num | 0) | 0;
 ret = dest | 0;
 if ((dest & 3) == (src & 3)) {
  while (dest & 3) {
   if ((num | 0) == 0) return ret | 0;
   HEAP8[dest >> 0] = HEAP8[src >> 0] | 0;
   dest = dest + 1 | 0;
   src = src + 1 | 0;
   num = num - 1 | 0;
  }
  while ((num | 0) >= 4) {
   HEAP32[dest >> 2] = HEAP32[src >> 2] | 0;
   dest = dest + 4 | 0;
   src = src + 4 | 0;
   num = num - 4 | 0;
  }
 }
 while ((num | 0) > 0) {
  HEAP8[dest >> 0] = HEAP8[src >> 0] | 0;
  dest = dest + 1 | 0;
  src = src + 1 | 0;
  num = num - 1 | 0;
 }
 return ret | 0;
}

function _memset(ptr, value, num) {
 ptr = ptr | 0;
 value = value | 0;
 num = num | 0;
 var stop = 0, value4 = 0, stop4 = 0, unaligned = 0;
 stop = ptr + num | 0;
 if ((num | 0) >= 20) {
  value = value & 255;
  unaligned = ptr & 3;
  value4 = value | value << 8 | value << 16 | value << 24;
  stop4 = stop & ~3;
  if (unaligned) {
   unaligned = ptr + 4 - unaligned | 0;
   while ((ptr | 0) < (unaligned | 0)) {
    HEAP8[ptr >> 0] = value;
    ptr = ptr + 1 | 0;
   }
  }
  while ((ptr | 0) < (stop4 | 0)) {
   HEAP32[ptr >> 2] = value4;
   ptr = ptr + 4 | 0;
  }
 }
 while ((ptr | 0) < (stop | 0)) {
  HEAP8[ptr >> 0] = value;
  ptr = ptr + 1 | 0;
 }
 return ptr - num | 0;
}

function copyTempDouble(ptr) {
 ptr = ptr | 0;
 HEAP8[tempDoublePtr >> 0] = HEAP8[ptr >> 0];
 HEAP8[tempDoublePtr + 1 >> 0] = HEAP8[ptr + 1 >> 0];
 HEAP8[tempDoublePtr + 2 >> 0] = HEAP8[ptr + 2 >> 0];
 HEAP8[tempDoublePtr + 3 >> 0] = HEAP8[ptr + 3 >> 0];
 HEAP8[tempDoublePtr + 4 >> 0] = HEAP8[ptr + 4 >> 0];
 HEAP8[tempDoublePtr + 5 >> 0] = HEAP8[ptr + 5 >> 0];
 HEAP8[tempDoublePtr + 6 >> 0] = HEAP8[ptr + 6 >> 0];
 HEAP8[tempDoublePtr + 7 >> 0] = HEAP8[ptr + 7 >> 0];
}

function runPostSets() {}
function _i64Subtract(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = a;
  HEAP32[EMTSTACKTOP + 16 >> 2] = b;
  HEAP32[EMTSTACKTOP + 24 >> 2] = c;
  HEAP32[EMTSTACKTOP + 32 >> 2] = d;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 80776 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _default_alloc($size, $zero, $user_data) {
 $size = $size | 0;
 $zero = $zero | 0;
 $user_data = $user_data | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $size;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $zero;
  HEAP32[EMTSTACKTOP + 24 >> 2] = $user_data;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 80016 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _i64Add(a, b, c, d) {
 a = a | 0;
 b = b | 0;
 c = c | 0;
 d = d | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = a;
  HEAP32[EMTSTACKTOP + 16 >> 2] = b;
  HEAP32[EMTSTACKTOP + 24 >> 2] = c;
  HEAP32[EMTSTACKTOP + 32 >> 2] = d;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 80940 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _sn_write($f, $s, $l) {
 $f = $f | 0;
 $s = $s | 0;
 $l = $l | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $f;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $s;
  HEAP32[EMTSTACKTOP + 24 >> 2] = $l;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 78208 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function b0(p0, p1, p2) {
 p0 = p0 | 0;
 p1 = p1 | 0;
 p2 = p2 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = p0;
  HEAP32[EMTSTACKTOP + 16 >> 2] = p1;
  HEAP32[EMTSTACKTOP + 24 >> 2] = p2;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81272 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _bitshift64Ashr(low, high, bits) {
 low = low | 0;
 high = high | 0;
 bits = bits | 0;
 var ander = 0;
 if ((bits | 0) < 32) {
  ander = (1 << bits) - 1 | 0;
  tempRet0 = high >> bits;
  return low >>> bits | (high & ander) << 32 - bits;
 }
 tempRet0 = (high | 0) < 0 ? -1 : 0;
 return high >> bits - 32 | 0;
}

function _comp_by_mass($elem1, $elem2) {
 $elem1 = $elem1 | 0;
 $elem2 = $elem2 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $elem1;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $elem2;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 78728 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _comp_by_id($elem1, $elem2) {
 $elem1 = $elem1 | 0;
 $elem2 = $elem2 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $elem1;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $elem2;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 78808 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function _bitshift64Shl(low, high, bits) {
 low = low | 0;
 high = high | 0;
 bits = bits | 0;
 var ander = 0;
 if ((bits | 0) < 32) {
  ander = (1 << bits) - 1 | 0;
  tempRet0 = high << bits | (low & ander << 32 - bits) >>> 32 - bits;
  return low << bits;
 }
 tempRet0 = low << bits - 32;
 return 0;
}

function establishStackSpace(stackBase, stackMax) {
 stackBase = stackBase | 0;
 stackMax = stackMax | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = stackBase;
  HEAP32[EMTSTACKTOP + 16 >> 2] = stackMax;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81216 | 0);
}

function _bitshift64Lshr(low, high, bits) {
 low = low | 0;
 high = high | 0;
 bits = bits | 0;
 var ander = 0;
 if ((bits | 0) < 32) {
  ander = (1 << bits) - 1 | 0;
  tempRet0 = high >>> bits;
  return low >>> bits | (high & ander) << 32 - bits;
 }
 tempRet0 = 0;
 return high >>> bits - 32 | 0;
}

function _default_free($ptr, $user_data) {
 $ptr = $ptr | 0;
 $user_data = $user_data | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $ptr;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $user_data;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81184 | 0);
}

function _strcat(pdest, psrc) {
 pdest = pdest | 0;
 psrc = psrc | 0;
 var i = 0, pdestEnd = 0;
 pdestEnd = pdest + (_strlen(pdest) | 0) | 0;
 do {
  HEAP8[pdestEnd + i >> 0] = HEAP8[psrc + i >> 0];
  i = i + 1 | 0;
 } while (HEAP8[psrc + (i - 1) >> 0] | 0);
 return pdest | 0;
}

function _step($x, $gp) {
 $x = +$x;
 $gp = $gp | 0;
 if ((asyncState | 0) != 2) {
  HEAPF64[EMTSTACKTOP + 8 >> 3] = $x;
  HEAP32[EMTSTACKTOP + 16 >> 2] = $gp;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 77844 | 0);
 return +HEAPF64[EMTSTACKTOP >> 3];
}

function b4(p0, p1) {
 p0 = p0 | 0;
 p1 = p1 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = p0;
  HEAP32[EMTSTACKTOP + 16 >> 2] = p1;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81300 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function b2(p0, p1) {
 p0 = +p0;
 p1 = p1 | 0;
 if ((asyncState | 0) != 2) {
  HEAPF64[EMTSTACKTOP + 8 >> 3] = p0;
  HEAP32[EMTSTACKTOP + 16 >> 2] = p1;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81328 | 0);
 return +HEAPF64[EMTSTACKTOP >> 3];
}

function copyTempFloat(ptr) {
 ptr = ptr | 0;
 HEAP8[tempDoublePtr >> 0] = HEAP8[ptr >> 0];
 HEAP8[tempDoublePtr + 1 >> 0] = HEAP8[ptr + 1 >> 0];
 HEAP8[tempDoublePtr + 2 >> 0] = HEAP8[ptr + 2 >> 0];
 HEAP8[tempDoublePtr + 3 >> 0] = HEAP8[ptr + 3 >> 0];
}

function _minimize($fname) {
 $fname = $fname | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $fname;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 76648 | 0);
 return HEAP32[EMTSTACKTOP >> 2] | 0;
}

function b3(p0, p1) {
 p0 = p0 | 0;
 p1 = p1 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = p0;
  HEAP32[EMTSTACKTOP + 16 >> 2] = p1;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81356 | 0);
}

function _strcpy(pdest, psrc) {
 pdest = pdest | 0;
 psrc = psrc | 0;
 var i = 0;
 do {
  HEAP8[(pdest + i | 0) >> 0] = HEAP8[(psrc + i | 0) >> 0];
  i = i + 1 | 0;
 } while (HEAP8[psrc + (i - 1) >> 0] | 0);
 return pdest | 0;
}

function _Energy_local($gp) {
 $gp = $gp | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $gp;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 80096 | 0);
}

function _Force_local($gp) {
 $gp = $gp | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = $gp;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81020 | 0);
}

function b1(p0) {
 p0 = p0 | 0;
 if ((asyncState | 0) != 2) {
  HEAP32[EMTSTACKTOP + 8 >> 2] = p0;
  if ((asyncState | 0) == 1) asyncState = 3;
 }
 emterpret(eb + 81380 | 0);
}

function dynCall_iiii(index, a1, a2, a3) {
 index = index | 0;
 a1 = a1 | 0;
 a2 = a2 | 0;
 a3 = a3 | 0;
 return FUNCTION_TABLE_iiii[index & 3](a1 | 0, a2 | 0, a3 | 0) | 0;
}

function stackAlloc(size) {
 size = size | 0;
 var ret = 0;
 ret = STACKTOP;
 STACKTOP = STACKTOP + size | 0;
 STACKTOP = STACKTOP + 15 & -16;
 return ret | 0;
}

function _strlen(ptr) {
 ptr = ptr | 0;
 var curr = 0;
 curr = ptr;
 while (HEAP8[curr >> 0] | 0) {
  curr = curr + 1 | 0;
 }
 return curr - ptr | 0;
}

function setThrew(threw, value) {
 threw = threw | 0;
 value = value | 0;
 if ((__THREW__ | 0) == 0) {
  __THREW__ = threw;
  threwValue = value;
 }
}

function dynCall_iii(index, a1, a2) {
 index = index | 0;
 a1 = a1 | 0;
 a2 = a2 | 0;
 return FUNCTION_TABLE_iii[index & 3](a1 | 0, a2 | 0) | 0;
}

function dynCall_ddi(index, a1, a2) {
 index = index | 0;
 a1 = +a1;
 a2 = a2 | 0;
 return +FUNCTION_TABLE_ddi[index & 1](+a1, a2 | 0);
}

function dynCall_vii(index, a1, a2) {
 index = index | 0;
 a1 = a1 | 0;
 a2 = a2 | 0;
 FUNCTION_TABLE_vii[index & 1](a1 | 0, a2 | 0);
}

function dynCall_vi(index, a1) {
 index = index | 0;
 a1 = a1 | 0;
 FUNCTION_TABLE_vi[index & 3](a1 | 0);
}

function setTempRet0(value) {
 value = value | 0;
 tempRet0 = value;
}

function stackRestore(top) {
 top = top | 0;
 STACKTOP = top;
}

function setAsyncState(x) {
 x = x | 0;
 asyncState = x;
}

function emtStackSave() {
 return EMTSTACKTOP | 0;
}

function getTempRet0() {
 return tempRet0 | 0;
}

function stackSave() {
 return STACKTOP | 0;
}

// EMSCRIPTEN_END_FUNCS

var FUNCTION_TABLE_iiii = [b0,_sn_write,_default_alloc,b0];
var FUNCTION_TABLE_vi = [b1,_Energy_local,_Force_local,b1];
var FUNCTION_TABLE_ddi = [b2,_step];
var FUNCTION_TABLE_vii = [b3,_default_free];
var FUNCTION_TABLE_iii = [b4,_comp_by_mass,_comp_by_id,b4];

  return { _i64Subtract: _i64Subtract, _strcat: _strcat, _free: _free, _i64Add: _i64Add, _strlen: _strlen, _memset: _memset, _malloc: _malloc, _memcpy: _memcpy, _bitshift64Lshr: _bitshift64Lshr, _strcpy: _strcpy, _minimize: _minimize, _bitshift64Shl: _bitshift64Shl, runPostSets: runPostSets, stackAlloc: stackAlloc, stackSave: stackSave, stackRestore: stackRestore, establishStackSpace: establishStackSpace, setThrew: setThrew, setTempRet0: setTempRet0, getTempRet0: getTempRet0, emterpret: emterpret, setAsyncState: setAsyncState, emtStackSave: emtStackSave, dynCall_iiii: dynCall_iiii, dynCall_vi: dynCall_vi, dynCall_ddi: dynCall_ddi, dynCall_vii: dynCall_vii, dynCall_iii: dynCall_iii };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var _strcat = Module["_strcat"] = asm["_strcat"];
var _free = Module["_free"] = asm["_free"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _strlen = Module["_strlen"] = asm["_strlen"];
var _memset = Module["_memset"] = asm["_memset"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _strcpy = Module["_strcpy"] = asm["_strcpy"];
var _minimize = Module["_minimize"] = asm["_minimize"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
var dynCall_vi = Module["dynCall_vi"] = asm["dynCall_vi"];
var dynCall_ddi = Module["dynCall_ddi"] = asm["dynCall_ddi"];
var dynCall_vii = Module["dynCall_vii"] = asm["dynCall_vii"];
var dynCall_iii = Module["dynCall_iii"] = asm["dynCall_iii"];
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








