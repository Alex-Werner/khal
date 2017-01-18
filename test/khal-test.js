const { cl, ce , union, clone, intersect, is, geo, math , misc, regex} = require('../index.js');
const should = require('should');

describe('- Khal utils ', function() {
    describe('#cl', function() {
        it('should return the string displayed in log',function(){
            let str = "Totorodu54";
            let ret = cl(str);
            
            ret.should.be.equal(str);
        })
        it('should return the timestamp by default',function(){
            let now = new Date().getTime();
            let ret = cl();
            
            ret.should.be.equal(now);
        })
    });
    describe('ce', function() {
        it('should return the string displayed in log',function(){
            let str = "Totorodu54";
            let ret = ce(str);

            ret.should.be.equal(str);
        })
        it('should return the timestamp by default',function(){
            let now = new Date().getTime();
            let ret = ce();

            ret.should.be.equal(now);
        })
    });
    describe('clone', function() {
        let o = {
            a:"i",
            b:"o",
            c:{
                e:"f",
                g:{
                    nest:"ted",
                    arr:['a',11225,695,{toto:"tata",x:"y"}]
                }
            },
            d:['je','suis','un','array'],
            yy:123999445,
            yz:-1155544
        };
        it('should clone',function(){
            
            
            let o_clone = clone(o);
            o_clone.should.be.deepEqual(o);
        })
        it('should not be a ref',function(){
            let o_clone = clone(o);
            delete o["a"];
            o_clone.should.not.be.deepEqual(o);
        })
    });
    describe('intersect', function() {
        let arr1 = ['1',2,3,4,5,"6"];
        let arr2 = ['6',1,'2',5];
        it('should intersect two array',function(){
            let arr3 = intersect(arr1, arr2);
            arr3.should.be.containDeep([5,"6"]);
        });
        
    });
    describe('union', function() {
        let arr1 = ['1',2,3,4,5,"6"];
        let arr2 = ['6',1,'2',5];
        it('should union two array',function(){
            let arr3 = union(arr1, arr2);
            arr3.should.be.containDeep([1,'2',3,4,5,'6']);
        });
    });
    describe('.is helpers',function(){
        let fn = function(){ return "toto";};
        let str = "toto";
        let int = 42;
        let float = 42.5;
        let arr = ['to','to'];
        let bool=true;
        it('is a function',function(){
           (is.fn(fn)).should.be.equal(true);
           (is.fn(str)).should.not.be.equal(true);
           (is.fn(int)).should.not.be.equal(true);
       });
        it('is an array', function(){
            (is.arr(arr)).should.be.equal(true);
        });
        it('is an int', function(){
            (is.int(int)).should.be.equal(true);
            (is.int(float)).should.not.be.equal(true);

        });
        it('is an float',function(){
            (is.float(float)).should.be.equal(true);
            (is.float(int)).should.not.be.equal(true);
        }) 
        it('is an string',function(){
            (is.string(str)).should.be.equal(true);
        })
        it('is a bool',function () {
            (is.bool(bool).should.be.equal(true))
        })
    });
    describe('Geo',function () {
        it('should create a GeoCordinate object',function(){
            let geoTlse = geo.create("43.597446", "1.454469");
            let geoBdx = geo.create("44.852723","-0.567896");
            geoBdx.constructor.name.should.be.equal('GeoCordinate');
            geoTlse.should.have.property('latitude');
            geoTlse.should.have.property('longitude');
            geoTlse.latitude.should.be.string;
            geoTlse.latitude.should.be.equal("43.597446");
            geoTlse.longitude.should.be.string;
            geoTlse.longitude.should.be.equal("1.454469");
        });
        it('should handle a geostring to geoCoordinate Object',function(){
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
    
            geoTlse.constructor.name.should.be.equal('GeoCordinate');
            geoTlse.should.have.property('latitude');
            geoTlse.should.have.property('longitude');
            geoTlse.latitude.should.be.string;
            geoTlse.latitude.should.be.equal("43.597446");
            geoTlse.longitude.should.be.string;
            geoTlse.longitude.should.be.equal("1.454469");
        })
        it('should give a distance in KM',function(){
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723","-0.567896");
    
            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx);
            distanceInKm.should.be.equal(213.1807);
            geo.calculateDistance(geoTlse, geoBdx, null, 0).should.be.equal(213);
        });
        it('should give a distance in meters',function(){
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723","-0.567896");
        
            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx,'m',5);
            distanceInKm.should.be.equal(213180.73848);
        });
        it('should give a distance in miles',function(){
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723","-0.567896");
        
            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx,'miles',5);
            distanceInKm.should.be.equal(132.46437);
        });
    })
    describe('Math',function(){
        it('should transform rad in deg and inverse',function(){
            let rad = 1.5707963267948966;
            let deg = (math.radianToDegree(rad));
            math.radianToDegree(Math.PI).should.be.equal(180);
            deg.should.be.equal(90);
        });
        it('should transform deg in rad',function(){
            let deg = 90;
            let rad = math.degreeToRadian(deg);
            rad.should.be.equal(1.5707963267948966);
            math.degreeToRadian(180).should.be.equal(Math.PI);    
        });
    })
    describe('Misc',function(){
        it('should transform bytes into readable form',function(){
            let bytes = 8;
            misc.formatByteSize(bytes).should.be.equal('8 bytes');
            misc.formatByteSize(bytes,false).should.be.equal('8 bytes');
            misc.formatByteSize(3171,false).should.be.equal('3.171 KB');
            misc.formatByteSize(3171).should.be.equal('3.097 KiB');
            misc.formatByteSize(Number.MAX_SAFE_INTEGER).should.be.equal('8.000 PiB');
            misc.formatByteSize(Number.MAX_SAFE_INTEGER,false).should.be.equal('9.007 PB');
            misc.formatByteSize(Number.MAX_VALUE).should.be.equal('1.6742321987285425e+299 EiB');
        });
        it('should get size of element',function () {
            misc.sizeOfObject("string").should.be.equal(12);
            misc.sizeOfObject({a:{x:"toto"},c:"d"}).should.be.equal(16);
        })
        it('should get size of element in human form',function () {
            misc.sizeOfObjectReadable("string").should.be.equal("12 bytes");
            misc.sizeOfObjectReadable({a:{x:"toto"},c:"d"}).should.be.equal("16 bytes");
    
        })
    })
    describe('Regexes',function(){
        it('should verify a valid uuid',function(){
            let validUUID = "55c1029b-40d8-47aa-98a0-f5e7dba73903";
            let invalidUUID = "55c1029b-90d8-2baa-98a0-f5e7dba73903";
            regex.isUUIDV4(validUUID).should.equal(true);
            regex.isUUIDV4(invalidUUID).should.equal(false);
        });
     
    })
});