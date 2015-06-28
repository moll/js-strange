module.exports = Range

function Range(begin, end, bounds) {
  if (!(this instanceof Range)) return new Range(begin, end, bounds)
  this.begin = begin
  this.end = end
  this.bounds = bounds === undefined ? "[]" : bounds
}

Range.prototype.isEmpty = function() {
  if (this.begin === undefined || this.end === undefined) return true
  return equal(this.begin, this.end) && this.bounds != "[]"
}

Range.prototype.isIntersecting = function(other) {
  if (this.isEmpty()) return false
  if (other.isEmpty()) return false
  return isBeginBeforeEnd(this, other) && isBeginBeforeEnd(other, this)
}

Range.prototype.toString = function() {
  var a = stringify(this.begin)
  var b = stringify(this.end)
  return this.bounds[0] + a + "," + b + this.bounds[1]
}

Range.prototype.toJSON = Range.prototype.toString
Range.prototype.inspect = Range.prototype.toString

Range.parse = function(range, parse) {
  var endpoints = range.slice(1, -1).split(",", 2)
  var begin = endpoints[0] ? parse ? parse(endpoints[0]) : endpoints[0] : null
  var end = endpoints[1] ? parse ? parse(endpoints[1]) : endpoints[1] : null
  return new Range(begin, end, range[0] + range[range.length - 1])
}

function stringify(value) { return isInfinite(value) ? "" : String(value) }

function isInfinite(value) {
  return value === null || value === Infinity || value === -Infinity
}

// Use < and > for coercion into valueOf.
function equal(a, b) { return !(a < b || a > b) }

function isBeginBeforeEnd(a, b) {
  if (a.bounds[0] == "[" && b.bounds[1] == "]") return a.begin <= b.end
  else return a.begin < b.end
}
