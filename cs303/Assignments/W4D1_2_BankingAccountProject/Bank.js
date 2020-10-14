"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

/*global Account, SavingsAccount, CheckingAccount,assert
*/

/**
*   Bank Class to Manage Accounts
*/
class Bank {

  /**
  * Constructor for Bank Class to Manage Accounts
  */
  constructor () {
    this.accounts = [];
    this.nextNumber = 1;

  }

  /**
  * Add Account
  * @returns {undefined}
  */
  addAccount() {
    this.accounts.push(new Account(this.nextNumber));
    this.nextNumber += 1;
  }
  
  /**
  * Add Saving Account
  * @param {Number} interest - Interest Amount
  * @returns {undefined}
  */
  addSavingsAccount(interest) {
    this.accounts.push(new SavingsAccount(this.nextNumber, interest));
    this.nextNumber += 1;
  } 

  /**
  * Add Checking Account
  * @param {Number} overdraft - Over Draft Amount Allowed
  * @returns {undefined}
  */
  addCheckingAccount(overdraft) {
    this.accounts.push(new CheckingAccount(this.nextNumber, overdraft));
    this.nextNumber += 1;
  }

  /**
  * Closes Account
  * @param {Number} number - Over Draft Amount Allowed
  * @returns {undefined}
  */ 
  closeAccount(number) {
    // eslint-disable-next-line id-length
    let id = this.accounts.reduce((a,n,i)=>n.getNumber()===number?i:a,-1);
    if(id!==-1) this.accounts.splice(id,1);
  }

  /**
  * Returns All Account Info - One per Line
  * @returns {String} Account Info
  */ 
  accountReport() {
    // eslint-disable-next-line id-length
    let rpt = this.accounts.map(n=>n.toString());
    return rpt.join("\n");
  }

  /** Returns End of Month Bank Account Report
  * @returns {string} Report
  */
  endOfMonth() {
    // eslint-disable-next-line id-length
    let rpt = this.accounts.map(n=>n.endOfMonth());
    return rpt.join("\n");
  }

}


describe("Bank Class Tests", function() {

  it("addAccount Method Working", function() {
    let account = new Bank();
    let check = new Account(1);
    account.addAccount();
    assert.deepEqual(account.accounts, [check]);
  });

  it("addSavingsAccount Method Working", function() {
    let account = new Bank();
    let check = new SavingsAccount(1,3);
    account.addSavingsAccount(3);
    assert.deepEqual(account.accounts, [check]);
  });

  it("addCheckingAccount Method Working", function() {
    let account = new Bank();
    let check = new CheckingAccount(1,500);
    account.addCheckingAccount(500);
    assert.deepEqual(account.accounts, [check]);
  });

  it("closeAccount Method Working", function() {
    let account = new Bank();
    let check1 = new Account(1);
    let check2 = new SavingsAccount(3,3);
    account.addAccount();
    account.addCheckingAccount(500);
    account.addSavingsAccount(3);
    account.closeAccount(2);
    assert.deepEqual(account.accounts, [check1,check2]);
  });
 
  it("accountReport Method Working", function() {
    let account = new Bank();
    let check1 = new Account(1);
    let check2 = new CheckingAccount(2,500);
    let check3 = new SavingsAccount(3,3);
    account.addAccount();
    account.addCheckingAccount(500);
    account.addSavingsAccount(3);
    let retrn = check1.toString() + "\n" +
                check2.toString() + "\n" +
                check3.toString();
    assert.equal(account.accountReport(), retrn);
  });

});





describe("endOfMonth Report Tests", function() {

  it("Acount endOfMonth Method Working", function() {
    let check1 = new Account(1);
    assert.equal(check1.endOfMonth(), "");
  });

  it("CheckingAccount endOfMonth Method Working", function() {
    let check1 = new CheckingAccount(3,500);
    check1.withdraw(100);
    assert.equal(check1.endOfMonth(), "Warning, low balance CheckingAccount 3: balance: -100 overdraft limit: 500");
    let check2 = new CheckingAccount(3,500);
    assert.equal(check2.endOfMonth(), "CheckingAccount 3: balance: 0 overdraft limit: 500");
  });

  it("SavingsAccount endOfMonth Method Working", function() {
    let check1 = new SavingsAccount(2,2.5);
    check1.deposit(100);
    assert.equal(check1.endOfMonth(), "Interest added: 2.5 SavingsAccount 2: balance: 102.5 interest: 2.5");
  });


  it("Bank endOfMonth Method Working", function() {
    let account = new Bank();
    let check1 = new Account(1);
    let check2 = new CheckingAccount(2,500);
    let check3 = new SavingsAccount(3,3);
    account.addAccount(); 
    account.addCheckingAccount(500);
    account.addSavingsAccount(3);
    let retrn = check1.endOfMonth() + "\n" +
                 check2.endOfMonth() + "\n" +
                 check3.endOfMonth();
    assert.equal(account.endOfMonth(), retrn);
  });

});