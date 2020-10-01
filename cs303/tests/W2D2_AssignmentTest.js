
"use strict";
/*global assert, topSalary, getWeekDay, getLocalDay, getDateAgo*/
//TMS
describe("topSalary", function() {
  it("returns top-paid person", function() {
    let salaries = {
      "John":  100,
      "Pete": 300,
      "Mary": 250
    };

    assert.equal( topSalary(salaries), "Pete" );
  });

  it("returns null for the empty object", function() {
    assert.isNull( topSalary({}) );
  });
});
//TMS
//SAW
describe("getWeekDay", function() {
  it("3 January 2014 - friday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 3)), "FR");
  });

  it("4 January 2014 - saturday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 4)), "SA");
  });

  it("5 January 2014 - sunday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 5)), "SU");
  });

  it("6 January 2014 - monday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 6)), "MO");
  });

  it("7 January 2014 - tuesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 7)), "TU");
  });

  it("8 January 2014 - wednesday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 8)), "WE");
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getWeekDay(new Date(2014, 0, 9)), "TH");
  });
});
//SAW
//EWD
describe("getLocalDay", function() {
  it("3 January 2014 - friday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 3)), 5);
  });

  it("4 January 2014 - saturday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 4)), 6);
  });

  it("5 January 2014 - sunday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 5)), 7);
  });

  it("6 January 2014 - monday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 6)), 1);
  });

  it("7 January 2014 - tuesday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 7)), 2);
  });

  it("8 January 2014 - wednesday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 8)), 3);
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getLocalDay(new Date(2014, 0, 9)), 4);
  });

  it("9 January 2014 - thursday", function() {
    assert.equal(getLocalDay(new Date(2012, 0, 3)), 2);
  });
});
//EWD
//WDMWMDA
describe("getDateAgo", function() {

  it("1 day before 02.01.2015 -> day 1", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 1), 1);
  });


  it("2 days before 02.01.2015 -> day 31", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 2), 31);
  });

  it("100 days before 02.01.2015 -> day 24", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 100), 24);
  });

  it("365 days before 02.01.2015 -> day 2", function() {
    assert.equal(getDateAgo(new Date(2015, 0, 2), 365), 2);
  });

  it("does not modify the given date", function() {
    let date = new Date(2015, 0, 2);
    let dateCopy = new Date(date);
    getDateAgo(dateCopy, 100);
    assert.equal(date.getTime(), dateCopy.getTime());
  });

});
//WDMWMDA