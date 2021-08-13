"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuidv4 = require('uuid').v4;
var Transfer = /** @class */ (function () {
    function Transfer(account, amount, type) {
        this._id = uuidv4();
        this.account = account;
        this.amount = amount;
        this.type = type;
    }
    Transfer.debitTransfer = function (account, amount) {
        return new Transfer(account, amount, "debitTransfer");
    };
    Transfer.creditTransfer = function (account, amount) {
        return new Transfer(account, amount, "creditTransfer");
    };
    Transfer.prototype.getTransferInfo = function () {
        return {
            _id: this._id,
            account: this.account.number,
            amount: this.amount,
            type: this.type
        };
    };
    return Transfer;
}());
exports.default = Transfer;
