import Dexie, { Table } from 'dexie';
import { Transaction } from '../models/transaction.model';

export class TransactionsDB extends Dexie {
    transactions!: Table<Transaction, string>;

    constructor() {
        super('FinanceTrackerDB');
        // Schema: primary key & indexes (comma-separated)
        this.version(1).stores({
        transactions: 'id, type, date, category, subCategory, amount, description'
        //        PK     ^ indexes for fast queries
        });
    }
}

export const db = new TransactionsDB();