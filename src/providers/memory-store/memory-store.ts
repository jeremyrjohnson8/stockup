import { Product } from '../../models/product';
import { StockPile } from '../../models/stockpile';
import { User } from '../../models/user';
import {Injectable} from '@angular/core';
import { LoginMemoryData } from '../../models/memory store/login-store-data-model';
import { GenericMemoryData } from '../../models/memory store/generic-memory-store-data-model';

/*
  The memory store contains references to individual classes that store and publish data changes.
  The individual classes are responsible for publishing and storing data.
  Views will need to subscribe to the changes coming from the individual classes.
*/

@Injectable()
export class MemoryStoreProvider {

  private _loginMemoryData: LoginMemoryData;
  private _stockpileMemoryData: GenericMemoryData<StockPile>;
  private _userMemoryData: GenericMemoryData<User>;
  
  constructor() {}

  public loginMemoryData(): LoginMemoryData {
    if (!this._loginMemoryData) {
      this._loginMemoryData = new LoginMemoryData();
    }
    return this._loginMemoryData;
  }

  public userMemoryData(): GenericMemoryData<User> {
    if (!this._userMemoryData) {
      this._userMemoryData = new GenericMemoryData<User>();
    }
    
    return this._userMemoryData;
  }

  public stockPileMemoryData(): GenericMemoryData<StockPile> {
    if (!this._stockpileMemoryData) {
      this._stockpileMemoryData = new GenericMemoryData<StockPile>();
    }
    return this._stockpileMemoryData;
  }

}