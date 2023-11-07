import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';

import { UserDetailComponent } from './user-detail.component';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { userMock } from '../../_fixtures_/user.mock';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let mockActivatedRoute, mockUserService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '3',
        },
      },
    };
    mockUserService = jasmine.createSpyObj('UserService', ['getUser', 'updateUser']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      imports: [UserDetailComponent, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: UserService, useValue: mockUserService },
        { provide: Location, useValue: mockLocation },
      ],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    mockUserService.getUser.and.returnValue(of(userMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h2').textContent).toContain(userMock.name);
  });
});
