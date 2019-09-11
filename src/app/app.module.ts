import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PosHomeComponent } from './pos-home/pos-home.component';
import { ProductSerService } from './product-ser.service'

@NgModule({
  declarations: [
    AppComponent,
    PosHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ProductSerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
