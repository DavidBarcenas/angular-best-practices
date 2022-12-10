import { Component, Directive } from '@angular/core';

@Directive({ selector: 'app-modal-content' })
export class ModalContentDirective {}

@Directive({ selector: 'app-modal-highlight' })
export class ModalHighlightDirective {}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isOpen = false;

  toggleOpenClose(): void {
    this.isOpen = !this.isOpen;
  }
}
