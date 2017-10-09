import { observable } from 'rxjs/symbol/observable';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { StockPile } from '../../models/stockpile';
import { MemoryStoreProvider } from '../memory-store/memory-store';
import { Observable } from 'rxjs/Rx';
import { SessionProvider } from '../session-provider/session-provider';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product, ProductCategory } from '../../models/product';

/*
  Generated class for the StockpileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockpileProvider {


  private testId: string = `tester`;
  private dbEndPoint = '/products/';
  private endpoint: string;
  private _userURL = ``;
  private fbObjObs: Observable<any[]>;
  private productList: Array<Product>;
  private stockPile: StockPile;

  constructor(
    public af: AngularFireDatabase,
    public sesh: SessionProvider,
    private memStore: MemoryStoreProvider) {
    this.productList = [];
  }

  public endPoint = '/stockpile/';
  private dbUserId = '/';
  fboo: Observable<any[]>;
  stock = new StockPile(new Array<Product>());

  GetStockPileByUserId(userid: string): Promise<StockPile> {
    return new Promise((resolve) => {
      let url = this.buildEndPoint(userid);
      let dbLoc = this.af.object(url);
      dbLoc.set(userid).catch((err: Error) => {
        alert(err.message);
      });
      let stockObs = this.af.list(url).valueChanges();
      stockObs.subscribe((value: Product[]) => {
        if (value){
          this.stockPile = new StockPile(value);
          this.memStore.stockPileMemoryData().publish(this.stockPile);
          return resolve(this.stockPile);
        }
      });
      return resolve(null);
    });
  }

  private buildEndPoint(userid: string): string {
    return this.endPoint + userid;
  }

  public CreateStockPile(userid: string): void {
    let dbLocation = this.buildEndPoint(userid);
    this.af.object(dbLocation).set(new StockPile([]));
  }

  // private GetTestStockPile(): Array<Product>{
  //   this.products = new Product(); 
  //   this.products.brand = `Dove` ;
  //   this.products.name = `Men's Plus Body Wash`; 
  //   this.products.perishable = false; 
  //   this.products.size = `12 oz`;
  //   this.products.category = ProductCategory.HYGIENE_AND_GROOMING;
  //   this.products.upc = 12345679; 
  //   this.products.quantity = 2; 
  //   this.products.unit = `ea`; 

  //   this.products1 = new Product(); 
  //   this.products1.brand = `Head and Shoulders`;
  //   this.products1.name = `Dandruff Shampoo`; 
  //   this.products1.perishable = false; 
  //   this.products1.size = `12 oz`;
  //   this.products1.category = ProductCategory.HYGIENE_AND_GROOMING;
  //   this.products1.upc = 987654321; 
  //   this.products1.quantity = 3; 
  //   this.products1.unit = `ea`; 

  //   this.products2 = new Product(); 
  //   this.products2.brand = `Speed Stick` ;
  //   this.products2.name = `Deoderant`; 
  //   this.products2.perishable = false; 
  //   this.products2.size = `6 oz`;
  //   this.products2.category = ProductCategory.HYGIENE_AND_GROOMING;
  //   this.products2.upc = 12345679; 
  //   this.products2.quantity = 5; 
  //   this.products2.unit = `ea`; 

  //   this.products3 = new Product(); 
  //   this.products3.brand = `Huggies` ;
  //   this.products3.name = `Snug Fit Diaper`; 
  //   this.products3.perishable = false; 
  //   this.products3.size = `NA`;
  //   this.products3.category = ProductCategory.BABY_CARE;
  //   this.products3.upc = 654123987; 
  //   this.products3.quantity = 2; 
  //   this.products3.unit = `ea`; 

  //   this.products4 = new Product(); 
  //   this.products4.brand = `HP` ;
  //   this.products4.name = `Cyan Ink Cartridge - InkJet 8400A`; 
  //   this.products4.perishable = false; 
  //   this.products4.size = `4 oz`;
  //   this.products4.category = ProductCategory.OFFICE_SUPPLIES;
  //   this.products4.upc = 666555444; 
  //   this.products4.quantity = 2; 
  //   this.products4.unit = `ea`; 

  //   this.products5 = new Product(); 
  //   this.products5.brand = `VitaRush` ;
  //   this.products5.name = `Gummy Vitamins`; 
  //   this.products5.perishable = false; 
  //   this.products5.size = `12 oz`;
  //   this.products5.category = ProductCategory.HEALTH_AND_WELLNESS;
  //   this.products5.upc = 999888777; 
  //   this.products5.quantity = 3; 
  //   this.products5.unit = `ea`; 


  //   this.productList.push(this.products); 
  //   this.productList.push(this.products1); 
  //   this.productList.push(this.products2); 
  //   this.productList.push(this.products3); 
  //   this.productList.push(this.products4); 
  //   this.productList.push(this.products5); 

  //   return this.productList; 
  // }
}
