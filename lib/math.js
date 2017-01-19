'use strict';


const math = {
    radianToDegree: function (angleInRadian) {
        var deg = angleInRadian * (180 / Math.PI);
        return deg;
    },
    degreeToRadian: function (angleInDegree) {
        var rad = angleInDegree * (Math.PI / 180);
        return rad;
    },
    /**
     * Return a random number between min and max (can be positive or negative)
     * min : signed float
     * max : signed float
     * precision : float (1 per default)
     *
     * exemple randomBetweenMinAndMax(0,10) => [0,1,...,9,10]
     * exemple randomBetweenMinAndMax(-10,10,0.1) => [-10.0,-9.9,-9.8,...,9.9,10]
     */
    randomBetweenMinAndMax: function (min, max, precision = 1) {
        if (typeof(precision) === 'undefined') precision = 1;
        var r = Math.floor(Math.random() * (max - min + precision) / precision);
        return (r * precision + min);
    }
    
};
module.exports = math;