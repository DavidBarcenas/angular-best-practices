import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no message to start', () => {
    expect(service.messages.length).toBe(0);
  });

  it('should add message when add is called', () => {
    service.add('message1');
    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    service.add('message1');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
