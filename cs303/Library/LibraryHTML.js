"use strict";

/*global lib*/




//Load Members
updateListOptions(lib.members, "memberList");

//Load Books
updateListOptions(lib.books, "bookList");// eslint-disable-line id-length


let currentMember;

/** Get HTML Element Reference
 * @param  {String} eId - Element Id
 * @returns  {Object} HTML Element
 */
function elmt (eId) {return document.getElementById(eId);}

/** Alert User
 * @param  {String} msg - Message
 * @returns  {undefined}
 */
function alertUser (msg) {alert(msg);}


/** Convert Date to MM-DD-YY Format
 * @param  {Date} date Date
 * @returns {String} Formated Date
 */
function formatDate(date){
  return (date.getMonth() + 1) + "-" + date.getDate() + "-" + (date.getFullYear()%100);
}



/** Returns Option data-id that Matches Value
 * @param  {String} listName - Listbox Name
 * @param  {String} value - Value to Find
 * @returns {String} Data Id
 */
function getDataOption (listName, value) {
  let options = elmt(listName).options;
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

  let cmd = elmt("getMember");
  let txt = elmt("member");

  // Logout and Setup Login Mode
  if (cmd.value === "Log Out") {
    elmt("memberStatus").style.display="none";
    txt.value = "";
    txt.removeAttribute("disabled");
    cmd.value = "Select";
    currentMember = null;
    return;
  }

  // Get Member Account
  let opt = getDataOption("memberList", elmt("member").value);
  if(!opt) {
    let member = elmt("member").value;
    if (member === "") {
      alert("Please Select Member Account");
    } else {
      alert("Sorry Cannot Find Member '" + member + "' Please See Librarian to Create Account");
    }
    return;
  }

  // Get Current Member and Set Global
  let member = lib.getMember(Number(opt.getAttribute("data-id")));
  currentMember = member;

  // Show Current User Info
  elmt("memberInfo").firstChild.nodeValue =
  member.name + "; " + member.phone + "; Current Balance: " + member.balance;
  
  // Setup Logout Mode
  elmt("memberStatus").style.display="";
  cmd.value = "Log Out";
  txt.setAttribute("disabled", "disabled");

  updateMemberTables(member);

}

/** Update Checked Out and Cart HTML Tables
 * @param {Object} member - Member
 * @param {boolean} checkedOut Update Checked Out Table
 * @param {boolean} cart - Update Cart Table
 * @returns {undefined}
 */
function updateMemberTables (member, checkedOut = true, cart = true) {

  // Update Checked Out Table
  if (checkedOut) {
    var updt = updateTable(member.checkedOut, function(nth){
      return [nth.book.title, nth.book.author, formatDate(nth.dateDue), nth.computeCharge(), "Return"];}, 
      (ath, bth)=>bth[3] - ath[3], "checkedOut");

    // Show None Row if Needed
    elmt("noCheckedOut").style.display = member.checkedOut.length === 0 ? "" : "none";
  
     // Add Return Event Listener
     updt.forEach(function(n){// eslint-disable-line id-length

      if (n.cellIndex === 4) {
        n.classList.add("select");
        n.addEventListener("click", function(elmnt) {
        
        // Remove Item from Cart
        let cell = elmnt.target.parentElement.cells;

        let opt = getDataOption("bookList", cell[0].firstChild.nodeValue + " by " + cell[1].firstChild.nodeValue );
        let book = lib.getBook(Number(opt.getAttribute("data-id")));
        currentMember.returnItem(book, currentMember);

        updateMemberTables(currentMember, true, false);
        
        }, false);
      }
    });
  
  }

  // Update Cart Table
  if (cart) {
    
    updt = updateTable(member.cart, function(n){// eslint-disable-line id-length
      return [n.title, n.author, n.bookTextAvailble(), "Remove"];}, null, "cart");

    // Show None Row if Needed
    elmt("noCart").style.display = member.cart.length === 0 ? "" : "none";

    // Add Remove Event Listener
    updt.forEach(function(n){// eslint-disable-line id-length

      if (n.cellIndex === 3) {
        n.classList.add("select");
        n.addEventListener("click", function(elmnt) {
        
        // Remove Item from Cart
        let cell = elmnt.target.parentElement.cells;

        let opt = getDataOption("bookList", cell[0].firstChild.nodeValue + " by " + cell[1].firstChild.nodeValue );
        let book = lib.getBook(Number(opt.getAttribute("data-id")));
        currentMember.deleteFromCart(book);

        updateMemberTables(currentMember, false, true);
        
        }, false);
      }
    });
  }
}


/** Update Delete Old Rows and Add New Data to Table Body
 * @param {Object[]} aryMaster - Data Array
 * @param {Function} displayFx - Data to Display Function
 * @param {Function} sortFx - Sort Function
 * @param {String} tableBodyName - Table Name
 * @param {String} noneRowName - Table Name for None Row
 * @returns {Object} [Cell Reference of Added Cells]
 */
function updateTable(aryMaster, displayFx, sortFx, tableBodyName){

  let ary = [], tbl;

  // Get Checked Out Data
  aryMaster.forEach(b=>ary.push(displayFx(b)));// eslint-disable-line id-length

  // Sort If Needed
  if(sortFx) ary.sort(sortFx);

  // Delete Old Records and Put in New
  tbl = elmt(tableBodyName);
  removeAllChildren(tbl);
  return addTableRows(ary, tbl);

}


/** Adds Selected Book to Members Cart
 * @returns {undefined}
 */
function addToCart () {// eslint-disable-line no-unused-vars

  // Verify Member
  if (!currentMember) {
    alertUser("Please Login");return;
  }

  let bookTxt = elmt("books");
  let opt = getDataOption("bookList", bookTxt.value);
  
  // Verify Book Exists
  if(!opt) {
    let bookTitle = elmt("books").value;
    if (bookTitle === "") {
      alert("Please Select Book");
    } else {
      alert("Sorry Cannot Find Book '" + bookTitle + "'");
    }
    return;
  }

  // Get Book
  let book = lib.getBook(Number(opt.getAttribute("data-id")));

  // Check to See Book Already Exists & Add to Member Cart
  if(currentMember.addToCart(book) === -1) {
    alert("Sorry " + book.key() + " Already Exists in Your Cart");
    bookTxt.value = "";
    return;
  }

  // Update Table & Clear Textbox
  updateMemberTables(currentMember, false, true);
  bookTxt.value = "";
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

  let list = elmt(listId);
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
 * @returns {Object} [Cell Reference of Added Cells]
 */
function addTableRows (ary, tbody) {

  let retrn = [];

  for(var r of ary) {// eslint-disable-line id-length
  
    let row = tbody.insertRow(-1);

    // Add Cells
    r.forEach(function (n,i) {// eslint-disable-line id-length
      let cell = row.insertCell(i);
      retrn.push(cell);
      cell.appendChild(document.createTextNode(n));
    });
  
  }
  return retrn;
}

/** Checkout Items in Cart
 * @returns {undefined}
 */
function checkoutCart () {// eslint-disable-line no-unused-vars

  let cnt = 0;

  currentMember.cart.forEach(function (n) {// eslint-disable-line id-length
    if (n.bookAvailable()) {
      lib.checkOut(n, currentMember);
      currentMember.deleteFromCart(n);
      cnt += 1;
    }
  });

  // Update Tables if Books Checked Out
  if (cnt === 0) {
    alertUser("No Books in Cart or Available to Checkout");
  } else {
    updateMemberTables (currentMember);
  }
}