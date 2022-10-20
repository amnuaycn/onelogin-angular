import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User ,InMemoryWebStorage} from 'oidc-client-ts';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class TestApiService {
  apiTokenStore: Storage;
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.apiTokenStore = new InMemoryWebStorage();
  }

// Token
  public getApiToken(): Promise<any> {
    return this.authService.getUser().then((user: User) => {
      if (user && user.access_token) {
        return this._getApiToken(user.access_token);
      } else if (user) {
        return this.authService.renewToken().then((user: User) => {
          return this._getApiToken(user.access_token);
        });
      } else {
        throw new Error('user is not logged in');
      }
    });
  }

  _getApiToken(token: string) {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Basic ' + btoa(environment.api.clientId+':'+environment.api.ClientSecret) ,
    });
    return this.httpClient.post('/auth/oauth2/v2/token',{"grant_type":"client_credentials"}, { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          throw new Error('401 Unauthorized');
        }
        throw result;
      });
  }

  //Get a list of enrolled devices
  public getListDevice(): Promise<any> {
    return this.authService.getUser().then((user: User) => {
      if(this.apiTokenStore.getItem('access_token'))
      if (user && user.access_token) {
        return this._getListDevice(this.apiTokenStore.getItem('access_token'),user.profile.sub);
      } else if (user) {
        return this.authService.renewToken().then((user: User) => {
          return this._getListDevice(this.apiTokenStore.getItem('access_token'),user.profile.sub);
        });
      } else {
        throw new Error('user is not logged in');
      }
      else   new Error('Please Get API Token');
    });
  }

  _getListDevice(token: string,user_id : string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer "+ token
    });
   // https://<subdomain>/api/1/users/<user_id>/otp_devices
   // https://<subdomain>/api/2/mfa/users/<user_id>/devices
    return this.httpClient.get('/api/1/users/'+user_id+'/otp_devices', { headers:headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        if (result.status === 401) {
          throw new Error('401 Unauthorized');
        }
        throw result;
      });
  }

   
  //Send a push notification
  public sendPushNotifyMFA(): Promise<any> {
    return this.authService.getUser().then((user: User) => {
      if(this.apiTokenStore.getItem('device_id'))
      if (user && user.access_token) {
        return this._sendPushNotifyMFA(this.apiTokenStore.getItem('access_token'),
                                       user.profile.sub,
                                       this.apiTokenStore.getItem('device_id'));
      } else if (user) {
        return this.authService.renewToken().then((user: User) => {
          return this._sendPushNotifyMFA(this.apiTokenStore.getItem('access_token'),
                                       user.profile.sub,
                                       this.apiTokenStore.getItem('device_id'));
        });
      } else {
        throw new Error('user is not logged in');
      }
      else   new Error('Please Get a list of enrolled devices');
    });
  }

  _sendPushNotifyMFA(token: string,user_id: string,device_id: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer "+ token
    });
    //https://<subdomain>/api/2/mfa/users/<user_id>/verifications
    //https://<subdomain>.onelogin.com/api/1/users/<user_id>/otp_devices/<device_id>/trigger`,
    return this.httpClient.post('/api/1/users/'+user_id+'/otp_devices/'+device_id+'/trigger',
                                {"device_id": device_id, "expires_in": 240},
                                { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        throw result;
      });
  }

  //Get verify the MFA
  public getVerifyMFA(): Promise<any> {
    return this.authService.getUser().then((user: User) => {
      if(this.apiTokenStore.getItem('state_token'))
      if (user && user.access_token) {
        return this._getVerifyMFA(this.apiTokenStore.getItem('access_token'),
                                       user.profile.sub,
                                       this.apiTokenStore.getItem('device_id'),
                                       this.apiTokenStore.getItem('state_token'));
      } else if (user) {
        return this.authService.renewToken().then((user: User) => {
          return this._getVerifyMFA(this.apiTokenStore.getItem('access_token'),
                                       user.profile.sub,
                                       this.apiTokenStore.getItem('device_id'),
                                       this.apiTokenStore.getItem('state_token'));
        });
      } else {
        throw new Error('user is not logged in');
      }
      else   new Error('Please Send a push notification');
    });
  }

  _getVerifyMFA(token: string,user_id: string,device_id: string, state_token: string) {
    const headers = new HttpHeaders({
      Authorization: "Bearer "+ token
    });
   // https://<subdomain>/api/2/mfa/users/<user_id>/verifications/<verification_id>
   //https://<subdomain>.onelogin.com/api/1/users/<user_id>/otp_devices/<device_id>/verify
    return this.httpClient.post('/api/1/users/'+user_id+'/otp_devices/'+device_id+'/verify',
                                {"state_token": state_token},
                                { headers: headers })
      .toPromise()
      .catch((result: HttpErrorResponse) => {
        
        throw result;
      });
  }
}
