const {math} = require('../index.js');
const mathTest = function () {
    describe('- Khal maths ', function () {
        describe('#radianToDegree', function () {
            it('should transform rad in deg and inverse', function () {
                let rad = 1.5707963267948966;
                let deg = (math.radianToDegree(rad));
                math.radianToDegree(Math.PI).should.be.equal(180);
                deg.should.be.equal(90);
            });
        });
        describe('#degreeToRadian', function () {
            it('should transform deg in rad', function () {
                let deg = 90;
                let rad = math.degreeToRadian(deg);
                rad.should.be.equal(1.5707963267948966);
                math.degreeToRadian(180).should.be.equal(Math.PI);
            });
        })
        describe('#levenshtein', function () {
            it('should return expected arr', function () {
                let a = "Toto";
                let b = "Tata";
                let expected = [ [ 0, 1, 2, 3, 4 ],
                    [ 1, 0, 1, 2, 3 ],
                    [ 2, 1, 1, 2, 3 ],
                    [ 3, 2, 2, 1, 2 ],
                    [ 4, 3, 3, 2, 2 ] ];
                math.levenshtein(a,b).should.be.deepEqual(expected);
            });
        });
        describe('#stringDistance', function () {
            it('should return expected int', function () {
                let a = "Toto",b = "Tata";
                math.stringDistance(a,b).should.be.equal(2);
                a = "Toto";b = "";
                math.stringDistance(a,b).should.be.equal(4);
                a = "";b = "";
                math.stringDistance(a,b).should.be.equal(0);
                a = "T";b = "t";
                math.stringDistance(a,b).should.be.equal(1);


            });
        });
        
    });
};
module.exports = mathTest;