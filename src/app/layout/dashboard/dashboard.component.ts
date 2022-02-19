import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';

import {MatDrawerMode} from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  destroyed = new Subject<void>();
  sideNavMode: MatDrawerMode = 'side';

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe(res => {
        this.cdr.markForCheck();
        this.sideNavMode = res.matches ? 'over' : 'side';
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
