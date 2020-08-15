import getPosition from './utils';
import makeTilt from './tilt';
import Tween from 'gsap';

let images, modal, fullSizeImage, text;

export default function imageExpander() {
    images = document.querySelectorAll('.obrazek img');
    modal = document.querySelector('.modal');
    fullSizeImage = document.querySelector('.modal img');
    text = document.querySelector('.modal p');

    makeTilt('.obrazek img');

    let delay = .3;

    for (const image of images) {
        delay+=0.05;
        image.addEventListener('click', () => {
            let path = image.getAttribute('data-source');
            modal.classList.add('open');
            fullSizeImage.src = image.src;
            text.innerHTML = image.getAttribute('data-text');
        })

        Tween.from(image,.5,{
            x: window.innerWidth,
            opacity:.3
        }).delay(delay)

    }

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal'))
            modal.classList.remove('open');
        else if (e.target.localName == 'img') {
            if (getPosition(fullSizeImage).left - e.x < 0)
                nextImage();
            else
                previousImage();
        }
    })
}

function nextImage() {
    let theImage = Array.from(images).filter((element) => {
        return element.src == fullSizeImage.src;
    })

    let nextImage = theImage[0].parentElement.nextElementSibling;
    if (nextImage) {
        nextImage = nextImage.firstElementChild;
        fullSizeImage.src = nextImage.src;
        text.innerHTML = nextImage.getAttribute('data-text');
    }
}
function previousImage() {

    let theImage = Array.from(images).filter((element) => {
        return element.src == fullSizeImage.src;
    })

    let previousImage = theImage[0].parentElement.previousElementSibling;
    if (previousImage) {
        previousImage = previousImage.firstElementChild;
        fullSizeImage.src = previousImage.src;
        text.innerHTML = previousImage.getAttribute('data-text');
    }
}