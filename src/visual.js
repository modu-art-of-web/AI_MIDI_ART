import * as THREE from "three"

import Perlin from "./perlin/perlin.js"
import Brush from "./visual/brush.js"
import Canvas from "./visual/canvas.js"
import background from "./visual/background.js"

class Visual {
    constructor(tracks) {
        //Setup Size for render
        this.resolution = {width : window.innerWidth * 1.0, height : window.innerHeight * 1.0};

        //Setup Renderer
        this.rdrr = new THREE.WebGLRenderer({ alpha: false, antialias: true });
        this.rdrr.setSize(this.resolution.width, this.resolution.height);

        // this.rdrr.domElement.style.marginLeft = (window.innerWidth - this.resolution.width) * 0.5 + "px";
        // this.rdrr.domElement.style.marginTop = (window.innerHeight - this.resolution.height) * 0.5 + "px";
        // this.rdrr.domElement.style.boxShadow = "5px 5px 40px #AAAAAA";

        console.log(document.getElementById("main_canvas"));
        document.getElementById("main_canvas").appendChild(this.rdrr.domElement);

        //Setup perlin noise
        this.perlin = new Perlin({rdrr : this.rdrr, gridWidth : 16, gridHeight : 16, texWidth : 64, texHeight : 64});

        //Setup Scene & add brushes
        this.scene = new THREE.Scene();
        this.brushes = [];
        this.brushes.push(new Brush(0, {x : - 6.25, y : 2.0}, this.rdrr));
        this.brushes.push(new Brush(1, {x : - 3.75, y : 2.0}, this.rdrr));
        this.brushes.push(new Brush(2, {x : - 1.25, y : 2.0}, this.rdrr));
        this.brushes.push(new Brush(3, {x :   1.25, y : 2.0}, this.rdrr));
        this.brushes.push(new Brush(4, {x :   3.75, y : 2.0}, this.rdrr));
        this.brushes.push(new Brush(5, {x :   6.25, y : 2.0}, this.rdrr));
        for(var i = 0 ; i < this.brushes.length; i++) this.scene.add(this.brushes[i]);

        //Setup Camera
        this.camera = new THREE.PerspectiveCamera(45, this.resolution.width/ this.resolution.height, 1.0, 1000.0);
        this.camera.position.z = 20.0;

        //Setup Canvas 
        //it's made for brush effect (unerasing)
        this.canvas = new Canvas(this.rdrr, this.perlin);

        this.backgr = new background(this.perlin.texture, this.canvas.texture);

        //Get Tracks for Pitches
        this.tracks = tracks;
    }   

    update(t, dt) {
        //Perlin noise update
        this.perlin.update(dt);

        //update objects included scene
        this.scene.children.forEach((brush, idx) => {
            if(brush.update) { brush.update(t, dt); }
        });

        //update canvas
        this.canvas.update(dt);

        //render 
        this.canvas.render(this.scene, this.camera);
        this.backgr.render(this.rdrr);
    }

    setAIFFT(idx, v) { 
        console.log(this.brushes[idx % 3 + 3].FFT)
        this.brushes[idx % 3 + 3].FFT = v; 
    }
    setURFFT(idx, v) {
        this.brushes[idx % 3].FFT = v; 
    }
}


export default Visual;