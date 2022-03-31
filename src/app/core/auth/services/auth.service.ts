import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppConfig, APP_CONFIG } from '@core/config/app-config';
import { User, UserRole } from '@core/interfaces';
import { StorageService } from '@core/storage/storage.service';
import { catchError, Observable, of, shareReplay, switchMap, tap, timer } from 'rxjs';
import { StateSubject } from 'rxjs-state-subject';
import { LoginResponse } from '../interfaces/login-response';
import { LoginPayload } from '../interfaces/login.payload';
import { RegisterPayload } from '../interfaces/register.payload';

const ACCESS_TOKEN_KEY = 'accesToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new StateSubject<User | null>(null);
  accessToken = new StateSubject<string>('');
  refreshToken = new StateSubject<string>('');

  private endpoint: string;

  get isLoggedIn(): boolean {
    return Boolean(this.accessToken.value);
  }

  get isAdmin(): boolean {
    return this.user.value?.role === UserRole.ADMIN || this.user.value?.role === UserRole.MODERATOR;
  }

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) private appConfig: AppConfig,
  ) {
    this.getTokens();
    this.endpoint = this.appConfig.apiUrl + '/auth';
    timer(300)
      .pipe(switchMap(() => this.getLoggedInUser$()))
      .subscribe();
  }

  signUp(data: RegisterPayload): Observable<void> {
    return this.http.post<void>(`${this.endpoint}/register`, data);
  }

  login(data: LoginPayload): Observable<LoginResponse | null> {
    return this.http.post<LoginResponse>(`${this.endpoint}/login`, data).pipe(
      tap((data) => {
        this.setTokens(data.accessToken, data.refreshToken);
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

  setTokens(accessToken: string, refreshToken = '') {
    this.storage.set(ACCESS_TOKEN_KEY, accessToken);
    this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
    this.accessToken.next(accessToken);
    this.refreshToken.next(refreshToken);
  }

  deleteTokens() {
    this.storage.remove(ACCESS_TOKEN_KEY);
    this.storage.remove(REFRESH_TOKEN_KEY);
    this.accessToken.next('');
    this.refreshToken.next('');
  }

  signOut() {
    this.deleteTokens();
    this.user.next(null);
  }

  getLoggedInUser$(): Observable<User | null> {
    return this.http.get<User>(`${this.endpoint}/me`).pipe(
      tap((user) => this.user.next(user)),
      catchError(() => {
        this.user.next(null);
        return of(null);
      }),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }

  private async getTokens() {
    const accessToken = await this.storage.get(ACCESS_TOKEN_KEY);
    const refreshToken = await this.storage.get(REFRESH_TOKEN_KEY);
    this.accessToken.next(accessToken);
    this.refreshToken.next(refreshToken);
  }
}
