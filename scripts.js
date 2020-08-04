import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 30000);
camera.position.set(-900, -200, -900);

//camera.position.set(0, 0, 100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//tworzenie boxów z lokacjami 
//TO DO - ZMIANA NA ZDJ OD SIS 
function createLocation(location) {
    let materialArray = [];
    let texture_bk = new THREE.TextureLoader().load(location + '/negx.jpg');
    let texture_ft = new THREE.TextureLoader().load(location + '/posx.jpg');
    let texture_up = new THREE.TextureLoader().load(location + '/posy.jpg');
    let texture_dn = new THREE.TextureLoader().load(location + '/negy.jpg');
    let texture_rt = new THREE.TextureLoader().load(location + '/posz.jpg');
    let texture_lf = new THREE.TextureLoader().load(location + '/negz.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++)
        materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    return skybox;
}

let skyboxes = [createLocation('Medborgarplatsen'), createLocation('Parliament'), createLocation('SaintLazarusChurch'), createLocation('SaintLazarusChurch2')]; //lista miejsc


//actualna sfera
let skySphereGeo = new THREE.SphereGeometry(10000, 32, 32);
let textureSphere = new THREE.TextureLoader().load('50983154_1766015216836260_8491205903888941056_n.jpg');
let skySphere = new THREE.Mesh(skySphereGeo, new THREE.MeshBasicMaterial({ map: textureSphere, side: THREE.BackSide }));
scene.add(skySphere);

var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki

window.addEventListener('resize', resize, false);
controls.minDistance = 500;
controls.maxDistance = 1500;

function resize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

render();


/////////////// wysuwane menu
let menu = document.querySelector(".menu");
let menuBar = document.querySelector(".menuBar");

menu.addEventListener('click', () => {
    menuBar.classList.toggle('showed');
});



///////////// zmienianie miejsca
let options = document.querySelectorAll(".menuBar > ul > li");
for (var i = 0; i < options.length; i++) {
    options[i].classList.add(i.toString());

    options[i].addEventListener('click', function () {
        let index = this.classList[0];
        for (const box of skyboxes)
            scene.remove(box);
        scene.add(skyboxes[index]);
    });
}


