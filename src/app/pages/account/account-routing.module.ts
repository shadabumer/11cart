import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountPage } from './account.page';
import { OrdersComponent } from './orders/orders.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'profile-details',
    component: ProfileDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
