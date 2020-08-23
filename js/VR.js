//importing necessary modules
import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
//manuBottom
import menuBottomExpander from './menuBottom';

//import pictures
import * as image1 from '/projects/Projekt-2.jpg';
import * as image2 from '/projects/Projekt-1.jpg';


var menuBottom;
var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 300000);
camera.position.set(-900, -200, -900);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

let skySpheres = [];//lista miejsc
let skySphereSrc = [image1.default, image2.default];
for (const src of skySphereSrc) {
    skySpheres.push(createSkysphere(src));
}

//actualna sfera
scene.add(skySpheres[0]);

var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki
controls.minDistance = 500;
controls.maxDistance = 100000;

window.addEventListener('resize', resize, false);
render();



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


function initChange() {
    ///////////// zmienianie miejsca
    let options = document.querySelectorAll(".wizka");
    console.log('inicjalizacja funckcjonalnosci wizek');

    for (var i = 0; i < options.length; i++) {

        if (skySphereSrc[i]) {
            options[i].children[0].src = skySphereSrc[i];
            options[i].classList.add(i.toString());
            options[i].children[1].firstElementChild.firstElementChild.innerText = `Projekt ${i+1}`;
        }
        options[i].addEventListener('click', function () {

            let index = this.classList[1];
            for (const sphere of skySpheres)
                scene.remove(sphere);

            scene.add(skySpheres[index]);
            menuBottomExpander.hide();

            // title.innerHTML = this.innerHTML;
        });
    }
}

export default function VR() {
    initChange();
    menuBottomExpander.init();
    console.log('VR module has been initialized');
    document.querySelector('.projectsView').appendChild(renderer.domElement);
};

