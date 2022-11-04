import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleStylesComponent } from './handle-styles.component';

describe('HandleStylesComponent', () => {
  let component: HandleStylesComponent;
  let fixture: ComponentFixture<HandleStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleStylesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
