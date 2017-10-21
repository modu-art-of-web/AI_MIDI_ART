
import Track from "./midi/track.js"
import Visual from "./visual.js"

const Socket = require('socket.io-client')("http://35.201.158.91:5000/visual");


// const button = document.querySelector("button");
// button.addEventListener("click", function () {
// 	if (Tone.Transport.state === "started") {
// 		// button.textContent = "START";
// 		stop();
// 	} else {
// 		// button.textContent = "STOP";
// 		start();
// 	}
// });

// function stop() {
// 	Tone.Transport.stop();
// }

// function start() {
// 	Tone.Transport.start("+0.1", 0);
// }


//Midi file Load... and...
// var Miditracks = [];
// MidiConvert.load("res/MIDI_sample.mid").then(function (midi) {

// 	//You have to check tracks for making notes.
// 	console.log(midi);

// 	// play each tracks with each sound
// 	midi.tracks.forEach((track) => {
// 		Miditracks.push(new Track(4, Tone.Synth, track.notes));
// 	})

// 	Tone.Transport.bpm.value = midi.bpm;
// 	Tone.Transport.timeSignature = midi.timeSignature;
// 	// button.classList.add("active")
// });

var main = {};

function GetNotes(obj) {
	// var t = obj[0].offset;
	// if(obj)
	// for(var i = 0 ; i < obj.length; i++) {
	// 	setTimeout(((obj, idx)=>{ 
	// 		main.visual.setAIFFT(obj[idx].pitch, obj[idx].velocity / 127.0);
	// 	}).bind(null, obj, i), (obj[i].offset - t) * 1000.0);
		
	// 	setTimeout(((obj, idx)=>{ 
	// 		main.visual.setAIFFT(obj[idx].pitch, 0.0);
	// 	}).bind(null, obj, i), (obj[i].offset - t + obj[i].duration) * 1000.0);
	// }
	console.log(obj);
	if(obj.from == "ai"){
		if(obj.type == "keyDown") main.visual.setAIFFT(obj.note, 1.0);
		if(obj.type == "keyUp") main.visual.setAIFFT(obj.note, 0.0);
	} else {
		if(obj.type == "keyDown") main.visual.setURFFT(obj.note, 1.0);
		if(obj.type == "keyUp") main.visual.setURFFT(obj.note, 0.0);
	}
}


//Visual Effect
(function () {

	
	this.setup();
	this.animate(0, 0);	

	// if(Socket) {
	if(Socket){
		console.log("CONNECTED");
		Socket.on("started", (d) => {
			console.log(d);
		});
		Socket.on("toss-signal", (obj)=>{
			// console.log(obj);
			// GetAINotes(obj);
		});
		Socket.on("music_signal", (obj)=>{
			GetNotes(obj);
		});
	} else {
		console.log("DOSEN'T CONNECTED : " + Socket);
		document.addEventListener("keydown", ({key})=>{
			if(key == " ") {
				GetAINotes([
					{duration:0.17995464852606347,offset:272.56743764172336,pitch:67,velocity:127},
					{duration:0.14512471655325498,offset:272.7764172335601,pitch:67,velocity:127},
					{duration:0.1160997732426381,offset:272.99120181405897,pitch:64,velocity:127},
					{duration:0.12770975056685074,offset:273.2175963718821,pitch:71,velocity:127}
				]);
			}
		});
	}
}).bind(main = {
	setup: function () {
		this.visual = new Visual({});
	},

	update: function (t, dt) {
		this.visual.update(t, dt);
	},

	animate: function (oldt, nowt) {
		this.update(nowt * 0.001, (nowt - oldt) * 0.001);
		requestAnimationFrame(this.animate.bind(this, nowt));
	}
})();
