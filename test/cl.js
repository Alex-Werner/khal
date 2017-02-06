const {cl} = require('../index.js');
const clTest = function() {
    describe('- Khal cl ', function () {
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
    });
}
module.exports = clTest;