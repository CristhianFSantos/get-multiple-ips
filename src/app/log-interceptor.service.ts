import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class LogHttpInterceptor implements HttpInterceptor {
  private readonly CONSOLE_STYLE = `
    font-size: 10px;
    color: #fca130;
  `;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const time = new Date().getTime();
    const path = request.url;

    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const timeRequest = (new Date().getTime() - time) / 1000;

          console.log(
            `%cURL: ${path}\nTime: ${timeRequest}`,
            this.CONSOLE_STYLE
          );
        }
      })
    );
  }
}
