import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidepeek',
  imports: [],
  templateUrl: './sidepeek.component.html',
  styleUrl: './sidepeek.component.scss'
})
export class SidepeekComponent {

  @Input() isSidepeekOpen = true;
  @Output() close = new EventEmitter<void>();
  

}
