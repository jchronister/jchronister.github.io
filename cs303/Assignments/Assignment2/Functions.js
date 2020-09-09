"use strict";

/**
 * Returns Largest of 3 Numbers
 *
 * @param {number} num1 - Number 1
 * @param {number} num2 - Number 2
 * @param {number} num3 - Number 3
 * @return {number} Largest Number
 */
  function maxOfThree(num1, num2, num3) {

    let largest = num1;
    if (num2 > largest) largest = num2;
    if (num3 > largest) largest = num3;
    return largest;

}

/**
 * Returns Sum of Numbers in an Array
 *
 * @param {number[]} arr - Array of Numbers  
 * @return {number} Sum
 */
function sum(arr) {

  let total = arr[0];
  for (let i = 1; i < arr.length; i+=1) {
    total+=arr[i];
  }
  
  return total;

}


/**
 * Returns Length of Longest Word in an Array
 *
 * @param {string[]} arr - Array of Words  
 * @return {number} Word Length
 */
function findLongestWord(arr) {
    
  if (!Array.isArray(arr) || !arr.length) return 0;

  let longest = arr[0].length;
  
  for (let i = 1; i < arr.length; i+=1) {
    if(arr[i].length > longest) longest = arr[i].length;
  }

  return longest || 0;

}


/**
   * Returns true/false if Character is Vowel
   * 
   * @param  {string} chr - Letter Character
   * @returns {boolean}  true/false
   */
  function isVowel (chr) {
  
    chr = chr.toUpperCase();

    switch(chr) {
      case "A":
      case "E":
      case "I":
      case "O":
      case "U":
        return true;
      default:
        return false;
    }
  }


  /**
   * Returns String in Reverse Order
   * 
   * @param  {string} word - String to Reverse
   * @returns  {string} Reversed String
   */
  function reverse(word) {

    let retrn = [];
    for (let i = word.length - 1; i >= 0; i-=1) {
      retrn.push(word[i]);
    }
    return retrn.join("");

  }



  /**
   * Return Array of Strings Longer Than Argument
   * 
   * @param  {string[]} arr - Array of Strings
   * @param  {number} length - Number to Filter String by Length
   * @returns  {string[]} Array of Strings
   */
  function filterLongWords(arr, length) {
    let retrn = [];

    for (let i = 0; i < arr.length; i+=1) {
      if (arr[i].length > length) retrn.push(arr[i]);
    }
    return retrn;
  }