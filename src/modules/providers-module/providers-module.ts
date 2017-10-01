import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpModule } from '@angular/http';
import { ProductProvider } from '../../providers/product/product-provider';
import { StockpileProvider } from '../../providers/stockpile/stockpile';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { SessionProvider } from '../../providers/session/session';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [HttpModule],
    declarations: [
    ],
    exports: [],
    providers: [
      SessionProvider,
      ProductProvider,
      AuthenticationProvider,
      StockpileProvider,
      SessionProvider,
      BarcodeScanner
    ],
})
export class ProvidersModule {}




