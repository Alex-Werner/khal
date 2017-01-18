const { cl, ce , union, clone, intersect, is } = require('../index.js');
const should = require('should');

describe('- Khal utils ', function() {
    describe('#cl', function() {
        it('should return the string displayed in log',function(){
            let str = "Totorodu54";
            let ret = cl(str);
            
            ret.should.be.equal(str);
        })
        it('should return the timestamp by default',function(){
            let now = new Date().getTime();
            let ret = cl();
            
            ret.should.be.equal(now);
        })
    });
    describe('ce', function() {
        it('should return the string displayed in log',function(){
            let str = "Totorodu54";
            let ret = ce(str);

            ret.should.be.equal(str);
        })
        it('should return the timestamp by default',function(){
            let now = new Date().getTime();
            let ret = ce();

            ret.should.be.equal(now);
        })
    });
    describe('clone', function() {
        let o = {
            a:"i",
            b:"o",
            c:{
                e:"f",
                g:{
                    nest:"ted",
                    arr:['a',11225,695,{toto:"tata",x:"y"}]
                }
            },
            d:['je','suis','un','array'],
            yy:123999445,
            yz:-1155544
        };
        it('should clone',function(){
            
            
            let o_clone = clone(o);
            o_clone.should.be.deepEqual(o);
        })
        it('should not be a ref',function(){
            let o_clone = clone(o);
            delete o["a"];
            o_clone.should.not.be.deepEqual(o);
        })
    });
    describe('intersect', function() {
        let arr1 = ['1',2,3,4,5,"6"];
        let arr2 = ['6',1,'2',5];
        it('should intersect two array',function(){
            let arr3 = intersect(arr1, arr2);
            arr3.should.be.containDeep([5,"6"]);
        });
        
    });
    describe('union', function() {
        let arr1 = ['1',2,3,4,5,"6"];
        let arr2 = ['6',1,'2',5];
        it('should union two array',function(){
            let arr3 = union(arr1, arr2);
            arr3.should.be.containDeep([1,'2',3,4,5,'6']);
        });
    });
    describe('.is helpers',function(){
        let fn = function(){ return "toto";};
        let str = "toto";
        let int = 42;
        let float = 42.5;
        let arr = ['to','to'];
        let bool=true;
        it('is a function',function(){
           (is.fn(fn)).should.be.equal(true);
           (is.fn(str)).should.not.be.equal(true);
           (is.fn(int)).should.not.be.equal(true);
       });
        it('is an array', function(){
            (is.arr(arr)).should.be.equal(true);
        });
        it('is an int', function(){
            (is.int(int)).should.be.equal(true);
            (is.int(float)).should.not.be.equal(true);

        });
        it('is an float',function(){
            (is.float(float)).should.be.equal(true);
            (is.float(int)).should.not.be.equal(true);
        }) 
        it('is an string',function(){
            (is.string(str)).should.be.equal(true);
        })
        it('is a bool',function () {
            (is.bool(bool).should.be.equal(true))
        })
    });
})