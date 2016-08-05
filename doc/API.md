stRange.js API Documentation
============================
### [Range](#Range)
- [begin](#range.begin)
- [bounds](#range.bounds)
- [end](#range.end)
- [.prototype.compareBegin](#Range.prototype.compareBegin)(begin)
- [.prototype.compareEnd](#Range.prototype.compareEnd)(end)
- [.prototype.contains](#Range.prototype.contains)(value)
- [.prototype.intersects](#Range.prototype.intersects)(other)
- [.prototype.isBounded](#Range.prototype.isBounded)()
- [.prototype.isEmpty](#Range.prototype.isEmpty)()
- [.prototype.isFinite](#Range.prototype.isFinite)()
- [.prototype.isInfinite](#Range.prototype.isInfinite)()
- [.prototype.isUnbounded](#Range.prototype.isUnbounded)()
- [.prototype.toJSON](#Range.prototype.toJSON)()
- [.prototype.toString](#Range.prototype.toString)()
- [.prototype.valueOf](#Range.prototype.valueOf)()
- [.compareBeginToBegin](#Range.compareBeginToBegin)(a, b)
- [.compareBeginToEnd](#Range.compareBeginToEnd)(a, b)
- [.compareEndToEnd](#Range.compareEndToEnd)(a, b)
- [.parse](#Range.parse)(range, [parseEndpoint])
- [.union](#Range.union)(union, a, b)

### [RangeTree](#RangeTree)
- [.prototype.search](#RangeTree.prototype.search)(valueOrRange)
- [.from](#RangeTree.from)(ranges)


<a name="Range" />
Range(begin, end, [bounds])
---------------------------
Create a new range object with the given begin and end endpoints.  
You can also pass a two character string for bounds. Defaults to` "[]"` for
an all inclusive range.

You can use any value for endpoints. `Null` is considered infinity for
values that don't have a special infinity type like `Number` has `Infinity`.

An empty range is one where either of the endpoints is `undefined` (like `new
Range`) or a range with two equivalent, but exculsive endpoints
(`new Range(5, 5, "[)")`).

**Import**:
```javascript
var Range = require("strange")
```

**Examples**:
```javascript
new Range(10, 20) // => {begin: 10, end: 20, bounds: "[]"}
new Range(new Date(2000, 5, 18), new Date(2000, 5, 22))
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

<a name="Range.prototype.compareBegin" />
### Range.prototype.compareBegin(begin)
Compares this range's beginning with the given value.  
Returns `-1` if this range begins before the given value, `0` if they're
equal and `1` if this range begins after the given value.

`null` is considered to signify negative infinity for non-numeric range
endpoints.

**Examples**:
```javascript
new Range(0, 10).compareBegin(5) // => -1
new Range(0, 10).compareBegin(0) // => 0
new Range(5, 10).compareBegin(0) // => 1
new Range(5, 10).compareBegin(null) // => 1
```

<a name="Range.prototype.compareEnd" />
### Range.prototype.compareEnd(end)
Compares this range's end with the given value.  
Returns `-1` if this range ends before the given value, `0` if they're
equal and `1` if this range ends after the given value.

`null` is considered to signify positive infinity for non-numeric range
endpoints.

**Examples**:
```javascript
new Range(0, 10).compareEnd(5) // => -1
new Range(0, 10).compareEnd(10) // => 0
new Range(0, 5).compareEnd(10) // => 1
new Range(0, 5).compareEnd(null) // => -1
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
An empty range is one where either of the endpoints is `undefined` (like `new
Range`) or a range with two equivalent, but exculsive endpoints
(`new Range(5, 5, "[)")`).

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

<a name="Range.prototype.valueOf" />
### Range.prototype.valueOf()
Returns an array of the endpoints and bounds.

Useful with [Egal.js](https://github.com/moll/js-egal) or other libraries
that compare value objects by their `valueOf` output.

**Examples**:
```javascript
new Range(1, 10, "[)").valueOf() // => [1, 10, "[)"]
```

<a name="Range.compareBeginToBegin" />
### Range.compareBeginToBegin(a, b)
Compares two range's beginnings.  
Returns `-1` if `a` begins before `b` begins, `0` if they're equal and `1`
if `a` begins after `b`.

**Examples**:
```javascript
Range.compareBeginToBegin(new Range(0, 10), new Range(5, 15)) // => -1
Range.compareBeginToBegin(new Range(0, 10), new Range(0, 15)) // => 0
Range.compareBeginToBegin(new Range(0, 10), new Range(0, 15, "()")) // => 1
```

<a name="Range.compareBeginToEnd" />
### Range.compareBeginToEnd(a, b)
Compares the first range's beginning to the second's end.  
Returns `<0` if `a` begins before `b` ends, `0` if one starts where the other
ends and `>1` if `a` begins after `b` ends.

**Examples**:
```javascript
Range.compareBeginToEnd(new Range(0, 10), new Range(0, 5)) // => -1
Range.compareBeginToEnd(new Range(0, 10), new Range(-10, 0)) // => 0
Range.compareBeginToEnd(new Range(0, 10), new Range(-10, -5)) // => 1
```

<a name="Range.compareEndToEnd" />
### Range.compareEndToEnd(a, b)
Compares two range's endings.  
Returns `-1` if `a` ends before `b` ends, `0` if they're equal and `1`
if `a` ends after `b`.

**Examples**:
```javascript
Range.compareEndToEnd(new Range(0, 10), new Range(5, 15)) // => -1
Range.compareEndToEnd(new Range(0, 10), new Range(5, 10)) // => 0
Range.compareEndToEnd(new Range(0, 10), new Range(5, 10, "()")) // => 1
```

<a name="Range.parse" />
### Range.parse(range, [parseEndpoint])
Parses a string stringified by
[`Range.prototype.toString`](#Range.prototype.toString).

To have it also parse the endpoints to something other than a string, pass
a function as the second argument.

If you pass `Number` as the _parse_ function and the endpoints are
unbounded, they'll be set to `Infinity` for easier computation.

**Examples**:
```javascript
Range.parse("[a,z)") // => new Range("a", "z", "[)")
Range.parse("[42,69]", Number) // => new Range(42, 69)
Range.parse("[15,]", Number) // => new Range(15, Infinity)
Range.parse("(,3.14]", Number) // => new Range(-Infinity, 3.14, "(]")
```

<a name="Range.union" />
### Range.union(union, a, b)
Merges two ranges and returns a range that encompasses both of them.  
The ranges don't have to be intersecting.

**Examples**:
```javascript
Range.union(new Range(0, 5), new Range(5, 10)) // => new Range(0, 10)
Range.union(new Range(0, 10), new Range(5, 15)) // => new Range(0, 15)

var a = new Range(-5, 0, "()")
var b = new Range(5, 10)
Range.union(a, b) // => new Range(-5, 10, "(]")
```


<a name="RangeTree" />
RangeTree(ranges, left, right)
------------------------------
Create an interval tree node.

For creating a binary search tree out of an array of ranges, you might want
to use [`RangeTree.from`](#RangeTree.from).

**Import**:
```javascript
var RangeTree = require("strange/tree")
```

**Examples**:
```javascript
var left = new RangeTree([new Range(-5, 0)])
var right = new RangeTree([new Range(5, 10)])
var root = new RangeTree([new Range(0, 5), new Range(0, 10)], left, right]
root.search(7) // => [new Range(0, 10), new Range(5, 10)]
```

<a name="RangeTree.prototype.search" />
### RangeTree.prototype.search(valueOrRange)
Search for ranges that include the given value or, given a range, intersect
with it.  
Returns an array of matches or an empty one if no range contained or
intersected with the given value.

**Examples**:
```javascript
var tree = RangeTree.from([new Range(40, 50)])
tree.search(42) // => [new Range(40, 50)]
tree.search(13) // => []
tree.search(new Range(30, 42)) // => [new Range(40, 50)]
```

<a name="RangeTree.from" />
### RangeTree.from(ranges)
Create an interval tree (implemented as an augmented binary search tree)
from an array of ranges.  
Returns a [`RangeTree`](#RangeTree) you can search on.

If you need to relate the found ranges to other data, add some properties
directly to every range _or_ use JavaScript's `Map` or `WeakMap` to relate
extra data to those range instances.

**Examples**:
```javascript
var ranges = [new Range(0, 10), new Range(20, 30), new Range(40, 50)]
RangeTree.from(ranges).search(42) // => [new Range(40, 50)]
```
