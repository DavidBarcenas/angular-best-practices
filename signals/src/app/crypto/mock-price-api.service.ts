import { Injectable } from '@angular/core';
import { PriceApi } from './price-api';
import { delay, map, Observable, Subject, takeUntil, timer } from 'rxjs';

const BASE_PRICES: { [key: string]: number } = {
  bitcoin: 11000,
  litecoin: 130,
  ethereum: 300,
};

const randomize = (price: number): number => {
  return Math.random() * 2 + price;
};

@Injectable()
export class MockPriceApiService implements PriceApi {
  private readonly latency = 250;
  private unSubscriptions$ = new Subject<void>();

  getPrice(currency: string): Observable<string> {
    return timer(0, this.latency).pipe(
      delay(1000),
      map(() => BASE_PRICES[currency]),
      map((price: number) => randomize(price)),
      map((price: number) => price.toFixed(5)),
      takeUntil(this.unSubscriptions$)
    );
  }

  unsubscribe() {
    this.unSubscriptions$.next();
  }
}
