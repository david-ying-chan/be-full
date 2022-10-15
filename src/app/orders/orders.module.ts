import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailContainerComponent } from './order-detail-container/order-detail-container.component';
import { HttpClientModule } from '@angular/common/http';
import { OrdersContainerComponent } from './orders-container/orders-container.component';


@NgModule({
  declarations: [
    OrdersContainerComponent,
    OrderDetailComponent,
    OrderDetailComponent,
    OrderDetailContainerComponent,
    OrdersContainerComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HttpClientModule
  ]
})
export class OrdersModule { }
