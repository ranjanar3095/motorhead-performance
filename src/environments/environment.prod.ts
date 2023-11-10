import { IBuildEnvironment } from './environment.interface';

/**********************************
 * Environment for DEPLOYING the App on a Daimler server (test or production)
 **********************************/

export const environment: IBuildEnvironment = {
  production: true,
  mock: false,
  oidc: true,
  baseUrl:
    window.location.protocol +
    '//' +
    window.location.hostname +
    '/ranjanar3095.github.io/motorhead-performance/',
  envName: 'prod',
  base: '/ranjanar3095.github.io/motorhead-performance/',
};
