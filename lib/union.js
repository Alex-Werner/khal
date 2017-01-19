'use strict';

const union = (a, b)=> {
    let obj = {};
    for (let i = a.length - 1; i >= 0; --i)
        obj[a[i]] = a[i];
    for (let i = b.length - 1; i >= 0; --i)
        obj[b[i]] = b[i];
    let unionArr = []
    for (let k in obj) {
        if (obj.hasOwnProperty(k))  // <-- optional
            unionArr.push(obj[k]);
    }
    return unionArr;
};
module.exports = union;