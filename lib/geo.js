'use strict';
const math = require('./math.js');

class GeoCordinate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

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
module.exports = geo;