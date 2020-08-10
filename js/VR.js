//importing necessary modules
import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

//import pictures
import * as image from '/projects/Projekt-2.jpg';

var scene, camera , renderer;

scene = new THREE.Scene();
    var aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 300000);
    camera.position.set(-900, -200, -900);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    let skySpheres = [createSkysphere(image.default)];//lista miejsc



    //actualna sfera
    scene.add(skySpheres[0]);

    var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki
    controls.minDistance = 500;
    controls.maxDistance = 100000;

    window.addEventListener('resize', resize, false);
    render();


class VR {

    constructor() {

        console.log('VR module has been initialized');
    
    
    document.querySelector('.projectsView').appendChild(renderer.domElement);
    
    }

}



//tworzenie boxów z lokacjami 
/**
 * create an mesh object sphere from 360 picture
 * @param {String} location - a path  to picture 
 */
function createSkysphere(location) {

    let skySphereGeo = new THREE.SphereGeometry(100000, 100, 100);
    let textureSphere = new THREE.TextureLoader().load(location);
    let skySphere = new THREE.Mesh(skySphereGeo, new THREE.MeshBasicMaterial({ map: textureSphere, side: THREE.BackSide }));
    return skySphere;
}



function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}



///////////// zmienianie miejsca
let options = document.querySelectorAll(".menuBottom > ul > li");

for (var i = 0; i < options.length; i++) {
    options[i].classList.add(i.toString());

    options[i].addEventListener('click', function () {

        let index = this.classList[0];
        for (const sphere of skySpheres)
            scene.remove(sphere);

        scene.add(skySpheres[index]);

        // title.innerHTML = this.innerHTML;
    });
}

export default VR;

