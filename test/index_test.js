var Range = require("..")

describe("Range", function() {
  describe("new", function() {
    it("must return an instance of Range", function() {
      new Range().must.be.an.instanceof(Range)
    })

    it("must set begin and end with default bounds", function() {
      var range = new Range(42, 69)
      range.begin.must.equal(42)
      range.end.must.equal(69)
      range.bounds.must.equal("[]")
    })

    it("must set bounds", function() {
      var range = new Range(42, 69, "()")
      range.begin.must.equal(42)
      range.end.must.equal(69)
      range.bounds.must.equal("()")
    })

    it("must set bounds to undefined if not given", function() {
      var range = new Range
      range.must.have.property("begin", undefined)
      range.must.have.property("end", undefined)
      range.bounds.must.equal("[]")
    })
  })

  describe("when called as a function", function() {
    it("must return an instance of Range", function() {
      Range().must.be.an.instanceof(Range)
    })

    it("must set begin and end with given bounds", function() {
      var range = Range(42, 69, "()")
      range.begin.must.equal(42)
      range.end.must.equal(69)
      range.bounds.must.equal("()")
    })
  })

  describe(".prototype", function() {
    it("must be a valid range", function() {
      Range.prototype.isEmpty().must.be.true()
      Range.prototype.contains(new Range(0, 1)).must.be.false()
    })
  })

  describe(".prototype.isEmpty", function() {
    it("must return true given a range with undefined endpoints", function() {
      new Range(undefined, undefined).isEmpty().must.be.true()
      new Range(null, undefined).isEmpty().must.be.true()
      new Range(undefined, null).isEmpty().must.be.true()
    })

    it("must return false given an unbounded range", function() {
      new Range(null, null).isEmpty().must.be.false()
    })

    it("must return false given an unbounded exclusive range", function() {
      new Range(null, null, "()").isEmpty().must.be.false()
    })

    it("must return true if exclusive with equivalent endpoints", function() {
      new Range(1, 1, "()").isEmpty().must.be.true()
      new Range(1, 1, "[)").isEmpty().must.be.true()
      new Range(1, 1, "(]").isEmpty().must.be.true()
    })

    it("must return false if inclusive with equivalent endpoints", function() {
      new Range(1, 1, "[]").isEmpty().must.be.false()
    })

    it("must return false if exclusive with non-equivalent endpoints",
      function() {
      new Range(1, 2, "()").isEmpty().must.be.false()
    })
  })

  describe(".prototype.isBounded", function() {
    it("must return true given a range with undefined endpoints", function() {
      new Range(undefined, undefined).isBounded().must.be.true()
    })

    it("must return true given a range with undefined endpoints", function() {
      new Range(null, undefined).isBounded().must.be.true()
      new Range(undefined, null).isBounded().must.be.true()
    })

    it("must return false given an unbounded range", function() {
      new Range(null, null).isBounded().must.be.false()
    })

    it("must return false given a left unbounded range", function() {
      new Range(null, 1).isBounded().must.be.false()
    })

    it("must return false given a right unbounded range", function() {
      new Range(1, null).isBounded().must.be.false()
    })

    it("must return false given an unbounded range with Infinity", function() {
      new Range(-Infinity, Infinity).isBounded().must.be.false()
    })

    it("must return false given a left unbounded range with Infinity",
      function() {
      new Range(-Infinity, 1).isBounded().must.be.false()
    })

    it("must return false given a right unbounded range with Infinity",
      function() {
      new Range(1, Infinity).isBounded().must.be.false()
    })

    it("must return true given a bounded range", function() {
      new Range(1, 1).isBounded().must.be.true()
    })
  })

  describe(".prototype.isUnbounded", function() {
    it("must return false given a range with undefined endpoints", function() {
      new Range(undefined, undefined).isUnbounded().must.be.false()
    })

    it("must return false given a range with undefined endpoints", function() {
      new Range(null, undefined).isUnbounded().must.be.false()
      new Range(undefined, null).isUnbounded().must.be.false()
    })

    it("must return true given an unbounded range", function() {
      new Range(null, null).isUnbounded().must.be.true()
    })

    it("must return true given a left unbounded range", function() {
      new Range(null, 1).isUnbounded().must.be.true()
    })

    it("must return true given a right unbounded range", function() {
      new Range(1, null).isUnbounded().must.be.true()
    })

    it("must return true given an unbounded range with Infinity", function() {
      new Range(-Infinity, Infinity).isUnbounded().must.be.true()
    })

    it("must return true given a left unbounded range with Infinity",
      function() {
      new Range(-Infinity, 1).isUnbounded().must.be.true()
    })

    it("must return true given a right unbounded range with Infinity",
      function() {
      new Range(1, Infinity).isUnbounded().must.be.true()
    })

    it("must return false given a bounded range", function() {
      new Range(1, 1).isUnbounded().must.be.false()
    })
  })

  describe(".prototype.isFinite", function() {
    it("must be an alias to Range.prototype.isBounded", function() {
      Range.prototype.isFinite.must.equal(Range.prototype.isBounded)
    })
  })

  describe(".prototype.isInfinite", function() {
    it("must be an alias to Range.prototype.isInfinite", function() {
      Range.prototype.isInfinite.must.equal(Range.prototype.isUnbounded)
    })
  })

  describe(".prototype.compareBegin", function() {
    describe("with inclusive bound", function() {
      it("must return 0 if given endpoint equal", function() {
        new Range(0, 10, "[)").compareBegin(0).must.equal(0)
      })

      it("must return 0 if unbounded and equal", function() {
        new Range(null, 10, "[)").compareBegin(null).must.equal(0)
      })

      it("must return -1 if given endpoint greater than", function() {
        new Range(0, 10, "[)").compareBegin(11).must.equal(-1)
      })

      it("must return -1 if unbounded", function() {
        new Range(null, 10, "[)").compareBegin(11).must.equal(-1)
      })

      it("must return 1 if given endpoint less than", function() {
        new Range(0, 10, "[)").compareBegin(-1).must.equal(1)
      })

      it("must return 1 given null", function() {
        new Range(0, 10, "[)").compareBegin(null).must.equal(1)
      })
    })

    describe("with exclusive bound", function() {
      it("must return -1 if given endpoint greater than", function() {
        new Range(0, 10, "(]").compareBegin(1).must.equal(-1)
      })

      it("must return -1 if unbounded", function() {
        new Range(null, 10, "(]").compareBegin(11).must.equal(-1)
      })

      it("must return 1 if given endpoint equal", function() {
        new Range(0, 10, "(]").compareBegin(0).must.equal(1)
      })

      it("must return 1 if unbounded and equal", function() {
        new Range(null, 10, "(]").compareBegin(null).must.equal(1)
      })

      it("must return 1 if given endpoint less than", function() {
        new Range(0, 10, "(]").compareBegin(-1).must.equal(1)
      })

      it("must return 1 given null", function() {
        new Range(0, 10, "(]").compareBegin(null).must.equal(1)
      })
    })
  })

  describe(".prototype.compareEnd", function() {
    describe("with inclusive bound", function() {
      it("must return 0 if given endpoint equal", function() {
        new Range(0, 10, "(]").compareEnd(10).must.equal(0)
      })

      it("must return 0 if unbounded and equal", function() {
        new Range(0, null, "(]").compareEnd(null).must.equal(0)
      })

      it("must return -1 if given endpoint greater than", function() {
        new Range(0, 10, "(]").compareEnd(11).must.equal(-1)
      })

      it("must return -1 if given null", function() {
        new Range(0, 10, "(]").compareEnd(null).must.equal(-1)
      })

      it("must return 1 if given endpoint less than", function() {
        new Range(0, 10, "(]").compareEnd(9).must.equal(1)
      })

      it("must return 1 if unbounded", function() {
        new Range(0, null, "(]").compareEnd(-1).must.equal(1)
      })
    })

    describe("with exclusive bound", function() {
      it("must return 1 if given endpoint equal", function() {
        new Range(0, 10, "[)").compareEnd(0).must.equal(1)
      })

      it("must return -1 if given endpoint greater than", function() {
        new Range(0, 10, "[)").compareEnd(11).must.equal(-1)
      })

      it("must return -1 if unbounded and equal", function() {
        new Range(10, null, "[)").compareEnd(null).must.equal(-1)
      })

      it("must return -1 if given null", function() {
        new Range(0, 10, "(]").compareEnd(null).must.equal(-1)
      })

      it("must return 1 if given endpoint less than", function() {
        new Range(0, 10, "[)").compareEnd(-1).must.equal(1)
      })

      it("must return 1 if unbounded", function() {
        new Range(0, null, "[)").compareEnd(-1).must.equal(1)
      })
    })
  })

  describe(".prototype.contains", function() {
    it("must return true when contained", function() {
      new Range(10, 20).contains(15).must.be.true()
    })

    it("must return false when intersecting, but of zero size", function() {
      new Range(5, 5, "[)").contains(5).must.be.false()
    })

    it("must return true when on inclusive boundary", function() {
      new Range(0, 10, "(]").contains(10).must.be.true()
      new Range(0, 10, "[)").contains(0).must.be.true()
    })

    it("must return false when on exclusive boundary", function() {
      new Range(0, 10, "[)").contains(10).must.be.false()
      new Range(0, 10, "(]").contains(0).must.be.false()
    })

    it("must return false when empty", function() {
      new Range().contains(5).must.be.false()
    })

    it("must return true if one endpoint unbounded", function() {
      new Range(0, null).contains(10).must.be.true()
      new Range(null, 0).contains(-10).must.be.true()
    })

    it("must return true if one endpoint unbounded and on inclusive boundary",
      function() {
      new Range(0, null).contains(0).must.be.true()
      new Range(null, 0).contains(0).must.be.true()
    })

    it("must return false if one endpoint unbounded and on exclusive boundary",
      function() {
      new Range(0, null, "(]").contains(0).must.be.false()
      new Range(null, 0, "[)").contains(0).must.be.false()
    })

    it("must return false if one endpoint undefined", function() {
      new Range(0, undefined).contains(0).must.be.false()
      new Range(undefined, 0).contains(0).must.be.false()
    })
  })

  describe(".prototype.intersects", function() {
    function intersects(a, b) {
      var result = a.intersects(b)
      b.intersects(a).must.equal(result)
      return result
    }

    function testWithBounds(bounds) {
      it("must return true when equal", function() {
        var a = new Range(10, 20, bounds)
        var b = new Range(10, 20, bounds)
        intersects(a, b).must.be.true()
      })

      it("must return true when intersecting", function() {
        var a = new Range(10, 20, bounds)
        var b = new Range(5, 15, bounds)
        intersects(a, b).must.be.true()
      })

      it("must return false when intersecting, but one empty", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(undefined, undefined, bounds)
        intersects(a, b).must.be.false()
      })

      it("must return false when intersecting, but one of zero size",
        function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(5, 5, "[)")
        intersects(a, b).must.be.false()
      })

      it("must return false when not intersecting", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(30, 40, bounds)
        intersects(a, b).must.be.false()
      })

      it("must return true when intersecting and one unbounded", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(5, null, bounds)
        intersects(a, b).must.be.true()
      })

      it("must return true when one encloses the other", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(3, 6, bounds)
        intersects(a, b).must.be.true()
      })

      it("must return true when one encloses the other and is unbounded",
        function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(null, null, bounds)
        intersects(a, b).must.be.true()
      })
    }

    describe("with inclusive bounds", testWithBounds.bind(null, "[]"))
    describe("with exclusive bounds", testWithBounds.bind(null, "()"))

    it("must return true when one encloses the other, but one exclusive",
      function() {
      var a = new Range(0, 10)
      var b = new Range(3, 6, "()")
      intersects(a, b).must.be.true()
    })

    it("must return true when consecutive", function() {
      var a = new Range(0, 10)
      var b = new Range(10, 20)
      intersects(a, b).must.be.true()
    })

    it("must return true when one at the boundary of other", function() {
      var a = new Range(0, 10)
      var b = new Range(10, 10)
      intersects(a, b).must.be.true()
    })

    it("must return false when consecutive, but end exclusive", function() {
      var a = new Range(0, 10, "[)")
      var b = new Range(10, 20)
      intersects(a, b).must.be.false()
    })

    it("must return false when consecutive, but begin exclusive", function() {
      var a = new Range(0, 10)
      var b = new Range(10, 20, "(]")
      intersects(a, b).must.be.false()
    })

    it("must return false when consecutive, but both exclusive",
      function() {
      var a = new Range(0, 10, "[)")
      var b = new Range(10, 20, "(]")
      intersects(a, b).must.be.false()
    })
  })

  describe(".prototype.toString", function() {
    it("must stringify range with given bounds", function() {
      new Range(42, 69, "()").toString().must.equal("(42,69)")
      new Range(42, 69, "[]").toString().must.equal("[42,69]")
      new Range(42, 69, "[)").toString().must.equal("[42,69)")
      new Range(42, 69, "(]").toString().must.equal("(42,69]")
    })

    it("must stringify begin", function() {
      // Having valueOf too ensures the value is stringied before string
      // concatenation.
      function Value(value) { this.value = value }
      Value.prototype.valueOf = function() { return null }
      Value.prototype.toString = function() { return this.value }

      var a = new Value(42)
      var b = new Value(69)
      new Range(a, b).toString().must.equal("[42,69]")
    })

    it("must stringify null endpoint as empty", function() {
      new Range(42, null).toString().must.equal("[42,]")
      new Range(null, 42).toString().must.equal("[,42]")
      new Range(null, null).toString().must.equal("[,]")
    })

    it("must stringify Infinity as empty", function() {
      new Range(42, Infinity).toString().must.equal("[42,]")
      new Range(-Infinity, 42).toString().must.equal("[,42]")
      new Range(-Infinity, Infinity).toString().must.equal("[,]")
    })
  })

  describe(".prototype.toJSON", function() {
    it("must be an alias to toString", function() {
      Range.prototype.toJSON.must.equal(Range.prototype.toString)
    })
  })

  describe(".prototype.inspect", function() {
    it("must be an alias to toString", function() {
      Range.prototype.inspect.must.equal(Range.prototype.toString)
    })
  })

  describe(".compareBeginToBegin", function() {
    function compare(a, b) {
      var result = Range.compareBeginToBegin(a, b)
      Range.compareBeginToBegin(b, a).must.eql(result * -1)
      return result
    }

    function testWithBounds(bounds) {
      it("must return 0 if equal", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(0, 5, bounds)
        compare(a, b).must.equal(0)
      })

      it("must return -1 if one less", function() {
        var a = new Range(-1, 10, bounds)
        var b = new Range(0, 10, bounds)
        compare(a, b).must.equal(-1)
      })

      it("must return 0 if equal and unbounded", function() {
        var a = new Range(null, 10, bounds)
        var b = new Range(null, 5, bounds)
        compare(a, b).must.equal(0)
      })

      it("must return -1 if one unbounded", function() {
        var a = new Range(null, 10, bounds)
        var b = new Range(0, 10, bounds)
        compare(a, b).must.equal(-1)
      })
    }

    describe("with inclusive bounds", testWithBounds.bind(null, "[]"))
    describe("with exclusive bounds", testWithBounds.bind(null, "()"))

    describe("with different bounds", function() {
      it("must return -1 if equal", function() {
        compare(new Range(0, 10, "[)"), new Range(0, 10, "()")).must.equal(-1)
      })

      it("must return -1 if one less", function() {
        compare(new Range(-1, 10, "[)"), new Range(0, 10, "()")).must.equal(-1)
        compare(new Range(-1, 10, "()"), new Range(0, 10, "[)")).must.equal(-1)
      })

      it("must return -1 if equal and unbounded", function() {
        var a = new Range(null, 10, "[]")
        var b = new Range(null, 10, "(]")
        compare(a, b).must.equal(-1)
      })
    })
  })

  describe(".compareEndToEnd", function() {
    function compare(a, b) {
      var result = Range.compareEndToEnd(a, b)
      Range.compareEndToEnd(b, a).must.eql(result * -1)
      return result
    }

    function testWithBounds(bounds) {
      it("must return 0 if equal", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(5, 10, bounds)
        compare(a, b).must.equal(0)
      })

      it("must return 0 if equal and unbounded", function() {
        var a = new Range(0, null, bounds)
        var b = new Range(5, null, bounds)
        compare(a, b).must.equal(0)
      })

      it("must return -1 if less", function() {
        var a = new Range(0, 9, bounds)
        var b = new Range(0, 10, bounds)
        compare(a, b).must.equal(-1)
      })

      it("must return -1 if one unbounded", function() {
        var a = new Range(0, 10, bounds)
        var b = new Range(0, null, bounds)
        compare(a, b).must.equal(-1)
      })
    }

    describe("with inclusive bounds", testWithBounds.bind(null, "[]"))
    describe("with exclusive bounds", testWithBounds.bind(null, "()"))

    describe("with different bounds", function() {
      it("must return -1 if equal", function() {
        compare(new Range(0, 10, "()"), new Range(0, 10, "(]")).must.equal(-1)
      })

      it("must return -1 if one less", function() {
        compare(new Range(0, 9, "(]"), new Range(0, 10, "()")).must.equal(-1)
        compare(new Range(0, 9, "()"), new Range(0, 10, "(]")).must.equal(-1)
      })

      it("must return -1 if equal and unbounded", function() {
        var a = new Range(0, null, "[)")
        var b = new Range(0, null, "[]")
        compare(a, b).must.equal(-1)
      })
    })
  })

  describe(".parse", function() {
    it("must parse string with bounds", function() {
      Range.parse("[a,z]").must.eql(new Range("a", "z", "[]"))
      Range.parse("(a,z)").must.eql(new Range("a", "z", "()"))
      Range.parse("[a,z)").must.eql(new Range("a", "z", "[)"))
      Range.parse("(a,z]").must.eql(new Range("a", "z", "(]"))
    })

    it("must parse endpoint with given function", function() {
      Range.parse("[42,69]", Number).must.eql(new Range(42, 69))
    })

    it("must parse string with infinite bounds", function() {
      Range.parse("[a,]").must.eql(new Range("a", null))
      Range.parse("[,z]").must.eql(new Range(null, "z"))
    })

    it("must parse string with infinite bounds given parse function",
      function() {
      var toUpperCase = Function.call.bind(String.prototype.toUpperCase)
      Range.parse("[a,]", toUpperCase).must.eql(new Range("A", null))
      Range.parse("[,b]", toUpperCase).must.eql(new Range(null, "B"))
      Range.parse("(,)", toUpperCase).must.eql(new Range(null, null, "()"))
    })

    it("must parse string with infinite bounds given Number", function() {
      Range.parse("[42,]", Number).must.eql(new Range(42, Infinity))
      Range.parse("[,69]", Number).must.eql(new Range(-Infinity, 69))
      Range.parse("(,)", Number).must.eql(new Range(-Infinity, Infinity, "()"))
    })
  })

  describe(".union", function() {
    function union(a, b) {
      var result = Range.union(a, b)
      Range.union(b, a).must.eql(result)
      return result
    }

    it("must return a union given one empty range", function() {
      var a = new Range(0, 5)
      var b = new Range(10, 10, "[)")
      union(a, b).must.eql(new Range(0, 5))
    })

    it("must return a union given two empty ranges", function() {
      var a = new Range(5, 5, "[)")
      var b = new Range(10, 10, "[)")
      union(a, b).must.eql(new Range)
    })

    it("must return a union given same range twice", function() {
      var a = new Range(0, 10, "[)")
      union(a, a).must.eql(a)
    })

    describe("with inclusive bounds", function() {
      it("must return a union given two intersecting ranges", function() {
        var a = new Range(0, 11, "[]")
        var b = new Range(9, 20, "[]")
        union(a, b).must.eql(new Range(0, 20, "[]"))
      })

      it("must return a union given two consecutive ranges", function() {
        var a = new Range(0, 10, "[]")
        var b = new Range(10, 20, "[]")
        union(a, b).must.eql(new Range(0, 20, "[]"))
      })

      it("must return a union given two non-consecutive ranges", function() {
        var a = new Range(0, 5, "[]")
        var b = new Range(15, 20, "[]")
        union(a, b).must.eql(new Range(0, 20, "[]"))
      })
    })

    describe("with exclusive bounds", function() {
      it("must return a union given two intersecting ranges", function() {
        var a = new Range(0, 11, "()")
        var b = new Range(9, 20, "()")
        union(a, b).must.eql(new Range(0, 20, "()"))
      })

      it("must return a union given two close, but non-consecutive ranges",
        function() {
        var a = new Range(0, 10, "()")
        var b = new Range(10, 20, "()")
        union(a, b).must.eql(new Range(0, 20, "()"))
      })

      it("must return a union given two non-consecutive ranges", function() {
        var a = new Range(0, 5, "()")
        var b = new Range(15, 20, "()")
        union(a, b).must.eql(new Range(0, 20, "()"))
      })
    })

    describe("with different bounds", function() {
      it("must return a union given two consecutive ranges", function() {
        var a = new Range(0, 10, "(]")
        var b = new Range(10, 20, "[)")
        union(a, b).must.eql(new Range(0, 20, "()"))
      })

      it("must return a union given two non-consecutive ranges", function() {
        var a = new Range(0, 5, "[)")
        var b = new Range(15, 20, "[)")
        union(a, b).must.eql(new Range(0, 20, "[)"))
      })
    })
  })
})
