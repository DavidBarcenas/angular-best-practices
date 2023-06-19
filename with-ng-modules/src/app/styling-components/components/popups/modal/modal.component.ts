import { Component, Directive } from '@angular/core';

@Directive({
  selector: 'app-modal-content',
  standalone: true
})
export class ModalContentDirective {}

@Directive({
  selector: 'app-modal-highlight',
  standalone: true
})
export class ModalHighlightDirective {}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true
})
export class ModalComponent {
  isOpen = false;

  toggleOpenClose(): void {
    this.isOpen = !this.isOpen;
  }
}
