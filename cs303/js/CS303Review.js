/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();
/*
15. [5] Recall the makeCounter code:
function makeCounter() { let count = 0; return function() { return count++; }; }
Write a function, makeContact, which returns a function that keeps 
track of contacts. For
example,
const myContacts = makeContacts();
a. makeContact should return a closure that has a private variable 
to keep an array of
contact objects.
b. Each object in the array of contacts will have a name property 
and a phone property.
c. When you call the closure, myContacts, with the name of a contact 
it will return the
phone number of that contact.
d. Or, if it does not have that contact in the array, then it will prompt
the user for a
phone number and store a new contact object with that name and number.
*/

function makeContacts() {

  let track = [];
  // [{name: "joe",phone 301}]
  return function (contact) {

    for (let i = 0; i < track.length; i += 1) {
      if (track[i].name === contact) return track[i].phone;
    }

    let add = prompt("Cannot Find Contact. Please Enter Phone Number");

    if (add !== null) track.push({name: contact,phone: add});

  };

}

// const myContacts = makeContacts();
// myContacts("Bill");
// myContacts("Bob");
// console.log("should find number for bill: " + myContacts("Bill"));



var fn = function fn(a,b){
  alert(a+b);
 }
 function fn(a){
  alert(a);
 }
 fn('CS');
var fn =  function fn(){
  alert('Hello');
 }