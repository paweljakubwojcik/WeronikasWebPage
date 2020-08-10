import Highway from '/node_modules/@dogstudio/highway/build/highway.module.js';
import Transition from './transition';


const H = new Highway.Core({
    transitions: {
      default: Transition
    }
  });