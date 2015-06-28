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

  describe(".prototype.isEmpty", function() {
    it("must return true given a range with undefined endpoints", function() {
      new Range(undefined, undefined).isEmpty().must.be.true()
    })

    it("must return true given a range with an undefined endpoints",
      function() {
      new Range(null, undefined).isEmpty().must.be.true()
      new Range(undefined, null).isEmpty().must.be.true()
    })

    it("must return false given a range with unbounded endpoints", function() {
      new Range(null, null).isEmpty().must.be.false()
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

  describe(".prototype.intersects", function() {
    function intersects(a, b) {
      var result = a.intersects(b)
      b.intersects(a).must.equal(result)
      return result
    }

    it("must return true when intersecting", function() {
      var a = new Range(10, 20)
      var b = new Range(5, 15)
      intersects(a, b).must.be.true()
    })

    it("must return false when intersecting, but one of zero size", function() {
      var a = new Range(0, 10)
      var b = new Range(5, 5, "[)")
      intersects(a, b).must.be.false()
    })

    it("must return false when intersecting, but one empty", function() {
      var a = new Range(0, 10)
      var b = new Range
      intersects(a, b).must.be.false()
    })

    it("must return false when not intersecting", function() {
      var a = new Range(0, 10)
      var b = new Range(30, 40)
      intersects(a, b).must.be.false()
    })

    it("must return true when intersecting and one Infinity", function() {
      var a = new Range(0, 10)
      var b = new Range(5, Infinity)
      intersects(a, b).must.be.true()
    })

    it("must return true when intersecting and one null", function() {
      var a = new Range(0, 10)
      var b = new Range(5, null)
      intersects(a, b).must.be.true()
    })

    it("must return true when one encloses the other", function() {
      var a = new Range(0, 10)
      var b = new Range(3, 6)
      intersects(a, b).must.be.true()
    })

    it("must return true when one encloses the other, but one exclusive",
      function() {
      var a = new Range(0, 10)
      var b = new Range(3, 6, "()")
      intersects(a, b).must.be.true()
    })

    it("must return true when one encloses the other, but both exclusive",
      function() {
      var a = new Range(0, 10, "()")
      var b = new Range(3, 6, "()")
      intersects(a, b).must.be.true()
    })

    it("must return true when one encloses the other and is Infinity",
      function() {
      var a = new Range(0, 10)
      var b = new Range(-Infinity, Infinity)
      intersects(a, b).must.be.true()
    })

    it("must return true when one encloses the other and is null", function() {
      var a = new Range(0, 10)
      var b = new Range(null, null)
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
      Range.parse("[42,]", Number).must.eql(new Range(42, null))
      Range.parse("[,69]", Number).must.eql(new Range(null, 69))
    })
  })
})
