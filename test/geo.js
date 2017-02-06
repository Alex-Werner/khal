const {geo} = require('../index.js');
const geoTest = function() {
    describe('- Khal geo ', function () {
        describe('Geo', function () {
            it('should create a GeoCordinate object', function () {
                let geoTlse = geo.create("43.597446", "1.454469");
                let geoBdx = geo.create("44.852723", "-0.567896");
                geoBdx.constructor.name.should.be.equal('GeoCordinate');
                geoTlse.should.have.property('latitude');
                geoTlse.should.have.property('longitude');
                geoTlse.latitude.should.be.string;
                geoTlse.latitude.should.be.equal("43.597446");
                geoTlse.longitude.should.be.string;
                geoTlse.longitude.should.be.equal("1.454469");
            });
            it('should handle a geostring to geoCoordinate Object', function () {
                let geoStrTlse = "43.597446,1.454469";
                let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);

                geoTlse.constructor.name.should.be.equal('GeoCordinate');
                geoTlse.should.have.property('latitude');
                geoTlse.should.have.property('longitude');
                geoTlse.latitude.should.be.string;
                geoTlse.latitude.should.be.equal("43.597446");
                geoTlse.longitude.should.be.string;
                geoTlse.longitude.should.be.equal("1.454469");
            })
            it('should give a distance in KM', function () {
                let geoStrTlse = "43.597446,1.454469";
                let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
                let geoBdx = geo.create("44.852723", "-0.567896");

                let distanceInKm = geo.calculateDistance(geoTlse, geoBdx);
                distanceInKm.should.be.equal(213.1807);
                geo.calculateDistance(geoTlse, geoBdx, null, 0).should.be.equal(213);
            });
            it('should give a distance in meters', function () {
                let geoStrTlse = "43.597446,1.454469";
                let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
                let geoBdx = geo.create("44.852723", "-0.567896");

                let distanceInKm = geo.calculateDistance(geoTlse, geoBdx, 'm', 5);
                distanceInKm.should.be.equal(213180.73848);
            });
            it('should give a distance in miles', function () {
                let geoStrTlse = "43.597446,1.454469";
                let geoTlse = geo.geocordinateStringToGeoCoordinateObject(geoStrTlse);
                let geoBdx = geo.create("44.852723", "-0.567896");

                let distanceInKm = geo.calculateDistance(geoTlse, geoBdx, 'miles', 5);
                distanceInKm.should.be.equal(132.46437);
            });
        })
    });
}
module.exports = geoTest;