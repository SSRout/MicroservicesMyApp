import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Add headers to requests
    const clonedRequest = request.clone({
      setHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle errors globally
        console.error("HTTP Error:", error);
        return throwError(() => new Error(`HTTP Error: ${error.status}`));
      }),
    );
  }
}
