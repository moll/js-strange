var Range = require("./")
var concat = Array.prototype.concat.bind(Array.prototype)
var EMPTY_ARR = Array.prototype
module.exports = RangeTree

/**
 * Create an interval tree node.
 *
 * For creating a binary search tree out of an array of ranges, you might want
 * to use [`RangeTree.from`](#RangeTree.from).
 *
 * **Import**:
 * ```javascript
 * var RangeTree = require("strange/tree")
 * ```
 *
 * @example
 * var left = new RangeTree([new Range(-5, 0)])
 * var right = new RangeTree([new Range(5, 10)])
 * var root = new RangeTree([new Range(0, 5), new Range(0, 10)], left, right]
 * root.search(7) // => [new Range(0, 10), new Range(5, 10)]
 *
 * @class RangeTree
 * @constructor
 * @param {Object|Object[]} ranges
 * @param {RangeTree} left
 * @param {RangeTree} right
 */
function RangeTree(keys, left, right) {
  // Store the longest range first.
  if (Array.isArray(keys)) this.keys = keys.slice().sort(reverseCompareEndToEnd)
  else this.keys = [keys]

  this.left = left || null
  this.right = right || null

  var a = this.left ? this.left.range : this.keys[0]
  var b = this.right ? this.right.range : this.keys[0]
  this.range = Range.union(a, b)
}

/**
 * Create an interval tree (implemented as an augmented binary search tree)
 * from an array of ranges.  
 * Returns a [`RangeTree`](#RangeTree) you can search on.
 *
 * If you need to relate the found ranges to other data, add some properties
 * directly to every range _or_ use JavaScript's `Map` or `WeakMap` to relate
 * extra data to those range instances.
 *
 * @example
 * var ranges = [new Range(0, 10), new Range(20, 30), new Range(40, 50)]
 * RangeTree.from(ranges).search(42) // => [new Range(40, 50)]
 *
 * @static
 * @method from
 * @param {Range[]} ranges
 */
RangeTree.from = function(ranges) {
  ranges = ranges.slice()
  ranges = ranges.sort(Range.compareBeginToBegin)
  ranges = ranges.map(arrayify)
  ranges = ranges.reduce(dedupe, [])
  return this.new(ranges)
}

RangeTree.new = function(ranges) {
  switch (ranges.length) {
    case 0: return new this(new Range)
    case 1: return new this(ranges[0])
    case 2: return new this(ranges[0], null, new this(ranges[1]))

    default:
      var middle = Math.floor(ranges.length / 2)
      var left = this.new(ranges.slice(0, middle))
      var right = this.new(ranges.slice(middle + 1))
      return new this(ranges[middle], left, right)
  }
}

/**
 * Search for ranges that include the given value or, given a range, intersect
 * with it.  
 * Returns an array of matches or an empty one if no range contained or
 * intersected with the given value.
 *
 * @example
 * var tree = RangeTree.from([new Range(40, 50)])
 * tree.search(42) // => [new Range(40, 50)]
 * tree.search(13) // => []
 * tree.search(new Range(30, 42)) // => [new Range(40, 50)]
 *
 * @method search
 * @param {Object} valueOrRange
 */
RangeTree.prototype.search = function(value) {
  if (value instanceof Range) return this.searchByRange(value)
  else return this.searchByValue(value)
}

RangeTree.prototype.searchByValue = function(value) {
  if (!this.range.contains(value)) return EMPTY_ARR

  var ownPosition = this.keys[0].compareBegin(value)

  return concat(
    this.left ? this.left.searchByValue(value) : EMPTY_ARR,
    ownPosition <= 0 ? this.searchOwnByValue(value) : EMPTY_ARR,
    this.right && ownPosition < 0 ? this.right.searchByValue(value) : EMPTY_ARR
  )
}

RangeTree.prototype.searchByRange = function(range) {
  if (!this.range.intersects(range)) return EMPTY_ARR

  var ownPosition = Range.compareBeginToEnd(this.keys[0], range)

  return concat(
    this.left ? this.left.searchByRange(range) : EMPTY_ARR,
    ownPosition <= 0 ? this.searchOwnByRange(range) : EMPTY_ARR,
    this.right && ownPosition < 0 ? this.right.searchByRange(range) : EMPTY_ARR
  )
}

// Sort ranges in ascending order for beauty. O:)
RangeTree.prototype.searchOwnByValue = function(value) {
  return take(this.keys, function(r) { return r.contains(value) }).reverse()
}

RangeTree.prototype.searchOwnByRange = function(range) {
  return take(this.keys, function(r) { return r.intersects(range) }).reverse()
}

function reverseCompareEndToEnd(a, b) {
  return Range.compareEndToEnd(a, b) * -1
}

function dedupe(ranges, range) {
  var last = ranges[ranges.length - 1]

  if (last != null && Range.compareBeginToBegin(last[0], range[0]) === 0)
    last.push(range[0])
  else
    ranges.push(range)

  return ranges
}

function take(arr, fn) {
  var values = []
  for (var i = 0; i < arr.length && fn(arr[i], i); ++i) values.push(arr[i])
  return values
}

function arrayify(obj) { return [obj] }
