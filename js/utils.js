/**
 * Zwraca absolutną pozycje środka elementu
 * @param {DOM element} element 
 */
function getPosition(element) {
    var top = 0, left = 0;
    var scrollTop = 0, scrollLeft = 0;
    var h = element.clientHeight / 2, w = element.clientWidth / 2;
    var baseElement = element;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
        top -= element.parentElement.scrollTop || 0;
        left -= element.parentElement.scrollLeft || 0;
        element = element.offsetParent;
    } while (element);

    element = baseElement;

    do {
        scrollTop -= element.parentElement.scrollTop || 0;
        scrollLeft -= element.parentElement.scrollLeft || 0;
        element = element.parentElement;
    } while (element.parentElement);



    return {
        top: top + scrollTop + h,
        left: left + scrollLeft + w
    };
}

export default getPosition;