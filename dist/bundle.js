/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }
	
	var _g = __webpack_require__(1);
	
	var G = _interopRequireWildcard(_g);
	
	//FIXME: hide bootstrapping
	function run() {
		var _this = this;
	
		G.numberField("counter");
		G.button("count"); //TODO
	
		G.clicked("count") //TODO
		.set("counter", function () {
			return _this.value + 1;
		});
	}
	
	window.run = run;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.textLabel = textLabel;
	exports.numberField = numberField;
	
	var controls = {};
	
	function makeControl(opts) {
		var input = document.createElement("input");
		input.attributes.id = opts.id;
		controls[opts.id] = input;
		document.getElementById("container").appendChild(input);
	}
	
	function textLabel(id, opts) {
		makeControl({ type: "textLabel", id: id, opts: opts });
	}
	
	function numberField(id, opts) {
		makeControl({ type: "numberField", id: id, opts: opts });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map