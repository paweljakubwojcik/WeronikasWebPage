import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 300000);
camera.position.set(-900,-200,-900);

//camera.position.set(0, 0, 100);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//tworzenie boxów z lokacjami 
/**
 * create an mesh object sphere from 360 picture
 * @param {String} location - a path  to picture 
 */
function createSkysphere(location) {

    let skySphereGeo = new THREE.SphereGeometry(100000, 100,100 );
    let textureSphere = new THREE.TextureLoader().load(location);
    let skySphere = new THREE.Mesh(skySphereGeo, new THREE.MeshBasicMaterial({ map: textureSphere, side: THREE.BackSide }));
    return skySphere;
}

let skySpheres =  [createSkysphere('projects/Projekt-2.jpg')];//lista miejsc



//actualna sfera
scene.add(skySpheres[0]);

var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki
controls.minDistance = 500;
controls.maxDistance = 100000;

window.addEventListener('resize', resize, false);

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


///////////// zmienianie miejsca
let options = document.querySelectorAll(".menuBar > ul > li");

for (var i = 0; i < options.length; i++) {
    options[i].classList.add(i.toString());
    
    options[i].addEventListener('click', function(){
        let title = document.querySelector('.tittle');
        let index = this.classList[0];
        for (const sphere of skySpheres)
            scene.remove(sphere);
    
        scene.add(skySpheres[index]);

        title.innerHTML = this.innerHTML;
    });
}


/////////////// wysuwane menu podstrony projekty
let menuButton = document.querySelector(".menuButton");
let menuBar = document.querySelector(".menuBar");

menuButton.addEventListener('click', () => {
    menuBar.classList.toggle('showed');
});

//wysuwane menu główne
let burger = document.querySelector(".burger");
burger.addEventListener('click', function(){
    this.classList.toggle('clicked');
    document.querySelector('.menu').classList.toggle('showed');
});

//przyciski menu głównego
let menuOptions = document.querySelectorAll('.menu > ul >li');
for (const option of menuOptions) {
    option.addEventListener('click', function(){
        document.querySelector('.menu').classList.toggle('showed');
        burger.classList.toggle('clicked');
        document.title="Weronika Wójcik | "+this.innerHTML;
        document.querySelector('.tittle').innerHTML=this.innerHTML;
    })
}
menuOptions[0].addEventListener('click', ()=>{
    menuButton.classList.remove('showed');
    document.querySelector('canvas').classList.remove('showed');
})

menuOptions[1].addEventListener('click', ()=>{
    menuButton.classList.add('showed');
    document.querySelector('canvas').classList.add('showed')
    
})
