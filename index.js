module.exports = Range

function Range(begin, end) {
  if (!(this instanceof Range)) return new Range(begin, end)
  this.begin = begin
  this.end = end
}
