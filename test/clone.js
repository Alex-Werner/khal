const {clone, geo} = require('../index.js');
const cloneTest = function() {
    describe('- Khal clone ', function () {
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
    });
}
module.exports = cloneTest;