import { LoginPage } from '../../pages/login/login';
import { SignUpPage } from '../../pages/sign-up/sign-up';
import { CommonModule } from '@angular/common';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AddProductPage } from '../../pages/add-product/add-product';

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AddProductPage,
    LoginPage,
    SignUpPage
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AddProductPage,
    LoginPage,
    SignUpPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class PagesModule { }
