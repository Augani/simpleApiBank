"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Database = /** @class */ (function () {
    function Database() {
        this.tables = [];
        this.data = {};
    }
    Database.prototype.addTable = function (table) {
        this.tables.push(table);
        this.data[table] = [];
        console.log(this);
        return this;
    };
    Database.prototype.add = function (table, data) {
        this.data[table].push(data);
        console.log(this);
        return this;
    };
    Database.prototype.addMany = function (table, data) {
        this.data[table] = this.data[table].concat(data);
        return this;
    };
    Database.prototype.get = function (table) {
        return this.data[table];
    };
    Database.prototype.getAll = function () {
        return this.data;
    };
    Database.prototype.getTableNames = function () {
        return this.tables;
    };
    Database.prototype.getById = function (table, id) {
        return this.data[table].find(function (x) { return x._id === id; });
    };
    Database.prototype.Update = function (table, data) {
        this.data[table] = this.data[table].map(function (x) {
            if (x._id === data._id) {
                return data;
            }
            else {
                return x;
            }
        });
        return this;
    };
    Database.prototype.getAccountByNumber = function (number) {
        return this.data["Account"].find(function (x) { return x.number === number; });
    };
    Database.prototype.Delete = function (table, data, by) {
        this.data[table] = this.data[table].filter(function (x) { return x._id !== data._id; });
    };
    Database.prototype.DeleteAll = function (table, by) {
        this.data[table] = [];
    };
    Database.prototype.compare = function (condition, valueOne, valueTwo) {
        if (condition === "equalTo") {
            return valueOne === valueTwo;
        }
        else if (condition === "greaterThan") {
            return valueOne > valueTwo;
        }
        else {
            return valueOne < valueTwo;
        }
    };
    Database.prototype.getAllBy = function (table, where, condition, values) {
        var _this = this;
        return this.data[table].filter(function (x) {
            return _this.compare(condition, x[where], values);
        });
    };
    return Database;
}());
var db = new Database();
db.addTable("Account").addTable("AccountHolder").addTable("Transfer");
exports.default = db;
