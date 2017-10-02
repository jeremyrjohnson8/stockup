import { SessionProvider } from '../providers/session-provider/session-provider';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { StockpilePage } from '../pages/stockpile/stockpile';
import { PagesModule } from '../modules/pages-module/pages-module';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


///Modules 
import { ProvidersModule } from '../modules/providers-module/providers-module';
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth, AUTH_PROVIDERS } from "angularfire2/AUTH";
import { AngularFireModule } from "angularfire2";


export const firebaseConfig = {
  apiKey: "AIzaSyC7uKvwsoqe-_mV6RLu6fHdRVTDKBWieoc",
  authDomain: "stocker-4c25a.firebaseapp.com",
  databaseURL: "https://stocker-4c25a.firebaseio.com",
  storageBucket: "stocker-4c25a.appspot.com",
  messagingSenderId: "59699739686"
};




@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    StockpilePage,
    HomePage,
    AccountPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ProvidersModule,
    PagesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    StockpilePage,
    HomePage,
    AccountPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireDatabase,
    SessionProvider,
    AngularFireAuth    
  ]
})
export class AppModule { }
