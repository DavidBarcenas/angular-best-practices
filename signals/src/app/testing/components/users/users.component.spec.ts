import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { userMock } from '../../_fixtures_/user.mock';
import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { By } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;

  @Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
    template: '<div></div>',
    styles: [],
  })
  class FakeUserComponent {
    @Input() user: User | undefined;
  }

  beforeEach(() => {
    mockUserService = jasmine.createSpyObj('UserService', ['getUsers', 'addUser', 'deleteUSer']);

    TestBed.configureTestingModule({
      imports: [UsersComponent, FakeUserComponent],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    });
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users correctly from the service', () => {
    mockUserService.getUsers.and.returnValue(of([userMock]));
    fixture.detectChanges();
    expect(fixture.componentInstance.users.length).toBe(1);
  });

  it('should create one li for each hero', () => {
    mockUserService.getUsers.and.returnValue(of([userMock]));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(1);
  });
});
