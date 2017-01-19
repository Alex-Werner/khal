'use strict';

const ce = function () {
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
module.exports = ce;