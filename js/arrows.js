let arrowR = document.querySelector('.arrow-right');
let arrowL = document.querySelector('.arrow-left');

let oneScroll = document.querySelector('.menuBottom > ul > li').offsetWidth + 60;

let scroll = 0;

arrowR.addEventListener('click',scrollRigth);
arrowL.addEventListener('click',scrollLeft);

function scrollRigth(){
    scroll-=oneScroll;
    document.querySelector('.menuBottom > ul').style.transform = `translateX(${scroll}px)`;
    console.log(scroll);
};

function scrollLeft(){
    scroll+=oneScroll;
    document.querySelector('.menuBottom > ul').style.transform = `translateX(${scroll}px)`;
    console.log(scroll);
};