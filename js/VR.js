//importing necessary modules
import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
//manuBottom
import menuBottomExpander from './menuBottom';

//import pictures
import * as image1 from '/projects/Projekt-2.jpg';
import * as image2 from '/projects/Projekt-1.jpg';
import * as image3 from '/projects/Projekt-3.jpg';


var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 300000);
camera.position.set(-900, -200, -900);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

let skySpheres = [];//lista miejsc
let skySphereSrc = [image1.default, image2.default, image3.default];
for (const src of skySphereSrc) {
    skySpheres.push(createSkysphere(src));
}

//actualna sfera
scene.add(skySpheres[0]);

var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki
controls.minDistance = 500;
controls.maxDistance = 100000;

window.addEventListener('resize', resize);




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

    let wizki = document.querySelector(".wizContainer");

    skySphereSrc.forEach((sphere, i) => {

        let wizka = document.createElement('div');
        wizka.classList.add('wizka');
        wizki.appendChild(wizka);

        let image = document.createElement('img');
        image.src = sphere;
        wizka.appendChild(image);

        wizka.classList.add(i.toString());

        let blankiet = document.createElement('div');
        blankiet.classList.add('blankiet');
        wizka.appendChild(blankiet);

        let text = document.createElement('p');
        text.innerHTML = `Projekt ${i + 1}`;
        blankiet.appendChild(text);

        wizka.addEventListener('click', function () {

            let index = this.classList[1];
            for (const sphere of skySpheres)
                scene.remove(sphere);

            scene.add(skySpheres[index]);
            menuBottomExpander.hide();
        });
    })
}

export default {
    init() {
        render();
        initChange();
        menuBottomExpander.init();
        console.log('VR module has been initialized');
        document.querySelector('.projectsView').appendChild(renderer.domElement);
    }
};

