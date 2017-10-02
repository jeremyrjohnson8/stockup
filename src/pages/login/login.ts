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

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthenticationProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    // Your app login API web service call triggers 
    // let email = `jeremyrjohnson8@gmail.com`;
    // let password = 'Karma3-18';
    // this.auth.doLogin(email, password); 
    // this.navCtrl.push(TabsPage, {}, {animate: false});
  }


}
