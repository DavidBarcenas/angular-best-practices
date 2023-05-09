import { AfterContentInit, Component, ContentChild, Directive, ElementRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Directive({
  selector: 'app-message-title',
  standalone: true
})
export class MessageTitleDirective {}

@Directive({
  selector: 'app-message-content',
  standalone: true
})
export class MessageContentDirective {}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class MessageComponent implements AfterContentInit {
  @ContentChild(MessageContentDirective)
  messageContent: MessageContentDirective | undefined;
  isLayout01 = false;

  constructor(private hostRef: ElementRef) {}

  ngAfterContentInit(): void {
    this.isLayout01 = this.hostRef.nativeElement.classList.contains('layout--01');
  }
}
