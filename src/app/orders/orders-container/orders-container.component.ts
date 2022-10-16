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
  orders: Order[] = [];
  date: string;
  isOffline: boolean = false;

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.date = new Date().toUTCString();
        window.localStorage.setItem('orders', JSON.stringify({
          orders,
          date: this.date
        }));
        this.isOffline = false;
      },
      error: () => {
        const { orders, date } = JSON.parse(window.localStorage.getItem('orders') || '{}');
        this.orders = orders;
        this.date = date;
        this.isOffline = true;
      }
    });
  }
}
