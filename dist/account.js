"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid').v4;
var Account = /** @class */ (function () {
    function Account(name, owner, balance, type) {
        if (balance === void 0) { balance = 100.0; }
        if (type === void 0) { type = "Savings"; }
        this._id = uuidv4();
        this.number = uuidv4();
        this.name = name;
        this.created_at = new Date().toISOString();
        this.updated_at = new Date().toISOString();
        this.balance = balance;
        this.type = type;
        this.owner = owner;
        this.pin = "1234";
    }
    //create debit method on account
    Account.prototype.debit = function (amount) {
        this.balance -= amount;
        this.updated_at = new Date().toISOString();
    };
    //create credit method on account
    Account.prototype.credit = function (amount) {
        this.balance += amount;
        this.updated_at = new Date().toISOString();
    };
    //get balance method on account
    Account.prototype.getBalance = function () {
        return this.balance;
    };
    //create method to get account information
    Account.prototype.getAccountInfo = function () {
        return {
            _id: this._id,
            number: this.number,
            name: this.name,
            created_at: this.created_at,
            updated_at: this.updated_at,
            balance: this.balance,
            type: this.type,
            owner: this.owner
        };
    };
    return Account;
}());
exports.default = Account;
