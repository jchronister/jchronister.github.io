/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global HT_Dictionary genData Sequence*/

//DVC//DVC
function findWinner(seq) {

  var votes = new HT_Dictionary;
  var iter = seq.iterator();

  // Iterate Sequence to Fill Dictionary with Votes
  while(iter.hasNext()) {

    // Get Id
    var vote = iter.nextObject();
    var id = votes.findElement(vote);

    // Insert if Does Not Exist or Add Vote
    if (id === null) {
      votes.insertItem(vote, [1]);
    } else {
      id[0] = id[0] + 1;
    }
  }

  // Iterate Dictionary to Find Winner
  iter = votes.iterator();
  var max = -Infinity;

  while(iter.hasNext()) {

    // Get Id and Count
    vote = iter.nextObject();
    id = vote.key();
    var count = vote.element();

    if (count[0] > max) {
      // Set Max to New Array
      var winners = [[id, count[0]]];
      max = count[0];
    } else if (count[0] === max) {
      // Add Tie to Existing Array
      winners.push([id, count[0]]);
    }
  }
  return winners;
}

function callFindWinner(totalVotes, totalCandidates) { // eslint-disable-line no-unused-vars

  // Setup Random Vote Sequence
  var votes = genData(totalVotes, totalCandidates);
  var voteSeq = new Sequence();
  votes.forEach(n=>voteSeq.insertLast(n));

  // Count Votes for Winner Check
  var cnt = votes.reduce(function(a, n) {
    a[n] = a[n] ? a[n] + 1 : 1;
    return a;
  },[]);

  // Calculate Winner Check
  var max = -Infinity;
  var win = [];
  for(var i = 0; i < cnt.length; i++) {
    if (cnt[i] > max) {
      win = [[i, cnt[i]]];
      max = cnt[i];
    } else if (cnt[i] === max) {
      win.push([i, cnt[i]]);
    }

  }

  return JSON.stringify(findWinner(voteSeq)) + " Should Equal " + JSON.stringify(win);

}
//DVC






  










