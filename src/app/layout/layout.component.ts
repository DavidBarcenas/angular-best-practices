import { Component, OnInit } from '@angular/core';
import { HttpService } from '~/app/utils/services/http/http.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showFiller = false;

  constructor(private http: HttpService) {}

  ngOnInit(): void {
    this.http
      .request('get', 'https://jsonplaceholder.typicode.com/posts')
      .subscribe(console.log);
  }
}
