import { OrdersService } from './../orders.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-container',
  templateUrl: './orders-container.component.html',
  styleUrls: ['./orders-container.component.scss']
})
export class OrdersContainerComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.orders$ = this.ordersService.getOrders();
  }

  get isOffline$() {
    return this.ordersService.isOffline$;
  }
}
