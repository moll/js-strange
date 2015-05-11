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
