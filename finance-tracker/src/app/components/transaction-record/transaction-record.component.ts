import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { TransactionEditorComponent } from '../transaction-editor/transaction-editor.component';
import { OverlayPanelComponent } from '../overlay-panel/overlay-panel.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { TransactionsService } from '../../services/transactions.service';
import { EXPENSE_CATEGORIES } from '../../data/expense-categories.data';
import { INCOME_CATEGORIES } from '../../data/income-categories.data';
import { Transaction } from '../../models/transaction.model';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-transaction-record',
  imports: [CommonModule, CdkListboxModule, TransactionEditorComponent, OverlayPanelComponent],
  templateUrl: './transaction-record.component.html',
  styleUrl: './transaction-record.component.scss'
})
export class TransactionRecordComponent {
  /** Service Declaration */
  constructor(
    public txs: TransactionsService, 
    public overlayService: OverlayService) {}

  /** Overlay Component */
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanelComponent;

  openTransactionEditor() {
    const transactionEditorPanel = new ComponentPortal(TransactionEditorComponent);
    this.overlayPanel.openPanel(transactionEditorPanel);
  }

  get transactions() {
    return this.txs.transactions;
  }

  getSubcategoryIcon(categoryName: string, subName: string, amount: number): string {
    const transactionType = amount > 0 ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    let category = transactionType.find((c => c.name === categoryName));
    return (
      category?.subcategories.find(sc => sc.name === subName)?.icon ||
      category?.icon || 
      'assets/dollar.svg'
    );
  }

  openTransactionDetails(transaction: Transaction) {
    this.txs.setSelectedTransaction(transaction);
    const transactionType = transaction.amount > 0 ? 'Income' : 'Expense';
    this.txs.setTransactionType(transactionType);

    const detailsPortal = new ComponentPortal(TransactionEditorComponent);
    this.overlayService.open(detailsPortal);

    console.log("Transaction id: " + transaction.id + "\n" + "Transaction category: " + transaction.category);
  }
}
