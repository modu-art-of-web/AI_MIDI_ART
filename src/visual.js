import * as THREE from "three"

import Perlin from "./perlin/perlin.js"
import Brush from "./visual/brush.js"
import Canvas from "./visual/canvas.js"

class Visual {
    constructor(tracks) {

        //Setup Renderer
        this.rdrr = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        this.rdrr.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.rdrr.domElement);

        //Setup perlin noise
        this.perlin = new Perlin({rdrr : this.rdrr, gridWidth : 16, gridHeight : 16, texWidth : 64, texHeight : 64});

        //Setup Scene & add brushes
        this.scene = new THREE.Scene();
        this.scene.add(new Brush({x : -10.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x : - 6.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x : - 2.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :   2.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :   6.0, y : 0.0}, this.rdrr, this.perlin));
        this.scene.add(new Brush({x :  10.0, y : 0.0}, this.rdrr, this.perlin));

        //Setup Camera
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1.0, 1000.0);
        this.camera.position.z = 20.0;

        //Setup Canvas 
        //it's made for brush effect (unerasing)
        this.canvas = new Canvas(this.rdrr, this.perlin);

        //Get Tracks for Pitches
        this.tracks = tracks;
    }   

    update(t, dt) {
        //Perlin noise update
        this.perlin.update(dt);

        //update objects included scene
        this.scene.children.forEach((brush, idx) => {
            if(brush.update) {
                var midi = 0.0;
                if(!this.tracks[idx]) midi = 0.0;
                else midi =  this.tracks[idx].event.midi;
                brush.update(t, dt, midi / 100.0);
            }
        });

        //update canvas
        this.canvas.update(dt);

        //render 
        this.canvas.render(this.scene, this.camera);
    }
}


export default Visual;