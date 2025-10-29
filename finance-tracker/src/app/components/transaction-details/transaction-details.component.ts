import { OverlayRef } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-details',
  imports: [],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss'
})
export class TransactionDetailsComponent {
  overlayRef!: OverlayRef;

  constructor(private txs: TransactionsService) {}

  closeSelf() {
    this.overlayRef?.detach();
  }

}
