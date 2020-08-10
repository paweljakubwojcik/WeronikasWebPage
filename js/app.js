import Highway from '/node_modules/@dogstudio/highway/build/highway.module.js';
import Transition from './transition';
import VR from './VR';
import menuBottomExpander from './menuBottom';
import makeTilt from './tilt';

//transitions
const H = new Highway.Core({
    transitions: {
        default: Transition
    }
});

let vr, menuBottom;

window.addEventListener('load',()=>{
    vr = new VR();
    menuBottom = new menuBottomExpander();
    makeTilt('wizka');
})

//inicjalizacja odpowiednich modułów
H.on('NAVIGATE_IN', ({ to, trigger, location }) => {

    //console.log(location.pathname);
    switch (location.pathname) {
        case '/wizualizacje.html':
            vr = new VR();
            menuBottom = new menuBottomExpander();
            makeTilt('.wizka');
    }

});

