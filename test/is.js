const {is} = require('../index.js');
const isTest = function() {
    describe('- Khal is ', function () {
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
            it('is an hex',function(){
                (is.hex('1F600').should.be.equal(true));
                (is.hex('1f600').should.be.equal(true));
                (is.hex('1K600').should.be.equal(false))

            })
        });
    });
}
module.exports = isTest;