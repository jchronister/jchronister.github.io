/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

//PM
/* Say you have a function primitiveMultiply that in 20 percent of cases
*  multiplies two numbers and in the other 80 percent of cases raises 
*  an exception of type MultiplicatorUnitFailure. Write a function that 
*  wraps this clunky function and just keeps trying until a call succeeds, 
*  after which it returns the result.
*
*  Make sure you handle only the exceptions you are trying to handle.
*/
//PM
function callReliableMultiply (a, b) { // eslint-disable-line no-unused-vars

  class MultiplicatorUnitFailure extends Error {}

  function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
      return a * b;
    } else {
      throw new MultiplicatorUnitFailure("Klunk");
    }
  }

  function reliableMultiply(a, b) {
    try {
      return primitiveMultiply(a, b);
    } catch (err) {
      if (err.message === "Klunk") {
        return reliableMultiply(a, b); // eslint-disable-line no-unused-vars
      } else {
        throw err;
      }
    }
  }

  return reliableMultiply(a, b);
}
//PM
//LB
/*  Consider the following (rather contrived) object:
*
*   It is a box with a lock. There is an array in the box, but you can 
*   get at it only when the box is unlocked. Directly accessing the 
*   private _content property is forbidden.
*
*   Write a function called withBoxUnlocked that takes a function value as 
*   argument, unlocks the box, runs the function, and then ensures that the 
*   box is locked again before returning, regardless of whether the 
*   argument function returned normally or threw an exception.
*
*   For extra points, make sure that if you call withBoxUnlocked when the 
*   box is already unlocked, the box stays unlocked.
*/
//LB
function callLockedbox (boxInitiallyLoced) { // eslint-disable-line no-unused-vars

  let retrn = [];

  const box = {
    locked: boxInitiallyLoced === "true" ? true : false,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };

  function withBoxUnlocked(body) {
    // Your code here.

    let initStatus = box.locked;

    if(initStatus) box.unlock();
    try {
      body();
      retrn.push("Box Contains: " + box.content);
    } finally {
      if (initStatus) box.lock();
    }

  }

  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });

  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    retrn.push("Error raised: " + e);
  }
  retrn.push("Box Locked: " + box.locked);
  return retrn;
}
//LB