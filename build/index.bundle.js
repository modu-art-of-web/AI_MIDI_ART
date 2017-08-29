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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__midi_track_js__ = __webpack_require__(1);




const button = document.querySelector("button");
button.addEventListener("click", function(){
	if (Tone.Transport.state === "started"){
		Tone.Transport.stop();
		button.textContent = "START";
	} else {
		Tone.Transport.start("+0.1", 0);
		button.textContent = "STOP";
	}
});


//Midi file Load... and...

MidiConvert.load("res/MIDI_sample.mid").then(function(midi){

	//You have to check tracks for making notes.
	console.log(midi);

	var tracks = [];

	// play each tracks with each sound
	midi.tracks.forEach((track)=>{
		tracks.push(new __WEBPACK_IMPORTED_MODULE_0__midi_track_js__["a" /* default */](4, Tone.Synth, track.notes));
	})
	
	Tone.Transport.bpm.value = midi.bpm;
	Tone.Transport.timeSignature = midi.timeSignature;

	button.classList.add("active")
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Track extends Tone.PolySynth{
    constructor(polyphony, voice, notes) {
        super(polyphony, voice);
        this.track = new Tone.Part(this.playNote.bind(this), notes).start(0);
        this.master = this.toMaster();
    }

    playNote(time, event) {
        this.master.triggerAttackRelease(event.name, event.duration, time, event.velocity);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Track;
;

/***/ })
/******/ ]);