"use strict";

/*global lib*/


//Load Members
updateListOptions(lib.members, "memberList");

//Load Books
updateListOptions(lib.books, "bookList", n=>n.status ===0 ? 0 : null);// eslint-disable-line id-length


let currentMember;



/** Returns Option data-id that Matches Value
 * @param  {String} listName - Listbox Name
 * @param  {String} value - Value to Find
 * @returns {String} Data Id
 */
function getDataOption (listName, value) {
  let options = document.getElementById(listName).options;
  for (var i = 0; i < options.length; i += 1) {
    if (options[i].value === value) {
      return options[i];
    }
  }
}

/** Shows Member Info
 * @returns {undefined}
 */
function getMember() {// eslint-disable-line no-unused-vars

  let cmd = document.getElementById("getMember");
  let txt = document.getElementById("member");

  if (cmd.value === "Log Out") {
    document.getElementById("memberStatus").style.display="none";
    txt.value = "";
    txt.removeAttribute("disabled");
    cmd.value = "Select";
    return;
  }

  let opt = getDataOption("memberList", document.getElementById("member").value);
  
  if(!opt) {
    let member = document.getElementById("member").value;
    if (member === "") {
      alert("Please Select Member");
    } else {
      alert("Sorry Cannot Find Member '" + member + "'");
    }
    return;
  }
  let member = lib.getMember(Number(opt.getAttribute("data-id")));
  currentMember = member;

  // Show User Info
  document.getElementById("memberInfo").firstChild.nodeValue =
  member.name + "; " + member.phone + "; Current Balance: " + member.balance;
  
  document.getElementById("memberStatus").style.display="";
  cmd.value = "Log Out";
  txt.setAttribute("disabled", "disabled");

  // Update Checked Out Table
  updateTable(member.checkedOut, function(n){// eslint-disable-line id-length
    return [n.title, n.author, n.checkedOut, n.getDueDate()];}, 
    (a, b)=>b[3] - a[3], "checkedOut", "noCheckedOut");// eslint-disable-line id-length

  // Update Cart Table
  updateTable(member.cart, function(n){ // eslint-disable-line id-length
    let status = n.status === 0 ? "Available" : "Unavailable";
    return [n.title, n.author, status, "Remove"];}, null, "cart", "noCart");

}

/** Update Checkedout and Cart Tables
 * @param {Object[]} aryMaster - Data Array
 * @param {Function} displayFx - Data to Display Function
 * @param {Function} sortFx - Sort Function
 * @param {String} tableName - Table Name
 * @param {String} noneRowName - Table Name for None Row
 * @returns {undefined}
 */
function updateTable(aryMaster, displayFx, sortFx, tableName, noneRowName){

  let ary = [], tbl;

  // Get Checked Out Data
  aryMaster.forEach(b=>ary.push(displayFx(b)));// eslint-disable-line id-length

  // Sort If Needed
  if(sortFx) ary.sort(sortFx);

  // Delete Old Records and Put in New
  tbl = document.getElementById(tableName);
  removeAllChildren(tbl);

  // Show None or Insert Data
  if (ary.length === 0) {
    if (noneRowName) document.getElementById(noneRowName).style.display = "";
  } else {
    if (noneRowName) document.getElementById(noneRowName).style.display = "none";
    addTableRows (ary, tbl);
  }

}


/** Adds Selected Book to Members Cart
 * @returns {undefined}
 */
function addToCart () {// eslint-disable-line no-unused-vars

  if (!currentMember) {
    alert("Please Login");
    return;
  }

  let opt = getDataOption("bookList", document.getElementById("books").value);
  
  if(!opt) {
    let bookTitle = document.getElementById("books").value;
    if (bookTitle === "") {
      alert("Please Select Book");
    } else {
      alert("Sorry Cannot Find Book '" + bookTitle + "'");
    }
    return;
  }
  let book = lib.getBook(Number(opt.getAttribute("data-id")));

  // Check to See if Already Exists Add to Member Cart
  if(currentMember.addToCart(book) === -1) {
    alert("Sorry " + book.key() + " Already Exists in Your Cart");
    return;
  }

  let add = [[book.title, book.author, book.status === 0 ? "Available" : "Unavailable Expected:?", "Remove"]];

  // Hide None Row and Add to Table
  document.getElementById("noCart").style.display = "none";
  addTableRows(add, document.getElementById("cart"));

  document.getElementById("books").value = "";
}

/**
 * @param  {Object} e - Clicked Object or Table Row/Cell
 * @returns {undefined}
 */
function removeTableRow (e) {// eslint-disable-line id-length

  let row = e.target || e;

  // Get Table Row
  while (row.nodeName !== "TR") {
    row = row.parentNode;
  }
  
  let fields = [row.cells[0].firstChild.nodeValue, row.cells[1].firstChild.nodeValue];

  // Show None if No Rows will Be Left
  let rowCnt = row.parentElement.children.length - 1;
  
  row.remove();

  return [fields, rowCnt];

}




/** Removed All Children from Parent Object
 * @param  {Object} element - Parent Object
 * @returns {undefined}
 */
function removeAllChildren(element) {

  // Remove Old Children
  let child = element.children;
  for (var i = child.length - 1; i >= 0 ; i -= 1) {
    element.removeChild(child[i]);
  }
  
}



/** Update HTML Data List Options
 * @param  {Object} ary - Array of Items to Add
 * @param  {string} listId - Data List Id
 * @param  {Function} include - Include Function Return Null to Skip
 * @returns {undefined}
 */
function updateListOptions(ary, listId, include) {

  let list = document.getElementById(listId);
  removeAllChildren(list);

  // Add New Children
  let frag = document.createDocumentFragment();
  for (var i of ary) {

    // Exclude if Needed
    let incld = include ? include(i) : undefined;
    if (incld !== null) {

    // Add Datalist Option
    let option = document.createElement("option");
    option.value = i.key();
    // option["data-id"] = i.id;
    option.setAttribute("data-id", i.id);
    frag.appendChild(option);
    }
  }

  // Apppend List of Options to Datalist
  list.appendChild(frag);

}
/** Creates HTML Table Row Fragment
 * @param {String[]} ary - Array of Elements [[col1, col2, col3, etc...]]
 * @param {Object} tbody - tbody Reference
 * @returns {Object} Table Row Fragment
 */
function addTableRows (ary, tbody) {

  for(var r of ary) {// eslint-disable-line id-length
  
    let row = tbody.insertRow(-1);

    // Add Cells
    r.forEach(function (n,i) {// eslint-disable-line id-length
      row.insertCell(i);
      row.cells[i].appendChild(document.createTextNode(n));

      if (n === "Remove") {
        row.cells[i].classList.add("select");
        row.cells[i].addEventListener("click", function(elmt) {
          
          let rmv = removeTableRow(elmt);

          // Show None for No Items
          if (rmv[1] === 0) document.getElementById("noCart").style.display = "";

          // Remove Item from Cart
          let opt = getDataOption("bookList", rmv[0][0] + " by " + rmv[0][1] );
          let book = lib.getBook(Number(opt.getAttribute("data-id")));
          currentMember.deleteFromCart(book);
          
        }, false);
      }
    });
  
  }

}

/** Checkout Items in Cart
 * @returns {undefined}
 */
function checkoutCart () {// eslint-disable-line no-unused-vars

  currentMember.cart.forEach(function (n) {// eslint-disable-line id-length
    if (n.status === 0) {
      lib.checkOut(n, currentMember);
      currentMember.deleteFromCart(n);
    }
  });

}