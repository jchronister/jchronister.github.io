/* eslint-disable id-length */
"use strict";

let cLib = {};

// Setup Variables
cLib.setup = {};
cLib.setup.getBookInfoURL = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/list";
cLib.setup.deleteBookURL = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/delete/";
cLib.setup.updateBookInfoURL = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/update/";
cLib.setup.addBookInfoURL = "https://elibraryrestapi.herokuapp.com/elibrary/api/book/add";

/** 
 * Retrieve Element Refence by Id
 * @param {String} id Element Id
 * @returns {Element} Element Reference
 */
cLib.el = function(id) {
  return document.getElementById(id);
};

/**
 * Retrieves Library Book Data
 * @param {string} url URL String
 * @param {Object} info Fetch Request Object
 * @param {Function} fx Callback Function
 * @param {Array} args Array of fx Arguments
 * @returns {Promise} Promise
 */
cLib.fetchData = async function (url, info, fx, args=[]) {// eslint-disable-line no-unused-vars

  try {

    let response = await fetch(url, info);

    let data = await response.json();

    fx.apply(null, [data, ...args]);

  } catch (err) { console.log("Error Retrieving Book Data. " + err);}

};




/** Adds Rows to Table Body
 * @param {String[]} ary - Array of Elements [[col1, col2, col3, etc...]]
 * @param {Object} tbody - tbody Reference
 * @returns {Object} [Cell Reference of Added Cells]
 */
cLib.addTableRow = function (ary, tbody) {

  let retrn = [];

  for(var r of ary) {// eslint-disable-line id-length
  
    let row = tbody.insertRow(-1);

    // Add Cells
    r.forEach(function (n,i) {// eslint-disable-line id-length
      let cell = row.insertCell(i);
      retrn.push(cell);

      // Create Edit Link
      if (Array.isArray(n)) {
        let a = document.createElement("a");
        a.href = "editBook.html?bookid=" + n[1];
        cell.appendChild(a);
        cell = a;
        n = n[0];
      }

      cell.appendChild(document.createTextNode(n));
    });
  
  }
  return retrn;
};





cLib.fillBookTable = function (data) {


  let tbl = cLib.el("bookData");
  let cnt = 1;

  // Remove Old Data
  data.forEach(function({bookId, isbn, title, overdueFee, publisher, datePublished }) {
    
    cLib.addTableRow([[cnt++, isbn, title, overdueFee, publisher, datePublished, ["edit", bookId]]], tbl);

  });
  
   // Append Data
  //  el("bookData").appendChild(tbl);  


};



/** 
 * Fills in Edit Book Page Form with Book Info Given Book Id
 * @param {Array} aryList Array of Objects to Search
 * @param {Number} id Book Id
 * @returns {undefined} 
 */
cLib.fillBookInfo = function (aryList, id) {

  aryList.forEach(function (n) {

    if (n.bookId === id) {
      Object.entries(n).forEach(([key, value]) => cLib.el(key).value = value);
      return;
    }

  });

};




/**
 * Returns Object with Form Data {Id : Value}
 * @param {String} formId Form Id
 * @param {Object} retrn Initial Object
 * @returns {Object} Form Data {Id : Value}
 */
cLib.getFormInfo = function (formId, retrn = {}) {
  
  let input = document.querySelectorAll("#" + formId + " input");

  input.forEach((n) => retrn[n.id] = n.value);

  return retrn;

};



