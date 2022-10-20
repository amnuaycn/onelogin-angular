import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userManager: UserManager;
  constructor() {
    
    const settings = {
      authority: environment.oidc.stsAuthority,
      client_id: environment.oidc.clientId,
      client_secret : environment.oidc.ClientSecret,
      redirect_uri: `${environment.oidc.clientRoot}signin-callback`,
      silent_redirect_uri: `${environment.oidc.clientRoot}silent-callback.html`,
      post_logout_redirect_uri: `${environment.oidc.clientRoot}`,
      response_type: 'code',
      scope: environment.oidc.clientScope,
      filterProtocolClaims: true,
      loadUserInfo: true,
      automaticSilentRenew: true
    };
    this.userManager = new UserManager(settings);
  }

  public getUser(): Promise<User> {
    return this.userManager.getUser();
  }
  
  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
     //let args: SignoutRedirectArgs = {};
     return this.userManager.signoutRedirect();
  }
}
