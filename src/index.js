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
