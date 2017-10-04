import { Observable } from 'rxjs/Rx';
import { User } from '../../dtos/user';
import { StockpileProvider } from '../../providers/stockpile/stockpile';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { Product, ProductCategory } from '../../dtos/product';
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

//@IonicPage()
@Component({
  selector: 'page-stockpile',
  templateUrl: 'stockpile.html',
})
export class StockpilePage {
  productArray: Array<Product>; 
  ProductCategory : ProductCategory; 
  options : string[] = Object.keys(ProductCategory); 
  private _sesh: SessionProvider; 
  private userId: string; 
  private routeParam: string; 
  public currentUser: User; 
  private _stockServ: StockpileProvider; 
  private fboo: Observable<any[]>;
  private dbEndPoint = '/products/';
  endPoint = '/stockpile/';
  dbUserId = '/'; 
  constructor(public navCtrl: NavController, public navParams: NavParams, private stockPileSvc: StockpileProvider, private sesh: SessionProvider, private af: AngularFireDatabase ) //Import StockPile Service 
  {
   
    this._sesh = sesh;  
    this._stockServ = stockPileSvc; 

    this.productArray = []; 

      
    this.routeParam = this.navParams.get('username');
    
    this.generateEnumStrings(); 
  }

  private generateEnumStrings(){
    this.options = this.options.slice(this.options.length/2); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockpilePage');
     this.userId = this.routeParam; 
    var x = this.endPoint + this.userId;

    this.fboo = this.af.list(x).valueChanges();
    
  }

  private addProduct(): void {
    this.navCtrl.push(AddProductPage);
  }

  public increment(index: number, productName: string):void {
    
    console.log(index, productName);
    var finalEndpoint = this.endPoint + this.userId + '/' + productName + '/quantity/';
    var x = this.productArray[index].quantity + 1; 
    this.af.object(finalEndpoint).set(x);
    
    this.productArray[index].quantity += 1; 

  }

  public decrement(index: number, productName: string): void{
    console.log(index, productName);
    var finalEndpoint = this.endPoint + this.userId + '/' + productName + '/quantity/';
    var x = this.productArray[index].quantity - 1 ; 

    if (x == 0){
      var productEndPoint = this.endPoint + this.userId + '/' + productName;
      this.af.object(productEndPoint).remove();
      console.log(this.productArray);
      var y = this.productArray.splice(index, 1);
      console.log(y);
    } else {
      this.af.object(finalEndpoint).set(x);
      this.productArray[index].quantity -= 1; 
    }
  }

}
