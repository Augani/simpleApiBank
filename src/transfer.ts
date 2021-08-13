import Account, { IAccount } from './account'
const { v4: uuidv4 } = require('uuid');
export type TransferType = "debitTransfer" | "creditTransfer";

export interface ITransfer  {
    _id: string;
    account: string;
    amount: number;
    type: TransferType;
}

export default class Transfer{
    _id: string;
    account: IAccount
    amount: number
    type: TransferType

    constructor(account: IAccount, amount: number, type: TransferType){
        this._id = uuidv4();
        this.account = account;
        this.amount = amount;
        this.type = type;
    }


    static debitTransfer(account: Account, amount: number): Transfer{
        return new Transfer(account, amount, "debitTransfer");
    }
    static creditTransfer(account: Account, amount: number): Transfer{
        return new Transfer(account, amount, "creditTransfer");
    }

    getTransferInfo(): ITransfer{
        return {
            _id: this._id,
            account: this.account.number,
            amount: this.amount,
            type: this.type
        }
    }

   
}