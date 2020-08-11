export default function imageExpander(){
    let images = document.querySelectorAll('.Galeria img');
    let modal = document.querySelector('.modal');
    let fullSizeImage = document.querySelector('.modal img');

    for (const image of images) {

        image.addEventListener('click', ()=>{
            let path = image.getAttribute('data-source');
            modal.classList.add('open');
            fullSizeImage.src = image.src;
        })
    }

    modal.addEventListener('click',(e)=>{
        if(e.target.classList.contains('modal'))
        modal.classList.remove('open');
    })


}