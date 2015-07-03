## Unreleased
- Adds [`Range.prototype.isUnbounded`][].

[`Range.prototype.isUnbounded`]: https://github.com/moll/js-strange/blob/master/doc/API.md#Range.prototype.isUnbounded

## 1.1.0 (Jun 29, 2015)
- Adds `Range.prototype.isEmpty`.
- Adds `Range.prototype.intersects`.
- Adds `Range.prototype.contains`.

## 1.0.0 (May 11, 2015)
- Adds support for setting range bounds with `new Range(1, 3, "[)")` to set
  a left-closed, right-open range.
- Adds `Range.prototype.toString` to stringify a range.
- Adds `Range.prototype.toJSON` as an alias to `Range.prototype.toString`.
- Adds `Range.parse` to parse the stringified range.

## 0.1.337 (Oct 9, 2013)
- First release. Its future is an infinite exclusive range.
