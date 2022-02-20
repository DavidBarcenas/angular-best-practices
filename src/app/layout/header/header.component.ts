import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  handleToggleMenu() {
    this.toggleMenu.emit(true);
  }
}
