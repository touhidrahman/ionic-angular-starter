/**
 * If you are utilizing the make-env-file.ts script, then you need to take care of the following:
 * - This file will be replaced when you run `npm run make-env-file` or `npm run build:use-env`
 * - So make sure you change the `make-env-file.ts script` to reflect your environment configuration
 */
import { AppConfig } from '@core/config/app-config';

export const environment: AppConfig = {
  production: true,
  apiUrl: '',
};
