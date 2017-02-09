const {string} = require('../index.js');
const stringTest = function() {
    describe('- Khal String ', function () {
        describe('#left pad',function () {            
            it('should work',function(){
                string.pad.left("Khal",4, "!").should.equal('Khal');
                string.pad.left("Khal",10, "!").should.equal('!!!!!!Khal');
               string.pad.left('12',2,'0').should.equal('12'); 
               string.pad.left('1',2,'0').should.equal('01'); 
               string.pad.left('Khal',10).should.equal('      Khal'); 
            })
        })
        describe('#right pad',function () {
            it('should work',function(){
                string.pad.right("Khal",4, "!").should.equal('Khal');
                string.pad.right("Khal",10, "!").should.equal('Khal!!!!!!');
                string.pad.right('12',2,'0').should.equal('12');
                string.pad.right('1',2,'0').should.equal('10');
                string.pad.right('Khal',10).should.equal('Khal      ');
            })
        
        })
    });
};
module.exports = stringTest;