import { AuthenticationProvider } from '../providers/authentication-provider/authentication-provider';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
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
import { Platform } from 'ionic-angular';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


///Modules 
import { ProvidersModule } from '../modules/providers-module/providers-module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuthProvider } from 'angularfire2/auth';
import { MemoryStoreProvider } from '../providers/memory-store/memory-store';
import { NotificationProvider } from '../providers/notification-provider/notification-provider';

export const firebaseConfig = {
  apiKey: 'AIzaSyC7uKvwsoqe-_mV6RLu6fHdRVTDKBWieoc',
  authDomain: 'stocker-4c25a.firebaseapp.com',
  databaseURL: 'https://stocker-4c25a.firebaseio.com',
  storageBucket: 'stocker-4c25a.appspot.com',
  messagingSenderId: '59699739686'
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
    PagesModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
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
    SessionProvider,
    AngularFireDatabase,
    AuthenticationProvider,
    AngularFireAuthProvider,
    MemoryStoreProvider,
    NotificationProvider
  ]
})
export class AppModule { }
