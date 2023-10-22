import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { userMock } from '../../_fixtures_/user.mock';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct user', () => {
    fixture.componentInstance.user = userMock;
    expect(fixture.componentInstance.user.id).toEqual(userMock.id);
  });

  it('should render the user name', () => {
    fixture.componentInstance.user = userMock;
    fixture.detectChanges();
    // expect(fixture.nativeElement.querySelector('a').textContent).toContain(userMock.name);
    let deA = fixture.debugElement.query(By.css('a'));
    expect(deA.nativeElement.textContent).toContain(userMock.name);
  });
});
