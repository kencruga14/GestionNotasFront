// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Token} from '../app/layout/matriculacion/modelos/token.model';

export const environment = {
    production: false,
    API_URL: 'http://127.0.0.1:8000/api/',
    API_URL_PUBLIC: 'http://127.0.0.1:8000/'
    // API_URL: 'http://172.16.24.10:8000/api/',
    // API_URL_PUBLIC: 'http://172.16.24.10:8000/'
    // API_URL: 'http://134.209.209.73/matriculacion/server/api/',
    // API_URL_PUBLIC: 'http://134.209.209.73/matriculacion/server/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
