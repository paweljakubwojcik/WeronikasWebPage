/**
 * Zwraca absolutną pozycje środka elementu
 * @param {DOM element} element 
 */
function getPosition(element) {
    var top = 0, left = 0;
    var h = element.clientHeight / 2, w = element.clientWidth / 2;
    var baseElement = element;

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

export default getPosition;