

//wysuwane menu główne
let burger = document.querySelector(".burger");
burger.addEventListener('click', function(){
    this.classList.toggle('clickedBurger');
    document.querySelector('.menu').classList.toggle('showed');
});

//przyciski menu głównego
let menuOptions = document.querySelectorAll('.menu > ul >li');
for (const option of menuOptions) {
    option.addEventListener('click', function(){
        document.querySelector('.menu').classList.toggle('showed');
        burger.classList.toggle('clickedBurger');
        //document.title="Weronika Wójcik | "+this.firstChild.innerHTML;
        document.querySelector('.tittle').innerHTML=this.firstChild.innerHTML;
    })
}
// menuOptions[0].addEventListener('click', ()=>{
//     menuButton.classList.remove('showed');
//     document.querySelector('canvas').classList.remove('showed');
// })

// menuOptions[1].addEventListener('click', ()=>{
    
//     document.querySelector('canvas').classList.add('showed')
    
// })