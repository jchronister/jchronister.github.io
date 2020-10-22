"use strict";

/*global formatDate */

/* Export lib:Library*/


/** Library Class */
class Library {

  /** Library Constructor */
  constructor(){
      this.members = [];
      this.books = [];
  }

  /** Return Book Reference Given Id
   * @param  {Number} id Id
   * @returns {Object} Book
   */
  getBook(id){// eslint-disable-line id-length
    for(var i = this.books.length - 1; i >= 0; i -= 1){
      if(this.books[i].id===id) return this.books[i];
    }
  }

  /** Return Member Reference Given Id
   * @param  {Number} id Id
   * @returns {Object} Book
   */
  getMember(id){// eslint-disable-line id-length
    for(var i = this.members.length - 1; i >= 0; i -= 1){
      if(this.members[i].id===id) return this.members[i];
    }
  }

  /** Add Member
  * @param {Number} member Member Class
  * @returns {undefined}
  */
  addMember(member){
    let id = this.members.push(member);// eslint-disable-line id-length
    this.members[id - 1].id = id;// eslint-disable-line id-length
  }

  /** Add Book
  * @param {Number} book Book Class
  * @returns {undefined}
  */
  addBook(book){
    let id = this.books.push(book);// eslint-disable-line id-length
    this.books[id - 1].id = id;// eslint-disable-line id-length
  }

  /** Checkout Book
   * @param  {Object} book - Book
   * @param  {Object} member - Member
   * @param  {Date} checkOutDate - Date if Not Today
   * @returns {undefined}
   */
  checkOut(book, member, checkOutDate = new Date()) {
    let loan = new Loan(book, member, checkOutDate);
    member.checkedOut.push(loan);
    book.status.push(loan);
  }

  /** Return Book
   * @param  {Object} book - Book
   * @param  {Object} member - Member
   * @param  {Date} returnDate - Date if Not Today
   * @returns {undefined}
   */  
  returnItem(book, member, returnDate = new Date()) {
    
    for (var item of member.checkedOut) {
        if (item.book === book) {
            var loan = item;
            break;
        }
    }

    // Add Fees
    member.balance = loan.computeCharge(returnDate) + member.balance;

    // Remove from Member Checkout
    member.checkedOut.splice(member.checkedOut.indexOf(loan), 1);

    // Remove from Book Status
    book.status.splice(book.status.indexOf(loan), 1);
  }
}

/** Book Class */
class Book {

  /** Book Constructor 
   * @param  {String} title - Title
   * @param  {String} author - Author
   * @param  {Number} bookCost - Book Cost
   * @param  {Number} chargePerDay - Charge per Day - Default 0.05
   * @param  {Number} copies - Copies - Default 1
   */
  constructor(title, author, bookCost, chargePerDay = 0.05, copies = 1) {
      this.title = title;
      this.author = author;
      this.bookCost = bookCost;
      this.chargePerDay = chargePerDay;
      this.status = []; // Holds Loans
      this.copies = copies;
  }

  /** Return Primary Key
  * @returns {String} Key
  */
  key(){
    return this.title + " by " + this.author;
  }

  /** Check if Book Available
  * @returns {Boolean} Key
  */ 
  bookAvailable() {
    return this.status.length < this.copies;
  }

  /** Returns 'Available' or 'Unavailable Expected MM-DD-YY'
   * @returns {Sting} Available String
   */
  bookTextAvailble() {
    
    if (this.bookAvailable()) {
      return "Available";

    } else {

      // Get Due Dates by Order 
      let expected = this.status.map(n=>n.dateDue).sort((a,b)=>(b-a));// eslint-disable-line id-length
      if (expected.length > 1) {
        return "Items Due: " + expected.map(n=>formatDate(n)).join(", "); // eslint-disable-line id-length
      } else if (new Date() > expected[0]) {
          return "Unknown Overdue Since " + formatDate(expected[0]);
      } else {
        return "Unavailable Expected " + formatDate(expected[0]);
      }
    }
  }
}

/** Member Class */
class member {

  
  /** Member Constructor
   * @param  {string} name - Name
   * @param  {string} phone - Phone
   * @param  {Number} balance - Balance - Default of 0
   */
  constructor(name, phone, balance = 0){
      this.name = name;
      this.balance = balance;
      this.checkedOut = [];
      this.cart = [];
      this.phone = phone;
  }

  /** Return Primary Key
  * @returns {String} Key
  */
  key(){
    return this.name + ": " + this.phone;
  }

  /** Add Book to Cart
  * @param {Object} book - Book
  * @returns {undefined}
  */ 
  addToCart(book) {
    if(!this.cart.includes(book)) {
      return this.cart.push(book);
    } else {
      return -1;
    }
  }

  /** Delete Book from Cart
  * @param {Object} book - Book
  * @returns {undefined}
  */ 
  deleteFromCart(book) {
    this.cart.splice(this.cart.indexOf(book),1);
  }
}

/** Loan Class */
class Loan {
  
  /** Loan Constructor
   * @param  {Object} book - Book
   * @param  {Object} member  Member
   * @param  {Date} dateCheckedOut - Date - Default of Today
   */
  constructor(book, member, dateCheckedOut = new Date()) {
      let date = new Date(dateCheckedOut.getFullYear(), dateCheckedOut.getMonth(), dateCheckedOut.getDate());
      this.dateCheckedOut = date;
      this.book = book;
      this.member = member;
      this.dateDue = this.getDueDate();
  }

  /** Calculate Due Date
  * @returns {Date} Due Date
  */    
  getDueDate() {
      var dueDate = new Date(this.dateCheckedOut);
      dueDate.setDate(dueDate.getDate() + 21);
      return dueDate;
    }

  /** Calculate Return Dues
  * @param {Date} date - Return Date - Default of Today
  * @returns {Date} Due Date
  */ 
  computeCharge(date = new Date()) {

      let retrned  = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      if (retrned > this.dateDue) {
          let charge = (retrned - this.dateDue) / (1000 * 60 * 60 * 24) * this.book.chargePerDay;
          if (charge >= this.book.bookCost) {
              return this.book.bookCost;
          }
          return (Math.round(charge * 100) / 100);
      }
      return 0;
  }
}

let lib = new Library();

/*************************************************************************/
// Setup Library with Books and Members
{
/** Upload Books into Library
 * @param {Object} library - Library to Add Books
 * @returns {undefined}
 */
  let uploadBooks= function (library) {// eslint-disable-line no-unused-vars

  let books = [];

  books.push("The longer the thread<>Emma Lathen<>0.05<>10");
  books.push("The sky's the limit<>Wayne W. Dyer<>0.05<>35");
  books.push("The Prince & the Lily<>James Brough<>0.15<>5");
  books.push("The sun : the universe<>Ian Ridpath<>0.05<>42");
  books.push("The tower, the zoo, and the tortoise<>Julia Stuart<>0.25<>15");
  books.push("The snake, the crocodile, and the dog<>Elizabeth Peters<>0.50<>25");
  books.push("Go, go America<>Dan Yaccarino<>0.15<>6");
  books.push("The kid : the immortal life of Ted Williams<>Ben Bradlee<>0.10<>30");
  books.push("The kid who hit only homers<>Matt Christopher<>0.10<>50");
  books.push("Kid sheriff and the terrible Toads<>Bob Shea<>0.10<>20");
  books.push("The saddest words : William Faulkner's Civil War<>Michael Gorra<>0.10<>5");
  books.push("Paddling Iowa<>Nate Hoogeveen<>0.24<>25");
  books.push("Botanical art techniques<>Carol Woodin<>0.18<>15");
  books.push("The Russian Revolution : a new history<>Sean McMeekin<>0.50<>45");
  books.push("How to die in space : a journey through dangerous astrophysical phenomena<>Paul Sutter<>0.20<>20");
  books.push("iPad and iPad Pro: for dummies<>Edward Baig<>0.10<>8");
  books.push("The Socrates express<>Eric Weiner<>0.15<>17");
  books.push("Vesper flights<>Helen Macdonald<>0.30<>40");
  books.push("The dog lover's guide to travel<>Kelly Carter<>0.15<>12");
  books.push("Think like a monk<>Jay Shetty<>0.10<>3");

  // Upload to Library
  for (let b of books) {// eslint-disable-line id-length
    let [title, author, chargePerDay, bookCost] = b.split("<>");
    library.addBook(new Book(title, author,+bookCost, +chargePerDay));
  }

};

/** Upload Members into Library
 * @param {Object} library - Library to Add Books
 * @returns {undefined}
 */
 let uploadMember = function (library) {// eslint-disable-line no-unused-vars

  let members = [];

  members.push("Leslie Patricelli<>301-562-9861");
  members.push("Kid Rock<>919-657-6598");
  members.push("Maya Ajmera<>741-654-7524");
  members.push("Debbie Macomber<>741-675-1254");
  members.push("Daniel Miyares<>564-675-6345");
  members.push("Sherri Duskey<>345-856-6573");
  members.push("Elmore Leonard<>301-685-0235");
  members.push("Don Wulffson<>616-675-3024");
  members.push("Kenneth Cooper<>741-653-6428");
  members.push("Chris Ware<>717-976-8574");

  // Upload to Library
  for (let m of members) {// eslint-disable-line id-length
    let [name, phone] = m.split("<>");
    lib.addMember(new member(name, phone));
  }

};

// Fill Library
uploadBooks(lib);
uploadMember(lib);

let mbr = lib.members;
let bok = lib.books;

// Test Cases
bok[0].copies = 2;
lib.checkOut(bok[0],mbr[0],new Date(2020, 6, 25));
lib.checkOut(bok[1],mbr[0],new Date(2020, 9, 20));
lib.checkOut(bok[2],mbr[0],new Date(2020, 8, 20));
mbr[0].addToCart(bok[7]);

lib.checkOut(bok[3],mbr[1],new Date(2020, 2, 3));
lib.checkOut(bok[4],mbr[1],new Date(2020, 9, 20));
lib.checkOut(bok[5],mbr[1],new Date(2020, 9, 12));

lib.checkOut(bok[6],mbr[2],new Date(2020, 7, 2));

}

