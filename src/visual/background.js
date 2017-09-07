import * as THREE from "three"

const fragmentShader = `
uniform sampler2D uPerlin;
uniform sampler2D uCanvas;
varying vec2 vtex;
void main(void) {
    vec4 backColor = texture2D(uPerlin, vtex);
    vec4 forgColor = texture2D(uCanvas, vtex);
    vec3 currColor = mix(forgColor.rgb, backColor.rgb, forgColor.a);
    gl_FragColor = vec4(currColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vtex;
void main(void) {
    vtex = uv;
    gl_Position = vec4(position, 1.0);
}
`;

export default class extends THREE.Object3D {
    constructor(perlin, canvas) {
        super();
        

        //default scene
        this.add(new THREE.Mesh(
            new THREE.PlaneGeometry(2.0, 2.0),
            new THREE.ShaderMaterial({
                uniforms : {
                    uPerlin : { type : "t", value : perlin},
                    uCanvas : { type : "t", value : canvas}
                },
                fragmentShader, vertexShader
            })
        ));

        //default camera
        this.camera = new THREE.Camera();

        //default scene
        this.scene =new THREE.Scene();

        //added this Object
        this.scene.add(this);
    }

    render(rdrr) {
        rdrr.render(this.scene, this.camera);
    }

}