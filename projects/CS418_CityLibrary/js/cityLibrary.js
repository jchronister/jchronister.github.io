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
 * @param {Function} errFx Error Callback Function
 * @returns {Promise} Promise
 */
cLib.fetchData = async function (url, info, fx, args=[], errFx) {// eslint-disable-line no-unused-vars

  try {

    let response = await fetch(url, info);

    // Error from Server
    if (!response.ok) {
      throw response;
    }

    // Delete Returns No Body
    if (info && info.method === "DELETE") {
      var data = "Deleted Successfully";
    } else {
      data = await response.json();
    }

    fx.apply(null, [data, ...args]);

  } catch (err) { 
  
    console.log(err.message);
    errFx("Error Please See Console for Details", err);

  }
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

        if (n[0] === "edit") {
          // Edit
          a.href = "editBook.html?bookid=" + n[1];
        } else {
          // Delete
          a.href = "#Delete-" + n[1];

          a.onclick = function(id, info) {

            return function () {
              cLib.deleteBook(id,info);
              return false;
            };
          }(n[1],`Book Title: ${r[2]}\nISBN: ${r[1]}\nPublisher: ${r[4]}\nDate Published: ${r[5]}` );
        }
        cell.appendChild(a);
        cell = a;
        n = n[0];
      }

      cell.appendChild(document.createTextNode(n));
    });
  
  }
  return retrn;
};


/**
* Fills Table with Data
* @param {Array} data Array of Data
* @returns {undefined}
*/
cLib.fillBookTable = function (data) {

  // let tbl = cLib.el("bookData");
  let tbl = cLib.createElmt("tbody", null, []);
  let cnt = 1;

  // Remove Old Data
  data.forEach(function({bookId, isbn, title, overdueFee, publisher, datePublished }) {
    
    cLib.addTableRow([[cnt++, isbn, title, overdueFee, publisher, datePublished, ["edit", bookId], ["delete", bookId]]], tbl);

  });
  
   // Append Data
  //  el("bookData").appendChild(tbl);  
  // listItem.parentNode.replaceChild(newItem, listItem);
  cLib.el("bookz").replaceChild(tbl,document.querySelector("#bookz tbody"));
};



/** 
 * Fills in Edit Book Page Form with Book Info Given Book Id
 * @param {Array} aryList Array of Objects to Search
 * @param {Number} id Book Id
 * @param {Function} fx No Match Function
 * @returns {undefined} 
 */
cLib.fillBookInfo = function (aryList, id, fx) {

  for (let n of aryList){

    if (n.bookId === id) {
      Object.entries(n).forEach(([key, value]) => cLib.el(key).value = value);
      return;
    }

  }

  // No Match
  if (fx) fx();

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


/**
* Show Alert Message (Creates if Not Available)
* @param {String} title Message Title
* @param {String} message Message Body
* @returns {undefined}
*/
cLib.alert = function (title = "", message = "") {

  let info = cLib.el("info_msg");

  // Create if Not Present
  if (!info) {

    let frag = document.createDocumentFragment();
    info = cLib.createElmt("div", frag, [["class", "container"], ["class", "msg"], ["class", "hideMe"], ["id", "info_msg"], ["style", ["maxWidth", "500px"]]]);
    let row = cLib.createElmt("div", info, [["class", "row"], ["class", "m-1"]]);

    // Title
    cLib.createElmt("h4", row, [["id", "info_title"]]);

    // Message
    cLib.createElmt("p", row, [["id", "info_body"]]);

    // Button
    let col = cLib.createElmt("div", row, [["class", "col"]]);
    cLib.createElmt("button", col, [["innerText", "Ok"], ["id", "info_ok"], ["class", "float-end"], ["class", "btn"], ["class", "btn-primary"], ["class", "py-2"], ["class", "mx-1"]]);

    document.querySelector("body").appendChild(frag);
  }

  // Display Info
  info.classList.remove("hideMe");
  cLib.el("info_title").innerText = title;
  cLib.el("info_body").innerText = message;
  cLib.el("info_ok").onclick = function () {cLib.el("info_msg").classList.add("hideMe");};

};



/**
* Show Deletes Book -> Show Confirmation & Status Message
* @param {Number} bookId Book Id
* @param {String} bookInfo Book Info
* @returns {undefined}
*/
cLib.deleteBook = function (bookId, bookInfo) {

//   let rst = true;

let deletion = {  

    title: "Are You Sure You Want to Delete the Following Book?", 
    message: bookInfo,

    yesFx:  function () { // eslint-disable-line require-jsdoc
      
          cLib.el("confirm_msg").classList.add("hideMe");

          cLib.fetchData(cLib.setup.deleteBookURL + bookId, {method: "DELETE"}, function(){
            //     // Message and Clear Form
                cLib.alert("Book Successfully Deleted");
                cLib.fillBookForm();

            //     // addMode(true);
              },undefined, function(msg, err) {
                // Already Deleted
                if (err.status === 500) {
                  cLib.alert("Deletion Error", "Item May Have Already Been Deleted by Another User. " + msg);
                } else {
                  cLib.alert("Deletion Error", msg);
                }
                cLib.fillBookForm();
              });

        },

    noFx: () => cLib.el("confirm_msg").classList.add("hideMe")

};

cLib.confirm(deletion);

};



 /** Create New Element and Add Properties. Append to Element
 * @param {String} elmtType Element Type to Create
 * @param {Elment | null} elmt Element or Null to Append To
 * @param {Array} InfoAdd Array of Properties to Add [["property", "value]]
 * @returns {undefined}
 */
 cLib.createElmt = function (elmtType, elmt, InfoAdd) {

  let el = document.createElement(elmtType);

  // Add Info to Created Element
  InfoAdd.forEach(function ([type, add]) {
      switch (type) {
          case "style":
              el.style[add[0]] = add[1];
              break;
          case "class":
              el.classList.add(add);
              break;
          default:
              el[type] = add;
      }
  });

  if (elmt)
      elmt.appendChild(el);
  return el;
};




/** Show Confirmation Message
 * @param {Object} title - title, message, yesFx - Yes Function, noFx - No Function
 * @returns {undefined}
 */
cLib.confirm = function ({title, message, yesFx, noFx}) {

let conf = cLib.el("confirm_msg");

// Create if Does Not Exist
if (!conf) {

  let frag = document.createDocumentFragment();

  conf = cLib.createElmt("div", frag, [["class", "container"], ["class", "msg"], ["class", "hideMe"], ["id", "confirm_msg"], ["style", ["maxWidth", "600px"]]]);

  let row = cLib.createElmt("div", conf, [["class", "row"], ["class", "m-1"]]);

  // Title
  var elTitle = cLib.createElmt("h4", row, [["id", "confirm_title"]]);

  // Message
  var elMsg = cLib.createElmt("p", row, [["id", "confirm_info"], ["class", "my-2"]]);

  let col = cLib.createElmt("div", row, [["class", "col"]]);

  var elYes = cLib.createElmt("button",col, [["id", "confirm_yes"], ["innerText", "Yes"], ["class", "float-end"], ["class", "btn"], ["class", "btn-primary"], ["class", "py-2"], ["class", "mx-1"]]);
  var elNo = cLib.createElmt("button",col, [["id", "confirm_no"], ["innerText", "No"], ["class", "float-end"], ["class", "btn"], ["class", "btn-primary"], ["class", "py-2"], ["class", "mx-1"]]);

  document.querySelector("body").appendChild(frag);

}

// Update Properties
conf.classList.remove("hideMe");
(elTitle || cLib.el("confirm_title")).innerText = title;
(elMsg || cLib.el("confirm_info")).innerText = message;
(elYes || cLib.el("confirm_yes")).onclick = yesFx;
(elNo || cLib.el("confirm_no")).onclick = noFx;

};

/** Retrieve Book Data and Fill Books Table
 * @returns {undefined}
 */
cLib.fillBookForm = function () {

  // Get Book Data
  cLib.fetchData(cLib.setup.getBookInfoURL, null, cLib.fillBookTable, undefined, cLib.alert);

};

 



