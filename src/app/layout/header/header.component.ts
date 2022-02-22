import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<boolean>();
  private openSidenav = false;

  constructor() {}

  ngOnInit(): void {}

  handleToggleMenu() {
    this.openSidenav = !this.openSidenav;
    this.toggleMenu.emit(this.openSidenav);
  }
}
