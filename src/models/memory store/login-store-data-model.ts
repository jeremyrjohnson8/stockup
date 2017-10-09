import { IMemoryStoreData } from '../../interfaces/memory-store-typings';
import { Subject } from 'rxjs/Subject';

export class LoginMemoryData implements IMemoryStoreData {

    public data: FirebaseAuthData;
    public firebaseAuthResult: FirebaseAuthResult;
    public dataSubject: Subject<FirebaseAuthData> = new Subject<FirebaseAuthData>();

    public publish(value: FirebaseAuthResult): Promise<FirebaseAuthData> {
        return new Promise<FirebaseAuthData>((resolve, reject) => {
            this.data = value.auth;
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }

    public republish(): Promise<FirebaseAuthData> {
        return new Promise<FirebaseAuthData>((resolve, reject) => {
            this.dataSubject.next(this.data);
            resolve(this.data);
        });
    }
}