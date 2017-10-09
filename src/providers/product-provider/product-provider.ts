import { MemoryStoreProvider } from '../memory-store/memory-store';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Rx';
import { Product } from '../../models/product';
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
  private endPoint = '/stockpile/';
  private slash = '/';
  private dbUserId: string; 
  fboo: Observable<any>;
  constructor(public af: AngularFireDatabase,
  public memStoreProvider: MemoryStoreProvider) {
    if (memStoreProvider.loginMemoryData().data) {
      this.dbUserId = memStoreProvider.loginMemoryData().data.uid;       
    }
  }

  public createNewProduct(newProd: Product): void {
    let modifiedEndpoint = ``;
    console.log(newProd.ownerId);

    // Build up connection string - maybe make seperate method
    modifiedEndpoint = this.endPoint + newProd.ownerId;
    modifiedEndpoint = modifiedEndpoint + '/' + newProd.name;
    this.af.object(modifiedEndpoint).set(newProd);
  }


}
