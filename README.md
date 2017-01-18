# Khal

Utils for node project

# API

- `cl(args)` - Works like console.log, but it return the args passed. If no arg passed, it just return the timestamp. If only one arg is passed, it return the arg, if many it return array
- `ce(args)` - Same as above for console.error
- `clone(obj)` - Make a clone of an object (useful is you don't want to keep ref)
- `intersect(arr, arr)` - Return an array being the intersect of arrays given
- `union(arr,arr)` - Return an array being the union of arrays given
- `is` - Test a given argument being of type/state expected
    - `arr`
    - `int`
    - `number`
    - `float`
    - `string`
    - `bool`
    - `obj`
    - `fn`
    - `def`
    - `undef`
    - `promise`
    - `obs`
    - `event`
- `geo` - Handle geoCordinate
    - `create(lat, lon)` - returns a GeoCordinate object
    - `geocordinateStringToGeoCoordinateObject(str)` - transform a str "43.597446,1.454469" to a geoObject
    - `calculateDistance(geoCordinate, geoCordinate, [unit{str}, [precision {int}]])` - get distance between two geoObject, can be in `km`,`m` or `miles`,
    - `convert(float)`
        - `toMiles()` - convert to Miles a value in meters
        - `toMeters()` - convert to Meters a value in miles
- `math` - Handle math
    - `radianToDegree(rad)`
    - `degreeToRadian(deg)`