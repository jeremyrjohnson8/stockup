import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AddProductPage } from '../../pages/add-product/add-product';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AddProductPage
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AddProductPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class PagesModule { }
