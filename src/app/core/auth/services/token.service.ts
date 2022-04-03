import { Injectable } from '@angular/core';
import { StorageService } from '@core/storage/storage.service';
import { Observable } from 'rxjs';

const ACCESS_TOKEN_KEY = 'accesToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    storedAccessToken = '';

    constructor(private storage: StorageService) {}

    getAccessToken$(): Observable<string> {
        return this.storage.get(ACCESS_TOKEN_KEY);
    }

    async getAccessToken(): Promise<string> {
        return this.storage.getAsync(ACCESS_TOKEN_KEY);
    }

    async getRefreshToken(): Promise<string> {
        return this.storage.getAsync(REFRESH_TOKEN_KEY);
    }

    setAccessToken(accessToken: string) {
        this.storedAccessToken = accessToken;
        this.storage.set(ACCESS_TOKEN_KEY, accessToken);
    }

    setRefreshToken(refreshToken: string) {
        this.storage.set(REFRESH_TOKEN_KEY, refreshToken);
    }

    deleteAccessToken() {
        this.storedAccessToken = '';
        this.storage.remove(ACCESS_TOKEN_KEY);
    }

    deleteRefreshToken() {
        this.storage.remove(REFRESH_TOKEN_KEY);
    }

    setTokens(accessToken: string, refreshToken = '') {
        this.setAccessToken(accessToken);
        this.setRefreshToken(refreshToken);
    }

    deleteTokens() {
        this.deleteAccessToken();
        this.deleteRefreshToken();
    }
}
