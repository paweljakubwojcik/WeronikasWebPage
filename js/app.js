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


//inicjalizacja odpowiednich modułów podczas refresha oraz przy pierwszym wejściu na witryne
window.addEventListener('load', () => {
    let location = document.URL.split('/').reverse()[0];
    loadComponents(location);
})

//inicjalizacja odpowiednich modułów podczas przejscia na podstrony
H.on('NAVIGATE_IN', ({ to, trigger, location }) => {
    loadComponents(location.pathname.split('/').reverse()[0]);
});

/**
 * ładuje odpowiednie komponenty
 * @param {String} location - nazwa pliku do którego odnoszą się funkcjonalnosci
 */
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