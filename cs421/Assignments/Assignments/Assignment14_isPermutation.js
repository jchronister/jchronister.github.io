/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

/* global PriorityQueue HT_Dictionary BST_Dictionary List require*/

if(typeof window === "undefined") {
  var Adt = require("./RBTree.js");
} else {
  // let script = document.createElement("script");
  // script.src = "./RBTree.js";
  // document.head.appendChild(script);
  if(!Adt) Adt = window.module.exports;
}

function mergeSortList(list) {

  if (list.size() <= 1) return list;

  let split = splitList(list, List.DLinkedList);

  let l1 = mergeSortList(split[0]);
  let l2 = mergeSortList(split[1]);

  return combineLists(list, l1, l2);

}

// Split List
function splitList(list, constructor) {

  let l1 = new constructor();
  let l2 = new constructor();

  // Zero or One Item Lists
  if(list.size() > 1) {

    // Split Lits
    while(list.size() > 1){
      l1.insertLast(list.remove(list.first()));
      l2.insertFirst(list.remove(list.last()));
    }
  }

  // Get Last Item for Odd Numbered Lists
  if (list.size() === 1) l1.insertLast(list.remove(list.first()));

  return [l1, l2];
}


function combineLists (list, list1, list2) {

  // Compare Items
  while (!list1.isEmpty() && !list2.isEmpty()) {

    if (list1.first().element() <= list2.first().element()) {
      list.insertLast(list1.remove(list1.first()));
    } else {
      list.insertLast(list2.remove(list2.first()));
    }

  }

  // Empty Other List Remaining Items
  while (!list1.isEmpty()) list.insertLast(list1.remove(list1.first()));
  while (!list2.isEmpty()) list.insertLast(list2.remove(list2.first()));

  return list;
}

//IPVS//IPVS
function isPermutationViaSorting (seqA, seqB) {// eslint-disable-line no-unused-vars

  if (seqA.size() !== seqB.size()) return false;

  // Merge Sort Lists
  mergeSortList(seqA);
  mergeSortList(seqB);

  let iterA = seqA.iterator();
  let iterB = seqB.iterator();

  while (iterA.hasNext()) {
    if (iterA.nextObject() !== iterB.nextObject()) return false;
  }
  return true;

}

function callisPermutationViaSorting () {// eslint-disable-line no-unused-vars

  let seq = getSequences(15, 1000);

  return "\n" + seq[0].print("return") +
         "\n" + seq[1].print("return") +
         "\n" + seq[2].print("return") +
         "\n" + isPermutationViaSorting(seq[0], seq[1]) +
         "\n" + isPermutationViaSorting(seq[1], seq[2]);

}//IPVS
//IPVPQ//IPVPQ
function isPermutationViaPQ (seqA, seqB) {// eslint-disable-line no-unused-vars

  if (seqA.size() !== seqB.size()) return false;

  // Create & Fill Priority Queue
  let fillPQ = function (seq) {

    let pq = new PriorityQueue();
    let iter = seq.iterator();

    while (iter.hasNext()) {
      var el = iter.nextObject();
      pq.insertItem(el, el);
    }
    return pq;
  };

  let a = fillPQ(seqA);
  let b = fillPQ(seqB);

  // Empty and Check Items
  while (!a.isEmpty()) {
    if (a.removeMin() !== b.removeMin()) return false;
  }
  return true;
}

function callisPermutationViaPQ () {// eslint-disable-line no-unused-vars

  let seq = getSequences(15, 1000);

  return "\n" + seq[0].print("return") +
         "\n" + seq[1].print("return") +
         "\n" + seq[2].print("return") +
         "\n" + isPermutationViaPQ(seq[0], seq[1]) +
         "\n" + isPermutationViaPQ(seq[1], seq[2]);

}//IPVPQ
//IPVHD//IPVHD
function isPermutationViaHashDct (seqA, seqB) {// eslint-disable-line no-unused-vars

  if (seqA.size() !== seqB.size()) return false;

  // Create & Fill Hash Dictionary
  let fillDct = function (seq) {

    let d = new HT_Dictionary();
    let iter = seq.iterator();

    while (iter.hasNext()) {
      var el = iter.nextObject();
      var cnt = d.findElement(el);
      if (cnt === null) cnt = 0;
      d.insertItem(el, cnt + 1);
    }
    return d;
  };

  let a = fillDct(seqA);
  let b = fillDct(seqB);

  // Compare Items in Dictionary
  let iter = a.items();

  while (iter.hasNext()) {

    var item = iter.nextObject();
    var elA = item.element();
    var key = item.key();
    var elB = b.findElement(key);

    if (elA !== elB) return false;

  }
  return true;

}

function callisPermutationViaHashDct () {// eslint-disable-line no-unused-vars

  let seq = getSequences(15, 1000);

  return "\n" + seq[0].print("return") +
         "\n" + seq[1].print("return") +
         "\n" + seq[2].print("return") +
         "\n" + isPermutationViaHashDct(seq[0], seq[1]) +
         "\n" + isPermutationViaHashDct(seq[1], seq[2]);

}//IPVHD
//IPVBD//IPVBD
function isPermutationViaBSTDct (seqA, seqB) {// eslint-disable-line no-unused-vars

  if (seqA.size() !== seqB.size()) return false;

  // Create & Fill BST Dictionary
  let fillDct = function (seq) {

    let d = new BST_Dictionary();
    let iter = seq.iterator();

    while (iter.hasNext()) {
      var el = iter.nextObject();
      var cnt = d.findElement(el);
      if (cnt === null) cnt = 0;
      d.insertItem(el, cnt + 1);
    }
    return d;
  };

  let a = fillDct(seqA);
  let b = fillDct(seqB);

  // Compare Elements in Dictionary
  let iterA = a.items();
  let iterB = b.items();

  while (iterA.hasNext()) {
    let a = iterA.nextObject();
    let b = iterB.nextObject();

    if ((a.key() !== b.key()) || (a.element() !== b.element())) return false;
  }
  return true;  

}

function callisPermutationViaBSTDct () {// eslint-disable-line no-unused-vars

  let seq = getSequences(15, 1000);

  return "\n" + seq[0].print("return") +
         "\n" + seq[1].print("return") +
         "\n" + seq[2].print("return") +
         "\n" + isPermutationViaBSTDct(seq[0], seq[1]) +
         "\n" + isPermutationViaBSTDct(seq[1], seq[2]);

}//IPVBD

function getSequences(count, range){

  let genData = function (n, k) {
    let dat = new Array(n);
    for (let i=0; i<n; i++) {
        let rand = Math.floor(Math.random()*1024)%k + 1;
        dat[i] = rand;
    }
    return dat;
  };

  let shuffleArray = function (ary) {

    var i = 0, retrn = [], len = ary.length;
    do {
      var spot = Math.floor(len * Math.random());

      if(!retrn[spot]) {
        retrn[spot] = ary[i];
        i += 1;
      }

    } while (i < len);
    return retrn;
  };

  let createSequence = function (ary) {

    let retrn = new Adt.Sequence();

    for (var i = 0; i < ary.length; i++) {
      retrn.insertLast(ary[i]);
    }
    return retrn;
  };

  // Create Array, Shuffled Array, Array with One Element Different
  let a = genData(count, range);
  let b = shuffleArray(a);
  let c = b.slice();
  c[Math.floor(c.length/2)] = Math.floor(Math.random() * count);

  return [createSequence(a), createSequence(b), createSequence(c)];

}