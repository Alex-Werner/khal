const {clone,misc} = require('../index.js');
const miscTest = function () {
    describe('- Khal Misc ', function () {

        describe('Misc', function () {
            describe('#merging', function () {
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
                                d: new Date('2016-06-14'),
                                i: 42,
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
                it('should be recursive', function () {
                    let merged = misc.merge(obj1, obj5);
                    let x = clone(obj5);
                    x.foo = "bar";
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
        });
        describe('#formatByteSize', function () {
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
        });
        describe('#sizeOfObject', function () {

            it('should get size of element', function () {
                misc.sizeOfObject("string").should.be.equal(12);
                misc.sizeOfObject({a: {x: "toto"}, c: "d"}).should.be.equal(16);
            })
        });
        describe('#sizeOfObjectReadable', function () {

            it('should get size of element in human form', function () {
                misc.sizeOfObjectReadable("string").should.be.equal("12 bytes");
                misc.sizeOfObjectReadable({a: {x: "toto"}, c: "d"}).should.be.equal("16 bytes");
            })
        })
    });
};
module.exports = miscTest;