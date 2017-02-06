const {intersect} = require('../index.js');
const intersectTest = function() {
    describe('- Khal intersect ', function () {
        describe('intersect', function () {
            let arr1 = ['1', 2, 3, 4, 5, "6"];
            let arr2 = ['6', 1, '2', 5];
            it('should intersect two array', function () {
                let arr3 = intersect(arr1, arr2);
                arr3.should.be.containDeep([5, "6"]);
            });

        });
    });
}
module.exports = intersectTest;