import { Loading, LoadingController, LoadingOptions, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificationProvider {
  private loading: Loading;
  /** Default loader options */
  private defaultLoadingOptions: LoadingOptions = {
    content: 'Loading...'
  };

  constructor(public toast: ToastController, public loadingCtrl: LoadingController) {
    console.log('Hello NotificationProvider Provider');
  }

  /** 
    * Call to show toast by passing in message
  **/
  public showToast(message: string): void {
    let toast = this.toast.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: false
    });
    toast.present();
  }

  /** 
   * Call when you WILL need a loader to be loaded. Must be init'ed once per loader
  */
  public initLoader(options?: LoadingOptions): void {
    if (!options) {
      this.loading = this.loadingCtrl.create(this.defaultLoadingOptions);
    } else {
      this.loading = this.loadingCtrl.create(options);
    }

    this.loading.onDidDismiss(() => {
      this.loading = null;
    });
  }

  /**
   * Call to actually show loader
   */
  public presentLoader(): void {
    if (this.loading) {
      this.loading.present();
    } else {
      this.initLoader();
      this.loading.present();
    }
  }

  /**
   * Call to dismiss loader
   */
  public dismissLoader(): void {
    if (this.loading) {
      this.loading.dismiss();
    }
  }
}
