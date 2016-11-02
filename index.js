'use strict';

/**
 * Works like console.log, but it return the args passed.
 *
 * If no arg passed, it just return the timestamp
 * If only one arg is passed, it return the arg, if many it return array
 * @returns {Arguments}
 */
const cl = function () {
    if (arguments.length == 0) {
        var timestamp = new Date().getTime();
        console.log(timestamp);
        return timestamp;
    }
    console.log.apply(console, arguments);
    if (arguments.length == 1) {
        return arguments[0];
    }
    return arguments;
};

const ce=function(){
    if(arguments.length==0){
        var t = new Date().getTime();
        console.error(t);
        return t;
    }
    console.error.apply(console, arguments);
    if(arguments.length==1){
        return arguments[0];
    }
    return arguments;
};
const clone = function(obj){
	return JSON.parse(JSON.stringify(obj));
}
module.exports ={
    cl:cl,
    ce:ce
};