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