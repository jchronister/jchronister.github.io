"use strict";

/*global formatDate */

/* Export lib:Library*/


/* eslint-disable require-jsdoc */





class Library {
  constructor(){
      this.members = [];
      this.books = [];
  }

  getBook(id){// eslint-disable-line id-length
    for(var i = this.books.length - 1; i >= 0; i -= 1){
      if(this.books[i].id===id) return this.books[i];
    }
  }
  getMember(id){// eslint-disable-line id-length
    for(var i = this.members.length - 1; i >= 0; i -= 1){
      if(this.members[i].id===id) return this.members[i];
    }
  }

  addMember(member){
    let id = this.members.push(member);// eslint-disable-line id-length
    this.members[id - 1].id = id;// eslint-disable-line id-length
  }

  addBook(book){
    let id = this.books.push(book);// eslint-disable-line id-length
    this.books[id - 1].id = id;// eslint-disable-line id-length
  }

  checkOut(book, member, checkOutDate = new Date()) {
    let loan = new Loan(book, member, checkOutDate);
    member.checkedOut.push(loan);
    book.status.push(loan);
  }

}


class Book {
  constructor(title, author, bookCost, chargePerDay = 0.05, copies = 1) {
      this.title = title;
      this.author = author;
      this.bookCost = bookCost;
      this.chargePerDay = chargePerDay;
      this.status = []; // Holds Loans
      this.copies = copies;
  }

  key(){
    return this.title + " by " + this.author;
  }

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

      let expected = this.status.reduce(function(a, n) {// eslint-disable-line id-length
        if (n.dateDue < a) {
          return n;
        } else {
          return a;
        }
      },this.status[0].dateDue);    
      
      return "Unavailable Expected " + formatDate(expected);
    }



  }
}


class member {
  constructor(name, phone, balance = 0){
      this.name = name;
      this.balance = balance;
      this.checkedOut = [];
      this.cart = [];
      this.phone = phone;
  }
  key(){
    return this.name + ": " + this.phone;
  }

  addToCart(book) {
    if(!this.cart.includes(book)) {
      return this.cart.push(book);
    } else {
      return -1;
    }
  }

  deleteFromCart(book) {
    this.cart.splice(this.cart.indexOf(book),1);
  }
}

class Loan {

  constructor(book, member, dateCheckedOut = new Date()) {
      this.dateCheckedOut = dateCheckedOut;
      this.book = book;
      this.member = member;
      this.dateDue = this.getDueDate();
  }

  getDueDate() {
      let msDay = (1000 * 60 * 60 * 24 * 21);
      let dueDate = new Date(this.dateCheckedOut.getTime() + msDay);
      return new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  }

  computeCharge(date = new Date()) {

      let due = this.getDueDate();
      if (date > due) {
          let charge = (date - due) / (1000 * 60 * 60 * 24) * this.book.chargePerDay;
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

lib.checkOut(bok[0],mbr[0],new Date(2020, 6, 25));
lib.checkOut(bok[1],mbr[0],new Date(2020, 9, 19));
lib.checkOut(bok[2],mbr[0],new Date(2020, 8, 20));

lib.checkOut(bok[3],mbr[1],new Date(2020, 2, 3));
lib.checkOut(bok[4],mbr[1],new Date(2020, 9, 20));
lib.checkOut(bok[5],mbr[1],new Date(2020, 9, 12));

lib.checkOut(bok[6],mbr[2],new Date(2020, 7, 2));



// books.0("The longer the thread<>Emma Lathen<>0.05<>10");
// books.1("The sky's the limit<>Wayne W. Dyer<>0.05<>35");
// books.2("The Prince & the Lily<>James Brough<>0.15<>5");
// books.3("The sun : the universe<>Ian Ridpath<>0.05<>42");
// books.4("The tower, the zoo, and the tortoise<>Julia Stuart<>0.25<>15");
// books.5("The snake, the crocodile, and the dog<>Elizabeth Peters<>0.50<>25");
// books.6("Go, go America<>Dan Yaccarino<>0.15<>6");
// let book = 


// lib.checkOut(book, member, checkOutDate = new Date()) {
// members.0("Leslie Patricelli<>301-562-9861");
// members.1("Kid Rock<>919-657-6598");
// members.2("Maya Ajmera<>741-654-7524");
// members.3("Debbie Macomber<>741-675-1254");


}

