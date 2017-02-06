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
     * Return the levenshtein distance between a and b
     * @param String a
     * @param String b
     * @return Array arr
     */
    levenshtein:function(a, b){
        var cost;
        var m = a.length;
        var n = b.length;

        // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
        if (m < n) {
            var c = a; a = b; b = c;
            var o = m; m = n; n = o;
        }

        var arr = []; arr[0] = [];
        for (var c = 0; c < n + 1; ++c) {
            arr[0][c] = c;
        }

        for (var i = 1; i < m + 1; ++i) {
            arr[i] = []; arr[i][0] = i;
            for ( var j = 1; j < n + 1; ++j ) {
                cost = a.charAt( i - 1 ) === b.charAt( j - 1 ) ? 0 : 1;
                arr[i][j] = Math.min( arr[i-1][j] + 1, arr[i][j-1] + 1, arr[i-1][j-1] + cost );
            }
        }

        return arr;
    },
    stringDistance:function(a,b){
        let distArray = math.levenshtein(a,b);
        return distArray[distArray.length - 1][distArray[distArray.length - 1].length - 1];
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