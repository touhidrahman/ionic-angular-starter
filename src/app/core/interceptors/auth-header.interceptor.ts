import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { TokenService } from '@core/services/token.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.tokenService.storedAccessToken;

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<any>, accessToken: string) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
    });
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthHeaderInterceptor,
  multi: true,
};
