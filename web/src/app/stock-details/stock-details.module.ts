import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockDetailsPageRoutingModule } from './stock-details-routing.module';

import { StockDetailsPage } from './stock-details.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockDetailsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [StockDetailsPage]
})
export class StockDetailsPageModule {}
