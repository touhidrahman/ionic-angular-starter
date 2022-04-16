import { Inject, Injectable } from '@angular/core'
import { AppConfig, APP_CONFIG } from '@core/config/app-config'
import { Appwrite } from 'appwrite'

@Injectable({
    providedIn: 'root',
})
export class AppwriteService {
    sdk: Appwrite | null = null

    constructor(@Inject(APP_CONFIG) private environment: AppConfig) {
        // Init your Web SDK
        this.sdk = new Appwrite()
        this.sdk
            .setEndpoint(this.environment.appwriteEndpoint) // Your Appwrite Endpoint
            .setProject(this.environment.appwriteProjectId) // Your project ID
    }
}
