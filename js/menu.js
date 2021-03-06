import menuBottomExpander from './menuBottom';


export default {
    init() {

        //wysuwane menu główne
        let burger = document.querySelector(".burger");
        burger.addEventListener('click', function () {
            this.blur();
            this.classList.toggle('clickedBurger');
            document.querySelector('.menu').classList.toggle('showed');
        });

        //przyciski menu głównego
        let menuOptions = document.querySelectorAll('.menu > ul >li');
        for (const option of menuOptions) {
            option.addEventListener('click', function () {
                document.querySelector('.menu').classList.toggle('showed');
                burger.classList.toggle('clickedBurger');
                menuBottomExpander.hide();
            })
        }
    }
}