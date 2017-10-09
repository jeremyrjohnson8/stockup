import { NavParams } from 'ionic-angular';
import { MemoryStoreProvider } from '../../providers/memory-store/memory-store';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { StockpilePage } from '../stockpile/stockpile';
import { AccountPage } from '../account/account';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = StockpilePage;
  tab3Root = AccountPage;
  
  constructor(memStore: MemoryStoreProvider, 
    private navParams: NavParams, 
    public sesh: SessionProvider) {
    let uid = navParams.get(`uid`); 
    this.inItMemStore(uid); 
  }

  inItMemStore(uid: string) : void {
    this.sesh.getCurrentUserById(uid);
  }
  
}
