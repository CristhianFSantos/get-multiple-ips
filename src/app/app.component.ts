import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, map, merge, of } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private readonly httpClient: HttpClient) {}

  getIP() {
    const ipListSource$ = [
      this.httpClient
        .get<IPResponse>('https://api.ipify.org?format=json')
        .pipe(catchError(() => of(null))),
      this.httpClient
        .get<IPResponse>('https://ipwho.is/')
        .pipe(catchError(() => of(null))),
      this.httpClient
        .get<IPResponse>('https://api.bigdatacloud.net/data/client-ip')
        .pipe(catchError(() => of(null))),
      this.httpClient
        .get<IPResponse>('https://ipinfo.io/json')
        .pipe(catchError(() => of(null))),
      this.httpClient
        .get<IPResponse>('https://ip4.seeip.org/json')
        .pipe(catchError(() => of(null))),
      this.httpClient
        .get<IPResponse>('https://api4.my-ip.io/ip.json')
        .pipe(catchError(() => of(null))),
    ];

    merge(...ipListSource$)
      .pipe(
        map((response) => {
          return response?.ip || response?.ipString;
        }),
        takeWhile((ip: string) => !ip, true)
      )
      .subscribe((ip: string | undefined) => {
        console.log(ip);
      });
  }
}

export interface IPResponse {
  ip?: string;
  ipString?: string;
}
