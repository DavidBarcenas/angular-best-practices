import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AsyncSubject,
  Observable,
  Subject,
  connectable,
  fromEvent,
  interval,
  map,
  share,
  takeUntil,
  tap
} from 'rxjs';

interface UserResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

@Component({
  template: '<h1>Advanced RXJS</h1>'
})
export class AdvancedRxjsComponent implements OnInit {
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.asyncSubject();
  }

  // emits the last value, and only the last value,
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
