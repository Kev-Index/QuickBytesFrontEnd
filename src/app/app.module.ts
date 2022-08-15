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
import { DashboardComponent } from './auth/component/dashboard/dashboard.component';
import { LoginComponent } from './auth/component/login/login.component';
import { LogoutComponent } from './auth/component/logout/logout.component';
import { PasswordResetComponent } from './auth/component/password-reset/password-reset.component';
import { UsernameVerifyComponent } from './auth/component/username-verify/username-verify.component';
import { SignupComponent } from './auth/component/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DashboardCustomerComponent } from './auth/component/dashboard-customer/dashboard-customer.component';
import { CustomerDashboardProfileComponent } from './components/customer-dashboard-profile/customer-dashboard-profile.component';
import { CustomerDashboardShoppingcartComponent } from './components/customer-dashboard-shoppingcart/customer-dashboard-shoppingcart.component';
import { CustomerDashboardShoppingcartProductlistComponent } from './components/customer-dashboard-shoppingcart-productlist/customer-dashboard-shoppingcart-productlist.component';
import { CustomerDashboardShoppingcartCartComponent } from './components/customer-dashboard-shoppingcart-cart/customer-dashboard-shoppingcart-cart.component';



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
    VendorListComponent,
    DashboardComponent,
    LoginComponent,
    LogoutComponent,
    UsernameVerifyComponent,
    PasswordResetComponent,
    SignupComponent,
    DashboardCustomerComponent,
    CustomerDashboardProfileComponent,
    CustomerDashboardShoppingcartComponent,
    CustomerDashboardShoppingcartProductlistComponent,
    CustomerDashboardShoppingcartCartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
