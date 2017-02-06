const {math} = require('../index.js');
const mathTest = function() {
    describe('- Khal maths ', function () {
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

    });
}
module.exports = mathTest;