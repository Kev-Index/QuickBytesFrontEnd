import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './components/item/item.component';
import { VendorListComponent } from './components/vendor-list/vendor-list.component';

const routes: Routes = [
  {path:'items/:vendorId', component:ItemComponent},
  {path:'vendors', component:VendorListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
