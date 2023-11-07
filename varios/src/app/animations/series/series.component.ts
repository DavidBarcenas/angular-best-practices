import { Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, timer } from 'rxjs';
import { query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';
import { fadeInAnimation, fadeOutAnimation } from '../lib/fade.animation';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './series.component.html',
  animations: [
    trigger('rotateInStaggeredAnimation', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger(100, [useAnimation(fadeInAnimation)])], {
          optional: true,
        }),
        query(':leave', [stagger(0, [useAnimation(fadeOutAnimation)])], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class SeriesComponent {
  items = ['a', 'b', 'c', 'd'];
  items$ = new BehaviorSubject<Array<string | number>>(this.items);
  complete = false;
  isLoading = false;

  trackByFn: TrackByFunction<string> = (index: number, item: string) => index;

  loadMore() {
    this.isLoading = true;
    timer(3000).subscribe(() => {
      this.items$.next([...this.items, 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']);
      this.isLoading = false;
      this.complete = true;
    });
  }
}
