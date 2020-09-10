
let menuButton, menuBottom;

export default {



    init() {

        menuButton = document.querySelector('.menuButton');
        menuBottom = document.querySelector(".menuBottom");

        /////////////// wysuwane menu podstrony projekty
        console.log('menu Bottom has been initialized');
        menuButton.addEventListener('click', () => {
            menuBottom.classList.toggle('showed');
            menuButton.classList.toggle('menuButtonClicked');
        });
    },

    hide() {
        if (menuBottom)
            menuBottom.classList.remove('showed');
        if (menuButton)
            menuButton.classList.remove('menuButtonClicked');
    }
}
