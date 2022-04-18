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
            .setEndpoint(this.environment.appwrite.endpoint) // Your Appwrite Endpoint
            .setProject(this.environment.appwrite.projectId) // Your project ID
    }
}
