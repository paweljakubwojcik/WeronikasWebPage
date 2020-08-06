/////////////// wysuwane menu podstrony projekty
let menuButton = document.querySelector(".menuButton");
let menuBottom = document.querySelector(".menuBottom");

menuButton.addEventListener('click', () => {
    menuBottom.classList.toggle('showed');
    menuButton.classList.toggle('menuButtonClicked');
});