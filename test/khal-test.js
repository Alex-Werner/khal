const {cl, ce, union, clone, intersect, is, geo, math, misc, regex,sort} = require('../index.js');
const should = require('should');

describe('- Khal utils ', function () {
    describe('#cl', function () {
        it('should return the string displayed in log', function () {
            let str = "Totorodu54";
            let ret = cl(str);

            ret.should.be.equal(str);
        })
        it('should return the timestamp by default', function () {
            let now = new Date().getTime();
            let ret = cl();

            ret.should.be.equal(now);
        })
    });
    describe('ce', function () {
        it('should return the string displayed in log', function () {
            let str = "Totorodu54";
            let ret = ce(str);

            ret.should.be.equal(str);
        })
        it('should return the timestamp by default', function () {
            let now = new Date().getTime();
            let ret = ce();

            ret.should.be.equal(now);
        })
    });
    describe('clone', function () {
        let o = {
            a: "i",
            b: "o",
            c: {
                e: "f",
                g: {
                    nest: "ted",
                    arr: ['a', 11225, 695, {toto: "tata", x: "y"}]
                }
            },
            d: ['je', 'suis', 'un', 'array'],
            yy: 123999445,
            yz: -1155544
        };
        it('should clone', function () {
            let o_clone = clone(o);
            o_clone.should.be.deepEqual(o);
        })

        it('should not be a ref', function () {
            let o_clone = clone(o);
            delete o["a"];
            o_clone.should.not.be.deepEqual(o);
        })
        it('should handle string', function () {
            let str = "toto";
            let strC = clone(str)
            str = "titi";
            strC.should.equal('toto');
            strC.constructor.name.should.equal("String");

        })
        it('should handle array', function () {
            let arr = ['a', 'b'];
            let arrC = clone(arr)
            arrC.constructor.name.should.equal(arr.constructor.name);
            arr = arr.splice(1, 1);
            arr.push('c');
            arrC.constructor.name.should.equal(arr.constructor.name);
            arrC.should.deepEqual(['a', 'b']);
            arrC.constructor.name.should.equal("Array");

        })
        it('should handle number', function () {
            let num = 42;
            let numC = clone(num)
            num = 12;
            num++;
            numC.should.equal(42);
            numC.constructor.name.should.equal(num.constructor.name);
            numC.constructor.name.should.equal("Number");
        })
        it('should handle Date', function () {
            let date = new Date("2016-06-14");
            let dateC = clone(date)
            date = new Date("2017-06-14");

            dateC.constructor.name.should.equal(date.constructor.name);
            dateC.should.deepEqual(new Date("2016-06-14"));
            dateC.constructor.name.should.equal("Date");
        })
        it('should handle random obj', function () {
            let geo1 = geo.create("43.597446", "1.454469");
            let geo1C = clone(geo1);
            geo1 = geo.create("44.852723", "-0.567896");

            geo1C.constructor.name.should.equal(geo1.constructor.name);
            geo1C.should.deepEqual(geo.create("43.597446", "1.454469"));
            geo1.should.deepEqual(geo.create("44.852723", "-0.567896"));
            geo1C.constructor.name.should.equal("GeoCordinate");
        })
    });
    describe('intersect', function () {
        let arr1 = ['1', 2, 3, 4, 5, "6"];
        let arr2 = ['6', 1, '2', 5];
        it('should intersect two array', function () {
            let arr3 = intersect(arr1, arr2);
            arr3.should.be.containDeep([5, "6"]);
        });

    });
    describe('union', function () {
        let arr1 = ['1', 2, 3, 4, 5, "6"];
        let arr2 = ['6', 1, '2', 5];
        it('should union two array', function () {
            let arr3 = union(arr1, arr2);
            arr3.should.be.containDeep([1, '2', 3, 4, 5, '6']);
        });
    });
    describe('.is helpers', function () {
        let fn = function () {
            return "toto";
        };
        let str = "toto";
        let int = 42;
        let float = 42.5;
        let arr = ['to', 'to'];
        let bool = true;
        it('is a function', function () {
            (is.fn(fn)).should.be.equal(true);
            (is.fn(str)).should.not.be.equal(true);
            (is.fn(int)).should.not.be.equal(true);
        });
        it('is an array', function () {
            (is.arr(arr)).should.be.equal(true);
        });
        it('is an int', function () {
            (is.int(int)).should.be.equal(true);
            (is.int(float)).should.not.be.equal(true);

        });
        it('is an float', function () {
            (is.float(float)).should.be.equal(true);
            (is.float(int)).should.not.be.equal(true);
        })
        it('is an string', function () {
            (is.string(str)).should.be.equal(true);
        })
        it('is a bool', function () {
            (is.bool(bool).should.be.equal(true))
        })
    });
    describe('Geo', function () {
        it('should create a GeoCordinate object', function () {
            let geoTlse = geo.create("43.597446", "1.454469");
            let geoBdx = geo.create("44.852723", "-0.567896");
            geoBdx.constructor.name.should.be.equal('GeoCordinate');
            geoTlse.should.have.property('latitude');
            geoTlse.should.have.property('longitude');
            geoTlse.latitude.should.be.string;
            geoTlse.latitude.should.be.equal("43.597446");
            geoTlse.longitude.should.be.string;
            geoTlse.longitude.should.be.equal("1.454469");
        });
        it('should handle a geostring to geoCoordinate Object', function () {
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
        it('should give a distance in KM', function () {
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723", "-0.567896");

            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx);
            distanceInKm.should.be.equal(213.1807);
            geo.calculateDistance(geoTlse, geoBdx, null, 0).should.be.equal(213);
        });
        it('should give a distance in meters', function () {
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723", "-0.567896");

            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx, 'm', 5);
            distanceInKm.should.be.equal(213180.73848);
        });
        it('should give a distance in miles', function () {
            let geoStrTlse = "43.597446,1.454469";
            let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
            let geoBdx = geo.create("44.852723", "-0.567896");

            let distanceInKm = geo.calculateDistance(geoTlse, geoBdx, 'miles', 5);
            distanceInKm.should.be.equal(132.46437);
        });
    })
    describe('Math', function () {
        it('should transform rad in deg and inverse', function () {
            let rad = 1.5707963267948966;
            let deg = (math.radianToDegree(rad));
            math.radianToDegree(Math.PI).should.be.equal(180);
            deg.should.be.equal(90);
        });
        it('should transform deg in rad', function () {
            let deg = 90;
            let rad = math.degreeToRadian(deg);
            rad.should.be.equal(1.5707963267948966);
            math.degreeToRadian(180).should.be.equal(Math.PI);
        });
    })
    describe('Misc', function () {
        describe('merging', function () {
            let date1 = new Date("2017-06-14");
            let date2 = new Date("2018-06-14");
            let obj1 = {foo: "bar"};
            let obj1_1 = {foo: "buz"};
            let obj2 = {baz: "quz"};
            let obj3 = {toto: "tata"};
            let obj4 = {int: 42, arr: ["a", "b", "c", {1: "2"}], date: date1};
            let obj4_1 = {int: 50, arr: ["e", "f", "g", {a: "b"}], date: date2};
            let obj5 = {
                a: {
                    c: 'e',
                    d: {
                        p: {
                            d:new Date('2016-06-14'),
                            i:42,
                            j: {
                                k: {
                                    arr: ['1', 2, {a: 'b'}]
                                }
                            }
                        }
                    }
                }
            }
            it('should handle no args', function () {
                misc.merge().should.deepEqual({});

            });
            it('should handle one arg', function () {
                misc.merge(obj1).should.deepEqual(obj1);

            });
            it('should handle second arg with first being null or empty', function () {
                misc.merge({}, obj2).should.deepEqual(obj2);
                misc.merge(null, obj2).should.deepEqual(obj2);
            });
            it('should merge two obj', function () {
                misc.merge(obj1, obj2).should.deepEqual({foo: "bar", baz: "quz"});
                misc.merge(obj1, obj3).should.deepEqual({foo: "bar", toto: "tata"});
            });
            it('should merge more obj', function () {
                misc.merge(obj1, obj2, obj3).should.deepEqual({foo: "bar", baz: "quz", toto: "tata"});
                misc.merge(obj1, obj2, obj3, obj4).should.deepEqual({
                    foo: "bar",
                    baz: "quz",
                    toto: "tata",
                    int: 42,
                    arr: ["a", "b", "c", {1: "2"}],
                    date: new Date("2017-06-14")
                });
            });
            it('should be recursive',function () {
                let merged = misc.merge(obj1, obj5);
                let x = clone(obj5);
                x.foo= "bar";
                merged.should.be.deepEqual(x);
                merged.a.d.p.d.getTime().should.equal(1465862400000);
            })
            it('should prioritize left over right', function () {
                misc.merge(obj1, obj1_1).should.deepEqual(obj1);
                misc.merge(obj1_1, obj1).should.deepEqual(obj1_1);

                misc.merge(obj4, obj4_1).should.deepEqual(obj4);
                misc.merge(obj4_1, obj4).should.deepEqual(obj4_1);

            });
        });
        it('should transform bytes into readable form', function () {
            let bytes = 8;
            misc.formatByteSize(bytes).should.be.equal('8 bytes');
            misc.formatByteSize(bytes, false).should.be.equal('8 bytes');
            misc.formatByteSize(3171, false).should.be.equal('3.171 KB');
            misc.formatByteSize(3171).should.be.equal('3.097 KiB');
            misc.formatByteSize(Number.MAX_SAFE_INTEGER).should.be.equal('8.000 PiB');
            misc.formatByteSize(Number.MAX_SAFE_INTEGER, false).should.be.equal('9.007 PB');
            misc.formatByteSize(Number.MAX_VALUE).should.be.equal('1.6742321987285425e+299 EiB');
        });
        it('should get size of element', function () {
            misc.sizeOfObject("string").should.be.equal(12);
            misc.sizeOfObject({a: {x: "toto"}, c: "d"}).should.be.equal(16);
        })
        it('should get size of element in human form', function () {
            misc.sizeOfObjectReadable("string").should.be.equal("12 bytes");
            misc.sizeOfObjectReadable({a: {x: "toto"}, c: "d"}).should.be.equal("16 bytes");
        })
    })
    describe('Regexes', function () {
        it('should verify a valid uuid', function () {
            let validUUID = "55c1029b-40d8-47aa-98a0-f5e7dba73903";
            let invalidUUID = "55c1029b-90d8-2baa-98a0-f5e7dba73903";
            regex.isUUIDV4(validUUID).should.equal(true);
            regex.isUUIDV4(invalidUUID).should.equal(false);
        });
        it('should verify a valid uri', function(){
          regex.isUri("ftp://128.125.132.10").should.equal(true);
          regex.isUri("http://google.fr").should.equal(true);
          regex.isUri("Hi google.fr").should.equal(false);
          regex.isUri("Hi google.fr how are u?").should.equal(false);
          regex.isUri("HTTP://GOOGLE.FR").should.equal(true);
          regex.isUri("www.google.fr").should.equal(true);
          regex.isUri("google.fr").should.equal(true);
          regex.isUri("go.fr").should.equal(true);
          regex.isUri("http://www.google.fr").should.equal(true);
          regex.isUri("http://google.fr").should.equal(true);
          regex.isUri("https://www.google.fr").should.equal(true);
          regex.isUri("https://google.fr").should.equal(true);
          regex.isUri("gogl.com").should.equal(true);
          regex.isUri("google.clo").should.equal(true);
          regex.isUri("www.gogrgrgro.com.sd").should.equal(true);
          regex.isUri("bit.ly/12bl3xX").should.equal(true);
          regex.isUri("t.ly/12bl3xX").should.equal(true);
          regex.isUri("www.google.co.in").should.equal(true);
          regex.isUri("toto du 4758").should.equal(false);
          regex.isUri("Hey suis moi sur mon profil giraf ;)").should.equal(false);


        });
        it('should verify a text contains a uri', function(){

                      var text = `^ asserts position at start of a line
                        Non-capturing group (?:(?:https?|ftp):\/\/)?
                        ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
                        Non-capturing group (?:https?|ftp)
                        1st Alternative https?
                        http matches the characters http literally (case insensitive)
                        s? matches the character s literally (case insensitive)
                        ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
                        2nd Alternative ftp
                        ftp matches the characters ftp literally (case insensitive)
                        : matches the character : literally (case insensitive)
                        \/ matches the character / literally (case insensitive)
                        \/ matches the character / literally (case insensitive)`;
                        regex.hasUri(text).should.equal(false);
                        text+=" but now we have a URI like www.giraf.world or stuff like this";
                        regex.hasUri(text).should.equal(true);
                        regex.hasUri("ftp://128.125.132.10").should.equal(true);
                        regex.hasUri("http://google.fr").should.equal(true);
                        regex.hasUri("Hi google.fr").should.equal(true);
                        regex.hasUri("Hi google.fr how are u?").should.equal(true);
                        regex.hasUri("HTTP://GOOGLE.FR").should.equal(true);
                        regex.hasUri("www.google.fr").should.equal(true);
                        regex.hasUri("google.fr").should.equal(true);
                        regex.hasUri("go.fr").should.equal(true);
                        regex.hasUri("http://www.google.fr").should.equal(true);
                        regex.hasUri("http://google.fr").should.equal(true);
                        regex.hasUri("https://www.google.fr").should.equal(true);
                        regex.hasUri("https://google.fr").should.equal(true);
                        regex.hasUri("gogl.com").should.equal(true);
                        regex.hasUri("google.clo").should.equal(true);
                        regex.hasUri("www.gogrgrgro.com.sd").should.equal(true);
                        regex.hasUri("bit.ly/12bl3xX").should.equal(true);
                        regex.hasUri("t.ly/12bl3xX").should.equal(true);
                        regex.hasUri("www.google.co.in").should.equal(true);
                        regex.hasUri("toto du 4758").should.equal(false);
                        regex.hasUri("Hey suis moi sur mon profil giraf ;)").should.equal(false);
        });
    })
    describe('Sorting',function(){
       it('should sort',function () {
           let obj = [{age:15},{age:10},{age:50},{age:1}];
           let s1 = sort.by(obj,{age:1});
           s1.should.be.deepEqual([ { age: 1 }, { age: 10 }, { age: 15 }, { age: 50 } ]);

           let s2 = sort.by(obj,{age:-1});
           s2.should.be.deepEqual([ { age: 50 }, { age: 15 }, { age: 10 }, { age: 1 } ]);

           let s3 = sort.by(obj,{age:'asc'});
           s3.should.be.deepEqual([ { age: 1 }, { age: 10 }, { age: 15 }, { age: 50 } ]);

           let s4 =sort.by(obj,{age:'desc'});
           s4.should.be.deepEqual([ { age: 50 }, { age: 15 }, { age: 10 }, { age: 1 } ]);

       })
        it('should sort multiple',function () {
            let obj = [{name:"alex",age:15},{name:"jean",age:10},{name:"brice",age:10},{name:"charles",age:50},{name:"franck",age:1}];
            let s1 = sort.by(obj,{name:1,age:1});
            s1.should.be.deepEqual([ { name: 'franck', age: 1 },
                { name: 'brice', age: 10 },
                { name: 'jean', age: 10 },
                { name: 'alex', age: 15 },
                { name: 'charles', age: 50 } ]);
        })
    });
});
