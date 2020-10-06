import { getPosition, convertImage } from './utils';
import { makeTiltOne } from './tilt';
import Tween from 'gsap';


const cmsBaseURL = 'https://cms-strapi-weronika-wojcik.herokuapp.com'
let images, modal, fullSizeImage, text, folders;

export default {
    init() {
        initModal()
        // fetch('https://cms-for-w-w.herokuapp.com/folders')
        //     .then(response => response.json())
        //     .then(data => {
        //         //insertPictures(data)




        //     })
        //     .catch(err => console.log(err));
        fetch(`${cmsBaseURL}/folders`)
            .then(response => response.json())
            .then(data => {
                insertPictures(data)
                initFolders();
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
    })
}



/**
 * inicjalizuje zachowanie folderów
 */
function initFolders() {
    folders = document.querySelectorAll('.folder')
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
