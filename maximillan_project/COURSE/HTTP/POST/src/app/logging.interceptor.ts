import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("second");
    console.log("outgoing request");
    return next.handle(request).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log("incomming response");
          console.log(event.body);
        }
      })
    );
  }
}
