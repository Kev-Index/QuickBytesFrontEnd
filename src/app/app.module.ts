import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';

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
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { DashboardComponent } from './auth/component/dashboard/dashboard.component';
import { LoginComponent } from './auth/component/login/login.component';
import { LogoutComponent } from './auth/component/logout/logout.component';
import { PasswordResetComponent } from './auth/component/password-reset/password-reset.component';
import { UsernameVerifyComponent } from './auth/component/username-verify/username-verify.component';
import { SignupComponent } from './auth/component/signup/signup.component';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CustomerDashboardProfileComponent } from './components/customer-dashboard-profile/customer-dashboard-profile.component';
import { CustomerDashboardShoppingcartComponent } from './components/customer-dashboard-shoppingcart/customer-dashboard-shoppingcart.component';
import { CustomerDashboardShoppingcartProductlistComponent } from './components/customer-dashboard-shoppingcart-productlist/customer-dashboard-shoppingcart-productlist.component';
import { CustomerDashboardShoppingcartCartComponent } from './components/customer-dashboard-shoppingcart-cart/customer-dashboard-shoppingcart-cart.component';

import { CustomerCartPageComponent } from './components/customer-cart-page/customer-cart-page.component';
import { AdminReportPageComponent } from './components/admin-report-page/admin-report-page.component';
import { VendorOrderApprovalPageComponent } from './components/vendor-order-approval-page/vendor-order-approval-page.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

import { AdminDashboardViewUsersComponent } from './components/admin-dashboard-view-users/admin-dashboard-view-users.component';
import { AdminProfileEditComponent } from './components/admin-profile-edit/admin-profile-edit.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CustomerProfilePageComponent } from './components/customer-profile-page/customer-profile-page.component';
import { CustomerMenuPageComponent } from './components/customer-menu-page/customer-menu-page.component';



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
    CustomerDashboardProfileComponent,
    CustomerDashboardShoppingcartComponent,
    CustomerDashboardShoppingcartProductlistComponent,
    CustomerDashboardShoppingcartCartComponent,
    CustomerCartPageComponent,
    AdminReportPageComponent,
    VendorOrderApprovalPageComponent,
    AddItemComponent,
    EditItemComponent,
    MenuComponent,
    CustomerListComponent,
    AdminDashboardViewUsersComponent,
    AdminProfileEditComponent,
    AddUserComponent,
    CustomerProfilePageComponent,
    CustomerMenuPageComponent
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
    MatCheckboxModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSnackBarModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
