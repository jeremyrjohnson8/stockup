import { StockpileProvider } from '../stockpile-provider/stockpile-provider';
import { StockPile } from '../../models/stockpile';
import { MemoryStoreProvider } from '../memory-store/memory-store';
import { FirebaseAuthResult } from '../../models/firebase-auth-result';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";

/*
  Generated class for the AuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  endpoint = '/users/';
  spEndpoint = '/stockpile/';
  dbUserId: string;
  currentUser: User;
  private afObjObs: Observable<any>;


  constructor(public db: AngularFireDatabase,
    public angAuth: AngularFireAuth,
    public memStore: MemoryStoreProvider,
    public stockProvider: StockpileProvider) { }

  public saveNewUser(newUser: User) {
    // TODO: Null Check
    this.stockProvider.CreateStockPile(newUser.userid);

    this.dbUserId = this.endpoint + newUser.userid;
    this.db.object(this.dbUserId).set(newUser);
  }

  public createNewUserAuth(email: string, password: string): any {
    // TODO: Null Check

    return this.angAuth.auth.createUserWithEmailAndPassword(email, password);
  }



  public getCurrentUserById() {

  }


  public doLogin(email: string, password: string): Promise<FirebaseAuthResult> {
    return new Promise((resolve, error) => {
      this.angAuth.auth.signInWithEmailAndPassword(email, password).then((value: FirebaseAuthResult) => {  // handle valid response
        this.memStore.loginMemoryData().publish(value);
        return resolve(value);
      }).catch((error: Error) => {
        alert(`auth prov - ${error.message}`);
        return resolve(null);
      });
    });
  }
}


