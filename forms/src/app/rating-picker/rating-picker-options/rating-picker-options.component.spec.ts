import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPickerOptionsComponent } from './rating-picker-options.component';

describe('RatingPickerOptionsComponent', () => {
  let component: RatingPickerOptionsComponent;
  let fixture: ComponentFixture<RatingPickerOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RatingPickerOptionsComponent]
    });
    fixture = TestBed.createComponent(RatingPickerOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
