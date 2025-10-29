import { Component } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { TransactionEditorComponent } from '../transaction-editor/transaction-editor.component';

@Component({
  selector: 'app-overlay-panel',
  standalone: true,
  imports: [OverlayModule, TransactionEditorComponent],
  template: `<!-- Overlay Panel -->
              <div class="overlay-panel-wrapper">
                  <ng-content></ng-content>
              </div>`,
  styles: [`.custom-overlay-panel {
              z-index: 2000 !important;
            }
            .cdk-overlay-backdrop {
              z-index: 1999 !important;
            }
          `]
})
export class OverlayPanelComponent {
  
  // Overlay Panels Declarations
  transactionEditorPortal = new ComponentPortal(TransactionEditorComponent);

  // Overlay State and State Handlers
  private overlayRef?: OverlayRef;

  constructor(private overlay: Overlay){}

  openPanel<T>(panel: ComponentPortal<T>) {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
      panelClass: 'custom-overlay-panel'
    });

    
    const compRef = this.overlayRef.attach(panel);
    (compRef.instance as any).overlayRef = this.overlayRef;

    this.overlayRef.backdropClick().subscribe(() => this.closePanel());

    return compRef;
  }

  closePanel() {
    this.overlayRef?.detach();

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

}
