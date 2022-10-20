import { Component, OnInit } from "@angular/core";
import { User } from 'oidc-client-ts';
import { AuthService } from "../services/auth.service";
import { TestApiService } from '../services/test-api.service';

@Component({
  selector: "app-home",
  template: `
    <div style="text-align:center">
      <h1>
        Sample Angular Client
      </h1>
    </div>
    <div>
    <h2>Workflows with Auth SSO</h2>
      1.<button (click)='onLogin()'>Login</button> ->
      2.<button (click)='onRenewToken()'>Renew Token</button> ->
      3.<button (click)='onLogout()'>Logout</button> 
    </div>
    <pre>{{currentUserJson}}</pre>
    <div>
    <h2>Workflows with MFA</h2>
    1.<button (click)='onGetAPIToken()'>Get API Token</button> ->
    2.<button (click)='onListDevice()'>Get a list of enrolled devices</button> ->
    3.<button (click)='onPushNotifyMFA()'>Send a push notification</button> ->
    4.<button (click)='onVerifyMFA()'>Get verify the MFA</button>
  </div>
  <div>
  <h4>List API </h4>
  <ul>
  <li><a href="https://developers.onelogin.com/api-docs/1/getting-started/authorizing-resource-api-calls" target="_blank">API Flow</a></li>
  <li><a href="https://developers.onelogin.com/api-docs/2/oauth20-tokens/generate-tokens-2" target="_blank"> Get API Token</a></li>
  <li><a href="https://developers.onelogin.com/quickstart/mfa" target="_blank">MFA Step Flow</a></li>
  
  <!--li><a href="https://developers.onelogin.com/api-docs/2/multi-factor-authentication/enrolled-factors" target="_blank">2. Get a list of enrolled devices</a></li>
  <li><a href="https://developers.onelogin.com/api-docs/2/multi-factor-authentication/activate-factor" target="_blank">3. Send a push notification MFA</a></li>
  <li><a href="https://developers.onelogin.com/api-docs/2/multi-factor-authentication/verify-factor-poll" target="_blank">4. Get verify the MFA</a></li-->
  </ul>
  </div>
   
    <div>
      <h2>Messages</h2>
      <ul>
        <li *ngFor='let msg of messages'>{{msg}}</li>
      </ul>
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(public authService: AuthService, public apiService: TestApiService) {
  }

  messages: string[] = [];
  get currentUserJson(): string {
    return JSON.stringify(this.currentUser, null, 2);
  }
  currentUser: User;

  ngOnInit(): void {
    this.authService.getUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.addMessage('User Logged In');
      } else {
        this.addMessage('User Not Logged In');
      }
    }).catch(err => this.addError(err));
  }

  clearMessages() {
    while (this.messages.length) {
      this.messages.pop();
    }
  }
  addMessage(msg: string) {
    this.messages.push(msg);
  }
  addError(msg: string | any) {
    this.messages.push('Error: ' + msg && msg.message);
  }

  public onLogin() {
    this.clearMessages();
    this.authService.login().catch(err => {
      this.addError(err);
    });
  }

  

  public onVerifyToken() {
    this.clearMessages();
    this.apiService.getApiToken().then(result => {
      this.addMessage('API Token Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  public onRenewToken() {
    this.clearMessages();
    this.authService.renewToken()
      .then(user => {
        this.currentUser = user;
        this.addMessage('Silent Renew Success');
      })
      .catch(err => this.addError(err));
  }

  public onLogout() {
    this.clearMessages();
    this.authService.logout().catch(err => this.addError(err));
  }
  public onGetAPIToken() {
    this.clearMessages();
    this.apiService.getApiToken().then(result => {
      this.addMessage('API Token Result: ' + JSON.stringify(result));
      if(result.access_token) this.apiService.apiTokenStore.setItem("access_token",result.access_token);
    }, err => this.addError(err));
  }

  public onListDevice() {
    this.clearMessages();
    this.apiService.getListDevice().then(result => {
      this.addMessage('List Get a list of enrolled devices Result: ' + JSON.stringify(result, null, 2));
     if(result) {
        result.data.otp_devices.forEach(device => {              
          if(device.active  && device.needs_trigger){
            this.apiService.apiTokenStore.setItem("device_id",device.id);
            return true;
          }
        });
      }
    }, err => this.addError(err));
  }

  public onPushNotifyMFA() {
    this.clearMessages();
    this.apiService.sendPushNotifyMFA().then(result => {
      if(result) {
        this.apiService.apiTokenStore.setItem("device_id",result.data[0].device_id);
        this.apiService.apiTokenStore.setItem("state_token",result.data[0].state_token);
      }
      this.addMessage('API Send a push notification Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  public onVerifyMFA() {
    this.clearMessages();
    this.apiService.getVerifyMFA().then(result => {
      this.addMessage('API Get verify the MFA Result: ' + JSON.stringify(result));
    }, err => this.addError(err));
  }

  public refresh() : void {
    console.warn('AppComponent.refresh');
    this.authService.getUser().then(user => {
      this.currentUser = user;

      if (user) {
        this.addMessage('User Logged In');
      } else {
        this.addMessage('User Not Logged In');
      }
    }).catch(err => this.addError(err));
  }
}
