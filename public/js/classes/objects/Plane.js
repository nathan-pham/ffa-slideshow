import * as THREE from "https://esm.sh/three"

const fragment = `
uniform float time;
uniform sampler2D texture;
uniform vec4 resolution;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793;

void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}


`
const vertex = `
`

export default class Plane {
    constructor(name="plane", planeArgs=[0.5, 0.5, 10, 10]) {
        this.name = name

        this.geometry = new THREE.PlaneBufferGeometry(...planeArgs)
        this.material = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            wireframe: true,
            uniforms: {
                time: { value: 0 }
            },

            fragmentShader: fragment,
            vertexShader: vertex
        })
        
        this.object = new THREE.Mesh(this.geometry, this.material)
    }

    render(sketch) {
        this.material.uniforms.time.value = sketch.time
    }
}
