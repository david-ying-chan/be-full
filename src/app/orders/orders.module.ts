import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrderCardComponent } from './order-card/order-card.component';
import { OrderDetailContainerComponent } from './order-detail-container/order-detail-container.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrdersContainerComponent } from './orders-container/orders-container.component';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    OrdersContainerComponent,
    OrderDetailComponent,
    OrderDetailContainerComponent,
    OrdersContainerComponent,
    OrderCardComponent,
  ],
  imports: [CommonModule, OrdersRoutingModule, HttpClientModule],
})
export class OrdersModule {}
