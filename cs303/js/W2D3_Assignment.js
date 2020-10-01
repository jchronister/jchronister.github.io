/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//MD//MD
/** Return Array of Object Property Values
 * @param  {Array} objAry - Array of Objects
 * @param  {String} key - Object Property
 * @returns {Array} Object Property Array
 */
function mapObj(objAry, key) {
  return objAry.map(n => n[key]);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function mapDouble(ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n*2);
}
//MD
//FAE//FAE
// eslint-disable-next-line require-jsdoc,no-unused-vars
function filterAllEvens (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.filter(n => n % 2 === 0);
}
//FAE
//FAG10//FAG10
// eslint-disable-next-line require-jsdoc,no-unused-vars
function filterAgeGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.filter(n => n > 10);
}
//FAG10
//FEIE//FEIE
// eslint-disable-next-line require-jsdoc,no-unused-vars
function findEven (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.find(n => n % 2 === 0);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function includesEven (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n % 2).includes(0);
}
//FEIE
//FG10IG10//FG10IG10
// eslint-disable-next-line require-jsdoc,no-unused-vars
function findGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.find(n => n > 10);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function includesGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n > 10).includes(true);
}
//FG10IG10
//RTS//RTS
/** Sum Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Sum
 */
function reduceToSum (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary, objKey);
  return ary.reduce((a,n) => a+n, 0);
}
//RTS
//RTA//RTA
/** Average Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Average
 */
function reduceToAvg (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary, objKey);
  return ary.reduce((a,n) => a+n, 0) / ary.length;
}
//RTA
//RTM//RTM
/** Max Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Max
 */
function reduceToMax (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary,objKey);
   return ary.reduce((a,n) => n > a ? n : a, ary[0]);
}
//RTM
//RAEA//RAEA
// eslint-disable-next-line require-jsdoc, no-unused-vars
function reduceAvgEvenAge (ary) {
  var filtered = ary.map(n=>n.age).filter(n=>n%2===0);
  return filtered.reduce((a,n) => a + n, 0) / filtered.length;
}
//RAEA
//RAOA//RAOA
// eslint-disable-next-line require-jsdoc
function reduceAvgOddAge (ary) {// eslint-disable-line no-unused-vars
  var filtered = ary.map(n=>n.age).filter(n=>n%2!==0);
  return filtered.reduce((a,n) => a + n, 0) / filtered.length;
}
//RAOA

//RTREE
// eslint-disable-next-line require-jsdoc, no-unused-vars
function getTree() {

  let node3 = {
    name: "p",
    value: "This is text in the a paragraph",
    children: null
  };
  let node4 = {
    name: "label",
    value: "Name",
    children: null
  };
  let node5 = {
    name: "input",
    value: "this was typed by a user",
    children: null
  };
  let node2 = {
    name: "div",
    value: null,
    children: [node4, node5]
  };
  let node1 = {
    name: "body",
    children: [node2, node3],
    value: null,
  };


  return node1;
}
//RTREE
// eslint-disable-next-line require-jsdoc
function recurseTree(tree) {

  log(tree.name, tree.value);
  var child = tree.children;
  // eslint-disable-next-line no-unused-vars
  if (child !== null) child.forEach(n => recurseTree(n));

}

// eslint-disable-next-line require-jsdoc, no-unused-vars
function callrecurseTree(){recurseTree(getTree());}
//RTREE
//ITREE//ITREE
// eslint-disable-next-line require-jsdoc, no-unused-vars
function iterativeTree(tree) {

  var stack = [];

  do {

    // Log and Remove from Stack
    log(tree.name, tree.value);
    stack.shift();
    var child = tree.children;

    // Add Children to Stack
    if (child !== null) child.forEach(n=>stack.push(n));
 
    tree = stack[0];
  
  } while(tree !== undefined);
  
}
// eslint-disable-next-line require-jsdoc, no-unused-vars
function calliterativeTree(){recurseTree(getTree());}
//ITREE