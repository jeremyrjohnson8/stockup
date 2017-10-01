import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockpilePage } from './stockpile';

@NgModule({
  declarations: [
    StockpilePage,
  ],
  imports: [
    IonicPageModule.forChild(StockpilePage),
  ],
})
export class StockpilePageModule {}
