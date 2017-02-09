# Khal

Utils for node project   

#### Disclaimer   

There is a lot of other npm that do what I've done but in a better/more fashion/more optimized way. But well, I know what is inside this,
and this is the one I used a lot in my project. So don't blame for all the duplicates bytes I've done here.   
I might optimize theses function in the future, just for the lolz and the learning.

More info about what has changed in the last version : [Changelog](CHANGELOG.md)  

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

- `file` - Handle file
    - `create(filename, [cb])` - Create an empty file (sync if not cb passed, async in the other case)
    - `delete(filename, [cb])` - Delete a file (sync if not cb passed, async in the other case)
    - `append(filename, data, [cb])` - Append data in file (sync if not cb passed, async in the other case)
    - `exist(filename, [cb])` - Check if a file exist  (sync if not cb passed, async in the other case)
    - `sizeof(filename, [cb])` - Get bytes size of a file (sync if not cb passed, async in the other case)
- `geo` - Handle geoCordinate
    - `create(lat, lon)` - returns a GeoCordinate object
    - `geocordinateStringToGeoCoordinateObject(str)` - transform a str "43.597446,1.454469" to a geoObject
    - `calculateDistance(geoCordinate, geoCordinate, [unit{str}, [precision {int}]])` - get distance between two geoObject, can be in `km`,`m` or `miles`,
    - `convert(float)`
        - `toMiles()` - convert to Miles a value in meters
        - `toMeters()` - convert to Meters a value in miles
- `string` - Handle string
    - `pad` - Handle Padding
        - `left(string, length, [replacementString])` - Transform an input and adding in left the replacement value. Returns a string.
        - `right(string, length, [replacementString])` - Transform an input and adding in right the replacement value. Returns a string.
- `math` - Handle math
    - `radianToDegree(rad)`
    - `degreeToRadian(deg)`
    - `randomBetweenMinAndMax(min,max,[precision])`
    - `levenshtein(stringA, stringB)` - return an array as of levenshtein (string distance)
    - `stringDistance(stringA, stringB)` - return an int, value of the distance between two strings
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
- `date`
    - `time`
    - `date`
    - `datetime`
    - `UTCEpochMS`
    - `UTCEpoch`
    - `localEpochMS`
    - `localEpoch`
    - `calculateAge(dateString, [date])` - Given a date String (YYYY-MM-DD) return the year diff between today or the date given as second arg.
