'use strict';

const is = {
    //Primitives
    arr: arr => Array.isArray(arr) || arr.constructor.name == "Array",
    num: num => !isNaN(num) && typeof num === 'number',
    float: (float => is.num(float) && Math.floor(float) !== float),
    int: int => Number.isInteger(int) || (int => is.num(int) && Math.floor(int) === int),
	hex: h => parseInt(h.toLowerCase(),16).toString(16)===h.toLowerCase(),
	string: str => typeof str === 'string',
    bool: b => b === true || b === false,
    obj: obj => obj && (obj.constructor === Object || obj.constructor === undefined),
    fn: fn => typeof fn === 'function',
    
    def: val => val !== undefined,
    undef: val => val === undefined,
    null: val=>val===null,
    promise: fn => fn && is.fn(fn.then) && is.fn(fn.catch),
    obs: obs => is.fn(obs) && is.fn(obs.set),
    event: ev => is.fn(ev.listen) && is.fn(ev.broadcast),
};
module.exports = is;