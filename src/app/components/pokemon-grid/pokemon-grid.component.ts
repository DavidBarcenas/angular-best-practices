import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  OnChanges, 
  Output, 
  SimpleChanges 
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, of } from 'rxjs';
import { PokemonItem } from 'src/app/interfaces/pokemon.interface';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonGridComponent implements OnChanges {
  @Input() pokemonList: PokemonItem[] = [];
  @Input() resultsLength: number = 0;
  @Input() isLoading = false;
  @Output() pageIndex = new EventEmitter<number>();

  public pageSize: number = 0;
  public showPokemons: PokemonItem[]  = []
  public displayedColumns: string[] = ['name', 'type', 'ability'];

  private filterKeyValues = this.displayedColumns.map((key) => ({ key, value: "" }));
  private filterSubject$ = new BehaviorSubject(this.filterKeyValues)
  private filter$ = this.filterSubject$.asObservable()

  constructor(private readonly router: Router) { }

  public ngOnChanges(changes: SimpleChanges): void {
    const pokemons = changes['pokemonList']
    if(pokemons && pokemons.currentValue.length > 0) {
      combineLatest([this.filter$, of(pokemons.currentValue)]).pipe(
        map(([filter, list]) => list.filter((p: any) => 
          filter.every(({key, value}) => 
            (new RegExp(String(value).toLowerCase()))
            .test(String(p[key]).toLowerCase())
        )))
    )
    .subscribe(data => {
      this.showPokemons = data
      this.pageSize = data.length
    })
   }
  }

  public filterFn(event: Event, fieldName: string): void {
    const value = (event.target as HTMLInputElement).value
    const filter = this.filterKeyValues.find(({key}) => key === fieldName)
    if(filter) {
      filter.value = value
      this.filterSubject$.next(this.filterKeyValues)
    }
  }

  public changePage(page: PageEvent): void {
    this.pageIndex.emit(page.pageIndex++)
  }

  public goToPokemonDetails(id: number): void {
    this.router.navigate(['pokemon', id])
  }
}
