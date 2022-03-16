import {AbstractRestService} from '@core/utils/abstract-rest-service';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable()
export class UsersService extends AbstractRestService {
  constructor() {
    super(environment.users);
  }
}
