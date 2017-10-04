import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../dtos/product';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
  fboo: Observable<any>;
  constructor(private _af: AngularFireDatabase) {
    this.af = _af;  
    console.log('Hello ProductProvider Provider');
  }

  public createNewProduct(newProd: Product): void {
    var x = "";
    console.log(newProd.ownerId);

    // Build up connection string - maybe make seperate method
    x = this.endPoint + newProd.ownerId;
    x = x + '/' + newProd.name;
     this.af.object(x).set(newProd);

  }


}
