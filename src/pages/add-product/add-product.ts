import { Subject } from 'rxjs/Rx';
import { MemoryStoreProvider } from '../../providers/memory-store/memory-store';
import { ProductProvider } from '../../providers/product-provider/product-provider';
import { User } from '../../models/user';
import { Product, ProductCategory } from '../../models/product';
import { SessionProvider } from '../../providers/session-provider/session-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  public name: string = null;
  public size: string = null;
  public unit: string = null;
  public quantity: number = 0;
  public upc: number = 0;
  public upcString: string;
  public perishable: boolean;
  public brand: string = null;
  public categories: any[];
  public ownerId: string;
  public selection: any;
  public category: any;
  private newProduct: Product;
  private userId: string;
  private currentUser: User = null;
  public isValid = false;
  public userObservable: any;
  public manualEntry: boolean;
  public userUnsubscribe = new Subject<void>();
  public barcodeScannerOptions: BarcodeScannerOptions = {
    preferFrontCamera: false,
    showFlipCameraButton: false,
    showTorchButton: true,
    torchOn: true,
    prompt: 'Place a barcode inside the scan area',
    resultDisplayDuration: 500,
  };



  constructor(private navCtrl: NavController, public navParams: NavParams,
    public product: ProductProvider,
    public sesh: SessionProvider,
    public barcode: BarcodeScanner,
    public memStore: MemoryStoreProvider  
  ) {
    this.categories = [
      { key: 'Hygiene and Grooming', value: ProductCategory.HYGIENE_AND_GROOMING },
      { key: 'Food and Drink', value: ProductCategory.FOOD_AND_DRINK },
      { key: 'Alcohol', value: ProductCategory.ALCOHOL },
      { key: 'Baby Care', value: ProductCategory.BABY_CARE },
      { key: 'Heatlh and Wellness', value: ProductCategory.HEALTH_AND_WELLNESS },
      { key: 'Landry', value: ProductCategory.LAUNDRY },
      { key: 'Paper Products', value: ProductCategory.PAPER_PRODUCTS },
      { key: 'Clearning Supplies', value: ProductCategory.CLEANING_SUPPLIES },
      { key: 'Office Supplies', value: ProductCategory.OFFICE_SUPPLIES }
    ]
    
    this.manualEntry = true;
  }

  ionViewDidLoad() {
    debugger;
    this.currentUser = this.memStore.userMemoryData().data;
    if (this.currentUser) {
      this.memStore.userMemoryData().dataSubject
        .takeUntil(this.userUnsubscribe)
        .subscribe((value: User) => {
          this.currentUser = value;
          this.ownerId = value.userid; 
          debugger; 
        });
    }
  }


  startBarcodeScanner(): void {
    this.barcode.scan(this.barcodeScannerOptions).then((barcodeData) => {
      // Success! Barcode data is here
      this.upcString = barcodeData.text;
      if (this.upcString != null) {
        this.parseUpc(this.upcString);
      }
    }, (err) => {
      // An error occurred
      alert(err);
    });
  }

  parseUpc(upc: string): void {
    parseInt(upc, this.upc);
  }

  public onSave(): void {

    this.newProduct = new Product();
    this.newProduct.name = this.name;
    this.newProduct.size = this.size;
    this.newProduct.unit = this.unit;
    this.newProduct.quantity = this.quantity;
    this.newProduct.upc = this.upc;
    this.newProduct.brand = this.brand;
    this.newProduct.category = this.category;
    this.newProduct.ownerId = this.ownerId;
    console.log(this.product.createNewProduct(this.newProduct));
  }

  public isFormValid(): boolean {

    return this.isValid;
  }

  public inItManualEntry() : void {
    this.manualEntry = !this.manualEntry;
    console.log(this.manualEntry);
  }

  ionViewWillUnload() {
    this.userUnsubscribe.next();
    this.userUnsubscribe.complete();
  }


}
