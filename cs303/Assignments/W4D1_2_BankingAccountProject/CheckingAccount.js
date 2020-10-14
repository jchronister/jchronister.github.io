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
 * A Bank Checking Account class
 * 
 * Includes Withdraw and Overdrafting
*/
class CheckingAccount extends Account {

  /** Constructor for Checking Account
  * @param {Number} accountNumber - Account Number
  * @param {Number} overDraftAmount - Allowable Overdraft Amount
  */ 
  constructor (accountNumber, overDraftAmount) {
    super(accountNumber);
    this._overDraft = overDraftAmount || 0;
  }

  /** Sets the Over Draft Amount
   * @param  {Number} amount Over Draft Amount
   * @returns {undefined}
   */
  setOverDraftAmount (amount) {
    this._overDraft = amount;
  }

  /** Gets the Over Draft Amount
  * @returns {Number} Over Draft Amount
  */
  getOverDraftAmount () {
    return this._overDraft;
  }

  /** Withdraws Amount from Balance
  * @param {Number} amount Amount
  * @returns {undefined}
  */
  withdraw (amount) {
    if (amount <= 0) {
      throw new RangeError("Withdraw amount has to be greater than zero");
    }
    if (amount > (this._balance + this.getOverDraftAmount ())) {
        throw Error("Insufficient funds");
    }
    this._balance -= amount;
    }

  /**
   * @returns {string} representation of this account
   */
  toString() {
    return "Checking Account: " + this._number + "; balance: " + this._balance + "; overdraw allowed: " + this.getOverDraftAmount ();
  }

  /** Returns End of Month Checking Report
  * @returns {string} Report
  */
   endOfMonth() {
    let warning = "";
    if(this.getBalance() < 0) warning = "Warning, low balance ";

    return warning + "CheckingAccount " + this.getNumber() + 
    ": balance: " + this.getBalance() + " overdraft limit: " + 
    this.getOverDraftAmount();
  }

}


describe("Checking Account Tests", function() {

  it("setOverDraftAmount Method Working", function() {
    let account = new CheckingAccount(1234);
    account.setOverDraftAmount(50);
    assert.equal(account._overDraft, 50);
  });

  it("getOverDraftAmount Method Working", function() {
    let account = new CheckingAccount(1234);
    account.setOverDraftAmount(70);
    assert.equal(account.getOverDraftAmount(), 70);
  });

  it("withdraw Method Working", function() {
    let account = new CheckingAccount(1234, 50);
    account.deposit(50);
    account.withdraw(90);
    assert.equal(account.getBalance(), -40);
    account.deposit(20);
    account.withdraw(20);
    assert.equal(account.getBalance(), -40);
    account.deposit(100);
    account.withdraw(10);
    assert.equal(account.getBalance(), 50);

  });


  it("toString Method Working", function() {
    let account = new CheckingAccount(1234,50);
    account.deposit(120);
    assert.equal(account.toString(), "Checking Account: 1234; balance: 120; overdraw allowed: 50");
  });

});