import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private openSource = new Subject<ComponentPortal<any>>();
  private closeSource = new Subject<void>();

  open$ = this.openSource.asObservable();
  close$ = this.closeSource.asObservable();

  open(portal: ComponentPortal<any>) {
    this.openSource.next(portal); 
  }

  close() { this.closeSource.next(); }
  
}
