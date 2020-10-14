"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

/*global Account, assert
*/

/**
 * A Bank Savings Account class
 * 
 * Includes Interest Rate and Adding Interest to Balance
*/
class SavingsAccount extends Account {

  
  /** Constructor for Savings Account
  * @param {Number} accountNumber - Account Number
  * @param {Number} interest - Interest Rate (% * 100)
  */
  constructor (accountNumber, interest) {
    super(accountNumber);
    this._interest = interest || 0;
  }

  /** Get Interest for Account
  * @returns {Number} Interest Rate
  */
  getInterest () {
    return this._interest;
  }

  /** Set Interest for Account
  * @param {Number} interest - Interest (% * 100)
  * @returns {undefined}
  */
  setInterest (interest) {
    this._interest = interest;
  }

  /** Adds Interest to Balance Account
  * @returns {undefined}
  */ 
  addInterest () {
    let interest = Math.round(this.getBalance() * this.getInterest()) / 100;
    if(interest > 0) this.deposit(interest);
    return interest;
  }

  /**
   * @returns {string} representation of this account
   */
  toString() {
    return "Savings Account: " + this._number + "; balance: " + this._balance + "; interest: " + this._interest;
  }

  /** Returns End of Month Savings Report
  * @returns {string} Report
  */
 endOfMonth() {
  return "Interest added: " + this.addInterest() + " SavingsAccount " + 
  this.getNumber() + ": balance: " + this.getBalance() + " interest: " + 
  this.getInterest();
}

}

describe("Saving Account Tests", function() {

  it("setInterest Method Working", function() {
    let account = new SavingsAccount(1234);
    account.setInterest(2);
    assert.equal(account._interest, 2);
  });

  it("getInterest Method Working", function() {
    let account = new SavingsAccount(1234);
    account.setInterest(2.5);
    assert.equal(account.getInterest(), 2.5);
  });

  it("addInterest Method Working", function() {
    let account = new SavingsAccount(1234);
    account.deposit(200);
    account.setInterest(2.5);
    account.addInterest();
    assert.equal(account.getBalance(), 205);
  });

  it("toString Method Working", function() {
    let account = new SavingsAccount(1234,2.5);
    account.deposit(120);
    assert.equal(account.toString(), "Savings Account: 1234; balance: 120; interest: 2.5");
  });

});