import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ReplaySubject,
  fromEvent,
  tap,
  AsyncSubject,
  interval,
  share,
  Subject,
  connectable,
  takeUntil,
  map,
  Observable
} from 'rxjs';
import { UserResponse } from './user.interface';

@Component({
  template: '<h2>Subject</h2>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class SubjectComponent {
  private http = inject(HttpClient);

  // Emits all or a specified number of past next notifications
  replaySubject(): void {
    const replaySubject = new ReplaySubject<number>();
    // emit the first values
    replaySubject.next(1);
    replaySubject.next(2);
    // show the first values and new values
    replaySubject.subscribe(x => console.log('sub 1 ', x));
    // emit new values
    replaySubject.next(3);
    replaySubject.next(4);
    // get all values [1,2,3,4]
    replaySubject.subscribe(x => console.log('sub 2 ', x));
  }

  // Emits the last value, and only the last value,
  // to all Observers upon completion.
  asyncSubject(): void {
    const clicks = fromEvent<MouseEvent>(document, 'click').pipe(
      tap(e => console.log(e.pageX, e.pageX))
    );
    const asyncSubject = new AsyncSubject<MouseEvent>();

    asyncSubject.subscribe(e => console.log({ x: e.pageX, y: e.pageY }));
    clicks.subscribe(asyncSubject);

    // Note that if an AsyncSubject never completes then the Observers
    // will never receive a next notification.
    setTimeout(() => asyncSubject.complete(), 5000);
  }

  // share the original observable and track Subscription references
  multicastRefCount(): void {
    const refCount = interval(1000).pipe(share());
    // Will emit data as long as there is at least one subscription
    const sub = refCount.subscribe(console.log);
    // sub with child subscription
    sub.add(refCount.subscribe(console.log));
    // when all subscribers unsubscribe, this one will
    // automatically unsubscribe from the source
    setTimeout(() => {
      // when they unsubscribe from the parent,
      // automatically the children also unsubscribe
      sub.unsubscribe();
    }, 5000);
  }

  // We'll use connectable operator to create multicasted Observables
  multicastOperator(): void {
    const completeSubject = new Subject<boolean>();
    // we create The source observable
    const multicasted = connectable(interval(1000).pipe(takeUntil(completeSubject)), {
      connector: () => new Subject<number>()
    });

    // We subscribe to the observable multiple times
    multicasted.subscribe(console.log);
    multicasted.subscribe(console.log);

    // Here we connect all consumers to the source
    multicasted.connect();

    // we stop the interval and stop emitting data
    setTimeout(() => {
      completeSubject.next(true);
      completeSubject.complete();
    }, 5000);
  }

  // When a Subject receives a new Observer it does
  // not invoke a new execution for the production of values
  // Rather, each observer receives the same produced values
  multicast(): void {
    const user$ = this.http
      .get<UserResponse>('https://reqres.in/api/users/2')
      .pipe(map(response => response.data));

    const userSubject = new Subject<UserResponse['data']>();
    // We subscribe to the subject multiple times.
    userSubject.subscribe(console.log);
    userSubject.subscribe(console.log);

    // Finally, we subscribe to our user Observable and pass along
    // the notifications to the userSubject
    user$.subscribe(userSubject);
  }

  // Each Observer owns a separate execution of the Observable
  unicast(): void {
    const o = new Observable(() => {
      console.log('new subscriber');
      return () => null;
    });

    o.subscribe();
    o.subscribe();
    o.subscribe();
  }
}
