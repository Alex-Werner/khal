const {regex} = require('../index.js');
const regexTest = function() {
    describe('- Khal Regexes ', function () {

        describe('#isUUIDVS', function () {
            it('should verify a valid uuid', function () {
                let validUUID = "55c1029b-40d8-47aa-98a0-f5e7dba73903";
                let invalidUUID = "55c1029b-90d8-2baa-98a0-f5e7dba73903";
                regex.isUUIDV4(validUUID).should.equal(true);
                regex.isUUIDV4(invalidUUID).should.equal(false);
            });
        });
        describe('#isURI',function() {
            it('should verify a valid uri', function () {
                regex.isUri("ftp://128.125.132.10").should.equal(true);
                regex.isUri("http://google.fr").should.equal(true);
                regex.isUri("Hi google.fr").should.equal(false);
                regex.isUri("Hi google.fr how are u?").should.equal(false);
                regex.isUri("HTTP://GOOGLE.FR").should.equal(true);
                regex.isUri("www.google.fr").should.equal(true);
                regex.isUri("google.fr").should.equal(true);
                regex.isUri("go.fr").should.equal(true);
                regex.isUri("http://www.google.fr").should.equal(true);
                regex.isUri("http://google.fr").should.equal(true);
                regex.isUri("https://www.google.fr").should.equal(true);
                regex.isUri("https://google.fr").should.equal(true);
                regex.isUri("gogl.com").should.equal(true);
                regex.isUri("google.clo").should.equal(true);
                regex.isUri("www.gogrgrgro.com.sd").should.equal(true);
                regex.isUri("bit.ly/12bl3xX").should.equal(true);
                regex.isUri("t.ly/12bl3xX").should.equal(true);
                regex.isUri("www.google.co.in").should.equal(true);
                regex.isUri("toto du 4758").should.equal(false);
                regex.isUri("Hey suis moi sur mon profil giraf ;)").should.equal(false);


            });
        });
        describe('#hasURI',function(){
            it('should verify a text contains a uri', function(){

                var text = `^ asserts position at start of a line
                        Non-capturing group (?:(?:https?|ftp):\/\/)?
                        ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
                        Non-capturing group (?:https?|ftp)
                        1st Alternative https?
                        http matches the characters http literally (case insensitive)
                        s? matches the character s literally (case insensitive)
                        ? Quantifier — Matches between zero and one times, as many times as possible, giving back as needed (greedy)
                        2nd Alternative ftp
                        ftp matches the characters ftp literally (case insensitive)
                        : matches the character : literally (case insensitive)
                        \/ matches the character / literally (case insensitive)
                        \/ matches the character / literally (case insensitive)`;
                regex.hasUri(text).should.equal(false);
                text+=" but now we have a URI like www.giraf.world or stuff like this";
                regex.hasUri(text).should.equal(true);
                regex.hasUri("ftp://128.125.132.10").should.equal(true);
                regex.hasUri("http://google.fr").should.equal(true);
                regex.hasUri("Hi google.fr").should.equal(true);
                regex.hasUri("Hi google.fr how are u?").should.equal(true);
                regex.hasUri("HTTP://GOOGLE.FR").should.equal(true);
                regex.hasUri("www.google.fr").should.equal(true);
                regex.hasUri("google.fr").should.equal(true);
                regex.hasUri("go.fr").should.equal(true);
                regex.hasUri("http://www.google.fr").should.equal(true);
                regex.hasUri("http://google.fr").should.equal(true);
                regex.hasUri("https://www.google.fr").should.equal(true);
                regex.hasUri("https://google.fr").should.equal(true);
                regex.hasUri("gogl.com").should.equal(true);
                regex.hasUri("google.clo").should.equal(true);
                regex.hasUri("www.gogrgrgro.com.sd").should.equal(true);
                regex.hasUri("bit.ly/12bl3xX").should.equal(true);
                regex.hasUri("t.ly/12bl3xX").should.equal(true);
                regex.hasUri("www.google.co.in").should.equal(true);
                regex.hasUri("toto du 4758").should.equal(false);
                regex.hasUri("Hey suis moi sur mon profil giraf ;)").should.equal(false);
            });
        })
    });
};
module.exports = regexTest;