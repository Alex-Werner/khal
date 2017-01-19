'use strict';
const is = require('./is');
const clone = (obj) => {
    if(is.undef(obj) || is.null(obj)){  return obj;}
    if(obj.constructor.name=="String") return (obj);
    if(obj.constructor.name=="Date") return new Date(obj.valueOf());
    if(obj.constructor.name=="Array") return JSON.parse(JSON.stringify(obj));
    if(obj.constructor.name=="Number") return (obj);
    if(obj.constructor.name=="Object"){
        let _clone = {};
        for(var i=0; i<Object.keys(obj).length; i++){
            let k = Object.keys(obj)[i];
            let v = obj[k];
            _clone[k]=clone(v);
        }
        return _clone;
    }else{
        return (obj);
    }
    
}
module.exports = clone;