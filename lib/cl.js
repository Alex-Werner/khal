'use strict';

/**
 * Works like console.log, but it return the args passed.
 *
 * If no arg passed, it just return the timestamp
 * If only one arg is passed, it return the arg, if many it return array
 * @returns {Arguments|int}
 */
const cl = function () {
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
module.exports = cl;