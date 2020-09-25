"use strict";

let books = [];

/**
 * Gets Data from Object Value Property and Returns Converted Data
 * 
 * @param  {Object/String} element - Object or DOM Element ID with Value Property
 * @param  {String} type - Data Type for Value Converstion
 * @returns {[]} [String Data, Coverted Data or null for ''] 
 * 
 */
function getInput (element, type) {

  let str, retrn;

  if (typeof element === "object") {
    str = element.value;
  } else {
    str = document.getElementById(element).value;
  }

  switch (type) {
    case "number":
      retrn = Number(str) || null;
      break;
    case "string":
      retrn = str ? str : null;
      break;
    default:
      retrn = null;
  }
  return [str, retrn];
}

/**
 * Window Alert Text Arguments Separated by Comma
 * 
 * @param  {String} textParameters - Any Number of Text Parameters
 * @returns  {undefined} undefined
 */
function alertText (textParameters) {
  let text = [];
  for (let i = 0; i < arguments.length; i+=1) {
    text.push(arguments[i]);
  }
  alert(text.join(", "));
}


/**
 * Window Alert Textbox User Input Errors
 * 
 * @param  {String} label - Textbox Label Text
 * @param  {String} inputVal - User Input Value
 * @param  {?} cnvValue - User Input Converted Value
 * @param  {String} expType - Expected Data Type
 * @returns  {undefined} undefined
 */
function alertInputErrors (label, inputVal, cnvValue, expType) {

  switch (true) {
    case !inputVal:
      alertText("Please Enter Value for " + label);
      break;
    case cnvValue === null:
      alertText("Please Check and Reenter Value for " + label + " Expecting a " + expType) ;
      break;
    default:
      alertText("Please Enter Value for " + label);
  }

}


/**
 * Add Book Object to Books Array from Webpage Input Textboxes
 * @returns  {undefined} undefined
 */
function addBook () {

  let book = {};

  let textboxes = document.querySelectorAll("input[type=text]");
  
  for (let i = 0; i < textboxes.length; i+=1) {
    
    // Verify Input
    let elmnt = textboxes[i];
    let dataType = elmnt.getAttribute("data-Type");
    let value = getInput(elmnt, dataType);
    let key = elmnt.labels[0].innerText; 

    // Alert if Info Missing
    if (value[1] === null) {
      alertInputErrors(key, value[0], value[1],dataType);
      return;
    }

    // Add to Object
    book[key] = value[1];

  }
 
  // Add Object to Array & Clear Textboxes
  books.push(book);
  for (let i = 0; i < textboxes.length; i+=1) {
    textboxes[i].value = "";
  }

}
/**
 * Displays Sorted Book Properties in Text Area
 * 
 * @param  {String} key - books Object Property Key to Display
 * @returns  {undefined} undefined
 */
function displayBooks(key) {

  let bookInfo, arr;

  if (books.length === 0) {
    bookInfo = "Sorry, No Books in Library"
  } else {
    if(typeof books[0][key] === "number") {
      arr = books.map(n=>n[key]).sort((a,b)=>a-b);
    } else {
      arr = books.map(n=>n[key]).sort();
    }
    bookInfo = arr.reduce((a, n) => a + "\n" + n);
  }

  document.getElementById("bookDisplay").value = bookInfo;

}



function scramble(){

  let retrn = [];

  // Get Book Titles
  let titles = books.map(n=>n['Book Title'].trim());

  // Put Words in Array by Length
  for(let i = 0; i < titles.length; i+=1) {

      let split = titles[i].split(" ");

      split.map(function(n) {
        if(!retrn[n.length]) retrn[n.length] = [];
        retrn[n.length].push(n);
      })
  }

  // Put Array in String Format (for loop used to get missing element rows)
  let strRtrn = []
  for(let i = 1; i < retrn.length; i+=1) {
    strRtrn.push(retrn[i] ? retrn[i].join(", ") + '\n' : '\n')
  }
  document.getElementById("bookDisplay").value = strRtrn.join("")

}  
  
function addTestBooks () {

  books = []

  function addBooks (title,author,id) {
    var nbook = {};
    nbook['Book Title'] = title
    nbook['Author'] = author
    nbook['Library Id'] = id
    books.push(nbook);
  }

  addBooks("A Wind Before Time", 'Joe Kid', 456);
  addBooks("The Land Before Time", 'Clint Eastwood', 85);
  addBooks("Surfing", 'Kid Rock', 65);
  addBooks("Fishing For Gold", 'Eric Holt', 34);

}