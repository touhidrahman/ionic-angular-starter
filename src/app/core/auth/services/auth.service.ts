import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from '@core/auth/services/token.service';
import { AppConfig, APP_CONFIG } from '@core/config/app-config';
import { User, UserRole } from '@core/interfaces';
import { Platform } from '@ionic/angular';
import { catchError, Observable, of, shareReplay, tap } from 'rxjs';
import { StateSubject } from 'rxjs-state-subject';
import { LoginResponse } from '../interfaces/login-response';
import { LoginPayload } from '../interfaces/login.payload';
import { RegisterPayload } from '../interfaces/register.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new StateSubject<User | null>(null);

  private endpoint: string;
  private loggedIn = new StateSubject<boolean>(false);

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  get isAdmin(): boolean {
    return this.user.value?.role === UserRole.ADMIN || this.user.value?.role === UserRole.MODERATOR;
  }

  constructor(
    private http: HttpClient,
    private jwtService: JwtHelperService,
    private tokenService: TokenService,
    private platform: Platform,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    this.endpoint = this.appConfig.apiUrl + '/auth';

    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  signUp(data: RegisterPayload): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/register`, data);
  }

  login(data: LoginPayload): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.endpoint}/login`, data).pipe(
      tap(({ accessToken, refreshToken }) => {
        this.tokenService.setTokens(accessToken, refreshToken);
        const decoded = this.jwtService.decodeToken(accessToken);
        this.loggedIn.next(true);
        this.user.next(decoded as User);
      }),
    );
  }

  verifyEmail(token: string): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/verify-email/${token}`, {});
  }

  forgotPassword(email: string): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/forgot-password`, { email });
  }

  resetForgottenPassword(token: string, password: string, passwordConfirmation: string): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/reset-password/${token}`, { password, passwordConfirmation });
  }

  changePassword(password: string, passwordConfirmation: string): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/change-password`, { password, passwordConfirmation });
  }

  signOut() {
    this.tokenService.deleteTokens();
    this.user.next(null);
    this.loggedIn.next(false);
  }

  getLoggedInUserFromServer$(): Observable<User | null> {
    return this.http.get<User>(`${this.endpoint}/me`).pipe(
      tap((user) => this.user.next(user)),
      catchError(() => {
        this.user.next(null);
        return of(null);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private async checkToken() {
    this.tokenService.getAccessToken$().subscribe((accessToken) => {
      if (accessToken) {
        const decoded = this.jwtService.decodeToken(accessToken);
        const isExpired = this.jwtService.isTokenExpired(accessToken);

        if (!isExpired) {
          this.loggedIn.next(true);
          this.user.next(decoded as User);
        } else {
          this.tokenService.deleteAccessToken();
        }
      }
    });
  }
}
