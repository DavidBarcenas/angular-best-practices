import {AbstractRestService} from '@core/helpers/abstract-rest-service';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable()
export class UsersService extends AbstractRestService {
  constructor() {
    super(environment.users + '?PageNumber=1&PageSize=10');
  }
}
