import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { MessageService } from './message.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { userMock } from '../_fixtures_/user.mock';

describe('UserService', () => {
  let service: UserService;
  let mockMessageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpTestingController],
      providers: [
        UserService,
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
      ],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUser', () => {
    it('should call get with the correct URL', () => {
      service.getUser(4).subscribe((user) => {
        expect(user).toEqual(userMock);
      });

      const req = httpTestingController.expectOne('/api/users/4');

      req.flush(userMock);
      expect(req.request.method).toEqual('GET');
      httpTestingController.verify();
    });
  });
});
