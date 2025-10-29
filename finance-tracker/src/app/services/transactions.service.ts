import { Injectable, signal } from '@angular/core';
import { db } from '../data/transactions.db';
import { Transaction } from '../models/transaction.model';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  transactions = signal<Transaction[]>([]);
  selectedTransaction = signal<Transaction | null>(null);
  selectedTransactionType = signal<'Income' | 'Expense' | null>(null);

  constructor() {
    this.seedMockData();
    this.refresh();
  }

  async refresh() {
    this.transactions.set(await db.transactions.toArray());
  }

  async create(tx: Omit<Transaction, 'id'>): Promise<string> {
    const id = uuid();
    await db.transactions.add({ id, ...tx });
    return id;
  }

  getAll(): Promise<Transaction[]> {
    return db.transactions.orderBy('date').reverse().toArray();
  }

  getById(id: string): Promise<Transaction | undefined> {
    return db.transactions.get(id);
  }

  async update(id: string, patch: Partial<Transaction>): Promise<void> {
    await db.transactions.update(id, patch);
  }

  async delete(id: string): Promise<void> {
    await db.transactions.delete(id);
  }

  // Examples of common queries
  byMonth(yyyyMm: string) {
    // assuming tx.date is 'YYYY-MM-DD'
    return db.transactions
      .where('date')
      .between(`${yyyyMm}-01`, `${yyyyMm}-31`, true, true)
      .toArray();
  }

  /** Mock Data */
  async seedMockData() {
    const count = await db.transactions.count();
    if (count === 0) {
      await db.transactions.bulkAdd([
        {
          id: uuid(),
          date: '2025-08-13',
          category: 'Food',
          subCategory: 'Drinks',
          amount: -4.5,
          description: 'Latte at Starbucks'
        },
        {
          id: uuid(),
          date: '2025-08-14',
          category: 'Traffic',
          subCategory: 'Taxi',
          amount: -12.75,
          description: 'Ride home'
        },
        {
          id: uuid(),
          date: '2025-08-15',
          category: 'Income',
          subCategory: 'Salary',
          amount: 2500,
          description: 'August paycheck'
        }
      ]);
      await this.refresh();
    }
  }

  setSelectedTransaction(tx: Transaction | null) {
    this.selectedTransaction.set(tx);
  }

  getSelectedTransaction() {
    return this.selectedTransaction();
  }

  setTransactionType(txType: 'Income' | 'Expense' | null) {
    this.selectedTransactionType.set(txType);
  }

  getTransactionType() {
    return this.selectedTransactionType();
  }

}
