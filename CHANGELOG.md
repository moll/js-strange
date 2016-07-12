## Unreleased
- Adds [`Range.prototype.valueOf`][] to get a more primitive representation of a range.  
  Useful with [Egal.js][egal] or other libraries that compare value objects by their `valueOf` output.

[`Range.prototype.valueOf`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.valueOf
[egal]: https://github.com/moll/js-egal

## 1.4.0 (Jul 8, 2016)
- Makes `Range.prototype` a valid empty `Range`.  
  Allows you to use it as an empty range:

  ```javascript
  var EMPTY_RANGE = Range.prototype
  EMPTY_RANGE.isEmpty() // => true
  EMPTY_RANGE.contains(new Range(0, 1)) // => false
  ```

## 1.3.0 (Jul 17, 2015)
- Adds [`Range.compareBeginToBegin`][].
- Adds [`Range.compareEndToEnd`][].
- Adds [`Range.union`][].
- Adds [`Range.prototype.compareBegin`][].
- Adds [`Range.prototype.compareEnd`][].

- Sets numeric unbounded endpoints to `-Infinity`/`Infinity` if you pass
  `Number` to [`Range.parse`][] as the parse function.

  ```javascript
  Range.parse("[15,]", Number) // => new Range(15, Infinity)
  Range.parse("(,3.14]", Number) // => new Range(-Infinity, 3.14, "(]")
  ```

- Fixes [`Range.prototype.intersects`][] to handle exclusive unbounded ranges
  properly.

- Adds [`RangeTree`] for creating an interval tree (augmented binary search
  tree) for searching ranges that intersect with a given value.

[`Range.compareBeginToBegin`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.compareBeginToBegin
[`Range.compareEndToEnd`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.compareEndToEnd
[`Range.union`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.union
[`Range.prototype.compareBegin`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.compareBegin
[`Range.prototype.compareEnd`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.compareEnd
[`RangeTree`]: https://github.com/moll/js-strange/blob/master/doc/API.md#RangeTree

## 1.2.0 (Jul 4, 2015)
- Adds [`Range.prototype.isBounded`][].
- Adds [`Range.prototype.isUnbounded`][].
- Adds [`Range.prototype.isFinite`][].
- Adds [`Range.prototype.isInfinite`][].

[`Range.prototype.isBounded`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isBounded
[`Range.prototype.isUnbounded`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isUnbounded
[`Range.prototype.isFinite`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isFinite
[`Range.prototype.isInfinite`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isInfinite

## 1.1.0 (Jun 29, 2015)
- Adds [`Range.prototype.isEmpty`][].
- Adds [`Range.prototype.intersects`][].
- Adds [`Range.prototype.contains`][].

[`Range.prototype.isEmpty`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isEmpty
[`Range.prototype.intersects`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.intersects
[`Range.prototype.contains`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.contains

## 1.0.0 (May 11, 2015)
- Adds support for setting range bounds with `new Range(1, 3, "[)")` to set
  a left-closed, right-open range.
- Adds [`Range.prototype.toString`][] to stringify a range.
- Adds [`Range.prototype.toJSON`][] as an alias to `Range.prototype.toString`.
- Adds [`Range.parse`][] to parse the stringified range.

[`Range.prototype.toString`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.toString
[`Range.prototype.toJSON`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.toJSON
[`Range.parse`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.parse

## 0.1.337 (Oct 9, 2013)
- First release. Its future is an infinite exclusive range.
