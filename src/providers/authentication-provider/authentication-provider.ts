import { User } from '../../dtos/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
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
  _angFire: AngularFireDatabase; 
  dbUserId: string;
  _angAuth: AngularFireAuth; 
  currentUser: User; 
  private afObjObs: FirebaseObjectObservable<any>; 


  constructor(angularFire: AngularFireDatabase, angAuth: AngularFireAuth) { 
    this._angAuth = angAuth; 
    this._angFire = angularFire; 
  }

   public saveNewUser(newUser: User){
    this.CreateStockPile(newUser.userid);
    
    this.dbUserId = this.endpoint + newUser.userid; 
    this._angFire.object(this.dbUserId).set(newUser); 
  }

  public createNewUserAuth(email: string, password: string):any  {
    
   return this._angAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  public CreateStockPile(userid: string){ 
    this.afObjObs = this._angFire.object(this.spEndpoint + userid);
    this.afObjObs.set(userid);
  }

  public getCurrentUserById(){

  }


  public doLogin(email: string, password: string) {
    this._angAuth.auth.signInWithEmailAndPassword(email, password).then(e => [
      this.currentUser = e,
      console.log(`New current user is ` + this.currentUser)
    ]); 
  }

}
