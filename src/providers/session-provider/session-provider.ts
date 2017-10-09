import { MemoryStoreProvider } from '../memory-store/memory-store';
import { Observable } from 'rxjs/Rx';
import { User } from '../../models/user';
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
  public currentUser: User;
  firstName: string;
  constructor(public userData: AngularFireDatabase,
    public memStoreProvider: MemoryStoreProvider) {
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

  public getCurrentUserById(userid: string): Promise<User> {
    return new Promise((resolve) => {
      var finalEndPoint = this.endPointBuilder(userid);
      this.currentUserObs = this.userData.object(finalEndPoint).valueChanges();
      this.currentUserObs.subscribe((user: User) => {
        this.memStoreProvider.userMemoryData().publish(user).then((value: User) => {
          return resolve(value);
        });;
        this.currentUser = user;
      });
      return resolve(this.currentUser);
    });
  }
}


