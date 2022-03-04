import {HTTPFactory} from '@core/helpers/http-factory';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable()
export class UsersService extends HTTPFactory {
  constructor(public override http: HttpClient) {
    super(environment.users + '?PageNumber=1&PageSize=10', http);
  }
}
