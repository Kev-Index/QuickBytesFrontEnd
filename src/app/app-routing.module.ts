import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './auth/component/dashboard/dashboard.component';
import { LoginComponent } from './auth/component/login/login.component';
import { LogoutComponent } from './auth/component/logout/logout.component';
import { PasswordResetComponent } from './auth/component/password-reset/password-reset.component';
import { SignupComponent } from './auth/component/signup/signup.component';
import { UsernameVerifyComponent } from './auth/component/username-verify/username-verify.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { ItemComboComponent } from './components/item-combo/item-combo.component';
import { RequestComboComponent } from './components/request-combo/request-combo.component';
import { RequestItemComponent } from './components/request-item/request-item.component';
import { RequestComponent } from './components/request/request.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';

const routes: Routes = [
  {path:'' , component: DashboardComponent},
  {path:'dashboard' , component: DashboardComponent},
  {path:'admin' , component: AdminComponent},
  {path:'menu/:vendorId' , component: MenuComponent},
  {path:'customer' , component: CustomerComponent},
  {path:'item-combo' , component: ItemComboComponent},
  {path:'request' , component: RequestComponent},
  {path:'request-combo' , component: RequestComboComponent},
  {path:'request-item' , component: RequestItemComponent},
  {path:'vendor' , component: VendorComponent},
  {path:'login' , component: LoginComponent},
  {path:'logout' , component: LogoutComponent},
  {path:'signup' , component: SignupComponent},
  {path:'username-verify' , component: UsernameVerifyComponent},
  {path:'password-reset' , component: PasswordResetComponent}, 
  {path:'item/:vendorId', component:AddItemComponent},
  {path:'item/edit/:itemId', component:EditItemComponent},
  {path:'vendors', component:VendorListComponent},
  {path:'customers' , component: CustomerListComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
