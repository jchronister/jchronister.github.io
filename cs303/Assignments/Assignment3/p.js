


describe("Accumulator Function Tests", function() {

  var accum;

  it("Starting Condition",function() {
    accum = new Accumulator();
    assert.equal(accum.show(),0);
  });

  it("Add 5",function() {
    accum.read(5);
    assert.equal(accum.show(),5);
  });

  it("Add 15",function() {
    accum.read(15);
    assert.equal(accum.show(),20);
  });


  it("Subtract 10",function() {
    accum.read(-10);
    assert.equal(accum.show(),10);
  });

});


