import Highway from '/node_modules/@dogstudio/highway/build/highway.js';

// GSAP Library
import Tween from 'gsap';

// przejscie
class Transition extends Highway.Transition {
  in({ from, to, done }) {

    to.style.position = 'absolute';
    to.style.top = '0';
    to.style.zIndex = '1';
    to.style.height = '100vh';
    to.style.width = '100vw';
    from.style.position = 'absolute';
    from.style.top = '0';
    from.style.zIndex = '1';
    from.style.height = '100vh';
    from.style.width = '100vw';

    let name = to.getAttribute('data-router-view').toUpperCase();
    let tittle = document.querySelector('.tittle');

    let t1 = Tween.timeline();

    //zmiana napisu w .tittle
    t1.to(tittle, .5,
      {
        filter: 'blur(8px)',
        onComplete: () => {
          if (name === 'HOME')
            tittle.innerHTML = 'Interior Designer';
          else if (name === 'WIZUALIZACJE')
            tittle.innerHTML = 'Wnętrza 360';
          else
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

    
    Tween.fromTo(from, .7,
      { x: 0 },
      {
        x: -window.innerWidth,
        onComplete: () => {
          from.remove();
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
          done();
        }
      }
    );
  }

  out({ done }) {
    window.scrollTo(0, 0)
    done();
  }
}

export default Transition;