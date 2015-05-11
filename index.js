module.exports = Range

function Range(begin, end, bounds) {
  if (!(this instanceof Range)) return new Range(begin, end, bounds)
  this.begin = begin
  this.end = end
  this.bounds = bounds === undefined ? "[]" : bounds
}

Range.prototype.toString = function() {
  var bounds = this.bounds
  return bounds[0] + stringify(this.begin) +","+ stringify(this.end) + bounds[1]
}

function stringify(value) {
  return value == null || isInfinity(value) ? "" : String(value)
}

function isInfinity(value) { return value === Infinity || value === -Infinity }
