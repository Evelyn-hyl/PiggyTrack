import { Component, Injector, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TransactionEditorComponent } from './components/transaction-editor/transaction-editor.component';
import { BudgetWidgetComponent } from './components/budget-widget/budget-widget.component';
import { TransactionRecordComponent } from './components/transaction-record/transaction-record.component'
import { SidepeekComponent } from './components/sidepeek/sidepeek.component';
import { OverlayPanelComponent } from './components/overlay-panel/overlay-panel.component';
import { OverlayService } from './services/overlay.service';
import { TransactionsService } from './services/transactions.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BudgetWidgetComponent, TransactionRecordComponent, SidepeekComponent, OverlayModule, OverlayPanelComponent, TransactionEditorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'finance-tracker';

  /** Sidepeek State and State Handlers */
  isSidepeekOpen = signal(true);

  toggleSidepeek() { 
    this.isSidepeekOpen.update( v => !v ); 
    console.log("Sidepeek Menu Toggled");
  }
  closeSidepeek() { this.isSidepeekOpen.set(false); }

  /** Overlay Handlers */
  @ViewChild('overlayPanel') overlayPanel!: OverlayPanelComponent;
  
  constructor(
    private overlayService: OverlayService,
    private txs: TransactionsService,
  ) {}

  ngOnInit() {
    this.overlayService.open$.subscribe(portal => this.overlayPanel.openPanel(portal));
    this.overlayService.close$.subscribe(() => this.overlayPanel.closePanel());
  }

  openTransactionEditor(type: 'Expense' | 'Income') {

    this.txs.setTransactionType(type);

    const transactionEditorPortal = new ComponentPortal(TransactionEditorComponent);
    this.overlayService.open(transactionEditorPortal);

  }
}
