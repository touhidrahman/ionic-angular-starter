import { InjectionToken, ValueProvider } from '@angular/core'

export interface AppConfig {
    production: boolean
    apiUrl: string
    appwrite: {
        endpoint: string
        projectId: string
        superAdminId: string
        collectionIds: {
            posts: string
        }
    }
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config')

export const getAppConfigProvider = (value: AppConfig): ValueProvider => ({
    provide: APP_CONFIG,
    useValue: value,
})
