module.exports = Range

function Range(begin, end, bounds) {
  if (!(this instanceof Range)) return new Range(begin, end, bounds)
  this.begin = begin
  this.end = end
  this.bounds = bounds === undefined ? "[]" : bounds
}

Range.prototype.isEmpty = function() {
  return equal(this.begin, this.end) && this.bounds != "[]"
}

Range.prototype.toString = function() {
  var bounds = this.bounds
  return bounds[0] + stringify(this.begin) +","+ stringify(this.end) + bounds[1]
}

Range.prototype.toJSON = Range.prototype.toString
Range.prototype.inspect = Range.prototype.toString

Range.parse = function(range, parse) {
  var endpoints = range.slice(1, -1).split(",", 2)
  var begin = endpoints[0] ? parse ? parse(endpoints[0]) : endpoints[0] : null
  var end = endpoints[1] ? parse ? parse(endpoints[1]) : endpoints[1] : null
  return new Range(begin, end, range[0] + range[range.length - 1])
}

function stringify(value) {
  return value == null || isInfinity(value) ? "" : String(value)
}

function isInfinity(value) { return value === Infinity || value === -Infinity }
// Use < and > for coercion into valueOf.
function equal(a, b) { return !(a < b || a > b) }
