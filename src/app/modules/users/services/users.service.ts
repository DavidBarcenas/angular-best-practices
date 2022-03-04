import {AbstractRestService} from '@core/helpers/http-factory';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable()
export class UsersService extends AbstractRestService {
  protected override endpoint = environment.users + '?PageNumber=1&PageSize=10';
  constructor(http: HttpClient) {
    super(http);
  }
}
