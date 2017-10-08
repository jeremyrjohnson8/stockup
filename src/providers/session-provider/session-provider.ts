import { Observable } from 'rxjs/Rx';
import { User } from '../../dtos/user';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
  private endpoint = `users/`;
  dbUserId: string;
  userId: string;
  number1: number;
  currentUserObs: Observable<any>; 
  public currentUser = new User(); 
  firstName: string;
  constructor(public userData: AngularFireDatabase) {
  }

  public isLoggedIn(): boolean {
    if (this.currentUser.userid) {
      return true; 
    }
    return false;
  }

   private endPointBuilder(usernameTemp: string): string {
     var returnVal = this.endpoint + usernameTemp; 
     return returnVal; 
   }


   public getCurrentUser(): Observable<any>{
     return this.currentUserObs;
   }
   
    public getCurrentUserById(userid: string): Observable<any>{
      var finalEndPoint = this.endPointBuilder(userid);
      this.currentUserObs = this.userData.object(finalEndPoint).valueChanges();
      this.currentUserObs.subscribe((user: User) => {
        this.currentUser = user; 
      });
      return this.currentUserObs; 
    }

}
