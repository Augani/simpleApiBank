import { IAccount} from './account'
import {IAccountHolder} from './accountHolder'
import {ITransfer} from './transfer'
type Collection = Array<IAccountHolder | ITransfer | IAccount>;
type Document = IAccount | ITransfer | IAccountHolder;
type WhereCondition = "equalTo" | "greaterThan" | "lessThan"

interface IKeyValue {
    [key: string]: Array<Document>;
}

class Database {
    public tables: Array<string>;
    public data: IKeyValue;
    constructor() {
        this.tables = [];
        this.data = {};
    }
    public addTable(table: string) {
        this.tables.push(table);
        this.data[table] = [];
        return this;
    }
    public add(table: string, data: Document) {
        this.data[table].push(data);
        return this;  
    }

    public addMany(table:string, data: Document[]) {
        this.data[table] = this.data[table].concat(data);
        return this;
    }

    public get(table: string): Collection {
        return this.data[table];
    }
    public getAll(): IKeyValue {
        return this.data;
    }
    public getTableNames(): Array<string> {
        return this.tables;
    }

    public getById(table: string, id: string): any {
        return this.data[table].find((x: Document) => x._id === id);
    }

    public Update(table: string, data: Document) {
        this.data[table] = this.data[table].map((x: Document) => {
            if (x._id === data._id) {
                return data;
            } else {
                return x;
            }
        });
        return this;
    }

    public getAccountByNumber(number: string): any {
        return this.data["Account"].find((x: any) => x.number === number);
    }

    public Delete(table: string, data: Document, by: string) {
        this.data[table] = this.data[table].filter((x: Document) => x._id !== data._id);
    }

    public DeleteAll(table: string, by: string) {
        this.data[table] = [];
    }

    public compare(condition: string, valueOne: string|number, valueTwo: string|number): boolean {
        if(condition === "equalTo"){
            return valueOne === valueTwo;
        }else if(condition === "greaterThan"){
            return valueOne > valueTwo;
        }else {
            return valueOne < valueTwo;
        }
    }

    public getAllBy(table: string, where: string, condition: WhereCondition, values: string | number): Array<Document> {
        return this.data[table].filter((x: {[key:string]: any}) => {
           return this.compare(condition, x[where], values);
        });
    }

}

let db = new Database();
db.addTable("Account").addTable("AccountHolder").addTable("Transfer");
export default db;