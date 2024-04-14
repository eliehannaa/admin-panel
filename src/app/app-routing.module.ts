import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminDataComponent } from './components/admin-data/admin-data.component';
import { AcceptProductComponent } from './components/accept-product/accept-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'admin', component: AdminDataComponent },
  { path: 'accept/:id/:orderId', component: AcceptProductComponent },
  { path: 'view/:id', component: ViewProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
