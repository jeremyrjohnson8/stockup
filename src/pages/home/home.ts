import { User } from '../../dtos/user';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentUser = new User();

  firstName: string; 
  constructor(public navCtrl: NavController, public sesh: SessionProvider) {
    let obsResp = this.sesh.getCurrentUser();   
    obsResp.subscribe(e => {
      this.currentUser = e; 
    });
  }
}
