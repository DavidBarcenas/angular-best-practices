import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, mergeMap, Observable, of, shareReplay } from 'rxjs';
import { PriceApiService } from '../price-api.service';
import { MockPriceApiService } from '../mock-price-api.service';

// in a real app could be environment.useMocks ?
const useMocks = true;

@Component({
  selector: 'app-crypto-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: PriceApiService,
      useClass: useMocks ? MockPriceApiService : PriceApiService,
    },
  ],
})
export class CryptoPageComponent implements OnInit {
  price$: Observable<string | undefined> = of(undefined);
  currency$ = new BehaviorSubject<string | undefined>(undefined);

  readonly assets = [
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'litecoin', label: 'Litecoin' },
    { value: 'ethereum', label: 'Ethereum' },
  ];

  constructor(private priceApiService: PriceApiService) {}

  ngOnInit() {
    this.price$ = this.currency$.pipe(
      mergeMap((currency: string | undefined) => {
        return currency ? this.priceApiService.getPrice(currency) : of(undefined);
      }),
      shareReplay(1)
    );
  }

  onCryptoSelected(asset: Event) {
    const currency = (asset as any).target.value;
    if (this.currency$.value) {
      this.priceApiService.unsubscribe();
    }

    this.currency$.next(currency);
  }
}
