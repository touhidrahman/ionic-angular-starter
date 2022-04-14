import { InjectionToken, ValueProvider } from '@angular/core';

export interface AppConfig {
    production: boolean;
    apiUrl: string;
    appwriteEndpoint: string;
    appwriteProjectId: string;
    appwriteCollectionId: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value,
});
