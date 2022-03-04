/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit {
  @Input() sectionTitle = '';
  @Input() headerActions!: TemplateRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
