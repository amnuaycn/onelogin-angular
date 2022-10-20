// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  oidc : {
    stsAuthority: 'https://egatdev-dev.onelogin.com/oidc/2/',
    clientId: '1ff4f2e0-2c43-013b-5717-0ae5611e59df217225',
    ClientSecret: '4423deeaa253253d8e5beb7c0e5ddb1da78bb41d156dbebe38931feed3889155',
    clientRoot: 'http://localhost:4200/',
    clientScope: 'openid email profile'
  },
  api : {
    clientId: '997fbc2543b27e1350aa77bd6c4ae750494c088ddfc42b57d52360b833507d8a',
    ClientSecret: 'bc3fe5f02ccc74361cddcf11bcd6244ecb44abdc37e8ae05ef05d586dcbfa384',
    apiRoot: 'https://egatdev-dev.onelogin.com'
  }
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
