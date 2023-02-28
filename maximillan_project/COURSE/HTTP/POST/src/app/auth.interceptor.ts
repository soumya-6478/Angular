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
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("first");
    // if(request.url){}  // the request object changes for each http request, so we can access the url and do some validation
    // console.log("interceptor testing");
    const modifiedRequest = request.clone({
      headers: request.headers.append("auth", "xyz"),
    });
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        // with interceptors we can manipulate our response also by using different rxjs operators

        // console.log(event); // now type is 0
        if (event.type === HttpEventType.Response) {
          // console.log(event.type); // now type is 4
          // console.log(`response arrived!!!, body data: ${event.body}`);  // this is a blunder, template literals should be use in template
          console.log("response arrived!!!, body data: ");
          console.log(event.body);
        }
      })
    );
  }
}
