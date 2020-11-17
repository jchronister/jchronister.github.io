/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

/* global require */

if (typeof window === "undefined") {
  var Dct = require("./BST_Dictionary.js");
  var List = require("./DLinkedList.js");
} else {

//   // Load Required Files
//   let addScript = function (script) {
//     var scr  = document.createElement("script");
//     scr.src = script;
//     scr.async = false;
//     document.head.appendChild(scr);
//   };
//   addScript("./HT_Dictionary.js");
//   addScript("./DLinkedList.js");
// // head.insertBefore(scr, head.firstChild);

  if(!Dct) Dct = window.module.exports;
  if(!List) List = window.module.exports;
}




//WBD//WBD
function findWinnerListBST(listOrSeq) {

  if(listOrSeq.isEmpty()) return [null, null];

    // Add Votes to Dictionary
    let fillDct = function(list_seq) {// eslint-disable-line camelcase

      let d = new Dct.HT_Dictionary();

      let iter = list_seq.elements();// eslint-disable-line camelcase

      while (iter.hasNext()) {
        var id = iter.nextObject();

        // See if Id Already Exists
        var cnt = d.findElement(id);
        if (cnt === null) cnt = 0;

        // Reinsert Plus One
        d.insertItem(id, cnt + 1);

      }
      return d;
    };

    let d = fillDct(listOrSeq);

  // Find Winner
  let winner = [[null, -Infinity]];
  var iter = d.items();

  while(iter.hasNext()) {
    var item = iter.nextObject();
    var id = item.key();
    var cnt = item.element();

    if (cnt > winner[0][1]) {
      winner = [[id, cnt]];
    } else if (cnt === winner[0][1]) {
      // Add Tie
      winner.push([id, cnt]);
    }

  }

  return winner;

}

function callFindWinnerListBST() {// eslint-disable-line no-unused-vars

  let genData = function genData2(n, k) {
      let dat = new List.DLinkedList();
      let ary = [];
      for (let i=0; i<n; i++) {
          let rand = Math.floor(Math.random()*100)%k + 1;
          ary.push(rand);
          dat.insertLast(rand);
      }
      return [dat, ary];
  };

  let list = genData(1000, 10);

  let chk = list[1].reduce(function(a,n){
    if (a[n]) {
      a[n] += 1;
    } else {
      a[n] = 1;
    }
    return a;
  },[]);

  chk = chk.map((n,i)=>{return {id:i,count:n};});
  console.log(chk.sort((a,b)=>b.count-a.count));

  return findWinnerListBST(list[0]);

}
//WBD

//WLD//WLD
function findWinnerBST2(ary) {

  if(ary.length === 0) return [null, null];

  let d = new Dct.BST_Dictionary();
  
  // Add Votes to Dictionary
  for (var i = 0; i < ary.length; i++) {
    var id = ary[i];
    var cnt = d.findElement(id);
    if (cnt === null) cnt = 0;
    d.insertItem(id, cnt + 1);  
  }

  // Find Winner
  let winner = [[null, -Infinity]];
  var iter = d.items();

  while(iter.hasNext()) {
    var item = iter.nextObject();
    id = item.key();
    cnt = item.element();

    if (cnt > winner[0][1]) {
      winner = [[id, cnt]];
    } else if (cnt === winner[0][1]) {
      // Add Tie
      winner.push([id, cnt]);
    }

  }

  return winner;
}
function callfindWinnerBST2 () {// eslint-disable-line no-unused-vars

  let genData = function (n, k) {
      let dat = new Array(n);
      for (let i=0; i<n; i++) {
          let rand = Math.floor(Math.random()*100)%k + 1;
          dat[i] = rand;
      }
      return dat;
  };

  let dat = genData(1000, 10);

  let chk = dat.reduce(function(a,n){
    if (a[n]) {
      a[n] += 1;
    } else {
      a[n] = 1;
    }
    return a;
  },[]);

  chk = chk.map((n,i)=>{return {id:i,count:n};});
  console.log(chk.sort((a,b)=>b.count-a.count));
  return findWinnerBST2(dat);
}
//WLD


