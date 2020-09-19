/**
 * Zwraca absolutną pozycje środka elementu
 * @param {DOM element} element 
 */
export function getPosition(element) {
    var top = 0, left = 0;
    var scrollTop = 0, scrollLeft = 0;
    var h = element.clientHeight / 2, w = element.clientWidth / 2;
    var baseElement = element;

    do {
        top += element.offsetTop || 0;
        left += element.offsetLeft || 0;
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

export function convertImage(BufferData) {

    let TYPED_ARRAY = new Uint8Array(BufferData);

    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
        return data + String.fromCharCode(byte);
    }, '');

    let base64String = btoa(STRING_CHAR);

    return 'data:image/jpg;base64,' + base64String;
}

export default getPosition;

