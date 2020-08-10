import Highway from '/node_modules/@dogstudio/highway/build/highway.module.js';
import Transition from './transition';
import VR from './VR';
import menuBottomExpander from './menuBottom';
import makeTilt from './tilt';
import menu from './menu';

//lista podstron
//na pozniej

//transitions
const H = new Highway.Core({
    transitions: {
        default: Transition
    }
});

let vr, menuBottom;

window.addEventListener('load', () => {

    let location = document.URL.split('/').reverse()[0];
    loadComponents(location);

})

//inicjalizacja odpowiednich modułów
H.on('NAVIGATE_IN', ({ to, trigger, location }) => {
    loadComponents(location.pathname.split('/').reverse()[0]);
});

function loadComponents(location) {
    
    switch (location) {
        case 'wizualizacje.html':
            vr = new VR();
            menuBottom = new menuBottomExpander();
            makeTilt('.wizka');
    }
}

//initialize the menu button functionality
menu();