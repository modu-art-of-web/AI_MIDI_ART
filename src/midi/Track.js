
export default class Track extends Tone.PolySynth{
    constructor(polyphony, voice, notes) {
        super(polyphony, voice);
        this.track = new Tone.Part(this.playNote.bind(this), notes).start(0);
        this.master = this.toMaster();
    }

    playNote(time, event) {
        this.master.triggerAttackRelease(event.name, event.duration, time, event.velocity);
    }
};