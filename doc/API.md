Strange.js API Documentation
============================
### [Range](#Range)
- [begin](#range.begin)
- [bounds](#range.bounds)
- [end](#range.end)
- [intersects](#Range.prototype.intersects)(other)
- [isEmpty](#Range.prototype.isEmpty)()
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
therefore use Strange.js to parse and stringify ranges for your database.

**Examples**:
```javascript
new Range(1, 5).toString() // => "[1,5]"
new Range(1, 10, "[)").toString() // => "[1,10)"
```
