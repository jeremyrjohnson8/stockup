import { Subject } from 'rxjs/Rx';
import { MemoryStoreProvider } from '../../providers/memory-store/memory-store';
import { User } from '../../models/user';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private currentUser: User;
  public userUnsubscribe = new Subject<void>();

  firstName: string;
  constructor(public navCtrl: NavController,
    public memStore: MemoryStoreProvider) {

  }

  ionViewDidLoad() {
    // Setup data
    this.currentUser = this.memStore.userMemoryData().data;
    if (this.currentUser) {
      this.memStore.userMemoryData().dataSubject
        .takeUntil(this.userUnsubscribe)
        .subscribe((value: User) => {
          this.currentUser = value;
        });
    }
  }

  ionViewWillUnload() {
    this.userUnsubscribe.next();
    this.userUnsubscribe.complete();
  }
}
