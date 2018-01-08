/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_lib__ = __webpack_require__(1);


window.show = () => {
    let popup = document.querySelector('#popup');

    popup.style.display = 'block';

    __WEBPACK_IMPORTED_MODULE_0__src_lib__["a" /* default */].on(1, ()=>{
        popup.style.display = 'none';
    });
};
window.close = () => {
    let popup = document.querySelector('#popup');

    popup.style.display = 'none';

    __WEBPACK_IMPORTED_MODULE_0__src_lib__["a" /* default */].off(1);
};

window.show2 = () => {
    let popup = document.querySelector('#popup2');

    popup.style.display = 'block';

    __WEBPACK_IMPORTED_MODULE_0__src_lib__["a" /* default */].on(2, ()=>{
        popup.style.display = 'none';
    });
};
window.close2 = () => {
    let popup = document.querySelector('#popup2');

    popup.style.display = 'none';

    __WEBPACK_IMPORTED_MODULE_0__src_lib__["a" /* default */].off(2);
};




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let stateIndex = 0;
let HISTORY = [];
let activeState;
let index = 1;

function back(flag){
    if (history.state == 'B-1' || history.state == 'B-2' || history.state == 'B-3' || history.state == 'B-4'){
        activeState = HISTORY.length>0 ? 'back' : 'backAll'+flag;
        history.back();
    }
}

window.addEventListener('popstate', function(event){
    let his;

    if (activeState=='backAll' || activeState=='backAll1'){
        if (event.state == 'B-1' || event.state == 'B-2' || event.state == 'B-3' || event.state == 'B-4'){
            history.back();
        }else{
            if (activeState == 'backAll1'){
                activeState = 'backAll';
                history.back();
            }else{
                activeState = null;
            }
        }
        return;
    }

    if (activeState=='back'){
        if (history.state == 'B-1' || history.state == 'B-3'){
            return;
        }
    }

    // voltando
    if ( (activeState == 'B-2' && event.state == 'B-1') || (activeState == 'B-4' && event.state == 'B-3')){
        if (HISTORY.length>0){
            his = HISTORY.pop();
            if (his.callback){
                his.callback();
                back();
            }
        } else {
            return back(1);
        }
    } else if (event.state == 'B-1' || event.state == 'B-3'){
        //  frente;
        history.back();
    }
    
    activeState = event.state;
});

back();

/* harmony default export */ __webpack_exports__["a"] = ({
    on(id, callback) {
        if (arguments.length==1){
            callback = id;
            id = stateIndex++;
        }
        
        history.pushState('B-' + index, id, '');
        history.pushState('B-' + (index+1), id, '');
        activeState = 'B-' + (index + 1);

        index = index==1 ? 3 : 1;
    
        HISTORY.push({
            callback: callback,
            id: id
        });
    },

    off(id) {
        let i;
        let callback = typeof(id)!='function' ? null : id;
        
        if (!callback){
            for (i = 0; i < HISTORY.length; i++){
                if (HISTORY[i].id == id){
                    callback = HISTORY[i].callback;
                    break;
                }
            }
        }

        if (callback) {
            for (i = 0; i < HISTORY.length; i++){
                if (HISTORY[i].callback===callback){                    
                    HISTORY.splice(i, 1);
                    break;
                }
            }
        }
    }
});


/***/ })
/******/ ]);