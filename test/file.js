const {file} = require('../index.js');
const should = require('should');
const path = require('path');

let _fileToCreate = (path.join(__dirname,+new Date() + '.txt'));
let _fileToCreateAndAppend = (path.join(__dirname,+new Date() + '-append.txt'));

const fileTest = function(){
    
    describe('- Khal File ', function () {
        describe('#createFile', function () {
            describe('when the file does not exist', function () {
                it('should create the file async', function () {
                    file.create(_fileToCreate,function(err){
                        err.should.be.empty;
                        fs.existsSync(_file).should.be.equal(true);
                    });
                })
                it('should create the file sync',function(){
                    file.create(_fileToCreateAndAppend).should.be.equal(true);
                })
            });
        });
        describe('#appendInFile',function () {
            it('should append in file async',function(){
                file.append(_fileToCreateAndAppend,"I'm adding",function(err){
                    err.should.be.empty;
                })
            });
            it('should append in file sync',function(){
                file.append(_fileToCreateAndAppend," some text").should.be.equal(true);
            })
        });
        describe('#sizeof',function(){
            it('should return the proper size async',function(){
                file.sizeof(_fileToCreate, function(err, result){
                    err.should.be.empty;
                    (result).should.be.equal(0)
                })
                file.sizeof(_fileToCreateAndAppend,function(err, result) {
                    err.should.be.empty;
                    (result).should.be.equal(20);
                })
            });
            it('should return the proper size sync',function(){
                file.sizeof(_fileToCreate).should.be.equal(0);
                file.sizeof(_fileToCreateAndAppend).should.be.equal(20);
            });
        });
        describe('#exist',function(){
            describe('Do sync',function(){
                it('It should know if a file exist sync',function(){
                    let _file = (path.join(__dirname,'file.js'));
                    file.exist(_file,function(err, result){
                        err.should.be.empty;
                        (result).should.be.equal(true);
                    });
                });
                it('It should know if a file doesn\'t exist',function(){
                    let _file = (path.join(__dirname,+new Date() + 'not-exist.txt'));
                    file.exist(_file,function(err, result){
                        err.should.not.be.empty;
                        (result).should.be.equal(false);
                    });
                });
            })
            describe('Do async',function(){
                it('It should know if a file exist sync',function(){
                    let _file = (path.join(__dirname,'file.js'));
                    file.exist(_file).should.be.equal(true);
                });
                it('It should know if a file doesn\'t exist',function(){
                    let _file = (path.join(__dirname,+new Date() + 'not-exist.txt'));
                    file.exist(_file).should.be.equal(false);
                });
            })
        })
        describe('#deleteFile',function(){
            it('should delete the proper file sync',function(){
                file.delete(_fileToCreate,function(err, result){
                    err.should.be.empty;
                    (result).should.be.equal(true);
                    file.exist(_fileToCreate,function(err, result){
                        err.should.be.empty;
                        (result).should.be.equal(false);
                    });
                });
                
            });
            it('should delete the proper file async',function(){
                
                file.delete(_fileToCreateAndAppend).should.be.equal(true);
                file.exist(_fileToCreateAndAppend,function(err, result){
                    err.should.be.empty;
                    (result).should.be.equal(false);
                });
            });
        });
    });
};
module.exports = fileTest;