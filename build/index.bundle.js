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
/***/ (function(module, exports) {

 const synth = new Tone.PolySynth(8, Tone.Synth, {
			"oscillator": {
				"type": "sine3"
			},
			"envelope": {
				"attack": 0.03,
				"decay": 0.1,
				"sustain": 0.2,
				"release": 0.6
			}
		}).toMaster();

function playNote(time, event){
	synth.triggerAttackRelease(event.name, event.duration, time, event.velocity);
}

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
MidiConvert.load("../res/MIDI_sample.mid").then(function(midi){

	// play right and left hand with a poly synth
	const rightHand = midi.get("Piano").notes;
	const leftHand = midi.get("Bass").notes;
	// make sure you set the tempo before you schedule the events
	Tone.Transport.bpm.value = midi.bpm;
	Tone.Transport.timeSignature = midi.timeSignature;
	const rightHandPart = new Tone.Part(playNote, rightHand).start(0);
	const leftHandPart = new Tone.Part(playNote, leftHand).start(0);
	button.classList.add("active")
});


/***/ })
/******/ ]);