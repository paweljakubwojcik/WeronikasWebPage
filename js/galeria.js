import getPosition from './utils';
import makeTilt from './tilt';
import Tween from 'gsap';
import dataObject from './pictures'
let data = dataObject.data;

let images, modal, fullSizeImage, text, folders;

export default {
    init() {

        insertPictures(data)

        images = document.querySelectorAll('.obrazek img');
        modal = document.querySelector('.modal');
        fullSizeImage = document.querySelector('.modal img');
       // text = document.querySelector('.modal p');
        folders = document.querySelectorAll('.folder')

        makeTilt('.obrazek img');

        let delay = .3;

        for (const image of images) {
            delay += 0.05;
            image.addEventListener('click', () => {
                let path = image.getAttribute('data-full-size');
                modal.classList.add('open');
                fullSizeImage.src = path;
                fullSizeImage.setAttribute('data-path', path)
                //text.innerHTML = image.getAttribute('data-text');
            })
        }

        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal'))
                modal.classList.remove('open');
            else if (e.target.localName == 'img') {
                if (getPosition(fullSizeImage).left - e.x < 0)
                    nextImage(true);
                else
                    nextImage(false);
            }
        })

        initFolders();
    }
}



function insertPictures(data) {
    let galeria = document.querySelector('.Galeria')
    data.forEach(folder => {
        
        let folderElement = document.createElement('div')
        folderElement.classList.add('folder')
        folderElement.classList.add('collapsed')

        let p = document.createElement('p')
        p.innerHTML = folder.name;
        folderElement.appendChild(p)

        folder.pictures.forEach(picture => {
            let obrazekElement = document.createElement('div')
            obrazekElement.classList.add('obrazek')

            let img = document.createElement('img')
            img.setAttribute('src', picture.preview)
            img.setAttribute('data-alt', picture.alt)
            img.setAttribute('data-text', picture.name)
            img.setAttribute('data-full-size', picture.src)

            obrazekElement.appendChild(img)
            folderElement.appendChild(obrazekElement)
        })

        galeria.appendChild(folderElement)
    })
}



/**
 * inicjalizuje zachowanie folderów
 */
function initFolders() {
    folders.forEach(folder => {

        // Tween.fromTo(folder,.4,{
        //     opacity:0,
        //     filter: 'blur(100px)'
        // },{
        //     opacity:1,
        //     filter: 'blur(0px)'
        // }).delay(.7)

        //this is definetly NOT way to do that
        folder.addEventListener('animationend', () => {
            folder.style.animation = '';
        })
        folder.addEventListener('animationcancel', () => {
            folder.style.animation = '';
            folder.style.animation = 'folderUnwrap .3s';
        })


        folder.addEventListener('click', function (e) {
            if (e.target == this) {
                folder.classList.toggle('collapsed')
                //folder.style.animation = 'folderUnwrap .3s';
            }
        })
    })
}

/**
 * 
 * @param {boolean} isForward - default is true
 */
function nextImage(isForward) {
    let forward = isForward;
    let fullSizeImage = document.querySelector('.modal img')

    //find image which is being displayed
    let theImage = Array.from(images).filter((element) => {
        return element.getAttribute('data-full-size') === fullSizeImage.getAttribute('data-path');
    });
    //find the next or previous image
    let nextImage = forward ? theImage[0].parentElement.nextElementSibling : theImage[0].parentElement.previousElementSibling;
    if (nextImage) {
        //replace current image with found one
        nextImage = nextImage.firstElementChild;
        fullSizeImage.src = nextImage.getAttribute('data-full-size');
        fullSizeImage.setAttribute('data-path', nextImage.getAttribute('data-full-size'))
       // text.innerHTML = nextImage.getAttribute('data-text');
    }
}
