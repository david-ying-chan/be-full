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
  orders: Order[];
  isOffline: boolean = false;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.isOffline = false;
      },
      error: () => {
        this.isOffline = true;
      }
    });
  }

  get isOffline$() {
    return this.ordersService.isOffline$;
  }
}
