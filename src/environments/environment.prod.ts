/**
 * If you are utilizing the make-env-file.ts script, then you need to take care of the following:
 * - This file will be replaced when you run `npm run make-env-file` or `npm run build:use-env`
 * - So make sure you change the `make-env-file.ts script` to reflect your environment configuration
 */
import { AppConfig } from '@core/config/app-config'

export const environment: AppConfig = {
    production: true,
    apiUrl: '',
    appwrite: {
        endpoint: 'http://206.189.57.2/v1',
        projectId: 'aw_biyemela',
        superAdminId: '62599c1db79403ee4f60',
        collectionIds: {
            posts: '625d4946e5ba6506e42c',
        },
    },
}
