const {union} = require('../index.js');
const unionTest = function() {
    describe('- Khal union ', function () {
        describe('union', function () {
            let arr1 = ['1', 2, 3, 4, 5, "6"];
            let arr2 = ['6', 1, '2', 5];
            it('should union two array', function () {
                let arr3 = union(arr1, arr2);
                arr3.should.be.containDeep([1, '2', 3, 4, 5, '6']);
            });
        });
    });
}
module.exports = unionTest;