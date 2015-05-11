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
})
