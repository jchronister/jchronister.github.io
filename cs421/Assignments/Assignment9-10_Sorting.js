/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/* global Sequence List*/

function generateRandomList(n, ary) {

  let random = function randomInteger(min,max) {// eslint-disable-line no-unused-vars
    return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
  };

  let list = new Sequence (n);    
  let max = Array.isArray(ary) ? ary.length - 1 : ary;
  
  for (var i = 0; i < n; ++i) {
    var num = random(0, max);
    list.insertLast(ary[num] || num);
  }
  return list;
}

//US//US
function uniqueSequence(seqA, seqB) {

  var seq = new Sequence();

  while(!seqA.isEmpty() && !seqB.isEmpty()) {

    var a = seqA.first().element();
    var b = seqB.first().element();

    if (a === b) {
      if (a !== alreadyAdded) {
        seq.insertLast(a);
        seqA.removeAtRank(0);
        seqB.removeAtRank(0);
        var alreadyAdded = a;
      }
    } else if (a < b) {
      seq.insertLast(seqA.remove(seqA.first()));
    } else {
      seq.insertLast(seqB.remove(seqB.first()));
    }

  }

  while(!seqA.isEmpty()){
    seq.insertLast(seqA.remove(seqA.first()));
  }
    
  while(!seqB.isEmpty()){
    seq.insertLast(seqB.remove(seqB.first()));
  }

  return seq;
}

function callUniqueSequence(){// eslint-disable-line no-unused-vars

  Sequence.prototype.fillSeq = function (fillAry) {
    fillAry.sort((a,b)=>a-b);
    fillAry.forEach(n=>this.insertLast(n));
    return this;
  };

  let seq1 = (new Sequence).fillSeq([1,2,3,4,5,6,7,8,9,10,11]);
  let seq2 = (new Sequence).fillSeq([1,2,23,4,15,6,7,8,9,10,11]);


  return uniqueSequence(seq1, seq2).print("return");


}
//US
//CV//CV
function countVotes(seq) {

  let votes = [];
  let keys = [];

  let findKey = function(key) {

    // Check for Key
    for(var i = 0; i < keys.length; i++){
      if (keys[i] === key) return i;
    }

    // Add if Not Found
    votes.push(0);
    return keys.push(key) - 1;


  };

  // Iterate Sequence and Count Votes
  let iter = seq.iterator();

  while (iter.hasNext()) {
    votes[findKey(iter.nextObject())] += 1;
  }

  // Count Winning Votes
  let max = votes.reduce((a,n)=>n>a?n:a,votes[0]);

  // Verify Not a Tie
  let results = [];
  votes.forEach(function(n,i) {
    if (n === max) results.push([keys[i],n]);
  });

  // Display Winner or Tie
  if (results.length === 1) {
    return results[0][0] + " Wins with " + results[0][1] + " Votes";
  } else {
    let tie = results.map(n=>n[0]);
    return "Tie " + tie.join(", ") + " with " + results[0][1] + " Votes";
  }

}

function callCountVotes() {// eslint-disable-line no-unused-vars
  return countVotes(generateRandomList(10000, [15,65,78,23,54,89,8]));
}
//CV
//MS
//MS
function mergeSortList(list) {

  if (list.size() <= 1) return list;

  let split = splitList(list, List);

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

function callMergeSortList(){// eslint-disable-line no-unused-vars

  let list = generateRandomList(20, 100);
  let orgList = list.print("return");
  return orgList + "\nSorted to\n" + mergeSortList(list).print("return");

}
//MS

//QS//QS

function quickSort(ary) {

  let start = arguments[1] === undefined ? 0 : arguments[1];
  let end = arguments[2] === undefined ? ary.length - 1 : arguments[2];

  if (start >= end) return; 

  let mid = randomInteger(start, end);

  let se = flipElements(ary, mid, start, end);

  quickSort(ary, start, se[0]);
  quickSort(ary, se[1], end);

  return ary;
}

function randomInteger(min,max) {
  return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
}

function flipElements(ary, mid, start, end) {

  var i = start;
  var midValue = ary[mid];

  while (i <= end) {
    if (ary[i] > midValue) {
      // Move Item to End
      swapElements(ary, i, end);
      end -= 1;
    } else {
      if (ary[i] < midValue) {
        // Move Item to Front
        swapElements(ary, i, start);
        start += 1;
      }
      i += 1;
    }
  }

  // Return Position Before and After Pivot
  return [start === 0 ? start : start - 1, end === ary.length - 1 ? end : end + 1];
}

function swapElements(ary, indexA, indexB) {
  var temp = ary[indexA];
  ary[indexA] = ary[indexB];
  ary[indexB] = temp;
}

function callQuickSort(){// eslint-disable-line no-unused-vars

  // Build Array to Sort
  var sort = [];
  for(var i = 0; i < 25; i++) sort.push(randomInteger(0,100));
  var prev = "[" + sort.join(", ") + "]";

  return prev + "\nSorted to\n[" + quickSort(sort).join(", ") + "]";

}

//QS