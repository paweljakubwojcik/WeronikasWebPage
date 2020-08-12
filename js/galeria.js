import getPosition from './utils';
import makeTilt from './tilt';

let images, modal, fullSizeImage, text;

export default function imageExpander() {
    images = document.querySelectorAll('.Galeria img');
    modal = document.querySelector('.modal');
    fullSizeImage = document.querySelector('.modal img');
    text = document.querySelector('.modal p');

    makeTilt('.Galeria img');

    for (const image of images) {

        image.addEventListener('click', () => {
            let path = image.getAttribute('data-source');
            modal.classList.add('open');
            fullSizeImage.src = image.src;
            text.innerHTML = image.getAttribute('data-text');
        })
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

    let nextImage = theImage[0].nextElementSibling;
    if (nextImage) {
        fullSizeImage.src = nextImage.src;
        text.innerHTML = nextImage.getAttribute('data-text');
    }
}

function previousImage() {

    let theImage = Array.from(images).filter((element) => {
        return element.src == fullSizeImage.src;
    })

    let previousImage = theImage[0].previousElementSibling;
    if (previousImage) {
        fullSizeImage.src = previousImage.src;
        text.innerHTML = previousImage.getAttribute('data-text');
    }
}