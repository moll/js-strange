var Range = require("..")

describe("Range", function() {
  describe("new", function() {
    it("must return an instance of Range", function() {
      new Range().must.be.an.instanceof(Range)
    })

    it("must set begin and end", function() {
      var range = new Range(42, 69)
      range.begin.must.equal(42)
      range.end.must.equal(69)
    })
  })

  describe("when called as a function", function() {
    it("must return an instance of Range", function() {
      Range().must.be.an.instanceof(Range)
    })

    it("must set begin and end", function() {
      var range = Range(42, 69)
      range.begin.must.equal(42)
      range.end.must.equal(69)
    })
  })
})
