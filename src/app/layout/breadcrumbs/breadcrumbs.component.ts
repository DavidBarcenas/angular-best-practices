import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  mode = '';
  @Input()
  set collapse(value: boolean) {
    this.mode = value ? 'collapse' : 'expanded';
  }

  constructor() {}

  ngOnInit(): void {}
}
