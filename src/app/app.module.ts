import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ComboComponent } from './components/combo/combo.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ItemComponent } from './components/item/item.component';
import { ItemComboComponent } from './components/item-combo/item-combo.component';
import { RequestComponent } from './components/request/request.component';
import { RequestComboComponent } from './components/request-combo/request-combo.component';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ComboComponent,
    CustomerComponent,
    ItemComponent,
    ItemComboComponent,
    RequestComponent,
    RequestComboComponent,
    RequestItemComponent,
    VendorComponent,
    VendorListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
