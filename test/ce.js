const {ce} = require('../index.js');
const ceTest = function() {
    describe('- Khal ce ', function () {
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
    });
}
module.exports = ceTest;