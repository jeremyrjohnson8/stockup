import { StockPile } from '../../models/stockpile';
import { MemoryStoreProvider } from '../../providers/memory-store/memory-store';
import { debug } from 'util';
import { Observable, Subscription } from 'rxjs/Rx';
import { User } from '../../models/user';
import { StockpileProvider } from '../../providers/stockpile-provider/stockpile-provider';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { Product, ProductCategory } from '../../models/product';
import { AddProductPage } from '../add-product/add-product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the StockpilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stockpile',
  templateUrl: 'stockpile.html',
})
export class StockpilePage {
  productArray: Array<Product>;
  ProductCategory: ProductCategory;
  options: string[] = Object.keys(ProductCategory);
  private _sesh: SessionProvider;
  private userId: string;
  private routeParam: string;
  public currentUser: User;
  private dbEndPoint = '/products/';
  private endPoint = '/stockpile/';
  private dbUserId = '/';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public stockPileSvc: StockpileProvider,
    private memStore: MemoryStoreProvider,
    private af: AngularFireDatabase) {
    
    this.productArray = [];
    this.generateEnumStrings();
  }

  private generateEnumStrings() {
    this.options = this.options.slice(this.options.length / 2);
  }

  ionViewDidLoad() {
    this.userId = this.memStore.userMemoryData().data.userid; 
    this.stockPileSvc.GetStockPileByUserId(this.userId).then((stock: StockPile) => {
      if (stock){
        stock.value.forEach(prod => {
          this.productArray.push(prod);
        });
      }
    }); 
  }

  private setUpStockSub(fboo: Observable<any[]>): void {

  }

  private cleanUpSub(userSub: Subscription): void {
    // userSub.unsubscribe(); 
  }

  private addProduct(): void {
    this.navCtrl.push(AddProductPage);
  }

  public increment(index: number, productName: string): void {

    var finalEndpoint = this.endPoint + this.userId + '/' + productName + '/quantity/';
    var x = this.productArray[index].quantity + 1;
    this.af.object(finalEndpoint).set(x);

    this.productArray[index].quantity += 1;

  }

  public decrement(index: number, productName: string): void {
    var finalEndpoint = this.endPoint + this.userId + '/' + productName + '/quantity/';
    var x = this.productArray[index].quantity - 1;

    if (x == 0) {
      var productEndPoint = this.endPoint + this.userId + '/' + productName;
      this.af.object(productEndPoint).remove();
      var y = this.productArray.splice(index, 1);
    } else {
      this.af.object(finalEndpoint).set(x);
      this.productArray[index].quantity -= 1;
    }
  }

}
