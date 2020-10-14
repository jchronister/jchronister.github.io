"use strict";
/*global assert, Account
*/

describe("Banking Account Tests", function() {

  it("Account getNumber Method Working", function() {
    let account = new Account(1234);
    assert.equal(account.getNumber(), 1234);
  });

  it("Account getBalance Method Working", function() {
    let account = new Account(1234);
    account._balance = 56;
    assert.equal(account.getBalance(), 56);
  });

  it("Account deposit Method Working", function() {
    let account = new Account(1234);
    account.deposit(120);
    assert.equal(account._balance, 120);
  });

  it("Account withdraw Method Working", function() {
    let account = new Account(1234);
    account._balance = 240;
    account.withdraw(120);
    assert.equal(account._balance, 120);
  });

  it("Account toString Method Working", function() {
    let account = new Account(1234);
    account.deposit(120);
    assert.equal(account.toString(), "Account 1234: balance 120");
  });

});



