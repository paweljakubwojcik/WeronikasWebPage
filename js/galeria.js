import getPosition from './utils';
import makeTilt from './tilt';
import Tween from 'gsap';



let images, modal, fullSizeImage, text, folders;

export default {
    init() {

        fetch('https://cms-for-w-w.herokuapp.com/folders')
            .then(response => response.json())
            .then(data => {
                insertPictures(data)


                initFolders();

            })
            .catch(err => console.log(err));
    }
}


//inicjalizuje zachowania obrazków
function initPictures() {
    images = document.querySelectorAll('.obrazek img');
    modal = document.querySelector('.modal');
    fullSizeImage = document.querySelector('.modal img');
    // text = document.querySelector('.modal p');


    makeTilt('.obrazek img');

    let delay = .3;

    for (const image of images) {
        delay += 0.05;
        image.addEventListener('click', () => {
            let id = image.getAttribute('data-id');
            modal.classList.add('open');
            fullSizeImage.src = image.src;
            fullSizeImage.setAttribute('data-id', id)
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

}



function insertPictures(data) {

    let galeria = document.querySelector('.Galeria')
    data.forEach(folder => {

        let folderElement = document.createElement('div')
        folderElement.classList.add('folder')
        folderElement.classList.add('collapsed')

        let p = document.createElement('p')
        p.innerHTML = folder.title;
        folderElement.appendChild(p)

        let index = 0;

        folder.items.forEach(picture => {

            fetch(`https://cms-for-w-w.herokuapp.com/folders/${picture}`)
                .then(response => response.json())
                .then(pic => {

                    index++;
                    let obrazekElement = document.createElement('div')
                    obrazekElement.classList.add('obrazek')


                    let img = document.createElement('img')
                    img.setAttribute('src', convertImage(pic.img.data))
                    img.setAttribute('data-alt', 'obrazek')
                    img.setAttribute('data-text', pic.title)
                    img.setAttribute('data-id', pic._id)

                    obrazekElement.appendChild(img)
                    folderElement.appendChild(obrazekElement)
                    //na koniec
                    if (index === folder.items.length)
                        initPictures();
                })
                .catch(err => console.log(err));


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
    let forward = isForward;
    let fullSizeImage = document.querySelector('.modal img')

    //find image which is being displayed
    let theImage = Array.from(images).filter((element) => {
        return element.getAttribute('data-id') === fullSizeImage.getAttribute('data-id');
    });
    //find the next or previous image
    let nextImage = forward ? theImage[0].parentElement.nextElementSibling : theImage[0].parentElement.previousElementSibling;
    if (nextImage) {
        //replace current image with found one
        nextImage = nextImage.firstElementChild;
        fullSizeImage.src = nextImage.src;
        fullSizeImage.setAttribute('data-id', nextImage.getAttribute('data-id'))
        // text.innerHTML = nextImage.getAttribute('data-text');
    }
}

function convertImage(BufferData) {

    let TYPED_ARRAY = new Uint8Array(BufferData);

    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');

    let base64String = btoa(STRING_CHAR);

    return 'data:image/jpg;base64,' + base64String;
}
