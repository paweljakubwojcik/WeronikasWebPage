
let menuButton;
let menuBottom;
class menuBottomExpander {

    constructor() {

        menuButton = document.querySelector('.menuButton');
        menuBottom = document.querySelector(".menuBottom");

        /////////////// wysuwane menu podstrony projekty
        console.log('menu Bottom has been initialized');
        menuButton.addEventListener('click', () => {
            menuBottom.classList.toggle('showed');
            menuButton.classList.toggle('menuButtonClicked');
        });
    }

    hide() {
        menuBottom.classList.remove('showed');
        menuButton.classList.toggle('menuButtonClicked');
    }
}

export default menuBottomExpander;