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
const clone = obj => JSON.parse(JSON.stringify(obj));


const intersect = function () {
    var i, all, shortest, nShortest, n, len, ret = [], obj = {}, nOthers;
    nOthers = arguments.length - 1;
    nShortest = arguments[0].length;
    shortest = 0;
    for (i = 0; i <= nOthers; i++) {
        n = arguments[i].length;
        if (n < nShortest) {
            shortest = i;
            nShortest = n;
        }
    }
    
    for (i = 0; i <= nOthers; i++) {
        n = (i === shortest) ? 0 : (i || shortest); //Read the shortest array first. Read the first array instead of the shortest
        len = arguments[n].length;
        for (var j = 0; j < len; j++) {
            var elem = arguments[n][j];
            if (obj[elem] === i - 1) {
                if (i === nOthers) {
                    ret.push(elem);
                    obj[elem] = 0;
                } else {
                    obj[elem] = i;
                }
            } else if (i === 0) {
                obj[elem] = 0;
            }
        }
    }
    return ret;
};


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


const is = {
    //Primitives
    arr: arr => Array.isArray(arr) || arr.constructor.name == "Array",
    num: num => !isNaN(num) && typeof num === 'number',
    float: (float => is.num(float) && Math.floor(float) !== float),
    int: int => Number.isInteger(int) || (int => is.num(int) && Math.floor(int) === int),
    string: str => typeof str === 'string',
    bool: b => b === true || b === false,
    obj: obj => obj && (obj.constructor === Object || obj.constructor === undefined),
    fn: fn => typeof fn === 'function',
    
    def: val => val !== undefined,
    undef: val => val === undefined,
    promise: fn => fn && is.fn(fn.then) && is.fn(fn.catch),
    obs: obs => is.fn(obs) && is.fn(obs.set),
    event: ev => is.fn(ev.listen) && is.fn(ev.broadcast),
};

class GeoCordinate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
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
const geo = {
    create: (latitude, longitude)=> {
        return new GeoCordinate(latitude, longitude)
    },
    earth: {
        "radius": 6371//km, 6371000 in meters
    },
    convert: function (float) {
        return {
            toMiles: function () {
                return float * 0.000621371192;
            },
            toMeters: function () {
                return float * 1609.344;
            }
        }
    },
    /* Calculate distance in kilometers from degree lat and lon data
     *  arrivalPoint:{lat:43.59, long:1.45}
     *
     *  See more : https://en.wikipedia.org/wiki/Haversine_formula
     * TODO : IS VALUE GIVEN ARE NUMBER ? ARE THEY SIGNED DECIMAL REPRESENTING DEGREES ?
     */
    geocordinateStringToGeoCoordinateObject: function (string) {
        var st = string.split(',');
        return this.create(st[0], st[1]);
    },
    calculateDistance(startingPoint, arrivalPoint, unit = "km", precision = 4){
        //khal.math should be used using a require if you ends up splitting the file (which you should TODO) :D
        function checkValidObject(obj) {
            if (
                !obj || !obj.constructor.name == 'GeoCordinate' || !obj.hasOwnProperty('latitude') || !obj.hasOwnProperty('longitude')) {
                throw new Error("Arguments should be valid GeoCordinate elements.");
            }
        }
        
        checkValidObject(startingPoint);
        checkValidObject(arrivalPoint);
        
        let radius = this.earth.radius;
        let dLat = math.degreeToRadian(arrivalPoint.latitude - startingPoint.latitude);//Convert to radians
        let dLon = math.degreeToRadian(arrivalPoint.longitude - startingPoint.longitude);
        /* Because despite the flat earth society officials, earth is still kind of a spherical stuff */
        let a =
            Math.sin(dLat / 2) *
            Math.sin(dLat / 2) +
            Math.cos(math.degreeToRadian(startingPoint.latitude)) *
            Math.cos(math.degreeToRadian(arrivalPoint.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);//For any complains, please ask the QA-call center of https://en.wikipedia.org/wiki/James_Inman for me
        
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = radius * c; // Distance
        
        switch (unit) {
            case "km":
                break;
            case "m":
                d *= 1000;
                break;
            case "miles":
                d = this.convert(d * 1000).toMiles();
                break;
            default:
                break;
        }
        return parseFloat(d.toFixed(precision));
        
    }
};
const misc = {
    formatByteSize: function (bytes, binary = true) {
        function outputSIForm(bytes) {
            if (bytes < 1000) return bytes + " bytes";
            else if (bytes < 1000000) return (bytes / 1000).toFixed(3) + " KB";
            else if (bytes < 1000000000) return (bytes / 1000000).toFixed(3) + " MB";
            else if (bytes < 1000000000000) return (bytes / 1000000000).toFixed(3) + " GB";
            else if (bytes < 1000000000000000) return (bytes / 1000000000000).toFixed(3) + " TB";
            else if (bytes < 1000000000000000000) return (bytes / 1000000000000000).toFixed(3) + " PB";
            else return (bytes / 1000000000000000000000).toFixed(3) + " EB ";
        };
        function outputIEECForm(bytes) {
            if (bytes < 1024) return bytes + " bytes";
            else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
            else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
            else if (bytes < 1099511627776) return (bytes / 1073741824).toFixed(3) + " GiB";
            else if (bytes < 1125899906842624) return (bytes / 1099511627776).toFixed(3) + " TiB";
            else if (bytes < 1125899906842624 * 1024) return (bytes / 1125899906842624).toFixed(3) + " PiB";
            else return (bytes / 1125899906842624 * 1024 * 1024).toFixed(3) + " EiB";
        }
        
        return binary ? outputIEECForm(bytes) : outputSIForm(bytes);
    },
    sizeOfObjectReadable:function(object,binary=true){
      return this.formatByteSize(this.sizeOfObject(object),binary);  
    },
    sizeOfObject: function (object) {
        "use strict";
        /**
         * Byte sizes are taken from ECMAScript Language Specification
         * http://www.ecma-international.org/ecma-262/5.1/
         * http://bclary.com/2004/11/07/#a-4.3.16
         */
        
        var ECMA_byteSize = {
            STRING: 2,
            BOOLEAN: 4,
            NUMBER: 8
        };
        var objects = [object];
        var bytes = 0;
        var SIZE_FOR_UNRECOGNIZED_TYPE = 0;
        
        
        for (var index = 0; index < objects.length; index++) {
            if (is.obj(object)) {
                var stats = {
                    size: function (obj) {
                        if (is.string(obj)) {
                            return obj.length * ECMA_byteSize.STRING;
                        }
                        if (is.bool(obj)) {
                            return ECMA_byteSize.BOOLEAN;
                        }
                        if (is.num(obj)) {
                            return ECMA_byteSize.NUMBER;
                        }
                        return SIZE_FOR_UNRECOGNIZED_TYPE;
                    },
                    keys: [], values: [],
                    addKey: function (key) {
                        this.keys.push(key);
                    },
                    addKeyValue: function (key, value) {
                        this.keys.push(key);
                        this.values.push(value);
                    },
                    print: function () {
                        console.log('---\nkeys:\t', this.keys.length);
                        console.log('values:\t', this.values.length, '\n---');
                    },
                    calculateBytes: function () {
                        var all = this.keys.concat(this.values);
                        
                        var map = all.map(function (x) {
                            return stats.size(x);
                        });
                        
                        return map.reduce(function (x, y) {
                            return x + y;
                        }, 0);
                    }
                };
                var collectKeysVal = function (object, stats) {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            if (is.obj(object[prop])) {
                                // this key is a reference, count the key and proceed with the referenced value
                                stats.addKey(prop);
                                collectKeysVal(object[prop], stats);
                            } else {
                                stats.addKeyValue(prop, object[prop]);
                            }
                        }
                    }
                    return object;
                };
                
                try {
                    collectKeysVal(object, stats);
                    
                } catch (e) {
                    
                }
                bytes = stats.calculateBytes();
                
            } else if (is.string(object)) {
                bytes = object.length * ECMA_byteSize.STRING;
            } else if (is.bool(object)) {
                bytes = ECMA_byteSize.BOOLEAN;
            } else if (is.num(object)) {
                bytes = ECMA_byteSize.NUMBER;
            }
            return bytes;
        }
    }
};
const regex = {
    types:{
        RFC4122V4UUIDRegex:/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/,
        emailUnicodeRegex:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        emailRegex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        usernameRegex:/^[A-Za-z0-9_.]{3,}$/,
        passwordRegex:/^[a-zA-Z0-9!@#$%^&*]{6,36}$/,
        genderRegex:/^(Male|Female)$/,
        birthdateRegex:/^(([0-9]{4})\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1]))$/
    },
    regTest:(regex,val)=> regex.test(val),
    isUUIDV4:(uuid)=>regex.regTest(new RegExp(regex.types.RFC4122V4UUIDRegex),uuid),
    isUsername:(username)=>regex.regTest(new RegExp(regex.types.usernameRegex,'i'),username),
    isBirthdate:(birthday)=>regex.regTest(new RegExp(regex.types.birthdateRegex),birthday),
    isGender:(gender)=>regex.regTest(new RegExp(regex.types.genderRegex), gender),
    isPassword:(passwd)=>regex.regTest(new RegExp(regex.types.passwordRegex), passwd),
    isEmail:(email)=>regex.regTest(new RegExp(regex.types.emailRegex,'i'),email),
    isUnicodeEmail:(email)=>regex.regTest(new RegExp(regex.types.emailUnicodeRegex,'i'),email),
    
};
module.exports = {cl, ce, union, clone, intersect, is, geo, math, misc, regex};