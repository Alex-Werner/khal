const {date, string} = require('../index.js');
const dateTest = function() {
    describe('- Khal date ', function () {
        describe('Calculate Age',function () {
            let today = new Date();
            let tenYearsAgo = new Date(new Date().setFullYear(today.getFullYear()-10));
            
            it('should give the good value',function(){
                let date_str = tenYearsAgo.getFullYear()+"-"+string.pad.left(tenYearsAgo.getMonth(),2,"0")+"-"+string.pad.left(tenYearsAgo.getDate(),2,"0");
                date.calculateAge(date_str).should.equal(10);
                console.log(date_str);
    
                date_str = tenYearsAgo.getFullYear()+"-"+string.pad.left(tenYearsAgo.getMonth(),2,"0")+"-"+string.pad.left(tenYearsAgo.getDate()+1,2,"0");
                date.calculateAge(date_str).should.equal(10);
                console.log(date_str);
    
                date_str = tenYearsAgo.getFullYear()+"-"+string.pad.left(tenYearsAgo.getMonth(),2,"0")+"-"+string.pad.left(tenYearsAgo.getDate()-1,2,"0");
                date.calculateAge(date_str).should.equal(10);
                console.log(date_str);
                // date.calculateAge("")
            })
            
        })
    });
};
module.exports = dateTest;