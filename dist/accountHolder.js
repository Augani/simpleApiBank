"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid').v4;
var AccountHolder = /** @class */ (function () {
    function AccountHolder(firstName, lastName, dob, address, phone, email, identification) {
        this._id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.identification = identification;
        this.accounts = [];
    }
    AccountHolder.prototype.addAccount = function (account) {
        this.accounts.push(account);
    };
    AccountHolder.prototype.removeAccount = function (account) {
        this.accounts.splice(this.accounts.indexOf(account), 1);
    };
    AccountHolder.prototype.getAccounts = function () {
        return this.accounts;
    };
    AccountHolder.prototype.getName = function () {
        return this.firstName + " " + this.lastName;
    };
    AccountHolder.prototype.getUserId = function () {
        return this._id;
    };
    return AccountHolder;
}());
exports.default = AccountHolder;
