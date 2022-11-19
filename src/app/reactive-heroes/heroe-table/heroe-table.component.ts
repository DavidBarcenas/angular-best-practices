import { Component, OnInit } from '@angular/core';
import { Hero } from '../heroe';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroe-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroeTableComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(public heroService: HeroeService) {}

  ngOnInit(): void {
    this.heroService.heroes$.subscribe(data => {
      this.heroes = data;
    });
  }
}
