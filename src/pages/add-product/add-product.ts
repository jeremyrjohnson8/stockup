import { ProductProvider } from '../../providers/product/product-provider';
import { User } from '../../dtos/user';
import { Product, ProductCategory } from '../../dtos/product';
import { SessionProvider } from '../../providers/session/session';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  public _product: ProductProvider;
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
  private _sesh: SessionProvider;
  private currentUser: User = null;
  public isValid = false;
  public userObservable: any;
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
    public barcode: BarcodeScanner) {
    this.categories = [{ key: "HYGIENE_AND_GROOMING", value: ProductCategory.HYGIENE_AND_GROOMING },
    { key: "FOOD_AND_DRINK", value: ProductCategory.FOOD_AND_DRINK },
    { key: "ALCOHOL", value: ProductCategory.ALCOHOL },
    { key: "BABY_CARE", value: ProductCategory.BABY_CARE },
    { key: "HEALTH_AND_WELLNESS", value: ProductCategory.HEALTH_AND_WELLNESS },
    { key: "LAUNDRY", value: ProductCategory.LAUNDRY },
    { key: "PAPER_PRODUCTS", value: ProductCategory.PAPER_PRODUCTS },
    { key: "CLEANING_SUPPLIES", value: ProductCategory.CLEANING_SUPPLIES },
    { key: "OFFICE_SUPPLIES", value: ProductCategory.OFFICE_SUPPLIES }]

    this._sesh = sesh;
    this.product = product;
    this.selection = this.category;


    this.ownerId = navParams.get('username');
  }

  ionViewDidLoad() {
    this.userObservable = this.sesh.getCurrentUser(this.ownerId);
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

  parseUpc(upc: string) :void {
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


}
