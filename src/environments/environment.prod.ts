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
