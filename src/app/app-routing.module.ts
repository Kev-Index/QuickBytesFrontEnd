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
import { CustomerCartPageComponent } from './components/customer-cart-page/customer-cart-page.component';
import { AdminReportPageComponent } from './components/admin-report-page/admin-report-page.component';
import { VendorOrderApprovalPageComponent } from './components/vendor-order-approval-page/vendor-order-approval-page.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminDashboardViewUsersComponent } from './components/admin-dashboard-view-users/admin-dashboard-view-users.component';
import { AdminProfileEditComponent } from './components/admin-profile-edit/admin-profile-edit.component';
import { AddUserComponent } from './components/add-user/add-user.component';

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
  {path:'cart', component:CustomerCartPageComponent},
  {path:'approval', component:VendorOrderApprovalPageComponent},
  {path:'report', component:AdminReportPageComponent},
  //{path:'users', component:AdminDashboardViewUsersComponent},
  {path:'admin-profile/:adminId', component:AdminProfileEditComponent},
  {path:'add-user', component:AddUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterTestingModule],
  exports: [RouterModule]
})

export class AppRoutingModule { }
