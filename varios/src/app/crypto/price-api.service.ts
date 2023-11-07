import { Injectable } from '@angular/core';
import { PriceApi } from './price-api';
import { Observable } from 'rxjs';

const WEB_SOCKET_ENDPOINT = 'wss://ws.coincap.io/prices/';

@Injectable()
export class PriceApiService implements PriceApi {
  private webSocket: WebSocket | undefined;

  getPrice(currency: string): Observable<string> {
    return this.connectToPriceStream(currency);
  }

  unsubscribe(): void {
    this.webSocket?.close();
  }

  private connectToPriceStream(asset: string): Observable<string> {
    this.createConnection(asset);

    return new Observable((observer) => {
      const webSocket = this.webSocket;

      if (!webSocket) {
        observer.error('No web socket connection');
        return;
      }

      webSocket.onmessage = (msg: MessageEvent) => {
        const data = JSON.parse(msg.data);
        observer.next(data[asset]);
      };

      return {
        unsubscribe(): void {
          webSocket.close();
        },
      };
    });
  }

  private createConnection(asset: string): void {
    if (this.webSocket) {
      this.webSocket.close();
    }

    this.webSocket = new WebSocket(WEB_SOCKET_ENDPOINT + `?assets=${asset}`);
  }
}
