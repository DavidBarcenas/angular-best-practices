import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  template: '<h1>Advanced RXJS</h1>'
})
export class AdvancedRxjsComponent implements OnInit {
  ngOnInit(): void {
    this.unicast();
  }

  unicast() {
    const o = new Observable(() => {
      console.log('new subscriber');
      return () => null;
    });

    o.subscribe();
    o.subscribe();
    o.subscribe();
  }
}
