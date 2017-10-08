import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { ProductProvider } from '../../providers/product-provider/product-provider';
import { StockpileProvider } from '../../providers/stockpile/stockpile-provider';
import { AuthenticationProvider } from '../../providers/authentication-provider/authentication-provider';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpModule],
    declarations: [
    ],
    exports: [],
    providers: [
      ProductProvider,
      AuthenticationProvider,
      StockpileProvider,
      BarcodeScanner
    ],
})
export class ProvidersModule {}




