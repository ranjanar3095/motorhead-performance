// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// This file is used by the script "start" to build and serve the client locally and connect to a local or msg backend
// You can switch your backend, by commenting/uncommenting the "baseUrl:"

// PLEASE do not check in your "baseUrl" changes, if they are not relevant for all of your colleagues.

import { IBuildEnvironment } from './environment.interface';

export const environment: IBuildEnvironment = {
  // For switch of the backend server, change the target URL in "proxy.conf.dev.js"
  baseUrl: '/ranjanar3095.github.io/motorhead-performance/',
  production: false,
  mock: false,
  oidc: false,
  envName: 'dev',
  base: '/ranjanar3095.github.io/motorhead-performance/',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
