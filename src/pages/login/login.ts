import { NotificationProvider } from '../../providers/notification-provider/notification-provider';
import { FirebaseAuthData } from '../../models/firebase-auth-result';
import { MemoryStoreProvider } from '../../providers/memory-store/memory-store';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { pascalCase } from '@ionic/app-scripts/dist';
import { AuthenticationProvider } from '../../providers/authentication-provider/authentication-provider';
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public email: string;
  public password: string;
  private user: User;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public memStore: MemoryStoreProvider,
    public auth: AuthenticationProvider,
    public notificationProvider: NotificationProvider
  ) {
    if (this.memStore.userMemoryData()) {
      this.user = this.memStore.userMemoryData().data;
      if (this.user) {
        this.navCtrl.push(TabsPage);
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewDidLeave(){
    console.log(`Dismissing loader`);
    this.notificationProvider.dismissLoader(); 
  }


  login(): void {
    if (this.email && this.password) {
      this.notificationProvider.initLoader(); 
      this.auth.doLogin(this.email, this.password).then((value: FirebaseAuthData) => {
        if (value){
          this.navCtrl.push(TabsPage, {
            uid: value.uid
          });
        } else {
          alert(`Value on login ${value.auth}`);
        }
      }).catch((error: Error) => {
        alert(`Error message ${error.message}`);
      });
    }
  }
}
