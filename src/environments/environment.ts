// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  oidc : {
    stsAuthority: 'https://<onelogin subdomain>.onelogin.com/oidc/2/',
    clientId: '<client_id>',
    ClientSecret: '<client_secret>',
    clientRoot: 'http://localhost:4200/',
    clientScope: 'openid email profile'
  },
  api : {
    clientId: '<api_client_id>',
    ClientSecret: '<api_client_secret>',
    apiRoot: 'https://<onelogin subdomain>.onelogin.com'
  }
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
