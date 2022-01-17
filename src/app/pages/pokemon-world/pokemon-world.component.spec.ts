import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonWorldComponent } from './pokemon-world.component';

describe('PokemonWorldComponent', () => {
  let component: PokemonWorldComponent;
  let fixture: ComponentFixture<PokemonWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonWorldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
