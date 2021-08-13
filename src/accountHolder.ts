import Account, { IAccount } from './account'
const { v4: uuidv4 } = require('uuid');

export interface HolderBodyRequest {
    firstName: string;
    lastName: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    identification: string;
}

export interface IAccountHolder extends HolderBodyRequest {
    _id: string;
}

export default class AccountHolder{
    public _id: string
    public firstName: string;
    public lastName: string;
    public dob: string;
    public address: string;
    public phone: string;
    public email: string;
    public identification: string;
    public accounts: Array<IAccount>;

    constructor(firstName: string, lastName: string, dob: string, address: string, phone: string, email: string, identification: string){
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

    public addAccount(account: IAccount){
        this.accounts.push(account);
    }

    public removeAccount(account: Account){
        this.accounts.splice(this.accounts.indexOf(account), 1);
    }

    public getAccounts(): Array<IAccount>{
        return this.accounts;
    }

    public getName(): string{
        return `${this.firstName} ${this.lastName}`;
    }

    public getUserId(): string{
        return this._id;
    }


   
}
