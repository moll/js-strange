module.exports = Range

function Range(begin, end, bounds) {
  if (!(this instanceof Range)) return new Range(begin, end, bounds)
  this.begin = begin
  this.end = end
  this.bounds = bounds === undefined ? "[]" : bounds
}
