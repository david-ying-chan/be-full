import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrderDetailContainerComponent } from './order-detail-container/order-detail-container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersContainerComponent
  },
  {
    path: 'orders/:id',
    component: OrderDetailContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
