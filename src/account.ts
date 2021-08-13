const { v4: uuidv4 } = require('uuid');
import AccountHolder from './accountHolder'
export type AccountType = "Savings" | "Checking";

export interface IAccount {
    _id: string;
    owner: string;
    number: string;
    type: AccountType;
    name: string;
    balance: number;
    created_at: string;
    updated_at: string;
}

export default class Account {
	
    public _id: string;
    public number: string;
    public name: string;
    public created_at: string;
    public updated_at: string;
    public balance: number;
    public type: AccountType;
    public owner: string;
    public pin: string;

    constructor(name:string, owner: string, balance: number = 100.0,  type: AccountType = "Savings" ) {
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
    debit(amount: number) {
        this.balance -= amount;
        this.updated_at = new Date().toISOString();
    }
    //create credit method on account
    credit(amount: number) {
        this.balance += amount;
        this.updated_at = new Date().toISOString();
    }
    //get balance method on account
    getBalance(): number {
        return this.balance;
    }

    //create method to get account information
    public getAccountInfo(): IAccount {
        return {
            _id: this._id,
            number: this.number,
            name: this.name,
            created_at: this.created_at,
            updated_at: this.updated_at,
            balance: this.balance,
            type: this.type,
            owner: this.owner
        }
    }

    

}