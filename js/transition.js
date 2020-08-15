import Highway from '/node_modules/@dogstudio/highway/build/highway.js';

// GSAP Library
import Tween from 'gsap';

// przejscie
class Transition extends Highway.Transition {
  in({ from, to, done }) {

    to.style.position = 'absolute';
    to.style.top = '0';
    to.style.zIndex = '3';
    let name = to.getAttribute('data-router-view').toUpperCase();

    let tittle = document.querySelector('.tittle');
    let t1 = Tween.timeline();

    //zmiana napisu w .tittle
    t1.to(tittle, .5,
      {
        filter: 'blur(8px)',
        onComplete: () => {
          tittle.innerHTML = name;
        }
      }
    ).to(tittle, .5,
      {
        filter: 'blur(0px)',
        onComplete: () => {
          tittle.removeAttribute('style');
        }
      }
    );

    //wysuwanie się podstrony
    Tween.fromTo(to, .7,
      { x: window.innerWidth },
      {
        x: 0,
        onComplete: () => {
          to.removeAttribute('style');
          from.remove();
          done();
        }
      }
    );
  }

  out({ done }) {
    done();
  }
}

export default Transition;