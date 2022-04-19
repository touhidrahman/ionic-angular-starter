import { AppConfig } from '@core/config/app-config'

export const environment: AppConfig = {
    production: false,
    apiUrl: 'http://localhost:3000/v1',
    appwrite: {
        endpoint: 'http://206.189.57.2/v1',
        projectId: 'aw_biyemela',
        superAdminId: '62599c1db79403ee4f60',
        collectionIds: {
            posts: '625d4946e5ba6506e42c',
            comments: 'aw-biyemela-comments',
            countries: 'aw-biyemela-countries'
        },
    },
}
