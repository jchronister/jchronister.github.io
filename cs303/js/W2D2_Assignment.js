"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//DA
/*  Destructuring assignment
*
*  We have an object:
*
*  Write the destructuring assignment that reads:
*
*  name property into the variable name.
*  years property into the variable age.
*  isAdmin property into the variable isAdmin (false, if no such property)
*  Here’s an example of the values after your assignment:
*/
//DA
// eslint-disable-next-line require-jsdoc, no-unused-vars
function destructureObj () {

  let user = { name: "John", years: 30 };
  let {name, years: age, isAdmin = false} = user;
  return [name, age, isAdmin];
}
//DA
//TMS
/* The Maximal Salary
*
*  There is a salaries object:
*
*  Create the function topSalary(salaries) that returns the name 
*  of the top-paid person.
*
*  If salaries is empty, it should return null.
*  If there are multiple top-paid persons, return any of them.
*  P.S. Use Object.entries and destructuring to iterate over key/value pairs
*/
//TMS
/** Returns Name of Person with Highest Salary
 * @param  {Object} obj - With Name & Salary
 * @returns {String|Null} Returns Name or Null
 */
function topSalary(obj) {

  var max = 0, topName = null;

  for(var [name, salary] of Object.entries(obj)){
    
     if (salary > max) {
      max = salary;
      topName = name;
    }
    
  }
  return topName;

}

// eslint-disable-next-line require-jsdoc, no-unused-vars
function calltopSalary() {
  let salaries = {
    "John": 400,
    "Pete": 300,
    "Mary": 250
  };
  return topSalary(salaries);
}
//TMS
//CAD
/* Create a Date
*
*  Create a Date object for the date: Feb 20, 2012, 3:12am. The time zone is local.
*  
*/
//CAD
// eslint-disable-next-line require-jsdoc, no-unused-vars
function createDates() {
  return ([new Date("2012-02-20T03:12Z"),
  new Date("February 20, 2012 03:12:00Z"),
  new Date(2012, 1, 20, 3, 12)]);
}
//CAD
//SAW
/* Show a weekday
*
*  Write a function getWeekDay(date) to show the weekday in short format: ‘MO’, ‘TU’, ‘WE’, ‘TH’, ‘FR’, ‘SA’, ‘SU’.
*
*  For instance:
*
*  let date = new Date(2012, 0, 3);  // 3 Jan 2012
*  alert( getWeekDay(date) );        // should output "TU"
*/
//SAW
/** Return Day of Week
 * @param  {String|Date} date - Date or String Date in YYYY-MM-DD Format
 * @returns {String} Weekday Abreviation
 */
function getWeekDay(date) {// eslint-disable-line no-unused-vars

  var dat = typeof date === "string" ? new Date(date) : date;
  return ["SU", "MO", "TU", "WE", "TH", "FR", "SA"][dat.getDay()];

}
//SAW
//EWD
/* European weekday
*
*  European countries have days of week starting with Monday (number 1),
*  then Tuesday (number 2) and till Sunday (number 7). Write a function 
*  getLocalDay(date) that returns the “European” day of week for date.
*/
//EWD
/** Return European Day of Week
 * @param  {String|Date} date - Date or String Date in YYYY-MM-DD Format
 * @returns {Number} European Day
 */
function getLocalDay(date) {// eslint-disable-line no-unused-vars

  var dat = typeof date === "string" ? new Date(date) : date;
  var datNo = dat.getDay();
  return datNo === 0 ? 7 : datNo;

}
//EWD 
//WDMWMDA
/* Which day of month was many days ago?
*
*  Create a function getDateAgo(date, days) to return the day of month 
*  days ago from the date.
*
*  For instance, if today is 20th, then getDateAgo(new Date(), 1) 
*  should be 19th and getDateAgo(new Date(), 2) should be 18th.
*
*  Should work reliably for days=365 or more:
*  The function should not modify the given date.
*/
//WDMWMDA
//EWD
/** Return European Day of Week
 * @param  {String|Date} date - Date or String Date in YYYY-MM-DD Format
 * @param {Number} dayAgo - Number of Days Ago
 * @returns {Number} European Day
 */
function getDateAgo(date, dayAgo) {// eslint-disable-line no-unused-vars

  var dat = typeof date === "string" ? new Date(date) : new Date(date.getTime());
  dat.setDate(dat.getDate() - dayAgo);
  return dat.getDate();

}
//WDMWMDA
//HMSPT
/* How many seconds have passed today?
*
*  Write a function getSecondsToday() that returns the number of seconds from the beginning of today.
*
*  For instance, if now were 10:00 am, and there was no daylight savings shift, then:
*
*  getSecondsToday() == 36000 // (3600 * 10)
*  The function should work in any day. That is, it should not have a hard-coded value of “today”.
*/
//HMSPT
/** Returns Seconds Since Midnight
 * @returns {Number} Seconds
 */
function getSecondsToday() {// eslint-disable-line no-unused-vars

  var now = new Date();
  var midNite = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return (now.getTime() - midNite.getTime())/1000;

}
//HMSPT
//TOIJAB
/*  Turn the object into JSON and back
*
* Turn the user into JSON and then read it back into another variable.
*/
//HMSPT
// eslint-disable-next-line require-jsdoc, no-unused-vars
function convertJSON () {
  
  let user = {
    name: "John Smith",
    age: 35
  };

  let json = JSON.stringify(user);

  return [json,JSON.parse(json)];

}
//HMSPT





