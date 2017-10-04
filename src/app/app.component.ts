import { Observable } from 'rxjs/Rx';
import { LoginPage } from '../pages/login/login';
import { AuthenticationProvider } from '../providers/authentication-provider/authentication-provider';
import { AngularFireAuthProvider } from 'angularfire2/auth';
import { SessionProvider } from '../providers/session-provider/session-provider';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabase } from 'angularfire2/database';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  private rootPage:any = LoginPage;
  private items: Observable<any[]>;
  public initLoginAttempted: boolean = false;
  
  constructor(private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen, 
    private auth: AuthenticationProvider,
    private db: AngularFireDatabase
  ) {
    debugger; 
    this.items = db.list('/user').valueChanges();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initWhenPlatformReady();
    });
  }
  /**
     * init stuff here that requires the platform to be ready
     */
    private initWhenPlatformReady(): void {
        this.platform.ready().then(() => {
            this.doLogin();
            // wait before setting login attempt flag
            setTimeout(() => { this.initLoginAttempted = true; }, 500);
        });
    }

    private doLogin() : void {
      // let email = `jeremyrjohnson8@gmail.com`;
      // let password = 'Karma3-18';
      // this.auth.doLogin(email, password); 

    }

}


