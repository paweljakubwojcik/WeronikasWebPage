/////////////// wysuwane menu podstrony projekty
let menuButtonContainer = document.querySelector(".menuButtonContainer");
let menuButton = document.querySelector('.menuButton');
let menuBottom = document.querySelector(".menuBottom");

menuButton.addEventListener('click', () => {
    menuBottom.classList.toggle('showed');
    menuButton.classList.toggle('menuButtonClicked');
});