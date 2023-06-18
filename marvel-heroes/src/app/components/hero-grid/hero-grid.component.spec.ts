import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroGridComponent } from './hero-grid.component';

describe('HeroGridComponent', () => {
  let component: HeroGridComponent;
  let fixture: ComponentFixture<HeroGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeroGridComponent]
    });
    fixture = TestBed.createComponent(HeroGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
