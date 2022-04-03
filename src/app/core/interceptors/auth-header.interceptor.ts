import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { AuthService } from '@core/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.accessToken.value;

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
