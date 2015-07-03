module.exports = Range

/**
 * Create a new range object with the given begin and end endpoints.  
 * You can also pass a two character string for bounds. Defaults to` "[]"` for
 * an all inclusive range.
 *
 * You can use any value for endpoints. `Null` is considered infinity for
 * values that don't have a special infinity type like `Number` has `Infinity`.
 *
 * @example
 * new Range(10, 20) // => {begin: 10, end: 20, bounds: "[]"}
 * new Range(new Date(2000, 5, 18), new Date(2000, 5, 22)
 *
 * @class Range
 * @constructor
 * @param begin
 * @param end
 * @param [bounds]
 */
function Range(begin, end, bounds) {
  if (!(this instanceof Range)) return new Range(begin, end, bounds)

  /**
   * Range's beginning, or left endpoint.
   *
   * @property begin
   */
  this.begin = begin

  /**
   * Range's end, or right endpoint.
   *
   * @property end
   */
  this.end = end

  /**
   * Range's bounds.
   *
   * Bounds signify whether the range includes or excludes that particular
   * endpoint.
   *
   * Pair | Meaning
   * -----|--------
   * `()` | open
   * `[]` | closed
   * `[)` | left-closed, right-open
   * `(]` | left-open, right-closed
   *
   * @example
   * new Range(1, 5).bounds // => "[]"
   * new Range(1, 5, "[)").bounds // => "[)"
   *
   * @property {String} bounds
   */
   this.bounds = bounds === undefined ? "[]" : bounds
}

/**
 * Check whether the range is empty.  
 * An empty range is one with `undefined` endpoints (like `new Range`) or
 * a range with two equivalent, but exculsive endpoints (`new Range(5, 5,
 * "[)")`).
 *
 * Equivalence is checked by using the `<` operators, so value objects will be
 * coerced into something comparable by JavaScript. That usually means calling
 * the object's `valueOf` function.
 *
 * @example
 * new Range().isEmpty() // => true
 * new Range(5, 5, "[)").isEmpty() // => true
 * new Range(1, 10).isEmpty() // => false
 *
 * @method isEmpty
 */
Range.prototype.isEmpty = function() {
  if (this.begin === undefined || this.end === undefined) return true
  return this.bounds != "[]" && isEqual(this.begin, this.end)
}

/**
 * Check whether the range is unbounded.  
 * An unbounded range is one where either endpoint is `null` or `Infinity`. An
 * empty range is not considered unbounded.
 *
 * @example
 * new Range().isUnbounded() // => false
 * new Range(5, 5).isUnbounded() // => false
 * new Range(null, new Date(2000, 5, 18).isUnbounded() // => true
 * new Range(0, Infinity).isUnbounded() // => true
 * new Range(-Infinity, Infinity).isUnbounded() // => true
 *
 * @method isUnbounded
 */
Range.prototype.isUnbounded = function() {
  if (this.begin === undefined || this.end === undefined) return false
  return isInfinity(this.begin) || isInfinity(this.end)
}

/**
 * Check if a given value is contained within this range.  
 * Returns `true` or `false`.
 *
 * @example
 * new Range(0, 10).contains(5) // => true
 * new Range(0, 10).contains(10) // => true
 * new Range(0, 10, "[)").contains(10) // => false
 *
 * @method contains
 * @param value
 */
Range.prototype.contains = function(value) {
  var a = this.begin
  var b = this.end

  return (
    (b === null || (this.bounds[1] === "]" ? value <= b : value < b)) &&
    (a === null || (this.bounds[0] === "[" ? a <= value : a < value))
  )
}

/**
 * Check if this range intersects with another.  
 * Returns `true` or `false`.
 *
 * Ranges that have common points intersect. Ranges that are consecutive and
 * with *inclusive* endpoints are also intersecting. An empty range will never
 * intersect.
 *
 * @example
 * new Range(0, 10).intersects(new Range(5, 7)) // => true
 * new Range(0, 10).intersects(new Range(10, 20)) // => true
 * new Range(0, 10, "[)").intersects(new Range(10, 20)) // => false
 * new Range(0, 10).intersects(new Range(20, 30)) // => false
 *
 * @method intersects
 * @param other
 */
Range.prototype.intersects = function(other) {
  if (this.isEmpty()) return false
  if (other.isEmpty()) return false
  return isBeginBeforeEnd(this, other) && isBeginBeforeEnd(other, this)
}

/**
 * Stringifies a range in `[a,b]` format.
 *
 * This happens to match the string format used by [PostgreSQL's range type
 * format](http://www.postgresql.org/docs/9.4/static/rangetypes.html). You can
 * therefore use stRange.js to parse and stringify ranges for your database.
 *
 * @example
 * new Range(1, 5).toString() // => "[1,5]"
 * new Range(1, 10, "[)").toString() // => "[1,10)"
 *
 * @method toString
 */
Range.prototype.toString = function() {
  // FIXME: How to serialize an empty range with undefined endpoints?
  var a = stringify(this.begin)
  var b = stringify(this.end)
  return this.bounds[0] + a + "," + b + this.bounds[1]
}

/**
 * Stringifies the range when passing it to `JSON.stringify`.  
 * This way you don't need to manually call `toString` when stringifying.
 *
 * @example
 * JSON.stringify(new Range(1, 10)) // "\"[1,10]\""
 *
 * @method toJSON
 * @alias toString
 */
Range.prototype.toJSON = Range.prototype.toString
Range.prototype.inspect = Range.prototype.toString

/**
 * Parses a string stringified by
 * [`Range.prototype.toString`](#Range.prototype.toString).
 *
 * To have it also parse the endpoints to something other than a string, pass
 * a function as the second argument.
 *
 * @example
 * Range.parse("[a,z)") // => new Range("a", "z", "[)")
 * Range.parse("[42,69]", Number) // => new Range(42, 69)
 *
 * @static
 * @method parse
 * @param {String} range
 * @param {Function} [parseEndpoint]
 */
Range.parse = function(range, parse) {
  var endpoints = range.slice(1, -1).split(",", 2)
  var begin = endpoints[0] ? parse ? parse(endpoints[0]) : endpoints[0] : null
  var end = endpoints[1] ? parse ? parse(endpoints[1]) : endpoints[1] : null
  return new Range(begin, end, range[0] + range[range.length - 1])
}

function stringify(value) { return isInfinity(value) ? "" : String(value) }

function isInfinity(value) {
  return value === null || value === Infinity || value === -Infinity
}

// Use < and > for coercion into valueOf.
function isEqual(a, b) { return !(a < b || b < a) }

function isBeginBeforeEnd(a, b) {
  if (a.bounds[0] === "[" && b.bounds[1] === "]") return a.begin <= b.end
  else return a.begin < b.end
}
