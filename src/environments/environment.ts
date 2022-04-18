import { AppConfig } from '@core/config/app-config'

export const environment: AppConfig = {
    production: false,
    apiUrl: 'http://localhost:3000/v1',
    appwriteEndpoint: 'http://206.189.57.2/v1',
    appwriteProjectId: 'aw_biyemela',
    collectionIds: {
        posts: '625d4946e5ba6506e42c',
    },
}
