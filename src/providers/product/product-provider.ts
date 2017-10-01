import { Product } from '../../dtos/product';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  af: AngularFireDatabase;
  endPoint = '/stockpile/';
  dbUserId = '/';
  fboo: FirebaseObjectObservable<any>;
  constructor(public http: Http) {
    console.log('Hello ProductProvider Provider');
  }

  public createNewProduct(newProd: Product): void {
    var x = "";
    console.log(newProd.ownerId);

    // Build up connection string - maybe make seperate method
    x = this.endPoint + newProd.ownerId;
    x = x + '/' + newProd.name;
    this.fboo = this.af.object(x);
    //   this.dbUserId = this.endPoint + newProd.name;
    //    this.fboo = this.af.database.object(this.dbUserId + newProd.name); 
    this.fboo.set(newProd);
  }


}
