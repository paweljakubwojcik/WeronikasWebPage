//importing necessary modules
import * as THREE from '/node_modules/three/build/three.module.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
//manuBottom
import menuBottomExpander from './menuBottom';
import makeTilt from './tilt';

import { convertImage } from './utils'

var scene = new THREE.Scene();
var aspectRatio = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(80, aspectRatio, 0.1, 300000);
camera.position.set(-900, -200, -900);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

let skySpheres = [];//lista miejsc
let skySphereSrc = [];
// for (const src of skySphereSrc) {
//     skySpheres.push(createSkysphere(src));
// }



//actualna sfera
var controls = new OrbitControls(camera, renderer.domElement); //poruszanie się za pomocą myszki
controls.minDistance = 500;
controls.maxDistance = 100000;

window.addEventListener('resize', resize);
// controls.addEventListener('change', render)




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
    requestAnimationFrame(render)
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

        let blankiet = document.createElement('div');
        blankiet.classList.add('blankiet');
        wizka.appendChild(blankiet);

        let text = document.createElement('p');
        text.innerHTML = `Projekt ${i + 1}`;
        blankiet.appendChild(text);

        //wizka.setAttribute('meta-id', i)

        wizka.addEventListener('click', function () {

            skySpheres.forEach(sphere => { scene.remove(sphere); })
            scene.add(skySpheres[i]);
            render()
            menuBottomExpander.hide();
        });


    })
    makeTilt('.wizka');
}

export default {
    init() {
        const cmsBaseURL = 'https://cms-strapi-weronika-wojcik.herokuapp.com'
        console.log(cmsBaseURL + '/360-pics')
        if (skySpheres.length === 0) {
            fetch(cmsBaseURL + '/360-pics')
                .then(response => response.json())
                .then(data => {
                    skySphereSrc = data.map((image) => image.img.formats.small.url)
                    skySpheres = data.map((image) => createSkysphere(image.img.url))
                    scene.add(skySpheres[0]);
                    document.querySelector('.loader').remove();
                    initChange();
                    render();
                    console.log('VR module has been initialized');
                }).catch(err => console.log(err));
        } else {
            document.querySelector('.loader').remove();
            initChange();
            render();
        }
        menuBottomExpander.init();

        document.querySelector('.projectsView').appendChild(renderer.domElement);

    }
};

