const {sort} = require('../index.js');
const sortTest = function() {
    describe('- Khal Sorting ', function () {

        describe('#sortby', function () {
            it('should sort', function () {
                let obj = [{age: 15}, {age: 10}, {age: 50}, {age: 1}];
                let s1 = sort.by(obj, {age: 1});
                s1.should.be.deepEqual([{age: 1}, {age: 10}, {age: 15}, {age: 50}]);

                let s2 = sort.by(obj, {age: -1});
                s2.should.be.deepEqual([{age: 50}, {age: 15}, {age: 10}, {age: 1}]);

                let s3 = sort.by(obj, {age: 'asc'});
                s3.should.be.deepEqual([{age: 1}, {age: 10}, {age: 15}, {age: 50}]);

                let s4 = sort.by(obj, {age: 'desc'});
                s4.should.be.deepEqual([{age: 50}, {age: 15}, {age: 10}, {age: 1}]);

            })
            it('should sort multiple', function () {
                let obj = [{name: "alex", age: 15}, {name: "jean", age: 10}, {name: "brice", age: 10}, {
                    name: "charles",
                    age: 50
                }, {name: "franck", age: 1}];
                let s1 = sort.by(obj, {name: 1, age: 1});
                s1.should.be.deepEqual([{name: 'franck', age: 1},
                    {name: 'brice', age: 10},
                    {name: 'jean', age: 10},
                    {name: 'alex', age: 15},
                    {name: 'charles', age: 50}]);
            })
        });
    });
}
module.exports = sortTest;