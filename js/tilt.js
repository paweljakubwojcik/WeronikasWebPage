import { getPosition } from './utils';
/**
 * Adds cool tilt effect to all elements refrenced by querySelector
 * @param {String} querySelector 
 */
function makeTilt(querySelector) {

    let tiltElements = document.querySelectorAll(querySelector);

    for (const tiltElement of tiltElements) {

        tiltElement.addEventListener('mousemove', function (e) {
            // console.log('doin a tilt');
            let x = e.x - getPosition(this).left;
            let y = e.y - getPosition(this).top;

            let rotationX = -y / this.clientHeight * 12;
            let rotationY = x / this.clientWidth * 12;

            this.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        });

        tiltElement.addEventListener('mouseleave', function () {
            this.style.transform = '';
        });

    };
}




export default makeTilt;