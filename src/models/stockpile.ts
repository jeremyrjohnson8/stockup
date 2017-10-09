import { AngularFireList } from 'angularfire2/database/interfaces';
import {Product, ProductCategory} from './product'; 

export class StockPile {
    value: Product[]; 
   constructor(snap: Product[]){
    if (snap) {
        this.value = snap; 
    }
   }
}
