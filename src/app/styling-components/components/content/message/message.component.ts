import { AfterContentInit, Component, ContentChild, Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'app-message-title' })
export class MessageTitleDirective {}

@Directive({ selector: 'app-message-content' })
export class MessageContentDirective {}
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
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
