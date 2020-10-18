import { getPosition, convertImage } from './utils';
import { makeTiltOne } from './tilt';
import Tween from 'gsap';
import { cmsBaseURL } from './config'


let images, modal, fullSizeImage, text, folders;
let quantity = 0;
const imagesPerPage = 12;

export default {
    init() {
        quantity = document.querySelectorAll('.folder').length;
        initModal()
        fetchPictures()
    },
    clean() {
        window.removeEventListener('scroll', fetchPictures)
    }
}

function fetchPictures() {
    if (window.scrollY + window.innerHeight - document.querySelector('.wrapper').clientHeight > -2 || quantity === 0) {

        let galeria = document.querySelector('.Galeria')
        let loaderContainer = document.createElement('div')
        loaderContainer.classList.add('loader--container')

        let loader = document.createElement('div')
        loader.classList.add('loader')
        loader.classList.add('loader--galeria')
        loaderContainer.appendChild(loader)

        for (let i = 0; i < 4; i++) {
            loader.appendChild(document.createElement('span'))
        };
        galeria.appendChild(loaderContainer)
        window.removeEventListener('scroll', fetchPictures)

        fetch(`${cmsBaseURL}/folders?_start=${quantity}&_limit=${imagesPerPage}`)
            .then(response => response.json())
            .then(data => {
                insertPictures(data)
                quantity = document.querySelectorAll('.folder').length
                if (data.length !== 0)
                    window.addEventListener('scroll', fetchPictures)
                loaderContainer.remove()
            })
            .catch(err => console.log(err));
    }
}



//inicjalizuje zachowania obrazków
function initPicture(image) {
    modal = document.querySelector('.modal');
    fullSizeImage = document.querySelector('.modal img');
    // text = document.querySelector('.modal p');


    makeTiltOne(image);

    let delay = .3;


    delay += 0.05;
    image.addEventListener('click', () => {
        let id = image.getAttribute('data-id');
        modal.classList.add('open');
        fullSizeImage.src = image.getAttribute('data-full-size');
        fullSizeImage.setAttribute('data-id', id)
        //text.innerHTML = image.getAttribute('data-text');

    })
}

function initModal() {
    modal = document.querySelector('.modal');
    fullSizeImage = document.querySelector('.modal img');
    let arrowRight = document.querySelector('.arrow--right')
    let arrowLeft = document.querySelector('.arrow--left')
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
    fullSizeImage.addEventListener('mousemove', (e) => {
        if (getPosition(fullSizeImage).left - e.x < 0) {
            arrowRight.style.opacity = '1'
            arrowLeft.style.opacity = '0'
        }
        else {
            arrowRight.style.opacity = '0'
            arrowLeft.style.opacity = '1'
        }
    })
    fullSizeImage.addEventListener('mouseleave', (e) => {

        arrowRight.style.opacity = '0'
        arrowLeft.style.opacity = '0'

    })
}



function insertPictures(data) {

    let galeria = document.querySelector('.Galeria')
    data.forEach(folder => {

        let folderElement = document.createElement('div')
        folderElement.classList.add('folder')
        folderElement.classList.add('collapsed')

        let p = document.createElement('p')
        p.innerHTML = folder.Name;
        folderElement.appendChild(p)

        let x = document.createElement('span')
        x.classList.add('iks')
        p.appendChild(x)

        let index = 0;

        folder.Pics.forEach(pic => {

            let obrazekElement = document.createElement('div')
            obrazekElement.classList.add('obrazek')


            let img = document.createElement('img')
            img.setAttribute('src', `${cmsBaseURL}${pic.formats.small.url}`)
            img.setAttribute('data-alt', 'obrazek')
            img.setAttribute('data-text', pic.name)
            img.setAttribute('data-id', pic._id)
            img.setAttribute('data-full-size', `${cmsBaseURL}${pic.url}`)

            obrazekElement.appendChild(img)
            folderElement.appendChild(obrazekElement)
            initPicture(img)
        })

        galeria.appendChild(folderElement)

        initFolders(folderElement);
    })
}



/**
 * inicjalizuje zachowanie folderów
 */
function initFolders(folder) {



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
        if (e.target === this) {
            folder.classList.remove('collapsed')
            //folder.style.animation = 'folderUnwrap .3s';
        }
    })
    folder.querySelector('.iks').addEventListener('click', function (e) {
        if (e.target === this) {
            folder.classList.add('collapsed')
            //folder.style.animation = 'folderUnwrap .3s';
        }
    })

}

/**
 * 
 * @param {boolean} isForward - default is true
 */
function nextImage(isForward) {
    let images = document.querySelectorAll('.obrazek img');
    let forward = isForward;
    let fullSizeImage = document.querySelector('.modal img')
    console.log(fullSizeImage.getAttribute('data-id'))

    //find image which is being displayed
    let theImage = Array.from(images).find((element) => {
        return element.getAttribute('data-id') === fullSizeImage.getAttribute('data-id');
    });
    console.log(images)
    //find the next or previous image
    let nextImage = forward ? theImage.parentElement.nextElementSibling : theImage.parentElement.previousElementSibling;
    if (nextImage && nextImage.localName === 'div') {
        //replace current image with found one
        nextImage = nextImage.firstElementChild;
        fullSizeImage.src = nextImage.getAttribute('data-full-size');
        fullSizeImage.setAttribute('data-id', nextImage.getAttribute('data-id'))
        // text.innerHTML = nextImage.getAttribute('data-text');
    } else {
        //zamknij modal
        let modal = document.querySelector('.modal')
        modal.classList.remove('open');
    }
}
