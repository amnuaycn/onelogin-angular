# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.x.x
and `[oidc-client-ts](https://github.com/authts/oidc-client-ts)` 

## Configuration file
####1. src/environments/environment.ts, src/environments/environment.prod.ts

```
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
  ```
 ####2.  src/proxy.config.js
 ```
   const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/auth"
        ],
        target: "https://<onelogin subdomain>.onelogin.com",
        changeOrigin: true,
        secure: true,
        logLevel: "debug", 
    }
]
module.exports = PROXY_CONFIG;
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# onelogin-angular
