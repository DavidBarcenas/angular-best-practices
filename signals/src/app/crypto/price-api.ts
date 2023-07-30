import { Observable } from 'rxjs';

export interface PriceApi {
  getPrice(currency: string): Observable<string>;

  unsubscribe(): void;
}
