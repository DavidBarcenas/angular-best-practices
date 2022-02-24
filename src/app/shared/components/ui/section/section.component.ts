/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() title = '';
  @Input() headerActions!: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
