stRange.js API Documentation
============================
### [Range](#Range)
- [begin](#range.begin)
- [bounds](#range.bounds)
- [end](#range.end)
- [compareBeginToBegin](#Range.compareBeginToBegin)(a, b)
- [contains](#Range.prototype.contains)(value)
- [intersects](#Range.prototype.intersects)(other)
- [isBounded](#Range.prototype.isBounded)()
- [isEmpty](#Range.prototype.isEmpty)()
- [isFinite](#Range.prototype.isFinite)()
- [isInfinite](#Range.prototype.isInfinite)()
- [isUnbounded](#Range.prototype.isUnbounded)()
- [parse](#Range.parse)(range, [parseEndpoint])
- [toJSON](#Range.prototype.toJSON)()
- [toString](#Range.prototype.toString)()


<a name="Range" />
Range(begin, end, [bounds])
---------------------------
Create a new range object with the given begin and end endpoints.  
You can also pass a two character string for bounds. Defaults to` "[]"` for
an all inclusive range.

You can use any value for endpoints. `Null` is considered infinity for
values that don't have a special infinity type like `Number` has `Infinity`.

**Examples**:
```javascript
new Range(10, 20) // => {begin: 10, end: 20, bounds: "[]"}
new Range(new Date(2000, 5, 18), new Date(2000, 5, 22)
```

<a name="range.begin" />
### range.begin
Range's beginning, or left endpoint.

<a name="range.bounds" />
### range.bounds
Range's bounds.

Bounds signify whether the range includes or excludes that particular
endpoint.

Pair | Meaning
-----|--------
`()` | open
`[]` | closed
`[)` | left-closed, right-open
`(]` | left-open, right-closed

**Examples**:
```javascript
new Range(1, 5).bounds // => "[]"
new Range(1, 5, "[)").bounds // => "[)"
```

<a name="range.end" />
### range.end
Range's end, or right endpoint.

<a name="Range.compareBeginToBegin" />
### Range.compareBeginToBegin(a, b)
Compares two range's beginnings.  
Returns `-1` if `a` begins before `b` begins, `0` if they're equal and `1`
if `a` begins after `b`.

**Examples**:
```javascript
Range.compareBeginToBegin(new Range(0, 10), new Range(5, 15)) // => -1
Range.compareBeginToBegin(new Range(0, 10), new Range(0, 15)) // => 0
Range.compareBeginToBegin(new Range(0, 10), new Range(0, 15, "()")) // => -1
```

<a name="Range.prototype.contains" />
### Range.prototype.contains(value)
Check if a given value is contained within this range.  
Returns `true` or `false`.

**Examples**:
```javascript
new Range(0, 10).contains(5) // => true
new Range(0, 10).contains(10) // => true
new Range(0, 10, "[)").contains(10) // => false
```

<a name="Range.prototype.intersects" />
### Range.prototype.intersects(other)
Check if this range intersects with another.  
Returns `true` or `false`.

Ranges that have common points intersect. Ranges that are consecutive and
with *inclusive* endpoints are also intersecting. An empty range will never
intersect.

**Examples**:
```javascript
new Range(0, 10).intersects(new Range(5, 7)) // => true
new Range(0, 10).intersects(new Range(10, 20)) // => true
new Range(0, 10, "[)").intersects(new Range(10, 20)) // => false
new Range(0, 10).intersects(new Range(20, 30)) // => false
```

<a name="Range.prototype.isBounded" />
### Range.prototype.isBounded()
Check whether the range is bounded.  
A bounded range is one where neither endpoint is `null` or `Infinity`. An
empty range is considered bounded.

**Examples**:
```javascript
new Range().isBounded() // => true
new Range(5, 5).isBounded() // => true
new Range(null, new Date(2000, 5, 18).isBounded() // => false
new Range(0, Infinity).isBounded() // => false
new Range(-Infinity, Infinity).isBounded() // => false
```

<a name="Range.prototype.isEmpty" />
### Range.prototype.isEmpty()
Check whether the range is empty.  
An empty range is one with `undefined` endpoints (like `new Range`) or
a range with two equivalent, but exculsive endpoints (`new Range(5, 5,
"[)")`).

Equivalence is checked by using the `<` operators, so value objects will be
coerced into something comparable by JavaScript. That usually means calling
the object's `valueOf` function.

**Examples**:
```javascript
new Range().isEmpty() // => true
new Range(5, 5, "[)").isEmpty() // => true
new Range(1, 10).isEmpty() // => false
```

<a name="Range.prototype.isFinite" />
### Range.prototype.isFinite()
Alias of [`isBounded`](#Range.prototype.isBounded).  

<a name="Range.prototype.isInfinite" />
### Range.prototype.isInfinite()
Alias of [`isUnbounded`](#Range.prototype.isUnbounded).  

<a name="Range.prototype.isUnbounded" />
### Range.prototype.isUnbounded()
Check whether the range is unbounded.  
An unbounded range is one where either endpoint is `null` or `Infinity`. An
empty range is not considered unbounded.

**Examples**:
```javascript
new Range().isUnbounded() // => false
new Range(5, 5).isUnbounded() // => false
new Range(null, new Date(2000, 5, 18).isUnbounded() // => true
new Range(0, Infinity).isUnbounded() // => true
new Range(-Infinity, Infinity).isUnbounded() // => true
```

<a name="Range.parse" />
### Range.parse(range, [parseEndpoint])
Parses a string stringified by
[`Range.prototype.toString`](#Range.prototype.toString).

To have it also parse the endpoints to something other than a string, pass
a function as the second argument.

**Examples**:
```javascript
Range.parse("[a,z)") // => new Range("a", "z", "[)")
Range.parse("[42,69]", Number) // => new Range(42, 69)
```

<a name="Range.prototype.toJSON" />
### Range.prototype.toJSON()
Alias of [`toString`](#Range.prototype.toString).  
Stringifies the range when passing it to `JSON.stringify`.  
This way you don't need to manually call `toString` when stringifying.

**Examples**:
```javascript
JSON.stringify(new Range(1, 10)) // "\"[1,10]\""
```

<a name="Range.prototype.toString" />
### Range.prototype.toString()
Stringifies a range in `[a,b]` format.

This happens to match the string format used by [PostgreSQL's range type
format](http://www.postgresql.org/docs/9.4/static/rangetypes.html). You can
therefore use stRange.js to parse and stringify ranges for your database.

**Examples**:
```javascript
new Range(1, 5).toString() // => "[1,5]"
new Range(1, 10, "[)").toString() // => "[1,10)"
```
