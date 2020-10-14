/* eslint-disable id-length */
"use strict";
/*global assert, Teacher, Student, Person



*/


//SCH
describe("school", function() {

  it("Teacher teach Method Working", function() {
    let teacher = new Teacher();
    teacher.initialize("Jody", 42);
    assert.equal(teacher.teach("Science"), "Jody is now teaching Science");
  });

  it("Student learn Method Working", function() {
    let student = new Student();
    student.initialize("Kevin", 16);
    assert.equal(student.learn("Math"), "Kevin just learned Math");
  });

  it("Person describe Method Working", function() {
    let person = new Person();
    person.initialize("Lucy", 21);
    assert.equal(person.describe("Math"), "Lucy, 21 years old.");
  });

});
//SCH