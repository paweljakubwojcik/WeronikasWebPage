let tiltElements = document.querySelectorAll('.menuBottom > ul > li');

for (const tiltElement of tiltElements) {

    tiltElement.addEventListener('mousemove', function (e) {
        let x = e.x - getPosition(this).left;
        let y = e.y - getPosition(this).top;

        rotationX = -y/this.clientHeight*12;
        rotationY = x/this.clientWidth*12;

        this.style.transform = `scale(1.05) perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    });

    tiltElement.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });

};
/**
 * Zwraca absolutną pozycje środka elementu
 * @param {DOM element} element 
 */
function getPosition(element) {
    var top = 0, left = 0;
    var h =  element.clientHeight/2, w=element.clientWidth/2;
    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);

    return {
        top: top + h,
        left: left + w
    };
}