import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

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
    this.multicast();
  }

  multicast(): void {
    const user$ = this.http
      .get<UserResponse>('https://reqres.in/api/users/2')
      .pipe(map(response => response.data));

    const userSubject = new Subject<UserResponse['data']>();
    // We subscribe to the subject multiple times.
    userSubject.subscribe(console.log);
    userSubject.subscribe(console.log);

    // Finally, we subscribe to our user Observable and pass along
    // the notifications to the userSubject.
    user$.subscribe(userSubject);
  }

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
