export function setStorage(name,value) {
    const targetType = typeof value;
    if(targetType === 'object') {
        localStorage.setItem(name,JSON.stringify(value))
    }else if(['string','number'].indexOf(targetType) !== -1) {
        localStorage.setItem(name,value);
    }else {
        alert('类型错误');
    }
}

export function getStorage(name) {
    if(!name) {
        return ''
    }
    return JSON.parse(localStorage.getItem(name));
}

export function removeStorage(name) {
    name && localStorage.removeItem(name);
}