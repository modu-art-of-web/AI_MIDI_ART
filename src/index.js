
import Track from "./midi/track.js"


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
		tracks.push(new Track(4, Tone.Synth, track.notes));
	})
	
	Tone.Transport.bpm.value = midi.bpm;
	Tone.Transport.timeSignature = midi.timeSignature;

	button.classList.add("active")
});
