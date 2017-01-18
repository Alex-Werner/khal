'use strict';

/**
 * Works like console.log, but it return the args passed.
 *
 * If no arg passed, it just return the timestamp
 * If only one arg is passed, it return the arg, if many it return array
 * @returns {Arguments|int}
 */
const cl = function(){
    if (arguments.length == 0) {
        const timestamp = +new Date();
        console.log(timestamp)
        return timestamp
    }
    console.log.apply(console, arguments);
    if (arguments.length == 1) {
        return arguments[0]
    }
    return arguments
}

const ce = function(){
    if (arguments.length == 0) {
        const time = +new Date();
        console.error(time)
        return time
    }
    console.error.apply(console, arguments)
    if (arguments.length == 1) {
        return arguments[0]
    }
    return arguments
};
const clone = obj => JSON.parse(JSON.stringify(obj));


const intersect = function(){
    var i, all, shortest, nShortest, n, len, ret = [], obj={}, nOthers;
    nOthers = arguments.length-1;
    nShortest = arguments[0].length;
    shortest = 0;
    for (i=0; i<=nOthers; i++){
        n = arguments[i].length;
        if (n<nShortest) {
            shortest = i;
            nShortest = n;
        }
    }

    for (i=0; i<=nOthers; i++) {
        n = (i===shortest)?0:(i||shortest); //Read the shortest array first. Read the first array instead of the shortest
        len = arguments[n].length;
        for (var j=0; j<len; j++) {
            var elem = arguments[n][j];
            if(obj[elem] === i-1) {
                if(i === nOthers) {
                    ret.push(elem);
                    obj[elem]=0;
                } else {
                    obj[elem]=i;
                }
            }else if (i===0) {
                obj[elem]=0;
            }
        }
    }
    return ret;
};


const union = (a,b)=>{
    let obj = {};
    for (let i = a.length-1; i >= 0; -- i)
        obj[a[i]] = a[i];
    for (let i = b.length-1; i >= 0; -- i)
        obj[b[i]] = b[i];
    let unionArr = []
    for (let k in obj) {
        if (obj.hasOwnProperty(k))  // <-- optional
            unionArr.push(obj[k]);
    }
    return unionArr;
};


const is={
    //Primitives
    arr:arr => Array.isArray(arr) || arr.constructor.name=="Array",
    num:num => !isNaN(num) && typeof num === 'number',
    float:(float => is.num(float) && Math.floor(float) !== float),
    int:int => Number.isInteger(int) || (int => is.num(int) && Math.floor(int) === int),
    string:str => typeof str === 'string',
    bool:b => b === true || b === false,
    obj:obj => obj && (obj.constructor === Object || obj.constructor === undefined),
    fn:fn => typeof fn === 'function',

    def:val => val !== undefined,
    undef:val => val === undefined,
    promise:fn => fn && is.fn(fn.then) && is.fn(fn.catch),
    obs:obs => is.fn(obs) && is.fn(obs.set),
    event:ev => is.fn(ev.listen) && is.fn(ev.broadcast),
};

module.exports = { cl, ce , union, clone, intersect, is};