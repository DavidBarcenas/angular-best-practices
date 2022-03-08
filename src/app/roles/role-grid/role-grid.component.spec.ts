import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleGridComponent } from './role-grid.component';

describe('RoleGridComponent', () => {
  let component: RoleGridComponent;
  let fixture: ComponentFixture<RoleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
