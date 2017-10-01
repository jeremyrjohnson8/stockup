import { Observable } from 'rxjs/Rx';
import { User } from '../../dtos/user';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
  private endpoint;
  _userData: AngularFireDatabase;
  dbUserId: string;
  userId: string;
  currentUser: User;
  number1: number;
  obs: Observable<any>;

  currentUsers: FirebaseObjectObservable<any>; 
  firstName: string;
  constructor(public userData: AngularFireDatabase) {
    this.endpoint = 'users/';
    this._userData = userData;
    this.currentUsers = this._userData.object(this.endpoint);
  }


   private endPointBuilder(usernameTemp: string): string {
     var returnVal = this.endpoint + usernameTemp; 
     console.log('EndPoint Tester ', returnVal);
     return returnVal; 
   }

   public test(): User{
     this.firstName = this.currentUser.firstName; 
     console.log(this.currentUser.userid); 
     return this.currentUser; 
   }

   public setCurrentUser(): User{
     return this.currentUser; 
   }
   
    public getCurrentUser(userid: string): FirebaseObjectObservable<any>{
      var finalEndPoint = this.endPointBuilder(userid); 
      this.currentUsers = this._userData.object(finalEndPoint);
      console.log('Out ' + this.currentUsers);
      return this.currentUsers;   
    }

}
