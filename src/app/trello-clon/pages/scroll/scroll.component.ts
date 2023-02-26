import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './scroll.component.html'
})
export class ScrollComponent {
  products$: Observable<any> = this.http.get('https://api.escuelajs.co/api/v1/products');
  constructor(private http: HttpClient) {}
}
