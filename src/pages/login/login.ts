import { SessionProvider } from '../../providers/session-provider/session-provider';
import { pascalCase } from '@ionic/app-scripts/dist';
import { AuthenticationProvider } from '../../providers/authentication-provider/authentication-provider';
import { TabsPage } from '../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string;
  public password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationProvider, public sesh: SessionProvider) {
    if (sesh.isLoggedIn()){
      let userId = sesh.getCurrentUser(); 
      this.navCtrl.push(TabsPage, {
        uid: userId
      }); 
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
    // Your app login API web service call triggers 
    // let email = `jeremyrjohnson8@gmail.com`;
    // let password = 'Karma3-18';
    // this.auth.doLogin(email, password); 
    if (this.email && this.password) {

      console.log(this.email + ' ' + this.password);

      this.auth._angAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((value: any) => {
        console.log(value);
        this.sesh.getCurrentUserById(value.uid);
        this.navCtrl.push(TabsPage, {
          uid: value.uid
        });        
        (error: Error) => {
          var errorMessage = error.message;
   
          if (errorMessage === 'auth/wrong-password') {
           alert('Wrong password.');
          } else {
           alert(errorMessage);
         }

        }
      });
    }

  }


}
