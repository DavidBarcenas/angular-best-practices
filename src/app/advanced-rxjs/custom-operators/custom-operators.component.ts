/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject, isDevMode } from '@angular/core';
import {
  Observable,
  UnaryFunction,
  bufferCount,
  from,
  map,
  mergeMap,
  pipe,
  sequenceEqual,
  tap
} from 'rxjs';

interface UserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
}

enum LoggerType {
  Count,
  Debug,
  Dir,
  Log,
  Table
}

const passCode = [1, 1, 1, 1];

@Component({
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOperatorsComponent implements OnInit {
  private http = inject(HttpClient);
  buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  ngOnInit(): void {
    this.http.get<UserResponse>('https://reqres.in/api/users').pipe(
      map(response => response.data),
      this.logger(),
      this.logger(LoggerType.Table)
    );
  }

  verifyPassword(): UnaryFunction<Observable<number>, Observable<boolean>> {
    return pipe(
      bufferCount<number>(4),
      mergeMap(code => from(code).pipe(sequenceEqual(from(passCode))))
    );
  }

  // create custom operator
  logger(loggerType = LoggerType.Log): UnaryFunction<Observable<any>, Observable<any>> {
    return pipe(tap(this.getLoggerByType(loggerType)));
  }

  private getLoggerByType(loggerType: LoggerType): (value: any) => void {
    // We list the types of console that we will use
    const loggerByType = {
      [LoggerType.Count]: console.count,
      [LoggerType.Debug]: console.debug,
      [LoggerType.Dir]: console.dir,
      [LoggerType.Log]: console.log,
      [LoggerType.Table]: console.table
    };
    // If we are developing it will return the log,
    // otherwise it will not return anything
    return isDevMode() ? loggerByType[loggerType] : () => {};
  }
}
