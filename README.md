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
- `sort` - Handle sorting
    - `by` (el, param) given an object el, will sort by param defined

Exemple : 
```
let obj = [{name:"alex",age:15},{name:"jean",age:10},{name:"brice",age:10},{name:"charles",age:50},{name:"franck",age:1}];
sort.by(obj,{age:1}); //Will sort asc by age similar to sort.by(obj,{age:'asc'});
sort.by(obj,{age:-1}); //Will sort desc by age similar to sort.by(obj,{age:'desc'});

sort.by(obj,{name:1,age:1}); //Will first sort asc by name then by age (so brice will be before jean having same age)
```
    
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
    - `randomBetweenMinAndMax(min,max,[precision])`
- `misc` - Handle stuff
    - `formatByteSize(bytes,[isSIForm])` - Make bytes readable using IEEC (MB) or SI (MiB) form
    - `sizeOfObject(obj)` - Get bytes size from obj (number, object or string)
    - `sizeOfObjectReadable(obj,[isSIForm])` - Make bytes readable using IEEC (MB) or SI (MiB) form from obj
    - `merge(obj,[obj[...]])` - merge object with priority from left to right (left is left untouched), see it like an extends of left.
- `regex`
    - `regTest(reg, val)` - Handy shortcut for regex testing
    - `isUUIDV4(uuid)` - Test a valid UUID V4
    - `isUsername(username)` - Test a valid username
    - `isBirthdate(birthday)` - Test a valid birthdate
    - `isGender(gender)` - Test a valid gender
    - `isPassword(password)` - Test a valid password
    - `isEmail(email)` - Test a valid email
    - `isUnicodeEmail(email)` - Test a valid unicode email
    