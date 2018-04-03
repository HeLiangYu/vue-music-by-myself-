// 传入元素和类名
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

// 传入元素、属性名和属性值，如果没有属性值则为属性添加属性值，如果属性存在，则返回属性值 
export function getAttr(el, name, value) {
    let pix = 'data-';
    name = pix + name;
    if (value) {
        return el.setAttribute(name, value);
    }
    return el.getAttribute(name);
}